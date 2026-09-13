// =========================================================
// LOGIN
// MATERIAL DE GABINETE
// =========================================================


const formLogin =
    document.getElementById(
        "formLogin"
    );


const inputUsuario =
    document.getElementById(
        "usuario"
    );


const inputPassword =
    document.getElementById(
        "password"
    );


const btnIngresar =
    document.getElementById(
        "btnIngresar"
    );


const mensajeLogin =
    document.getElementById(
        "mensajeLogin"
    );


// =========================================================
// MOSTRAR MENSAJE
// =========================================================

function mostrarMensajeLogin(
    mensaje,
    tipo = "error"
) {

    if (!mensajeLogin) {
        return;
    }


    mensajeLogin.textContent =
        mensaje;


    if (tipo === "ok") {

        mensajeLogin.style.color =
            "#86efac";

    } else {

        mensajeLogin.style.color =
            "#fca5a5";
    }

}


// =========================================================
// OBTENER PERFIL
// =========================================================

async function obtenerPerfilUsuario(
    userId
) {

    const {
        data,
        error
    } =
        await supabaseClient

            .from("perfiles")

            .select(
                `
                id,
                usuario,
                nombre,
                rol,
                activo,
                eliminado,
                es_superadmin
                `
            )

            .eq(
                "id",
                userId
            )

            .maybeSingle();


    if (error) {

        console.error(
            "Error obteniendo perfil:",
            error
        );

        throw new Error(
            "No se pudo cargar el perfil del usuario."
        );
    }


    return data;
}


// =========================================================
// REDIRECCIONAR SEGÚN ROL
// =========================================================

function redireccionarSegunRol(
    perfil
) {

    if (!perfil) {

        mostrarMensajeLogin(
            "No se encontró el perfil del usuario."
        );

        return;
    }


    if (
        perfil.activo !== true ||
        perfil.eliminado === true
    ) {

        mostrarMensajeLogin(
            "Este usuario está deshabilitado."
        );

        return;
    }


    if (
        perfil.rol ===
        "administrador"
    ) {

        window.location.href =
            "admin.html";

        return;
    }


    if (
        perfil.rol ===
        "docente"
    ) {

        window.location.href =
            "docente.html";

        return;
    }


    mostrarMensajeLogin(
        "El usuario no tiene un rol válido."
    );
}


// =========================================================
// COMPROBAR SESIÓN EXISTENTE
// =========================================================

async function comprobarSesion() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth
                .getSession();


        if (error) {

            console.error(
                "Error obteniendo sesión:",
                error
            );

            return;
        }


        const session =
            data?.session;


        if (
            !session?.user
        ) {

            return;
        }


        const perfil =
            await obtenerPerfilUsuario(
                session.user.id
            );


        redireccionarSegunRol(
            perfil
        );

    } catch (error) {

        console.error(
            "Error comprobando sesión:",
            error
        );
    }

}


// =========================================================
// INICIAR SESIÓN
// =========================================================

formLogin?.addEventListener(
    "submit",
    async (
        event
    ) => {

        event.preventDefault();


        const usuario =
            inputUsuario
                .value
                .trim();


        const password =
            inputPassword
                .value;


        if (
            !usuario ||
            !password
        ) {

            mostrarMensajeLogin(
                "Ingrese usuario y contraseña."
            );

            return;
        }


        btnIngresar.disabled =
            true;


        btnIngresar.textContent =
            "INGRESANDO...";


        mostrarMensajeLogin(
            ""
        );


        try {

            // =============================================
            // MISMO FORMATO DE LOGIN QUE RESERVA MAQUETAS
            // =============================================

            const emailInterno =
                `${usuario}@ceta.internal`;


            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signInWithPassword({

                        email:
                            emailInterno,

                        password:
                            password

                    });


            if (error) {

                console.error(
                    "Error login:",
                    error
                );


                mostrarMensajeLogin(
                    "Usuario o contraseña incorrectos."
                );


                return;
            }


            if (
                !data?.user
            ) {

                mostrarMensajeLogin(
                    "No se pudo iniciar sesión."
                );

                return;
            }


            const perfil =
                await obtenerPerfilUsuario(
                    data.user.id
                );


            if (!perfil) {

                await supabaseClient.auth
                    .signOut();


                mostrarMensajeLogin(
                    "No se encontró el perfil del usuario."
                );


                return;
            }


            if (
                perfil.activo !== true ||
                perfil.eliminado === true
            ) {

                await supabaseClient.auth
                    .signOut();


                mostrarMensajeLogin(
                    "Este usuario está deshabilitado."
                );


                return;
            }


            mostrarMensajeLogin(
                "Acceso correcto.",
                "ok"
            );


            redireccionarSegunRol(
                perfil
            );

        } catch (error) {

            console.error(
                "Error inesperado:",
                error
            );


            mostrarMensajeLogin(
                "Ocurrió un error al iniciar sesión."
            );

        } finally {

            btnIngresar.disabled =
                false;


            btnIngresar.textContent =
                "INGRESAR";
        }

    }
);


// =========================================================
// INICIAR
// =========================================================

comprobarSesion();
