import {Document} from 'mongoose'

export interface IDog extends Document{
    readonly nombre: string;
    readonly edad: number;
    readonly raza: string;
}
