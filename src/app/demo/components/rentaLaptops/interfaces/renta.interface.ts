export interface RentaLaptop {
    id: number;
    nombre: string;
    numeroComputadoras?: string | null;
    diaInicio: Date;
    diaFin: Date;
    comentarios?: string | null;
    programas: string;
    mouse: boolean;
    extensiones?: boolean | null;
    ubicacion?: string | null;
    rentaUsuario?: string | null;
    estatus?:string;
    EquiposParaRenta?:any
}

export interface Computadora {
    marca: string;         // Campo opcional
    No_serie: string;       // Campo obligatorio y clave primaria
    equipo: number;        // Campo opcional
    color: string;         // Campo opcional
    renta?: string;         // Campo opcional
    comentarios?: string;   // Campo opcional
    funcional?: number;     // Campo opcional
  }
  

