class UserService {
/**
 * @param {Repository} dbRepository
 */

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


module.exports = UserService