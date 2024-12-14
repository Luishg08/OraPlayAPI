import {Entity, model, property} from '@loopback/repository';

@model()
export class ApuestaMarcador extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idApuestaMarcador?: number;

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
    type: 'number',
    required: true,
  })
  cantidadApostada: number;

  @property({
    type: 'number',
    required: true,
  })
  posibleGanancia: number;


  constructor(data?: Partial<ApuestaMarcador>) {
    super(data);
  }
}

export interface ApuestaMarcadorRelations {
  // describe navigational properties here
}

export type ApuestaMarcadorWithRelations = ApuestaMarcador & ApuestaMarcadorRelations;
