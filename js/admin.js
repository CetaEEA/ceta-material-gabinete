 // =========================================================
// CETA
// MATERIAL DE GABINETE
// PANEL ADMINISTRATIVO
// =========================================================


// =========================================================
// VARIABLES GENERALES
// =========================================================

let perfilActual = null;

let materialesCargados = [];

let categoriasCargadas = [];

let imagenActualUrl = null;


// =========================================================
// VARIABLES - RESERVAS
// =========================================================

let reservasAdmin = [];

let detallesAdmin = [];

let materialesAdmin = [];

let perfilesAdmin = [];

let lunesSemanaAdmin = null;


// =========================================================
// VARIABLES - ENTREGA FÍSICA
// =========================================================

let reservaEntregaFisicaActual = null;


// =========================================================
// VARIABLES - DEVOLUCIÓN
// =========================================================

let reservaEntregaActual = null;


// =========================================================
// VARIABLES - EDICIÓN DE RESERVA
// =========================================================

let reservaEdicionActual = null;

let carritoEdicionReserva = [];

let disponibilidadEdicion = [];

let relacionesCategoriasEdicion = [];


// =========================================================
// HORARIOS
// =========================================================

const HORARIOS_ADMIN = [

    "09:00-12:00",

    "14:00-17:00",

    "19:00-21:30"

];


// =========================================================
// ELEMENTOS GENERALES
// =========================================================

const nombreAdministrador =
    document.getElementById(
        "nombreAdministrador"
    );

const btnCerrarSesion =
    document.getElementById(
        "btnCerrarSesion"
    );

const btnModoOscuro =
    document.getElementById(
        "btnModoOscuro"
    );


// =========================================================
// ELEMENTOS - MATERIALES
// =========================================================

const formMaterial =
    document.getElementById(
        "formMaterial"
    );

const materialId =
    document.getElementById(
        "materialId"
    );

const materialCodigo =
    document.getElementById(
        "materialCodigo"
    );

const materialNombre =
    document.getElementById(
        "materialNombre"
    );

const materialCantidad =
    document.getElementById(
        "materialCantidad"
    );

const materialDescripcion =
    document.getElementById(
        "materialDescripcion"
    );

const materialImagen =
    document.getElementById(
        "materialImagen"
    );

const previewImagenMaterial =
    document.getElementById(
        "previewImagenMaterial"
    );

const sinImagenMaterial =
    document.getElementById(
        "sinImagenMaterial"
    );

const categoriasMaterial =
    document.getElementById(
        "categoriasMaterial"
    );

const mensajeMaterial =
    document.getElementById(
        "mensajeMaterial"
    );

const listaMateriales =
    document.getElementById(
        "listaMateriales"
    );

const buscarMaterial =
    document.getElementById(
        "buscarMaterial"
    );

const contadorMateriales =
    document.getElementById(
        "contadorMateriales"
    );

const btnNuevoMaterial =
    document.getElementById(
        "btnNuevoMaterial"
    );

const btnCancelarEdicion =
    document.getElementById(
        "btnCancelarEdicion"
    );

const btnGuardarMaterial =
    document.getElementById(
        "btnGuardarMaterial"
    );

const tituloFormularioMaterial =
    document.getElementById(
        "tituloFormularioMaterial"
    );

const contenedorFormularioMaterial =
    document.getElementById(
        "contenedorFormularioMaterial"
    );


// =========================================================
// ELEMENTOS - RESERVAS
// =========================================================

const btnSemanaAnteriorAdmin =
    document.getElementById(
        "btnSemanaAnteriorAdmin"
    );

const btnSemanaSiguienteAdmin =
    document.getElementById(
        "btnSemanaSiguienteAdmin"
    );

const textoSemanaAdmin =
    document.getElementById(
        "textoSemanaAdmin"
    );

const cuerpoTablaReservasAdmin =
    document.getElementById(
        "cuerpoTablaReservasAdmin"
    );

const mensajeReservasAdmin =
    document.getElementById(
        "mensajeReservasAdmin"
    );

const btnPDFReservasMaterial =
    document.getElementById(
        "btnPDFReservasMaterial"
    );


// =========================================================
// ELEMENTOS - ENTREGA FÍSICA
// =========================================================

const panelConfirmarEntrega =
    document.getElementById(
        "panelConfirmarEntrega"
    );

const tituloConfirmarEntrega =
    document.getElementById(
        "tituloConfirmarEntrega"
    );

const datosConfirmarEntrega =
    document.getElementById(
        "datosConfirmarEntrega"
    );

const detalleConfirmarEntrega =
    document.getElementById(
        "detalleConfirmarEntrega"
    );

const observacionGeneralEntrega =
    document.getElementById(
        "observacionGeneralEntrega"
    );

const btnConfirmarEntregaMaterial =
    document.getElementById(
        "btnConfirmarEntregaMaterial"
    );

const btnCancelarConfirmarEntrega =
    document.getElementById(
        "btnCancelarConfirmarEntrega"
    );

const mensajeConfirmarEntrega =
    document.getElementById(
        "mensajeConfirmarEntrega"
    );


// =========================================================
// ELEMENTOS - DEVOLUCIONES
// =========================================================

const listaEntregasPendientes =
    document.getElementById(
        "listaEntregasPendientes"
    );

const panelGestionEntrega =
    document.getElementById(
        "panelGestionEntrega"
    );

const tituloGestionEntrega =
    document.getElementById(
        "tituloGestionEntrega"
    );

const datosGestionEntrega =
    document.getElementById(
        "datosGestionEntrega"
    );

const detalleGestionEntrega =
    document.getElementById(
        "detalleGestionEntrega"
    );

const btnGuardarDevolucion =
    document.getElementById(
        "btnGuardarDevolucion"
    );

const btnCerrarGestionEntrega =
    document.getElementById(
        "btnCerrarGestionEntrega"
    );

const mensajeEntrega =
    document.getElementById(
        "mensajeEntrega"
    );


// =========================================================
// ELEMENTOS - EDITAR RESERVA
// =========================================================

const panelEditarReserva =
    document.getElementById(
        "panelEditarReserva"
    );

const formEditarReserva =
    document.getElementById(
        "formEditarReserva"
    );

const editarReservaId =
    document.getElementById(
        "editarReservaId"
    );

const editarReservaDocente =
    document.getElementById(
        "editarReservaDocente"
    );

const editarReservaFecha =
    document.getElementById(
        "editarReservaFecha"
    );

const editarReservaHorario =
    document.getElementById(
        "editarReservaHorario"
    );

const editarReservaGrupo =
    document.getElementById(
        "editarReservaGrupo"
    );

const editarReservaTema =
    document.getElementById(
        "editarReservaTema"
    );

const editarFiltroCategoria =
    document.getElementById(
        "editarFiltroCategoria"
    );

const editarBuscarMaterial =
    document.getElementById(
        "editarBuscarMaterial"
    );

const editarCatalogoMateriales =
    document.getElementById(
        "editarCatalogoMateriales"
    );

const editarCarritoMateriales =
    document.getElementById(
        "editarCarritoMateriales"
    );

const btnGuardarEdicionReserva =
    document.getElementById(
        "btnGuardarEdicionReserva"
    );

const btnCancelarEdicionReserva =
    document.getElementById(
        "btnCancelarEdicionReserva"
    );

const mensajeEditarReserva =
    document.getElementById(
        "mensajeEditarReserva"
    );


// =========================================================
// ESCAPAR HTML
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
// MENSAJE MATERIAL
// =========================================================

function mostrarMensaje(
    mensaje,
    tipo = "error"
) {

    if (!mensajeMaterial) {
        return;
    }


    mensajeMaterial.textContent =
        mensaje || "";


    mensajeMaterial.className =
        "mensaje-admin";


    if (tipo === "ok") {

        mensajeMaterial.classList.add(
            "mensaje-ok"
        );

    } else if (tipo === "info") {

        mensajeMaterial.classList.add(
            "mensaje-info"
        );

    } else {

        mensajeMaterial.classList.add(
            "mensaje-error"
        );
    }
}


// =========================================================
// MOSTRAR UN PANEL DIRECTAMENTE
// =========================================================

