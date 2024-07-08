import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeSearch'})
export class PipeSearchPipe implements PipeTransform {

  transform(tickets:any[],searchTerm:string):any[] {

    if (!tickets || !searchTerm) {
      return tickets;
    }

    const filteredTickets = tickets.filter(ticket =>
      ticket.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.estatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.area.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredTickets.length === 0) {
      return [{ mensaje: 'No se encontraron resultados con' }];
    }

    return filteredTickets
    

  }

}
