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
Jugador,
Contratacion,
Equipo,
} from '../models';
import {JugadorRepository} from '../repositories';

export class JugadorEquipoController {
  constructor(
    @repository(JugadorRepository) protected jugadorRepository: JugadorRepository,
  ) { }

  @get('/jugadors/{id}/equipos', {
    responses: {
      '200': {
        description: 'Array of Jugador has many Equipo through Contratacion',
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
    return this.jugadorRepository.contratos(id).find(filter);
  }

  @post('/jugadors/{id}/equipos', {
    responses: {
      '200': {
        description: 'create a Equipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Equipo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jugador.prototype.idJugador,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {
            title: 'NewEquipoInJugador',
            exclude: ['idEquipo'],
          }),
        },
      },
    }) equipo: Omit<Equipo, 'idEquipo'>,
  ): Promise<Equipo> {
    return this.jugadorRepository.contratos(id).create(equipo);
  }

  @patch('/jugadors/{id}/equipos', {
    responses: {
      '200': {
        description: 'Jugador.Equipo PATCH success count',
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
    return this.jugadorRepository.contratos(id).patch(equipo, where);
  }

  @del('/jugadors/{id}/equipos', {
    responses: {
      '200': {
        description: 'Jugador.Equipo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.jugadorRepository.contratos(id).delete(where);
  }
}
