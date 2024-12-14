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
  ApuestaMarcador,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioApuestaMarcadorController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/apuesta-marcadors', {
    responses: {
      '200': {
        description: 'Array of Usuario has many ApuestaMarcador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ApuestaMarcador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ApuestaMarcador>,
  ): Promise<ApuestaMarcador[]> {
    return this.usuarioRepository.apuestasMarcador(id).find(filter);
  }

  @post('/usuarios/{id}/apuesta-marcadors', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(ApuestaMarcador)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaMarcador, {
            title: 'NewApuestaMarcadorInUsuario',
            exclude: ['idApuestaMarcador'],
            optional: ['usuarioId']
          }),
        },
      },
    }) apuestaMarcador: Omit<ApuestaMarcador, 'idApuestaMarcador'>,
  ): Promise<ApuestaMarcador> {
    return this.usuarioRepository.apuestasMarcador(id).create(apuestaMarcador);
  }

  @patch('/usuarios/{id}/apuesta-marcadors', {
    responses: {
      '200': {
        description: 'Usuario.ApuestaMarcador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaMarcador, {partial: true}),
        },
      },
    })
    apuestaMarcador: Partial<ApuestaMarcador>,
    @param.query.object('where', getWhereSchemaFor(ApuestaMarcador)) where?: Where<ApuestaMarcador>,
  ): Promise<Count> {
    return this.usuarioRepository.apuestasMarcador(id).patch(apuestaMarcador, where);
  }

  @del('/usuarios/{id}/apuesta-marcadors', {
    responses: {
      '200': {
        description: 'Usuario.ApuestaMarcador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ApuestaMarcador)) where?: Where<ApuestaMarcador>,
  ): Promise<Count> {
    return this.usuarioRepository.apuestasMarcador(id).delete(where);
  }
}
