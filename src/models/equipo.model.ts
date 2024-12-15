import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Contratacion} from './contratacion.model';
import {Jugador} from './jugador.model';
import {Participacion} from './participacion.model';
import {Partido} from './partido.model';
import {Tecnico} from './tecnico.model';
import {Torneo} from './torneo.model';
import {ApuestaEvento} from './apuesta-evento.model';
import {Evento} from './evento.model';

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

  @belongsTo(() => Tecnico, {name: 'tecnico'})
  idTecnico: number;

  @hasMany(() => Torneo, {through: {model: () => Participacion, keyFrom: 'idEquipo', keyTo: 'idTorneo'}})
  torneos: Torneo[];

  @hasMany(() => Partido, {keyTo: 'idEquipo'})
  partidos: Partido[];

  @hasMany(() => ApuestaEvento)
  apuestaEventosEquipo: ApuestaEvento[];

  @hasMany(() => Evento)
  eventos: Evento[];

  constructor(data?: Partial<Equipo>) {
    super(data);
  }
}

export interface EquipoRelations {
  // describe navigational properties here
}

export type EquipoWithRelations = Equipo & EquipoRelations;


