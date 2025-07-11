import express, { response } from 'express'
import {query, validationResult, param, body} from "express-validator"

const app = express()

 //indicar para o express ler body com json.
 app.use(express.json())

//mock

const products = [
    {
        id: 1,
        name: "Monitor ultra-wide",
        size: "27",
        quant: 20,
        price: 20000,
        categ: "electronic"
    },
    {
        id: 2,
        name: "Teclado Mecanico, t50",
        size: "medio",
        quant: 50,
        price: 40000,
        categ: "electronic"
    },
    {
        id: 3,
        name: "ssd-nvme",
        size: "512 GB",
        quant: 10,
        price: 18000,
        categ: "electronic"
    }
]

//function que busca product por id

function searchProductById(id){
    return products.find(product => product.id == id)
}

//function que busca o index do objecto no array atraves do id

function searchProductIndexById(id){

    return products.findIndex(product => product.id == id)

}



//router baselet productIndex = searchProductIndexById(dataResult)

app.get('/', (request, response) => {

    response.send('endereco base da nossa api')

})
//route list products
app.get('/products-list', (request, response) => {

    response.status(200).send(products)

})

//route search product by id
app.get('/products/:id', param('id').isInt().withMessage('Id deve ser inteiro'), (request, response) => {

    let errors = validationResult(request)

    if(!errors.isEmpty()){
        response.status(400).json({errors : errors.array()})
    }

    let dataResult = (searchProductById(request.params.id))

    if(dataResult){
        response.json(dataResult)
    }else{
        response.status(404).json({message: "produto nao encontrado"})
    }

})

//route delete product by id

app.delete('/products/:id', param('id').isInt().withMessage('Id deve ser um inteiro'), (request, response) => {

    let errors = validationResult(request)

    if(!errors.isEmpty()){
        response.status(400).json({errors : errors.array()})
    }
    let index = searchProductIndexById(request.params.id)
    if(!index){
        response.json({message: "produto nao encontrado!"})
    }

    products.splice(index, 1)

    response.status(201).json({message: 'produto deletado com sucesso!'})

})

//route update product (put)
app.put('/products/:id',
    [
        param('id').isInt({min: 1}).withMessage("Id deve ser um inteiro positivo"),
        body('name').notEmpty().isString().withMessage("o campo nome deve ser preenchido com string"),
        body('size').notEmpty().isString().withMessage("o campo size deve ser preenchido!"),
        body('quant').isInt({min: 1}).withMessage("o campo quantidade deve receber inteiro positivo!"),
        body('price').isFloat({gt: 0}).withMessage("o preco deve ser maior que zero!"),
        body('categ').isString().withMessage("categoria deve ser string!")
    ], (request, response) => {

    let {name, size, quant, price, categ} = request.body

    let id = request.params.id

    let errors = validationResult(request)

    if(!errors.isEmpty()){
        response.status(400).json({errors: errors.array()})
    }

    let index = searchProductIndexById(request.params.id)

    console.log(index)

    if(index == -1){
        response.json({message: "produto nao encontrado ou id invalido!"})
    }

    products[index] = {id, name, size, quant, price, categ}
    response.status(201).json({message: "produto atualizado com sucesso!"})
})

//route insert product
app.post('/products', (request, response) => {
    products.push(request.body)

    response.status(201).send("success on insert data!")
})
 
export default app