function mostrarPanelAdmin(
    panelId
) {

    document
        .querySelectorAll(
            ".admin-panel"
        )
        .forEach(
            panel => {

                panel.classList.remove(
                    "activo"
                );
            }
        );


    const panel =
        document.getElementById(
            panelId
        );


    panel?.classList.add(
        "activo"
    );


    document
        .querySelectorAll(
            ".tab-btn[data-panel]"
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
// COMPROBAR SESIÓN ADMINISTRATIVA
// =========================================================

async function comprobarAdministrador() {

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
                    eliminado,
                    es_superadmin
                `)

                .eq(
                    "id",
                    userId
                )

                .maybeSingle();


        if (
            error ||
            !perfil ||
            perfil.rol !==
                "administrador" ||
            perfil.activo !== true ||
            perfil.eliminado === true
        ) {

            await supabaseClient.auth
                .signOut();


            window.location.href =
                "index.html";


            return false;
        }


        perfilActual =
            perfil;


        if (nombreAdministrador) {

            nombreAdministrador.textContent =
                perfil.nombre ||
                perfil.usuario ||
                "Administrador";
        }


        return true;


    } catch (error) {

        console.error(
            "Error comprobando administrador:",
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

btnCerrarSesion?.addEventListener(

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
        ".tab-btn[data-panel]"
    )

    .forEach(

        boton => {

            boton.addEventListener(

                "click",

                () => {

                    mostrarPanelAdmin(
                        boton.dataset.panel
                    );
                }
            );
        }
    );


// =========================================================
// MODO OSCURO
// =========================================================

function aplicarModoGuardado() {

    const modo =
        localStorage.getItem(
            "ceta_material_modo"
        );


    if (modo === "oscuro") {

        document.body.classList.add(
            "modo-oscuro"
        );


        if (btnModoOscuro) {

            btnModoOscuro.textContent =
                "☀️ Modo claro";
        }
    }
}


btnModoOscuro?.addEventListener(

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


        btnModoOscuro.textContent =
            oscuro
                ? "☀️ Modo claro"
                : "🌙 Modo oscuro";
    }
);


// =========================================================
// CARGAR CATEGORÍAS
// =========================================================

async function cargarCategorias() {

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
                nombre,
                activo
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
            "Error cargando categorías:",
            error
        );


        if (categoriasMaterial) {

            categoriasMaterial.innerHTML =
                `
                <p class="mensaje-error">
                    No se pudieron cargar las categorías.
                </p>
                `;
        }


        return;
    }


    categoriasCargadas =
        data || [];


    renderizarCategorias();

    cargarCategoriasEdicion();
}


// =========================================================
// MOSTRAR CATEGORÍAS
// =========================================================

function renderizarCategorias(
    seleccionadas = []
) {

    if (!categoriasMaterial) {
        return;
    }


    if (
        !categoriasCargadas.length
    ) {

        categoriasMaterial.innerHTML =
            `
            <p>
                No hay categorías registradas.
            </p>
            `;

        return;
    }


    const seleccionSet =
        new Set(

            seleccionadas.map(
                id =>
                    Number(id)
            )
        );


    categoriasMaterial.innerHTML =

        categoriasCargadas

            .map(

                categoria => {

                    const checked =
                        seleccionSet.has(
                            Number(
                                categoria.id
                            )
                        )
                            ? "checked"
                            : "";


                    return `
                        <label class="categoria-check">

                            <input
                                type="checkbox"
                                class="categoria-checkbox"
                                value="${categoria.id}"
                                ${checked}
                            >

                            <span>
                                ${escaparHTML(
                                    categoria.nombre
                                )}
                            </span>

                        </label>
                    `;
                }
            )

            .join("");
}


// =========================================================
// CATEGORÍAS DEL FORMULARIO DE EDICIÓN DE RESERVA
// =========================================================

function cargarCategoriasEdicion() {

    if (!editarFiltroCategoria) {
        return;
    }


    editarFiltroCategoria.innerHTML =
        `
        <option value="">
            Todas las categorías
        </option>

        ${
            categoriasCargadas

                .map(
                    categoria => `
                        <option value="${categoria.id}">
                            ${escaparHTML(
                                categoria.nombre
                            )}
                        </option>
                    `
                )

                .join("")
        }
        `;
}


// =========================================================
// OBTENER CATEGORÍAS SELECCIONADAS
// =========================================================

function obtenerCategoriasSeleccionadas() {

    return Array.from(

        document.querySelectorAll(
            ".categoria-checkbox:checked"
        )
    )

        .map(

            checkbox =>
                Number(
                    checkbox.value
                )
        );
}


// =========================================================
// PREVISUALIZAR IMAGEN
// =========================================================

materialImagen?.addEventListener(

    "change",

    () => {

        const archivo =
            materialImagen.files?.[0];


        if (!archivo) {
            return;
        }


        const urlTemporal =
            URL.createObjectURL(
                archivo
            );


        previewImagenMaterial.src =
            urlTemporal;


        previewImagenMaterial.style.display =
            "block";


        sinImagenMaterial.style.display =
            "none";
    }
);


// =========================================================
// MOSTRAR IMAGEN
// =========================================================

function mostrarImagenFormulario(
    url
) {

    if (url) {

        previewImagenMaterial.src =
            url;


        previewImagenMaterial.style.display =
            "block";


        sinImagenMaterial.style.display =
            "none";


    } else {

        previewImagenMaterial.removeAttribute(
            "src"
        );


        previewImagenMaterial.style.display =
            "none";


        sinImagenMaterial.style.display =
            "flex";
    }
}


// =========================================================
// SUBIR IMAGEN
// =========================================================

async function subirImagenMaterial(
    archivo
) {

    if (!archivo) {

        return imagenActualUrl;
    }


    const extension =
        archivo.name

            .split(".")

            .pop()

            ?.toLowerCase() ||

        "jpg";


    const nombreArchivo =
        `material_${Date.now()}_${Math.random()
            .toString(36)
            .substring(
                2,
                8
            )}.${extension}`;


    const ruta =
        `materiales/${nombreArchivo}`;


    const {
        error
    } =
        await supabaseClient.storage

            .from(
                "material-gabinete"
            )

            .upload(
                ruta,
                archivo,
                {
                    cacheControl:
                        "3600",

                    upsert:
                        false
                }
            );


    if (error) {

        console.error(
            "Error subiendo imagen:",
            error
        );


        throw new Error(
            "No se pudo subir la imagen."
        );
    }


    const {
        data
    } =
        supabaseClient.storage

            .from(
                "material-gabinete"
            )

            .getPublicUrl(
                ruta
            );


    return data.publicUrl;
}


// =========================================================
// GUARDAR CATEGORÍAS DEL MATERIAL
// =========================================================

async function guardarCategoriasMaterial(
    idMaterial,
    categorias
) {

    const {
        error: errorEliminar
    } =
        await supabaseClient

            .from(
                "material_categorias"
            )

            .delete()

            .eq(
                "material_id",
                idMaterial
            );


    if (errorEliminar) {

        throw errorEliminar;
    }


    if (
        !categorias.length
    ) {

        return;
    }


    const relaciones =
        categorias.map(

            categoriaId => ({

                material_id:
                    idMaterial,

                categoria_id:
                    categoriaId
            })
        );


    const {
        error: errorInsertar
    } =
        await supabaseClient

            .from(
                "material_categorias"
            )

            .insert(
                relaciones
            );


    if (errorInsertar) {

        throw errorInsertar;
    }
}


// =========================================================
// GUARDAR MATERIAL
// =========================================================

formMaterial?.addEventListener(

    "submit",

    async event => {

        event.preventDefault();


        mostrarMensaje("");


        const id =
            materialId.value

                ? Number(
                    materialId.value
                )

                : null;


        const codigo =
            materialCodigo.value
                .trim();


        const nombre =
            materialNombre.value
                .trim();


        const cantidad =
            Number(
                materialCantidad.value
            );


        const descripcion =
            materialDescripcion.value
                .trim();


        const categorias =
            obtenerCategoriasSeleccionadas();


        if (!nombre) {

            mostrarMensaje(
                "Debe ingresar el nombre del material."
            );

            return;
        }


        if (
            !Number.isInteger(
                cantidad
            ) ||
            cantidad < 0
        ) {

            mostrarMensaje(
                "La cantidad debe ser un número entero igual o mayor a cero."
            );

            return;
        }


        if (
            categorias.length === 0
        ) {

            mostrarMensaje(
                "Seleccione al menos una categoría."
            );

            return;
        }


        btnGuardarMaterial.disabled =
            true;


        btnGuardarMaterial.textContent =
            "Guardando...";


        try {

            const archivo =
                materialImagen.files?.[0];


            let imagenUrl =
                imagenActualUrl;


            if (archivo) {

                imagenUrl =
                    await subirImagenMaterial(
                        archivo
                    );
            }


            const datosMaterial = {

                codigo:
                    codigo || null,

                nombre:
                    nombre,

                descripcion:
                    descripcion || null,

                cantidad_total:
                    cantidad,

                imagen_url:
                    imagenUrl,

                activo:
                    true,

                eliminado:
                    false,

                updated_at:
                    new Date()
                        .toISOString()
            };


            let idMaterialGuardado =
                id;


            if (id) {

                const {
                    error
                } =
                    await supabaseClient

                        .from(
                            "materiales_gabinete"
                        )

                        .update(
                            datosMaterial
                        )

                        .eq(
                            "id",
                            id
                        );


                if (error) {
                    throw error;
                }


            } else {

                delete datosMaterial
                    .updated_at;


                const {
                    data,
                    error
                } =
                    await supabaseClient

                        .from(
                            "materiales_gabinete"
                        )

                        .insert(
                            datosMaterial
                        )

                        .select(
                            "id"
                        )

                        .single();


                if (error) {
                    throw error;
                }


                idMaterialGuardado =
                    data.id;
            }


            await guardarCategoriasMaterial(

                idMaterialGuardado,

                categorias
            );


            mostrarMensaje(

                id
                    ? "Material actualizado correctamente."
                    : "Material registrado correctamente.",

                "ok"
            );


            limpiarFormularioMaterial();


            await cargarMateriales();


        } catch (error) {

            console.error(
                "Error guardando material:",
                error
            );


            mostrarMensaje(
                error.message ||
                "No se pudo guardar el material."
            );


        } finally {

            btnGuardarMaterial.disabled =
                false;


            btnGuardarMaterial.textContent =
                materialId.value
                    ? "Actualizar material"
                    : "Guardar material";
        }
    }
);
// =========================================================
// LIMPIAR FORMULARIO MATERIAL
// =========================================================

function limpiarFormularioMaterial() {

    if (!formMaterial) {
        return;
    }


    formMaterial.reset();


    materialId.value =
        "";


    materialCantidad.value =
        "1";


    imagenActualUrl =
        null;


    mostrarImagenFormulario(
        null
    );


    renderizarCategorias();


    tituloFormularioMaterial.textContent =
        "Registrar nuevo material";


    btnGuardarMaterial.textContent =
        "Guardar material";


    btnCancelarEdicion.classList.add(
        "oculto"
    );
}


// =========================================================
// NUEVO MATERIAL
// =========================================================

btnNuevoMaterial?.addEventListener(

    "click",

    () => {

        limpiarFormularioMaterial();

        mostrarMensaje("");


        contenedorFormularioMaterial
            ?.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "start"
            });
    }
);


// =========================================================
// CANCELAR EDICIÓN DE MATERIAL
// =========================================================

btnCancelarEdicion?.addEventListener(

    "click",

    () => {

        limpiarFormularioMaterial();

        mostrarMensaje("");
    }
);


// =========================================================
// CARGAR MATERIALES
// =========================================================

async function cargarMateriales() {

    if (listaMateriales) {

        listaMateriales.innerHTML =
            `
            <p>
                Cargando materiales...
            </p>
            `;
    }


    const {
        data: materiales,
        error
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
                cantidad_total,
                imagen_url,
                activo,
                eliminado,
                created_at
            `)

            .order(
                "nombre",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "Error cargando materiales:",
            error
        );


        if (listaMateriales) {

            listaMateriales.innerHTML =
                `
                <p class="mensaje-error">
                    No se pudieron cargar los materiales.
                </p>
                `;
        }


        return;
    }


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


    if (errorRelaciones) {

        console.error(
            "Error categorías materiales:",
            errorRelaciones
        );
    }


    relacionesCategoriasEdicion =
        relaciones || [];


    const mapaCategorias =
        new Map();


    (relaciones || [])
        .forEach(

            relacion => {

                if (
                    !mapaCategorias.has(
                        Number(
                            relacion.material_id
                        )
                    )
                ) {

                    mapaCategorias.set(

                        Number(
                            relacion.material_id
                        ),

                        []
                    );
                }


                mapaCategorias
                    .get(
                        Number(
                            relacion.material_id
                        )
                    )
                    .push(
                        Number(
                            relacion.categoria_id
                        )
                    );
            }
        );


    materialesCargados =
        (materiales || [])

            .map(

                material => ({

                    ...material,

                    categoria_ids:
                        mapaCategorias.get(
                            Number(
                                material.id
                            )
                        ) || []

                })
            );


    renderizarMateriales(
        materialesCargados
    );
}


// =========================================================
// OBTENER NOMBRE DE CATEGORÍA
// =========================================================

function obtenerNombreCategoria(
    id
) {

    const categoria =
        categoriasCargadas.find(

            item =>
                Number(item.id) ===
                Number(id)
        );


    return categoria
        ? categoria.nombre
        : "";
}


// =========================================================
// RENDERIZAR MATERIALES
// =========================================================

