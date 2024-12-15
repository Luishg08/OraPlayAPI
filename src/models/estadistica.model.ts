import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Jugador} from './jugador.model';
import {Partido} from './partido.model';

@model()
export class Estadistica extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idEstadistica?: number;

  @property({
    type: 'number',
    required: true,
  })
  goles: number;

  @property({
    type: 'number',
    required: true,
  })
  asistencias: number;

  @belongsTo(() => Partido)
  partidoId: number;

  @belongsTo(() => Jugador)
  jugadorId: number;

  constructor(data?: Partial<Estadistica>) {
    super(data);
  }
}

export interface EstadisticaRelations {
  // describe navigational properties here
}

export type EstadisticaWithRelations = Estadistica & EstadisticaRelations;


