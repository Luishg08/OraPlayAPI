import {Entity, model, property} from '@loopback/repository';

@model()
export class Contratacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idContrato?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFin: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadGoles: number;

  @property({
    type: 'number',
  })
  idJugador?: number;

  @property({
    type: 'number',
  })
  idEquipo?: number;

  constructor(data?: Partial<Contratacion>) {
    super(data);
  }
}

export interface ContratacionRelations {
  // describe navigational properties here
}

export type ContratacionWithRelations = Contratacion & ContratacionRelations;
