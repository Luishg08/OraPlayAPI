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
Participacion,
Torneo,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoTorneoController {
  constructor(
    @repository(EquipoRepository) protected equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/torneos', {
    responses: {
      '200': {
        description: 'Array of Equipo has many Torneo through Participacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Torneo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Torneo>,
  ): Promise<Torneo[]> {
    return this.equipoRepository.torneos(id).find(filter);
  }

  @post('/equipos/{id}/torneos', {
    responses: {
      '200': {
        description: 'create a Torneo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Torneo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Equipo.prototype.idEquipo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torneo, {
            title: 'NewTorneoInEquipo',
            exclude: ['idTorneo'],
          }),
        },
      },
    }) torneo: Omit<Torneo, 'idTorneo'>,
  ): Promise<Torneo> {
    return this.equipoRepository.torneos(id).create(torneo);
  }

  @patch('/equipos/{id}/torneos', {
    responses: {
      '200': {
        description: 'Equipo.Torneo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torneo, {partial: true}),
        },
      },
    })
    torneo: Partial<Torneo>,
    @param.query.object('where', getWhereSchemaFor(Torneo)) where?: Where<Torneo>,
  ): Promise<Count> {
    return this.equipoRepository.torneos(id).patch(torneo, where);
  }

  @del('/equipos/{id}/torneos', {
    responses: {
      '200': {
        description: 'Equipo.Torneo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Torneo)) where?: Where<Torneo>,
  ): Promise<Count> {
    return this.equipoRepository.torneos(id).delete(where);
  }
}
