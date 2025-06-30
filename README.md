# 📱 Proyecto Ionic 3: [Local Events Agenda]

Este proyecto fue desarrollado con **Ionic 3** y Angular. Incluye características como integración con Google Maps, videos de YouTube embebidos, y funcionalidades nativas como compartir contenido.

---

## 🧰 Tecnologías utilizadas

- **Ionic Framework v3.9.x**
- **Angular 5**
- **TypeScript**
- **WordPress REST API**
- **Moment.js** para manejo de fechas
- **Google Maps JavaScript API**
- **Cordova Plugins**:
  - `@ionic-native/social-sharing`
  - `@ionic-native/geolocation` *(opcional)*
- HTML5 / CSS3

---

## 📦 Requisitos

- Node.js v10 - v14 (versión compatible con Ionic 3)
- NPM
- Ionic CLI 3 (`npm install -g ionic@3.20.1`)
- Cordova CLI (`npm install cordova@10.0.0`)

---

## 🚀 Instalación

Clona el repositorio:

```bash
git clone https://github.com/davidromeroy/Local-events-agenda.git
cd mi-proyecto-ionic3
```

Instala las dependencias:
```bash
npm install
```

Instalar cordova:
```bash
npm install cordova@10.0.0
npm install cordova-lib@10
ionic integrations enable cordova
```

Instalar plugins de cordova:

```bash
// Plugin para la geolocalizacion:
ionic cordova plugin add cordova-plugin-geolocation@4.1.0
npm install --save @ionic-native/geolocation@4.1.0

// Para compartir eventos:
ionic cordova plugin add cordova-plugin-x-socialsharing@4.1.0
npm install @ionic-native/social-sharing@4.1.0

// Plugin para enviar correos
ionic cordova plugin add cordova-plugin-email
npm install @ionic-native/email-composer@4.20
```
## 🔗 Configurar conexión con WordPress local
Este proyecto se conecta a un backend de WordPress ubicado en tu máquina local. Asegúrate de que esté corriendo en:
```bash
http://localhost:8080/wordpress
```

## 🧪 Modo de desarrollo
Para ejecutar la app en el navegador:
```bash
ionic serve
```


## 📦 Compilar

Construir plataforma para simular en android:
```bash
ionic cordova platform add android@13.0.0
ionic cordova build android
```
Si se construyó mal se debe eliminar la plataforma y volver a construir
```bash
ionic cordova platform rm android (Usar para eliminar la plataforma y volverla a crear)
```

## 📱 Ejecutar en dispositivo Android (o emulador)
```bash
ionic cordova run android
```



### 🔍 Funcionalidades principales

- **Listado de eventos**: consume eventos desde una API de WordPress.
- **Detalles del evento**:
  - Título, descripción, imagen destacada.
  - Mapa con la ubicación del evento (usando Google Maps).
  - Video de YouTube embebido (si aplica).
  - Cálculo de duración usando Moment.js.
- **Favoritos**: permite guardar eventos favoritos en almacenamiento local.
- **Compartir evento**: mediante redes sociales o apps compatibles.
- **Vista segmentada**: el usuario puede cambiar entre descripción, ubicación y multimedia.

---

### 🖼 Capturas reales de la app

<table>
  <tr>
    <th>🏠 Inicio</th>
    <th>⭐ Favoritos</th>
    <th>🔘 Tipo de filtro</th>
    <th>⏱ Filtro por duración</th>
  </tr>
  <tr>
    <td><img src="media/Home.png" width="220"/></td>
    <td><img src="media/Favorites.png" width="220"/></td>
    <td><img src="media/filterType.png" width="220"/></td>
    <td><img src="media/FiltroPorDuracion.png" width="220"/></td>
  </tr>
  <tr>
    <th>📅 Filtro por fecha</th>
    <th>📆 Rango de fechas</th>
    <th>✅ Resultado del rango</th>
    <th>🔃 Ordenar por fecha</th>
  </tr>
  <tr>
    <td><img src="media/FiltroPorFecha.png" width="220"/></td>
    <td><img src="media/FiltroPorRangoFechas.png" width="220"/></td>
    <td><img src="media/FiltroPorRangoFechasResult.png" width="220"/></td>
    <td><img src="media/sortOlder.png" width="220"/></td>
  </tr>
  <tr>
    <th>📄 Detalle del evento</th>
    <th>🎥 Detalle con video YouTube</th>
  </tr>
  <tr>
    <td><img src="media/DetallesEvento.png" width="220"/></td>
    <td><img src="media/DetallesEventoVideoYT.png" width="220"/></td>
  </tr>
</table>

---

### 🚀 Flujo de uso

1. El usuario abre la app y se conecta a la API de WordPress.
2. Se cargan los eventos disponibles y se muestran en una lista.
3. Al hacer clic en un evento, se muestra su detalle:
   - Puedes alternar entre secciones (mapa, video, descripción).
4. El usuario puede marcarlo como favorito, compartirlo o ver su ubicación.

---










