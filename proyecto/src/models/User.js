// src/models/User.js
import mongoose from 'mongoose';

// Definimos el esquema de usuario
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true, // No permite duplicados
        },
        password: {
            type: String,
            required: true,
        },
        highscore_snake: {
            type: Number,
            default: 0, // Inicializamos el puntaje de snake con 0
        },
    },
    {
        timestamps: true, // Agrega campos de createdAt y updatedAt
    }
);

// Creamos el modelo a partir del esquema
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
