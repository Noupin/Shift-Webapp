//First Party Imports
import { IElevatedState } from "./ElevatedState";

export interface IElevatedStateProps {
  elevatedState: IElevatedState
  setElevatedState: React.Dispatch<React.SetStateAction<IElevatedState>>
}