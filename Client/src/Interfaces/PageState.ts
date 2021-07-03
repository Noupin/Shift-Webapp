import { IFrontEndSettings } from './FrontEndSettings'

export interface IElevatedPageState extends IFrontEndSettings {
    msg: string
    error: Error | null
    authenticated: boolean
    username: string
    shiftUUID: string
    shiftTitle: string
    trainStatusInterval: number
    prebuiltShiftModel: string
    canTrain: boolean
}
