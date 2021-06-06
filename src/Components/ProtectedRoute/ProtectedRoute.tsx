//Third Party Imports
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

//First Party Imports
import { IElevatedPageState } from '../../Interfaces/PageState';


interface IProtectedRoute extends RouteProps {
  elevatedState: () => IElevatedPageState
  children: React.ReactNode
}

function ProtectedRoute ({elevatedState, children, ...rest }: IProtectedRoute) {
  return (
    <Route {...rest} render={() => {
      return elevatedState().authenticated === true
        ? children
        : <Redirect to='/login' />
    }} />
  )
}

export default ProtectedRoute;