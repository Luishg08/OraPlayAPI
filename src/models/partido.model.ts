import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Partido>) {
    super(data);
  }
}

export interface PartidoRelations {
  // describe navigational properties here
}

export type PartidoWithRelations = Partido & PartidoRelations;
