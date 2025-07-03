// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqRU87dMKMW49AUctNUO-ch494ZMBlAbE",
    authDomain: "shivam-floral-stylist.firebaseapp.com",
    projectId: "shivam-floral-stylist",
    storageBucket: "shivam-floral-stylist.firebasestorage.app",
    messagingSenderId: "433569550391",
    appId: "1:433569550391:web:be86a51137299a83b9afb2",
    measurementId: "G-VNJQM8DBT1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let editId = null;

// Load posts from Firestore
async function loadAdminBlogPosts() {
    const container = document.getElementById('admin-blog-list');
    container.innerHTML = '<p>Loading...</p>';

    try {
        const snapshot = await db.collection('posts').orderBy('date', 'desc').get();

        if (snapshot.empty) {
            container.innerHTML = '<p>No blog posts added yet.</p>';
            return;
        }

        container.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const id = doc.id;

            const galleryDisplay = data.gallery && data.gallery.length > 0
                ? data.gallery.map(url => `<img src="${url}" width="100">`).join('')
                : '<em>No gallery</em>';

            const item = document.createElement('div');
            item.className = 'admin-blog-item';
            item.innerHTML = `
        <strong>${data.title}</strong><br>
        <img src="${data.image}" alt="${data.title}" width="150"><br>
        <p>${data.content}</p>
        <div class="admin-gallery">${galleryDisplay}</div>
        <hr>
        <button onclick="startEditBlogPost('${id}', \`${data.title.replace(/`/g, "\\`")}\`, '${data.date || ''}', '${data.image}', \`${data.content.replace(/`/g, "\\`")}\`, '${(data.gallery || []).join(",")}')">Edit</button>
        <button onclick="removeBlogPost('${id}')">Remove</button>
      `;
            container.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
        container.innerHTML = '<p>Error loading posts. Check console.</p>';
    }
}

// Remove post
async function removeBlogPost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
        try {
            await db.collection('posts').doc(id).delete();
            alert('Post deleted!');
            loadAdminBlogPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Error deleting post.');
        }
    }
}

// Start editing
function startEditBlogPost(id, title, date, image, content, gallery) {
    document.getElementById('blog-title').value = title;
    document.getElementById('blog-date').value = date;
    document.getElementById('blog-image').value = image;
    document.getElementById('blog-content').value = content;
    document.getElementById('blog-gallery').value = gallery;

    editId = id;
    document.getElementById('form-title').innerText = 'Edit Blog Post';
    document.getElementById('submit-button').innerText = 'Save Changes';
    document.getElementById('cancel-edit').style.display = 'inline-block';
}

// Cancel edit
function cancelEdit() {
    editId = null;
    document.getElementById('add-blog-form').reset();
    document.getElementById('form-title').innerText = 'Add New Blog Post';
    document.getElementById('submit-button').innerText = 'Add Blog Post';
    document.getElementById('cancel-edit').style.display = 'none';
}

document.getElementById('cancel-edit').addEventListener('click', cancelEdit);

// Add or Update post
document.getElementById('add-blog-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('blog-title').value.trim();
    const date = document.getElementById('blog-date').value.trim();
    const image = document.getElementById('blog-image').value.trim();
    const content = document.getElementById('blog-content').value.trim();
    const galleryInput = document.getElementById('blog-gallery').value.trim();

    if (!title || !date || !image || !content) {
        alert('Please fill in Title, Image, and Content!');
        return;
    }

    const gallery = galleryInput
        ? galleryInput.split(',').map(url => url.trim()).filter(url => url)
        : [];

    try {
        if (editId) {
            await db.collection('posts').doc(editId).update({
                title,
                date,
                image,
                content,
                gallery
            });
            alert('Blog post updated!');
        } else {
            await db.collection('posts').add({
                title,
                date,
                image,
                content,
                gallery,
                //date: new Date().toISOString()
            });
            alert('Blog post added!');
        }

        document.getElementById('add-blog-form').reset();
        cancelEdit();
        loadAdminBlogPosts();
    } catch (error) {
        console.error('Error saving post:', error);
        alert('Error saving post. Check console.');
    }
});

document.addEventListener('DOMContentLoaded', loadAdminBlogPosts);
