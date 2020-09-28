import Head from 'next/head'
import styled from 'styled-components'
import tw from 'twin.macro'
import {Machine} from 'xstate'
import {useMachine} from '@xstate/react'

const CheckBoxMachine = Machine({
  states: {
    switched_off: {
      on: {
        TOGGLE_SWITCH: {
          target: "switched_on"
        }
      }
    },
    switched_on: {
      on: {
        TOGGLE_SWITCH: {
          target: "switched_off"
        }
      }
    }
  },
  initial: "switched_on"
})
const Container = styled.div`
${tw `

`}
`

export default function Home() {
  const [state, send] = useMachine(CheckBoxMachine)
  console.log(state.value)
  return (
    <Container>
      <p>
        checkbox
      </p>
      <button onClick= {() => (send("TOGGLE_SWITCH"))}>toggle switch</button>
      <input type="checkbox" checked={state.value === "switched_on"} onChange= {() => (send("TOGGLE_SWITCH"))}/>
    </Container>
  )
}
