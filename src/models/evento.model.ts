import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Partido} from './partido.model';
import {ApuestaEvento} from './apuesta-evento.model';

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

  @hasMany(() => ApuestaEvento)
  apuestasEvento: ApuestaEvento[];

  constructor(data?: Partial<Evento>) {
    super(data);
  }
}

export interface EventoRelations {
  // describe navigational properties here
}

export type EventoWithRelations = Evento & EventoRelations;
