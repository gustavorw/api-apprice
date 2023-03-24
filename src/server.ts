import { app } from './config/app'
import env from './config/env'

app.listen(env.port, () => console.log(`Run server On port ${env.port}`))
