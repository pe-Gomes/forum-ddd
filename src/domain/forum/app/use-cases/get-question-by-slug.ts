import { type QuestionsRepository } from '../repositories/questions-repository'

type GetQuestionBySlugRequest = {
  slug: string
}

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) {}
  async execute({ slug }: GetQuestionBySlugRequest) {
    return this.questionRepository.getBySlug(slug)
  }
}
