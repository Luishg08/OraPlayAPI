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
  Equipo,
  ApuestaEvento,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoApuestaEventoController {
  constructor(
    @repository(EquipoRepository) protected equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Array of Equipo has many ApuestaEvento',
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
    return this.equipoRepository.apuestaEventosEquipo(id).find(filter);
  }

  @post('/equipos/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Equipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(ApuestaEvento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Equipo.prototype.idEquipo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaEvento, {
            title: 'NewApuestaEventoInEquipo',
            exclude: ['idApuestaEvento'],
            optional: ['equipoId']
          }),
        },
      },
    }) apuestaEvento: Omit<ApuestaEvento, 'idApuestaEvento'>,
  ): Promise<ApuestaEvento> {
    return this.equipoRepository.apuestaEventosEquipo(id).create(apuestaEvento);
  }

  @patch('/equipos/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Equipo.ApuestaEvento PATCH success count',
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
    return this.equipoRepository.apuestaEventosEquipo(id).patch(apuestaEvento, where);
  }

  @del('/equipos/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Equipo.ApuestaEvento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ApuestaEvento)) where?: Where<ApuestaEvento>,
  ): Promise<Count> {
    return this.equipoRepository.apuestaEventosEquipo(id).delete(where);
  }
}
