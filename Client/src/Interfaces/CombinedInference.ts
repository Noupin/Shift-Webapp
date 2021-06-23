import { InferenceResponse, InferenceStatusResponse } from "../Swagger";

export interface CombinedInferenceResponse extends InferenceResponse, InferenceStatusResponse {}