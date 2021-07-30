//First Party Imports
import { ApiInstances } from '../Helpers/Api';
import { IFrontEndSettings } from './FrontEndSettings'

export interface IElevatedPageState {
    msg: string
    error: Error | null
    authenticated: boolean
    shiftUUID: string
    shiftTitle: string
    trainStatusInterval: number
    prebuiltShiftModel: string
    accessToken: string
    APIInstances: ApiInstances
    frontEndSettings: IFrontEndSettings
}
