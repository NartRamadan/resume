// === פונקציות עזר ===

/**
 * יצירת חלקיקים מרחפים ברקע
 */
function createParticles() {
    console.log("Creating particles...");
    const particlesContainer = document.getElementById('particles');
    console.log("Container found:", particlesContainer);

    if (!particlesContainer) {
        console.error("particles container not found!");
        return;
    }

    // המתן לפני יצירת בועות
    setTimeout(() => {
        console.log("Starting to create particles after delay...");

        // יוצר 10 חלקיקים
        for (let i = 0; i < 10; i++) {
            // המתן בין כל בועה - כל בועה תיווצר אחרי הקודמת ב-3 שניות
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';

                // מיקום אקראי אופקית
                particle.style.left = Math.random() * 100 + '%';

                // גודל אקראי (בין 4 ל-10 פיקסל)
                const size = Math.random() * 20 + 15;
                particle.style.width = particle.style.height = size + 'px';

                // ללא עיכוב - הבועה מתחילה מיד כשנוצרת
                particle.style.animationDelay = '0s';

                // משך אנימציה (בין 12 ל-18 שניות)
                particle.style.animationDuration = (Math.random() * 6 + 12) + 's';

                // מוסיף את החלקיק למכולה
                particlesContainer.appendChild(particle);

                console.log(`Particle ${i + 1} created`);
            }, i * 3000); // כל בועה אחרי 3 שניות מהקודמת
        }
    }, 950); // התחלה אחרי 8 שניות מטעינת העמוד
}

/**
 * אנימציה לפסי התקדמות הכישורים
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach((bar, index) => {
        // המתן קצת לפני תחילת כל פס (יוצר אפקט מדורג)
        setTimeout(() => {
            const skillLevel = bar.getAttribute('data-skill');
            bar.style.width = skillLevel + '%';
            console.log(`Skill bar ${index + 1} animated to ${skillLevel}%`);
        }, index * 300); // כל פס מתחיל 300ms אחרי הקודם
    });
}

/**
 * פונקציה לאפקט מכונת כתיבה
 * @param {Element} element - האלמנט שבו נכתוב
 * @param {string} text - הטקסט לכתיבה
 * @param {number} speed - מהירות הכתיבה במילישניות
 */
function typeWriter(element, text, speed = 100) {
    element.textContent = ''; // מנקה את התוכן הקיים
    let i = 0; // מונה תווים

    function type() {
        if (i < text.length) { // אם יש עוד תווים לכתוב
            element.textContent += text.charAt(i); // מוסיף תו אחד
            i++; // מתקדם לתו הבא
            setTimeout(type, speed); // ממתין ומקריא שוב
        }
    }

    type(); // מפעיל את הפונקציה
}

/**
 * יצירת כפתור מעבר בין מצבים (כהה/בהיר)
 */
