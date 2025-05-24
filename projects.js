function calculate() {
  const a = parseFloat(document.getElementById("calcA").value);
  const b = parseFloat(document.getElementById("calcB").value);
  const op = document.getElementById("calcOp").value;
  const resultEl = document.getElementById("calcResult");

  if (isNaN(a) || isNaN(b)) {
    resultEl.textContent = "Ошибка: введите два числа.";
    resultEl.style.backgroundColor = "";
    return;
  }

  let result;
  switch (op) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = b !== 0 ? a / b : "Ошибка: деление на ноль";
      break;
    default:
      result = "Неверная операция";
  }

  if (typeof result === "number" && result > 15) {
    resultEl.textContent = "число > 15";
    resultEl.style.backgroundColor = "red";
  } else {
    resultEl.textContent = "Результат: " + result;
    resultEl.style.backgroundColor = "";
  }
}

let currentCalcField = "calcA";

document.getElementById("calcA").addEventListener("focus", () => {
  currentCalcField = "calcA";
});

document.getElementById("calcB").addEventListener("focus", () => {
  currentCalcField = "calcB";
});

function insertDigit(digit) {
  const field = document.getElementById(currentCalcField);
  field.value += digit;
}

function setIndicator(value) {
  const indicator = document.getElementById("indicator");
  indicator.value = value;

  // Сделать фон красным, если больше 5
  if (value > 5) {
    indicator.style.backgroundColor = "red";
  } else {
    indicator.style.backgroundColor = "";
  }
}

function generateTitlePage() {
  const dept = document.getElementById("titleDept").value.trim();
  const group = document.getElementById("titleGroup").value.trim();
  const teacher = document.getElementById("titleTeacher").value.trim();
  const student = document.getElementById("titleStudent").value.trim();

  const html = `
    <html lang="ru">
    <head><meta charset="UTF-8"><title>Титульный лист</title></head>
    <body style="font-family: Arial; padding: 40px;">
      <h2 style="text-align: center;">ФГАОУ ВЩ МГТУ "СТАНКИН"</h2>
      <h2 style="text-align: center;">МИНИСТЕРСТВО ОБРАЗОВАНИЯ</h2>
      <h3 style="text-align: center;">Кафедра: ${dept}</h3>
      <p style="text-align: center; margin-top: 100px;">Отчет по лабораторной работе №3</p>
      <p style="text-align: left; margin-top: 80px;">Группа: ${group}</p>
      <p>Преподаватель: ${teacher}</p>
      <p>Студент: ${student}</p>
      <div style="margin-top: 100px; display: flex; justify-content: space-between; padding: 0 40px;">
        <div>
          ___________________<br>
          (Подпись студента)
        </div>
        <div>
          ___________________<br>
          (Подпись преподавателя)
        </div>
      </div>
      <p style="text-align: center; margin-top: 100px;">2024</p>
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}
