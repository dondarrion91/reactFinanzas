// packages
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// classes
const User = require('../modules/User');

// models
const Users = require('../models/Users');

exports.newUser = async(req,res) => {    
    // user data from the frontend form
    let {email,password} = req.body;    
    // new user object
    let user = new User(email,password);
    

    try{
        // hash password and set it to the user object
        user.password = await bcrypt.hash(user.password,12);                               
        
        await Users.create({
            email: user.email,
            password: user.password
        });

        res.json({
            message: "Registration completed"
        });    
    }catch(error){
        console.log(error.name);
        if(error.name === "SequelizeUniqueConstraintError"){
            res.status(500).json({
                message: "This user already exists"
            });
        }else{
            res.status(500).json({
                message: "Error"
            });
        }    
    }                    
}

// login user
exports.login = async (req,res,next) => {

    let {email,password} = req.body;

    try{
        const nowUser = await Users.findOne({
            where: {
                email
            }
        });

        if(!nowUser){
            //user not found
            res.status(401).json({
                message: "User not found"
            });
            next();
        }else{                                    
            // comapare password
            if(!bcrypt.compareSync(password,nowUser.password)){
                // si el password es incorrecto
                await res.status(401).json({
                    mensaje: "Wrong password"
                })
                next();
            }else{
                // generate token
                const token = jwt.sign({
                    email: nowUser.email,                    
                    id: nowUser.id
                },process.env.SECRETKEY,
                {
                    expiresIn: '1h'
                }
                );

                // send token
                res.json({token});
            }
        
        }                         
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error"
        });
    }
}

// update optional user data
exports.userUpdate = async(req,res) => {            

    // data from frontend
    let {fullname,birthdate,image} = req.body;        

    // date object
    let d = new Date();

    // Authorization headers
    const header = req.get("Authorization");

    // if there is no auth headers send error message
    if(!header){
        const error = new Error('Authentication error');        
        res.status(401).json({            
            message: error.message
        });
    }

    // filter token
    const token = header.split(' ')[1];
    let userToken;
        
    try{                  
        // user info from token
        userToken = jwt.verify(token,process.env.SECRETKEY);              

        await Users.update(
            {
                fullname,
                birthdate,
                image
            },
            {where:{
                id: userToken.id
            }}
        );

        res.json({
            message: "fields updated"
        });    
    }catch(error){
        console.log(error.name);
        res.status(500).json({
            message: "Error"
        });            
    }           
}
