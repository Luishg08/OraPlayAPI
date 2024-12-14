import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Jugador, JugadorRelations, Equipo, Contratacion} from '../models';
import {ContratacionRepository} from './contratacion.repository';
import {EquipoRepository} from './equipo.repository';

export class JugadorRepository extends DefaultCrudRepository<
  Jugador,
  typeof Jugador.prototype.idJugador,
  JugadorRelations
> {

  public readonly contratos: HasManyThroughRepositoryFactory<Equipo, typeof Equipo.prototype.idEquipo,
          Contratacion,
          typeof Jugador.prototype.idJugador
        >;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('ContratacionRepository') protected contratacionRepositoryGetter: Getter<ContratacionRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Jugador, dataSource);
    this.contratos = this.createHasManyThroughRepositoryFactoryFor('contratos', equipoRepositoryGetter, contratacionRepositoryGetter,);
    this.registerInclusionResolver('contratos', this.contratos.inclusionResolver);
  }
}
