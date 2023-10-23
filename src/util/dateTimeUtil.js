
export const formatDate = (date) => {
  return new Date(date).toLocaleString();
}

export const isClosingSoon = (date) => {
  const currentDate = new Date().toLocaleDateString();
  let dueDate = new Date(date).toLocaleDateString();

  console.log('isClosingSoon', currentDate === dueDate);
  if (currentDate === dueDate) return true;
  return false;
}

export const timeLeft = (date) => {

  const currentDate = new Date().getTime();
  const dueDate = new Date(date).getTime();

  const diffTime = dueDate - currentDate; //ms
  if (diffTime <= 0) return {hour: 0, min: 0};

  const diffMin = Math.ceil(diffTime / (1000 * 60));
  
  const hour = parseInt(diffMin/60);
  const min = parseInt(diffMin%60);

  return {hour, min};
}

export const formatTime = (hour, min) => {
  return format2Digits(hour) + "h :" + format2Digits(min) + "m";
}

const format2Digits = (str) => {
  return ("00" + str).slice(-2);
}