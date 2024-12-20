import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Evento, EventoRelations, Partido, ApuestaEvento, Equipo} from '../models';
import {PartidoRepository} from './partido.repository';
import {ApuestaEventoRepository} from './apuesta-evento.repository';
import {EquipoRepository} from './equipo.repository';

export class EventoRepository extends DefaultCrudRepository<
  Evento,
  typeof Evento.prototype.idEvento,
  EventoRelations
> {

  public readonly partido: BelongsToAccessor<Partido, typeof Evento.prototype.idEvento>;

  public readonly apuestasEvento: HasManyRepositoryFactory<ApuestaEvento, typeof Evento.prototype.idEvento>;

  public readonly equipo: BelongsToAccessor<Equipo, typeof Evento.prototype.idEvento>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>, @repository.getter('ApuestaEventoRepository') protected apuestaEventoRepositoryGetter: Getter<ApuestaEventoRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Evento, dataSource);
    this.equipo = this.createBelongsToAccessorFor('equipo', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
    this.apuestasEvento = this.createHasManyRepositoryFactoryFor('apuestasEvento', apuestaEventoRepositoryGetter,);
    this.registerInclusionResolver('apuestasEvento', this.apuestasEvento.inclusionResolver);
    this.partido = this.createBelongsToAccessorFor('partido', partidoRepositoryGetter,);
    this.registerInclusionResolver('partido', this.partido.inclusionResolver);
  }
}
