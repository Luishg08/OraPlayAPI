import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Estadistica,
  Jugador,
} from '../models';
import {EstadisticaRepository} from '../repositories';

export class EstadisticaJugadorController {
  constructor(
    @repository(EstadisticaRepository)
    public estadisticaRepository: EstadisticaRepository,
  ) { }

  @get('/estadisticas/{id}/jugador', {
    responses: {
      '200': {
        description: 'Jugador belonging to Estadistica',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jugador),
          },
        },
      },
    },
  })
  async getJugador(
    @param.path.number('id') id: typeof Estadistica.prototype.idEstadistica,
  ): Promise<Jugador> {
    return this.estadisticaRepository.jugador(id);
  }
}
