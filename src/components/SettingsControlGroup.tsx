import styled from "@emotion/styled"
import MouseDownButton from "./MouseDownButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"

const StyledSettingsControlGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px outset silver;
    padding: 10px;
`

const InnerSettingsControlGroup = styled.div`
    display: flex;
    justify-content: space-between;

    button {
        font-size: 1.5rem;
        font-weight: bold;
    }
`

const ControlDisplay = styled.div`
    font-family: "Seven Segment", sans-serif;
    font-size: 3rem;
    width: 4rem;
    text-align: right;
    border: 1px inset silver;
    padding: 10px;

    @media screen and (width < 800px) {
        font-size: 2rem;
        width: 3rem;
    }
`

const ControlLabel = styled.div`
    margin-top: 10px;
    color: silver;

    @media screen and (width < 800px) {
        font-size: 0.8rem;
    }
`

type SettingsControlGroupProps = {
    value: number, 
    minValue: number, 
    maxValue: number, 
    decreaseFn: () => void, 
    increaseFn: () => void, 
    valueLabel: string, 
    labelId: string,
    decrementId: string,
    incrementId: string,
    displayId: string
}

export default function SettingsControlGroup({value, minValue, maxValue, decreaseFn, increaseFn, valueLabel, labelId, decrementId, incrementId, displayId}: 
    SettingsControlGroupProps) {
    return (
        <StyledSettingsControlGroup>
            <InnerSettingsControlGroup>
                <MouseDownButton id={decrementId} onClick={decreaseFn} isDisabled={value <= minValue}><FontAwesomeIcon icon={faMinus} /></MouseDownButton>
                <ControlDisplay id={displayId}>{value}</ControlDisplay>
                <MouseDownButton id={incrementId} onClick={increaseFn} isDisabled={value >= maxValue}><FontAwesomeIcon icon={faPlus} /></MouseDownButton>
            </InnerSettingsControlGroup>
            <ControlLabel id={labelId}>
                {valueLabel}
            </ControlLabel>
        </StyledSettingsControlGroup>
    )
}