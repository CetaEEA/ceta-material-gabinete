// =========================================================
// CETA
// MATERIAL DE GABINETE
// PANEL DOCENTE
// =========================================================


// =========================================================
// VARIABLES
// =========================================================

let perfilDocente = null;

let categoriasDocente = [];

let disponibilidadMateriales = [];

let relacionesCategorias = [];

let carrito = [];

let lunesSemanaActual =
    obtenerLunes(
        new Date()
    );


// =========================================================
// VARIABLES PARA EDICIÓN DE RESERVA
// =========================================================

let reservasSemanaDocente = [];

let detallesSemanaDocente = [];

let materialesSemanaDocente = [];

let perfilesSemanaDocente = [];

let reservaEdicionDocente = null;

let carritoEdicionDocente = [];

let disponibilidadEdicionDocente = [];

let cantidadesOriginalesEdicionDocente =
    new Map();


// =========================================================
// HORARIOS
// =========================================================

const HORARIOS = [

    "09:00-12:00",

    "14:00-17:00",

    "19:00-21:30"
];


// =========================================================
// ELEMENTOS GENERALES
// =========================================================

const nombreDocente =
    document.getElementById(
        "nombreDocente"
    );


const btnCerrarSesionDocente =
    document.getElementById(
        "btnCerrarSesionDocente"
    );


const btnModoOscuroDocente =
    document.getElementById(
        "btnModoOscuroDocente"
    );


// =========================================================
// ELEMENTOS NUEVA RESERVA
// =========================================================

const reservaFecha =
    document.getElementById(
        "reservaFecha"
    );


const reservaHorario =
    document.getElementById(
        "reservaHorario"
    );


const reservaGrupo =
    document.getElementById(
        "reservaGrupo"
    );


const reservaTema =
    document.getElementById(
        "reservaTema"
    );


const filtroCategoria =
    document.getElementById(
        "filtroCategoria"
    );


const buscarMaterialDocente =
    document.getElementById(
        "buscarMaterialDocente"
    );


const catalogoMaterialesDocente =
    document.getElementById(
        "catalogoMaterialesDocente"
    );


const mensajeDisponibilidad =
    document.getElementById(
        "mensajeDisponibilidad"
    );


const carritoMateriales =
    document.getElementById(
        "carritoMateriales"
    );


const contadorCarrito =
    document.getElementById(
        "contadorCarrito"
    );


const btnFinalizarReserva =
    document.getElementById(
        "btnFinalizarReserva"
    );


const mensajeNuevaReserva =
    document.getElementById(
        "mensajeNuevaReserva"
    );


// =========================================================
// ELEMENTOS TABLA SEMANAL
// =========================================================

const cuerpoTablaReservas =
    document.getElementById(
        "cuerpoTablaReservas"
    );


const textoSemana =
    document.getElementById(
        "textoSemana"
    );


const btnSemanaAnterior =
    document.getElementById(
        "btnSemanaAnterior"
    );


const btnSemanaSiguiente =
    document.getElementById(
        "btnSemanaSiguiente"
    );


const mensajeReservasDocente =
    document.getElementById(
        "mensajeReservasDocente"
    );


// =========================================================
// ELEMENTOS EDICIÓN DE RESERVA
// =========================================================

const panelEditarReservaDocente =
    document.getElementById(
        "panelEditarReservaDocente"
    );


const editarReservaDocenteId =
    document.getElementById(
        "editarReservaDocenteId"
    );


const editarReservaDocenteFecha =
    document.getElementById(
        "editarReservaDocenteFecha"
    );


const editarReservaDocenteHorario =
    document.getElementById(
        "editarReservaDocenteHorario"
    );


const editarReservaDocenteGrupo =
    document.getElementById(
        "editarReservaDocenteGrupo"
    );


const editarReservaDocenteTema =
    document.getElementById(
        "editarReservaDocenteTema"
    );


const editarFiltroCategoriaDocente =
    document.getElementById(
        "editarFiltroCategoriaDocente"
    );


const editarBuscarMaterialDocente =
    document.getElementById(
        "editarBuscarMaterialDocente"
    );


const editarMensajeDisponibilidadDocente =
    document.getElementById(
        "editarMensajeDisponibilidadDocente"
    );


const editarCatalogoMaterialesDocente =
    document.getElementById(
        "editarCatalogoMaterialesDocente"
    );


const editarCarritoMaterialesDocente =
    document.getElementById(
        "editarCarritoMaterialesDocente"
    );


const btnCancelarEdicionDocente =
    document.getElementById(
        "btnCancelarEdicionDocente"
    );


const btnGuardarEdicionDocente =
    document.getElementById(
        "btnGuardarEdicionDocente"
    );


const mensajeEditarReservaDocente =
    document.getElementById(
        "mensajeEditarReservaDocente"
    );


// =========================================================
// UTILIDADES
// =========================================================

function escaparHTML(
    valor
) {

    if (
        valor === null ||
        valor === undefined
    ) {

        return "";
    }


    return String(
        valor
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );
}


// =========================================================
// MOSTRAR MENSAJE DOCENTE
// =========================================================

function mostrarMensajeDocente(
    elemento,
    texto,
    tipo = ""
) {

    if (!elemento) {

        return;
    }


    elemento.textContent =
        texto || "";


    elemento.className =
        "mensaje-docente";


    if (
        tipo === "ok"
    ) {

        elemento.classList.add(
            "mensaje-docente-ok"
        );
    }


    if (
        tipo === "error"
    ) {

        elemento.classList.add(
            "mensaje-docente-error"
        );
    }
}


// =========================================================
// MOSTRAR PANEL
// =========================================================

function mostrarPanelDocente(
    panelId
) {

    document
        .querySelectorAll(
            ".docente-panel"
        )
        .forEach(
            panel => {

                panel.classList.remove(
                    "activo"
                );
            }
        );


    document
        .getElementById(
            panelId
        )
        ?.classList.add(
            "activo"
        );


    document
        .querySelectorAll(
            ".docente-tab[data-panel]"
        )
        .forEach(
            boton => {

                boton.classList.toggle(

                    "activo",

                    boton.dataset.panel ===
                    panelId
                );
            }
        );
}


// =========================================================
// FECHA ISO
// =========================================================

function fechaISO(
    fecha
) {

    const year =
        fecha.getFullYear();


    const month =
        String(
            fecha.getMonth() + 1
        )
            .padStart(
                2,
                "0"
            );


    const day =
        String(
            fecha.getDate()
        )
            .padStart(
                2,
                "0"
            );


    return `${year}-${month}-${day}`;
}


// =========================================================
// OBTENER LUNES
// =========================================================

function obtenerLunes(
    fecha
) {

    const resultado =
        new Date(
            fecha.getFullYear(),
            fecha.getMonth(),
            fecha.getDate()
        );


    const dia =
        resultado.getDay();


    const diferencia =
        dia === 0
            ? -6
            : 1 - dia;


    resultado.setDate(
        resultado.getDate() +
        diferencia
    );


    resultado.setHours(
        0,
        0,
        0,
        0
    );


    return resultado;
}


// =========================================================
// SUMAR DÍAS
// =========================================================

function sumarDias(
    fecha,
    dias
) {

    const nueva =
        new Date(
            fecha
        );


    nueva.setDate(
        nueva.getDate() +
        dias
    );


    return nueva;
}


// =========================================================
// FECHA CORTA
// =========================================================

function formatoFechaCorta(
    fecha
) {

    return fecha.toLocaleDateString(
        "es-BO",
        {
            day: "2-digit",
            month: "2-digit"
        }
    );
}


// =========================================================
// FECHA COMPLETA
// =========================================================

function formatoFechaCompleta(
    fecha
) {

    return fecha.toLocaleDateString(
        "es-BO",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );
}


// =========================================================
// FECHA DE HOY EN FORMATO YYYY-MM-DD
// =========================================================

function obtenerFechaHoyDocente() {

    return fechaISO(
        new Date()
    );
}


// =========================================================
// COMPROBAR SI UNA RESERVA PUEDE MODIFICARSE
// =========================================================

function reservaPuedeModificarDocente(
    reserva
) {

    if (
        !reserva ||
        !perfilDocente
    ) {

        return false;
    }


    // -----------------------------------------------------
    // Debe pertenecer al docente conectado
    // -----------------------------------------------------

    if (
        reserva.usuario_id !==
        perfilDocente.id
    ) {

        return false;
    }


    // -----------------------------------------------------
    // Solamente reservas que todavía no fueron entregadas
    // -----------------------------------------------------

    if (
        reserva.estado !==
        "reservada"
    ) {

        return false;
    }


    // -----------------------------------------------------
    // No se puede editar ni cancelar hoy ni fechas pasadas
    // -----------------------------------------------------

    const hoy =
        obtenerFechaHoyDocente();


    if (
        reserva.fecha <= hoy
    ) {

        return false;
    }


    return true;
}


// =========================================================
// SESIÓN
// =========================================================

async function comprobarDocente() {

    try {

        const {
            data: sessionData,
            error: sessionError
        } =
            await supabaseClient.auth
                .getSession();


        if (
            sessionError ||
            !sessionData?.session?.user
        ) {

            window.location.href =
                "index.html";


            return false;
        }


        const userId =
            sessionData.session.user.id;


        const {
            data: perfil,
            error
        } =
            await supabaseClient

                .from(
                    "perfiles"
                )

                .select(`
                    id,
                    usuario,
                    nombre,
                    rol,
                    activo,
                    eliminado
                `)

                .eq(
                    "id",
                    userId
                )

                .maybeSingle();


        if (
            error ||
            !perfil ||
            perfil.rol !== "docente" ||
            perfil.activo !== true ||
            perfil.eliminado === true
        ) {

            await supabaseClient.auth
                .signOut();


            window.location.href =
                "index.html";


            return false;
        }


        perfilDocente =
            perfil;


        nombreDocente.textContent =
            perfil.nombre ||
            perfil.usuario ||
            "Docente";


        return true;

    } catch (error) {

        console.error(
            "Error verificando docente:",
            error
        );


        window.location.href =
            "index.html";


        return false;
    }
}


// =========================================================
// CERRAR SESIÓN
// =========================================================

btnCerrarSesionDocente
    ?.addEventListener(

        "click",

        async () => {

            await supabaseClient.auth
                .signOut();


            window.location.href =
                "index.html";
        }
    );


// =========================================================
// TABS
// =========================================================

document
    .querySelectorAll(
        ".docente-tab[data-panel]"
    )
    .forEach(
        boton => {

            boton.addEventListener(

                "click",

                () => {

                    const panelId =
                        boton.dataset.panel;


                    /*
                     * Si abandona el panel de edición
                     * descartamos el estado temporal.
                     */

                    if (
                        panelId !==
                        "panelEditarReservaDocente"
                    ) {

                        reservaEdicionDocente =
                            null;


                        carritoEdicionDocente =
                            [];


                        disponibilidadEdicionDocente =
                            [];


                        cantidadesOriginalesEdicionDocente =
                            new Map();
                    }


                    mostrarPanelDocente(
                        panelId
                    );
                }
            );
        }
    );


