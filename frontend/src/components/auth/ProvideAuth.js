import React, { createContext, useContext } from "react";
import { useUser } from "../context_providers/UserProvider";
import Cookies from 'js-cookie';
import axios from "axios";

const authContext = createContext();
export function useAuth() {
    return useContext(authContext);
}

export default function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
      <authContext.Provider value={auth}>
        {children}
      </authContext.Provider>
    );
  }

function useProvideAuth() {
    const {user, setUser} = useUser();
    const csrftoken = Cookies.get('csrftoken');

    const signin = (user, cb) => {
        setUser(user)
        cb();
    };

    const signout = cb => {
      const config = {
        headers: {
          'url': 'auth/logout/',
          'method': 'post',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
          'Authorization': "",
        },
        data: JSON.stringify({
          refresh: user.tokens.refresh,
        }),
      }
      axios.request(config)
        .catch((err) => console.log(err));
      setUser({});
      localStorage.removeItem("user");
      cb();
    };

    return {
        user,
        signin,
        signout
    };
}