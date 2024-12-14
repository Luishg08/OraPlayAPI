import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Estadio, EstadioRelations} from '../models';

export class EstadioRepository extends DefaultCrudRepository<
  Estadio,
  typeof Estadio.prototype.idEstadio,
  EstadioRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(Estadio, dataSource);
  }
}
