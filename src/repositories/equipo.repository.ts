import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Contratacion, Equipo, EquipoRelations, Jugador, Participacion, Partido, Tecnico, Torneo} from '../models';
import {ContratacionRepository} from './contratacion.repository';
import {JugadorRepository} from './jugador.repository';
import {ParticipacionRepository} from './participacion.repository';
import {PartidoRepository} from './partido.repository';
import {TecnicoRepository} from './tecnico.repository';
import {TorneoRepository} from './torneo.repository';

export class EquipoRepository extends DefaultCrudRepository<
  Equipo,
  typeof Equipo.prototype.idEquipo,
  EquipoRelations
> {

  public readonly jugadores: HasManyThroughRepositoryFactory<Jugador, typeof Jugador.prototype.idJugador,
          Contratacion,
          typeof Equipo.prototype.idEquipo
        >;

  public readonly tenico: BelongsToAccessor<Tecnico, typeof Equipo.prototype.idEquipo>;

  public readonly torneos: HasManyThroughRepositoryFactory<Torneo, typeof Torneo.prototype.idTorneo,
          Participacion,
          typeof Equipo.prototype.idEquipo
        >;

  public readonly partidos: HasManyRepositoryFactory<Partido, typeof Equipo.prototype.idEquipo>;

  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('ContratacionRepository') protected contratacionRepositoryGetter: Getter<ContratacionRepository>, @repository.getter('JugadorRepository') protected jugadorRepositoryGetter: Getter<JugadorRepository>, @repository.getter('TecnicoRepository') protected tecnicoRepositoryGetter: Getter<TecnicoRepository>, @repository.getter('ParticipacionRepository') protected participacionRepositoryGetter: Getter<ParticipacionRepository>, @repository.getter('TorneoRepository') protected torneoRepositoryGetter: Getter<TorneoRepository>, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>,
  ) {
    super(Equipo, dataSource);
    this.partidos = this.createHasManyRepositoryFactoryFor('partidos', partidoRepositoryGetter,);
    this.registerInclusionResolver('partidos', this.partidos.inclusionResolver);
    this.torneos = this.createHasManyThroughRepositoryFactoryFor('torneos', torneoRepositoryGetter, participacionRepositoryGetter,);
    this.registerInclusionResolver('torneos', this.torneos.inclusionResolver);
    this.tenico = this.createBelongsToAccessorFor('tenico', tecnicoRepositoryGetter,);
    this.registerInclusionResolver('tenico', this.tenico.inclusionResolver);
    this.jugadores = this.createHasManyThroughRepositoryFactoryFor('jugadores', jugadorRepositoryGetter, contratacionRepositoryGetter,);
    this.registerInclusionResolver('jugadores', this.jugadores.inclusionResolver);
  }
}
