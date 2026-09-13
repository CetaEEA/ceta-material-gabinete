// =========================================================
// SUPABASE
// MATERIAL DE GABINETE CETA
// =========================================================


// =========================================================
// CONFIGURACIÓN
// =========================================================

const SUPABASE_URL =
    "AQUI_TU_SUPABASE_URL";


const SUPABASE_ANON_KEY =
    "AQUI_TU_SUPABASE_ANON_KEY";


// =========================================================
// CLIENTE
// =========================================================

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
