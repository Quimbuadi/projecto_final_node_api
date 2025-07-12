import app from './src/app.js'

import connection from './src/infrastructure/database/connection.js'

const PORT = 3000

//fazer connection 
connection.connect((error) => {

    if(error){
        console.log(error.message)
    }

    console.log('conexao realizada com sucesso!')

    //escutar a porta 3000
    app.listen(PORT, () => {

        console.log(`Servidor rodando no endereco  http://localhost:${PORT}`)

    })
})

