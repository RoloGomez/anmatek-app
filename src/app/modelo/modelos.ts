export interface TecnicoUser {
    nombre: string;
    rut: string; //limite de rut 00.000.000-0 o 0.000.000-0
    numero: string;
    correo: string;
    rol: 'tecnico';
}
export interface EquipoData {
    nserie: string;
    marca: string;
    modelo: string;
    clave: string;
    patron: string;
}
export interface ClienteData {
    nombre: string;
    rut: string;
    correo: string;
    telefono: string;
}
export interface ProductoData {
    id: string;
    nombre: string;
    precioVenta: string;
    precioCompra: string;
    cantidad: string;
}
export interface OrdenData {
    id: string;
    idEquipo: string;
    rutCliente: string;
    rutTecnico: string;
    emision: string;
    notas: string[];
    estado: 'por asignar' | 'en pausa' | 'asignada' | 'espera retiro' | 'completada';
}
export interface ServicioData {
    id: string;
    nombre: string;
    tipo: string;
    valor: string;
}
