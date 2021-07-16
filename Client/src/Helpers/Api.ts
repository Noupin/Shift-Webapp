//First Party Imports
import { CDNApi, CategoryApi, InferenceApi, 
  LoadApi, TrainApi, UserApi, AuthenticateApi,
  ShiftApi, Configuration, ConfigurationParameters } from "../Swagger";


function APIFactory<T>(API: new (config: Configuration) => T, configParams: ConfigurationParameters): T {
  const config = new Configuration({credentials: 'same-origin', ...configParams})
  return new API(config)
}

const CDNAPIFactory = (apiKey: string) => {
  return APIFactory(CDNApi, {apiKey: apiKey})
}
const LoadAPIFactory = (apiKey: string) => {
  return APIFactory(LoadApi, {apiKey: apiKey})
}
const UserAPIFactory = (apiKey: string) => {
  return APIFactory(UserApi, {apiKey: apiKey})
}
const ShiftAPIFactory = (apiKey: string) => {
  return APIFactory(ShiftApi, {apiKey: apiKey})
}
export const TrainAPIFactory = (apiKey: string) => {
  return APIFactory(TrainApi, {apiKey: apiKey})
}
const CategoryAPIFactory = (apiKey: string) => {
  return APIFactory(CategoryApi, {apiKey: apiKey})
}
const InferenceAPIFactory = (apiKey: string) => {
  return APIFactory(InferenceApi, {apiKey: apiKey})
}
export const AuthenticateAPIFactory = (apiKey?: string) => {
  return APIFactory(AuthenticateApi, {apiKey: apiKey})
}

export class ApiInstances{
  apiKey: string

  constructor(apiKey: string){
    this.apiKey = `Bearer ${apiKey}`
  }

  get CDN(){
    return CDNAPIFactory(this.apiKey)
  }

  get Load(){
    return LoadAPIFactory(this.apiKey)
  }

  get User(){
    return UserAPIFactory(this.apiKey)
  }

  get Shift(){
    return ShiftAPIFactory(this.apiKey)
  }

  get Train(){
    return TrainAPIFactory(this.apiKey)
  }

  get Category(){
    return CategoryAPIFactory(this.apiKey)
  }

  get Inference(){
    return InferenceAPIFactory(this.apiKey)
  }

  get Authenticate(){
    return AuthenticateAPIFactory(this.apiKey)
  }
}