import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Routes } from './routes/index'

const app = new Hono().basePath('/api')
app.use('*', cors())
app.route('/', Routes)


export default app;
