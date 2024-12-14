import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Tecnico, TecnicoRelations} from '../models';

export class TecnicoRepository extends DefaultCrudRepository<
  Tecnico,
  typeof Tecnico.prototype.idTecnico,
  TecnicoRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(Tecnico, dataSource);
  }
}
