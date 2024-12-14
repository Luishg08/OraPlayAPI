import {Entity, model, property} from '@loopback/repository';

@model()
export class Equipo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idEquipo?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadJugadores: number;


  constructor(data?: Partial<Equipo>) {
    super(data);
  }
}

export interface EquipoRelations {
  // describe navigational properties here
}

export type EquipoWithRelations = Equipo & EquipoRelations;
