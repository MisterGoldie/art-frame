import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
export const config = {
runtime: 'edge',
}

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  hub: neynar({ apiKey: '71332A9D-240D-41E0-8644-31BD70E64036' }),
  title: 'paintings',
})

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    action: '/secondframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmRySwchvWSkxq37N7t5KiEYBqh27rSjw89TeVc1swbHDj",
    intents: [
      <Button>Enter</Button>,
    ],
  })
})

app.frame('/secondframe', (c) => {
  return c.res({
    action: '/thirdframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmcDxTRgrvbwu1WYdqfrtcYFNKGgZvtHy1kRN4KyFMoXXC",
    intents: [
      <Button action="/">Back</Button>,
      <Button>Next</Button>
    ],
  })
})

app.frame('/thirdframe', (c) => {
  return c.res({
    action: '/fourthframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmPQRLKdi6K5hJAecqXf9Cq4KGtDdAgNkCichcyzxhwLxL",
    intents: [
      <Button action="/secondframe">Back</Button>,
      <Button>Next</Button>
    ],
  })
})

app.frame('/fourthframe', (c) => {
  return c.res({
    action: '/',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmSEuX8JD51eigJMunxR8UMRsGUwNPXUAvQVXwzbBEZorq",
    intents: [
      <Button action="/thirdframe">Back</Button>,
      <Button action="/">Home</Button>,
    ],
  })
})

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)