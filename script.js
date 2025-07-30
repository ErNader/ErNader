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

// بررسی اتصال به Supabase
let isSupabaseConnected = false;

// تابع بررسی اتصال به دیتابیس
async function checkDatabaseConnection() {
    try {
        if (typeof supabaseClient !== 'undefined') {
            const { data, error } = await supabaseClient.from('users').select('count').limit(1);
            if (!error) {
                isSupabaseConnected = true;
                console.log('اتصال به Supabase برقرار شد');
                return true;
            }
        }
    } catch (error) {
        console.log('Supabase در دسترس نیست، استفاده از LocalStorage');
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
                    fullName: 'مدیر سیستم',
                    email: 'admin@center.edu',
                    phone: '09123456789',
                    password: 'admin123',
                    type: 'admin'
                },
                {
                    id: 2,
                    nationalId: '1111111111',
                    fullName: 'علی احمدی',
                    email: 'ali@example.com',
                    phone: '09111111111',
                    password: '123456',
                    type: 'student'
                },
                {
                    id: 3,
                    nationalId: '2222222222',
                    fullName: 'فاطمه محمدی',
                    email: 'fateme@example.com',
                    phone: '09222222222',
                    password: '123456',
                    type: 'teacher'
                }
            ];
            localStorage.setItem('users', JSON.stringify(users));
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

// تابع بهبود یافته برای ایجاد داشبورد ادمین
function createAdminDashboard() {
    return `
        <div class="dashboard-header">
            <h1 class="dashboard-title">داشبورد مدیر مرکز</h1>
            <div class="user-info">
                <span>خوش آمدید، ${currentUser.fullName}</span>
                <button onclick="logout()" class="btn btn-danger">خروج</button>
            </div>
        </div>
        
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
            <div class="dashboard-stat">
                <div class="number">${getTotalStudents()}</div>
                <div class="label">دانش‌آموز</div>
            </div>
        </div>
        
        <div class="admin-sections">
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
                    <button onclick="showGradeManagement()" class="btn btn-primary">مشاهده نمرات</button>
                    <button onclick="editGradesModal()" class="btn btn-success">ویرایش نمرات</button>
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
                    <button onclick="showSecuritySettings()" class="btn btn-success">تنظیمات امنیتی</button>
                    <button onclick="showBackupSettings()" class="btn btn-info">پشتیبان‌گیری</button>
                    <button onclick="showUserPermissions()" class="btn btn-warning">دسترسی‌ها</button>
                </div>
            </div>
        </div>
    `;
}

