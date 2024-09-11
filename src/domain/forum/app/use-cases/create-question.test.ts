import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '@tests/in-memory-repository/questions'
import { CreateQuestionUseCase } from './create-question'

let repository: InMemoryQuestionsRepository
let useCase: CreateQuestionUseCase

describe('Create Question Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository()
    useCase = new CreateQuestionUseCase(repository)
  })

  it('should create a question', async () => {
    const { question } = await useCase.execute({
      content: 'question content',
      title: 'some question title',
      authorId: 'authorId',
    })

    expect(question.id).toBeDefined()
    expect(question.content).toEqual('question content')
    expect(question.slug.value).toEqual('some-question-title')
    expect(question.authorId.toString()).toEqual('authorId')
    expect(question.createdAt).toBeDefined()
  })
})
