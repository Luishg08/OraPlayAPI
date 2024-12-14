import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Equipo} from './equipo.model';
import {Estadio} from './estadio.model';
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

  @belongsTo(() => Equipo, {name: 'equipoLocal'})
  idEquipoLocal: number;

  @belongsTo(() => Equipo, {name: 'equipoVisitante'})
  idEquipoVisitante: number;


  constructor(data?: Partial<Partido>) {
    super(data);
  }
}

export interface PartidoRelations {
  // describe navigational properties here
}

export type PartidoWithRelations = Partido & PartidoRelations;
