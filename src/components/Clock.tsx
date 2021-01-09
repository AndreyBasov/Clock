import React, { useState } from 'react'

interface ITime {
  [key: string]: number,
  hours: number,
  minutes: number,
  seconds: number,
}

type ClockProps = {
  steps: ITime
  initialTime: string,
  showSeconds?: boolean,
  twelveFormat?: boolean
}

const Clock: React.FC<ClockProps> = ({ steps, initialTime, showSeconds = true, twelveFormat = false }: ClockProps) => {
  // проверяем, что начальное время корректно
  const timeArray: string[] = initialTime.split(':')
  console.log(Number.isNaN(timeArray[0]))
  if (Number.isNaN(+timeArray[0]) || (+timeArray[0] < 0) || (+timeArray[0] >= 24)) {
    timeArray[0] = '0'
  }
  if (Number.isNaN(+timeArray[1]) || (+timeArray[1] < 0) || (+timeArray[1] >= 60)) {
    timeArray[1] = '0'
  }
  if (Number.isNaN(+timeArray[2]) || (+timeArray[2] < 0) || (+timeArray[2] >= 60)) {
    timeArray[2] = '0'
  }
  const [time, setTime] = useState<ITime>({
    hours: +timeArray[0],
    minutes: +timeArray[1],
    seconds: +timeArray[2]
  })
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime: number = +e.target.value
    // проверяем, что вписываемые данные корректны
    if (!Number.isNaN(newTime)) {
      if (!Number.isInteger(newTime)) {
        return
      }
      if (e.target.name === 'hours' && (newTime < 0 || newTime >= 24)) {
        return
      }
      if ((e.target.name === 'minutes' || e.target.name === 'seconds') && (newTime < 0 || newTime >= 60)) {
        return
      }
      setTime((prev) => ({
        ...prev,
        [e.target.name]: +e.target.value
      }))
    }
  }

  const onAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    let newTime: number
    const curField: string = e.currentTarget.name
    // обрабатываем часы
    if (curField === 'hours') {
      newTime = time.hours
      if (e.currentTarget.textContent === '+') {
        newTime += steps.hours
        if (newTime > 23) {
          newTime -= 24
        }
      } else {
        newTime -= steps.hours
        if (newTime < 0) {
          newTime += 24
        }
      }
    // обрабатываем минуты или секунды
    } else {
      newTime = time[curField]
      console.log(newTime)
      if (e.currentTarget.textContent === '+') {
        newTime += steps[curField]
        if (newTime > 59) {
          newTime -= 60
        }
      } else {
        newTime -= steps[curField]
        if (newTime < 0) {
          newTime += 60
        }
      }
    }
    setTime((prev) => ({
      ...prev,
      [curField]: newTime
    }))
  }

  return (
    <div className="container">
      <div className="column">
        <button name="hours" onClick={onAdd}>+</button>
        <input type="text" name="hours" value={(twelveFormat && time.hours > 12) ? time.hours - 12 : time.hours} onChange={onInputChange}/>
        <button name="hours" onClick={onAdd}>&ndash;</button>
      </div>
      <div className="column">
      <button name="minutes" onClick={onAdd}>+</button>
        <input type="text" name="minutes" value={time.minutes} onChange={onInputChange}/>
        <button name="minutes" onClick={onAdd}>&ndash;</button>
      </div>
      { showSeconds && <div className="column">
      <button name="seconds" onClick={onAdd}>+</button>
        <input type="text" name="seconds" value={time.seconds} onChange={onInputChange}/>
        <button name="seconds" onClick={onAdd}>&ndash;</button>
      </div> }
      {twelveFormat && (time.hours > 12 ? <h2>PM</h2> : <h2>AM</h2>)}
    </div>
  )
}

export default Clock
