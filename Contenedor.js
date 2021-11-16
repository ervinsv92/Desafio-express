const fs = require('fs');

class Contenedor{
    constructor(path){
        this.path = path;
        this.init();
    }

    async init(){
        this.productos = []
        await this.getAll()
    }

    async save(producto){
        const id = this.getNewId();
        this.productos.push({
            id,
            title:producto.title,
            price:producto.price,
            thumbnail:producto.thumbnail
        });
        await this.saveFile();
        return id;
    }

    getById = (id)=> this.productos.find(x =>x.id === id);
    async getAll(){
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            if(data){
                this.productos = JSON.parse(data)
            }else{
                this.productos = [];
            }
        } catch (error) {
            console.error("getAll:", error)
        }

        return this.productos;
    }
    async deleteById(id){
        this.productos = this.productos.filter(x => x.id != id);
        await this.saveFile();
    }
    async deleteAll(){
        this.productos = [];
        await this.saveFile();
    }

    getNewId(){
        if(this.productos.length === 0){
            return 1;
        }else{
            const listaId = this.productos.map(prod=>prod.id);
            const max = Math.max(...listaId);
            return max + 1;
        }
    }

    async saveFile(){
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.productos));
        } catch (error) {
            console.error("saveFile: ", error)
        }
    }
}

module.exports = Contenedor;