import { registarNovoUser } from "../services/user.service.js";

export const registarUser = async (req, res) => {

    const { nomeUser, email, senha } = req.body;
    if (!nomeUser || !email || !senha) {
        return res.status(400).json({
            message: "Preenchimento obrigatório!"
        });
    }

    try {
        const result = await registarNovoUser(nomeUser, email, senha);

        if (!result.success) {
            //status 409 conflito de dados ou algo assim eu esqueci
            return res.status(409).json(result)
        }

        return res.status(201).json(result)

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Erro interno no servidor"
        });
    }
};
