const fs = require('fs')
const express = require('express')
const multer = require('multer')
const app = express()

const port = 8080

//app.use(express.static('public'))

const router = express.Router()
router.use(express.urlencoded({extended: true}))
router.use(express.json())
const server = app.listen(port,()=>{
  console.log(`server up and running at port ${server.address().port}`)
})

server.on('error',(error)=> console.log(`hubo error en  ${error}` ) )

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html')
  res.json()
})

//GET - devuelve todos los productos.

//Lee los productos en products.txt , los parsea (pasa de string a objeto) y los devuelve.

router.get('/productos', (req,res) => {

try{
          function getProducts(){
          const contenido = fs.readFileSync('./products.txt', 'utf-8') 
          const json = JSON.parse(contenido.split(","))
          return json
          }
        }
    
      catch(err) {
        console.log("contenido no leido",err)
      }   

res.json(getProducts())

})

//GET -devuelve un producto según su id.

//Lee los productos en products.txt , los parsea (pasa de string a objeto) y devuelve aquel según el id colocado como param.

router.get('/productos/:id', (req,res) => {

try{
          function getId(){
          const contenido = fs.readFileSync('./products.txt', 'utf-8') 
          const json = JSON.parse(contenido.split(","))
          return json.find(product => product.id == req.params.id)
          }
        }
    
      catch(err) {
        console.log("contenido no leido",err)
      } 

if(getId() == 'undefined') {res.json({ error : 'producto no encontrado' })}

else {res.json(getId())}  

})

//POST - recibe y agrega un producto, y lo devuelve con su id asignado.


router.post('/productos', (req,res) => {

let setId

try{
          function postProducts(){
          //En este punto es un string
          const contenido = fs.readFileSync('./products.txt', 'utf-8') 
          //Aqui ya es un objeto
          let json = []
          if(contenido.length > 0) {json = JSON.parse(contenido.split(","))}
          const body = req.body
          setId = json.length + 1
          req.body.id = setId
          json.push(body)
          return json
          
          }
        }
    
      catch(err) {
        console.log(err)
      }   



// De Objeto, lo vuelvo a pasar a string con stringify

    const info = JSON.stringify(postProducts(),null,2)

// finalmente, sobre escribo el contenido del archivo txt con el nuevo array hecho string

    fs.writeFile('./products.txt' , info , (error, data) => {

//Si hay algun error al guardar el archivo, mostrar en consola tal error
      if(error){
        console.log(error)
      } 
//Si no hay ningun error, mostrar mensaje de exito en la consola
      else {
        console.log('Productos agregados')
      }
    })

res.json({mensaje: `producto agregado con exito. id asignado: ${setId} `})

})

//PUT - recibe y actualiza un producto según su id.

router.put('/productos/:id', (req,res) => {

let json

try{
          function putId(){
          const contenido = fs.readFileSync('./products.txt', 'utf-8') 
          json = JSON.parse(contenido.split(","))
          const selected = json.find(product => product.id == req.params.id)
          selected.title = req.body.title
          selected.price = req.body.price
          selected.thumbnail = req.body.thumbnail
          return json
          }
        }
    
      catch(err) {
        console.log(err)
      } 

// De Objeto, lo vuelvo a pasar a string con stringify

    const info = JSON.stringify(putId(),null,2)

// finalmente, sobre escribo el contenido del archivo txt con el nuevo array hecho string

    fs.writeFile('./products.txt' , info , (error, data) => {

//Si hay algun error al guardar el archivo, mostrar en consola tal error
      if(error){
        console.log(error)
      } 
//Si no hay ningun error, mostrar mensaje de exito en la consola
      else {
        console.log('Producto actualizado')
      }
    })

res.json({mensaje: 'producto actualizado con exito'})

})


//DELETE - Elimina un producto dado su id

router.delete('/productos/:id', (req,res) => {

try{
          function deleteId(){
          const contenido = fs.readFileSync('./products.txt', 'utf-8') 
          const json = JSON.parse(contenido.split(","))
          const filtered = json.filter(product => product.id != req.params.id)
          return filtered
        }
        }
    
      catch(err) {
        console.log(err)
      } 

// De Objeto, lo vuelvo a pasar a string con stringify

    const info = JSON.stringify(deleteId(),null,2)

// finalmente, sobre escribo el contenido del archivo txt con el nuevo array hecho string

    fs.writeFile('./products.txt' , info , (error, data) => {

//Si hay algun error al guardar el archivo, mostrar en consola tal error
      if(error){
        console.log(error)
      } 
//Si no hay ningun error, mostrar mensaje de exito en la consola
      else {
        console.log(`producto ${req.params.id} eliminado con exito`)
      }
    })

res.json({mensaje: `producto ${req.params.id} eliminado con exito`})

})

app.use('/api', router)