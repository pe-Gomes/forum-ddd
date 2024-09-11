import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '../repositories/in-memory/questions'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { EntityID } from '@/core/entities/value-objects/entity-id'

let repository: InMemoryQuestionsRepository
let useCase: GetQuestionBySlugUseCase

describe('Get Question by Slug Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    useCase = new GetQuestionBySlugUseCase(repository)
  })

  it('it should get question by a slug if exists', async () => {
    await repository.create(
      Question.create({
        title: 'Question 1',
        content: 'Content 1',
        authorId: new EntityID('1'),
      }),
    )

    const question = await useCase.execute({ slug: 'question-1' })

    expect(question?.id).toBeDefined()
    expect(question?.title).toBe('Question 1')
    expect(question?.content).toBe('Content 1')
    expect(question?.slug.value).toBe('question-1')
    expect(question?.authorId.toString()).toBe('1')
  })
})
