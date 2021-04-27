const express = require('express')
const app = express()

const auth = require('./routes/auth')
const people = require('./routes/people')

//Static Assets
app.use(express.static('./methods-public'))
//Parse Form Data
app.use(express.urlencoded({extended:false}))
//parse json
app.use(express.json())

app.use('/login', auth)
app.use('/api/people', people)


app.listen(5000, ()=>{
    console.log('Server is listening on Port 5000....')
})
