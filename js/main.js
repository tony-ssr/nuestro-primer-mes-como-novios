/**
 * ========================================
 * JAVASCRIPT PRINCIPAL - PÁGINA 1 MES DE NOVIOS
 * Funcionalidad: Contador de tiempo en vivo
 * Autor: Antony Salcedo
 * Fecha: Octubre 2025
 * ========================================
 */

// ========================================
// CONFIGURACIÓN Y VARIABLES GLOBALES
// ========================================

// Fecha de inicio de la relación (25 de septiembre de 2025)
const RELATIONSHIP_START_DATE = new Date('2025-09-25T00:00:00');

// Referencias a elementos del DOM
const timeCounter = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

// Variable para almacenar el intervalo del contador
let counterInterval = null;

// ========================================
// CONFIGURACIÓN DEL REPRODUCTOR DE MÚSICA
// ========================================

// Lista de canciones disponibles
const PLAYLIST = [
    {
        title: "That's My Girl",
        artist: "Frank Sativa",
        src: "/nuestro-primer-mes-siendo-novios/assets/songs/Frank Sativa - That's My Girl.mp3",
        cover: "/nuestro-primer-mes-siendo-novios/assets/songs/Frank Sativa - That's My Girl.png"
    },
    {
        title: "Cysgod dy Gariad",
        artist: "Gizmo Varillas",
        src: "/nuestro-primer-mes-siendo-novios/assets/songs/Gizmo Varillas - Cysgod dy Gariad.mp3",
        cover: "/nuestro-primer-mes-siendo-novios/assets/songs/Gizmo Varillas - Cysgod dy Gariad.png"
    },
    {
        title: "My Lady",
        artist: "marQ",
        src: "/nuestro-primer-mes-siendo-novios/assets/songs/marQ - My Lady.mp3",
        cover: "/nuestro-primer-mes-siendo-novios/assets/songs/marQ - My Lady.png"
    }
];

// Variables del reproductor
let currentSongIndex = 0;
let isPlaying = false;
let isMinimized = false;

// ========================================
// FUNCIONES PRINCIPALES
// ========================================

/**
 * Función principal que se ejecuta cuando la página carga
 * Inicializa todos los componentes de la página
 */
function initializePage() {
    try {
        console.log('🎉 Inicializando página de 1 mes de novios...');
        
        // Inicializar el contador de tiempo
        initializeTimeCounter();
        
        // Configurar efectos visuales
        setupVisualEffects();
        
        // Configurar eventos de interacción
        setupEventListeners();
        
        // Inicializar reproductor de música
        initializeMusicPlayer();
        
        console.log('✅ Página inicializada correctamente');
    } catch (error) {
        console.error('❌ Error al inicializar la página:', error);
        showErrorMessage('Error al cargar la página. Por favor, recarga la página.');
    }
}

/**
 * Inicializa el contador de tiempo en tiempo real
 * Calcula y actualiza los días, horas y minutos transcurridos
 */
function initializeTimeCounter() {
    try {
        console.log('⏰ Inicializando contador de tiempo...');
        
        // Actualizar el contador inmediatamente
        updateTimeCounter();
        
        // Configurar actualización cada segundo para tiempo real
        counterInterval = setInterval(updateTimeCounter, 1000); // 1000ms = 1 segundo
        
        console.log('✅ Contador de tiempo inicializado');
    } catch (error) {
        console.error('❌ Error al inicializar contador:', error);
    }
}

/**
 * Actualiza el contador de tiempo con los valores actuales
 * Calcula la diferencia entre la fecha actual y la fecha de inicio
 */
