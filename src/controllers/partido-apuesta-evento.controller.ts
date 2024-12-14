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
  Partido,
  ApuestaEvento,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoApuestaEventoController {
  constructor(
    @repository(PartidoRepository) protected partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Array of Partido has many ApuestaEvento',
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
    return this.partidoRepository.apuestasEvento(id).find(filter);
  }

  @post('/partidos/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Partido model instance',
        content: {'application/json': {schema: getModelSchemaRef(ApuestaEvento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Partido.prototype.idPartido,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaEvento, {
            title: 'NewApuestaEventoInPartido',
            exclude: ['idApuestaEvento'],
            optional: ['partidoId']
          }),
        },
      },
    }) apuestaEvento: Omit<ApuestaEvento, 'idApuestaEvento'>,
  ): Promise<ApuestaEvento> {
    return this.partidoRepository.apuestasEvento(id).create(apuestaEvento);
  }

  @patch('/partidos/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Partido.ApuestaEvento PATCH success count',
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
    return this.partidoRepository.apuestasEvento(id).patch(apuestaEvento, where);
  }

  @del('/partidos/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Partido.ApuestaEvento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ApuestaEvento)) where?: Where<ApuestaEvento>,
  ): Promise<Count> {
    return this.partidoRepository.apuestasEvento(id).delete(where);
  }
}
