import api from './api';

export interface Company {
  id_empresa: number;
  nombre: string;
  ruc: string;
  direccion: string;
  telefono: string;
  email_contacto: string;
  sector: string;
  fecha_creacion: string;
  estado: {
    type: string;
    data: number[];
  };
}

export const getCompanies = async (): Promise<Company[]> => {
  try {
    const response = await api.get('/empresas');
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener las empresas ${error}`);
  }
};
