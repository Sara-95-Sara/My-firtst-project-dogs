import { Component, OnInit } from '@angular/core';
import { IDogs } from 'src/app/interfaces/i-dogs';
import { IReturn } from 'src/app/interfaces/i-return';
import { DogService } from 'src/app/services/dog.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.scss']
})
export class DogsListComponent implements OnInit {

  DogsList: Array<IDogs>;
  msgStatus;
  selectedDog: IDogs = undefined;
  selectedIndex: number = -1;

  constructor(private dogService: DogService) { }

  ngOnInit(): void {
    this.readAllDogs();
  }

  readAllDogs() {
    this.dogService.readAllDogs().subscribe( (respuesta: IReturn) => {
    if( respuesta.validRequest == false) {
    console.log('El servicio ha fallado, no tiene respuesta del backend');
    this.msgStatus = respuesta.msg;
    this.DogsList = undefined;
    return;
    }
    this.DogsList = respuesta.data;
    this.msgStatus = respuesta.msg;
    });
    }

    deleteDog(id: string) {
      this.dogService.deleteDog(id).subscribe( (respuesta:IReturn) => {
      _.remove( this.DogsList, {_id: id});
      this.msgStatus = respuesta.msg;
    })
    }

    onCreateUpdateDog( dogDetails: IDogs) {
      this.dogService.createUpdate(dogDetails).subscribe( (respuesta: IReturn) => {
      if(dogDetails._id === '' || dogDetails._id === undefined) {
      this.DogsList.push(respuesta.data);
      if(respuesta.status) {
      this.msgStatus = `Se ha ceado un registro para el dog ${dogDetails.nombre}`;
      }
      } else {
      this.DogsList[this.selectedIndex] = respuesta.data;
      this.msgStatus = `Los datos del dog ${dogDetails.nombre} han sido
      actualizados`;
      }
      });
      }

      setSelectedDog( dog: IDogs, position: number) {
        this.selectedIndex = position;
        this.selectedDog = dog;
      }
      setCreate() {
      this.selectedIndex = -1;
      this.selectedDog = {
      nombre: '',
      _id: '',
      raza: '',
      edad: 0
      }
      }

}
