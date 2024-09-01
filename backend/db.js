import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        //Cambiar localhost por servicio del contenedor
        await mongoose.connect('mongodb://database/rutinabd')
        console.log("se conecto la base de datos")
    } catch (error) {
        console.log(error);
    }
}