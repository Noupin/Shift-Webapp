//First Party Imports
import { IncludeCredentials } from "./IncludeCredentails";
import { CDNApi, ShiftCategoryApi, InferenceApi, 
  LoadApi, TrainApi, UserApi, AuthenticateApi, ShiftApi } from "../Swagger";

export const CDNAPIInstance = new CDNApi()
export const LoadAPIInstance = new LoadApi(IncludeCredentials)
export const UserAPIInstance = new UserApi(IncludeCredentials)
export const ShiftAPIInstance = new ShiftApi(IncludeCredentials)
export const TrainAPIInstance = new TrainApi(IncludeCredentials)
export const InferenceAPIInstance = new InferenceApi(IncludeCredentials)
export const AuthenticateAPIInstance = new AuthenticateApi(IncludeCredentials)
export const ShiftCategoryAPIInstance = new ShiftCategoryApi(IncludeCredentials)
