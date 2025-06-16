import styled from "@emotion/styled"
import SettingsControlGroup from "./SettingsControlGroup"

const StyledSettingsBank = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 10px;
    gap: 10px;

    @media screen and (width < 800px) {
        grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    }
`

type SettingsBankProps = {
    sessionLength: number,
    increaseSessionLength: () => void,
    decreaseSessionLength: () => void,
    shortBreakLength: number,
    increaseShortBreakLength: () => void,
    decreaseShortBreakLength: () => void,
    longBreakLength: number,
    increaseLongBreakLength: () => void,
    decreaseLongBreakLength: () => void,
    maxPomodoros: number,
    increaseMaxPomodoros: () => void,
    decreaseMaxPomodoros: () => void
}

export default function SettingsBank({sessionLength, increaseSessionLength, decreaseSessionLength, shortBreakLength, increaseShortBreakLength, 
    decreaseShortBreakLength, longBreakLength, increaseLongBreakLength, decreaseLongBreakLength, maxPomodoros, increaseMaxPomodoros, 
    decreaseMaxPomodoros}: SettingsBankProps) {
    return (
        <StyledSettingsBank>
            <SettingsControlGroup 
                value={sessionLength} 
                minValue={1} 
                maxValue={60} 
                decreaseFn={decreaseSessionLength} 
                increaseFn={increaseSessionLength} 
                valueLabel="Session Length" 
                labelId="session-label"
                decrementId="session-decrement"
                incrementId="session-increment"
                displayId="session-length" 
            />
            <SettingsControlGroup 
                value={shortBreakLength} 
                minValue={1} 
                maxValue={60} 
                decreaseFn={decreaseShortBreakLength} 
                increaseFn={increaseShortBreakLength} 
                valueLabel="Short break length" 
                labelId="break-label"
                decrementId="break-decrement"
                incrementId="break-increment"
                displayId="break-length" 
            />
            <SettingsControlGroup 
                value={longBreakLength} 
                minValue={1} 
                maxValue={60} 
                decreaseFn={decreaseLongBreakLength} 
                increaseFn={increaseLongBreakLength} 
                valueLabel="Long break length"
                labelId="long-break-label"
                decrementId="long-break-decrement"
                incrementId="long-break-increment"
                displayId="long-break-length"
            />
            <SettingsControlGroup 
                value={maxPomodoros} 
                minValue={1} 
                maxValue={99} 
                decreaseFn={decreaseMaxPomodoros} 
                increaseFn={increaseMaxPomodoros} 
                valueLabel="Max Pomodoros" 
                labelId="pomodoros-label"
                decrementId="pomodoros-decrement"
                incrementId="pomodoros-increment"
                displayId="max-pomodoros"
            />
        </StyledSettingsBank>
    )
}