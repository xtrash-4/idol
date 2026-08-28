const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const appSource = fs.readFileSync(
  path.join(__dirname, "..", "js", "app.js"),
  "utf8"
);

test("app tidak memanggil renderer sidebar lama yang sudah dihapus", () => {
  assert.doesNotMatch(appSource, /\brenderMemberList\s*\(/);
  assert.match(appSource, /function refreshMemberViews\s*\(/);
});

test("model baru tidak ikut dibersihkan sebagai model deprecated", () => {
  const cleanupBlock = appSource.slice(
    appSource.indexOf("const deprecatedModels"),
    appSource.indexOf("// App State")
  );

  assert.doesNotMatch(cleanupBlock, /openai\/gpt-oss-120b/);
  assert.match(cleanupBlock, /llama-3\.1-8b-instant/);
});
