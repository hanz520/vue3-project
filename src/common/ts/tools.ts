import { v4 as uuidv4 } from 'uuid'

export const uuid = () => {
  return uuidv4().replaceAll('-', '')
}