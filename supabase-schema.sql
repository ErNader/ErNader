-- ساختار دیتابیس برای سیستم مدیریت مرکز آموزشی

-- جدول کاربران
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    national_id VARCHAR(10) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'student', -- student, teacher, coordinator, admin, supervisor
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
CREATE TABLE registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    program_type VARCHAR(50) NOT NULL, -- admission, camp, yearly
    program_name VARCHAR(255),
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, completed
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, refunded
    amount DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول برنامه‌ها
CREATE TABLE programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL, -- academic, recreational, sports, cultural
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
CREATE TABLE attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    program_id UUID REFERENCES programs(id),
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL, -- present, absent, late, excused
    notes TEXT,
    recorded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول نمرات
CREATE TABLE grades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    program_id UUID REFERENCES programs(id),
    subject VARCHAR(100),
    grade DECIMAL(5,2),
    max_grade DECIMAL(5,2) DEFAULT 20,
    grade_type VARCHAR(50), -- midterm, final, assignment, quiz
    notes TEXT,
    recorded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول فعالیت‌های گروهی
CREATE TABLE group_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    program_id UUID REFERENCES programs(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    activity_date DATE,
    participants JSONB, -- آرایه‌ای از user_id ها
    coordinator_id UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'planned', -- planned, in_progress, completed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول نظرسنجی‌ها
CREATE TABLE surveys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    questions JSONB NOT NULL, -- آرایه‌ای از سوالات
    target_audience VARCHAR(50), -- all, students, teachers, coordinators
    is_active BOOLEAN DEFAULT true,
    start_date DATE,
    end_date DATE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول پاسخ‌های نظرسنجی
CREATE TABLE survey_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    survey_id UUID REFERENCES surveys(id) NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL,
    answers JSONB NOT NULL, -- آرایه‌ای از پاسخ‌ها
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول فایل‌ها
CREATE TABLE documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER,
    document_type VARCHAR(50), -- report_card, certificate, other
    title VARCHAR(255),
    semester VARCHAR(50),
    academic_year INTEGER,
    notes TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول گزارش‌ها
CREATE TABLE reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL, -- attendance, grades, activities, general
    data JSONB,
    generated_by UUID REFERENCES users(id),
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ایجاد ایندکس‌ها برای بهبود عملکرد
CREATE INDEX idx_users_national_id ON users(national_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_registrations_user_id ON registrations(user_id);
CREATE INDEX idx_registrations_program_type ON registrations(program_type);
CREATE INDEX idx_attendance_user_id ON attendance(user_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_grades_user_id ON grades(user_id);
CREATE INDEX idx_grades_program_id ON grades(program_id);
CREATE INDEX idx_survey_responses_survey_id ON survey_responses(survey_id);
CREATE INDEX idx_survey_responses_user_id ON survey_responses(user_id);

-- تابع برای به‌روزرسانی خودکار updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ایجاد trigger برای به‌روزرسانی خودکار
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_group_activities_updated_at BEFORE UPDATE ON group_activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- درج داده‌های نمونه
INSERT INTO programs (name, description, category, duration, max_participants, price, is_active) VALUES
('کلاس‌های تقویتی', 'کلاس‌های تقویتی در دروس مختلف برای دانش‌آموزان', 'academic', '۳ ماه', 15, 2500000, true),
('برنامه‌نویسی', 'آموزش برنامه‌نویسی و مهارت‌های دیجیتال', 'academic', '۶ ماه', 12, 4000000, true),
('اردوهای تفریحی', 'اردوهای متنوع و جذاب در طبیعت', 'recreational', '۳ روز', 30, 1500000, true),
('کلاس‌های هنری', 'آموزش نقاشی، موسیقی و هنرهای تجسمی', 'recreational', '۴ ماه', 10, 3200000, true),
('کلاس‌های ورزشی', 'آموزش انواع ورزش‌ها و فعالیت‌های بدنی', 'sports', '۶ ماه', 20, 2800000, true),
('شنا', 'آموزش شنا برای تمام سنین', 'sports', '۳ ماه', 8, 3500000, true),
('تئاتر و نمایش', 'آموزش هنرهای نمایشی و تئاتر', 'cultural', '۴ ماه', 12, 2900000, true),
('زبان‌های خارجی', 'آموزش زبان انگلیسی، آلمانی و فرانسه', 'cultural', '۸ ماه', 10, 5500000, true);

-- ایجاد کاربر ادمین نمونه
INSERT INTO users (national_id, full_name, email, phone, password, role) VALUES
('1234567890', 'مدیر سیستم', 'admin@center.edu', '09123456789', 'admin123', 'admin');

-- تنظیم RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- سیاست‌های امنیتی (برای مثال ساده، همه چیز قابل خواندن است)
CREATE POLICY "Allow all operations for authenticated users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON registrations FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON programs FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON attendance FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON grades FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON group_activities FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON surveys FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON survey_responses FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON documents FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON reports FOR ALL USING (true);