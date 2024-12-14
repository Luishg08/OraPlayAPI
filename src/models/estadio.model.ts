import {Entity, model, property} from '@loopback/repository';

@model()
export class Estadio extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idEstadio?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidadEspectadores: number;


  constructor(data?: Partial<Estadio>) {
    super(data);
  }
}

export interface EstadioRelations {
  // describe navigational properties here
}

export type EstadioWithRelations = Estadio & EstadioRelations;
