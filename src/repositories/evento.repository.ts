import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Equipo, Evento, EventoRelations, Partido} from '../models';
import {ApuestaEventoRepository} from './apuesta-evento.repository';
import {EquipoRepository} from './equipo.repository';
import {PartidoRepository} from './partido.repository';

export class EventoRepository extends DefaultCrudRepository<
  Evento,
  typeof Evento.prototype.idEvento,
  EventoRelations
> {

  public readonly partido: BelongsToAccessor<Partido, typeof Evento.prototype.idEvento>;

  public readonly equipo: BelongsToAccessor<Equipo, typeof Evento.prototype.idEvento>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>, @repository.getter('ApuestaEventoRepository') protected apuestaEventoRepositoryGetter: Getter<ApuestaEventoRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Evento, dataSource);
    this.equipo = this.createBelongsToAccessorFor('equipo', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
    this.partido = this.createBelongsToAccessorFor('partido', partidoRepositoryGetter,);
    this.registerInclusionResolver('partido', this.partido.inclusionResolver);
  }
}
