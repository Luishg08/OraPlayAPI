import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {MetodoPago, Rol, Usuario, UsuarioRelations, ApuestaEvento, ApuestaMarcador, ApuestaJugador} from '../models';
import {ApuestaJugadorRepository} from './apuesta-jugador.repository';
import {ApuestaMarcadorRepository} from './apuesta-marcador.repository';
import {MetodoPagoRepository} from './metodo-pago.repository';
import {PartidoRepository} from './partido.repository';
import {RolRepository} from './rol.repository';
import {ApuestaEventoRepository} from './apuesta-evento.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.idUsuario,
  UsuarioRelations
> {

  public readonly rol: BelongsToAccessor<Rol, typeof Usuario.prototype.idUsuario>;

  public readonly metodoPagos: HasManyRepositoryFactory<MetodoPago, typeof Usuario.prototype.idUsuario>;

  public readonly apuestaEventos: HasManyRepositoryFactory<ApuestaEvento, typeof Usuario.prototype.idUsuario>;

  public readonly apuestasMarcador: HasManyRepositoryFactory<ApuestaMarcador, typeof Usuario.prototype.idUsuario>;

  public readonly apuestaJugadores: HasManyRepositoryFactory<ApuestaJugador, typeof Usuario.prototype.idUsuario>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('MetodoPagoRepository') protected metodoPagoRepositoryGetter: Getter<MetodoPagoRepository>, @repository.getter('ApuestaJugadorRepository') protected apuestaJugadorRepositoryGetter: Getter<ApuestaJugadorRepository>, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>, @repository.getter('ApuestaMarcadorRepository') protected apuestaMarcadorRepositoryGetter: Getter<ApuestaMarcadorRepository>, @repository.getter('ApuestaEventoRepository') protected apuestaEventoRepositoryGetter: Getter<ApuestaEventoRepository>,
  ) {
    super(Usuario, dataSource);
    this.apuestaJugadores = this.createHasManyRepositoryFactoryFor('apuestaJugadores', apuestaJugadorRepositoryGetter,);
    this.registerInclusionResolver('apuestaJugadores', this.apuestaJugadores.inclusionResolver);
    this.apuestasMarcador = this.createHasManyRepositoryFactoryFor('apuestasMarcador', apuestaMarcadorRepositoryGetter,);
    this.registerInclusionResolver('apuestasMarcador', this.apuestasMarcador.inclusionResolver);
    this.apuestaEventos = this.createHasManyRepositoryFactoryFor('apuestaEventos', apuestaEventoRepositoryGetter,);
    this.registerInclusionResolver('apuestaEventos', this.apuestaEventos.inclusionResolver);
    this.metodoPagos = this.createHasManyRepositoryFactoryFor('metodoPagos', metodoPagoRepositoryGetter,);
    this.registerInclusionResolver('metodoPagos', this.metodoPagos.inclusionResolver);
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter,);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
  }
}
