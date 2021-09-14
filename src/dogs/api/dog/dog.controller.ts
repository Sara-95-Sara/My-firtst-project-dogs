import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateDogDto } from 'src/dogs/dto/create-dog-dto';
import { UpdateDogDto } from 'src/dogs/dto/update-dog-dto';
import { DogService } from 'src/dogs/services/dog/dog.service';

@Controller('api/BackendDogs/v0/dogs')
export class DogController {
    constructor(private dogService: DogService) {}

    @Post('create')
    create(@Body() dogDetalle: CreateDogDto) {
    //se llama a la promesa
    return this.dogService.create(dogDetalle).then(r => {
      return r;
    });
    }

    @Get('readAll')
      readAll() {
      return this.dogService.findAll();
    }

    @Delete('delete/:id')
      delete(@Param('id') id: string) {
      return this.dogService.delete(id).then(r => {
      return r;
      });
    }

    @Post('update')
      update(@Body() dogDetalle:UpdateDogDto) {
      return this.dogService.update(dogDetalle).then(r => {
      return r;
      });
    }

}
