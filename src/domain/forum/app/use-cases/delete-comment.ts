import { type AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { type QuestionCommentsRepository } from '../repositories/question-comments-repository'

type DeleteCommentRequest = {
  commentId: string
  authorId: string
}

export class DeleteCommentUseCase {
  constructor(
    private commentRepository:
      | QuestionCommentsRepository
      | AnswerCommentsRepository,
  ) {}

  async execute({ commentId, authorId }: DeleteCommentRequest) {
    const comment = await this.commentRepository.getById(commentId)

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error('Not authorized.')
    }

    await this.commentRepository.delete(commentId)
  }
}
