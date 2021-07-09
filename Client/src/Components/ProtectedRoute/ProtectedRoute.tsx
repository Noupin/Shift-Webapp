//Third Party Imports
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'


interface IProtectedRoute extends RouteProps {
  expression: boolean
  children: React.ReactNode
}

function ProtectedRoute ({expression, children, ...rest }: IProtectedRoute) {
  return (
    <Route {...rest} render={() => {
      return expression
        ? children
        : <Redirect to={`/login${rest.path}`} />
    }} />
  )
}

export default ProtectedRoute;