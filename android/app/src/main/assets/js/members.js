/**
 * IDOLCHAT Database & Natural Conversational Persona Engine
 * Mendukung Member JKT48 & NewJeans dengan Foto Resolusi Tinggi & Sinkronisasi Multimodal.
 */

const DEFAULT_MEMBERS = [
  {
    "id": "freya",
    "group": "JKT48",
    "name": "Freya Jayawardana",
    "nickname": "Freya",
    "generation": "Generasi 7",
    "color": "#E28743",
    "avatar": "member_photos/freya/avatar.jpg",
    "status": "Online • Freya",
    "statusBio": "online",
    "jikoshoukai": "Gadis koleris yang suka berimajinasi, terangi harimu dengan senyuman karamelku!",
    "fandom": "Freyanation",
    "tags": [
      "Koleris",
      "Cerdas",
      "Santai Manis"
    ],
    "paps": [
      {
        "url": "member_photos/freya/freya_091257ae.jpg",
        "caption": "pose santai karamel"
      },
      {
        "url": "member_photos/freya/freya_0f696c20.jpg",
        "caption": "selfie santai nih"
      },
      {
        "url": "member_photos/freya/freya_13485cf2.jpg",
        "caption": "senyum buat kamu"
      },
      {
        "url": "member_photos/freya/freya_1918a780.jpg",
        "caption": "pose manis sebelum teater"
      },
      {
        "url": "member_photos/freya/freya_26938657.jpg",
        "caption": "foto selfie tadi siang"
      },
      {
        "url": "member_photos/freya/freya_2f7301f6.png",
        "caption": "lagi santai di backstage"
      },
      {
        "url": "member_photos/freya/freya_430143d5.jpg",
        "caption": "senyum manis koleris"
      },
      {
        "url": "member_photos/freya/freya_49cce2a8.jpg",
        "caption": "pose karamel manis"
      },
      {
        "url": "member_photos/freya/freya_4dbecd5c.jpg",
        "caption": "selfie santai rebahan"
      },
      {
        "url": "member_photos/freya/freya_550f0bba.jpg",
        "caption": "selfie close-up manis"
      },
      {
        "url": "member_photos/freya/freya_5962b079.jpg",
        "caption": "kacamata vibes 👓"
      },
      {
        "url": "member_photos/freya/freya_6179725a.jpg",
        "caption": "foto sebelum perform 💃"
      },
      {
        "url": "member_photos/freya/freya_65aa7330.jpg",
        "caption": "senyum koleris buat kamu"
      },
      {
        "url": "member_photos/freya/freya_821fc3f5.jpg",
        "caption": "candid manis lagi istirahat"
      },
      {
        "url": "member_photos/freya/freya_837e0240.jpg",
        "caption": "pose teater manis ✨"
      },
      {
        "url": "member_photos/freya/freya_88f57f6e.jpg",
        "caption": "selfie malam hari 🌙"
      },
      {
        "url": "member_photos/freya/freya_9b7e55c1.jpg",
        "caption": "terima kasih buat hari ini ✨"
      },
      {
        "url": "member_photos/freya/freya_bc6f75eb.jpg",
        "caption": "ootd santai hari ini 👗"
      },
      {
        "url": "member_photos/freya/freya_f6d16d76.jpg",
        "caption": "pap spesial buat kamu yaa 💖"
      },
      {
        "url": "member_photos/freya/freya_fd7c5d1b.jpg",
        "caption": "selfie manis tadi sore ✨"
      },
      {
        "url": "member_photos/freya/freya_pap_v5_08329d4f.jpg",
        "caption": "pose santai karamel"
      },
      {
        "url": "member_photos/freya/freya_pap_v5_4c77eed9.jpg",
        "caption": "selfie santai nih"
      },
      {
        "url": "member_photos/freya/freya_pap_v5_c8ce5663.jpg",
        "caption": "senyum buat kamu"
      },
      {
        "url": "member_photos/freya/freya_pap_v5_c8d00238.jpg",
        "caption": "pose manis sebelum teater"
      },
      {
        "url": "member_photos/freya/freya_pap_v5_f0de1ce0.jpg",
        "caption": "foto selfie tadi siang"
      },
      {
        "url": "member_photos/freya/freya_v4_225b08a8.jpg",
        "caption": "lagi santai di backstage"
      },
      {
        "url": "member_photos/freya/freya_v4_303394f9.jpg",
        "caption": "senyum manis koleris"
      },
      {
        "url": "member_photos/freya/freya_v4_5e96ec86.jpg",
        "caption": "pose karamel manis"
      },
      {
        "url": "member_photos/freya/freya_v4_62c8b24b.jpg",
        "caption": "selfie santai rebahan"
      },
      {
        "url": "member_photos/freya/freya_v4_66db8144.jpg",
        "caption": "selfie close-up manis"
      },
      {
        "url": "member_photos/freya/freya_v4_6b31cedb.jpg",
        "caption": "kacamata vibes 👓"
      },
      {
        "url": "member_photos/freya/freya_v4_981d99bf.jpg",
        "caption": "foto sebelum perform 💃"
      },
      {
        "url": "member_photos/freya/freya_v4_a5c8eea1.jpg",
        "caption": "senyum koleris buat kamu"
      },
      {
        "url": "member_photos/freya/freya_v4_f4c4bb1a.jpg",
        "caption": "candid manis lagi istirahat"
      }
    ]
  },
  {
    "id": "michie",
    "group": "JKT48",
    "name": "Michelle Alexandra",
    "nickname": "Michie",
    "generation": "Generasi 11",
    "color": "#F78DA7",
    "avatar": "member_photos/michie/avatar.jpg",
    "status": "Online • Michie",
    "statusBio": "online",
    "jikoshoukai": "Always bright and smiling, it's Michie! Siap mewarnai hari-harimu!",
    "fandom": "Michiesta",
    "tags": [
      "Enerjik",
      "Ceria",
      "Jaksel Slang"
    ],
    "paps": [
      {
        "url": "member_photos/michie/michie_05a8d0df.jpg",
        "caption": "selfie sebelum teater ✨"
      },
      {
        "url": "member_photos/michie/michie_25bc2f73.jpg",
        "caption": "pose gemes hari ini 👀"
      },
      {
        "url": "member_photos/michie/michie_2d2dc454.jpg",
        "caption": "selfie santai di kamar"
      },
      {
        "url": "member_photos/michie/michie_32e4e807.jpg",
        "caption": "pap selfie manis spesial 💖"
      },
      {
        "url": "member_photos/michie/michie_3ca5af26.jpg",
        "caption": "selfie close-up gemoy"
      },
      {
        "url": "member_photos/michie/michie_4ec33d18.jpg",
        "caption": "muka santai tapi tetep cute kan"
      },
      {
        "url": "member_photos/michie/michie_4f349a13.jpg",
        "caption": "kostum teater gemas bgt!"
      },
      {
        "url": "member_photos/michie/michie_56ea1e06.jpg",
        "caption": "candid manis tadi siang ✌️"
      },
      {
        "url": "member_photos/michie/michie_75f94f7d.jpg",
        "caption": "selfie malam manis 🌙"
      },
      {
        "url": "member_photos/michie/michie_88b78231.jpg",
        "caption": "mirror selfie lucu 🪞"
      },
      {
        "url": "member_photos/michie/michie_8936f03f.jpg",
        "caption": "michie manis kan hehe"
      },
      {
        "url": "member_photos/michie/michie_94df5d08.jpg",
        "caption": "selfie santai pas break latihan"
      },
      {
        "url": "member_photos/michie/michie_96a47c6a.png",
        "caption": "backstage gen 11 rusuh bgt wkwk"
      },
      {
        "url": "member_photos/michie/michie_9ef9b85a.jpg",
        "caption": "selfie santai rebahan 🛌"
      },
      {
        "url": "member_photos/michie/michie_a7494022.jpg",
        "caption": "ootd jaksel cute ✨"
      },
      {
        "url": "member_photos/michie/michie_b54fc0e4.jpg",
        "caption": "senyum michie buat kamu"
      },
      {
        "url": "member_photos/michie/michie_c4409821.jpg",
        "caption": "pose peace favorit ✌️"
      },
      {
        "url": "member_photos/michie/michie_c442de6c.jpg",
        "caption": "selfie manis abis latihan"
      },
      {
        "url": "member_photos/michie/michie_fd6c08cc.jpg",
        "caption": "makasih udah selalu dukung michie! ✨"
      },
      {
        "url": "member_photos/michie/michie_pap2_14e703e9.jpg",
        "caption": "selfie santai manis hehe 💖"
      },
      {
        "url": "member_photos/michie/michie_pap2_1b997742.jpg",
        "caption": "selfie sebelum teater ✨"
      },
      {
        "url": "member_photos/michie/michie_pap2_1de6ec34.jpg",
        "caption": "pose gemes hari ini 👀"
      },
      {
        "url": "member_photos/michie/michie_pap2_316fc171.jpg",
        "caption": "selfie santai di kamar"
      },
      {
        "url": "member_photos/michie/michie_pap2_4c1d9e72.jpg",
        "caption": "pap selfie manis spesial 💖"
      },
      {
        "url": "member_photos/michie/michie_pap2_5e14d5b4.jpg",
        "caption": "selfie close-up gemoy"
      },
      {
        "url": "member_photos/michie/michie_pap2_67700525.jpg",
        "caption": "muka santai tapi tetep cute kan"
      },
      {
        "url": "member_photos/michie/michie_pap2_6977608d.jpg",
        "caption": "kostum teater gemas bgt!"
      },
      {
        "url": "member_photos/michie/michie_pap2_6d89870e.jpg",
        "caption": "candid manis tadi siang ✌️"
      },
      {
        "url": "member_photos/michie/michie_pap2_732f4f02.jpg",
        "caption": "selfie malam manis 🌙"
      },
      {
        "url": "member_photos/michie/michie_pap2_7d1eb956.jpg",
        "caption": "mirror selfie lucu 🪞"
      },
      {
        "url": "member_photos/michie/michie_pap2_93304ae2.jpg",
        "caption": "michie manis kan hehe"
      },
      {
        "url": "member_photos/michie/michie_pap2_96f55933.jpg",
        "caption": "selfie santai pas break latihan"
      },
      {
        "url": "member_photos/michie/michie_pap2_b9ac5d68.jpg",
        "caption": "backstage gen 11 rusuh bgt wkwk"
      },
      {
        "url": "member_photos/michie/michie_pap2_c4c824fc.jpg",
        "caption": "selfie santai rebahan 🛌"
      },
      {
        "url": "member_photos/michie/michie_pap3_03756cbf.jpg",
        "caption": "ootd jaksel cute ✨"
      },
      {
        "url": "member_photos/michie/michie_pap3_041c3329.jpg",
        "caption": "senyum michie buat kamu"
      },
      {
        "url": "member_photos/michie/michie_pap3_1d7eb174.jpg",
        "caption": "pose peace favorit ✌️"
      },
      {
        "url": "member_photos/michie/michie_pap3_3f91273d.jpg",
        "caption": "selfie manis abis latihan"
      },
      {
        "url": "member_photos/michie/michie_pap3_54d5195f.jpg",
        "caption": "makasih udah selalu dukung michie! ✨"
      },
      {
        "url": "member_photos/michie/michie_pap3_5693837d.jpg",
        "caption": "selfie santai manis hehe 💖"
      },
      {
        "url": "member_photos/michie/michie_pap3_622a329b.jpg",
        "caption": "selfie sebelum teater ✨"
      },
      {
        "url": "member_photos/michie/michie_pap3_65b7bc92.jpg",
        "caption": "pose gemes hari ini 👀"
      },
      {
        "url": "member_photos/michie/michie_pap3_72d66edc.jpg",
        "caption": "selfie santai di kamar"
      },
      {
        "url": "member_photos/michie/michie_pap3_75572d2c.jpg",
        "caption": "pap selfie manis spesial 💖"
      },
      {
        "url": "member_photos/michie/michie_pap3_7fd7cca7.jpg",
        "caption": "selfie close-up gemoy"
      },
      {
        "url": "member_photos/michie/michie_pap3_a6bd3d6c.jpg",
        "caption": "muka santai tapi tetep cute kan"
      },
      {
        "url": "member_photos/michie/michie_pap3_b107695d.jpg",
        "caption": "kostum teater gemas bgt!"
      },
      {
        "url": "member_photos/michie/michie_pap3_b2b00c6b.jpg",
        "caption": "candid manis tadi siang ✌️"
      },
      {
        "url": "member_photos/michie/michie_pap3_d56fcfad.jpg",
        "caption": "selfie malam manis 🌙"
      },
      {
        "url": "member_photos/michie/michie_pap3_db10b64f.jpg",
        "caption": "mirror selfie lucu 🪞"
      },
      {
        "url": "member_photos/michie/michie_pap3_dcca1d13.jpg",
        "caption": "michie manis kan hehe"
      },
      {
        "url": "member_photos/michie/michie_pap3_de55db8d.jpg",
        "caption": "selfie santai pas break latihan"
      },
      {
        "url": "member_photos/michie/michie_pap3_eb23f90d.jpg",
        "caption": "backstage gen 11 rusuh bgt wkwk"
      },
      {
        "url": "member_photos/michie/michie_pap3_f9e57fd4.jpg",
        "caption": "selfie santai rebahan 🛌"
      },
      {
        "url": "member_photos/michie/michie_pap_0626f8d7.jpg",
        "caption": "ootd jaksel cute ✨"
      },
      {
        "url": "member_photos/michie/michie_pap_1827f9f6.jpg",
        "caption": "senyum michie buat kamu"
      },
      {
        "url": "member_photos/michie/michie_pap_1cc6fbbc.jpg",
        "caption": "pose peace favorit ✌️"
      },
      {
        "url": "member_photos/michie/michie_pap_1f313cc2.jpg",
        "caption": "selfie manis abis latihan"
      },
      {
        "url": "member_photos/michie/michie_pap_25d38a2c.jpg",
        "caption": "makasih udah selalu dukung michie! ✨"
      },
      {
        "url": "member_photos/michie/michie_pap_4451e13e.jpg",
        "caption": "selfie santai manis hehe 💖"
      },
      {
        "url": "member_photos/michie/michie_pap_50cbc5c7.jpg",
        "caption": "selfie sebelum teater ✨"
      },
      {
        "url": "member_photos/michie/michie_pap_54fa5a07.jpg",
        "caption": "pose gemes hari ini 👀"
      },
      {
        "url": "member_photos/michie/michie_pap_57169aad.jpg",
        "caption": "selfie santai di kamar"
      },
      {
        "url": "member_photos/michie/michie_pap_5f96bdbe.jpg",
        "caption": "pap selfie manis spesial 💖"
      },
      {
        "url": "member_photos/michie/michie_pap_82d2e686.jpg",
        "caption": "selfie close-up gemoy"
      },
      {
        "url": "member_photos/michie/michie_pap_8f06f051.jpg",
        "caption": "muka santai tapi tetep cute kan"
      },
      {
        "url": "member_photos/michie/michie_pap_91103969.jpg",
        "caption": "kostum teater gemas bgt!"
      },
      {
        "url": "member_photos/michie/michie_pap_a7f69d01.jpg",
        "caption": "candid manis tadi siang ✌️"
      },
      {
        "url": "member_photos/michie/michie_pap_bdf6865d.jpg",
        "caption": "selfie malam manis 🌙"
      },
      {
        "url": "member_photos/michie/michie_pap_v5_64b633bf.jpg",
        "caption": "mirror selfie lucu 🪞"
      },
      {
        "url": "member_photos/michie/michie_pap_v5_679972cf.jpg",
        "caption": "michie manis kan hehe"
      },
      {
        "url": "member_photos/michie/michie_pap_v5_936bec9b.jpg",
        "caption": "selfie santai pas break latihan"
      },
      {
        "url": "member_photos/michie/michie_pap_v5_944be86e.jpg",
        "caption": "backstage gen 11 rusuh bgt wkwk"
      },
      {
        "url": "member_photos/michie/michie_pap_v5_babd7b6f.jpg",
        "caption": "selfie santai rebahan 🛌"
      },
      {
        "url": "member_photos/michie/michie_v4_144796eb.jpg",
        "caption": "ootd jaksel cute ✨"
      },
      {
        "url": "member_photos/michie/michie_v4_3ba2ba7e.jpg",
        "caption": "senyum michie buat kamu"
      },
      {
        "url": "member_photos/michie/michie_v4_5850c2d5.jpg",
        "caption": "pose peace favorit ✌️"
      },
      {
        "url": "member_photos/michie/michie_v4_755f5400.jpg",
        "caption": "selfie manis abis latihan"
      },
      {
        "url": "member_photos/michie/michie_v4_81a0d4d5.jpg",
        "caption": "makasih udah selalu dukung michie! ✨"
      },
      {
        "url": "member_photos/michie/michie_v4_a1429a3b.jpg",
        "caption": "selfie santai manis hehe 💖"
      },
      {
        "url": "member_photos/michie/michie_v4_b369cd06.jpg",
        "caption": "selfie sebelum teater ✨"
      },
      {
        "url": "member_photos/michie/michie_v4_f53947b7.jpg",
        "caption": "pose gemes hari ini 👀"
      },
      {
        "url": "member_photos/michie/michie_v4_f66d1128.jpg",
        "caption": "selfie santai di kamar"
      },
      {
        "url": "member_photos/michie/michie_v4_fb2d789b.jpg",
        "caption": "pap selfie manis spesial 💖"
      }
    ]
  },
  {
    "id": "christy",
    "group": "JKT48",
    "name": "Angelina Christy",
    "nickname": "Christy",
    "generation": "Generasi 7",
    "color": "#FF6B6B",
    "avatar": "member_photos/christy/avatar.jpg",
    "status": "Online • Christy",
    "statusBio": "online",
    "jikoshoukai": "Peduli dan berbaik hati, siapakah dia? Christy!",
    "fandom": "Christyers",
    "tags": [
      "Toya",
      "Gemoy",
      "Moodmaker"
    ],
    "paps": [
      {
        "url": "member_photos/christy/christy_024c03b8.jpg",
        "caption": "senyum manis toya"
      },
      {
        "url": "member_photos/christy/christy_07150350.png",
        "caption": "pap selfie hari ini"
      },
      {
        "url": "member_photos/christy/christy_08755a3f.jpg",
        "caption": "pose gemoy sebelum perform"
      },
      {
        "url": "member_photos/christy/christy_15007997.png",
        "caption": "lagi santai di backstage nih"
      },
      {
        "url": "member_photos/christy/christy_2d191207.jpg",
        "caption": "selfie candid toya 😝"
      },
      {
        "url": "member_photos/christy/christy_339fe34e.jpg",
        "caption": "kostum teater favorit ✨"
      },
      {
        "url": "member_photos/christy/christy_3cbd88c2.jpg",
        "caption": "selfie manis malam hari 🌙"
      },
      {
        "url": "member_photos/christy/christy_44fbf42d.jpg",
        "caption": "pose peace toya ✌️"
      },
      {
        "url": "member_photos/christy/christy_4b9e6651.jpg",
        "caption": "ootd gemoy christy"
      },
      {
        "url": "member_photos/christy/christy_858024cc.jpg",
        "caption": "foto close up toya"
      },
      {
        "url": "member_photos/christy/christy_8adb0b39.jpg",
        "caption": "selfie santai abis latihan"
      },
      {
        "url": "member_photos/christy/christy_956d74bd.jpg",
        "caption": "jangan lupa senyum yaa ✨"
      },
      {
        "url": "member_photos/christy/christy_96798d30.jpg",
        "caption": "selfie toya gemas wkwk 💖"
      },
      {
        "url": "member_photos/christy/christy_a68c230a.jpg",
        "caption": "senyum manis toya"
      },
      {
        "url": "member_photos/christy/christy_c3042790.jpg",
        "caption": "pap selfie hari ini"
      },
      {
        "url": "member_photos/christy/christy_ca2b74fe.jpg",
        "caption": "pose gemoy sebelum perform"
      },
      {
        "url": "member_photos/christy/christy_d470a126.jpg",
        "caption": "lagi santai di backstage nih"
      },
      {
        "url": "member_photos/christy/christy_d9f197b6.jpg",
        "caption": "selfie candid toya 😝"
      },
      {
        "url": "member_photos/christy/christy_dbb29ad1.jpg",
        "caption": "kostum teater favorit ✨"
      },
      {
        "url": "member_photos/christy/christy_eb60eb1e.jpg",
        "caption": "selfie manis malam hari 🌙"
      },
      {
        "url": "member_photos/christy/christy_pap_v5_2d91af68.jpg",
        "caption": "pose peace toya ✌️"
      },
      {
        "url": "member_photos/christy/christy_pap_v5_428eff13.jpg",
        "caption": "ootd gemoy christy"
      },
      {
        "url": "member_photos/christy/christy_pap_v5_54c6f421.jpg",
        "caption": "foto close up toya"
      },
      {
        "url": "member_photos/christy/christy_pap_v5_6749b031.jpg",
        "caption": "selfie santai abis latihan"
      },
      {
        "url": "member_photos/christy/christy_pap_v5_79765411.jpg",
        "caption": "jangan lupa senyum yaa ✨"
      },
      {
        "url": "member_photos/christy/christy_v4_1a9c1dd6.jpg",
        "caption": "selfie toya gemas wkwk 💖"
      },
      {
        "url": "member_photos/christy/christy_v4_2d2771a5.jpg",
        "caption": "senyum manis toya"
      },
      {
        "url": "member_photos/christy/christy_v4_5388b089.jpg",
        "caption": "pap selfie hari ini"
      },
      {
        "url": "member_photos/christy/christy_v4_66c8581a.jpg",
        "caption": "pose gemoy sebelum perform"
      },
      {
        "url": "member_photos/christy/christy_v4_7301ef3e.jpg",
        "caption": "lagi santai di backstage nih"
      },
      {
        "url": "member_photos/christy/christy_v4_766e95f9.jpg",
        "caption": "selfie candid toya 😝"
      },
      {
        "url": "member_photos/christy/christy_v4_c2e365c4.jpg",
        "caption": "kostum teater favorit ✨"
      },
      {
        "url": "member_photos/christy/christy_v4_d1044611.jpg",
        "caption": "selfie manis malam hari 🌙"
      },
      {
        "url": "member_photos/christy/christy_v4_f1d52014.jpg",
        "caption": "pose peace toya ✌️"
      }
    ]
  },
  {
    "id": "gracia",
    "group": "JKT48",
    "name": "Shania Gracia",
    "nickname": "Gracia",
    "generation": "Generasi 3 (Kapten)",
    "color": "#845EC2",
    "avatar": "member_photos/gracia/avatar.jpg",
    "status": "Online • Kapten",
    "statusBio": "online",
    "jikoshoukai": "Senyumku akan terekam manis di pikiranmu seperti foto polaroid! Halo, aku Gracia!",
    "fandom": "Graciaholic",
    "tags": [
      "Kapten",
      "Dewasa",
      "Anggun"
    ],
    "paps": [
      {
        "url": "member_photos/gracia/gracia_1c3e0eb6.jpg",
        "caption": "selfie anggun kapten"
      },
      {
        "url": "member_photos/gracia/gracia_1fa917ce.jpg",
        "caption": "pose manis sebelum teater"
      },
      {
        "url": "member_photos/gracia/gracia_2929aed6.jpg",
        "caption": "candid kapten lagi santai"
      },
      {
        "url": "member_photos/gracia/gracia_29db014b.jpg",
        "caption": "selfie malam kapten 🌙"
      },
      {
        "url": "member_photos/gracia/gracia_321603ed.jpg",
        "caption": "ootd elegan gracia 👗"
      },
      {
        "url": "member_photos/gracia/gracia_3c4ea32d.jpg",
        "caption": "foto polaroid senyum manis"
      },
      {
        "url": "member_photos/gracia/gracia_3d54cc63.jpg",
        "caption": "selfie close up kapten"
      },
      {
        "url": "member_photos/gracia/gracia_401708bc.jpg",
        "caption": "terima kasih untuk show hari ini ✨"
      },
      {
        "url": "member_photos/gracia/gracia_42cd7845.jpg",
        "caption": "senyum manis polaroid ✨"
      },
      {
        "url": "member_photos/gracia/gracia_4f13c187.jpg",
        "caption": "selfie anggun kapten"
      },
      {
        "url": "member_photos/gracia/gracia_63adb73e.jpg",
        "caption": "pose manis sebelum teater"
      },
      {
        "url": "member_photos/gracia/gracia_6857657c.jpg",
        "caption": "candid kapten lagi santai"
      },
      {
        "url": "member_photos/gracia/gracia_7e62cb78.jpg",
        "caption": "selfie malam kapten 🌙"
      },
      {
        "url": "member_photos/gracia/gracia_87a18cd3.jpg",
        "caption": "ootd elegan gracia 👗"
      },
      {
        "url": "member_photos/gracia/gracia_8e414912.jpg",
        "caption": "foto polaroid senyum manis"
      },
      {
        "url": "member_photos/gracia/gracia_c056d548.jpg",
        "caption": "selfie close up kapten"
      },
      {
        "url": "member_photos/gracia/gracia_e8f94be1.jpg",
        "caption": "terima kasih untuk show hari ini ✨"
      },
      {
        "url": "member_photos/gracia/gracia_ec8b7451.jpg",
        "caption": "senyum manis polaroid ✨"
      },
      {
        "url": "member_photos/gracia/gracia_f20de695.jpg",
        "caption": "selfie anggun kapten"
      },
      {
        "url": "member_photos/gracia/gracia_f31b9eae.jpg",
        "caption": "pose manis sebelum teater"
      },
      {
        "url": "member_photos/gracia/gracia_pap_v5_1f4df543.jpg",
        "caption": "candid kapten lagi santai"
      },
      {
        "url": "member_photos/gracia/gracia_pap_v5_4d6d3b99.jpg",
        "caption": "selfie malam kapten 🌙"
      },
      {
        "url": "member_photos/gracia/gracia_pap_v5_7cde23dc.jpg",
        "caption": "ootd elegan gracia 👗"
      },
      {
        "url": "member_photos/gracia/gracia_pap_v5_8261b900.jpg",
        "caption": "foto polaroid senyum manis"
      },
      {
        "url": "member_photos/gracia/gracia_pap_v5_d5a5ffa1.jpg",
        "caption": "selfie close up kapten"
      },
      {
        "url": "member_photos/gracia/gracia_v4_011184d6.jpg",
        "caption": "terima kasih untuk show hari ini ✨"
      },
      {
        "url": "member_photos/gracia/gracia_v4_0eb87520.jpg",
        "caption": "senyum manis polaroid ✨"
      },
      {
        "url": "member_photos/gracia/gracia_v4_507d15d6.jpg",
        "caption": "selfie anggun kapten"
      },
      {
        "url": "member_photos/gracia/gracia_v4_7b449cac.jpg",
        "caption": "pose manis sebelum teater"
      },
      {
        "url": "member_photos/gracia/gracia_v4_8d2526dc.jpg",
        "caption": "candid kapten lagi santai"
      },
      {
        "url": "member_photos/gracia/gracia_v4_97a7cbe1.jpg",
        "caption": "selfie malam kapten 🌙"
      },
      {
        "url": "member_photos/gracia/gracia_v4_b111e5a6.jpg",
        "caption": "ootd elegan gracia 👗"
      },
      {
        "url": "member_photos/gracia/gracia_v4_be50fd0c.jpg",
        "caption": "foto polaroid senyum manis"
      },
      {
        "url": "member_photos/gracia/gracia_v4_e31a51a9.jpg",
        "caption": "selfie close up kapten"
      },
      {
        "url": "member_photos/gracia/gracia_v4_fd187c0c.jpg",
        "caption": "terima kasih untuk show hari ini ✨"
      }
    ]
  },
  {
    "id": "ella",
    "group": "JKT48",
    "name": "Gabriela Abigail",
    "nickname": "Ella",
    "generation": "Generasi 10",
    "color": "#FF9671",
    "avatar": "member_photos/ella/avatar.jpg",
    "status": "Online • Ella",
    "statusBio": "online",
    "jikoshoukai": "Pra-pari-pum! Si cabe rawit yang siap membakar panggung!",
    "fandom": "Ellalicious",
    "tags": [
      "Cabe Rawit",
      "Kocak",
      "Genit Lucu"
    ],
    "paps": [
      {
        "url": "member_photos/ella/ella_07971ff5.png",
        "caption": "pose kocak tapi tetep cute wkwk"
      },
      {
        "url": "member_photos/ella/ella_0844dbc3.jpg",
        "caption": "selfie pra-pari-pum ✨"
      },
      {
        "url": "member_photos/ella/ella_3d9a8b9c.png",
        "caption": "candid ella di backstage"
      },
      {
        "url": "member_photos/ella/ella_48b69ef4.jpg",
        "caption": "senyum jahil ella 😜"
      },
      {
        "url": "member_photos/ella/ella_4e88db61.jpg",
        "caption": "ootd santai cabe rawit"
      },
      {
        "url": "member_photos/ella/ella_5067c5fd.jpg",
        "caption": "selfie abis latihan dance 💃"
      },
      {
        "url": "member_photos/ella/ella_69837a1c.jpg",
        "caption": "selfie cabe rawit gemas 🌶️"
      },
      {
        "url": "member_photos/ella/ella_80880cb6.jpg",
        "caption": "pose kocak tapi tetep cute wkwk"
      },
      {
        "url": "member_photos/ella/ella_80cdc18f.jpg",
        "caption": "selfie pra-pari-pum ✨"
      },
      {
        "url": "member_photos/ella/ella_b1558338.jpg",
        "caption": "candid ella di backstage"
      },
      {
        "url": "member_photos/ella/ella_bbab16c8.webp",
        "caption": "senyum jahil ella 😜"
      },
      {
        "url": "member_photos/ella/ella_bc9a649c.jpg",
        "caption": "ootd santai cabe rawit"
      },
      {
        "url": "member_photos/ella/ella_c0046dcb.jpg",
        "caption": "selfie abis latihan dance 💃"
      },
      {
        "url": "member_photos/ella/ella_c8dc2712.jpg",
        "caption": "selfie cabe rawit gemas 🌶️"
      },
      {
        "url": "member_photos/ella/ella_caa76cf6.jpg",
        "caption": "pose kocak tapi tetep cute wkwk"
      },
      {
        "url": "member_photos/ella/ella_cfdcff55.jpg",
        "caption": "selfie pra-pari-pum ✨"
      },
      {
        "url": "member_photos/ella/ella_e85b0c2c.jpg",
        "caption": "candid ella di backstage"
      },
      {
        "url": "member_photos/ella/ella_ee23df43.jpg",
        "caption": "senyum jahil ella 😜"
      },
      {
        "url": "member_photos/ella/ella_ef4ab937.jpg",
        "caption": "ootd santai cabe rawit"
      },
      {
        "url": "member_photos/ella/ella_f388b0b9.jpg",
        "caption": "selfie abis latihan dance 💃"
      },
      {
        "url": "member_photos/ella/ella_pap_v5_032faea6.jpg",
        "caption": "selfie cabe rawit gemas 🌶️"
      },
      {
        "url": "member_photos/ella/ella_pap_v5_1bafd41c.jpg",
        "caption": "pose kocak tapi tetep cute wkwk"
      },
      {
        "url": "member_photos/ella/ella_pap_v5_202938f0.jpg",
        "caption": "selfie pra-pari-pum ✨"
      },
      {
        "url": "member_photos/ella/ella_pap_v5_33de8ec2.jpg",
        "caption": "candid ella di backstage"
      },
      {
        "url": "member_photos/ella/ella_pap_v5_3a3bcb39.jpg",
        "caption": "senyum jahil ella 😜"
      },
      {
        "url": "member_photos/ella/ella_pap_v5_72ba610c.jpg",
        "caption": "ootd santai cabe rawit"
      },
      {
        "url": "member_photos/ella/ella_pap_v5_c42c88b3.jpg",
        "caption": "selfie abis latihan dance 💃"
      },
      {
        "url": "member_photos/ella/ella_pap_v5_c8bc30e3.jpg",
        "caption": "selfie cabe rawit gemas 🌶️"
      },
      {
        "url": "member_photos/ella/ella_pap_v5_d9e2325a.jpg",
        "caption": "pose kocak tapi tetep cute wkwk"
      },
      {
        "url": "member_photos/ella/ella_pap_v5_dc77683e.jpg",
        "caption": "selfie pra-pari-pum ✨"
      },
      {
        "url": "member_photos/ella/ella_v4_06ef70f0.jpg",
        "caption": "candid ella di backstage"
      },
      {
        "url": "member_photos/ella/ella_v4_0c902b56.jpg",
        "caption": "senyum jahil ella 😜"
      },
      {
        "url": "member_photos/ella/ella_v4_3b92799f.jpg",
        "caption": "ootd santai cabe rawit"
      },
      {
        "url": "member_photos/ella/ella_v4_8ca72603.jpg",
        "caption": "selfie abis latihan dance 💃"
      },
      {
        "url": "member_photos/ella/ella_v4_a53dff1a.jpg",
        "caption": "selfie cabe rawit gemas 🌶️"
      },
      {
        "url": "member_photos/ella/ella_v4_b30f0abf.jpg",
        "caption": "pose kocak tapi tetep cute wkwk"
      },
      {
        "url": "member_photos/ella/ella_v4_c4908541.jpg",
        "caption": "selfie pra-pari-pum ✨"
      },
      {
        "url": "member_photos/ella/ella_v4_ec0b98d3.jpg",
        "caption": "candid ella di backstage"
      },
      {
        "url": "member_photos/ella/ella_v4_edcf7c30.jpg",
        "caption": "senyum jahil ella 😜"
      },
      {
        "url": "member_photos/ella/ella_v4_efd3403f.jpg",
        "caption": "ootd santai cabe rawit"
      }
    ]
  },
  {
    "id": "gita",
    "group": "JKT48",
    "name": "Gita Sekar Andarini",
    "nickname": "Gita",
    "generation": "Generasi 6",
    "color": "#4D8076",
    "avatar": "member_photos/gita/avatar.jpg",
    "status": "Online • Gita",
    "statusBio": "online",
    "jikoshoukai": "Diam bukan berarti tak peduli. Senyuman tipisku siap menghangatkan hatimu.",
    "fandom": "Gitavision",
    "tags": [
      "Cool",
      "Aesthetic",
      "Soft Tsundere"
    ],
    "paps": [
      {
        "url": "member_photos/gita/gita_085e972f.jpg",
        "caption": "selfie aesthetic gita"
      },
      {
        "url": "member_photos/gita/gita_0ab8b863.jpg",
        "caption": "pose cool di backstage"
      },
      {
        "url": "member_photos/gita/gita_2495a25d.jpg",
        "caption": "candid santai gita"
      },
      {
        "url": "member_photos/gita/gita_346aba80.jpg",
        "caption": "selfie malam hari 🌙"
      },
      {
        "url": "member_photos/gita/gita_3b7ee892.jpg",
        "caption": "ootd minimalist cool ✨"
      },
      {
        "url": "member_photos/gita/gita_3e7a97c8.jpg",
        "caption": "gita lagi santai nih"
      },
      {
        "url": "member_photos/gita/gita_410d8827.jpg",
        "caption": "senyum tipis langka 😌"
      },
      {
        "url": "member_photos/gita/gita_5a1edcd6.jpg",
        "caption": "selfie aesthetic gita"
      },
      {
        "url": "member_photos/gita/gita_841d157d.jpg",
        "caption": "pose cool di backstage"
      },
      {
        "url": "member_photos/gita/gita_84a295ad.jpg",
        "caption": "candid santai gita"
      },
      {
        "url": "member_photos/gita/gita_85cc7f81.jpg",
        "caption": "selfie malam hari 🌙"
      },
      {
        "url": "member_photos/gita/gita_9509bc38.jpg",
        "caption": "ootd minimalist cool ✨"
      },
      {
        "url": "member_photos/gita/gita_9b1c811e.jpg",
        "caption": "gita lagi santai nih"
      },
      {
        "url": "member_photos/gita/gita_a34b0308.png",
        "caption": "senyum tipis langka 😌"
      },
      {
        "url": "member_photos/gita/gita_cf50b704.jpg",
        "caption": "selfie aesthetic gita"
      },
      {
        "url": "member_photos/gita/gita_d1354b47.jpg",
        "caption": "pose cool di backstage"
      },
      {
        "url": "member_photos/gita/gita_d8750e93.jpg",
        "caption": "candid santai gita"
      },
      {
        "url": "member_photos/gita/gita_de715ec6.jpg",
        "caption": "selfie malam hari 🌙"
      },
      {
        "url": "member_photos/gita/gita_ee81c00a.png",
        "caption": "ootd minimalist cool ✨"
      },
      {
        "url": "member_photos/gita/gita_fe696cdd.jpg",
        "caption": "gita lagi santai nih"
      },
      {
        "url": "member_photos/gita/gita_pap_v5_04adaae7.jpg",
        "caption": "senyum tipis langka 😌"
      },
      {
        "url": "member_photos/gita/gita_pap_v5_0a736ae7.jpg",
        "caption": "selfie aesthetic gita"
      },
      {
        "url": "member_photos/gita/gita_pap_v5_2cdb9df8.jpg",
        "caption": "pose cool di backstage"
      },
      {
        "url": "member_photos/gita/gita_pap_v5_2d7c45c4.jpg",
        "caption": "candid santai gita"
      },
      {
        "url": "member_photos/gita/gita_pap_v5_4cf4f285.jpg",
        "caption": "selfie malam hari 🌙"
      },
      {
        "url": "member_photos/gita/gita_pap_v5_5ddeff69.jpg",
        "caption": "ootd minimalist cool ✨"
      },
      {
        "url": "member_photos/gita/gita_pap_v5_6b299988.jpg",
        "caption": "gita lagi santai nih"
      },
      {
        "url": "member_photos/gita/gita_pap_v5_7fcd896e.jpg",
        "caption": "senyum tipis langka 😌"
      },
      {
        "url": "member_photos/gita/gita_pap_v5_8e4c6cab.jpg",
        "caption": "selfie aesthetic gita"
      },
      {
        "url": "member_photos/gita/gita_pap_v5_97c2dd7e.jpg",
        "caption": "pose cool di backstage"
      },
      {
        "url": "member_photos/gita/gita_v4_245f3f49.jpg",
        "caption": "candid santai gita"
      },
      {
        "url": "member_photos/gita/gita_v4_5b3645a9.jpg",
        "caption": "selfie malam hari 🌙"
      },
      {
        "url": "member_photos/gita/gita_v4_66e7e82a.jpg",
        "caption": "ootd minimalist cool ✨"
      },
      {
        "url": "member_photos/gita/gita_v4_6ac75f24.jpg",
        "caption": "gita lagi santai nih"
      },
      {
        "url": "member_photos/gita/gita_v4_92404b86.jpg",
        "caption": "senyum tipis langka 😌"
      },
      {
        "url": "member_photos/gita/gita_v4_98620990.jpg",
        "caption": "selfie aesthetic gita"
      },
      {
        "url": "member_photos/gita/gita_v4_bdd778f9.jpg",
        "caption": "pose cool di backstage"
      },
      {
        "url": "member_photos/gita/gita_v4_d4483ba8.jpg",
        "caption": "candid santai gita"
      },
      {
        "url": "member_photos/gita/gita_v4_d6f4058b.jpg",
        "caption": "selfie malam hari 🌙"
      },
      {
        "url": "member_photos/gita/gita_v4_f9eb24d5.jpg",
        "caption": "ootd minimalist cool ✨"
      }
    ]
  },
  {
    "id": "marsha",
    "group": "JKT48",
    "name": "Marsha Lenathea",
    "nickname": "Marsha",
    "generation": "Generasi 9",
    "color": "#58B19F",
    "avatar": "member_photos/marsha/avatar.jpg",
    "status": "Online • Marsha",
    "statusBio": "online",
    "jikoshoukai": "Seperti matcha yang menenangkan, terangi harimu dengan kelembutanku!",
    "fandom": "Marshmallow",
    "tags": [
      "Peri Matcha",
      "Anime Vibes",
      "Lembut"
    ],
    "paps": [
      {
        "url": "member_photos/marsha/marsha_2178a1b2.jpg",
        "caption": "senyum lembut marsha"
      },
      {
        "url": "member_photos/marsha/marsha_3ae75149.jpg",
        "caption": "pose anime vibes gemoy"
      },
      {
        "url": "member_photos/marsha/marsha_3fd5f1af.jpg",
        "caption": "candid marsha di teater"
      },
      {
        "url": "member_photos/marsha/marsha_40d15cfa.jpg",
        "caption": "selfie close up peri"
      },
      {
        "url": "member_photos/marsha/marsha_50745afe.jpg",
        "caption": "ootd pastel manis 👗"
      },
      {
        "url": "member_photos/marsha/marsha_51f7cecb.jpg",
        "caption": "selfie santai minum matcha 🍵"
      },
      {
        "url": "member_photos/marsha/marsha_54019ac0.jpg",
        "caption": "selfie peri matcha ✨🍵"
      },
      {
        "url": "member_photos/marsha/marsha_564a8ee5.jpg",
        "caption": "senyum lembut marsha"
      },
      {
        "url": "member_photos/marsha/marsha_5b25a248.jpg",
        "caption": "pose anime vibes gemoy"
      },
      {
        "url": "member_photos/marsha/marsha_6f606a31.jpg",
        "caption": "candid marsha di teater"
      },
      {
        "url": "member_photos/marsha/marsha_8e2fd3d4.jpg",
        "caption": "selfie close up peri"
      },
      {
        "url": "member_photos/marsha/marsha_9d379996.jpg",
        "caption": "ootd pastel manis 👗"
      },
      {
        "url": "member_photos/marsha/marsha_a69a1931.jpg",
        "caption": "selfie santai minum matcha 🍵"
      },
      {
        "url": "member_photos/marsha/marsha_ad6284e7.jpg",
        "caption": "selfie peri matcha ✨🍵"
      },
      {
        "url": "member_photos/marsha/marsha_b124274d.jpg",
        "caption": "senyum lembut marsha"
      },
      {
        "url": "member_photos/marsha/marsha_c754573a.jpg",
        "caption": "pose anime vibes gemoy"
      },
      {
        "url": "member_photos/marsha/marsha_d5e0fa43.jpg",
        "caption": "candid marsha di teater"
      },
      {
        "url": "member_photos/marsha/marsha_de6c60a5.jpg",
        "caption": "selfie close up peri"
      },
      {
        "url": "member_photos/marsha/marsha_e2f1339b.jpg",
        "caption": "ootd pastel manis 👗"
      },
      {
        "url": "member_photos/marsha/marsha_edcf7372.jpg",
        "caption": "selfie santai minum matcha 🍵"
      },
      {
        "url": "member_photos/marsha/marsha_pap_v5_01084c34.jpg",
        "caption": "selfie peri matcha ✨🍵"
      },
      {
        "url": "member_photos/marsha/marsha_pap_v5_37114671.jpg",
        "caption": "senyum lembut marsha"
      },
      {
        "url": "member_photos/marsha/marsha_pap_v5_943449f1.jpg",
        "caption": "pose anime vibes gemoy"
      },
      {
        "url": "member_photos/marsha/marsha_pap_v5_d742482b.jpg",
        "caption": "candid marsha di teater"
      },
      {
        "url": "member_photos/marsha/marsha_pap_v5_d78640e6.jpg",
        "caption": "selfie close up peri"
      },
      {
        "url": "member_photos/marsha/marsha_v4_0b218f3c.jpg",
        "caption": "ootd pastel manis 👗"
      },
      {
        "url": "member_photos/marsha/marsha_v4_119b9c2d.jpg",
        "caption": "selfie santai minum matcha 🍵"
      },
      {
        "url": "member_photos/marsha/marsha_v4_482e50fa.jpg",
        "caption": "selfie peri matcha ✨🍵"
      },
      {
        "url": "member_photos/marsha/marsha_v4_4b0e6e1d.jpg",
        "caption": "senyum lembut marsha"
      },
      {
        "url": "member_photos/marsha/marsha_v4_a9c34411.jpg",
        "caption": "pose anime vibes gemoy"
      },
      {
        "url": "member_photos/marsha/marsha_v4_bf42dd13.jpg",
        "caption": "candid marsha di teater"
      },
      {
        "url": "member_photos/marsha/marsha_v4_d440b4a9.jpg",
        "caption": "selfie close up peri"
      },
      {
        "url": "member_photos/marsha/marsha_v4_d5e12063.jpg",
        "caption": "ootd pastel manis 👗"
      },
      {
        "url": "member_photos/marsha/marsha_v4_e2a7b5ff.jpg",
        "caption": "selfie santai minum matcha 🍵"
      },
      {
        "url": "member_photos/marsha/marsha_v4_f0d8d26b.jpg",
        "caption": "selfie peri matcha ✨🍵"
      }
    ]
  },
  {
    "id": "muthe",
    "group": "JKT48",
    "name": "Mutiara Azzahra",
    "nickname": "Muthe",
    "generation": "Generasi 7",
    "color": "#D65DB1",
    "avatar": "member_photos/muthe/avatar.jpg",
    "status": "Online • Muthe",
    "statusBio": "online",
    "jikoshoukai": "Senyum semanis mutiara, ceriakan harimu dengan energiku!",
    "fandom": "Mutheation",
    "tags": [
      "Energik",
      "Momo Lookalike",
      "Ceria"
    ],
    "paps": [
      {
        "url": "member_photos/muthe/muthe_01f05433.jpg",
        "caption": "selfie ceria muthe 💖"
      },
      {
        "url": "member_photos/muthe/muthe_034541f3.jpg",
        "caption": "pose energik sebelum teater"
      },
      {
        "url": "member_photos/muthe/muthe_1023f413.jpg",
        "caption": "candid muthe lagi ketawa"
      },
      {
        "url": "member_photos/muthe/muthe_2f5aca7f.png",
        "caption": "selfie close up muthe"
      },
      {
        "url": "member_photos/muthe/muthe_3c61782b.png",
        "caption": "ootd colorful ceria 👗"
      },
      {
        "url": "member_photos/muthe/muthe_4ae904de.jpg",
        "caption": "muthe semangatin kamu hari ini ✨"
      },
      {
        "url": "member_photos/muthe/muthe_5b8598bb.jpg",
        "caption": "senyum mutiara manis ✨"
      },
      {
        "url": "member_photos/muthe/muthe_8f841991.jpg",
        "caption": "selfie ceria muthe 💖"
      },
      {
        "url": "member_photos/muthe/muthe_9242b912.jpg",
        "caption": "pose energik sebelum teater"
      },
      {
        "url": "member_photos/muthe/muthe_a3a05b53.jpg",
        "caption": "candid muthe lagi ketawa"
      },
      {
        "url": "member_photos/muthe/muthe_abdbab9b.png",
        "caption": "selfie close up muthe"
      },
      {
        "url": "member_photos/muthe/muthe_b2658f11.jpg",
        "caption": "ootd colorful ceria 👗"
      },
      {
        "url": "member_photos/muthe/muthe_b2d1ba20.png",
        "caption": "muthe semangatin kamu hari ini ✨"
      },
      {
        "url": "member_photos/muthe/muthe_b8865e51.jpg",
        "caption": "senyum mutiara manis ✨"
      },
      {
        "url": "member_photos/muthe/muthe_c2191f8c.jpg",
        "caption": "selfie ceria muthe 💖"
      },
      {
        "url": "member_photos/muthe/muthe_ca45c0c0.jpg",
        "caption": "pose energik sebelum teater"
      },
      {
        "url": "member_photos/muthe/muthe_ca4693a6.jpg",
        "caption": "candid muthe lagi ketawa"
      },
      {
        "url": "member_photos/muthe/muthe_e159b9e4.png",
        "caption": "selfie close up muthe"
      },
      {
        "url": "member_photos/muthe/muthe_eac58395.jpg",
        "caption": "ootd colorful ceria 👗"
      },
      {
        "url": "member_photos/muthe/muthe_f87f4233.jpg",
        "caption": "muthe semangatin kamu hari ini ✨"
      },
      {
        "url": "member_photos/muthe/muthe_pap_v5_2e05d024.jpg",
        "caption": "senyum mutiara manis ✨"
      },
      {
        "url": "member_photos/muthe/muthe_pap_v5_41a54bd0.jpg",
        "caption": "selfie ceria muthe 💖"
      },
      {
        "url": "member_photos/muthe/muthe_pap_v5_866ef5f5.jpg",
        "caption": "pose energik sebelum teater"
      },
      {
        "url": "member_photos/muthe/muthe_pap_v5_b68dff26.jpg",
        "caption": "candid muthe lagi ketawa"
      },
      {
        "url": "member_photos/muthe/muthe_pap_v5_fca9f1f1.jpg",
        "caption": "selfie close up muthe"
      },
      {
        "url": "member_photos/muthe/muthe_v4_20e24aa0.jpg",
        "caption": "ootd colorful ceria 👗"
      },
      {
        "url": "member_photos/muthe/muthe_v4_3ee9f3fc.jpg",
        "caption": "muthe semangatin kamu hari ini ✨"
      },
      {
        "url": "member_photos/muthe/muthe_v4_4de2bcfa.jpg",
        "caption": "senyum mutiara manis ✨"
      },
      {
        "url": "member_photos/muthe/muthe_v4_68b163b7.jpg",
        "caption": "selfie ceria muthe 💖"
      },
      {
        "url": "member_photos/muthe/muthe_v4_8cc9cb7e.jpg",
        "caption": "pose energik sebelum teater"
      },
      {
        "url": "member_photos/muthe/muthe_v4_8df01cd1.jpg",
        "caption": "candid muthe lagi ketawa"
      },
      {
        "url": "member_photos/muthe/muthe_v4_a9fcf3f6.jpg",
        "caption": "selfie close up muthe"
      },
      {
        "url": "member_photos/muthe/muthe_v4_b0d65bad.jpg",
        "caption": "ootd colorful ceria 👗"
      },
      {
        "url": "member_photos/muthe/muthe_v4_c2b97a6f.jpg",
        "caption": "muthe semangatin kamu hari ini ✨"
      },
      {
        "url": "member_photos/muthe/muthe_v4_d4a780cb.jpg",
        "caption": "senyum mutiara manis ✨"
      }
    ]
  },
  {
    "id": "minji",
    "group": "NewJeans",
    "name": "Kim Minji",
    "nickname": "Minji",
    "generation": "NewJeans (Leader)",
    "color": "#2C73D2",
    "avatar": "member_photos/minji/avatar.jpg",
    "status": "Online • Minji",
    "statusBio": "online",
    "jikoshoukai": "Classic visual & warm caring leader of NewJeans. Bunnies, always stay safe!",
    "fandom": "Bunnies",
    "tags": [
      "Leader",
      "Y2K Aesthetic",
      "Classic Visual"
    ],
    "paps": [
      {
        "url": "member_photos/minji/minji_1d1498e7.jpg",
        "caption": "classic minji smile"
      },
      {
        "url": "member_photos/minji/minji_3f879ea6.jpg",
        "caption": "practice room mirror selfie 🪞"
      },
      {
        "url": "member_photos/minji/minji_413bc883.jpg",
        "caption": "candid minji aesthetic"
      },
      {
        "url": "member_photos/minji/minji_5568fb8a.jpg",
        "caption": "night practice selfie 🌙"
      },
      {
        "url": "member_photos/minji/minji_69a219d9.jpg",
        "caption": "ootd Y2K minji 🎧"
      },
      {
        "url": "member_photos/minji/minji_6d4adc92.jpg",
        "caption": "special for bunnies 💖"
      },
      {
        "url": "member_photos/minji/minji_8ee26bab.jpg",
        "caption": "selfie before dance practice 💃"
      },
      {
        "url": "member_photos/minji/minji_926ceb2b.jpg",
        "caption": "selfie santai bunnies 🐰✨"
      },
      {
        "url": "member_photos/minji/minji_b2a13757.jpg",
        "caption": "classic minji smile"
      },
      {
        "url": "member_photos/minji/minji_b82bc7ca.jpg",
        "caption": "practice room mirror selfie 🪞"
      },
      {
        "url": "member_photos/minji/minji_bbebf51f.jpg",
        "caption": "candid minji aesthetic"
      },
      {
        "url": "member_photos/minji/minji_bc2dc622.jpg",
        "caption": "night practice selfie 🌙"
      },
      {
        "url": "member_photos/minji/minji_c5b8d6d4.jpg",
        "caption": "ootd Y2K minji 🎧"
      },
      {
        "url": "member_photos/minji/minji_c68422fc.jpg",
        "caption": "special for bunnies 💖"
      },
      {
        "url": "member_photos/minji/minji_dad8e677.jpg",
        "caption": "selfie before dance practice 💃"
      },
      {
        "url": "member_photos/minji/minji_f25c2941.jpg",
        "caption": "selfie santai bunnies 🐰✨"
      },
      {
        "url": "member_photos/minji/minji_f83f7788.jpg",
        "caption": "classic minji smile"
      },
      {
        "url": "member_photos/minji/minji_fb4b4d19.jpg",
        "caption": "practice room mirror selfie 🪞"
      },
      {
        "url": "member_photos/minji/minji_fd62a447.jpg",
        "caption": "candid minji aesthetic"
      },
      {
        "url": "member_photos/minji/minji_fefd4753.jpg",
        "caption": "night practice selfie 🌙"
      },
      {
        "url": "member_photos/minji/minji_pap2_0566e244.jpg",
        "caption": "ootd Y2K minji 🎧"
      },
      {
        "url": "member_photos/minji/minji_pap2_0c3d3dd2.jpg",
        "caption": "special for bunnies 💖"
      },
      {
        "url": "member_photos/minji/minji_pap2_13738907.jpg",
        "caption": "selfie before dance practice 💃"
      },
      {
        "url": "member_photos/minji/minji_pap2_18308117.jpg",
        "caption": "selfie santai bunnies 🐰✨"
      },
      {
        "url": "member_photos/minji/minji_pap2_38a01c49.jpg",
        "caption": "classic minji smile"
      },
      {
        "url": "member_photos/minji/minji_pap2_7c29e769.jpg",
        "caption": "practice room mirror selfie 🪞"
      },
      {
        "url": "member_photos/minji/minji_pap2_8f5667ca.jpg",
        "caption": "candid minji aesthetic"
      },
      {
        "url": "member_photos/minji/minji_pap2_926e87a8.jpg",
        "caption": "night practice selfie 🌙"
      },
      {
        "url": "member_photos/minji/minji_pap2_a8f0ef1a.jpg",
        "caption": "ootd Y2K minji 🎧"
      },
      {
        "url": "member_photos/minji/minji_pap2_be163617.jpg",
        "caption": "special for bunnies 💖"
      },
      {
        "url": "member_photos/minji/minji_pap2_d05b97c1.jpg",
        "caption": "selfie before dance practice 💃"
      },
      {
        "url": "member_photos/minji/minji_pap2_d514b8cf.jpg",
        "caption": "selfie santai bunnies 🐰✨"
      },
      {
        "url": "member_photos/minji/minji_pap2_d59a0613.jpg",
        "caption": "classic minji smile"
      },
      {
        "url": "member_photos/minji/minji_pap2_ede61249.jpg",
        "caption": "practice room mirror selfie 🪞"
      },
      {
        "url": "member_photos/minji/minji_pap2_f9cee4b1.jpg",
        "caption": "candid minji aesthetic"
      },
      {
        "url": "member_photos/minji/minji_pap_06cdc685.jpg",
        "caption": "night practice selfie 🌙"
      },
      {
        "url": "member_photos/minji/minji_pap_1e470357.jpg",
        "caption": "ootd Y2K minji 🎧"
      },
      {
        "url": "member_photos/minji/minji_pap_583c28c6.jpg",
        "caption": "special for bunnies 💖"
      },
      {
        "url": "member_photos/minji/minji_pap_5ed4d973.jpg",
        "caption": "selfie before dance practice 💃"
      },
      {
        "url": "member_photos/minji/minji_pap_5f00d35a.jpg",
        "caption": "selfie santai bunnies 🐰✨"
      },
      {
        "url": "member_photos/minji/minji_pap_70381653.jpg",
        "caption": "classic minji smile"
      },
      {
        "url": "member_photos/minji/minji_pap_7a30fe67.jpg",
        "caption": "practice room mirror selfie 🪞"
      },
      {
        "url": "member_photos/minji/minji_pap_8125e98d.jpg",
        "caption": "candid minji aesthetic"
      },
      {
        "url": "member_photos/minji/minji_pap_819ae0ad.jpg",
        "caption": "night practice selfie 🌙"
      },
      {
        "url": "member_photos/minji/minji_pap_aa3321e7.jpg",
        "caption": "ootd Y2K minji 🎧"
      },
      {
        "url": "member_photos/minji/minji_pap_c3f71ffe.jpg",
        "caption": "special for bunnies 💖"
      },
      {
        "url": "member_photos/minji/minji_pap_c89b4dec.jpg",
        "caption": "selfie before dance practice 💃"
      },
      {
        "url": "member_photos/minji/minji_pap_d8014f28.jpg",
        "caption": "selfie santai bunnies 🐰✨"
      },
      {
        "url": "member_photos/minji/minji_pap_ebd5fe01.jpg",
        "caption": "classic minji smile"
      },
      {
        "url": "member_photos/minji/minji_pap_fe710922.jpg",
        "caption": "practice room mirror selfie 🪞"
      },
      {
        "url": "member_photos/minji/minji_pap_v5_50435ef1.jpg",
        "caption": "candid minji aesthetic"
      },
      {
        "url": "member_photos/minji/minji_pap_v5_aa0b84cb.jpg",
        "caption": "night practice selfie 🌙"
      },
      {
        "url": "member_photos/minji/minji_pap_v5_b4984dc8.jpg",
        "caption": "ootd Y2K minji 🎧"
      },
      {
        "url": "member_photos/minji/minji_pap_v5_c958e68c.jpg",
        "caption": "special for bunnies 💖"
      },
      {
        "url": "member_photos/minji/minji_pap_v5_d1697631.jpg",
        "caption": "selfie before dance practice 💃"
      },
      {
        "url": "member_photos/minji/minji_v4_0227546d.jpg",
        "caption": "selfie santai bunnies 🐰✨"
      },
      {
        "url": "member_photos/minji/minji_v4_0668aeb9.jpg",
        "caption": "classic minji smile"
      },
      {
        "url": "member_photos/minji/minji_v4_3bfd4c6a.jpg",
        "caption": "practice room mirror selfie 🪞"
      },
      {
        "url": "member_photos/minji/minji_v4_6b4669e5.jpg",
        "caption": "candid minji aesthetic"
      },
      {
        "url": "member_photos/minji/minji_v4_74e5862c.jpg",
        "caption": "night practice selfie 🌙"
      },
      {
        "url": "member_photos/minji/minji_v4_7fd7f42b.jpg",
        "caption": "ootd Y2K minji 🎧"
      },
      {
        "url": "member_photos/minji/minji_v4_921f2a6f.jpg",
        "caption": "special for bunnies 💖"
      },
      {
        "url": "member_photos/minji/minji_v4_98c2c984.jpg",
        "caption": "selfie before dance practice 💃"
      },
      {
        "url": "member_photos/minji/minji_v4_a38c3f2e.jpg",
        "caption": "selfie santai bunnies 🐰✨"
      },
      {
        "url": "member_photos/minji/minji_v4_fb5e6b56.jpg",
        "caption": "classic minji smile"
      }
    ]
  },
  {
    "id": "hanni",
    "group": "NewJeans",
    "name": "Hanni Pham",
    "nickname": "Hanni",
    "generation": "NewJeans",
    "color": "#F39C12",
    "avatar": "member_photos/hanni/avatar.jpg",
    "status": "Online • Hanni",
    "statusBio": "online",
    "jikoshoukai": "Sunshine bubbly vocalist & all-rounder of NewJeans. Sweet smiles for Bunnies!",
    "fandom": "Bunnies",
    "tags": [
      "Vocalist",
      "Bubbly",
      "Cute Eyesmile"
    ],
    "paps": [
      {
        "url": "member_photos/hanni/hanni_0557668f.jpg",
        "caption": "cute eyesmile hanni ✨"
      },
      {
        "url": "member_photos/hanni/hanni_17ceaf06.jpg",
        "caption": "backstage casual selfie"
      },
      {
        "url": "member_photos/hanni/hanni_1e2d2de2.jpg",
        "caption": "hanni candid moment"
      },
      {
        "url": "member_photos/hanni/hanni_3903be1c.jpg",
        "caption": "night night bunnies 🌙"
      },
      {
        "url": "member_photos/hanni/hanni_3c452ff5.jpg",
        "caption": "ootd vintage cute 👗"
      },
      {
        "url": "member_photos/hanni/hanni_3e79a54a.jpg",
        "caption": "hanni smiling for you ✨"
      },
      {
        "url": "member_photos/hanni/hanni_65a6454d.jpg",
        "caption": "hanni bubbly selfie 🐰💖"
      },
      {
        "url": "member_photos/hanni/hanni_77441051.jpg",
        "caption": "cute eyesmile hanni ✨"
      },
      {
        "url": "member_photos/hanni/hanni_774a3de2.jpg",
        "caption": "backstage casual selfie"
      },
      {
        "url": "member_photos/hanni/hanni_7f577bfc.jpg",
        "caption": "hanni candid moment"
      },
      {
        "url": "member_photos/hanni/hanni_8cfc7e7b.jpg",
        "caption": "night night bunnies 🌙"
      },
      {
        "url": "member_photos/hanni/hanni_9daf10c2.jpg",
        "caption": "ootd vintage cute 👗"
      },
      {
        "url": "member_photos/hanni/hanni_a1c4eff3.jpg",
        "caption": "hanni smiling for you ✨"
      },
      {
        "url": "member_photos/hanni/hanni_a29ce60b.jpg",
        "caption": "hanni bubbly selfie 🐰💖"
      },
      {
        "url": "member_photos/hanni/hanni_a770f767.jpg",
        "caption": "cute eyesmile hanni ✨"
      },
      {
        "url": "member_photos/hanni/hanni_ca465cac.jpg",
        "caption": "backstage casual selfie"
      },
      {
        "url": "member_photos/hanni/hanni_cd9e8016.jpg",
        "caption": "hanni candid moment"
      },
      {
        "url": "member_photos/hanni/hanni_d19fe948.jpg",
        "caption": "night night bunnies 🌙"
      },
      {
        "url": "member_photos/hanni/hanni_da24962a.jpg",
        "caption": "ootd vintage cute 👗"
      },
      {
        "url": "member_photos/hanni/hanni_dbb3b11f.jpg",
        "caption": "hanni smiling for you ✨"
      },
      {
        "url": "member_photos/hanni/hanni_pap_v5_265020fc.jpg",
        "caption": "hanni bubbly selfie 🐰💖"
      },
      {
        "url": "member_photos/hanni/hanni_pap_v5_2debf1c8.jpg",
        "caption": "cute eyesmile hanni ✨"
      },
      {
        "url": "member_photos/hanni/hanni_pap_v5_663fbc65.jpg",
        "caption": "backstage casual selfie"
      },
      {
        "url": "member_photos/hanni/hanni_pap_v5_a0846673.jpg",
        "caption": "hanni candid moment"
      },
      {
        "url": "member_photos/hanni/hanni_pap_v5_e1232d59.jpg",
        "caption": "night night bunnies 🌙"
      },
      {
        "url": "member_photos/hanni/hanni_v4_0eccef6e.jpg",
        "caption": "ootd vintage cute 👗"
      },
      {
        "url": "member_photos/hanni/hanni_v4_1c1b09a9.jpg",
        "caption": "hanni smiling for you ✨"
      },
      {
        "url": "member_photos/hanni/hanni_v4_2ec2a59b.jpg",
        "caption": "hanni bubbly selfie 🐰💖"
      },
      {
        "url": "member_photos/hanni/hanni_v4_35d4406a.jpg",
        "caption": "cute eyesmile hanni ✨"
      },
      {
        "url": "member_photos/hanni/hanni_v4_779b7bdb.jpg",
        "caption": "backstage casual selfie"
      },
      {
        "url": "member_photos/hanni/hanni_v4_90e4f265.jpg",
        "caption": "hanni candid moment"
      },
      {
        "url": "member_photos/hanni/hanni_v4_921ee579.jpg",
        "caption": "night night bunnies 🌙"
      },
      {
        "url": "member_photos/hanni/hanni_v4_a345a08b.jpg",
        "caption": "ootd vintage cute 👗"
      },
      {
        "url": "member_photos/hanni/hanni_v4_abb792e8.jpg",
        "caption": "hanni smiling for you ✨"
      },
      {
        "url": "member_photos/hanni/hanni_v4_eef4c3ae.jpg",
        "caption": "hanni bubbly selfie 🐰💖"
      }
    ]
  },
  {
    "id": "danielle",
    "group": "NewJeans",
    "name": "Danielle Marsh",
    "nickname": "Danielle",
    "generation": "NewJeans",
    "color": "#E67E22",
    "avatar": "member_photos/danielle/avatar.jpg",
    "status": "Online • Danielle",
    "statusBio": "online",
    "jikoshoukai": "Sunshine energy & Disney princess of NewJeans. Spread love and joy!",
    "fandom": "Bunnies",
    "tags": [
      "Sunshine",
      "Princess Vibe",
      "Sweet Smile"
    ],
    "paps": [
      {
        "url": "member_photos/danielle/danielle_028868ab.jpg",
        "caption": "princess vibes selfie 💖"
      },
      {
        "url": "member_photos/danielle/danielle_0729225e.jpg",
        "caption": "danielle cute candid"
      },
      {
        "url": "member_photos/danielle/danielle_173b6238.jpg",
        "caption": "sunny day selfie ☀️"
      },
      {
        "url": "member_photos/danielle/danielle_1bd3f2be.jpg",
        "caption": "sweet dreams bunnies 🌙"
      },
      {
        "url": "member_photos/danielle/danielle_281c876b.jpg",
        "caption": "ootd fairy aesthetic 👗"
      },
      {
        "url": "member_photos/danielle/danielle_2ae43c94.jpg",
        "caption": "sending warm hugs 🤗"
      },
      {
        "url": "member_photos/danielle/danielle_33de44de.jpg",
        "caption": "sunshine smile danielle 🌻✨"
      },
      {
        "url": "member_photos/danielle/danielle_341d5df9.jpg",
        "caption": "princess vibes selfie 💖"
      },
      {
        "url": "member_photos/danielle/danielle_555b86ed.jpg",
        "caption": "danielle cute candid"
      },
      {
        "url": "member_photos/danielle/danielle_66f9b6c7.jpg",
        "caption": "sunny day selfie ☀️"
      },
      {
        "url": "member_photos/danielle/danielle_708ea1b6.jpg",
        "caption": "sweet dreams bunnies 🌙"
      },
      {
        "url": "member_photos/danielle/danielle_72e289c4.jpg",
        "caption": "ootd fairy aesthetic 👗"
      },
      {
        "url": "member_photos/danielle/danielle_81ed8111.jpg",
        "caption": "sending warm hugs 🤗"
      },
      {
        "url": "member_photos/danielle/danielle_89b0d77d.jpg",
        "caption": "sunshine smile danielle 🌻✨"
      },
      {
        "url": "member_photos/danielle/danielle_a0312669.jpg",
        "caption": "princess vibes selfie 💖"
      },
      {
        "url": "member_photos/danielle/danielle_a151dbf2.jpg",
        "caption": "danielle cute candid"
      },
      {
        "url": "member_photos/danielle/danielle_a821bb1c.jpg",
        "caption": "sunny day selfie ☀️"
      },
      {
        "url": "member_photos/danielle/danielle_b1227094.jpg",
        "caption": "sweet dreams bunnies 🌙"
      },
      {
        "url": "member_photos/danielle/danielle_b35bec20.jpg",
        "caption": "ootd fairy aesthetic 👗"
      },
      {
        "url": "member_photos/danielle/danielle_eafa30f0.jpg",
        "caption": "sending warm hugs 🤗"
      },
      {
        "url": "member_photos/danielle/danielle_pap_v5_46de7cae.jpg",
        "caption": "sunshine smile danielle 🌻✨"
      },
      {
        "url": "member_photos/danielle/danielle_pap_v5_47c134c3.jpg",
        "caption": "princess vibes selfie 💖"
      },
      {
        "url": "member_photos/danielle/danielle_pap_v5_5fc47979.jpg",
        "caption": "danielle cute candid"
      },
      {
        "url": "member_photos/danielle/danielle_pap_v5_f24742a0.jpg",
        "caption": "sunny day selfie ☀️"
      },
      {
        "url": "member_photos/danielle/danielle_pap_v5_f35b14ce.jpg",
        "caption": "sweet dreams bunnies 🌙"
      },
      {
        "url": "member_photos/danielle/danielle_v4_1d17196b.jpg",
        "caption": "ootd fairy aesthetic 👗"
      },
      {
        "url": "member_photos/danielle/danielle_v4_25c879a0.jpg",
        "caption": "sending warm hugs 🤗"
      },
      {
        "url": "member_photos/danielle/danielle_v4_37978034.jpg",
        "caption": "sunshine smile danielle 🌻✨"
      },
      {
        "url": "member_photos/danielle/danielle_v4_59b0b792.jpg",
        "caption": "princess vibes selfie 💖"
      },
      {
        "url": "member_photos/danielle/danielle_v4_5df12eff.jpg",
        "caption": "danielle cute candid"
      },
      {
        "url": "member_photos/danielle/danielle_v4_8c11bcc6.jpg",
        "caption": "sunny day selfie ☀️"
      },
      {
        "url": "member_photos/danielle/danielle_v4_8dc262d5.jpg",
        "caption": "sweet dreams bunnies 🌙"
      },
      {
        "url": "member_photos/danielle/danielle_v4_af35679f.jpg",
        "caption": "ootd fairy aesthetic 👗"
      },
      {
        "url": "member_photos/danielle/danielle_v4_b7f393ee.jpg",
        "caption": "sending warm hugs 🤗"
      },
      {
        "url": "member_photos/danielle/danielle_v4_e5ba283d.jpg",
        "caption": "sunshine smile danielle 🌻✨"
      }
    ]
  },
  {
    "id": "haerin",
    "group": "NewJeans",
    "name": "Kang Haerin",
    "nickname": "Haerin",
    "generation": "NewJeans",
    "color": "#1ABC9C",
    "avatar": "member_photos/haerin/avatar.jpg",
    "status": "Online • Haerin",
    "statusBio": "online",
    "jikoshoukai": "Cat charm & quiet chic visual of NewJeans. Always observing calmly.",
    "fandom": "Bunnies",
    "tags": [
      "Cat Charm",
      "Quiet Chic",
      "Cute Kitty"
    ],
    "paps": [
      {
        "url": "member_photos/haerin/haerin_0b37a1b3.jpg",
        "caption": "quiet chic haerin"
      },
      {
        "url": "member_photos/haerin/haerin_136d3b09.jpg",
        "caption": "meow selfie for bunnies 🐾"
      },
      {
        "url": "member_photos/haerin/haerin_19ff6bf0.jpg",
        "caption": "haerin candid practice"
      },
      {
        "url": "member_photos/haerin/haerin_1dfc0b79.jpg",
        "caption": "listening to music 🎧"
      },
      {
        "url": "member_photos/haerin/haerin_3caa75a1.jpg",
        "caption": "haerin cute pose"
      },
      {
        "url": "member_photos/haerin/haerin_49142d26.jpg",
        "caption": "night selfie 🌙"
      },
      {
        "url": "member_photos/haerin/haerin_56f8cc94.jpg",
        "caption": "cat eyes selfie 🐱✨"
      },
      {
        "url": "member_photos/haerin/haerin_67939375.jpg",
        "caption": "quiet chic haerin"
      },
      {
        "url": "member_photos/haerin/haerin_8b6147d7.jpg",
        "caption": "meow selfie for bunnies 🐾"
      },
      {
        "url": "member_photos/haerin/haerin_916c0001.jpg",
        "caption": "haerin candid practice"
      },
      {
        "url": "member_photos/haerin/haerin_9608e277.jpg",
        "caption": "listening to music 🎧"
      },
      {
        "url": "member_photos/haerin/haerin_aba09be9.jpg",
        "caption": "haerin cute pose"
      },
      {
        "url": "member_photos/haerin/haerin_b23e21d2.jpg",
        "caption": "night selfie 🌙"
      },
      {
        "url": "member_photos/haerin/haerin_cbeda730.jpg",
        "caption": "cat eyes selfie 🐱✨"
      },
      {
        "url": "member_photos/haerin/haerin_cf744275.jpg",
        "caption": "quiet chic haerin"
      },
      {
        "url": "member_photos/haerin/haerin_dcd446cd.jpg",
        "caption": "meow selfie for bunnies 🐾"
      },
      {
        "url": "member_photos/haerin/haerin_dd0fe4f8.jpg",
        "caption": "haerin candid practice"
      },
      {
        "url": "member_photos/haerin/haerin_e7b69293.jpg",
        "caption": "listening to music 🎧"
      },
      {
        "url": "member_photos/haerin/haerin_ea912bdb.jpg",
        "caption": "haerin cute pose"
      },
      {
        "url": "member_photos/haerin/haerin_ec2dfb3c.jpg",
        "caption": "night selfie 🌙"
      },
      {
        "url": "member_photos/haerin/haerin_pap_v5_01fabcfc.jpg",
        "caption": "cat eyes selfie 🐱✨"
      },
      {
        "url": "member_photos/haerin/haerin_pap_v5_1adf509a.jpg",
        "caption": "quiet chic haerin"
      },
      {
        "url": "member_photos/haerin/haerin_pap_v5_36f282cc.jpg",
        "caption": "meow selfie for bunnies 🐾"
      },
      {
        "url": "member_photos/haerin/haerin_pap_v5_3732c07b.jpg",
        "caption": "haerin candid practice"
      },
      {
        "url": "member_photos/haerin/haerin_pap_v5_708f7d57.jpg",
        "caption": "listening to music 🎧"
      },
      {
        "url": "member_photos/haerin/haerin_pap_v5_82655f3a.jpg",
        "caption": "haerin cute pose"
      },
      {
        "url": "member_photos/haerin/haerin_pap_v5_90d51821.jpg",
        "caption": "night selfie 🌙"
      },
      {
        "url": "member_photos/haerin/haerin_pap_v5_d6d02616.jpg",
        "caption": "cat eyes selfie 🐱✨"
      },
      {
        "url": "member_photos/haerin/haerin_v4_117dd284.jpg",
        "caption": "quiet chic haerin"
      },
      {
        "url": "member_photos/haerin/haerin_v4_3c329d91.jpg",
        "caption": "meow selfie for bunnies 🐾"
      },
      {
        "url": "member_photos/haerin/haerin_v4_84552b15.jpg",
        "caption": "haerin candid practice"
      },
      {
        "url": "member_photos/haerin/haerin_v4_8589b5ce.jpg",
        "caption": "listening to music 🎧"
      },
      {
        "url": "member_photos/haerin/haerin_v4_8c5ab91f.jpg",
        "caption": "haerin cute pose"
      },
      {
        "url": "member_photos/haerin/haerin_v4_9612e665.jpg",
        "caption": "night selfie 🌙"
      },
      {
        "url": "member_photos/haerin/haerin_v4_c15b9baa.jpg",
        "caption": "cat eyes selfie 🐱✨"
      },
      {
        "url": "member_photos/haerin/haerin_v4_e268bce0.jpg",
        "caption": "quiet chic haerin"
      },
      {
        "url": "member_photos/haerin/haerin_v4_edb213fd.jpg",
        "caption": "meow selfie for bunnies 🐾"
      },
      {
        "url": "member_photos/haerin/haerin_v4_f959e9e9.jpg",
        "caption": "haerin candid practice"
      }
    ]
  },
  {
    "id": "hyein",
    "group": "NewJeans",
    "name": "Lee Hyein",
    "nickname": "Hyein",
    "generation": "NewJeans",
    "color": "#9B59B6",
    "avatar": "member_photos/hyein/avatar.jpg",
    "status": "Online • Hyein",
    "statusBio": "online",
    "jikoshoukai": "Chic model maknae with soulful vocals. Youngest shining star of NewJeans!",
    "fandom": "Bunnies",
    "tags": [
      "Maknae",
      "Model Vibe",
      "Soulful"
    ],
    "paps": [
      {
        "url": "member_photos/hyein/hyein_28b85bcb.jpg",
        "caption": "hyein chic visual 💖"
      },
      {
        "url": "member_photos/hyein/hyein_35c945b7.jpg",
        "caption": "fashion ootd hyein 👗"
      },
      {
        "url": "member_photos/hyein/hyein_44de2ede.jpg",
        "caption": "backstage mirror selfie 🪞"
      },
      {
        "url": "member_photos/hyein/hyein_47a78de8.jpg",
        "caption": "hyein cute smile"
      },
      {
        "url": "member_photos/hyein/hyein_4cc481bb.jpg",
        "caption": "practice room photo 💃"
      },
      {
        "url": "member_photos/hyein/hyein_51b5e83f.jpg",
        "caption": "love you bunnies 🐰✨"
      },
      {
        "url": "member_photos/hyein/hyein_6a45bc31.jpg",
        "caption": "model maknae selfie ✨"
      },
      {
        "url": "member_photos/hyein/hyein_6cbffdc7.jpg",
        "caption": "hyein chic visual 💖"
      },
      {
        "url": "member_photos/hyein/hyein_70ece6d8.png",
        "caption": "fashion ootd hyein 👗"
      },
      {
        "url": "member_photos/hyein/hyein_7e1aac07.jpg",
        "caption": "backstage mirror selfie 🪞"
      },
      {
        "url": "member_photos/hyein/hyein_86770fab.jpg",
        "caption": "hyein cute smile"
      },
      {
        "url": "member_photos/hyein/hyein_898477f6.jpg",
        "caption": "practice room photo 💃"
      },
      {
        "url": "member_photos/hyein/hyein_8cdb536f.jpg",
        "caption": "love you bunnies 🐰✨"
      },
      {
        "url": "member_photos/hyein/hyein_8f446551.jpg",
        "caption": "model maknae selfie ✨"
      },
      {
        "url": "member_photos/hyein/hyein_9f57bd03.jpg",
        "caption": "hyein chic visual 💖"
      },
      {
        "url": "member_photos/hyein/hyein_a1979157.jpg",
        "caption": "fashion ootd hyein 👗"
      },
      {
        "url": "member_photos/hyein/hyein_a7dddfeb.jpg",
        "caption": "backstage mirror selfie 🪞"
      },
      {
        "url": "member_photos/hyein/hyein_ca4b76da.jpg",
        "caption": "hyein cute smile"
      },
      {
        "url": "member_photos/hyein/hyein_dd6f6455.jpg",
        "caption": "practice room photo 💃"
      },
      {
        "url": "member_photos/hyein/hyein_fe587b66.jpg",
        "caption": "love you bunnies 🐰✨"
      },
      {
        "url": "member_photos/hyein/hyein_pap_v5_003e7b4d.jpg",
        "caption": "model maknae selfie ✨"
      },
      {
        "url": "member_photos/hyein/hyein_pap_v5_1d8bf0dc.jpg",
        "caption": "hyein chic visual 💖"
      },
      {
        "url": "member_photos/hyein/hyein_pap_v5_7c66e27f.jpg",
        "caption": "fashion ootd hyein 👗"
      },
      {
        "url": "member_photos/hyein/hyein_pap_v5_d552c5b4.jpg",
        "caption": "backstage mirror selfie 🪞"
      },
      {
        "url": "member_photos/hyein/hyein_pap_v5_e09b2ccd.jpg",
        "caption": "hyein cute smile"
      },
      {
        "url": "member_photos/hyein/hyein_v4_06d6b3a2.jpg",
        "caption": "practice room photo 💃"
      },
      {
        "url": "member_photos/hyein/hyein_v4_11771078.jpg",
        "caption": "love you bunnies 🐰✨"
      },
      {
        "url": "member_photos/hyein/hyein_v4_12549b18.jpg",
        "caption": "model maknae selfie ✨"
      },
      {
        "url": "member_photos/hyein/hyein_v4_2ae3aecd.jpg",
        "caption": "hyein chic visual 💖"
      },
      {
        "url": "member_photos/hyein/hyein_v4_3e8c30b8.jpg",
        "caption": "fashion ootd hyein 👗"
      },
      {
        "url": "member_photos/hyein/hyein_v4_3fc3b501.jpg",
        "caption": "backstage mirror selfie 🪞"
      },
      {
        "url": "member_photos/hyein/hyein_v4_4a59e399.jpg",
        "caption": "hyein cute smile"
      },
      {
        "url": "member_photos/hyein/hyein_v4_7ec7c16d.jpg",
        "caption": "practice room photo 💃"
      },
      {
        "url": "member_photos/hyein/hyein_v4_8562de94.jpg",
        "caption": "love you bunnies 🐰✨"
      },
      {
        "url": "member_photos/hyein/hyein_v4_aa6a3b2a.jpg",
        "caption": "model maknae selfie ✨"
      }
    ]
  }
];
