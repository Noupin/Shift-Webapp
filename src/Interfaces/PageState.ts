export interface IElevatedPageState {
    msg: string
    error: Error | null
    authenticated: boolean
    user: string
    defaultTrainView: string
    shiftUUID: string
    shiftTitle: string
    trainStatusInterval: number
    usePTM: boolean
    prebuiltShiftModel: string
}
