import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Contratacion, ContratacionRelations} from '../models';

export class ContratacionRepository extends DefaultCrudRepository<
  Contratacion,
  typeof Contratacion.prototype.idContrato,
  ContratacionRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(Contratacion, dataSource);
  }
}
