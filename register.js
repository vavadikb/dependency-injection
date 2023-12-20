const createClass = require('./createClass')

let dbData = [ {id: 1, name:'Vadim', age: 20}, {id: 2,name:'Vasya', age: 22},  {id: 3,name:'Petya', age: 33},  {id: 4,name:'Kolya', age: 25}]

class DependencyContainer {
    constructor() {
        this.container = {};
    }

    get(){
        return this.container
    }

    register(className, instance) {
        this.container[className] = instance;
    }

    resolve(className) {
        if (this.container.hasOwnProperty(className)) {
            return this.container[className];
        } else {
            throw new Error(`Dependency not found for class: ${className}`);
        }
    }
}

let registerArray = []

function registerDependencies(allClasses, container) {
    allClasses.map(item=>{
        console.log(item[0].paramName)
           if (item[0].paramType===null){ // register first dependency 
                let newInstance = createClass(item[0].classfileContent, item[0].className, dbData)
                registerArray.push(item[0])
                container.register(item[0].className, newInstance)
            }
            if (registerArray.length){
                registerArray.map(regist =>{
                    allClasses.map(item =>{
                        if(item[0].paramType === regist.className){ // register second dependency 
                            const dependency = container.resolve(item[0].paramType)
                            const newInstance = createClass(item[0].classfileContent, item[0].className, dependency) // function that create new instance
                            registerArray.push(item[0])
                            container.register(item[0].className, newInstance)
                        }
                    })
                })
                registerArray.map(item => console.log(item.className, 'item'))
            }


    })
    return container;
}

const container = new DependencyContainer();
let array = [
    [
      {
        className: 'userController',
        classfileContent: 'class userController {\n' +
          '/**\n' +
          ' * @param {UserService} service\n' +
          ' */\n' +
          '        constructor(service){\n' +
          '            this.service = service\n' +
          '        }\n' +
          '    \n' +
          '        async getUsers(){\n' +
          '            try {\n' +
          '                return await this.service.getUsers()\n' +
          '            }catch (e){\n' +
          '                console.log(e)\n' +
          '                throw e\n' +
          '            }\n' +
          '        }\n' +
          '    \n' +
          '        async getUserById(id){\n' +
          '            try {\n' +
          '                return await this.service.getUserById(id)\n' +
          '            }catch (e){\n' +
          '                console.log(e)\n' +
          '                throw e\n' +
          '            }\n' +
          '        }\n' +
          '    \n' +
          '        async postUser(user){\n' +
          '            try {\n' +
          '                await this.service.postUser(user)\n' +
          '            }catch (e){\n' +
          '                console.log(e)\n' +
          '                throw e\n' +
          '            }\n' +
          '        }\n' +
          '    \n' +
          '        async putUser(id, newUserData){\n' +
          '            try{\n' +
          '                await this.service.putUser(id,newUserData)\n' +
          '            }catch(e){\n' +
          '    \n' +
          '            }\n' +
          '        }\n' +
          '    \n' +
          '        async deleteUser(userId){\n' +
          '            try {\n' +
          '                await this.service.deleteUser(userId)\n' +
          '            }catch (e){\n' +
          '                console.log(e)\n' +
          '                throw e\n' +
          '            }\n' +
          '        }\n' +
          '    }',
        paramName: 'service',
        paramType: 'UserService',
        constructorParams: ['service']
      }
    ],
    [
      {
        className: 'Repository',
        classfileContent: 'class Repository {\n' +
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
          '}',
        paramName: null,
        paramType: null,
        constructorParams: ['data']
      }
    ],
    [
      {
        className: 'UserService',
        classfileContent: 'class UserService {\n' +
          '/**\n' +
          ' * @param {Repository} dbRepository\n' +
          ' */\n' +
          '\n' +
          '    constructor(dbRepository){\n' +
          '        this.repository = dbRepository\n' +
          '    }\n' +
          '\n' +
          '    async getUsers(){\n' +
          '        try{\n' +
          '            return await this.repository.get()\n' +
          '        }catch(e){\n' +
          "            console.log(e, 'ERROR during getting users')\n" +
          '            throw e\n' +
          '        }\n' +
          '    }\n' +
          '\n' +
          '    async getUserById(id){\n' +
          '        try{\n' +
          '            return await this.repository.getById(id)\n' +
          '        }catch(e){\n' +
          "            console.log(e, 'ERROR during getting user by id')\n" +
          '            throw e\n' +
          '        }\n' +
          '    }\n' +
          '\n' +
          '    async postUser(user){\n' +
          '        try{\n' +
          '            return await this.repository.post(user)\n' +
          '        }catch(e){\n' +
          "            console.log(e, 'ERROR during post user')\n" +
          '            throw e\n' +
          '        }\n' +
          '    }\n' +
          '\n' +
          '    async putUser(id, newUserData){\n' +
          '        try{\n' +
          '            return await this.repository.put(id,newUserData)\n' +
          '        }catch(e){\n' +
          "            console.log(e, 'ERROR during post user')\n" +
          '            throw e\n' +
          '        }\n' +
          '    }\n' +
          '\n' +
          '    async deleteUser(userId){\n' +
          '        try{\n' +
          '            return await this.repository.delete(userId)\n' +
          '        }catch(e){\n' +
          '            console.log(e, "ERROR during delete user")\n' +
          '        }\n' +
          '    }\n' +
          '}',
        paramName: 'dbRepository',
        paramType: 'Repository',
        constructorParams: ['dbRepository']
      }
    ]
  ]
registerDependencies(array, container);
console.log(container.get())
const userServiceInstance = container.resolve('UserService');
const userControllerInstance = container.resolve('userController');
const repositoryInstance = container.resolve('Repository');
// console.log(await userControllerInstance.getUsers())// console.log(repositoryInstance)
async function abc(){
    console.log(await userServiceInstance.repository.data)
}
abc()