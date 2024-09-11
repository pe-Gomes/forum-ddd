import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '@tests/in-memory-repository/questions'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { createQuestion } from '@tests/factory/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let repository: InMemoryQuestionsRepository
let useCase: GetQuestionBySlugUseCase

describe('Get Question by Slug Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    useCase = new GetQuestionBySlugUseCase(repository)
  })

  it('it should get question by a slug if exists', async () => {
    await repository.create(createQuestion({ slug: new Slug('question-1') }))

    const question = await useCase.execute({ slug: 'question-1' })

    expect(question?.id).toBeDefined()
  })
})
