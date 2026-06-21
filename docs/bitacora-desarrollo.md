# Bitacora De Desarrollo

## Fecha

- `2026-06-21`

## Proposito Del Documento

Este documento deja trazabilidad operativa de lo trabajado en la sesion, el estado exacto en el que quedo el proyecto y la forma recomendada de retomarlo en una futura ocasion sin perder contexto.

## Objetivo Principal De La Sesion

Conectar `Prisma` y `Supabase` con el proyecto, dejar la persistencia funcional del modulo `Carga academica`, habilitar la gestion de catalogos reutilizables y avanzar en reglas reales de negocio para el calculo de horas.

## Lo Que Se Hizo Hoy

### 1. Infraestructura De Base De Datos

- Se instalo y configuro `Prisma 7` con `@prisma/adapter-pg` y `pg`.
- Se dejo `prisma.config.ts` listo para trabajar con `.env.local`.
- Se creo y ajusto `prisma/schema.prisma`.
- Se genero el cliente Prisma reutilizable en `src/shared/lib/prisma.ts`.
- Se confirmo la conexion con `Supabase`.

### 2. Modelo Inicial De Persistencia

Se dejaron modeladas y operativas las entidades base del flujo de `Carga academica`:

- `Institution`
- `AcademicPeriod`
- `Campus`
- `Shift`
- `AcademicGroup`
- `Subject`
- `Classroom`
- `AcademicLoad`
- `TrimesterCatalog`

Adicionalmente, a `Institution` se le agrego el campo:

- `academicHourMinutes`

Este campo permite parametrizar la duracion de la hora academica por institucion.

### 3. Catalogos Reutilizables

Se construyo una pantalla independiente de catalogos dentro del flujo de `Carga academica`:

- Ruta: `app/(app)/carga-academica/catalogos/page.tsx`

Los catalogos que ya se pueden gestionar son:

- instituciones
- periodos
- sedes
- jornadas
- grupos
- materias
- salones
- trimestres

La gestion de catalogos quedo con capacidad de:

- crear
- editar
- eliminar

Tambien se aplico una regla de normalizacion para catalogos:

- guardar texto en mayusculas
- eliminar espacios sobrantes al inicio y al final

### 4. Formulario Real De Carga Academica

El formulario de `Carga academica` dejo de ser mock y ahora trabaja con catalogos reales.

Se conectaron estos campos:

- `Periodo`
- `Sede`
- `Jornada`
- `Grupo`
- `Materia`
- `Fecha inicio`
- `Fecha fin`
- `Dia o dias de clase`
- `Hora inicio`
- `Hora fin`
- `Salon`

Tambien se dejo validacion para:

- campos obligatorios
- fecha inicio menor o igual a fecha fin
- hora inicio menor a hora fin
- consistencia institucional entre periodo y catalogos relacionados

### 5. Persistencia Real De Carga Academica

Se implemento el guardado real de asignaciones de `Carga academica` en base de datos.

Quedo creada la capa de acciones de servidor para:

- crear asignacion
- actualizar asignacion
- eliminar asignacion
- activar asignacion
- desactivar asignacion

Estas acciones viven en:

- `src/modules/carga-academica/application/create-academic-load-action.ts`

### 6. Listado Real De Asignaciones

El listado del modulo ya no usa datos mock.

Ahora consulta directamente `AcademicLoad` desde Prisma y muestra:

- institucion
- periodo
- grupo
- materia
- jornada
- dias de clase
- franja horaria
- sede
- salon
- estado

Tambien se calcula el resumen superior con datos reales:

- cargas activas
- horas semanales
- institucion foco

### 7. Reglas De Negocio Implementadas

#### CESDE y horas academicas

Se implemento la regla de negocio de `CESDE`:

- cada hora academica equivale a `45 minutos`

Eso significa, por ejemplo:

- `07:30 - 10:30` son `180 minutos`
- para `CESDE`, `180 / 45 = 4 horas`

Se dejo una proteccion adicional para que `CESDE` use `45 minutos` aunque el catalogo de la institucion tenga un valor anterior incorrecto en base de datos.

#### Corte de almuerzo del sabado

Se implemento la regla especial de sabado:

- si una franja del sabado cruza el bloque `12:00 - 13:30`
- ese tiempo no se cuenta

Esa regla aplica solo para `SATURDAY`.

Ejemplo:

- `10:30 - 15:00` el sabado
- se descuenta `12:00 - 13:30`
- tiempo efectivo: `3 horas`

La logica de calculo se centralizo en:

- `src/modules/carga-academica/domain/calculate-academic-load-hours.ts`

### 8. Notificaciones

Se empezo a integrar `sonner` para feedback visual del modulo.

Actualmente quedo usado al menos en el flujo de guardado de `Carga academica`, y se dejo el patron preparado para extenderlo al resto de acciones.

## Estado Actual Del Proyecto

### Confirmado como funcionando

