const bcrypt = require("bcrypt");

class User {  
    constructor(email,password){        
        this.email = email;
        this.password = password;
    }

    // getters
    get getEmail(){
        return this.email;
    }

    get getPassword(){
        return this.email;
    }


    // setters
    setEmail(email){
        this.email = email;
    }

    setPassword(password){
        this.password = password;
    }
    
}

module.exports = User;