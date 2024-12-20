import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Equipo} from './equipo.model';
import {Partido} from './partido.model';

@model()
export class Evento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idEvento?: number;

  @property({
    type: 'string',
    required: true,
  })
  tipoEvento: string;

  @property({
    type: 'number',
    required: true,
  })
  minuto: number;

  @belongsTo(() => Partido)
  partidoId: number;

  @belongsTo(() => Equipo)
  equipoId: number;

  constructor(data?: Partial<Evento>) {
    super(data);
  }
}

export interface EventoRelations {
  // describe navigational properties here
}

export type EventoWithRelations = Evento & EventoRelations;


