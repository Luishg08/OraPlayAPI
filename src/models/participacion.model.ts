import {Entity, model, property} from '@loopback/repository';

@model()
export class Participacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idTorneoidEquipo?: number;


  constructor(data?: Partial<Participacion>) {
    super(data);
  }
}

export interface ParticipacionRelations {
  // describe navigational properties here
}

export type ParticipacionWithRelations = Participacion & ParticipacionRelations;
