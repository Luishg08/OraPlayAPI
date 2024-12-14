import {Entity, model, property} from '@loopback/repository';

@model()
export class Jugador extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idJugador?: number;

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
    type: 'number',
    required: true,
  })
  cantidadTitulos: number;

  @property({
    type: 'number',
    required: true,
  })
  golesTotales: number;

  @property({
    type: 'string',
    required: true,
  })
  nacionalidad: string;


  constructor(data?: Partial<Jugador>) {
    super(data);
  }
}

export interface JugadorRelations {
  // describe navigational properties here
}

export type JugadorWithRelations = Jugador & JugadorRelations;
