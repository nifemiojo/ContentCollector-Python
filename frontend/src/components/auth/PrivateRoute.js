import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "./ProvideAuth";

export default function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
        Object.keys(auth.user).length !== 0 ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}