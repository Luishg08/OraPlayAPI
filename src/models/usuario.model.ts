import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {MetodoPago} from './metodo-pago.model';
import {Rol} from './rol.model';
import {ApuestaEvento} from './apuesta-evento.model';
import {ApuestaMarcador} from './apuesta-marcador.model';
import {ApuestaJugador} from './apuesta-jugador.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idUsuario?: number;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
  })
  telefono?: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @property({
    type: 'date',
    required: true,
  })
  fechaRegistro: string;

  @belongsTo(() => Rol)
  rolId: number;

  @hasMany(() => MetodoPago)
  metodoPagos: MetodoPago[];

  @hasMany(() => ApuestaEvento)
  apuestaEventos: ApuestaEvento[];

  @hasMany(() => ApuestaMarcador)
  apuestasMarcador: ApuestaMarcador[];

  @hasMany(() => ApuestaJugador)
  apuestaJugadores: ApuestaJugador[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
