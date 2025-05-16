// Función para inicializar el sistema de progreso del sidebar
function initSidebarProgress() {
    // Cargar progreso guardado
    const progress = JSON.parse(localStorage.getItem('phpGuideProgress') || '{}');
    
    // Inicializar checkboxes
    document.querySelectorAll('.lesson-checkbox').forEach(checkbox => {
        const lesson = checkbox.closest('.leccion');
        const lessonId = lesson.dataset.lessonId;
        
        // Actualizar estado del checkbox basado en el progreso guardado
        if (progress.lessons && progress.lessons[lessonId]) {
            checkbox.checked = true;
            lesson.classList.add('completed');
            updateLessonBadge(lesson, true);
        } else {
            checkbox.checked = false;
            lesson.classList.remove('completed');
            updateLessonBadge(lesson, false);
        }
        
        // Escuchar cambios en el checkbox
        checkbox.addEventListener('change', function() {
            const isCompleted = this.checked;
            updateLessonProgress(lessonId, isCompleted);
        });
    });
    
    // Inicializar barra de progreso
    updateSectionProgress();
}

// Función para actualizar el badge de una lección
function updateLessonBadge(lesson, completed) {
    const badge = lesson.querySelector('.badge');
    if (badge) {
        badge.classList.remove('bg-success', 'bg-secondary', 'bg-warning');
        // Obtener el número de la lección y el total
        let badgeText = badge.textContent.trim();
        let match = badgeText.match(/(\d+)\/(\d+)/);
        let current = 0, total = 0;
        if (match) {
            current = parseInt(match[1], 10);
            total = parseInt(match[2], 10);
        }
        // Si no se puede extraer, usar dataset o fallback
        if (!current || !total) {
            current = Array.from(lesson.parentNode.children).indexOf(lesson) + 1;
            total = lesson.parentNode.children.length;
        }
        badge.textContent = `${current}/${total}`;
        if (completed) {
            badge.classList.add('bg-success');
        } else {
            badge.classList.add('bg-secondary');
        }
    }
}

// Función para actualizar el progreso de una lección
function updateLessonProgress(lessonId, completed) {
    const lesson = document.querySelector(`.leccion[data-lesson-id="${lessonId}"]`);
    if (!lesson) return;

    if (completed) {
        lesson.classList.add('completed');
    } else {
        lesson.classList.remove('completed');
    }
    
    updateLessonBadge(lesson, completed);
    saveProgress(lessonId, completed);
    updateSectionProgress();
}

// Función para guardar el progreso de una lección
function saveProgress(lessonId, completed) {
    const progress = JSON.parse(localStorage.getItem('phpGuideProgress') || '{}');
    if (!progress.lessons) progress.lessons = {};
    progress.lessons[lessonId] = completed;
    
    // Actualizar progreso general del módulo
    const section = getCurrentSection();
    if (section && !progress.sections) progress.sections = {};
    if (section) {
        const sectionLessons = document.querySelectorAll(`.leccion[data-section="${section}"]`);
        const completedSectionLessons = document.querySelectorAll(`.leccion[data-section="${section}"].completed`);
        progress.sections[section] = {
            total: sectionLessons.length,
            completed: completedSectionLessons.length,
            percentage: Math.round((completedSectionLessons.length / sectionLessons.length) * 100)
        };
    }
    
    localStorage.setItem('phpGuideProgress', JSON.stringify(progress));
}

// Obtener la sección actual basada en el header del sidebar
function getCurrentSection() {
    const header = document.querySelector('.card-header h5');
    if (!header) return null;
    
    const headerText = header.textContent.trim();
    switch (headerText) {
        case 'Fundamentos':
            return 'fundamentos';
        case 'Intermedio':
            return 'intermedio';
        case 'Bases de Datos':
            return 'bd';
        case 'APIs con PHP':
            return 'apis';
        default:
            return null;
    }
}

// Función para actualizar la barra de progreso de la sección
function updateSectionProgress() {
    const progressBar = document.getElementById('course-progress');
    if (!progressBar) return;
    
    const section = getCurrentSection();
    if (!section) return;
    
    const sectionLessons = document.querySelectorAll('.leccion');
    const completedLessons = document.querySelectorAll('.leccion.completed');
    
    // Actualizar el progreso en formato fracción
    const moduleProgress = document.getElementById('module-lessons-count');
    if (moduleProgress) {
        moduleProgress.textContent = `${completedLessons.length}/${sectionLessons.length} lecciones`;
    }
    
    // Actualizar la barra de progreso
    const percentage = sectionLessons.length > 0 ? 
        Math.round((completedLessons.length / sectionLessons.length) * 100) : 0;
    
    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', percentage);
    progressBar.textContent = `${completedLessons.length}/${sectionLessons.length}`;
    
    // Actualizar clases de la barra de progreso
    progressBar.classList.remove('bg-success', 'bg-warning', 'bg-danger');
    if (completedLessons.length === sectionLessons.length) {
        progressBar.classList.add('bg-success');
    } else if (completedLessons.length > 0) {
        progressBar.classList.add('bg-warning');
    } else {
        progressBar.classList.add('bg-secondary');
    }
    
    // Actualizar el progreso actual de la lección
    const currentProgress = document.getElementById('current-lesson-progress');
    if (currentProgress) {
        const currentLesson = document.querySelector('.leccion.active');
        if (currentLesson) {
            const totalTopics = currentLesson.dataset.totalTopics || 7;
            const completedTopics = currentLesson.classList.contains('completed') ? totalTopics : 0;
            currentProgress.textContent = `${completedTopics}/${totalTopics} temas`;
        }
    }
}

// Cargar el progreso al iniciar
document.addEventListener('DOMContentLoaded', function() {
    // Añadir atributos de sección
    const section = getCurrentSection();
    if (section) {
        document.querySelectorAll('.leccion').forEach(lesson => {
            lesson.setAttribute('data-section', section);
        });
    }
    
    initSidebarProgress();
});