function updateTimeCounter() {
    try {
        // Obtener la fecha y hora actual
        const now = new Date();
        
        // Calcular la diferencia en milisegundos
        const timeDifference = now.getTime() - RELATIONSHIP_START_DATE.getTime();
        
        // Verificar que la fecha actual sea posterior a la fecha de inicio
        if (timeDifference < 0) {
            console.warn('⚠️ La fecha actual es anterior a la fecha de inicio de la relación');
            displayFutureDate();
            return;
        }
        
        // Convertir milisegundos a días, horas, minutos y segundos
        const totalSeconds = Math.floor(timeDifference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        
        // Calcular horas, minutos y segundos restantes
        const remainingHours = totalHours % 24;
        const remainingMinutes = totalMinutes % 60;
        const remainingSeconds = totalSeconds % 60;
        
        // Actualizar los elementos del DOM
        updateCounterDisplay(totalDays, remainingHours, remainingMinutes, remainingSeconds);
        
        // Log para debugging
        console.log(`📅 Tiempo transcurrido: ${totalDays} días, ${remainingHours} horas, ${remainingMinutes} minutos, ${remainingSeconds} segundos`);
        
    } catch (error) {
        console.error('❌ Error al actualizar contador:', error);
        showErrorMessage('Error al calcular el tiempo transcurrido');
    }
}

/**
 * Actualiza la visualización del contador en el DOM
 * @param {number} days - Número de días
 * @param {number} hours - Número de horas
 * @param {number} minutes - Número de minutos
 * @param {number} seconds - Número de segundos
 */
function updateCounterDisplay(days, hours, minutes, seconds) {
    try {
        // Verificar que los elementos existan
        if (!timeCounter.days || !timeCounter.hours || !timeCounter.minutes || !timeCounter.seconds) {
            console.error('❌ Elementos del contador no encontrados en el DOM');
            return;
        }
        
        // Actualizar los valores con animación
        animateCounterValue(timeCounter.days, days);
        animateCounterValue(timeCounter.hours, hours);
        animateCounterValue(timeCounter.minutes, minutes);
        animateCounterValue(timeCounter.seconds, seconds);
        
    } catch (error) {
        console.error('❌ Error al actualizar display del contador:', error);
    }
}

/**
 * Anima el cambio de valor en un elemento del contador
 * @param {HTMLElement} element - Elemento a animar
 * @param {number} newValue - Nuevo valor a mostrar
 */
function animateCounterValue(element, newValue) {
    try {
        // Obtener el valor actual
        const currentValue = parseInt(element.textContent) || 0;
        
        // Si el valor no ha cambiado, no hacer nada
        if (currentValue === newValue) {
            return;
        }
        
        // Aplicar efecto de transición
        element.style.transition = 'all 0.3s ease';
        element.style.transform = 'scale(1.1)';
        
        // Actualizar el valor
        element.textContent = newValue;
        
        // Restaurar el tamaño original después de la animación
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
        
    } catch (error) {
        console.error('❌ Error al animar valor del contador:', error);
    }
}

/**
 * Muestra mensaje cuando la fecha actual es anterior a la fecha de inicio
 * (Para casos de testing o fechas futuras)
 */
function displayFutureDate() {
    try {
        if (timeCounter.days) timeCounter.days.textContent = '0';
        if (timeCounter.hours) timeCounter.hours.textContent = '0';
        if (timeCounter.minutes) timeCounter.minutes.textContent = '0';
        if (timeCounter.seconds) timeCounter.seconds.textContent = '0';
        
        console.log('📅 Mostrando fecha futura - contador en 0');
    } catch (error) {
        console.error('❌ Error al mostrar fecha futura:', error);
    }
}

/**
 * Configura los efectos visuales de la página
 * Inicializa animaciones y transiciones
 */
function setupVisualEffects() {
    try {
        console.log('🎨 Configurando efectos visuales...');
        
        // Agregar efecto de entrada a los personajes
        addCharacterHoverEffects();
        
        // Configurar animaciones de los corazones flotantes
        setupFloatingHearts();
        
        console.log('✅ Efectos visuales configurados');
    } catch (error) {
        console.error('❌ Error al configurar efectos visuales:', error);
    }
}

/**
 * Agrega efectos de hover a los personajes
 */
function addCharacterHoverEffects() {
    try {
        const characters = document.querySelectorAll('.character');
        
        characters.forEach(character => {
            character.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            character.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
    } catch (error) {
        console.error('❌ Error al configurar efectos de hover:', error);
    }
}

/**
 * Configura las animaciones de los corazones flotantes
 */
function setupFloatingHearts() {
    try {
        const hearts = document.querySelectorAll('.floating-heart');
        
        hearts.forEach((heart, index) => {
            // Agregar delay aleatorio para que no estén sincronizados
            const randomDelay = Math.random() * 2;
            heart.style.animationDelay = `${randomDelay}s`;
        });
        
    } catch (error) {
        console.error('❌ Error al configurar corazones flotantes:', error);
    }
}

/**
 * Configura todos los event listeners de la página
 */
function setupEventListeners() {
    try {
        console.log('🎯 Configurando event listeners...');
        
        // Event listener para el botón de scroll
        const scrollButton = document.querySelector('.scroll-button');
        if (scrollButton) {
            scrollButton.addEventListener('click', handleScrollButton);
        }
        
        // Event listeners para la carta
        setupLetterEvents();
        
        // Event listeners para la galería
        setupGalleryEvents();
        
        // Event listeners para el juego
        setupGameEvents();
        
        // Event listeners para los videos
        setupVideoEvents();
        
        // Event listeners para el navbar
        setupNavbarEvents();
        
        // Event listener para redimensionamiento de ventana
        window.addEventListener('resize', handleWindowResize);
        
        // Event listener para redimensionamiento del juego
        window.addEventListener('resize', resizeGame);
        
        // Event listener para cuando la página se vuelve visible
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        console.log('✅ Event listeners configurados');
    } catch (error) {
        console.error('❌ Error al configurar event listeners:', error);
    }
}

/**
 * Maneja el clic en el botón de scroll
 */
function handleScrollButton() {
    try {
        console.log('📜 Botón de scroll clickeado');
        scrollToNext();
    } catch (error) {
        console.error('❌ Error al manejar clic del botón:', error);
    }
}

/**
 * Función para hacer scroll a la siguiente sección
 * Navega a la sección de la carta
 */
function scrollToNext() {
    try {
        const letterSection = document.getElementById('letterSection');
        if (letterSection) {
            letterSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            console.log('📜 Navegando a la sección de la carta');
        }
    } catch (error) {
        console.error('❌ Error al hacer scroll:', error);
    }
}

/**
 * Maneja el redimensionamiento de la ventana
 */
function handleWindowResize() {
    try {
        // Recalcular posiciones si es necesario
        console.log('📱 Ventana redimensionada');
    } catch (error) {
        console.error('❌ Error al manejar redimensionamiento:', error);
    }
}

/**
 * Maneja el cambio de visibilidad de la página
 * Pausa/reanuda el contador cuando la página no está visible
 */
function handleVisibilityChange() {
    try {
        if (document.hidden) {
            console.log('👁️ Página oculta - pausando contador');
            // La página está oculta, no es necesario pausar el contador
        } else {
            console.log('👁️ Página visible - reanudando contador');
            // La página es visible, actualizar el contador
            updateTimeCounter();
        }
    } catch (error) {
        console.error('❌ Error al manejar cambio de visibilidad:', error);
    }
}

/**
 * Muestra un mensaje de error al usuario
 * @param {string} message - Mensaje de error a mostrar
 */
function showErrorMessage(message) {
    try {
        // Crear elemento de error
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff6b6b;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
            z-index: 1000;
            font-family: 'Poppins', sans-serif;
            max-width: 300px;
        `;
        errorDiv.textContent = message;
        
        // Agregar al DOM
        document.body.appendChild(errorDiv);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
        
    } catch (error) {
        console.error('❌ Error al mostrar mensaje de error:', error);
    }
}

/**
 * Limpia los recursos cuando la página se descarga
 */
function cleanup() {
    try {
        // Limpiar intervalos
        if (counterInterval) {
            clearInterval(counterInterval);
            counterInterval = null;
        }
        
        console.log('🧹 Recursos limpiados');
    } catch (error) {
        console.error('❌ Error al limpiar recursos:', error);
    }
}

// ========================================
// INICIALIZACIÓN Y EVENTOS
// ========================================

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initializePage);

// Limpiar recursos cuando la página se descarga
window.addEventListener('beforeunload', cleanup);

// ========================================
// FUNCIONES DEL REPRODUCTOR DE MÚSICA
// ========================================

/**
 * Inicializa el reproductor de música
 * Configura todos los elementos y eventos del reproductor
 */
function initializeMusicPlayer() {
    try {
        console.log('🎵 Inicializando reproductor de música...');
        
        // Obtener referencias a los elementos del reproductor
        const audioPlayer = document.getElementById('audioPlayer');
        const playBtn = document.getElementById('playBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const playerToggle = document.getElementById('playerToggle');
        const playerClose = document.getElementById('playerClose');
        const progressBar = document.getElementById('progressBar');
        const playlist = document.getElementById('playlist');
        
        // Verificar que todos los elementos existan
        if (!audioPlayer || !playBtn || !prevBtn || !nextBtn || !playerToggle || !playerClose || !progressBar || !playlist) {
            console.error('❌ Elementos del reproductor no encontrados');
            return;
        }
        
        // Configurar eventos del reproductor
        setupPlayerEvents();
        
        // Cargar la primera canción
        loadSong(currentSongIndex);
        
        console.log('✅ Reproductor de música inicializado');
    } catch (error) {
        console.error('❌ Error al inicializar reproductor:', error);
    }
}

/**
 * Configura todos los eventos del reproductor
 */
function setupPlayerEvents() {
    try {
        const audioPlayer = document.getElementById('audioPlayer');
        const playBtn = document.getElementById('playBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const playerToggle = document.getElementById('playerToggle');
        const playerClose = document.getElementById('playerClose');
        const progressBar = document.getElementById('progressBar');
        const playlist = document.getElementById('playlist');
        
        // Evento de reproducción/pausa
        playBtn.addEventListener('click', togglePlayPause);
        
        // Eventos de navegación
        prevBtn.addEventListener('click', previousSong);
        nextBtn.addEventListener('click', nextSong);
        
        // Eventos de controles del reproductor
        playerToggle.addEventListener('click', toggleMinimize);
        playerClose.addEventListener('click', closePlayer);
        
        // Evento de barra de progreso
        progressBar.addEventListener('click', seekToPosition);
        
        // Eventos de la lista de reproducción
        const playlistItems = playlist.querySelectorAll('.playlist-item');
        playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => selectSong(index));
        });
        
        // Eventos del audio
        audioPlayer.addEventListener('loadedmetadata', updateDuration);
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', nextSong);
        audioPlayer.addEventListener('error', handleAudioError);
        
        console.log('✅ Eventos del reproductor configurados');
    } catch (error) {
        console.error('❌ Error al configurar eventos del reproductor:', error);
    }
}

/**
 * Alterna entre reproducir y pausar
 */
function togglePlayPause() {
    try {
        const audioPlayer = document.getElementById('audioPlayer');
        const playIcon = document.querySelector('.play-icon');
        
        if (isPlaying) {
            audioPlayer.pause();
            playIcon.textContent = '▶';
            isPlaying = false;
            console.log('⏸️ Música pausada');
        } else {
            audioPlayer.play().then(() => {
                playIcon.textContent = '⏸';
                isPlaying = true;
                console.log('▶️ Música reproduciendo');
            }).catch(error => {
                console.error('❌ Error al reproducir:', error);
                showErrorMessage('Error al reproducir la música');
            });
        }
    } catch (error) {
        console.error('❌ Error al alternar reproducción:', error);
    }
}

/**
 * Carga una canción específica
 * @param {number} songIndex - Índice de la canción a cargar
 */
function loadSong(songIndex) {
    try {
        if (songIndex < 0 || songIndex >= PLAYLIST.length) {
            console.error('❌ Índice de canción inválido:', songIndex);
            return;
        }
        
        const song = PLAYLIST[songIndex];
        const audioPlayer = document.getElementById('audioPlayer');
        const coverImage = document.getElementById('coverImage');
        const songTitle = document.getElementById('songTitle');
        const songArtist = document.getElementById('songArtist');
        
        // Actualizar información de la canción
        audioPlayer.src = song.src;
        coverImage.src = song.cover;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        
        // Actualizar lista de reproducción
        updatePlaylistSelection(songIndex);
        
        // Pausar reproducción actual
        audioPlayer.pause();
        isPlaying = false;
        document.querySelector('.play-icon').textContent = '▶';
        
        console.log(`🎵 Cargando canción: ${song.title} - ${song.artist}`);
    } catch (error) {
        console.error('❌ Error al cargar canción:', error);
        showErrorMessage('Error al cargar la canción');
    }
}

/**
 * Actualiza la selección en la lista de reproducción
 * @param {number} songIndex - Índice de la canción seleccionada
 */
function updatePlaylistSelection(songIndex) {
    try {
        const playlistItems = document.querySelectorAll('.playlist-item');
        
        playlistItems.forEach((item, index) => {
            if (index === songIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    } catch (error) {
        console.error('❌ Error al actualizar selección de playlist:', error);
    }
}

/**
 * Reproduce la canción anterior
 */
function previousSong() {
    try {
        currentSongIndex = (currentSongIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
        loadSong(currentSongIndex);
        console.log('⏮️ Canción anterior');
    } catch (error) {
        console.error('❌ Error al ir a canción anterior:', error);
    }
}

/**
 * Reproduce la siguiente canción
 */
function nextSong() {
    try {
        currentSongIndex = (currentSongIndex + 1) % PLAYLIST.length;
        loadSong(currentSongIndex);
        console.log('⏭️ Siguiente canción');
    } catch (error) {
        console.error('❌ Error al ir a siguiente canción:', error);
    }
}

/**
 * Selecciona una canción específica de la lista
 * @param {number} songIndex - Índice de la canción a seleccionar
 */
function selectSong(songIndex) {
    try {
        currentSongIndex = songIndex;
        loadSong(currentSongIndex);
        console.log(`🎵 Canción seleccionada: ${songIndex}`);
    } catch (error) {
        console.error('❌ Error al seleccionar canción:', error);
    }
}

/**
 * Actualiza la duración total de la canción
 */
function updateDuration() {
    try {
        const audioPlayer = document.getElementById('audioPlayer');
        const totalTime = document.getElementById('totalTime');
        
        if (audioPlayer.duration && !isNaN(audioPlayer.duration)) {
            totalTime.textContent = formatTime(audioPlayer.duration);
        }
    } catch (error) {
        console.error('❌ Error al actualizar duración:', error);
    }
}

/**
 * Actualiza el progreso de reproducción
 */
function updateProgress() {
    try {
        const audioPlayer = document.getElementById('audioPlayer');
        const progressFill = document.getElementById('progressFill');
        const currentTime = document.getElementById('currentTime');
        
        if (audioPlayer.duration && !isNaN(audioPlayer.duration)) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressFill.style.width = `${progress}%`;
            currentTime.textContent = formatTime(audioPlayer.currentTime);
        }
    } catch (error) {
        console.error('❌ Error al actualizar progreso:', error);
    }
}

/**
 * Busca una posición específica en la canción
 * @param {Event} event - Evento del clic en la barra de progreso
 */
function seekToPosition(event) {
    try {
        const audioPlayer = document.getElementById('audioPlayer');
        const progressBar = document.getElementById('progressBar');
        
        if (audioPlayer.duration && !isNaN(audioPlayer.duration)) {
            const rect = progressBar.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const width = rect.width;
            const percentage = clickX / width;
            const newTime = percentage * audioPlayer.duration;
            
            audioPlayer.currentTime = newTime;
            console.log(`🎯 Buscando posición: ${formatTime(newTime)}`);
        }
    } catch (error) {
        console.error('❌ Error al buscar posición:', error);
    }
}

/**
 * Alterna entre minimizar y expandir el reproductor
 */
function toggleMinimize() {
    try {
        const player = document.getElementById('floatingPlayer');
        const toggleIcon = document.querySelector('.toggle-icon');
        
        isMinimized = !isMinimized;
        
        if (isMinimized) {
            player.classList.add('minimized');
            toggleIcon.textContent = '+';
            console.log('📦 Reproductor minimizado');
        } else {
            player.classList.remove('minimized');
            toggleIcon.textContent = '−';
            console.log('📖 Reproductor expandido');
        }
    } catch (error) {
        console.error('❌ Error al minimizar reproductor:', error);
    }
}

/**
 * Cierra el reproductor
 */
function closePlayer() {
    try {
        const player = document.getElementById('floatingPlayer');
        const audioPlayer = document.getElementById('audioPlayer');
        
        // Pausar música
        audioPlayer.pause();
        isPlaying = false;
        
        // Ocultar reproductor
        player.style.display = 'none';
        
        console.log('❌ Reproductor cerrado');
    } catch (error) {
        console.error('❌ Error al cerrar reproductor:', error);
    }
}

/**
 * Maneja errores del audio
 */
function handleAudioError() {
    try {
        console.error('❌ Error en el audio');
        showErrorMessage('Error al cargar el archivo de audio');
        
        // Intentar cargar la siguiente canción
        setTimeout(() => {
            nextSong();
        }, 2000);
    } catch (error) {
        console.error('❌ Error al manejar error de audio:', error);
    }
}

/**
 * Formatea el tiempo en formato MM:SS
 * @param {number} seconds - Segundos a formatear
 * @returns {string} Tiempo formateado
 */
function formatTime(seconds) {
    try {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    } catch (error) {
        console.error('❌ Error al formatear tiempo:', error);
        return '0:00';
    }
}

// ========================================
// FUNCIONES DE LA CARTA
// ========================================

/**
 * Configura los eventos de la carta
 */
function setupLetterEvents() {
    try {
        console.log('💌 Configurando eventos de la carta...');
        
        const envelope = document.getElementById('envelope');
        const closeLetterBtn = document.getElementById('closeLetterBtn');
        
        if (envelope) {
            envelope.addEventListener('click', openLetter);
            envelope.addEventListener('touchstart', openLetter);
        }
        
        if (closeLetterBtn) {
            closeLetterBtn.addEventListener('click', closeLetter);
        }
        
        console.log('✅ Eventos de la carta configurados');
    } catch (error) {
        console.error('❌ Error al configurar eventos de la carta:', error);
    }
}

/**
 * Abre la carta y oculta el sobre
 */
function openLetter() {
    try {
        console.log('📖 Abriendo carta...');
        
        const envelope = document.getElementById('envelope');
        const envelopeContainer = document.getElementById('envelopeContainer');
        const letterContent = document.getElementById('letterContent');
        
        if (!envelope || !envelopeContainer || !letterContent) {
            console.error('❌ Elementos de la carta no encontrados');
            return;
        }
        
        // Agregar clase de apertura al sobre
        envelope.classList.add('opened');
        
        // Ocultar el sobre con animación
        setTimeout(() => {
            envelopeContainer.style.display = 'none';
            letterContent.classList.add('show');
            letterContent.style.display = 'block';
        }, 500);
        
        console.log('✅ Carta abierta');
    } catch (error) {
        console.error('❌ Error al abrir carta:', error);
    }
}

/**
 * Cierra la carta y muestra el sobre
 */
function closeLetter() {
    try {
        console.log('📮 Cerrando carta...');
        
        const envelope = document.getElementById('envelope');
        const envelopeContainer = document.getElementById('envelopeContainer');
        const letterContent = document.getElementById('letterContent');
        
        if (!envelope || !envelopeContainer || !letterContent) {
            console.error('❌ Elementos de la carta no encontrados');
            return;
        }
        
        // Ocultar el contenido de la carta
        letterContent.classList.remove('show');
        letterContent.style.display = 'none';
        
        // Mostrar el sobre
        envelopeContainer.style.display = 'flex';
        
        // Remover clase de apertura del sobre
        setTimeout(() => {
            envelope.classList.remove('opened');
        }, 100);
        
        console.log('✅ Carta cerrada');
    } catch (error) {
        console.error('❌ Error al cerrar carta:', error);
    }
}

// ========================================
// FUNCIONES DE LA GALERÍA
// ========================================

/**
 * Configura los eventos de la galería
 */
function setupGalleryEvents() {
    try {
        console.log('📸 Configurando eventos de la galería...');
        
        // Cargar las galerías
        loadHerGallery();
        loadTogetherGallery();
        
        // Configurar eventos del modal
        setupModalEvents();
        
        console.log('✅ Eventos de la galería configurados');
    } catch (error) {
        console.error('❌ Error al configurar eventos de la galería:', error);
    }
}

/**
 * Carga la galería de fotos de ella
 */
function loadHerGallery() {
    try {
        const herGallery = document.getElementById('herGallery');
        if (!herGallery) return;
        
        // Mensajes especiales para cada foto de ella
        const herMessages = [
            "Si fueras un videojuego, serías el GOTY (Game of the Year) de mi vida",
            "Eres como el código perfecto: sin bugs, optimizado y hermoso",
            "¿Cómo haces para que hasta cuando comes pizza se veas elegante?",
            "Si fueras una canción, serías el hit del verano que nunca se cansa",
            "Eres como el algoritmo perfecto: siempre encuentras la solución a mi corazón",
            "¿En serio eres humana? Porque pareces un personaje de anime perfecto",
            "Si fueras comida, serías el ramen más delicioso del universo",
            "Eres como el WiFi perfecto: siempre conectada a mi corazón",
            "¿Cómo logras que hasta cuando duermes se veas como una diosa?",
            "Si fueras un meme, serías el que hace reír a todo el mundo",
            "Eres como el código que compila perfecto a la primera",
            "¿En qué momento te convertiste en el DLC más hermoso de mi vida?",
            "Si fueras música, serías la playlist que nunca se acaba",
            "Eres como el bug que no quiero arreglar porque es perfecto",
            "¿Cómo haces para que hasta cuando estás enojada se veas adorable?",
            "Si fueras un videojuego, serías el que tiene 10/10 en todas las reseñas",
            "Eres como el commit perfecto: 'Agregada la mujer más hermosa del mundo'",
            "¿En serio eres real? Porque pareces un render en 4K",
            "Si fueras comida, serías el sushi más perfecto que existe",
            "Eres como el código que no necesita comentarios porque es perfecto"
        ];
        
        // Cargar fotos de ella (1-17)
        for (let i = 1; i <= 17; i++) {
            const galleryItem = createGalleryItem(
                `/nuestro-primer-mes-siendo-novios/assets/images/fotos - ella/${i}.jpg`,
                herMessages[i - 1] || "Eres perfecta tal como eres"
            );
            herGallery.appendChild(galleryItem);
        }
        
        console.log('✅ Galería de ella cargada');
    } catch (error) {
        console.error('❌ Error al cargar galería de ella:', error);
    }
}

/**
 * Carga la galería de fotos juntos
 */
function loadTogetherGallery() {
    try {
        const togetherGallery = document.getElementById('togetherGallery');
        if (!togetherGallery) return;
        
        // Espacios para mensajes personalizados (puedes editarlos)
        const togetherMessages = [
            "Cuando fuimos al onomastico y vimos a los cadilacs fue increible", // Reemplaza con tu mensaje
            "En el cumple' de tu prima fue... Borracha tú djhsakd", // Reemplaza con tu mensaje
            "Fuiste el regalo mas bonito de mi cumpleaños", // Reemplaza con tu mensaje
            "Deberiamos hacer mas layouts asi, ¿y mi gorro?", // Reemplaza con tu mensaje
            "No sabes cuanto me gusta que durmamos juntos", // Reemplaza con tu mensaje
            "Cuando mi novia quiere estar en todo momento conmigo", // Reemplaza con tu mensaje
            "¿Crees se sorprenderian al saber todo lo que hemos vivido?", // Reemplaza con tu mensaje
            "Sabes algo, realmente disfruto tu compañia", // Reemplaza con tu mensaje
            "Madre, padre e hija, falta el bebe que no sale en la foto", // Reemplaza con tu mensaje
            "Yo soy mucho fotojenico la verdad. Te ves hermosa", // Reemplaza con tu mensaje
            "Agustisimos, juntitos, todo lo que debe de estar bien, ahi esta", // Reemplaza con tu mensaje
            "De mis favoritas, ese asensor tiene historia", // Reemplaza con tu mensaje
            "Esta es GOD, toda es perfecta, debemos de tomar mas fotos alli", // Reemplaza con tu mensaje
            "Besito de mi para ti. Literal, noche de Kimetsu", // Reemplaza con tu mensaje
            "Aqui si aparece mi hijito, los tres juntos, esa foto me encanta", // Reemplaza con tu mensaje
            "Besito de tu para mi. Me hacen faltan mas besos", // Reemplaza con tu mensaje
            "Fotito random, nunca esta demas agarrarte desprevenida", // Reemplaza con tu mensaje
            "Otrita con el hijito, debemos de salir al monte para tomar mas fotos", // Reemplaza con tu mensaje
            "Muy buena foto. Tenemos que volver al cine, otro dia", // Reemplaza con tu mensaje
            "Aqui el sueño me mataba, pero que hermosa que te ves mi amor" // Reemplaza con tu mensaje
        ];
        
        // Cargar fotos juntos (1-20)
        for (let i = 1; i <= 20; i++) {
            const galleryItem = createGalleryItem(
                `/nuestro-primer-mes-siendo-novios/assets/images/ella y yo/${i}.jpg`,
                togetherMessages[i - 1] || "Nuestro momento especial"
            );
            togetherGallery.appendChild(galleryItem);
        }
        
        console.log('✅ Galería juntos cargada');
    } catch (error) {
        console.error('❌ Error al cargar galería juntos:', error);
    }
}

/**
 * Crea un elemento de galería
 */
function createGalleryItem(imageSrc, message) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    galleryItem.innerHTML = `
        <img class="gallery-image" src="${imageSrc}" alt="Foto especial" loading="lazy">
        <div class="gallery-overlay">
            <p class="gallery-preview-text">Ver foto</p>
        </div>
    `;
    
    // Agregar evento de clic
    galleryItem.addEventListener('click', () => openPhotoModal(imageSrc, message));
    
    return galleryItem;
}

/**
 * Configura los eventos del modal
 */
function setupModalEvents() {
    try {
        const modal = document.getElementById('photoModal');
        const modalClose = document.getElementById('modalClose');
        const modalBackdrop = document.getElementById('modalBackdrop');
        
        if (modalClose) {
            modalClose.addEventListener('click', closePhotoModal);
        }
        
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', closePhotoModal);
        }
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closePhotoModal();
            }
        });
        
        console.log('✅ Eventos del modal configurados');
    } catch (error) {
        console.error('❌ Error al configurar eventos del modal:', error);
    }
}

/**
 * Abre el modal con la foto
 */
function openPhotoModal(imageSrc, message) {
    try {
        const modal = document.getElementById('photoModal');
        const modalImage = document.getElementById('modalImage');
        const modalMessage = document.getElementById('modalMessage');
        
        if (!modal || !modalImage || !modalMessage) return;
        
        // Cargar imagen y mensaje
        modalImage.src = imageSrc;
        modalMessage.querySelector('.message-text').textContent = message;
        
        // Mostrar modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        console.log('📸 Modal abierto');
    } catch (error) {
        console.error('❌ Error al abrir modal:', error);
    }
}

/**
 * Cierra el modal
 */
function closePhotoModal() {
    try {
        const modal = document.getElementById('photoModal');
        if (!modal) return;
        
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        console.log('📸 Modal cerrado');
    } catch (error) {
        console.error('❌ Error al cerrar modal:', error);
    }
}

// ========================================
// FUNCIONES DEL JUEGO INTERACTIVO
// ========================================

// Variables del juego
let gameEmojis = [];
let foundEmojis = 0;
let totalEmojis = 15;
let gameMessages = [];

/**
 * Configura los eventos del juego
 */
function setupGameEvents() {
    try {
        console.log('🎮 Configurando eventos del juego...');
        
        // Inicializar el juego
        initializeGame();
        
        // Configurar eventos del modal
        setupGameModalEvents();
        
        console.log('✅ Eventos del juego configurados');
    } catch (error) {
        console.error('❌ Error al configurar eventos del juego:', error);
    }
}

/**
 * Inicializa el juego
 */
function initializeGame() {
    try {
        // Mensajes de amor para cada emoji
        gameMessages = [
            "Eres mi camarada de vida, mi compañera en esta lucha por el amor",
            "Como el partido que nunca abandona sus principios, tú nunca me abandonas",
            "Eres mi revolución personal, la que cambió mi mundo para siempre",
            "Si fueras una consigna, serías la que más me motiva a seguir adelante",
            "Tu amor es como la solidaridad socialista: inquebrantable y eterno",
            "Eres mi comité central, el que toma las mejores decisiones para nosotros",
            "Como la lucha de clases, nuestro amor es inevitable y necesario",
            "Eres mi internacional socialista, unes todos los pueblos de mi corazón",
            "Si fueras una bandera roja, serías la que más orgulloso porto",
            "Eres mi congreso del partido, el evento más importante de mi vida",
            "Como la justicia social, tu amor es equitativo y para todos",
            "Eres mi manifestación de amor, la que nunca termina",
            "Si fueras una hoz y martillo, serías las herramientas que construyen mi felicidad",
            "Eres mi comuna de amor, donde todo se comparte y nada se privatiza",
            "Como la lucha obrera, nuestro amor es constante y nunca se rinde"
        ];
        
        // Emojis para el juego
        const emojis = ['💕', '💖', '💗', '💝', '💘', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍'];
        
        // Crear emojis en posiciones aleatorias
        createGameEmojis(emojis);
        
        // Actualizar contador
        updateGameCounter();
        
        console.log('🎮 Juego inicializado');
    } catch (error) {
        console.error('❌ Error al inicializar juego:', error);
    }
}

/**
 * Crea los emojis del juego en posiciones aleatorias
 */
function createGameEmojis(emojis) {
    try {
        const gameArea = document.getElementById('gameArea');
        if (!gameArea) return;
        
        // Limpiar área de juego
        gameArea.innerHTML = '';
        gameEmojis = [];
        foundEmojis = 0;
        
        // Obtener dimensiones del área de juego
        const areaWidth = gameArea.offsetWidth;
        const areaHeight = gameArea.offsetHeight;
        
        // Detectar si es móvil
        const isMobile = window.innerWidth <= 768;
        const emojiSize = isMobile ? 40 : 50;
        const margin = isMobile ? 20 : 25;
        
        // Crear emojis en posiciones aleatorias con mejor distribución
        emojis.forEach((emoji, index) => {
            const emojiElement = document.createElement('div');
            emojiElement.className = 'game-emoji';
            emojiElement.textContent = emoji;
            emojiElement.dataset.index = index;
            
            // Posición aleatoria con márgenes seguros
            const maxX = areaWidth - emojiSize - margin;
            const maxY = areaHeight - emojiSize - margin;
            
            const x = Math.max(margin, Math.random() * maxX);
            const y = Math.max(margin, Math.random() * maxY);
            
            emojiElement.style.left = `${x}px`;
            emojiElement.style.top = `${y}px`;
            emojiElement.style.width = `${emojiSize}px`;
            emojiElement.style.height = `${emojiSize}px`;
            emojiElement.style.fontSize = isMobile ? '1.5rem' : '2rem';
            
            // Agregar evento de clic
            emojiElement.addEventListener('click', () => handleEmojiClick(index));
            
            gameArea.appendChild(emojiElement);
            gameEmojis.push(emojiElement);
        });
        
        console.log('🎮 Emojis creados');
    } catch (error) {
        console.error('❌ Error al crear emojis:', error);
    }
}

/**
 * Maneja el clic en un emoji
 */
function handleEmojiClick(index) {
    try {
        const emoji = gameEmojis[index];
        if (!emoji || emoji.classList.contains('found')) return;
        
        // Marcar como encontrado
        emoji.classList.add('found');
        foundEmojis++;
        
        // Actualizar contador
        updateGameCounter();
        
        // Mostrar mensaje de amor
        showLoveMessage(gameMessages[index]);
        
        // Verificar si el juego está completo
        if (foundEmojis >= totalEmojis) {
            setTimeout(() => {
                showGameComplete();
            }, 1000);
        }
        
        console.log(`🎮 Emoji ${index + 1} encontrado`);
    } catch (error) {
        console.error('❌ Error al manejar clic del emoji:', error);
    }
}

/**
 * Actualiza el contador del juego
 */
function updateGameCounter() {
    try {
        const counterNumber = document.getElementById('foundEmojis');
        if (counterNumber) {
            counterNumber.textContent = foundEmojis;
        }
    } catch (error) {
        console.error('❌ Error al actualizar contador:', error);
    }
}

/**
 * Muestra un mensaje de amor
 */
function showLoveMessage(message) {
    try {
        const modal = document.getElementById('loveMessageModal');
        const messageText = document.getElementById('messageText');
        
        if (!modal || !messageText) return;
        
        messageText.textContent = message;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        console.log('💕 Mensaje de amor mostrado');
    } catch (error) {
        console.error('❌ Error al mostrar mensaje de amor:', error);
    }
}

/**
 * Configura los eventos del modal del juego
 */
function setupGameModalEvents() {
    try {
        const modal = document.getElementById('loveMessageModal');
        const messageClose = document.getElementById('messageClose');
        const messageBackdrop = document.getElementById('messageBackdrop');
        
        if (messageClose) {
            messageClose.addEventListener('click', closeLoveMessage);
        }
        
        if (messageBackdrop) {
            messageBackdrop.addEventListener('click', closeLoveMessage);
        }
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeLoveMessage();
            }
        });
        
        console.log('✅ Eventos del modal del juego configurados');
    } catch (error) {
        console.error('❌ Error al configurar eventos del modal:', error);
    }
}

/**
 * Cierra el mensaje de amor
 */
function closeLoveMessage() {
    try {
        const modal = document.getElementById('loveMessageModal');
        if (!modal) return;
        
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        console.log('💕 Mensaje de amor cerrado');
    } catch (error) {
        console.error('❌ Error al cerrar mensaje de amor:', error);
    }
}

/**
 * Muestra el mensaje de juego completo
 */
function showGameComplete() {
    try {
        const gameComplete = document.getElementById('gameComplete');
        if (!gameComplete) return;
        
        gameComplete.classList.add('show');
        
        // Configurar botón de reinicio
        const restartButton = document.getElementById('restartButton');
        if (restartButton) {
            restartButton.addEventListener('click', restartGame);
        }
        
        console.log('🎉 Juego completado');
    } catch (error) {
        console.error('❌ Error al mostrar juego completo:', error);
    }
}

/**
 * Reinicia el juego
 */
function restartGame() {
    try {
        // Ocultar mensaje de juego completo
        const gameComplete = document.getElementById('gameComplete');
        if (gameComplete) {
            gameComplete.classList.remove('show');
        }
        
        // Reinicializar el juego
        initializeGame();
        
        console.log('🔄 Juego reiniciado');
    } catch (error) {
        console.error('❌ Error al reiniciar juego:', error);
    }
}

/**
 * Redimensiona el juego cuando cambia el tamaño de la ventana
 */
function resizeGame() {
    try {
        // Solo redimensionar si el juego está activo
        if (gameEmojis.length > 0) {
            const gameArea = document.getElementById('gameArea');
            if (!gameArea) return;
            
            const areaWidth = gameArea.offsetWidth;
            const areaHeight = gameArea.offsetHeight;
            const isMobile = window.innerWidth <= 768;
            const emojiSize = isMobile ? 40 : 50;
            const margin = isMobile ? 20 : 25;
            
            // Reposicionar emojis existentes
            gameEmojis.forEach((emoji, index) => {
                if (!emoji.classList.contains('found')) {
                    const maxX = areaWidth - emojiSize - margin;
                    const maxY = areaHeight - emojiSize - margin;
                    
                    const x = Math.max(margin, Math.random() * maxX);
                    const y = Math.max(margin, Math.random() * maxY);
                    
                    emoji.style.left = `${x}px`;
                    emoji.style.top = `${y}px`;
                    emoji.style.width = `${emojiSize}px`;
                    emoji.style.height = `${emojiSize}px`;
                    emoji.style.fontSize = isMobile ? '1.5rem' : '2rem';
                }
            });
            
            console.log('📱 Juego redimensionado');
        }
    } catch (error) {
        console.error('❌ Error al redimensionar juego:', error);
    }
}

// ========================================
// FUNCIONES DE VIDEOS ESPECIALES
// ========================================

/**
 * Configura los eventos de los videos
 */
function setupVideoEvents() {
    try {
        console.log('🎬 Configurando eventos de videos...');
        
        // Configurar eventos de los botones de play
        setupVideoPlayButtons();
        
        // Configurar eventos del modal
        setupVideoModalEvents();
        
        console.log('✅ Eventos de videos configurados');
    } catch (error) {
        console.error('❌ Error al configurar eventos de videos:', error);
    }
}

/**
 * Configura los botones de play de los videos
 */
function setupVideoPlayButtons() {
    try {
        const playButtons = document.querySelectorAll('.play-button');
        const videoThumbnails = document.querySelectorAll('.video-thumbnail');
        
        console.log(`🎬 Encontrados ${playButtons.length} botones de play`);
        console.log(`🎬 Encontrados ${videoThumbnails.length} thumbnails de video`);
        
        // Configurar botones de play
        playButtons.forEach((button, index) => {
            const videoType = button.dataset.video;
            console.log(`🎬 Configurando botón ${index + 1} para video: ${videoType}`);
            
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log(`🎬 Click en botón de video: ${videoType}`);
                openVideoModal(videoType);
            });
        });
        
        // Configurar thumbnails como respaldo
        videoThumbnails.forEach((thumbnail, index) => {
            const playButton = thumbnail.querySelector('.play-button');
            const videoType = playButton ? playButton.dataset.video : null;
            
            if (videoType) {
                console.log(`🎬 Configurando thumbnail ${index + 1} para video: ${videoType}`);
                
                thumbnail.addEventListener('click', (e) => {
                    // Solo si no se hizo clic en el botón de play
                    if (!e.target.closest('.play-button')) {
                        console.log(`🎬 Click en thumbnail de video: ${videoType}`);
                        openVideoModal(videoType);
                    }
                });
            }
        });
        
        console.log('✅ Botones de play y thumbnails configurados');
    } catch (error) {
        console.error('❌ Error al configurar botones de play:', error);
    }
}

/**
 * Configura los eventos del modal de videos
 */
function setupVideoModalEvents() {
    try {
        const modal = document.getElementById('videoModal');
        const modalClose = document.getElementById('videoClose');
        const modalBackdrop = document.getElementById('videoBackdrop');
        
        if (modalClose) {
            modalClose.addEventListener('click', closeVideoModal);
        }
        
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', closeVideoModal);
        }
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeVideoModal();
            }
        });
        
        console.log('✅ Eventos del modal de videos configurados');
    } catch (error) {
        console.error('❌ Error al configurar eventos del modal:', error);
    }
}

/**
 * Abre el modal con el video seleccionado
 */
function openVideoModal(videoType) {
    try {
        const modal = document.getElementById('videoModal');
        const fullVideo = document.getElementById('fullVideo');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        if (!modal || !fullVideo || !modalTitle || !modalDescription) {
            console.error('❌ Elementos del modal no encontrados');
            return;
        }
        
        // Configurar video según el tipo
        const videoData = getVideoData(videoType);
        
        if (videoData) {
            // Limpiar fuente anterior
            fullVideo.src = '';
            fullVideo.load();
            
            // Configurar nueva fuente
            fullVideo.src = videoData.src;
            modalTitle.textContent = videoData.title;
            modalDescription.textContent = videoData.description;
            
            // Cargar el video
            fullVideo.load();
            
            // Mostrar modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            console.log(`🎬 Video ${videoType} abierto: ${videoData.src}`);
        } else {
            console.error('❌ Datos del video no encontrados para:', videoType);
        }
    } catch (error) {
        console.error('❌ Error al abrir video:', error);
    }
}

/**
 * Cierra el modal de video
 */
function closeVideoModal() {
    try {
        const modal = document.getElementById('videoModal');
        const fullVideo = document.getElementById('fullVideo');
        
        if (!modal) return;
        
        // Pausar video
        if (fullVideo) {
            fullVideo.pause();
            fullVideo.currentTime = 0;
        }
        
        // Ocultar modal
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        console.log('🎬 Video cerrado');
    } catch (error) {
        console.error('❌ Error al cerrar video:', error);
    }
}

/**
 * Obtiene los datos del video según el tipo
 */
function getVideoData(videoType) {
    const videoData = {
        helado: {
            src: '/nuestro-primer-mes-siendo-novios/assets/videos/helado-juntos.mp4',
            title: 'Nuestro Helado Especial',
            description: 'Ese día salimos a comer helado juntos y estuvo bien rico ese helado. Un momento dulce que compartimos juntos.'
        },
        nariz: {
            src: '/nuestro-primer-mes-siendo-novios/assets/videos/nariz-morada.mp4',
            title: 'La Nariz Morada',
            description: 'Cuando te mordí fuerte la nariz y te quedó morada, parecías payasita djhsakd. Un momento divertido que nunca olvidaremos.'
        }
    };
    
    return videoData[videoType] || null;
}

// ========================================
// FUNCIONES DEL NAVBAR
// ========================================

/**
 * Configura los eventos del navbar
 */
function setupNavbarEvents() {
    try {
        console.log('🧭 Configurando eventos del navbar...');
        
        // Configurar navegación suave
        setupSmoothScrolling();
        
        // Configurar toggle móvil
        setupMobileToggle();
        
        // Configurar scroll spy
        setupScrollSpy();
        
        // Configurar scroll del navbar
        setupNavbarScroll();
        
        console.log('✅ Eventos del navbar configurados');
    } catch (error) {
        console.error('❌ Error al configurar eventos del navbar:', error);
    }
}

/**
 * Configura el scroll suave para los enlaces del navbar
 */
function setupSmoothScrolling() {
    try {
        const navbarLinks = document.querySelectorAll('.navbar-link');
        
        navbarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    const navbarMenu = document.getElementById('navbarMenu');
                    const navbarToggle = document.getElementById('navbarToggle');
                    
                    if (navbarMenu && navbarMenu.classList.contains('active')) {
                        navbarMenu.classList.remove('active');
                        navbarToggle.classList.remove('active');
                    }
                    
                    console.log(`🧭 Navegando a: ${targetId}`);
                }
            });
        });
    } catch (error) {
        console.error('❌ Error al configurar scroll suave:', error);
    }
}

/**
 * Configura el toggle del menú móvil
 */
function setupMobileToggle() {
    try {
        const navbarToggle = document.getElementById('navbarToggle');
        const navbarMenu = document.getElementById('navbarMenu');
        
        if (navbarToggle && navbarMenu) {
            navbarToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navbarMenu.classList.toggle('active');
                navbarToggle.classList.toggle('active');
                
                console.log('📱 Toggle del menú móvil');
            });
            
            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('active');
                }
            });
            
            // Cerrar menú al redimensionar ventana
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('active');
                }
            });
        }
    } catch (error) {
        console.error('❌ Error al configurar toggle móvil:', error);
    }
}

/**
 * Configura el scroll spy para resaltar la sección activa
 */
function setupScrollSpy() {
    try {
        const sections = document.querySelectorAll('section[id]');
        const navbarLinks = document.querySelectorAll('.navbar-link');
        
        function updateActiveLink() {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    // Remover clase active de todos los enlaces
                    navbarLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Agregar clase active al enlace correspondiente
                    const activeLink = document.querySelector(`.navbar-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }
        
        // Ejecutar al cargar la página
        updateActiveLink();
        
        // Ejecutar al hacer scroll
        window.addEventListener('scroll', updateActiveLink);
        
        console.log('✅ Scroll spy configurado');
    } catch (error) {
        console.error('❌ Error al configurar scroll spy:', error);
    }
}

/**
 * Configura el efecto de scroll en el navbar
 */
function setupNavbarScroll() {
    try {
        const navbar = document.getElementById('navbar');
        
        if (navbar) {
            function handleNavbarScroll() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            
            // Ejecutar al cargar la página
            handleNavbarScroll();
            
            // Ejecutar al hacer scroll
            window.addEventListener('scroll', handleNavbarScroll);
            
            console.log('✅ Scroll del navbar configurado');
        }
    } catch (error) {
        console.error('❌ Error al configurar scroll del navbar:', error);
    }
}

// Exportar funciones para uso global (si es necesario)
window.scrollToNext = scrollToNext;