function renderizarMateriales(
    materiales
) {

    if (contadorMateriales) {

        contadorMateriales.textContent =
            `${materiales.length} material(es)`;
    }


    if (!listaMateriales) {
        return;
    }


    if (
        materiales.length === 0
    ) {

        listaMateriales.innerHTML =
            `
            <div class="lista-vacia">

                <span>
                    📦
                </span>

                <p>
                    No hay materiales registrados.
                </p>

            </div>
            `;


        return;
    }


    listaMateriales.innerHTML =

        materiales

            .map(

                material => {

                    const categorias =
                        material.categoria_ids

                            .map(
                                id =>
                                    obtenerNombreCategoria(
                                        id
                                    )
                            )

                            .filter(Boolean);


                    let estadoTexto =
                        "Disponible";


                    let estadoClase =
                        "estado-disponible";


                    if (
                        material.eliminado
                    ) {

                        estadoTexto =
                            "Retirado";


                        estadoClase =
                            "estado-retirado";


                    } else if (
                        !material.activo
                    ) {

                        estadoTexto =
                            "No disponible";


                        estadoClase =
                            "estado-no-disponible";
                    }


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
                                    class="material-card-imagen"
                                    loading="lazy"
                                >
                            `

                            : `
                                <div class="material-card-sin-imagen">
                                    📦
                                </div>
                            `;


                    const botones =
                        material.eliminado

                            ? `
                                <button
                                    type="button"
                                    class="btn-restaurar"
                                    onclick="restaurarMaterial(${material.id})"
                                >
                                    Restaurar
                                </button>
                            `

                            : `
                                <button
                                    type="button"
                                    class="btn-editar"
                                    onclick="editarMaterial(${material.id})"
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    class="btn-estado"
                                    onclick="cambiarEstadoMaterial(${material.id})"
                                >
                                    ${
                                        material.activo
                                            ? "No disponible"
                                            : "Habilitar"
                                    }
                                </button>

                                <button
                                    type="button"
                                    class="btn-quitar"
                                    onclick="quitarMaterial(${material.id})"
                                >
                                    Quitar
                                </button>
                            `;


                    return `
                        <article class="material-card">

                            <div class="material-imagen-wrapper">

                                ${imagen}

                                <span
                                    class="estado-material ${estadoClase}"
                                >
                                    ${estadoTexto}
                                </span>

                            </div>


                            <div class="material-card-contenido">

                                <div class="material-card-cabecera">

                                    <div>

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

                                    </div>


                                    <div class="material-cantidad">

                                        <strong>
                                            ${material.cantidad_total}
                                        </strong>

                                        <span>
                                            unidades
                                        </span>

                                    </div>

                                </div>


                                ${
                                    material.descripcion

                                        ? `
                                            <p class="material-descripcion">

                                                ${escaparHTML(
                                                    material.descripcion
                                                )}

                                            </p>
                                        `

                                        : ""
                                }


                                <div class="material-categorias">

                                    ${
                                        categorias.length

                                            ? categorias

                                                .map(
                                                    categoria => `
                                                        <span>
                                                            ${escaparHTML(
                                                                categoria
                                                            )}
                                                        </span>
                                                    `
                                                )

                                                .join("")

                                            : `
                                                <span>
                                                    Sin categoría
                                                </span>
                                            `
                                    }

                                </div>


                                <div class="material-acciones">

                                    ${botones}

                                </div>

                            </div>

                        </article>
                    `;
                }
            )

            .join("");
}


// =========================================================
// BUSCADOR DE MATERIALES
// =========================================================

buscarMaterial?.addEventListener(

    "input",

    () => {

        const termino =
            buscarMaterial.value

                .trim()

                .toLowerCase();


        if (!termino) {

            renderizarMateriales(
                materialesCargados
            );


            return;
        }


        const filtrados =
            materialesCargados.filter(

                material => {

                    const categorias =
                        material.categoria_ids

                            .map(
                                id =>
                                    obtenerNombreCategoria(
                                        id
                                    )
                            )

                            .join(" ");


                    const texto =
                        `
                        ${material.codigo || ""}
                        ${material.nombre || ""}
                        ${material.descripcion || ""}
                        ${categorias}
                        `
                            .toLowerCase();


                    return texto.includes(
                        termino
                    );
                }
            );


        renderizarMateriales(
            filtrados
        );
    }
);


// =========================================================
// EDITAR MATERIAL
// =========================================================

window.editarMaterial =
    async function (
        id
    ) {

        const material =
            materialesCargados.find(

                item =>
                    Number(item.id) ===
                    Number(id)
            );


        if (!material) {
            return;
        }


        materialId.value =
            material.id;


        materialCodigo.value =
            material.codigo || "";


        materialNombre.value =
            material.nombre || "";


        materialCantidad.value =
            material.cantidad_total;


        materialDescripcion.value =
            material.descripcion || "";


        imagenActualUrl =
            material.imagen_url ||
            null;


        mostrarImagenFormulario(
            imagenActualUrl
        );


        renderizarCategorias(
            material.categoria_ids
        );


        tituloFormularioMaterial.textContent =
            `Editar: ${material.nombre}`;


        btnGuardarMaterial.textContent =
            "Actualizar material";


        btnCancelarEdicion.classList.remove(
            "oculto"
        );


        mostrarMensaje(
            "Editando material.",
            "info"
        );


        mostrarPanelAdmin(
            "panelMateriales"
        );


        contenedorFormularioMaterial
            ?.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "start"
            });
    };


// =========================================================
// CAMBIAR DISPONIBLE / NO DISPONIBLE
// =========================================================

window.cambiarEstadoMaterial =
    async function (
        id
    ) {

        const material =
            materialesCargados.find(

                item =>
                    Number(item.id) ===
                    Number(id)
            );


        if (!material) {
            return;
        }


        const nuevoEstado =
            !material.activo;


        const texto =
            nuevoEstado

                ? "habilitar"

                : "marcar como no disponible";


        if (
            !confirm(
                `¿Deseas ${texto} "${material.nombre}"?`
            )
        ) {

            return;
        }


        const {
            error
        } =
            await supabaseClient

                .from(
                    "materiales_gabinete"
                )

                .update({

                    activo:
                        nuevoEstado,

                    updated_at:
                        new Date()
                            .toISOString()

                })

                .eq(
                    "id",
                    id
                );


        if (error) {

            alert(
                "No se pudo cambiar el estado del material."
            );


            console.error(error);


            return;
        }


        await cargarMateriales();
    };


// =========================================================
// QUITAR MATERIAL
// ELIMINACIÓN LÓGICA
// =========================================================

window.quitarMaterial =
    async function (
        id
    ) {

        const material =
            materialesCargados.find(

                item =>
                    Number(item.id) ===
                    Number(id)
            );


        if (!material) {
            return;
        }


        const confirmar =
            confirm(

                `¿Quitar "${material.nombre}" del catálogo?\n\n` +

                `No se borrará el historial de reservas.`
            );


        if (!confirmar) {
            return;
        }


        const {
            error
        } =
            await supabaseClient

                .from(
                    "materiales_gabinete"
                )

                .update({

                    activo:
                        false,

                    eliminado:
                        true,

                    updated_at:
                        new Date()
                            .toISOString()

                })

                .eq(
                    "id",
                    id
                );


        if (error) {

            console.error(
                "Error quitando material:",
                error
            );


            alert(
                "No se pudo quitar el material."
            );


            return;
        }


        await cargarMateriales();
    };


// =========================================================
// RESTAURAR MATERIAL
// =========================================================

window.restaurarMaterial =
    async function (
        id
    ) {

        const material =
            materialesCargados.find(

                item =>
                    Number(item.id) ===
                    Number(id)
            );


        if (!material) {
            return;
        }


        if (
            !confirm(
                `¿Restaurar "${material.nombre}" al catálogo?`
            )
        ) {

            return;
        }


        const {
            error
        } =
            await supabaseClient

                .from(
                    "materiales_gabinete"
                )

                .update({

                    activo:
                        true,

                    eliminado:
                        false,

                    updated_at:
                        new Date()
                            .toISOString()

                })

                .eq(
                    "id",
                    id
                );


        if (error) {

            console.error(
                "Error restaurando material:",
                error
            );


            alert(
                "No se pudo restaurar el material."
            );


            return;
        }


        await cargarMateriales();
    };


// =========================================================
// FECHAS - HELPERS
// =========================================================

function obtenerLunesAdmin(
    fecha
) {

    const resultado =
        new Date(
            fecha
        );


    resultado.setHours(
        12,
        0,
        0,
        0
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


    return resultado;
}


function sumarDiasAdmin(
    fecha,
    dias
) {

    const resultado =
        new Date(
            fecha
        );


    resultado.setDate(
        resultado.getDate() +
        dias
    );


    return resultado;
}


function fechaISOAdmin(
    fecha
) {

    const anio =
        fecha.getFullYear();


    const mes =
        String(
            fecha.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dia =
        String(
            fecha.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${anio}-${mes}-${dia}`;
}


function fechaCortaAdmin(
    fecha
) {

    return fecha.toLocaleDateString(
        "es-BO",
        {
            day:
                "2-digit",

            month:
                "2-digit"
        }
    );
}


function fechaLargaAdmin(
    fechaISO
) {

    if (!fechaISO) {
        return "";
    }


    const partes =
        fechaISO.split("-");


    if (
        partes.length !== 3
    ) {

        return fechaISO;
    }


    const fecha =
        new Date(

            Number(partes[0]),

            Number(partes[1]) - 1,

            Number(partes[2]),

            12,
            0,
            0
        );


    return fecha.toLocaleDateString(
        "es-BO",
        {
            weekday:
                "long",

            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric"
        }
    );
}


// =========================================================
// CABECERAS DE LA SEMANA
// =========================================================

function actualizarCabecerasAdmin() {

    const dias = [

        [
            "adminCabLunes",
            "Lunes",
            0
        ],

        [
            "adminCabMartes",
            "Martes",
            1
        ],

        [
            "adminCabMiercoles",
            "Miércoles",
            2
        ],

        [
            "adminCabJueves",
            "Jueves",
            3
        ],

        [
            "adminCabViernes",
            "Viernes",
            4
        ]
    ];


    dias.forEach(

        item => {

            const fecha =
                sumarDiasAdmin(

                    lunesSemanaAdmin,

                    item[2]
                );


            const elemento =
                document.getElementById(
                    item[0]
                );


            if (elemento) {

                elemento.innerHTML =
                    `
                    ${item[1]}

                    <small>
                        ${fechaCortaAdmin(
                            fecha
                        )}
                    </small>
                    `;
            }
        }
    );
}


// =========================================================
// NOMBRE DEL MATERIAL
// =========================================================

function nombreMaterialAdmin(
    id
) {

    const material =
        materialesAdmin.find(

            item =>
                Number(item.id) ===
                Number(id)
        );


    if (material) {

        return material.nombre;
    }


    const materialCatalogo =
        materialesCargados.find(

            item =>
                Number(item.id) ===
                Number(id)
        );


    return materialCatalogo
        ? materialCatalogo.nombre
        : "Material";
}


// =========================================================
// NOMBRE DEL DOCENTE
// =========================================================

function nombreDocenteAdmin(
    id
) {

    const perfil =
        perfilesAdmin.find(

            item =>
                item.id === id
        );


    return perfil

        ? (
            perfil.nombre ||
            perfil.usuario
        )

        : "Docente";
}


// =========================================================
// ESTADO DE RESERVA
// =========================================================

function etiquetaEstadoAdmin(
    estado
) {

    const mapa = {

        reservada: [
            "RESERVADA",
            "estado-reserva-reservada"
        ],

        entregada: [
            "ENTREGADA",
            "estado-reserva-entregada"
        ],

        parcial: [
            "PARCIAL",
            "estado-reserva-parcial"
        ],

        completada: [
            "COMPLETADA",
            "estado-reserva-completada"
        ],

        cancelada: [
            "CANCELADA",
            "estado-reserva-cancelada"
        ]
    };


    return mapa[estado] || [

        String(
            estado || ""
        ).toUpperCase(),

        ""
    ];
}


// =========================================================
// COMPROBAR SI UNA RESERVA TIENE OBSERVACIÓN DE ENTREGA
// =========================================================

function reservaTieneObservacionEntrega(
    reserva
) {

    if (
        reserva?.observacion_entrega
    ) {

        return true;
    }


    return detallesAdmin.some(

        detalle =>

            Number(
                detalle.reserva_id
            ) ===
            Number(
                reserva.id
            )

            &&

            Boolean(
                detalle.observacion_entrega
            )
    );
}
// =========================================================
// CARGAR RESERVAS DE LA SEMANA
// =========================================================

async function cargarReservasAdmin() {

    if (!cuerpoTablaReservasAdmin) {
        return;
    }


    if (!lunesSemanaAdmin) {

        lunesSemanaAdmin =
            obtenerLunesAdmin(
                new Date()
            );
    }


    const viernes =
        sumarDiasAdmin(
            lunesSemanaAdmin,
            4
        );


    if (textoSemanaAdmin) {

        textoSemanaAdmin.textContent =
            `${fechaISOAdmin(
                lunesSemanaAdmin
            )} al ${fechaISOAdmin(
                viernes
            )}`;
    }


    actualizarCabecerasAdmin();


    const inicio =
        fechaISOAdmin(
            lunesSemanaAdmin
        );


    const fin =
        fechaISOAdmin(
            viernes
        );


    cuerpoTablaReservasAdmin.innerHTML =
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
                estado,
                observacion_general,
                fecha_entrega,
                entregado_por,
                observacion_entrega,
                created_at,
                updated_at
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
            )

            .order(
                "horario",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "Error cargando reservas:",
            error
        );


        cuerpoTablaReservasAdmin.innerHTML =
            `
            <tr>

                <td colspan="6">
                    Error cargando reservas.
                </td>

            </tr>
            `;


        return;
    }


    reservasAdmin =
        reservas || [];


    const idsReservas =
        reservasAdmin.map(
            reserva =>
                reserva.id
        );


    detallesAdmin = [];


    if (
        idsReservas.length
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
                    entregado,
                    observacion,
                    observacion_entrega,
                    created_at,
                    updated_at
                `)

                .in(
                    "reserva_id",
                    idsReservas
                )

                .order(
                    "id",
                    {
                        ascending: true
                    }
                );


        if (errorDetalles) {

            console.error(
                "Error cargando detalles:",
                errorDetalles
            );


        } else {

            detallesAdmin =
                data || [];
        }
    }


    const idsMateriales = [

        ...new Set(

            detallesAdmin.map(
                detalle =>
                    Number(
                        detalle.material_id
                    )
            )
        )
    ];


    materialesAdmin = [];


    if (
        idsMateriales.length
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
                    nombre,
                    codigo,
                    descripcion,
                    cantidad_total,
                    imagen_url,
                    activo,
                    eliminado
                `)

                .in(
                    "id",
                    idsMateriales
                );


        if (errorMateriales) {

            console.error(
                "Error cargando nombres de materiales:",
                errorMateriales
            );


        } else {

            materialesAdmin =
                data || [];
        }
    }


    const idsUsuarios = [

        ...new Set(

            reservasAdmin.map(
                reserva =>
                    reserva.usuario_id
            )
        )
    ];


    perfilesAdmin = [];


    if (
        idsUsuarios.length
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
                    idsUsuarios
                );


        if (errorPerfiles) {

            console.error(
                "Error cargando docentes:",
                errorPerfiles
            );


        } else {

            perfilesAdmin =
                data || [];
        }
    }


    renderizarReservasAdmin();

    renderizarEntregasPendientes();
}


// =========================================================
// MATERIALES DE UNA RESERVA
// =========================================================

function obtenerDetallesReservaAdmin(
    reservaId
) {

    return detallesAdmin.filter(

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
// BOTONES SEGÚN ESTADO
// =========================================================

function obtenerBotonesReservaAdmin(
    reserva
) {

    if (
        reserva.estado ===
        "reservada"
    ) {

        return `
            <button
                type="button"
                class="btn-gestionar-entrega"
                onclick="abrirConfirmarEntrega(${reserva.id})"
            >
                ✓ Material entregado
            </button>

            <button
                type="button"
                class="btn-editar"
                onclick="abrirEditarReservaAdmin(${reserva.id})"
            >
                ✏ Editar
            </button>

            <button
                type="button"
                class="btn-cancelar-reserva-admin"
                onclick="cancelarReservaAdmin(${reserva.id})"
            >
                Cancelar
            </button>
        `;
    }


    if (
        reserva.estado ===
            "entregada" ||

        reserva.estado ===
            "parcial"
    ) {

        return `
            <button
                type="button"
                class="btn-gestionar-entrega"
                onclick="abrirEntrega(${reserva.id})"
            >
                ↩ Gestionar devolución
            </button>
        `;
    }


    return "";
}


// =========================================================
// LISTA DE MATERIALES EN TARJETA DE RESERVA
// =========================================================

function htmlMaterialesReservaAdmin(
    reserva
) {

    const detalles =
        obtenerDetallesReservaAdmin(
            reserva.id
        );


    if (
        !detalles.length
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

                // ==========================================
                // ESTADO DEL MATERIAL
                // ==========================================

                let indicador =
                    "";


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


                        const cantidadDevuelta =
                            Number(
                                detalle.cantidad_devuelta || 0
                            );


                        const devuelto =
                            cantidad > 0 &&
                            cantidadDevuelta >= cantidad;


                        indicador =
                            devuelto

                                ? `
                                    <span
                                        title="Material devuelto"
                                        style="
                                            font-weight:700;
                                        "
                                    >
                                        ✓ DEVUELTO
                                    </span>
                                `

                                : `
                                    <span
                                        title="Material entregado y pendiente de devolución"
                                        style="
                                            font-weight:700;
                                        "
                                    >
                                        ✓ ENTREGADO
                                    </span>
                                `;

                    } else {

                        indicador = `
                            <span
                                title="Material no entregado"
                            >
                                — NO ENTREGADO
                            </span>
                        `;
                    }
                }


                // ==========================================
                // OBSERVACIÓN DE ENTREGA
                // ==========================================

                const observacionEntrega =
                    detalle.observacion_entrega
                        ?.trim();


                const htmlObservacionEntrega =
                    observacionEntrega

                        ? `
                            <div
                                style="
                                    margin-top:6px;
                                    padding:6px 8px;
                                    border-radius:6px;
                                    background:rgba(255, 193, 7, 0.12);
                                "
                            >

                                <strong>
                                    ⚠ Obs. entrega:
                                </strong>

                                ${escaparHTML(
                                    observacionEntrega
                                )}

                            </div>
                        `

                        : "";


                // ==========================================
                // OBSERVACIÓN DE DEVOLUCIÓN
                // ==========================================

                const observacionDevolucion =
                    detalle.observacion
                        ?.trim();


                const htmlObservacionDevolucion =
                    observacionDevolucion

                        ? `
                            <div
                                style="
                                    margin-top:6px;
                                    padding:6px 8px;
                                    border-radius:6px;
                                    background:rgba(33, 150, 243, 0.10);
                                "
                            >

                                <strong>
                                    ↩ Obs. devolución:
                                </strong>

                                ${escaparHTML(
                                    observacionDevolucion
                                )}

                            </div>
                        `

                        : "";


                // ==========================================
                // HTML DEL MATERIAL
                // ==========================================

                return `
                    <li
                        style="
                            margin-bottom:10px;
                        "
                    >

                        <div>

                            ${indicador}

                            ${detalle.cantidad} ×

                            <strong>
                                ${escaparHTML(
                                    nombreMaterialAdmin(
                                        detalle.material_id
                                    )
                                )}
                            </strong>

                        </div>


                        ${htmlObservacionEntrega}

                        ${htmlObservacionDevolucion}

                    </li>
                `;
            }
        )

        .join("");
}


