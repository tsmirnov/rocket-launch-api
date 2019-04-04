import Router from 'koa-router'
import { data } from './data'

const router = new Router()

router.get('/data', async (ctx) => {
  const now = new Date().getTime()
  ctx.body = data.filter(item => item.launchTime > now)
})

export default router
