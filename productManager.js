const fs = require('fs')

const path = './Products.json'

class ProductManager{
    escrituraDeData = async (data) =>{
        try{
            await fs.promises.writeFile (path, JSON.stringify(data, null, 2))
        }catch{
            console.log(error)
        }
    }
    getProducts = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
/*             console.log(data); */
            const products = JSON.parse(data);
            return products;
        }
        else{
            console.log([])
            return []
        }
    }
    addProducts = async(obj) =>{
        const product = await this.getProducts()
        let id;
        if (product.length === 0) {
            id = 1
            let newObj = {...obj, id: id}
            let codes = product.map(productos => productos.code)
            if (codes.includes(obj.code)) {
                console.log('El código ya ha sido utilizado')
            }else{ 
                product.push(newObj)
            } 
        }else{
            id = product[product.length-1].id+1;
            let newObj = {...obj, id: id}
            let codes = product.map(productos => productos.code)
            if (codes.includes(obj.code)) {
                console.log('El código ya ha sido utilizado')
            }else{ 
                product.push(newObj)
            } 
        }
        await fs.promises.writeFile(path,JSON.stringify(product));
        return obj
    }
    getProductsById = async (id) =>{
        const productos = await this.getProducts()
        if(productos[id-1]){
        return console.log(productos[id-1])  
        }else{
            console.log('not found')
        }
    }
    deleteById = async (id) =>{
        let productos = await this.getProducts()
        let ids = productos.map(prod => prod.id) 
        if (ids.includes(id)) {
            try{
                productos = productos.filter (producto => producto.id != id)
                await fs.promises.writeFile(path,JSON.stringify(productos));
            }catch(error){
                console.log(error)
            }
        }else{
            console.log('not Found')
        }
    }

}
let instancia = new ProductManager()
/* instancia.getProductsById(2)
 */   /* instancia.deleteById(2)  */ 
   instancia.addProducts({
    "title": "bananafdsa",
    "description": "es literalmente una bananafdsa",
    "price": "yo no tengo preio, bitch x2fdsa",
    "thumbnail": "reultrasecretofads",
    "code": "123abdefgh",
    "stock": 122,
    
})      