// =========================================================
// MODO OSCURO
// =========================================================

function aplicarModoDocente() {

    const modo =
        localStorage.getItem(
            "ceta_material_modo"
        );


    if (
        modo === "oscuro"
    ) {

        document.body.classList.add(
            "modo-oscuro"
        );


        btnModoOscuroDocente.textContent =
            "☀️ Modo claro";
    }
}


btnModoOscuroDocente
    ?.addEventListener(

        "click",

        () => {

            document.body.classList.toggle(
                "modo-oscuro"
            );


            const oscuro =
                document.body.classList.contains(
                    "modo-oscuro"
                );


            localStorage.setItem(

                "ceta_material_modo",

                oscuro
                    ? "oscuro"
                    : "claro"
            );


            btnModoOscuroDocente.textContent =
                oscuro
                    ? "☀️ Modo claro"
                    : "🌙 Modo oscuro";
        }
    );


// =========================================================
// CATEGORÍAS
// =========================================================

async function cargarCategoriasDocente() {

    const {
        data,
        error
    } =
        await supabaseClient

            .from(
                "categorias_material"
            )

            .select(`
                id,
                nombre
            `)

            .eq(
                "activo",
                true
            )

            .order(
                "nombre",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            error
        );


        return;
    }


    categoriasDocente =
        data || [];


    // -----------------------------------------------------
    // SELECT DE NUEVA RESERVA
    // -----------------------------------------------------

    if (
        filtroCategoria
    ) {

        filtroCategoria.innerHTML =
            `
                <option value="">
                    Todas las categorías
                </option>
            `;


        categoriasDocente
            .forEach(
                categoria => {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        categoria.id;


                    option.textContent =
                        categoria.nombre;


                    filtroCategoria
                        .appendChild(
                            option
                        );
                }
            );
    }


    // -----------------------------------------------------
    // SELECT DE EDICIÓN
    // -----------------------------------------------------

    if (
        editarFiltroCategoriaDocente
    ) {

        editarFiltroCategoriaDocente.innerHTML =
            `
                <option value="">
                    Todas las categorías
                </option>
            `;


        categoriasDocente
            .forEach(
                categoria => {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        categoria.id;


                    option.textContent =
                        categoria.nombre;


                    editarFiltroCategoriaDocente
                        .appendChild(
                            option
                        );
                }
            );
    }


    // -----------------------------------------------------
    // RELACIONES MATERIAL - CATEGORÍA
    // -----------------------------------------------------

    const {
        data: relaciones,
        error: errorRelaciones
    } =
        await supabaseClient

            .from(
                "material_categorias"
            )

            .select(`
                material_id,
                categoria_id
            `);


    if (
        !errorRelaciones
    ) {

        relacionesCategorias =
            relaciones || [];
    }
}


// =========================================================
// CATEGORÍAS DE UN MATERIAL
// =========================================================

function categoriasDelMaterial(
    materialId
) {

    const ids =
        relacionesCategorias

            .filter(
                relacion =>
                    Number(
                        relacion.material_id
                    ) ===
                    Number(
                        materialId
                    )
            )

            .map(
                relacion =>
                    Number(
                        relacion.categoria_id
                    )
            );


    return categoriasDocente

        .filter(
            categoria =>
                ids.includes(
                    Number(
                        categoria.id
                    )
                )
        )

        .map(
            categoria =>
                categoria.nombre
        );
}
// =========================================================
// CONSULTAR DISPONIBILIDAD - NUEVA RESERVA
// =========================================================

async function consultarDisponibilidad() {

    const fecha =
        reservaFecha.value;


    const horario =
        reservaHorario.value;


    if (
        !fecha ||
        !horario
    ) {

        disponibilidadMateriales =
            [];


        catalogoMaterialesDocente.innerHTML =
            "";


        mensajeDisponibilidad.textContent =
            "Selecciona una fecha y un horario.";


        return;
    }


    mensajeDisponibilidad.textContent =
        "Consultando disponibilidad...";


    const {
        data,
        error
    } =
        await supabaseClient.rpc(

            "obtener_disponibilidad_material",

            {
                p_fecha:
                    fecha,

                p_horario:
                    horario
            }
        );


    if (error) {

        console.error(
            "Error disponibilidad:",
            error
        );


        mensajeDisponibilidad.textContent =
            "No se pudo consultar la disponibilidad.";


        return;
    }


    disponibilidadMateriales =
        data || [];


    mensajeDisponibilidad.textContent =
        `${disponibilidadMateriales.length} material(es) disponibles para consultar.`;


    renderizarCatalogo();
}


// =========================================================
// FILTRAR CATÁLOGO - NUEVA RESERVA
// =========================================================

function materialesFiltrados() {

    const categoriaId =
        filtroCategoria.value

            ? Number(
                filtroCategoria.value
            )

            : null;


    const texto =
        buscarMaterialDocente.value
            .trim()
            .toLowerCase();


    return disponibilidadMateriales.filter(

        material => {

            const categorias =
                categoriasDelMaterial(
                    material.material_id
                );


            // -------------------------------------------------
            // FILTRO POR CATEGORÍA
            // -------------------------------------------------

            if (
                categoriaId !== null
            ) {

                const pertenece =
                    relacionesCategorias
                        .some(
                            relacion =>

                                Number(
                                    relacion.material_id
                                ) ===
                                Number(
                                    material.material_id
                                )

                                &&

                                Number(
                                    relacion.categoria_id
                                ) ===
                                categoriaId
                        );


                if (
                    !pertenece
                ) {

                    return false;
                }
            }


            // -------------------------------------------------
            // FILTRO POR TEXTO
            // -------------------------------------------------

            if (
                texto
            ) {

                const cadena =
                    `
                        ${material.codigo || ""}
                        ${material.nombre || ""}
                        ${material.descripcion || ""}
                        ${categorias.join(" ")}
                    `
                        .toLowerCase();


                if (
                    !cadena.includes(
                        texto
                    )
                ) {

                    return false;
                }
            }


            return true;
        }
    );
}


// =========================================================
// RENDER CATÁLOGO - NUEVA RESERVA
// =========================================================

function renderizarCatalogo() {

    const materiales =
        materialesFiltrados();


    if (
        materiales.length === 0
    ) {

        catalogoMaterialesDocente.innerHTML =
            `
                <div class="catalogo-vacio">

                    <span>
                        🔎
                    </span>

                    <p>
                        No se encontraron materiales.
                    </p>

                </div>
            `;


        return;
    }


    catalogoMaterialesDocente.innerHTML =
        materiales

            .map(

                material => {

                    const disponibles =
                        Number(
                            material.cantidad_disponible
                        );


                    const categorias =
                        categoriasDelMaterial(
                            material.material_id
                        );


                    const itemCarrito =
                        carrito.find(
                            item =>

                                Number(
                                    item.material_id
                                ) ===
                                Number(
                                    material.material_id
                                )
                        );


                    const yaSeleccionado =
                        itemCarrito
                            ? Number(
                                itemCarrito.cantidad
                            )
                            : 0;


                    const maximo =
                        Math.max(
                            0,
                            disponibles
                        );


                    const imagen =
                        material.imagen_url

                            ? `
                                <img
                                    src="${escaparHTML(
                                        material.imagen_url
                                    )}"
                                    alt="${escaparHTML(
                                        material.nombre
                                    )}"
                                >
                            `

                            : `
                                <div class="docente-material-sin-imagen">
                                    📦
                                </div>
                            `;


                    return `
                        <article class="docente-material-card">

                            <div class="docente-material-imagen">

                                ${imagen}

                            </div>


                            <div class="docente-material-info">

                                <span class="material-codigo">

                                    ${
                                        escaparHTML(
                                            material.codigo
                                        ) ||
                                        "Sin código"
                                    }

                                </span>


                                <h3>

                                    ${escaparHTML(
                                        material.nombre
                                    )}

                                </h3>


                                ${
                                    material.descripcion

                                        ? `
                                            <p>
                                                ${escaparHTML(
                                                    material.descripcion
                                                )}
                                            </p>
                                        `

                                        : ""
                                }


                                <div class="material-categorias">

                                    ${
                                        categorias

                                            .map(
                                                categoria =>
                                                    `
                                                        <span>
                                                            ${escaparHTML(
                                                                categoria
                                                            )}
                                                        </span>
                                                    `
                                            )

                                            .join("")
                                    }

                                </div>


                                <div class="disponibilidad-box">

                                    <span>
                                        Disponibles
                                    </span>

                                    <strong>
                                        ${maximo}
                                    </strong>

                                </div>


                                ${
                                    yaSeleccionado > 0

                                        ? `
                                            <div class="ya-seleccionado">
                                                En carrito:
                                                ${yaSeleccionado}
                                            </div>
                                        `

                                        : ""
                                }


                                <div class="selector-cantidad">

                                    <input
                                        type="number"
                                        id="cantidad_${material.material_id}"
                                        min="1"
                                        max="${maximo}"
                                        value="1"
                                        ${
                                            maximo <= 0
                                                ? "disabled"
                                                : ""
                                        }
                                    >


                                    <button
                                        type="button"
                                        onclick="agregarAlCarrito(${material.material_id})"
                                        ${
                                            maximo <= 0
                                                ? "disabled"
                                                : ""
                                        }
                                    >
                                        + Añadir
                                    </button>

                                </div>

                            </div>

                        </article>
                    `;
                }
            )

            .join("");
}


// =========================================================
// EVENTOS DEL CATÁLOGO - NUEVA RESERVA
// =========================================================

reservaFecha
    ?.addEventListener(

        "change",

        consultarDisponibilidad
    );


reservaHorario
    ?.addEventListener(

        "change",

        consultarDisponibilidad
    );


filtroCategoria
    ?.addEventListener(

        "change",

        renderizarCatalogo
    );


buscarMaterialDocente
    ?.addEventListener(

        "input",

        renderizarCatalogo
    );


// =========================================================
// AGREGAR AL CARRITO - NUEVA RESERVA
// =========================================================

