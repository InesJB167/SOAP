import { criarPerfil_estudante, visualizar_perfil } from "../services/perfilEstudante.service.js";

export const perfil_estudante = async (req, res) => {
    /**
     * ! o iduser nao esta a ser passado -ele nao chegou ao banco ,resolva isso já.
     */
    const iduser = req.user.iduser;
    const nome = req.body.nome;
    const genero = req.body.genero;
    const idcurso_medio = req.body.idcurso_medio;
    //*para receber os dados que vao para o model perfil_estudante_has_habilidades
    const idhabilidade = req.body.idhabilidade;

    if (!nome || !genero || !idcurso_medio) {
        return res.status(400).json({
            message: "Campo obrigatório!"
        })
    }
    console.log("idUser logado ",iduser ,"tipo -",typeof iduser)
    try {
        const novo_perfil = await criarPerfil_estudante(iduser, nome, genero, idcurso_medio,idhabilidade);
        if (novo_perfil.success === false) {
            return res.status(400).json({
                message: novo_perfil.message
            });
        }
        return res.status(201).json({
            message: novo_perfil
        });

    } catch (err) {
        console.log("Algo de errado nao esta certo! " + err.message)
        return res.status(500).json({
            err:err.message
        })
    }
}

export const buscar_perfil = async (req,res) =>{
    const iduser = req.user.iduser;

    try{
        const perfil_encontrado = await visualizar_perfil(iduser);
        if(perfil_encontrado.success === false){
            return res.status(404).json({
                err: perfil_encontrado.message
            })
        }

        return res.status(200).json({
            message: perfil_encontrado
        })
        
    } catch (err){
        console.log("Algum erro no servidor:",err.message)
        return res.status(500).json({
            err: err.message
        })
    }
}