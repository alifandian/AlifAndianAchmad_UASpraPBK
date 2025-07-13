# 🏥 Hospital Management System

Sebuah aplikasi manajemen rumah sakit modern berbasis **Vue.js** dengan arsitektur modular, integrasi REST API, state management menggunakan **Pinia**, serta pengujian unit dengan **Vitest**.

---

## ✨ Fitur Utama

- **Dashboard**: Statistik ringkas pasien, obat, user, dan laporan.
- **Manajemen Pasien**: CRUD data pasien (tambah, edit, hapus, cari).
- **Order Obat**: CRUD order obat (tambah, edit, hapus, cari).
- **Manajemen User**: Struktur halaman sudah siap, bisa dikembangkan lebih lanjut.
- **Laporan**: Menampilkan daftar laporan rumah sakit.
- **Login**: Struktur login sudah ada, siap dikembangkan.
- **Navigasi Modern**: Menu responsif dan elegan.

---

## 🗂️ Struktur Folder

src/
  assets/           # Gambar & aset statis
  components/       # Komponen UI (jika ingin menambah)
  router/           # Konfigurasi routing (src/router/index.js)
  store/            # Pinia store (patientStore.js, medicationStore.js)
  views/            # Halaman utama (DashboardView, PatientsView, dsb)
  App.vue           # Root component, layout & navigasi
  main.js           # Entry point, inisialisasi Vue, Pinia, Router


---

## 🔗 Routing

- Routing diatur di `src/router/index.js` menggunakan **vue-router** (history mode).
- Setiap menu utama (Dashboard, Patients, Medications, Users, Reports, Login) memiliki **route** dan **komponen view** tersendiri.
- Navigasi utama didefinisikan di `App.vue` dan tampil secara konsisten di setiap halaman.

---

## 🏪 State Management (Pinia)

- Digunakan untuk mengelola state aplikasi.
- Store utama:
  - `src/store/patientStore.js` — Mengelola data pasien (state, actions CRUD, error, loading).
  - `src/store/medicationStore.js` — Mengelola data order obat (state, actions CRUD, error, loading).
- Store di-*inject* di `main.js` dan digunakan di komponen seperti `PatientsView` dan `MedicationsView`.

---

## 🌐 Integrasi API (axios + json-server)

- Menggunakan **axios** untuk komunikasi HTTP dengan **json-server** sebagai REST API mock.
- Endpoint utama:
  - `GET/POST/PUT/DELETE http://localhost:3001/patients`
  - `GET/POST/PUT/DELETE http://localhost:3001/medications`
- Operasi CRUD penuh untuk entitas pasien dan order obat menggunakan axios.

---

## 🧪 Unit Testing (Vitest)

- Menggunakan **Vitest** untuk pengujian unit.
- Pengujian dilakukan pada:
  - **Pinia Store**:
    - `src/store/patientStore.test.js`
    - `src/store/medicationStore.test.js`
    - Menguji fungsi fetch, add, update, delete dengan mock axios.
  - **Komponen Vue**:
    - `src/views/PatientsView.test.js`
    - Menguji render tabel pasien dan interaksi tombol tambah (modal).
- Konfigurasi environment test menggunakan `jsdom` pada `vite.config.js`.

---

## ⚙️ Setup & Menjalankan Proyek

### 📥 Install dependencies

```bash
npm install

```
### 📥 Jalankan json-server (mock API):

```bash
npx json-server --watch db.json --port 3001

```

### 📥 Jalankan aplikasi:

```bash
npm run dev

```
### 📥 Jalankan unit test:

```bash
npx vitest

```

### 📥 atau UI:

```bash
   npx vitest --ui

```

### jika ada salah satu unit gagal di jalankan maka ketik perintah ini terlebih dahulu sebelum menjalankan npx vitest --ui :

```bash
npx vitest --environment jsdom
npx vitest --ui --environment jsdom
```
📄 Penjelasan Singkat Web
Aplikasi ini dirancang untuk memudahkan pengelolaan data rumah sakit secara modern dan efisien.
Setiap fitur utama seperti pasien, order obat, user, dan laporan sudah memiliki struktur CRUD dan siap dikembangkan lebih lanjut.

Aplikasi ini menerapkan:

Arsitektur modular

Integrasi REST API

State management dengan Pinia

Unit testing dengan Vitest
Semuanya mengikuti best practice pengembangan aplikasi modern berbasis Vue.

🚀 Pengembangan Selanjutnya
Integrasi API & CRUD untuk user dan login.

Validasi form yang lebih kompleks.

Fitur laporan dinamis.

Proteksi route (autentikasi).

UI/UX lebih advance dan interaktif.







  
