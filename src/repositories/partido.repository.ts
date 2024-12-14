import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Equipo, Estadio, Estadistica, Evento, Partido, PartidoRelations, Torneo, ApuestaEvento, ApuestaMarcador, ApuestaJugador} from '../models';
import {ApuestaJugadorRepository} from './apuesta-jugador.repository';
import {EquipoRepository} from './equipo.repository';
import {EstadioRepository} from './estadio.repository';
import {EstadisticaRepository} from './estadistica.repository';
import {EventoRepository} from './evento.repository';
import {TorneoRepository} from './torneo.repository';
import {UsuarioRepository} from './usuario.repository';
import {ApuestaEventoRepository} from './apuesta-evento.repository';
import {ApuestaMarcadorRepository} from './apuesta-marcador.repository';

export class PartidoRepository extends DefaultCrudRepository<
  Partido,
  typeof Partido.prototype.idPartido,
  PartidoRelations
> {

  public readonly torneo: BelongsToAccessor<Torneo, typeof Partido.prototype.idPartido>;

  public readonly estadio: BelongsToAccessor<Estadio, typeof Partido.prototype.idPartido>;

  public readonly eventos: HasManyRepositoryFactory<Evento, typeof Partido.prototype.idPartido>;

  public readonly estadisticas: HasManyRepositoryFactory<Estadistica, typeof Partido.prototype.idPartido>;

  public readonly equipoLocal: BelongsToAccessor<Equipo, typeof Partido.prototype.idPartido>;

  public readonly equipoVisitante: BelongsToAccessor<Equipo, typeof Partido.prototype.idPartido>;

  public readonly apuestasEvento: HasManyRepositoryFactory<ApuestaEvento, typeof Partido.prototype.idPartido>;

  public readonly apuestasMarcador: HasManyRepositoryFactory<ApuestaMarcador, typeof Partido.prototype.idPartido>;

  public readonly apuestasJugador: HasManyRepositoryFactory<ApuestaJugador, typeof Partido.prototype.idPartido>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('TorneoRepository') protected torneoRepositoryGetter: Getter<TorneoRepository>, @repository.getter('EstadioRepository') protected estadioRepositoryGetter: Getter<EstadioRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>, @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>, @repository.getter('EstadisticaRepository') protected estadisticaRepositoryGetter: Getter<EstadisticaRepository>, @repository.getter('ApuestaJugadorRepository') protected apuestaJugadorRepositoryGetter: Getter<ApuestaJugadorRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('ApuestaEventoRepository') protected apuestaEventoRepositoryGetter: Getter<ApuestaEventoRepository>, @repository.getter('ApuestaMarcadorRepository') protected apuestaMarcadorRepositoryGetter: Getter<ApuestaMarcadorRepository>,
  ) {
    super(Partido, dataSource);
    this.apuestasJugador = this.createHasManyRepositoryFactoryFor('apuestasJugador', apuestaJugadorRepositoryGetter,);
    this.registerInclusionResolver('apuestasJugador', this.apuestasJugador.inclusionResolver);
    this.apuestasMarcador = this.createHasManyRepositoryFactoryFor('apuestasMarcador', apuestaMarcadorRepositoryGetter,);
    this.registerInclusionResolver('apuestasMarcador', this.apuestasMarcador.inclusionResolver);
    this.apuestasEvento = this.createHasManyRepositoryFactoryFor('apuestasEvento', apuestaEventoRepositoryGetter,);
    this.registerInclusionResolver('apuestasEvento', this.apuestasEvento.inclusionResolver);
    this.equipoVisitante = this.createBelongsToAccessorFor('equipoVisitante', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipoVisitante', this.equipoVisitante.inclusionResolver);
    this.equipoLocal = this.createBelongsToAccessorFor('equipoLocal', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipoLocal', this.equipoLocal.inclusionResolver);
    this.estadisticas = this.createHasManyRepositoryFactoryFor('estadisticas', estadisticaRepositoryGetter,);
    this.registerInclusionResolver('estadisticas', this.estadisticas.inclusionResolver);
    this.eventos = this.createHasManyRepositoryFactoryFor('eventos', eventoRepositoryGetter,);
    this.registerInclusionResolver('eventos', this.eventos.inclusionResolver);
    this.estadio = this.createBelongsToAccessorFor('estadio', estadioRepositoryGetter,);
    this.registerInclusionResolver('estadio', this.estadio.inclusionResolver);
    this.torneo = this.createBelongsToAccessorFor('torneo', torneoRepositoryGetter,);
    this.registerInclusionResolver('torneo', this.torneo.inclusionResolver);
  }
}