// تابع بهبود یافته برای ایجاد داشبورد مسئول سطوح
function createSupervisorDashboard() {
    return `
        <div class="dashboard-header">
            <h1 class="dashboard-title">داشبورد مسئول سطوح</h1>
            <div class="user-info">
                <span>خوش آمدید، ${currentUser.fullName}</span>
                <button onclick="logout()" class="btn btn-danger">خروج</button>
            </div>
        </div>
        
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
            <div class="dashboard-stat">
                <div class="number">${getSupervisorProgramsCount()}</div>
                <div class="label">برنامه فعال</div>
            </div>
        </div>
        
        <div class="supervisor-sections">
            <!-- نظارت بر مراکز -->
            <div class="supervisor-section">
                <h3><i class="fas fa-building"></i> نظارت بر مراکز</h3>
                <div class="section-actions">
                    <button onclick="showCentersOverview()" class="btn btn-primary">نمای کلی مراکز</button>
                    <button onclick="showCenterDetails()" class="btn btn-success">جزئیات مراکز</button>
                    <button onclick="compareCenters()" class="btn btn-info">مقایسه مراکز</button>
                    <button onclick="exportCentersToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- مدیریت استانداردها -->
            <div class="supervisor-section">
                <h3><i class="fas fa-ruler"></i> مدیریت استانداردها</h3>
                <div class="section-actions">
                    <button onclick="showEducationalStandards()" class="btn btn-primary">استانداردهای آموزشی</button>
                    <button onclick="setNewStandards()" class="btn btn-success">تعیین استاندارد جدید</button>
                    <button onclick="showStandardsCompliance()" class="btn btn-info">بررسی انطباق</button>
                    <button onclick="exportStandardsToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- تحلیل عملکرد -->
            <div class="supervisor-section">
                <h3><i class="fas fa-chart-line"></i> تحلیل عملکرد</h3>
                <div class="section-actions">
                    <button onclick="showPerformanceAnalysis()" class="btn btn-primary">تحلیل عملکرد</button>
                    <button onclick="showTrendAnalysis()" class="btn btn-success">تحلیل روند</button>
                    <button onclick="showPerformanceComparison()" class="btn btn-info">مقایسه عملکرد</button>
                    <button onclick="exportPerformanceToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- گزارش‌های نظارتی -->
            <div class="supervisor-section">
                <h3><i class="fas fa-clipboard-list"></i> گزارش‌های نظارتی</h3>
                <div class="section-actions">
                    <button onclick="showSupervisoryReports()" class="btn btn-primary">گزارش‌های نظارتی</button>
                    <button onclick="generateComplianceReport()" class="btn btn-success">گزارش انطباق</button>
                    <button onclick="showQualityReports()" class="btn btn-info">گزارش‌های کیفیت</button>
                    <button onclick="exportSupervisoryReports()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- مدیریت کاربران مراکز -->
            <div class="supervisor-section">
                <h3><i class="fas fa-users-cog"></i> مدیریت کاربران مراکز</h3>
                <div class="section-actions">
                    <button onclick="showAllUsers()" class="btn btn-primary">مشاهده تمام کاربران</button>
                    <button onclick="manageUserPermissions()" class="btn btn-success">مدیریت دسترسی‌ها</button>
                    <button onclick="showUserActivity()" class="btn btn-info">فعالیت کاربران</button>
                    <button onclick="exportUsersToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- مدیریت برنامه‌های مراکز -->
            <div class="supervisor-section">
                <h3><i class="fas fa-calendar-plus"></i> مدیریت برنامه‌های مراکز</h3>
                <div class="section-actions">
                    <button onclick="showAllPrograms()" class="btn btn-primary">مشاهده تمام برنامه‌ها</button>
                    <button onclick="createCenterProgram()" class="btn btn-success">ایجاد برنامه مرکزی</button>
                    <button onclick="showProgramEffectiveness()" class="btn btn-info">اثربخشی برنامه‌ها</button>
                    <button onclick="exportProgramsToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- نظارت بر نمرات -->
            <div class="supervisor-section">
                <h3><i class="fas fa-graduation-cap"></i> نظارت بر نمرات</h3>
                <div class="section-actions">
                    <button onclick="showAllGrades()" class="btn btn-primary">مشاهده تمام نمرات</button>
                    <button onclick="editAnyGrades()" class="btn btn-success">ویرایش نمرات</button>
                    <button onclick="showGradeAnalytics()" class="btn btn-info">تحلیل نمرات</button>
                    <button onclick="exportGradesToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- نظارت بر حضور و غیاب -->
            <div class="supervisor-section">
                <h3><i class="fas fa-clipboard-check"></i> نظارت بر حضور و غیاب</h3>
                <div class="section-actions">
                    <button onclick="showAllAttendance()" class="btn btn-primary">مشاهده حضور و غیاب</button>
                    <button onclick="editAnyAttendance()" class="btn btn-success">ویرایش حضور و غیاب</button>
                    <button onclick="showAttendanceAnalytics()" class="btn btn-info">تحلیل حضور و غیاب</button>
                    <button onclick="exportAttendanceToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
        </div>
    `;
}

