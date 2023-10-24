
export const formatDate = (date) => {
  return new Date(date).toLocaleString();
}

export const isClosingSoon = (date) => {
  const currentDate = new Date().toLocaleDateString();
  let dueDate = new Date(date).toLocaleDateString();

  if (currentDate === dueDate) return true;
  return false;
}

export const timeLeft = (date) => {

  const currentDate = new Date().getTime();
  const dueDate = new Date(date).getTime();

  const diffTime = dueDate - currentDate; //ms
  if (diffTime <= 0) return {hour: 0, min: 0, sec: 0};

  const diffSec = Math.ceil(diffTime / (1000));
  
  const hour = parseInt(diffSec/(60*60));
  const min = parseInt(diffSec/(60));
  const sec = parseInt(diffSec%60);

  return {hour, min, sec};
}

export const formatTime = (hour, min, sec) => {
  return format2Digits(hour) + "h" 
      + ":" + format2Digits(min) + "m"
      + ":" + format2Digits(sec) + "s";
}

const format2Digits = (str) => {
  return ("00" + str).slice(-2);
}