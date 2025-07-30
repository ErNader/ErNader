// اسکریپت راه‌اندازی کامل دیتابیس
// این فایل تمام جداول مورد نیاز را ایجاد می‌کند و داده‌های تست را اضافه می‌کند

const SUPABASE_URL = 'https://fzyubobcjzjfsowjflqr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6eXVib2JjanpqZnNvd2pmbHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTY5NDksImV4cCI6MjA2OTQ3Mjk0OX0.4KVQOVvuy0QpkXtTLNxE8yjqugsVjkAJ-7IvoxJtZTQ';

// ایجاد کلاینت Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// تابع ایجاد جداول
async function createTables() {
    console.log('در حال ایجاد جداول...');
    
    try {
        // ایجاد جدول کاربران
        const { error: usersError } = await supabaseClient.rpc('exec_sql', {
            sql: `
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
            `
        });
        
        if (usersError) {
            console.log('جدول users قبلاً وجود دارد یا خطا در ایجاد:', usersError);
        } else {
            console.log('جدول users ایجاد شد');
        }

        // ایجاد جدول ثبت‌نام‌ها
        const { error: registrationsError } = await supabaseClient.rpc('exec_sql', {
            sql: `
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
            `
        });
        
        if (registrationsError) {
            console.log('جدول registrations قبلاً وجود دارد یا خطا در ایجاد:', registrationsError);
        } else {
            console.log('جدول registrations ایجاد شد');
        }

        // ایجاد جدول برنامه‌ها
        const { error: programsError } = await supabaseClient.rpc('exec_sql', {
            sql: `
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
            `
        });
        
        if (programsError) {
            console.log('جدول programs قبلاً وجود دارد یا خطا در ایجاد:', programsError);
        } else {
            console.log('جدول programs ایجاد شد');
        }

        // ایجاد جدول حضور و غیاب
        const { error: attendanceError } = await supabaseClient.rpc('exec_sql', {
            sql: `
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
            `
        });
        
        if (attendanceError) {
            console.log('جدول attendance قبلاً وجود دارد یا خطا در ایجاد:', attendanceError);
        } else {
            console.log('جدول attendance ایجاد شد');
        }

        // ایجاد جدول نمرات
        const { error: gradesError } = await supabaseClient.rpc('exec_sql', {
            sql: `
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
            `
        });
        
        if (gradesError) {
            console.log('جدول grades قبلاً وجود دارد یا خطا در ایجاد:', gradesError);
        } else {
            console.log('جدول grades ایجاد شد');
        }

        // ایجاد جدول نظرسنجی‌ها
        const { error: surveysError } = await supabaseClient.rpc('exec_sql', {
            sql: `
                CREATE TABLE IF NOT EXISTS surveys (
                    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    questions JSONB NOT NULL,
                    target_audience VARCHAR(50),
                    is_active BOOLEAN DEFAULT true,
                    start_date DATE,
                    end_date DATE,
                    created_by UUID REFERENCES users(id),
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
            `
        });
        
        if (surveysError) {
            console.log('جدول surveys قبلاً وجود دارد یا خطا در ایجاد:', surveysError);
        } else {
            console.log('جدول surveys ایجاد شد');
        }

        // ایجاد جدول پاسخ‌های نظرسنجی
        const { error: surveyResponsesError } = await supabaseClient.rpc('exec_sql', {
            sql: `
                CREATE TABLE IF NOT EXISTS survey_responses (
                    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                    survey_id UUID REFERENCES surveys(id) NOT NULL,
                    user_id UUID REFERENCES users(id) NOT NULL,
                    answers JSONB NOT NULL,
                    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
            `
        });
        
        if (surveyResponsesError) {
            console.log('جدول survey_responses قبلاً وجود دارد یا خطا در ایجاد:', surveyResponsesError);
        } else {
            console.log('جدول survey_responses ایجاد شد');
        }

        // ایجاد جدول فعالیت‌های گروهی
        const { error: groupActivitiesError } = await supabaseClient.rpc('exec_sql', {
            sql: `
                CREATE TABLE IF NOT EXISTS group_activities (
                    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                    program_id UUID REFERENCES programs(id),
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    activity_date DATE,
                    participants JSONB,
                    coordinator_id UUID REFERENCES users(id),
                    status VARCHAR(50) DEFAULT 'planned',
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
            `
        });
        
        if (groupActivitiesError) {
            console.log('جدول group_activities قبلاً وجود دارد یا خطا در ایجاد:', groupActivitiesError);
        } else {
            console.log('جدول group_activities ایجاد شد');
        }

        console.log('تمام جداول با موفقیت ایجاد شدند!');
        return true;
        
    } catch (error) {
        console.error('خطا در ایجاد جداول:', error);
        return false;
    }
}

