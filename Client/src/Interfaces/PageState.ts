export interface IElevatedPageState {
    msg: string
    error: Error | null
    authenticated: boolean
    username: string
    defaultTrainView: string
    shiftUUID: string
    shiftTitle: string
    trainStatusInterval: number
    usePTM: boolean
    prebuiltShiftModel: string
    trainingShift: boolean
    canTrain: boolean
}
