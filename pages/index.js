import Head from 'next/head'
import styled from 'styled-components'
import tw from 'twin.macro'
import {Machine} from 'xstate'
import {useMachine} from '@xstate/react'

const data = [
  "addsg fgfghfg",
  "asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasasdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfsfs",

  "asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasasdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfsfs",

  "asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasasdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfs asdfasdf asdasfasf asdfasdfsdf adfasdfsdf a fsfdasfsfs"

]
const ReadMoreMachine = Machine({
  initial: 'unknown',
  states: {
    unknown: {
      always: [
        {
        target: "disabled",
        cond: "textLengthLessThan200"
      },
      {
        target: "clipped"
      }
    ]
    },
    clipped: {
      on: {
        TOGGLE_CLIP: 'unclipped'
      }
    },
    unclipped: {
      on: {
        TOGGLE_CLIP: 'clipped'
      }
    },
    
    disabled: {}
  }
}, {
  guards: {
    textLengthLessThan200: function(context) {
      console.log(context.content.length)
      return context.content.length < 200


    }
  }
});

const Card = ({content}) => {
  
  const [state, send] = useMachine(ReadMoreMachine, {
    context: {
      content
    }
  })
  const textToShow = state.value === "clipped" ? content.slice(0, 200): content
  return (
  <div css={tw `bg-white p-12 rounded shadow mb-12`}> 
    <p>
      {textToShow} ... {" "}
      <span>(Actual text length: {content.length})</span>
    </p>
    {
      state.value === "disabled"? null: <button onClick={() => {
        console.log("clicked")
        send("TOGGLE_CLIP")
      }}
      css={tw `border p-2 mt-4 bg-gray-100 hover:text-gray-700 rounded text-sm`}>
        read more
      </button>
    }
  </div>
  )
}

// const CheckBoxMachine = Machine({
//   states: {
//     switched_off: {
//       on: {
//         TOGGLE_SWITCH: {
//           target: "switched_on"
//         }
//       }
//     },
//     switched_on: {
//       on: {
//         TOGGLE_SWITCH: {
//           target: "switched_off"
//         }
//       }
//     }
//   },
//   initial: "switched_on"
// })

const Container = styled.div`
${tw `
text-center sm:text-xl pt-56 px-8 text-gray-900 bg-gray-100 min-h-screen
`}
`

export default function Home() {
  return (
    <Container>
      {
        data.map((content,i) => (<Card content={content} key={i.toString()}/>))
      }
    </Container>
  )
}

