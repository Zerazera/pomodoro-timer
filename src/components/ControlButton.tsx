import styled from "@emotion/styled"

export default styled.button`
    background-color: black;
    font-size: 2rem;
    color: silver;
    border: none;
    cursor: pointer;

    &:active {
        color: white;
    }

    &:disabled {
        cursor: not-allowed;
        color: silver;  
    }
`