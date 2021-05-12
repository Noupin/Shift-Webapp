export interface User {
  email: string
  imagePath: string
  password?: string
  username: string
  _id?: {
    $oid: string
  }
}