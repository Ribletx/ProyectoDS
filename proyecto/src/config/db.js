import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
    // Si ya está conectado, salir inmediatamente
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            retryWrites: true,
            retryReads: true,
            connectTimeoutMS: 10000,
        });

        // Configurar el estado de conexión
        isConnected = true;
        console.log('Conectado a MongoDB');

        mongoose.connection.on('error', (err) => {
            console.error('Error de conexión MongoDB:', err);
            isConnected = false;
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Desconectado de MongoDB');
            isConnected = false;
            // Opcional: Intentar reconectar
            setTimeout(connectDB, 5000);
        });
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        isConnected = false;
        // Opcional: Intentar reconectar
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;