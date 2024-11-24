// src/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Conectar a la base de datos MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Termina el proceso si no se puede conectar
    }
};

export default connectDB;
