//First Party Imports
import { StopTrainResponse, TrainResponse, TrainStatusResponse } from "../Swagger";

export interface CombinedTrainResponse extends TrainResponse, TrainStatusResponse, StopTrainResponse {}