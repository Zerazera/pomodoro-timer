import { useState, useRef } from "react"
import styled from "@emotion/styled"
import Display from "./Display"
import ControlBank from "./ControlBank"
import SettingsBank from "./SettingsBank"
import AlarmSrc from '../assets/sounds/Alarm.mp3'

const StyledTimer = styled.div`
    color: red;
    background-color: black;
    width: 800px;
    aspect-ratio: 1.9 / 1;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (width < 800px) {
        width: 350px;
        aspect-ratio: 0.75 / 1;
    }
`

const InnerTimer = styled.div`
    width: 95%;
    height: 95%;
    border: 15px double red;
`

const defaultValues = {
    sessionLength: 25,
    shortBreakLength: 5,
    longBreakLength: 30,
    maxPomodoros: 4
}

export default function Timer() {
    const [sessionLength, setSessionLength] = useState(defaultValues.sessionLength)
    const [shortBreakLength, setShortBreakLength] = useState(defaultValues.shortBreakLength)
    const [longBreakLength, setLongBreakLength] = useState(defaultValues.longBreakLength)
    const [maxPomodoros, setMaxPomodoros] = useState(defaultValues.maxPomodoros)
    const [timerState, setTimerState] = useState<'SESSION' | 'SHORT BREAK' | 'LONG BREAK'>('SESSION')
    // timeLeft is in milliseconds
    const [timeLeft, setTimeLeft] = useState(sessionLength * 60 * 1000)
    const [pomodorosLeft, setPomodorosLeft] = useState(maxPomodoros)
    const [isStarted, setIsStarted] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [alarmIsPlaying, setAlarmIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const setTimeLeftInMinutes = (minutes: number) => setTimeLeft(minutes * 60 * 1000)

    if (!isStarted) {
        if (timeLeft !== sessionLength * 60 * 1000) setTimeLeftInMinutes(sessionLength)
        if (pomodorosLeft !== maxPomodoros) setPomodorosLeft(maxPomodoros)
    }

    const increaseSessionLength = () => setSessionLength(prev => prev < 60 ?  prev + 1 : prev)
    const decreaseSessionLength = () => setSessionLength(prev => prev > 1 ?  prev - 1 : prev)
    const increaseShortBreakLength = () => setShortBreakLength(prev => prev < 60 ?  prev + 1 : prev)
    const decreaseShortBreakLength = () => setShortBreakLength(prev => prev > 1 ? prev - 1 : prev)
    const increaseLongBreakLength = () => setLongBreakLength(prev => prev < 60 ? prev + 1 : prev)
    const decreaseLongBreakLength = () => setLongBreakLength(prev => prev > 1 ?  prev - 1 : prev)
    const increaseMaxPomodoros = () => setMaxPomodoros(prev => prev < 99 ? prev + 1 : prev)
    const decreaseMaxPomodoros = () => setMaxPomodoros(prev => prev > 1 ?  prev - 1 : prev)
    const timerIntervalRef = useRef(0)

    const silenceAlarm = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }
        setAlarmIsPlaying(false)        
    }

    const stopTimer = () => {
        if (isStarted) {
            clearInterval(timerIntervalRef.current)
            silenceAlarm()
            setTimerState('SESSION')
            setTimeLeftInMinutes(sessionLength)
            setPomodorosLeft(maxPomodoros)
            setIsRunning(false)
            setIsStarted(false)
        }
    }

    const reset = () => {
        clearInterval(timerIntervalRef.current)
        silenceAlarm()
        setSessionLength(25)
        setShortBreakLength(5)
        setLongBreakLength(30)
        setMaxPomodoros(4)
        setTimerState('SESSION')
        setTimeLeftInMinutes(25)
        setPomodorosLeft(4)
        setIsRunning(false)
        setIsStarted(false)
    }    

    const runTimer = () => {
        setIsStarted(true)
        setIsRunning(true)
        timerIntervalRef.current = setInterval(() => {
            setTimeLeft(prev => Math.max(prev - 1000, -1000))
        }, 1000)
    }

    const pauseTimer = () => {
        setIsRunning(false)
        clearInterval(timerIntervalRef.current)
    }

    const startNextState = () => {
        switch(timerState) {
            case 'SESSION':                
                if (pomodorosLeft > 1) {
                    setTimerState('SHORT BREAK')
                    setTimeLeftInMinutes(shortBreakLength)
                } else {
                    setTimerState('LONG BREAK')
                    setTimeLeftInMinutes(longBreakLength)
                }

                setPomodorosLeft(prev => prev - 1)
                break

            case 'SHORT BREAK':
                setTimerState('SESSION')
                setTimeLeftInMinutes(sessionLength)
                break

            case 'LONG BREAK':
                setPomodorosLeft(maxPomodoros)
                setTimerState('SESSION')
                setTimeLeftInMinutes(sessionLength)
                break
        }

        runTimer()
    }

    if (isRunning && timeLeft === -1000) {
        clearInterval(timerIntervalRef.current)
        setAlarmIsPlaying(true)
        audioRef.current?.play()
        startNextState()
    }
 
    return (
        <StyledTimer>
            <InnerTimer>
                <Display 
                    timeLeft={timeLeft} 
                    pomodorosLeft={pomodorosLeft} 
                    timerState={timerState} 
                    alarmIsPlaying={alarmIsPlaying}
                    isStarted={isStarted}
                    isRunning={isRunning}
                />
                <ControlBank 
                    runTimer={runTimer} 
                    pauseTimer={pauseTimer} 
                    reset={reset} 
                    isRunning={isRunning} 
                    alarmIsPlaying={alarmIsPlaying}
                    silenceAlarm={silenceAlarm}
                    stopTimer={stopTimer}
                />
                <SettingsBank 
                    sessionLength={sessionLength} 
                    increaseSessionLength={increaseSessionLength} 
                    decreaseSessionLength={decreaseSessionLength}
                    shortBreakLength={shortBreakLength}
                    increaseShortBreakLength={increaseShortBreakLength}
                    decreaseShortBreakLength={decreaseShortBreakLength}
                    longBreakLength={longBreakLength}
                    increaseLongBreakLength={increaseLongBreakLength}
                    decreaseLongBreakLength={decreaseLongBreakLength}
                    maxPomodoros={maxPomodoros}
                    increaseMaxPomodoros={increaseMaxPomodoros}
                    decreaseMaxPomodoros={decreaseMaxPomodoros}
                />
                <audio id="beep" src={AlarmSrc} ref={audioRef} loop></audio>
            </InnerTimer>
        </StyledTimer>
    )
}