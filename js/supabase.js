// =========================================================
// SUPABASE
// MATERIAL DE GABINETE CETA
// =========================================================


// =========================================================
// CONFIGURACIÓN
// =========================================================

const SUPABASE_URL =
    "https://cystgztmeyinsvmkkbji.supabase.co";


const SUPABASE_ANON_KEY =
    "sb_publishable_4n5HfbFA8otKAg_X3ic8ig_VZzCqgH1";


// =========================================================
// CLIENTE
// =========================================================

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