window.agregarAlCarrito =
    function (
        materialId
    ) {

        const material =
            disponibilidadMateriales.find(
                item =>

                    Number(
                        item.material_id
                    ) ===
                    Number(
                        materialId
                    )
            );


        if (
            !material
        ) {

            return;
        }


        const input =
            document.getElementById(
                `cantidad_${materialId}`
            );


        const cantidad =
            Number(
                input?.value
            );


        const disponible =
            Number(
                material.cantidad_disponible
            );


        if (
            !Number.isInteger(
                cantidad
            )
            ||
            cantidad <= 0
        ) {

            alert(
                "Ingrese una cantidad válida."
            );


            return;
        }


        const existente =
            carrito.find(
                item =>

                    Number(
                        item.material_id
                    ) ===
                    Number(
                        materialId
                    )
            );


        const cantidadActual =
            existente
                ? Number(
                    existente.cantidad
                )
                : 0;


        const nuevaCantidad =
            cantidadActual +
            cantidad;


        if (
            nuevaCantidad >
            disponible
        ) {

            alert(
                `Solo hay ${disponible} unidad(es) disponibles de ${material.nombre}.`
            );


            return;
        }


        if (
            existente
        ) {

            existente.cantidad =
                nuevaCantidad;

        } else {

            carrito.push({

                material_id:
                    Number(
                        material.material_id
                    ),

                nombre:
                    material.nombre,

                codigo:
                    material.codigo,

                imagen_url:
                    material.imagen_url,

                cantidad:
                    cantidad,

                disponible:
                    disponible
            });
        }


        renderizarCarrito();

        renderizarCatalogo();
    };


// =========================================================
// QUITAR DEL CARRITO - NUEVA RESERVA
// =========================================================

window.quitarDelCarrito =
    function (
        materialId
    ) {

        carrito =
            carrito.filter(
                item =>

                    Number(
                        item.material_id
                    ) !==
                    Number(
                        materialId
                    )
            );


        renderizarCarrito();

        renderizarCatalogo();
    };


// =========================================================
// CAMBIAR CANTIDAD DEL CARRITO - NUEVA RESERVA
// =========================================================

window.cambiarCantidadCarrito =
    function (
        materialId,
        valor
    ) {

        const item =
            carrito.find(
                material =>

                    Number(
                        material.material_id
                    ) ===
                    Number(
                        materialId
                    )
            );


        if (
            !item
        ) {

            return;
        }


        const cantidad =
            Number(
                valor
            );


        if (
            !Number.isInteger(
                cantidad
            )
            ||
            cantidad <= 0
        ) {

            renderizarCarrito();

            return;
        }


        if (
            cantidad >
            item.disponible
        ) {

            alert(
                `Solo hay ${item.disponible} unidad(es) disponibles.`
            );


            renderizarCarrito();

            return;
        }


        item.cantidad =
            cantidad;


        renderizarCarrito();

        renderizarCatalogo();
    };


// =========================================================
// RENDER CARRITO - NUEVA RESERVA
// =========================================================

function renderizarCarrito() {

    contadorCarrito.textContent =
        `${carrito.length} material(es)`;


    btnFinalizarReserva.disabled =
        carrito.length === 0;


    if (
        carrito.length === 0
    ) {

        carritoMateriales.innerHTML =
            `
                <div class="carrito-vacio">

                    <span>
                        🛒
                    </span>

                    <p>
                        Todavía no seleccionaste materiales.
                    </p>

                </div>
            `;


        return;
    }


    carritoMateriales.innerHTML =
        carrito

            .map(

                item => {

                    const imagen =
                        item.imagen_url

                            ? `
                                <img
                                    src="${escaparHTML(
                                        item.imagen_url
                                    )}"
                                    alt="${escaparHTML(
                                        item.nombre
                                    )}"
                                >
                            `

                            : `
                                <div class="carrito-icono">
                                    📦
                                </div>
                            `;


                    return `
                        <div class="carrito-item">

                            <div class="carrito-item-imagen">

                                ${imagen}

                            </div>


                            <div class="carrito-item-info">

                                <strong>

                                    ${escaparHTML(
                                        item.nombre
                                    )}

                                </strong>


                                <span>

                                    ${
                                        escaparHTML(
                                            item.codigo
                                        ) ||
                                        "Sin código"
                                    }

                                </span>

                            </div>


                            <div class="carrito-item-cantidad">

                                <label>
                                    Cantidad
                                </label>


                                <input
                                    type="number"
                                    min="1"
                                    max="${item.disponible}"
                                    value="${item.cantidad}"
                                    onchange="cambiarCantidadCarrito(${item.material_id}, this.value)"
                                >

                            </div>


                            <button
                                type="button"
                                class="btn-eliminar-carrito"
                                onclick="quitarDelCarrito(${item.material_id})"
                            >
                                Quitar
                            </button>

                        </div>
                    `;
                }
            )

            .join("");
}


// =========================================================
// FINALIZAR NUEVA RESERVA
// =========================================================

btnFinalizarReserva
    ?.addEventListener(

        "click",

        async () => {

            const fecha =
                reservaFecha.value;


            const horario =
                reservaHorario.value;


            const grupo =
                reservaGrupo.value
                    .trim();


            const tema =
                reservaTema.value
                    .trim();


            mostrarMensajeDocente(
                mensajeNuevaReserva,
                ""
            );


            // -------------------------------------------------
            // VALIDACIONES
            // -------------------------------------------------

            if (
                !fecha
            ) {

                mostrarMensajeDocente(
                    mensajeNuevaReserva,
                    "Seleccione una fecha.",
                    "error"
                );


                return;
            }


            if (
                !horario
            ) {

                mostrarMensajeDocente(
                    mensajeNuevaReserva,
                    "Seleccione un horario.",
                    "error"
                );


                return;
            }


            if (
                !grupo
            ) {

                mostrarMensajeDocente(
                    mensajeNuevaReserva,
                    "Ingrese el grupo.",
                    "error"
                );


                return;
            }


            if (
                !tema
            ) {

                mostrarMensajeDocente(
                    mensajeNuevaReserva,
                    "Ingrese el tema de la clase.",
                    "error"
                );


                return;
            }


            if (
                carrito.length === 0
            ) {

                mostrarMensajeDocente(
                    mensajeNuevaReserva,
                    "Seleccione al menos un material.",
                    "error"
                );


                return;
            }


            const confirmar =
                confirm(
                    "¿Finalizar y registrar esta reserva?"
                );


            if (
                !confirmar
            ) {

                return;
            }


            btnFinalizarReserva.disabled =
                true;


            btnFinalizarReserva.textContent =
                "Registrando...";


            try {

                const materiales =
                    carrito.map(
                        item => ({

                            material_id:
                                Number(
                                    item.material_id
                                ),

                            cantidad:
                                Number(
                                    item.cantidad
                                )
                        })
                    );


                const {
                    data,
                    error
                } =
                    await supabaseClient.rpc(

                        "crear_reserva_material",

                        {
                            p_grupo:
                                grupo,

                            p_fecha:
                                fecha,

                            p_horario:
                                horario,

                            p_tema:
                                tema,

                            p_materiales:
                                materiales
                        }
                    );


                if (
                    error
                ) {

                    throw error;
                }


                mostrarMensajeDocente(

                    mensajeNuevaReserva,

                    `Reserva #${data} registrada correctamente.`,

                    "ok"
                );


                carrito =
                    [];


                renderizarCarrito();


                reservaGrupo.value =
                    "";


                reservaTema.value =
                    "";


                await consultarDisponibilidad();


                lunesSemanaActual =
                    obtenerLunes(
                        new Date(
                            `${fecha}T12:00:00`
                        )
                    );


                await cargarReservasSemana();


                setTimeout(
                    () => {

                        mostrarPanelDocente(
                            "panelReservasDocente"
                        );

                    },
                    900
                );


            } catch (error) {

                console.error(
                    "Error creando reserva:",
                    error
                );


                let mensaje =
                    error.message ||
                    "No se pudo registrar la reserva.";


                /*
                 * La base de datos mantiene la regla
                 * de una reserva por docente,
                 * fecha y horario.
                 */

                if (
                    error.code === "23505"
                ) {

                    mensaje =
                        "Ya tienes una reserva registrada para esa fecha y horario.";
                }


                mostrarMensajeDocente(
                    mensajeNuevaReserva,
                    mensaje,
                    "error"
                );


                await consultarDisponibilidad();


            } finally {

                btnFinalizarReserva.disabled =
                    carrito.length === 0;


                btnFinalizarReserva.textContent =
                    "Finalizar reserva";
            }
        }
    );
// =========================================================
// CARGAR RESERVAS DE LA SEMANA
// =========================================================

async function cargarReservasSemana() {

    const viernes =
        sumarDias(
            lunesSemanaActual,
            4
        );


    const inicio =
        fechaISO(
            lunesSemanaActual
        );


    const fin =
        fechaISO(
            viernes
        );


    textoSemana.textContent =
        `${formatoFechaCompleta(
            lunesSemanaActual
        )} al ${formatoFechaCompleta(
            viernes
        )}`;


    actualizarCabecerasSemana();


    cuerpoTablaReservas.innerHTML =
        `
            <tr>
                <td colspan="6">
                    Cargando reservas...
                </td>
            </tr>
        `;


    // =====================================================
    // RESERVAS
    // =====================================================

    const {
        data: reservas,
        error
    } =
        await supabaseClient

            .from(
                "reservas_material"
            )

            .select(`
                id,
                usuario_id,
                grupo,
                fecha,
                horario,
                tema,
                estado
            `)

            .gte(
                "fecha",
                inicio
            )

            .lte(
                "fecha",
                fin
            )

            .neq(
                "estado",
                "cancelada"
            )

            .order(
                "fecha",
                {
                    ascending: true
                }
            );


    if (
        error
    ) {

        console.error(
            "Error cargando reservas:",
            error
        );


        cuerpoTablaReservas.innerHTML =
            `
                <tr>
                    <td colspan="6">
                        No se pudieron cargar las reservas.
                    </td>
                </tr>
            `;


        return;
    }


    reservasSemanaDocente =
        reservas || [];


    // =====================================================
    // DETALLES
    // =====================================================

    const reservaIds =
        reservasSemanaDocente
            .map(
                reserva =>
                    reserva.id
            );


    let detalles =
        [];


    if (
        reservaIds.length
    ) {

        const {
            data,
            error: errorDetalles
        } =
            await supabaseClient

                .from(
                    "reserva_material_detalle"
                )

                .select(`
                    id,
                    reserva_id,
                    material_id,
                    cantidad,
                    cantidad_devuelta,
                    observacion,
                    entregado,
                    observacion_entrega
                `)

                .in(
                    "reserva_id",
                    reservaIds
                );


        if (
            errorDetalles
        ) {

            console.error(
                "Error cargando detalles:",
                errorDetalles
            );

        } else {

            detalles =
                data || [];
        }
    }


    detallesSemanaDocente =
        detalles;


    // =====================================================
    // MATERIALES
    // =====================================================

    const materialIds =
        [
            ...new Set(

                detallesSemanaDocente.map(
                    detalle =>
                        Number(
                            detalle.material_id
                        )
                )
            )
        ];


    let materiales =
        [];


    if (
        materialIds.length
    ) {

        const {
            data,
            error: errorMateriales
        } =
            await supabaseClient

                .from(
                    "materiales_gabinete"
                )

                .select(`
                    id,
                    codigo,
                    nombre,
                    descripcion,
                    imagen_url,
                    cantidad_total,
                    activo,
                    eliminado
                `)

                .in(
                    "id",
                    materialIds
                );


        if (
            errorMateriales
        ) {

            console.error(
                "Error cargando materiales:",
                errorMateriales
            );

        } else {

            materiales =
                data || [];
        }
    }


    materialesSemanaDocente =
        materiales;


    // =====================================================
    // PERFILES
    // =====================================================

    const usuarioIds =
        [
            ...new Set(

                reservasSemanaDocente.map(
                    reserva =>
                        reserva.usuario_id
                )
            )
        ];


    let perfiles =
        [];


    if (
        usuarioIds.length
    ) {

        const {
            data,
            error: errorPerfiles
        } =
            await supabaseClient

                .from(
                    "perfiles"
                )

                .select(`
                    id,
                    nombre,
                    usuario
                `)

                .in(
                    "id",
                    usuarioIds
                );


        if (
            errorPerfiles
        ) {

            console.error(
                "Error cargando perfiles:",
                errorPerfiles
            );

        } else {

            perfiles =
                data || [];
        }
    }


    perfilesSemanaDocente =
        perfiles;


    // =====================================================
    // RENDER
    // =====================================================

    renderizarTablaSemana(
        reservasSemanaDocente,
        detallesSemanaDocente,
        materialesSemanaDocente,
        perfilesSemanaDocente
    );
}


