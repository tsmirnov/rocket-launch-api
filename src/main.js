import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './router'
import cors from '@koa/cors'
import loadApiData from './data'

const startServer = async () => {
  console.log('loading data to memory')
  await loadApiData()
  console.log('data is loaded')

  const app = new Koa()
  app.use(cors())
  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.listen(3000)

  console.log('server is started at port 3000')
}

startServer()
