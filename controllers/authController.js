

export const registerUser = async (req, res) => {
    console.log("Datos recibidos:", req.body); // <--- Agregado para depuración

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return res.status(400).json({ message: "El usuario ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword);

        res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
    } catch (error) {
        console.error("Error al registrar usuario:", error); // <--- Muestra el error exacto
        res.status(500).json({ message: "Error en el servidor" });
    }
};
