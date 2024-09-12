import { describe, it, beforeEach, expect } from 'vitest'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswerRepository } from '@tests/in-memory-repository/answer'
import { EntityID } from '@/core/entities/value-objects/entity-id'
import { type AnswersRepository } from '../repositories/answers-repository'
import { createAnswer } from '@tests/factory/answer'
import { NotAllowedError, ResourceNotFoundError } from '@/core/errors'

let answerRepository: AnswersRepository
let sut: DeleteAnswerUseCase

describe('DeleteAnswer Use Case', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(answerRepository)
  })

  it('should delete a question an existing question', async () => {
    await answerRepository.create(
      createAnswer(
        {
          authorId: new EntityID('2'),
        },
        new EntityID('1'),
      ),
    )

    await sut.execute({ id: '1', authorId: '2' })

    const shouldBeNull = await answerRepository.getById('1')

    expect(shouldBeNull).toBeNull()
  })

  it('should throw an error if question does not exist', async () => {
    const res = await sut.execute({ id: 'non-existing-id', authorId: '1' })

    expect(res.isSuccess()).toBe(false)
    expect(res.isFailure()).toBe(true)
    expect(res.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw an error if author is not the author of the question', async () => {
    await answerRepository.create(
      createAnswer(
        {
          authorId: new EntityID('1'),
        },
        new EntityID('1'),
      ),
    )

    const res = await sut.execute({ id: '1', authorId: '3333' })

    expect(res.isFailure()).toBe(true)
    expect(res.value).toBeInstanceOf(NotAllowedError)
  })
})
