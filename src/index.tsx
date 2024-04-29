import { Frog, Button, TextInput } from 'frog'
import { Box, Heading, Text, VStack, vars, HStack, Image } from './ui.ts'

import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { abi } from '/abi.ts'

export const app = new Frog({
  ui: { vars },
}).frame('/', (c) => {
  return c.res({
    image: (
      <Box
        grow
        alignVertical="center"
        backgroundColor="blue"
        padding="32"
      >
        <VStack gap="4" alignHorizontal="center">
          <HStack gap="20" alignHorizontal="center">
            <Heading font="wutang" >Wu-Tang Name Generator</Heading>
            <Image src="/wutang.png" height="40" />
          </HStack >
          <Text color="black" size="20" >
            Make your Wu-Tang Forver. Wu-Tang On-Chain
          </Text>
          <Text font="wutang" color="white" size="20">Hi Zaydo</Text>
        </VStack>
      </Box >
    ),
    intents: [
      <TextInput placeholder="Enter your name to enter the Wu-Tang" />,
      <Button.Transaction target="/mint">Mint</Button.Transaction>
    ]
  })
})

app.transaction('/mint', (c) => {
  return c.contract({
    abi,
    chainId: 'eip155:8454',
    functionName: 'mint',
    args: [69420n],
    to: '0x3ad2C36db976B101B2Bed277F531e0efbF94ba42',
  })
})

devtools(app, { serveStatic })



/// Have to write a function that will get the token URI and decode it to get the first and last name. 

// import { serveStatic } from '@hono/node-server/serve-static'
// import { Button, Frog, TextInput } from 'frog'
// import { devtools } from 'frog/dev'
// // import { neynar } from 'frog/hubs'

// export const app = new Frog({
//   // Supply a Hub to enable frame verification.
//   // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
// })

// app.use('/*', serveStatic({ root: './public' }))

// app.frame('/', (c) => {
//   const { buttonValue, inputText, status } = c
//   const fruit = inputText || buttonValue
//   return c.res({
//     image: (
//       <div
//         style={{
//           alignItems: 'center',
//           background:
//             status === 'response'
//               ? 'linear-gradient(to right, #432889, #17101F)'
//               : 'black',
//           backgroundSize: '100% 100%',
//           display: 'flex',
//           flexDirection: 'column',
//           flexWrap: 'nowrap',
//           height: '100%',
//           justifyContent: 'center',
//           textAlign: 'center',
//           width: '100%'
//         }}
//       >
//         <img src="/wutang.png" alt="logo" id="logo" width="100" height="100" style="position: absolute; top: 0; right: 0;"></img>
//         <div
//           style={{
//             color: 'yellow',
//             fontSize: 60,
//             fontStyle: 'italic',
//             fontFamily: "Times New Roman, Times, serif",
//             letterSpacing: '-0.025em',
//             lineHeight: 1.4,
//             marginTop: 30,
//             padding: '0 120px',
//             whiteSpace: 'pre-wrap',
//           }}
//         >
//           {status === 'response'
//             ? `Your Wu-Tang is now forever ${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
//             : "Wu-tang On-Chain"}
//         </div>
//       </div>
//     ),
//     intents: [
//       <TextInput placeholder="Enter your name..." />,
//       <Button value="apples">Apples</Button>,
//       <Button value="oranges">Oranges</Button>,
//       <Button value="bananas">Bananas</Button>,
//       status === 'response' && <Button.Reset>Reset</Button.Reset>,
//     ],
//   })
// })

// devtools(app, { serveStatic })

