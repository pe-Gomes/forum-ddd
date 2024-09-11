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
  private touch() {
    this.props.updatedAt = new Date()
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

  get content() {
    return this.props.content
  }
  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.createdAt
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }
}
