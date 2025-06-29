let allPosts = [];
let currentIndex = 0;

function getStoredPosts() {
    return JSON.parse(localStorage.getItem('blogPosts')) || [];
}

function loadNextPost() {
    if (currentIndex >= allPosts.length) return;

    const post = allPosts[currentIndex];
    const container = document.getElementById('blog-posts');

    const item = document.createElement('article');
    item.className = 'blog-post';
    item.innerHTML = `
    <img src="${post.image}" alt="${post.title}">
    <h3>${post.title}</h3>
    <p>${post.content}</p>
  `;

    container.appendChild(item);

    // Trigger fade-in animation
    setTimeout(() => item.classList.add('visible'), 100);

    currentIndex++;
}

function loadInitialPosts() {
    allPosts = getStoredPosts();
    const container = document.getElementById('blog-posts');

    if (allPosts.length === 0) {
        container.innerHTML = '<p style="text-align:center;">No blog posts yet. Check back soon!</p>';
        return;
    }

    // Load first post immediately
    loadNextPost();
}

function handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        loadNextPost();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadInitialPosts();
    window.addEventListener('scroll', handleScroll);
});
