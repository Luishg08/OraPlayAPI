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
Torneo,
Participacion,
Equipo,
} from '../models';
import {TorneoRepository} from '../repositories';

export class TorneoEquipoController {
  constructor(
    @repository(TorneoRepository) protected torneoRepository: TorneoRepository,
  ) { }

  @get('/torneos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Array of Torneo has many Equipo through Participacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Equipo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Equipo>,
  ): Promise<Equipo[]> {
    return this.torneoRepository.participaciones(id).find(filter);
  }

  @post('/torneos/{id}/equipos', {
    responses: {
      '200': {
        description: 'create a Equipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Equipo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Torneo.prototype.idTorneo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {
            title: 'NewEquipoInTorneo',
            exclude: ['idEquipo'],
          }),
        },
      },
    }) equipo: Omit<Equipo, 'idEquipo'>,
  ): Promise<Equipo> {
    return this.torneoRepository.participaciones(id).create(equipo);
  }

  @patch('/torneos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Torneo.Equipo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {partial: true}),
        },
      },
    })
    equipo: Partial<Equipo>,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.torneoRepository.participaciones(id).patch(equipo, where);
  }

  @del('/torneos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Torneo.Equipo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.torneoRepository.participaciones(id).delete(where);
  }
}
