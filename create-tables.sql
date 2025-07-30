-- اسکریپت ایجاد جداول برای سیستم مدیریت مرکز آموزشی
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
    birth_date DATE,
    education_level VARCHAR(50),
    parent_name VARCHAR(255),
    parent_phone VARCHAR(15),
    address TEXT,
    emergency_contact VARCHAR(15),
    medical_info TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول ثبت‌نام‌ها
CREATE TABLE IF NOT EXISTS registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    program_type VARCHAR(50) NOT NULL,
    program_name VARCHAR(255),
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending',
    payment_status VARCHAR(50) DEFAULT 'pending',
    amount DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول حضور و غیاب
CREATE TABLE IF NOT EXISTS attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    program_id UUID REFERENCES programs(id),
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    notes TEXT,
    recorded_by UUID REFERENCES users(id),
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
    recorded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ایجاد ایندکس‌ها
CREATE INDEX IF NOT EXISTS idx_users_national_id ON users(national_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_attendance_user_id ON attendance(user_id);
CREATE INDEX IF NOT EXISTS idx_grades_user_id ON grades(user_id);

-- فعال کردن RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

-- سیاست‌های امنیتی ساده (برای تست)
CREATE POLICY "Enable read access for all users" ON users FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON users FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON registrations FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON registrations FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON programs FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON programs FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON programs FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON attendance FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON attendance FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON attendance FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON grades FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON grades FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON grades FOR UPDATE USING (true);

-- افزودن کاربر ادمین نمونه
INSERT INTO users (national_id, full_name, email, phone, password, role) 
VALUES ('1234567890', 'مدیر سیستم', 'admin@center.edu', '09123456789', 'admin123', 'admin')
ON CONFLICT (national_id) DO NOTHING;

-- افزودن کاربر دانش‌آموز نمونه
INSERT INTO users (national_id, full_name, email, phone, password, role) 
VALUES ('1111111111', 'علی احمدی', 'ali@example.com', '09111111111', '123456', 'student')
ON CONFLICT (national_id) DO NOTHING;

-- افزودن کاربر استاد نمونه
INSERT INTO users (national_id, full_name, email, phone, password, role) 
VALUES ('2222222222', 'فاطمه محمدی', 'fateme@example.com', '09222222222', '123456', 'teacher')
ON CONFLICT (national_id) DO NOTHING;

-- نمایش پیام موفقیت
SELECT 'جداول با موفقیت ایجاد شدند!' as message;