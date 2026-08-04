# Cuidar la Democracia

Dashboard interactivo y análisis de datos del **Estudio sobre Democracia 2026**, realizado por **INVAMER S.A.S** para el Laboratorio de Gobierno (**GovLab**) de la Universidad de La Sabana.

Este proyecto permite explorar las percepciones, actitudes y comportamientos de los ciudadanos colombianos frente al sistema democrático, a través de visualizaciones dinámicas y un procesamiento de datos riguroso.

## Vista Previa
El proyecto consiste en una aplicación web estática que procesa datos de encuestas en tiempo real, permitiendo filtrar por diversas variables sociodemográficas (edad, sexo, género, educación, estrato, ubicación geográfica).

---

## Estructura del Proyecto

El repositorio está organizado en dos grandes bloques: el procesamiento de datos (Notebooks) y la aplicación interactiva (Dashboard).

### 1. Procesamiento de Datos (Python/Jupyter)
Localizado en la raíz del proyecto, enfocado en transformar la data cruda en información lista para visualización.
- **`Fase_1_Limpieza.ipynb`**:
 - Limpieza de variables nulas y eliminación de columnas administrativas.
 - Recodificación masiva de variables categóricas (escalas de 1-4 a texto legible).
 - Enriquecimiento geográfico (Latitud, Longitud y Altitud) mediante APIs de Google Maps.
- **`Fase_2_EDA.ipynb`**: Análisis exploratorio detallado para identificar tendencias y patrones iniciales.
- **`Fase_1_Limpiado.csv`**: Dataset final procesado con 1,700 registros y variables normalizadas.

### 2. Dashboard Interactivo (`democracia_app`)
Una aplicación web moderna y ligera construida con tecnologías estándar:
- **`index.html`**: Estructura principal y contenedores de filtros.
- **`app.js`**: Lógica de filtrado, procesamiento de CSV (PapaParse) y generación de gráficos dinámicos (Chart.js).
- **`styles.css`**: Diseño responsivo y estética premium.
- **`chart_detail.html/js`**: Vistas detalladas para profundizar en preguntas específicas.

---

## Tecnologías Utilizadas

### Análisis de Datos
- **Python**: Pandas, Numpy, Matplotlib, Seaborn.
- **Geoprocesamiento**: Google Maps Geocoding & Elevation API.

### Dashboard Web
- **Frontend**: HTML5, CSS3, JavaScript (ES6+).
- **Librerías**:
 - [Chart.js](https://www.chartjs.org/): Visualizaciones interactivas.
 - [PapaParse](https://www.papaparse.com/): Procesamiento eficiente de archivos CSV grandes.
 - [noUiSlider](https://refreshless.com/nouislider/): Control de rangos de edad.
 - [Choices.js](https://choices-js.github.io/Choices/): Multi-selectores elegantes para filtros.

---

## Instalación y Uso Local

### Requisitos
- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [Python 3.10+](https://www.python.org/) (solo si deseas ejecutar los Notebooks)

### Ejecución del Dashboard
1. Clona el repositorio:
 ```bash
 git clone https://github.com/Juansotag/Cuidar-la-Democracia.git
 ```
2. Instala las dependencias de Node:
 ```bash
 npm install
 ```
3. Inicia el servidor de desarrollo:
 ```bash
 npm run dev
 ```
4. Abre tu navegador en `http://localhost:3000`.

---

## Despliegue
Este proyecto está configurado para desplegarse fácilmente en plataformas como **Railway** utilizando el `Procfile` y la configuración de `nixpacks.toml` incluida.

---

## Créditos
- **Datos**: INVAMER S.A.S
- **Institución**: Universidad de La Sabana - GovLab
- **Desarrollo**: [Tu Nombre/Usuario]

---

> [!NOTE]
> Este estudio revela la compleja relación de los colombianos con su sistema democrático: una alta creencia en el voto pero una profunda desconfianza en las instituciones.
