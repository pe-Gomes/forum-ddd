import { type EntityID } from '@/core/entities/value-objects/entity-id'
import { type Optional } from '@/core/types/optional'

import { Entity } from '@/core/entities/entity'

type AnswerProps = {
  content: string
  createdAt: Date
  updatedAt?: Date

  authorId: EntityID
  questionId: EntityID
}

type CreateAnswerArgs = Optional<AnswerProps, 'createdAt'>

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  static create(props: CreateAnswerArgs, id?: EntityID) {
    const question = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
