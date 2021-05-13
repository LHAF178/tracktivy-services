import { Application } from 'express'
import fs from 'fs'
import path from 'path'

export default {
    load(app: Application) {
        let files = fs.readdirSync(path.join(__dirname, './controllers'))

        files.forEach(entry => {
            const filePath = path.join(__dirname, `./controllers/${entry}`)
            const routerPath = entry.substring(0, entry.indexOf('Controller')).toLowerCase()

            console.log(`[ROUTER] Loading ${entry} into /${routerPath}-service`)
            app.use(`/${routerPath}-service`, require(filePath).default)
            console.log(`[ROUTER] Loaded ${entry} into /${routerPath}-service`)
        })
    }
}