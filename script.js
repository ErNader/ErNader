// داده‌های نمونه برای ذخیره در localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// آمار مرکز
const centerStats = {
    students: 150,
    teachers: 25,
    programs: 12,
    years: 8
};

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

// فرم ثبت‌نام
function handleRegistration(event) {
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
    const existingRegistration = registrations.find(r => r.nationalId === registration.nationalId);
    if (existingRegistration) {
        showAlert('این کد ملی قبلاً ثبت‌نام شده است!', 'danger');
        return;
    }

    registrations.push(registration);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    showAlert('ثبت‌نام با موفقیت انجام شد!', 'success');
    event.target.reset();

    // انتقال به صفحه ورود بعد از 2 ثانیه
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// فرم ورود
function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userType = formData.get('user-type') || document.getElementById('user-type').value;
    const username = formData.get('username') || document.getElementById('username').value;
    const password = formData.get('password') || document.getElementById('password').value;

    // بررسی کاربر در ثبت‌نام‌ها
    const user = registrations.find(r => r.nationalId === username);
    
    if (!user) {
        showAlert('کاربری با این کد ملی یافت نشد!', 'danger');
        return;
    }

    // در حالت واقعی، رمز عبور باید بررسی شود
    // برای این مثال، هر رمزی پذیرفته می‌شود
    if (password.length < 4) {
        showAlert('رمز عبور باید حداقل 4 کاراکتر باشد!', 'danger');
        return;
    }

    // ایجاد کاربر
    const newUser = {
        id: user.id,
        type: userType,
        fullName: user.fullName,
        nationalId: user.nationalId,
        email: user.email,
        phone: user.phone,
        loginTime: new Date().toISOString()
    };

    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    showAlert('ورود موفقیت‌آمیز بود!', 'success');

    // انتقال به داشبورد مناسب
    setTimeout(() => {
        window.location.href = `dashboard.html?type=${userType}`;
    }, 1500);
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
        case 'teacher':
            dashboardContent += createTeacherDashboard();
            break;
        case 'coordinator':
            dashboardContent += createCoordinatorDashboard();
            break;
        case 'admin':
            dashboardContent += createAdminDashboard();
            break;
        case 'supervisor':
            dashboardContent += createSupervisorDashboard();
            break;
    }

    dashboardContainer.innerHTML = dashboardContent;
}

function getUserTypeTitle(type) {
    const titles = {
        'student': 'دانش‌آموز',
        'teacher': 'استاد',
        'coordinator': 'رابط',
        'admin': 'مدیر مرکز',
        'supervisor': 'مسئول سطوح'
    };
    return titles[type] || 'کاربر';
}

function createStudentDashboard() {
    return `
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
        </div>
        
        <div class="dashboard-actions">
            <h3>عملیات دانش‌آموز</h3>
            <div class="action-buttons">
                <button onclick="uploadReportCard()" class="btn btn-primary">آپلود کارنامه</button>
                <button onclick="viewGrades()" class="btn btn-secondary">مشاهده نمرات</button>
                <button onclick="takeSurvey()" class="btn btn-success">نظرسنجی</button>
                <button onclick="viewPrograms()" class="btn btn-info">برنامه‌های من</button>
            </div>
        </div>
    `;
}

