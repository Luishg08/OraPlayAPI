import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Partido, PartidoRelations, Torneo, Estadio, Equipo} from '../models';
import {TorneoRepository} from './torneo.repository';
import {EstadioRepository} from './estadio.repository';
import {EquipoRepository} from './equipo.repository';

export class PartidoRepository extends DefaultCrudRepository<
  Partido,
  typeof Partido.prototype.idPartido,
  PartidoRelations
> {

  public readonly torneo: BelongsToAccessor<Torneo, typeof Partido.prototype.idPartido>;

  public readonly estadio: BelongsToAccessor<Estadio, typeof Partido.prototype.idPartido>;

  public readonly equipo: HasOneRepositoryFactory<Equipo, typeof Partido.prototype.idPartido>;

  public readonly equipo2: HasOneRepositoryFactory<Equipo, typeof Partido.prototype.idPartido>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('TorneoRepository') protected torneoRepositoryGetter: Getter<TorneoRepository>, @repository.getter('EstadioRepository') protected estadioRepositoryGetter: Getter<EstadioRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Partido, dataSource);
    this.equipo2 = this.createHasOneRepositoryFactoryFor('equipo2', equipoRepositoryGetter);
    this.registerInclusionResolver('equipo2', this.equipo2.inclusionResolver);
    this.equipo = this.createHasOneRepositoryFactoryFor('equipo', equipoRepositoryGetter);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
    this.estadio = this.createBelongsToAccessorFor('estadio', estadioRepositoryGetter,);
    this.registerInclusionResolver('estadio', this.estadio.inclusionResolver);
    this.torneo = this.createBelongsToAccessorFor('torneo', torneoRepositoryGetter,);
    this.registerInclusionResolver('torneo', this.torneo.inclusionResolver);
  }
}
