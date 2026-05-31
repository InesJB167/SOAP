import jsonwebtoken from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import prisma from '../../prisma/prisma.js';

export const loginUser = async (email, senha,nome) => {
    const user = await prisma.usuario.findUnique({
        where: {email: email}
    })

    if(!user){
        return {
            success: false,
            message: "Usuário nao encontrado!"
        }
    }
    console.log("User que esta logando: ",user)
    const verificarSenha = await bcryptjs.compare(senha,user.senha);

    if(!verificarSenha){
        return {
            success: false,
            message: "Password incorrecta!"
        }
    }

    const payload = {
        iduser:user.iduser,
        email:user.email,
        tipo_user:user.tipo_user,
        nome:user.nome
    }
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: "1h"
    }
    const token = jsonwebtoken.sign(payload,secret,options);

    return {
        success: true,
        token: token ,
        tipo_user: user.tipo_user,
        nome:user.nome
    }

}