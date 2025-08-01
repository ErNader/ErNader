# راهنمای رفع خطاهای دیتابیس - سیستم مدیریت مرکز آموزشی

## 📋 مشکلات شناسایی شده

### 1. خطاهای توابع تعریف نشده
- `showUserManagement is not defined`
- `addNewUserModal is not defined`
- `showProgramManagement is not defined`
- `showSurveyManagement is not defined`
- `showGradeManagement is not defined`
- `showAttendanceManagement is not defined`

### 2. خطاهای ورود کاربران
- خطا در ورود با نقش student: کاربری یافت نشد
- خطا در ورود با نقش teacher: کاربری یافت نشد
- خطا در ورود با نقش coordinator: کاربری یافت نشد
- خطا در ورود با نقش supervisor: کاربری یافت نشد

### 3. مشکلات دیتابیس
- جداول مورد نیاز در Supabase موجود نیستند
- کاربران تست برای نقش‌های مختلف وجود ندارند
- داده‌های نمونه در دیتابیس موجود نیستند

## 🛠️ راه‌حل‌های ارائه شده

### مرحله 1: ایجاد جداول دیتابیس

#### روش 1: استفاده از SQL Editor در Supabase
1. وارد داشبورد Supabase شوید
2. به بخش SQL Editor بروید
3. محتوای فایل `create-tables-supabase.sql` را کپی کنید
4. آن را در SQL Editor اجرا کنید

#### روش 2: استفاده از صفحه راه‌اندازی
1. فایل `setup-database.html` را باز کنید
2. روی دکمه "شروع راه‌اندازی" کلیک کنید
3. منتظر بمانید تا تمام جداول ایجاد شوند

#### روش 3: استفاده از صفحه رفع خطا
1. فایل `fix-database.html` را باز کنید
2. روی دکمه "ایجاد جداول گمشده" کلیک کنید
3. سپس روی "افزودن کاربران تست" کلیک کنید

### مرحله 2: افزودن کاربران تست

کاربران تست زیر ایجاد می‌شوند:

| کد ملی | نام | ایمیل | نقش | رمز عبور |
|--------|-----|-------|-----|----------|
| 1234567890 | مدیر سیستم | admin@center.edu | admin | admin123 |
| 1111111111 | علی احمدی | ali@example.com | student | 123456 |
| 2222222222 | فاطمه محمدی | fateme@example.com | teacher | 123456 |
| 3333333333 | حسن رضایی | hasan@example.com | coordinator | 123456 |
| 4444444444 | مریم کریمی | maryam@example.com | supervisor | 123456 |

### مرحله 3: بررسی توابع

تمام توابع مورد نیاز در فایل `script.js` تعریف شده‌اند:

- ✅ `showUserManagement()` - خط 2590
- ✅ `addNewUserModal()` - خط 2683
- ✅ `showProgramManagement()` - خط 2803
- ✅ `showSurveyManagement()` - خط 2992
- ✅ `showGradeManagement()` - خط 3405
- ✅ `showAttendanceManagement()` - خط 3417

### مرحله 4: تست سیستم

#### تست ورود کاربران
1. فایل `fix-database.html` را باز کنید
2. روی دکمه "تست تمام ورودها" کلیک کنید
3. نتایج را بررسی کنید

#### تست توابع
1. فایل `fix-database.html` را باز کنید
2. روی دکمه "تست تمام توابع" کلیک کنید
3. نتایج را بررسی کنید

## 📁 فایل‌های ایجاد شده

### 1. `setup-database.js`
- اسکریپت راه‌اندازی کامل دیتابیس
- توابع ایجاد جداول
- توابع افزودن کاربران تست
- توابع افزودن برنامه‌های نمونه

### 2. `setup-database.html`
- صفحه راه‌اندازی دیتابیس
- رابط کاربری برای اجرای اسکریپت‌ها
- نمایش نتایج و لاگ‌ها

### 3. `fix-database.html`
- صفحه رفع خطاهای دیتابیس
- تست تمام توابع و ورودها
- نمایش نتایج تست‌ها

### 4. `create-tables-supabase.sql`
- اسکریپت SQL برای اجرا در Supabase
- ایجاد تمام جداول مورد نیاز
- افزودن کاربران و برنامه‌های تست

## 🔧 مراحل اجرا

### مرحله 1: راه‌اندازی دیتابیس
```bash
# باز کردن صفحه راه‌اندازی
open setup-database.html

# یا اجرای SQL در Supabase
# کپی کردن محتوای create-tables-supabase.sql
```

### مرحله 2: تست سیستم
```bash
# باز کردن صفحه رفع خطا
open fix-database.html

# اجرای تست‌های کامل
# کلیک روی "اجرای رفع کامل"
```

### مرحله 3: بررسی نتایج
- بررسی لاگ‌های راه‌اندازی
- تست ورود با کاربران مختلف
- بررسی عملکرد توابع مدیریتی

## ✅ نتایج مورد انتظار

پس از اجرای مراحل بالا:

1. **جداول دیتابیس**: تمام جداول مورد نیاز ایجاد می‌شوند
2. **کاربران تست**: 5 کاربر با نقش‌های مختلف ایجاد می‌شوند
3. **برنامه‌های نمونه**: 8 برنامه مختلف ایجاد می‌شوند
4. **توابع مدیریتی**: تمام توابع قابل استفاده می‌شوند
5. **ورود کاربران**: تمام کاربران تست می‌توانند وارد شوند

## 🚨 نکات مهم

### 1. امنیت
- در محیط تولید، سیاست‌های امنیتی سخت‌گیرانه‌تری اعمال کنید
- رمزهای عبور را hash کنید
- دسترسی‌ها را محدود کنید

### 2. عملکرد
- ایندکس‌های مناسب ایجاد شده‌اند
- برای بهبود عملکرد، query optimization انجام دهید

### 3. نگهداری
- به‌روزرسانی‌های منظم انجام دهید
- backup منظم از دیتابیس تهیه کنید
- monitoring و logging اضافه کنید

## 📞 پشتیبانی

در صورت بروز مشکل:

1. لاگ‌های خطا را بررسی کنید
2. وضعیت اتصال به Supabase را چک کنید
3. جداول دیتابیس را بررسی کنید
4. از فایل‌های تست استفاده کنید

## 🎯 نتیجه نهایی

پس از اجرای تمام مراحل، سیستم باید:

- ✅ تمام توابع مدیریتی کار کنند
- ✅ تمام کاربران تست بتوانند وارد شوند
- ✅ تمام جداول دیتابیس موجود باشند
- ✅ داده‌های نمونه در دسترس باشند
- ✅ تست‌ها با موفقیت اجرا شوند