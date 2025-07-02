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

const blogList = document.getElementById('blog-list');

async function loadBlogPosts() {
    blogList.innerHTML = '<p>Loading posts...</p>';
    try {
        const snapshot = await db.collection('posts').orderBy('date', 'desc').get();
        if (snapshot.empty) {
            blogList.innerHTML = '<p>No blog posts yet. Check back soon!</p>';
            return;
        }

        blogList.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const excerpt = data.content.slice(0, 150) + '...';

            const post = document.createElement('article');
            post.className = 'blog-summary';
            post.innerHTML = `
        <img src="${data.image}" alt="${data.title}">
        <div class="blog-info">
          <h3>${data.title}</h3>
          <p>${excerpt}</p>
          <a class="read-more" href="blog-detail.html?id=${doc.id}">Read More</a>
        </div>
      `;
            blogList.appendChild(post);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
        blogList.innerHTML = '<p>Error loading posts. Try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);
