import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
    const { email, password, username, edad, peso, estatura } = req.body

    try {
        const userFound = await User.findOne({ email })
        if (userFound)
            return res.status(400).json({ message: ["El email no es valido."] })


        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            edad,
            peso,
            estatura,
            password: passwordHash,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie('token', token);
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            edad: userSaved.edad,
            peso: userSaved.peso,
            estatura: userSaved.estatura,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userEncontrado = await User.findOne({ email });

        if (!userEncontrado) return res.status(400).json({ message: "Usuario no encontrado..." });

        const isMacth = await bcrypt.compare(password, userEncontrado.password);

        if (!isMacth) return res.status(400).json({ message: "Credenciales Incorrectas" });

        const token = await createAccessToken({ id: userEncontrado._id });

        res.cookie('token', token);
        res.json({
            id: userEncontrado.id,
            username: userEncontrado.username,
            email: userEncontrado.email,
            createdAt: userEncontrado.createdAt,
            updatedAt: userEncontrado.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userEncontrado = await User.findById(req.user.id)

    if (!userEncontrado) return res.status(400).json({ message: "Usuario no encontrado..." })

    return res.json({
        id: userEncontrado.id,
        username: userEncontrado.username,
        email: userEncontrado.email,
        edad: userEncontrado.edad,
        estatura: userEncontrado.estatura,
        peso: userEncontrado.peso,
    });
}

export const verifityToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "NO AUTORIZADO" });
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "NO AUTORIZADO" })

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "NO ATORIZADO" })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })

    })
}