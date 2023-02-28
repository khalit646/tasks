class Product{
    constructor(name, price, quantity, description){
        this.name = name
        this.price = price
        this.quantity = quantity
        this.description = description
    }
}

let products = [
    new Product("Monitor", 500, 13, "Monitor for your PC"),
    new Product("Mouse", 400, 10, "Mouse for your PC"),
    new Product("Keyboard", 300, 15, "Keyboard for your PC"),
    new Product("Wheel", 700, 4, "Wheel for your car"),
    new Product("System block", 1000, 2, "System block for your PC"),
    new Product("Chair", 500, 10, "Chair for your PC or kitchen")
]

//console.log(filterProducts("name-contains-mo"))
//console.log(filterProducts("price->=500&description-ends-pc"))
//console.log(filterProducts("quantity-=10"))

function filterProducts(temp){
    let spl = temp.split("&")
    let preds = {}
    for(let i of spl){
        let a = i.split("-")
        let name = a[0]
        if(preds[name] === undefined){
            preds[name] = []
        }
        if(a.length == 2){
            let end = a[1].search(/\d/)
            preds[name].push({
                type: a[1].slice(0, end),
                value: +a[1].slice(end)
            })
        }else{
            preds[name].push({
                type: a[1],
                value: a[2].toLowerCase()
            })
        }
    }
    return products.filter(v=>{
        for(let i in preds){
            for(let j of preds[i]){
                switch(j.type){
                    case "contains":
                        if(!v[i].toLowerCase().includes(j.value)){
                            return false
                        }
                        break
                    case "starts":
                        if(!v[i].toLowerCase().startsWith(j.value)){
                            return false
                        }
                        break
                    case "ends":
                        if(!v[i].toLowerCase().endsWith(j.value)){
                            return false
                        }
                        break
                    case "=":
                        if(v[i] !== j.value){
                            return false
                        }
                        break
                    case ">":
                        if(v[i] <= j.value){
                            return false
                        }
                        break
                    case "<":
                        if(v[i] >= j.value){
                            return false
                        }
                        break
                    case ">=":
                        if(v[i] < j.value){
                            return false
                        }
                        break
                    case "<=":
                        if(v[i] > j.value){
                            return false
                        }
                        break
                }
            }
        }
        return true
    })
}