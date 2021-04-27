const express = require('express');
const {products} = require('./data');
// const path = require('path')

const app = express()

app.get('/', (req,res) => {
    res.send('<h1>Home Page</h1> <a href="/api/products"> products </a>')
})

app.get('/api/products', (req,res)=> {
    const newProducts = products.map((product) => {
        const {id, name, image} = product;
        return {id, name, image}
    })
    res.json(newProducts)
})

app.get('/api/products/:productId', (req,res)=> {

    //console.log(req.params)
    const {productId} = req.params;
    console.log(productId);
    const singleProduct = products.find((product) => product.id === Number(productId))

    if(!singleProduct)
    {
        return res.status(404).send('Product Does not Exist')
    }
    return res.json(singleProduct)
    
})

app.get('/api/v1/query', (req,res)=>{
    // console.log(req.query);
    const {search, limit} = req.query
    let sortedProducts = [...products]

    if(search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if(limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }

    if(sortedProducts.length < 1) {
        return res.status(200).json({success : true, data : []})
    }

    res.status(200).json(sortedProducts)
})

//set up static and middleware
// app.use(express.static('./public'))

// app.get('/', (req, res)=>{
//     res.status(200).send('Home Page')
// })

// app.get('/about', (req, res)=>{
//     res.status(200).send('About Page')
// })

// app.get('/', (req,res)=>{
//     res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
// })

// app.all('*', (req,res)=>{
//     res.status(404).send('<h1>Resource Not Found</h1>')
// })

app.listen(5000, ()=>{
    console.log('Server is listening on Port 5000....')
})
