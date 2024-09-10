import { EntityID } from './value-objects/entity-id'

export class Entity<EntityProperties> {
  private _id: EntityID
  protected props: EntityProperties

  constructor(props: EntityProperties, id?: string) {
    this.props = props
    this._id = new EntityID(id)
  }

  get id() {
    return this._id
  }
}
