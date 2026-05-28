import { loginUser } from "../services/auth.service.js";

export const login = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(401).json({
            message: "Preencha todos os campos!"
        });
    }

    try {
        const logar = await loginUser(email, senha);
        if (!logar.success) {
            return res.status(401).json(logar);
        }

        return res.status(200).json(logar)

    } catch (err) {
        console.log("Erro no servidor: " + err.message);
        return res.status(500).json({err:err.message})
    }
}