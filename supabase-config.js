// پیکربندی Supabase
const SUPABASE_URL = 'https://fzyubobcjzjfsowjflqr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6eXVib2JjanpqZnNvd2pmbHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTY5NDksImV4cCI6MjA2OTQ3Mjk0OX0.4KVQOVvuy0QpkXtTLNxE8yjqugsVjkAJ-7IvoxJtZTQ';

// ایجاد کلاینت Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// توابع کمکی برای کار با Supabase
const supabaseHelper = {
    // ثبت‌نام کاربر جدید
    async registerUser(userData) {
        try {
            const { data, error } = await supabaseClient
                .from('users')
                .insert([userData])
                .select();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ثبت‌نام:', error);
            return { success: false, error: error.message };
        }
    },

    // ورود کاربر
    async loginUser(nationalId, password) {
        try {
            const { data, error } = await supabaseClient
                .from('users')
                .select('*')
                .eq('national_id', nationalId)
                .single();
            
            if (error) throw error;
            
            // در حالت واقعی، رمز عبور باید hash شود
            if (data && data.password === password) {
                return { success: true, user: data };
            } else {
                return { success: false, error: 'رمز عبور اشتباه است' };
            }
        } catch (error) {
            console.error('خطا در ورود:', error);
            return { success: false, error: 'کاربری یافت نشد' };
        }
    },

    // دریافت تمام ثبت‌نام‌ها
    async getRegistrations() {
        try {
            const { data, error } = await supabaseClient
                .from('registrations')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در دریافت ثبت‌نام‌ها:', error);
            return { success: false, error: error.message };
        }
    },

    // ثبت‌نام جدید
    async createRegistration(registrationData) {
        try {
            const { data, error } = await supabaseClient
                .from('registrations')
                .insert([registrationData])
                .select();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ثبت‌نام:', error);
            return { success: false, error: error.message };
        }
    },

    // بررسی تکراری نبودن کد ملی
    async checkNationalIdExists(nationalId) {
        try {
            const { data, error } = await supabaseClient
                .from('registrations')
                .select('national_id')
                .eq('national_id', nationalId)
                .single();
            
            if (error && error.code === 'PGRST116') {
                // کاربر یافت نشد
                return { exists: false };
            }
            
            if (error) throw error;
            return { exists: true };
        } catch (error) {
            console.error('خطا در بررسی کد ملی:', error);
            return { exists: false, error: error.message };
        }
    },

    // دریافت آمار مرکز
    async getCenterStats() {
        try {
            const { data: registrations, error: regError } = await supabaseClient
                .from('registrations')
                .select('*');
            
            if (regError) throw regError;

            const { data: users, error: userError } = await supabaseClient
                .from('users')
                .select('*');
            
            if (userError) throw userError;

            return {
                success: true,
                stats: {
                    students: registrations.length,
                    teachers: users.filter(u => u.role === 'teacher').length,
                    programs: 12, // مقدار ثابت
                    years: 8 // مقدار ثابت
                }
            };
        } catch (error) {
            console.error('خطا در دریافت آمار:', error);
            return { success: false, error: error.message };
        }
    },

    // آپلود فایل
    async uploadFile(file, bucket = 'documents') {
        try {
            const fileName = `${Date.now()}_${file.name}`;
            const { data, error } = await supabaseClient.storage
                .from(bucket)
                .upload(fileName, file);
            
            if (error) throw error;
            
            const { data: urlData } = supabaseClient.storage
                .from(bucket)
                .getPublicUrl(fileName);
            
            return { success: true, url: urlData.publicUrl };
        } catch (error) {
            console.error('خطا در آپلود فایل:', error);
            return { success: false, error: error.message };
        }
    },

    // دریافت برنامه‌ها
    async getPrograms() {
        try {
            const { data, error } = await supabaseClient
                .from('programs')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در دریافت برنامه‌ها:', error);
            return { success: false, error: error.message };
        }
    },

    // ثبت حضور و غیاب
    async recordAttendance(attendanceData) {
        try {
            const { data, error } = await supabaseClient
                .from('attendance')
                .insert([attendanceData])
                .select();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ثبت حضور و غیاب:', error);
            return { success: false, error: error.message };
        }
    },

    // ثبت نمرات
    async recordGrades(gradesData) {
        try {
            const { data, error } = await supabaseClient
                .from('grades')
                .insert([gradesData])
                .select();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ثبت نمرات:', error);
            return { success: false, error: error.message };
        }
    },

    // ثبت فعالیت گروهی
    async recordGroupActivity(activityData) {
        try {
            const { data, error } = await supabaseClient
                .from('group_activities')
                .insert([activityData])
                .select();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ثبت فعالیت گروهی:', error);
            return { success: false, error: error.message };
        }
    },

    // دریافت نظرسنجی‌ها
    async getSurveys() {
        try {
            const { data, error } = await supabaseClient
                .from('surveys')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در دریافت نظرسنجی‌ها:', error);
            return { success: false, error: error.message };
        }
    },

    // ثبت نظرسنجی
    async submitSurvey(surveyData) {
        try {
            const { data, error } = await supabaseClient
                .from('survey_responses')
                .insert([surveyData])
                .select();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ثبت نظرسنجی:', error);
            return { success: false, error: error.message };
        }
    },

    // دریافت فایل‌های کاربر
    async getUserDocuments(userId, documentType = null) {
        try {
            let query = supabaseClient
                .from('documents')
                .select('*')
                .eq('user_id', userId)
                .order('uploaded_at', { ascending: false });

            if (documentType) {
                query = query.eq('document_type', documentType);
            }

            const { data, error } = await query;
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در دریافت فایل‌ها:', error);
            return { success: false, error: error.message };
        }
    },

    // ایجاد فایل جدید
    async createDocument(documentData) {
        try {
            const { data, error } = await supabaseClient
                .from('documents')
                .insert([documentData])
                .select();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ایجاد فایل:', error);
            return { success: false, error: error.message };
        }
    },

    // حذف فایل
    async deleteDocument(documentId) {
        try {
            const { error } = await supabaseClient
                .from('documents')
                .delete()
                .eq('id', documentId);
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('خطا در حذف فایل:', error);
            return { success: false, error: error.message };
        }
    },

    // دریافت نظرسنجی‌های فعال
    async getActiveSurveys() {
        try {
            const { data, error } = await supabaseClient
                .from('surveys')
                .select('*')
                .eq('is_active', true)
                .gte('end_date', new Date().toISOString().split('T')[0])
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در دریافت نظرسنجی‌های فعال:', error);
            return { success: false, error: error.message };
        }
    },

    // دریافت نظرسنجی بر اساس ID
    async getSurveyById(surveyId) {
        try {
            const { data, error } = await supabaseClient
                .from('surveys')
                .select('*')
                .eq('id', surveyId)
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در دریافت نظرسنجی:', error);
            return { success: false, error: error.message };
        }
    },

    // دریافت پاسخ‌های نظرسنجی کاربر
    async getUserSurveyResponses(userId) {
        try {
            const { data, error } = await supabaseClient
                .from('survey_responses')
                .select(`
                    *,
                    surveys (
                        title
                    )
                `)
                .eq('user_id', userId)
                .order('submitted_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در دریافت پاسخ‌های نظرسنجی:', error);
            return { success: false, error: error.message };
        }
    },

    // دریافت پاسخ نظرسنجی بر اساس ID
    async getSurveyResponseById(responseId) {
        try {
            const { data, error } = await supabaseClient
                .from('survey_responses')
                .select(`
                    *,
                    surveys (
                        title
                    )
                `)
                .eq('id', responseId)
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در دریافت پاسخ نظرسنجی:', error);
            return { success: false, error: error.message };
        }
    },

    // دریافت حضور و غیاب
    async getAttendance(filters = {}) {
        try {
            let query = supabaseClient
                .from('attendance')
                .select(`
                    *,
                    users (
                        full_name,
                        national_id
                    ),
                    programs (
                        name
                    )
                `)
                .order('date', { ascending: false });

            if (filters.programId) {
                query = query.eq('program_id', filters.programId);
            }
            if (filters.date) {
                query = query.eq('date', filters.date);
            }
            if (filters.userId) {
                query = query.eq('user_id', filters.userId);
            }

            const { data, error } = await query;
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در دریافت حضور و غیاب:', error);
            return { success: false, error: error.message };
        }
    },

    // به‌روزرسانی حضور و غیاب
    async updateAttendance(attendanceId, updateData) {
        try {
            const { data, error } = await supabaseClient
                .from('attendance')
                .update(updateData)
                .eq('id', attendanceId)
                .select();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در به‌روزرسانی حضور و غیاب:', error);
            return { success: false, error: error.message };
        }
    },

    // دریافت دانش‌آموزان برنامه
    async getProgramStudents(programId) {
        try {
            const { data, error } = await supabaseClient
                .from('registrations')
                .select(`
                    *,
                    users (
                        id,
                        full_name,
                        national_id
                    )
                `)
                .eq('program_id', programId)
                .eq('status', 'approved');
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در دریافت دانش‌آموزان برنامه:', error);
            return { success: false, error: error.message };
        }
    },

    // ثبت حضور و غیاب گروهی
    async recordBulkAttendance(attendanceData) {
        try {
            const { data, error } = await supabaseClient
                .from('attendance')
                .insert(attendanceData)
                .select();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ثبت حضور و غیاب گروهی:', error);
            return { success: false, error: error.message };
        }
    }
};

// صادر کردن برای استفاده در فایل‌های دیگر
window.supabaseHelper = supabaseHelper;