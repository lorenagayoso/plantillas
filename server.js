// load the things we need
const express = require('express');
const app = express();
const fs = require('fs')

const port = 3000

app.use(express.static(__dirname + '/public'));


const router = express.Router()
router.use(express.urlencoded({extended: true}))
router.use(express.json())
const server = app.listen(port,()=>{
  console.log(`server up and running at port ${server.address().port}`)
})

server.on('error',(error)=> console.log(`hubo error en  ${error}` ) )

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file


//app.get for index page (home)

router.get('/', function(req, res) {
    res.render('pages/index');
});


router.post('/', (req,res) => {


let setId
try{
      
      //transformo mi objeto para que sea compatible con los objetos de mi archivo Productos.txt
      
      // De objeto paso el req body a array para poder aplicar método reduce

         let result = req.body; 
      
          function postProducts(){
            //En este punto es un string
            const contenido = fs.readFileSync('./products.txt', 'utf-8') 
            //Aqui ya es un objeto
            let json = []
              if(contenido.length > 0) {json = JSON.parse(contenido.split(","))}
              const body = result
              console.log(json.length)
              setId = json.length + 1 
              body.id = setId
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

res.render('pages/index');

//res.json({mensaje: `producto agregado con exito`})

})





router.get('/about', (req,res) => {

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

//res.json(getProducts())

const products = getProducts()

res.render('pages/about', {
        products: products
    });

})

app.use('/', router)
