import { useState } from "react";
import { timeLeft, formatTime } from "../../util/dateTimeUtil";
import { useEffect } from "react";


function ClosingSoon({ bidDueDate }) {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [intervalId, setIntervalId] = useState();

  const calTimeLeft = () => {
    const time = timeLeft(bidDueDate);
    setHour(time.hour);
    setMin(time.min);

    if (time.hour === 0 && time.min === 0) {
      console.log(intervalId)
      clearInterval(intervalId);
    }
  }

  useEffect(() => {
    const time = timeLeft(bidDueDate);
    setHour(time.hour);
    setMin(time.min);;

    const intervalId = setInterval(() => {
      console.log('inside setInterval');
      calTimeLeft();
    }, 1000);

    setIntervalId(intervalId);

    return () => clearInterval(intervalId);
  }, [])


  return (
    <div className="closing-soon">
      <div >
        <div className='bg-danger bg-gradient header'>
          <b>Closing Soon</b>
        </div>
        <div className='py-2'>
          <b>TIME LEFT...</b>
          <div className="text-danger fw-bold fs-4">{formatTime(hour, min)}</div>
        </div>
      </div>
    </div>
  )
}

export default ClosingSoon;