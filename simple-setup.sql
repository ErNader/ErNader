-- اسکریپت ساده ایجاد جداول اصلی
-- این فایل را در SQL Editor در داشبورد Supabase اجرا کنید

-- جدول کاربران
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    national_id VARCHAR(10) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'student',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول برنامه‌ها
CREATE TABLE IF NOT EXISTS programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    duration VARCHAR(100),
    max_participants INTEGER,
    price DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول حضور و غیاب
CREATE TABLE IF NOT EXISTS attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    program_id UUID REFERENCES programs(id),
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول نمرات
CREATE TABLE IF NOT EXISTS grades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    program_id UUID REFERENCES programs(id),
    subject VARCHAR(100),
    grade DECIMAL(5,2),
    max_grade DECIMAL(5,2) DEFAULT 20,
    grade_type VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول نظرسنجی‌ها
CREATE TABLE IF NOT EXISTS surveys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    questions JSONB NOT NULL,
    target_audience VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ایجاد ایندکس‌های اصلی
CREATE INDEX IF NOT EXISTS idx_users_national_id ON users(national_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_attendance_user_id ON attendance(user_id);
CREATE INDEX IF NOT EXISTS idx_grades_user_id ON grades(user_id);

-- افزودن کاربران تست
INSERT INTO users (national_id, full_name, email, phone, password, role) VALUES
('1234567890', 'مدیر سیستم', 'admin@center.edu', '09123456789', 'admin123', 'admin'),
('1111111111', 'علی احمدی', 'ali@example.com', '09111111111', '123456', 'student'),
('2222222222', 'فاطمه محمدی', 'fateme@example.com', '09222222222', '123456', 'teacher'),
('3333333333', 'حسن رضایی', 'hasan@example.com', '09333333333', '123456', 'coordinator'),
('4444444444', 'مریم کریمی', 'maryam@example.com', '09444444444', '123456', 'supervisor');

-- افزودن برنامه‌های نمونه
INSERT INTO programs (name, description, category, duration, max_participants, price, is_active) VALUES
('کلاس‌های تقویتی', 'کلاس‌های تقویتی در دروس مختلف', 'academic', '۳ ماه', 15, 2500000, true),
('برنامه‌نویسی', 'آموزش برنامه‌نویسی و مهارت‌های دیجیتال', 'academic', '۶ ماه', 12, 4000000, true),
('اردوهای تفریحی', 'اردوهای متنوع و جذاب در طبیعت', 'recreational', '۳ روز', 30, 1500000, true),
('کلاس‌های هنری', 'آموزش نقاشی، موسیقی و هنرهای تجسمی', 'recreational', '۴ ماه', 10, 3200000, true),
('کلاس‌های ورزشی', 'آموزش انواع ورزش‌ها و فعالیت‌های بدنی', 'sports', '۶ ماه', 20, 2800000, true);

-- فعال کردن RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;

-- سیاست‌های امنیتی ساده
CREATE POLICY "Allow all operations" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON programs FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON attendance FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON grades FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON surveys FOR ALL USING (true);

SELECT 'جداول اصلی با موفقیت ایجاد شدند!' as message;