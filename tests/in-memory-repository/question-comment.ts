import { type QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { type QuestionCommentsRepository } from '@/domain/forum/app/repositories/question-comments-repository'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepository
{
  public comments: QuestionComment[] = []

  async create(comment: QuestionComment) {
    await Promise.resolve(this.comments.push(comment))
  }

  async getById(id: string) {
    return await Promise.resolve(
      this.comments.find((comment) => comment.id.toString() === id) ?? null,
    )
  }
}
