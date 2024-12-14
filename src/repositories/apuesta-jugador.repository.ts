import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {ApuestaJugador, ApuestaJugadorRelations} from '../models';

export class ApuestaJugadorRepository extends DefaultCrudRepository<
  ApuestaJugador,
  typeof ApuestaJugador.prototype.idApuestaJugador,
  ApuestaJugadorRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(ApuestaJugador, dataSource);
  }
}
