import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Estadistica, EstadisticaRelations, Partido} from '../models';
import {PartidoRepository} from './partido.repository';

export class EstadisticaRepository extends DefaultCrudRepository<
  Estadistica,
  typeof Estadistica.prototype.idEstadistica,
  EstadisticaRelations
> {

  public readonly partido: BelongsToAccessor<Partido, typeof Estadistica.prototype.idEstadistica>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>,
  ) {
    super(Estadistica, dataSource);
    this.partido = this.createBelongsToAccessorFor('partido', partidoRepositoryGetter,);
    this.registerInclusionResolver('partido', this.partido.inclusionResolver);
  }
}
