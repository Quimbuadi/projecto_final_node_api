import express from 'express'

const app = express()

//mock

const produtos = [
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

//criar rota padrao

app.get('/', (request, response) => {

    response.send('Testando Ambiente!')

})

app.get('/produto-list', (request, response) => {

    response.status(200).send(produtos)

})
 
export default app
