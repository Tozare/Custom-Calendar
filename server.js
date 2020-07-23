const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.static('./builds/'))

const PORT = process.env.PORT || 3001

app.get('/*', (req, res) => {
    fs.readFile('./builds/index.html', 'utf8', (err, data) => {
        res.send(data)
    })
})

app.listen(PORT, () => {
    console.log('server started at http://localhost:' + PORT)
})
