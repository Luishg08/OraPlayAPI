import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {ApuestaEvento} from './apuesta-evento.model';
import {ApuestaJugador} from './apuesta-jugador.model';
import {ApuestaMarcador} from './apuesta-marcador.model';
import {MetodoPago} from './metodo-pago.model';
import {Rol} from './rol.model';

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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

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
    required: false,
  })
  estado: boolean;

  @property({
    type: 'date',
    required: false,
  })
  fechaRegistro: string;

  @property({
    type: 'number',
    required: false,
  })
  saldo: string;

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