// =========================================================
// ACTUALIZAR CABECERAS DE SEMANA
// =========================================================

function actualizarCabecerasSemana() {

    const cabeceras = [

        [
            "cabLunes",
            "Lunes",
            0
        ],

        [
            "cabMartes",
            "Martes",
            1
        ],

        [
            "cabMiercoles",
            "Miércoles",
            2
        ],

        [
            "cabJueves",
            "Jueves",
            3
        ],

        [
            "cabViernes",
            "Viernes",
            4
        ]
    ];


    cabeceras.forEach(

        item => {

            const fecha =
                sumarDias(
                    lunesSemanaActual,
                    item[2]
                );


            const elemento =
                document.getElementById(
                    item[0]
                );


            if (
                elemento
            ) {

                elemento.innerHTML =
                    `
                        ${item[1]}

                        <small>
                            ${formatoFechaCorta(
                                fecha
                            )}
                        </small>
                    `;
            }
        }
    );
}


// =========================================================
// OBTENER DETALLES DE UNA RESERVA
// =========================================================

function obtenerDetallesReservaDocente(
    reservaId
) {

    return detallesSemanaDocente.filter(
        detalle =>

            Number(
                detalle.reserva_id
            ) ===
            Number(
                reservaId
            )
    );
}


// =========================================================
// OBTENER MATERIAL CARGADO
// =========================================================

function obtenerMaterialSemanaDocente(
    materialId
) {

    return materialesSemanaDocente.find(
        material =>

            Number(
                material.id
            ) ===
            Number(
                materialId
            )
    );
}


// =========================================================
// NOMBRE DE MATERIAL
// =========================================================

function nombreMaterialSemanaDocente(
    materialId
) {

    const material =
        obtenerMaterialSemanaDocente(
            materialId
        );


    return material?.nombre ||
        "Material";
}


// =========================================================
// ESTADO VISIBLE DE RESERVA
// =========================================================

function textoEstadoReservaDocente(
    estado
) {

    switch (
        estado
    ) {

        case "reservada":

            return "RESERVADA";


        case "entregada":

            return "ENTREGADA";


        case "parcial":

            return "DEVOLUCIÓN PARCIAL";


        case "completada":

            return "COMPLETADA";


        case "cancelada":

            return "CANCELADA";


        default:

            return String(
                estado || ""
            )
                .toUpperCase();
    }
}


// =========================================================
// HTML DE MATERIALES DE LA RESERVA
// =========================================================

function htmlMaterialesReservaDocente(
    reserva
) {

    const detalles =
        obtenerDetallesReservaDocente(
            reserva.id
        );


    if (
        detalles.length === 0
    ) {

        return `
            <li>
                Sin materiales
            </li>
        `;
    }


    return detalles

        .map(

            detalle => {

                const nombre =
                    nombreMaterialSemanaDocente(
                        detalle.material_id
                    );


                let indicador =
                    "";


                /*
                 * Cuando la reserva ya salió del estado
                 * "reservada", mostramos qué ocurrió
                 * físicamente con cada material.
                 */

                if (
                    reserva.estado !==
                    "reservada"
                ) {

                    if (
                        detalle.entregado === true
                    ) {

                        const cantidad =
                            Number(
                                detalle.cantidad || 0
                            );


                        const devuelta =
                            Number(
                                detalle.cantidad_devuelta || 0
                            );


                        if (
                            cantidad > 0 &&
                            devuelta >= cantidad
                        ) {

                            indicador =
                                `
                                    <span
                                        title="Material devuelto"
                                    >
                                        ✓
                                    </span>
                                `;

                        } else {

                            indicador =
                                `
                                    <span
                                        title="Material entregado"
                                    >
                                        ✓
                                    </span>
                                `;
                        }

                    } else {

                        indicador =
                            `
                                <span
                                    title="Material no entregado"
                                >
                                    —
                                </span>
                            `;
                    }
                }


                return `
                    <li>

                        ${indicador}

                        <strong>
                            ${detalle.cantidad} ×
                        </strong>

                        ${escaparHTML(
                            nombre
                        )}

                    </li>
                `;
            }
        )

        .join("");
}


// =========================================================
// HTML DE ACCIONES DE UNA RESERVA PROPIA
// =========================================================

function htmlAccionesReservaDocente(
    reserva
) {

    const propia =
        reserva.usuario_id ===
        perfilDocente?.id;


    if (
        !propia
    ) {

        return "";
    }


    /*
     * Solamente una reserva futura, propia y todavía
     * "reservada" puede editarse o cancelarse.
     */

    if (
        reservaPuedeModificarDocente(
            reserva
        )
    ) {

        return `
            <div class="acciones-reserva-docente">

                <button
                    type="button"
                    class="btn-editar-reserva-docente"
                    onclick="abrirEditarReservaDocente(${reserva.id})"
                >
                    ✏ Editar
                </button>


                <button
                    type="button"
                    class="btn-cancelar-reserva-docente"
                    onclick="cancelarReservaDocente(${reserva.id})"
                >
                    Cancelar reserva
                </button>

            </div>
        `;
    }


    /*
     * La reserva pertenece al docente, pero ya no puede
     * modificarse.
     */

    let motivo =
        "Esta reserva ya no puede modificarse.";


    const hoy =
        obtenerFechaHoyDocente();


    if (
        reserva.estado ===
        "reservada"
    ) {

        if (
            reserva.fecha === hoy
        ) {

            motivo =
                "Hoy ya no se puede editar ni cancelar.";

        } else if (
            reserva.fecha < hoy
        ) {

            motivo =
                "La fecha de esta reserva ya pasó.";
        }

    } else if (
        reserva.estado ===
        "entregada"
    ) {

        motivo =
            "El material ya fue entregado.";

    } else if (
        reserva.estado ===
        "parcial"
    ) {

        motivo =
            "La devolución está en proceso.";

    } else if (
        reserva.estado ===
        "completada"
    ) {

        motivo =
            "La reserva ya fue completada.";
    }


    return `
        <div class="acciones-reserva-docente">

            <span class="reserva-no-modificable">
                ${escaparHTML(
                    motivo
                )}
            </span>

        </div>
    `;
}


// =========================================================
// RENDERIZAR TABLA SEMANAL
// =========================================================

function renderizarTablaSemana(
    reservas,
    detalles,
    materiales,
    perfiles
) {

    const mapaPerfiles =
        new Map(

            perfiles.map(
                perfil => [

                    perfil.id,

                    perfil.nombre ||
                    perfil.usuario
                ]
            )
        );


    const diasSemana =
        Array.from(

            {
                length: 5
            },

            (
                _,
                indice
            ) =>

                fechaISO(
                    sumarDias(
                        lunesSemanaActual,
                        indice
                    )
                )
        );


    cuerpoTablaReservas.innerHTML =
        HORARIOS

            .map(

                horario => {

                    const celdas =
                        diasSemana

                            .map(

                                fecha => {

                                    const reservasCelda =
                                        reservas.filter(
                                            reserva =>

                                                reserva.fecha ===
                                                fecha

                                                &&

                                                reserva.horario ===
                                                horario
                                        );


                                    if (
                                        reservasCelda.length === 0
                                    ) {

                                        return `
                                            <td class="celda-vacia">
                                                —
                                            </td>
                                        `;
                                    }


                                    const contenido =
                                        reservasCelda

                                            .map(

                                                reserva => {

                                                    const nombre =
                                                        mapaPerfiles.get(
                                                            reserva.usuario_id
                                                        )
                                                        ||
                                                        "Docente";


                                                    const propia =
                                                        reserva.usuario_id ===
                                                        perfilDocente?.id;


                                                    const materialesTexto =
                                                        htmlMaterialesReservaDocente(
                                                            reserva
                                                        );


                                                    const acciones =
                                                        htmlAccionesReservaDocente(
                                                            reserva
                                                        );


                                                    const estado =
                                                        textoEstadoReservaDocente(
                                                            reserva.estado
                                                        );


                                                    return `
                                                        <div class="reserva-semanal-card">

                                                            <span class="reserva-docente-nombre">

                                                                ${escaparHTML(
                                                                    nombre
                                                                )}

                                                            </span>


                                                            ${
                                                                propia

                                                                    ? `
                                                                        <span class="reserva-propia">
                                                                            Mi reserva
                                                                        </span>
                                                                    `

                                                                    : ""
                                                            }


                                                            <p>

                                                                <strong>
                                                                    Grupo:
                                                                </strong>

                                                                ${escaparHTML(
                                                                    reserva.grupo
                                                                )}

                                                            </p>


                                                            <p>

                                                                <strong>
                                                                    Tema:
                                                                </strong>

                                                                ${escaparHTML(
                                                                    reserva.tema
                                                                )}

                                                            </p>


                                                            <p>

                                                                <strong>
                                                                    Estado:
                                                                </strong>

                                                                ${escaparHTML(
                                                                    estado
                                                                )}

                                                            </p>


                                                            <ul>

                                                                ${materialesTexto}

                                                            </ul>


                                                            ${acciones}

                                                        </div>
                                                    `;
                                                }
                                            )

                                            .join("");


                                    return `
                                        <td>
                                            ${contenido}
                                        </td>
                                    `;
                                }
                            )

                            .join("");


                    return `
                        <tr>

                            <th class="horario-columna">

                                ${horario.replace(
                                    "-",
                                    " - "
                                )}

                            </th>


                            ${celdas}

                        </tr>
                    `;
                }
            )

            .join("");
}


// =========================================================
// CAMBIAR SEMANA
// =========================================================

btnSemanaAnterior
    ?.addEventListener(

        "click",

        async () => {

            lunesSemanaActual =
                sumarDias(
                    lunesSemanaActual,
                    -7
                );


            await cargarReservasSemana();
        }
    );


