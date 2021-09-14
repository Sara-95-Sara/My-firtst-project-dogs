import { Connection } from 'mongoose';
import { DogSchema } from '../schemas/dog-schema';

export const dogProviders = [
    {
    provide: 'DOG_MODEL',
    useFactory: (connection: Connection) =>
     connection.model('Dog', DogSchema),
     inject: ['DATABASE_CONNECTION'],
},
];
