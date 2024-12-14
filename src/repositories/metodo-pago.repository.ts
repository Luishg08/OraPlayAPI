import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {MetodoPago, MetodoPagoRelations, Usuario, Transaccion} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {TransaccionRepository} from './transaccion.repository';

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
