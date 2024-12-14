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
  Evento,
  ApuestaEvento,
} from '../models';
import {EventoRepository} from '../repositories';

export class EventoApuestaEventoController {
  constructor(
    @repository(EventoRepository) protected eventoRepository: EventoRepository,
  ) { }

  @get('/eventos/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Array of Evento has many ApuestaEvento',
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
    return this.eventoRepository.apuestasEvento(id).find(filter);
  }

  @post('/eventos/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Evento model instance',
        content: {'application/json': {schema: getModelSchemaRef(ApuestaEvento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Evento.prototype.idEvento,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaEvento, {
            title: 'NewApuestaEventoInEvento',
            exclude: ['idApuestaEvento'],
            optional: ['eventoId']
          }),
        },
      },
    }) apuestaEvento: Omit<ApuestaEvento, 'idApuestaEvento'>,
  ): Promise<ApuestaEvento> {
    return this.eventoRepository.apuestasEvento(id).create(apuestaEvento);
  }

  @patch('/eventos/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Evento.ApuestaEvento PATCH success count',
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
    return this.eventoRepository.apuestasEvento(id).patch(apuestaEvento, where);
  }

  @del('/eventos/{id}/apuesta-eventos', {
    responses: {
      '200': {
        description: 'Evento.ApuestaEvento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ApuestaEvento)) where?: Where<ApuestaEvento>,
  ): Promise<Count> {
    return this.eventoRepository.apuestasEvento(id).delete(where);
  }
}
