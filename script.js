document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('backgroundMode') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const mode = document.body.classList.contains('dark-mode') ? 'dark' : 'picture';
    localStorage.setItem('backgroundMode', mode);
}


// Enhanced and expanded JavaScript functionalities
const posts = [
    {
        category: 'apps',
        image: 'assets/app1.jpg',
        title: 'App for Scheduling',
        link: 'https://example.com/app1',
        linkText: 'Learn More'
    },
    {
        category: 'maseno-docs',
        image: 'assets/doc1.jpg',
        title: 'Maseno University Document',
        link: 'https://example.com/doc1',
        linkText: 'View Document'
    },
    {
        category: 'mod-info',
        image: 'assets/mod1.jpg',
        title: 'Module Information',
        link: 'https://example.com/mod1',
        linkText: 'Explore'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    renderPosts();
    initNewsTicker();
});

function renderPosts() {
    const postsContainer = document.querySelector('.posts-container');
    posts.forEach(post => createPostElement(post, postsContainer));
}

function createPostElement(post, container) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.dataset.category = post.category;
    postElement.onclick = () => showPostDescription(postElement);

    const imgElement = new Image();
    imgElement.src = post.image;
    imgElement.alt = post.title;
    imgElement.onclick = () => zoomImage(imgElement);
    postElement.appendChild(imgElement);

    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'post-description';
    descriptionElement.innerHTML = `<h2>${post.title}</h2><p><a href="${post.link}" target="_blank">${post.linkText}</a></p>`;
    postElement.appendChild(descriptionElement);

    container.appendChild(postElement);
}

function filterContent(category) {
    document.querySelectorAll('.post').forEach(post => {
        post.style.display = (category === 'all' || post.dataset.category === category) ? 'block' : 'none';
    });
}

function initNewsTicker() {
    const news = ['New App Released!', 'Document Update Available', 'Module Information Updated'];
    let currentNewsIndex = 0;
    setInterval(() => {
        document.querySelector('.footer p').textContent = news[currentNewsIndex++];
        if (currentNewsIndex === news.length) currentNewsIndex = 0;
    }, 3000);
}

function zoomImage(img) {
    const modal = document.getElementById('myModal');
    modal.style.display = "block";
    document.getElementById('img01').src = img.src;
    document.getElementById('caption').textContent = img.alt;
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

function openWhatsApp() {
    const phoneNumber = "1234567890";
    const message = "Hello, I would like to get in touch!";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}
