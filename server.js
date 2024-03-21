const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.json())
app.set('view engine', 'pug')

app.get('/',(req,res) => {
    res.send(`welcome to home route`)
})

app.get('/products',(req,res) => {
let products = JSON.parse(fs.readFileSync("products.txt").toString())
let productTitles = products.map((p) => {
    return {title:p.title,id:p.id}
})
res.render('Products',{ptitle:productTitles})
})

app.get('/products/:id',(req,res) => {
    let products = JSON.parse(fs.readFileSync("products.txt").toString())
    let filteredProduct = products.filter((p) => {
        return p.id == req.params.id
    })
    if(filteredProduct.length === 0){
        return res.status(404).json({err:"product not created"})
    }else{
        // res.send(filteredProduct)
        res.render('SingleProduct',{sp:filteredProduct[0]})
    }
})
const PORT = 3800

app.listen(`${PORT}`,() => {
    console.log(`server is running on PORT ${PORT}`)
})