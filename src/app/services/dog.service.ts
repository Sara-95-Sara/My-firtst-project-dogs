import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateUpdatedog } from '../interfaces/i-create-updatedog';
import { IDogs } from '../interfaces/i-dogs';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  selectedIndex: number;
  createUpdateDog(dogDetails: IDogs) {
    throw new Error('Method not implemented.');
  }

  private createDogURL = 'http://localhost:3000/api/BackendDogs/v0/dogs/create';
  private readAllDogURL = 'http://localhost:3000/api/BackendDogs/v0/dogs/readAll';
  private updateDogURL = 'http://localhost:3000/api/BackendDogs/v0/dogs/update';
  private deleteDogURL = 'http://localhost:3000/api/BackendDogs/v0/dogs/delete/';
  
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

  constructor(private httpClient: HttpClient) { }

  readAllDogs(){
    return this.httpClient.get(this.readAllDogURL, this.httpOptions);
  }

  deleteDog(id:string){
    return this.httpClient.delete(this.deleteDogURL + id, this.httpOptions);
  }

  createUpdate(dogDetails: ICreateUpdatedog){
    if(dogDetails._id === '' || dogDetails._id === undefined){
      delete dogDetails._id;
      return this.httpClient.post(this.createDogURL, dogDetails, this.httpOptions);
    }
    return this.httpClient.post(this.updateDogURL, dogDetails, this.httpOptions);
  }
}
