export interface RequisicionExterna {
    id: number;
    usuario: string;
    fecha:string;
    nombre_del_solicitante: string;
    puesto_del_solicitante: string;
    region_solicitante: string;
    tematica_solicitada: string; // Si es un string que representa un valor (por ejemplo "0")
    num_vacantes: number;
    localidad_impartira: string; // Similar al anterior, si es un string
    num_participantes: number;
    horarios_dias_requeridos: string;
    motivo_del_requerimiento_cliente: string;
    honorario_a_ofrecer: string; // Suponiendo que es un string, si es un número, cámbialo a number
    requisicionInstructor_id: number;
    escolaridad_minima: string;
    sexo: string; // Podría ser un tipo enum si tienes valores específicos
    requiere_dominio_idiomas: number; // Si es un booleano, cámbialo a boolean
    anios_experiencia: number;
    principales_temas: string;
}
