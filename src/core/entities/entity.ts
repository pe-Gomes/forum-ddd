import { EntityID } from './value-objects/entity-id'

export class Entity<EntityProperties> {
  private _id: EntityID
  protected props: EntityProperties

  protected constructor(props: EntityProperties, id?: EntityID) {
    this.props = props
    this._id = id ?? new EntityID()
  }

  get id() {
    return this._id
  }
}
