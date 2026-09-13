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
// ELEMENTOS
// =========================================================

const nombreAdministrador =
    document.getElementById("nombreAdministrador");

const btnCerrarSesion =
    document.getElementById("btnCerrarSesion");

const btnModoOscuro =
    document.getElementById("btnModoOscuro");


const formMaterial =
    document.getElementById("formMaterial");

const materialId =
    document.getElementById("materialId");

const materialCodigo =
    document.getElementById("materialCodigo");

const materialNombre =
    document.getElementById("materialNombre");

const materialCantidad =
    document.getElementById("materialCantidad");

const materialDescripcion =
    document.getElementById("materialDescripcion");

const materialImagen =
    document.getElementById("materialImagen");

const previewImagenMaterial =
    document.getElementById("previewImagenMaterial");

const sinImagenMaterial =
    document.getElementById("sinImagenMaterial");

const categoriasMaterial =
    document.getElementById("categoriasMaterial");

const mensajeMaterial =
    document.getElementById("mensajeMaterial");

const listaMateriales =
    document.getElementById("listaMateriales");

const buscarMaterial =
    document.getElementById("buscarMaterial");

const contadorMateriales =
    document.getElementById("contadorMateriales");

const btnNuevoMaterial =
    document.getElementById("btnNuevoMaterial");

const btnCancelarEdicion =
    document.getElementById("btnCancelarEdicion");

const btnGuardarMaterial =
    document.getElementById("btnGuardarMaterial");

const tituloFormularioMaterial =
    document.getElementById("tituloFormularioMaterial");

const contenedorFormularioMaterial =
    document.getElementById("contenedorFormularioMaterial");


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
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// =========================================================
// MENSAJES
// =========================================================

function mostrarMensaje(
    mensaje,
    tipo = "error"
) {

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

                .from("perfiles")

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
            perfil.rol !== "administrador" ||
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


        nombreAdministrador.textContent =
            perfil.nombre ||
            perfil.usuario ||
            "Administrador";


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
    .querySelectorAll(".tab-btn[data-panel]")
    .forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    const panelId =
                        boton.dataset.panel;


                    document
                        .querySelectorAll(
                            ".tab-btn[data-panel]"
                        )
                        .forEach(
                            b =>
                                b.classList.remove(
                                    "activo"
                                )
                        );


                    document
                        .querySelectorAll(
                            ".admin-panel"
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

function aplicarModoGuardado() {

    const modo =
        localStorage.getItem(
            "ceta_material_modo"
        );


    if (modo === "oscuro") {

        document.body.classList.add(
            "modo-oscuro"
        );

        btnModoOscuro.textContent =
            "☀️ Modo claro";
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

            .from("categorias_material")

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

        categoriasMaterial.innerHTML =
            `
            <p class="mensaje-error">
                No se pudieron cargar las categorías.
            </p>
            `;

        return;
    }


    categoriasCargadas =
        data || [];


    renderizarCategorias();
}


// =========================================================
// MOSTRAR CATEGORÍAS
// =========================================================

function renderizarCategorias(
    seleccionadas = []
) {

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
                id => Number(id)
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
            .substring(2, 8)}.${extension}`;


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
                    cacheControl: "3600",
                    upsert: false
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

    // Eliminar relaciones anteriores

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
            !Number.isInteger(cantidad) ||
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

            let imagenUrl =
                imagenActualUrl;


            const archivo =
                materialImagen.files?.[0];


            if (archivo) {

                imagenUrl =
                    await subirImagenMaterial(
                        archivo
                    );
            }


            const datosMaterial = {

                codigo:
                    codigo || null,

                nombre,

                descripcion:
                    descripcion || null,

                cantidad_total:
                    cantidad,

                imagen_url:
                    imagenUrl,

                updated_at:
                    new Date().toISOString()
            };


            let idMaterial;


            // =============================================
            // EDITAR
            // =============================================

            if (id) {

                const {
                    data,
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
                        )

                        .select(
                            "id"
                        )

                        .single();


                if (error) {
                    throw error;
                }


                idMaterial =
                    data.id;


            // =============================================
            // CREAR
            // =============================================

            } else {

                const {
                    data,
                    error
                } =
                    await supabaseClient

                        .from(
                            "materiales_gabinete"
                        )

                        .insert({

                            ...datosMaterial,

                            activo: true,

                            eliminado: false

                        })

                        .select(
                            "id"
                        )

                        .single();


                if (error) {
                    throw error;
                }


                idMaterial =
                    data.id;
            }


            await guardarCategoriasMaterial(
                idMaterial,
                categorias
            );


            mostrarMensaje(
                id
                    ? "Material actualizado correctamente."
                    : "Material registrado correctamente.",
                "ok"
            );


            limpiarFormulario();


            await cargarMateriales();


        } catch (error) {

            console.error(
                "Error guardando material:",
                error
            );


            if (
                error?.code === "23505"
            ) {

                mostrarMensaje(
                    "El código ingresado ya pertenece a otro material."
                );

            } else {

                mostrarMensaje(
                    error.message ||
                    "No se pudo guardar el material."
                );
            }

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
// LIMPIAR FORMULARIO
// =========================================================

function limpiarFormulario() {

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

        limpiarFormulario();

        mostrarMensaje("");


        contenedorFormularioMaterial
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    }
);


// =========================================================
// CANCELAR EDICIÓN
// =========================================================

btnCancelarEdicion?.addEventListener(
    "click",
    () => {

        limpiarFormulario();

        mostrarMensaje("");
    }
);


// =========================================================
// CARGAR MATERIALES
// =========================================================

async function cargarMateriales() {

    listaMateriales.innerHTML =
        `
        <p>
            Cargando materiales...
        </p>
        `;


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

        listaMateriales.innerHTML =
            `
            <p class="mensaje-error">
                No se pudieron cargar los materiales.
            </p>
            `;

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


    const mapaCategorias =
        new Map();


    (relaciones || [])
        .forEach(
            relacion => {

                if (
                    !mapaCategorias.has(
                        relacion.material_id
                    )
                ) {

                    mapaCategorias.set(
                        relacion.material_id,
                        []
                    );
                }


                mapaCategorias
                    .get(
                        relacion.material_id
                    )
                    .push(
                        relacion.categoria_id
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
                            material.id
                        ) || []

                })
            );


    renderizarMateriales(
        materialesCargados
    );
}


// =========================================================
// OBTENER NOMBRE CATEGORÍA
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

    contadorMateriales.textContent =
        `${materiales.length} material(es)`;


    if (
        materiales.length === 0
    ) {

        listaMateriales.innerHTML =
            `
            <div class="lista-vacia">
                <span>📦</span>

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
                                            ${
                                                material.cantidad_total
                                            }
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
// BUSCADOR
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
            material.imagen_url || null;


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


        contenedorFormularioMaterial
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
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
                        new Date().toISOString()

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

                    activo: false,

                    eliminado: true,

                    updated_at:
                        new Date().toISOString()

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
                `¿Restaurar "${material.nombre}"?`
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

                    activo: true,

                    eliminado: false,

                    updated_at:
                        new Date().toISOString()

                })

                .eq(
                    "id",
                    id
                );


        if (error) {

            alert(
                "No se pudo restaurar el material."
            );

            console.error(error);

            return;
        }


        await cargarMateriales();
    };

