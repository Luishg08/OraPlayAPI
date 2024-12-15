import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Transaccion} from './transaccion.model';

@model()
export class MetodoPago extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idMetodoPago?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreMetodo: string;

  @property({
    type: 'number',
    required: true,
  })
  numeroCuenta: number;

  @belongsTo(() => Usuario)
  usuarioId: number;

  @hasMany(() => Transaccion)
  transacciones: Transaccion[];

  constructor(data?: Partial<MetodoPago>) {
    super(data);
  }
}

export interface MetodoPagoRelations {
  // describe navigational properties here
}

export type MetodoPagoWithRelations = MetodoPago & MetodoPagoRelations;


