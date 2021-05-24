import {loginButton} from "../logic/logic";
import g from "../assets/google.png";

export function LoginScreen() {

    const login = async () => {
        await loginButton();
    }


    return (
        <div className="login-screen">
            <button onClick={login}>
                <div>
                    <img src={g} alt=""/>
                    <span>
                    Login with Google
                    </span>
                </div>
            </button>
        </div>
    )

}