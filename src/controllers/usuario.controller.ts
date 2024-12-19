import {
  repository
} from '@loopback/repository';
import {
  post,
  requestBody,
  response
} from '@loopback/rest';
import {UsuarioRepository} from '../repositories';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

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
        [
          usuarioData.nombre,
          usuarioData.apellido,
          usuarioData.correo,
          usuarioData.password,
          usuarioData.telefono,
        ],
      );

      return {message: 'Usuario creado exitosamente', result};
    } catch (error) {
      console.error('Error al insertar usuario:', error);
      throw new Error('Error al insertar usuario');
    }
  }
}