btnSemanaSiguiente
    ?.addEventListener(

        "click",

        async () => {

            lunesSemanaActual =
                sumarDias(
                    lunesSemanaActual,
                    7
                );


            await cargarReservasSemana();
        }
    );


// =========================================================
// CANCELAR RESERVA DEL DOCENTE
// =========================================================

window.cancelarReservaDocente =
    async function (
        reservaId
    ) {

        const reserva =
            reservasSemanaDocente.find(
                item =>

                    Number(
                        item.id
                    ) ===
                    Number(
                        reservaId
                    )
            );


        if (
            !reserva
        ) {

            mostrarMensajeDocente(

                mensajeReservasDocente,

                "No se encontró la reserva.",

                "error"
            );


            return;
        }


        /*
         * Validación frontend.
         *
         * La RPC también debe validar esto en Supabase.
         */

        if (
            !reservaPuedeModificarDocente(
                reserva
            )
        ) {

            mostrarMensajeDocente(

                mensajeReservasDocente,

                "Esta reserva ya no puede cancelarse. Solo puedes cancelar tus reservas futuras que todavía estén reservadas.",

                "error"
            );


            return;
        }


        const confirmar =
            confirm(
                "¿Deseas cancelar esta reserva?\n\nLos materiales volverán a estar disponibles para ese horario."
            );


        if (
            !confirmar
        ) {

            return;
        }


        mostrarMensajeDocente(

            mensajeReservasDocente,

            "Cancelando reserva..."
        );


        try {

            const {
                error
            } =
                await supabaseClient.rpc(

                    "cancelar_reserva_material",

                    {
                        p_reserva_id:
                            Number(
                                reservaId
                            )
                    }
                );


            if (
                error
            ) {

                throw error;
            }


            mostrarMensajeDocente(

                mensajeReservasDocente,

                "Reserva cancelada correctamente.",

                "ok"
            );


            await cargarReservasSemana();


            if (
                reservaFecha.value &&
                reservaHorario.value
            ) {

                await consultarDisponibilidad();
            }


        } catch (error) {

            console.error(
                "Error cancelando reserva:",
                error
            );


            mostrarMensajeDocente(

                mensajeReservasDocente,

                error.message ||
                "No se pudo cancelar la reserva.",

                "error"
            );
        }
    };
// =========================================================
// ABRIR EDICIÓN DE RESERVA
// =========================================================

window.abrirEditarReservaDocente =
    async function (
        reservaId
    ) {

        const reserva =
            reservasSemanaDocente.find(
                item =>

                    Number(
                        item.id
                    ) ===
                    Number(
                        reservaId
                    )
            );


        if (
            !reserva
        ) {

            mostrarMensajeDocente(

                mensajeReservasDocente,

                "No se encontró la reserva.",

                "error"
            );


            return;
        }


        // -------------------------------------------------
        // VALIDAR QUE PUEDA EDITARSE
        // -------------------------------------------------

        if (
            !reservaPuedeModificarDocente(
                reserva
            )
        ) {

            mostrarMensajeDocente(

                mensajeReservasDocente,

                "Esta reserva ya no puede editarse.",

                "error"
            );


            return;
        }


        // -------------------------------------------------
        // GUARDAR RESERVA ORIGINAL
        // -------------------------------------------------

        reservaEdicionDocente =
            {
                ...reserva
            };


        editarReservaDocenteId.value =
            reserva.id;


        editarReservaDocenteFecha.value =
            reserva.fecha;


        editarReservaDocenteHorario.value =
            reserva.horario;


        editarReservaDocenteGrupo.value =
            reserva.grupo || "";


        editarReservaDocenteTema.value =
            reserva.tema || "";


        // -------------------------------------------------
        // FECHA MÍNIMA:
        // SOLO SE PERMITEN FECHAS POSTERIORES A HOY
        // -------------------------------------------------

        const manana =
            sumarDias(
                new Date(),
                1
            );


        editarReservaDocenteFecha.min =
            fechaISO(
                manana
            );


        // -------------------------------------------------
        // LIMPIAR FILTROS
        // -------------------------------------------------

        if (
            editarFiltroCategoriaDocente
        ) {

            editarFiltroCategoriaDocente.value =
                "";
        }


        if (
            editarBuscarMaterialDocente
        ) {

            editarBuscarMaterialDocente.value =
                "";
        }


        mostrarMensajeDocente(
            mensajeEditarReservaDocente,
            ""
        );


        // -------------------------------------------------
        // OBTENER DETALLES ORIGINALES
        // -------------------------------------------------

        const detalles =
            obtenerDetallesReservaDocente(
                reserva.id
            );


        cantidadesOriginalesEdicionDocente =
            new Map();


        detalles.forEach(

            detalle => {

                cantidadesOriginalesEdicionDocente.set(

                    Number(
                        detalle.material_id
                    ),

                    Number(
                        detalle.cantidad
                    )
                );
            }
        );


        // -------------------------------------------------
        // CONSTRUIR CARRITO ORIGINAL
        // -------------------------------------------------

        carritoEdicionDocente =
            detalles.map(

                detalle => {

                    const material =
                        obtenerMaterialSemanaDocente(
                            detalle.material_id
                        );


                    return {

                        material_id:
                            Number(
                                detalle.material_id
                            ),

                        nombre:
                            material?.nombre ||
                            "Material",

                        codigo:
                            material?.codigo ||
                            "",

                        imagen_url:
                            material?.imagen_url ||
                            null,

                        cantidad:
                            Number(
                                detalle.cantidad
                            ),

                        disponible:
                            Number(
                                detalle.cantidad
                            )
                    };
                }
            );


        // -------------------------------------------------
        // MOSTRAR PANEL
        // -------------------------------------------------

        mostrarPanelDocente(
            "panelEditarReservaDocente"
        );


        renderizarCarritoEdicionDocente();


        editarMensajeDisponibilidadDocente.textContent =
            "Consultando disponibilidad...";


        // -------------------------------------------------
        // CONSULTAR DISPONIBILIDAD
        // -------------------------------------------------

        await consultarDisponibilidadEdicionDocente();


        panelEditarReservaDocente
            ?.scrollIntoView(
                {
                    behavior: "smooth",
                    block: "start"
                }
            );
    };


// =========================================================
// COMPROBAR SI LA EDICIÓN ESTÁ EN EL TURNO ORIGINAL
// =========================================================

function edicionMantieneTurnoOriginalDocente() {

    if (
        !reservaEdicionDocente
    ) {

        return false;
    }


    return (

        editarReservaDocenteFecha.value ===
        reservaEdicionDocente.fecha

        &&

        editarReservaDocenteHorario.value ===
        reservaEdicionDocente.horario
    );
}


// =========================================================
// CONSULTAR DISPONIBILIDAD PARA EDICIÓN
// =========================================================

async function consultarDisponibilidadEdicionDocente() {

    if (
        !reservaEdicionDocente
    ) {

        return;
    }


    const fecha =
        editarReservaDocenteFecha.value;


    const horario =
        editarReservaDocenteHorario.value;


    if (
        !fecha ||
        !horario
    ) {

        disponibilidadEdicionDocente =
            [];


        editarCatalogoMaterialesDocente.innerHTML =
            "";


        editarMensajeDisponibilidadDocente.textContent =
            "Selecciona una fecha y un horario.";


        return;
    }


    // -------------------------------------------------
    // IMPEDIR HOY O FECHAS PASADAS
    // -------------------------------------------------

    const hoy =
        obtenerFechaHoyDocente();


    if (
        fecha <= hoy
    ) {

        disponibilidadEdicionDocente =
            [];


        editarCatalogoMaterialesDocente.innerHTML =
            "";


        editarMensajeDisponibilidadDocente.textContent =
            "La nueva fecha de la reserva debe ser posterior a hoy.";


        return;
    }


    editarMensajeDisponibilidadDocente.textContent =
        "Consultando disponibilidad...";


    try {

        const {
            data,
            error
        } =
            await supabaseClient.rpc(

                "obtener_disponibilidad_material",

                {
                    p_fecha:
                        fecha,

                    p_horario:
                        horario
                }
            );


        if (
            error
        ) {

            throw error;
        }


        const mismaFechaHorario =
            edicionMantieneTurnoOriginalDocente();


        /*
         * IMPORTANTE:
         *
         * obtener_disponibilidad_material cuenta la propia
         * reserva como ocupada.
         *
         * Solamente cuando seguimos en el MISMO día y horario
         * devolvemos virtualmente las cantidades originales.
         *
         * Si el docente cambia de fecha u horario, NO se suma
         * absolutamente nada.
         */

        disponibilidadEdicionDocente =
            (data || [])
                .map(

                    material => {

                        const materialId =
                            Number(
                                material.material_id
                            );


                        const cantidadRPC =
                            Number(
                                material.cantidad_disponible || 0
                            );


                        const cantidadPropiaOriginal =
                            mismaFechaHorario

                                ? Number(
                                    cantidadesOriginalesEdicionDocente.get(
                                        materialId
                                    ) || 0
                                )

                                : 0;


                        return {

                            ...material,

                            cantidad_disponible:
                                cantidadRPC +
                                cantidadPropiaOriginal
                        };
                    }
                );


        // -------------------------------------------------
        // ACTUALIZAR MÁXIMOS DEL CARRITO
        // -------------------------------------------------

        carritoEdicionDocente.forEach(

            item => {

                const material =
                    disponibilidadEdicionDocente.find(
                        disponible =>

                            Number(
                                disponible.material_id
                            ) ===
                            Number(
                                item.material_id
                            )
                    );


                item.disponible =
                    material

                        ? Number(
                            material.cantidad_disponible || 0
                        )

                        : 0;
            }
        );


        editarMensajeDisponibilidadDocente.textContent =
            `${disponibilidadEdicionDocente.length} material(es) disponibles para consultar.`;


        renderizarCatalogoEdicionDocente();

        renderizarCarritoEdicionDocente();


    } catch (error) {

        console.error(
            "Error consultando disponibilidad de edición:",
            error
        );


        disponibilidadEdicionDocente =
            [];


        editarCatalogoMaterialesDocente.innerHTML =
            "";


        editarMensajeDisponibilidadDocente.textContent =
            "No se pudo consultar la disponibilidad.";
    }
}


// =========================================================
// FILTRAR CATÁLOGO DE EDICIÓN
// =========================================================

