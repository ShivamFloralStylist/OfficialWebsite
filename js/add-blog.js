let editIndex = null;

function loadAdminBlogPosts() {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const container = document.getElementById('admin-blog-list');

    if (posts.length === 0) {
        container.innerHTML = '<p>No blog posts added yet.</p>';
        return;
    }

    container.innerHTML = '';
    posts.forEach((post, index) => {
        const item = document.createElement('div');
        item.className = 'admin-blog-item';
        item.innerHTML = `
      <strong>${post.title}</strong><br>
      <img src="${post.image}" alt="${post.title}" width="150"><br>
      <p>${post.content}</p>
      <hr>
      <button onclick="startEditBlogPost(${index})">Edit</button>
      <button onclick="removeBlogPost(${index})">Remove</button>
    `;
        container.appendChild(item);
    });
}

function removeBlogPost(index) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    loadAdminBlogPosts();
}

function startEditBlogPost(index) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts[index];

    document.getElementById('blog-title').value = post.title;
    document.getElementById('blog-image').value = post.image;
    document.getElementById('blog-content').value = post.content;

    editIndex = index;
    document.getElementById('form-title').innerText = 'Edit Blog Post';
    document.getElementById('submit-button').innerText = 'Save Changes';
    document.getElementById('cancel-edit').style.display = 'inline-block';
}

function cancelEdit() {
    editIndex = null;
    document.getElementById('add-blog-form').reset();
    document.getElementById('form-title').innerText = 'Add New Blog Post';
    document.getElementById('submit-button').innerText = 'Add Blog Post';
    document.getElementById('cancel-edit').style.display = 'none';
}

document.getElementById('cancel-edit').addEventListener('click', cancelEdit);

document.getElementById('add-blog-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('blog-title').value.trim();
    const image = document.getElementById('blog-image').value.trim();
    const content = document.getElementById('blog-content').value.trim();

    if (!title || !image || !content) {
        alert('Please fill in all fields!');
        return;
    }

    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    if (editIndex !== null) {
        // Save edits
        posts[editIndex] = { title, image, content };
        alert('Blog post updated!');
    } else {
        // Add new
        posts.unshift({ title, image, content });
        alert('Blog post added!');
    }

    localStorage.setItem('blogPosts', JSON.stringify(posts));
    document.getElementById('add-blog-form').reset();
    cancelEdit();
    loadAdminBlogPosts();
});

document.addEventListener('DOMContentLoaded', loadAdminBlogPosts);