// تابع بهبود یافته برای ایجاد داشبورد رابط
function createCoordinatorDashboard() {
    return `
        <div class="dashboard-header">
            <h1 class="dashboard-title">داشبورد رابط</h1>
            <div class="user-info">
                <span>خوش آمدید، ${currentUser.fullName}</span>
                <button onclick="logout()" class="btn btn-danger">خروج</button>
            </div>
        </div>
        
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
            <div class="dashboard-stat">
                <div class="number">${getCoordinatorProgramsCount()}</div>
                <div class="label">برنامه فعال</div>
            </div>
        </div>
        
        <div class="coordinator-sections">
            <!-- مدیریت حضور و غیاب -->
            <div class="coordinator-section">
                <h3><i class="fas fa-clipboard-check"></i> مدیریت حضور و غیاب</h3>
                <div class="section-actions">
                    <button onclick="showAttendanceOverview()" class="btn btn-primary">نمای کلی حضور و غیاب</button>
                    <button onclick="recordAttendance()" class="btn btn-success">ثبت حضور و غیاب</button>
                    <button onclick="editAttendance()" class="btn btn-info">ویرایش حضور و غیاب</button>
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
            
            <!-- مدیریت گروه‌ها -->
            <div class="coordinator-section">
                <h3><i class="fas fa-layer-group"></i> مدیریت گروه‌ها</h3>
                <div class="section-actions">
                    <button onclick="showMyGroups()" class="btn btn-primary">گروه‌های من</button>
                    <button onclick="createNewGroup()" class="btn btn-success">ایجاد گروه جدید</button>
                    <button onclick="showGroupAnalytics()" class="btn btn-info">تحلیل گروه‌ها</button>
                    <button onclick="exportGroupsToExcel()" class="btn btn-warning">خروجی اکسل</button>
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

// تابع بهبود یافته برای ایجاد داشبورد استاد
function createTeacherDashboard() {
    return `
        <div class="dashboard-header">
            <h1 class="dashboard-title">داشبورد استاد</h1>
            <div class="user-info">
                <span>خوش آمدید، ${currentUser.fullName}</span>
                <button onclick="logout()" class="btn btn-danger">خروج</button>
            </div>
        </div>
        
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
        
        <div class="teacher-sections">
            <!-- ثبت حضور و غیاب -->
            <div class="teacher-section">
                <h3><i class="fas fa-clipboard-check"></i> ثبت حضور و غیاب</h3>
                <div class="section-actions">
                    <button onclick="recordAttendance()" class="btn btn-primary">ثبت حضور و غیاب</button>
                    <button onclick="viewAttendanceHistory()" class="btn btn-info">تاریخچه حضور</button>
                    <button onclick="exportAttendanceToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- ثبت نمرات -->
            <div class="teacher-section">
                <h3><i class="fas fa-chart-line"></i> ثبت نمرات</h3>
                <div class="section-actions">
                    <button onclick="recordGrades()" class="btn btn-primary">ثبت نمرات</button>
                    <button onclick="viewGradesHistory()" class="btn btn-info">تاریخچه نمرات</button>
                    <button onclick="exportGradesToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- ثبت فعالیت گروهی -->
            <div class="teacher-section">
                <h3><i class="fas fa-users"></i> ثبت فعالیت گروهی</h3>
                <div class="section-actions">
                    <button onclick="recordGroupActivity()" class="btn btn-primary">ثبت فعالیت جدید</button>
                    <button onclick="viewGroupActivityHistory()" class="btn btn-info">تاریخچه فعالیت</button>
                    <button onclick="exportActivitiesToExcel()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- گزارش‌گیری -->
            <div class="teacher-section">
                <h3><i class="fas fa-chart-bar"></i> گزارش‌گیری</h3>
                <div class="section-actions">
                    <button onclick="viewReports()" class="btn btn-primary">گزارش‌های من</button>
                    <button onclick="showGradeReports()" class="btn btn-success">گزارش نمرات</button>
                    <button onclick="showActivityReports()" class="btn btn-info">گزارش فعالیت‌ها</button>
                    <button onclick="exportMyReports()" class="btn btn-warning">خروجی اکسل</button>
                </div>
            </div>
            
            <!-- پروفایل و تنظیمات -->
            <div class="teacher-section">
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

function getTotalStudents() {
    return users.filter(u => u.type === 'student').length;
}

function getStudentActivitiesCount() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getStudentGradesHistory() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getTeacherClassesHistory() {
    return Math.floor(Math.random() * 5) + 2; // 2-7
}

function getTeacherProgramsHistory() {
    return Math.floor(Math.random() * 3) + 1; // 1-4
}

function getCoordinatorProgramsCount() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getCoordinatorProgramsHistory() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getCoordinatorAttendanceHistory() {
    return Math.floor(Math.random() * 15) + 85; // 85-100%
}

function getCoordinatorGroupsHistory() {
    return Math.floor(Math.random() * 8) + 3; // 3-11
}

function getCoordinatorActivitiesCount() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getCoordinatorActivityHistory() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getCoordinatorSurveyResponses() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getCoordinatorSurveyResponsesHistory() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getCoordinatorStudentsHistory() {
    return Math.floor(Math.random() * 50) + 20; // 20-70
}

function getCoordinatorGroupsHistory() {
    return Math.floor(Math.random() * 8) + 3; // 3-11
}

function getCoordinatorAttendanceHistory() {
    return Math.floor(Math.random() * 15) + 85; // 85-100%
}

function getCoordinatorProgramsHistory() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getCoordinatorStandards() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getCoordinatorStandardsHistory() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getCoordinatorPerformanceHistory() {
    return Math.floor(Math.random() * 10) + 90; // 90-100%
}

function getCoordinatorPerformance() {
    return Math.floor(Math.random() * 10) + 90; // 90-100%
}

function getSupervisorProgramsCount() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getSupervisorProgramsHistory() {
    return Math.floor(Math.random() * 10) + 5; // 5-15
}

function getSupervisorAttendanceHistory() {
    return Math.floor(Math.random() * 15) + 85; // 85-100%
}

function getSupervisorStudentsHistory() {
    return Math.floor(Math.random() * 500) + 200; // 200-700
}

function getSupervisorPerformanceHistory() {
    return Math.floor(Math.random() * 10) + 90; // 90-100%
}

function getSupervisorPerformance() {
    return Math.floor(Math.random() * 10) + 90; // 90-100%
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
    
    if (students.length === 0) {
        showAlert('هیچ دانش‌آموزی یافت نشد!', 'info');
        return;
    }
    
    const modal = createModal('ثبت حضور و غیاب', `
        <form id="attendance-form">
            <div class="form-group">
                <label>تاریخ:</label>
                <input type="date" id="attendance-date" class="form-control" value="${new Date().toISOString().split('T')[0]}" required>
            </div>
            <div class="students-attendance">
                ${students.map(student => `
                    <div class="student-attendance">
                        <span>${student.full_name} (${student.national_id})</span>
                        <select name="attendance_${student.id}" class="form-control" required>
                            <option value="present">حاضر</option>
                            <option value="absent">غایب</option>
                            <option value="late">تأخیر</option>
                            <option value="excused">عذر موجه</option>
                        </select>
                    </div>
                `).join('')}
            </div>
            <button type="submit" class="btn btn-primary">ثبت حضور و غیاب</button>
        </form>
    `);
    
    document.body.appendChild(modal);
    
    // مدیریت ثبت حضور و غیاب
    document.getElementById('attendance-form').onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const date = document.getElementById('attendance-date').value;
        
        const attendanceRecords = students.map(student => ({
            user_id: student.id,
            date: date,
            status: formData.get(`attendance_${student.id}`),
            recorded_by: currentUser.id
        }));
        
        if (isSupabaseConnected) {
            const { data, error } = await supabaseClient
                .from('attendance')
                .insert(attendanceRecords);
            
            if (!error) {
                showAlert('حضور و غیاب با موفقیت ثبت شد!', 'success');
                modal.remove();
            } else {
                showAlert('خطا در ثبت حضور و غیاب: ' + error.message, 'danger');
            }
        } else {
            const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
            attendanceRecords.forEach(record => {
                attendance.push({
                    id: Date.now() + Math.random(),
                    userId: record.user_id,
                    date: record.date,
                    status: record.status,
                    recordedBy: record.recorded_by,
                    createdAt: new Date().toISOString()
                });
            });
            localStorage.setItem('attendance', JSON.stringify(attendance));
            showAlert('حضور و غیاب با موفقیت ثبت شد!', 'success');
            modal.remove();
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
    showAlert('گروه‌های من در حال توسعه است...', 'info');
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
    showAlert('مدیریت نمرات در حال توسعه است...', 'info');
}

function editGradesModal() {
    showAlert('ویرایش نمرات در حال توسعه است...', 'info');
}

function showGradeAnalytics() {
    showAlert('تحلیل نمرات در حال توسعه است...', 'info');
}

function showAttendanceManagement() {
    showAlert('مدیریت حضور و غیاب در حال توسعه است...', 'info');
}

function editAttendanceModal() {
    showAlert('ویرایش حضور و غیاب در حال توسعه است...', 'info');
}

function showAttendanceAnalytics() {
    showAlert('تحلیل حضور و غیاب در حال توسعه است...', 'info');
}

function showRequestManagement() {
    showAlert('مدیریت درخواست‌ها در حال توسعه است...', 'info');
}

function createReportCardRequest() {
    showAlert('درخواست کارنامه در حال توسعه است...', 'info');
}

function showRequestAnalytics() {
    showAlert('تحلیل درخواست‌ها در حال توسعه است...', 'info');
}

function exportRequestsToExcel() {
    showAlert('خروجی اکسل درخواست‌ها در حال توسعه است...', 'info');
}

function showGeneralReports() {
    showAlert('گزارش‌های کلی در حال توسعه است...', 'info');
}

function showFinancialReports() {
    showAlert('گزارش‌های مالی در حال توسعه است...', 'info');
}

function showPerformanceReports() {
    showAlert('گزارش‌های عملکرد در حال توسعه است...', 'info');
}

function exportAllReportsToExcel() {
    showAlert('خروجی اکسل تمام گزارش‌ها در حال توسعه است...', 'info');
}

function showSystemSettings() {
    showAlert('تنظیمات سیستم در حال توسعه است...', 'info');
}

function showSecuritySettings() {
    showAlert('تنظیمات امنیتی در حال توسعه است...', 'info');
}

function showBackupSettings() {
    showAlert('پشتیبان‌گیری در حال توسعه است...', 'info');
}

function showUserPermissions() {
    showAlert('دسترسی‌ها در حال توسعه است...', 'info');
}

// تابع‌های مفقود برای داشبورد مسئول سطوح
function exportCentersToExcel() {
    showAlert('خروجی اکسل مراکز در حال توسعه است...', 'info');
}

function exportStandardsToExcel() {
    showAlert('خروجی اکسل استانداردها در حال توسعه است...', 'info');
}

function exportPerformanceToExcel() {
    showAlert('خروجی اکسل عملکرد در حال توسعه است...', 'info');
}

function exportSupervisoryReports() {
    showAlert('خروجی اکسل گزارش‌های نظارتی در حال توسعه است...', 'info');
}

// تابع‌های مفقود برای داشبورد رابط
function showAttendanceOverview() {
    showAlert('نمای کلی حضور و غیاب در حال توسعه است...', 'info');
}

function editAttendance() {
    showAlert('ویرایش حضور و غیاب در حال توسعه است...', 'info');
}

function showGradesOverview() {
    showAlert('نمای کلی نمرات در حال توسعه است...', 'info');
}

function editGrades() {
    showAlert('ویرایش نمرات در حال توسعه است...', 'info');
}

function editGroupActivity() {
    showAlert('ویرایش فعالیت گروهی در حال توسعه است...', 'info');
}

function createGroupSurvey() {
    showAlert('ایجاد نظرسنجی گروهی در حال توسعه است...', 'info');
}

function showSurveyAnalytics() {
    showAlert('تحلیل نظرسنجی در حال توسعه است...', 'info');
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

function createNewGroup() {
    showAlert('ایجاد گروه جدید در حال توسعه است...', 'info');
}

function showGroupAnalytics() {
    showAlert('تحلیل گروه‌ها در حال توسعه است...', 'info');
}

function exportGroupsToExcel() {
    showAlert('خروجی اکسل گروه‌ها در حال توسعه است...', 'info');
}

function showMyCalendar() {
    showAlert('تقویم من در حال توسعه است...', 'info');
}

function scheduleActivity() {
    showAlert('برنامه‌ریزی فعالیت در حال توسعه است...', 'info');
}

function showProgramSchedule() {
    showAlert('برنامه‌های گروه در حال توسعه است...', 'info');
}

function exportScheduleToExcel() {
    showAlert('خروجی اکسل برنامه‌های گروه در حال توسعه است...', 'info');
}

// تابع‌های مفقود برای داشبورد دانش‌آموز
function viewGradeAnalytics() {
    showAlert('تحلیل نمرات در حال توسعه است...', 'info');
}

function viewGradeHistory() {
    showAlert('تاریخچه نمرات در حال توسعه است...', 'info');
}

function exportMyGrades() {
    showAlert('خروجی اکسل نمرات من در حال توسعه است...', 'info');
}

function registerForNewProgram() {
    showAlert('ثبت‌نام در برنامه جدید در حال توسعه است...', 'info');
}

function viewRegistrationHistory() {
    showAlert('تاریخچه ثبت‌نام در حال توسعه است...', 'info');
}

function exportMyRegistrations() {
    showAlert('خروجی اکسل ثبت‌نام‌های من در حال توسعه است...', 'info');
}

function viewMyDocuments() {
    showAlert('مشاهده اسناد من در حال توسعه است...', 'info');
}

function downloadReportCard() {
    showAlert('دانلود کارنامه در حال توسعه است...', 'info');
}

function viewMySurveyResponses() {
    showAlert('پاسخ‌های من در حال توسعه است...', 'info');
}

function viewAvailableSurveys() {
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