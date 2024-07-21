import { Pipe, PipeTransform } from '@angular/core';
import { RentaLaptop } from '../../interfaces/renta.interface';

@Pipe({
  name: 'searchRenta',
  standalone: true
})
export class SearchRentaPipe implements PipeTransform {

  transform(laptopsRenta:RentaLaptop[],searchTerm): any {

    
    if (!searchTerm) {
      return laptopsRenta;
    }

    const filteredLaptop = laptopsRenta.filter(laptop =>
      laptop.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.numeroComputadoras.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.estatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.programas.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredLaptop.length === 0) {
      return [{ mensaje: `No se encontraron resultados con  ${searchTerm}`  }];
    }

    return filteredLaptop

  }

}
