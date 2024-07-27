document.addEventListener('DOMContentLoaded', function() {
    // Load dark mode if previously set
    if (localStorage.getItem('backgroundMode') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    document.getElementById('mode-toggle').addEventListener('click', toggleMode);
    document.getElementById('nav-toggle').addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('hidden');
    });

    loadPosts();
});

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const mode = document.body.classList.contains('dark-mode') ? 'dark' : 'picture';
    localStorage.setItem('backgroundMode', mode);
}

function loadPosts() {
    const posts = [
        // Add post objects here
    ];
    const container = document.querySelector('.posts-container');
    posts.forEach(post => {
        const div = document.createElement('div');
        div.innerHTML = `<h2>${post.title}</h2><p>${post.description}</p>`;
        container.appendChild(div);
    });
}

function filterContent(category) {
    // Implementation to show/hide posts based on category
}

function openWhatsApp() {
    window.open('https://wa.me/1234567890', '_blank');
}
