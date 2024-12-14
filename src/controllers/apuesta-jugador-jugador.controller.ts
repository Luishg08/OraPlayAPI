import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ApuestaJugador,
  Jugador,
} from '../models';
import {ApuestaJugadorRepository} from '../repositories';

export class ApuestaJugadorJugadorController {
  constructor(
    @repository(ApuestaJugadorRepository)
    public apuestaJugadorRepository: ApuestaJugadorRepository,
  ) { }

  @get('/apuesta-jugadors/{id}/jugador', {
    responses: {
      '200': {
        description: 'Jugador belonging to ApuestaJugador',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jugador),
          },
        },
      },
    },
  })
  async getJugador(
    @param.path.number('id') id: typeof ApuestaJugador.prototype.idApuestaJugador,
  ): Promise<Jugador> {
    return this.apuestaJugadorRepository.jugador(id);
  }
}
