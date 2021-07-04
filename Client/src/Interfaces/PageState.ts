import { User } from '../Swagger';
import { IFrontEndSettings } from './FrontEndSettings'

export interface IElevatedPageState extends IFrontEndSettings {
    msg: string
    error: Error | null
    authenticated: boolean
    user: User
    shiftUUID: string
    shiftTitle: string
    trainStatusInterval: number
    prebuiltShiftModel: string
}
