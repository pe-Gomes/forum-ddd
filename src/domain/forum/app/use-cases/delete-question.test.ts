import { describe, it, beforeEach, expect } from 'vitest'
import { type QuestionsRepository } from '../repositories/questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { InMemoryQuestionsRepository } from '@tests/in-memory-repository/questions'
import { createQuestion } from '@tests/factory/question'
import { EntityID } from '@/core/entities/value-objects/entity-id'
import { NotAllowedError, ResourceNotFoundError } from '@/core/errors'

let questionRepository: QuestionsRepository
let sut: DeleteQuestionUseCase

describe('DeleteQuestion Use Case', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(questionRepository)
  })

  it('should delete a question an existing question', async () => {
    await questionRepository.create(
      createQuestion(
        {
          authorId: new EntityID('2'),
        },
        new EntityID('1'),
      ),
    )

    await sut.execute({ id: '1', authorId: '2' })

    const shouldBeNull = await questionRepository.getById('1')

    expect(shouldBeNull).toBeNull()
  })

  it('should throw an error if question does not exist', async () => {
    const res = await sut.execute({ id: 'non-existing-id', authorId: '1' })

    expect(res.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw an error if author is not the author of the question', async () => {
    await questionRepository.create(
      createQuestion(
        {
          authorId: new EntityID('1'),
        },
        new EntityID('1'),
      ),
    )

    const res = await sut.execute({ id: '1', authorId: 'wrong-id' })

    expect(res.value).toBeInstanceOf(NotAllowedError)
  })
})
