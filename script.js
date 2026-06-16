// ============================================================
// INISIALISASI AWAL (saat halaman selesai dimuat)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    initThemeToggle();
    initNavbar();
    initHamburgerMenu();
    initActiveNavLink();
    initSkillBars();
    initPortfolioFilter();
    initContactForm();
    initBackToTop();
    initFadeInAnimation();
    initFooterYear();

});

// ============================================================
// AKHIR INISIALISASI AWAL
// ============================================================




// ============================================================
// DARK / LIGHT MODE TOGGLE
// ============================================================

function initThemeToggle() {

    const html         = document.documentElement;
    const themeToggle  = document.getElementById('themeToggle');

    // Cek tema yang tersimpan di localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', function () {
        const current = html.getAttribute('data-theme');
        const next    = current === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

}

// ============================================================
// AKHIR DARK / LIGHT MODE TOGGLE
// ============================================================




// ============================================================
// NAVBAR SCROLL (background muncul saat scroll)
// ============================================================

function initNavbar() {

    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

}

// ============================================================
// AKHIR NAVBAR SCROLL
// ============================================================




// ============================================================
// HAMBURGER MENU MOBILE
// ============================================================

function initHamburgerMenu() {

    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');
    const navLinks  = document.querySelectorAll('.nav-link');

    // Buka / tutup menu saat tombol hamburger diklik
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Tutup menu saat salah satu link diklik
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

}

// ============================================================
// AKHIR HAMBURGER MENU MOBILE
// ============================================================




// ============================================================
// ACTIVE LINK NAVIGASI (highlight sesuai section yang aktif)
// ============================================================

function initActiveNavLink() {

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        sections.forEach(function (section) {
            const sectionTop    = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId     = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

}

// ============================================================
// AKHIR ACTIVE LINK NAVIGASI
// ============================================================




// ============================================================
// SKILL BARS ANIMASI (progress bar terisi saat terlihat)
// ============================================================

function initSkillBars() {

    const skillBars = document.querySelectorAll('.skill-bar-fill');

    // Gunakan IntersectionObserver agar animasi hanya jalan saat terlihat
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const bar     = entry.target;
                const percent = bar.getAttribute('data-percent');
                bar.style.width = percent + '%';
                observer.unobserve(bar); // hanya animasi sekali
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(function (bar) {
        observer.observe(bar);
    });

}

// ============================================================
// AKHIR SKILL BARS ANIMASI
// ============================================================




// ============================================================
// FILTER PORTFOLIO
// ============================================================

function initPortfolioFilter() {

    const filterBtns   = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {

            // Hapus kelas active dari semua tombol
            filterBtns.forEach(function (b) { b.classList.remove('active'); });

            // Tambahkan active ke tombol yang diklik
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioCards.forEach(function (card) {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });

        });
    });

}

// ============================================================
// AKHIR FILTER PORTFOLIO
// ============================================================




// ============================================================
// FORM KONTAK (validasi & simulasi kirim pesan)
// ============================================================

function initContactForm() {

    const form       = document.getElementById('contactForm');
    const submitBtn  = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Ambil nilai input
        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validasi sederhana
        if (!name || !email || !subject || !message) {
            showStatus('Harap isi semua kolom terlebih dahulu.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showStatus('Format email tidak valid.', 'error');
            return;
        }

        // Simulasi pengiriman pesan (tampilkan loading)
        submitBtn.disabled    = true;
        submitBtn.textContent = 'Mengirim...';

        setTimeout(function () {
            showStatus('Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.', 'success');
            form.reset();
            submitBtn.disabled    = false;
            submitBtn.innerHTML   = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
        }, 1500);

    });

    // Fungsi validasi email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Fungsi tampilkan status form
    function showStatus(msg, type) {
        formStatus.textContent  = msg;
        formStatus.className    = 'form-status ' + type;

        // Hapus pesan setelah 5 detik
        setTimeout(function () {
            formStatus.textContent = '';
            formStatus.className   = 'form-status';
        }, 5000);
    }

}

// ============================================================
// AKHIR FORM KONTAK
// ============================================================




// ============================================================
// TOMBOL BACK TO TOP
// ============================================================

function initBackToTop() {

    const backToTop = document.getElementById('backToTop');

    // Tampilkan tombol saat scroll lebih dari 400px
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll ke atas saat tombol diklik
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

}

// ============================================================
// AKHIR TOMBOL BACK TO TOP
// ============================================================




// ============================================================
// FADE-IN ANIMASI SAAT SCROLL (elemen muncul perlahan)
// ============================================================

function initFadeInAnimation() {

    // Tambahkan kelas fade-in ke semua elemen yang ingin dianimasikan
    const targets = document.querySelectorAll(
        '.portfolio-card, .skill-category, .about-grid, .contact-grid, .detail-item'
    );

    targets.forEach(function (el) {
        el.classList.add('fade-in');
    });

    // Amati setiap elemen menggunakan IntersectionObserver
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // animasi hanya sekali
            }
        });
    }, { threshold: 0.15 });

    targets.forEach(function (el) {
        observer.observe(el);
    });

}

// ============================================================
// AKHIR FADE-IN ANIMASI SAAT SCROLL
// ============================================================




// ============================================================
// TAHUN OTOMATIS DI FOOTER (copyright selalu update)
// ============================================================

function initFooterYear() {

    const el = document.getElementById('footerYear');
    if (el) {
        el.textContent = new Date().getFullYear();
    }

}

// ============================================================
// AKHIR TAHUN OTOMATIS DI FOOTER
// ============================================================