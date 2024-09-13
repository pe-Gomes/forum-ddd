import { EntityID } from '@/core/entities/value-objects/entity-id'
import {
  AnswerAttachment,
  type AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function createAsnwerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: EntityID,
) {
  return AnswerAttachment.create(
    {
      answerId: new EntityID(),
      attachmentId: new EntityID(),
      ...override,
    },
    id,
  )
}
