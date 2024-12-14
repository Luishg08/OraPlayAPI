import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Partido, PartidoRelations} from '../models';

export class PartidoRepository extends DefaultCrudRepository<
  Partido,
  typeof Partido.prototype.idPartido,
  PartidoRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(Partido, dataSource);
  }
}
