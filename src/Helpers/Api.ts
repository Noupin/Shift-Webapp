//First Party Imports
import { IncludeCredentials } from "./IncludeCredentails";
import { CDNApi, FPNApi, InferenceApi, LoadApi, TrainApi, UserApi } from "../Swagger";

export const UserAPIInstance = new UserApi(IncludeCredentials)
export const CDNAPIInstance = new CDNApi()
export const FPNAPIInstance = new FPNApi()
export const InferenceAPIInstance = new InferenceApi(IncludeCredentials)
export const LoadAPIInstance = new LoadApi(IncludeCredentials)
export const TrainAPIInstance = new TrainApi(IncludeCredentials)
