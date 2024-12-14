import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ApuestaMarcador,
  Usuario,
} from '../models';
import {ApuestaMarcadorRepository} from '../repositories';

export class ApuestaMarcadorUsuarioController {
  constructor(
    @repository(ApuestaMarcadorRepository)
    public apuestaMarcadorRepository: ApuestaMarcadorRepository,
  ) { }

  @get('/apuesta-marcadors/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to ApuestaMarcador',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof ApuestaMarcador.prototype.idApuestaMarcador,
  ): Promise<Usuario> {
    return this.apuestaMarcadorRepository.usuario(id);
  }
}
