import {supabase} from "../logic/logic";

export function UserBox() {
    const { avatar_url, full_name } = supabase.auth.user().user_metadata;

    const logout = async () => {
        await supabase.auth.signOut();
    }


    return (
        <div className="user-box">
            <div className="avatar">
                <img src={avatar_url} alt=""/>
            </div>
            <div className="name">
                {full_name}
            </div>

            <div className="logout">
                <button onClick={logout}>
                    Cerrar Sessión
                </button>
            </div>

        </div>
    )

}