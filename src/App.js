import './App.css';
import {BidScreen} from "./components/views/BidScreen";
import {END_TIME, supabase} from "./logic/logic";
import {useEffect, useState} from "react";
import {LoginScreen} from "./components/LoginScreen";
import {StyleRoot} from "radium";
import {EndScreen} from "./components/EndScreen";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user ?? null);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                setUser(currentUser ?? null);
            }
        );

        return () => {
            authListener?.unsubscribe();
        }

    }, [user]);

    // -

    const isTimeFinished = () => {
        const END_TIME_UNIX = END_TIME;
        const currentTime = new Date().getTime() / 1000;
        if (currentTime > END_TIME_UNIX)
            return true;
    }

  return (
    <div className="App">
      <div className="title">
        <h1>Simón Levy y Diego Ruzzarin</h1>
        <span>Subasta</span>
      </div>

        {

            isTimeFinished() ?
                <EndScreen />
                :

            !user ?
                <LoginScreen />
                : <>
                    <StyleRoot>
                        <BidScreen />
                    </StyleRoot>
                </>
        }

        <div className="footer">
            <div>
                Powered by: <a href="https://mymetaverse.io" target="_blank" rel='noreferrer'>mymetaverse.io</a> <br/>
                Created by: <a href="https://twitter.com/SiendoRicardo" target="_blank" rel='noreferrer'>Ricardo R.</a>
            </div>
        </div>

    </div>
  );
}

export default App;
