export interface User {
  email: string
  imageFile: string
  password?: string
  username: string
  _id?: {
    $oid: string
  }
}