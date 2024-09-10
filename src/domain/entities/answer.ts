import { Entity } from '@/core/entities/entity'
import { type EntityID } from '@/core/entities/value-objects/entity-id'

type AnswerProps = {
  content: string
  createdAt: Date
  updatedAt?: Date

  authorId: EntityID
  questionId: EntityID
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }
}
