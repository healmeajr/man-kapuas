// Membuat fungsi untuk menampilkan kartu siswa
function tampilCard(kelas, keywords, classes) {

    // Jika classes bernilai false dan keyword berisi nilai maka jalankan perintah berikut
    if (!classes && keywords) {

        // Ambil data JSON
        $.getJSON('../js/siswa.json', function (data) {

            // Ambil data daftarsiswa dari JSON
            let daftarSiswa = data;
            let html = ``;

            // Buat daftar siswa baru untuk menampung objek
            let daftarSiswaNew = [];

            // Looping objek daftarsiswa
            for (let prop in daftarSiswa) {

                // Looping array properti objek daftarsiswa
                $.each(daftarSiswa[prop], function (i, data) {

                    // Jika bukan data guru maka jalankan perintah berikut
                    if (!data.posisi) {

                        // Ambil properti nama dari objek data
                        // Ubah properti nama objek data menjadi huruf kecil dan ubah juga keyword menjadi huruf kecil
                        let nama = data.nama.toLowerCase();
                        let keyword = keywords.toLowerCase();

                        // Jika terdapat karakter keyword didalam properti nama maka jalankan perintah berikut
                        if (nama.includes(keyword)) {

                            // Masukkan data ke dalam array daftarSiswaNew
                            daftarSiswaNew.push(data);

                            // Buat html card nya dan tambahkan ke variabel html
                            html += `
                                <div class="col-md-4 mb-4 col-lg-3 col-sm-6">
                                    <div class="card">
                                        <img src="../img/siswa/${data.kelas}/${data.img}" class="card-img-top" alt="${data.nama}">
                                        <div class="card-body text-center">
                                            <h5 class="card-title">${data.nama}</h5>
                                            <hr>
                                            <button type="button" class="btn btn-info modal-trigger" data-toggle="modal" data-target="#modal">
                                                Detail
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                    }
                })

            }

            if (daftarSiswaNew.length == 0) {
                html = `
                    <div class="col">
                        <div class="alert alert-danger text-center" role="alert">
                            <h4>Siswa yang dicari tidak ditemukan!</h4>
                            <p>Pastikan nama siswa yang dicari sudah benar</p>
                        </div>
                    </div>
                `;
            }

            // Ubah html dari elemen dengan id daftar-siswa dengan variabel html
            $('#daftar-siswa').html(html);

            // Ubah judul
            $('#judul').html(`Daftar Siswa`);

            // Jalankan fungsi modal
            ubahModal(daftarSiswaNew);
        })
        return;

        // Jika keywords berisi string kosong atau keywords tidak ada maka jalankan perintah berikut
    } else if (keywords == "" || !keywords) {

        // Ambil data JSON
        $.getJSON('../js/siswa.json', function (data) {

            // Ambil data daftarSiswa dari JSON
            let daftarSiswa = data;

            // Cek kelas
            switch (kelas) {
                case "9-1":
                    daftarSiswa = daftarSiswa.kelas91;
                    break;
                case "9-2":
                    daftarSiswa = daftarSiswa.kelas92;
                    break;
                case "9-3":
                    daftarSiswa = daftarSiswa.kelas93;
                    break;
                case "9-4":
                    daftarSiswa = daftarSiswa.kelas94;
                    break;
                case "9-5":
                    daftarSiswa = daftarSiswa.kelas95;
                    break;
                case "9-6":
                    daftarSiswa = daftarSiswa.kelas96;
                    break;
                case "9-7":
                    daftarSiswa = daftarSiswa.kelas97;
                    break;
                case "9-8":
                    daftarSiswa = daftarSiswa.kelas98;
                    break;
                case "staff":
                    daftarSiswa = daftarSiswa.staff;
                    break;

                default:
                    daftarSiswa = daftarSiswa.guru;
                    break;
            };

            // Buat variabel html dengan isi string kosong
            let html = ``;

            // Mengurutkan daftarSiswa berdasarkan nama
            daftarSiswa.sort(function (a, b) {
                var x = a.nama.toLowerCase();
                var y = b.nama.toLowerCase();
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });

            // Looping daftarSiswa
            $.each(daftarSiswa, function (i, data) {

                // Tambahkan html card ke dalam variabel html
                html += `
                    <div class="col-md-4 mb-4 col-lg-3 col-sm-6">
                        <div class="card">
                            <img src="../img/siswa/${kelas}/${data.img}" class="card-img-top" alt="${data.nama}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${data.nama}</h5>
                                <hr>
                                <button type="button" class="btn btn-info modal-trigger" data-toggle="modal" data-target="#modal">
                                    Detail
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Ubah html dari elemen dengan id daftar-siswa dengan html yang ada di variabel html
            $('#daftar-siswa').html(html);

            // Ubah judul berdasarkan kelas
            $('#judul').html(`Daftar Siswa Kelas ${kelas}`);

            // Jalankan fungsi modal
            ubahModal(daftarSiswa);
        });
    }
}

// Fungsi untuk menangani modal saat tombol detail di klik
function ubahModal(daftarSiswa) {

    // Buat variabel j sebagai acuan tombol detail
    let j = 0;

    // Looping daftarSiswa
    for (let i = 0; i < daftarSiswa.length; ++i) {

        // Ambil semua tombol detail
        const modalBtn = document.querySelectorAll('.modal-trigger');

        // Beri event click pada setiap tombol
        modalBtn[j].addEventListener('click', function () {

            // Buat variabel html dengan isi html dari modal-body
            let html = `
                <ul class="list-group mb-3">
                    <li class="list-group-item"><strong>Nama : </strong>${daftarSiswa[i].nama}</li>
                    <li class="list-group-item"><strong>Kelas : </strong>${daftarSiswa[i].kelas}</li>
                </ul>
                <blockquote class="blockquote">
                    <p class="mb-0"><strong>Pesan Kesan : </strong><br>\`\` ${daftarSiswa[i].pesanKesan} \`\`</p>
                </blockquote>
            `;

            // Tambahkan elemen html ke elemen dengan class modal-body
            $('.modal-body').html(html);
        });

        // Increment variabel j
        j++;
    };
};

// Fungsi untuk menampilkan html bagian body
function tampilBodySiswa(kelas) {

    // Buat variabel html diisi dengan html yang ada di bagian body
    const html = `
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" href="../">
                    <i class="bi bi-house-fill"></i>
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active mr-3">
                            <a class="nav-link" href="../home.html">Test</a>
                        </li>
                        <li class="nav-item dropdown active mr-3">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Siswa
                            </a>
                            <div class="dropdown-menu mb-3" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="ipa2.html">Kelas XII IPA 2</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="input-group">
                                <input type="search" class="form-control" placeholder="Cari siswa.." id="keyword" autocomplete="off" autofocus>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Akhir Navbar -->

        <!-- Daftar Siswa -->
        <div class="container">
            <div class="row text-center">
                <div class="col">
                    <h1 id="judul"></h1>
                    <hr>
                </div>
            </div>
            <div class="row" id="daftar-siswa">
                
            </div>
        </div>
        <!-- Akhir Daftar Siswa -->

        <!-- Modal -->
        <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">Detail Siswa</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Akhor Modal -->

        <!-- Footer -->
        <footer>
            <div class="container-fluid bg-dark p-5 text-light">
                <div class="row">
                    <div class="col">
                        <h3>Alumni MAN Kapuas</h3>
                        <p>Daftar Para Alumni MAN Kapuas Angkatan ke-00 Tahun 2021</p>
                        <p class="mb-0">Jika ada kesalahan penulisan nama atau menginginkan perubahan identitas silahkan hubungi saya dengan mengklik link dibawah ini</p>
                        <a href="https://wa.me/0" target="_blank">
                            https://wa.me/0
                        </a>
                    </div>
                    <div class="col">
                        <p class="text-right">Copyright © 2021 ~ Muhamad Kemal Faza,</p>
                    </div>
                </div>
            </div>
        </footer>
        <!-- Akhir Footer -->
    `;

    // Tambahkan elemen html ke dalam bagian body
    $('body').append(html);

    // Jalankan fungsi menampilkan card siswa
    tampilCard(kelas);

    // Beri event input ke elemen dengan id keyword
    $('#keyword').on('input', function () {

        // Jalankan fungsi menampilkan card siswa dan mengirimkan nilai dari yang diketikkan di input
        tampilCard(kelas, $(this).val(), false);

        // Ubah scroll kembali ke atas
        window.scrollTo(0, 0);
    });
};