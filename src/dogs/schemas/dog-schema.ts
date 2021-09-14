import * as mongoose from 'mongoose'

export const DogSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    raza: String
});
