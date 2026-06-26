# FIXORA — Guía de Configuración MVP

> **Google Analytics 4** (medir visitas) · **Google Sheets** (registrar formularios)  
> Proyecto Universitario 2026

---

## PARTE 1: Google Analytics 4

> 📊 **¿Qué mide?** Visitas totales, origen del tráfico, tiempo en página y dispositivos.

### Paso 1 — Crear cuenta en GA4

1. Ve a [analytics.google.com](https://analytics.google.com) e inicia sesión con tu Gmail.
2. Haz clic en **"Empezar a medir"**.
3. **Nombre de la cuenta:** `FIXORA MVP`
4. Haz clic en **"Siguiente"**.

### Paso 2 — Configurar la propiedad

5. **Nombre de la propiedad:** `Landing Page FIXORA`
6. **Zona horaria:** Perú (GMT-5)
7. **Moneda:** Sol peruano
8. Haz clic en **"Siguiente" → "Siguiente" → "Crear"**.

### Paso 3 — Obtener tu ID de medición

9. En el Asistente de configuración, selecciona **"Web"**.
10. Ingresa la URL donde publicarás tu página.
11. Haz clic en **"Crear flujo"**.
12. Copia el código que aparece, tiene este formato:

```
G-XXXXXXXXXX
```

### Paso 4 — Activar el código en `index.html`

13. Abre `index.html` en tu editor de texto.
14. Busca el bloque comentado alrededor de la **línea 9**:

```html
<!-- Google Analytics Placeholder -->
<!-- 
<script async src="https://www.googletagmanager.com/gtag/js?id=TU_ID_AQUI"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU_ID_AQUI');
</script>
-->
```

15. Reemplaza **ambas apariciones** de `TU_ID_AQUI` con tu código `G-XXXXXXXXXX`.
16. Elimina los comentarios `<!--` al inicio y `-->` al final.
17. Guarda el archivo.

> 💡 **Tip:** Una vez publicada la página, espera 24–48 horas para datos acumulados. Para datos en tiempo real ve a **Informes → Tiempo real** en GA4.

---

## PARTE 2: Google Sheets

> 📋 **¿Qué mide?** Nombre, tipo (cliente/técnico), interés, servicio, distrito y preocupación de cada registro.

### Paso 1 — Crear la hoja de cálculo

1. Ve a [sheets.google.com](https://sheets.google.com) y crea una hoja nueva.
2. Nómbrala: `FIXORA - Registros MVP`
3. En la **Fila 1**, escribe estos encabezados en cada columna:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Fecha | Tipo | Nombre | Contacto | Distrito | Servicio/Especialidad | Preocupación/Experiencia | Interés |

### Paso 2 — Abrir Apps Script

4. Dentro de la hoja, ve a **Extensiones → Apps Script**.
5. Borra todo el contenido que haya por defecto.
6. Copia y pega exactamente este código:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const params = e.parameter;

  const nombre  = params.nombre  || '';
  const correo  = params.correo  || '';
  const mensaje = params.mensaje || '';
  const fecha   = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

  sheet.appendRow([fecha, nombre, correo, mensaje]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

7. Guarda el proyecto (💾 o `Ctrl + S`) con el nombre: `FIXORA Script`

### Paso 3 — Publicar como aplicación web

8. Haz clic en **"Implementar" → "Nueva implementación"**.
9. Haz clic en el ícono ⚙️ → Selecciona **"Aplicación web"**.
10. Configura lo siguiente:

| Campo | Valor |
|---|---|
| Descripción | `MVP FIXORA` |
| Ejecutar como | `Yo (tu correo)` |
| Quién tiene acceso | **Cualquier persona** ← Muy importante |

11. Haz clic en **"Implementar"**.
12. Google pedirá autorización → **"Autorizar acceso"** → Elige tu cuenta → **"Permitir"**.

### Paso 4 — Copiar la URL generada

13. Aparecerá una URL de este estilo:

```
https://script.google.com/macros/s/AKfycby.../exec
```

**Cópiala completa.**

### Paso 5 — Conectar con `script.js`

14. Abre `script.js` y busca esta línea al inicio:

```javascript
const GOOGLE_SCRIPT_URL = 'URL_DE_TU_GOOGLE_APPS_SCRIPT_AQUI';
```

15. Reemplaza el texto entre comillas con la URL copiada en el paso anterior.
16. Guarda el archivo.

> ⚠️ **Importante:** Cada vez que modifiques y re-publiques el script, Google genera una **nueva URL**. Recuerda actualizarla en `script.js`.

---

## Resumen: ¿Qué métrica mide cada herramienta?

| Criterio de Éxito (Lean Canvas) | Herramienta | Dónde verlo |
|---|---|---|
| Más de 50 visitantes en la Landing Page | GA4 | Informes → Adquisición → Visión general |
| Más del 60% completa el formulario | GA4 + Sheets | Filas en Sheets ÷ Visitas en GA4 × 100 |
| Más del 70% considera importante validar técnicos | Sheets | Columna H "Interés" → filtrar "Muy interesado" |
| Técnicos y usuarios manifiestan intención de uso | Sheets | Columna B "Tipo" → contar clientes y técnicos |
| Servicio más solicitado | Sheets | Columna F "Servicio" → ordenar y agrupar |
| Principal preocupación del cliente | Sheets | Columna G "Preocupación" → tabla dinámica |

---

*FIXORA – Proyecto Académico 2026 · Guía de Configuración v1.0*
