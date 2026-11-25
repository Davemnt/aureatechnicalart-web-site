// ===================================================================
//
// Estructura de JavaScript para el sitio web de Aurea
// Organizado por módulos (o secciones del sitio) para mayor claridad.
//
// ===================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🟢 DOM cargado, inicializando todas las funciones...');

    //
    // -----------------------------------------------------------------
    // Módulo 1: Funcionalidad de la barra de navegación (Navbar)
    // -----------------------------------------------------------------
    //
    function initNavbar() {
        console.log('📱 Inicializando navbar...');
        const navbar = document.querySelector('.custom-navbar');
        const navbarLinks = document.querySelectorAll('.main-nav-link');
        const sections = document.querySelectorAll('.page-section');
        const navToggleBtn = document.querySelector('.nav-toggle-btn');
        const mainNav = document.querySelector('.main-nav');

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

            const navLinks = document.querySelectorAll('.main-nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mainNav.classList.remove('active');
                    navToggleBtn.innerHTML = '☰';
                    navToggleBtn.setAttribute('aria-label', 'Abrir menú');
                });
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
        }

        // Función para actualizar el enlace activo en la navbar
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
                if (currentActive && link.getAttribute('href').includes(currentActive)) {
                    link.classList.add('active');
                }
            });
        }

        if (navbar) {
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('scroll', updateActiveLink);
            
            // Ejecutar al cargar la página para inicializar
            handleScroll();
            updateActiveLink();
        }
        console.log('✅ Navbar inicializado');
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

        // Objeto con descripciones e IMÁGENES para cada servicio
        const serviceData = {
            'project-management': {
                desc: 'Ofrecemos soluciones integrales de gestión de proyectos, asegurando que cada fase de tu evento se desarrolle sin problemas, desde la planificación inicial hasta la ejecución final. Nuestro equipo experto garantiza una coordinación eficiente y resultados impecables.',
                img: '/assets/images/project_management.png',
                icon: '/assets/images/icon_project_management.png'
            },
            'design-scenarios': {
                desc: 'En Aurea Technical Art, combinamos técnica y arte para dar forma a experiencias únicas que inspiran, conmueven y conectan con el público. Desde ferias, convenciones y shows, hasta acciones de marca y montajes especiales, desarrollamos propuestas que fusionan estética, funcionalidad y emoción. Esta sinergia nos permite crear momentos memorables que trascienden barreras culturales y lingüísticas, convirtiendo cada evento en una experiencia irrepetible.',
                img: '/assets/images/diseño_escenarios.png',
                icon: '/assets/images/icon_design.png'
            },
            'technical-production': {
                desc: 'Contamos con personal altamente capacitado y con amplia experiencia en producciones internacionales, especializado en la ejecución de espectáculos y giras de primer nivel mundial. Nuestro equipo se encarga de coordinar cada detalle técnico, asegurando un desarrollo fluido y profesional en todas las etapas del evento.',
                img: '/assets/images/produccion_tecnica.png',
                icon: '/assets/images/icon_technical_production.png'
            },
            'assembly-direction': {
                desc: 'Nuestro equipo técnico lidera y coordina a los servicios especializados para garantizar un montaje seguro, preciso y acorde a la magnitud del evento. Supervisamos cada fase del montaje para que el resultado final cumpla con los más altos estándares de calidad y presentación.',
                img: '/assets/images/direccion_montaje.png',
                icon: '/assets/images/icon_assembly.png'
            },
            'technical-services': {
                desc: 'Ponemos a disposición sonido, iluminación, video, pantallas LED, escenografía, efectos especiales, logística, rigging, energía y otros servicios esenciales para la correcta ejecución de cualquier evento o espectáculo. Brindamos soluciones completas que integran tecnología y experiencia profesional.',
                img: '/assets/images/servicio_tecnico.png',
                icon: '/assets/images/icon_technical_services.png'
            }
        };

        // Función para activar un servicio
        function activateService(item) {
            serviceItems.forEach(si => {
                si.classList.remove('active');
                si.querySelector('.service-heading').classList.remove('active');
            });

            item.classList.add('active');
            item.querySelector('.service-heading').classList.add('active');

            const type = item.dataset.service;
            if (serviceData[type]) {
                serviceDescriptionElement.textContent = serviceData[type].desc;
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

        // Estado inicial
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

    const cards = Array.from(carouselTrack.querySelectorAll('.portfolio-card'));
    if (cards.length === 0) return;

    const cardCount = cards.length;
    let cardWidth;
    let currentIndex = 0;

    // Clonar todos los items y agregarlos al final para el loop infinito hacia adelante
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone');
        carouselTrack.appendChild(clone);
    });

    function updateCarouselDimensions() {
        cardWidth = cards[0].offsetWidth + 30; // 30 es el gap
        updateCarousel(false);
    }

    function updateCarousel(animate = true) {
        const offset = -currentIndex * cardWidth;
        carouselTrack.style.transition = animate ? 'transform 0.5s ease' : 'none';
        carouselTrack.style.transform = `translateX(${offset}px)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();

        if (currentIndex >= cardCount) {
            // Al llegar al final de los originales (inicio de los clones)
            setTimeout(() => {
                currentIndex = 0;
                updateCarousel(false); // Salto instantáneo al principio
            }, 500); // Debe coincidir con la duración de la transición
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex === 0) {
            // Si estamos en el primer elemento, saltamos al final (al clon correspondiente)
            currentIndex = cardCount;
            updateCarousel(false); // Salto instantáneo

            // Forzamos un reflow para que la siguiente transición se aplique
            setTimeout(() => {
                currentIndex--;
                updateCarousel(true); // Animamos al elemento anterior
            }, 20);

        } else {
            currentIndex--;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarouselDimensions);
    
    // Pequeño retraso para asegurar que el DOM está completamente renderizado
    setTimeout(updateCarouselDimensions, 100);

    console.log('✅ Carrusel inicializado con loop');
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

    // ===== INICIALIZACIÓN DE TODOS LOS MÓDULOS =====
    initNavbar();
    initServices();
    initPortfolioCarousel();
    initSliders();
    initContactForm();
    initVideo();
    
    console.log('🎉 Todas las funciones inicializadas correctamente');

    
});

// Función para abrir WhatsApp
function openWhatsApp() {
    const phoneNumber = '17868468898'; // Reemplaza con tu número de teléfono
    const message = encodeURIComponent('Hola, me gustaría más información sobre sus servicios.'); // Mensaje predeterminado
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
}
