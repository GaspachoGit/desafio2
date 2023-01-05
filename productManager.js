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
        //Las siguientes lineas son usadas para validar que se ingrese siempre un objeto igual al usado, sin importar el orden
        const objetKeysArr = Object.keys(obj)// me queda un array de keys
        const objOrdered = objetKeysArr.sort() //ordeno ese mismo array
        const objStr = JSON.stringify(objOrdered) //paso ese array ordenado a cadena de texto
        const keys = ["code", "description", "price", "stock", "thumbnail" , "title"] //declaro el array que debe subir el usuario de forma ordenada
        const keysStr = JSON.stringify(keys) // paso ese mismo array a texto (podría declararlo como texto directamente pero me da miedito y pereza jejeje)
        
        if (keysStr === objStr) {//comparo el los dos objetos ordenados como strings 
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
        }else{
            console.log('usted ha ingresado un campo inválido o alguno incompleto')
        }
        await fs.promises.writeFile(path,JSON.stringify(product));
        return obj
    }

    getProductsById = async (id) =>{
        const products = await this.getProducts()
        return console.log(products.find(product => product.id === id)) 
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
    updateProduct = async(id, updatedProduct)=>{
        let products = await this.getProducts()
        const index = products.findIndex(product => product.id === id)
        if(index != -1){ //Verifico si existe el index
            if (updatedProduct.id === id) { //verifico si no se modificó el ID
                const keys = Object.keys(products[index])
                if(keys.length === Object.keys(updatedProduct).length){ //verifico que todos los campos sean válidos
                    products.splice(index, 1, updatedProduct)
                    await fs.promises.writeFile(path,JSON.stringify(products))
                    return console.log('objeto modificado correctamente')
                }
            }
        }
        return console.log('todo lo que ha podido fallar, ha fallado')
    }
}
let instancia = new ProductManager()

//linea 31 para ver las keys a utilizar al usar "addProducts"
/* instancia.addProducts({
    "title": "bananafdsa",
    "stock": 122,
    "description": "es literalmente una bananafdsa",
    "price": "yo no tengo preio, bitch x2fdsa",
    "thumbnail": "reultrasecretofads",
    "code": "123abdefghiy",
    
})*/
/* instancia.updateProduct(1, {title: "Bananita Dolca",
stock: 121,
description: "es literalmente una banananita Dolca",
price: "yo no tengo preio, bitch x2fdsa",
thumbnail: "reultrasecretofads",
code: "123abdefghiy",
id: 1}) */


