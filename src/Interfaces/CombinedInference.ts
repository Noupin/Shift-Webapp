import { InferenceResponse, InferenceStatusReponse } from "../Swagger";

export interface CombinedInferenceResponse extends InferenceResponse, InferenceStatusReponse {}