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

let lunesSemanaActual = obtenerLunes(
    new Date()
);


// =========================================================
// ELEMENTOS
// =========================================================

const nombreDocente =
    document.getElementById("nombreDocente");

const btnCerrarSesionDocente =
    document.getElementById(
        "btnCerrarSesionDocente"
    );

const btnModoOscuroDocente =
    document.getElementById(
        "btnModoOscuroDocente"
    );


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
// UTILIDADES
// =========================================================

function escaparHTML(valor) {

    if (
        valor === null ||
        valor === undefined
    ) {
        return "";
    }


    return String(valor)

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
// FECHAS
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


function sumarDias(
    fecha,
    dias
) {

    const nueva =
        new Date(fecha);


    nueva.setDate(
        nueva.getDate() +
        dias
    );


    return nueva;
}


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

                .from("perfiles")

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


                    document
                        .querySelectorAll(
                            ".docente-tab[data-panel]"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "activo"
                                )
                        );


                    document
                        .querySelectorAll(
                            ".docente-panel"
                        )
                        .forEach(
                            panel =>
                                panel.classList.remove(
                                    "activo"
                                )
                        );


                    boton.classList.add(
                        "activo"
                    );


                    document
                        .getElementById(
                            panelId
                        )
                        ?.classList.add(
                            "activo"
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


    if (!errorRelaciones) {

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
// CONSULTAR DISPONIBILIDAD
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
// FILTRAR CATÁLOGO
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


                if (!pertenece) {
                    return false;
                }
            }


            if (texto) {

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
// CATÁLOGO
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
                <span>🔎</span>
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
                            ? itemCarrito.cantidad
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
// EVENTOS FILTROS
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
// AGREGAR AL CARRITO
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


        if (!material) {
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
                ? existente.cantidad
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


        if (existente) {

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
// QUITAR DEL CARRITO
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
// CAMBIAR CANTIDAD CARRITO
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


        if (!item) {
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
// RENDER CARRITO
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
// FINALIZAR RESERVA
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


            mensajeNuevaReserva.textContent =
                "";


            if (!fecha) {

                mensajeNuevaReserva.textContent =
                    "Seleccione una fecha.";

                return;
            }


            if (!horario) {

                mensajeNuevaReserva.textContent =
                    "Seleccione un horario.";

                return;
            }


            if (!grupo) {

                mensajeNuevaReserva.textContent =
                    "Ingrese el grupo.";

                return;
            }


            if (!tema) {

                mensajeNuevaReserva.textContent =
                    "Ingrese el tema de la clase.";

                return;
            }


            if (
                carrito.length === 0
            ) {

                mensajeNuevaReserva.textContent =
                    "Seleccione al menos un material.";

                return;
            }


            const confirmar =
                confirm(
                    "¿Finalizar y registrar esta reserva?"
                );


            if (!confirmar) {
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
                                item.material_id,

                            cantidad:
                                item.cantidad
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


                if (error) {

                    throw error;
                }


                mensajeNuevaReserva.textContent =
                    `Reserva #${data} registrada correctamente.`;


                mensajeNuevaReserva.className =
                    "mensaje-docente mensaje-docente-ok";


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

                        document
                            .querySelector(
                                '[data-panel="panelReservasDocente"]'
                            )
                            ?.click();

                    },
                    900
                );


            } catch (error) {

                console.error(
                    "Error creando reserva:",
                    error
                );


                mensajeNuevaReserva.className =
                    "mensaje-docente mensaje-docente-error";


                mensajeNuevaReserva.textContent =
                    error.message ||
                    "No se pudo registrar la reserva.";


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
// TABLA SEMANAL
// =========================================================

const HORARIOS = [

    "09:00-12:00",

    "14:00-17:00",

    "19:00-21:30"
];


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


    if (error) {

        console.error(
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


    const reservaIds =
        (reservas || [])
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
                    reserva_id,
                    material_id,
                    cantidad,
                    cantidad_devuelta,
                    observacion
                `)

                .in(
                    "reserva_id",
                    reservaIds
                );


        if (!errorDetalles) {

            detalles =
                data || [];
        }
    }


    const materialIds =
        [
            ...new Set(
                detalles.map(
                    detalle =>
                        detalle.material_id
                )
            )
        ];


    let materiales =
        [];


    if (
        materialIds.length
    ) {

        const {
            data
        } =
            await supabaseClient

                .from(
                    "materiales_gabinete"
                )

                .select(`
                    id,
                    nombre
                `)

                .in(
                    "id",
                    materialIds
                );


        materiales =
            data || [];
    }


    const usuarioIds =
        [
            ...new Set(
                (reservas || [])
                    .map(
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
            data
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


        perfiles =
            data || [];
    }


    renderizarTablaSemana(
        reservas || [],
        detalles,
        materiales,
        perfiles
    );
}


// =========================================================
// CABECERAS
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


            document
                .getElementById(
                    item[0]
                )
                .innerHTML =
                    `
                    ${item[1]}
                    <small>
                        ${formatoFechaCorta(
                            fecha
                        )}
                    </small>
                    `;
        }
    );
}


// =========================================================
// RENDER TABLA SEMANAL
// =========================================================

function renderizarTablaSemana(
    reservas,
    detalles,
    materiales,
    perfiles
) {

    const mapaMateriales =
        new Map(
            materiales.map(
                material => [
                    Number(
                        material.id
                    ),
                    material.nombre
                ]
            )
        );


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

                                                    const detallesReserva =
                                                        detalles.filter(
                                                            detalle =>
                                                                Number(
                                                                    detalle.reserva_id
                                                                ) ===
                                                                Number(
                                                                    reserva.id
                                                                )
                                                        );


                                                    const materialesTexto =
                                                        detallesReserva

                                                            .map(
                                                                detalle =>
                                                                    `
                                                                    <li>
                                                                        <strong>
                                                                            ${detalle.cantidad} ×
                                                                        </strong>

                                                                        ${escaparHTML(
                                                                            mapaMateriales.get(
                                                                                Number(
                                                                                    detalle.material_id
                                                                                )
                                                                            ) ||
                                                                            "Material"
                                                                        )}
                                                                    </li>
                                                                    `
                                                            )

                                                            .join("");


                                                    const nombre =
                                                        mapaPerfiles.get(
                                                            reserva.usuario_id
                                                        )
                                                        ||
                                                        "Docente";


                                                    const propia =
                                                        reserva.usuario_id ===
                                                        perfilDocente.id;


                                                    const botonCancelar =
                                                        propia

                                                            ? `
                                                                <button
                                                                    type="button"
                                                                    class="btn-cancelar-reserva-docente"
                                                                    onclick="cancelarReservaDocente(${reserva.id})"
                                                                >
                                                                    Cancelar reserva
                                                                </button>
                                                            `

                                                            : "";


                                                    return `
                                                        <div class="reserva-semanal-card">

                                                            <span class="reserva-docente-nombre">
                                                                ${escaparHTML(
                                                                    nombre
                                                                )}
                                                            </span>

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

                                                            <ul>
                                                                ${materialesTexto}
                                                            </ul>

                                                            ${
                                                                propia
                                                                    ? `
                                                                        <span class="reserva-propia">
                                                                            Mi reserva
                                                                        </span>
                                                                    `
                                                                    : ""
                                                            }

                                                            ${botonCancelar}

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
// CANCELAR RESERVA
// =========================================================

window.cancelarReservaDocente =
    async function (
        reservaId
    ) {

        const confirmar =
            confirm(
                "¿Deseas cancelar esta reserva?\n\nLos materiales volverán a estar disponibles para ese horario."
            );


        if (!confirmar) {
            return;
        }


        mensajeReservasDocente.textContent =
            "Cancelando reserva...";


        try {

            const {
                error
            } =
                await supabaseClient.rpc(
                    "cancelar_reserva_material",
                    {
                        p_reserva_id:
                            reservaId
                    }
                );


            if (error) {
                throw error;
            }


            mensajeReservasDocente.className =
                "mensaje-docente mensaje-docente-ok";


            mensajeReservasDocente.textContent =
                "Reserva cancelada correctamente.";


            await cargarReservasSemana();


            if (
                reservaFecha.value &&
                reservaHorario.value
            ) {

                await consultarDisponibilidad();
            }


        } catch (error) {

            console.error(
                error
            );


            mensajeReservasDocente.className =
                "mensaje-docente mensaje-docente-error";


            mensajeReservasDocente.textContent =
                error.message ||
                "No se pudo cancelar la reserva.";
        }
    };


// =========================================================
// FECHA MÍNIMA
// =========================================================

function configurarFechaInicial() {

    const hoy =
        new Date();


    reservaFecha.min =
        fechaISO(
            hoy
        );
}


// =========================================================
// INICIAR
// =========================================================

async function iniciarDocente() {

    aplicarModoDocente();


    const autorizado =
        await comprobarDocente();


    if (!autorizado) {
        return;
    }


    configurarFechaInicial();


    await cargarCategoriasDocente();


    await cargarReservasSemana();


    renderizarCarrito();
}


iniciarDocente();
