import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Jugador, JugadorRelations} from '../models';

export class JugadorRepository extends DefaultCrudRepository<
  Jugador,
  typeof Jugador.prototype.idJugador,
  JugadorRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(Jugador, dataSource);
  }
}
