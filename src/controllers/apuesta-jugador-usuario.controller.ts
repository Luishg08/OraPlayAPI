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
  Usuario,
} from '../models';
import {ApuestaJugadorRepository} from '../repositories';

export class ApuestaJugadorUsuarioController {
  constructor(
    @repository(ApuestaJugadorRepository)
    public apuestaJugadorRepository: ApuestaJugadorRepository,
  ) { }

  @get('/apuesta-jugadors/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to ApuestaJugador',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof ApuestaJugador.prototype.idApuestaJugador,
  ): Promise<Usuario> {
    return this.apuestaJugadorRepository.usuario(id);
  }
}
