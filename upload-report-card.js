// مدیریت آپلود کارنامه
class ReportCardManager {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.init();
    }

    init() {
        if (!this.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        this.loadReports();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const uploadForm = document.getElementById('upload-form');
        if (uploadForm) {
            uploadForm.addEventListener('submit', (e) => this.handleUpload(e));
        }

        // تنظیم سال تحصیلی فعلی
        const yearInput = document.getElementById('report-year');
        if (yearInput) {
            yearInput.value = new Date().getFullYear();
        }
    }

    async handleUpload(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const file = formData.get('report-file');
        const title = formData.get('report-title');
        const semester = formData.get('report-semester');
        const year = formData.get('report-year');
        const notes = formData.get('report-notes');

        // بررسی اندازه فایل
        if (file.size > 5 * 1024 * 1024) { // 5MB
            showAlert('حجم فایل نباید بیشتر از 5 مگابایت باشد', 'danger');
            return;
        }

        // بررسی نوع فایل
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            showAlert('فرمت فایل مجاز نیست. فقط PDF، JPG، JPEG و PNG مجاز است', 'danger');
            return;
        }

        try {
            showAlert('در حال آپلود فایل...', 'info');

            // آپلود فایل به Supabase Storage
            const uploadResult = await supabaseHelper.uploadFile(file, 'documents');
            
            if (!uploadResult.success) {
                throw new Error(uploadResult.error);
            }

            // ذخیره اطلاعات در دیتابیس
            const documentData = {
                user_id: this.currentUser.id,
                file_name: file.name,
                file_url: uploadResult.url,
                file_type: file.type,
                file_size: file.size,
                document_type: 'report_card',
                title: title,
                semester: semester,
                academic_year: year,
                notes: notes
            };

            const result = await supabaseHelper.createDocument(documentData);
            
            if (result.success) {
                showAlert('کارنامه با موفقیت آپلود شد!', 'success');
                event.target.reset();
                this.loadReports();
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('خطا در آپلود:', error);
            showAlert('خطا در آپلود کارنامه: ' + error.message, 'danger');
        }
    }

    async loadReports() {
        try {
            const reportsList = document.getElementById('reports-list');
            if (!reportsList) return;

            reportsList.innerHTML = '<div class="loading">در حال بارگذاری...</div>';

            const result = await supabaseHelper.getUserDocuments(this.currentUser.id, 'report_card');
            
            if (result.success) {
                this.displayReports(result.data, reportsList);
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('خطا در بارگذاری کارنامه‌ها:', error);
            showAlert('خطا در بارگذاری کارنامه‌ها', 'danger');
        }
    }

    displayReports(reports, container) {
        if (!reports || reports.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-alt"></i>
                    <p>هیچ کارنامه‌ای آپلود نشده است</p>
                </div>
            `;
            return;
        }

        const reportsHTML = reports.map(report => `
            <div class="report-card">
                <div class="report-header">
                    <i class="fas fa-file-alt"></i>
                    <h4>${report.title || 'کارنامه'}</h4>
                </div>
                <div class="report-details">
                    <p><strong>نیمسال:</strong> ${this.getSemesterText(report.semester)}</p>
                    <p><strong>سال تحصیلی:</strong> ${report.academic_year}</p>
                    <p><strong>تاریخ آپلود:</strong> ${new Date(report.uploaded_at).toLocaleDateString('fa-IR')}</p>
                    <p><strong>حجم فایل:</strong> ${this.formatFileSize(report.file_size)}</p>
                </div>
                ${report.notes ? `<p><strong>توضیحات:</strong> ${report.notes}</p>` : ''}
                <div class="report-actions">
                    <a href="${report.file_url}" target="_blank" class="btn btn-primary btn-sm">
                        <i class="fas fa-eye"></i>
                        مشاهده
                    </a>
                    <button onclick="reportManager.downloadReport('${report.file_url}', '${report.file_name}')" class="btn btn-secondary btn-sm">
                        <i class="fas fa-download"></i>
                        دانلود
                    </button>
                    <button onclick="reportManager.deleteReport('${report.id}')" class="btn btn-danger btn-sm">
                        <i class="fas fa-trash"></i>
                        حذف
                    </button>
                </div>
            </div>
        `).join('');

        container.innerHTML = reportsHTML;
    }

    getSemesterText(semester) {
        const semesterMap = {
            'first': 'نیمسال اول',
            'second': 'نیمسال دوم',
            'summer': 'تابستان'
        };
        return semesterMap[semester] || semester;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async downloadReport(url, fileName) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('خطا در دانلود:', error);
            showAlert('خطا در دانلود فایل', 'danger');
        }
    }

    async deleteReport(reportId) {
        if (!confirm('آیا مطمئن هستید که می‌خواهید این کارنامه را حذف کنید؟')) {
            return;
        }

        try {
            const result = await supabaseHelper.deleteDocument(reportId);
            
            if (result.success) {
                showAlert('کارنامه با موفقیت حذف شد', 'success');
                this.loadReports();
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('خطا در حذف کارنامه:', error);
            showAlert('خطا در حذف کارنامه: ' + error.message, 'danger');
        }
    }
}

// راه‌اندازی مدیر کارنامه
let reportManager;
document.addEventListener('DOMContentLoaded', function() {
    reportManager = new ReportCardManager();
});