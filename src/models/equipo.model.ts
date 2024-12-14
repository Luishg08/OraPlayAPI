import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Jugador} from './jugador.model';
import {Contratacion} from './contratacion.model';
import {Tecnico} from './tecnico.model';
import {Torneo} from './torneo.model';
import {Participacion} from './participacion.model';
import {Partido} from './partido.model';

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

  @hasMany(() => Jugador, {through: {model: () => Contratacion, keyFrom: 'idEquipo', keyTo: 'idJugador'}})
  jugadores: Jugador[];

  @belongsTo(() => Tecnico, {name: 'tenico'})
  idTecnico: number;

  @hasMany(() => Torneo, {through: {model: () => Participacion, keyFrom: 'idEquipo', keyTo: 'idTorneo'}})
  torneos: Torneo[];

  @hasMany(() => Partido, {keyTo: 'idEquipo'})
  partidos: Partido[];

  @property({
    type: 'number',
  })
  idPartido?: number;

  constructor(data?: Partial<Equipo>) {
    super(data);
  }
}

export interface EquipoRelations {
  // describe navigational properties here
}

export type EquipoWithRelations = Equipo & EquipoRelations;
