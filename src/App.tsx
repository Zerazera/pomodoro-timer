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
    justify-content: center;
  `

  return (
    <Body>
      <header>
        <h1>Pomodoro Timer</h1>
      </header>
      <Main>
        <Timer />
      </Main>
    </Body>
  )
}
