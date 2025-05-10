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
        badge.classList.remove('bg-success', 'bg-warning', 'bg-secondary');
        badge.classList.add(completed ? 'bg-success' : 'bg-secondary');
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
    const percentage = sectionLessons.length > 0 ? 
        Math.round((completedLessons.length / sectionLessons.length) * 100) : 0;
    
    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', percentage);
    progressBar.textContent = percentage + '%';
    
    // Actualizar clase según el porcentaje
    progressBar.classList.remove('bg-success', 'bg-warning', 'bg-danger');
    if (percentage >= 80) {
        progressBar.classList.add('bg-success');
    } else if (percentage >= 40) {
        progressBar.classList.add('bg-warning');
    } else {
        progressBar.classList.add('bg-danger');
    }
    
    // Guardar progreso del módulo
    const progress = JSON.parse(localStorage.getItem('phpGuideProgress') || '{}');
    if (!progress.sections) progress.sections = {};
    progress.sections[section] = {
        total: sectionLessons.length,
        completed: completedLessons.length,
        percentage: percentage
    };
    localStorage.setItem('phpGuideProgress', JSON.stringify(progress));
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
