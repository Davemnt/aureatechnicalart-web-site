// ===================================================================
//
// Estructura de JavaScript para el sitio web de Aurea
// Organizado por módulos (o secciones del sitio) para mayor claridad.
//
// ===================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🟢 DOM cargado, inicializando todas las funciones...');

//
// -------------------------------------------------------------------------------------
// Módulo 1: Funcionalidad de la barra de navegación (Navbar) - CORREGIDO para data-section
// --------------------------------------------------------------------------------------
//

function initNavbar() {
    console.log('📱 Inicializando navbar...');
    const navbar = document.querySelector('.custom-navbar');
    const navbarLinks = document.querySelectorAll('.main-nav-link');
    const sections = document.querySelectorAll('.page-section');
    const navToggleBtn = document.querySelector('.nav-toggle-btn');
    const mainNav = document.querySelector('.main-nav');

    // Función para scroll suave sin hash en URL
    function smoothScrollToSection(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Calcular offset para compensar la navbar fija
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const offsetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Limpiar URL (quitar hash si existe)
            const cleanUrl = window.location.pathname;
            history.pushState({}, '', cleanUrl);
        }
    }

    // Event listeners para navegación usando data-section
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Obtener el ID de la sección del atributo data-section
            const targetId = this.getAttribute('data-section');

            if (targetId) {
                smoothScrollToSection(targetId);

                // Actualizar clase active en el menú
                navbarLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');

                // Cerrar menú móvil si está abierto
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (navToggleBtn) {
                        navToggleBtn.innerHTML = '☰';
                        navToggleBtn.setAttribute('aria-label', 'Abrir menú');
                    }
                }
            }
        });
    });

    // Menú hamburguesa
    if (navToggleBtn && mainNav) {
        navToggleBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            if (mainNav.classList.contains('active')) {
                navToggleBtn.innerHTML = '✕';
                navToggleBtn.setAttribute('aria-label', 'Cerrar menú');
            } else {
                navToggleBtn.innerHTML = '☰';
                navToggleBtn.setAttribute('aria-label', 'Abrir menú');
            }
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = navToggleBtn.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                navToggleBtn.innerHTML = '☰';
                navToggleBtn.setAttribute('aria-label', 'Abrir menú');
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mainNav.classList.remove('active');
                navToggleBtn.innerHTML = '☰';
                navToggleBtn.setAttribute('aria-label', 'Abrir menú');
            }
        });
    }

    // Función para cambiar el fondo de la navbar al hacer scroll
    function handleScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Limpiar URL de hash mientras se hace scroll
        if (window.location.hash) {
            history.replaceState({}, '', window.location.pathname);
        }
    }

    // Función para actualizar el enlace activo basado en data-section
    function updateActiveLink() {
        if (!navbar) return;

        let currentActive = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 200;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActive = section.id;
            }
        });

        navbarLinks.forEach(link => {
            link.classList.remove('active');
            // Comparar con data-section en lugar de href
            if (currentActive && link.getAttribute('data-section') === currentActive) {
                link.classList.add('active');
            }
        });
    }

    if (navbar) {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', updateActiveLink);

        // Limpiar URL al cargar la página
        if (window.location.hash) {
            history.replaceState({}, '', window.location.pathname);
        }

        // Ejecutar al cargar la página para inicializar
        handleScroll();
        updateActiveLink();
    }

    console.log('✅ Navbar inicializado correctamente para data-section');
}
    //
    // -----------------------------------------------------------------
    // Módulo 2: Funcionalidad de la sección de servicios
    // -----------------------------------------------------------------
    //
    function initServices() {
        console.log('🔧 Inicializando servicios...');

        const serviceItems = document.querySelectorAll('.service-item');
        const serviceDescriptionElement = document.querySelector('.service-description');
        const serviceImageElement = document.getElementById('service-display-image');
        const serviceIconElement = document.getElementById('service-icon-display');

        if (!serviceItems.length || !serviceDescriptionElement || !serviceImageElement) {
            console.log('⚠️ Elementos de servicios no encontrados');
            return;
        }

        const serviceData = {
            'project-management': {
                img: '/assets/images/project_management.png',
                icon: '/assets/images/icon_project_management.png'
            },
            'design-scenarios': {
                img: '/assets/images/diseño_escenarios.png',
                icon: '/assets/images/icon_design.png'
            },
            'technical-production': {
                img: '/assets/images/produccion_tecnica.png',
                icon: '/assets/images/icon_technical_production.png'
            },
            'assembly-direction': {
                img: '/assets/images/direccion_montaje.png',
                icon: '/assets/images/icon_assembly.png'
            },
            'technical-services': {
                img: '/assets/images/servicio_tecnico.png',
                icon: '/assets/images/icon_technical_services.png'
            }
        };

        function activateService(item) {
            serviceItems.forEach(si => {
                si.classList.remove('active');
                si.querySelector('.service-heading').classList.remove('active');
            });

            item.classList.add('active');
            item.querySelector('.service-heading').classList.add('active');

            const type = item.dataset.service;
            if (serviceData[type]) {
                const lang = localStorage.getItem('language') || 'es';
                serviceDescriptionElement.textContent = translations[lang].serviceDescriptions[type];
                serviceImageElement.src = serviceData[type].img;
                if (serviceIconElement) {
                    serviceIconElement.src = serviceData[type].icon;
                }
            } else {
                console.warn(`No se encontraron datos para el servicio: ${type}`);
                serviceDescriptionElement.textContent = "Selecciona un servicio para ver la descripción.";
                serviceImageElement.src = "/assets/images/mask-group.png";
                if (serviceIconElement) {
                    serviceIconElement.src = ""; // o una imagen por defecto
                }
            }
        }

        serviceItems.forEach(item => {
            item.addEventListener('mouseenter', function () {
                activateService(this);
            });

            item.addEventListener('keydown', function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    activateService(this);
                }
            });
        });

        const initialItem = document.querySelector('.service-heading.active')?.closest('.service-item');
        if (initialItem) {
            activateService(initialItem);
        } else if (serviceItems.length > 0) {
            activateService(serviceItems[0]);
        }

        console.log('✅ Servicios inicializados');
    }

   //
    // -----------------------------------------------------------------
    // Módulo 3: Animación del carrusel de PORTFOLIO (con GSAP)
    // -----------------------------------------------------------------
    //
    function initPortfolioCarousel() {
        console.log('🎠 Inicializando carrusel...');

        const carouselTrack = document.getElementById('carousel-track');
        if (!carouselTrack) {
            console.log('⚠️ Carrusel no encontrado');
            return;
        }

        const nextButton = document.getElementById('portfolio-next');
        const prevButton = document.getElementById('portfolio-prev');
        if (!nextButton || !prevButton) return;

        const cards = carouselTrack.querySelectorAll('.portfolio-card');
        if (cards.length === 0) return;

        const cardWidth = cards[0].offsetWidth + 30;
        let currentIndex = 0;

        const clones = [];
        for (let i = 0; i < cards.length; i++) {
            const clone = cards[i].cloneNode(true);
            clone.classList.add("clone");
            carouselTrack.appendChild(clone);
            clones.push(clone);
        }

        function updateCarousel(animate = true) {
            const offset = -currentIndex * cardWidth;
            carouselTrack.style.transform = `translateX(${offset}px)`;
            carouselTrack.style.transition = animate ? "transform 0.5s ease" : "none";
        }

        nextButton.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();

            if (currentIndex === cards.length) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateCarousel(false);
                }, 500);
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        updateCarousel();
        console.log('✅ Carrusel inicializado');
    }

    //
    // -----------------------------------------------------------------
    // Módulo 4: Animaciones de los sliders de CLIENTES y la barra de imágenes
    // -----------------------------------------------------------------
    //
    function initSliders() {
        console.log('🎭 Inicializando sliders...');

        const sliders = document.querySelectorAll('.clients-section .slider-track');
        const imageSlider = document.querySelector('.image-slider-section .slider-track');

        if (!sliders.length && !imageSlider) {
            console.log('⚠️ Sliders no encontrados');
            return;
        }

        function setupSlider(slider, animationDuration, direction) {
            const sliderContent = slider.innerHTML;
            slider.innerHTML += sliderContent;

            slider.style.animationDuration = animationDuration;
            if (direction === 'left') {
                slider.style.animationName = 'scroll-left-infinite';
            } else {
                slider.style.animationName = 'scroll-right-infinite';
            }
        }

        document.querySelectorAll('.clients-section .slider-container').forEach(container => {
            const track = container.querySelector('.slider-track');
            const direction = container.classList.contains('slider-right') ? 'right' : 'left';
            setupSlider(track, '55s', direction);
        });

        console.log('✅ Sliders inicializados');
    }

    //
    // -----------------------------------------------------------------
    // Módulo 5: Manejo del formulario de contacto
    // -----------------------------------------------------------------
    //
    function initContactForm() {
        console.log('📧 Inicializando formulario de contacto...');

        const form = document.getElementById("contact-form");
        const successMessage = document.getElementById("successMessage");

        console.log('Formulario encontrado:', !!form);
        console.log('Mensaje de éxito encontrado:', !!successMessage);

        if (!form) {
            console.error('❌ No se encontró el formulario con ID "contact-form"');
            return;
        }

        const submitBtn = form.querySelector('.submit-btn');
        console.log('Botón encontrado:', !!submitBtn);

        if (!submitBtn) {
            console.error('❌ No se encontró el botón .submit-btn');
            return;
        }

        form.addEventListener("submit", function(e) {
            e.preventDefault();
            console.log('🚀 Formulario enviado - Event listener funcionando');

            // Deshabilitar botón durante el envío
            submitBtn.disabled = true;
            submitBtn.textContent = "ENVIANDO...";

            const formData = new FormData(form);

            // Debug: mostrar datos que se están enviando
            console.log('📤 Datos a enviar:');
            for (let pair of formData.entries()) {
                console.log(`  ${pair[0]}: ${pair[1]}`);
            }

            fetch("send_mail.php", {
                method: "POST",
                body: formData
            })
            .then(response => {
                console.log('📡 Estado de respuesta:', response.status);
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor: ' + response.status);
                }
                return response.text();
            })
            .then(data => {
                console.log('📥 Respuesta del servidor:', data);

                if (data.trim() === "success") {
                    console.log('✅ Éxito!');
                    successMessage.style.display = "block";
                    successMessage.style.color = "var(--c-brand)";
                    successMessage.textContent = "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.";
                    form.reset();

                    setTimeout(() => {
                        successMessage.style.display = "none";
                    }, 5000);
                } else {
                    console.error('❌ Error del servidor:', data);
                    alert("Error: " + data);
                }
            })
            .catch(error => {
                console.error('💥 Error de fetch:', error);
                alert("Error de conexión: " + error.message);
            })
            .finally(() => {
                // Rehabilitar botón
                submitBtn.disabled = false;
                submitBtn.textContent = "ENVIAR";
                console.log('🔄 Botón rehabilitado');
            });
        });

        // Event listener adicional para el botón como respaldo
        submitBtn.addEventListener('click', function(e) {
            console.log('🖱️ CLICK en botón detectado directamente');
        });

        console.log('✅ Formulario de contacto inicializado');
    }

    // --- VIDEO AUTOPLAY (SAFARI/iOS FIX) ---
    function initVideo() {
        const video = document.querySelector('.video-background video');
        if (video && typeof video.play === "function") {
            video.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        }
    }

    const translations = {
        es: {
            home: "HOME",
            about: "ABOUT",
            services: "SERVICIOS",
            portfolio: "PORTFOLIO",
            contact: "CONTACTO",
            heroSubtitle: "Experimenta la fusión entre técnica y arte.",
            aboutTitle: "ABOUT",
            aboutDescription: "Aurea es una productora técnica general de eventos masivos internacionales con base en Miami que presta servicios para todo LATAM. Provee soluciones/recursos para la realización de eventos (masivos, corporativos, ferias, etc.). Trabajamos con el más estricto estándar de calidad, empleando criterios, tecnología y equipamiento de las marcas líderes del mercado mundial.",
            aboutCaption: "CALIDAD / TECNOLOGÍA / LIDERAZGO",
            teamTitle: "TEAM",
            ceoFounder: "CEO & Founder",
            setDesigner: "Set Designer",
            stageManager: "Stage Manager",
            servicesTitle: "SERVICIOS",
            projectManagement: "Project Management",
            designConcept: "Diseño y Concepto Creativo",
            technicalProduction: "Producción Técnica",
            assemblyDirection: "Dirección de Montaje",
            technicalServices: "Servicios Técnicos",
            clientsTitle: "CLIENTES",
            contactTitle: "CONTACTO",
            contactIntro: "Tu consulta cuenta. Escríbenos y te responderemos.",
            nameLabel: "Nombre",
            emailLabel: "Email",
            messageLabel: "Contanos sobre tu proyecto",
            submitBtn: "ENVIAR",
            copyrightText: "Todos los derechos reservados 2025",
            serviceDescriptions: {
                'project-management': 'Ofrecemos soluciones integrales de gestión de proyectos, asegurando que cada fase de tu evento se desarrolle sin problemas, desde la planificación inicial hasta la ejecución final. Nuestro equipo experto garantiza una coordinación eficiente y resultados impecables.',
                'design-scenarios': 'En Aurea Technical Art, combinamos técnica y arte para dar forma a experiencias únicas que inspiran, conmueven y conectan con el público. Desde ferias, convenciones y shows, hasta acciones de marca y montajes especiales, desarrollamos propuestas que fusionan estética, funcionalidad y emoción. Esta sinergia nos permite crear momentos memorables que trascienden barreras culturales y lingüísticas, convirtiendo cada evento en una experiencia irrepetible.',
                'technical-production': 'Contamos con personal altamente capacitado y con amplia experiencia en producciones internacionales, especializado en la ejecución de espectáculos y giras de primer nivel mundial. Nuestro equipo se encarga de coordinar cada detalle técnico, asegurando un desarrollo fluido y profesional en todas las etapas del evento.',
                'assembly-direction': 'Nuestro equipo técnico lidera y coordina a los servicios especializados para garantizar un montaje seguro, preciso y acorde a la magnitud del evento. Supervisamos cada fase del montaje para que el resultado final cumpla con los más altos estándares de calidad y presentación.',
                'technical-services': 'Ponemos a disposición sonido, iluminación, video, pantallas LED, escenografía, efectos especiales, logística, rigging, energía y otros servicios esenciales para la correcta ejecución de cualquier evento o espectáculo. Brindamos soluciones completas que integran tecnología y experiencia profesional.'
            }
        },
        en: {
            home: "HOME",
            about: "ABOUT",
            services: "SERVICES",
            portfolio: "PORTFOLIO",
            contact: "CONTACT",
            heroSubtitle: "Experience the fusion between technique and art.",
            aboutTitle: "ABOUT",
            aboutDescription: "Aurea is a general technical producer of international massive events based in Miami that provides services throughout LATAM. We provide solutions/resources for the realization of events (massive, corporate, fairs, etc.). We work with the strictest quality standards, employing criteria, technology and equipment from the world's leading market brands.",
            aboutCaption: "QUALITY / TECHNOLOGY / LEADERSHIP",
            teamTitle: "TEAM",
            ceoFounder: "CEO & Founder",
            setDesigner: "Set Designer",
            stageManager: "Stage Manager",
            servicesTitle: "SERVICES",
            projectManagement: "Project Management",
            designConcept: "Design and Creative Concept",
            technicalProduction: "Technical Production",
            assemblyDirection: "Assembly Direction",
            technicalServices: "Technical Services",
            clientsTitle: "CLIENTS",
            contactTitle: "CONTACT",
            contactIntro: "Your inquiry counts. Write to us and we will answer you.",
            nameLabel: "Name",
            emailLabel: "Email",
            messageLabel: "Tell us about your project",
            submitBtn: "SEND",
            copyrightText: "All rights reserved 2025",
            serviceDescriptions: {
                'project-management': 'We offer comprehensive project management solutions, ensuring that each phase of your event runs smoothly, from initial planning to final execution. Our expert team guarantees efficient coordination and impeccable results.',
                'design-scenarios': 'At Aurea Technical Art, we combine technique and art to shape unique experiences that inspire, move, and connect with the audience. From fairs, conventions, and shows, to brand actions and special assemblies, we develop proposals that fuse aesthetics, functionality, and emotion. This synergy allows us to create memorable moments that transcend cultural and linguistic barriers, turning each event into an unrepeatable experience.',
                'technical-production': 'We have highly trained personnel with extensive experience in international productions, specialized in the execution of world-class shows and tours. Our team is in charge of coordinating every technical detail, ensuring a fluid and professional development in all stages of the event.',
                'assembly-direction': 'Our technical team leads and coordinates specialized services to guarantee a safe, precise assembly in accordance with the magnitude of the event. We supervise each assembly phase so that the final result meets the highest quality and presentation standards.',
                'technical-services': 'We provide sound, lighting, video, LED screens, scenography, special effects, logistics, rigging, power and other essential services for the correct execution of any event or show. We provide comprehensive solutions that integrate technology and professional experience.'
            }
        }
    };

    // Módulo 6: Sistema de cambio de idioma
    function initLanguageSwitcher() {
        const languageButtons = document.querySelectorAll('.lang-btn');

        const setLanguage = (lang) => {
            const elements = document.querySelectorAll('[data-translate]');
            elements.forEach(el => {
                const key = el.dataset.translate;
                if (translations[lang][key]) {
                    // Handle elements with child nodes (like titles with spans)
                    if(el.childNodes.length > 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
                        el.childNodes[0].nodeValue = translations[lang][key] + ' ';
                    } else {
                        el.innerText = translations[lang][key];
                    }
                }
            });
            document.documentElement.lang = lang;
            localStorage.setItem('language', lang);

            languageButtons.forEach(btn => {
                if (btn.dataset.lang === lang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            const activeServiceItem = document.querySelector('.service-item.active');
            if (activeServiceItem) {
                const serviceType = activeServiceItem.dataset.service;
                const serviceDescriptionElement = document.querySelector('.service-description');
                if (serviceDescriptionElement && translations[lang].serviceDescriptions[serviceType]) {
                    serviceDescriptionElement.textContent = translations[lang].serviceDescriptions[serviceType];
                }
            }
        };

        languageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                setLanguage(lang);
            });
        });

        const savedLang = localStorage.getItem('language') || 'es';
        setLanguage(savedLang);
    }


   // ===== INICIALIZACIÓN DE TODOS LOS MÓDULOS =====
        initNavbar();
        initServices();
        initPortfolioCarousel();
        initSliders();
        initContactForm();
        initVideo();
        initLanguageSwitcher();

    console.log('🎉 Todas las funciones inicializadas correctamente');


});

// Función para abrir WhatsApp
function openWhatsApp() {
    const phoneNumber = '17868468898'; // Reemplaza con tu número de teléfono
    const message = encodeURIComponent('Hola, me gustaría más información sobre sus servicios.'); // Mensaje predeterminado
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
}