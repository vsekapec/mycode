const circle = document.getElementById('red-circle');
const map = document.getElementById('map-image');
const step = 10; // Шаг перемещения кружка

// Функция для перемещения кружка
const moveCircle = (dx, dy) => {
  const mapRect = map.getBoundingClientRect(); // Границы карты
  const circleRect = circle.getBoundingClientRect(); // Границы кружка

  // Рассчитываем новые координаты
  let newLeft = circle.offsetLeft + dx;
  let newTop = circle.offsetTop + dy;

  // Проверяем, чтобы кружок оставался в пределах карты
  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft + circleRect.width > mapRect.width) newLeft = mapRect.width - circleRect.width;
  if (newTop + circleRect.height > mapRect.height) newTop = mapRect.height - circleRect.height;

  // Применяем новые координаты
  circle.style.left = `${newLeft}px`;
  circle.style.top = `${newTop}px`;
};

// Управление кружком через касания экрана
let startX = 0;
let startY = 0;

map.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

map.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Предотвращаем скролл страницы

  const touch = e.touches[0];
  const dx = touch.clientX - startX;
  const dy = touch.clientY - startY;

  if (Math.abs(dx) > Math.abs(dy)) {
    // Горизонтальное движение
    moveCircle(dx > 0 ? step : -step, 0);
  } else {
    // Вертикальное движение
    moveCircle(0, dy > 0 ? step : -step);
  }

  startX = touch.clientX;
  startY = touch.clientY;
});
