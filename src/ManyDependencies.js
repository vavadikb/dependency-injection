class ControllerFoo {
/**
 * @param {UserService} service
 * @param {UserController} controller 
 */

    constructor(service, controller){
        this.controller = controller
        this.service  = service 
    }

    foo(){
        console.log(this.service, this.controller)
        return "hello world"
    }
}