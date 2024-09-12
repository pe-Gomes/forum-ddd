import { type AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { type AnswerCommentsRepository } from '@/domain/forum/app/repositories/answer-comments-repository'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentsRepository
{
  public comments: AnswerComment[] = []

  async create(comment: AnswerComment) {
    await Promise.resolve(this.comments.push(comment))
  }

  async getById(id: string) {
    return await Promise.resolve(
      this.comments.find((comment) => comment.id.toString() === id) ?? null,
    )
  }

  async delete(id: string) {
    const commentIdx = this.comments.findIndex(
      (comment) => comment.id.toString() === id,
    )
    this.comments.splice(commentIdx, 1)
  }
}
