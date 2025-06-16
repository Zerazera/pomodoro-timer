import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faStop, faPause, faRotate, faBellSlash } from "@fortawesome/free-solid-svg-icons"
import ControlButton from "./ControlButton"

const StyledControlBank = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    color: silver;
    font-size: 2rem;
    gap: 5%;
    margin-top: 10px;
`

type ControlBankProps = {
    runTimer: () => void,
    pauseTimer: () => void, 
    stopTimer: () => void,
    reset: () => void,
    isRunning: boolean,
    alarmIsPlaying: boolean,
    silenceAlarm: () => void
}

export default function ControlBank({runTimer, pauseTimer, reset, isRunning, alarmIsPlaying, silenceAlarm, stopTimer}: ControlBankProps) {
    return (
        <StyledControlBank>
            <ControlButton 
                id="start_stop" 
                onClick={isRunning ? pauseTimer : runTimer}
            >
                <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
            </ControlButton>
            <ControlButton
                id="stop"
                onClick={stopTimer}
            >
                <FontAwesomeIcon icon={faStop} />
            </ControlButton>
            <ControlButton 
                id="reset" 
                onClick={reset}
            >
                <FontAwesomeIcon icon={faRotate} />
            </ControlButton>
            <ControlButton 
                onClick={silenceAlarm} 
                disabled={!alarmIsPlaying}
            >
                <FontAwesomeIcon icon={faBellSlash} />
            </ControlButton>
        </StyledControlBank>
    )
}