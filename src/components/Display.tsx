import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { useState, useRef } from "react"
import type { SessionType } from "../types/SessionType"

const Clock = styled.div`
    width: 100%;    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`

const TimerLabel = styled.div`
    font-size: 2.5rem;
    display: flex;
    justify-content: space-between;

    @media screen and (width < 800px) {
        font-size: 1.5rem;
    }
`

const AlarmIndicator = styled.span<{$alarmIsPlaying: boolean, $alarmBlinkOn: boolean}>`
    color: ${({$alarmIsPlaying, $alarmBlinkOn}) => $alarmIsPlaying && !$alarmBlinkOn ? 'red' : 'darkred'}
`

const ClockMain = styled.main`
    font-family: "Seven Segment", sans-serif;
    font-size: 3rem;
    border: 1px inset silver;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 300px;

    @media screen and (width < 800px) {
        font-size: 2rem;
        width: 250px;
    }
`

const ClockSection = styled.section`
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
`

const TimerNumbers = styled.div<{$isStarted: boolean, $isRunning: boolean, $blinkOn: boolean}>`
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: ${({$isStarted, $isRunning, $blinkOn}) => $isStarted && !$isRunning && $blinkOn ? 'black' : 'red'}
`

const ClockFooter = styled.footer`
    color: silver;
    display: flex;
    justify-content: space-between;
    width: 300px;

    @media screen and (width < 800px) {
        width: 250px;
        font-size: 0.8rem;
    }
`

type DisplayProps = {
    timeLeft: number, 
    pomodorosLeft: number, 
    timerState: SessionType,
    alarmIsPlaying: boolean,
    isStarted: boolean,
    isRunning: boolean
}

export default function Display({timeLeft, pomodorosLeft, timerState, alarmIsPlaying, isStarted, isRunning}: DisplayProps) {
    const [isBlinking, setIsBlinking] = useState(false)
    const [blinkOn, setBlinkOn] = useState(false)
    const blinkIntervalRef = useRef(0)
    const [alarmIsBlinking, setAlarmIsBlinking] = useState(false)
    const [alarmBlinkOn, setAlarmBlinkOn] = useState(false)
    const alarmBlinkIntervalRef = useRef(0)

    const timeLeftInSeconds = timeLeft / 1000;
    const minutes = ('' + Math.floor(timeLeftInSeconds / 60)).padStart(2, '0')
    const seconds = ('' + timeLeftInSeconds % 60).padStart(2, '0')

    if (isStarted) {
        if (!isRunning && !isBlinking) {
            blinkIntervalRef.current = setInterval(() => setBlinkOn(prev => !prev), 500)
            setIsBlinking(true)
        } else if (isRunning && isBlinking) {
            clearInterval(blinkIntervalRef.current)
            setIsBlinking(false)
        }
    }

    if (alarmIsPlaying && !alarmIsBlinking) {
        alarmBlinkIntervalRef.current = setInterval(() => setAlarmBlinkOn(prev => !prev), 300)
        setAlarmIsBlinking(true)
    } else if (!alarmIsPlaying && alarmIsBlinking) {
        clearInterval(alarmBlinkIntervalRef.current)
        setAlarmIsBlinking(false)
    }

    return (
        <Clock>
            <ClockMain>
                <ClockSection>
                    <TimerLabel id="timer-label">
                        {timerState}
                        <AlarmIndicator $alarmIsPlaying={alarmIsPlaying} $alarmBlinkOn={alarmBlinkOn}><FontAwesomeIcon icon={faBell} /></AlarmIndicator>
                    </TimerLabel>                      
                    <TimerNumbers $isStarted={isStarted} $isRunning={isRunning} $blinkOn={blinkOn}>
                        <div id="time-left">{`${minutes}:${seconds}`}</div>
                        <div>{pomodorosLeft}</div>
                    </TimerNumbers>
                </ClockSection>
            </ClockMain>
            <ClockFooter>
                <div>Time left</div>
                <div>Pomodoros left</div>
            </ClockFooter>
        </Clock>
    )
}