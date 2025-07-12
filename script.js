// اطلاعات پیش‌فرض
const defaultData = {
    music: {
        title: 'SLOW SORROW',
        link: '#',
        artist: 'MINNIE AOYAMA'
    },
    book: {
        title: 'سیر عشق',
        link: '#',
        author: 'اثر: الن دوباتن'
    },
    movie: {
        title: 'LOVEABLE',
        link: '#',
        year: '2024'
    },
    podcast: {
        title: 'راهی برای ارتباط .. دلبستگی',
        link: '#',
        desc: 'A WAY TO COMMUNICATE .. AFFECTION'
    },
    mood: {
        desc: 'مودپلنر اختصاصی انجمن علمی مشاوره دانشگاه اصفهان'
    }
};

function getData() {
    const data = localStorage.getItem('good-moments-data');
    return data ? JSON.parse(data) : defaultData;
}

function setData(data) {
    localStorage.setItem('good-moments-data', JSON.stringify(data));
}

// صفحه اصلی
if (document.getElementById('music-title')) {
    const data = getData();
    document.getElementById('music-title').textContent = data.music.title;
    document.getElementById('music-artist').textContent = data.music.artist;
    document.getElementById('book-title').textContent = data.book.title;
    document.getElementById('book-author').textContent = data.book.author;
    document.getElementById('movie-title').textContent = data.movie.title;
    document.getElementById('movie-year').textContent = data.movie.year;
    document.getElementById('podcast-title').textContent = data.podcast.title;
    document.getElementById('podcast-desc').textContent = data.podcast.desc;
    document.getElementById('mood-desc').textContent = data.mood.desc;

    // لینک کردن کل باکس هر بخش
    document.getElementById('music-section').href = data.music.link;
    document.getElementById('book-section').href = data.book.link;
    document.getElementById('movie-section').href = data.movie.link;
    document.getElementById('podcast-section').href = data.podcast.link;
}

// صفحه ادمین
if (document.getElementById('admin-form')) {
    const data = getData();
    // مقداردهی اولیه فرم
    document.getElementById('music-title-input').value = data.music.title;
    document.getElementById('music-link-input').value = data.music.link;
    document.getElementById('music-artist-input').value = data.music.artist;
    document.getElementById('book-title-input').value = data.book.title;
    document.getElementById('book-link-input').value = data.book.link;
    document.getElementById('book-author-input').value = data.book.author;
    document.getElementById('movie-title-input').value = data.movie.title;
    document.getElementById('movie-link-input').value = data.movie.link;
    document.getElementById('movie-year-input').value = data.movie.year;
    document.getElementById('podcast-title-input').value = data.podcast.title;
    document.getElementById('podcast-link-input').value = data.podcast.link;
    document.getElementById('podcast-desc-input').value = data.podcast.desc;
    document.getElementById('mood-desc-input').value = data.mood.desc;
    document.getElementById('admin-form').onsubmit = function(e) {
        e.preventDefault();
        const newData = {
            music: {
                title: document.getElementById('music-title-input').value,
                link: document.getElementById('music-link-input').value,
                artist: document.getElementById('music-artist-input').value
            },
            book: {
                title: document.getElementById('book-title-input').value,
                link: document.getElementById('book-link-input').value,
                author: document.getElementById('book-author-input').value
            },
            movie: {
                title: document.getElementById('movie-title-input').value,
                link: document.getElementById('movie-link-input').value,
                year: document.getElementById('movie-year-input').value
            },
            podcast: {
                title: document.getElementById('podcast-title-input').value,
                link: document.getElementById('podcast-link-input').value,
                desc: document.getElementById('podcast-desc-input').value
            },
            mood: {
                desc: document.getElementById('mood-desc-input').value
            }
        };
        setData(newData);
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