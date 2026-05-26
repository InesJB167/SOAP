import prisma from "../../prisma/prisma.js";
import bcryptjs from "bcryptjs";

export const registarNovoUser = async (nomeUser, email, senha) => {

    const verificarUser = await prisma.usuario.findUnique({
        where: { email: email }
    });

    if (verificarUser) {
        return {
            success: false,
            message: "Email ja existe!"
        }
    }
    //to ensure the security on the password we use the saltrounds
    const saltrounds = 12;
    const senhaHash = await bcryptjs.hash(senha, saltrounds);
    const criarUser = await prisma.usuario.create({
        data: {
            nome: nomeUser,
            email: email,
            senha: senhaHash
        }
    });
    delete criarUser.senha;
    return {
        success: true,
        message: "Usuário cadastrado com sucesso!",
        user: criarUser
    }
}
