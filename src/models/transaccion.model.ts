import {Entity, model, property, belongsTo} from '@loopback/repository';
import {MetodoPago} from './metodo-pago.model';

@model({settings: {strict: false}})
export class Transaccion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idTransaccion?: number;

  @property({
    type: 'string',
    required: true,
  })
  tipo_transaccion: string;

  @property({
    type: 'number',
    required: true,
  })
  monto: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_transaccion: string;

  @belongsTo(() => MetodoPago)
  metodoPagoId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Transaccion>) {
    super(data);
  }
}

export interface TransaccionRelations {
  // describe navigational properties here
}

export type TransaccionWithRelations = Transaccion & TransaccionRelations;
