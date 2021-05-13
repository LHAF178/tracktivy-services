  
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import database from './database'
import router from './router'

require('dotenv').config({ path: `${__dirname}/../${process.env.NODE_ENV == 'production' ? `.env.${process.env.NODE_ENV}` : '.env'}` })

const app = express()

// Initialize compress extensions
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(cors())

router.load(app)

// app.prototype.disconnect = async () => {
//     await database.disconnect()
// }

app.get('/', async (req, res) => {
    return res.status(200).json({
        timestamp: new Date().getTime(),
        name: 'Outlack Services',
        endpoint: 'https://services.outlack.com.br'
    })
})

export default app