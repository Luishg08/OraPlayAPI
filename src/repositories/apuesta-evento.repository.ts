import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {ApuestaEvento, ApuestaEventoRelations} from '../models';

export class ApuestaEventoRepository extends DefaultCrudRepository<
  ApuestaEvento,
  typeof ApuestaEvento.prototype.idApuestaEvento,
  ApuestaEventoRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(ApuestaEvento, dataSource);
  }
}
