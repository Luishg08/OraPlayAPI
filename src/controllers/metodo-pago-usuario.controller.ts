import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MetodoPago,
  Usuario,
} from '../models';
import {MetodoPagoRepository} from '../repositories';

export class MetodoPagoUsuarioController {
  constructor(
    @repository(MetodoPagoRepository)
    public metodoPagoRepository: MetodoPagoRepository,
  ) { }

  @get('/metodo-pagos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to MetodoPago',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof MetodoPago.prototype.idMetodoPago,
  ): Promise<Usuario> {
    return this.metodoPagoRepository.usuario(id);
  }
}
