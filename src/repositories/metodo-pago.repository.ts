import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {MetodoPago, MetodoPagoRelations} from '../models';

export class MetodoPagoRepository extends DefaultCrudRepository<
  MetodoPago,
  typeof MetodoPago.prototype.idMetodoPago,
  MetodoPagoRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(MetodoPago, dataSource);
  }
}
