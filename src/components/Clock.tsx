import React, { useState } from 'react'

interface ITime {
  [key: string]: number,
  hours: number,
  minutes: number,
  seconds: number,
}

// props компонента
type ClockProps = {
  steps?: ITime
  initialTime?: string,
  showSeconds?: boolean,
  twelveFormat?: boolean
}

// default значения
const Clock: React.FC<ClockProps> = ({
  steps = {
    hours: 1,
    minutes: 1,
    seconds: 5
  }, initialTime = '0:0:0', showSeconds = true, twelveFormat = false
}: ClockProps) => {
  // проверяем, что начальное время корректно
  const timeArray: string[] = initialTime.split(':')
  const [time, setTime] = useState<ITime>({
    hours: (Number.isNaN(+timeArray[0]) || (+timeArray[0] < 0) || (+timeArray[0] >= 24)) ? 0 : +timeArray[0],
    minutes: (Number.isNaN(+timeArray[1]) || (+timeArray[1] < 0) || (+timeArray[1] >= 60)) ? 0 : +timeArray[1],
    seconds: (Number.isNaN(+timeArray[2]) || (+timeArray[2] < 0) || (+timeArray[2] >= 60)) ? 0 : +timeArray[2]
  })
  const onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const newTime: number = +e.target.value
    const { name, value }: { name: string; value: string } = e.target
    // проверяем, что вписываемые данные корректны
    if (!Number.isNaN(newTime)) {
      if (!Number.isInteger(newTime)) {
        return
      }
      if (name === 'hours' && (newTime < 0 || newTime >= 24)) {
        return
      }
      if ((name === 'minutes' || name === 'seconds') && (newTime < 0 || newTime >= 60)) {
        return
      }
      setTime((prev) => ({
        ...prev,
        [name]: +value
      }))
    }
  }

  const onAdd: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
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
        <button name="hours" onClick={onAdd} data-testid="add-hours">+</button>
        <input
          type="text"
          name="hours"
          value={(twelveFormat && time.hours > 12) ? time.hours - 12 : time.hours}
          onChange={onInputChange}
          data-testid="hours-field"/>
        <button name="hours" onClick={onAdd} data-testid="subtract-hours">&ndash;</button>
      </div>
      <div className="column">
      <button name="minutes" onClick={onAdd} data-testid="add-minutes">+</button>
        <input
          type="text"
          name="minutes"
          value={time.minutes}
          onChange={onInputChange}
          data-testid="minutes-field"/>
        <button name="minutes" onClick={onAdd} data-testid="subtract-minutes">&ndash;</button>
      </div>
      { showSeconds && <div className="column">
      <button name="seconds" onClick={onAdd} data-testid="add-seconds">+</button>
        <input
          type="text"
          name="seconds"
          value={time.seconds}
          onChange={onInputChange}
          data-testid="seconds-field"/>
        <button name="seconds" onClick={onAdd} data-testid="subtract-seconds">&ndash;</button>
      </div> }
      {twelveFormat && (time.hours > 12 ? <h2 data-testid="time-format">PM</h2> : <h2 data-testid="time-format">AM</h2>)}
    </div>
  )
}

export default Clock
