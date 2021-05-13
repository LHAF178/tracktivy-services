import app from './app'
import https from 'https'
import fs from 'fs'
import path from 'path'

if (process.env.USE_HTTPS) {
    const httpsServer = https.createServer({
        key: fs.readFileSync(path.join(__dirname, '../certificates/privkey.pem'), 'utf-8'),
        cert: fs.readFileSync(path.join(__dirname, '../certificates/cert.pem'), 'utf-8'),
        ca: fs.readFileSync(path.join(__dirname, '../certificates/chain.pem'), 'utf-8')
    }, app)
    
    httpsServer.listen(443, () => {
        console.log(`[API] Listening on port 443`)
    })
} else {
    // Start application 
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
        console.log(`[API] Listening on port ${port}`)
    })
}