function createTeacherDashboard() {
    return `
        <div class="dashboard-stats">
            <div class="dashboard-stat">
                <div class="number">${getTeacherStudentsCount()}</div>
                <div class="label">دانش‌آموز</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${getTeacherClassesCount()}</div>
                <div class="label">کلاس</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${getTeacherProgramsCount()}</div>
                <div class="label">برنامه</div>
            </div>
        </div>
        
        <div class="dashboard-actions">
            <h3>عملیات استاد</h3>
            <div class="action-buttons">
                <button onclick="recordAttendance()" class="btn btn-primary">ثبت حضور و غیاب</button>
                <button onclick="recordGrades()" class="btn btn-secondary">ثبت نمرات</button>
                <button onclick="recordActivity()" class="btn btn-success">ثبت فعالیت گروهی</button>
                <button onclick="viewReports()" class="btn btn-info">گزارش‌گیری</button>
            </div>
        </div>
    `;
}

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
                <div class="number">${getCoordinatorAttendance()}</div>
                <div class="label">درصد حضور کلی</div>
            </div>
        </div>
        
        <div class="dashboard-actions">
            <h3>عملیات رابط</h3>
            <div class="action-buttons">
                <button onclick="viewAttendance()" class="btn btn-primary">مشاهده حضور و غیاب</button>
                <button onclick="recordGroupActivity()" class="btn btn-secondary">ثبت فعالیت گروهی</button>
                <button onclick="recordFinalGrade()" class="btn btn-success">ثبت نمره پایان ترم</button>
                <button onclick="generateReports()" class="btn btn-info">گزارش‌گیری</button>
                <button onclick="viewSurveyResults()" class="btn btn-warning">نتایج نظرسنجی</button>
            </div>
        </div>
    `;
}

function createAdminDashboard() {
    return `
        <div class="dashboard-stats">
            <div class="dashboard-stat">
                <div class="number">${registrations.length}</div>
                <div class="label">کل ثبت‌نام‌ها</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${centerStats.teachers}</div>
                <div class="label">استاد</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${centerStats.programs}</div>
                <div class="label">برنامه فعال</div>
            </div>
        </div>
        
        <div class="dashboard-actions">
            <h3>عملیات مدیر</h3>
            <div class="action-buttons">
                <button onclick="manageUsers()" class="btn btn-primary">مدیریت کاربران</button>
                <button onclick="managePrograms()" class="btn btn-secondary">مدیریت برنامه‌ها</button>
                <button onclick="viewAllReports()" class="btn btn-success">گزارش‌های کلی</button>
                <button onclick="systemSettings()" class="btn btn-info">تنظیمات سیستم</button>
            </div>
        </div>
    `;
}

function createSupervisorDashboard() {
    return `
        <div class="dashboard-stats">
            <div class="dashboard-stat">
                <div class="number">${getSupervisorCentersCount()}</div>
                <div class="label">مرکز تحت نظارت</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${getSupervisorStudentsCount()}</div>
                <div class="label">کل دانش‌آموز</div>
            </div>
            <div class="dashboard-stat">
                <div class="number">${getSupervisorPerformance()}</div>
                <div class="label">عملکرد کلی</div>
            </div>
        </div>
        
        <div class="dashboard-actions">
            <h3>عملیات مسئول سطوح</h3>
            <div class="action-buttons">
                <button onclick="superviseCenters()" class="btn btn-primary">نظارت بر مراکز</button>
                <button onclick="generateSupervisorReports()" class="btn btn-secondary">گزارش‌های نظارتی</button>
                <button onclick="manageStandards()" class="btn btn-success">مدیریت استانداردها</button>
                <button onclick="performanceAnalysis()" class="btn btn-info">تحلیل عملکرد</button>
            </div>
        </div>
    `;
}

// توابع کمکی برای آمار
function getStudentProgramsCount() {
    return registrations.filter(r => r.nationalId === currentUser.nationalId).length;
}

function getStudentAttendance() {
    return Math.floor(Math.random() * 20) + 80; // 80-100%
}

function getStudentGrades() {
    return (Math.random() * 5 + 15).toFixed(1); // 15-20
}

function getTeacherStudentsCount() {
    return Math.floor(Math.random() * 30) + 10; // 10-40
}

function getTeacherClassesCount() {
    return Math.floor(Math.random() * 5) + 2; // 2-7
}

function getTeacherProgramsCount() {
    return Math.floor(Math.random() * 3) + 1; // 1-4
}

function getCoordinatorStudentsCount() {
    return Math.floor(Math.random() * 50) + 20; // 20-70
}

function getCoordinatorGroupsCount() {
    return Math.floor(Math.random() * 8) + 3; // 3-11
}

function getCoordinatorAttendance() {
    return Math.floor(Math.random() * 15) + 85; // 85-100%
}

function getSupervisorCentersCount() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getSupervisorStudentsCount() {
    return Math.floor(Math.random() * 500) + 200; // 200-700
}

function getSupervisorPerformance() {
    return Math.floor(Math.random() * 10) + 90; // 90-100%
}

// توابع عملیات (نمونه)
function uploadReportCard() {
    alert('قابلیت آپلود کارنامه در حال توسعه است');
}

function viewGrades() {
    alert('مشاهده نمرات در حال توسعه است');
}

function takeSurvey() {
    alert('نظرسنجی در حال توسعه است');
}

function viewPrograms() {
    alert('مشاهده برنامه‌ها در حال توسعه است');
}

function recordAttendance() {
    alert('ثبت حضور و غیاب در حال توسعه است');
}

function recordGrades() {
    alert('ثبت نمرات در حال توسعه است');
}

function recordActivity() {
    alert('ثبت فعالیت گروهی در حال توسعه است');
}

function viewReports() {
    alert('گزارش‌گیری در حال توسعه است');
}

function viewAttendance() {
    alert('مشاهده حضور و غیاب در حال توسعه است');
}

function recordGroupActivity() {
    alert('ثبت فعالیت گروهی در حال توسعه است');
}

function recordFinalGrade() {
    alert('ثبت نمره پایان ترم در حال توسعه است');
}

function generateReports() {
    alert('گزارش‌گیری در حال توسعه است');
}

function viewSurveyResults() {
    alert('نتایج نظرسنجی در حال توسعه است');
}

function manageUsers() {
    alert('مدیریت کاربران در حال توسعه است');
}

function managePrograms() {
    alert('مدیریت برنامه‌ها در حال توسعه است');
}

function viewAllReports() {
    alert('گزارش‌های کلی در حال توسعه است');
}

function systemSettings() {
    alert('تنظیمات سیستم در حال توسعه است');
}

function superviseCenters() {
    alert('نظارت بر مراکز در حال توسعه است');
}

function generateSupervisorReports() {
    alert('گزارش‌های نظارتی در حال توسعه است');
}

function manageStandards() {
    alert('مدیریت استانداردها در حال توسعه است');
}

function performanceAnalysis() {
    alert('تحلیل عملکرد در حال توسعه است');
}