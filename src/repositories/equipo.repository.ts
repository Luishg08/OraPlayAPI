import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {ApuestaEvento, Contratacion, Equipo, EquipoRelations, Jugador, Participacion, Tecnico, Torneo, Evento} from '../models';
import {ApuestaEventoRepository} from './apuesta-evento.repository';
import {ContratacionRepository} from './contratacion.repository';
import {JugadorRepository} from './jugador.repository';
import {ParticipacionRepository} from './participacion.repository';
import {PartidoRepository} from './partido.repository';
import {TecnicoRepository} from './tecnico.repository';
import {TorneoRepository} from './torneo.repository';
import {EventoRepository} from './evento.repository';

export class EquipoRepository extends DefaultCrudRepository<
  Equipo,
  typeof Equipo.prototype.idEquipo,
  EquipoRelations
> {

  public readonly jugadores: HasManyThroughRepositoryFactory<Jugador, typeof Jugador.prototype.idJugador,
          Contratacion,
          typeof Equipo.prototype.idEquipo
        >;

  public readonly tecnico: BelongsToAccessor<Tecnico, typeof Equipo.prototype.idEquipo>;

  public readonly torneos: HasManyThroughRepositoryFactory<Torneo, typeof Torneo.prototype.idTorneo,
          Participacion,
          typeof Equipo.prototype.idEquipo
        >;

  public readonly apuestaEventosEquipo: HasManyRepositoryFactory<ApuestaEvento, typeof Equipo.prototype.idEquipo>;

  public readonly eventos: HasManyRepositoryFactory<Evento, typeof Equipo.prototype.idEquipo>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('ContratacionRepository') protected contratacionRepositoryGetter: Getter<ContratacionRepository>, @repository.getter('JugadorRepository') protected jugadorRepositoryGetter: Getter<JugadorRepository>, @repository.getter('TecnicoRepository') protected tecnicoRepositoryGetter: Getter<TecnicoRepository>, @repository.getter('ParticipacionRepository') protected participacionRepositoryGetter: Getter<ParticipacionRepository>, @repository.getter('TorneoRepository') protected torneoRepositoryGetter: Getter<TorneoRepository>, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>, @repository.getter('ApuestaEventoRepository') protected apuestaEventoRepositoryGetter: Getter<ApuestaEventoRepository>, @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>,
  ) {
    super(Equipo, dataSource);
    this.eventos = this.createHasManyRepositoryFactoryFor('eventos', eventoRepositoryGetter,);
    this.registerInclusionResolver('eventos', this.eventos.inclusionResolver);
    this.apuestaEventosEquipo = this.createHasManyRepositoryFactoryFor('apuestaEventosEquipo', apuestaEventoRepositoryGetter,);
    this.registerInclusionResolver('apuestaEventosEquipo', this.apuestaEventosEquipo.inclusionResolver);
    this.torneos = this.createHasManyThroughRepositoryFactoryFor('torneos', torneoRepositoryGetter, participacionRepositoryGetter,);
    this.registerInclusionResolver('torneos', this.torneos.inclusionResolver);
    this.tecnico = this.createBelongsToAccessorFor('tecnico', tecnicoRepositoryGetter,);
    this.registerInclusionResolver('tecnico', this.tecnico.inclusionResolver);
    this.jugadores = this.createHasManyThroughRepositoryFactoryFor('jugadores', jugadorRepositoryGetter, contratacionRepositoryGetter,);
    this.registerInclusionResolver('jugadores', this.jugadores.inclusionResolver);
  }
}
