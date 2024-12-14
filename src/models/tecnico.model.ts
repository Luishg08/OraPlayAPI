import {Entity, model, property} from '@loopback/repository';

@model()
export class Tecnico extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idTecnico?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  nacionalidad: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadTitulos: number;

  constructor(data?: Partial<Tecnico>) {
    super(data);
  }
}

export interface TecnicoRelations {
  // describe navigational properties here
}

export type TecnicoWithRelations = Tecnico & TecnicoRelations;
