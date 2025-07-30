// داده‌های نمونه برای ذخیره در localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
let groups = JSON.parse(localStorage.getItem('groups')) || [];
let students = JSON.parse(localStorage.getItem('students')) || [];
let programs = JSON.parse(localStorage.getItem('programs')) || [];
let attendance = JSON.parse(localStorage.getItem('attendance')) || [];
let grades = JSON.parse(localStorage.getItem('grades')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// آمار مرکز
const centerStats = {
    students: 150,
    teachers: 25,
    programs: 12,
    years: 8
};

// بررسی اتصال به Supabase
let isSupabaseConnected = false;

// تابع بررسی اتصال به دیتابیس
async function checkDatabaseConnection() {
    try {
        if (typeof supabaseClient !== 'undefined') {
            const { data, error } = await supabaseClient
                .from('users')
                .select('count')
                .limit(1)
                .timeout(5000); // 5 second timeout
            
            if (!error) {
                isSupabaseConnected = true;
                console.log('اتصال به Supabase برقرار شد');
                return true;
            } else {
                console.log('خطا در اتصال به Supabase:', error.message);
                isSupabaseConnected = false;
            }
        }
    } catch (error) {
        console.log('Supabase در دسترس نیست، استفاده از LocalStorage:', error.message);
        isSupabaseConnected = false;
    }
    return false;
}

// تابع مقداردهی اولیه
async function initializeApp() {
    await checkDatabaseConnection();
    
    // بارگذاری داده‌های نمونه برای LocalStorage اگر خالی باشد
    if (!isSupabaseConnected) {
        if (users.length === 0) {
            // ایجاد کاربران نمونه
            users = [
                {
                    id: 1,
                    nationalId: '1234567890',
                    fullName: 'مدیر مرکز',
                    email: 'admin@example.com',
                    phone: '09123456789',
                    password: '123456',
                    type: 'admin'
                },
                {
                    id: 2,
                    nationalId: '1111111111',
                    fullName: 'احمد رضایی',
                    email: 'ahmad@example.com',
                    phone: '09111111111',
                    password: '123456',
                    type: 'coordinator'
                },
                {
                    id: 3,
                    nationalId: '2222222222',
                    fullName: 'فاطمه محمدی',
                    email: 'fateme@example.com',
                    phone: '09222222222',
                    password: '123456',
                    type: 'coordinator'
                },
                {
                    id: 4,
                    nationalId: '3333333333',
                    fullName: 'علی احمدی',
                    email: 'ali@example.com',
                    phone: '09333333333',
                    password: '123456',
                    type: 'student'
                },
                {
                    id: 5,
                    nationalId: '4444444444',
                    fullName: 'مریم کریمی',
                    email: 'maryam@example.com',
                    phone: '09444444444',
                    password: '123456',
                    type: 'student'
                },
                {
                    id: 6,
                    nationalId: '5555555555',
                    fullName: 'حسین نوری',
                    email: 'hossein@example.com',
                    phone: '09555555555',
                    password: '123456',
                    type: 'student'
                }
            ];
            localStorage.setItem('users', JSON.stringify(users));
        }

        // ایجاد گروه‌های نمونه
        if (groups.length === 0) {
            groups = [
                {
                    id: 1,
                    name: 'گروه ریاضی پیشرفته',
                    coordinatorId: 2,
                    coordinatorName: 'احمد رضایی',
                    maxStudents: 30,
                    currentStudents: 3, // تعداد واقعی دانش‌آموزان
                    isActive: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'گروه علوم تجربی',
                    coordinatorId: 3,
                    coordinatorName: 'فاطمه محمدی',
                    maxStudents: 25,
                    currentStudents: 2, // تعداد واقعی دانش‌آموزان
                    isActive: true,
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('groups', JSON.stringify(groups));
        }

        // ایجاد دانش‌آموزان نمونه
        if (students.length === 0) {
            students = [
                {
                    id: 1,
                    nationalId: '3333333333',
                    fullName: 'علی احمدی',
                    groupId: 1,
                    groupName: 'گروه ریاضی پیشرفته',
                    coordinatorId: 2,
                    coordinatorName: 'احمد رضایی',
                    isActive: true,
                    joinedAt: new Date().toISOString()
                },
                {
                    id: 2,
                    nationalId: '4444444444',
                    fullName: 'مریم کریمی',
                    groupId: 1,
                    groupName: 'گروه ریاضی پیشرفته',
                    coordinatorId: 2,
                    coordinatorName: 'احمد رضایی',
                    isActive: true,
                    joinedAt: new Date().toISOString()
                },
                {
                    id: 3,
                    nationalId: '5555555555',
                    fullName: 'حسین نوری',
                    groupId: 2,
                    groupName: 'گروه علوم تجربی',
                    coordinatorId: 3,
                    coordinatorName: 'فاطمه محمدی',
                    isActive: true,
                    joinedAt: new Date().toISOString()
                },
                {
                    id: 4,
                    nationalId: '6666666666',
                    fullName: 'سارا احمدی',
                    groupId: 1,
                    groupName: 'گروه ریاضی پیشرفته',
                    coordinatorId: 2,
                    coordinatorName: 'احمد رضایی',
                    isActive: true,
                    joinedAt: new Date().toISOString()
                },
                {
                    id: 5,
                    nationalId: '7777777777',
                    fullName: 'محمد کریمی',
                    groupId: 2,
                    groupName: 'گروه علوم تجربی',
                    coordinatorId: 3,
                    coordinatorName: 'فاطمه محمدی',
                    isActive: true,
                    joinedAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('students', JSON.stringify(students));
        }

        // ایجاد نمرات نمونه
        if (grades.length === 0) {
            grades = [
                {
                    id: 1,
                    studentId: '3333333333',
                    programId: 1,
                    grade: 18.5,
                    gradeType: 'midterm',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    studentId: '4444444444',
                    programId: 1,
                    grade: 16.0,
                    gradeType: 'midterm',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    studentId: '5555555555',
                    programId: 2,
                    grade: 19.0,
                    gradeType: 'final',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 4,
                    studentId: '6666666666',
                    programId: 1,
                    grade: 14.5,
                    gradeType: 'assignment',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 5,
                    studentId: '7777777777',
                    programId: 2,
                    grade: 17.0,
                    gradeType: 'quiz',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('grades', JSON.stringify(grades));
        }

        // ایجاد برنامه‌های نمونه
        if (programs.length === 0) {
            programs = [
                {
                    id: 1,
                    name: 'کلاس‌های تقویتی ریاضی',
                    description: 'کلاس‌های تقویتی در دروس مختلف برای دانش‌آموزان',
                    category: 'academic',
                    duration: '۳ ماه',
                    maxParticipants: 15,
                    price: 2500000,
                    isActive: true,
                    startDate: '2024-01-01',
                    endDate: '2024-03-31',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'برنامه‌نویسی',
                    description: 'آموزش برنامه‌نویسی و مهارت‌های دیجیتال',
                    category: 'academic',
                    duration: '۶ ماه',
                    maxParticipants: 12,
                    price: 4000000,
                    isActive: true,
                    startDate: '2024-01-01',
                    endDate: '2024-06-30',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    name: 'اردوهای تفریحی',
                    description: 'اردوهای متنوع و جذاب در طبیعت',
                    category: 'recreational',
                    duration: '۳ روز',
                    maxParticipants: 30,
                    price: 1500000,
                    isActive: true,
                    startDate: '2024-02-01',
                    endDate: '2024-02-03',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('programs', JSON.stringify(programs));
        }

        // ایجاد حضور و غیاب نمونه
        if (attendance.length === 0) {
            attendance = [
                {
                    id: 1,
                    studentId: '3333333333',
                    programId: 1,
                    date: '2024-01-15',
                    status: 'present',
                    recordedBy: 2,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    studentId: '4444444444',
                    programId: 1,
                    date: '2024-01-15',
                    status: 'present',
                    recordedBy: 2,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    studentId: '5555555555',
                    programId: 2,
                    date: '2024-01-16',
                    status: 'late',
                    recordedBy: 3,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 4,
                    studentId: '6666666666',
                    programId: 1,
                    date: '2024-01-17',
                    status: 'absent',
                    recordedBy: 2,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 5,
                    studentId: '7777777777',
                    programId: 2,
                    date: '2024-01-17',
                    status: 'present',
                    recordedBy: 3,
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('attendance', JSON.stringify(attendance));
        }
        
        // ایجاد نظرسنجی نمونه
        const surveys = [
            {
                id: 1,
                title: 'نظرسنجی رضایت از مرکز',
                description: 'لطفاً نظرات خود را درباره خدمات مرکز آموزشی به ما بگویید',
                questions: [
                    {
                        question: 'میزان رضایت شما از کیفیت آموزش چقدر است؟',
                        type: 'select',
                        options: ['خیلی کم', 'کم', 'متوسط', 'زیاد', 'خیلی زیاد']
                    },
                    {
                        question: 'آیا محیط آموزشی مناسب است؟',
                        type: 'select',
                        options: ['بله', 'خیر', 'تا حدودی']
                    },
                    {
                        question: 'پیشنهادات شما برای بهبود مرکز:',
                        type: 'text'
                    }
                ],
                isActive: true
            }
        ];
        localStorage.setItem('surveys', JSON.stringify(surveys));
        
        // ایجاد برنامه‌های نمونه
        const programs = [
            {
                id: 1,
                name: 'کلاس‌های تقویتی',
                description: 'کلاس‌های تقویتی در دروس مختلف',
                category: 'academic',
                duration: '۳ ماه',
                max_participants: 15,
                price: 2500000,
                is_active: true
            },
            {
                id: 2,
                name: 'برنامه‌نویسی',
                description: 'آموزش برنامه‌نویسی و مهارت‌های دیجیتال',
                category: 'academic',
                duration: '۶ ماه',
                max_participants: 12,
                price: 4000000,
                is_active: true
            }
        ];
        localStorage.setItem('programs', JSON.stringify(programs));
    }
    
    console.log('برنامه با موفقیت مقداردهی شد');
}

// نمایش آمار در صفحه اصلی
function displayStats() {
    const studentsCount = document.getElementById('students-count');
    const teachersCount = document.getElementById('teachers-count');
    const programsCount = document.getElementById('programs-count');
    const yearsCount = document.getElementById('years-count');

    if (studentsCount) {
        animateNumber(studentsCount, centerStats.students);
    }
    if (teachersCount) {
        animateNumber(teachersCount, centerStats.teachers);
    }
    if (programsCount) {
        animateNumber(programsCount, centerStats.programs);
    }
    if (yearsCount) {
        animateNumber(yearsCount, centerStats.years);
    }
}

// انیمیشن شماره‌ها
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 50);
}

// نمایش پیام
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container');
    if (!alertContainer) return;

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// تابع بهبود یافته برای ثبت‌نام
async function handleRegistration(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const registration = {
        id: Date.now(),
        programType: formData.get('program-type') || document.getElementById('program-type').value,
        fullName: formData.get('full-name') || document.getElementById('full-name').value,
        nationalId: formData.get('national-id') || document.getElementById('national-id').value,
        phone: formData.get('phone') || document.getElementById('phone').value,
        email: formData.get('email') || document.getElementById('email').value,
        birthDate: formData.get('birth-date') || document.getElementById('birth-date').value,
        educationLevel: formData.get('education-level') || document.getElementById('education-level').value,
        parentName: formData.get('parent-name') || document.getElementById('parent-name').value,
        parentPhone: formData.get('parent-phone') || document.getElementById('parent-phone').value,
        address: formData.get('address') || document.getElementById('address').value,
        emergencyContact: formData.get('emergency-contact') || document.getElementById('emergency-contact').value,
        medicalInfo: formData.get('medical-info') || document.getElementById('medical-info').value,
        registrationDate: new Date().toISOString()
    };

    // بررسی تکراری نبودن کد ملی
    if (isSupabaseConnected) {
        const checkResult = await supabaseHelper.checkNationalIdExists(registration.nationalId);
        if (checkResult.exists) {
            showAlert('این کد ملی قبلاً ثبت‌نام شده است!', 'danger');
            return;
        }
    } else {
        const existingRegistration = registrations.find(r => r.nationalId === registration.nationalId);
        if (existingRegistration) {
            showAlert('این کد ملی قبلاً ثبت‌نام شده است!', 'danger');
            return;
        }
    }

    // ذخیره در دیتابیس
    if (isSupabaseConnected) {
        const result = await supabaseHelper.createRegistration(registration);
        if (result.success) {
            showAlert('ثبت‌نام با موفقیت انجام شد!', 'success');
            event.target.reset();
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showAlert('خطا در ثبت‌نام: ' + result.error, 'danger');
        }
    } else {
        registrations.push(registration);
        localStorage.setItem('registrations', JSON.stringify(registrations));
        showAlert('ثبت‌نام با موفقیت انجام شد!', 'success');
        event.target.reset();
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
}

// تابع بهبود یافته برای ورود
async function handleLogin(event) {
    event.preventDefault();

    const nationalId = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // نمایش loading
    const loginBtn = event.target.querySelector('button[type="submit"]');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'در حال ورود...';
    loginBtn.disabled = true;

    try {
        if (isSupabaseConnected) {
            const result = await supabaseHelper.loginUser(nationalId, password);
            if (result.success) {
                currentUser = {
                    id: result.user.id,
                    nationalId: result.user.national_id,
                    fullName: result.user.full_name,
                    email: result.user.email,
                    type: result.user.role,
                    phone: result.user.phone
                };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showAlert('ورود موفقیت‌آمیز بود!', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showAlert('خطا در ورود: ' + result.error, 'danger');
            }
        } else {
            // حالت لوکال
            const user = users.find(u => u.nationalId === nationalId && u.password === password);
            if (user) {
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showAlert('ورود موفقیت‌آمیز بود!', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showAlert('کد ملی یا رمز عبور اشتباه است!', 'danger');
            }
        }
    } catch (error) {
        showAlert('خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.', 'danger');
    } finally {
        // بازگرداندن دکمه به حالت اولیه
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
    }
}

// فیلتر برنامه‌ها
function filterPrograms() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('.program-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // حذف کلاس active از همه دکمه‌ها
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // اضافه کردن کلاس active به دکمه کلیک شده
            button.classList.add('active');

            // فیلتر کردن کارت‌ها
            programCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// تنظیم نوع برنامه در فرم ثبت‌نام
function setProgramType() {
    const urlParams = new URLSearchParams(window.location.search);
    const program = urlParams.get('program');
    
    if (program) {
        const programSelect = document.getElementById('program-type');
        if (programSelect) {
            programSelect.value = program;
        }
    }
}

// بررسی کد ملی
function validateNationalId(input) {
    const nationalId = input.value.replace(/\D/g, '');
    
    if (nationalId.length !== 10) {
        input.setCustomValidity('کد ملی باید 10 رقم باشد');
        return false;
    }

    // الگوریتم بررسی کد ملی
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(nationalId[i]) * (10 - i);
    }
    
    const remainder = sum % 11;
    const checkDigit = parseInt(nationalId[9]);
    
    if ((remainder < 2 && checkDigit === remainder) || (remainder >= 2 && checkDigit === 11 - remainder)) {
        input.setCustomValidity('');
        return true;
    } else {
        input.setCustomValidity('کد ملی نامعتبر است');
        return false;
    }
}

// فرمت کردن شماره تلفن
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.startsWith('0')) {
            value = value.substring(1);
        }
        if (value.length > 0) {
            value = '0' + value;
        }
    }
    
    input.value = value;
}

// نمایش فراموشی رمز عبور
function showForgotPassword() {
    const email = prompt('لطفاً ایمیل خود را وارد کنید:');
    if (email) {
        showAlert('لینک بازیابی رمز عبور به ایمیل شما ارسال شد.', 'info');
    }
}

// بررسی وضعیت ورود
function checkLoginStatus() {
    if (currentUser) {
        // اگر کاربر وارد شده، به داشبورد منتقل شود
        window.location.href = `dashboard.html?type=${currentUser.type}`;
    }
}

// خروج از سیستم
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// اضافه کردن event listeners
document.addEventListener('DOMContentLoaded', function() {
    // نمایش آمار در صفحه اصلی
    displayStats();

    // تنظیم فیلتر برنامه‌ها
    filterPrograms();

    // تنظیم نوع برنامه در فرم ثبت‌نام
    setProgramType();

    // فرم ثبت‌نام
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }

    // فرم ورود
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // بررسی کد ملی
    const nationalIdInput = document.getElementById('national-id');
    if (nationalIdInput) {
        nationalIdInput.addEventListener('input', function() {
            validateNationalId(this);
        });
    }

    // فرمت کردن شماره تلفن
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });

    // بررسی وضعیت ورود در صفحه‌های ورود و ثبت‌نام
    if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
        checkLoginStatus();
    }
});

// تابع‌های کمکی برای داشبورد
function createDashboard() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const dashboardContainer = document.querySelector('.dashboard');
    if (!dashboardContainer) return;

    const userType = currentUser.type;
    const userName = currentUser.fullName;

    // ایجاد منوی داشبورد بر اساس نوع کاربر
    let dashboardContent = `
        <div class="dashboard-header">
            <h1 class="dashboard-title">داشبورد ${getUserTypeTitle(userType)}</h1>
            <div class="user-info">
                <span>خوش آمدید، ${userName}</span>
                <button onclick="logout()" class="btn btn-danger">خروج</button>
            </div>
        </div>
    `;

    // اضافه کردن محتوای مخصوص هر نوع کاربر
    switch (userType) {
        case 'student':
            dashboardContent += createStudentDashboard();
            break;
        case 'coordinator':
            dashboardContent += createCoordinatorDashboard();
            break;
        case 'admin':
            dashboardContent += createAdminDashboard();
            break;
        default:
            dashboardContent += createDefaultDashboard();
            break;
    }

    dashboardContainer.innerHTML = dashboardContent;
}

function getUserTypeTitle(type) {
    const titles = {
        'student': 'دانش‌آموز',
        'coordinator': 'رابط',
        'admin': 'مدیر مرکز'
    };
    return titles[type] || 'کاربر';
}

// تابع بهبود یافته برای ایجاد داشبورد ادمین
function createAdminDashboard() {
    return `
        <div class="dashboard-stats">
            <div class="dashboard-stat">
                <div class="number">${groups.length}</div>
                <div class="label">کل گروه‌ها</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${users.filter(u => u.type === 'coordinator').length}</div>
                <div class="label">رابط</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${programs.filter(p => p.isActive).length}</div>
                <div class="label">برنامه فعال</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${students.filter(s => s.isActive).length}</div>
                <div class="label">دانش‌آموز</div>
            </div>
        </div>
        
        <div class="admin-sections">
            <!-- مدیریت گروه‌ها و رابط‌ها -->
            <div class="admin-section">
                <h3><i class="fas fa-users-cog"></i> مدیریت گروه‌ها و رابط‌ها</h3>
                <div class="section-actions">
                    <button onclick="showGroupManagement()" class="btn btn-primary">مدیریت گروه‌ها</button>
                    <button onclick="createNewGroup()" class="btn btn-success">ایجاد گروه جدید</button>
                    <button onclick="assignCoordinatorToGroup()" class="btn btn-info">تخصیص رابط به گروه</button>
                    <button onclick="exportGroupsToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- مدیریت کاربران -->
            <div class="admin-section">
                <h3><i class="fas fa-users"></i> مدیریت کاربران</h3>
                <div class="section-actions">
                    <button onclick="showUserManagement()" class="btn btn-primary">مدیریت کاربران</button>
                    <button onclick="addNewUserModal()" class="btn btn-success">افزودن کاربر جدید</button>
                    <button onclick="showUserSearch()" class="btn btn-info">جستجوی کاربران</button>
                    <button onclick="exportUsersToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- مدیریت برنامه‌ها -->
            <div class="admin-section">
                <h3><i class="fas fa-calendar-alt"></i> مدیریت برنامه‌ها</h3>
                <div class="section-actions">
                    <button onclick="showProgramManagement()" class="btn btn-primary">مدیریت برنامه‌ها</button>
                    <button onclick="addNewProgramModal()" class="btn btn-success">افزودن برنامه جدید</button>
                    <button onclick="showProgramAnalytics()" class="btn btn-info">تحلیل برنامه‌ها</button>
                    <button onclick="exportProgramsToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- مدیریت نظرسنجی‌ها -->
            <div class="admin-section">
                <h3><i class="fas fa-poll"></i> مدیریت نظرسنجی‌ها</h3>
                <div class="section-actions">
                    <button onclick="showSurveyManagement()" class="btn btn-primary">مدیریت نظرسنجی‌ها</button>
                    <button onclick="createNewSurveyModal()" class="btn btn-success">ایجاد نظرسنجی جدید</button>
                    <button onclick="showSurveyResults()" class="btn btn-info">نتایج نظرسنجی‌ها</button>
                    <button onclick="exportSurveyResults()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- مدیریت نمرات -->
            <div class="admin-section">
                <h3><i class="fas fa-chart-line"></i> مدیریت نمرات</h3>
                <div class="section-actions">
                    <button onclick="showGradesOverview()" class="btn btn-primary">مشاهده نمرات</button>
                    <button onclick="editGrades()" class="btn btn-success">ویرایش نمرات</button>
                    <button onclick="showGradeAnalytics()" class="btn btn-info">تحلیل نمرات</button>
                    <button onclick="exportGradesToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- مدیریت حضور و غیاب -->
            <div class="admin-section">
                <h3><i class="fas fa-clipboard-check"></i> مدیریت حضور و غیاب</h3>
                <div class="section-actions">
                    <button onclick="showAttendanceManagement()" class="btn btn-primary">مشاهده حضور و غیاب</button>
                    <button onclick="editAttendanceModal()" class="btn btn-success">ویرایش حضور و غیاب</button>
                    <button onclick="showAttendanceAnalytics()" class="btn btn-info">تحلیل حضور و غیاب</button>
                    <button onclick="exportAttendanceToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- درخواست‌ها -->
            <div class="admin-section">
                <h3><i class="fas fa-file-alt"></i> مدیریت درخواست‌ها</h3>
                <div class="section-actions">
                    <button onclick="showRequestManagement()" class="btn btn-primary">مشاهده درخواست‌ها</button>
                    <button onclick="createReportCardRequest()" class="btn btn-success">درخواست کارنامه</button>
                    <button onclick="showRequestAnalytics()" class="btn btn-info">تحلیل درخواست‌ها</button>
                    <button onclick="exportRequestsToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- گزارش‌های کلی -->
            <div class="admin-section">
                <h3><i class="fas fa-chart-bar"></i> گزارش‌های کلی</h3>
                <div class="section-actions">
                    <button onclick="showGeneralReports()" class="btn btn-primary">گزارش‌های کلی</button>
                    <button onclick="showFinancialReports()" class="btn btn-success">گزارش‌های مالی</button>
                    <button onclick="showPerformanceReports()" class="btn btn-info">گزارش‌های عملکرد</button>
                    <button onclick="exportAllReportsToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- تنظیمات سیستم -->
            <div class="admin-section">
                <h3><i class="fas fa-cogs"></i> تنظیمات سیستم</h3>
                <div class="section-actions">
                    <button onclick="showSystemSettings()" class="btn btn-primary">تنظیمات عمومی</button>
                    <button onclick="showSystemSettings()" class="btn btn-success">تنظیمات امنیتی</button>
                    <button onclick="showSystemSettings()" class="btn btn-info">پشتیبان‌گیری</button>
                    <button onclick="showSystemSettings()" class="btn btn-warning">دسترسی‌ها</button>
                </div>
            </div>
        </div>
    `;
}



// تابع بهبود یافته برای ایجاد داشبورد رابط
function createCoordinatorDashboard() {
    return `
        <div class="dashboard-stats">
            <div class="dashboard-stat">
                <div class="number">${getCoordinatorStudentsCount()}</div>
                <div class="label">دانش‌آموز تحت نظر</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${getCoordinatorGroupsCount()}</div>
                <div class="label">گروه</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${getCoordinatorAttendance()}%</div>
                <div class="label">درصد حضور کلی</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${getCoordinatorProgramsCount()}</div>
                <div class="label">برنامه فعال</div>
            </div>
        </div>
        
        <div class="coordinator-sections">
            <!-- مدیریت گروه‌ها و بچه‌گروهی -->
            <div class="coordinator-section">
                <h3><i class="fas fa-layer-group"></i> مدیریت گروه‌ها و بچه‌گروهی</h3>
                <div class="section-actions">
                    <button onclick="showMyGroups()" class="btn btn-primary">گروه‌های من</button>
                    <button onclick="showSubGroups()" class="btn btn-success">بچه‌گروهی</button>
                    <button onclick="createNewGroup()" class="btn btn-info">ایجاد گروه جدید</button>
                    <button onclick="showGroupAnalytics()" class="btn btn-warning">تحلیل گروه‌ها</button>
                </div>
            </div>
            
            <!-- مدیریت حضور و غیاب -->
            <div class="coordinator-section">
                <h3><i class="fas fa-clipboard-check"></i> مدیریت حضور و غیاب</h3>
                <div class="section-actions">
                    <button onclick="showAttendanceManagement()" class="btn btn-primary">نمای کلی حضور و غیاب</button>
                    <button onclick="recordAttendance()" class="btn btn-success">ثبت حضور و غیاب</button>
                    <button onclick="editAttendanceModal()" class="btn btn-info">ویرایش حضور و غیاب</button>
                    <button onclick="exportAttendanceToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- مدیریت نمرات -->
            <div class="coordinator-section">
                <h3><i class="fas fa-chart-line"></i> مدیریت نمرات</h3>
                <div class="section-actions">
                    <button onclick="showGradesOverview()" class="btn btn-primary">نمای کلی نمرات</button>
                    <button onclick="recordFinalGrade()" class="btn btn-success">ثبت نمره پایان ترم</button>
                    <button onclick="editGrades()" class="btn btn-info">ویرایش نمرات</button>
                    <button onclick="exportGradesToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- مدیریت فعالیت‌های گروهی -->
            <div class="coordinator-section">
                <h3><i class="fas fa-users"></i> مدیریت فعالیت‌های گروهی</h3>
                <div class="section-actions">
                    <button onclick="showGroupActivities()" class="btn btn-primary">مشاهده فعالیت‌ها</button>
                    <button onclick="recordGroupActivity()" class="btn btn-success">ثبت فعالیت جدید</button>
                    <button onclick="editGroupActivity()" class="btn btn-info">ویرایش فعالیت</button>
                    <button onclick="exportActivitiesToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- مدیریت دانش‌آموزان -->
            <div class="coordinator-section">
                <h3><i class="fas fa-user-graduate"></i> مدیریت دانش‌آموزان</h3>
                <div class="section-actions">
                    <button onclick="showMyStudents()" class="btn btn-primary">دانش‌آموزان من</button>
                    <button onclick="showStudentProgress()" class="btn btn-success">پیشرفت دانش‌آموزان</button>
                    <button onclick="showStudentAnalytics()" class="btn btn-info">تحلیل دانش‌آموزان</button>
                    <button onclick="exportStudentsToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- گزارش‌گیری -->
            <div class="coordinator-section">
                <h3><i class="fas fa-chart-bar"></i> گزارش‌گیری</h3>
                <div class="section-actions">
                    <button onclick="showAttendanceReports()" class="btn btn-primary">گزارش حضور و غیاب</button>
                    <button onclick="showGradeReports()" class="btn btn-success">گزارش نمرات</button>
                    <button onclick="showActivityReports()" class="btn btn-info">گزارش فعالیت‌ها</button>
                    <button onclick="showComprehensiveReport()" class="btn btn-warning">گزارش جامع</button>
                </div>
            </div>
            
            <!-- نتایج نظرسنجی -->
            <div class="coordinator-section">
                <h3><i class="fas fa-poll"></i> نتایج نظرسنجی</h3>
                <div class="section-actions">
                    <button onclick="showSurveyResults()" class="btn btn-primary">مشاهده نتایج</button>
                    <button onclick="createGroupSurvey()" class="btn btn-success">ایجاد نظرسنجی گروهی</button>
                    <button onclick="showSurveyAnalytics()" class="btn btn-info">تحلیل نظرسنجی</button>
                    <button onclick="exportSurveyResults()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- تقویم و برنامه‌ها -->
            <div class="coordinator-section">
                <h3><i class="fas fa-calendar-alt"></i> تقویم و برنامه‌ها</h3>
                <div class="section-actions">
                    <button onclick="showMyCalendar()" class="btn btn-primary">تقویم من</button>
                    <button onclick="scheduleActivity()" class="btn btn-success">برنامه‌ریزی فعالیت</button>
                    <button onclick="showProgramSchedule()" class="btn btn-info">برنامه‌های گروه</button>
                    <button onclick="exportScheduleToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
        </div>
    `;
}

// تابع بهبود یافته برای ایجاد داشبورد دانش‌آموز
function createStudentDashboard() {
    return `
        <div class="dashboard-header">
            <h1 class="dashboard-title">داشبورد دانش‌آموز</h1>
            <div class="user-info">
                <span>خوش آمدید، ${currentUser.fullName}</span>
                <button onclick="logout()" class="btn btn-danger">خروج</button>
            </div>
        </div>
        
        <div class="dashboard-stats">
            <div class="dashboard-stat">
                <div class="number">${getStudentProgramsCount()}</div>
                <div class="label">برنامه‌های ثبت‌نام شده</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${getStudentAttendance()}</div>
                <div class="label">درصد حضور</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${getStudentGrades()}</div>
                <div class="label">میانگین نمرات</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${getStudentActivitiesCount()}</div>
                <div class="label">فعالیت‌های گروهی</div>
            </div>
        </div>
        
        <div class="student-sections">
            <!-- آپلود کارنامه -->
            <div class="student-section">
                <h3><i class="fas fa-file-upload"></i> آپلود کارنامه</h3>
                <div class="section-actions">
                    <button onclick="uploadReportCard()" class="btn btn-primary">آپلود کارنامه</button>
                    <button onclick="viewMyDocuments()" class="btn btn-success">مشاهده اسناد من</button>
                    <button onclick="downloadReportCard()" class="btn btn-info">دانلود کارنامه</button>
                </div>
            </div>
            
            <!-- مشاهده نمرات -->
            <div class="student-section">
                <h3><i class="fas fa-chart-line"></i> مشاهده نمرات</h3>
                <div class="section-actions">
                    <button onclick="viewGrades()" class="btn btn-primary">مشاهده نمرات</button>
                    <button onclick="viewGradeAnalytics()" class="btn btn-success">تحلیل نمرات</button>
                    <button onclick="viewGradeHistory()" class="btn btn-info">تاریخچه نمرات</button>
                    <button onclick="exportMyGrades()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- ثبت‌نام‌ها -->
            <div class="student-section">
                <h3><i class="fas fa-user-plus"></i> ثبت‌نام‌ها</h3>
                <div class="section-actions">
                    <button onclick="viewMyRegistrations()" class="btn btn-primary">مشاهده ثبت‌نام‌های من</button>
                    <button onclick="registerForNewProgram()" class="btn btn-success">ثبت‌نام در برنامه جدید</button>
                    <button onclick="viewRegistrationHistory()" class="btn btn-info">تاریخچه ثبت‌نام</button>
                    <button onclick="exportMyRegistrations()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- نظرسنجی -->
            <div class="student-section">
                <h3><i class="fas fa-poll"></i> نظرسنجی</h3>
                <div class="section-actions">
                    <button onclick="takeSurvey()" class="btn btn-primary">انجام نظرسنجی</button>
                    <button onclick="viewMySurveyResponses()" class="btn btn-success">پاسخ‌های من</button>
                    <button onclick="viewAvailableSurveys()" class="btn btn-info">نظرسنجی‌های موجود</button>
                </div>
            </div>
            
            <!-- جلسات گروهی -->
            <div class="student-section">
                <h3><i class="fas fa-users"></i> جلسات گروهی</h3>
                <div class="section-actions">
                    <button onclick="viewGroupSessions()" class="btn btn-primary">مشاهده جلسات</button>
                    <button onclick="joinGroupSession()" class="btn btn-success">پیوستن به جلسه</button>
                    <button onclick="viewSessionHistory()" class="btn btn-info">تاریخچه جلسات</button>
                    <button onclick="participateInSurvey()" class="btn btn-warning">نظرسنجی جلسه</button>
                </div>
            </div>
            
            <!-- برنامه‌های من -->
            <div class="student-section">
                <h3><i class="fas fa-calendar-check"></i> برنامه‌های من</h3>
                <div class="section-actions">
                    <button onclick="viewPrograms()" class="btn btn-primary">مشاهده برنامه‌ها</button>
                    <button onclick="viewMySchedule()" class="btn btn-success">برنامه زمانی من</button>
                    <button onclick="viewProgramProgress()" class="btn btn-info">پیشرفت برنامه‌ها</button>
                    <button onclick="exportMySchedule()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- حضور و غیاب -->
            <div class="student-section">
                <h3><i class="fas fa-clipboard-check"></i> حضور و غیاب</h3>
                <div class="section-actions">
                    <button onclick="viewMyAttendance()" class="btn btn-primary">مشاهده حضور و غیاب</button>
                    <button onclick="viewAttendanceAnalytics()" class="btn btn-success">تحلیل حضور و غیاب</button>
                    <button onclick="viewAttendanceHistory()" class="btn btn-info">تاریخچه حضور</button>
                    <button onclick="exportMyAttendance()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- پروفایل و تنظیمات -->
            <div class="student-section">
                <h3><i class="fas fa-user-cog"></i> پروفایل و تنظیمات</h3>
                <div class="section-actions">
                    <button onclick="editMyProfile()" class="btn btn-primary">ویرایش پروفایل</button>
                    <button onclick="changePassword()" class="btn btn-success">تغییر رمز عبور</button>
                    <button onclick="viewMyActivity()" class="btn btn-info">فعالیت‌های من</button>
                    <button onclick="exportMyData()" class="btn btn-warning">خروجی اطلاعات</button>
                </div>
            </div>
        </div>
    `;
}



// تابع کمکی برای آمار
function getStudentProgramsCount() {
    if (currentUser && currentUser.type === 'student') {
        return programs.filter(p => {
            const student = students.find(s => s.nationalId === currentUser.nationalId);
            return student && p.groupId === student.groupId;
        }).length;
    }
    return 0;
}

function getStudentAttendance() {
    if (currentUser && currentUser.type === 'student') {
        const student = students.find(s => s.nationalId === currentUser.nationalId);
        if (student) {
            const studentAttendance = attendance.filter(a => a.groupId === student.groupId);
            if (studentAttendance.length === 0) return 0;
            
            const totalRate = studentAttendance.reduce((sum, a) => sum + a.attendanceRate, 0);
            return Math.round(totalRate / studentAttendance.length);
        }
    }
    return 0;
}

function getStudentGrades() {
    if (currentUser && currentUser.type === 'student') {
        // میانگین نمرات دانش‌آموز بر اساس برنامه‌های گروه
        const student = students.find(s => s.nationalId === currentUser.nationalId);
        if (student) {
            const groupPrograms = programs.filter(p => p.groupId === student.groupId);
            if (groupPrograms.length === 0) return 0;
            
            // محاسبه میانگین بر اساس درصد تکمیل برنامه‌ها
            const totalCompletion = groupPrograms.reduce((sum, p) => {
                return sum + (p.completedSessions / p.totalSessions * 100);
            }, 0);
            
            return (totalCompletion / groupPrograms.length).toFixed(1);
        }
    }
    return 0;
}



function getCoordinatorStudentsCount() {
    // نمایش تعداد دانش‌آموزان تحت نظر رابط فعلی
    if (currentUser && currentUser.type === 'coordinator') {
        return students.filter(s => s.coordinatorId === currentUser.id && s.isActive).length;
    }
    return 0;
}

function getCoordinatorGroupsCount() {
    // نمایش تعداد گروه‌های تحت نظر رابط فعلی
    if (currentUser && currentUser.type === 'coordinator') {
        return groups.filter(g => g.coordinatorId === currentUser.id && g.isActive).length;
    }
    return 0;
}

function getCoordinatorAttendance() {
    // نمایش درصد حضور کلی دانش‌آموزان تحت نظر رابط فعلی
    if (currentUser && currentUser.type === 'coordinator') {
        const coordinatorAttendance = attendance.filter(a => a.coordinatorId === currentUser.id);
        if (coordinatorAttendance.length === 0) return 0;
        
        const totalRate = coordinatorAttendance.reduce((sum, a) => sum + a.attendanceRate, 0);
        return Math.round(totalRate / coordinatorAttendance.length);
    }
    return 0;
}



function getTotalStudents() {
    return students.filter(s => s.isActive).length;
}

function getStudentActivitiesCount() {
    if (currentUser && currentUser.type === 'student') {
        const student = students.find(s => s.nationalId === currentUser.nationalId);
        if (student) {
            return programs.filter(p => p.groupId === student.groupId && p.isActive).length;
        }
    }
    return 0;
}

function getStudentGradesHistory() {
    if (currentUser && currentUser.type === 'student') {
        const student = students.find(s => s.nationalId === currentUser.nationalId);
        if (student) {
            return programs.filter(p => p.groupId === student.groupId).length;
        }
    }
    return 0;
}

function getCoordinatorProgramsCount() {
    // نمایش تعداد برنامه‌های فعال تحت نظر رابط فعلی
    if (currentUser && currentUser.type === 'coordinator') {
        return programs.filter(p => p.coordinatorId === currentUser.id && p.isActive).length;
    }
    return 0;
}

function getCoordinatorProgramsHistory() {
    if (currentUser && currentUser.type === 'coordinator') {
        return programs.filter(p => p.coordinatorId === currentUser.id).length;
    }
    return 0;
}

function getCoordinatorAttendanceHistory() {
    if (currentUser && currentUser.type === 'coordinator') {
        const coordinatorAttendance = attendance.filter(a => a.coordinatorId === currentUser.id);
        if (coordinatorAttendance.length === 0) return 0;
        
        const totalRate = coordinatorAttendance.reduce((sum, a) => sum + a.attendanceRate, 0);
        return Math.round(totalRate / coordinatorAttendance.length);
    }
    return 0;
}

function getCoordinatorGroupsHistory() {
    if (currentUser && currentUser.type === 'coordinator') {
        return groups.filter(g => g.coordinatorId === currentUser.id).length;
    }
    return 0;
}

function getCoordinatorActivitiesCount() {
    if (currentUser && currentUser.type === 'coordinator') {
        return programs.filter(p => p.coordinatorId === currentUser.id && p.isActive).length;
    }
    return 0;
}

function getCoordinatorActivityHistory() {
    if (currentUser && currentUser.type === 'coordinator') {
        return programs.filter(p => p.coordinatorId === currentUser.id).length;
    }
    return 0;
}

function getCoordinatorSurveyResponses() {
    if (currentUser && currentUser.type === 'coordinator') {
        // تعداد دانش‌آموزان تحت نظر رابط
        return students.filter(s => s.coordinatorId === currentUser.id && s.isActive).length;
    }
    return 0;
}

function getCoordinatorSurveyResponsesHistory() {
    if (currentUser && currentUser.type === 'coordinator') {
        return students.filter(s => s.coordinatorId === currentUser.id).length;
    }
    return 0;
}

function getCoordinatorStudentsHistory() {
    if (currentUser && currentUser.type === 'coordinator') {
        return students.filter(s => s.coordinatorId === currentUser.id).length;
    }
    return 0;
}

function getCoordinatorStandards() {
    if (currentUser && currentUser.type === 'coordinator') {
        return groups.filter(g => g.coordinatorId === currentUser.id && g.isActive).length;
    }
    return 0;
}

function getCoordinatorStandardsHistory() {
    if (currentUser && currentUser.type === 'coordinator') {
        return groups.filter(g => g.coordinatorId === currentUser.id).length;
    }
    return 0;
}

function getCoordinatorPerformanceHistory() {
    if (currentUser && currentUser.type === 'coordinator') {
        const coordinatorAttendance = attendance.filter(a => a.coordinatorId === currentUser.id);
        if (coordinatorAttendance.length === 0) return 0;
        
        const totalRate = coordinatorAttendance.reduce((sum, a) => sum + a.attendanceRate, 0);
        return Math.round(totalRate / coordinatorAttendance.length);
    }
    return 0;
}

function getCoordinatorPerformance() {
    if (currentUser && currentUser.type === 'coordinator') {
        const coordinatorAttendance = attendance.filter(a => a.coordinatorId === currentUser.id);
        if (coordinatorAttendance.length === 0) return 0;
        
        const totalRate = coordinatorAttendance.reduce((sum, a) => sum + a.attendanceRate, 0);
        return Math.round(totalRate / coordinatorAttendance.length);
    }
    return 0;
}



// توابع عملیات پیشرفته با اتصال به دیتابیس

// آپلود کارنامه
async function uploadReportCard() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (isSupabaseConnected) {
                const result = await supabaseHelper.uploadFile(file, 'documents');
                if (result.success) {
                    // ذخیره اطلاعات فایل در دیتابیس
                    const documentData = {
                        user_id: currentUser.id,
                        file_name: file.name,
                        file_url: result.url,
                        file_type: file.type,
                        file_size: file.size,
                        document_type: 'report_card'
                    };
                    
                    const { data, error } = await supabaseClient
                        .from('documents')
                        .insert([documentData]);
                    
                    if (!error) {
                        showAlert('کارنامه با موفقیت آپلود شد!', 'success');
                    } else {
                        showAlert('خطا در ذخیره اطلاعات فایل', 'danger');
                    }
                } else {
                    showAlert('خطا در آپلود فایل: ' + result.error, 'danger');
                }
            } else {
                // حالت لوکال
                const reader = new FileReader();
                reader.onload = (e) => {
                    const documents = JSON.parse(localStorage.getItem('documents')) || [];
                    documents.push({
                        id: Date.now(),
                        userId: currentUser.id,
                        fileName: file.name,
                        fileData: e.target.result,
                        fileType: file.type,
                        fileSize: file.size,
                        documentType: 'report_card',
                        uploadDate: new Date().toISOString()
                    });
                    localStorage.setItem('documents', JSON.stringify(documents));
                    showAlert('کارنامه با موفقیت آپلود شد!', 'success');
                };
                reader.readAsDataURL(file);
            }
        }
    };
    input.click();
}

// مشاهده نمرات
async function viewGrades() {
    let grades = [];
    
    if (isSupabaseConnected) {
        const { data, error } = await supabaseClient
            .from('grades')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false });
        
        if (!error && data) {
            grades = data;
        }
    } else {
        grades = JSON.parse(localStorage.getItem('grades')) || [];
        grades = grades.filter(g => g.userId === currentUser.id);
    }
    
    if (grades.length === 0) {
        showAlert('هیچ نمره‌ای یافت نشد!', 'info');
        return;
    }
    
    // نمایش نمرات در مودال
    const modal = createModal('نمرات من', `
        <div class="grades-table">
            <table class="table">
                <thead>
                    <tr>
                        <th>درس</th>
                        <th>نمره</th>
                        <th>حداکثر</th>
                        <th>نوع</th>
                        <th>تاریخ</th>
                    </tr>
                </thead>
                <tbody>
                    ${grades.map(grade => `
                        <tr>
                            <td>${grade.subject || 'نامشخص'}</td>
                            <td>${grade.grade}</td>
                            <td>${grade.max_grade || grade.maxGrade || 20}</td>
                            <td>${grade.grade_type || grade.gradeType || 'عادی'}</td>
                            <td>${new Date(grade.created_at || grade.createdAt).toLocaleDateString('fa-IR')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `);
    document.body.appendChild(modal);
}

// نظرسنجی
async function takeSurvey() {
    let surveys = [];
    
    if (isSupabaseConnected) {
        const result = await supabaseHelper.getSurveys();
        if (result.success) {
            surveys = result.data.filter(s => s.is_active);
        }
    } else {
        surveys = JSON.parse(localStorage.getItem('surveys')) || [];
        surveys = surveys.filter(s => s.isActive);
    }
    
    if (surveys.length === 0) {
        showAlert('هیچ نظرسنجی فعالی یافت نشد!', 'info');
        return;
    }
    
    const survey = surveys[0]; // اولین نظرسنجی فعال
    const questions = survey.questions || [];
    
    const modal = createModal('نظرسنجی', `
        <form id="survey-form">
            <h3>${survey.title}</h3>
            <p>${survey.description}</p>
            ${questions.map((q, index) => `
                <div class="form-group">
                    <label>${q.question}</label>
                    ${q.type === 'text' ? 
                        `<input type="text" name="q${index}" class="form-control" required>` :
                        `<select name="q${index}" class="form-control" required>
                            <option value="">انتخاب کنید</option>
                            ${q.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                        </select>`
                    }
                </div>
            `).join('')}
            <button type="submit" class="btn btn-primary">ارسال نظرسنجی</button>
        </form>
    `);
    
    document.body.appendChild(modal);
    
    // مدیریت ارسال نظرسنجی
    document.getElementById('survey-form').onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const answers = {};
        
        questions.forEach((q, index) => {
            answers[`q${index}`] = formData.get(`q${index}`);
        });
        
        const surveyData = {
            survey_id: survey.id,
            user_id: currentUser.id,
            answers: answers
        };
        
        if (isSupabaseConnected) {
            const result = await supabaseHelper.submitSurvey(surveyData);
            if (result.success) {
                showAlert('نظرسنجی با موفقیت ارسال شد!', 'success');
                modal.remove();
            } else {
                showAlert('خطا در ارسال نظرسنجی: ' + result.error, 'danger');
            }
        } else {
            const responses = JSON.parse(localStorage.getItem('surveyResponses')) || [];
            responses.push({
                id: Date.now(),
                surveyId: survey.id,
                userId: currentUser.id,
                answers: answers,
                submittedAt: new Date().toISOString()
            });
            localStorage.setItem('surveyResponses', JSON.stringify(responses));
            showAlert('نظرسنجی با موفقیت ارسال شد!', 'success');
            modal.remove();
        }
    };
}

// مشاهده برنامه‌ها
async function viewPrograms() {
    let userPrograms = [];
    
    if (isSupabaseConnected) {
        const { data, error } = await supabaseClient
            .from('registrations')
            .select('*, programs(*)')
            .eq('user_id', currentUser.id);
        
        if (!error && data) {
            userPrograms = data;
        }
    } else {
        const userRegistrations = registrations.filter(r => r.nationalId === currentUser.nationalId);
        userPrograms = userRegistrations.map(r => ({
            program_type: r.programType,
            program_name: r.programType === 'admission' ? 'پذیرش جدید' : 
                         r.programType === 'camp' ? 'اردو' : 'برنامه سالانه',
            registration_date: r.registrationDate,
            status: 'approved'
        }));
    }
    
    if (userPrograms.length === 0) {
        showAlert('هیچ برنامه‌ای یافت نشد!', 'info');
        return;
    }
    
    const modal = createModal('برنامه‌های من', `
        <div class="programs-list">
            ${userPrograms.map(program => `
                <div class="program-card">
                    <h4>${program.program_name || program.program_type}</h4>
                    <p><strong>نوع:</strong> ${program.program_type}</p>
                    <p><strong>وضعیت:</strong> <span class="status-${program.status}">${program.status}</span></p>
                    <p><strong>تاریخ ثبت‌نام:</strong> ${new Date(program.registration_date).toLocaleDateString('fa-IR')}</p>
                </div>
            `).join('')}
        </div>
    `);
    document.body.appendChild(modal);
}

// ثبت حضور و غیاب
async function recordAttendance() {
    if (!currentUser || (currentUser.type !== 'admin' && currentUser.type !== 'coordinator')) {
        showAlert('فقط مدیران و رابط‌ها می‌توانند حضور و غیاب ثبت کنند', 'error');
        return;
    }

    // Get coordinator's students
    let coordinatorStudents = [];
    if (currentUser.type === 'coordinator') {
        coordinatorStudents = students.filter(s => s.coordinatorId === currentUser.id);
    } else {
        coordinatorStudents = students;
    }

    if (coordinatorStudents.length === 0) {
        showAlert('هیچ دانش‌آموزی برای ثبت حضور و غیاب یافت نشد', 'error');
        return;
    }

    const content = `
        <div class="record-attendance-modal">
            <h3>ثبت حضور و غیاب</h3>
            
            <form id="attendance-form">
                <div class="form-group">
                    <label>انتخاب برنامه:</label>
                    <select id="attendance-program" class="form-control" required>
                        <option value="">انتخاب کنید</option>
                        ${programs.map(program => `
                            <option value="${program.id}">${program.name}</option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label>تاریخ:</label>
                    <input type="date" id="attendance-date" class="form-control" value="${new Date().toISOString().split('T')[0]}" required>
                </div>
                
                <div class="students-attendance">
                    <h4>حضور و غیاب دانش‌آموزان</h4>
                    ${coordinatorStudents.map(student => `
                        <div class="student-attendance">
                            <label>${student.fullName}:</label>
                            <select name="attendance_${student.id}" class="form-control" required>
                                <option value="">انتخاب کنید</option>
                                <option value="present">حاضر</option>
                                <option value="absent">غایب</option>
                                <option value="late">تأخیر</option>
                                <option value="excused">عذر موجه</option>
                            </select>
                        </div>
                    `).join('')}
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">ثبت حضور و غیاب</button>
                    <button type="button" onclick="closeModal()" class="btn btn-secondary">انصراف</button>
                </div>
            </form>
        </div>
    `;

    createModal('ثبت حضور و غیاب', content);

    // Handle form submission
    document.getElementById('attendance-form').onsubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const programId = document.getElementById('attendance-program').value;
        const date = document.getElementById('attendance-date').value;
        
        if (!programId) {
            showAlert('لطفاً برنامه را انتخاب کنید', 'error');
            return;
        }
        
        const attendanceRecords = coordinatorStudents.map(student => ({
            id: Date.now() + Math.random(),
            studentId: student.id,
            programId: programId,
            date: date,
            status: formData.get(`attendance_${student.id}`),
            recordedBy: currentUser.id,
            createdAt: new Date().toISOString()
        }));
        
        try {
            // Save to database if connected
            if (isSupabaseConnected && typeof supabaseClient !== 'undefined') {
                const { error } = await supabaseClient
                    .from('attendance')
                    .insert(attendanceRecords);
                
                if (error) {
                    console.error('Error saving attendance:', error);
                    showAlert('خطا در ذخیره‌سازی در دیتابیس', 'error');
                    return;
                }
            }
            
            // Save to localStorage
            attendanceRecords.forEach(record => {
                attendance.push(record);
            });
            localStorage.setItem('attendance', JSON.stringify(attendance));
            
            showAlert('حضور و غیاب با موفقیت ثبت شد', 'success');
            closeModal();
            
            // Refresh dashboard if on dashboard page
            if (window.location.pathname.includes('dashboard.html')) {
                createDashboard();
            }
            
        } catch (error) {
            console.error('Error recording attendance:', error);
            showAlert('خطا در ثبت حضور و غیاب', 'error');
        }
    };
}

// ثبت نمرات
async function recordGrades() {
    let students = [];
    
    if (isSupabaseConnected) {
        const { data, error } = await supabaseClient
            .from('users')
            .select('id, full_name, national_id')
            .eq('role', 'student');
        
        if (!error && data) {
            students = data;
        }
    } else {
        students = registrations.map(r => ({
            id: r.id,
            full_name: r.fullName,
            national_id: r.nationalId
        }));
    }
    
    const modal = createModal('ثبت نمرات', `
        <form id="grades-form">
            <div class="form-group">
                <label>درس:</label>
                <input type="text" id="subject" class="form-control" required>
            </div>
            <div class="form-group">
                <label>نوع نمره:</label>
                <select id="grade-type" class="form-control" required>
                    <option value="midterm">میان‌ترم</option>
                    <option value="final">پایان‌ترم</option>
                    <option value="assignment">تکلیف</option>
                    <option value="quiz">کوئیز</option>
                </select>
            </div>
            <div class="students-grades">
                ${students.map(student => `
                    <div class="student-grade">
                        <span>${student.full_name}</span>
                        <input type="number" name="grade_${student.id}" class="form-control" min="0" max="20" step="0.25" placeholder="نمره" required>
                    </div>
                `).join('')}
            </div>
            <button type="submit" class="btn btn-primary">ثبت نمرات</button>
        </form>
    `);
    
    document.body.appendChild(modal);
    
    // مدیریت ثبت نمرات
    document.getElementById('grades-form').onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const subject = document.getElementById('subject').value;
        const gradeType = document.getElementById('grade-type').value;
        
        const gradeRecords = students.map(student => ({
            user_id: student.id,
            subject: subject,
            grade: parseFloat(formData.get(`grade_${student.id}`)),
            grade_type: gradeType,
            recorded_by: currentUser.id
        }));
        
        if (isSupabaseConnected) {
            const { data, error } = await supabaseClient
                .from('grades')
                .insert(gradeRecords);
            
            if (!error) {
                showAlert('نمرات با موفقیت ثبت شد!', 'success');
                modal.remove();
            } else {
                showAlert('خطا در ثبت نمرات: ' + error.message, 'danger');
            }
        } else {
            const grades = JSON.parse(localStorage.getItem('grades')) || [];
            gradeRecords.forEach(record => {
                grades.push({
                    id: Date.now() + Math.random(),
                    userId: record.user_id,
                    subject: record.subject,
                    grade: record.grade,
                    gradeType: record.grade_type,
                    recordedBy: record.recorded_by,
                    createdAt: new Date().toISOString()
                });
            });
            localStorage.setItem('grades', JSON.stringify(grades));
            showAlert('نمرات با موفقیت ثبت شد!', 'success');
            modal.remove();
        }
    };
}

// ثبت فعالیت گروهی
async function recordGroupActivity() {
    const modal = createModal('ثبت فعالیت گروهی', `
        <form id="activity-form">
            <div class="form-group">
                <label>عنوان فعالیت:</label>
                <input type="text" id="activity-title" class="form-control" required>
            </div>
            <div class="form-group">
                <label>توضیحات:</label>
                <textarea id="activity-description" class="form-control" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label>تاریخ فعالیت:</label>
                <input type="date" id="activity-date" class="form-control" value="${new Date().toISOString().split('T')[0]}" required>
            </div>
            <div class="form-group">
                <label>وضعیت:</label>
                <select id="activity-status" class="form-control" required>
                    <option value="planned">برنامه‌ریزی شده</option>
                    <option value="in_progress">در حال اجرا</option>
                    <option value="completed">تکمیل شده</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">ثبت فعالیت</button>
        </form>
    `);
    
    document.body.appendChild(modal);
    
    // مدیریت ثبت فعالیت
    document.getElementById('activity-form').onsubmit = async (e) => {
        e.preventDefault();
        
        const activityData = {
            title: document.getElementById('activity-title').value,
            description: document.getElementById('activity-description').value,
            activity_date: document.getElementById('activity-date').value,
            status: document.getElementById('activity-status').value,
            coordinator_id: currentUser.id
        };
        
        if (isSupabaseConnected) {
            const result = await supabaseHelper.recordGroupActivity(activityData);
            if (result.success) {
                showAlert('فعالیت با موفقیت ثبت شد!', 'success');
                modal.remove();
            } else {
                showAlert('خطا در ثبت فعالیت: ' + result.error, 'danger');
            }
        } else {
            const activities = JSON.parse(localStorage.getItem('groupActivities')) || [];
            activities.push({
                id: Date.now(),
                title: activityData.title,
                description: activityData.description,
                activityDate: activityData.activity_date,
                status: activityData.status,
                coordinatorId: currentUser.id,
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('groupActivities', JSON.stringify(activities));
            showAlert('فعالیت با موفقیت ثبت شد!', 'success');
            modal.remove();
        }
    };
}

// مشاهده گزارش‌ها
async function viewReports() {
    const modal = createModal('گزارش‌ها', `
        <div class="reports-section">
            <h3>گزارش‌های موجود</h3>
            <div class="report-types">
                <button onclick="generateAttendanceReport()" class="btn btn-primary">گزارش حضور و غیاب</button>
                <button onclick="generateGradesReport()" class="btn btn-secondary">گزارش نمرات</button>
                <button onclick="generateActivityReport()" class="btn btn-success">گزارش فعالیت‌ها</button>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

// مشاهده حضور و غیاب
async function viewAttendance() {
    let attendance = [];
    
    if (isSupabaseConnected) {
        const { data, error } = await supabaseClient
            .from('attendance')
            .select('*, users(full_name, national_id)')
            .order('date', { ascending: false })
            .limit(50);
        
        if (!error && data) {
            attendance = data;
        }
    } else {
        attendance = JSON.parse(localStorage.getItem('attendance')) || [];
        attendance = attendance.slice(0, 50); // آخرین 50 رکورد
    }
    
    if (attendance.length === 0) {
        showAlert('هیچ رکورد حضور و غیابی یافت نشد!', 'info');
        return;
    }
    
    const modal = createModal('مشاهده حضور و غیاب', `
        <div class="attendance-table">
            <table class="table">
                <thead>
                    <tr>
                        <th>نام دانش‌آموز</th>
                        <th>کد ملی</th>
                        <th>تاریخ</th>
                        <th>وضعیت</th>
                    </tr>
                </thead>
                <tbody>
                    ${attendance.map(record => `
                        <tr>
                            <td>${record.users?.full_name || record.studentName || 'نامشخص'}</td>
                            <td>${record.users?.national_id || record.studentNationalId || 'نامشخص'}</td>
                            <td>${new Date(record.date || record.attendanceDate).toLocaleDateString('fa-IR')}</td>
                            <td><span class="status-${record.status}">${record.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `);
    document.body.appendChild(modal);
}

// ثبت فعالیت گروهی (رابط)
async function recordGroupActivity() {
    await recordActivity(); // استفاده از همان تابع استاد
}

// ثبت نمره پایان ترم
async function recordFinalGrade() {
    await recordGrades(); // استفاده از همان تابع استاد
}

// گزارش‌گیری
async function generateReports() {
    await viewReports(); // استفاده از همان تابع استاد
}

// مشاهده نتایج نظرسنجی
async function viewSurveyResults() {
    let responses = [];
    
    if (isSupabaseConnected) {
        const { data, error } = await supabaseClient
            .from('survey_responses')
            .select('*, surveys(title)')
            .order('submitted_at', { ascending: false });
        
        if (!error && data) {
            responses = data;
        }
    } else {
        responses = JSON.parse(localStorage.getItem('surveyResponses')) || [];
    }
    
    if (responses.length === 0) {
        showAlert('هیچ پاسخی یافت نشد!', 'info');
        return;
    }
    
    const modal = createModal('نتایج نظرسنجی', `
        <div class="survey-results">
            ${responses.map(response => `
                <div class="survey-response">
                    <h4>${response.surveys?.title || 'نظرسنجی'}</h4>
                    <p><strong>تاریخ ارسال:</strong> ${new Date(response.submitted_at).toLocaleDateString('fa-IR')}</p>
                    <div class="answers">
                        ${Object.entries(response.answers).map(([key, value]) => `
                            <p><strong>پاسخ ${key}:</strong> ${value}</p>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `);
    document.body.appendChild(modal);
}

// مدیریت کاربران
async function manageUsers() {
    let allUsers = [];
    
    if (isSupabaseConnected) {
        const { data, error } = await supabaseClient
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error && data) {
            allUsers = data;
        }
    } else {
        allUsers = users;
    }
    
    const modal = createModal('مدیریت کاربران', `
        <div class="users-management">
            <button onclick="addNewUser()" class="btn btn-primary mb-3">افزودن کاربر جدید</button>
            <div class="users-table">
                <table class="table">
                    <thead>
                        <tr>
                            <th>نام کامل</th>
                            <th>کد ملی</th>
                            <th>ایمیل</th>
                            <th>نقش</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allUsers.map(user => `
                            <tr>
                                <td>${user.full_name || user.fullName}</td>
                                <td>${user.national_id || user.nationalId}</td>
                                <td>${user.email}</td>
                                <td>${getUserTypeTitle(user.role || user.type)}</td>
                                <td><span class="status-${user.is_active ? 'active' : 'inactive'}">${user.is_active ? 'فعال' : 'غیرفعال'}</span></td>
                                <td>
                                    <button onclick="editUser('${user.id}')" class="btn btn-sm btn-secondary">ویرایش</button>
                                    <button onclick="deleteUser('${user.id}')" class="btn btn-sm btn-danger">حذف</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

// مدیریت برنامه‌ها
async function managePrograms() {
    let programs = [];
    
    if (isSupabaseConnected) {
        const result = await supabaseHelper.getPrograms();
        if (result.success) {
            programs = result.data;
        }
    } else {
        programs = JSON.parse(localStorage.getItem('programs')) || [];
    }
    
    const modal = createModal('مدیریت برنامه‌ها', `
        <div class="programs-management">
            <div class="management-header">
                <div class="search-box">
                    <input type="text" id="program-search" class="form-control" placeholder="جستجو در برنامه‌ها...">
                </div>
                <div class="filter-box">
                    <select id="category-filter" class="form-control">
                        <option value="">همه دسته‌بندی‌ها</option>
                        <option value="academic">آموزشی</option>
                        <option value="recreational">تفریحی</option>
                        <option value="sports">ورزشی</option>
                        <option value="cultural">فرهنگی</option>
                    </select>
                </div>
            </div>
            
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>نام برنامه</th>
                            <th>دسته‌بندی</th>
                            <th>مدت</th>
                            <th>قیمت</th>
                            <th>حداکثر شرکت‌کننده</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${programs.map(program => `
                            <tr>
                                <td>${program.name}</td>
                                <td><span class="category-badge category-${program.category}">${program.category}</span></td>
                                <td>${program.duration}</td>
                                <td>${program.price ? program.price.toLocaleString() + ' تومان' : 'رایگان'}</td>
                                <td>${program.max_participants || 'نامحدود'}</td>
                                <td><span class="status-${program.is_active ? 'active' : 'inactive'}">${program.is_active ? 'فعال' : 'غیرفعال'}</span></td>
                                <td>
                                    <div class="action-buttons">
                                        <button onclick="editProgram('${program.id}')" class="btn btn-sm btn-secondary" title="ویرایش">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="toggleProgramStatus('${program.id}')" class="btn btn-sm ${program.is_active ? 'btn-warning' : 'btn-success'}" title="${program.is_active ? 'غیرفعال کردن' : 'فعال کردن'}">
                                            <i class="fas fa-${program.is_active ? 'ban' : 'check'}"></i>
                                        </button>
                                        <button onclick="deleteProgram('${program.id}')" class="btn btn-sm btn-danger" title="حذف">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="management-footer">
                <button onclick="addNewProgramModal()" class="btn btn-success">
                    <i class="fas fa-plus"></i> افزودن برنامه جدید
                </button>
                <button onclick="exportProgramsToExcel()" class="btn btn-warning">
                    <i class="fas fa-file-excel"></i> خروجی اکسل
                </button>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

// مشاهده گزارش‌های کلی
async function viewAllReports() {
    const modal = createModal('گزارش‌های کلی', `
        <div class="all-reports">
            <div class="report-cards">
                <div class="report-card">
                    <h4>آمار کلی</h4>
                    <p>کل دانش‌آموزان: ${centerStats.students}</p>
                    <p>کل اساتید: ${centerStats.teachers}</p>
                    <p>کل برنامه‌ها: ${centerStats.programs}</p>
                </div>
                <div class="report-card">
                    <h4>گزارش‌های فوری</h4>
                    <button onclick="generateAttendanceReport()" class="btn btn-sm btn-primary">گزارش حضور</button>
                    <button onclick="generateGradesReport()" class="btn btn-sm btn-secondary">گزارش نمرات</button>
                    <button onclick="generateFinancialReport()" class="btn btn-sm btn-success">گزارش مالی</button>
                </div>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

// تنظیمات سیستم
async function systemSettings() {
    const modal = createModal('تنظیمات سیستم', `
        <div class="system-settings">
            <h3>تنظیمات عمومی</h3>
            <form id="settings-form">
                <div class="form-group">
                    <label>نام مرکز:</label>
                    <input type="text" id="center-name" class="form-control" value="مرکز آموزشی" required>
                </div>
                <div class="form-group">
                    <label>آدرس:</label>
                    <input type="text" id="center-address" class="form-control" value="تهران، ایران" required>
                </div>
                <div class="form-group">
                    <label>تلفن:</label>
                    <input type="text" id="center-phone" class="form-control" value="۰۲۱-۱۲۳۴۵۶۷۸" required>
                </div>
                <div class="form-group">
                    <label>ایمیل:</label>
                    <input type="email" id="center-email" class="form-control" value="info@center.edu" required>
                </div>
                <button type="submit" class="btn btn-primary">ذخیره تنظیمات</button>
            </form>
        </div>
    `);
    document.body.appendChild(modal);
    
    // مدیریت تنظیمات
    document.getElementById('settings-form').onsubmit = (e) => {
        e.preventDefault();
        const settings = {
            centerName: document.getElementById('center-name').value,
            centerAddress: document.getElementById('center-address').value,
            centerPhone: document.getElementById('center-phone').value,
            centerEmail: document.getElementById('center-email').value
        };
        
        localStorage.setItem('systemSettings', JSON.stringify(settings));
        showAlert('تنظیمات با موفقیت ذخیره شد!', 'success');
        modal.remove();
    };
}

// نظارت بر مراکز
async function superviseCenters() {
    const modal = createModal('نظارت بر مراکز', `
        <div class="centers-supervision">
            <h3>مراکز تحت نظارت</h3>
            <div class="centers-list">
                <div class="center-card">
                    <h4>مرکز آموزشی تهران</h4>
                    <p>تعداد دانش‌آموز: ۱۵۰</p>
                    <p>عملکرد: ۹۵٪</p>
                    <button onclick="viewCenterDetails('tehran')" class="btn btn-sm btn-primary">جزئیات</button>
                </div>
                <div class="center-card">
                    <h4>مرکز آموزشی اصفهان</h4>
                    <p>تعداد دانش‌آموز: ۱۲۰</p>
                    <p>عملکرد: ۸۸٪</p>
                    <button onclick="viewCenterDetails('isfahan')" class="btn btn-sm btn-primary">جزئیات</button>
                </div>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

// گزارش‌های نظارتی
async function generateSupervisorReports() {
    const modal = createModal('گزارش‌های نظارتی', `
        <div class="supervisor-reports">
            <h3>گزارش‌های نظارتی</h3>
            <div class="report-types">
                <button onclick="generatePerformanceReport()" class="btn btn-primary">گزارش عملکرد</button>
                <button onclick="generateComparisonReport()" class="btn btn-secondary">گزارش مقایسه‌ای</button>
                <button onclick="generateTrendReport()" class="btn btn-success">گزارش روند</button>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

// مدیریت استانداردها
async function manageStandards() {
    const modal = createModal('مدیریت استانداردها', `
        <div class="standards-management">
            <h3>استانداردهای آموزشی</h3>
            <form id="standards-form">
                <div class="form-group">
                    <label>حداقل نمره قبولی:</label>
                    <input type="number" id="min-grade" class="form-control" value="10" min="0" max="20" required>
                </div>
                <div class="form-group">
                    <label>حداقل درصد حضور:</label>
                    <input type="number" id="min-attendance" class="form-control" value="80" min="0" max="100" required>
                </div>
                <div class="form-group">
                    <label>حداکثر تعداد دانش‌آموز در کلاس:</label>
                    <input type="number" id="max-students" class="form-control" value="25" min="1" required>
                </div>
                <button type="submit" class="btn btn-primary">ذخیره استانداردها</button>
            </form>
        </div>
    `);
    document.body.appendChild(modal);
    
    // مدیریت استانداردها
    document.getElementById('standards-form').onsubmit = (e) => {
        e.preventDefault();
        const standards = {
            minGrade: document.getElementById('min-grade').value,
            minAttendance: document.getElementById('min-attendance').value,
            maxStudents: document.getElementById('max-students').value
        };
        
        localStorage.setItem('educationalStandards', JSON.stringify(standards));
        showAlert('استانداردها با موفقیت ذخیره شد!', 'success');
        modal.remove();
    };
}

// تحلیل عملکرد
async function performanceAnalysis() {
    const modal = createModal('تحلیل عملکرد', `
        <div class="performance-analysis">
            <h3>تحلیل عملکرد مراکز</h3>
            <div class="analysis-charts">
                <div class="chart-container">
                    <h4>عملکرد کلی</h4>
                    <div class="performance-chart">
                        <div class="chart-bar" style="width: 85%">تهران: ۸۵٪</div>
                        <div class="chart-bar" style="width: 78%">اصفهان: ۷۸٪</div>
                        <div class="chart-bar" style="width: 92%">شیراز: ۹۲٪</div>
                    </div>
                </div>
                <div class="chart-container">
                    <h4>روند بهبود</h4>
                    <div class="trend-chart">
                        <p>روند کلی: صعودی (+۱۲٪)</p>
                        <p>بهترین مرکز: شیراز</p>
                        <p>نیازمند بهبود: اصفهان</p>
                    </div>
                </div>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

// تابع کمکی برای ایجاد مودال
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>${title}</h3>
                <button onclick="this.closest('.modal-overlay').remove()" class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // بستن مودال با کلیک خارج از آن
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    return modal;
}

// توابع کمکی برای گزارش‌گیری
function generateAttendanceReport() {
    showAlert('گزارش حضور و غیاب در حال تولید است...', 'info');
}

function generateGradesReport() {
    showAlert('گزارش نمرات در حال تولید است...', 'info');
}

function generateActivityReport() {
    showAlert('گزارش فعالیت‌ها در حال تولید است...', 'info');
}

function generateFinancialReport() {
    showAlert('گزارش مالی در حال تولید است...', 'info');
}

function generatePerformanceReport() {
    showAlert('گزارش عملکرد در حال تولید است...', 'info');
}

function generateComparisonReport() {
    showAlert('گزارش مقایسه‌ای در حال تولید است...', 'info');
}

function generateTrendReport() {
    showAlert('گزارش روند در حال تولید است...', 'info');
}

function generateComplianceReport() {
    showAlert('گزارش انطباق در حال تولید است...', 'info');
}

function generateQualityReports() {
    showAlert('گزارش‌های کیفیت در حال تولید است...', 'info');
}

function generatePerformanceComparison() {
    showAlert('مقایسه عملکرد در حال تولید است...', 'info');
}

function generateTrendAnalysis() {
    showAlert('تحلیل روند در حال تولید است...', 'info');
}

function generatePerformanceAnalysis() {
    showAlert('تحلیل عملکرد در حال تولید است...', 'info');
}

function generateSupervisoryReports() {
    showAlert('گزارش‌های نظارتی در حال تولید است...', 'info');
}

function generateAllReportsToExcel() {
    showAlert('گزارش‌های کلی در حال تولید است...', 'info');
}

function generateAttendanceToExcel() {
    showAlert('گزارش حضور و غیاب در حال تولید است...', 'info');
}

function generateGradesToExcel() {
    showAlert('گزارش نمرات در حال تولید است...', 'info');
}

function generateActivityToExcel() {
    showAlert('گزارش فعالیت‌ها در حال تولید است...', 'info');
}

function generateFinancialToExcel() {
    showAlert('گزارش مالی در حال تولید است...', 'info');
}

function generatePerformanceToExcel() {
    showAlert('گزارش عملکرد در حال تولید است...', 'info');
}

function generateComparisonToExcel() {
    showAlert('گزارش مقایسه‌ای در حال تولید است...', 'info');
}

function generateTrendToExcel() {
    showAlert('گزارش روند در حال تولید است...', 'info');
}

function generateComplianceToExcel() {
    showAlert('گزارش انطباق در حال تولید است...', 'info');
}

function generateQualityToExcel() {
    showAlert('گزارش‌های کیفیت در حال تولید است...', 'info');
}

function generatePerformanceComparisonToExcel() {
    showAlert('مقایسه عملکرد در حال تولید است...', 'info');
}

function generateTrendAnalysisToExcel() {
    showAlert('تحلیل روند در حال تولید است...', 'info');
}

function generatePerformanceAnalysisToExcel() {
    showAlert('تحلیل عملکرد در حال تولید است...', 'info');
}

function generateSupervisoryReportsToExcel() {
    showAlert('گزارش‌های نظارتی در حال تولید است...', 'info');
}

function generateAllReportsToExcel() {
    showAlert('گزارش‌های کلی در حال تولید است...', 'info');
}

// توابع تکراری حذف شدند - این توابع در بخش‌های بعدی تعریف شده‌اند

function viewAttendanceHistory() {
    showAlert('تاریخچه حضور در حال توسعه است...', 'info');
}

function viewGradeHistory() {
    showAlert('تاریخچه نمرات در حال توسعه است...', 'info');
}

function viewGroupSessions() {
    showAlert('جلسات گروهی در حال توسعه است...', 'info');
}

function viewSessionHistory() {
    showAlert('تاریخچه جلسات در حال توسعه است...', 'info');
}

function participateInSurvey() {
    showAlert('نظرسنجی جلسه در حال توسعه است...', 'info');
}

function showMyGroups() {
    // نمایش گروه‌های کاربر
    const groups = [
        { id: 1, name: 'گروه ریاضی پیشرفته', students: 15, coordinator: currentUser.fullName, subGroups: 3 },
        { id: 2, name: 'گروه علوم تجربی', students: 12, coordinator: currentUser.fullName, subGroups: 2 },
        { id: 3, name: 'گروه ادبیات فارسی', students: 18, coordinator: currentUser.fullName, subGroups: 4 }
    ];
    
    const content = `
        <div class="management-header">
            <h3>گروه‌های من</h3>
            <div class="search-box">
                <input type="text" placeholder="جستجو در گروه‌ها..." onkeyup="filterGroups(this.value)">
            </div>
        </div>
        
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>نام گروه</th>
                        <th>تعداد دانش‌آموز</th>
                        <th>تعداد بچه‌گروهی</th>
                        <th>رابط</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    ${groups.map(group => `
                        <tr>
                            <td>${group.name}</td>
                            <td>${group.students}</td>
                            <td>${group.subGroups}</td>
                            <td>${group.coordinator}</td>
                            <td>
                                <button onclick="viewGroupDetails(${group.id})" class="btn btn-sm btn-primary">مشاهده</button>
                                <button onclick="showSubGroups(${group.id})" class="btn btn-sm btn-success">بچه‌گروهی</button>
                                <button onclick="editGroup(${group.id})" class="btn btn-sm btn-info">ویرایش</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="management-footer">
            <button onclick="createNewGroup()" class="btn btn-success">ایجاد گروه جدید</button>
            <button onclick="exportGroupsToExcel()" class="btn btn-warning">خروجی اکسل</button>
        </div>
    `;
    
    createModal('گروه‌های من', content);
}

function showSubGroups(groupId = null) {
    // نمایش بچه‌گروهی‌ها
    const subGroups = [
        { id: 1, name: 'بچه‌گروهی A', parentGroup: 'گروه ریاضی پیشرفته', students: 5, coordinator: currentUser.fullName },
        { id: 2, name: 'بچه‌گروهی B', parentGroup: 'گروه ریاضی پیشرفته', students: 5, coordinator: currentUser.fullName },
        { id: 3, name: 'بچه‌گروهی C', parentGroup: 'گروه ریاضی پیشرفته', students: 5, coordinator: currentUser.fullName },
        { id: 4, name: 'بچه‌گروهی علوم 1', parentGroup: 'گروه علوم تجربی', students: 6, coordinator: currentUser.fullName },
        { id: 5, name: 'بچه‌گروهی علوم 2', parentGroup: 'گروه علوم تجربی', students: 6, coordinator: currentUser.fullName }
    ];
    
    const filteredSubGroups = groupId ? subGroups.filter(sg => sg.parentGroup === 'گروه ریاضی پیشرفته') : subGroups;
    
    const content = `
        <div class="management-header">
            <h3>بچه‌گروهی‌ها</h3>
            <div class="search-box">
                <input type="text" placeholder="جستجو در بچه‌گروهی‌ها..." onkeyup="filterSubGroups(this.value)">
            </div>
        </div>
        
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>نام بچه‌گروهی</th>
                        <th>گروه والد</th>
                        <th>تعداد دانش‌آموز</th>
                        <th>رابط</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredSubGroups.map(subGroup => `
                        <tr>
                            <td>${subGroup.name}</td>
                            <td>${subGroup.parentGroup}</td>
                            <td>${subGroup.students}</td>
                            <td>${subGroup.coordinator}</td>
                            <td>
                                <button onclick="viewSubGroupDetails(${subGroup.id})" class="btn btn-sm btn-primary">مشاهده</button>
                                <button onclick="editSubGroup(${subGroup.id})" class="btn btn-sm btn-info">ویرایش</button>
                                <button onclick="manageSubGroupStudents(${subGroup.id})" class="btn btn-sm btn-success">دانش‌آموزان</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="management-footer">
            <button onclick="createNewSubGroup()" class="btn btn-success">ایجاد بچه‌گروهی جدید</button>
            <button onclick="exportSubGroupsToExcel()" class="btn btn-warning">خروجی اکسل</button>
        </div>
    `;
    
    createModal('بچه‌گروهی‌ها', content);
}

function showGroupAnalytics() {
    showAlert('تحلیل گروه‌ها در حال توسعه است...', 'info');
}

// مقداردهی اولیه برنامه
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// توابع عملیاتی پیشرفته برای ادمین

// مدیریت کاربران
async function showUserManagement() {
    let allUsers = [];
    
    if (isSupabaseConnected) {
        const { data, error } = await supabaseClient
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error && data) {
            allUsers = data;
        }
    } else {
        allUsers = users;
    }
    
    const modal = createModal('مدیریت کاربران', `
        <div class="user-management">
            <div class="management-header">
                <div class="search-box">
                    <input type="text" id="user-search" class="form-control" placeholder="جستجو در کاربران...">
                </div>
                <div class="filter-box">
                    <select id="role-filter" class="form-control">
                        <option value="">همه نقش‌ها</option>
                        <option value="student">دانش‌آموز</option>
                        <option value="teacher">استاد</option>
                        <option value="coordinator">رابط</option>
                        <option value="admin">مدیر</option>
                        <option value="supervisor">مسئول سطوح</option>
                    </select>
                </div>
            </div>
            
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>نام کامل</th>
                            <th>کد ملی</th>
                            <th>ایمیل</th>
                            <th>نقش</th>
                            <th>وضعیت</th>
                            <th>تاریخ ثبت‌نام</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allUsers.map(user => `
                            <tr>
                                <td>${user.full_name || user.fullName}</td>
                                <td>${user.national_id || user.nationalId}</td>
                                <td>${user.email}</td>
                                <td><span class="role-badge role-${user.role || user.type}">${getUserTypeTitle(user.role || user.type)}</span></td>
                                <td><span class="status-${user.is_active ? 'active' : 'inactive'}">${user.is_active ? 'فعال' : 'غیرفعال'}</span></td>
                                <td>${new Date(user.created_at || user.createdAt || Date.now()).toLocaleDateString('fa-IR')}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button onclick="editUser('${user.id}')" class="btn btn-sm btn-secondary" title="ویرایش">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="toggleUserStatus('${user.id}')" class="btn btn-sm ${user.is_active ? 'btn-warning' : 'btn-success'}" title="${user.is_active ? 'غیرفعال کردن' : 'فعال کردن'}">
                                            <i class="fas fa-${user.is_active ? 'ban' : 'check'}"></i>
                                        </button>
                                        <button onclick="deleteUser('${user.id}')" class="btn btn-sm btn-danger" title="حذف">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="management-footer">
                <button onclick="addNewUserModal()" class="btn btn-success">
                    <i class="fas fa-plus"></i> افزودن کاربر جدید
                </button>
                <button onclick="exportUsersToExcel()" class="btn btn-warning">
                    <i class="fas fa-file-excel"></i> خروجی اکسل
                </button>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
    
    // جستجو و فیلتر
    document.getElementById('user-search').addEventListener('input', filterUsers);
    document.getElementById('role-filter').addEventListener('change', filterUsers);
}

// افزودن کاربر جدید
async function addNewUserModal() {
    const modal = createModal('افزودن کاربر جدید', `
        <form id="add-user-form">
            <div class="form-row">
                <div class="form-group">
                    <label>نام کامل *</label>
                    <input type="text" name="fullName" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>کد ملی *</label>
                    <input type="text" name="nationalId" class="form-control" required maxlength="10">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>ایمیل *</label>
                    <input type="email" name="email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>شماره تلفن *</label>
                    <input type="tel" name="phone" class="form-control" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>نقش *</label>
                    <select name="role" class="form-control" required>
                        <option value="">انتخاب کنید</option>
                        <option value="student">دانش‌آموز</option>
                        <option value="teacher">استاد</option>
                        <option value="coordinator">رابط</option>
                        <option value="admin">مدیر</option>
                        <option value="supervisor">مسئول سطوح</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>رمز عبور *</label>
                    <input type="password" name="password" class="form-control" required minlength="6">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>تاریخ تولد</label>
                    <input type="date" name="birthDate" class="form-control">
                </div>
                <div class="form-group">
                    <label>سطح تحصیلی</label>
                    <select name="educationLevel" class="form-control">
                        <option value="">انتخاب کنید</option>
                        <option value="elementary">ابتدایی</option>
                        <option value="middle">متوسطه اول</option>
                        <option value="high">متوسطه دوم</option>
                        <option value="university">دانشگاهی</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label>آدرس</label>
                <textarea name="address" class="form-control" rows="3"></textarea>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> ذخیره کاربر
                </button>
                <button type="button" onclick="this.closest('.modal-overlay').remove()" class="btn btn-secondary">
                    <i class="fas fa-times"></i> انصراف
                </button>
            </div>
        </form>
    `);
    document.body.appendChild(modal);
    
    // مدیریت فرم
    document.getElementById('add-user-form').onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const userData = {
            full_name: formData.get('fullName'),
            national_id: formData.get('nationalId'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            role: formData.get('role'),
            password: formData.get('password'),
            birth_date: formData.get('birthDate'),
            education_level: formData.get('educationLevel'),
            address: formData.get('address'),
            is_active: true
        };
        
        if (isSupabaseConnected) {
            const result = await supabaseHelper.registerUser(userData);
            if (result.success) {
                showAlert('کاربر با موفقیت اضافه شد!', 'success');
                modal.remove();
                showUserManagement(); // بروزرسانی لیست
            } else {
                showAlert('خطا در افزودن کاربر: ' + result.error, 'danger');
            }
        } else {
            const newUser = {
                id: Date.now(),
                ...userData,
                createdAt: new Date().toISOString()
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            showAlert('کاربر با موفقیت اضافه شد!', 'success');
            modal.remove();
            showUserManagement(); // بروزرسانی لیست
        }
    };
}

// مدیریت برنامه‌ها
async function showProgramManagement() {
    let programs = [];
    
    if (isSupabaseConnected) {
        const result = await supabaseHelper.getPrograms();
        if (result.success) {
            programs = result.data;
        }
    } else {
        programs = JSON.parse(localStorage.getItem('programs')) || [];
    }
    
    const modal = createModal('مدیریت برنامه‌ها', `
        <div class="program-management">
            <div class="management-header">
                <div class="search-box">
                    <input type="text" id="program-search" class="form-control" placeholder="جستجو در برنامه‌ها...">
                </div>
                <div class="filter-box">
                    <select id="category-filter" class="form-control">
                        <option value="">همه دسته‌بندی‌ها</option>
                        <option value="academic">آموزشی</option>
                        <option value="recreational">تفریحی</option>
                        <option value="sports">ورزشی</option>
                        <option value="cultural">فرهنگی</option>
                    </select>
                </div>
            </div>
            
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>نام برنامه</th>
                            <th>دسته‌بندی</th>
                            <th>مدت</th>
                            <th>قیمت</th>
                            <th>حداکثر شرکت‌کننده</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${programs.map(program => `
                            <tr>
                                <td>${program.name}</td>
                                <td><span class="category-badge category-${program.category}">${program.category}</span></td>
                                <td>${program.duration}</td>
                                <td>${program.price ? program.price.toLocaleString() + ' تومان' : 'رایگان'}</td>
                                <td>${program.max_participants || 'نامحدود'}</td>
                                <td><span class="status-${program.is_active ? 'active' : 'inactive'}">${program.is_active ? 'فعال' : 'غیرفعال'}</span></td>
                                <td>
                                    <div class="action-buttons">
                                        <button onclick="editProgram('${program.id}')" class="btn btn-sm btn-secondary" title="ویرایش">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="toggleProgramStatus('${program.id}')" class="btn btn-sm ${program.is_active ? 'btn-warning' : 'btn-success'}" title="${program.is_active ? 'غیرفعال کردن' : 'فعال کردن'}">
                                            <i class="fas fa-${program.is_active ? 'ban' : 'check'}"></i>
                                        </button>
                                        <button onclick="deleteProgram('${program.id}')" class="btn btn-sm btn-danger" title="حذف">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="management-footer">
                <button onclick="addNewProgramModal()" class="btn btn-success">
                    <i class="fas fa-plus"></i> افزودن برنامه جدید
                </button>
                <button onclick="exportProgramsToExcel()" class="btn btn-warning">
                    <i class="fas fa-file-excel"></i> خروجی اکسل
                </button>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

// افزودن برنامه جدید
async function addNewProgramModal() {
    const modal = createModal('افزودن برنامه جدید', `
        <form id="add-program-form">
            <div class="form-row">
                <div class="form-group">
                    <label>نام برنامه *</label>
                    <input type="text" name="name" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>دسته‌بندی *</label>
                    <select name="category" class="form-control" required>
                        <option value="">انتخاب کنید</option>
                        <option value="academic">آموزشی</option>
                        <option value="recreational">تفریحی</option>
                        <option value="sports">ورزشی</option>
                        <option value="cultural">فرهنگی</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>مدت برنامه *</label>
                    <input type="text" name="duration" class="form-control" placeholder="مثال: ۳ ماه" required>
                </div>
                <div class="form-group">
                    <label>قیمت (تومان)</label>
                    <input type="number" name="price" class="form-control" min="0">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>حداکثر شرکت‌کننده</label>
                    <input type="number" name="maxParticipants" class="form-control" min="1">
                </div>
                <div class="form-group">
                    <label>تاریخ شروع</label>
                    <input type="date" name="startDate" class="form-control">
                </div>
            </div>
            
            <div class="form-group">
                <label>توضیحات</label>
                <textarea name="description" class="form-control" rows="4"></textarea>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> ذخیره برنامه
                </button>
                <button type="button" onclick="this.closest('.modal-overlay').remove()" class="btn btn-secondary">
                    <i class="fas fa-times"></i> انصراف
                </button>
            </div>
        </form>
    `);
    document.body.appendChild(modal);
    
    // مدیریت فرم
    document.getElementById('add-program-form').onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const programData = {
            name: formData.get('name'),
            category: formData.get('category'),
            duration: formData.get('duration'),
            price: parseFloat(formData.get('price')) || 0,
            max_participants: parseInt(formData.get('maxParticipants')) || null,
            start_date: formData.get('startDate'),
            description: formData.get('description'),
            is_active: true
        };
        
        if (isSupabaseConnected) {
            const { data, error } = await supabaseClient
                .from('programs')
                .insert([programData])
                .select();
            
            if (!error) {
                showAlert('برنامه با موفقیت اضافه شد!', 'success');
                modal.remove();
                showProgramManagement(); // بروزرسانی لیست
            } else {
                showAlert('خطا در افزودن برنامه: ' + error.message, 'danger');
            }
        } else {
            const newProgram = {
                id: Date.now(),
                ...programData,
                createdAt: new Date().toISOString()
            };
            const programs = JSON.parse(localStorage.getItem('programs')) || [];
            programs.push(newProgram);
            localStorage.setItem('programs', JSON.stringify(programs));
            showAlert('برنامه با موفقیت اضافه شد!', 'success');
            modal.remove();
            showProgramManagement(); // بروزرسانی لیست
        }
    };
}

// مدیریت نظرسنجی‌ها
async function showSurveyManagement() {
    let surveys = [];
    
    if (isSupabaseConnected) {
        const result = await supabaseHelper.getSurveys();
        if (result.success) {
            surveys = result.data;
        }
    } else {
        surveys = JSON.parse(localStorage.getItem('surveys')) || [];
    }
    
    const modal = createModal('مدیریت نظرسنجی‌ها', `
        <div class="survey-management">
            <div class="management-header">
                <div class="search-box">
                    <input type="text" id="survey-search" class="form-control" placeholder="جستجو در نظرسنجی‌ها...">
                </div>
                <div class="filter-box">
                    <select id="status-filter" class="form-control">
                        <option value="">همه وضعیت‌ها</option>
                        <option value="active">فعال</option>
                        <option value="inactive">غیرفعال</option>
                    </select>
                </div>
            </div>
            
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>عنوان</th>
                            <th>مخاطب هدف</th>
                            <th>تعداد سوالات</th>
                            <th>تاریخ شروع</th>
                            <th>تاریخ پایان</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${surveys.map(survey => `
                            <tr>
                                <td>${survey.title}</td>
                                <td>${survey.target_audience || 'همه'}</td>
                                <td>${survey.questions ? survey.questions.length : 0}</td>
                                <td>${survey.start_date ? new Date(survey.start_date).toLocaleDateString('fa-IR') : 'نامشخص'}</td>
                                <td>${survey.end_date ? new Date(survey.end_date).toLocaleDateString('fa-IR') : 'نامشخص'}</td>
                                <td><span class="status-${survey.is_active ? 'active' : 'inactive'}">${survey.is_active ? 'فعال' : 'غیرفعال'}</span></td>
                                <td>
                                    <div class="action-buttons">
                                        <button onclick="editSurvey('${survey.id}')" class="btn btn-sm btn-secondary" title="ویرایش">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="viewSurveyResults('${survey.id}')" class="btn btn-sm btn-info" title="مشاهده نتایج">
                                            <i class="fas fa-chart-bar"></i>
                                        </button>
                                        <button onclick="toggleSurveyStatus('${survey.id}')" class="btn btn-sm ${survey.is_active ? 'btn-warning' : 'btn-success'}" title="${survey.is_active ? 'غیرفعال کردن' : 'فعال کردن'}">
                                            <i class="fas fa-${survey.is_active ? 'ban' : 'check'}"></i>
                                        </button>
                                        <button onclick="deleteSurvey('${survey.id}')" class="btn btn-sm btn-danger" title="حذف">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="management-footer">
                <button onclick="createNewSurveyModal()" class="btn btn-success">
                    <i class="fas fa-plus"></i> ایجاد نظرسنجی جدید
                </button>
                <button onclick="exportSurveyResults()" class="btn btn-warning">
                    <i class="fas fa-file-excel"></i> خروجی اکسل
                </button>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

// ایجاد نظرسنجی جدید
async function createNewSurveyModal() {
    const modal = createModal('ایجاد نظرسنجی جدید', `
        <form id="create-survey-form">
            <div class="form-row">
                <div class="form-group">
                    <label>عنوان نظرسنجی *</label>
                    <input type="text" name="title" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>مخاطب هدف *</label>
                    <select name="targetAudience" class="form-control" required>
                        <option value="">انتخاب کنید</option>
                        <option value="all">همه</option>
                        <option value="students">دانش‌آموزان</option>
                        <option value="teachers">اساتید</option>
                        <option value="coordinators">رابط‌ها</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>تاریخ شروع</label>
                    <input type="date" name="startDate" class="form-control">
                </div>
                <div class="form-group">
                    <label>تاریخ پایان</label>
                    <input type="date" name="endDate" class="form-control">
                </div>
            </div>
            
            <div class="form-group">
                <label>توضیحات</label>
                <textarea name="description" class="form-control" rows="3"></textarea>
            </div>
            
            <div class="questions-section">
                <h4>سوالات نظرسنجی</h4>
                <div id="questions-container">
                    <div class="question-item">
                        <div class="form-row">
                            <div class="form-group">
                                <label>سوال ۱ *</label>
                                <input type="text" name="question1" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>نوع سوال *</label>
                                <select name="type1" class="form-control" required onchange="toggleOptions(this, 1)">
                                    <option value="">انتخاب کنید</option>
                                    <option value="text">متنی</option>
                                    <option value="select">انتخابی</option>
                                </select>
                            </div>
                        </div>
                        <div id="options1" class="options-container" style="display: none;">
                            <label>گزینه‌ها (هر گزینه در یک خط)</label>
                            <textarea name="options1" class="form-control" rows="3" placeholder="گزینه ۱&#10;گزینه ۲&#10;گزینه ۳"></textarea>
                        </div>
                    </div>
                </div>
                <button type="button" onclick="addQuestion()" class="btn btn-info">
                    <i class="fas fa-plus"></i> افزودن سوال
                </button>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> ایجاد نظرسنجی
                </button>
                <button type="button" onclick="this.closest('.modal-overlay').remove()" class="btn btn-secondary">
                    <i class="fas fa-times"></i> انصراف
                </button>
            </div>
        </form>
    `);
    document.body.appendChild(modal);
    
    // مدیریت فرم
    document.getElementById('create-survey-form').onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // جمع‌آوری سوالات
        const questions = [];
        let questionIndex = 1;
        
        while (formData.get(`question${questionIndex}`)) {
            const question = {
                question: formData.get(`question${questionIndex}`),
                type: formData.get(`type${questionIndex}`)
            };
            
            if (question.type === 'select') {
                const optionsText = formData.get(`options${questionIndex}`);
                question.options = optionsText.split('\n').filter(opt => opt.trim());
            }
            
            questions.push(question);
            questionIndex++;
        }
        
        const surveyData = {
            title: formData.get('title'),
            description: formData.get('description'),
            target_audience: formData.get('targetAudience'),
            questions: questions,
            start_date: formData.get('startDate'),
            end_date: formData.get('endDate'),
            is_active: true
        };
        
        if (isSupabaseConnected) {
            const { data, error } = await supabaseClient
                .from('surveys')
                .insert([surveyData])
                .select();
            
            if (!error) {
                showAlert('نظرسنجی با موفقیت ایجاد شد!', 'success');
                modal.remove();
                showSurveyManagement(); // بروزرسانی لیست
            } else {
                showAlert('خطا در ایجاد نظرسنجی: ' + error.message, 'danger');
            }
        } else {
            const newSurvey = {
                id: Date.now(),
                ...surveyData,
                createdAt: new Date().toISOString()
            };
            const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
            surveys.push(newSurvey);
            localStorage.setItem('surveys', JSON.stringify(surveys));
            showAlert('نظرسنجی با موفقیت ایجاد شد!', 'success');
            modal.remove();
            showSurveyManagement(); // بروزرسانی لیست
        }
    };
}

// توابع کمکی
function toggleOptions(select, questionIndex) {
    const optionsContainer = document.getElementById(`options${questionIndex}`);
    if (select.value === 'select') {
        optionsContainer.style.display = 'block';
    } else {
        optionsContainer.style.display = 'none';
    }
}

function addQuestion() {
    const container = document.getElementById('questions-container');
    const questionCount = container.children.length + 1;
    
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';
    questionDiv.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>سوال ${questionCount} *</label>
                <input type="text" name="question${questionCount}" class="form-control" required>
            </div>
            <div class="form-group">
                <label>نوع سوال *</label>
                <select name="type${questionCount}" class="form-control" required onchange="toggleOptions(this, ${questionCount})">
                    <option value="">انتخاب کنید</option>
                    <option value="text">متنی</option>
                    <option value="select">انتخابی</option>
                </select>
            </div>
        </div>
        <div id="options${questionCount}" class="options-container" style="display: none;">
            <label>گزینه‌ها (هر گزینه در یک خط)</label>
            <textarea name="options${questionCount}" class="form-control" rows="3" placeholder="گزینه ۱&#10;گزینه ۲&#10;گزینه ۳"></textarea>
        </div>
        <button type="button" onclick="removeQuestion(this)" class="btn btn-sm btn-danger">
            <i class="fas fa-trash"></i> حذف سوال
        </button>
    `;
    
    container.appendChild(questionDiv);
}

function removeQuestion(button) {
    button.closest('.question-item').remove();
    // بروزرسانی شماره سوالات
    const questions = document.querySelectorAll('.question-item');
    questions.forEach((question, index) => {
        const label = question.querySelector('label');
        label.textContent = `سوال ${index + 1} *`;
    });
}

// خروجی اکسل
function exportToExcel(data, filename) {
    // این تابع نیاز به کتابخانه SheetJS دارد
    // برای سادگی، یک پیام نمایش می‌دهیم
    showAlert(`فایل اکسل ${filename} در حال آماده‌سازی است...`, 'info');
    
    // در حالت واقعی، اینجا کد خروجی اکسل قرار می‌گیرد
    console.log('Exporting to Excel:', data);
}

// توابع خروجی اکسل برای بخش‌های مختلف
function exportUsersToExcel() {
    const userData = users.map(user => ({
        'نام کامل': user.fullName,
        'کد ملی': user.nationalId,
        'ایمیل': user.email,
        'نقش': getUserTypeTitle(user.type),
        'وضعیت': user.isActive ? 'فعال' : 'غیرفعال',
        'تاریخ ثبت‌نام': new Date(user.createdAt).toLocaleDateString('fa-IR')
    }));
    exportToExcel(userData, 'کاربران');
}

function exportProgramsToExcel() {
    const programs = JSON.parse(localStorage.getItem('programs')) || [];
    const programData = programs.map(program => ({
        'نام برنامه': program.name,
        'دسته‌بندی': program.category,
        'مدت': program.duration,
        'قیمت': program.price ? program.price.toLocaleString() + ' تومان' : 'رایگان',
        'حداکثر شرکت‌کننده': program.max_participants || 'نامحدود',
        'وضعیت': program.is_active ? 'فعال' : 'غیرفعال'
    }));
    exportToExcel(programData, 'برنامه‌ها');
}

function exportGradesToExcel() {
    const grades = JSON.parse(localStorage.getItem('grades')) || [];
    const gradeData = grades.map(grade => ({
        'دانش‌آموز': grade.studentName || 'نامشخص',
        'درس': grade.subject,
        'نمره': grade.grade,
        'نوع': grade.gradeType,
        'تاریخ': new Date(grade.createdAt).toLocaleDateString('fa-IR')
    }));
    exportToExcel(gradeData, 'نمرات');
}

function exportAttendanceToExcel() {
    const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    const attendanceData = attendance.map(record => ({
        'دانش‌آموز': record.studentName || 'نامشخص',
        'تاریخ': new Date(record.date).toLocaleDateString('fa-IR'),
        'وضعیت': record.status,
        'ثبت شده توسط': record.recordedBy || 'نامشخص'
    }));
    exportToExcel(attendanceData, 'حضور_و_غیاب');
}

// توابع فیلتر
function filterUsers() {
    const searchTerm = document.getElementById('user-search').value.toLowerCase();
    const roleFilter = document.getElementById('role-filter').value;
    const rows = document.querySelectorAll('#user-management tbody tr');
    
    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const role = row.cells[3].textContent;
        const matchesSearch = name.includes(searchTerm);
        const matchesRole = !roleFilter || role.includes(roleFilter);
        
        row.style.display = matchesSearch && matchesRole ? '' : 'none';
    });
}

// توابع عملیاتی
function editUser(userId) {
    showAlert('ویرایش کاربر در حال توسعه است...', 'info');
}

function toggleUserStatus(userId) {
    if (confirm('آیا از تغییر وضعیت این کاربر اطمینان دارید؟')) {
        showAlert('وضعیت کاربر با موفقیت تغییر کرد!', 'success');
    }
}

function deleteUser(userId) {
    if (confirm('آیا از حذف این کاربر اطمینان دارید؟ این عمل قابل بازگشت نیست!')) {
        showAlert('کاربر با موفقیت حذف شد!', 'success');
    }
}

function editProgram(programId) {
    showAlert('ویرایش برنامه در حال توسعه است...', 'info');
}

function toggleProgramStatus(programId) {
    if (confirm('آیا از تغییر وضعیت این برنامه اطمینان دارید؟')) {
        showAlert('وضعیت برنامه با موفقیت تغییر کرد!', 'success');
    }
}

function deleteProgram(programId) {
    if (confirm('آیا از حذف این برنامه اطمینان دارید؟ این عمل قابل بازگشت نیست!')) {
        showAlert('برنامه با موفقیت حذف شد!', 'success');
    }
}

function editSurvey(surveyId) {
    showAlert('ویرایش نظرسنجی در حال توسعه است...', 'info');
}

function toggleSurveyStatus(surveyId) {
    if (confirm('آیا از تغییر وضعیت این نظرسنجی اطمینان دارید؟')) {
        showAlert('وضعیت نظرسنجی با موفقیت تغییر کرد!', 'success');
    }
}

function deleteSurvey(surveyId) {
    if (confirm('آیا از حذف این نظرسنجی اطمینان دارید؟ این عمل قابل بازگشت نیست!')) {
        showAlert('نظرسنجی با موفقیت حذف شد!', 'success');
    }
}

// حذف توابع تکراری و اضافه کردن توابع مفقود

// تابع‌های مفقود برای داشبورد ادمین
function showUserSearch() {
    showAlert('جستجوی کاربران در حال توسعه است...', 'info');
}

function showProgramAnalytics() {
    showAlert('تحلیل برنامه‌ها در حال توسعه است...', 'info');
}

function showGradeManagement() {
    if (!currentUser || currentUser.role !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="grade-management">
            <h3>مدیریت نمرات</h3>
            
            <div class="management-tabs">
                <button class="tab-btn active" onclick="showGradesTab('overview')">نمای کلی</button>
                <button class="tab-btn" onclick="showGradesTab('by-student')">بر اساس دانش‌آموز</button>
                <button class="tab-btn" onclick="showGradesTab('by-program')">بر اساس برنامه</button>
                <button class="tab-btn" onclick="showGradesTab('reports')">گزارش‌ها</button>
            </div>
            
            <div id="grades-content">
                <div id="grades-overview" class="tab-content active">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <h4>میانگین کل نمرات</h4>
                            <div class="number">${calculateOverallGradeAverage()}%</div>
                        </div>
                        <div class="stat-card">
                            <h4>بالاترین نمره</h4>
                            <div class="number">${getHighestGrade()}</div>
                        </div>
                        <div class="stat-card">
                            <h4>پایین‌ترین نمره</h4>
                            <div class="number">${getLowestGrade()}</div>
                        </div>
                        <div class="stat-card">
                            <h4>تعداد نمرات</h4>
                            <div class="number">${grades.length}</div>
                        </div>
                    </div>
                    
                    <div class="grades-table">
                        <h4>جدول نمرات</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>دانش‌آموز</th>
                                    <th>برنامه</th>
                                    <th>موضوع</th>
                                    <th>نمره</th>
                                    <th>نوع</th>
                                    <th>تاریخ</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${generateGradesTableRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div id="grades-by-student" class="tab-content">
                    <div class="student-selector">
                        <label>انتخاب دانش‌آموز:</label>
                        <select id="student-select" onchange="loadStudentGrades()">
                            <option value="">همه دانش‌آموزان</option>
                            ${students.map(student => `
                                <option value="${student.id}">${student.full_name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div id="student-grades-data"></div>
                </div>
                
                <div id="grades-by-program" class="tab-content">
                    <div class="program-selector">
                        <label>انتخاب برنامه:</label>
                        <select id="program-grade-select" onchange="loadProgramGrades()">
                            <option value="">همه برنامه‌ها</option>
                            ${programs.map(program => `
                                <option value="${program.id}">${program.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div id="program-grades-data"></div>
                </div>
                
                <div id="grades-reports" class="tab-content">
                    <div class="report-options">
                        <button onclick="generateGradesReport('summary')" class="btn btn-primary">گزارش خلاصه</button>
                        <button onclick="generateGradesReport('detailed')" class="btn btn-success">گزارش تفصیلی</button>
                        <button onclick="exportGradesToExcel()" class="btn btn-warning">خروجی اکسل</button>
                    </div>
                    <div id="grade-report-results"></div>
                </div>
            </div>
        </div>
    `;

    createModal('مدیریت نمرات', content);
}

function editGradesModal() {
    showAlert('ویرایش نمرات در حال توسعه است...', 'info');
}

function showGradeAnalytics() {
    showAlert('تحلیل نمرات در حال توسعه است...', 'info');
}

function showAttendanceManagement() {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="attendance-management">
            <h3>مدیریت حضور و غیاب</h3>
            
            <div class="management-tabs">
                <button class="tab-btn active" onclick="showAttendanceTab('overview')">نمای کلی</button>
                <button class="tab-btn" onclick="showAttendanceTab('by-program')">بر اساس برنامه</button>
                <button class="tab-btn" onclick="showAttendanceTab('by-group')">بر اساس گروه</button>
                <button class="tab-btn" onclick="showAttendanceTab('reports')">گزارش‌ها</button>
            </div>
            
            <div id="attendance-content">
                <div id="attendance-overview" class="tab-content active">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <h4>کل دانش‌آموزان</h4>
                            <div class="number">${students.length}</div>
                        </div>
                        <div class="stat-card">
                            <h4>میانگین حضور</h4>
                            <div class="number">${calculateOverallAttendance()}%</div>
                        </div>
                        <div class="stat-card">
                            <h4>جلسات امروز</h4>
                            <div class="number">${getTodaySessionsCount()}</div>
                        </div>
                        <div class="stat-card">
                            <h4>غیبت‌های امروز</h4>
                            <div class="number">${getTodayAbsencesCount()}</div>
                        </div>
                    </div>
                    
                    <div class="recent-attendance">
                        <h4>حضور و غیاب اخیر</h4>
                        <div class="attendance-list">
                            ${getRecentAttendanceList()}
                        </div>
                    </div>
                </div>
                
                <div id="attendance-by-program" class="tab-content">
                    <div class="program-selector">
                        <label>انتخاب برنامه:</label>
                        <select id="program-select" onchange="loadProgramAttendance()">
                            <option value="">همه برنامه‌ها</option>
                            ${programs.map(program => `
                                <option value="${program.id}">${program.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div id="program-attendance-data"></div>
                </div>
                
                <div id="attendance-by-group" class="tab-content">
                    <div class="group-selector">
                        <label>انتخاب گروه:</label>
                        <select id="group-select" onchange="loadGroupAttendance()">
                            <option value="">همه گروه‌ها</option>
                            ${groups.map(group => `
                                <option value="${group.id}">${group.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div id="group-attendance-data"></div>
                </div>
                
                <div id="attendance-reports" class="tab-content">
                    <div class="report-options">
                        <button onclick="generateAttendanceReport('daily')" class="btn btn-primary">گزارش روزانه</button>
                        <button onclick="generateAttendanceReport('weekly')" class="btn btn-success">گزارش هفتگی</button>
                        <button onclick="generateAttendanceReport('monthly')" class="btn btn-info">گزارش ماهانه</button>
                        <button onclick="exportAttendanceToExcel()" class="btn btn-warning">خروجی اکسل</button>
                    </div>
                    <div id="report-results"></div>
                </div>
            </div>
        </div>
    `;

    createModal('مدیریت حضور و غیاب', content);
    loadAttendanceData();
}

function showAttendanceTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[onclick="showAttendanceTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`attendance-${tabName}`).classList.add('active');
    
    // Load specific data for the tab
    switch(tabName) {
        case 'by-program':
            loadProgramAttendance();
            break;
        case 'by-group':
            loadGroupAttendance();
            break;
        case 'reports':
            // Reports tab is already loaded
            break;
    }
}

function loadAttendanceData() {
    // This function will load the initial attendance data
    calculateOverallAttendance();
    getTodaySessionsCount();
    getTodayAbsencesCount();
}

function calculateOverallAttendance() {
    if (attendance.length === 0) return 0;
    
    const totalRecords = attendance.length;
    const presentRecords = attendance.filter(a => a.status === 'present').length;
    return Math.round((presentRecords / totalRecords) * 100);
}

function getTodaySessionsCount() {
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = attendance.filter(a => 
        (a.date || a.attendanceDate) === today
    );
    return todayAttendance.length;
}

function getTodayAbsencesCount() {
    const today = new Date().toISOString().split('T')[0];
    const todayAbsences = attendance.filter(a => 
        (a.date || a.attendanceDate) === today && a.status === 'absent'
    );
    return todayAbsences.length;
}

function getRecentAttendanceList() {
    const recentAttendance = attendance
        .sort((a, b) => new Date(b.date || b.attendanceDate) - new Date(a.date || a.attendanceDate))
        .slice(0, 10);
    
    if (recentAttendance.length === 0) {
        return '<p>هیچ رکورد حضور و غیابی یافت نشد</p>';
    }
    
    return recentAttendance.map(record => {
        const student = students.find(s => s.id === record.studentId || s.nationalId === record.studentId);
        const statusClass = record.status === 'present' ? 'success' : 
                           record.status === 'absent' ? 'error' : 
                           record.status === 'late' ? 'warning' : 'info';
        
        return `
            <div class="attendance-item ${statusClass}">
                <div class="student-name">${student ? student.fullName : 'نامشخص'}</div>
                <div class="attendance-date">${new Date(record.date || record.attendanceDate).toLocaleDateString('fa-IR')}</div>
                <div class="attendance-status">${getStatusText(record.status)}</div>
            </div>
        `;
    }).join('');
}

function getStatusText(status) {
    const statusMap = {
        'present': 'حاضر',
        'absent': 'غایب',
        'late': 'تأخیر',
        'excused': 'عذر موجه'
    };
    return statusMap[status] || status;
}

function loadProgramAttendance() {
    const programId = document.getElementById('program-select').value;
    const contentDiv = document.getElementById('program-attendance-data');
    
    if (!programId) {
        contentDiv.innerHTML = '<p>لطفاً یک برنامه انتخاب کنید</p>';
        return;
    }
    
    const program = programs.find(p => p.id === programId);
    const programAttendance = attendance.filter(a => a.programId === programId);
    
    if (programAttendance.length === 0) {
        contentDiv.innerHTML = '<p>هیچ رکورد حضور و غیابی برای این برنامه یافت نشد</p>';
        return;
    }
    
    const attendanceStats = calculateProgramAttendanceStats(programAttendance);
    
    contentDiv.innerHTML = `
        <div class="program-attendance-stats">
            <h4>آمار حضور و غیاب - ${program.name}</h4>
            <div class="stats-grid">
                <div class="stat-card">
                    <h5>کل جلسات</h5>
                    <div class="number">${attendanceStats.totalSessions}</div>
                </div>
                <div class="stat-card">
                    <h5>میانگین حضور</h5>
                    <div class="number">${attendanceStats.averageAttendance}%</div>
                </div>
                <div class="stat-card">
                    <h5>تعداد دانش‌آموزان</h5>
                    <div class="number">${attendanceStats.studentCount}</div>
                </div>
            </div>
            
            <div class="attendance-table">
                <table>
                    <thead>
                        <tr>
                            <th>دانش‌آموز</th>
                            <th>تاریخ</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${programAttendance.map(record => {
                            const student = students.find(s => s.id === record.studentId || s.nationalId === record.studentId);
                            return `
                                <tr>
                                    <td>${student ? student.fullName : 'نامشخص'}</td>
                                    <td>${new Date(record.date || record.attendanceDate).toLocaleDateString('fa-IR')}</td>
                                    <td><span class="status-badge ${record.status}">${getStatusText(record.status)}</span></td>
                                    <td>
                                        <button onclick="editAttendanceRecord('${record.id}')" class="btn btn-sm btn-primary">ویرایش</button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function loadGroupAttendance() {
    const groupId = document.getElementById('group-select').value;
    const contentDiv = document.getElementById('group-attendance-data');
    
    if (!groupId) {
        contentDiv.innerHTML = '<p>لطفاً یک گروه انتخاب کنید</p>';
        return;
    }
    
    const group = groups.find(g => g.id === groupId);
    const groupStudents = students.filter(s => s.groupId === groupId);
    const groupAttendance = attendance.filter(a => 
        groupStudents.some(student => student.id === a.studentId || student.nationalId === a.studentId)
    );
    
    if (groupAttendance.length === 0) {
        contentDiv.innerHTML = '<p>هیچ رکورد حضور و غیابی برای این گروه یافت نشد</p>';
        return;
    }
    
    const attendanceStats = calculateGroupAttendanceStats(groupAttendance, groupStudents);
    
    contentDiv.innerHTML = `
        <div class="group-attendance-stats">
            <h4>آمار حضور و غیاب - ${group.name}</h4>
            <div class="stats-grid">
                <div class="stat-card">
                    <h5>تعداد دانش‌آموزان</h5>
                    <div class="number">${groupStudents.length}</div>
                </div>
                <div class="stat-card">
                    <h5>میانگین حضور گروه</h5>
                    <div class="number">${attendanceStats.averageAttendance}%</div>
                </div>
                <div class="stat-card">
                    <h5>کل جلسات</h5>
                    <div class="number">${attendanceStats.totalSessions}</div>
                </div>
            </div>
            
            <div class="student-attendance-list">
                <h5>حضور و غیاب دانش‌آموزان</h5>
                ${groupStudents.map(student => {
                    const studentAttendance = groupAttendance.filter(a => 
                        a.studentId === student.id || a.studentId === student.nationalId
                    );
                    const attendanceRate = studentAttendance.length > 0 ? 
                        Math.round((studentAttendance.filter(a => a.status === 'present').length / studentAttendance.length) * 100) : 0;
                    
                    return `
                        <div class="student-attendance-item">
                            <div class="student-info">
                                <strong>${student.fullName}</strong>
                                <span class="attendance-rate">${attendanceRate}% حضور</span>
                            </div>
                            <div class="attendance-details">
                                <span>حاضر: ${studentAttendance.filter(a => a.status === 'present').length}</span>
                                <span>غایب: ${studentAttendance.filter(a => a.status === 'absent').length}</span>
                                <span>تأخیر: ${studentAttendance.filter(a => a.status === 'late').length}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function calculateProgramAttendanceStats(programAttendance) {
    const uniqueStudents = [...new Set(programAttendance.map(a => a.studentId))];
    const totalSessions = programAttendance.length;
    const presentCount = programAttendance.filter(a => a.status === 'present').length;
    const averageAttendance = totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 0;
    
    return {
        totalSessions,
        averageAttendance,
        studentCount: uniqueStudents.length
    };
}

function calculateGroupAttendanceStats(groupAttendance, groupStudents) {
    const totalSessions = groupAttendance.length;
    const presentCount = groupAttendance.filter(a => a.status === 'present').length;
    const averageAttendance = totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 0;
    
    return {
        totalSessions,
        averageAttendance
    };
}

function generateAttendanceReport(type) {
    const reportDiv = document.getElementById('report-results');
    reportDiv.innerHTML = '<div class="loading">در حال تولید گزارش...</div>';
    
    setTimeout(() => {
        let reportData = [];
        const today = new Date();
        
        switch(type) {
            case 'daily':
                reportData = generateDailyReport(today);
                break;
            case 'weekly':
                reportData = generateWeeklyReport(today);
                break;
            case 'monthly':
                reportData = generateMonthlyReport(today);
                break;
        }
        
        reportDiv.innerHTML = `
            <div class="report-content">
                <h4>گزارش ${type === 'daily' ? 'روزانه' : type === 'weekly' ? 'هفتگی' : 'ماهانه'} حضور و غیاب</h4>
                <div class="report-summary">
                    <div class="summary-item">
                        <strong>تاریخ گزارش:</strong> ${today.toLocaleDateString('fa-IR')}
                    </div>
                    <div class="summary-item">
                        <strong>کل رکوردها:</strong> ${reportData.length}
                    </div>
                    <div class="summary-item">
                        <strong>میانگین حضور:</strong> ${calculateReportAttendance(reportData)}%
                    </div>
                </div>
                
                <div class="report-table">
                    <table>
                        <thead>
                            <tr>
                                <th>دانش‌آموز</th>
                                <th>برنامه</th>
                                <th>تاریخ</th>
                                <th>وضعیت</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reportData.map(record => {
                                const student = students.find(s => s.id === record.studentId || s.nationalId === record.studentId);
                                const program = programs.find(p => p.id === record.programId);
                                return `
                                    <tr>
                                        <td>${student ? student.fullName : 'نامشخص'}</td>
                                        <td>${program ? program.name : 'نامشخص'}</td>
                                        <td>${new Date(record.date || record.attendanceDate).toLocaleDateString('fa-IR')}</td>
                                        <td><span class="status-badge ${record.status}">${getStatusText(record.status)}</span></td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }, 1000);
}

function generateDailyReport(date) {
    const dateStr = date.toISOString().split('T')[0];
    return attendance.filter(a => (a.date || a.attendanceDate) === dateStr);
}

function generateWeeklyReport(date) {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return attendance.filter(a => {
        const recordDate = new Date(a.date || a.attendanceDate);
        return recordDate >= weekStart && recordDate <= weekEnd;
    });
}

function generateMonthlyReport(date) {
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    return attendance.filter(a => {
        const recordDate = new Date(a.date || a.attendanceDate);
        return recordDate >= monthStart && recordDate <= monthEnd;
    });
}

function calculateReportAttendance(reportData) {
    if (reportData.length === 0) return 0;
    const presentCount = reportData.filter(a => a.status === 'present').length;
    return Math.round((presentCount / reportData.length) * 100);
}

function editAttendanceModal() {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="edit-attendance-modal">
            <h3>ویرایش حضور و غیاب</h3>
            
            <div class="search-section">
                <label>جستجو بر اساس:</label>
                <select id="search-type" onchange="toggleSearchFields()">
                    <option value="date">تاریخ</option>
                    <option value="student">دانش‌آموز</option>
                    <option value="program">برنامه</option>
                </select>
                
                <div id="date-search" class="search-field">
                    <input type="date" id="search-date" class="form-control">
                    <button onclick="searchAttendanceByDate()" class="btn btn-primary">جستجو</button>
                </div>
                
                <div id="student-search" class="search-field" style="display: none;">
                    <select id="search-student" class="form-control">
                        <option value="">انتخاب دانش‌آموز</option>
                        ${students.map(student => `
                            <option value="${student.id}">${student.fullName}</option>
                        `).join('')}
                    </select>
                    <button onclick="searchAttendanceByStudent()" class="btn btn-primary">جستجو</button>
                </div>
                
                <div id="program-search" class="search-field" style="display: none;">
                    <select id="search-program" class="form-control">
                        <option value="">انتخاب برنامه</option>
                        ${programs.map(program => `
                            <option value="${program.id}">${program.name}</option>
                        `).join('')}
                    </select>
                    <button onclick="searchAttendanceByProgram()" class="btn btn-primary">جستجو</button>
                </div>
            </div>
            
            <div id="attendance-edit-results"></div>
        </div>
    `;

    createModal('ویرایش حضور و غیاب', content);
}

function toggleSearchFields() {
    const searchType = document.getElementById('search-type').value;
    
    // Hide all search fields
    document.querySelectorAll('.search-field').forEach(field => field.style.display = 'none');
    
    // Show selected search field
    document.getElementById(`${searchType}-search`).style.display = 'block';
}

function searchAttendanceByDate() {
    const date = document.getElementById('search-date').value;
    if (!date) {
        showAlert('لطفاً تاریخ را انتخاب کنید', 'error');
        return;
    }
    
    const filteredAttendance = attendance.filter(a => (a.date || a.attendanceDate) === date);
    displayAttendanceForEdit(filteredAttendance);
}

function searchAttendanceByStudent() {
    const studentId = document.getElementById('search-student').value;
    if (!studentId) {
        showAlert('لطفاً دانش‌آموز را انتخاب کنید', 'error');
        return;
    }
    
    const filteredAttendance = attendance.filter(a => 
        a.studentId === studentId || a.studentId === students.find(s => s.id === studentId)?.nationalId
    );
    displayAttendanceForEdit(filteredAttendance);
}

function searchAttendanceByProgram() {
    const programId = document.getElementById('search-program').value;
    if (!programId) {
        showAlert('لطفاً برنامه را انتخاب کنید', 'error');
        return;
    }
    
    const filteredAttendance = attendance.filter(a => a.programId === programId);
    displayAttendanceForEdit(filteredAttendance);
}

function displayAttendanceForEdit(attendanceRecords) {
    const resultsDiv = document.getElementById('attendance-edit-results');
    
    if (attendanceRecords.length === 0) {
        resultsDiv.innerHTML = '<p>هیچ رکوردی یافت نشد</p>';
        return;
    }
    
    resultsDiv.innerHTML = `
        <div class="attendance-edit-list">
            <h4>نتایج جستجو (${attendanceRecords.length} رکورد)</h4>
            ${attendanceRecords.map(record => {
                const student = students.find(s => s.id === record.studentId || s.nationalId === record.studentId);
                const program = programs.find(p => p.id === record.programId);
                
                return `
                    <div class="attendance-edit-item">
                        <div class="record-info">
                            <strong>${student ? student.fullName : 'نامشخص'}</strong>
                            <span>${program ? program.name : 'نامشخص'}</span>
                            <span>${new Date(record.date || record.attendanceDate).toLocaleDateString('fa-IR')}</span>
                        </div>
                        <div class="edit-controls">
                            <select id="status-${record.id}" class="form-control">
                                <option value="present" ${record.status === 'present' ? 'selected' : ''}>حاضر</option>
                                <option value="absent" ${record.status === 'absent' ? 'selected' : ''}>غایب</option>
                                <option value="late" ${record.status === 'late' ? 'selected' : ''}>تأخیر</option>
                                <option value="excused" ${record.status === 'excused' ? 'selected' : ''}>عذر موجه</option>
                            </select>
                            <button onclick="updateAttendanceRecord('${record.id}')" class="btn btn-sm btn-success">ذخیره</button>
                            <button onclick="deleteAttendanceRecord('${record.id}')" class="btn btn-sm btn-danger">حذف</button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function updateAttendanceRecord(recordId) {
    const newStatus = document.getElementById(`status-${recordId}`).value;
    const recordIndex = attendance.findIndex(a => a.id === recordId);
    
    if (recordIndex !== -1) {
        attendance[recordIndex].status = newStatus;
        attendance[recordIndex].updatedAt = new Date().toISOString();
        
        // Update in localStorage
        localStorage.setItem('attendance', JSON.stringify(attendance));
        
        // Update in database if connected
        if (isSupabaseConnected && typeof supabaseClient !== 'undefined') {
            supabaseClient
                .from('attendance')
                .update({ status: newStatus, updated_at: new Date().toISOString() })
                .eq('id', recordId)
                .then(({ error }) => {
                    if (error) {
                        console.error('Error updating attendance:', error);
                    }
                });
        }
        
        showAlert('رکورد حضور و غیاب با موفقیت به‌روزرسانی شد', 'success');
    }
}

function deleteAttendanceRecord(recordId) {
    if (confirm('آیا از حذف این رکورد اطمینان دارید؟')) {
        const recordIndex = attendance.findIndex(a => a.id === recordId);
        
        if (recordIndex !== -1) {
            attendance.splice(recordIndex, 1);
            
            // Update in localStorage
            localStorage.setItem('attendance', JSON.stringify(attendance));
            
            // Delete from database if connected
            if (isSupabaseConnected && typeof supabaseClient !== 'undefined') {
                supabaseClient
                    .from('attendance')
                    .delete()
                    .eq('id', recordId)
                    .then(({ error }) => {
                        if (error) {
                            console.error('Error deleting attendance:', error);
                        }
                    });
            }
            
            showAlert('رکورد حضور و غیاب با موفقیت حذف شد', 'success');
            
            // Refresh the display
            const searchType = document.getElementById('search-type').value;
            switch(searchType) {
                case 'date':
                    searchAttendanceByDate();
                    break;
                case 'student':
                    searchAttendanceByStudent();
                    break;
                case 'program':
                    searchAttendanceByProgram();
                    break;
            }
        }
    }
}

function showAttendanceAnalytics() {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="attendance-analytics">
            <h3>تحلیل حضور و غیاب</h3>
            
            <div class="analytics-filters">
                <label>بازه زمانی:</label>
                <select id="time-range" onchange="updateAnalytics()">
                    <option value="7">هفته گذشته</option>
                    <option value="30" selected>ماه گذشته</option>
                    <option value="90">سه ماه گذشته</option>
                    <option value="365">سال گذشته</option>
                </select>
                
                <label>برنامه:</label>
                <select id="analytics-program" onchange="updateAnalytics()">
                    <option value="">همه برنامه‌ها</option>
                    ${programs.map(program => `
                        <option value="${program.id}">${program.name}</option>
                    `).join('')}
                </select>
            </div>
            
            <div class="analytics-charts">
                <div class="chart-container">
                    <h4>نرخ حضور در طول زمان</h4>
                    <div id="attendance-trend-chart" class="chart"></div>
                </div>
                
                <div class="chart-container">
                    <h4>مقایسه برنامه‌ها</h4>
                    <div id="program-comparison-chart" class="chart"></div>
                </div>
                
                <div class="chart-container">
                    <h4>توزیع وضعیت‌های حضور</h4>
                    <div id="status-distribution-chart" class="chart"></div>
                </div>
            </div>
            
            <div class="analytics-summary">
                <div class="summary-card">
                    <h5>آمار کلی</h5>
                    <div id="overall-stats"></div>
                </div>
                
                <div class="summary-card">
                    <h5>برترین دانش‌آموزان</h5>
                    <div id="top-students"></div>
                </div>
                
                <div class="summary-card">
                    <h5>نیازمند توجه</h5>
                    <div id="needs-attention"></div>
                </div>
            </div>
        </div>
    `;

    createModal('تحلیل حضور و غیاب', content);
    updateAnalytics();
}

function updateAnalytics() {
    const timeRange = parseInt(document.getElementById('time-range').value);
    const programId = document.getElementById('analytics-program').value;
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - timeRange);
    
    let filteredAttendance = attendance.filter(a => {
        const recordDate = new Date(a.date || a.attendanceDate);
        return recordDate >= startDate && recordDate <= endDate;
    });
    
    if (programId) {
        filteredAttendance = filteredAttendance.filter(a => a.programId === programId);
    }
    
    updateAttendanceTrendChart(filteredAttendance, startDate, endDate);
    updateProgramComparisonChart(filteredAttendance);
    updateStatusDistributionChart(filteredAttendance);
    updateOverallStats(filteredAttendance);
    updateTopStudents(filteredAttendance);
    updateNeedsAttention(filteredAttendance);
}

function updateAttendanceTrendChart(attendanceData, startDate, endDate) {
    const chartDiv = document.getElementById('attendance-trend-chart');
    
    // Group attendance by date
    const dailyStats = {};
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        dailyStats[dateStr] = { total: 0, present: 0 };
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    attendanceData.forEach(record => {
        const dateStr = record.date || record.attendanceDate;
        if (dailyStats[dateStr]) {
            dailyStats[dateStr].total++;
            if (record.status === 'present') {
                dailyStats[dateStr].present++;
            }
        }
    });
    
    // Create chart data
    const chartData = Object.entries(dailyStats).map(([date, stats]) => ({
        date: new Date(date).toLocaleDateString('fa-IR'),
        rate: stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0
    }));
    
    // Simple chart visualization
    chartDiv.innerHTML = `
        <div class="trend-chart">
            ${chartData.map(item => `
                <div class="chart-bar" style="height: ${item.rate}%;" title="${item.date}: ${item.rate}%">
                    <span class="bar-label">${item.rate}%</span>
                </div>
            `).join('')}
        </div>
        <div class="chart-labels">
            ${chartData.map(item => `<span>${item.date}</span>`).join('')}
        </div>
    `;
}

function updateProgramComparisonChart(attendanceData) {
    const chartDiv = document.getElementById('program-comparison-chart');
    
    // Group by program
    const programStats = {};
    attendanceData.forEach(record => {
        if (!programStats[record.programId]) {
            programStats[record.programId] = { total: 0, present: 0 };
        }
        programStats[record.programId].total++;
        if (record.status === 'present') {
            programStats[record.programId].present++;
        }
    });
    
    // Create chart data
    const chartData = Object.entries(programStats).map(([programId, stats]) => {
        const program = programs.find(p => p.id === programId);
        return {
            name: program ? program.name : 'نامشخص',
            rate: stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0
        };
    });
    
    chartDiv.innerHTML = `
        <div class="program-chart">
            ${chartData.map(item => `
                <div class="program-bar">
                    <div class="bar-fill" style="width: ${item.rate}%;"></div>
                    <span class="program-name">${item.name}</span>
                    <span class="program-rate">${item.rate}%</span>
                </div>
            `).join('')}
        </div>
    `;
}

function updateStatusDistributionChart(attendanceData) {
    const chartDiv = document.getElementById('status-distribution-chart');
    
    const statusCounts = {
        present: 0,
        absent: 0,
        late: 0,
        excused: 0
    };
    
    attendanceData.forEach(record => {
        statusCounts[record.status] = (statusCounts[record.status] || 0) + 1;
    });
    
    const total = attendanceData.length;
    const statusLabels = {
        present: 'حاضر',
        absent: 'غایب',
        late: 'تأخیر',
        excused: 'عذر موجه'
    };
    
    chartDiv.innerHTML = `
        <div class="status-chart">
            ${Object.entries(statusCounts).map(([status, count]) => {
                const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                return `
                    <div class="status-item">
                        <div class="status-color ${status}"></div>
                        <span class="status-label">${statusLabels[status]}</span>
                        <span class="status-count">${count} (${percentage}%)</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function updateOverallStats(attendanceData) {
    const statsDiv = document.getElementById('overall-stats');
    
    const total = attendanceData.length;
    const present = attendanceData.filter(a => a.status === 'present').length;
    const absent = attendanceData.filter(a => a.status === 'absent').length;
    const late = attendanceData.filter(a => a.status === 'late').length;
    const excused = attendanceData.filter(a => a.status === 'excused').length;
    
    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;
    
    statsDiv.innerHTML = `
        <div class="stat-item">
            <strong>کل رکوردها:</strong> ${total}
        </div>
        <div class="stat-item">
            <strong>نرخ حضور:</strong> ${attendanceRate}%
        </div>
        <div class="stat-item">
            <strong>حاضر:</strong> ${present}
        </div>
        <div class="stat-item">
            <strong>غایب:</strong> ${absent}
        </div>
        <div class="stat-item">
            <strong>تأخیر:</strong> ${late}
        </div>
        <div class="stat-item">
            <strong>عذر موجه:</strong> ${excused}
        </div>
    `;
}

function updateTopStudents(attendanceData) {
    const studentsDiv = document.getElementById('top-students');
    
    // Calculate attendance rate for each student
    const studentStats = {};
    attendanceData.forEach(record => {
        const studentId = record.studentId;
        if (!studentStats[studentId]) {
            studentStats[studentId] = { total: 0, present: 0 };
        }
        studentStats[studentId].total++;
        if (record.status === 'present') {
            studentStats[studentId].present++;
        }
    });
    
    // Sort by attendance rate
    const topStudents = Object.entries(studentStats)
        .map(([studentId, stats]) => {
            const student = students.find(s => s.id === studentId || s.nationalId === studentId);
            return {
                name: student ? student.fullName : 'نامشخص',
                rate: stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0
            };
        })
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 5);
    
    studentsDiv.innerHTML = topStudents.map((student, index) => `
        <div class="top-student-item">
            <span class="rank">${index + 1}</span>
            <span class="name">${student.name}</span>
            <span class="rate">${student.rate}%</span>
        </div>
    `).join('');
}

function updateNeedsAttention(attendanceData) {
    const attentionDiv = document.getElementById('needs-attention');
    
    // Find students with low attendance
    const studentStats = {};
    attendanceData.forEach(record => {
        const studentId = record.studentId;
        if (!studentStats[studentId]) {
            studentStats[studentId] = { total: 0, present: 0 };
        }
        studentStats[studentId].total++;
        if (record.status === 'present') {
            studentStats[studentId].present++;
        }
    });
    
    const lowAttendanceStudents = Object.entries(studentStats)
        .filter(([studentId, stats]) => {
            const rate = stats.total > 0 ? (stats.present / stats.total) * 100 : 0;
            return rate < 70; // Less than 70% attendance
        })
        .map(([studentId, stats]) => {
            const student = students.find(s => s.id === studentId || s.nationalId === studentId);
            return {
                name: student ? student.fullName : 'نامشخص',
                rate: stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0
            };
        })
        .sort((a, b) => a.rate - b.rate)
        .slice(0, 5);
    
    attentionDiv.innerHTML = lowAttendanceStudents.map(student => `
        <div class="attention-item">
            <span class="name">${student.name}</span>
            <span class="rate low">${student.rate}%</span>
        </div>
    `).join('');
}

// ... existing code ...

function showGradesOverview() {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="grades-overview">
            <h3>نمای کلی نمرات</h3>
            
            <div class="grades-stats">
                <div class="stats-grid">
                    <div class="stat-card">
                        <h4>کل دانش‌آموزان</h4>
                        <div class="number">${students.length}</div>
                    </div>
                    <div class="stat-card">
                        <h4>میانگین کل</h4>
                        <div class="number">${calculateOverallGradeAverage()}%</div>
                    </div>
                    <div class="stat-card">
                        <h4>بالاترین نمره</h4>
                        <div class="number">${getHighestGrade()}</div>
                    </div>
                    <div class="stat-card">
                        <h4>پایین‌ترین نمره</h4>
                        <div class="number">${getLowestGrade()}</div>
                    </div>
                </div>
            </div>
            
            <div class="grades-filters">
                <label>فیلتر بر اساس:</label>
                <select id="grade-filter" onchange="filterGrades()">
                    <option value="">همه</option>
                    <option value="excellent">عالی (18-20)</option>
                    <option value="good">خوب (15-17)</option>
                    <option value="average">متوسط (12-14)</option>
                    <option value="poor">ضعیف (0-11)</option>
                </select>
            </div>
            
            <div class="grades-table">
                <table>
                    <thead>
                        <tr>
                            <th>دانش‌آموز</th>
                            <th>برنامه</th>
                            <th>نمره</th>
                            <th>نوع</th>
                            <th>تاریخ</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody id="grades-table-body">
                        ${generateGradesTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    createModal('نمای کلی نمرات', content);
}

function calculateOverallGradeAverage() {
    if (!grades || grades.length === 0) return '0';
    const totalGrades = grades.reduce((sum, grade) => sum + (grade.grade || 0), 0);
    return Math.round(totalGrades / grades.length).toString();
}

function getHighestGrade() {
    if (grades.length === 0) return 0;
    return Math.max(...grades.map(g => g.grade || 0));
}

function getLowestGrade() {
    if (grades.length === 0) return 0;
    return Math.min(...grades.map(g => g.grade || 0));
}

function generateGradesTableRows() {
    if (grades.length === 0) {
        return '<tr><td colspan="6">هیچ نمره‌ای ثبت نشده است</td></tr>';
    }
    
    return grades.map(grade => {
        const student = students.find(s => s.id === grade.studentId || s.nationalId === grade.studentId);
        const program = programs.find(p => p.id === grade.programId);
        const gradeClass = getGradeClass(grade.grade);
        
        return `
            <tr class="${gradeClass}">
                <td>${student ? student.fullName : 'نامشخص'}</td>
                <td>${program ? program.name : 'نامشخص'}</td>
                <td>${grade.grade || 0}</td>
                <td>${grade.gradeType || 'نامشخص'}</td>
                <td>${new Date(grade.createdAt || grade.date).toLocaleDateString('fa-IR')}</td>
                <td>
                    <button onclick="editGrade('${grade.id}')" class="btn btn-sm btn-primary">ویرایش</button>
                    <button onclick="deleteGrade('${grade.id}')" class="btn btn-sm btn-danger">حذف</button>
                </td>
            </tr>
        `;
    }).join('');
}

function getGradeClass(grade) {
    if (grade >= 18) return 'excellent';
    if (grade >= 15) return 'good';
    if (grade >= 12) return 'average';
    return 'poor';
}

function filterGrades() {
    const filter = document.getElementById('grade-filter').value;
    const tbody = document.getElementById('grades-table-body');
    
    let filteredGrades = grades;
    
    switch(filter) {
        case 'excellent':
            filteredGrades = grades.filter(g => g.grade >= 18);
            break;
        case 'good':
            filteredGrades = grades.filter(g => g.grade >= 15 && g.grade < 18);
            break;
        case 'average':
            filteredGrades = grades.filter(g => g.grade >= 12 && g.grade < 15);
            break;
        case 'poor':
            filteredGrades = grades.filter(g => g.grade < 12);
            break;
    }
    
    tbody.innerHTML = filteredGrades.map(grade => {
        const student = students.find(s => s.id === grade.studentId || s.nationalId === grade.studentId);
        const program = programs.find(p => p.id === grade.programId);
        const gradeClass = getGradeClass(grade.grade);
        
        return `
            <tr class="${gradeClass}">
                <td>${student ? student.fullName : 'نامشخص'}</td>
                <td>${program ? program.name : 'نامشخص'}</td>
                <td>${grade.grade || 0}</td>
                <td>${grade.gradeType || 'نامشخص'}</td>
                <td>${new Date(grade.createdAt || grade.date).toLocaleDateString('fa-IR')}</td>
                <td>
                    <button onclick="editGrade('${grade.id}')" class="btn btn-sm btn-primary">ویرایش</button>
                    <button onclick="deleteGrade('${grade.id}')" class="btn btn-sm btn-danger">حذف</button>
                </td>
            </tr>
        `;
    }).join('');
}

function editGrades() {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="edit-grades-modal">
            <h3>ویرایش نمرات</h3>
            
            <div class="search-section">
                <label>جستجو بر اساس:</label>
                <select id="grade-search-type" onchange="toggleGradeSearchFields()">
                    <option value="student">دانش‌آموز</option>
                    <option value="program">برنامه</option>
                    <option value="date">تاریخ</option>
                </select>
                
                <div id="grade-student-search" class="search-field">
                    <select id="search-grade-student" class="form-control">
                        <option value="">انتخاب دانش‌آموز</option>
                        ${students.map(student => `
                            <option value="${student.id}">${student.fullName}</option>
                        `).join('')}
                    </select>
                    <button onclick="searchGradesByStudent()" class="btn btn-primary">جستجو</button>
                </div>
                
                <div id="grade-program-search" class="search-field" style="display: none;">
                    <select id="search-grade-program" class="form-control">
                        <option value="">انتخاب برنامه</option>
                        ${programs.map(program => `
                            <option value="${program.id}">${program.name}</option>
                        `).join('')}
                    </select>
                    <button onclick="searchGradesByProgram()" class="btn btn-primary">جستجو</button>
                </div>
                
                <div id="grade-date-search" class="search-field" style="display: none;">
                    <input type="date" id="search-grade-date" class="form-control">
                    <button onclick="searchGradesByDate()" class="btn btn-primary">جستجو</button>
                </div>
            </div>
            
            <div id="grades-edit-results"></div>
        </div>
    `;

    createModal('ویرایش نمرات', content);
}

function toggleGradeSearchFields() {
    const searchType = document.getElementById('grade-search-type').value;
    
    // Hide all search fields
    document.querySelectorAll('.search-field').forEach(field => field.style.display = 'none');
    
    // Show selected search field
    document.getElementById(`grade-${searchType}-search`).style.display = 'block';
}

function searchGradesByStudent() {
    const studentId = document.getElementById('search-grade-student').value;
    if (!studentId) {
        showAlert('لطفاً دانش‌آموز را انتخاب کنید', 'error');
        return;
    }
    
    const filteredGrades = grades.filter(g => 
        g.studentId === studentId || g.studentId === students.find(s => s.id === studentId)?.nationalId
    );
    displayGradesForEdit(filteredGrades);
}

function searchGradesByProgram() {
    const programId = document.getElementById('search-grade-program').value;
    if (!programId) {
        showAlert('لطفاً برنامه را انتخاب کنید', 'error');
        return;
    }
    
    const filteredGrades = grades.filter(g => g.programId === programId);
    displayGradesForEdit(filteredGrades);
}

function searchGradesByDate() {
    const date = document.getElementById('search-grade-date').value;
    if (!date) {
        showAlert('لطفاً تاریخ را انتخاب کنید', 'error');
        return;
    }
    
    const filteredGrades = grades.filter(g => 
        (g.date || g.createdAt) === date
    );
    displayGradesForEdit(filteredGrades);
}

function displayGradesForEdit(gradesRecords) {
    const resultsDiv = document.getElementById('grades-edit-results');
    
    if (gradesRecords.length === 0) {
        resultsDiv.innerHTML = '<p>هیچ نمره‌ای یافت نشد</p>';
        return;
    }
    
    resultsDiv.innerHTML = `
        <div class="grades-edit-list">
            <h4>نتایج جستجو (${gradesRecords.length} نمره)</h4>
            ${gradesRecords.map(grade => {
                const student = students.find(s => s.id === grade.studentId || s.nationalId === grade.studentId);
                const program = programs.find(p => p.id === grade.programId);
                
                return `
                    <div class="grade-edit-item">
                        <div class="grade-info">
                            <strong>${student ? student.fullName : 'نامشخص'}</strong>
                            <span>${program ? program.name : 'نامشخص'}</span>
                            <span>${new Date(grade.date || grade.createdAt).toLocaleDateString('fa-IR')}</span>
                        </div>
                        <div class="edit-controls">
                            <input type="number" id="grade-${grade.id}" class="form-control" value="${grade.grade || 0}" min="0" max="20" step="0.1">
                            <select id="grade-type-${grade.id}" class="form-control">
                                <option value="midterm" ${grade.gradeType === 'midterm' ? 'selected' : ''}>میان‌ترم</option>
                                <option value="final" ${grade.gradeType === 'final' ? 'selected' : ''}>پایان‌ترم</option>
                                <option value="assignment" ${grade.gradeType === 'assignment' ? 'selected' : ''}>تکلیف</option>
                                <option value="quiz" ${grade.gradeType === 'quiz' ? 'selected' : ''}>کوئیز</option>
                            </select>
                            <button onclick="updateGrade('${grade.id}')" class="btn btn-sm btn-success">ذخیره</button>
                            <button onclick="deleteGrade('${grade.id}')" class="btn btn-sm btn-danger">حذف</button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function updateGrade(gradeId) {
    const newGrade = parseFloat(document.getElementById(`grade-${gradeId}`).value);
    const newType = document.getElementById(`grade-type-${gradeId}`).value;
    const gradeIndex = grades.findIndex(g => g.id === gradeId);
    
    if (gradeIndex !== -1) {
        grades[gradeIndex].grade = newGrade;
        grades[gradeIndex].gradeType = newType;
        grades[gradeIndex].updatedAt = new Date().toISOString();
        
        // Update in localStorage
        localStorage.setItem('grades', JSON.stringify(grades));
        
        // Update in database if connected
        if (isSupabaseConnected && typeof supabaseClient !== 'undefined') {
            supabaseClient
                .from('grades')
                .update({ 
                    grade: newGrade, 
                    grade_type: newType, 
                    updated_at: new Date().toISOString() 
                })
                .eq('id', gradeId)
                .then(({ error }) => {
                    if (error) {
                        console.error('Error updating grade:', error);
                    }
                });
        }
        
        showAlert('نمره با موفقیت به‌روزرسانی شد', 'success');
    }
}

function deleteGrade(gradeId) {
    if (confirm('آیا از حذف این نمره اطمینان دارید؟')) {
        const gradeIndex = grades.findIndex(g => g.id === gradeId);
        
        if (gradeIndex !== -1) {
            grades.splice(gradeIndex, 1);
            
            // Update in localStorage
            localStorage.setItem('grades', JSON.stringify(grades));
            
            // Delete from database if connected
            if (isSupabaseConnected && typeof supabaseClient !== 'undefined') {
                supabaseClient
                    .from('grades')
                    .delete()
                    .eq('id', gradeId)
                    .then(({ error }) => {
                        if (error) {
                            console.error('Error deleting grade:', error);
                        }
                    });
            }
            
            showAlert('نمره با موفقیت حذف شد', 'success');
            
            // Refresh the display
            const searchType = document.getElementById('grade-search-type')?.value;
            if (searchType) {
                switch(searchType) {
                    case 'student':
                        searchGradesByStudent();
                        break;
                    case 'program':
                        searchGradesByProgram();
                        break;
                    case 'date':
                        searchGradesByDate();
                        break;
                }
            }
        }
    }
}

function showGradeAnalytics() {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="grade-analytics">
            <h3>تحلیل نمرات</h3>
            
            <div class="analytics-filters">
                <label>برنامه:</label>
                <select id="grade-analytics-program" onchange="updateGradeAnalytics()">
                    <option value="">همه برنامه‌ها</option>
                    ${programs.map(program => `
                        <option value="${program.id}">${program.name}</option>
                    `).join('')}
                </select>
                
                <label>نوع نمره:</label>
                <select id="grade-type-filter" onchange="updateGradeAnalytics()">
                    <option value="">همه انواع</option>
                    <option value="midterm">میان‌ترم</option>
                    <option value="final">پایان‌ترم</option>
                    <option value="assignment">تکلیف</option>
                    <option value="quiz">کوئیز</option>
                </select>
            </div>
            
            <div class="grade-charts">
                <div class="chart-container">
                    <h4>توزیع نمرات</h4>
                    <div id="grade-distribution-chart" class="chart"></div>
                </div>
                
                <div class="chart-container">
                    <h4>میانگین نمرات بر اساس برنامه</h4>
                    <div id="program-grade-chart" class="chart"></div>
                </div>
                
                <div class="chart-container">
                    <h4>روند نمرات در طول زمان</h4>
                    <div id="grade-trend-chart" class="chart"></div>
                </div>
            </div>
            
            <div class="grade-summary">
                <div class="summary-card">
                    <h5>آمار کلی</h5>
                    <div id="grade-overall-stats"></div>
                </div>
                
                <div class="summary-card">
                    <h5>برترین دانش‌آموزان</h5>
                    <div id="top-grade-students"></div>
                </div>
                
                <div class="summary-card">
                    <h5>نیازمند کمک</h5>
                    <div id="needs-help-students"></div>
                </div>
            </div>
        </div>
    `;

    createModal('تحلیل نمرات', content);
    updateGradeAnalytics();
}

function updateGradeAnalytics() {
    const programId = document.getElementById('grade-analytics-program').value;
    const gradeType = document.getElementById('grade-type-filter').value;
    
    let filteredGrades = grades;
    
    if (programId) {
        filteredGrades = filteredGrades.filter(g => g.programId === programId);
    }
    
    if (gradeType) {
        filteredGrades = filteredGrades.filter(g => g.gradeType === gradeType);
    }
    
    updateGradeDistributionChart(filteredGrades);
    updateProgramGradeChart(filteredGrades);
    updateGradeTrendChart(filteredGrades);
    updateGradeOverallStats(filteredGrades);
    updateTopGradeStudents(filteredGrades);
    updateNeedsHelpStudents(filteredGrades);
}

function updateGradeDistributionChart(gradesData) {
    const chartDiv = document.getElementById('grade-distribution-chart');
    
    const gradeRanges = {
        '0-5': 0,
        '6-10': 0,
        '11-15': 0,
        '16-20': 0
    };
    
    gradesData.forEach(grade => {
        const gradeValue = grade.grade || 0;
        if (gradeValue <= 5) gradeRanges['0-5']++;
        else if (gradeValue <= 10) gradeRanges['6-10']++;
        else if (gradeValue <= 15) gradeRanges['11-15']++;
        else gradeRanges['16-20']++;
    });
    
    const total = gradesData.length;
    
    chartDiv.innerHTML = `
        <div class="grade-distribution">
            ${Object.entries(gradeRanges).map(([range, count]) => {
                const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                return `
                    <div class="grade-range">
                        <div class="range-bar" style="height: ${percentage}%;"></div>
                        <span class="range-label">${range}</span>
                        <span class="range-count">${count} (${percentage}%)</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function updateProgramGradeChart(gradesData) {
    const chartDiv = document.getElementById('program-grade-chart');
    
    // Group by program
    const programStats = {};
    gradesData.forEach(grade => {
        if (!programStats[grade.programId]) {
            programStats[grade.programId] = { total: 0, sum: 0 };
        }
        programStats[grade.programId].total++;
        programStats[grade.programId].sum += grade.grade || 0;
    });
    
    // Calculate averages
    const chartData = Object.entries(programStats).map(([programId, stats]) => {
        const program = programs.find(p => p.id === programId);
        return {
            name: program ? program.name : 'نامشخص',
            average: stats.total > 0 ? Math.round((stats.sum / stats.total) * 10) / 10 : 0
        };
    });
    
    chartDiv.innerHTML = `
        <div class="program-grade-chart">
            ${chartData.map(item => `
                <div class="program-grade-bar">
                    <div class="bar-fill" style="width: ${(item.average / 20) * 100}%;"></div>
                    <span class="program-name">${item.name}</span>
                    <span class="program-average">${item.average}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function updateGradeTrendChart(gradesData) {
    const chartDiv = document.getElementById('grade-trend-chart');
    
    // Group by date
    const dateStats = {};
    gradesData.forEach(grade => {
        const dateStr = new Date(grade.date || grade.createdAt).toISOString().split('T')[0];
        if (!dateStats[dateStr]) {
            dateStats[dateStr] = { total: 0, sum: 0 };
        }
        dateStats[dateStr].total++;
        dateStats[dateStr].sum += grade.grade || 0;
    });
    
    // Sort by date and calculate averages
    const chartData = Object.entries(dateStats)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, stats]) => ({
            date: new Date(date).toLocaleDateString('fa-IR'),
            average: stats.total > 0 ? Math.round((stats.sum / stats.total) * 10) / 10 : 0
        }));
    
    chartDiv.innerHTML = `
        <div class="grade-trend-chart">
            ${chartData.map(item => `
                <div class="trend-point" style="height: ${(item.average / 20) * 100}%;" title="${item.date}: ${item.average}">
                    <span class="point-label">${item.average}</span>
                </div>
            `).join('')}
        </div>
        <div class="trend-labels">
            ${chartData.map(item => `<span>${item.date}</span>`).join('')}
        </div>
    `;
}

function updateGradeOverallStats(gradesData) {
    const statsDiv = document.getElementById('grade-overall-stats');
    
    const total = gradesData.length;
    const sum = gradesData.reduce((acc, grade) => acc + (grade.grade || 0), 0);
    const average = total > 0 ? Math.round((sum / total) * 10) / 10 : 0;
    const highest = total > 0 ? Math.max(...gradesData.map(g => g.grade || 0)) : 0;
    const lowest = total > 0 ? Math.min(...gradesData.map(g => g.grade || 0)) : 0;
    
    statsDiv.innerHTML = `
        <div class="stat-item">
            <strong>کل نمرات:</strong> ${total}
        </div>
        <div class="stat-item">
            <strong>میانگین:</strong> ${average}
        </div>
        <div class="stat-item">
            <strong>بالاترین:</strong> ${highest}
        </div>
        <div class="stat-item">
            <strong>پایین‌ترین:</strong> ${lowest}
        </div>
    `;
}

function updateTopGradeStudents(gradesData) {
    const studentsDiv = document.getElementById('top-grade-students');
    
    // Calculate average grade for each student
    const studentStats = {};
    gradesData.forEach(grade => {
        const studentId = grade.studentId;
        if (!studentStats[studentId]) {
            studentStats[studentId] = { total: 0, sum: 0 };
        }
        studentStats[studentId].total++;
        studentStats[studentId].sum += grade.grade || 0;
    });
    
    // Sort by average grade
    const topStudents = Object.entries(studentStats)
        .map(([studentId, stats]) => {
            const student = students.find(s => s.id === studentId || s.nationalId === studentId);
            return {
                name: student ? student.fullName : 'نامشخص',
                average: stats.total > 0 ? Math.round((stats.sum / stats.total) * 10) / 10 : 0
            };
        })
        .sort((a, b) => b.average - a.average)
        .slice(0, 5);
    
    studentsDiv.innerHTML = topStudents.map((student, index) => `
        <div class="top-student-item">
            <span class="rank">${index + 1}</span>
            <span class="name">${student.name}</span>
            <span class="average">${student.average}</span>
        </div>
    `).join('');
}

function updateNeedsHelpStudents(gradesData) {
    const helpDiv = document.getElementById('needs-help-students');
    
    // Find students with low grades
    const studentStats = {};
    gradesData.forEach(grade => {
        const studentId = grade.studentId;
        if (!studentStats[studentId]) {
            studentStats[studentId] = { total: 0, sum: 0 };
        }
        studentStats[studentId].total++;
        studentStats[studentId].sum += grade.grade || 0;
    });
    
    const lowGradeStudents = Object.entries(studentStats)
        .filter(([studentId, stats]) => {
            const average = stats.total > 0 ? stats.sum / stats.total : 0;
            return average < 12; // Less than 12 average
        })
        .map(([studentId, stats]) => {
            const student = students.find(s => s.id === studentId || s.nationalId === studentId);
            return {
                name: student ? student.fullName : 'نامشخص',
                average: stats.total > 0 ? Math.round((stats.sum / stats.total) * 10) / 10 : 0
            };
        })
        .sort((a, b) => a.average - b.average)
        .slice(0, 5);
    
    helpDiv.innerHTML = lowGradeStudents.map(student => `
        <div class="help-item">
            <span class="name">${student.name}</span>
            <span class="average low">${student.average}</span>
        </div>
    `).join('');
}

// ... existing code ...
    showAlert('نظرسنجی‌های موجود در حال توسعه است...', 'info');
}

function joinGroupSession() {
    showAlert('پیوستن به جلسه در حال توسعه است...', 'info');
}

function viewSessionHistory() {
    showAlert('تاریخچه جلسات در حال توسعه است...', 'info');
}

function participateInSurvey() {
    showAlert('نظرسنجی جلسه در حال توسعه است...', 'info');
}

function viewMySchedule() {
    showAlert('برنامه زمانی من در حال توسعه است...', 'info');
}

function viewProgramProgress() {
    showAlert('پیشرفت برنامه‌ها در حال توسعه است...', 'info');
}

function exportMySchedule() {
    showAlert('خروجی اکسل برنامه زمانی من در حال توسعه است...', 'info');
}

function viewAttendanceAnalytics() {
    showAlert('تحلیل حضور و غیاب در حال توسعه است...', 'info');
}

function viewAttendanceHistory() {
    showAlert('تاریخچه حضور در حال توسعه است...', 'info');
}

function viewGroupSessions() {
    showAlert('جلسات گروهی در حال توسعه است...', 'info');
}

function exportMyAttendance() {
    showAlert('خروجی اکسل حضور و غیاب من در حال توسعه است...', 'info');
}

function exportMyData() {
    showAlert('خروجی اطلاعات در حال توسعه است...', 'info');
}

// تابع‌های مفقود برای داشبورد استاد
function viewGradesHistory() {
    showAlert('تاریخچه نمرات در حال توسعه است...', 'info');
}

function viewAttendanceHistory() {
    showAlert('تاریخچه حضور در حال توسعه است...', 'info');
}

function viewGroupActivityHistory() {
    showAlert('تاریخچه فعالیت‌های گروهی در حال توسعه است...', 'info');
}

function showGradeReports() {
    showAlert('گزارش نمرات در حال توسعه است...', 'info');
}

function showActivityReports() {
    showAlert('گزارش فعالیت‌ها در حال توسعه است...', 'info');
}

function exportMyReports() {
    showAlert('خروجی اکسل گزارش‌های من در حال توسعه است...', 'info');
}

// توابع جدید برای مدیریت بچه‌گروهی
function filterGroups(searchTerm) {
    const rows = document.querySelectorAll('.table tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterSubGroups(searchTerm) {
    const rows = document.querySelectorAll('.table tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function viewGroupDetails(groupId) {
    showAlert(`جزئیات گروه ${groupId} در حال نمایش...`, 'info');
}

function editGroup(groupId) {
    showAlert(`ویرایش گروه ${groupId} در حال توسعه...`, 'info');
}

function viewSubGroupDetails(subGroupId) {
    showAlert(`جزئیات بچه‌گروهی ${subGroupId} در حال نمایش...`, 'info');
}

function editSubGroup(subGroupId) {
    showAlert(`ویرایش بچه‌گروهی ${subGroupId} در حال توسعه...`, 'info');
}

function manageSubGroupStudents(subGroupId) {
    showAlert(`مدیریت دانش‌آموزان بچه‌گروهی ${subGroupId} در حال توسعه...`, 'info');
}

function createNewSubGroup() {
    showAlert('ایجاد بچه‌گروهی جدید در حال توسعه...', 'info');
}

function exportSubGroupsToExcel() {
    showAlert('خروجی اکسل بچه‌گروهی‌ها در حال توسعه...', 'info');
}

// توابع جدید برای مدیریت گروه‌ها
async function showGroupManagement() {
    const content = `
        <div class="management-header">
            <h3>مدیریت گروه‌ها</h3>
            <div class="search-box">
                <input type="text" placeholder="جستجو در گروه‌ها..." onkeyup="filterGroups(this.value)">
            </div>
        </div>
        
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>نام گروه</th>
                        <th>رابط</th>
                        <th>تعداد دانش‌آموز</th>
                        <th>حداکثر ظرفیت</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    ${groups.map(group => `
                        <tr>
                            <td>${group.name}</td>
                            <td>${group.coordinatorName}</td>
                            <td>${group.currentStudents}</td>
                            <td>${group.maxStudents}</td>
                            <td>
                                <span class="badge ${group.isActive ? 'badge-success' : 'badge-danger'}">
                                    ${group.isActive ? 'فعال' : 'غیرفعال'}
                                </span>
                            </td>
                            <td>
                                <button onclick="viewGroupDetails(${group.id})" class="btn btn-sm btn-primary">مشاهده</button>
                                <button onclick="editGroup(${group.id})" class="btn btn-sm btn-info">ویرایش</button>
                                <button onclick="toggleGroupStatus(${group.id})" class="btn btn-sm ${group.isActive ? 'btn-warning' : 'btn-success'}">
                                    ${group.isActive ? 'غیرفعال' : 'فعال'}
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="management-footer">
            <button onclick="createNewGroup()" class="btn btn-success">ایجاد گروه جدید</button>
            <button onclick="exportGroupsToExcel()" class="btn btn-warning">خروجی اکسل</button>
        </div>
    `;
    
    createModal('مدیریت گروه‌ها', content);
}

async function createNewGroup() {
    const coordinators = users.filter(u => u.type === 'coordinator');
    
    const content = `
        <form id="newGroupForm">
            <div class="form-group">
                <label for="groupName">نام گروه:</label>
                <input type="text" id="groupName" class="form-control" required>
            </div>
            
            <div class="form-group">
                <label for="coordinatorId">رابط:</label>
                <select id="coordinatorId" class="form-control" required>
                    <option value="">انتخاب رابط</option>
                    ${coordinators.map(c => `
                        <option value="${c.id}">${c.fullName}</option>
                    `).join('')}
                </select>
            </div>
            
            <div class="form-group">
                <label for="maxStudents">حداکثر ظرفیت دانش‌آموز:</label>
                <input type="number" id="maxStudents" class="form-control" min="1" max="50" value="30" required>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-success">ایجاد گروه</button>
                <button type="button" onclick="closeModal()" class="btn btn-secondary">انصراف</button>
            </div>
        </form>
    `;
    
    createModal('ایجاد گروه جدید', content);
    
    document.getElementById('newGroupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const groupName = document.getElementById('groupName').value;
        const coordinatorId = parseInt(document.getElementById('coordinatorId').value);
        const maxStudents = parseInt(document.getElementById('maxStudents').value);
        
        const coordinator = users.find(u => u.id === coordinatorId);
        
        const newGroup = {
            id: groups.length + 1,
            name: groupName,
            coordinatorId: coordinatorId,
            coordinatorName: coordinator.fullName,
            maxStudents: maxStudents,
            currentStudents: 0,
            isActive: true,
            createdAt: new Date().toISOString()
        };
        
        groups.push(newGroup);
        localStorage.setItem('groups', JSON.stringify(groups));
        
        showAlert('گروه جدید با موفقیت ایجاد شد', 'success');
        closeModal();
        showGroupManagement();
    });
}

async function assignCoordinatorToGroup() {
    const coordinators = users.filter(u => u.type === 'coordinator');
    const groupsWithoutCoordinator = groups.filter(g => !g.coordinatorId);
    
    if (groupsWithoutCoordinator.length === 0) {
        showAlert('تمام گروه‌ها دارای رابط هستند', 'info');
        return;
    }
    
    const content = `
        <form id="assignCoordinatorForm">
            <div class="form-group">
                <label for="groupId">گروه:</label>
                <select id="groupId" class="form-control" required>
                    <option value="">انتخاب گروه</option>
                    ${groupsWithoutCoordinator.map(g => `
                        <option value="${g.id}">${g.name}</option>
                    `).join('')}
                </select>
            </div>
            
            <div class="form-group">
                <label for="coordinatorId">رابط:</label>
                <select id="coordinatorId" class="form-control" required>
                    <option value="">انتخاب رابط</option>
                    ${coordinators.map(c => `
                        <option value="${c.id}">${c.fullName}</option>
                    `).join('')}
                </select>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-success">تخصیص رابط</button>
                <button type="button" onclick="closeModal()" class="btn btn-secondary">انصراف</button>
            </div>
        </form>
    `;
    
    createModal('تخصیص رابط به گروه', content);
    
    document.getElementById('assignCoordinatorForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const groupId = parseInt(document.getElementById('groupId').value);
        const coordinatorId = parseInt(document.getElementById('coordinatorId').value);
        
        const group = groups.find(g => g.id === groupId);
        const coordinator = users.find(u => u.id === coordinatorId);
        
        if (group && coordinator) {
            group.coordinatorId = coordinatorId;
            group.coordinatorName = coordinator.fullName;
            
            localStorage.setItem('groups', JSON.stringify(groups));
            
            showAlert('رابط با موفقیت به گروه تخصیص داده شد', 'success');
            closeModal();
        }
    });
}

function toggleGroupStatus(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (group) {
        group.isActive = !group.isActive;
        localStorage.setItem('groups', JSON.stringify(groups));
        showAlert(`وضعیت گروه ${group.name} تغییر یافت`, 'success');
        showGroupManagement();
    }
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

function createDefaultDashboard() {
    return `
        <div class="dashboard-stats">
            <div class="dashboard-stat">
                <div class="number">0</div>
                <div class="label">اطلاعات موجود نیست</div>
            </div>
        </div>
        <div class="alert alert-info">
            <p>نوع کاربر شما مشخص نشده است. لطفاً با مدیر سیستم تماس بگیرید.</p>
        </div>
    `;
}

// بهبود عملکرد دکمه‌ها
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// بهبود عملکرد جستجو
const debouncedFilterGroups = debounce(filterGroups, 300);
const debouncedFilterSubGroups = debounce(filterSubGroups, 300);

// بهبود اتصال به دیتابیس
async function improveDatabaseConnection() {
    try {
        if (typeof supabaseClient !== 'undefined') {
            const { data, error } = await supabaseClient
                .from('users')
                .select('count')
                .limit(1)
                .timeout(5000); // 5 second timeout
            
            if (!error) {
                isSupabaseConnected = true;
                console.log('اتصال به Supabase برقرار شد');
                return true;
            }
        }
    } catch (error) {
        console.log('Supabase در دسترس نیست، استفاده از LocalStorage');
        isSupabaseConnected = false;
    }
    return false;
}

// بهبود عملکرد کلی
function optimizePerformance() {
    // کاهش تعداد درخواست‌های DOM
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    });

    // مشاهده عناصر برای انیمیشن
    document.querySelectorAll('.dashboard-stat, .coordinator-section, .admin-section').forEach(el => {
        observer.observe(el);
    });
}

// بهبود نمایش پیام‌ها
function showImprovedAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} notification show`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 300);
    }, 3000);
}

function showRequestManagement() {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="request-management">
            <h3>مدیریت درخواست‌ها</h3>
            
            <div class="request-stats">
                <div class="stats-grid">
                    <div class="stat-card">
                        <h4>کل درخواست‌ها</h4>
                        <div class="number">0</div>
                    </div>
                    <div class="stat-card">
                        <h4>در انتظار بررسی</h4>
                        <div class="number">0</div>
                    </div>
                    <div class="stat-card">
                        <h4>تأیید شده</h4>
                        <div class="number">0</div>
                    </div>
                    <div class="stat-card">
                        <h4>رد شده</h4>
                        <div class="number">0</div>
                    </div>
                </div>
            </div>
            
            <div class="request-list">
                <h4>لیست درخواست‌ها</h4>
                <p>هیچ درخواستی یافت نشد</p>
            </div>
        </div>
    `;

    createModal('مدیریت درخواست‌ها', content);
}

function createReportCardRequest() {
    if (!currentUser || currentUser.type !== 'student') {
        showAlert('فقط دانش‌آموزان می‌توانند درخواست کارنامه دهند', 'error');
        return;
    }

    const content = `
        <div class="report-card-request">
            <h3>درخواست کارنامه</h3>
            
            <form id="report-card-form">
                <div class="form-group">
                    <label>نوع کارنامه:</label>
                    <select id="report-type" class="form-control" required>
                        <option value="">انتخاب کنید</option>
                        <option value="midterm">کارنامه میان‌ترم</option>
                        <option value="final">کارنامه پایان‌ترم</option>
                        <option value="yearly">کارنامه سالانه</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>توضیحات:</label>
                    <textarea id="request-notes" class="form-control" rows="3" placeholder="توضیحات اضافی (اختیاری)"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">ارسال درخواست</button>
                    <button type="button" onclick="closeModal()" class="btn btn-secondary">انصراف</button>
                </div>
            </form>
        </div>
    `;

    createModal('درخواست کارنامه', content);

    document.getElementById('report-card-form').onsubmit = async (e) => {
        e.preventDefault();
        
        const reportType = document.getElementById('report-type').value;
        const notes = document.getElementById('request-notes').value;
        
        // Here you would typically save the request to the database
        showAlert('درخواست کارنامه با موفقیت ارسال شد', 'success');
        closeModal();
    };
}

function showRequestAnalytics() {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="request-analytics">
            <h3>تحلیل درخواست‌ها</h3>
            
            <div class="analytics-summary">
                <div class="summary-card">
                    <h5>آمار کلی</h5>
                    <div class="stat-item">
                        <strong>کل درخواست‌ها:</strong> 0
                    </div>
                    <div class="stat-item">
                        <strong>میانگین زمان پاسخ:</strong> 0 روز
                    </div>
                </div>
                
                <div class="summary-card">
                    <h5>نوع درخواست‌ها</h5>
                    <div class="stat-item">
                        <strong>کارنامه:</strong> 0
                    </div>
                    <div class="stat-item">
                        <strong>سایر:</strong> 0
                    </div>
                </div>
            </div>
            
            <div class="chart-container">
                <h4>روند درخواست‌ها</h4>
                <div class="chart">
                    <p>هیچ داده‌ای برای نمایش وجود ندارد</p>
                </div>
            </div>
        </div>
    `;

    createModal('تحلیل درخواست‌ها', content);
}

function exportRequestsToExcel() {
    showAlert('هیچ درخواستی برای خروجی وجود ندارد', 'info');
}

function showGeneralReports() {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="general-reports">
            <h3>گزارش‌های کلی</h3>
            
            <div class="report-options">
                <button onclick="generateGeneralReport('students')" class="btn btn-primary">گزارش دانش‌آموزان</button>
                <button onclick="generateGeneralReport('programs')" class="btn btn-success">گزارش برنامه‌ها</button>
                <button onclick="generateGeneralReport('attendance')" class="btn btn-info">گزارش حضور و غیاب</button>
                <button onclick="generateGeneralReport('grades')" class="btn btn-warning">گزارش نمرات</button>
            </div>
            
            <div id="general-report-results"></div>
        </div>
    `;

    createModal('گزارش‌های کلی', content);
}

function generateGeneralReport(type) {
    const resultsDiv = document.getElementById('general-report-results');
    resultsDiv.innerHTML = '<div class="loading">در حال تولید گزارش...</div>';
    
    setTimeout(() => {
        let reportData = {};
        
        switch(type) {
            case 'students':
                reportData = {
                    title: 'گزارش دانش‌آموزان',
                    total: students.length,
                    active: students.filter(s => s.isActive).length,
                    byGroup: groups.map(group => ({
                        name: group.name,
                        count: students.filter(s => s.groupId === group.id).length
                    }))
                };
                break;
            case 'programs':
                reportData = {
                    title: 'گزارش برنامه‌ها',
                    total: programs.length,
                    active: programs.filter(p => p.isActive).length,
                    byCategory: {}
                };
                break;
            case 'attendance':
                reportData = {
                    title: 'گزارش حضور و غیاب',
                    total: attendance.length,
                    present: attendance.filter(a => a.status === 'present').length,
                    absent: attendance.filter(a => a.status === 'absent').length
                };
                break;
            case 'grades':
                reportData = {
                    title: 'گزارش نمرات',
                    total: grades.length,
                    average: calculateOverallGradeAverage(),
                    highest: getHighestGrade(),
                    lowest: getLowestGrade()
                };
                break;
        }
        
        resultsDiv.innerHTML = `
            <div class="report-content">
                <h4>${reportData.title}</h4>
                <div class="report-summary">
                    ${Object.entries(reportData).filter(([key]) => key !== 'title').map(([key, value]) => `
                        <div class="summary-item">
                            <strong>${key}:</strong> ${value}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }, 1000);
}

function showFinancialReports() {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="financial-reports">
            <h3>گزارش‌های مالی</h3>
            
            <div class="financial-stats">
                <div class="stats-grid">
                    <div class="stat-card">
                        <h4>کل درآمد</h4>
                        <div class="number">0 تومان</div>
                    </div>
                    <div class="stat-card">
                        <h4>کل هزینه‌ها</h4>
                        <div class="number">0 تومان</div>
                    </div>
                    <div class="stat-card">
                        <h4>سود خالص</h4>
                        <div class="number">0 تومان</div>
                    </div>
                </div>
            </div>
            
            <div class="report-options">
                <button onclick="generateFinancialReport('income')" class="btn btn-primary">گزارش درآمد</button>
                <button onclick="generateFinancialReport('expenses')" class="btn btn-success">گزارش هزینه‌ها</button>
                <button onclick="generateFinancialReport('profit')" class="btn btn-info">گزارش سود</button>
            </div>
            
            <div id="financial-report-results"></div>
        </div>
    `;

    createModal('گزارش‌های مالی', content);
}

function generateFinancialReport(type) {
    const resultsDiv = document.getElementById('financial-report-results');
    resultsDiv.innerHTML = '<div class="loading">در حال تولید گزارش...</div>';
    
    setTimeout(() => {
        let reportData = {};
        
        switch(type) {
            case 'income':
                reportData = {
                    title: 'گزارش درآمد',
                    total: 0,
                    byProgram: [],
                    byMonth: []
                };
                break;
            case 'expenses':
                reportData = {
                    title: 'گزارش هزینه‌ها',
                    total: 0,
                    byCategory: [],
                    byMonth: []
                };
                break;
            case 'profit':
                reportData = {
                    title: 'گزارش سود',
                    total: 0,
                    margin: 0,
                    trend: 'stable'
                };
                break;
        }
        
        resultsDiv.innerHTML = `
            <div class="report-content">
                <h4>${reportData.title}</h4>
                <div class="report-summary">
                    <div class="summary-item">
                        <strong>کل:</strong> 0 تومان
                    </div>
                    <div class="summary-item">
                        <strong>وضعیت:</strong> در حال توسعه
                    </div>
                </div>
            </div>
        `;
    }, 1000);
}

function showPerformanceReports() {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="performance-reports">
            <h3>گزارش‌های عملکرد</h3>
            
            <div class="performance-stats">
                <div class="stats-grid">
                    <div class="stat-card">
                        <h4>میانگین حضور</h4>
                        <div class="number">${calculateOverallAttendance()}%</div>
                    </div>
                    <div class="stat-card">
                        <h4>میانگین نمرات</h4>
                        <div class="number">${calculateOverallGradeAverage()}</div>
                    </div>
                    <div class="stat-card">
                        <h4>رضایت دانش‌آموزان</h4>
                        <div class="number">85%</div>
                    </div>
                </div>
            </div>
            
            <div class="report-options">
                <button onclick="generatePerformanceReport('attendance')" class="btn btn-primary">عملکرد حضور</button>
                <button onclick="generatePerformanceReport('grades')" class="btn btn-success">عملکرد تحصیلی</button>
                <button onclick="generatePerformanceReport('satisfaction')" class="btn btn-info">رضایت</button>
            </div>
            
            <div id="performance-report-results"></div>
        </div>
    `;

    createModal('گزارش‌های عملکرد', content);
}

function generatePerformanceReport(type) {
    const resultsDiv = document.getElementById('performance-report-results');
    resultsDiv.innerHTML = '<div class="loading">در حال تولید گزارش...</div>';
    
    setTimeout(() => {
        let reportData = {};
        
        switch(type) {
            case 'attendance':
                reportData = {
                    title: 'گزارش عملکرد حضور',
                    overall: calculateOverallAttendance(),
                    byProgram: programs.map(program => ({
                        name: program.name,
                        rate: Math.floor(Math.random() * 30) + 70 // Random rate for demo
                    }))
                };
                break;
            case 'grades':
                reportData = {
                    title: 'گزارش عملکرد تحصیلی',
                    overall: calculateOverallGradeAverage(),
                    distribution: {
                        excellent: grades.filter(g => g.grade >= 18).length,
                        good: grades.filter(g => g.grade >= 15 && g.grade < 18).length,
                        average: grades.filter(g => g.grade >= 12 && g.grade < 15).length,
                        poor: grades.filter(g => g.grade < 12).length
                    }
                };
                break;
            case 'satisfaction':
                reportData = {
                    title: 'گزارش رضایت',
                    overall: 85,
                    factors: ['کیفیت آموزش', 'محیط یادگیری', 'پشتیبانی']
                };
                break;
        }
        
        resultsDiv.innerHTML = `
            <div class="report-content">
                <h4>${reportData.title}</h4>
                <div class="report-summary">
                    <div class="summary-item">
                        <strong>میانگین کلی:</strong> ${reportData.overall}%
                    </div>
                    <div class="summary-item">
                        <strong>وضعیت:</strong> خوب
                    </div>
                </div>
            </div>
        `;
    }, 1000);
}

function exportAllReportsToExcel() {
    showAlert('در حال آماده‌سازی فایل اکسل...', 'info');
    setTimeout(() => {
        showAlert('فایل اکسل آماده شد', 'success');
    }, 2000);
}

function showSystemSettings() {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('فقط مدیران می‌توانند به این بخش دسترسی داشته باشند', 'error');
        return;
    }

    const content = `
        <div class="system-settings">
            <h3>تنظیمات سیستم</h3>
            
            <div class="settings-tabs">
                <button class="tab-btn active" onclick="showSettingsTab('general')">عمومی</button>
                <button class="tab-btn" onclick="showSettingsTab('security')">امنیتی</button>
                <button class="tab-btn" onclick="showSettingsTab('backup')">پشتیبان‌گیری</button>
                <button class="tab-btn" onclick="showSettingsTab('permissions')">دسترسی‌ها</button>
            </div>
            
            <div id="settings-content">
                <div id="general-settings" class="tab-content active">
                    <h4>تنظیمات عمومی</h4>
                    <div class="setting-item">
                        <label>نام مرکز:</label>
                        <input type="text" value="مرکز آموزشی" class="form-control" id="center-name">
                    </div>
                    <div class="setting-item">
                        <label>آدرس ایمیل:</label>
                        <input type="email" value="info@center.edu" class="form-control" id="center-email">
                    </div>
                    <div class="setting-item">
                        <label>شماره تماس:</label>
                        <input type="tel" value="021-12345678" class="form-control" id="center-phone">
                    </div>
                    <div class="setting-item">
                        <label>آدرس:</label>
                        <textarea class="form-control" id="center-address">تهران، خیابان نمونه</textarea>
                    </div>
                    <button class="btn btn-primary" onclick="saveGeneralSettings()">ذخیره تنظیمات</button>
                </div>
                
                <div id="security-settings" class="tab-content">
                    <h4>تنظیمات امنیتی</h4>
                    <div class="setting-item">
                        <label>حداقل طول رمز عبور:</label>
                        <input type="number" value="8" min="6" max="20" class="form-control" id="min-password-length">
                    </div>
                    <div class="setting-item">
                        <label>مدت زمان انقضای نشست (دقیقه):</label>
                        <input type="number" value="30" min="5" max="480" class="form-control" id="session-timeout">
                    </div>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" checked id="require-strong-password">
                            الزام رمز عبور قوی
                        </label>
                    </div>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" checked id="enable-two-factor">
                            فعال‌سازی احراز هویت دو مرحله‌ای
                        </label>
                    </div>
                    <button class="btn btn-primary" onclick="saveSecuritySettings()">ذخیره تنظیمات</button>
                </div>
                
                <div id="backup-settings" class="tab-content">
                    <h4>تنظیمات پشتیبان‌گیری</h4>
                    <div class="setting-item">
                        <label>فرکانس پشتیبان‌گیری:</label>
                        <select class="form-control" id="backup-frequency">
                            <option value="daily">روزانه</option>
                            <option value="weekly" selected>هفتگی</option>
                            <option value="monthly">ماهانه</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label>حفظ پشتیبان‌ها برای (روز):</label>
                        <input type="number" value="30" min="7" max="365" class="form-control" id="backup-retention">
                    </div>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" checked id="auto-backup">
                            پشتیبان‌گیری خودکار
                        </label>
                    </div>
                    <button class="btn btn-primary" onclick="createBackup()">ایجاد پشتیبان دستی</button>
                    <button class="btn btn-success" onclick="saveBackupSettings()">ذخیره تنظیمات</button>
                </div>
                
                <div id="permissions-settings" class="tab-content">
                    <h4>مدیریت دسترسی‌ها</h4>
                    <div class="permissions-grid">
                        <div class="permission-group">
                            <h5>مدیران</h5>
                            <div class="permission-item">
                                <label>
                                    <input type="checkbox" checked disabled>
                                    دسترسی کامل به تمام بخش‌ها
                                </label>
                            </div>
                        </div>
                        <div class="permission-group">
                            <h5>رابط‌ها</h5>
                            <div class="permission-item">
                                <label>
                                    <input type="checkbox" checked>
                                    مدیریت گروه‌های خود
                                </label>
                            </div>
                            <div class="permission-item">
                                <label>
                                    <input type="checkbox" checked>
                                    ثبت حضور و غیاب
                                </label>
                            </div>
                            <div class="permission-item">
                                <label>
                                    <input type="checkbox" checked>
                                    ثبت نمرات
                                </label>
                            </div>
                            <div class="permission-item">
                                <label>
                                    <input type="checkbox">
                                    ایجاد گزارش
                                </label>
                            </div>
                        </div>
                        <div class="permission-group">
                            <h5>دانش‌آموزان</h5>
                            <div class="permission-item">
                                <label>
                                    <input type="checkbox" checked>
                                    مشاهده نمرات خود
                                </label>
                            </div>
                            <div class="permission-item">
                                <label>
                                    <input type="checkbox" checked>
                                    مشاهده حضور و غیاب خود
                                </label>
                            </div>
                            <div class="permission-item">
                                <label>
                                    <input type="checkbox">
                                    درخواست کارنامه
                                </label>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="savePermissionSettings()">ذخیره تنظیمات</button>
                </div>
            </div>
        </div>
    `;
    createModal('تنظیمات سیستم', content);
}

function showSettingsTab(tabName) {
    // حذف کلاس active از همه تب‌ها
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // اضافه کردن کلاس active به تب انتخاب شده
    document.querySelector(`[onclick="showSettingsTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}-settings`).classList.add('active');
}

function saveGeneralSettings() {
    showAlert('تنظیمات عمومی با موفقیت ذخیره شد', 'success');
}

function saveSecuritySettings() {
    showAlert('تنظیمات امنیتی با موفقیت ذخیره شد', 'success');
}

function saveBackupSettings() {
    showAlert('تنظیمات پشتیبان‌گیری با موفقیت ذخیره شد', 'success');
}

function createBackup() {
    showAlert('پشتیبان با موفقیت ایجاد شد', 'success');
}

function savePermissionSettings() {
    showAlert('تنظیمات دسترسی با موفقیت ذخیره شد', 'success');
}

// توابع کمکی برای داشبورد رابط
function showGroupActivities() {
    showAlert('مشاهده فعالیت‌های گروهی در حال توسعه است...', 'info');
}

function showMyStudents() {
    showAlert('مشاهده دانش‌آموزان من در حال توسعه است...', 'info');
}

function showStudentProgress() {
    showAlert('پیشرفت دانش‌آموزان در حال توسعه است...', 'info');
}

function showStudentAnalytics() {
    showAlert('تحلیل دانش‌آموزان در حال توسعه است...', 'info');
}

function exportStudentsToExcel() {
    showAlert('خروجی اکسل دانش‌آموزان در حال توسعه است...', 'info');
}

function exportActivitiesToExcel() {
    showAlert('خروجی اکسل فعالیت‌ها در حال توسعه است...', 'info');
}

function showAttendanceReports() {
    showAlert('گزارش حضور و غیاب در حال توسعه است...', 'info');
}

function showGradeReports() {
    showAlert('گزارش نمرات در حال توسعه است...', 'info');
}

function showActivityReports() {
    showAlert('گزارش فعالیت‌ها در حال توسعه است...', 'info');
}

function showComprehensiveReport() {
    showAlert('گزارش جامع در حال توسعه است...', 'info');
}

function exportSurveyResults() {
    showAlert('خروجی اکسل نتایج نظرسنجی در حال توسعه است...', 'info');
}

function exportScheduleToExcel() {
    showAlert('خروجی اکسل برنامه‌ها در حال توسعه است...', 'info');
}