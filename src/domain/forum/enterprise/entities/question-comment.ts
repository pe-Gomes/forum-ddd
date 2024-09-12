import { Entity } from '@/core/entities/entity'
import { type EntityID } from '@/core/entities/value-objects/entity-id'
import { type Optional } from '@/core/types/optional'
import { type CommentProps } from './comment'

export interface QuestionCommentProps extends CommentProps {
  questionId: EntityID
}

type CreatequestionCommentArgs = Optional<QuestionCommentProps, 'createdAt'>

export class QuestionComment extends Entity<QuestionCommentProps> {
  public static create(args: CreatequestionCommentArgs, id?: EntityID) {
    return new QuestionComment(
      { ...args, createdAt: args.createdAt ?? new Date() },
      id,
    )
  }

  get questionId() {
    return this.props.questionId
  }
}
