import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Partido} from './partido.model';
import {Usuario} from './usuario.model';
import {Jugador} from './jugador.model';

@model()
export class ApuestaJugador extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idApuestaJugador?: number;

  @property({
    type: 'number',
  })
  goles?: number;

  @property({
    type: 'number',
  })
  asistencias?: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidadApostada: number;

  @property({
    type: 'number',
    required: true,
  })
  posibleGanancia: number;
  @belongsTo(() => Usuario)
  usuarioId: number;

  @belongsTo(() => Partido)
  partidoId: number;

  @belongsTo(() => Jugador)
  jugadorId: number;

  constructor(data?: Partial<ApuestaJugador>) {
    super(data);
  }
}

export interface ApuestaJugadorRelations {
  // describe navigational properties here
}

export type ApuestaJugadorWithRelations = ApuestaJugador & ApuestaJugadorRelations;

