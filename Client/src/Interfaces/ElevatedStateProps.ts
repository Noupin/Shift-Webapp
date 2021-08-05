//First Party Imports
import { IElevatedPageState } from "./PageState";

export interface IElevatedStateProps {
  elevatedState: IElevatedPageState
  setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>
}