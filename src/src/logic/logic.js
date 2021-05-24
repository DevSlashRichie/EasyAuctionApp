const {createClient} = require("@supabase/supabase-js");

export const supabase = createClient(
    "https://gamrmzythyzqvyhakeau.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTg4NDA2NSwiZXhwIjoxOTM3NDYwMDY1fQ.m-JceCMoxfS8xE5JORGFmLqvKS_DjSRa1Cbs67B1Eik"
);

export async function loginButton() {
    let { user } = await supabase.auth.signIn({
        provider: "google"
    });

    console.log(`User: ${user}`);
}