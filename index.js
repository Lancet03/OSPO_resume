// Анимация появления секций при прокрутке
const sections = document.querySelectorAll("header, section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.1 }
);
sections.forEach((section) => observer.observe(section));

// Скролл к секции
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

// Базовая валидация формы
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }
  alert("Сообщение отправлено! (заглушка)");
  this.reset();
});

function downloadResume() {
  fetch("index.css")
    .then((res) => res.text())
    .then((css) => {
      const doc = document.documentElement.cloneNode(true);

      // Удаляем link на внешний CSS
      const head = doc.querySelector("head");
      const linkTag = head.querySelector('link[rel="stylesheet"]');
      if (linkTag) linkTag.remove();

      // Вставляем стили внутрь
      const styleTag = document.createElement("style");
      styleTag.textContent = css;
      head.appendChild(styleTag);

      // Удаляем тег <script src="index.js"> из клона, чтобы не дублировать JS
      const scriptTag = doc.querySelector('script[src="index.js"]');
      if (scriptTag) scriptTag.remove();

      // Генерация HTML и скачивание
      const html = "<!DOCTYPE html>\n" + doc.outerHTML;
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.html";
      a.click();
      URL.revokeObjectURL(url);
    });
}
