export interface Shift{
  uuid?: string
  userID?: string
  title: string
  datePosted: Date
  imagePath: string
  encoderPath?: string
  baseDecoderPath?: string
  maskDecoderPath?: string
  private?: boolean
}