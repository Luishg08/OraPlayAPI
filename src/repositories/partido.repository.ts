import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Equipo, Estadio, Partido, PartidoRelations, Torneo} from '../models';
import {EquipoRepository} from './equipo.repository';
import {EstadioRepository} from './estadio.repository';
import {TorneoRepository} from './torneo.repository';

export class PartidoRepository extends DefaultCrudRepository<
  Partido,
  typeof Partido.prototype.idPartido,
  PartidoRelations
> {

  public readonly torneo: BelongsToAccessor<Torneo, typeof Partido.prototype.idPartido>;

  public readonly estadio: BelongsToAccessor<Estadio, typeof Partido.prototype.idPartido>;

  public readonly equipoLocal: BelongsToAccessor<Equipo, typeof Partido.prototype.idPartido>;
  public readonly equipoVisitante: BelongsToAccessor<Equipo, typeof Partido.prototype.idPartido>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('TorneoRepository') protected torneoRepositoryGetter: Getter<TorneoRepository>, @repository.getter('EstadioRepository') protected estadioRepositoryGetter: Getter<EstadioRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Partido, dataSource);
    this.equipoLocal = this.createBelongsToAccessorFor('equipoLocal', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipoLocal', this.equipoLocal.inclusionResolver);
    this.equipoVisitante = this.createBelongsToAccessorFor('equipoVisitante', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipoVisitante', this.equipoVisitante.inclusionResolver);
    this.estadio = this.createBelongsToAccessorFor('estadio', estadioRepositoryGetter,);
    this.registerInclusionResolver('estadio', this.estadio.inclusionResolver);
    this.torneo = this.createBelongsToAccessorFor('torneo', torneoRepositoryGetter,);
    this.registerInclusionResolver('torneo', this.torneo.inclusionResolver);
  }
}
