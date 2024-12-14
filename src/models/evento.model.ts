import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Evento>) {
    super(data);
  }
}

export interface EventoRelations {
  // describe navigational properties here
}

export type EventoWithRelations = Evento & EventoRelations;
