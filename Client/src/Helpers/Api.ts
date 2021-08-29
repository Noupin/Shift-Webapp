//First Party Imports
import { API_BASE_URL, API_CONFIG } from "../constants";
import { CategoryApi, InferenceApi, 
  LoadApi, TrainApi, UserApi, ShiftApi,
  Configuration, ConfigurationParameters } from "../Swagger";


function APIFactory<T>(API: new (config: Configuration) => T, configParams: ConfigurationParameters): T {
  const config = new Configuration({...API_CONFIG, basePath: API_BASE_URL, ...configParams})
  return new API(config)
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

export class ApiInstances{
  private key: string

  constructor(apiKey?: string){
    if(!apiKey){
      this.key = ""
    }
    else{
      this.key = `Bearer ${apiKey}`
    }
  }

  get apiKey(){
    return this.key
  }

  set apiKey(apiKey: string){
    if(!apiKey){
      this.key = ""
    }
    else{
      this.key = `Bearer ${apiKey}`
    }
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
}
