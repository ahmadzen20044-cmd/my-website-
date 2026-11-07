// =========================================================
// السكريبت البرمجي لملف التفاعلية - مشروع ويب 1 (BWP 401)
// =========================================================

document.addEventListener('DOMContentLoaded', function () {
    
    // 1. فلترة الفعاليات في صفحة events.html حسب التصنيف والبحث النصي
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const eventCards = document.querySelectorAll('.event-item');

    function filterEvents() {
        if (!eventCards.length) return;

        const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
        const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';

        eventCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-text').textContent.toLowerCase();

            const matchesCategory = (selectedCategory === 'all' || category === selectedCategory);
            const matchesSearch = (title.includes(searchText) || description.includes(searchText));

            if (matchesCategory && matchesSearch) {
                card.parentElement.style.display = 'block'; // إظهار الكارت
            } else {
                card.parentElement.style.display = 'none';  // إخفاء الكارت
            }
        });
    }

    if (categoryFilter) categoryFilter.addEventListener('change', filterEvents);
    if (searchInput) searchInput.addEventListener('input', filterEvents);

    // 2. التحقق من نموذج اتصل بنا في صفحة contact.html
    const contactForm = document.getElementById('contactForm');
    const alertContainer = document.getElementById('alertContainer');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // منع إعادة تحميل الصفحة

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // فحص البريد عبر التعبير النمطي (Regex)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name === '' || email === '' || message === '') {
                showAlert('يرجى تعبئة جميع الحقول المطلوبة.', 'danger');
                return;
            }

            if (!emailPattern.test(email)) {
                showAlert('يرجى إدخال بريد إلكتروني بصيغة صحيحة.', 'warning');
                return;
            }

            // في حال النجاح
            showAlert('تم إرسال رسالتك بنجاح! سنقوم بالرد عليك قريباً.', 'success');
            contactForm.reset(); // تفريغ النموذج
        });
    }

    // دالة إظهار التنبيهات باستخدام Bootstrap Alert
    function showAlert(message, type) {
        if (!alertContainer) return;
        alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }
});
