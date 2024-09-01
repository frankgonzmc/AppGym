import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie('token', token);
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
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

        /*
        
            res.json({
            message: "Usuario creado con exito!",
        })
        */
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
        createdAt: userEncontrado.createdAt,
        updatedAt: userEncontrado.updatedAt,
    });
}   