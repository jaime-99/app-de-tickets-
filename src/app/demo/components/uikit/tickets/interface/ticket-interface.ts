
export interface ticket {
    titulo: string,
    estatus: string,
    fecha: string,
    nombre: string,
    apellido: string,
    correo: string,
    descripcion: string,
    nombre_usuario: string,
    area: string,
    para_area: string,
    IdCategoria: number
}

export  class Categorias 
{

    public static categoria  = [

        {name:'Falla Computadora'},
        {name:'Correo'},
        {name:'Instalacion de programas'},
        {name:'Otra'}
    ]

    public static areas = [
        {name:'Sistemas'},
        {name:'RH'},
        {name:'Administracion'},
        {name:'Materiales'},
        {name:'Comercial'}
    ]

}

export interface Ticket3 {
    id: number;
    titulo: string;
    estatus: string;
    fecha: string;
    nombre: string;
    apellido: string;
    correo: string;
    descripcion: string;
    nombre_usuario: string;
    para_area: string;
    area: string;
    IdCategoria: number;
    trabajadoPor: string | null;
    detalleId:string;
    solucionado?:boolean;
    paraAreaDe?:string;
    usuarioId?:number;
    idTicket:number; // es el id de detalles ticket
  }
  

   

