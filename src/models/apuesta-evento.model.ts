import {Entity, model, property} from '@loopback/repository';

@model()
export class ApuestaEvento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idApuestaEvento?: number;

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


  constructor(data?: Partial<ApuestaEvento>) {
    super(data);
  }
}

export interface ApuestaEventoRelations {
  // describe navigational properties here
}

export type ApuestaEventoWithRelations = ApuestaEvento & ApuestaEventoRelations;