function materialesFiltradosEdicionDocente() {

    const categoriaId =
        editarFiltroCategoriaDocente.value

            ? Number(
                editarFiltroCategoriaDocente.value
            )

            : null;


    const texto =
        editarBuscarMaterialDocente.value
            .trim()
            .toLowerCase();


    return disponibilidadEdicionDocente.filter(

        material => {

            const categorias =
                categoriasDelMaterial(
                    material.material_id
                );


            // -------------------------------------------------
            // CATEGORÍA
            // -------------------------------------------------

            if (
                categoriaId !== null
            ) {

                const pertenece =
                    relacionesCategorias
                        .some(
                            relacion =>

                                Number(
                                    relacion.material_id
                                ) ===
                                Number(
                                    material.material_id
                                )

                                &&

                                Number(
                                    relacion.categoria_id
                                ) ===
                                categoriaId
                        );


                if (
                    !pertenece
                ) {

                    return false;
                }
            }


            // -------------------------------------------------
            // TEXTO
            // -------------------------------------------------

            if (
                texto
            ) {

                const cadena =
                    `
                        ${material.codigo || ""}
                        ${material.nombre || ""}
                        ${material.descripcion || ""}
                        ${categorias.join(" ")}
                    `
                        .toLowerCase();


                if (
                    !cadena.includes(
                        texto
                    )
                ) {

                    return false;
                }
            }


            return true;
        }
    );
}


// =========================================================
// RENDERIZAR CATÁLOGO DE EDICIÓN
// =========================================================

function renderizarCatalogoEdicionDocente() {

    const materiales =
        materialesFiltradosEdicionDocente();


    if (
        materiales.length === 0
    ) {

        editarCatalogoMaterialesDocente.innerHTML =
            `
                <div class="catalogo-vacio">

                    <span>
                        🔎
                    </span>

                    <p>
                        No se encontraron materiales.
                    </p>

                </div>
            `;


        return;
    }


    editarCatalogoMaterialesDocente.innerHTML =
        materiales

            .map(

                material => {

                    const disponibles =
                        Math.max(
                            0,
                            Number(
                                material.cantidad_disponible || 0
                            )
                        );


                    const categorias =
                        categoriasDelMaterial(
                            material.material_id
                        );


                    const itemCarrito =
                        carritoEdicionDocente.find(
                            item =>

                                Number(
                                    item.material_id
                                ) ===
                                Number(
                                    material.material_id
                                )
                        );


                    const yaSeleccionado =
                        itemCarrito

                            ? Number(
                                itemCarrito.cantidad
                            )

                            : 0;


                    const imagen =
                        material.imagen_url

                            ? `
                                <img
                                    src="${escaparHTML(
                                        material.imagen_url
                                    )}"
                                    alt="${escaparHTML(
                                        material.nombre
                                    )}"
                                >
                            `

                            : `
                                <div class="docente-material-sin-imagen">
                                    📦
                                </div>
                            `;


                    return `
                        <article class="docente-material-card">

                            <div class="docente-material-imagen">

                                ${imagen}

                            </div>


                            <div class="docente-material-info">

                                <span class="material-codigo">

                                    ${
                                        escaparHTML(
                                            material.codigo
                                        ) ||
                                        "Sin código"
                                    }

                                </span>


                                <h3>

                                    ${escaparHTML(
                                        material.nombre
                                    )}

                                </h3>


                                ${
                                    material.descripcion

                                        ? `
                                            <p>
                                                ${escaparHTML(
                                                    material.descripcion
                                                )}
                                            </p>
                                        `

                                        : ""
                                }


                                <div class="material-categorias">

                                    ${
                                        categorias

                                            .map(
                                                categoria =>
                                                    `
                                                        <span>
                                                            ${escaparHTML(
                                                                categoria
                                                            )}
                                                        </span>
                                                    `
                                            )

                                            .join("")
                                    }

                                </div>


                                <div class="disponibilidad-box">

                                    <span>
                                        Disponibles
                                    </span>

                                    <strong>
                                        ${disponibles}
                                    </strong>

                                </div>


                                ${
                                    yaSeleccionado > 0

                                        ? `
                                            <div class="ya-seleccionado">
                                                En reserva:
                                                ${yaSeleccionado}
                                            </div>
                                        `

                                        : ""
                                }


                                <div class="selector-cantidad">

                                    <input
                                        type="number"
                                        id="editarCantidad_${material.material_id}"
                                        min="1"
                                        max="${disponibles}"
                                        value="1"
                                        ${
                                            disponibles <= 0
                                                ? "disabled"
                                                : ""
                                        }
                                    >


                                    <button
                                        type="button"
                                        onclick="agregarAlCarritoEdicionDocente(${material.material_id})"
                                        ${
                                            disponibles <= 0
                                                ? "disabled"
                                                : ""
                                        }
                                    >
                                        + Añadir
                                    </button>

                                </div>

                            </div>

                        </article>
                    `;
                }
            )

            .join("");
}


// =========================================================
// EVENTO CAMBIO DE FECHA DE EDICIÓN
// =========================================================

editarReservaDocenteFecha
    ?.addEventListener(

        "change",

        async () => {

            /*
             * No eliminamos el carrito.
             *
             * Recalculamos la disponibilidad porque el docente
             * puede querer mover exactamente los mismos
             * materiales a otra fecha.
             */

            await consultarDisponibilidadEdicionDocente();
        }
    );


// =========================================================
// EVENTO CAMBIO DE HORARIO DE EDICIÓN
// =========================================================

editarReservaDocenteHorario
    ?.addEventListener(

        "change",

        async () => {

            await consultarDisponibilidadEdicionDocente();
        }
    );


// =========================================================
// FILTRO DE CATEGORÍA EN EDICIÓN
// =========================================================

editarFiltroCategoriaDocente
    ?.addEventListener(

        "change",

        () => {

            renderizarCatalogoEdicionDocente();
        }
    );


// =========================================================
// BUSCADOR EN EDICIÓN
// =========================================================

editarBuscarMaterialDocente
    ?.addEventListener(

        "input",

        () => {

            renderizarCatalogoEdicionDocente();
        }
    );
// =========================================================
// AGREGAR MATERIAL AL CARRITO DE EDICIÓN
// =========================================================

window.agregarAlCarritoEdicionDocente =
    function (
        materialId
    ) {

        if (
            !reservaEdicionDocente
        ) {

            return;
        }


        const material =
            disponibilidadEdicionDocente.find(
                item =>

                    Number(
                        item.material_id
                    ) ===
                    Number(
                        materialId
                    )
            );


        if (
            !material
        ) {

            alert(
                "No se encontró el material."
            );

            return;
        }


        const input =
            document.getElementById(
                `editarCantidad_${materialId}`
            );


        const cantidad =
            Number(
                input?.value
            );


        const disponible =
            Number(
                material.cantidad_disponible || 0
            );


        // -------------------------------------------------
        // VALIDAR CANTIDAD
        // -------------------------------------------------

        if (
            !Number.isInteger(
                cantidad
            )
            ||
            cantidad <= 0
        ) {

            alert(
                "Ingrese una cantidad válida."
            );

            return;
        }


        // -------------------------------------------------
        // BUSCAR SI YA ESTÁ EN EL CARRITO
        // -------------------------------------------------

        const existente =
            carritoEdicionDocente.find(
                item =>

                    Number(
                        item.material_id
                    ) ===
                    Number(
                        materialId
                    )
            );


        const cantidadActual =
            existente

                ? Number(
                    existente.cantidad
                )

                : 0;


        const nuevaCantidad =
            cantidadActual +
            cantidad;


        // -------------------------------------------------
        // CONTROL DE DISPONIBILIDAD
        // -------------------------------------------------

        if (
            nuevaCantidad >
            disponible
        ) {

            alert(
                `Solo puedes reservar hasta ${disponible} unidad(es) de ${material.nombre}.`
            );

            return;
        }


        // -------------------------------------------------
        // ACTUALIZAR O AGREGAR
        // -------------------------------------------------

        if (
            existente
        ) {

            existente.cantidad =
                nuevaCantidad;


            existente.disponible =
                disponible;

        } else {

            carritoEdicionDocente.push({

                material_id:
                    Number(
                        material.material_id
                    ),

                nombre:
                    material.nombre,

                codigo:
                    material.codigo,

                imagen_url:
                    material.imagen_url,

                cantidad:
                    cantidad,

                disponible:
                    disponible
            });
        }


        renderizarCarritoEdicionDocente();

        renderizarCatalogoEdicionDocente();
    };


// =========================================================
// QUITAR MATERIAL DEL CARRITO DE EDICIÓN
// =========================================================

window.quitarDelCarritoEdicionDocente =
    function (
        materialId
    ) {

        carritoEdicionDocente =
            carritoEdicionDocente.filter(
                item =>

                    Number(
                        item.material_id
                    ) !==
                    Number(
                        materialId
                    )
            );


        renderizarCarritoEdicionDocente();

        renderizarCatalogoEdicionDocente();
    };


// =========================================================
// CAMBIAR CANTIDAD EN EL CARRITO DE EDICIÓN
// =========================================================

window.cambiarCantidadCarritoEdicionDocente =
    function (
        materialId,
        valor
    ) {

        const item =
            carritoEdicionDocente.find(
                material =>

                    Number(
                        material.material_id
                    ) ===
                    Number(
                        materialId
                    )
            );


        if (
            !item
        ) {

            return;
        }


        const cantidad =
            Number(
                valor
            );


        // -------------------------------------------------
        // VALIDAR ENTERO MAYOR A CERO
        // -------------------------------------------------

        if (
            !Number.isInteger(
                cantidad
            )
            ||
            cantidad <= 0
        ) {

            alert(
                "La cantidad debe ser un número entero mayor a cero."
            );


            renderizarCarritoEdicionDocente();

            return;
        }


        // -------------------------------------------------
        // OBTENER DISPONIBILIDAD ACTUAL
        // -------------------------------------------------

        const materialDisponible =
            disponibilidadEdicionDocente.find(
                material =>

                    Number(
                        material.material_id
                    ) ===
                    Number(
                        materialId
                    )
            );


        const disponible =
            materialDisponible

                ? Number(
                    materialDisponible.cantidad_disponible || 0
                )

                : Number(
                    item.disponible || 0
                );


        // -------------------------------------------------
        // NO SUPERAR DISPONIBILIDAD
        // -------------------------------------------------

        if (
            cantidad >
            disponible
        ) {

            alert(
                `Solo puedes reservar hasta ${disponible} unidad(es) de este material.`
            );


            renderizarCarritoEdicionDocente();

            return;
        }


        item.cantidad =
            cantidad;


        item.disponible =
            disponible;


        renderizarCarritoEdicionDocente();

        renderizarCatalogoEdicionDocente();
    };


// =========================================================
// RENDERIZAR CARRITO DE EDICIÓN
// =========================================================

