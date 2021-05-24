import './App.css';
import {BidScreen} from "./src/components/views/BidScreen";
import {supabase} from "./src/logic/logic";
import {useEffect, useState} from "react";
import {LoginScreen} from "./src/components/LoginScreen";

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

  return (
    <div className="App">
      <div className="title">
        <h1>Simón Levy y Diego Ruzzarin</h1>
        <span>Subasta</span>
      </div>

        {
            !user ?
                <LoginScreen />
                : <BidScreen />
        }

        <div className="footer">
            <div>
                Powered by: <a href="https://mymetaverse.io" target="_blank">mymetaverse.io</a> <br/>
                Created by: <a href="https://twitter.com/SiendoRicardo" target="_blank">Ricardo R.</a>
            </div>
        </div>

    </div>
  );
}

export default App;
