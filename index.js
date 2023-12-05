class UserController{
/**
 * @param {UserService} service
 */
    constructor(service){
        this.service = service
    }

    async getUsers(){
        try {
            return await this.service.getUsers()
        }catch (e){
            console.log(e)
            throw e
        }
    }

    async getUserById(id){
        try {
            return await this.service.getUserById(id)
        }catch (e){
            console.log(e)
            throw e
        }
    }

    async postUser(user){
        try {
            await this.service.postUser(user)
        }catch (e){
            console.log(e)
            throw e
        }
    }

    async putUser(id, newUserData){
        try{
            await this.service.putUser(id,newUserData)
        }catch(e){

        }
    }

    async deleteUser(userId){
        try {
            await this.service.deleteUser(userId)
        }catch (e){
            console.log(e)
            throw e
        }
    }
}

/**
 * @param {Repository} dbRepository
 */

class UserService {
    constructor(dbRepository){
        this.repository = dbRepository
    }

    async getUsers(){
        try{
            return await this.repository.get()
        }catch(e){
            console.log(e, 'ERROR during getting users')
            throw e
        }
    }

    async getUserById(id){
        try{
            return await this.repository.getById(id)
        }catch(e){
            console.log(e, 'ERROR during getting user by id')
            throw e
        }
    }

    async postUser(user){
        try{
            return await this.repository.post(user)
        }catch(e){
            console.log(e, 'ERROR during post user')
            throw e
        }
    }

    async putUser(id, newUserData){
        try{
            return await this.repository.put(id,newUserData)
        }catch(e){
            console.log(e, 'ERROR during post user')
            throw e
        }
    }

    async deleteUser(userId){
        try{
            return await this.repository.delete(userId)
        }catch(e){
            console.log(e, "ERROR during delete user")
        }
    }
}


class Repository {
    constructor(data){
        this.data = data
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

class Container {
    constructor(){
        this.instances = new Map()
    }

    register(key, instance){
        this.instances.set(key,instance)
    }

    resolve(key) {
        if (!this.instances.has(key)) {
          throw new Error(`Dependency not registered: ${key}`);
        }
    
        return this.instances.get(key);
      }
}

class App {
    constructor(){
        this.container = new Container()
        this.registerDependencies()
    }

    registerDependencies(){
        this.container.register('database', new Repository([ {id: 1, name:'Vadim', age: 20}, {id: 2,name:'Vasya', age: 22},  {id: 3,name:'Petya', age: 33},  {id: 4,name:'Kolya', age: 25}]));
        this.container.register('UserService', new UserService(this.container.resolve('database')));
        this.container.register('UserController', new UserController(this.container.resolve('UserService')))
    }

    async start(){
        const userControllerClass = this.container.resolve('UserController');
        await userControllerClass.postUser({name:'VADIK', age: 22})
        await userControllerClass.putUser(2, {name:'', age:0})
        let result = await userControllerClass.getUsers()
    
        console.log(result)
    }
}

const app = new App()
app.start()