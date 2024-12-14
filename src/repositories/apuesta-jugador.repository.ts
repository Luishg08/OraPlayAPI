import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {ApuestaJugador, ApuestaJugadorRelations, Partido, Usuario, Jugador} from '../models';
import {JugadorRepository} from './jugador.repository';
import {PartidoRepository} from './partido.repository';
import {UsuarioRepository} from './usuario.repository';

export class ApuestaJugadorRepository extends DefaultCrudRepository<
  ApuestaJugador,
  typeof ApuestaJugador.prototype.idApuestaJugador,
  ApuestaJugadorRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof ApuestaJugador.prototype.idApuestaJugador>;

  public readonly partido: BelongsToAccessor<Partido, typeof ApuestaJugador.prototype.idApuestaJugador>;

  public readonly jugador: BelongsToAccessor<Jugador, typeof ApuestaJugador.prototype.idApuestaJugador>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>, @repository.getter('JugadorRepository') protected jugadorRepositoryGetter: Getter<JugadorRepository>,
  ) {
    super(ApuestaJugador, dataSource);
    this.jugador = this.createBelongsToAccessorFor('jugador', jugadorRepositoryGetter,);
    this.registerInclusionResolver('jugador', this.jugador.inclusionResolver);
    this.partido = this.createBelongsToAccessorFor('partido', partidoRepositoryGetter,);
    this.registerInclusionResolver('partido', this.partido.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
