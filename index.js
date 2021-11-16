let express = require('express');
const Contenedor = require('./Contenedor');
let app = express();
const PORT = 3000;
const RUTA_ARCHIVO = './productos.txt';
let contenedor = new Contenedor(RUTA_ARCHIVO);

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost: ${PORT}`)
})

app.get('/productos', async (req, res)=>{
    let productos = await contenedor.getAll();
    res.json({productos:productos})
})

app.get('/productoRandom', async (req, res)=>{
    let productos = await contenedor.getAll();
    let random = Math.floor(Math.random()*productos.length);
    res.json({productoRandom:productos[random]});
})