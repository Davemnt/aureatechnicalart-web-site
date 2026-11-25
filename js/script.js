// ===================================================================
//
// Estructura de JavaScript para el sitio web de Aurea
// Organizado por módulos (o secciones del sitio) para mayor claridad.
//
// ===================================================================

document.addEventListener('DOMContentLoaded', function() {
    //
    // -----------------------------------------------------------------
    // Módulo 1: Funcionalidad de la barra de navegación (Navbar)
    // -----------------------------------------------------------------
    //
    function initNavbar() {
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
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Función para actualizar el enlace activo en la navbar
        function updateActiveLink() {
            let currentActive = null;
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbar.offsetHeight - 200; // Ajuste para el offset
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

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', updateActiveLink);
        
        // Ejecutar al cargar la página para inicializar
        handleScroll();
        updateActiveLink();
    }

    //
    // -----------------------------------------------------------------
    // Módulo 2: Funcionalidad de la sección de servicios
    // -----------------------------------------------------------------
    //    
    
// -----------------------------------------------------------------
    // Módulo 2: Funcionalidad de la sección de servicios OPCION 1 
    // -----------------------------------------------------------------
    //  

function initServices() {
        // --- SECCIÓN SERVICIOS: Hover y Cambio de Descripción/Imagen ---
        const serviceItems = document.querySelectorAll('.service-item');
        const serviceDescriptionElement = document.querySelector('.service-description');
        const serviceImageElement = document.getElementById('service-display-image');

        if (!serviceItems.length || !serviceDescriptionElement || !serviceImageElement) return;

        // Objeto con descripciones e IMÁGENES para cada servicio
        const serviceData = {
            'project-management': {
                desc: 'Ofrecemos soluciones integrales de gestión de proyectos, asegurando que cada fase de tu evento se desarrolle sin problemas, desde la planificación inicial hasta la ejecución final. Nuestro equipo experto garantiza una coordinación eficiente y resultados impecables.',
                img: '/assets/images/project_management.png' // Asegúrate de que esta ruta sea correcta
            },
            'design-scenarios': { // Corregido para que coincida con data-service
                desc: 'En Aurea Technical Art, combinamos técnica y arte para dar forma a experiencias únicas que inspiran, conmueven y conectan con el público. Desde ferias, convenciones y shows, hasta acciones de marca y montajes especiales, desarrollamos propuestas que fusionan estética, funcionalidad y emoción. Esta sinergia nos permite crear momentos memorables que trascienden barreras culturales y lingüísticas, convirtiendo cada evento en una experiencia irrepetible.',
                img: '/assets/images/diseño_escenarios.png' // Asegúrate de que esta ruta sea correcta
            },
            'technical-production': { // Corregido para que coincida con data-service
                desc: 'Contamos con personal altamente capacitado y con amplia experiencia en producciones internacionales, especializado en la ejecución de espectáculos y giras de primer nivel mundial. Nuestro equipo se encarga de coordinar cada detalle técnico, asegurando un desarrollo fluido y profesional en todas las etapas del evento.',
                img: '/assets/images/produccion_tecnica.png' // Asegúrate de que esta ruta sea correcta
            },
            'assembly-direction': { // Corregido para que coincida con data-service
                desc: 'Nuestro equipo técnico lidera y coordina a los servicios especializados para garantizar un montaje seguro, preciso y acorde a la magnitud del evento. Supervisamos cada fase del montaje para que el resultado final cumpla con los más altos estándares de calidad y presentación.',
                img: '/assets/images/direccion_montaje.png' // Asegúrate de que esta ruta sea correcta
            },
            'technical-services': { // Corregido para que coincida con data-service
                desc: 'Ponemos a disposición sonido, iluminación, video, pantallas LED, escenografía, efectos especiales, logística, rigging, energía y otros servicios esenciales para la correcta ejecución de cualquier evento o espectáculo. Brindamos soluciones completas que integran tecnología y experiencia profesional.',
                img: '/assets/images/servicio_tecnico.png' // Asegúrate de que esta ruta sea correcta
            },
            // 'pantalla': {
            //     desc: 'Diseño de pantallas para shows y eventos. Creación de visuales para pantallas gigantes. Sets originales para eventos comerciales y shows. Mapping 3D. Contamos con tecnología de vanguardia para ofrecer soluciones de visualización impactantes.',
            //     img: '/assets/images/mask-group.png' // Esta es la imagen predeterminada que ya tienes
            // }
        };

        // Función para activar un servicio
        function activateService(item) {
            // Remover clase 'active' de todos los ítems
            serviceItems.forEach(si => {
                si.classList.remove('active');
                si.querySelector('.service-heading').classList.remove('active'); // Remover de los headings también
            });

            // Añadir clase 'active' al ítem y heading actual
            item.classList.add('active');
            item.querySelector('.service-heading').classList.add('active');

            const type = item.dataset.service;
            if (serviceData[type]) { // Asegúrate de que el tipo exista en serviceData
                serviceDescriptionElement.textContent = serviceData[type].desc;
                serviceImageElement.src = serviceData[type].img;
            } else {
                // Fallback si no se encuentra el servicio (opcional)
                console.warn(`No se encontraron datos para el servicio: ${type}`);
                // Puedes establecer una descripción e imagen predeterminadas aquí
                serviceDescriptionElement.textContent = "Selecciona un servicio para ver la descripción.";
                serviceImageElement.src = "/assets/images/mask-group.png"; // Imagen predeterminada
            }
        }

        serviceItems.forEach(item => {
            // Usamos 'mouseenter' y 'mouseleave' para el efecto de hover y reseteo
            item.addEventListener('mouseenter', function () {
                activateService(this);
            });

            // Opcional: Si quieres que regrese al estado inicial o a un servicio predeterminado
            // cuando el cursor sale de los items. Esto puede ser útil.
            // item.addEventListener('mouseleave', function() {
            //     // Revertir a un estado inicial, por ejemplo, el primer servicio o el activo por defecto
            //     const defaultService = document.querySelector('.service-item[data-service="assembly-direction"]'); // O el que quieras por defecto
            //     if (defaultService) {
            //         activateService(defaultService);
            //     }
            // });

            // Accesibilidad: activar con teclado
            item.addEventListener('keydown', function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault(); // Previene el scroll de la página con la barra espaciadora
                    activateService(this);
                }
            });
        });

        // Estado inicial (Carga la información del servicio con la clase 'active' al cargar la página)
        // Se cambió la variable serviceDescriptions por serviceData.
        const initialItem = document.querySelector('.service-heading.active')?.closest('.service-item');
        if (initialItem) {
            // Si hay un item con 'active' al inicio, lo activamos
            activateService(initialItem);
        } else if (serviceItems.length > 0) {
            // Si no hay un activo, activamos el primer servicio por defecto
            activateService(serviceItems[0]);
        }
    }

  
    
    //
 //
    // -----------------------------------------------------------------
    // Módulo 3: Animación del carrusel de PORTFOLIO (con GSAP)
    // -----------------------------------------------------------------
    //    
   function initPortfolioCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack) return;

    const nextButton = document.getElementById('portfolio-next');
    if (!nextButton) return;

    const cards = carouselTrack.querySelectorAll('.portfolio-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 30; // ancho tarjeta + margen
    let currentIndex = 0;

    // Clonamos las primeras tarjetas y las pegamos al final (para efecto infinito)
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

        // Cuando pasamos al final de las originales → saltamos sin animación al inicio
        if (currentIndex === cards.length) {
            setTimeout(() => {
                currentIndex = 0;
                updateCarousel(false); // sin transición → no se nota el salto
            }, 500); // esperar a que termine la animación
        }
    });

    // Inicial
    updateCarousel();
}



    //
  
    //
    // -----------------------------------------------------------------
    // Módulo 4: Animaciones de los sliders de CLIENTES y la barra de imágenes
    // -----------------------------------------------------------------
    //
        function initSliders() {
        const sliders = document.querySelectorAll('.clients-section .slider-track');
        const imageSlider = document.querySelector('.image-slider-section .slider-track');
        
        if (!sliders.length && !imageSlider) return;

        // Función para duplicar y animar un slider
        function setupSlider(slider, animationDuration, direction) {
            const sliderContent = slider.innerHTML;
            slider.innerHTML += sliderContent;
            
            slider.style.animationDuration = animationDuration;
            if (direction === 'left') {
                slider.style.animationName = 'scroll-left-infinite';
            } else {
                slider.style.animationName = 'scroll-right-infinite';
            }

            // Se eliminan los event listeners para que el slider no se detenga al pasar el cursor
            // slider.addEventListener('mouseenter', () => {
            //     slider.style.animationPlayState = 'paused';
            // });
            // slider.addEventListener('mouseleave', () => {
            //     slider.style.animationPlayState = 'running';
            // });
        }
        
        // Clientes
        document.querySelectorAll('.clients-section .slider-container').forEach(container => {
            const track = container.querySelector('.slider-track');
            const direction = container.classList.contains('slider-right') ? 'right' : 'left';
            setupSlider(track, '55s', direction); // Aumentado de 50s a 100s para hacerlo más lento
        });

        // Slider de imágenes infinito
        // if (imageSlider) {
        //     setupSlider(imageSlider, '150s', 'left');   // Aumentado de 55s a 110s para hacerlo más lento
        // }
    }

    //
    // -----------------------------------------------------------------
    // Módulo 5: Manejo del formulario de contacto
    // -----------------------------------------------------------------
    //
    function initContactForm() {
        const form = document.getElementById("contact-form");
        const successMessage = document.getElementById("successMessage");

        if(form) {
            form.addEventListener("submit", function(e) {
                e.preventDefault();

                const formData = new FormData(form);

                fetch("send_mail.php", {
                    method: "POST",
                    body: formData
                })
                .then(res => res.text())
                .then(data => {
                    if (data.trim() === "success") {
                        successMessage.style.display = "block";
                        form.reset();
                        setTimeout(() => {
                            successMessage.style.display = "none";
                        }, 5000);
                    } else {
                        alert("Error al enviar el mensaje. Intenta de nuevo.");
                    }
                })
                .catch(() => alert("Error de conexión"));
            });
        }
    }

    //
    // -----------------------------------------------------------------
    // Iniciar todas las funcionalidades al cargar la página
    // -----------------------------------------------------------------
    //
    initNavbar();
    initServices();
    initPortfolioCarousel();
    initSliders();
    initContactForm();

});

// --- VIDEO AUTOPLAY (SAFARI/iOS FIX) ---
const video = document.querySelector('.video-background video');
if (video && typeof video.play === "function") {
    video.play().catch(error => {
        console.log("Video autoplay failed:", error);
    });
}
