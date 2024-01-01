class Repository {

    constructor() {
        this.data = [
            { id: 1, name: "Vadim", age: 20 },
            { id: 2, name: "Vasya", age: 22 },
            { id: 3, name: "Petya", age: 33 },
            { id: 4, name: "Kolya", age: 25 },
          ]
    }

    get(){
        return this.data
    }
    getById(id) {
        console.log(this.data);
        let item = this.data.find(item => item.id === id);
        console.log(item)
        return item.length ? item[0] : `Object with id ${id} not found`;
    }

    post(newObj){
        return this.data.push({id:this.data[this.data.length - 1].id + 1 , ...newObj})
    }

    put(id, newObj){
        try {
            const index = this.data.findIndex(item => item.id === id);
            try {
                if(index){
                    return this.data[index] = {id, ...newObj}
                } else{
                    throw new Error(`Object with id ${id} not found`)
                }
            }catch(e){
                console.log(e)
                throw e 
            }
        }catch(e){
            console.log(e)
            throw e 
        }
    }

    delete(id){
        try{
            let item = this.data.find(item => item.id === id);
            return item.length ? this.data = this.data.filter(item => item.id !== id) : `Object with id ${id} not found`;
        }catch(e){
            console.error(e)
            throw e
        }
    }
}

module.exports = Repository