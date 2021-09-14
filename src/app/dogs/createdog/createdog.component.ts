import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateUpdatedog } from 'src/app/interfaces/i-create-updatedog';
import { IDogs } from 'src/app/interfaces/i-dogs';

@Component({
  selector: 'app-createdog',
  templateUrl: './createdog.component.html',
  styleUrls: ['./createdog.component.scss']
})
export class CreatedogComponent implements OnInit, OnChanges {

  dogForm: FormGroup;
  @Input()
  selectedDog: IDogs = {_id: '', nombre: '', edad: 0, raza: ''};

  @Output()
  createUpdateDogEvent = new EventEmitter<IDogs>();

  create: boolean;
  createUpdateMsg: string;

  constructor(private fb: FormBuilder) { }

  createDogForm() {
    this.dogForm = this.fb.group({
      _id: [''],
      nombre: ['', Validators.required],
      edad: ['', [Validators.max(25), Validators.min(0)]],
      raza: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.createUpdateMsg = "Crear";
    this.createDogForm();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.selectedDog && changes.selectedDog.currentValue != undefined) {
    if (this.selectedDog._id === undefined || this.selectedDog._id === '') {
    this.createUpdateMsg = "Crear";
    } else {
    this.createUpdateMsg = "Actualizar";
    }
    this.dogForm.controls['_id'].patchValue(this.selectedDog._id);
    this.dogForm.controls['nombre'].patchValue(this.selectedDog.nombre);
    this.dogForm.controls['edad'].patchValue(this.selectedDog.edad);
    this.dogForm.controls['raza'].patchValue(this.selectedDog.raza);
    this.create = false;
    }
    else if (changes.selectedDog) {
    this.create = true;
    }
    }

  onSubmit(dogDetails: ICreateUpdatedog) {
    if (dogDetails.nombre === "" || dogDetails.edad === null
    || dogDetails.raza == "") {
    alert('Tienes que rellenar todo el formulario');
    } else {
    if (this.create) {
    delete dogDetails._id;
    this.dogForm.reset();
    }
    this.createUpdateDogEvent.emit(dogDetails);
    }
    }

}
