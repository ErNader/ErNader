// مدیریت نظرسنجی‌ها
class SurveyManager {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.currentSurvey = null;
        this.init();
    }

    init() {
        if (!this.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        this.loadSurveys();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const surveyForm = document.getElementById('survey-form');
        if (surveyForm) {
            surveyForm.addEventListener('submit', (e) => this.handleSurveySubmit(e));
        }

        // بستن modal با کلیک خارج از آن
        const modal = document.getElementById('survey-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeSurveyModal();
                }
            });
        }
    }

    async loadSurveys() {
        try {
            // بارگذاری نظرسنجی‌های فعال
            const activeResult = await supabaseHelper.getActiveSurveys();
            if (activeResult.success) {
                this.displayActiveSurveys(activeResult.data);
            }

            // بارگذاری نظرسنجی‌های تکمیل شده
            const completedResult = await supabaseHelper.getUserSurveyResponses(this.currentUser.id);
            if (completedResult.success) {
                this.displayCompletedSurveys(completedResult.data);
            }

        } catch (error) {
            console.error('خطا در بارگذاری نظرسنجی‌ها:', error);
            showAlert('خطا در بارگذاری نظرسنجی‌ها', 'danger');
        }
    }

    displayActiveSurveys(surveys) {
        const container = document.getElementById('active-surveys');
        if (!container) return;

        if (!surveys || surveys.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <p>هیچ نظرسنجی فعالی وجود ندارد</p>
                </div>
            `;
            return;
        }

        const surveysHTML = surveys.map(survey => `
            <div class="survey-card">
                <div class="survey-header">
                    <i class="fas fa-clipboard-list"></i>
                    <h4>${survey.title}</h4>
                </div>
                <div class="survey-details">
                    <p>${survey.description}</p>
                    <p><strong>تاریخ شروع:</strong> ${new Date(survey.start_date).toLocaleDateString('fa-IR')}</p>
                    <p><strong>تاریخ پایان:</strong> ${new Date(survey.end_date).toLocaleDateString('fa-IR')}</p>
                </div>
                <div class="survey-actions">
                    <button onclick="surveyManager.openSurvey('${survey.id}')" class="btn btn-primary">
                        <i class="fas fa-edit"></i>
                        شرکت در نظرسنجی
                    </button>
                </div>
            </div>
        `).join('');

        container.innerHTML = surveysHTML;
    }

    displayCompletedSurveys(responses) {
        const container = document.getElementById('completed-surveys');
        if (!container) return;

        if (!responses || responses.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-check-circle"></i>
                    <p>هیچ نظرسنجی تکمیل شده‌ای وجود ندارد</p>
                </div>
            `;
            return;
        }

        const responsesHTML = responses.map(response => `
            <div class="survey-card completed">
                <div class="survey-header">
                    <i class="fas fa-check-circle"></i>
                    <h4>${response.survey_title}</h4>
                </div>
                <div class="survey-details">
                    <p><strong>تاریخ تکمیل:</strong> ${new Date(response.submitted_at).toLocaleDateString('fa-IR')}</p>
                    <p><strong>تعداد سوالات:</strong> ${response.answers ? response.answers.length : 0}</p>
                </div>
                <div class="survey-actions">
                    <button onclick="surveyManager.viewResponse('${response.id}')" class="btn btn-secondary">
                        <i class="fas fa-eye"></i>
                        مشاهده پاسخ‌ها
                    </button>
                </div>
            </div>
        `).join('');

        container.innerHTML = responsesHTML;
    }

    async openSurvey(surveyId) {
        try {
            const result = await supabaseHelper.getSurveyById(surveyId);
            
            if (result.success) {
                this.currentSurvey = result.data;
                this.showSurveyModal();
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('خطا در بارگذاری نظرسنجی:', error);
            showAlert('خطا در بارگذاری نظرسنجی', 'danger');
        }
    }

    showSurveyModal() {
        const modal = document.getElementById('survey-modal');
        const title = document.getElementById('survey-title');
        const description = document.getElementById('survey-description');
        const questionsContainer = document.getElementById('survey-questions');

        if (!this.currentSurvey) return;

        title.textContent = this.currentSurvey.title;
        description.textContent = this.currentSurvey.description;

        // ایجاد سوالات
        const questionsHTML = this.currentSurvey.questions.map((question, index) => {
            return this.createQuestionHTML(question, index);
        }).join('');

        questionsContainer.innerHTML = questionsHTML;

        modal.style.display = 'flex';
    }

    createQuestionHTML(question, index) {
        const questionId = `question-${index}`;
        let optionsHTML = '';

        switch (question.type) {
            case 'text':
                return `
                    <div class="form-group">
                        <label for="${questionId}">${question.text}</label>
                        <textarea id="${questionId}" name="${questionId}" class="form-control" rows="3" required></textarea>
                    </div>
                `;

            case 'radio':
                optionsHTML = question.options.map(option => `
                    <label class="radio-option">
                        <input type="radio" name="${questionId}" value="${option}" required>
                        <span>${option}</span>
                    </label>
                `).join('');
                return `
                    <div class="form-group">
                        <label>${question.text}</label>
                        <div class="radio-group">
                            ${optionsHTML}
                        </div>
                    </div>
                `;

            case 'checkbox':
                optionsHTML = question.options.map(option => `
                    <label class="checkbox-option">
                        <input type="checkbox" name="${questionId}" value="${option}">
                        <span>${option}</span>
                    </label>
                `).join('');
                return `
                    <div class="form-group">
                        <label>${question.text}</label>
                        <div class="checkbox-group">
                            ${optionsHTML}
                        </div>
                    </div>
                `;

            case 'rating':
                return `
                    <div class="form-group">
                        <label>${question.text}</label>
                        <div class="rating-group">
                            ${[1, 2, 3, 4, 5].map(rating => `
                                <label class="rating-option">
                                    <input type="radio" name="${questionId}" value="${rating}" required>
                                    <span class="star">★</span>
                                    <span class="rating-text">${rating}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `;

            default:
                return `
                    <div class="form-group">
                        <label for="${questionId}">${question.text}</label>
                        <input type="text" id="${questionId}" name="${questionId}" class="form-control" required>
                    </div>
                `;
        }
    }

    async handleSurveySubmit(event) {
        event.preventDefault();

        if (!this.currentSurvey) {
            showAlert('خطا: نظرسنجی یافت نشد', 'danger');
            return;
        }

        try {
            const formData = new FormData(event.target);
            const answers = [];

            // جمع‌آوری پاسخ‌ها
            this.currentSurvey.questions.forEach((question, index) => {
                const questionId = `question-${index}`;
                let answer = '';

                if (question.type === 'checkbox') {
                    // برای checkbox ها، همه مقادیر انتخاب شده را جمع‌آوری کن
                    const checkboxes = formData.getAll(questionId);
                    answer = checkboxes.join(', ');
                } else {
                    answer = formData.get(questionId) || '';
                }

                answers.push({
                    question: question.text,
                    answer: answer,
                    questionType: question.type
                });
            });

            // ارسال پاسخ‌ها
            const surveyData = {
                survey_id: this.currentSurvey.id,
                user_id: this.currentUser.id,
                answers: answers
            };

            const result = await supabaseHelper.submitSurvey(surveyData);
            
            if (result.success) {
                showAlert('نظرسنجی با موفقیت ارسال شد!', 'success');
                this.closeSurveyModal();
                this.loadSurveys(); // بارگذاری مجدد لیست
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('خطا در ارسال نظرسنجی:', error);
            showAlert('خطا در ارسال نظرسنجی: ' + error.message, 'danger');
        }
    }

    closeSurveyModal() {
        const modal = document.getElementById('survey-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.currentSurvey = null;
    }

    async viewResponse(responseId) {
        try {
            const result = await supabaseHelper.getSurveyResponseById(responseId);
            
            if (result.success) {
                this.showResponseModal(result.data);
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('خطا در بارگذاری پاسخ:', error);
            showAlert('خطا در بارگذاری پاسخ', 'danger');
        }
    }

    showResponseModal(response) {
        const modal = document.getElementById('survey-modal');
        const title = document.getElementById('survey-title');
        const description = document.getElementById('survey-description');
        const questionsContainer = document.getElementById('survey-questions');

        title.textContent = `پاسخ‌های نظرسنجی: ${response.survey_title}`;
        description.textContent = `تاریخ تکمیل: ${new Date(response.submitted_at).toLocaleDateString('fa-IR')}`;

        const answersHTML = response.answers.map(answer => `
            <div class="answer-item">
                <h4>${answer.question}</h4>
                <p class="answer-text">${answer.answer}</p>
            </div>
        `).join('');

        questionsContainer.innerHTML = answersHTML;

        // تغییر دکمه submit به بستن
        const submitBtn = document.querySelector('#survey-form button');
        submitBtn.innerHTML = '<i class="fas fa-times"></i> بستن';
        submitBtn.onclick = (e) => {
            e.preventDefault();
            this.closeSurveyModal();
        };

        modal.style.display = 'flex';
    }
}

// تابع‌های عمومی
function closeSurveyModal() {
    if (window.surveyManager) {
        surveyManager.closeSurveyModal();
    }
}

// راه‌اندازی مدیر نظرسنجی
let surveyManager;
document.addEventListener('DOMContentLoaded', function() {
    surveyManager = new SurveyManager();
});