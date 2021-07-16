//First Party Imports
import { ApiInstances } from '../Helpers/Api';
import { IFrontEndSettings } from './FrontEndSettings'

export interface IElevatedPageState extends IFrontEndSettings {
    msg: string
    error: Error | null
    authenticated: boolean
    shiftUUID: string
    shiftTitle: string
    trainStatusInterval: number
    prebuiltShiftModel: string
    accessToken: string
    APIInstaces: ApiInstances
}
