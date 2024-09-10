import { type EntityID } from '@/core/entities/value-objects/entity-id'
import { type Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'

type QuestionProps = {
  title: string
  description: string
  slug: Slug
  bestAuthorId?: EntityID
  createdAt: Date
  updatedAt?: Date

  authorId: EntityID
}

export class Question extends Entity<QuestionProps> {}