// =========================================================
// RENDERIZAR TABLA SEMANAL
// =========================================================

function renderizarReservasAdmin() {

    if (!cuerpoTablaReservasAdmin) {
        return;
    }


    const dias =
        Array.from(

            {
                length: 5
            },

            (
                _,
                i
            ) =>
                fechaISOAdmin(

                    sumarDiasAdmin(
                        lunesSemanaAdmin,
                        i
                    )
                )
        );


    cuerpoTablaReservasAdmin.innerHTML =

        HORARIOS_ADMIN

            .map(

                horario => {

                    const celdas =

                        dias

                            .map(

                                fecha => {

                                    const reservas =
                                        reservasAdmin.filter(

                                            reserva =>

                                                reserva.fecha ===
                                                    fecha

                                                &&

                                                reserva.horario ===
                                                    horario
                                        );


                                    if (
                                        !reservas.length
                                    ) {

                                        return `
                                            <td class="celda-vacia">
                                                —
                                            </td>
                                        `;
                                    }


                                    const contenido =

                                        reservas

                                            .map(

                                                reserva => {

                                                    const estado =
                                                        etiquetaEstadoAdmin(
                                                            reserva.estado
                                                        );


                                                    const tieneObservacion =
                                                        reservaTieneObservacionEntrega(
                                                            reserva
                                                        );


                                                    const observacionGeneral =
                                                        reserva.observacion_entrega

                                                            ? `
                                                                <p>
                                                                    <strong>
                                                                        Obs. entrega:
                                                                    </strong>

                                                                    ${escaparHTML(
                                                                        reserva.observacion_entrega
                                                                    )}
                                                                </p>
                                                            `

                                                            : "";


                                                    return `
                                                        <div class="reserva-semanal-card">

                                                            <div>

                                                                <span
                                                                    class="estado-reserva-admin ${estado[1]}"
                                                                >
                                                                    ${estado[0]}
                                                                </span>


                                                                ${
                                                                    tieneObservacion

                                                                        ? `
                                                                            <span
                                                                                class="estado-reserva-admin"
                                                                                title="La entrega tiene observaciones"
                                                                            >
                                                                                ⚠ OBSERVADA
                                                                            </span>
                                                                        `

                                                                        : ""
                                                                }

                                                            </div>


                                                            <span class="reserva-docente-nombre">

                                                                ${escaparHTML(
                                                                    nombreDocenteAdmin(
                                                                        reserva.usuario_id
                                                                    )
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

                                                                ${htmlMaterialesReservaAdmin(
                                                                    reserva
                                                                )}

                                                            </ul>


                                                            ${observacionGeneral}


                                                            <div class="acciones-reserva-admin">

                                                                ${obtenerBotonesReservaAdmin(
                                                                    reserva
                                                                )}

                                                            </div>

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
// CAMBIO DE SEMANA
// =========================================================

btnSemanaAnteriorAdmin
    ?.addEventListener(

        "click",

        async () => {

            lunesSemanaAdmin =
                sumarDiasAdmin(
                    lunesSemanaAdmin,
                    -7
                );


            await cargarReservasAdmin();
        }
    );


btnSemanaSiguienteAdmin
    ?.addEventListener(

        "click",

        async () => {

            lunesSemanaAdmin =
                sumarDiasAdmin(
                    lunesSemanaAdmin,
                    7
                );


            await cargarReservasAdmin();
        }
    );


// =========================================================
// CANCELAR RESERVA ADMIN
// =========================================================

window.cancelarReservaAdmin =
    async function (
        reservaId
    ) {

        const reserva =
            reservasAdmin.find(

                item =>
                    Number(item.id) ===
                    Number(reservaId)
            );


        if (!reserva) {

            alert(
                "No se encontró la reserva."
            );

            return;
        }


        if (
            reserva.estado !==
            "reservada"
        ) {

            alert(
                "Esta reserva ya tiene movimiento de material y no puede cancelarse."
            );

            return;
        }


        if (
            !confirm(
                "¿Cancelar esta reserva?\n\nLos materiales volverán a estar disponibles para ese horario."
            )
        ) {

            return;
        }


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


            if (mensajeReservasAdmin) {

                mensajeReservasAdmin.className =
                    "mensaje-admin mensaje-ok";


                mensajeReservasAdmin.textContent =
                    "Reserva cancelada correctamente.";
            }


            await cargarReservasAdmin();


        } catch (error) {

            console.error(
                "Error cancelando reserva:",
                error
            );


            if (mensajeReservasAdmin) {

                mensajeReservasAdmin.className =
                    "mensaje-admin mensaje-error";


                mensajeReservasAdmin.textContent =
                    error.message ||
                    "No se pudo cancelar la reserva.";
            }
        }
    };


// =========================================================
// ABRIR CONFIRMACIÓN DE ENTREGA FÍSICA
// =========================================================

window.abrirConfirmarEntrega =
    function (
        reservaId
    ) {

        const reserva =
            reservasAdmin.find(

                item =>
                    Number(item.id) ===
                    Number(reservaId)
            );


        if (!reserva) {

            alert(
                "No se encontró la reserva."
            );

            return;
        }


        if (
            reserva.estado !==
            "reservada"
        ) {

            alert(
                "Esta reserva ya fue procesada."
            );

            return;
        }


        const detalles =
            obtenerDetallesReservaAdmin(
                reserva.id
            );


        if (
            !detalles.length
        ) {

            alert(
                "La reserva no contiene materiales."
            );

            return;
        }


        reservaEntregaFisicaActual =
            reserva;


        if (tituloConfirmarEntrega) {

            tituloConfirmarEntrega.textContent =
                "Confirmar entrega de materiales";
        }


        if (datosConfirmarEntrega) {

            datosConfirmarEntrega.innerHTML =
                `
                <strong>
                    Docente:
                </strong>

                ${escaparHTML(
                    nombreDocenteAdmin(
                        reserva.usuario_id
                    )
                )}

                <br>

                <strong>
                    Fecha:
                </strong>

                ${escaparHTML(
                    reserva.fecha
                )}

                ·

                <strong>
                    Horario:
                </strong>

                ${escaparHTML(
                    reserva.horario
                )}

                <br>

                <strong>
                    Grupo:
                </strong>

                ${escaparHTML(
                    reserva.grupo
                )}

                <br>

                <strong>
                    Tema:
                </strong>

                ${escaparHTML(
                    reserva.tema
                )}
                `;
        }


        detalleConfirmarEntrega.innerHTML =

            detalles

                .map(

                    detalle => `
                        <div
                            class="entrega-detalle-item"
                            data-detalle-id="${detalle.id}"
                        >

                            <label>

                                <input
                                    type="checkbox"
                                    class="check-entrega-fisica"
                                    data-detalle-id="${detalle.id}"
                                >

                                <strong>

                                    ${detalle.cantidad} ×

                                    ${escaparHTML(
                                        nombreMaterialAdmin(
                                            detalle.material_id
                                        )
                                    )}

                                </strong>

                            </label>


                            <div class="campo-admin">

                                <label
                                    for="observacionEntregaDetalle${detalle.id}"
                                >
                                    Observación
                                </label>

                                <input
                                    type="text"
                                    id="observacionEntregaDetalle${detalle.id}"
                                    class="observacion-entrega-detalle"
                                    data-detalle-id="${detalle.id}"
                                    placeholder="Opcional. Estado al momento de entregar..."
                                >

                            </div>

                        </div>
                    `
                )

                .join("");


        if (observacionGeneralEntrega) {

            observacionGeneralEntrega.value =
                "";
        }


        if (mensajeConfirmarEntrega) {

            mensajeConfirmarEntrega.textContent =
                "";


            mensajeConfirmarEntrega.className =
                "mensaje-admin";
        }


        mostrarPanelAdmin(
            "panelConfirmarEntrega"
        );


        panelConfirmarEntrega
            ?.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "start"
            });
    };


// =========================================================
// CANCELAR / VOLVER DESDE ENTREGA FÍSICA
// =========================================================

btnCancelarConfirmarEntrega
    ?.addEventListener(

        "click",

        () => {

            reservaEntregaFisicaActual =
                null;


            if (detalleConfirmarEntrega) {

                detalleConfirmarEntrega.innerHTML =
                    "";
            }


            if (observacionGeneralEntrega) {

                observacionGeneralEntrega.value =
                    "";
            }


            mostrarPanelAdmin(
                "panelReservas"
            );
        }
    );


// =========================================================
// GUARDAR ENTREGA FÍSICA
// =========================================================

btnConfirmarEntregaMaterial
    ?.addEventListener(

        "click",

        async () => {

            if (
                !reservaEntregaFisicaActual
            ) {

                return;
            }


            const detalles =
                obtenerDetallesReservaAdmin(
                    reservaEntregaFisicaActual.id
                );


            const payload =
                detalles.map(

                    detalle => {

                        const check =
                            document.querySelector(
                                `.check-entrega-fisica[data-detalle-id="${detalle.id}"]`
                            );


                        const inputObservacion =
                            document.querySelector(
                                `.observacion-entrega-detalle[data-detalle-id="${detalle.id}"]`
                            );


                        return {

                            detalle_id:
                                Number(
                                    detalle.id
                                ),

                            entregado:
                                Boolean(
                                    check?.checked
                                ),

                            observacion:
                                inputObservacion
                                    ?.value
                                    ?.trim() ||
                                null
                        };
                    }
                );


            const cantidadMarcados =
                payload.filter(
                    item =>
                        item.entregado
                ).length;


            if (
                cantidadMarcados === 0
            ) {

                mensajeConfirmarEntrega.className =
                    "mensaje-admin mensaje-error";


                mensajeConfirmarEntrega.textContent =
                    "Debe marcar al menos un material como entregado.";


                return;
            }


            const confirmar =
                confirm(

                    `Se marcarán ${cantidadMarcados} material(es) como entregados.\n\n` +

                    `¿Confirmar la entrega física al docente?`
                );


            if (!confirmar) {
                return;
            }


            btnConfirmarEntregaMaterial.disabled =
                true;


            btnConfirmarEntregaMaterial.textContent =
                "Guardando entrega...";


            try {

                const {
                    error
                } =
                    await supabaseClient.rpc(

                        "registrar_entrega_material",

                        {
                            p_reserva_id:
                                Number(
                                    reservaEntregaFisicaActual.id
                                ),

                            p_detalles:
                                payload,

                            p_observacion_general:
                                observacionGeneralEntrega
                                    ?.value
                                    ?.trim() ||
                                null
                        }
                    );


                if (error) {
                    throw error;
                }


                const reservaIdProcesada =
                    reservaEntregaFisicaActual.id;


                reservaEntregaFisicaActual =
                    null;


                mensajeReservasAdmin.className =
                    "mensaje-admin mensaje-ok";


                mensajeReservasAdmin.textContent =
                    `Entrega de la reserva #${reservaIdProcesada} registrada correctamente.`;


                await cargarReservasAdmin();


                mostrarPanelAdmin(
                    "panelReservas"
                );


            } catch (error) {

                console.error(
                    "Error registrando entrega:",
                    error
                );


                mensajeConfirmarEntrega.className =
                    "mensaje-admin mensaje-error";


                mensajeConfirmarEntrega.textContent =
                    error.message ||
                    "No se pudo registrar la entrega.";
            }


            btnConfirmarEntregaMaterial.disabled =
                false;


            btnConfirmarEntregaMaterial.textContent =
                "✓ Confirmar entrega";
        }
    );


// =========================================================
// RESERVAS PENDIENTES DE DEVOLUCIÓN
// =========================================================

function renderizarEntregasPendientes() {

    if (!listaEntregasPendientes) {
        return;
    }


    const pendientes =
        reservasAdmin.filter(

            reserva =>

                reserva.estado ===
                    "entregada"

                ||

                reserva.estado ===
                    "parcial"
        );


    if (
        !pendientes.length
    ) {

        listaEntregasPendientes.innerHTML =
            `
            <div class="lista-vacia">

                <span>
                    ✅
                </span>

                <p>
                    No hay materiales pendientes de devolución esta semana.
                </p>

            </div>
            `;


        return;
    }


    listaEntregasPendientes.innerHTML =

        pendientes

            .map(

                reserva => {

                    const detallesEntregados =
                        obtenerDetallesReservaAdmin(
                            reserva.id
                        )

                            .filter(
                                detalle =>
                                    detalle.entregado ===
                                    true
                            );


                    const cantidadPendiente =
                        detallesEntregados

                            .reduce(

                                (
                                    total,
                                    detalle
                                ) =>

                                    total +

                                    Math.max(
                                        0,
                                        Number(
                                            detalle.cantidad
                                        ) -
                                        Number(
                                            detalle.cantidad_devuelta ||
                                            0
                                        )
                                    ),

                                0
                            );


                    return `
                        <div class="entrega-card">

                            <div>

                                <span class="entrega-fecha">

                                    ${escaparHTML(
                                        reserva.fecha
                                    )}

                                    ·

                                    ${escaparHTML(
                                        reserva.horario
                                    )}

                                </span>


                                <h3>

                                    ${escaparHTML(
                                        nombreDocenteAdmin(
                                            reserva.usuario_id
                                        )
                                    )}

                                </h3>


                                <p>

                                    Grupo:

                                    ${escaparHTML(
                                        reserva.grupo
                                    )}

                                </p>


                                <p>

                                    Tema:

                                    ${escaparHTML(
                                        reserva.tema
                                    )}

                                </p>


                                <p>

                                    Pendiente de devolución:

                                    <strong>
                                        ${cantidadPendiente}
                                    </strong>

                                    unidad(es)

                                </p>

                            </div>


                            <button
                                type="button"
                                class="btn-gestionar-entrega"
                                onclick="abrirEntrega(${reserva.id})"
                            >
                                ↩ Gestionar devolución
                            </button>

                        </div>
                    `;
                }
            )

            .join("");
}
// =========================================================
// ABRIR GESTIÓN DE DEVOLUCIÓN
// =========================================================

// =========================================================
// ABRIR GESTIÓN DE DEVOLUCIÓN
// =========================================================

window.abrirEntrega =
    function (reservaId) {

        const reserva =
            reservasAdmin.find(
                item =>
                    Number(item.id) ===
                    Number(reservaId)
            );


        if (!reserva) {

            alert(
                "No se encontró la reserva."
            );

            return;
        }


        if (
            reserva.estado !== "entregada" &&
            reserva.estado !== "parcial"
        ) {

            alert(
                "Esta reserva no tiene materiales pendientes de devolución."
            );

            return;
        }


        const detalles =
            obtenerDetallesReservaAdmin(
                reserva.id
            )
            .filter(
                detalle =>
                    detalle.entregado === true
            );


        if (!detalles.length) {

            alert(
                "Esta reserva no tiene materiales marcados como entregados."
            );

            return;
        }


        reservaEntregaActual =
            reserva;


        if (tituloGestionEntrega) {

            tituloGestionEntrega.textContent =
                `Devolución - Reserva #${reserva.id}`;
        }


        if (datosGestionEntrega) {

            datosGestionEntrega.innerHTML = `
                <strong>Docente:</strong>
                ${escaparHTML(
                    nombreDocenteAdmin(
                        reserva.usuario_id
                    )
                )}

                <br>

                <strong>Fecha:</strong>
                ${escaparHTML(reserva.fecha)}

                ·

                <strong>Horario:</strong>
                ${escaparHTML(reserva.horario)}

                <br>

                <strong>Grupo:</strong>
                ${escaparHTML(reserva.grupo)}

                <br>

                <strong>Tema:</strong>
                ${escaparHTML(reserva.tema)}
            `;
        }


        if (detalleGestionEntrega) {

            detalleGestionEntrega.innerHTML =
                detalles
                    .map(
                        detalle => {

                            const cantidad =
                                Number(
                                    detalle.cantidad
                                );


                            const yaDevuelto =
                                Number(
                                    detalle.cantidad_devuelta || 0
                                ) >= cantidad;


                            const observacionEntrega =
                                detalle.observacion_entrega
                                    ?.trim();


                            const observacionDevolucion =
                                detalle.observacion
                                    ?.trim();


                            return `
                                <div
                                    class="detalle-entrega-item"
                                    data-detalle-id="${detalle.id}"
                                >

                                    <div class="detalle-entrega-info">

                                        <h4>
                                            ${escaparHTML(
                                                nombreMaterialAdmin(
                                                    detalle.material_id
                                                )
                                            )}
                                        </h4>

                                        <p>
                                            Cantidad entregada:
                                            <strong>
                                                ${cantidad}
                                            </strong>
                                        </p>

                                    </div>


                                    <div class="campo-admin">

                                        <label
                                            style="
                                                display:flex;
                                                align-items:center;
                                                gap:10px;
                                                cursor:pointer;
                                            "
                                        >

                                            <input
                                                type="checkbox"
                                                class="check-devuelto"
                                                data-detalle-id="${detalle.id}"
                                                ${yaDevuelto
                                                    ? "checked disabled"
                                                    : ""}
                                                style="
                                                    width:20px;
                                                    height:20px;
                                                "
                                            >

                                            <strong>
                                                ${
                                                    yaDevuelto
                                                        ? "Material devuelto"
                                                        : "Marcar como devuelto"
                                                }
                                            </strong>

                                        </label>

                                    </div>


                                    ${
                                        observacionEntrega
                                            ? `
                                                <div
                                                    class="mensaje-admin mensaje-info"
                                                    style="margin-top:10px;"
                                                >

                                                    <strong>
                                                        Observación de entrega:
                                                    </strong>

                                                    <br>

                                                    ${escaparHTML(
                                                        observacionEntrega
                                                    )}

                                                </div>
                                            `
                                            : `
                                                <div
                                                    class="mensaje-admin"
                                                    style="margin-top:10px;"
                                                >

                                                    <strong>
                                                        Observación de entrega:
                                                    </strong>

                                                    Sin observaciones.

                                                </div>
                                            `
                                    }


                                    <div
                                        class="campo-admin"
                                        style="margin-top:10px;"
                                    >

                                        <label
                                            for="observacionDevolucion${detalle.id}"
                                        >
                                            Observación de devolución
                                        </label>


                                        <textarea
                                            id="observacionDevolucion${detalle.id}"
                                            class="observacion-devolucion"
                                            data-detalle-id="${detalle.id}"
                                            rows="3"
                                            placeholder="Ej.: equipo completo, falta cable, revisar conector..."
                                        >${escaparHTML(
                                            observacionDevolucion || ""
                                        )}</textarea>

                                    </div>

                                </div>
                            `;
                        }
                    )
                    .join("");
        }


        if (mensajeEntrega) {

            mensajeEntrega.textContent =
                "";

            mensajeEntrega.className =
                "mensaje-admin";
        }


        if (panelGestionEntrega) {

            panelGestionEntrega.classList.remove(
                "oculto"
            );
        }


        mostrarPanelAdmin(
            "panelEntregas"
        );


        setTimeout(
            () => {

                panelGestionEntrega
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            },
            150
        );
    };
// =========================================================
// CERRAR GESTIÓN DE DEVOLUCIÓN
// =========================================================

btnCerrarGestionEntrega
    ?.addEventListener(

        "click",

        () => {

            reservaEntregaActual =
                null;


            if (panelGestionEntrega) {

                panelGestionEntrega.classList.add(
                    "oculto"
                );
            }


            if (detalleGestionEntrega) {

                detalleGestionEntrega.innerHTML =
                    "";
            }


            if (mensajeEntrega) {

                mensajeEntrega.textContent =
                    "";

                mensajeEntrega.className =
                    "mensaje-admin";
            }
        }
    );


// =========================================================
// GUARDAR DEVOLUCIÓN
// =========================================================
// =========================================================
// GUARDAR DEVOLUCIÓN
// =========================================================

btnGuardarDevolucion
    ?.addEventListener(

        "click",

        async () => {

            if (!reservaEntregaActual) {

                return;
            }


            const detalles =
                obtenerDetallesReservaAdmin(
                    reservaEntregaActual.id
                )
                .filter(
                    detalle =>
                        detalle.entregado === true
                );


            if (!detalles.length) {

                return;
            }


            const payload =
                detalles.map(
                    detalle => {

                        const check =
                            document.querySelector(
                                `.check-devuelto[data-detalle-id="${detalle.id}"]`
                            );


                        const inputObservacion =
                            document.querySelector(
                                `.observacion-devolucion[data-detalle-id="${detalle.id}"]`
                            );


                        const yaDevuelto =
                            Number(
                                detalle.cantidad_devuelta || 0
                            ) >=
                            Number(
                                detalle.cantidad
                            );


                        return {

                            detalle_id:
                                Number(
                                    detalle.id
                                ),

                            /*
                             * Si ya estaba devuelto,
                             * permanece devuelto.
                             *
                             * Si todavía estaba pendiente,
                             * tomamos el valor del checkbox.
                             */

                            devuelto:
                                yaDevuelto ||
                                Boolean(
                                    check?.checked
                                ),

                            observacion:
                                inputObservacion
                                    ?.value
                                    ?.trim() ||
                                null
                        };
                    }
                );


            const nuevosDevueltos =
                detalles.filter(
                    detalle => {

                        const yaDevuelto =
                            Number(
                                detalle.cantidad_devuelta || 0
                            ) >=
                            Number(
                                detalle.cantidad
                            );


                        if (yaDevuelto) {

                            return false;
                        }


                        const check =
                            document.querySelector(
                                `.check-devuelto[data-detalle-id="${detalle.id}"]`
                            );


                        return Boolean(
                            check?.checked
                        );
                    }
                );


            const hayObservaciones =
                payload.some(
                    item =>
                        Boolean(
                            item.observacion
                        )
                );


            /*
             * Permitimos guardar aunque no haya un nuevo
             * material devuelto si el administrador escribió
             * una observación.
             */

            if (
                nuevosDevueltos.length === 0 &&
                !hayObservaciones
            ) {

                mensajeEntrega.className =
                    "mensaje-admin mensaje-error";


                mensajeEntrega.textContent =
                    "Marca al menos un material como devuelto o registra una observación.";


                return;
            }


            if (
                !confirm(
                    nuevosDevueltos.length > 0

                        ? "¿Registrar los materiales marcados como devueltos?"

                        : "¿Guardar las observaciones de devolución?"
                )
            ) {

                return;
            }


            btnGuardarDevolucion.disabled =
                true;


            btnGuardarDevolucion.textContent =
                "Guardando...";


            try {

                const {
                    error
                } =
                    await supabaseClient.rpc(

                        "registrar_devolucion_material",

                        {
                            p_reserva_id:
                                Number(
                                    reservaEntregaActual.id
                                ),

                            p_detalles:
                                payload
                        }
                    );


                if (error) {

                    throw error;
                }


                const idProcesado =
                    reservaEntregaActual.id;


                reservaEntregaActual =
                    null;


                if (panelGestionEntrega) {

                    panelGestionEntrega.classList.add(
                        "oculto"
                    );
                }


                if (detalleGestionEntrega) {

                    detalleGestionEntrega.innerHTML =
                        "";
                }


                await cargarReservasAdmin();


                if (mensajeEntrega) {

                    mensajeEntrega.className =
                        "mensaje-admin mensaje-ok";


                    mensajeEntrega.textContent =
                        `Devolución de la reserva #${idProcesado} actualizada correctamente.`;
                }


            } catch (error) {

                console.error(
                    "Error registrando devolución:",
                    error
                );


                mensajeEntrega.className =
                    "mensaje-admin mensaje-error";


                mensajeEntrega.textContent =
                    error.message ||
                    "No se pudo registrar la devolución.";
            }


            btnGuardarDevolucion.disabled =
                false;


            btnGuardarDevolucion.textContent =
                "Guardar devolución";
        }
    );

// =========================================================
// ABRIR EDICIÓN DE RESERVA
// =========================================================

window.abrirEditarReservaAdmin =
    async function (
        reservaId
    ) {

        const reserva =
            reservasAdmin.find(

                item =>
                    Number(item.id) ===
                    Number(reservaId)
            );


        if (!reserva) {

            alert(
                "No se encontró la reserva."
            );

            return;
        }


        if (
            reserva.estado !==
            "reservada"
        ) {

            alert(
                "Solo pueden editarse reservas que todavía no fueron entregadas."
            );

            return;
        }


        reservaEdicionActual =
            reserva;


        if (editarReservaId) {

            editarReservaId.value =
                reserva.id;
        }


        if (editarReservaDocente) {

            editarReservaDocente.innerHTML =
                `
                <strong>
                    ${escaparHTML(
                        nombreDocenteAdmin(
                            reserva.usuario_id
                        )
                    )}
                </strong>

                <br>

                La reserva pertenece a este docente.
                `;
        }


        editarReservaFecha.value =
            reserva.fecha;


        editarReservaHorario.value =
            reserva.horario;


        editarReservaGrupo.value =
            reserva.grupo || "";


        editarReservaTema.value =
            reserva.tema || "";


        editarBuscarMaterial.value =
            "";


        editarFiltroCategoria.value =
            "";


        if (mensajeEditarReserva) {

            mensajeEditarReserva.textContent =
                "";

            mensajeEditarReserva.className =
                "mensaje-admin";
        }


        const detalles =
            obtenerDetallesReservaAdmin(
                reserva.id
            );


        carritoEdicionReserva =
            detalles.map(

                detalle => ({

                    material_id:
                        Number(
                            detalle.material_id
                        ),

                    cantidad:
                        Number(
                            detalle.cantidad
                        )
                })
            );


        mostrarPanelAdmin(
            "panelEditarReserva"
        );


        renderizarCarritoEdicion();


        await cargarDisponibilidadEdicion();


        panelEditarReserva
            ?.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "start"
            });
    };


// =========================================================
// CARGAR DISPONIBILIDAD PARA EDITAR
// =========================================================

async function cargarDisponibilidadEdicion() {

    if (
        !reservaEdicionActual ||
        !editarReservaFecha?.value ||
        !editarReservaHorario?.value
    ) {

        if (editarCatalogoMateriales) {

            editarCatalogoMateriales.innerHTML =
                `
                <p>
                    Selecciona fecha y horario.
                </p>
                `;
        }


        return;
    }


    if (editarCatalogoMateriales) {

        editarCatalogoMateriales.innerHTML =
            `
            <p>
                Consultando disponibilidad...
            </p>
            `;
    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient.rpc(

                "obtener_disponibilidad_material",

                {
                    p_fecha:
                        editarReservaFecha.value,

                    p_horario:
                        editarReservaHorario.value
                }
            );


        if (error) {
            throw error;
        }


        /*
         * La RPC normal incluye la reserva que estamos
         * editando dentro de "cantidad_reservada".
         *
         * Para editar correctamente debemos devolver
         * temporalmente al disponible la cantidad que
         * pertenece a ESTA reserva.
         */

        const cantidadesReservaActual =
            new Map();


        carritoEdicionReserva
            .forEach(

                item => {

                    cantidadesReservaActual.set(

                        Number(
                            item.material_id
                        ),

                        Number(
                            item.cantidad
                        )
                    );
                }
            );


        disponibilidadEdicion =
            (data || [])

                .map(

                    material => {

                        const cantidadPropia =
                            cantidadesReservaActual.get(
                                Number(
                                    material.material_id
                                )
                            ) || 0;


                        return {

                            ...material,

                            cantidad_disponible_edicion:

                                Number(
                                    material.cantidad_disponible ||
                                    0
                                )

                                +

                                cantidadPropia
                        };
                    }
                );


        renderizarCatalogoEdicion();


    } catch (error) {

        console.error(
            "Error consultando disponibilidad:",
            error
        );


        editarCatalogoMateriales.innerHTML =
            `
            <p class="mensaje-error">
                ${
                    escaparHTML(
                        error.message ||
                        "No se pudo consultar la disponibilidad."
                    )
                }
            </p>
            `;
    }
}


// =========================================================
// FILTRAR CATÁLOGO DE EDICIÓN
// =========================================================

function obtenerMaterialesFiltradosEdicion() {

    const termino =
        editarBuscarMaterial
            ?.value
            ?.trim()
            ?.toLowerCase() ||
        "";


    const categoriaId =
        editarFiltroCategoria?.value

            ? Number(
                editarFiltroCategoria.value
            )

            : null;


    return disponibilidadEdicion.filter(

        material => {

            const materialId =
                Number(
                    material.material_id
                );


            const coincideCategoria =
                !categoriaId ||

                relacionesCategoriasEdicion
                    .some(

                        relacion =>

                            Number(
                                relacion.material_id
                            ) ===
                                materialId

                            &&

                            Number(
                                relacion.categoria_id
                            ) ===
                                categoriaId
                    );


            const texto =
                `
                ${material.codigo || ""}
                ${material.nombre || ""}
                ${material.descripcion || ""}
                `
                    .toLowerCase();


            const coincideTexto =
                !termino ||
                texto.includes(
                    termino
                );


            return (
                coincideCategoria &&
                coincideTexto
            );
        }
    );
}


// =========================================================
// RENDER CATÁLOGO DE EDICIÓN
// =========================================================

function renderizarCatalogoEdicion() {

    if (!editarCatalogoMateriales) {
        return;
    }


    const materiales =
        obtenerMaterialesFiltradosEdicion();


    if (!materiales.length) {

        editarCatalogoMateriales.innerHTML =
            `
            <div class="lista-vacia">

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


    editarCatalogoMateriales.innerHTML =

        materiales

            .map(

                material => {

                    const materialId =
                        Number(
                            material.material_id
                        );


                    const disponible =
                        Number(
                            material.cantidad_disponible_edicion ||
                            0
                        );


                    const seleccionado =
                        carritoEdicionReserva.find(

                            item =>
                                Number(
                                    item.material_id
                                ) ===
                                    materialId
                        );


                    const cantidadSeleccionada =
                        seleccionado
                            ? Number(
                                seleccionado.cantidad
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
                                    class="material-card-imagen"
                                    loading="lazy"
                                >
                            `

                            : `
                                <div class="material-card-sin-imagen">
                                    📦
                                </div>
                            `;


                    return `
                        <article class="material-card">

                            <div class="material-imagen-wrapper">

                                ${imagen}

                            </div>


                            <div class="material-card-contenido">

                                <span class="material-codigo">

                                    ${escaparHTML(
                                        material.codigo
                                    ) || "Sin código"}

                                </span>


                                <h3>

                                    ${escaparHTML(
                                        material.nombre
                                    )}

                                </h3>


                                ${
                                    material.descripcion

                                        ? `
                                            <p class="material-descripcion">

                                                ${escaparHTML(
                                                    material.descripcion
                                                )}

                                            </p>
                                        `

                                        : ""
                                }


                                <p>

                                    Disponible para editar:

                                    <strong>
                                        ${disponible}
                                    </strong>

                                </p>


                                ${
                                    cantidadSeleccionada > 0

                                        ? `
                                            <p>

                                                Actualmente seleccionado:

                                                <strong>
                                                    ${cantidadSeleccionada}
                                                </strong>

                                            </p>
                                        `

                                        : ""
                                }


                                <div class="campo-admin">

                                    <label
                                        for="editarCantidadMaterial${materialId}"
                                    >
                                        Cantidad
                                    </label>


                                    <input
                                        type="number"
                                        id="editarCantidadMaterial${materialId}"
                                        min="1"
                                        max="${Math.max(
                                            disponible,
                                            1
                                        )}"
                                        step="1"
                                        value="1"
                                        ${disponible <= 0
                                            ? "disabled"
                                            : ""}
                                    >

                                </div>


                                <button
                                    type="button"
                                    class="btn-principal btn-auto"
                                    onclick="agregarMaterialEdicion(${materialId})"
                                    ${disponible <= 0
                                        ? "disabled"
                                        : ""}
                                >
                                    + Agregar
                                </button>

                            </div>

                        </article>
                    `;
                }
            )

            .join("");
}


// =========================================================
// AGREGAR MATERIAL A LA EDICIÓN
// =========================================================

window.agregarMaterialEdicion =
    function (
        materialId
    ) {

        const material =
            disponibilidadEdicion.find(

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
                `editarCantidadMaterial${materialId}`
            );


        const cantidadAgregar =
            Number(
                input?.value
            );


        const disponible =
            Number(
                material.cantidad_disponible_edicion ||
                0
            );


        if (
            !Number.isInteger(
                cantidadAgregar
            ) ||
            cantidadAgregar <= 0
        ) {

            alert(
                "Ingrese una cantidad válida."
            );

            return;
        }


        const existente =
            carritoEdicionReserva.find(

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
            cantidadAgregar;


        if (
            nuevaCantidad >
            disponible
        ) {

            alert(
                `Solo existen ${disponible} unidad(es) disponibles para esta reserva.`
            );

            return;
        }


        if (existente) {

            existente.cantidad =
                nuevaCantidad;


        } else {

            carritoEdicionReserva.push({

                material_id:
                    Number(
                        materialId
                    ),

                cantidad:
                    cantidadAgregar
            });
        }


        renderizarCarritoEdicion();

        renderizarCatalogoEdicion();
    };


// =========================================================
// RENDER CARRITO DE EDICIÓN
// =========================================================

function renderizarCarritoEdicion() {

    if (!editarCarritoMateriales) {
        return;
    }


    if (
        !carritoEdicionReserva.length
    ) {

        editarCarritoMateriales.innerHTML =
            `
            <div class="lista-vacia">

                <span>
                    📦
                </span>

                <p>
                    No hay materiales seleccionados.
                </p>

            </div>
            `;


        return;
    }


    editarCarritoMateriales.innerHTML =

        carritoEdicionReserva

            .map(

                item => {

                    const material =
                        disponibilidadEdicion.find(

                            dato =>
                                Number(
                                    dato.material_id
                                ) ===
                                Number(
                                    item.material_id
                                )
                        );


                    const materialCatalogo =
                        materialesCargados.find(

                            dato =>
                                Number(
                                    dato.id
                                ) ===
                                Number(
                                    item.material_id
                                )
                        );


                    const nombre =
                        material?.nombre ||
                        materialCatalogo?.nombre ||
                        nombreMaterialAdmin(
                            item.material_id
                        );


                    const maximo =
                        material

                            ? Number(
                                material.cantidad_disponible_edicion ||
                                item.cantidad
                            )

                            : Number(
                                item.cantidad
                            );


                    return `
                        <div class="entrega-card">

                            <div>

                                <strong>

                                    ${escaparHTML(
                                        nombre
                                    )}

                                </strong>

                            </div>


                            <div class="campo-admin">

                                <label
                                    for="editarCarritoCantidad${item.material_id}"
                                >
                                    Cantidad
                                </label>


                                <input
                                    type="number"
                                    id="editarCarritoCantidad${item.material_id}"
                                    min="1"
                                    max="${Math.max(
                                        maximo,
                                        1
                                    )}"
                                    step="1"
                                    value="${item.cantidad}"
                                    onchange="cambiarCantidadEdicion(
                                        ${item.material_id},
                                        this.value
                                    )"
                                >

                            </div>


                            <button
                                type="button"
                                class="btn-quitar"
                                onclick="quitarMaterialEdicion(${item.material_id})"
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
// CAMBIAR CANTIDAD EN EDICIÓN
// =========================================================

window.cambiarCantidadEdicion =
    function (
        materialId,
        valor
    ) {

        const item =
            carritoEdicionReserva.find(

                dato =>
                    Number(
                        dato.material_id
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


        const material =
            disponibilidadEdicion.find(

                dato =>
                    Number(
                        dato.material_id
                    ) ===
                    Number(
                        materialId
                    )
            );


        const maximo =
            material

                ? Number(
                    material.cantidad_disponible_edicion ||
                    0
                )

                : Number(
                    item.cantidad
                );


        if (
            !Number.isInteger(
                cantidad
            ) ||
            cantidad <= 0 ||
            cantidad > maximo
        ) {

            alert(
                `La cantidad debe estar entre 1 y ${maximo}.`
            );


            renderizarCarritoEdicion();

            return;
        }


        item.cantidad =
            cantidad;


        renderizarCatalogoEdicion();
    };


// =========================================================
// QUITAR MATERIAL DE LA EDICIÓN
// =========================================================

window.quitarMaterialEdicion =
    function (
        materialId
    ) {

        carritoEdicionReserva =
            carritoEdicionReserva.filter(

                item =>
                    Number(
                        item.material_id
                    ) !==
                    Number(
                        materialId
                    )
            );


        renderizarCarritoEdicion();

        renderizarCatalogoEdicion();
    };


// =========================================================
// RECARGAR DISPONIBILIDAD AL CAMBIAR FECHA/HORARIO
// =========================================================

editarReservaFecha
    ?.addEventListener(

        "change",

        async () => {

            await cargarDisponibilidadEdicion();

            renderizarCarritoEdicion();
        }
    );


editarReservaHorario
    ?.addEventListener(

        "change",

        async () => {

            await cargarDisponibilidadEdicion();

            renderizarCarritoEdicion();
        }
    );


editarFiltroCategoria
    ?.addEventListener(

        "change",

        () => {

            renderizarCatalogoEdicion();
        }
    );


editarBuscarMaterial
    ?.addEventListener(

        "input",

        () => {

            renderizarCatalogoEdicion();
        }
    );
// =========================================================
// GUARDAR EDICIÓN DE RESERVA
// =========================================================

formEditarReserva
    ?.addEventListener(

        "submit",

        async event => {

            event.preventDefault();


            if (!reservaEdicionActual) {

                return;
            }


            if (
                reservaEdicionActual.estado !==
                "reservada"
            ) {

                mensajeEditarReserva.className =
                    "mensaje-admin mensaje-error";


                mensajeEditarReserva.textContent =
                    "Solo pueden editarse reservas que todavía no fueron entregadas.";


                return;
            }


            const grupo =
                editarReservaGrupo.value
                    .trim();


            const fecha =
                editarReservaFecha.value;


            const horario =
                editarReservaHorario.value;


            const tema =
                editarReservaTema.value
                    .trim();


            if (!grupo) {

                mensajeEditarReserva.className =
                    "mensaje-admin mensaje-error";


                mensajeEditarReserva.textContent =
                    "Debe ingresar el grupo.";


                return;
            }


            if (!fecha) {

                mensajeEditarReserva.className =
                    "mensaje-admin mensaje-error";


                mensajeEditarReserva.textContent =
                    "Debe seleccionar la fecha.";


                return;
            }


            if (
                !HORARIOS_ADMIN.includes(
                    horario
                )
            ) {

                mensajeEditarReserva.className =
                    "mensaje-admin mensaje-error";


                mensajeEditarReserva.textContent =
                    "Seleccione un horario válido.";


                return;
            }


            if (!tema) {

                mensajeEditarReserva.className =
                    "mensaje-admin mensaje-error";


                mensajeEditarReserva.textContent =
                    "Debe ingresar el tema o actividad.";


                return;
            }


            if (
                !carritoEdicionReserva.length
            ) {

                mensajeEditarReserva.className =
                    "mensaje-admin mensaje-error";


                mensajeEditarReserva.textContent =
                    "Debe seleccionar al menos un material.";


                return;
            }


            for (
                const item
                of carritoEdicionReserva
            ) {

                const cantidad =
                    Number(
                        item.cantidad
                    );


                if (
                    !Number.isInteger(
                        cantidad
                    ) ||
                    cantidad <= 0
                ) {

                    mensajeEditarReserva.className =
                        "mensaje-admin mensaje-error";


                    mensajeEditarReserva.textContent =
                        "Todas las cantidades deben ser números enteros mayores a cero.";


                    return;
                }


                const material =
                    disponibilidadEdicion.find(

                        dato =>
                            Number(
                                dato.material_id
                            ) ===
                            Number(
                                item.material_id
                            )
                    );


                if (
                    material &&
                    cantidad >
                    Number(
                        material.cantidad_disponible_edicion ||
                        0
                    )
                ) {

                    mensajeEditarReserva.className =
                        "mensaje-admin mensaje-error";


                    mensajeEditarReserva.textContent =
                        `No existe cantidad suficiente de ${material.nombre}.`;


                    return;
                }
            }


            if (
                !confirm(
                    "¿Guardar los cambios realizados en esta reserva?"
                )
            ) {

                return;
            }


            btnGuardarEdicionReserva.disabled =
                true;


            btnGuardarEdicionReserva.textContent =
                "Guardando cambios...";


            try {

                const materialesPayload =
                    carritoEdicionReserva.map(

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
                    error
                } =
                    await supabaseClient.rpc(

                        "editar_reserva_material",

                        {
                            p_reserva_id:
                                Number(
                                    reservaEdicionActual.id
                                ),

                            p_grupo:
                                grupo,

                            p_fecha:
                                fecha,

                            p_horario:
                                horario,

                            p_tema:
                                tema,

                            p_materiales:
                                materialesPayload
                        }
                    );


                if (error) {
                    throw error;
                }


                const idEditado =
                    reservaEdicionActual.id;


                reservaEdicionActual =
                    null;


                carritoEdicionReserva =
                    [];


                disponibilidadEdicion =
                    [];


                if (formEditarReserva) {

                    formEditarReserva.reset();
                }


                if (mensajeReservasAdmin) {

                    mensajeReservasAdmin.className =
                        "mensaje-admin mensaje-ok";


                    mensajeReservasAdmin.textContent =
                        `Reserva #${idEditado} actualizada correctamente.`;
                }


                /*
                 * Si el administrador cambió la fecha a otra
                 * semana, movemos automáticamente la vista
                 * hacia la semana nueva.
                 */

                const fechaNueva =
                    new Date(
                        `${fecha}T12:00:00`
                    );


                lunesSemanaAdmin =
                    obtenerLunesAdmin(
                        fechaNueva
                    );


                await cargarReservasAdmin();


                mostrarPanelAdmin(
                    "panelReservas"
                );


            } catch (error) {

                console.error(
                    "Error editando reserva:",
                    error
                );


                let mensaje =
                    error.message ||
                    "No se pudo editar la reserva.";


                /*
                 * El índice único de Supabase/PostgreSQL
                 * protege que un docente no tenga dos
                 * reservas activas en la misma fecha y
                 * horario desde 2026-09-18.
                 */

                if (
                    error?.code === "23505"
                ) {

                    mensaje =
                        "Este docente ya tiene una reserva para esa fecha y horario.";
                }


                mensajeEditarReserva.className =
                    "mensaje-admin mensaje-error";


                mensajeEditarReserva.textContent =
                    mensaje;
            }


            btnGuardarEdicionReserva.disabled =
                false;


            btnGuardarEdicionReserva.textContent =
                "💾 Guardar cambios";
        }
    );


// =========================================================
// CANCELAR EDICIÓN DE RESERVA
// =========================================================

btnCancelarEdicionReserva
    ?.addEventListener(

        "click",

        () => {

            reservaEdicionActual =
                null;


            carritoEdicionReserva =
                [];


            disponibilidadEdicion =
                [];


            if (formEditarReserva) {

                formEditarReserva.reset();
            }


            if (editarCatalogoMateriales) {

                editarCatalogoMateriales.innerHTML =
                    "";
            }


            if (editarCarritoMateriales) {

                editarCarritoMateriales.innerHTML =
                    "";
            }


            if (mensajeEditarReserva) {

                mensajeEditarReserva.textContent =
                    "";

                mensajeEditarReserva.className =
                    "mensaje-admin";
            }


            mostrarPanelAdmin(
                "panelReservas"
            );
        }
    );


// =========================================================
// PDF SEMANAL - MATERIAL DE GABINETE
// =========================================================

btnPDFReservasMaterial
    ?.addEventListener(

        "click",

        generarPDFReservasMaterial
    );


// =========================================================
// GENERAR PDF
// =========================================================

async function generarPDFReservasMaterial() {

    if (
        !reservasAdmin ||
        reservasAdmin.length === 0
    ) {

        alert(
            "No hay reservas para imprimir en esta semana."
        );


        return;
    }


    if (
        !window.jspdf ||
        !window.jspdf.jsPDF
    ) {

        alert(
            "No se pudo cargar el generador de PDF."
        );


        return;
    }


    const {
        jsPDF
    } =
        window.jspdf;


    const pdf =
        new jsPDF({

            orientation:
                "landscape",

            unit:
                "mm",

            format:
                "a4"
        });


    const anchoPagina =
        pdf.internal.pageSize
            .getWidth();


    const altoPagina =
        pdf.internal.pageSize
            .getHeight();


    const margenIzquierdo =
        8;


    const margenDerecho =
        8;


    const limiteInferior =
        altoPagina - 14;


    let numeroPagina =
        1;


    // =====================================================
    // FECHAS
    // =====================================================

    const lunes =
        lunesSemanaAdmin;


    const viernes =
        sumarDiasAdmin(
            lunesSemanaAdmin,
            4
        );


    const fechasSemana =
        Array.from(

            {
                length: 5
            },

            (
                _,
                i
            ) =>
                sumarDiasAdmin(
                    lunesSemanaAdmin,
                    i
                )
        );


    // =====================================================
    // PIE DE PÁGINA
    // =====================================================

    function dibujarPiePagina() {

        pdf.setFont(
            "helvetica",
            "normal"
        );


        pdf.setFontSize(
            8
        );


        pdf.setTextColor(
            90,
            90,
            90
        );


        pdf.text(

            "Sistema de Material de Gabinete · CETA",

            margenIzquierdo,

            altoPagina - 6
        );


        pdf.text(

            `Página ${numeroPagina}`,

            anchoPagina -
                margenDerecho,

            altoPagina - 6,

            {
                align:
                    "right"
            }
        );


        pdf.setTextColor(
            0,
            0,
            0
        );
    }


    // =====================================================
    // CABECERA PRINCIPAL
    // =====================================================

    function dibujarCabeceraPrincipal() {

        let y =
            8;


        // -------------------------------------------------
        // LOGO CETA
        // -------------------------------------------------

        try {

            const logo =
                document.querySelector(
                    ".admin-header img"
                );


            if (
                logo &&
                logo.complete &&
                logo.naturalWidth > 0
            ) {

                pdf.addImage(

                    logo,

                    "PNG",

                    9,
                    7,
                    22,
                    22
                );
            }


        } catch (error) {

            console.warn(
                "No se pudo añadir el logo al PDF.",
                error
            );
        }


        // -------------------------------------------------
        // TÍTULO
        // -------------------------------------------------

        pdf.setFont(
            "helvetica",
            "bold"
        );


        pdf.setFontSize(
            15
        );


        pdf.text(

            "SISTEMA DE MATERIAL DE GABINETE",

            anchoPagina / 2,

            y + 6,

            {
                align:
                    "center"
            }
        );


        pdf.setFontSize(
            12
        );


        pdf.text(

            "REGISTRO SEMANAL DE RESERVAS",

            anchoPagina / 2,

            y + 13,

            {
                align:
                    "center"
            }
        );


        pdf.setFont(
            "helvetica",
            "normal"
        );


        pdf.setFontSize(
            9
        );


        pdf.text(

            `Semana: ${fechaCompletaAdminPDF(
                lunes
            )} al ${fechaCompletaAdminPDF(
                viernes
            )}`,

            anchoPagina / 2,

            y + 20,

            {
                align:
                    "center"
            }
        );


        pdf.setDrawColor(
            190
        );


        pdf.line(

            margenIzquierdo,

            y + 25,

            anchoPagina -
                margenDerecho,

            y + 25
        );


        return y + 30;
    }


    // =====================================================
    // CABECERA PÁGINAS SIGUIENTES
    // =====================================================

    function dibujarCabeceraSecundaria() {

        pdf.setFont(
            "helvetica",
            "bold"
        );


        pdf.setFontSize(
            10
        );


        pdf.text(

            `Semana: ${fechaCompletaAdminPDF(
                lunes
            )} al ${fechaCompletaAdminPDF(
                viernes
            )}`,

            margenIzquierdo,

            10
        );


        pdf.setDrawColor(
            190
        );


        pdf.line(

            margenIzquierdo,

            14,

            anchoPagina -
                margenDerecho,

            14
        );


        return 18;
    }


    // =====================================================
    // DIMENSIONES DE TABLA
    // =====================================================

    const anchoDisponible =
        anchoPagina
        -
        margenIzquierdo
        -
        margenDerecho;


    const anchoHorario =
        25;


    const anchoDia =
        (
            anchoDisponible
            -
            anchoHorario
        ) / 5;


    // =====================================================
    // CABECERA DE TABLA
    // =====================================================

    function dibujarCabeceraTabla(
        y
    ) {

        const alto =
            14;


        // HORARIO

        pdf.setFillColor(
            17,
            28,
            42
        );


        pdf.rect(

            margenIzquierdo,

            y,

            anchoHorario,

            alto,

            "F"
        );


        pdf.setTextColor(
            255,
            255,
            255
        );


        pdf.setFont(
            "helvetica",
            "bold"
        );


        pdf.setFontSize(
            8
        );


        pdf.text(

            "HORARIO",

            margenIzquierdo +
                anchoHorario / 2,

            y + 8,

            {
                align:
                    "center"
            }
        );


        const nombresDias = [

            "LUNES",

            "MARTES",

            "MIÉRCOLES",

            "JUEVES",

            "VIERNES"
        ];


        for (
            let i = 0;
            i < 5;
            i++
        ) {

            const x =
                margenIzquierdo
                +
                anchoHorario
                +
                anchoDia * i;


            pdf.setFillColor(
                17,
                28,
                42
            );


            pdf.rect(

                x,

                y,

                anchoDia,

                alto,

                "F"
            );


            pdf.setFont(
                "helvetica",
                "bold"
            );


            pdf.setFontSize(
                8
            );


            pdf.text(

                nombresDias[i],

                x +
                    anchoDia / 2,

                y + 5,

                {
                    align:
                        "center"
                }
            );


            pdf.setFont(
                "helvetica",
                "normal"
            );


            pdf.setFontSize(
                7
            );


            pdf.text(

                fechaCortaAdmin(
                    fechasSemana[i]
                ),

                x +
                    anchoDia / 2,

                y + 10,

                {
                    align:
                        "center"
                }
            );
        }


        pdf.setTextColor(
            0,
            0,
            0
        );


        return y + alto;
    }
// =========================================================
// FECHA COMPLETA PARA PDF
// =========================================================

function fechaCompletaAdminPDF(
    fecha
) {

    return fecha.toLocaleDateString(
        "es-BO",
        {
            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric"
        }
    );
}


// =========================================================
// NUEVA PÁGINA
// =========================================================

function nuevaPagina() {

    dibujarPiePagina();


    pdf.addPage();


    numeroPagina++;


    let nuevaY =
        dibujarCabeceraSecundaria();


    nuevaY =
        dibujarCabeceraTabla(
            nuevaY
        );


    return nuevaY;
}


// =========================================================
// OBTENER MATERIALES DE UNA RESERVA
// =========================================================

function obtenerMaterialesReserva(
    reservaId
) {

    return detallesAdmin

        .filter(

            detalle =>

                Number(
                    detalle.reserva_id
                ) ===
                Number(
                    reservaId
                )
        )

        .map(

            detalle => {

                const nombre =
                    nombreMaterialAdmin(
                        detalle.material_id
                    );


                return {

                    nombre,

                    cantidad:
                        Number(
                            detalle.cantidad
                        )
                };
            }
        );
}


// =========================================================
// DIMENSIONES DEL CONTROL DE MATERIAL
//
// [ 2 ] Batería                         [ ]
// =========================================================

const altoFilaMaterial =
    6;


const anchoCantidad =
    8;


const anchoCheck =
    6;


const separacionMaterial =
    2;


// =========================================================
// CALCULAR ALTURA DE TARJETA
// =========================================================

function calcularAltoTarjeta(
    reserva,
    ancho
) {

    const materiales =
        obtenerMaterialesReserva(
            reserva.id
        );


    let alto =
        6;


    // -----------------------------------------------------
    // DOCENTE
    // -----------------------------------------------------

    const docente =
        nombreDocenteAdmin(
            reserva.usuario_id
        );


    const lineasDocente =
        pdf.splitTextToSize(

            `Docente: ${docente}`,

            ancho - 5
        );


    alto +=
        lineasDocente.length *
        3.5;


    // -----------------------------------------------------
    // GRUPO
    // -----------------------------------------------------

    const lineasGrupo =
        pdf.splitTextToSize(

            `Grupo: ${reserva.grupo}`,

            ancho - 5
        );


    alto +=
        lineasGrupo.length *
        3.5;


    // -----------------------------------------------------
    // TEMA
    // -----------------------------------------------------

    const lineasTema =
        pdf.splitTextToSize(

            `Tema: ${reserva.tema}`,

            ancho - 5
        );


    alto +=
        lineasTema.length *
        3.5;


    // Separación + título Materiales

    alto +=
        6;


    // -----------------------------------------------------
    // CADA MATERIAL
    // -----------------------------------------------------

    materiales.forEach(

        material => {

            const anchoNombre =
                ancho
                -
                5
                -
                anchoCantidad
                -
                anchoCheck
                -
                separacionMaterial *
                2;


            const lineasNombre =
                pdf.splitTextToSize(

                    material.nombre,

                    anchoNombre
                );


            const altoNombre =
                Math.max(

                    altoFilaMaterial,

                    lineasNombre.length *
                    3.2 +
                    2
                );


            alto +=
                altoNombre;
        }
    );


    alto +=
        4;


    return Math.max(
        alto,
        28
    );
}


// =========================================================
// DIBUJAR UNA FILA DE MATERIAL
//
// [ CANTIDAD ] NOMBRE                  [ CHECK ]
// =========================================================

function dibujarFilaMaterial(
    material,
    x,
    y,
    ancho
) {

    const padding =
        2.5;


    const xCantidad =
        x +
        padding;


    const xCheck =
        x
        +
        ancho
        -
        padding
        -
        anchoCheck;


    const xNombre =
        xCantidad
        +
        anchoCantidad
        +
        separacionMaterial;


    const anchoNombre =
        xCheck
        -
        separacionMaterial
        -
        xNombre;


    // -----------------------------------------------------
    // NOMBRE DEL MATERIAL
    // -----------------------------------------------------

    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(
        7
    );


    const lineasNombre =
        pdf.splitTextToSize(

            material.nombre,

            anchoNombre
        );


    const altoReal =
        Math.max(

            altoFilaMaterial,

            lineasNombre.length *
            3.2 +
            2
        );


    // -----------------------------------------------------
    // CASILLA CANTIDAD
    // -----------------------------------------------------

    pdf.setDrawColor(
        50,
        50,
        50
    );


    pdf.setLineWidth(
        0.35
    );


    pdf.rect(

        xCantidad,

        y,

        anchoCantidad,

        5
    );


    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(
        8
    );


    pdf.text(

        String(
            material.cantidad
        ),

        xCantidad +
            anchoCantidad / 2,

        y + 3.5,

        {
            align:
                "center"
        }
    );


    // -----------------------------------------------------
    // NOMBRE
    // -----------------------------------------------------

    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(
        7
    );


    pdf.text(

        lineasNombre,

        xNombre,

        y + 3.5
    );


    // -----------------------------------------------------
    // CASILLA MANUAL
    // -----------------------------------------------------

    pdf.setDrawColor(
        20,
        20,
        20
    );


    pdf.setLineWidth(
        0.45
    );


    pdf.rect(

        xCheck,

        y,

        anchoCheck,

        5
    );


    return altoReal;
}


// =========================================================
// DIBUJAR TARJETA DE RESERVA
// =========================================================

function dibujarTarjeta(
    reserva,
    x,
    y,
    ancho
) {

    const alto =
        calcularAltoTarjeta(
            reserva,
            ancho
        );


    // -----------------------------------------------------
    // FONDO
    // -----------------------------------------------------

    pdf.setFillColor(
        247,
        249,
        252
    );


    pdf.setDrawColor(
        205,
        215,
        225
    );


    pdf.roundedRect(

        x,

        y,

        ancho,

        alto,

        2,

        2,

        "FD"
    );


    const padding =
        2.5;


    let textoY =
        y + 5;


    // -----------------------------------------------------
    // ESTADO
    // -----------------------------------------------------

    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(
        6.5
    );


    pdf.text(

        String(
            reserva.estado ||
            ""
        ).toUpperCase(),

        x + padding,

        textoY
    );


    textoY +=
        4;


    // -----------------------------------------------------
    // DOCENTE
    // -----------------------------------------------------

    const docente =
        nombreDocenteAdmin(
            reserva.usuario_id
        );


    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(
        7
    );


    let lineas =
        pdf.splitTextToSize(

            `Docente: ${docente}`,

            ancho - 5
        );


    pdf.text(

        lineas,

        x + padding,

        textoY
    );


    textoY +=
        lineas.length *
        3.5;


    // -----------------------------------------------------
    // GRUPO
    // -----------------------------------------------------

    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(
        7
    );


    lineas =
        pdf.splitTextToSize(

            `Grupo: ${reserva.grupo}`,

            ancho - 5
        );


    pdf.text(

        lineas,

        x + padding,

        textoY
    );


    textoY +=
        lineas.length *
        3.5;


    // -----------------------------------------------------
    // TEMA
    // -----------------------------------------------------

    lineas =
        pdf.splitTextToSize(

            `Tema: ${reserva.tema}`,

            ancho - 5
        );


    pdf.text(

        lineas,

        x + padding,

        textoY
    );


    textoY +=
        lineas.length *
        3.5 +
        1;


    // -----------------------------------------------------
    // MATERIALES
    // -----------------------------------------------------

    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(
        7
    );


    pdf.text(

        "Materiales:",

        x + padding,

        textoY
    );


    textoY +=
        4;


    const materiales =
        obtenerMaterialesReserva(
            reserva.id
        );


    materiales.forEach(

        material => {

            const altoMaterial =
                dibujarFilaMaterial(

                    material,

                    x,

                    textoY,

                    ancho
                );


            textoY +=
                altoMaterial;
        }
    );


    return alto;
}


// =========================================================
// INICIAR DOCUMENTO
// =========================================================

let y =
    dibujarCabeceraPrincipal();


y =
    dibujarCabeceraTabla(
        y
    );


// =========================================================
// RECORRER LOS TRES HORARIOS
//
// Una misma franja puede continuar en varias páginas.
// =========================================================

for (
    const horario
    of HORARIOS_ADMIN
) {

    // -----------------------------------------------------
    // RESERVAS DE CADA DÍA
    // -----------------------------------------------------

    const reservasPorDia =
        [];


    for (
        let dia = 0;
        dia < 5;
        dia++
    ) {

        const fecha =
            fechaISOAdmin(
                fechasSemana[dia]
            );


        const reservasCelda =
            reservasAdmin.filter(

                reserva =>

                    reserva.fecha ===
                        fecha

                    &&

                    reserva.horario ===
                        horario

                    &&

                    reserva.estado !==
                        "cancelada"
            );


        reservasPorDia.push(
            reservasCelda
        );
    }


    // Posición que llevamos por cada día.

    const indices = [
        0,
        0,
        0,
        0,
        0
    ];


    let primeraParteHorario =
        true;


    // -----------------------------------------------------
    // CONTINUAR MIENTRAS HAYA RESERVAS
    // -----------------------------------------------------

    while (

        reservasPorDia.some(

            (
                reservas,
                dia
            ) =>

                indices[dia] <
                reservas.length
        )

        ||

        primeraParteHorario

    ) {

        primeraParteHorario =
            false;


        let espacioDisponible =
            limiteInferior -
            y;


        // -------------------------------------------------
        // POCO ESPACIO -> NUEVA PÁGINA
        // -------------------------------------------------

        if (
            espacioDisponible <
            30
        ) {

            y =
                nuevaPagina();


            espacioDisponible =
                limiteInferior -
                y;
        }


        // -------------------------------------------------
        // RESERVAS QUE CABEN EN ESTA PARTE
        // -------------------------------------------------

        const reservasPagina = [
            [],
            [],
            [],
            [],
            []
        ];


        let altoNecesarioPagina =
            20;


        for (
            let dia = 0;
            dia < 5;
            dia++
        ) {

            let altoCelda =
                6;


            let indice =
                indices[dia];


            while (

                indice <
                reservasPorDia[dia].length

            ) {

                const reserva =
                    reservasPorDia[dia][
                        indice
                    ];


                const altoTarjeta =
                    calcularAltoTarjeta(

                        reserva,

                        anchoDia - 4
                    );


                const altoConSeparacion =
                    altoTarjeta +
                    3;


                if (

                    altoCelda +
                    altoConSeparacion >

                    espacioDisponible

                ) {

                    break;
                }


                reservasPagina[dia]
                    .push(
                        reserva
                    );


                altoCelda +=
                    altoConSeparacion;


                indice++;
            }


            indices[dia] =
                indice;


            altoNecesarioPagina =
                Math.max(

                    altoNecesarioPagina,

                    altoCelda
                );
        }


        // -------------------------------------------------
        // COMPROBAR SI QUEDAN RESERVAS
        // -------------------------------------------------

        const cantidadEnEstaPagina =
            reservasPagina.reduce(

                (
                    total,
                    lista
                ) =>

                    total +
                    lista.length,

                0
            );


        const quedanReservas =
            reservasPorDia.some(

                (
                    reservas,
                    dia
                ) =>

                    indices[dia] <
                    reservas.length
            );


        // -------------------------------------------------
        // SEGURIDAD CONTRA BUCLE
        // -------------------------------------------------

        if (

            cantidadEnEstaPagina ===
                0

            &&

            quedanReservas

        ) {

            y =
                nuevaPagina();


            continue;
        }


        // -------------------------------------------------
        // ALTURA DE FILA
        // -------------------------------------------------

        const altoFila =
            Math.max(

                20,

                altoNecesarioPagina
            );


        // =================================================
        // COLUMNA HORARIO
        // =================================================

        pdf.setFillColor(
            241,
            245,
            249
        );


        pdf.setDrawColor(
            210,
            218,
            228
        );


        pdf.rect(

            margenIzquierdo,

            y,

            anchoHorario,

            altoFila,

            "FD"
        );


        pdf.setFont(
            "helvetica",
            "bold"
        );


        pdf.setFontSize(
            8
        );


        const textoHorario =
            quedanReservas

                ? `${horario.replace(
                    "-",
                    " - "
                )}\nCONT.`

                : horario.replace(
                    "-",
                    " - "
                );


        const lineasHorario =
            pdf.splitTextToSize(

                textoHorario,

                anchoHorario - 4
            );


        pdf.text(

            lineasHorario,

            margenIzquierdo +
                anchoHorario / 2,

            y +
                altoFila / 2,

            {
                align:
                    "center"
            }
        );


        // =================================================
        // CINCO DÍAS
        // =================================================

        for (
            let dia = 0;
            dia < 5;
            dia++
        ) {

            const x =
                margenIzquierdo
                +
                anchoHorario
                +
                anchoDia * dia;


            pdf.setFillColor(
                255,
                255,
                255
            );


            pdf.setDrawColor(
                210,
                218,
                228
            );


            pdf.rect(

                x,

                y,

                anchoDia,

                altoFila,

                "FD"
            );


            let tarjetaY =
                y + 3;


            reservasPagina[dia]
                .forEach(

                    reserva => {

                        const altoTarjeta =
                            dibujarTarjeta(

                                reserva,

                                x + 2,

                                tarjetaY,

                                anchoDia - 4
                            );


                        tarjetaY +=
                            altoTarjeta +
                            3;
                    }
                );
        }


        y +=
            altoFila;


        // -------------------------------------------------
        // SI QUEDAN RESERVAS DE ESTE MISMO HORARIO,
        // CONTINUAR EN OTRA PÁGINA
        // -------------------------------------------------

        if (
            quedanReservas
        ) {

            y =
                nuevaPagina();
        }
    }
}


// =========================================================
// PIE DE LA ÚLTIMA PÁGINA
// =========================================================

dibujarPiePagina();


// =========================================================
// GUARDAR PDF
// =========================================================

pdf.save(

    `reservas_material_${fechaISOAdmin(
        lunes
    )}_${fechaISOAdmin(
        viernes
    )}.pdf`
);

}
// =========================================================
// INICIALIZACIÓN DEL PANEL ADMINISTRATIVO
// =========================================================

async function iniciarAdmin() {

    try {

        // =================================================
        // APLICAR MODO OSCURO GUARDADO
        // =================================================

        aplicarModoGuardado();


        // =================================================
        // COMPROBAR SESIÓN Y PERMISOS
        // =================================================

        const autorizado =
            await comprobarAdministrador();


        if (!autorizado) {

            return;
        }


        // =================================================
        // FECHA INICIAL DE LA TABLA SEMANAL
        // =================================================

        lunesSemanaAdmin =
            obtenerLunesAdmin(
                new Date()
            );


        // =================================================
        // CARGAR CATEGORÍAS
        // =================================================

        await cargarCategorias();


        // =================================================
        // CARGAR MATERIALES
        // =================================================

        await cargarMateriales();


        // =================================================
        // LIMPIAR FORMULARIO DE MATERIAL
        // =================================================

        limpiarFormularioMaterial();


        // =================================================
        // CARGAR RESERVAS
        // =================================================

        await cargarReservasAdmin();


        // =================================================
        // DEJAR CERRADO EL PANEL DE DEVOLUCIÓN
        // =================================================

        if (panelGestionEntrega) {

            panelGestionEntrega.classList.add(
                "oculto"
            );
        }


        // =================================================
        // LIMPIAR VARIABLES TEMPORALES
        // =================================================

        reservaEntregaFisicaActual =
            null;


        reservaEntregaActual =
            null;


        reservaEdicionActual =
            null;


        carritoEdicionReserva =
            [];


        disponibilidadEdicion =
            [];


        console.log(
            "CETA Material de Gabinete - Panel administrador iniciado correctamente."
        );


    } catch (error) {

        console.error(
            "Error iniciando panel administrativo:",
            error
        );


        alert(
            "Ocurrió un error al iniciar el panel administrativo. Revisa la consola del navegador."
        );
    }
}


// =========================================================
// ACTUALIZAR RESERVAS AL VOLVER A LA PESTAÑA RESERVAS
// =========================================================

document
    .querySelectorAll(
        '.tab-btn[data-panel="panelReservas"]'
    )
    .forEach(

        boton => {

            boton.addEventListener(

                "click",

                async () => {

                    if (!perfilActual) {

                        return;
                    }


                    try {

                        await cargarReservasAdmin();


                    } catch (error) {

                        console.error(
                            "Error actualizando reservas:",
                            error
                        );
                    }
                }
            );
        }
    );


// =========================================================
// ACTUALIZAR DEVOLUCIONES AL ABRIR ENTREGAS
// =========================================================

document
    .querySelectorAll(
        '.tab-btn[data-panel="panelEntregas"]'
    )
    .forEach(

        boton => {

            boton.addEventListener(

                "click",

                async () => {

                    if (!perfilActual) {

                        return;
                    }


                    try {

                        await cargarReservasAdmin();


                    } catch (error) {

                        console.error(
                            "Error actualizando devoluciones:",
                            error
                        );
                    }
                }
            );
        }
    );


// =========================================================
// LIMPIAR ENTREGA FÍSICA AL CAMBIAR DE PANEL
// =========================================================

document
    .querySelectorAll(
        ".tab-btn[data-panel]"
    )
    .forEach(

        boton => {

            boton.addEventListener(

                "click",

                () => {

                    const panelDestino =
                        boton.dataset.panel;


                    if (
                        panelDestino !==
                        "panelConfirmarEntrega"
                    ) {

                        reservaEntregaFisicaActual =
                            null;
                    }


                    if (
                        panelDestino !==
                        "panelEditarReserva"
                    ) {

                        reservaEdicionActual =
                            null;


                        carritoEdicionReserva =
                            [];


                        disponibilidadEdicion =
                            [];
                    }
                }
            );
        }
    );


// =========================================================
// INICIAR CUANDO EL DOM ESTÉ DISPONIBLE
// =========================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(

        "DOMContentLoaded",

        iniciarAdmin
    );


} else {

    iniciarAdmin();
}
