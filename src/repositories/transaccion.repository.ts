import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Transaccion, TransaccionRelations} from '../models';

export class TransaccionRepository extends DefaultCrudRepository<
  Transaccion,
  typeof Transaccion.prototype.idTransaccion,
  TransaccionRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(Transaccion, dataSource);
  }
}