// =========================================================
// RESERVAS ADMINISTRADOR
// =========================================================

let lunesSemanaAdmin =
    obtenerLunesAdmin(
        new Date()
    );

let reservasAdmin = [];
let detallesAdmin = [];
let materialesAdmin = [];
let perfilesAdmin = [];

let reservaEntregaActual = null;


// =========================================================
// ELEMENTOS RESERVAS
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
// FECHAS ADMIN
// =========================================================

function obtenerLunesAdmin(fecha) {

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


function sumarDiasAdmin(
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


function fechaISOAdmin(fecha) {

    const y =
        fecha.getFullYear();

    const m =
        String(
            fecha.getMonth() + 1
        )
        .padStart(
            2,
            "0"
        );

    const d =
        String(
            fecha.getDate()
        )
        .padStart(
            2,
            "0"
        );

    return `${y}-${m}-${d}`;
}


function fechaCortaAdmin(fecha) {

    return fecha.toLocaleDateString(
        "es-BO",
        {
            day: "2-digit",
            month: "2-digit"
        }
    );
}


function fechaCompletaAdmin(fecha) {

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
// HORARIOS
// =========================================================

const HORARIOS_ADMIN = [
    "09:00-12:00",
    "14:00-17:00",
    "19:00-21:30"
];


// =========================================================
// CARGAR RESERVAS SEMANA
// =========================================================

async function cargarReservasAdmin() {

    if (!cuerpoTablaReservasAdmin) {
        return;
    }


    const viernes =
        sumarDiasAdmin(
            lunesSemanaAdmin,
            4
        );


    textoSemanaAdmin.textContent =
        `${fechaCompletaAdmin(
            lunesSemanaAdmin
        )} al ${fechaCompletaAdmin(
            viernes
        )}`;


    actualizarCabecerasAdmin();


    const inicio =
        fechaISOAdmin(
            lunesSemanaAdmin
        );

    const fin =
        fechaISOAdmin(
            viernes
        );


   const {
    data: reservas,
    error
} =
    await supabaseClient
        .from("reservas_material")
        .select(`
            id,
            usuario_id,
            grupo,
            fecha,
            horario,
            tema,
            estado,
            observacion_general
        `)
        .gte(
            "fecha",
            inicio
        )
        .lte(
            "fecha",
            fin
        )

        // NO mostrar reservas canceladas
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

        console.error(error);

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
        reservasAdmin
            .map(
                r => r.id
            );


    detallesAdmin = [];


    if (idsReservas.length) {

        const {
            data,
            error: errorDetalles
        } =
            await supabaseClient
                .from("reserva_material_detalle")
                .select(`
                    id,
                    reserva_id,
                    material_id,
                    cantidad,
                    cantidad_devuelta,
                    observacion
                `)
                .in(
                    "reserva_id",
                    idsReservas
                );


        if (!errorDetalles) {

            detallesAdmin =
                data || [];
        }
    }


    const idsMateriales =
        [
            ...new Set(
                detallesAdmin
                    .map(
                        d => d.material_id
                    )
            )
        ];


    materialesAdmin = [];


    if (idsMateriales.length) {

        const {
            data
        } =
            await supabaseClient
                .from("materiales_gabinete")
                .select(`
                    id,
                    nombre,
                    codigo
                `)
                .in(
                    "id",
                    idsMateriales
                );


        materialesAdmin =
            data || [];
    }


    const idsUsuarios =
        [
            ...new Set(
                reservasAdmin
                    .map(
                        r => r.usuario_id
                    )
            )
        ];


    perfilesAdmin = [];


    if (idsUsuarios.length) {

        const {
            data
        } =
            await supabaseClient
                .from("perfiles")
                .select(`
                    id,
                    nombre,
                    usuario
                `)
                .in(
                    "id",
                    idsUsuarios
                );


        perfilesAdmin =
            data || [];
    }


    renderizarReservasAdmin();

    renderizarEntregasPendientes();
}


// =========================================================
// CABECERAS
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
                        ${fechaCortaAdmin(fecha)}
                    </small>
                    `;
            }
        }
    );
}


// =========================================================
// HELPERS
// =========================================================

function nombreMaterialAdmin(id) {

    const material =
        materialesAdmin.find(
            item =>
                Number(item.id) ===
                Number(id)
        );

    return material
        ? material.nombre
        : "Material";
}


function nombreDocenteAdmin(id) {

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
// ESTADO
// =========================================================

function etiquetaEstadoAdmin(estado) {

    const mapa = {

        reservada:
            [
                "RESERVADA",
                "estado-reserva-reservada"
            ],

        parcial:
            [
                "PARCIAL",
                "estado-reserva-parcial"
            ],

        completada:
            [
                "COMPLETADA",
                "estado-reserva-completada"
            ],

        cancelada:
            [
                "CANCELADA",
                "estado-reserva-cancelada"
            ]
    };


    return mapa[estado] ||
        [
            estado,
            ""
        ];
}


// =========================================================
// RENDER TABLA RESERVAS
// =========================================================

function renderizarReservasAdmin() {

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
                                            r =>
                                                r.fecha === fecha
                                                &&
                                                r.horario === horario
                                        );


                                    if (!reservas.length) {

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

                                                    const detalles =
                                                        detallesAdmin
                                                            .filter(
                                                                d =>
                                                                    Number(
                                                                        d.reserva_id
                                                                    ) ===
                                                                    Number(
                                                                        reserva.id
                                                                    )
                                                            );


                                                    const materiales =
                                                        detalles
                                                            .map(
                                                                d =>
                                                                    `
                                                                    <li>
                                                                        ${d.cantidad} ×
                                                                        ${escaparHTML(
                                                                            nombreMaterialAdmin(
                                                                                d.material_id
                                                                            )
                                                                        )}
                                                                    </li>
                                                                    `
                                                            )
                                                            .join("");


                                                    const estado =
                                                        etiquetaEstadoAdmin(
                                                            reserva.estado
                                                        );


                                                    const botones =
                                                        reserva.estado !== "cancelada"
                                                        &&
                                                        reserva.estado !== "completada"

                                                            ? `
                                                                <button
                                                                    type="button"
                                                                    class="btn-gestionar-entrega"
                                                                    onclick="abrirEntrega(${reserva.id})"
                                                                >
                                                                    Gestionar entrega
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    class="btn-cancelar-reserva-admin"
                                                                    onclick="cancelarReservaAdmin(${reserva.id})"
                                                                >
                                                                    Cancelar
                                                                </button>
                                                            `

                                                            : "";


                                                    return `
                                                        <div class="reserva-semanal-card">

                                                            <span
                                                                class="estado-reserva-admin ${estado[1]}"
                                                            >
                                                                ${estado[0]}
                                                            </span>

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
                                                                ${materiales}
                                                            </ul>

                                                            <div class="acciones-reserva-admin">
                                                                ${botones}
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


            mensajeReservasAdmin.className =
                "mensaje-admin mensaje-ok";


            mensajeReservasAdmin.textContent =
                "Reserva cancelada correctamente.";


            await cargarReservasAdmin();


        } catch (error) {

            console.error(error);


            mensajeReservasAdmin.className =
                "mensaje-admin mensaje-error";


            mensajeReservasAdmin.textContent =
                error.message ||
                "No se pudo cancelar la reserva.";
        }
    };


// =========================================================
// ENTREGAS PENDIENTES
// =========================================================

function renderizarEntregasPendientes() {

    if (!listaEntregasPendientes) {
        return;
    }


    const pendientes =
        reservasAdmin.filter(
            r =>
                r.estado === "reservada"
                ||
                r.estado === "parcial"
        );


    if (!pendientes.length) {

        listaEntregasPendientes.innerHTML =
            `
            <div class="lista-vacia">

                <span>
                    ✅
                </span>

                <p>
                    No hay devoluciones pendientes esta semana.
                </p>

            </div>
            `;

        return;
    }


    listaEntregasPendientes.innerHTML =
        pendientes
            .map(
                reserva => {

                    const detalles =
                        detallesAdmin
                            .filter(
                                d =>
                                    Number(
                                        d.reserva_id
                                    ) ===
                                    Number(
                                        reserva.id
                                    )
                            );


                    const pendientesCantidad =
                        detalles
                            .reduce(
                                (
                                    total,
                                    d
                                ) =>
                                    total
                                    +
                                    (
                                        Number(d.cantidad)
                                        -
                                        Number(d.cantidad_devuelta)
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

                                <strong class="entrega-pendientes">
                                    ${pendientesCantidad}
                                    unidad(es) pendientes
                                </strong>

                            </div>


                            <button
                                type="button"
                                class="btn-principal btn-auto"
                                onclick="abrirEntrega(${reserva.id})"
                            >
                                Registrar devolución
                            </button>

                        </div>
                    `;
                }
            )
            .join("");
}


// =========================================================
// ABRIR ENTREGA
// =========================================================
window.abrirEntrega =
    function (
        reservaId
    ) {

        const reserva =
            reservasAdmin.find(
                r =>
                    Number(r.id) ===
                    Number(reservaId)
            );


        if (!reserva) {

            alert(
                "No se encontró la reserva."
            );

            return;
        }


        reservaEntregaActual =
            reserva;


        const detalles =
            detallesAdmin
                .filter(
                    d =>
                        Number(
                            d.reserva_id
                        ) ===
                        Number(
                            reservaId
                        )
                );


        // =================================================
        // CAMBIAR AUTOMÁTICAMENTE A LA PESTAÑA ENTREGAS
        // =================================================

        const botonEntregas =
            document.querySelector(
                '.tab-btn[data-panel="panelEntregas"]'
            );


        if (botonEntregas) {

            botonEntregas.click();
        }


        // =================================================
        // TÍTULO
        // =================================================

        tituloGestionEntrega.textContent =
            `Reserva #${reserva.id}`;


        // =================================================
        // DATOS DE LA RESERVA
        // =================================================

        datosGestionEntrega.innerHTML =
            `
            <strong>
                ${escaparHTML(
                    nombreDocenteAdmin(
                        reserva.usuario_id
                    )
                )}
            </strong>

            · Grupo:
            ${escaparHTML(
                reserva.grupo
            )}

            · Fecha:
            ${escaparHTML(
                reserva.fecha
            )}

            · Horario:
            ${escaparHTML(
                reserva.horario
            )}

            <br>

            <strong>
                Tema:
            </strong>

            ${escaparHTML(
                reserva.tema
            )}
            `;


        // =================================================
        // DETALLES
        // =================================================

        detalleGestionEntrega.innerHTML =
            detalles
                .map(
                    detalle => {

                        const pendiente =
                            Number(
                                detalle.cantidad
                            )
                            -
                            Number(
                                detalle.cantidad_devuelta
                            );


                        return `
                            <div class="detalle-entrega-item">


                                <div class="detalle-entrega-info">

                                    <h4>
                                        ${escaparHTML(
                                            nombreMaterialAdmin(
                                                detalle.material_id
                                            )
                                        )}
                                    </h4>


                                    <p>
                                        Reservado:

                                        <strong>
                                            ${detalle.cantidad}
                                        </strong>
                                    </p>


                                    <p>
                                        Ya devuelto:

                                        <strong>
                                            ${detalle.cantidad_devuelta}
                                        </strong>
                                    </p>


                                    <p>
                                        Pendiente:

                                        <strong>
                                            ${pendiente}
                                        </strong>
                                    </p>

                                </div>


                                <div class="campo-admin">

                                    <label>
                                        Cantidad devuelta total
                                    </label>

                                    <input
                                        type="number"

                                        min="${detalle.cantidad_devuelta}"

                                        max="${detalle.cantidad}"

                                        value="${detalle.cantidad_devuelta}"

                                        class="input-devuelto"

                                        data-detalle-id="${detalle.id}"
                                    >

                                </div>


                                <div class="campo-admin">

                                    <label>
                                        Observación
                                    </label>

                                    <textarea
                                        rows="3"

                                        class="input-observacion-entrega"

                                        data-detalle-id="${detalle.id}"

                                        placeholder="Ej. Fuente 1 revisar cables"
                                    >${escaparHTML(
                                        detalle.observacion ||
                                        ""
                                    )}</textarea>

                                </div>


                            </div>
                        `;
                    }
                )
                .join("");


        // =================================================
        // MOSTRAR PANEL DE GESTIÓN
        // =================================================

        panelGestionEntrega.classList.remove(
            "oculto"
        );


        mensajeEntrega.textContent =
            "";


        // =================================================
        // BAJAR HASTA LA RESERVA
        // =================================================

        setTimeout(
            () => {

                panelGestionEntrega
                    .scrollIntoView({
                        behavior:
                            "smooth",

                        block:
                            "start"
                    });

            },
            150
        );
    };

// =========================================================
// CERRAR ENTREGA
// =========================================================

btnCerrarGestionEntrega
    ?.addEventListener(
        "click",
        () => {

            reservaEntregaActual =
                null;


            panelGestionEntrega.classList.add(
                "oculto"
            );


            mensajeEntrega.textContent =
                "";
        }
    );


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


            const inputsCantidad =
                Array.from(
                    document.querySelectorAll(
                        ".input-devuelto"
                    )
                );


            const detalles =
                inputsCantidad
                    .map(
                        input => {

                            const detalleId =
                                Number(
                                    input.dataset.detalleId
                                );


                            const observacionInput =
                                document.querySelector(
                                    `.input-observacion-entrega[data-detalle-id="${detalleId}"]`
                                );


                            return {

                                detalle_id:
                                    detalleId,

                                cantidad_devuelta:
                                    Number(
                                        input.value
                                    ),

                                observacion:
                                    observacionInput
                                        ?.value
                                        ?.trim()
                                        || ""
                            };
                        }
                    );


            if (
                !confirm(
                    "¿Guardar esta devolución?"
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
                                reservaEntregaActual.id,

                            p_detalles:
                                detalles
                        }
                    );


                if (error) {
                    throw error;
                }


                mensajeEntrega.className =
                    "mensaje-admin mensaje-ok";


                mensajeEntrega.textContent =
                    "Devolución registrada correctamente.";


                await cargarReservasAdmin();


                setTimeout(
                    () => {

                        panelGestionEntrega.classList.add(
                            "oculto"
                        );

                        reservaEntregaActual =
                            null;

                    },
                    700
                );


            } catch (error) {

                console.error(error);


                mensajeEntrega.className =
                    "mensaje-admin mensaje-error";


                mensajeEntrega.textContent =
                    error.message ||
                    "No se pudo registrar la devolución.";

            } finally {

                btnGuardarDevolucion.disabled =
                    false;


                btnGuardarDevolucion.textContent =
                    "Guardar devolución";
            }
        }
    );
// =========================================================
// INICIALIZACIÓN
// =========================================================

async function iniciarAdmin() {

    aplicarModoGuardado();


    const autorizado =
        await comprobarAdministrador();


    if (!autorizado) {
        return;
    }


    await cargarCategorias();

    await cargarMateriales();

    await cargarReservasAdmin();


    limpiarFormulario();
}


iniciarAdmin();
