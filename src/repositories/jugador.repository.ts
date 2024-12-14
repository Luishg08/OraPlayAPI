import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Jugador, JugadorRelations, Equipo, Contratacion, ApuestaJugador} from '../models';
import {ContratacionRepository} from './contratacion.repository';
import {EquipoRepository} from './equipo.repository';
import {ApuestaJugadorRepository} from './apuesta-jugador.repository';

export class JugadorRepository extends DefaultCrudRepository<
  Jugador,
  typeof Jugador.prototype.idJugador,
  JugadorRelations
> {

  public readonly contratos: HasManyThroughRepositoryFactory<Equipo, typeof Equipo.prototype.idEquipo,
          Contratacion,
          typeof Jugador.prototype.idJugador
        >;

  public readonly apuestasJugador: HasManyRepositoryFactory<ApuestaJugador, typeof Jugador.prototype.idJugador>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('ContratacionRepository') protected contratacionRepositoryGetter: Getter<ContratacionRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>, @repository.getter('ApuestaJugadorRepository') protected apuestaJugadorRepositoryGetter: Getter<ApuestaJugadorRepository>,
  ) {
    super(Jugador, dataSource);
    this.apuestasJugador = this.createHasManyRepositoryFactoryFor('apuestasJugador', apuestaJugadorRepositoryGetter,);
    this.registerInclusionResolver('apuestasJugador', this.apuestasJugador.inclusionResolver);
    this.contratos = this.createHasManyThroughRepositoryFactoryFor('contratos', equipoRepositoryGetter, contratacionRepositoryGetter,);
    this.registerInclusionResolver('contratos', this.contratos.inclusionResolver);
  }
}