import { describe, it, beforeEach, expect } from 'vitest'
import { EditQuestionUseCase } from './edit-question'
import { InMemoryQuestionsRepository } from '@tests/in-memory-repository/questions'
import { EntityID } from '@/core/entities/value-objects/entity-id'
import { createQuestion } from '@tests/factory/question'
import { NotAllowedError, ResourceNotFoundError } from '@/core/errors'

let questionRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('EditQuestion Use Case', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(questionRepository)
  })

  it('should edit a question an existing question', async () => {
    await questionRepository.create(
      createQuestion(
        {
          authorId: new EntityID('1'),
        },
        new EntityID('2'),
      ),
    )
    await sut.execute({
      title: '1',
      content: 'test',
      authorId: '1',
      questionId: '2',
    })

    expect(questionRepository.questions[0]).toMatchObject({
      title: '1',
      content: 'test',
    })
  })

  it('should NOT edit a question of a different author', async () => {
    await questionRepository.create(createQuestion({}, new EntityID('2')))

    const res = await sut.execute({
      title: '1',
      content: 'test',
      authorId: 'wrong-author-id',
      questionId: '2',
    })

    expect(res.value).toBeInstanceOf(NotAllowedError)
  })

  it('should throw an error if question not found', async () => {
    await questionRepository.create(createQuestion({}))
    const res = await sut.execute({
      title: '1',
      content: 'test',
      authorId: 'wrong-author-id',
      questionId: 'wrong-question-id',
    })

    expect(res.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
