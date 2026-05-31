import jsonwebtoken from "jsonwebtoken";

export const autenticarUser = (req, res, next) => {
    const autorizacao = req.headers.authorization;
    if (!autorizacao) {
        return res.status(401).json({
            message: "Token inexistente!"
        });
    }

    const separar = autorizacao.split(" ");
    if(separar.length !== 2 || separar[0] !== "Bearer"){
        return res.status(400).json({
            message: "Erro ao enviar o token!"
        })
    }

    const token = separar[1]

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Token inválido!"
            });
        }

        req.user = {
            iduser: decoded.iduser,
            email: decoded.email,
            tipo_user: decoded.tipo_user,
            nome: decoded.nome
        };

        next()

    } catch (err) {
        console.log("Algum erro: "+err.message)
        return res.status(401).json({err: err.message})
    }

}