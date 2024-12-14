import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {ApuestaEvento, ApuestaEventoRelations, Usuario, Partido, Evento, Equipo} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {PartidoRepository} from './partido.repository';
import {EventoRepository} from './evento.repository';
import {EquipoRepository} from './equipo.repository';

export class ApuestaEventoRepository extends DefaultCrudRepository<
  ApuestaEvento,
  typeof ApuestaEvento.prototype.idApuestaEvento,
  ApuestaEventoRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof ApuestaEvento.prototype.idApuestaEvento>;

  public readonly partido: BelongsToAccessor<Partido, typeof ApuestaEvento.prototype.idApuestaEvento>;

  public readonly evento: BelongsToAccessor<Evento, typeof ApuestaEvento.prototype.idApuestaEvento>;

  public readonly equipo: BelongsToAccessor<Equipo, typeof ApuestaEvento.prototype.idApuestaEvento>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>, @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(ApuestaEvento, dataSource);
    this.equipo = this.createBelongsToAccessorFor('equipo', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
    this.evento = this.createBelongsToAccessorFor('evento', eventoRepositoryGetter,);
    this.registerInclusionResolver('evento', this.evento.inclusionResolver);
    this.partido = this.createBelongsToAccessorFor('partido', partidoRepositoryGetter,);
    this.registerInclusionResolver('partido', this.partido.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
