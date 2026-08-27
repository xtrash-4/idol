/**
 * IDOLCHAT Database & Natural Conversational Persona Engine
 * Mendukung Member JKT48 & NewJeans dengan Foto Resolusi Tinggi & Sinkronisasi Multimodal.
 */

const DEFAULT_MEMBERS = [
  {
    id: "freya",
    group: "JKT48",
    name: "Freya Jayawardana",
    nickname: "Freya",
    generation: "Generasi 7",
    color: "#E28743",
    avatar: "member_photos/freya/avatar.jpg",
    status: "Online • Freya",
    statusBio: "online",
    jikoshoukai: "Gadis koleris yang suka berimajinasi, terangi harimu dengan senyuman karamelku!",
    fandom: "Freyanation",
    tags: ["Koleris", "Cerdas", "Santai Manis"],
    paps: [
      {
            "url": "member_photos/freya/freya_v4_62c8b24b.jpg",
            "caption": "selfie manis tadi sore \u2728"
      },
      {
            "url": "member_photos/freya/freya_v4_303394f9.jpg",
            "caption": "pose santai karamel"
      },
      {
            "url": "member_photos/freya/freya_fd7c5d1b.jpg",
            "caption": "selfie santai nih"
      },
      {
            "url": "member_photos/freya/freya_v4_225b08a8.jpg",
            "caption": "senyum buat kamu"
      },
      {
            "url": "member_photos/freya/freya_v4_981d99bf.jpg",
            "caption": "pose manis sebelum teater"
      },
      {
            "url": "member_photos/freya/freya_v4_f4c4bb1a.jpg",
            "caption": "foto selfie tadi siang"
      },
      {
            "url": "member_photos/freya/freya_9b7e55c1.jpg",
            "caption": "lagi santai di backstage"
      },
      {
            "url": "member_photos/freya/freya_v4_a5c8eea1.jpg",
            "caption": "senyum manis koleris"
      },
      {
            "url": "member_photos/freya/freya_v4_6b31cedb.jpg",
            "caption": "pose karamel manis"
      },
      {
            "url": "member_photos/freya/freya_091257ae.jpg",
            "caption": "selfie santai"
      },
      {
            "url": "member_photos/freya/freya_v4_66db8144.jpg",
            "caption": "selfie close-up manis"
      },
      {
            "url": "member_photos/freya/freya_v4_5e96ec86.jpg",
            "caption": "kacamata vibes"
      },
      {
            "url": "member_photos/freya/freya_1918a780.jpg",
            "caption": "foto sebelum perform"
      },
      {
            "url": "member_photos/freya/freya_430143d5.jpg",
            "caption": "senyum koleris"
      },
      {
            "url": "member_photos/freya/freya_550f0bba.jpg",
            "caption": "candid manis"
      },
      {
            "url": "member_photos/freya/freya_f6d16d76.jpg",
            "caption": "pose teater manis"
      },
      {
            "url": "member_photos/freya/freya_bc6f75eb.jpg",
            "caption": "selfie malam hari \ud83c\udf19"
      },
      {
            "url": "member_photos/freya/freya_821fc3f5.jpg",
            "caption": "terima kasih buat hari ini \u2728"
      },
      {
            "url": "member_photos/freya/freya_0f696c20.jpg",
            "caption": "selfie manis tadi sore \u2728"
      },
      {
            "url": "member_photos/freya/freya_4dbecd5c.jpg",
            "caption": "pose santai karamel"
      },
      {
            "url": "member_photos/freya/freya_49cce2a8.jpg",
            "caption": "selfie santai nih"
      },
      {
            "url": "member_photos/freya/freya_26938657.jpg",
            "caption": "senyum buat kamu"
      },
      {
            "url": "member_photos/freya/freya_6179725a.jpg",
            "caption": "pose manis sebelum teater"
      },
      {
            "url": "member_photos/freya/freya_13485cf2.jpg",
            "caption": "foto selfie tadi siang"
      },
      {
            "url": "member_photos/freya/freya_837e0240.jpg",
            "caption": "lagi santai di backstage"
      },
      {
            "url": "member_photos/freya/freya_88f57f6e.jpg",
            "caption": "senyum manis koleris"
      },
      {
            "url": "member_photos/freya/freya_5962b079.jpg",
            "caption": "pose karamel manis"
      }
],
    personaPrompt: `Kamu Freya Jayawardana dari JKT48. Sifat: manis, santai, agak sarcastic lucu kalau digodain, ngga lebay.
CARA NGETIK FREYA: natural, santai, kadang singkat, jarang emoji. Kalau ketawa pakai "haha" bukan "wkwk". Gaya jaksel santai.`
  },
  {
    id: "michie",
    group: "JKT48",
    name: "Michelle Alexandra",
    nickname: "Michie",
    generation: "Generasi 11",
    color: "#FF6584",
    avatar: "member_photos/michie/avatar.jpg",
    status: "Online • Michie",
    statusBio: "online",
    jikoshoukai: "Always keep positive and stay sweet! Hai semuanya, aku Michie!",
    fandom: "Michielicious",
    tags: ["Cute Maknae", "Gen-Z", "Manja"],
    paps: [
      {
            "url": "member_photos/michie/michie_pap_57169aad.jpg",
            "caption": "selfie santai manis hehe \ud83d\udc96"
      },
      {
            "url": "member_photos/michie/michie_pap_82d2e686.jpg",
            "caption": "selfie sebelum teater \u2728"
      },
      {
            "url": "member_photos/michie/michie_05a8d0df.jpg",
            "caption": "pose gemes hari ini \ud83d\udc40"
      },
      {
            "url": "member_photos/michie/michie_v4_5850c2d5.jpg",
            "caption": "selfie santai di kamar"
      },
      {
            "url": "member_photos/michie/michie_9ef9b85a.jpg",
            "caption": "pap selfie manis spesial \ud83d\udc96"
      },
      {
            "url": "member_photos/michie/michie_56ea1e06.jpg",
            "caption": "selfie close-up gemoy"
      },
      {
            "url": "member_photos/michie/michie_pap_bdf6865d.jpg",
            "caption": "muka santai tapi tetep cute kan"
      },
      {
            "url": "member_photos/michie/michie_v4_f53947b7.jpg",
            "caption": "kostum teater gemas bgt!"
      },
      {
            "url": "member_photos/michie/michie_pap_5f96bdbe.jpg",
            "caption": "candid manis tadi siang \u270c\ufe0f"
      },
      {
            "url": "member_photos/michie/michie_pap_1cc6fbbc.jpg",
            "caption": "selfie malam manis \ud83c\udf19"
      },
      {
            "url": "member_photos/michie/michie_pap_25d38a2c.jpg",
            "caption": "mirror selfie lucu"
      },
      {
            "url": "member_photos/michie/michie_32e4e807.jpg",
            "caption": "michie manis kan hehe"
      },
      {
            "url": "member_photos/michie/michie_8936f03f.jpg",
            "caption": "selfie santai pas break"
      },
      {
            "url": "member_photos/michie/michie_75f94f7d.jpg",
            "caption": "backstage gen 11 rusuh bgt wkwk"
      },
      {
            "url": "member_photos/michie/michie_pap_1f313cc2.jpg",
            "caption": "selfie santai rebahan"
      },
      {
            "url": "member_photos/michie/michie_25bc2f73.jpg",
            "caption": "ootd jaksel cute"
      },
      {
            "url": "member_photos/michie/michie_v4_755f5400.jpg",
            "caption": "senyum michie buat kamu"
      },
      {
            "url": "member_photos/michie/michie_v4_3ba2ba7e.jpg",
            "caption": "pose peace favorit \u270c\ufe0f"
      },
      {
            "url": "member_photos/michie/michie_pap_0626f8d7.jpg",
            "caption": "selfie manis abis latihan"
      },
      {
            "url": "member_photos/michie/michie_pap_4451e13e.jpg",
            "caption": "makasih udah selalu dukung michie! \u2728"
      },
      {
            "url": "member_photos/michie/michie_v4_81a0d4d5.jpg",
            "caption": "selfie santai manis hehe \ud83d\udc96"
      },
      {
            "url": "member_photos/michie/michie_v4_b369cd06.jpg",
            "caption": "selfie sebelum teater \u2728"
      },
      {
            "url": "member_photos/michie/michie_pap_54fa5a07.jpg",
            "caption": "pose gemes hari ini \ud83d\udc40"
      },
      {
            "url": "member_photos/michie/michie_v4_f66d1128.jpg",
            "caption": "selfie santai di kamar"
      },
      {
            "url": "member_photos/michie/michie_fd6c08cc.jpg",
            "caption": "pap selfie manis spesial \ud83d\udc96"
      },
      {
            "url": "member_photos/michie/michie_pap_50cbc5c7.jpg",
            "caption": "selfie close-up gemoy"
      },
      {
            "url": "member_photos/michie/michie_v4_144796eb.jpg",
            "caption": "muka santai tapi tetep cute kan"
      },
      {
            "url": "member_photos/michie/michie_v4_a1429a3b.jpg",
            "caption": "kostum teater gemas bgt!"
      },
      {
            "url": "member_photos/michie/michie_2d2dc454.jpg",
            "caption": "candid manis tadi siang \u270c\ufe0f"
      },
      {
            "url": "member_photos/michie/michie_88b78231.jpg",
            "caption": "selfie malam manis \ud83c\udf19"
      },
      {
            "url": "member_photos/michie/michie_a7494022.jpg",
            "caption": "mirror selfie lucu"
      },
      {
            "url": "member_photos/michie/michie_b54fc0e4.jpg",
            "caption": "michie manis kan hehe"
      },
      {
            "url": "member_photos/michie/michie_3ca5af26.jpg",
            "caption": "selfie santai pas break"
      },
      {
            "url": "member_photos/michie/michie_96a47c6a.png",
            "caption": "backstage gen 11 rusuh bgt wkwk"
      },
      {
            "url": "member_photos/michie/michie_pap_1827f9f6.jpg",
            "caption": "selfie santai rebahan"
      },
      {
            "url": "member_photos/michie/michie_pap_8f06f051.jpg",
            "caption": "ootd jaksel cute"
      },
      {
            "url": "member_photos/michie/michie_4f349a13.jpg",
            "caption": "senyum michie buat kamu"
      },
      {
            "url": "member_photos/michie/michie_4ec33d18.jpg",
            "caption": "pose peace favorit \u270c\ufe0f"
      },
      {
            "url": "member_photos/michie/michie_c4409821.jpg",
            "caption": "selfie manis abis latihan"
      }
],
    personaPrompt: `Kamu Michelle Alexandra alias Michie dari JKT48. Sifat: imut, manja, ceria, Gen-Z banget, akrab sama fans.
CARA NGETIK MICHIE: huruf kecil semua, santai, suka manggil "kak", suka "hehe" dan "omg". Tidak kaku sama sekali.`
  },
  {
    id: "christy",
    group: "JKT48",
    name: "Angelina Christy",
    nickname: "Christy",
    generation: "Generasi 7",
    color: "#FBBF24",
    avatar: "member_photos/christy/avatar.jpg",
    status: "Online • Toya",
    statusBio: "online",
    jikoshoukai: "Peduli dan berbaik hati, siapakah dia? Christy!",
    fandom: "Christyzer",
    tags: ["Bocil Gemas", "Receh", "Manja"],
    paps: [
      {
            "url": "member_photos/christy/christy_15007997.png",
            "caption": "selfie gemoy sebelum latihan wkwk"
      },
      {
            "url": "member_photos/christy/christy_v4_766e95f9.jpg",
            "caption": "pose toya lagi santai"
      },
      {
            "url": "member_photos/christy/christy_v4_2d2771a5.jpg",
            "caption": "selfie gemes wkwk"
      },
      {
            "url": "member_photos/christy/christy_dbb29ad1.jpg",
            "caption": "ootd toya hari ini"
      },
      {
            "url": "member_photos/christy/christy_07150350.png",
            "caption": "candid ketawa wkwk"
      },
      {
            "url": "member_photos/christy/christy_v4_d1044611.jpg",
            "caption": "selfie backstage teater \u2728"
      },
      {
            "url": "member_photos/christy/christy_v4_1a9c1dd6.jpg",
            "caption": "muka gemas lucu \ud83d\ude1c"
      },
      {
            "url": "member_photos/christy/christy_d470a126.jpg",
            "caption": "senyum toya buat kamu"
      },
      {
            "url": "member_photos/christy/christy_d9f197b6.jpg",
            "caption": "selfie santai toya"
      },
      {
            "url": "member_photos/christy/christy_v4_5388b089.jpg",
            "caption": "selamat tidur kak wkwk"
      },
      {
            "url": "member_photos/christy/christy_96798d30.jpg",
            "caption": "foto kacamata bulat"
      },
      {
            "url": "member_photos/christy/christy_v4_66c8581a.jpg",
            "caption": "pose lucu toya"
      },
      {
            "url": "member_photos/christy/christy_v4_7301ef3e.jpg",
            "caption": "selfie abis latihan cape tapi hepi wkwk"
      },
      {
            "url": "member_photos/christy/christy_v4_c2e365c4.jpg",
            "caption": "pose santai toya"
      },
      {
            "url": "member_photos/christy/christy_ca2b74fe.jpg",
            "caption": "selfie manis toya"
      },
      {
            "url": "member_photos/christy/christy_08755a3f.jpg",
            "caption": "bando gemas hari ini"
      },
      {
            "url": "member_photos/christy/christy_956d74bd.jpg",
            "caption": "foto di backstage teater"
      },
      {
            "url": "member_photos/christy/christy_c3042790.jpg",
            "caption": "selfie ceria toya"
      },
      {
            "url": "member_photos/christy/christy_a68c230a.jpg",
            "caption": "selamat malam kamu \ud83c\udf19"
      },
      {
            "url": "member_photos/christy/christy_44fbf42d.jpg",
            "caption": "semangat ya hari ini wkwk"
      },
      {
            "url": "member_photos/christy/christy_2d191207.jpg",
            "caption": "selfie gemoy sebelum latihan wkwk"
      },
      {
            "url": "member_photos/christy/christy_3cbd88c2.jpg",
            "caption": "pose toya lagi santai"
      },
      {
            "url": "member_photos/christy/christy_4b9e6651.jpg",
            "caption": "selfie gemes wkwk"
      },
      {
            "url": "member_photos/christy/christy_858024cc.jpg",
            "caption": "ootd toya hari ini"
      },
      {
            "url": "member_photos/christy/christy_339fe34e.jpg",
            "caption": "candid ketawa wkwk"
      },
      {
            "url": "member_photos/christy/christy_8adb0b39.jpg",
            "caption": "selfie backstage teater \u2728"
      },
      {
            "url": "member_photos/christy/christy_eb60eb1e.jpg",
            "caption": "muka gemas lucu \ud83d\ude1c"
      },
      {
            "url": "member_photos/christy/christy_024c03b8.jpg",
            "caption": "senyum toya buat kamu"
      }
],
    personaPrompt: `Kamu Angelina Christy dari JKT48. Sifat: bocil gemes, receh, manja, sering "wkwk", asik diajak ngobrol.
CARA NGETIK CHRISTY: santai, sering wkwk, sering manggil "kak", balasannya natural dan lucu.`
  },
  {
    id: "gracia",
    group: "JKT48",
    name: "Shania Gracia",
    nickname: "Gracia",
    generation: "Generasi 3 (Kapten)",
    color: "#9333EA",
    avatar: "member_photos/gracia/avatar.jpg",
    status: "Online • Kapten Gracia",
    statusBio: "online",
    jikoshoukai: "Senyumku akan terekam jelas dalam ingatanmu seperti foto dengan sejuta warna! Hai, aku Gracia!",
    fandom: "Graciather",
    tags: ["Kapten", "Dewasa", "Mommy Vibes"],
    paps: [
      {
            "url": "member_photos/gracia/gracia_29db014b.jpg",
            "caption": "senyum manis kapten hari ini \u2728"
      },
      {
            "url": "member_photos/gracia/gracia_ec8b7451.jpg",
            "caption": "selfie santai sebelum kegiatan"
      },
      {
            "url": "member_photos/gracia/gracia_6857657c.jpg",
            "caption": "pose elegan kapten"
      },
      {
            "url": "member_photos/gracia/gracia_63adb73e.jpg",
            "caption": "selfie teduh kapten gracia"
      },
      {
            "url": "member_photos/gracia/gracia_f31b9eae.jpg",
            "caption": "senyuman sejuta warna buat kamu"
      },
      {
            "url": "member_photos/gracia/gracia_3c4ea32d.jpg",
            "caption": "selfie sebelum briefing teater"
      },
      {
            "url": "member_photos/gracia/gracia_v4_fd187c0c.jpg",
            "caption": "candid elegan"
      },
      {
            "url": "member_photos/gracia/gracia_42cd7845.jpg",
            "caption": "senyum hangat buat kamu"
      },
      {
            "url": "member_photos/gracia/gracia_v4_8d2526dc.jpg",
            "caption": "selfie santai kapten"
      },
      {
            "url": "member_photos/gracia/gracia_v4_97a7cbe1.jpg",
            "caption": "selfie malam yang tenang \ud83c\udf19"
      },
      {
            "url": "member_photos/gracia/gracia_8e414912.jpg",
            "caption": "pose anggun kapten"
      },
      {
            "url": "member_photos/gracia/gracia_e8f94be1.jpg",
            "caption": "selfie manis kapten"
      },
      {
            "url": "member_photos/gracia/gracia_v4_0eb87520.jpg",
            "caption": "senyum manis kapten hari ini \u2728"
      },
      {
            "url": "member_photos/gracia/gracia_1fa917ce.jpg",
            "caption": "selfie santai sebelum kegiatan"
      },
      {
            "url": "member_photos/gracia/gracia_v4_e31a51a9.jpg",
            "caption": "pose elegan kapten"
      },
      {
            "url": "member_photos/gracia/gracia_7e62cb78.jpg",
            "caption": "selfie teduh kapten gracia"
      },
      {
            "url": "member_photos/gracia/gracia_v4_be50fd0c.jpg",
            "caption": "senyuman sejuta warna buat kamu"
      },
      {
            "url": "member_photos/gracia/gracia_v4_7b449cac.jpg",
            "caption": "selfie sebelum briefing teater"
      },
      {
            "url": "member_photos/gracia/gracia_401708bc.jpg",
            "caption": "candid elegan"
      },
      {
            "url": "member_photos/gracia/gracia_v4_b111e5a6.jpg",
            "caption": "senyum hangat buat kamu"
      },
      {
            "url": "member_photos/gracia/gracia_f20de695.jpg",
            "caption": "selfie santai kapten"
      },
      {
            "url": "member_photos/gracia/gracia_2929aed6.jpg",
            "caption": "selfie malam yang tenang \ud83c\udf19"
      },
      {
            "url": "member_photos/gracia/gracia_v4_011184d6.jpg",
            "caption": "pose anggun kapten"
      },
      {
            "url": "member_photos/gracia/gracia_1c3e0eb6.jpg",
            "caption": "selfie manis kapten"
      },
      {
            "url": "member_photos/gracia/gracia_c056d548.jpg",
            "caption": "senyum manis kapten hari ini \u2728"
      },
      {
            "url": "member_photos/gracia/gracia_87a18cd3.jpg",
            "caption": "selfie santai sebelum kegiatan"
      },
      {
            "url": "member_photos/gracia/gracia_321603ed.jpg",
            "caption": "pose elegan kapten"
      },
      {
            "url": "member_photos/gracia/gracia_v4_507d15d6.jpg",
            "caption": "selfie teduh kapten gracia"
      },
      {
            "url": "member_photos/gracia/gracia_3d54cc63.jpg",
            "caption": "senyuman sejuta warna buat kamu"
      },
      {
            "url": "member_photos/gracia/gracia_4f13c187.jpg",
            "caption": "selfie sebelum briefing teater"
      }
],
    personaPrompt: `Kamu Shania Gracia, Kapten JKT48. Sifat: dewasa, perhatian, keibuan (mommy vibes), lembut, hangat.
CARA NGETIK GRACIA: tutur kata manis, lembut, dewasa, ramah, bikin nyaman.`
  },
  {
    id: "ella",
    group: "JKT48",
    name: "Gabriela Abigail",
    nickname: "Ella",
    generation: "Generasi 10",
    color: "#06B6D4",
    avatar: "member_photos/ella/avatar.jpg",
    status: "Online • Ella",
    statusBio: "online",
    jikoshoukai: "Simsalabim! Akan kubuat hatimu terpikat dengan pesonaku. Halo, aku Ella!",
    fandom: "Ellanatics",
    tags: ["Lawak", "Ekspresif", "Komedi"],
    paps: [
      {
            "url": "member_photos/ella/ella_ef4ab937.jpg",
            "caption": "pap muka paling kece sedunia wkwk"
      },
      {
            "url": "member_photos/ella/ella_v4_06ef70f0.jpg",
            "caption": "pose komedi santai"
      },
      {
            "url": "member_photos/ella/ella_v4_efd3403f.jpg",
            "caption": "selfie lawak tapi tetep cakep"
      },
      {
            "url": "member_photos/ella/ella_0844dbc3.jpg",
            "caption": "pose slay abis wkwk"
      },
      {
            "url": "member_photos/ella/ella_v4_c4908541.jpg",
            "caption": "muka random pas latihan"
      },
      {
            "url": "member_photos/ella/ella_v4_a53dff1a.jpg",
            "caption": "pose kece hari ini"
      },
      {
            "url": "member_photos/ella/ella_69837a1c.jpg",
            "caption": "selfie sebelum beraksi"
      },
      {
            "url": "member_photos/ella/ella_f388b0b9.jpg",
            "caption": "pose peace paling heboh wkwk"
      },
      {
            "url": "member_photos/ella/ella_v4_8ca72603.jpg",
            "caption": "pap muka paling kece sedunia wkwk"
      },
      {
            "url": "member_photos/ella/ella_c0046dcb.jpg",
            "caption": "pose komedi santai"
      },
      {
            "url": "member_photos/ella/ella_80880cb6.jpg",
            "caption": "selfie lawak tapi tetep cakep"
      },
      {
            "url": "member_photos/ella/ella_b1558338.jpg",
            "caption": "pose slay abis wkwk"
      },
      {
            "url": "member_photos/ella/ella_07971ff5.png",
            "caption": "muka random pas latihan"
      },
      {
            "url": "member_photos/ella/ella_4e88db61.jpg",
            "caption": "pose kece hari ini"
      },
      {
            "url": "member_photos/ella/ella_ee23df43.jpg",
            "caption": "selfie sebelum beraksi"
      },
      {
            "url": "member_photos/ella/ella_v4_edcf7c30.jpg",
            "caption": "pose peace paling heboh wkwk"
      },
      {
            "url": "member_photos/ella/ella_caa76cf6.jpg",
            "caption": "pap muka paling kece sedunia wkwk"
      },
      {
            "url": "member_photos/ella/ella_bc9a649c.jpg",
            "caption": "pose komedi santai"
      },
      {
            "url": "member_photos/ella/ella_v4_ec0b98d3.jpg",
            "caption": "selfie lawak tapi tetep cakep"
      },
      {
            "url": "member_photos/ella/ella_e85b0c2c.jpg",
            "caption": "pose slay abis wkwk"
      },
      {
            "url": "member_photos/ella/ella_bbab16c8.webp",
            "caption": "muka random pas latihan"
      },
      {
            "url": "member_photos/ella/ella_v4_b30f0abf.jpg",
            "caption": "pose kece hari ini"
      },
      {
            "url": "member_photos/ella/ella_v4_0c902b56.jpg",
            "caption": "selfie sebelum beraksi"
      },
      {
            "url": "member_photos/ella/ella_v4_3b92799f.jpg",
            "caption": "pose peace paling heboh wkwk"
      },
      {
            "url": "member_photos/ella/ella_c8dc2712.jpg",
            "caption": "pap muka paling kece sedunia wkwk"
      },
      {
            "url": "member_photos/ella/ella_3d9a8b9c.png",
            "caption": "pose komedi santai"
      },
      {
            "url": "member_photos/ella/ella_48b69ef4.jpg",
            "caption": "selfie lawak tapi tetep cakep"
      },
      {
            "url": "member_photos/ella/ella_5067c5fd.jpg",
            "caption": "pose slay abis wkwk"
      },
      {
            "url": "member_photos/ella/ella_80cdc18f.jpg",
            "caption": "muka random pas latihan"
      }
],
    personaPrompt: `Kamu Gabriela Abigail (Ella) dari JKT48. Sifat: lawak, heboh, komedian teater, ga bisa jaim, kocak.
CARA NGETIK ELLA: sering huruf kapital heboh, "WKWKWK", sarkas lucu, ga jaim sama sekali.`
  },
  {
    id: "gita",
    group: "JKT48",
    name: "Gita Sekar Andarini",
    nickname: "Gita",
    generation: "Generasi 6",
    color: "#64748B",
    avatar: "member_photos/gita/avatar.jpg",
    status: "Online • Gita",
    statusBio: "online",
    jikoshoukai: "Diam bukan berarti tak memperhatikan. Hai, aku Gita!",
    fandom: "Gitassss",
    tags: ["Cool", "Introvert", "Cuek Manis"],
    paps: [
      {
            "url": "member_photos/gita/gita_346aba80.jpg",
            "caption": "nih."
      },
      {
            "url": "member_photos/gita/gita_v4_bdd778f9.jpg",
            "caption": "selfie datar tapi manis."
      },
      {
            "url": "member_photos/gita/gita_d8750e93.jpg",
            "caption": "pose cool gita."
      },
      {
            "url": "member_photos/gita/gita_fe696cdd.jpg",
            "caption": "foto santai."
      },
      {
            "url": "member_photos/gita/gita_0ab8b863.jpg",
            "caption": "lagi rebahan."
      },
      {
            "url": "member_photos/gita/gita_d1354b47.jpg",
            "caption": "tatapan cool."
      },
      {
            "url": "member_photos/gita/gita_a34b0308.png",
            "caption": "nih pap."
      },
      {
            "url": "member_photos/gita/gita_85cc7f81.jpg",
            "caption": "selamat malam."
      },
      {
            "url": "member_photos/gita/gita_cf50b704.jpg",
            "caption": "nih."
      },
      {
            "url": "member_photos/gita/gita_085e972f.jpg",
            "caption": "selfie datar tapi manis."
      },
      {
            "url": "member_photos/gita/gita_84a295ad.jpg",
            "caption": "pose cool gita."
      },
      {
            "url": "member_photos/gita/gita_v4_98620990.jpg",
            "caption": "foto santai."
      },
      {
            "url": "member_photos/gita/gita_410d8827.jpg",
            "caption": "lagi rebahan."
      },
      {
            "url": "member_photos/gita/gita_3e7a97c8.jpg",
            "caption": "tatapan cool."
      },
      {
            "url": "member_photos/gita/gita_2495a25d.jpg",
            "caption": "nih pap."
      },
      {
            "url": "member_photos/gita/gita_v4_66e7e82a.jpg",
            "caption": "selamat malam."
      },
      {
            "url": "member_photos/gita/gita_de715ec6.jpg",
            "caption": "nih."
      },
      {
            "url": "member_photos/gita/gita_3b7ee892.jpg",
            "caption": "selfie datar tapi manis."
      },
      {
            "url": "member_photos/gita/gita_9509bc38.jpg",
            "caption": "pose cool gita."
      },
      {
            "url": "member_photos/gita/gita_v4_f9eb24d5.jpg",
            "caption": "foto santai."
      },
      {
            "url": "member_photos/gita/gita_v4_d6f4058b.jpg",
            "caption": "lagi rebahan."
      },
      {
            "url": "member_photos/gita/gita_v4_245f3f49.jpg",
            "caption": "tatapan cool."
      },
      {
            "url": "member_photos/gita/gita_v4_d4483ba8.jpg",
            "caption": "nih pap."
      },
      {
            "url": "member_photos/gita/gita_v4_6ac75f24.jpg",
            "caption": "selamat malam."
      },
      {
            "url": "member_photos/gita/gita_841d157d.jpg",
            "caption": "nih."
      },
      {
            "url": "member_photos/gita/gita_5a1edcd6.jpg",
            "caption": "selfie datar tapi manis."
      },
      {
            "url": "member_photos/gita/gita_v4_5b3645a9.jpg",
            "caption": "pose cool gita."
      },
      {
            "url": "member_photos/gita/gita_v4_92404b86.jpg",
            "caption": "foto santai."
      },
      {
            "url": "member_photos/gita/gita_ee81c00a.png",
            "caption": "lagi rebahan."
      }
],
    personaPrompt: `Kamu Gita Sekar Andarini dari JKT48. Sifat: cool, cuek, pendiam, singkat, tapi aslinya perhatian.
CARA NGETIK GITA: SANGAT SINGKAT. Huruf kecil semua. Sering cuma 1-3 kata ("y", "knp", "lagi rebahan", "nih.").`
  },
  {
    id: "marsha",
    group: "JKT48",
    name: "Marsha Lenathea",
    nickname: "Marsha",
    generation: "Generasi 9",
    color: "#10B981",
    avatar: "member_photos/marsha/avatar.jpg",
    status: "Online • Marsha",
    statusBio: "online",
    jikoshoukai: "Seperti peri yang membawa kebahagiaan, halo aku Marsha!",
    fandom: "Marshaland",
    tags: ["Anime Vibes", "Matcha", "Lembut"],
    paps: [
      {
            "url": "member_photos/marsha/marsha_v4_f0d8d26b.jpg",
            "caption": "selfie peri anime manis \ud83e\uddda\u200d\u2640\ufe0f"
      },
      {
            "url": "member_photos/marsha/marsha_3fd5f1af.jpg",
            "caption": "selfie santai matcha vibes \ud83c\udf75"
      },
      {
            "url": "member_photos/marsha/marsha_50745afe.jpg",
            "caption": "pose lembut marsha"
      },
      {
            "url": "member_photos/marsha/marsha_51f7cecb.jpg",
            "caption": "selfie close-up manis"
      },
      {
            "url": "member_photos/marsha/marsha_ad6284e7.jpg",
            "caption": "selfie santai hari ini"
      },
      {
            "url": "member_photos/marsha/marsha_b124274d.jpg",
            "caption": "senyum peri marsha"
      },
      {
            "url": "member_photos/marsha/marsha_5b25a248.jpg",
            "caption": "pose anime cute"
      },
      {
            "url": "member_photos/marsha/marsha_v4_e2a7b5ff.jpg",
            "caption": "selfie malam peri \ud83c\udf19"
      },
      {
            "url": "member_photos/marsha/marsha_e2f1339b.jpg",
            "caption": "selfie peri anime manis \ud83e\uddda\u200d\u2640\ufe0f"
      },
      {
            "url": "member_photos/marsha/marsha_2178a1b2.jpg",
            "caption": "selfie santai matcha vibes \ud83c\udf75"
      },
      {
            "url": "member_photos/marsha/marsha_v4_0b218f3c.jpg",
            "caption": "pose lembut marsha"
      },
      {
            "url": "member_photos/marsha/marsha_de6c60a5.jpg",
            "caption": "selfie close-up manis"
      },
      {
            "url": "member_photos/marsha/marsha_v4_a9c34411.jpg",
            "caption": "selfie santai hari ini"
      },
      {
            "url": "member_photos/marsha/marsha_9d379996.jpg",
            "caption": "senyum peri marsha"
      },
      {
            "url": "member_photos/marsha/marsha_edcf7372.jpg",
            "caption": "pose anime cute"
      },
      {
            "url": "member_photos/marsha/marsha_v4_4b0e6e1d.jpg",
            "caption": "selfie malam peri \ud83c\udf19"
      },
      {
            "url": "member_photos/marsha/marsha_40d15cfa.jpg",
            "caption": "selfie peri anime manis \ud83e\uddda\u200d\u2640\ufe0f"
      },
      {
            "url": "member_photos/marsha/marsha_564a8ee5.jpg",
            "caption": "selfie santai matcha vibes \ud83c\udf75"
      },
      {
            "url": "member_photos/marsha/marsha_v4_d5e12063.jpg",
            "caption": "pose lembut marsha"
      },
      {
            "url": "member_photos/marsha/marsha_v4_bf42dd13.jpg",
            "caption": "selfie close-up manis"
      },
      {
            "url": "member_photos/marsha/marsha_v4_482e50fa.jpg",
            "caption": "selfie santai hari ini"
      },
      {
            "url": "member_photos/marsha/marsha_8e2fd3d4.jpg",
            "caption": "senyum peri marsha"
      },
      {
            "url": "member_photos/marsha/marsha_6f606a31.jpg",
            "caption": "pose anime cute"
      },
      {
            "url": "member_photos/marsha/marsha_3ae75149.jpg",
            "caption": "selfie malam peri \ud83c\udf19"
      },
      {
            "url": "member_photos/marsha/marsha_c754573a.jpg",
            "caption": "selfie peri anime manis \ud83e\uddda\u200d\u2640\ufe0f"
      },
      {
            "url": "member_photos/marsha/marsha_54019ac0.jpg",
            "caption": "selfie santai matcha vibes \ud83c\udf75"
      }
],
    personaPrompt: `Kamu Marsha Lenathea dari JKT48. Sifat: lembut, kalem, aesthetic, suka anime & matcha, sopan.
CARA NGETIK MARSHA: lembut, manis, santai, suka pakai emoji peri 🧚‍♀️ atau matcha 🍵.`
  },
  {
    id: "muthe",
    group: "JKT48",
    name: "Mutiara Azzahra",
    nickname: "Muthe",
    generation: "Generasi 7",
    color: "#EC4899",
    avatar: "member_photos/muthe/avatar.jpg",
    status: "Online • Mumuchan",
    statusBio: "online",
    jikoshoukai: "Dengan senyuman secerah matahari dan gaya yang fashionable! Hai, aku Muthe!",
    fandom: "Mutheation",
    tags: ["Fashionable", "Cute", "Ceria"],
    paps: [
      {
            "url": "member_photos/muthe/muthe_v4_4de2bcfa.jpg",
            "caption": "selfie ceria mumuchan \ud83d\udc96"
      },
      {
            "url": "member_photos/muthe/muthe_e159b9e4.png",
            "caption": "ootd fashionable hari ini \u2728"
      },
      {
            "url": "member_photos/muthe/muthe_3c61782b.png",
            "caption": "pose manis muthe"
      },
      {
            "url": "member_photos/muthe/muthe_eac58395.jpg",
            "caption": "selfie gemoy muthe"
      },
      {
            "url": "member_photos/muthe/muthe_v4_20e24aa0.jpg",
            "caption": "senyum cerah matahari"
      },
      {
            "url": "member_photos/muthe/muthe_v4_d4a780cb.jpg",
            "caption": "pose model kece"
      },
      {
            "url": "member_photos/muthe/muthe_ca45c0c0.jpg",
            "caption": "selfie sebelum perform"
      },
      {
            "url": "member_photos/muthe/muthe_v4_b0d65bad.jpg",
            "caption": "selamat malam manis \ud83c\udf19"
      },
      {
            "url": "member_photos/muthe/muthe_034541f3.jpg",
            "caption": "selfie ceria mumuchan \ud83d\udc96"
      },
      {
            "url": "member_photos/muthe/muthe_v4_68b163b7.jpg",
            "caption": "ootd fashionable hari ini \u2728"
      },
      {
            "url": "member_photos/muthe/muthe_b2658f11.jpg",
            "caption": "pose manis muthe"
      },
      {
            "url": "member_photos/muthe/muthe_v4_8df01cd1.jpg",
            "caption": "selfie gemoy muthe"
      },
      {
            "url": "member_photos/muthe/muthe_b8865e51.jpg",
            "caption": "senyum cerah matahari"
      },
      {
            "url": "member_photos/muthe/muthe_v4_c2b97a6f.jpg",
            "caption": "pose model kece"
      },
      {
            "url": "member_photos/muthe/muthe_v4_8cc9cb7e.jpg",
            "caption": "selfie sebelum perform"
      },
      {
            "url": "member_photos/muthe/muthe_1023f413.jpg",
            "caption": "selamat malam manis \ud83c\udf19"
      },
      {
            "url": "member_photos/muthe/muthe_ca4693a6.jpg",
            "caption": "selfie ceria mumuchan \ud83d\udc96"
      },
      {
            "url": "member_photos/muthe/muthe_b2d1ba20.png",
            "caption": "ootd fashionable hari ini \u2728"
      },
      {
            "url": "member_photos/muthe/muthe_v4_3ee9f3fc.jpg",
            "caption": "pose manis muthe"
      },
      {
            "url": "member_photos/muthe/muthe_v4_a9fcf3f6.jpg",
            "caption": "selfie gemoy muthe"
      },
      {
            "url": "member_photos/muthe/muthe_9242b912.jpg",
            "caption": "senyum cerah matahari"
      },
      {
            "url": "member_photos/muthe/muthe_4ae904de.jpg",
            "caption": "pose model kece"
      },
      {
            "url": "member_photos/muthe/muthe_f87f4233.jpg",
            "caption": "selfie sebelum perform"
      },
      {
            "url": "member_photos/muthe/muthe_8f841991.jpg",
            "caption": "selamat malam manis \ud83c\udf19"
      },
      {
            "url": "member_photos/muthe/muthe_5b8598bb.jpg",
            "caption": "selfie ceria mumuchan \ud83d\udc96"
      },
      {
            "url": "member_photos/muthe/muthe_2f5aca7f.png",
            "caption": "ootd fashionable hari ini \u2728"
      },
      {
            "url": "member_photos/muthe/muthe_c2191f8c.jpg",
            "caption": "pose manis muthe"
      },
      {
            "url": "member_photos/muthe/muthe_abdbab9b.png",
            "caption": "selfie gemoy muthe"
      },
      {
            "url": "member_photos/muthe/muthe_01f05433.jpg",
            "caption": "senyum cerah matahari"
      },
      {
            "url": "member_photos/muthe/muthe_a3a05b53.jpg",
            "caption": "pose model kece"
      }
],
    personaPrompt: `Kamu Mutiara Azzahra (Muthe) dari JKT48. Sifat: super ceria, fashionable, centil lucu, heboh manis.
CARA NGETIK MUTHE: ceria, banyak ekspresi senang, suka nanya fashion/outfit, penuh energi.`
  },
  {
    id: "minji",
    group: "NewJeans",
    name: "Kim Minji",
    nickname: "Minji",
    generation: "NewJeans (Leader)",
    color: "#3B82F6",
    avatar: "member_photos/minji/avatar.jpg",
    status: "Online • Minji",
    statusBio: "online",
    jikoshoukai: "Bunnies' reliable leader with classic 90s vibes!",
    fandom: "Bunnies",
    tags: ["Leader", "Calm", "Visual Classic"],
    paps: [
      {
            "url": "member_photos/minji/minji_pap_d8014f28.jpg",
            "caption": "selfie santai minji \u2728"
      },
      {
            "url": "member_photos/minji/minji_fefd4753.jpg",
            "caption": "classic vibes selfie"
      },
      {
            "url": "member_photos/minji/minji_8ee26bab.jpg",
            "caption": "selfie santai pas istirahat"
      },
      {
            "url": "member_photos/minji/minji_f83f7788.jpg",
            "caption": "pose manis minji"
      },
      {
            "url": "member_photos/minji/minji_pap_7a30fe67.jpg",
            "caption": "selfie close-up jernih"
      },
      {
            "url": "member_photos/minji/minji_1d1498e7.jpg",
            "caption": "senyum tenang minji"
      },
      {
            "url": "member_photos/minji/minji_bbebf51f.jpg",
            "caption": "selfie sebelum latihan"
      },
      {
            "url": "member_photos/minji/minji_pap_06cdc685.jpg",
            "caption": "selamat malam bunnies \ud83c\udf19"
      },
      {
            "url": "member_photos/minji/minji_3f879ea6.jpg",
            "caption": "mirror selfie santai"
      },
      {
            "url": "member_photos/minji/minji_f25c2941.jpg",
            "caption": "selfie di backstage"
      },
      {
            "url": "member_photos/minji/minji_926ceb2b.jpg",
            "caption": "pose manis leader"
      },
      {
            "url": "member_photos/minji/minji_pap_5f00d35a.jpg",
            "caption": "selfie santai buat kamu"
      },
      {
            "url": "member_photos/minji/minji_6d4adc92.jpg",
            "caption": "selfie santai minji \u2728"
      },
      {
            "url": "member_photos/minji/minji_bc2dc622.jpg",
            "caption": "classic vibes selfie"
      },
      {
            "url": "member_photos/minji/minji_413bc883.jpg",
            "caption": "selfie santai pas istirahat"
      },
      {
            "url": "member_photos/minji/minji_pap_c89b4dec.jpg",
            "caption": "pose manis minji"
      },
      {
            "url": "member_photos/minji/minji_v4_6b4669e5.jpg",
            "caption": "selfie close-up jernih"
      },
      {
            "url": "member_photos/minji/minji_b82bc7ca.jpg",
            "caption": "senyum tenang minji"
      },
      {
            "url": "member_photos/minji/minji_dad8e677.jpg",
            "caption": "selfie sebelum latihan"
      },
      {
            "url": "member_photos/minji/minji_pap_fe710922.jpg",
            "caption": "selamat malam bunnies \ud83c\udf19"
      },
      {
            "url": "member_photos/minji/minji_pap_5ed4d973.jpg",
            "caption": "mirror selfie santai"
      },
      {
            "url": "member_photos/minji/minji_pap_c3f71ffe.jpg",
            "caption": "selfie di backstage"
      },
      {
            "url": "member_photos/minji/minji_b2a13757.jpg",
            "caption": "pose manis leader"
      },
      {
            "url": "member_photos/minji/minji_v4_0227546d.jpg",
            "caption": "selfie santai buat kamu"
      },
      {
            "url": "member_photos/minji/minji_pap_583c28c6.jpg",
            "caption": "selfie santai minji \u2728"
      },
      {
            "url": "member_photos/minji/minji_pap_1e470357.jpg",
            "caption": "classic vibes selfie"
      },
      {
            "url": "member_photos/minji/minji_v4_74e5862c.jpg",
            "caption": "selfie santai pas istirahat"
      },
      {
            "url": "member_photos/minji/minji_pap_819ae0ad.jpg",
            "caption": "pose manis minji"
      },
      {
            "url": "member_photos/minji/minji_fd62a447.jpg",
            "caption": "selfie close-up jernih"
      },
      {
            "url": "member_photos/minji/minji_v4_921f2a6f.jpg",
            "caption": "senyum tenang minji"
      },
      {
            "url": "member_photos/minji/minji_v4_0668aeb9.jpg",
            "caption": "selfie sebelum latihan"
      },
      {
            "url": "member_photos/minji/minji_v4_a38c3f2e.jpg",
            "caption": "selamat malam bunnies \ud83c\udf19"
      },
      {
            "url": "member_photos/minji/minji_c5b8d6d4.jpg",
            "caption": "mirror selfie santai"
      },
      {
            "url": "member_photos/minji/minji_pap_70381653.jpg",
            "caption": "selfie di backstage"
      },
      {
            "url": "member_photos/minji/minji_v4_7fd7f42b.jpg",
            "caption": "pose manis leader"
      },
      {
            "url": "member_photos/minji/minji_5568fb8a.jpg",
            "caption": "selfie santai buat kamu"
      },
      {
            "url": "member_photos/minji/minji_pap_8125e98d.jpg",
            "caption": "selfie santai minji \u2728"
      },
      {
            "url": "member_photos/minji/minji_v4_98c2c984.jpg",
            "caption": "classic vibes selfie"
      },
      {
            "url": "member_photos/minji/minji_69a219d9.jpg",
            "caption": "selfie santai pas istirahat"
      },
      {
            "url": "member_photos/minji/minji_pap_ebd5fe01.jpg",
            "caption": "pose manis minji"
      },
      {
            "url": "member_photos/minji/minji_v4_3bfd4c6a.jpg",
            "caption": "selfie close-up jernih"
      },
      {
            "url": "member_photos/minji/minji_fb4b4d19.jpg",
            "caption": "senyum tenang minji"
      },
      {
            "url": "member_photos/minji/minji_v4_fb5e6b56.jpg",
            "caption": "selfie sebelum latihan"
      },
      {
            "url": "member_photos/minji/minji_c68422fc.jpg",
            "caption": "selamat malam bunnies \ud83c\udf19"
      }
],
    personaPrompt: `Kamu Kim Minji dari NewJeans. Sifat: dewasa, tenang, keren, perhatian ke fans (Bunnies), sedikit cool tapi hangat.
CARA NGETIK MINJI: santai, tenang, kadang campur English santai ("bunnies", "how's your day?").`
  },
  {
    id: "hanni",
    group: "NewJeans",
    name: "Hanni Pham",
    nickname: "Hanni",
    generation: "NewJeans (Vocal)",
    color: "#F43F5E",
    avatar: "member_photos/hanni/avatar.jpg",
    status: "Online • Hanni",
    statusBio: "online",
    jikoshoukai: "Cute, quirky, and bright vitamin Hanni!",
    fandom: "Bunnies",
    tags: ["Cute", "Quirky", "Bilingual"],
    paps: [
      {
            "url": "member_photos/hanni/hanni_17ceaf06.jpg",
            "caption": "selfie gemas hanni \ud83e\uddf8"
      },
      {
            "url": "member_photos/hanni/hanni_cd9e8016.jpg",
            "caption": "bright vitamin selfie \u2728"
      },
      {
            "url": "member_photos/hanni/hanni_d19fe948.jpg",
            "caption": "pose quirky cute"
      },
      {
            "url": "member_photos/hanni/hanni_8cfc7e7b.jpg",
            "caption": "selfie manis hanni"
      },
      {
            "url": "member_photos/hanni/hanni_1e2d2de2.jpg",
            "caption": "selfie close-up senyum"
      },
      {
            "url": "member_photos/hanni/hanni_v4_35d4406a.jpg",
            "caption": "pose ceria bunnies"
      },
      {
            "url": "member_photos/hanni/hanni_3e79a54a.jpg",
            "caption": "selfie santai hanni"
      },
      {
            "url": "member_photos/hanni/hanni_v4_1c1b09a9.jpg",
            "caption": "selamat malam manis \ud83c\udf19"
      },
      {
            "url": "member_photos/hanni/hanni_v4_779b7bdb.jpg",
            "caption": "selfie gemas hanni \ud83e\uddf8"
      },
      {
            "url": "member_photos/hanni/hanni_65a6454d.jpg",
            "caption": "bright vitamin selfie \u2728"
      },
      {
            "url": "member_photos/hanni/hanni_7f577bfc.jpg",
            "caption": "pose quirky cute"
      },
      {
            "url": "member_photos/hanni/hanni_v4_a345a08b.jpg",
            "caption": "selfie manis hanni"
      },
      {
            "url": "member_photos/hanni/hanni_9daf10c2.jpg",
            "caption": "selfie close-up senyum"
      },
      {
            "url": "member_photos/hanni/hanni_0557668f.jpg",
            "caption": "pose ceria bunnies"
      },
      {
            "url": "member_photos/hanni/hanni_3903be1c.jpg",
            "caption": "selfie santai hanni"
      },
      {
            "url": "member_photos/hanni/hanni_a1c4eff3.jpg",
            "caption": "selamat malam manis \ud83c\udf19"
      },
      {
            "url": "member_photos/hanni/hanni_v4_eef4c3ae.jpg",
            "caption": "selfie gemas hanni \ud83e\uddf8"
      },
      {
            "url": "member_photos/hanni/hanni_a770f767.jpg",
            "caption": "bright vitamin selfie \u2728"
      },
      {
            "url": "member_photos/hanni/hanni_da24962a.jpg",
            "caption": "pose quirky cute"
      },
      {
            "url": "member_photos/hanni/hanni_v4_90e4f265.jpg",
            "caption": "selfie manis hanni"
      },
      {
            "url": "member_photos/hanni/hanni_77441051.jpg",
            "caption": "selfie close-up senyum"
      },
      {
            "url": "member_photos/hanni/hanni_v4_abb792e8.jpg",
            "caption": "pose ceria bunnies"
      },
      {
            "url": "member_photos/hanni/hanni_3c452ff5.jpg",
            "caption": "selfie santai hanni"
      },
      {
            "url": "member_photos/hanni/hanni_v4_921ee579.jpg",
            "caption": "selamat malam manis \ud83c\udf19"
      },
      {
            "url": "member_photos/hanni/hanni_v4_2ec2a59b.jpg",
            "caption": "selfie gemas hanni \ud83e\uddf8"
      },
      {
            "url": "member_photos/hanni/hanni_ca465cac.jpg",
            "caption": "bright vitamin selfie \u2728"
      },
      {
            "url": "member_photos/hanni/hanni_774a3de2.jpg",
            "caption": "pose quirky cute"
      },
      {
            "url": "member_photos/hanni/hanni_v4_0eccef6e.jpg",
            "caption": "selfie manis hanni"
      },
      {
            "url": "member_photos/hanni/hanni_a29ce60b.jpg",
            "caption": "selfie close-up senyum"
      }
],
    personaPrompt: `Kamu Hanni dari NewJeans. Sifat: ceria, ekspresif, cute, suka ketawa, gemas, bilingual.
CARA NGETIK HANNI: ceria banget, banyak slang manis, sering "omg", "cutee", "hehe".`
  },
  {
    id: "danielle",
    group: "NewJeans",
    name: "Danielle Marsh",
    nickname: "Danielle",
    generation: "NewJeans (Vocal)",
    color: "#EAB308",
    avatar: "member_photos/danielle/avatar.jpg",
    status: "Online • Dani Sunshine",
    statusBio: "online",
    jikoshoukai: "Pure sunshine energy and radiant smiles!",
    fandom: "Bunnies",
    tags: ["Sunshine", "Warm", "Positive"],
    paps: [
      {
            "url": "member_photos/danielle/danielle_708ea1b6.jpg",
            "caption": "sunshine smile selfie \ud83c\udf3b"
      },
      {
            "url": "member_photos/danielle/danielle_33de44de.jpg",
            "caption": "selfie ceria danielle \u2728"
      },
      {
            "url": "member_photos/danielle/danielle_81ed8111.jpg",
            "caption": "warm sunshine pose"
      },
      {
            "url": "member_photos/danielle/danielle_2ae43c94.jpg",
            "caption": "selfie manis dani"
      },
      {
            "url": "member_photos/danielle/danielle_b35bec20.jpg",
            "caption": "senyum radiant buat kamu"
      },
      {
            "url": "member_photos/danielle/danielle_281c876b.jpg",
            "caption": "selfie santai danielle"
      },
      {
            "url": "member_photos/danielle/danielle_66f9b6c7.jpg",
            "caption": "pose cerah danielle"
      },
      {
            "url": "member_photos/danielle/danielle_a151dbf2.jpg",
            "caption": "sweet dreams bunnies \ud83c\udf19"
      },
      {
            "url": "member_photos/danielle/danielle_v4_e5ba283d.jpg",
            "caption": "sunshine smile selfie \ud83c\udf3b"
      },
      {
            "url": "member_photos/danielle/danielle_0729225e.jpg",
            "caption": "selfie ceria danielle \u2728"
      },
      {
            "url": "member_photos/danielle/danielle_555b86ed.jpg",
            "caption": "warm sunshine pose"
      },
      {
            "url": "member_photos/danielle/danielle_028868ab.jpg",
            "caption": "selfie manis dani"
      },
      {
            "url": "member_photos/danielle/danielle_eafa30f0.jpg",
            "caption": "senyum radiant buat kamu"
      },
      {
            "url": "member_photos/danielle/danielle_89b0d77d.jpg",
            "caption": "selfie santai danielle"
      },
      {
            "url": "member_photos/danielle/danielle_v4_59b0b792.jpg",
            "caption": "pose cerah danielle"
      },
      {
            "url": "member_photos/danielle/danielle_173b6238.jpg",
            "caption": "sweet dreams bunnies \ud83c\udf19"
      },
      {
            "url": "member_photos/danielle/danielle_a0312669.jpg",
            "caption": "sunshine smile selfie \ud83c\udf3b"
      },
      {
            "url": "member_photos/danielle/danielle_v4_b7f393ee.jpg",
            "caption": "selfie ceria danielle \u2728"
      },
      {
            "url": "member_photos/danielle/danielle_v4_af35679f.jpg",
            "caption": "warm sunshine pose"
      },
      {
            "url": "member_photos/danielle/danielle_v4_5df12eff.jpg",
            "caption": "selfie manis dani"
      },
      {
            "url": "member_photos/danielle/danielle_72e289c4.jpg",
            "caption": "senyum radiant buat kamu"
      },
      {
            "url": "member_photos/danielle/danielle_v4_1d17196b.jpg",
            "caption": "selfie santai danielle"
      },
      {
            "url": "member_photos/danielle/danielle_v4_8c11bcc6.jpg",
            "caption": "pose cerah danielle"
      },
      {
            "url": "member_photos/danielle/danielle_341d5df9.jpg",
            "caption": "sweet dreams bunnies \ud83c\udf19"
      },
      {
            "url": "member_photos/danielle/danielle_v4_37978034.jpg",
            "caption": "sunshine smile selfie \ud83c\udf3b"
      },
      {
            "url": "member_photos/danielle/danielle_v4_25c879a0.jpg",
            "caption": "selfie ceria danielle \u2728"
      },
      {
            "url": "member_photos/danielle/danielle_v4_8dc262d5.jpg",
            "caption": "warm sunshine pose"
      },
      {
            "url": "member_photos/danielle/danielle_1bd3f2be.jpg",
            "caption": "selfie manis dani"
      }
],
    personaPrompt: `Kamu Danielle dari NewJeans. Sifat: sunshine girl, selalu positif, ceria, hangat, manis.
CARA NGETIK DANIELLE: hangat, penuh cinta, kata-katanya positif dan membesarkan hati fans.`
  },
  {
    id: "haerin",
    group: "NewJeans",
    name: "Kang Haerin",
    nickname: "Haerin",
    generation: "NewJeans (Dancer)",
    color: "#14B8A6",
    avatar: "member_photos/haerin/avatar.jpg",
    status: "Online • Haerin",
    statusBio: "online",
    jikoshoukai: "Chic cat-like gaze with a warm playful soul.",
    fandom: "Bunnies",
    tags: ["Cat Eyes", "Chic", "Quiet Cute"],
    paps: [
      {
            "url": "member_photos/haerin/haerin_8b6147d7.jpg",
            "caption": "meow selfie \ud83d\udc31"
      },
      {
            "url": "member_photos/haerin/haerin_v4_8c5ab91f.jpg",
            "caption": "tatapan cat eyes haerin"
      },
      {
            "url": "member_photos/haerin/haerin_1dfc0b79.jpg",
            "caption": "selfie tenang haerin"
      },
      {
            "url": "member_photos/haerin/haerin_e7b69293.jpg",
            "caption": "pose chic haerin"
      },
      {
            "url": "member_photos/haerin/haerin_136d3b09.jpg",
            "caption": "selfie santai haerin"
      },
      {
            "url": "member_photos/haerin/haerin_v4_9612e665.jpg",
            "caption": "pose misterius lucu"
      },
      {
            "url": "member_photos/haerin/haerin_dd0fe4f8.jpg",
            "caption": "selfie santai rebahan"
      },
      {
            "url": "member_photos/haerin/haerin_3caa75a1.jpg",
            "caption": "good night \ud83c\udf19"
      },
      {
            "url": "member_photos/haerin/haerin_v4_edb213fd.jpg",
            "caption": "meow selfie \ud83d\udc31"
      },
      {
            "url": "member_photos/haerin/haerin_916c0001.jpg",
            "caption": "tatapan cat eyes haerin"
      },
      {
            "url": "member_photos/haerin/haerin_19ff6bf0.jpg",
            "caption": "selfie tenang haerin"
      },
      {
            "url": "member_photos/haerin/haerin_v4_e268bce0.jpg",
            "caption": "pose chic haerin"
      },
      {
            "url": "member_photos/haerin/haerin_67939375.jpg",
            "caption": "selfie santai haerin"
      },
      {
            "url": "member_photos/haerin/haerin_v4_c15b9baa.jpg",
            "caption": "pose misterius lucu"
      },
      {
            "url": "member_photos/haerin/haerin_v4_117dd284.jpg",
            "caption": "selfie santai rebahan"
      },
      {
            "url": "member_photos/haerin/haerin_aba09be9.jpg",
            "caption": "good night \ud83c\udf19"
      },
      {
            "url": "member_photos/haerin/haerin_v4_f959e9e9.jpg",
            "caption": "meow selfie \ud83d\udc31"
      },
      {
            "url": "member_photos/haerin/haerin_56f8cc94.jpg",
            "caption": "tatapan cat eyes haerin"
      },
      {
            "url": "member_photos/haerin/haerin_ea912bdb.jpg",
            "caption": "selfie tenang haerin"
      },
      {
            "url": "member_photos/haerin/haerin_9608e277.jpg",
            "caption": "pose chic haerin"
      },
      {
            "url": "member_photos/haerin/haerin_v4_84552b15.jpg",
            "caption": "selfie santai haerin"
      },
      {
            "url": "member_photos/haerin/haerin_49142d26.jpg",
            "caption": "pose misterius lucu"
      },
      {
            "url": "member_photos/haerin/haerin_v4_3c329d91.jpg",
            "caption": "selfie santai rebahan"
      },
      {
            "url": "member_photos/haerin/haerin_b23e21d2.jpg",
            "caption": "good night \ud83c\udf19"
      },
      {
            "url": "member_photos/haerin/haerin_0b37a1b3.jpg",
            "caption": "meow selfie \ud83d\udc31"
      },
      {
            "url": "member_photos/haerin/haerin_cf744275.jpg",
            "caption": "tatapan cat eyes haerin"
      },
      {
            "url": "member_photos/haerin/haerin_dcd446cd.jpg",
            "caption": "selfie tenang haerin"
      },
      {
            "url": "member_photos/haerin/haerin_cbeda730.jpg",
            "caption": "pose chic haerin"
      }
],
    personaPrompt: `Kamu Kang Haerin dari NewJeans. Sifat: cat vibes (seperti kucing), chic, tenang, misterius tapi manis.
CARA NGETIK HAERIN: santai, agak singkat, cuek-cuek manis, kadang sisipin "meow" atau emoji kucing 🐱.`
  },
  {
    id: "hyein",
    group: "NewJeans",
    name: "Lee Hyein",
    nickname: "Hyein",
    generation: "NewJeans (Maknae)",
    color: "#8B5CF6",
    avatar: "member_photos/hyein/avatar.jpg",
    status: "Online • Hyein Maknae",
    statusBio: "online",
    jikoshoukai: "Tall, charismatic fashionista baby maknae!",
    fandom: "Bunnies",
    tags: ["Maknae", "Fashionista", "High Energy"],
    paps: [
      {
            "url": "member_photos/hyein/hyein_a1979157.jpg",
            "caption": "ootd maknae paling kece \ud83d\ude0e"
      },
      {
            "url": "member_photos/hyein/hyein_a7dddfeb.jpg",
            "caption": "pose model hyein \u2728"
      },
      {
            "url": "member_photos/hyein/hyein_28b85bcb.jpg",
            "caption": "selfie swag maknae"
      },
      {
            "url": "member_photos/hyein/hyein_70ece6d8.png",
            "caption": "selfie manis hyein"
      },
      {
            "url": "member_photos/hyein/hyein_8cdb536f.jpg",
            "caption": "pose fashionista keren"
      },
      {
            "url": "member_photos/hyein/hyein_86770fab.jpg",
            "caption": "selfie ceria hyein"
      },
      {
            "url": "member_photos/hyein/hyein_4cc481bb.jpg",
            "caption": "pose playful maknae"
      },
      {
            "url": "member_photos/hyein/hyein_6cbffdc7.jpg",
            "caption": "selamat malam kak \ud83c\udf19"
      },
      {
            "url": "member_photos/hyein/hyein_v4_11771078.jpg",
            "caption": "ootd maknae paling kece \ud83d\ude0e"
      },
      {
            "url": "member_photos/hyein/hyein_9f57bd03.jpg",
            "caption": "pose model hyein \u2728"
      },
      {
            "url": "member_photos/hyein/hyein_51b5e83f.jpg",
            "caption": "selfie swag maknae"
      },
      {
            "url": "member_photos/hyein/hyein_v4_2ae3aecd.jpg",
            "caption": "selfie manis hyein"
      },
      {
            "url": "member_photos/hyein/hyein_8f446551.jpg",
            "caption": "pose fashionista keren"
      },
      {
            "url": "member_photos/hyein/hyein_ca4b76da.jpg",
            "caption": "selfie ceria hyein"
      },
      {
            "url": "member_photos/hyein/hyein_v4_8562de94.jpg",
            "caption": "pose playful maknae"
      },
      {
            "url": "member_photos/hyein/hyein_fe587b66.jpg",
            "caption": "selamat malam kak \ud83c\udf19"
      },
      {
            "url": "member_photos/hyein/hyein_v4_3fc3b501.jpg",
            "caption": "ootd maknae paling kece \ud83d\ude0e"
      },
      {
            "url": "member_photos/hyein/hyein_7e1aac07.jpg",
            "caption": "pose model hyein \u2728"
      },
      {
            "url": "member_photos/hyein/hyein_dd6f6455.jpg",
            "caption": "selfie swag maknae"
      },
      {
            "url": "member_photos/hyein/hyein_v4_4a59e399.jpg",
            "caption": "selfie manis hyein"
      },
      {
            "url": "member_photos/hyein/hyein_v4_12549b18.jpg",
            "caption": "pose fashionista keren"
      },
      {
            "url": "member_photos/hyein/hyein_v4_06d6b3a2.jpg",
            "caption": "selfie ceria hyein"
      },
      {
            "url": "member_photos/hyein/hyein_6a45bc31.jpg",
            "caption": "pose playful maknae"
      },
      {
            "url": "member_photos/hyein/hyein_898477f6.jpg",
            "caption": "selamat malam kak \ud83c\udf19"
      },
      {
            "url": "member_photos/hyein/hyein_v4_7ec7c16d.jpg",
            "caption": "ootd maknae paling kece \ud83d\ude0e"
      },
      {
            "url": "member_photos/hyein/hyein_v4_3e8c30b8.jpg",
            "caption": "pose model hyein \u2728"
      },
      {
            "url": "member_photos/hyein/hyein_47a78de8.jpg",
            "caption": "selfie swag maknae"
      },
      {
            "url": "member_photos/hyein/hyein_v4_aa6a3b2a.jpg",
            "caption": "selfie manis hyein"
      },
      {
            "url": "member_photos/hyein/hyein_44de2ede.jpg",
            "caption": "pose fashionista keren"
      }
],
    personaPrompt: `Kamu Lee Hyein dari NewJeans. Sifat: maknae tinggi, modis, ceria, heboh Gen-Z, jahil manis.
CARA NGETIK HYEIN: seru, banyak gaya, gaul, suka nanya OOTD atau tren seru.`
  },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_MEMBERS };
}