function renderizarCarritoEdicionDocente() {

    if (
        !editarCarritoMaterialesDocente
    ) {

        return;
    }


    // -------------------------------------------------
    // CARRITO VACÍO
    // -------------------------------------------------

    if (
        carritoEdicionDocente.length === 0
    ) {

        editarCarritoMaterialesDocente.innerHTML =
            `
                <div class="carrito-vacio">

                    <span>
                        🛒
                    </span>

                    <p>
                        La reserva debe tener al menos un material.
                    </p>

                </div>
            `;


        if (
            btnGuardarEdicionDocente
        ) {

            btnGuardarEdicionDocente.disabled =
                true;
        }


        return;
    }


    if (
        btnGuardarEdicionDocente
    ) {

        btnGuardarEdicionDocente.disabled =
            false;
    }


    // -------------------------------------------------
    // GENERAR MATERIALES
    // -------------------------------------------------

    editarCarritoMaterialesDocente.innerHTML =
        carritoEdicionDocente

            .map(

                item => {

                    const disponible =
                        Number(
                            item.disponible || 0
                        );


                    const cantidad =
                        Number(
                            item.cantidad || 0
                        );


                    const excedido =
                        cantidad >
                        disponible;


                    const imagen =
                        item.imagen_url

                            ? `
                                <img
                                    src="${escaparHTML(
                                        item.imagen_url
                                    )}"
                                    alt="${escaparHTML(
                                        item.nombre
                                    )}"
                                >
                            `

                            : `
                                <div class="carrito-icono">
                                    📦
                                </div>
                            `;


                    return `
                        <div class="carrito-item">

                            <div class="carrito-item-imagen">

                                ${imagen}

                            </div>


                            <div class="carrito-item-info">

                                <strong>

                                    ${escaparHTML(
                                        item.nombre
                                    )}

                                </strong>


                                <span>

                                    ${
                                        escaparHTML(
                                            item.codigo
                                        ) ||
                                        "Sin código"
                                    }

                                </span>


                                <small>

                                    Máximo disponible:
                                    ${disponible}

                                </small>


                                ${
                                    excedido

                                        ? `
                                            <small
                                                class="mensaje-docente-error"
                                            >
                                                ⚠ Debes reducir la cantidad.
                                            </small>
                                        `

                                        : ""
                                }

                            </div>


                            <div class="carrito-item-cantidad">

                                <label>
                                    Cantidad
                                </label>


                                <input
                                    type="number"
                                    min="1"
                                    max="${disponible}"
                                    value="${cantidad}"
                                    onchange="cambiarCantidadCarritoEdicionDocente(${item.material_id}, this.value)"
                                >

                            </div>


                            <button
                                type="button"
                                class="btn-eliminar-carrito"
                                onclick="quitarDelCarritoEdicionDocente(${item.material_id})"
                            >
                                Quitar
                            </button>

                        </div>
                    `;
                }
            )

            .join("");
}


// =========================================================
// VALIDAR CARRITO DE EDICIÓN
// =========================================================

function validarCarritoEdicionDocente() {

    if (
        carritoEdicionDocente.length === 0
    ) {

        return {
            valido: false,
            mensaje:
                "La reserva debe contener al menos un material."
        };
    }


    for (
        const item of
        carritoEdicionDocente
    ) {

        const cantidad =
            Number(
                item.cantidad
            );


        const materialDisponible =
            disponibilidadEdicionDocente.find(
                material =>

                    Number(
                        material.material_id
                    ) ===
                    Number(
                        item.material_id
                    )
            );


        if (
            !materialDisponible
        ) {

            return {
                valido: false,
                mensaje:
                    `El material "${item.nombre}" ya no está disponible para la fecha y horario seleccionados.`
            };
        }


        const disponible =
            Number(
                materialDisponible.cantidad_disponible || 0
            );


        if (
            !Number.isInteger(
                cantidad
            )
            ||
            cantidad <= 0
        ) {

            return {
                valido: false,
                mensaje:
                    `La cantidad de "${item.nombre}" no es válida.`
            };
        }


        if (
            cantidad >
            disponible
        ) {

            return {
                valido: false,
                mensaje:
                    `Solo hay ${disponible} unidad(es) disponibles de "${item.nombre}".`
            };
        }
    }


    return {
        valido: true,
        mensaje: ""
    };
}


// =========================================================
// ACTUALIZAR CARRITO AL CAMBIAR FECHA / HORARIO
// =========================================================

function actualizarDisponibilidadCarritoEdicionDocente() {

    carritoEdicionDocente.forEach(

        item => {

            const material =
                disponibilidadEdicionDocente.find(
                    disponible =>

                        Number(
                            disponible.material_id
                        ) ===
                        Number(
                            item.material_id
                        )
                );


            item.disponible =
                material

                    ? Number(
                        material.cantidad_disponible || 0
                    )

                    : 0;
        }
    );


    renderizarCarritoEdicionDocente();
}


// =========================================================
// VOLVER SIN GUARDAR
// =========================================================

btnCancelarEdicionDocente
    ?.addEventListener(

        "click",

        () => {

            const confirmar =
                confirm(
                    "¿Deseas salir de la edición sin guardar los cambios?"
                );


            if (
                !confirmar
            ) {

                return;
            }


            // -------------------------------------------------
            // LIMPIAR EDICIÓN
            // -------------------------------------------------

            reservaEdicionDocente =
                null;


            carritoEdicionDocente =
                [];


            disponibilidadEdicionDocente =
                [];


            cantidadesOriginalesEdicionDocente =
                new Map();


            if (
                editarReservaDocenteId
            ) {

                editarReservaDocenteId.value =
                    "";
            }


            mostrarMensajeDocente(
                mensajeEditarReservaDocente,
                ""
            );


            // -------------------------------------------------
            // REGRESAR A RESERVAS
            // -------------------------------------------------

            mostrarPanelDocente(
                "panelReservasDocente"
            );


            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth"
                }
            );
        }
    );
// =========================================================
// GUARDAR EDICIÓN DE RESERVA
// =========================================================

btnGuardarEdicionDocente
    ?.addEventListener(

        "click",

        async () => {

            // -------------------------------------------------
            // COMPROBAR QUE HAYA UNA RESERVA EN EDICIÓN
            // -------------------------------------------------

            if (
                !reservaEdicionDocente
            ) {

                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    "No hay una reserva seleccionada para editar.",

                    "error"
                );


                return;
            }


            // -------------------------------------------------
            // VALIDAR NUEVAMENTE QUE LA RESERVA ORIGINAL
            // TODAVÍA PUEDA MODIFICARSE
            // -------------------------------------------------

            if (
                !reservaPuedeModificarDocente(
                    reservaEdicionDocente
                )
            ) {

                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    "Esta reserva ya no puede modificarse.",

                    "error"
                );


                return;
            }


            // -------------------------------------------------
            // DATOS DEL FORMULARIO
            // -------------------------------------------------

            const reservaId =
                Number(
                    reservaEdicionDocente.id
                );


            const fecha =
                editarReservaDocenteFecha.value;


            const horario =
                editarReservaDocenteHorario.value;


            const grupo =
                editarReservaDocenteGrupo.value
                    .trim();


            const tema =
                editarReservaDocenteTema.value
                    .trim();


            // -------------------------------------------------
            // LIMPIAR MENSAJE
            // -------------------------------------------------

            mostrarMensajeDocente(
                mensajeEditarReservaDocente,
                ""
            );


            // =================================================
            // VALIDACIONES DE DATOS
            // =================================================

            if (
                !fecha
            ) {

                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    "Seleccione una fecha.",

                    "error"
                );


                return;
            }


            // -------------------------------------------------
            // FECHA DEBE SER POSTERIOR A HOY
            // -------------------------------------------------

            const hoy =
                obtenerFechaHoyDocente();


            if (
                fecha <= hoy
            ) {

                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    "La fecha de la reserva debe ser posterior a hoy.",

                    "error"
                );


                return;
            }


            if (
                !horario
            ) {

                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    "Seleccione un horario.",

                    "error"
                );


                return;
            }


            if (
                !HORARIOS.includes(
                    horario
                )
            ) {

                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    "El horario seleccionado no es válido.",

                    "error"
                );


                return;
            }


            if (
                !grupo
            ) {

                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    "Ingrese el grupo.",

                    "error"
                );


                return;
            }


            if (
                !tema
            ) {

                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    "Ingrese el tema de la clase.",

                    "error"
                );


                return;
            }


            // =================================================
            // ACTUALIZAR DISPONIBILIDAD ANTES DE GUARDAR
            // =================================================

            /*
             * Hacemos una nueva consulta justo antes
             * de guardar.
             *
             * Esto reduce la posibilidad de trabajar con
             * disponibilidad antigua si otro docente realizó
             * una reserva mientras el formulario estaba abierto.
             */

            mostrarMensajeDocente(

                mensajeEditarReservaDocente,

                "Verificando disponibilidad..."
            );


            await consultarDisponibilidadEdicionDocente();


            // -------------------------------------------------
            // VALIDAR CARRITO CON LA DISPONIBILIDAD RECIENTE
            // -------------------------------------------------

            const validacionCarrito =
                validarCarritoEdicionDocente();


            if (
                !validacionCarrito.valido
            ) {

                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    validacionCarrito.mensaje,

                    "error"
                );


                return;
            }


            // =================================================
            // CONSTRUIR MATERIALES PARA LA RPC
            // =================================================

            const materiales =
                carritoEdicionDocente.map(

                    item => ({

                        material_id:
                            Number(
                                item.material_id
                            ),

                        cantidad:
                            Number(
                                item.cantidad
                            )
                    })
                );


            // -------------------------------------------------
            // ÚLTIMA VALIDACIÓN DE ARRAY
            // -------------------------------------------------

            if (
                materiales.length === 0
            ) {

                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    "La reserva debe contener al menos un material.",

                    "error"
                );


                return;
            }


            // =================================================
            // CONFIRMACIÓN
            // =================================================

            const confirmar =
                confirm(
                    "¿Guardar los cambios realizados en esta reserva?"
                );


            if (
                !confirmar
            ) {

                mostrarMensajeDocente(
                    mensajeEditarReservaDocente,
                    ""
                );


                return;
            }


            // =================================================
            // BLOQUEAR BOTÓN
            // =================================================

            btnGuardarEdicionDocente.disabled =
                true;


            btnGuardarEdicionDocente.textContent =
                "Guardando...";


            mostrarMensajeDocente(

                mensajeEditarReservaDocente,

                "Guardando cambios..."
            );


            try {

                // =============================================
                // RPC EDITAR RESERVA
                // =============================================

                const {
                    error
                } =
                    await supabaseClient.rpc(

                        "editar_reserva_material",

                        {
                            p_reserva_id:
                                reservaId,

                            p_grupo:
                                grupo,

                            p_fecha:
                                fecha,

                            p_horario:
                                horario,

                            p_tema:
                                tema,

                            p_materiales:
                                materiales
                        }
                    );


                if (
                    error
                ) {

                    throw error;
                }


                // =============================================
                // ÉXITO
                // =============================================

                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    "Reserva modificada correctamente.",

                    "ok"
                );


                /*
                 * Guardamos la fecha antes de limpiar
                 * reservaEdicionDocente.
                 */

                const fechaReservaActualizada =
                    fecha;


                // =============================================
                // LIMPIAR ESTADO DE EDICIÓN
                // =============================================

                reservaEdicionDocente =
                    null;


                carritoEdicionDocente =
                    [];


                disponibilidadEdicionDocente =
                    [];


                cantidadesOriginalesEdicionDocente =
                    new Map();


                if (
                    editarReservaDocenteId
                ) {

                    editarReservaDocenteId.value =
                        "";
                }


                // =============================================
                // ACTUALIZAR NUEVA RESERVA SI ESTÁ CONSULTANDO
                // EL MISMO TURNO
                // =============================================

                if (
                    reservaFecha.value &&
                    reservaHorario.value
                ) {

                    await consultarDisponibilidad();
                }


                // =============================================
                // MOVER TABLA A LA SEMANA DE LA RESERVA
                // =============================================

                lunesSemanaActual =
                    obtenerLunes(
                        new Date(
                            `${fechaReservaActualizada}T12:00:00`
                        )
                    );


                // =============================================
                // RECARGAR TABLA
                // =============================================

                await cargarReservasSemana();


                // =============================================
                // MOSTRAR RESULTADO EN PANEL DE RESERVAS
                // =============================================

                mostrarMensajeDocente(

                    mensajeReservasDocente,

                    "Reserva modificada correctamente.",

                    "ok"
                );


                // =============================================
                // REGRESAR A TABLA SEMANAL
                // =============================================

                mostrarPanelDocente(
                    "panelReservasDocente"
                );


                window.scrollTo(
                    {
                        top: 0,
                        behavior: "smooth"
                    }
                );


            } catch (error) {

                console.error(
                    "Error editando reserva:",
                    error
                );


                let mensaje =
                    error.message ||
                    "No se pudo modificar la reserva.";


                // =============================================
                // POSIBLE CONFLICTO DE RESERVA
                // =============================================

                if (
                    error.code ===
                    "23505"
                ) {

                    mensaje =
                        "Ya tienes otra reserva registrada para esa fecha y horario.";
                }


                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    mensaje,

                    "error"
                );


                /*
                 * Volvemos a consultar disponibilidad
                 * porque pudo cambiar mientras se intentaba
                 * guardar.
                 */

                await consultarDisponibilidadEdicionDocente();


            } finally {

                // =============================================
                // RESTAURAR BOTÓN
                // =============================================

                btnGuardarEdicionDocente.textContent =
                    "Guardar cambios";


                if (
                    reservaEdicionDocente
                ) {

                    btnGuardarEdicionDocente.disabled =
                        carritoEdicionDocente.length === 0;

                } else {

                    btnGuardarEdicionDocente.disabled =
                        false;
                }
            }
        }
    );


