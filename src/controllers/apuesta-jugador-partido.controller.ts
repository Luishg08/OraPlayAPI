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
  Partido,
} from '../models';
import {ApuestaJugadorRepository} from '../repositories';

export class ApuestaJugadorPartidoController {
  constructor(
    @repository(ApuestaJugadorRepository)
    public apuestaJugadorRepository: ApuestaJugadorRepository,
  ) { }

  @get('/apuesta-jugadors/{id}/partido', {
    responses: {
      '200': {
        description: 'Partido belonging to ApuestaJugador',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partido),
          },
        },
      },
    },
  })
  async getPartido(
    @param.path.number('id') id: typeof ApuestaJugador.prototype.idApuestaJugador,
  ): Promise<Partido> {
    return this.apuestaJugadorRepository.partido(id);
  }
}
