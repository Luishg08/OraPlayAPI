import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Torneo, TorneoRelations, Equipo, Participacion} from '../models';
import {ParticipacionRepository} from './participacion.repository';
import {EquipoRepository} from './equipo.repository';

export class TorneoRepository extends DefaultCrudRepository<
  Torneo,
  typeof Torneo.prototype.idTorneo,
  TorneoRelations
> {

  public readonly participaciones: HasManyThroughRepositoryFactory<Equipo, typeof Equipo.prototype.idEquipo,
          Participacion,
          typeof Torneo.prototype.idTorneo
        >;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('ParticipacionRepository') protected participacionRepositoryGetter: Getter<ParticipacionRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Torneo, dataSource);
    this.participaciones = this.createHasManyThroughRepositoryFactoryFor('participaciones', equipoRepositoryGetter, participacionRepositoryGetter,);
    this.registerInclusionResolver('participaciones', this.participaciones.inclusionResolver);
  }
}
