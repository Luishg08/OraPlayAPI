import {Entity, model, property} from '@loopback/repository';

@model()
export class Torneo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idTorneo?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

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
  cantidadEquipos: number;


  constructor(data?: Partial<Torneo>) {
    super(data);
  }
}

export interface TorneoRelations {
  // describe navigational properties here
}

export type TorneoWithRelations = Torneo & TorneoRelations;
