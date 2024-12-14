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
Contratacion,
Jugador,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoJugadorController {
  constructor(
    @repository(EquipoRepository) protected equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/jugadors', {
    responses: {
      '200': {
        description: 'Array of Equipo has many Jugador through Contratacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jugador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Jugador>,
  ): Promise<Jugador[]> {
    return this.equipoRepository.jugadores(id).find(filter);
  }

  @post('/equipos/{id}/jugadors', {
    responses: {
      '200': {
        description: 'create a Jugador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jugador)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Equipo.prototype.idEquipo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {
            title: 'NewJugadorInEquipo',
            exclude: ['idJugador'],
          }),
        },
      },
    }) jugador: Omit<Jugador, 'idJugador'>,
  ): Promise<Jugador> {
    return this.equipoRepository.jugadores(id).create(jugador);
  }

  @patch('/equipos/{id}/jugadors', {
    responses: {
      '200': {
        description: 'Equipo.Jugador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {partial: true}),
        },
      },
    })
    jugador: Partial<Jugador>,
    @param.query.object('where', getWhereSchemaFor(Jugador)) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.equipoRepository.jugadores(id).patch(jugador, where);
  }

  @del('/equipos/{id}/jugadors', {
    responses: {
      '200': {
        description: 'Equipo.Jugador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Jugador)) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.equipoRepository.jugadores(id).delete(where);
  }
}
