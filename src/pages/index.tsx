import { convertSecondsToTimeString, convertTimeStringToSeconds } from '@/util'
import { useState } from 'react'

export default function Home() {
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [goalSeconds, setGoalSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [intervalId, setIntervalId] = useState(0)

  const handleChangeGoalTime = () => {
    const promptedGoalTime = prompt('목표 시간을 입력해주세요 (hh:mm:ss)')
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/

    if (timeRegex.test(promptedGoalTime!))
      setGoalSeconds(convertTimeStringToSeconds(promptedGoalTime!))
  }

  const handleTimerClick = () => {
    if (!isTimerRunning) {
      setIntervalId(
        setInterval(() => {
          setCurrentSeconds((currentTime) => currentTime + 1)
        }, 1000) as unknown as number
      )
      setIsTimerRunning(true)
      return
    }

    clearInterval(intervalId)
    setIsTimerRunning(false)
  }

  return (
    <div className='flex items-center justify-center w-[100vw] h-[100vh]'>
      <p className='absolute top-5 left-5 text-2xl font-semibold'>Studytime</p>
      <div className='text-center'>
        <div className='text-left'>
          <p
            className='font-bold text-9xl cursor-default'
            onClick={handleTimerClick}
          >
            {convertSecondsToTimeString(currentSeconds)}
          </p>
          <span
            className='font-bold text-4xl text-gray-300 cursor-default'
            onClick={handleChangeGoalTime}
          >
            /{convertSecondsToTimeString(goalSeconds)}
          </span>
        </div>
      </div>
    </div>
  )
}
