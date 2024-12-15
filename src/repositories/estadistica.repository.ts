import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Estadistica, EstadisticaRelations, Partido, Jugador} from '../models';
import {PartidoRepository} from './partido.repository';
import {JugadorRepository} from './jugador.repository';

export class EstadisticaRepository extends DefaultCrudRepository<
  Estadistica,
  typeof Estadistica.prototype.idEstadistica,
  EstadisticaRelations
> {

  public readonly partido: BelongsToAccessor<Partido, typeof Estadistica.prototype.idEstadistica>;

  public readonly jugador: BelongsToAccessor<Jugador, typeof Estadistica.prototype.idEstadistica>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>, @repository.getter('JugadorRepository') protected jugadorRepositoryGetter: Getter<JugadorRepository>,
  ) {
    super(Estadistica, dataSource);
    this.jugador = this.createBelongsToAccessorFor('jugador', jugadorRepositoryGetter,);
    this.registerInclusionResolver('jugador', this.jugador.inclusionResolver);
    this.partido = this.createBelongsToAccessorFor('partido', partidoRepositoryGetter,);
    this.registerInclusionResolver('partido', this.partido.inclusionResolver);
  }
}