// =========================================================
// COMPROBAR CAMBIOS DE LA RESERVA
// =========================================================

function reservaTieneCambiosDocente() {

    if (
        !reservaEdicionDocente
    ) {

        return false;
    }


    // -------------------------------------------------
    // DATOS GENERALES
    // -------------------------------------------------

    if (
        editarReservaDocenteFecha.value !==
        reservaEdicionDocente.fecha
    ) {

        return true;
    }


    if (
        editarReservaDocenteHorario.value !==
        reservaEdicionDocente.horario
    ) {

        return true;
    }


    if (
        editarReservaDocenteGrupo.value.trim() !==
        String(
            reservaEdicionDocente.grupo || ""
        ).trim()
    ) {

        return true;
    }


    if (
        editarReservaDocenteTema.value.trim() !==
        String(
            reservaEdicionDocente.tema || ""
        ).trim()
    ) {

        return true;
    }


    // -------------------------------------------------
    // CANTIDAD DE MATERIALES
    // -------------------------------------------------

    if (
        carritoEdicionDocente.length !==
        cantidadesOriginalesEdicionDocente.size
    ) {

        return true;
    }


    // -------------------------------------------------
    // COMPARAR MATERIAL POR MATERIAL
    // -------------------------------------------------

    for (
        const item of
        carritoEdicionDocente
    ) {

        const cantidadOriginal =
            cantidadesOriginalesEdicionDocente.get(
                Number(
                    item.material_id
                )
            );


        if (
            cantidadOriginal ===
            undefined
        ) {

            return true;
        }


        if (
            Number(
                item.cantidad
            ) !==
            Number(
                cantidadOriginal
            )
        ) {

            return true;
        }
    }


    return false;
}


// =========================================================
// AVISO ANTES DE SALIR DE LA PÁGINA
// =========================================================

window.addEventListener(

    "beforeunload",

    event => {

        if (
            !reservaEdicionDocente
        ) {

            return;
        }


        if (
            !reservaTieneCambiosDocente()
        ) {

            return;
        }


        event.preventDefault();


        event.returnValue =
            "";
    }
);
// =========================================================
// CONFIGURAR FECHAS MÍNIMAS
// =========================================================

function configurarFechaInicial() {

    const hoy =
        new Date();


    // -----------------------------------------------------
    // NUEVA RESERVA
    //
    // Se permite crear una reserva para HOY.
    // -----------------------------------------------------

    if (
        reservaFecha
    ) {

        reservaFecha.min =
            fechaISO(
                hoy
            );
    }


    // -----------------------------------------------------
    // EDITAR RESERVA
    //
    // Una reserva editada solamente puede quedar
    // desde MAÑANA en adelante.
    // -----------------------------------------------------

    const manana =
        sumarDias(
            hoy,
            1
        );


    if (
        editarReservaDocenteFecha
    ) {

        editarReservaDocenteFecha.min =
            fechaISO(
                manana
            );
    }
}


// =========================================================
// VALIDAR FECHA AL CREAR NUEVA RESERVA
// =========================================================

reservaFecha
    ?.addEventListener(

        "change",

        () => {

            const fecha =
                reservaFecha.value;


            if (
                !fecha
            ) {

                return;
            }


            const hoy =
                obtenerFechaHoyDocente();


            if (
                fecha < hoy
            ) {

                reservaFecha.value =
                    hoy;


                mostrarMensajeDocente(

                    mensajeNuevaReserva,

                    "No puedes realizar una reserva para una fecha pasada.",

                    "error"
                );
            }
        }
    );


// =========================================================
// VALIDAR FECHA AL EDITAR RESERVA
// =========================================================

editarReservaDocenteFecha
    ?.addEventListener(

        "change",

        () => {

            const fecha =
                editarReservaDocenteFecha.value;


            if (
                !fecha
            ) {

                return;
            }


            const hoy =
                obtenerFechaHoyDocente();


            if (
                fecha <= hoy
            ) {

                const manana =
                    sumarDias(
                        new Date(),
                        1
                    );


                editarReservaDocenteFecha.value =
                    fechaISO(
                        manana
                    );


                mostrarMensajeDocente(

                    mensajeEditarReservaDocente,

                    "Una reserva editada debe quedar en una fecha posterior a hoy.",

                    "error"
                );
            }
        }
    );


// =========================================================
// LIMPIAR MENSAJE AL CAMBIAR DATOS DE NUEVA RESERVA
// =========================================================

[
    reservaFecha,
    reservaHorario,
    reservaGrupo,
    reservaTema

].forEach(

    elemento => {

        elemento
            ?.addEventListener(

                "input",

                () => {

                    if (
                        mensajeNuevaReserva?.classList.contains(
                            "mensaje-docente-error"
                        )
                    ) {

                        mostrarMensajeDocente(
                            mensajeNuevaReserva,
                            ""
                        );
                    }
                }
            );
    }
);


// =========================================================
// LIMPIAR MENSAJE AL CAMBIAR DATOS DE EDICIÓN
// =========================================================

[
    editarReservaDocenteFecha,
    editarReservaDocenteHorario,
    editarReservaDocenteGrupo,
    editarReservaDocenteTema

].forEach(

    elemento => {

        elemento
            ?.addEventListener(

                "input",

                () => {

                    if (
                        mensajeEditarReservaDocente
                            ?.classList.contains(
                                "mensaje-docente-error"
                            )
                    ) {

                        mostrarMensajeDocente(
                            mensajeEditarReservaDocente,
                            ""
                        );
                    }
                }
            );
    }
);


// =========================================================
// ESTADO INICIAL DEL PANEL DE EDICIÓN
// =========================================================

function limpiarEdicionDocente() {

    reservaEdicionDocente =
        null;


    carritoEdicionDocente =
        [];


    disponibilidadEdicionDocente =
        [];


    cantidadesOriginalesEdicionDocente =
        new Map();


    if (
        editarReservaDocenteId
    ) {

        editarReservaDocenteId.value =
            "";
    }


    if (
        editarReservaDocenteFecha
    ) {

        editarReservaDocenteFecha.value =
            "";
    }


    if (
        editarReservaDocenteHorario
    ) {

        editarReservaDocenteHorario.value =
            "";
    }


    if (
        editarReservaDocenteGrupo
    ) {

        editarReservaDocenteGrupo.value =
            "";
    }


    if (
        editarReservaDocenteTema
    ) {

        editarReservaDocenteTema.value =
            "";
    }


    if (
        editarFiltroCategoriaDocente
    ) {

        editarFiltroCategoriaDocente.value =
            "";
    }


    if (
        editarBuscarMaterialDocente
    ) {

        editarBuscarMaterialDocente.value =
            "";
    }


    if (
        editarCatalogoMaterialesDocente
    ) {

        editarCatalogoMaterialesDocente.innerHTML =
            "";
    }


    if (
        editarCarritoMaterialesDocente
    ) {

        editarCarritoMaterialesDocente.innerHTML =
            "";
    }


    mostrarMensajeDocente(
        editarMensajeDisponibilidadDocente,
        ""
    );


    mostrarMensajeDocente(
        mensajeEditarReservaDocente,
        ""
    );
}


// =========================================================
// INICIAR PANEL DOCENTE
// =========================================================

async function iniciarDocente() {

    // -----------------------------------------------------
    // MODO VISUAL
    // -----------------------------------------------------

    aplicarModoDocente();


    // -----------------------------------------------------
    // COMPROBAR SESIÓN Y PERFIL
    // -----------------------------------------------------

    const autorizado =
        await comprobarDocente();


    if (
        !autorizado
    ) {

        return;
    }


    // -----------------------------------------------------
    // CONFIGURAR FECHAS
    // -----------------------------------------------------

    configurarFechaInicial();


    // -----------------------------------------------------
    // ESTADO INICIAL DEL EDITOR
    // -----------------------------------------------------

    limpiarEdicionDocente();


    // -----------------------------------------------------
    // CARGAR CATEGORÍAS
    // -----------------------------------------------------

    await cargarCategoriasDocente();


    // -----------------------------------------------------
    // CARGAR SEMANA ACTUAL
    // -----------------------------------------------------

    await cargarReservasSemana();


    // -----------------------------------------------------
    // CARRITO NUEVA RESERVA
    // -----------------------------------------------------

    renderizarCarrito();


    // -----------------------------------------------------
    // MOSTRAR PANEL PRINCIPAL
    // -----------------------------------------------------

    mostrarPanelDocente(
        "panelReservasDocente"
    );
}


// =========================================================
// EJECUTAR
// =========================================================

iniciarDocente();
