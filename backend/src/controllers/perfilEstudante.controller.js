import { criarPerfil_estudante } from "../services/perfilEstudante.service.js";

export const perfil_estudante = async (req, res) => {
    /**
     * o iduser nao esta a ser passado -ele nao chegou ao banco ,resolva isso já.
     */
    const iduser = req.user.iduser;
    const nome = req.body.nome;
    const genero = req.body.genero;
    const idcurso_medio = req.body.idcurso_medio;

    if (!nome || !genero || !idcurso_medio) {
        return res.status(400).json({
            message: "Campo obrigatório!"
        })
    }
    console.log("idUser logado ",iduser ,"tipo -",typeof iduser)
    try {
        const novo_perfil = await criarPerfil_estudante(iduser, nome, genero, idcurso_medio);
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