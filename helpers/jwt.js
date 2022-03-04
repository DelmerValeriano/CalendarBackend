

const jwt =require('jsonwebtoken');



const generarJWT =(uid,name)=>{

    return new Promise((resolve,reject)=>{

        const payload ={uid,name};

        //sing para firmar el token
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn:'2h'
        },(err,token)=>{//callback
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');                
            }

            resolve(token);
        })

    })


}

module.exports ={
    generarJWT,
}