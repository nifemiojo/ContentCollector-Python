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
    const {user, setUser} = useUser()
    const csrftoken = Cookies.get('csrftoken');

    const signin = (user, cb) => {
        setUser(user)
        cb();
    };

    const signout = cb => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        }
      }
      axios.post('auth/logout/', {}, config)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setUser({});
      cb();
    };

    return {
        user,
        signin,
        signout
    };
}