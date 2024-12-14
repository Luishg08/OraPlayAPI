import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {ApuestaMarcador, ApuestaMarcadorRelations} from '../models';

export class ApuestaMarcadorRepository extends DefaultCrudRepository<
  ApuestaMarcador,
  typeof ApuestaMarcador.prototype.idApuestaMarcador,
  ApuestaMarcadorRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(ApuestaMarcador, dataSource);
  }
}
