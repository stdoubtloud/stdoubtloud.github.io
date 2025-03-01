document.addEventListener(DOMContentLoaded, function() {
    showSection('home');  Show home section by default
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section = {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}
