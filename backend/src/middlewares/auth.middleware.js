import { jsonwebtoken } from "jsonwebtoken";

export const autenticarUser = (req,res,next) => {
    const autorizacao = req.headers.authorization;
    if(!autorizacao){
        return res.status(401).json({
            message:"Token inexistente!"
        });
    }

    const separar = autorizacao.split(" ");
    const token = separar[1]
    const decoded  = jsonwebtoken.verify(token,process.env.JWT_SECRET);
    if(!decoded ){
        return res.status(401).json({
            message: "Token inválido!"
        });
    }

    req.user = decoded;

    next()
    
}