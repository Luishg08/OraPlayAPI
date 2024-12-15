import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Equipo} from './equipo.model';
import {Evento} from './evento.model';
import {Partido} from './partido.model';
import {Usuario} from './usuario.model';

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

  @belongsTo(() => Usuario)
  usuarioId: number;

  @belongsTo(() => Partido)
  partidoId: number;

  @belongsTo(() => Evento)
  eventoId: number;

  @belongsTo(() => Equipo)
  equipoId: number;

  constructor(data?: Partial<ApuestaEvento>) {
    super(data);
  }
}

export interface ApuestaEventoRelations {
  // describe navigational properties here
}

export type ApuestaEventoWithRelations = ApuestaEvento & ApuestaEventoRelations;




