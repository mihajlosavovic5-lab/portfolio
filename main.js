    window.addEventListener('load', function () {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    });

    emailjs.init('InYbbu2JFu38sZxn3');

    const scrollEl = document.getElementById('scroll-container');

    document.getElementById('posalji').addEventListener('click', function () {
        const ime = document.getElementById('ime-input').value;
        const email = document.getElementById('email-input').value;
        const poruka = document.getElementById('poruka-input').value;

        if (!ime || !email || !poruka) {
            const dugme = document.getElementById('posalji');
            dugme.classList.add('shake');
            setTimeout(() => dugme.classList.remove('shake'), 400);
            return;
        }

        emailjs.send('service_3h0mh13', 'template_hlv1rxo', {
            name: ime,
            email: email,
            message: poruka
        }).then(function () {
            const toast = document.getElementById('toast');
            toast.classList.add('vidljiv');
            setTimeout(() => toast.classList.remove('vidljiv'), 3000);
        }).catch(function () {
            alert('Error sending. Please try again.');
        });
    });

    const linkovi = document.querySelectorAll('nav a');
    const stranice = document.querySelectorAll('.stranica');
    linkovi.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            zatvoriMeni();
            linkovi.forEach(l => l.classList.remove('aktivna'));
            this.classList.add('aktivna');

            const cilj = this.getAttribute('href').replace('#', '');

            stranice.forEach(function (s) {
                s.classList.remove('aktivna');
            });

            const el = document.getElementById(cilj);
            el.classList.add('aktivna');
            document.getElementById('o-meni').classList.add('bez-animacija');
            scrollEl.scrollTo({ top: 0, behavior: 'smooth' });

            if (cilj === 'projekti') {
                pokreniCountere();
                animirajKartice();
            }
        });
    });



    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    window.addEventListener('load', function () {
        document.querySelectorAll('.kartica img').forEach(img => {
            img.classList.add('ucitana');
        });
    });

    const progressBar = document.querySelector('.progress-bar');

    scrollEl.addEventListener('scroll', function () {
        const scrollTop = scrollEl.scrollTop;
        const docHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    const hamburger = document.getElementById('hamburger');
    scrollEl.addEventListener('scroll', function () {
        if (scrollEl.scrollTop > 10) {
            hamburger.classList.add('skriven');
        } else {
            hamburger.classList.remove('skriven');
        }
    }, { passive: true });

    const backToTop = document.getElementById('back-to-top');

    scrollEl.addEventListener('scroll', function () {
        if (scrollEl.scrollTop > 120) {
            backToTop.classList.add('vidljivo');
        } else {
            backToTop.classList.remove('vidljivo');
        }
    });

    backToTop.addEventListener('click', function () {
        scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function pokreniCountere() {
        const counteri = document.querySelectorAll('#projekti .counter');
        counteri.forEach(counter => {
            counter.innerText = '0';
            const cilj = parseInt(counter.getAttribute('data-cilj'));
            const korak = cilj / 50;
            const interval = setInterval(() => {
                const trenutno = parseFloat(counter.innerText);
                if (trenutno < cilj) {
                    counter.innerText = Math.ceil(trenutno + korak);
                } else {
                    const plus = counter.getAttribute('data-plus');
                    counter.innerText = cilj + (plus ? '+' : '');
                    clearInterval(interval);
                }
            }, 30);
        });
    }

    const tekst = "Web developer from Serbia"
    const typewriter = document.getElementById('typewriter');
    let i = 0;

    setTimeout(() => {
        const interval = setInterval(() => {
            if (i < tekst.length) {
                typewriter.textContent += tekst[i];
                i++;
            } else {
                clearInterval(interval);
            }
        }, 35);
    }, 1600);

    const bio = document.querySelector('.o-meni-bio');
    const bioObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            bio.classList.add('vidljiva');
            bioObserver.unobserve(bio);
        }
    }, { threshold: 0.2, root: scrollEl });
    bioObserver.observe(bio);

    function animirajKartice() {
        const kartice = document.querySelectorAll('.kartica');
        kartice.forEach(kartica => {
            kartica.classList.remove('vidljiva');
        });

        const observer = new IntersectionObserver((entries) => {
            const vidljive = entries.filter(entry => entry.isIntersecting);
            vidljive.forEach((entry, i) => {
                setTimeout(() => {
                    entry.target.classList.add('vidljiva');
                }, i * 250);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.1, root: scrollEl });

        kartice.forEach(kartica => observer.observe(kartica));
    }

    function zatvoriMeni() {
        document.querySelector('nav').classList.remove('open');
        document.getElementById('menu-overlay').classList.remove('active');
        hamburger.innerHTML = '&#9776;';
    }

    hamburger.addEventListener('click', function () {
        const nav = document.querySelector('nav');
        if (nav.classList.contains('open')) {
            zatvoriMeni();
        } else {
            nav.classList.add('open');
            document.getElementById('menu-overlay').classList.add('active');
            this.innerHTML = '&#10005;';
        }
    });

    document.getElementById('menu-overlay').addEventListener('click', zatvoriMeni);

    document.getElementById('kontakt-dugme').addEventListener('click', function () {
        scrollEl.style.scrollBehavior = 'auto';
        scrollEl.scrollTop = 0;
        stranice.forEach(s => s.classList.remove('aktivna'));
        document.getElementById('kontakt').classList.add('aktivna');
        linkovi.forEach(l => l.classList.remove('aktivna'));
        document.querySelector('nav a[href="#kontakt"]').classList.add('aktivna');
        document.getElementById('o-meni').classList.add('bez-animacija');
        setTimeout(() => { scrollEl.style.scrollBehavior = ''; }, 50);
    });

    document.querySelectorAll('.socijalne a').forEach(ikona => {
        ikona.addEventListener('click', function () {
            this.classList.remove('tapnuto');
            void this.offsetWidth;
            this.classList.add('tapnuto');
            setTimeout(() => this.classList.remove('tapnuto'), 450);
        });
    });
