import { type EntityID } from '@/core/entities/value-objects/entity-id'
import { type Slug } from './value-objects/slug'
import { type Optional } from '@/core/types/optional'

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

/**
 * Create a type with 'createdAt' as optional. This is useful when creating a
 * new entity, because the date can be provided or not.
 */
type CreateQuestionArgs = Optional<QuestionProps, 'createdAt'>

export class Question extends Entity<QuestionProps> {
  static create(props: CreateQuestionArgs, id?: EntityID) {
    const question = new Question(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
