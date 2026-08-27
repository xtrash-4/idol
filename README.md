# 🌟 MPRUYY HALU — Chat Idol JKT48 & NewJeans

Aplikasi simulasi obrolan 1-on-1 dengan member **JKT48** & **NewJeans** bertenaga Groq Cloud AI dengan dukungan foto selfie PAP resolusi tinggi terverifikasi AI YuNet, **Instagram/Weverse 24-Hour Story Player**, dan siap untuk Platform **Web & Android APK**.

---

## 🚀 Panduan Deploy ke Vercel (Gratis & Otomatis)

1. Buka [Vercel Dashboard](https://vercel.com/new).
2. Pilih / Import repositori GitHub Anda: **`xtrash-4/idol`**.
3. Pada bagian **Environment Variables**, tambahkan variabel berikut:
   * **Key**: `GROQ_API_KEY`
   * **Value**: `gsk_your_groq_api_key_here` *(Dapatkan gratis di [console.groq.com](https://console.groq.com/keys))*
   * *(Opsional)* **Key**: `GROQ_MODEL` $\rightarrow$ **Value**: `llama-3.3-70b-versatile`
4. Klik **Deploy**!
5. Selesai! Aplikasi akan langsung aktif secara publik dan seluruh pengguna dapat mengobrol dengan aman tanpa perlu memasukkan API key manual di browser.

---

## 📱 3 Cara Menjalankan di Android

### Cara 1: Install PWA Langsung dari Web (Tanpa Install APK)
1. Buka URL Vercel hasil deploy di **Google Chrome HP Android**.
2. Tekan menu titik tiga (**⋮**) di pojok kanan atas browser.
3. Pilih **"Tambahkan ke Layar Utama" / "Install Aplikasi"**.
4. Aplikasi akan terpasang di HP Anda dengan ikon tersendiri dan berjalan layar penuh (*standalone*).

### Cara 2: Download APK Otomatis via GitHub Actions
1. Masuk ke halaman repo GitHub Anda: [https://github.com/xtrash-4/idol](https://github.com/xtrash-4/idol).
2. Buka tab **Actions** $\rightarrow$ Pilih workflow **Build Android APK**.
3. Download artifact **`MPRUYY-HALU-Android-APK`** yang berisi file `.apk` siap install di HP Android.

### Cara 3: Build Manual via Android Studio
1. Buka folder `android/` di **Android Studio**.
2. Tunggu Gradle Sync selesai.
3. Buka menu **Build** $\rightarrow$ **Build Bundle(s) / APK(s)** $\rightarrow$ **Build APK(s)**.

---

## ✨ Fitur Unggulan
* 💬 **Chat Natural Multi-Burst**: Respon idol mengalir santai layaknya WhatsApp/Telegram dengan jeda mengetik realistis.
* 📸 **480+ Foto PAP HD Terverifikasi AI YuNet**: Foto selfie jernih yang 100% sinkron dengan topik pembicaraan.
* 🌸 **24-Hour Instagram Story Player**: Story harian dengan stiker lokasi teater/studio, stiker musik lagu hits asli, jam, dan fitur balas story ke DM.
* 💎 **Desain Liquid Glass Flagship**: Antarmuka obsidian modern, kartu proporsional, dan avatar rounded-square presisi.
