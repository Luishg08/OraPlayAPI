import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Transaccion, TransaccionRelations, MetodoPago} from '../models';
import {MetodoPagoRepository} from './metodo-pago.repository';

export class TransaccionRepository extends DefaultCrudRepository<
  Transaccion,
  typeof Transaccion.prototype.idTransaccion,
  TransaccionRelations
> {

  public readonly metodoPago: BelongsToAccessor<MetodoPago, typeof Transaccion.prototype.idTransaccion>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('MetodoPagoRepository') protected metodoPagoRepositoryGetter: Getter<MetodoPagoRepository>,
  ) {
    super(Transaccion, dataSource);
    this.metodoPago = this.createBelongsToAccessorFor('metodoPago', metodoPagoRepositoryGetter,);
    this.registerInclusionResolver('metodoPago', this.metodoPago.inclusionResolver);
  }
}
