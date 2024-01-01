
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
    
module.exports = UserController