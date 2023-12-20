const classText = 'class Repository {\n' +
'\n' +
'    constructor(data){\n' +
'        this.data = data\n' +
'    }\n' +
'\n' +
'    get(){\n' +
'        return this.data\n' +
'    }\n' +
'    getById(id) {\n' +
'        console.log(this.data);\n' +
'        let item = this.data.find(item => item.id === id);\n' +
'        console.log(item)\n' +
'        return item.length ? item[0] : `Object with id ${id} not found`;\n' +
'    }\n' +
'\n' +
'    post(newObj){\n' +
'        return this.data.push({id:this.data[this.data.length - 1].id + 1 , ...newObj})\n' +
'    }\n' +
'\n' +
'    put(id, newObj){\n' +
'        try {\n' +
'            const index = this.data.findIndex(item => item.id === id);\n' +
'            try {\n' +
'                if(index){\n' +
'                    return this.data[index] = {id, ...newObj}\n' +
'                } else{\n' +
'                    throw new Error(`Object with id ${id} not found`)\n' +
'                }\n' +
'            }catch(e){\n' +
'                console.log(e)\n' +
'                throw e \n' +
'            }\n' +
'        }catch(e){\n' +
'            console.log(e)\n' +
'            throw e \n' +
'        }\n' +
'    }\n' +
'\n' +
'    delete(id){\n' +
'        try{\n' +
'            let item = this.data.find(item => item.id === id);\n' +
'            return item.length ? this.data = this.data.filter(item => item.id !== id) : `Object with id ${id} not found`;\n' +
'        }catch(e){\n' +
'            console.error(e)\n' +
'            throw e\n' +
'        }\n' +
'    }\n' +
'}'


const classConstructor = new Function(`
  ${classText}
  return Repository;
`)();

const helloWorldInstance = new classConstructor([ {id: 1, name:'Vadim', age: 20}, {id: 2,name:'Vasya', age: 22},  {id: 3,name:'Petya', age: 33},  {id: 4,name:'Kolya', age: 25}]);


let a = helloWorldInstance.get()
console.log(a)