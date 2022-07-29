const jwt = require('jsonwebtoken');

const verifyToken = async (token) =>{
    try {
       
        return jwt.verify(token, "este-es-el-seed-desarrollo")
    }catch (e){
        return 'no se puede verificar token'
    }
}
const checkAuth = async (req, res, next) => {
    try{
        
        const token = req.headers.authorization.split(' ').pop();
        console.log(token)
        const tokenData = await verifyToken(token)
        console.log(tokenData)
        

        if(tokenData.usuario._id){
            next()
        }else{
            res.status(409)
            res.send({error: 'error en el token'})
        }
    }catch(e){
        res.status(409)
        res.send({error: 'error 2 en el token'})
        
    }
}

module.exports = checkAuth;