import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {ApuestaMarcador, ApuestaMarcadorRelations, Usuario, Partido} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {PartidoRepository} from './partido.repository';

export class ApuestaMarcadorRepository extends DefaultCrudRepository<
  ApuestaMarcador,
  typeof ApuestaMarcador.prototype.idApuestaMarcador,
  ApuestaMarcadorRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof ApuestaMarcador.prototype.idApuestaMarcador>;

  public readonly partido: BelongsToAccessor<Partido, typeof ApuestaMarcador.prototype.idApuestaMarcador>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>,
  ) {
    super(ApuestaMarcador, dataSource);
    this.partido = this.createBelongsToAccessorFor('partido', partidoRepositoryGetter,);
    this.registerInclusionResolver('partido', this.partido.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
