import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {MetodoPago, MetodoPagoRelations, Transaccion, Usuario} from '../models';
import {TransaccionRepository} from './transaccion.repository';
import {UsuarioRepository} from './usuario.repository';

export class MetodoPagoRepository extends DefaultCrudRepository<
  MetodoPago,
  typeof MetodoPago.prototype.idMetodoPago,
  MetodoPagoRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof MetodoPago.prototype.idMetodoPago>;

  public readonly transacciones: HasManyRepositoryFactory<Transaccion, typeof MetodoPago.prototype.idMetodoPago>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('TransaccionRepository') protected transaccionRepositoryGetter: Getter<TransaccionRepository>,
  ) {
    super(MetodoPago, dataSource);
    this.transacciones = this.createHasManyRepositoryFactoryFor('transacciones', transaccionRepositoryGetter,);
    this.registerInclusionResolver('transacciones', this.transacciones.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
