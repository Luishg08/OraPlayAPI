import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Partido} from './partido.model';

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
  @belongsTo(() => Usuario)
  usuarioId: number;

  @belongsTo(() => Partido)
  partidoId: number;

  constructor(data?: Partial<ApuestaMarcador>) {
    super(data);
  }
}

export interface ApuestaMarcadorRelations {
  // describe navigational properties here
}

export type ApuestaMarcadorWithRelations = ApuestaMarcador & ApuestaMarcadorRelations;



