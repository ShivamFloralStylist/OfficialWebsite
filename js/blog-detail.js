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

const detailContainer = document.getElementById('blog-detail');

async function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (!postId) {
        detailContainer.innerHTML = `
      <div class="error-message">
        <h2>Invalid Post</h2>
        <p>It seems this blog post does not exist.</p>
      </div>
    `;
        return;
    }

    try {
        const doc = await db.collection('posts').doc(postId).get();
        if (!doc.exists) {
            detailContainer.innerHTML = `
        <div class="error-message">
          <h2>Post Not Found</h2>
          <p>Sorry, we couldn't find this blog post. Please check back later.</p>
        </div>
      `;
            return;
        }

        const data = doc.data();

        // Optional date
        const formattedDate = data.date ? `<p class="post-date">Date: ${data.date}</p>` : '';

        // Optional gallery
        let galleryHTML = '';
        if (data.gallery && data.gallery.length > 0) {
            galleryHTML = `
        <section class="photo-gallery">
          <h3>Event Photo Gallery</h3>
          <div class="gallery-grid">
            ${data.gallery.map(url => `<img src="${url}" alt="Event photo">`).join('')}
          </div>
        </section>
      `;
        }

        detailContainer.innerHTML = `
      <article class="blog-post">
        <div class="hero-image">
          <img src="${data.image}" alt="${data.title}">
        </div>
        <div class="post-content">
          <h1>${data.title}</h1>
          ${formattedDate}
          <div class="content-text">
            ${data.content.replace(/\n/g, '<br>')}
          </div>
          ${galleryHTML}
        </div>
      </article>
    `;
    } catch (error) {
        console.error('Error loading post:', error);
        detailContainer.innerHTML = `
      <div class="error-message">
        <h2>Error Loading Post</h2>
        <p>There was a problem fetching this blog post. Please try again later.</p>
      </div>
    `;
    }
}

document.addEventListener('DOMContentLoaded', loadPost);
