//Third Party Imports
import React from 'react';

export interface IElevatedPageState {
    shiftUUID: string,
    setShiftUUID: React.Dispatch<React.SetStateAction<string>>,
    setMsg: React.Dispatch<React.SetStateAction<string>>
}