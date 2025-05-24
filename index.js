// Анимация появления секций при прокрутке
const sections = document.querySelectorAll("header, section, .project");
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

// Изменение фамилии
function changeLastName() {
  const input = document.getElementById("newLastName").value.trim();
  if (input) {
    document.getElementById("lastName").textContent = input;
  }
}

// Случайный фон
function changeBackgroundColor() {
  document.body.style.backgroundColor = `hsl(${Math.floor(
    Math.random() * 360
  )}, 80%, 90%)`;
}

function runProject1() {
  const a = parseFloat(document.getElementById("numA").value);
  const b = parseFloat(document.getElementById("numB").value);
  const result = document.getElementById("result1");
  result.style.display = "block";
  if (!isNaN(a) && !isNaN(b)) {
    result.textContent = `Максимум: ${Math.max(a, b)}`;
  } else {
    result.textContent = "Пожалуйста, введите оба числа.";
  }
}

function runProject2() {
  const name = document.getElementById("nameInput").value.trim();
  const result = document.getElementById("result2");
  result.style.display = "block";
  if (name) {
    const admin = name;
    result.textContent = `admin = ${admin}`;
  } else {
    result.textContent = "Пожалуйста, введите имя.";
  }
}

function runProject3() {
  let age;
  const result = document.getElementById("result3");

  while (true) {
    age = prompt("Введите ваш возраст:");
    if (age === null) {
      alert("Пожалуйста, введите возраст.");
      continue;
    }

    age = age.trim();

    if (age === "" || isNaN(age) || age <= 0 || age > 120) {
      alert("Введите корректный возраст (от 1 до 120).");
      continue;
    }

    const confirmed = confirm(`Вы уверены, что вам ${age}?`);
    if (confirmed) {
      break;
    }
  }

  const word = getYearWord(Number(age));
  result.textContent = `Возраст подтверждён: ${age} ${word}.`;
  result.style.display = "block";
}

function getYearWord(age) {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "лет";
  }

  switch (lastDigit) {
    case 1:
      return "год";
    case 2:
    case 3:
    case 4:
      return "года";
    default:
      return "лет";
  }
}

function submitSurvey() {
  const surname = document.getElementById("surnameInput").value.trim();
  const position = document.getElementById("positionInput").value.trim();
  const age = document.getElementById("ageInput").value.trim();
  const gender = document.getElementById("genderInput").value.trim();

  if (!/^[А-Яа-яA-Za-z-]+$/.test(surname)) {
    alert("Фамилия должна содержать только буквы.");
    return;
  }

  const ageNumber = parseInt(age);
  if (isNaN(ageNumber) || ageNumber < 0) {
    alert("Возраст должен быть неотрицательным числом.");
    return;
  }

  if (gender !== "М" && gender !== "Ж") {
    alert("Пожалуйста, выберите пол (М или Ж).");
    return;
  }

  document.getElementById("lastName").textContent = surname;
  document.querySelector("header h2").textContent = position;

  document.getElementById("complete-questionnaire").style.display = "none";
  alert("Анкета успешно заполнена!");
}

function check() {
  const skills = Array.from(document.querySelectorAll(".skill:checked")).map(
    (el) => el.value
  );
  const education = document.getElementById("hasEducation").checked;
  const result = document.getElementById("checkResult");

  const hasMath = skills.includes("math");
  const hasProg = skills.includes("programming");

  if (hasMath && hasProg) {
    result.textContent =
      "✅ Достаточные навыки: математика и программирование.";
    return;
  }

  if (education && skills.length >= 2) {
    result.textContent =
      "✅ Достаточные навыки: высшее образование и два других навыка.";
    return;
  }

  result.textContent = "❌ Недостаточно навыков.";
}
