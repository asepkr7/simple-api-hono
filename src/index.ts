import { Hono } from 'hono'
import { Routes } from './routes/index'
// import { serve } from "@hono/node";
const app = new Hono().basePath('/api')
// app.basePath('/api')
app.route('/user', Routes)


export default app;
