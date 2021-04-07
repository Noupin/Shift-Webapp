export interface IElevatedPageState {
    msg: string
    error: Error
    authenticated: boolean
    user: string
    defaultTrainView: string
    shiftUUID: string
    trainStatusInterval: number
    usePTM: boolean
    prebuiltShiftModel: string
}
