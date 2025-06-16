import styled from "@emotion/styled"
import Timer from "./components/Timer"

export default function App() {

  const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
  `

  const Main = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `

  const Info = styled.div`
    margin-top: 10px;
    font-size:1.3rem;
  `

  return (
    <Body>
      <header>
        <h1>Pomodoro Timer</h1>
      </header>
      <Main>
        <Timer />        
          <Info>All - and + can be held down to rapidly change settings.</Info>
      </Main>
    </Body>
  )
}
