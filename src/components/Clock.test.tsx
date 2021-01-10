import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Clock from './Clock'

test('normal case', () => {
  render(<Clock
    steps={{
      hours: 2,
      minutes: 5,
      seconds: 10
    }}
    initialTime="6:12:13" />)
  fireEvent.click(screen.getByTestId('add-hours'))
  fireEvent.click(screen.getByTestId('add-hours'))
  fireEvent.click(screen.getByTestId('subtract-minutes'))
  fireEvent.click(screen.getByTestId('add-seconds'))
  expect(screen.getByTestId('hours-field').getAttribute('value')).toBe('10')
  expect(screen.getByTestId('minutes-field').getAttribute('value')).toBe('7')
  expect(screen.getByTestId('seconds-field').getAttribute('value')).toBe('23')
})

test('invalid initial values', () => {
  render(<Clock
      steps={{
        hours: 1,
        minutes: 1,
        seconds: 1
      }}
      initialTime="a:65:12a" />)
  expect(screen.getByTestId('hours-field').getAttribute('value')).toBe('0')
  expect(screen.getByTestId('minutes-field').getAttribute('value')).toBe('0')
  expect(screen.getByTestId('seconds-field').getAttribute('value')).toBe('0')
})

test('overflow down', () => {
  render(<Clock
      steps={{
        hours: 1,
        minutes: 1,
        seconds: 1
      }}
      initialTime="0:0:0" />)
  fireEvent.click(screen.getByTestId('subtract-hours'))
  fireEvent.click(screen.getByTestId('subtract-minutes'))
  fireEvent.click(screen.getByTestId('subtract-seconds'))
  expect(screen.getByTestId('hours-field').getAttribute('value')).toBe('23')
  expect(screen.getByTestId('minutes-field').getAttribute('value')).toBe('59')
  expect(screen.getByTestId('seconds-field').getAttribute('value')).toBe('59')
})

test('overflow up', () => {
  render(<Clock
      steps={{
        hours: 1,
        minutes: 1,
        seconds: 1
      }}
      initialTime="23:59:59" />)
  fireEvent.click(screen.getByTestId('add-hours'))
  fireEvent.click(screen.getByTestId('add-minutes'))
  fireEvent.click(screen.getByTestId('add-seconds'))
  expect(screen.getByTestId('hours-field').getAttribute('value')).toBe('0')
  expect(screen.getByTestId('minutes-field').getAttribute('value')).toBe('0')
  expect(screen.getByTestId('seconds-field').getAttribute('value')).toBe('0')
})

test('correct keyboard values', () => {
  render(<Clock
      steps={{
        hours: 1,
        minutes: 1,
        seconds: 1
      }}
      initialTime="12:12:12" />)
  fireEvent.change(screen.getByTestId('hours-field'), {
    target: {
      value: '13'
    }
  })
  fireEvent.change(screen.getByTestId('minutes-field'), {
    target: {
      value: '13'
    }
  })
  fireEvent.change(screen.getByTestId('seconds-field'), {
    target: {
      value: '13'
    }
  })
  expect(screen.getByTestId('minutes-field').getAttribute('value')).toBe('13')
  expect(screen.getByTestId('hours-field').getAttribute('value')).toBe('13')
  expect(screen.getByTestId('seconds-field').getAttribute('value')).toBe('13')
})

test('incorrect keyboard values', () => {
  render(<Clock
      steps={{
        hours: 1,
        minutes: 1,
        seconds: 1
      }}
      initialTime="0:0:0" />)
  fireEvent.change(screen.getByTestId('hours-field'), {
    target: {
      value: '25'
    }
  })
  fireEvent.change(screen.getByTestId('minutes-field'), {
    target: {
      value: 'a'
    }
  })
  fireEvent.change(screen.getByTestId('seconds-field'), {
    target: {
      value: '61'
    }
  })
  expect(screen.getByTestId('minutes-field').getAttribute('value')).toBe('0')
  expect(screen.getByTestId('hours-field').getAttribute('value')).toBe('0')
  expect(screen.getByTestId('seconds-field').getAttribute('value')).toBe('0')
})

test('correct 12-hour format', () => {
  render(<Clock
      twelveFormat={true}
      steps={{
        hours: 5,
        minutes: 10,
        seconds: 15
      }}
      initialTime="10:30:0" />)
  expect(screen.getByTestId('time-format').textContent).toBe('AM')
  fireEvent.click(screen.getByTestId('add-hours'))
  expect(screen.getByTestId('time-format').textContent).toBe('PM')
})
