# Parqueo Band 7

Mini app Zepp OS independiente para Xiaomi Smart Band 7 International (`deviceSource: 263`). Incluye pantallas de inicio, disponibilidad, parqueo activo, historial y configuración.

## Estado actual

- Modo `DEMO` funcional sin backend, con datos claramente identificados en configuración.
- Adaptador `services/parking-service.js` preparado para modo `REAL` mediante `baseUrl` y `fetch`.
- Protocolo versionado para comunicación pulsera/teléfono con `PING/PONG`, respuestas, errores, `requestId`, timeout/deduplicación en la capa de servicio.
- No se inventa una conversión `.bin`: `npm run export:band7` solo devuelve un BIN si Zeus realmente lo produce.

## Arquitectura

`page/` contiene las pantallas Zepp; `services/` separa la lógica de negocio; `mocks/` contiene datos DEMO; `app-side/` es el adaptador de teléfono; `shared/` contiene transporte y protocolo.

El contrato REAL esperado por el adaptador es configurable y no se asume que exista en este workspace: `GET /availability`, `GET /parking/active`, `GET /parking/history` y `POST /parking/:id/finish`. Ajusta las rutas si tu backend documenta otras.

## Requisitos

Node.js 14+ y npm. Para Band 7 se fija `@zeppos/zeus-cli@1.8.2`; las referencias auditadas indican que versiones posteriores pueden ocultar el target `mi-band7-intl`.

```powershell
cd parqueo-band7
npm install
npm test
npm run build
```

El `.zab` debe aparecer en `dist/`. Compilar no prueba la instalación física.

## Vista previa QR

```powershell
npm.cmd exec -- zeus login
npm run preview
```

La autenticación, si se solicita, debe completarse manualmente. En Zepp: Perfil → Configuración → Acerca de → pulsar siete veces el logotipo → Developer Mode → Scan. El QR solo es válido para la vista previa y requiere un dispositivo compatible con Zepp; no se afirma compatibilidad con Mi Fitness.

## Mi Fitness

La Smart Band 7 vinculada a Mi Fitness no debe asumirse compatible con el flujo QR de Zepp. No se desvincula ni se modifica firmware. No hay una conversión `.zab`→`.bin` documentada y verificable incorporada en este proyecto; por eso el exportador falla de forma explícita si no encuentra un BIN real.

## Pruebas y limitaciones

`npm test` cubre validación de mensajes, confirmación de finalización, ids requeridos y modo DEMO. La instalación, Bluetooth real, servicio compañero y contrato del backend quedan pendientes de probar físicamente/configurar. Si Zepp no puede proporcionar `AppSideService`, la app continúa en DEMO local pero las funciones REAL no pueden confirmarse.
