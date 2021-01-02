//Third Party Imports
import React from 'react';

export interface IElevatedPageState {
    uuid: string,
    setUUID: React.Dispatch<React.SetStateAction<string>>,
    setMsg: React.Dispatch<React.SetStateAction<string>>
}