- conexion Prisma + Supabase
- catalogos persistidos en base de datos
- formulario de carga usando catalogos reales
- guardado real de cargas academicas
- calculo correcto de horas para `CESDE`
- correccion del calculo con receso de almuerzo del sabado

### Implementado en codigo y listo para probar o seguir afinando

- editar asignacion
- eliminar asignacion
- activar asignacion
- desactivar asignacion
- reutilizacion del modal para crear y editar
- acciones por fila en el listado

### Validacion tecnica realizada

- se ejecutaron revisiones de diagnosticos
- `npm run lint` quedo pasando sin errores al cierre de la sesion

## Problemas Que Aparecieron Y Como Se Resolvieron

### 1. Prisma no leia correctamente la configuracion

Problema:

- Prisma estaba intentando conectarse por rutas locales intermedias o con configuracion incompleta.

Solucion:

- se ajusto `prisma.config.ts`
- se dejo carga correcta desde `.env.local`

### 2. Cliente Prisma desactualizado en runtime

Problema:

- aparecieron errores como `undefined` sobre delegates nuevos, especialmente con `trimesterCatalog`

Solucion:

- se reforzo `src/shared/lib/prisma.ts`
- se regenero el cliente
- se hicieron ajustes para evitar depender de una instancia cacheada desactualizada

### 3. Errores por build viejo o runtime en cache

Problema:

- en varias ocasiones el navegador o el dev server siguieron mostrando comportamiento anterior aunque el codigo ya estaba corregido

Solucion:

- reiniciar `npm run dev`
- hacer recarga fuerte del navegador

### 4. Calculo de horas incorrecto para CESDE

Problema:

- el sistema seguia mostrando `3 h` donde debian ser `4 h`

Solucion:

- se centralizo la regla institucional
- se forzo `45 minutos` para `CESDE`
- se separo la logica en una funcion de dominio reutilizable

## Archivos Clave Tocadas En La Sesion

### Base de datos y cliente

- `prisma/schema.prisma`
- `prisma.config.ts`
- `src/shared/lib/prisma.ts`

### Carga academica

- `app/(app)/carga-academica/page.tsx`
- `src/modules/carga-academica/application/create-academic-load-action.ts`
- `src/modules/carga-academica/application/get-carga-academica-form-view-model.ts`
- `src/modules/carga-academica/application/get-carga-academica-list-view-model.ts`
- `src/modules/carga-academica/domain/calculate-academic-load-hours.ts`
- `src/modules/carga-academica/infrastructure/academic-loads-repository.ts`
- `src/modules/carga-academica/ui/academic-load-create-modal.tsx`
- `src/modules/carga-academica/ui/academic-load-form-sections.tsx`
- `src/modules/carga-academica/ui/academic-load-list-screen.tsx`
- `src/modules/carga-academica/ui/academic-load-module.tsx`
- `src/modules/carga-academica/ui/academic-load-row-actions.tsx`
- `src/shared/hooks/carga-academica/use-academic-load-create-modal.ts`

### Catalogos

- `app/(app)/carga-academica/catalogos/page.tsx`
- `src/modules/carga-academica/application/catalog-actions.ts`
- `src/modules/carga-academica/application/get-carga-academica-catalogs-view-model.ts`
- `src/modules/carga-academica/infrastructure/academic-catalogs-repository.ts`
- `src/modules/carga-academica/ui/academic-catalogs-screen.tsx`

## Donde Quedo El Trabajo

El proyecto quedo en una etapa funcional importante:

- ya existe persistencia real
- ya existen catalogos reutilizables
- ya existe carga academica real conectada a base de datos
- ya se incorporaron reglas reales del negocio docente

El siguiente foco natural ya no es infraestructura sino consolidacion funcional del modulo `Carga academica` y su continuidad hacia `Horarios` y `Nomina`.

## Siguiente Paso Recomendado

### Prioridad inmediata

Validar en interfaz el bloque recien implementado para asignaciones:

- editar
- eliminar
- activar
- desactivar

### Despues de eso

1. Mejorar las notificaciones con `sonner` para todos los flujos de catalogos y asignaciones.
2. Mostrar previsualizacion de horas dentro del modal antes de guardar.
3. Conectar `Carga academica` con el futuro modulo `Horarios`.
4. Empezar a traducir el calculo de horas reconocidas hacia reglas de `Nomina`.

## Como Retomar En Una Futura Sesion

Si en otra sesion se necesita continuar, el punto de partida recomendado es:

1. Verificar que el servidor este corriendo limpio con `npm run dev`.
2. Entrar a `carga-academica`.
3. Confirmar que el listado cargue datos reales.
4. Probar crear, editar, activar, desactivar y eliminar una asignacion.
5. Si algo no coincide visualmente con el codigo, reiniciar el dev server y recargar fuerte el navegador.

## Nota Final

La sesion no se quedo en una fase conceptual. Se avanzo sobre implementacion real, persistencia real y reglas reales del negocio. El modulo `Carga academica` ya esta funcionando como una base seria sobre la cual seguir construyendo `Horarios`, `Nomina` y automatizaciones futuras.
