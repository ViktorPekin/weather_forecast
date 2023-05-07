const findDayOfWeek = (day) => {
  if (day === 1) {
    return 'Пн.';
  } else if (day === 2) {
    return 'Вт';
  } else if (day === 3) {
    return 'Ср';
  } else if (day === 4) {
    return 'Чт';
  } else if (day === 5) {
    return 'Пт';
  } else if (day === 6) {
    return 'Сб';
  } else if (day === 0) {
    return 'Вс';
  }
};

export default findDayOfWeek;
