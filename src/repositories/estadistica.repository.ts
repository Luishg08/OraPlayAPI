import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Estadistica, EstadisticaRelations} from '../models';

export class EstadisticaRepository extends DefaultCrudRepository<
  Estadistica,
  typeof Estadistica.prototype.idEstadistica,
  EstadisticaRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(Estadistica, dataSource);
  }
}
