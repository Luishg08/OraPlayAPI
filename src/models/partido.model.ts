import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {ApuestaEvento} from './apuesta-evento.model';
import {ApuestaJugador} from './apuesta-jugador.model';
import {ApuestaMarcador} from './apuesta-marcador.model';
import {Equipo} from './equipo.model';
import {Estadio} from './estadio.model';
import {Estadistica} from './estadistica.model';
import {Evento} from './evento.model';
import {Torneo} from './torneo.model';

@model()
export class Partido extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idPartido?: number;

  @property({
    type: 'number',
    required: true,
  })
  golesEquipoLocal: number;

  @property({
    type: 'number',
    required: true,
  })
  golesEquipoVisitante: number;

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
    type: 'boolean',
    required: true,
  })
  Empate: boolean;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @property({
    type: 'number',
  })
  porcentajeGananciaEquipo1?: number;

  @property({
    type: 'number',
  })
  porcentajeGananciaEquipo2?: number;

  @property({
    type: 'number',
  })
  porcentajeEmpate?: number;

  @belongsTo(() => Torneo, {name: 'torneo'})
  idTorneo: number;

  @belongsTo(() => Estadio, {name: 'estadio'})
  idEstadio: number;

  @hasMany(() => Evento)
  eventos: Evento[];

  @hasMany(() => Estadistica)
  estadisticas: Estadistica[];

  @belongsTo(() => Equipo, {name: 'equipoLocal'})
  equipoLocalId: number;

  @belongsTo(() => Equipo, {name: 'equipoVisitante'})
  equipoVisitanteId: number;

  @property({
    type: 'number',
  })
  torneoId?: number;

  @property({
    type: 'number',
  })
  estadioId?: number;

  @hasMany(() => ApuestaEvento)
  apuestasEvento: ApuestaEvento[];

  @hasMany(() => ApuestaMarcador)
  apuestasMarcador: ApuestaMarcador[];

  @hasMany(() => ApuestaJugador)
  apuestasJugador: ApuestaJugador[];

  constructor(data?: Partial<Partido>) {
    super(data);
  }
}

export interface PartidoRelations {
  // describe navigational properties here
}

export type PartidoWithRelations = Partido & PartidoRelations;
