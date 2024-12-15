import {Entity, hasMany, model, property} from '@loopback/repository';
import {ApuestaJugador} from './apuesta-jugador.model';
import {Contratacion} from './contratacion.model';
import {Equipo} from './equipo.model';
import {Estadistica} from './estadistica.model';

@model()
export class Jugador extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idJugador?: number;

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
    type: 'number',
    required: true,
  })
  cantidadTitulos: number;

  @property({
    type: 'number',
    required: true,
  })
  golesTotales: number;

  @property({
    type: 'string',
    required: true,
  })
  nacionalidad: string;

  @hasMany(() => Equipo, {through: {model: () => Contratacion, keyFrom: 'idJugador', keyTo: 'idEquipo'}})
  contratos: Equipo[];

  @hasMany(() => ApuestaJugador)
  apuestasJugador: ApuestaJugador[];

  @hasMany(() => Estadistica)
  estadisticas: Estadistica[];

  constructor(data?: Partial<Jugador>) {
    super(data);
  }
}

export interface JugadorRelations {
  // describe navigational properties here
}

export type JugadorWithRelations = Jugador & JugadorRelations;
