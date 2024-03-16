const bcrypt = require('bcrypt');
const {users} = require('../models');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.authLogin = async (req,res) =>{
    const {username, password} = req.body
    const data = await users.findOne({
        where : {
            username
        }
    })

    if(data){
        const compare = await bcrypt.compare(password, data.password)
        if(compare){

            const token = jwt.sign({
                id : data.id,
                username : data.username,
                name : data.firstName + " " + data.lastName
            }, process.env.JWT,
            {expiresIn : '24h'}
            )

            return {
                status : 201,
                data : token,
                message : "Success login"
            }
        }else{
            return {
                status : 403,
                message : "username or password is wrong"
            }
        }
    }else{
        return {
            status : 403,
            message : "username or password is wrong"
        }
    }
    
}