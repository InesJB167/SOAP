import prisma from "../../prisma/prisma.js"

export const criarPerfil_estudante = async (iduser, nome, genero, idcurso_medio, idhabilidade) => {

    const verficarPerfil = await prisma.perfil_estudante.findFirst({
        where: {
            iduser: iduser
        }
    });
    if (verficarPerfil) {
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
        if (perfil) {
            const id_estudante = perfil.id_estudante;

            if (idhabilidade && idhabilidade.length > 0) {

                const habilidade_perfil = idhabilidade.map(idhabilidades => ({
                    id_estudante: id_estudante,
                    idhabilidade: idhabilidades
                }));

                const habilidade_selecionada = await prisma.perfil_estudante_has_habilidades.createMany({
                    data: habilidade_perfil
                });
            } else {
               console.log("Este usuario nao selecionou nenhuma habilidade!") 
            }

        }

        return {
            success: true,
            message: "Perfil criado!",
            perfil: perfil,
            idhabilidade: idhabilidade
        }

    } catch (err) {
        console.log("Algum erro ao criar Perfil de estudante " + err.message)
        return {
            success: false,
            message: "Erro ao criar perfil de estudante !"
        }
    }

}