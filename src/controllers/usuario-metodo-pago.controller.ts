import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  MetodoPago,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioMetodoPagoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/metodo-pagos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many MetodoPago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MetodoPago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MetodoPago>,
  ): Promise<MetodoPago[]> {
    return this.usuarioRepository.metodoPagos(id).find(filter);
  }

  @post('/usuarios/{id}/metodo-pagos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(MetodoPago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {
            title: 'NewMetodoPagoInUsuario',
            exclude: ['idMetodoPago'],
            optional: ['usuarioId']
          }),
        },
      },
    }) metodoPago: Omit<MetodoPago, 'idMetodoPago'>,
  ): Promise<MetodoPago> {
    return this.usuarioRepository.metodoPagos(id).create(metodoPago);
  }

  @patch('/usuarios/{id}/metodo-pagos', {
    responses: {
      '200': {
        description: 'Usuario.MetodoPago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {partial: true}),
        },
      },
    })
    metodoPago: Partial<MetodoPago>,
    @param.query.object('where', getWhereSchemaFor(MetodoPago)) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.usuarioRepository.metodoPagos(id).patch(metodoPago, where);
  }

  @del('/usuarios/{id}/metodo-pagos', {
    responses: {
      '200': {
        description: 'Usuario.MetodoPago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MetodoPago)) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.usuarioRepository.metodoPagos(id).delete(where);
  }
}
