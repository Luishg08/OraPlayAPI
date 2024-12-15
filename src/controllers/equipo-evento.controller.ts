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
  Evento,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoEventoController {
  constructor(
    @repository(EquipoRepository) protected equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/eventos', {
    responses: {
      '200': {
        description: 'Array of Equipo has many Evento',
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
    return this.equipoRepository.eventos(id).find(filter);
  }

  @post('/equipos/{id}/eventos', {
    responses: {
      '200': {
        description: 'Equipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Evento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Equipo.prototype.idEquipo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evento, {
            title: 'NewEventoInEquipo',
            exclude: ['idEvento'],
            optional: ['equipoId']
          }),
        },
      },
    }) evento: Omit<Evento, 'idEvento'>,
  ): Promise<Evento> {
    return this.equipoRepository.eventos(id).create(evento);
  }

  @patch('/equipos/{id}/eventos', {
    responses: {
      '200': {
        description: 'Equipo.Evento PATCH success count',
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
    return this.equipoRepository.eventos(id).patch(evento, where);
  }

  @del('/equipos/{id}/eventos', {
    responses: {
      '200': {
        description: 'Equipo.Evento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Evento)) where?: Where<Evento>,
  ): Promise<Count> {
    return this.equipoRepository.eventos(id).delete(where);
  }
}
