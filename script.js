// Ensure the document is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const header = createHeader();
    const postsContainer = createPostsContainer();
    const footer = createFooter();

    // Append all major sections to the body
    body.appendChild(header);
    body.appendChild(postsContainer);
    body.appendChild(footer);

    // Additional styles for body
    Object.assign(body.style, {
        fontFamily: 'Arial, sans-serif',
        margin: '0',
        padding: '0',
        backgroundImage: 'url("dev.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    });

    // Functions to create each part of the page
    function createHeader() {
        const header = document.createElement('div');
        header.className = 'header';
        header.style.textAlign = 'center';
        header.style.color = 'white';
        header.style.padding = '100px 0';
        header.style.position = 'relative';

        const logo = document.createElement('img');
        logo.src = 'dev.png';
        logo.alt = 'Amir Logo';
        logo.className = 'logo';
        logo.style.width = '50px';
        logo.style.position = 'absolute';
        logo.style.top = '10px';
        logo.style.left = '10px';

        const h1 = document.createElement('h1');
        h1.textContent = 'Amir';

        const p = document.createElement('p');
        p.textContent = 'A student in Kenya exploring tech ideas';

        header.appendChild(logo);
        header.appendChild(h1);
        header.appendChild(p);

        return header;
    }

    function createPostsContainer() {
        const container = document.createElement('div');
        container.className = 'posts-container';
        container.style.display = 'flex';
        container.style.flexWrap = 'wrap';
        container.style.justifyContent = 'center';
        container.style.padding = '20px';

        // Example post 1
        const post1 = createPost(
            'assets/Screenshot_20240714-202609.jpg',
            'SINGLE PARENT SELF CERTIFICATION',
            'https://selfcert.tiiny.site'
        );

        // Example post 2
        const post2 = createPost(
            'dev.jpg',
            'SEMESTER TERM DATES',
            'https://www.mediafire.com/file/rrvviaopycuxada/SEMESTER-TERM_DATES_FOR_THE_2024-2025_ACADEMIC_YEAR_APPROVED_BY_SENATE_%25281%2529_%25282%2529.pdf/file'
        );

        container.appendChild(post1);
        container.appendChild(post2);

        return container;
    }

    function createPost(imageSrc, title, link) {
        const post = document.createElement('div');
        post.className = 'post';
        Object.assign(post.style, {
            width: '300px',
            margin: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
        });

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = title;
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.transition = 'transform 0.3s ease';

        const description = document.createElement('div');
        description.className = 'post-description';
        description.style.display = 'none';
        description.style.padding = '15px';
        description.style.textAlign = 'center';
        description.style.background = 'rgba(0, 0, 0, 0.5)';

        const h2 = document.createElement('h2');
        h2.textContent = title;
        h2.style.color = 'white';
        h2.style.fontFamily = '"Elephant", Arial, sans-serif';

        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = link;
        a.textContent = 'DOWNLOAD HERE';
        a.style.color = 'white';
        p.appendChild(a);

        description.appendChild(h2);
        description.appendChild(p);

        post.appendChild(img);
        post.appendChild(description);

        // Add hover effect to show description
        post.onmouseenter = () => description.style.display = 'block';
        post.onmouseleave = () => description.style.display = 'none';

        return post;
    }

    function createFooter() {
        const footer = document.createElement('div');
        footer.className = 'footer';
        footer.style.backgroundColor = '#333';
        footer.style.color = 'white';
        footer.style.textAlign = 'center';
        footer.style.padding = '10px';
        footer.style.width = '100%';

        const p = document.createElement('p');
        p.textContent = 'Amir Foundation';

        const button = document.createElement('button');
        button.textContent = 'Contact Me';
        button.style.padding = '10px 20px';
        button.style.backgroundColor = '#4CAF50';
        button.style.border = 'none';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.style.fontSize = '16px';
        button.style.borderRadius = '5px';
        button.onmouseenter = () => button.style.backgroundColor = '#45a049';

        footer.appendChild(p);
        footer.appendChild(button);

        return footer;
    }
});