// تابع افزودن کاربران تست
async function addTestUsers() {
    console.log('در حال افزودن کاربران تست...');
    
    const testUsers = [
        {
            national_id: '1234567890',
            full_name: 'مدیر سیستم',
            email: 'admin@center.edu',
            phone: '09123456789',
            password: 'admin123',
            role: 'admin'
        },
        {
            national_id: '1111111111',
            full_name: 'علی احمدی',
            email: 'ali@example.com',
            phone: '09111111111',
            password: '123456',
            role: 'student'
        },
        {
            national_id: '2222222222',
            full_name: 'فاطمه محمدی',
            email: 'fateme@example.com',
            phone: '09222222222',
            password: '123456',
            role: 'teacher'
        },
        {
            national_id: '3333333333',
            full_name: 'حسن رضایی',
            email: 'hasan@example.com',
            phone: '09333333333',
            password: '123456',
            role: 'coordinator'
        },
        {
            national_id: '4444444444',
            full_name: 'مریم کریمی',
            email: 'maryam@example.com',
            phone: '09444444444',
            password: '123456',
            role: 'supervisor'
        }
    ];

    try {
        for (const user of testUsers) {
            const { error } = await supabaseClient
                .from('users')
                .upsert([user], { onConflict: 'national_id' });
            
            if (error) {
                console.log(`خطا در افزودن کاربر ${user.full_name}:`, error);
            } else {
                console.log(`کاربر ${user.full_name} با موفقیت اضافه شد`);
            }
        }
        
        console.log('تمام کاربران تست با موفقیت اضافه شدند!');
        return true;
        
    } catch (error) {
        console.error('خطا در افزودن کاربران تست:', error);
        return false;
    }
}

// تابع افزودن برنامه‌های نمونه
async function addSamplePrograms() {
    console.log('در حال افزودن برنامه‌های نمونه...');
    
    const samplePrograms = [
        {
            name: 'کلاس‌های تقویتی',
            description: 'کلاس‌های تقویتی در دروس مختلف برای دانش‌آموزان',
            category: 'academic',
            duration: '۳ ماه',
            max_participants: 15,
            price: 2500000,
            is_active: true
        },
        {
            name: 'برنامه‌نویسی',
            description: 'آموزش برنامه‌نویسی و مهارت‌های دیجیتال',
            category: 'academic',
            duration: '۶ ماه',
            max_participants: 12,
            price: 4000000,
            is_active: true
        },
        {
            name: 'اردوهای تفریحی',
            description: 'اردوهای متنوع و جذاب در طبیعت',
            category: 'recreational',
            duration: '۳ روز',
            max_participants: 30,
            price: 1500000,
            is_active: true
        },
        {
            name: 'کلاس‌های هنری',
            description: 'آموزش نقاشی، موسیقی و هنرهای تجسمی',
            category: 'recreational',
            duration: '۴ ماه',
            max_participants: 10,
            price: 3200000,
            is_active: true
        },
        {
            name: 'کلاس‌های ورزشی',
            description: 'آموزش انواع ورزش‌ها و فعالیت‌های بدنی',
            category: 'sports',
            duration: '۶ ماه',
            max_participants: 20,
            price: 2800000,
            is_active: true
        }
    ];

    try {
        for (const program of samplePrograms) {
            const { error } = await supabaseClient
                .from('programs')
                .upsert([program], { onConflict: 'name' });
            
            if (error) {
                console.log(`خطا در افزودن برنامه ${program.name}:`, error);
            } else {
                console.log(`برنامه ${program.name} با موفقیت اضافه شد`);
            }
        }
        
        console.log('تمام برنامه‌های نمونه با موفقیت اضافه شدند!');
        return true;
        
    } catch (error) {
        console.error('خطا در افزودن برنامه‌های نمونه:', error);
        return false;
    }
}

// تابع اصلی راه‌اندازی
async function setupDatabase() {
    console.log('شروع راه‌اندازی دیتابیس...');
    
    try {
        // ایجاد جداول
        const tablesCreated = await createTables();
        if (!tablesCreated) {
            console.error('خطا در ایجاد جداول');
            return false;
        }
        
        // افزودن کاربران تست
        const usersAdded = await addTestUsers();
        if (!usersAdded) {
            console.error('خطا در افزودن کاربران تست');
            return false;
        }
        
        // افزودن برنامه‌های نمونه
        const programsAdded = await addSamplePrograms();
        if (!programsAdded) {
            console.error('خطا در افزودن برنامه‌های نمونه');
            return false;
        }
        
        console.log('راه‌اندازی دیتابیس با موفقیت انجام شد!');
        return true;
        
    } catch (error) {
        console.error('خطا در راه‌اندازی دیتابیس:', error);
        return false;
    }
}

// صادر کردن توابع
window.setupDatabase = setupDatabase;
window.createTables = createTables;
window.addTestUsers = addTestUsers;
window.addSamplePrograms = addSamplePrograms;