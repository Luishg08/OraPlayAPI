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
  ApuestaEvento,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioApuestaEventoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many ApuestaEvento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ApuestaEvento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ApuestaEvento>,
  ): Promise<ApuestaEvento[]> {
    return this.usuarioRepository.apuestaEventos(id).find(filter);
  }

  @post('/usuarios/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(ApuestaEvento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaEvento, {
            title: 'NewApuestaEventoInUsuario',
            exclude: ['idApuestaEvento'],
            optional: ['usuarioId']
          }),
        },
      },
    }) apuestaEvento: Omit<ApuestaEvento, 'idApuestaEvento'>,
  ): Promise<ApuestaEvento> {
    return this.usuarioRepository.apuestaEventos(id).create(apuestaEvento);
  }

  @patch('/usuarios/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Usuario.ApuestaEvento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaEvento, {partial: true}),
        },
      },
    })
    apuestaEvento: Partial<ApuestaEvento>,
    @param.query.object('where', getWhereSchemaFor(ApuestaEvento)) where?: Where<ApuestaEvento>,
  ): Promise<Count> {
    return this.usuarioRepository.apuestaEventos(id).patch(apuestaEvento, where);
  }

  @del('/usuarios/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Usuario.ApuestaEvento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ApuestaEvento)) where?: Where<ApuestaEvento>,
  ): Promise<Count> {
    return this.usuarioRepository.apuestaEventos(id).delete(where);
  }
}
