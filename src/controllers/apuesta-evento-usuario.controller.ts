import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ApuestaEvento,
  Usuario,
} from '../models';
import {ApuestaEventoRepository} from '../repositories';

export class ApuestaEventoUsuarioController {
  constructor(
    @repository(ApuestaEventoRepository)
    public apuestaEventoRepository: ApuestaEventoRepository,
  ) { }

  @get('/apuesta-eventos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to ApuestaEvento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof ApuestaEvento.prototype.idApuestaEvento,
  ): Promise<Usuario> {
    return this.apuestaEventoRepository.usuario(id);
  }
}
