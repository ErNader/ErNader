// اطلاعات Supabase
const SUPABASE_URL = 'https://ddiflcjcnuzppyzbbxkr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkaWZsY2pjbnV6cHB5emJieGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMDgzMDIsImV4cCI6MjA2Njc4NDMwMn0.XFBabs-t0qU0MBqcBl7-8wfGv87WCRBV8HwSswkja6E';
const MOMENT_ID = 1;

async function fetchMoments() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/moments?id=eq.${MOMENT_ID}`, {
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data[0];
}

async function updateMoments(newData) {
    await fetch(`${SUPABASE_URL}/rest/v1/moments?id=eq.${MOMENT_ID}`, {
        method: 'PATCH',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    });
}

async function updateLastActive() {
    const today = new Date().toISOString().slice(0, 10);
    await updateMoments({ last_active: today });
}

// صفحه اصلی
if (document.getElementById('music-title')) {
    (async () => {
        const data = await fetchMoments();
        document.getElementById('music-title').textContent = data.music_title || '';
        document.getElementById('music-artist').textContent = data.music_artist || '';
        document.getElementById('book-title').textContent = data.book_title || '';
        document.getElementById('book-author').textContent = data.book_author || '';
        document.getElementById('movie-title').textContent = data.movie_title || '';
        document.getElementById('movie-year').textContent = data.movie_year || '';
        document.getElementById('podcast-title').textContent = data.podcast_title || '';
        document.getElementById('podcast-desc').textContent = data.podcast_desc || '';
        document.getElementById('mood-desc').textContent = data.mood_desc || '';
        document.getElementById('music-section').href = data.music_link || '#';
        document.getElementById('book-section').href = data.book_link || '#';
        document.getElementById('movie-section').href = data.movie_link || '#';
        document.getElementById('podcast-section').href = data.podcast_link || '#';
        // آپدیت متغیر last_active
        updateLastActive();
    })();
}

// صفحه ادمین
if (document.getElementById('admin-form')) {
    (async () => {
        const data = await fetchMoments();
        document.getElementById('music-title-input').value = data.music_title || '';
        document.getElementById('music-link-input').value = data.music_link || '';
        document.getElementById('music-artist-input').value = data.music_artist || '';
        document.getElementById('book-title-input').value = data.book_title || '';
        document.getElementById('book-link-input').value = data.book_link || '';
        document.getElementById('book-author-input').value = data.book_author || '';
        document.getElementById('movie-title-input').value = data.movie_title || '';
        document.getElementById('movie-link-input').value = data.movie_link || '';
        document.getElementById('movie-year-input').value = data.movie_year || '';
        document.getElementById('podcast-title-input').value = data.podcast_title || '';
        document.getElementById('podcast-link-input').value = data.podcast_link || '';
        document.getElementById('podcast-desc-input').value = data.podcast_desc || '';
        document.getElementById('mood-desc-input').value = data.mood_desc || '';
    })();
    document.getElementById('admin-form').onsubmit = async function(e) {
        e.preventDefault();
        const newData = {
            music_title: document.getElementById('music-title-input').value,
            music_link: document.getElementById('music-link-input').value,
            music_artist: document.getElementById('music-artist-input').value,
            book_title: document.getElementById('book-title-input').value,
            book_link: document.getElementById('book-link-input').value,
            book_author: document.getElementById('book-author-input').value,
            movie_title: document.getElementById('movie-title-input').value,
            movie_link: document.getElementById('movie-link-input').value,
            movie_year: document.getElementById('movie-year-input').value,
            podcast_title: document.getElementById('podcast-title-input').value,
            podcast_link: document.getElementById('podcast-link-input').value,
            podcast_desc: document.getElementById('podcast-desc-input').value,
            mood_desc: document.getElementById('mood-desc-input').value,
            last_active: new Date().toISOString().slice(0, 10)
        };
        await updateMoments(newData);
        var msg = document.getElementById('success-message');
        msg.style.display = 'block';
        setTimeout(() => { msg.style.display = 'none'; }, 2000);
    };
}

// مدیریت لاگین ادمین
function checkLogin() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === 'admin123') {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('admin-form').style.display = 'block';
        document.getElementById('login-error').style.display = 'none';
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}