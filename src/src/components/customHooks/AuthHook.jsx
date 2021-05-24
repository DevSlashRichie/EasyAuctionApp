
import { useState } from "react";

export function AuthHook () {

    function getToken() {
        return localStorage.getItem("token") || "";
    }

    const [token, setToken] = useState(getToken());


    const saveToken = (userToken) => {
        sessionStorage.setItem("token", userToken);
        setToken(userToken);
    }

    return {
        setToken: saveToken,
        token
    }
}