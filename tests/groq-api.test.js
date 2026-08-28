const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync(
  path.join(__dirname, "..", "js", "groq-api.js"),
  "utf8"
);

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    }
  };
}

function jsonResponse(status, payload) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? "OK" : "Error",
    async json() {
      return payload;
    }
  };
}

function createService(fetchImpl, initialStorage = {}) {
  const context = {
    fetch: fetchImpl,
    localStorage: createStorage(initialStorage),
    console
  };
  vm.runInNewContext(`${source}\nthis.GroqServiceForTest = GroqService;`, context);
  return {
    service: new context.GroqServiceForTest(),
    storage: context.localStorage
  };
}

function memberFixture() {
  return {
    name: "Michelle",
    nickname: "Michie",
    personaPrompt: "Balas dengan santai."
  };
}

test("model Llama yang deprecated dimigrasikan ke default baru", () => {
  const { service, storage } = createService(async () => {
    throw new Error("fetch tidak seharusnya dipanggil");
  }, {
    groq_model_idolchat: "llama-3.1-8b-instant"
  });

  assert.equal(service.getModel(), "openai/gpt-oss-120b");
  assert.equal(storage.getItem("groq_model_idolchat"), null);
});

test("sendChat memakai model aktif yang dikembalikan akun Groq", async () => {
  const requestedModels = [];
  const requestBodies = [];
  const { service } = createService(async (url, options = {}) => {
    if (url.endsWith("/models")) {
      return jsonResponse(200, {
        data: [
          { id: "llama-3.1-8b-instant" },
          { id: "whisper-large-v3" },
          { id: "openai/gpt-oss-20b" }
        ]
      });
    }

    const body = JSON.parse(options.body);
    requestBodies.push(body);
    requestedModels.push(body.model);
    return jsonResponse(200, {
      choices: [{ message: { content: "hai juga" } }]
    });
  }, {
    groq_api_key_idolchat: "gsk_test_key"
  });

  const reply = await service.sendChat(memberFixture(), [], "hai", "Imanuel");
  assert.equal(reply, "hai juga");
  assert.deepEqual(requestedModels, ["openai/gpt-oss-20b"]);
  assert.equal(requestBodies[0].include_reasoning, false);
  assert.equal(requestBodies[0].reasoning_effort, "low");
});

test("blok think dibuang dan hanya balasan final yang ditampilkan", () => {
  const { service } = createService(async () => {
    throw new Error("fetch tidak seharusnya dipanggil");
  });

  assert.equal(
    service.sanitizeReply("<think>Analisis panjang</think>\nhaiii kak, ada apa nihh?"),
    "haiii kak, ada apa nihh?"
  );
  assert.equal(
    service.sanitizeReply("<think>Here's a thinking process: Analyze User Input"),
    ""
  );
});

test("reasoning terpotong membuat sendChat mencoba model berikutnya", async () => {
  const requestedModels = [];
  const { service } = createService(async (url, options = {}) => {
    if (url.endsWith("/models")) {
      return jsonResponse(200, {
        data: [
          { id: "openai/gpt-oss-120b" },
          { id: "qwen/qwen3.6-27b" }
        ]
      });
    }

    const body = JSON.parse(options.body);
    requestedModels.push(body.model);
    if (body.model === "openai/gpt-oss-120b") {
      return jsonResponse(200, {
        choices: [{ message: { content: "<think>Analyze User Input: hai" } }]
      });
    }
    assert.equal(body.reasoning_effort, "none");
    return jsonResponse(200, {
      choices: [{ message: { content: "haiii, ada apa nihh?" } }]
    });
  }, {
    groq_api_key_idolchat: "gsk_test_key"
  });

  const reply = await service.sendChat(memberFixture(), [], "hai");
  assert.equal(reply, "haiii, ada apa nihh?");
  assert.deepEqual(requestedModels, [
    "openai/gpt-oss-120b",
    "qwen/qwen3.6-27b"
  ]);
});

test("sendChat otomatis mencoba model akun berikutnya bila model pertama ditolak", async () => {
  const requestedModels = [];
  const { service, storage } = createService(async (url, options = {}) => {
    if (url.endsWith("/models")) {
      return jsonResponse(200, {
        data: [
          { id: "openai/gpt-oss-120b" },
          { id: "qwen/qwen3.6-27b" }
        ]
      });
    }

    const model = JSON.parse(options.body).model;
    requestedModels.push(model);
    if (model === "openai/gpt-oss-120b") {
      return jsonResponse(400, { error: { message: "model is not available" } });
    }
    return jsonResponse(200, {
      choices: [{ message: { content: "fallback berhasil" } }]
    });
  }, {
    groq_api_key_idolchat: "gsk_test_key",
    groq_model_idolchat: "openai/gpt-oss-120b"
  });

  const reply = await service.sendChat(memberFixture(), [], "hai");
  assert.equal(reply, "fallback berhasil");
  assert.deepEqual(requestedModels, [
    "openai/gpt-oss-120b",
    "qwen/qwen3.6-27b"
  ]);
  assert.equal(storage.getItem("groq_model_idolchat"), "qwen/qwen3.6-27b");
});

test("API key tidak valid tetap dilaporkan sebagai masalah key", async () => {
  const { service } = createService(async () => {
    return jsonResponse(401, { error: { message: "invalid api key" } });
  }, {
    groq_api_key_idolchat: "gsk_invalid"
  });

  await assert.rejects(
    service.sendChat(memberFixture(), [], "hai"),
    /INVALID_API_KEY/
  );
});
