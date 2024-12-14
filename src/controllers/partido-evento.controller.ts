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
  Evento,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoEventoController {
  constructor(
    @repository(PartidoRepository) protected partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/eventos', {
    responses: {
      '200': {
        description: 'Array of Partido has many Evento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Evento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Evento>,
  ): Promise<Evento[]> {
    return this.partidoRepository.eventos(id).find(filter);
  }

  @post('/partidos/{id}/eventos', {
    responses: {
      '200': {
        description: 'Partido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Evento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Partido.prototype.idPartido,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evento, {
            title: 'NewEventoInPartido',
            exclude: ['idEvento'],
            optional: ['partidoId']
          }),
        },
      },
    }) evento: Omit<Evento, 'idEvento'>,
  ): Promise<Evento> {
    return this.partidoRepository.eventos(id).create(evento);
  }

  @patch('/partidos/{id}/eventos', {
    responses: {
      '200': {
        description: 'Partido.Evento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evento, {partial: true}),
        },
      },
    })
    evento: Partial<Evento>,
    @param.query.object('where', getWhereSchemaFor(Evento)) where?: Where<Evento>,
  ): Promise<Count> {
    return this.partidoRepository.eventos(id).patch(evento, where);
  }

  @del('/partidos/{id}/eventos', {
    responses: {
      '200': {
        description: 'Partido.Evento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Evento)) where?: Where<Evento>,
  ): Promise<Count> {
    return this.partidoRepository.eventos(id).delete(where);
  }
}
