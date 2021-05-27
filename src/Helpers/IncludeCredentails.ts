//Third Party Imports
import { Configuration, ConfigurationParameters } from "../Swagger";

const paramsConfigParams: ConfigurationParameters = {credentials: "include"}
export const IncludeCredentials = new Configuration(paramsConfigParams);