function createThemeToggle() {
    // יוצר אלמנט כפתור חדש
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '🌙'; // אייקון ירח (מצב בהיר)
    toggleButton.className = 'theme-toggle'; // מחלקת CSS

    // הגדרת עיצוב הכפתור באמצעות JavaScript
    toggleButton.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    // מוסיף את הכפתור לגוף העמוד
    document.body.appendChild(toggleButton);

    // מוסיף אירוע לחיצה על הכפתור
    toggleButton.addEventListener('click', () => {
        // מחליף את המחלקה dark-theme ב-body
        document.body.classList.toggle('dark-theme');

        // משנה את האייקון בהתאם למצב הנוכחי
        toggleButton.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
}

/**
 * אפקט הקלדה מתחלף בסעיף "אודותיי"
 */
function startTypingEffect() {
    // בוחר את הפסקה בסעיף about
    const aboutText = document.querySelector('.about p');

    // מערך של משפטים שיתחלפו
    const phrases = [
        "I am a second-year student specializing in Full Stack development.",
        "I love creating interactive web applications.",
        "I enjoy solving complex problems with code.",
        "I'm passionate about learning new technologies."
    ];

    // משתנים לניהול האפקט
    let currentPhrase = 0;    // אינדקס המשפט הנוכחי
    let currentChar = 0;      // אינדקס התו הנוכחי
    let isDeleting = false;   // האם אנחנו במצב מחיקה

    function typeEffect() {
        const currentText = phrases[currentPhrase]; // המשפט הנוכחי

        if (isDeleting) {
            // מצב מחיקה - מוחק תו אחד
            aboutText.textContent = currentText.substring(0, currentChar - 1);
            currentChar--;
        } else {
            // מצב כתיבה - מוסיף תו אחד
            aboutText.textContent = currentText.substring(0, currentChar + 1);
            currentChar++;
        }

        let typeSpeed = 100; // מהירות ברירת מחדל

        if (isDeleting) {
            typeSpeed = 50; // מחיקה מהירה יותר
        }

        // בדיקת תנאי גבול
        if (!isDeleting && currentChar === currentText.length) {
            // סיים להקליד - מחכה ומתחיל למחוק
            typeSpeed = 2000; // מחכה 2 שניות
            isDeleting = true;
        }
        else if (isDeleting && currentChar === 0) {
            // סיים למחוק - עובר למשפט הבא
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length; // מעגלי
        }

        // קריאה רקורסיבית לאחר המתנה
        setTimeout(typeEffect, typeSpeed);
    }

    aboutText.textContent = ''; // מנקה את הטקסט הקיים
    typeEffect(); // מפעיל את האפקט
}

/**
 * יצירת טופס יצירת קשר כחלון קופץ
 */
function createContactForm() {
    // יוצר אלמנט חיפוי (overlay) לחלון
    const overlay = document.createElement('div');
    overlay.className = 'contact-overlay';

    // מגדיר את תוכן HTML של הטופס
    overlay.innerHTML = `
        <div class="contact-form">
            <div class="form-header">
                <h3>Send me a message</h3>
                <button class="close-btn">&times;</button>
            </div>
            <form id="messageForm">
                <input type="text" placeholder="Your Name" required>
                <input type="email" placeholder="Your Email" required>
                <textarea placeholder="Your Message" rows="4" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    `;

    // מוסיף את החלון לגוף העמוד
    document.body.appendChild(overlay);

    // הסרנו את הפופ-אפ הישן - עכשיו הקישורים עובדים ישירות
    // האימייל והטלפון עובדים עם mailto: ו-tel:

    // אירועי סגירת הטופס
    overlay.addEventListener('click', (e) => {
        // סוגר אם לוחצים על הרקע או על כפתור הסגירה
        if (e.target === overlay || e.target.classList.contains('close-btn')) {
            overlay.classList.remove('active');
        }
    });

    // טיפול בשליחת הטופס
    document.getElementById('messageForm').addEventListener('submit', (e) => {
        e.preventDefault(); // מונע שליחה רגילה של הטופס
        alert('Message sent! (This is just a demo)'); // הודעה למשתמש
        overlay.classList.remove('active'); // סוגר את החלון
        e.target.reset(); // מנקה את שדות הטופס
    });
}

// === אירוע ראשי ===

/**
 * אירוע שמופעל כשהעמוד נטען לחלוטין
 * מפעיל את כל הפונקציות הראשיות
 */
window.addEventListener('load', () => {
    console.log("Page loaded, starting initialization...");

    // יוצר חלקיקים מרחפים ברקע
    createParticles();

    // אפקט הקלדה לשם בכותרת
    const nameElement = document.querySelector('h1');
    const originalText = nameElement.textContent;
    typeWriter(nameElement, originalText, 150);

    // מפעיל את שאר האפקטים
    createThemeToggle();        // כפתור מעבר מצבים
    startTypingEffect();        // אפקט הקלדה בסעיף אודות
    createContactForm();        // טופס יצירת קשר

    // אנימציה לפסי כישורים אחרי 2 שניות
    setTimeout(() => {
        animateSkillBars();
    }, 2000);

    // הודעה בקונסול שהכל נטען בהצלחה
    console.log("All scripts loaded successfully!");
});

/**
 * פונקציה להורדת קורות חיים כקובץ PDF
 */
function downloadResume() {
    // יצירת קישור להורדה
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`
NART RAMADAN KATAZ
Full Stack Developer

CONTACT INFORMATION
Email: kataz91@gmail.com
Phone: 053-430-3700
LinkedIn: https://www.linkedin.com/in/nart-ramadan-kataz/
GitHub: https://github.com/NartRamadan

ABOUT ME
I am a second-year student specializing in Full Stack development. I love creating interactive web applications and enjoy solving complex problems with code. I'm passionate about learning new technologies.

SKILLS
• HTML/CSS/JavaScript (80%)
• C Programming (70%)
• C++ (65%)
• C# (60%)
• Arduino (55%)

PROJECTS
• Memory Game - Interactive memory card game built with vanilla JavaScript
• Arduino Focus Game - Hardware programming project using Arduino
• Book Tracker - Web application for tracking books
• Blood Pressure Tracker - JavaScript application for health monitoring

EDUCATION & EXPERIENCE
2024 - Present: Software Engineering Student (Second Year)
• Learning React and advanced web development
• Expanding knowledge in modern frameworks

2023 - 2024: Programming Foundations (First Year)
• Learned C, C++, C# programming fundamentals
• Built solid foundation in computer science concepts
• Studied entrepreneurship

2022 - 2023: Programming Introduction
• Started with MIT Scratch to understand programming logic
• Discovered passion for coding and software engineering

TECHNOLOGIES
Frontend: HTML5, CSS3, JavaScript
Backend: Node.js, Express.js
Programming: C, C++, C#
Hardware: Arduino
Tools: Git, GitHub

Available for work opportunities and collaborations!
    `);
    link.download = 'Nart_Ramadan_Kataz_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // הודעה למשתמש
    alert('Resume downloaded as text file! For a proper PDF, you can use browser print function (Ctrl+P) and save as PDF.');
}
