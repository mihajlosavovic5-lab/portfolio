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

    linkovi.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            zatvoriMeni();
            const cilj = this.getAttribute('href').replace('#', '');
            const el = document.getElementById(cilj);
            scrollEl.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
        });
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                linkovi.forEach(l => l.classList.remove('aktivna'));
                const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('aktivna');
            }
        });
    }, { root: scrollEl, threshold: 0.4 });

    document.querySelectorAll('section').forEach(s => sectionObserver.observe(s));

    const scrollEls = [
        document.querySelector('#projekti h2'),
        document.querySelector('#projekti .podnaslov'),
        document.querySelector('#projekti .counteri'),
        document.querySelector('#projekti .projekti-grid'),
        document.querySelector('#kontakt h2'),
        document.querySelector('#kontakt .kontakt-grid'),
    ].filter(Boolean);

    scrollEls.forEach(el => el.classList.add('scroll-el'));

    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('vidljiv');
                }, i * 80);
                scrollRevealObserver.unobserve(entry.target);
            }
        });
    }, { root: scrollEl, threshold: 0.15 });

    scrollEls.forEach(el => scrollRevealObserver.observe(el));



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

    let tekst = "Web developer from Serbia";
    const typewriter = document.getElementById('typewriter');
    let i = 0;
    let typewriterInterval = null;

    function startTypewriter() {
        if (typewriterInterval) clearInterval(typewriterInterval);
        typewriter.textContent = '';
        i = 0;
        typewriterInterval = setInterval(() => {
            if (i < tekst.length) {
                typewriter.textContent += tekst[i];
                i++;
            } else {
                clearInterval(typewriterInterval);
            }
        }, 35);
    }

    setTimeout(startTypewriter, 1600);

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

    let countersDone = false;
    const projektiObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersDone) {
            countersDone = true;
            pokreniCountere();
            animirajKartice();
        }
    }, { root: scrollEl, threshold: 0.1 });
    projektiObserver.observe(document.getElementById('projekti'));

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

    const translations = {
        en: {
            nav_about: 'About me',
            nav_projects: 'Projects',
            nav_contact: 'Contact',
            hello: 'Hello!',
            ime: "I'm Mihajlo Savović",
            typewriter: 'Web developer from Serbia',
            bio: "I'm a 20-year-old self-taught frontend developer from Kragujevac, Serbia. With a background in IT high school and years of independent learning alongside formal education, I've built a solid foundation in modern web development.<br><br>I'm drawn to frontend because I love the creative side of coding — turning ideas into visual, interactive experiences. Every project is a chance to combine logic with design.<br><br>Currently planning to continue my education at university, while actively expanding my skills and working on real-world projects.",
            bio: "I'm a 20-year-old self-taught frontend developer from Kragujevac, Serbia. With a background in IT high school and years of independent learning alongside formal education, I've built a solid foundation in modern web development.<br><br>I'm drawn to frontend because I love the creative side of coding — turning ideas into visual, interactive experiences. Every project is a chance to combine logic with design.<br><br>Currently planning to continue my education at university, while actively expanding my skills and working on real-world projects.",
            contact_btn: 'Contact me',
            projects_title: 'My Projects',
            projects_sub: "Projects I've worked on",
            counter_projects: 'Projects',
            counter_years: 'Years of learning',
            counter_hours: 'Hours coding',
            card_title: 'Portfolio website',
            card_desc: 'Personal portfolio site built from scratch. Responsive design, animations, JavaScript interactivity.',
            view_project: 'View project',
            contact_title: 'Contact',
            contact_info: 'Information',
            lokacija: '📍 Kragujevac, Serbia',
            call_me: 'Call me',
            label_name: 'Your name',
            label_email: 'Your email',
            label_msg: 'Your message',
            send_btn: 'Send message',
            footer: '© 2026 Mihajlo Savović. All rights reserved.',
            toast: '✅ Message sent!',
        },
        sr: {
            nav_about: 'O meni',
            nav_projects: 'Projekti',
            nav_contact: 'Kontakt',
            hello: 'Zdravo!',
            ime: 'Ja sam Mihajlo Savović',
            typewriter: 'Web developer iz Srbije',

            bio: 'Imam 20 godina i samouk sam frontend developer iz Kragujevca, Srbije. Sa završenom IT školom i godinama samostalnog učenja uz formalno obrazovanje, izgradio sam solidnu osnovu u modernom web razvoju.<br><br>Privučen sam frontendom jer volim kreativnu stranu kodiranja — pretvaranje ideja u vizuelna, interaktivna iskustva. Svaki projekat je prilika da kombinujem logiku i dizajn.<br><br>Trenutno planiram nastavak školovanja na fakultetu, dok aktivno proširujem veštine i radim na realnim projektima.',
            contact_btn: 'Kontaktiraj me',
            projects_title: 'Moji projekti',
            projects_sub: 'Projekti na kojima sam radio',
            counter_projects: 'Projekata',
            counter_years: 'Godina učenja',
            counter_hours: 'Sati kodiranja',
            card_title: 'Portfolio sajt',
            card_desc: 'Lični portfolio sajt napravljen od nule. Responzivan dizajn, animacije, JavaScript interaktivnost.',
            view_project: 'Pogledaj projekat',
            contact_title: 'Kontakt',
            contact_info: 'Informacije',
            lokacija: '📍 Kragujevac, Srbija',
            call_me: 'Pozovi me',
            label_name: 'Vaše ime',
            label_email: 'Vaš email',
            label_msg: 'Vaša poruka',
            send_btn: 'Pošalji poruku',
            footer: '© 2026 Mihajlo Savović. Sva prava zadržana.',
            toast: '✅ Poruka poslata!',
        }
    };

    let currentLang = 'en';
    const langToggle = document.getElementById('lang-toggle');

    function applyLang(lang) {
        const t = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) {
                el.innerHTML = t[key];
            }
        });
        const flag = document.getElementById('lang-flag');
        const flagDesktop = document.getElementById('lang-flag-desktop');
        if (lang === 'sr') {
            flag.src = 'https://flagcdn.com/w40/gb.png';
            flag.alt = 'EN';
            flagDesktop.src = 'https://flagcdn.com/w40/gb.png';
            flagDesktop.alt = 'EN';
        } else {
            flag.src = 'https://flagcdn.com/w40/rs.png';
            flag.alt = 'SR';
            flagDesktop.src = 'https://flagcdn.com/w40/rs.png';
            flagDesktop.alt = 'SR';
        }
        tekst = t.typewriter;
        startTypewriter();
    }

    langToggle.addEventListener('click', function () {
        currentLang = currentLang === 'en' ? 'sr' : 'en';
        applyLang(currentLang);
    });

    document.getElementById('lang-toggle-desktop').addEventListener('click', function () {
        currentLang = currentLang === 'en' ? 'sr' : 'en';
        applyLang(currentLang);
    });

    scrollEl.addEventListener('scroll', function () {
        if (scrollEl.scrollTop > 10) langToggle.classList.add('skriven');
        else langToggle.classList.remove('skriven');
    }, { passive: true });

    document.getElementById('kontakt-dugme').addEventListener('click', function () {
        const el = document.getElementById('kontakt');
        scrollEl.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
    });

    document.querySelectorAll('.socijalne a').forEach(ikona => {
        ikona.addEventListener('click', function () {
            this.classList.remove('tapnuto');
            void this.offsetWidth;
            this.classList.add('tapnuto');
            setTimeout(() => this.classList.remove('tapnuto'), 450);
        });
    });
