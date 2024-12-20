import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {MetodoPago} from '../models';
import {MetodoPagoRepository} from '../repositories';

export class MetodoPagoControllerController {
  constructor(
    @repository(MetodoPagoRepository)
    public metodoPagoRepository: MetodoPagoRepository
  ) { }

  @post('/metodo-pagos')
  @response(200, {
    description: 'MetodoPago model instance',
    content: {'application/json': {schema: getModelSchemaRef(MetodoPago)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {
            title: 'NewMetodoPago',
            exclude: ['idMetodoPago'],
          }),
        },
      },
    })
    metodoPago: Omit<MetodoPago, 'idMetodoPago'>,
  ): Promise<MetodoPago> {
    return this.metodoPagoRepository.create(metodoPago);
  }

  @get('/metodo-pagos/count')
  @response(200, {
    description: 'MetodoPago model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MetodoPago) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.metodoPagoRepository.count(where);
  }

  @get('/metodo-pagos')
  @response(200, {
    description: 'Array of MetodoPago model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MetodoPago, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MetodoPago) filter?: Filter<MetodoPago>,
  ): Promise<MetodoPago[]> {
    return this.metodoPagoRepository.find(filter);
  }

  @patch('/metodo-pagos')
  @response(200, {
    description: 'MetodoPago PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {partial: true}),
        },
      },
    })
    metodoPago: MetodoPago,
    @param.where(MetodoPago) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.metodoPagoRepository.updateAll(metodoPago, where);
  }

  @get('/metodo-pagos/{id}')
  @response(200, {
    description: 'MetodoPago model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MetodoPago, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MetodoPago, {exclude: 'where'}) filter?: FilterExcludingWhere<MetodoPago>
  ): Promise<MetodoPago> {
    return this.metodoPagoRepository.findById(id, filter);
  }

  @patch('/metodo-pagos/{id}')
  @response(204, {
    description: 'MetodoPago PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {partial: true}),
        },
      },
    })
    metodoPago: MetodoPago,
  ): Promise<void> {
    await this.metodoPagoRepository.updateById(id, metodoPago);
  }

  @put('/metodo-pagos/{id}')
  @response(204, {
    description: 'MetodoPago PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() metodoPago: MetodoPago,
  ): Promise<void> {
    await this.metodoPagoRepository.replaceById(id, metodoPago);
  }

  @del('/metodo-pagos/{id}')
  @response(204, {
    description: 'MetodoPago DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.metodoPagoRepository.deleteById(id);
  }

  @get('/metodo-pagos/usuario/{usuarioId}')
  @response(200, {
    description: 'Métodos de pago asociados con el usuario',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              nombreMetodo: {type: 'string'},
              numeroCuenta: {type: 'number'},
            },
          },
        },
      },
    },
  })
  async findByUsuarioId(
    @param.path.number('usuarioId') usuarioId: string, // Obtener usuarioId desde la URL
  ): Promise<any[]> {
    try {
      console.log(usuarioId) + "usuarioId"
      // Consultar los métodos de pago asociados al usuario desde la base de datos
      const metodosPago = await this.metodoPagoRepository.dataSource.execute(
        `SELECT NOMBREMETODO, NUMEROCUENTA
       FROM METODOPAGO
       WHERE USUARIOID = :usuarioId`,
        [usuarioId], // Pasar usuarioId como parámetro de la consulta
      );
      console.log(metodosPago)
      // Verificar si se encontraron métodos de pago
      if (metodosPago.length === 0) {
        throw new Error('No se encontraron métodos de pago para este usuario');
      }

      //Devolver los métodos de pago asociados al usuario
      return metodosPago.map((metodo: any) => ({
        nombreMetodo: metodo.NOMBREMETODO,
        numeroCuenta: metodo.NUMEROCUENTA,
      }));
    } catch (error) {
      console.error('Error al obtener los métodos de pago:', error);
      throw new Error('Error al obtener los métodos de pago');
    }
  }
}
