import prisma from "../../prisma/prisma.js"

export const criarPerfil_estudante = async (iduser, nome, genero, idcurso_medio) => {

    const verficarPerfil = await prisma.perfil_estudante.findFirst({
        where: {
            iduser: iduser
        }
    });
    if(verficarPerfil){
        return {
            success: false,
            message: "Este usuário ja possui um perfil de estudante."
        }
    }

    try {
        const perfil = await prisma.perfil_estudante.create({
            data: {
                iduser: iduser,
                nome: nome,
                genero: genero,
                idcurso_medio: idcurso_medio
            }
        });

        return {
            success: true,
            message: "Perfil criado!",
            perfil: perfil
        }

    } catch (err) {
        console.log("Algum erro ao criar Perfil de estudante "+err.message)
        return {
            success: false,
            message: "Erro ao criar perfil de estudante !"
        }
    }

}