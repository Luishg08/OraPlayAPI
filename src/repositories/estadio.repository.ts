import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Estadio, EstadioRelations, Partido} from '../models';
import {PartidoRepository} from './partido.repository';

export class EstadioRepository extends DefaultCrudRepository<
  Estadio,
  typeof Estadio.prototype.idEstadio,
  EstadioRelations
> {

  public readonly partidos: HasManyRepositoryFactory<Partido, typeof Estadio.prototype.idEstadio>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>,
  ) {
    super(Estadio, dataSource);
    this.partidos = this.createHasManyRepositoryFactoryFor('partidos', partidoRepositoryGetter,);
    this.registerInclusionResolver('partidos', this.partidos.inclusionResolver);
  }
}
