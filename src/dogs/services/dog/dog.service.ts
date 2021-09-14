import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IReturn } from 'src/assets/interfaces/i-return.interface';
import { CreateDogDto } from 'src/dogs/dto/create-dog-dto';
import { UpdateDogDto } from 'src/dogs/dto/update-dog-dto';
import { IDog } from 'src/dogs/interface/i-dog.interface';

@Injectable()
export class DogService {
    constructor(
        @Inject('DOG_MODEL')
        private readonly dogModel: Model<IDog>,
        ){}

    async create (createDogDto: CreateDogDto): Promise<IReturn> {
        const existDog = await this.dogModel.exists ({nombre: createDogDto.nombre});
        const myPromise = new Promise<IReturn>((resolve, reject) =>{
            if(!existDog){
                new this.dogModel(createDogDto).save().then(saved => {
                    resolve({msg: 'Perro creado', status:400, data: saved, code: '400', validRequest: true})
                });
            }else{
                resolve({msg: 'Perro ya existe', status:500, data: undefined, code: '500', validRequest: false})
            }
        });
        return myPromise 
    }

    async findAll(): Promise<IReturn> {
        const myPromise = new Promise<IReturn>((resolve, reject) => {
          this.dogModel.find().exec().then(r => {
            resolve({ msg: 'Perros:', status: 400, data: r, code: '400',  validRequest: true});
          });
        });
        return myPromise;
    }

    async delete(id: string): Promise<IReturn> {
        const exist = await this.dogModel.exists({ _id: id });
        const myPromise = new Promise<IReturn>((resolve, reject) => {
          if (!exist) {
            resolve({ msg: 'El perro no existe', status: 500, data: undefined, code: '500',  validRequest: false });
          }
          else {
            this.dogModel.deleteOne({ _id: id }).exec();
            resolve({ msg: 'El perro fue eliminado',  status: 400, data: id, code: '400',  validRequest: true });
          }
        });
        return myPromise;
    }

    async update(updateDogDto: UpdateDogDto): Promise<IReturn> {
        if(updateDogDto._id === undefined || updateDogDto._id === '' || updateDogDto._id.trim() === ''){
          return new Promise<IReturn>((resolve,reject) => {
            resolve({ msg: 'Falta id', status: 400, data: undefined, code: '405',  validRequest: false});
          })
        }
        const exist = await this.dogModel.exists({ _id: updateDogDto._id });
        const myPromise = new Promise<IReturn>((resolve, reject) => {
          if (!exist) {
            resolve({ msg: 'El perro no existe', status: 500, data: undefined, code: '500',  validRequest: false });
          }
          else {
            this.dogModel.findOneAndUpdate({_id:updateDogDto._id},updateDogDto,{ new: true}).exec();
            resolve({ msg: 'Perro actualizado', status: 200, data: updateDogDto, code: '200',  validRequest: true });
          }
        });
        return myPromise;
      }
}
