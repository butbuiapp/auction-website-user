import { useState } from "react";
import { timeLeft, formatTime } from "../../util/dateTimeUtil";
import { useEffect } from "react";


function ClosingSoon({ bidDueDate }) {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [intervalId, setIntervalId] = useState();

  const calTimeLeft = () => {
    const time = timeLeft(bidDueDate);
    setHour(time.hour);
    setMin(time.min);
    setSec(time.sec);
  }

  useEffect(() => {
    const time = timeLeft(bidDueDate);
    setHour(time.hour);
    setMin(time.min);
    setSec(time.sec);

    const intervalId = setInterval(() => {
      console.log('inside setInterval');
      calTimeLeft();
    }, 1000); // every 1s

    setIntervalId(intervalId);

    return () => clearInterval(intervalId);
  }, [])

  if (hour === 0 && min === 0 && sec === 0) {
    console.log('intervalId', intervalId);
    if (intervalId) clearInterval(intervalId);
  }

  return (
    <div className="closing-soon">
      <div >
        <div className='bg-danger bg-gradient header'>
          <b>Closing Soon</b>
        </div>
        <div className='py-2'>
          <b>TIME LEFT...</b>
          <div className="text-danger fw-bold fs-4">{formatTime(hour, min, sec)}</div>
        </div>
      </div>
    </div>
  )
}

export default ClosingSoon;