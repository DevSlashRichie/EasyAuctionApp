const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gamrmzythyzqvyhakeau.supabase.co'
const supabaseKey = "d89fd307-adf0-40e2-9463-0f2085adfc98";
const supabase = createClient(supabaseUrl, supabaseKey)

exports.login = async function login() {
    let {user, error} = await supabase.auth.signIn({
        provider: "google"
    });

    console.log(user)
}
