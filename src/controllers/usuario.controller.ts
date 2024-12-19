import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
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
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',

          }),
        },
      },
    })
    usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuarioRepository.create(usuario);
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

  @post('/usuario')
  @response(200, {
    description: 'Usuario creado exitosamente',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async create1(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['nombre', 'apellido', 'correo', 'password', 'telefono'],
            properties: {
              nombre: {type: 'string'},
              apellido: {type: 'string'},
              correo: {type: 'string', format: 'email'},
              password: {type: 'string'},
              telefono: {type: 'string'},
            },
          },
        },
      },
    })
    usuarioData: {
      nombre: string;
      apellido: string;
      correo: string;
      password: string;
      telefono?: string;
    },
  ): Promise<object> {
    try {
      // Insertar datos directamente en la base de datos
      const result = await this.usuarioRepository.dataSource.execute(
        `INSERT INTO USUARIO (NOMBRE, APELLIDO, CORREO, PASSWORD, TELEFONO)
      VALUES (:nombre, :apellido, :correo, :password, :telefono)`,
        {
          nombre: usuarioData.nombre,
          apellido: usuarioData.apellido,
          correo: usuarioData.correo,
          password: usuarioData.password,
          telefono: usuarioData.telefono
        },
      );

      return {message: 'Usuario creado exitosamente', result};
    } catch (error) {
      console.error('Error al insertar usuario:', error);
      throw new Error('Error al insertar usuario');
    }
  }
}
