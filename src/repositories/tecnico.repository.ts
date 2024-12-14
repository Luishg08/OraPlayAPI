import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Tecnico, TecnicoRelations} from '../models';
import {EquipoRepository} from './equipo.repository';

export class TecnicoRepository extends DefaultCrudRepository<
  Tecnico,
  typeof Tecnico.prototype.idTecnico,
  TecnicoRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Tecnico, dataSource);
  }
}
