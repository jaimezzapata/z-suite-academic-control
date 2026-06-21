# Z-Suite Academic Control

Aplicacion web pensada como una super app personal para centralizar la gestion laboral y academica del dia a dia.

La idea del proyecto es reunir en un solo sistema las actividades relacionadas con instituciones, periodos, carga academica, horarios, nomina, pendientes, examenes, documentos y drive, de manera que todos los modulos compartan informacion entre si.

## Vision

Construir una plataforma personal de trabajo que permita planificar, controlar y automatizar procesos academicos y administrativos desde un unico panel.

No se busca una coleccion de herramientas aisladas, sino un sistema integrado donde:

- las instituciones definan reglas distintas de operacion
- los periodos organicen el trabajo dentro del anio en curso
- la carga academica conecte el trabajo real con horarios y nomina
- el horario impacte la nomina
- los examenes y documentos nazcan del contexto academico real
- los pendientes se generen a partir de necesidades reales del trabajo
- el drive reutilice estructuras repetitivas segun institucion, periodo y grupo

## Objetivo General

Disenar y desarrollar una aplicacion central para organizar, automatizar y dar seguimiento al trabajo academico y profesional en un solo lugar.

## Objetivos Especificos

- Gestionar instituciones con reglas distintas de pago, periodo y operacion.
- Organizar el trabajo bajo la logica `anio > institucion > periodo`.
- Centralizar la carga academica como nucleo del sistema.
- Llevar control de horarios, pagos esperados, pagos recibidos y diferencias.
- Administrar examenes y documentos vinculados al trabajo academico real.
- Integrar pendientes para seguimiento diario.
- Preparar automatizaciones documentales y de Google Drive para etapas posteriores.

## Modulos Principales

Los modulos principales acordados para la app son:

- `Panel`
- `Instituciones`
- `Periodos`
- `Carga academica`
- `Horarios`
- `Nomina`
- `Pendientes`
- `Examenes`
- `Documentos`
- `Drive`

## Estructura Global Del Sistema

La estructura funcional general del sistema se entiende asi:

- contexto: `Instituciones` y `Periodos`
- operacion: `Carga academica` y `Horarios`
- control: `Panel`, `Nomina` y `Pendientes`
- academico-documental: `Examenes`, `Documentos` y `Drive`

El modulo central del sistema es `Carga academica`, porque desde ahi se conectan la mayor parte de relaciones del negocio.

En este modelo, la `carga horaria asignada` puede entrar primero como dato de la carga academica, y el modulo `Horarios` se encarga de distribuir esa carga en dias y horas.

## Enfoque Arquitectonico

El proyecto se construira bajo dos lineamientos principales:

### 1. Responsabilidad unica

Cada modulo, archivo o pieza del sistema debe tener una sola razon de cambio.

### 2. Screaming Architecture

La estructura del proyecto debe gritar el negocio antes que la tecnologia.

Eso significa que la base del proyecto no deberia comenzar por carpetas como `components`, `services` o `utils`, sino por los modulos reales del producto.

La autenticacion existira como capacidad transversal del sistema, no como modulo principal del negocio.

Ejemplo conceptual:

```text
src/
  modules/
    panel/
    instituciones/
    periodos/
    carga-academica/
    horarios/
    nomina/
    pendientes/
    examenes/
    documentos/
    drive/
```

## Contexto Real Del Proyecto

Actualmente el proyecto parte de esta realidad de trabajo:

- se trabaja con al menos dos instituciones: `CESDE` y `SENA`
- cada institucion tiene reglas diferentes de periodo y pago
- `CESDE` maneja semestres o grupos especiales
- `SENA` maneja trimestres
- `CESDE` requiere mayor control de nomina porque el pago depende de horas
- `SENA` puede modelarse despues con mas detalle
- el anio en curso es el contexto base desde el cual se organiza todo

## Entidades Clave Del Sistema

Para que la app crezca con orden, debe pensarse alrededor de entidades centrales y no solo de pantallas o herramientas.

Las entidades principales identificadas hasta ahora son:

- institucion
- anio
- periodo
- carga academica
- horario
- materia
- grupo
- estudiante
- pago
- documento
- plantilla
- pendiente

## Relacion Entre Modulos

Una parte importante de la vision del proyecto es que los modulos no funcionen por separado.

Relaciones principales:

- `Instituciones` define reglas distintas de operacion, pago y estructura documental.
- `Periodos` organiza el trabajo bajo la logica `anio > institucion > periodo`.
- `Carga academica` conecta materias, grupos, horarios y actividad real.
- `Horarios` alimenta a `Nomina`.
- `Nomina` depende especialmente de `Instituciones`, `Periodos`, `Carga academica` y `Horarios`.
- `Pendientes` puede originarse desde cualquier modulo.
- `Examenes` y `Documentos` dependen del contexto academico definido en `Carga academica`.
- `Drive` depende de `Instituciones`, `Periodos` y `Grupos`.

## Enfoque De Desarrollo

Antes de programar todas las funcionalidades, se definio que lo correcto es aterrizar el producto y construir primero un nucleo solido.

### Nucleo recomendado

- instituciones
- periodos
- carga academica
- horarios
- nomina
- pendientes

Ese nucleo permitira despues conectar examenes, documentos, drive e integraciones futuras.

## MVP Sugerido

### Fase 1

- Autenticacion simple de usuario unico
- Gestion de instituciones
- Gestion de periodos
- Gestion de carga academica
- Gestion de horarios
- Nomina inicial con foco en CESDE
- Pendientes

### Fase 2

- Panel
- Examenes
- Documentos

### Fase 3

- Drive
- Automatizaciones documentales

### Fase 4

- Integracion con Google Drive

## Stack Tecnologico Recomendado

Aunque el proyecto actual parte de una base en Vite con JavaScript, la recomendacion para construir esta aplicacion de forma mas ordenada y escalable es migrar a un stack mas adecuado para una app full stack modular.

Stack sugerido:

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Tailwind CSS
- shadcn/ui
- Auth.js
- Zod

Motivos principales:

- Permite manejar frontend y backend en un mismo proyecto.
- Facilita modelar relaciones complejas entre modulos.
- Escala mejor para autenticacion, integraciones, documentos y automatizaciones.
- TypeScript aporta orden y seguridad en una app con mucha logica de negocio.

## Estado Actual Del Desarrollo

Actualmente el proyecto ya no esta solo en fase conceptual. Se avanzaron piezas funcionales y una primera base real de persistencia.

Estado actual resumido:

- autenticacion inicial con Google usando `Auth.js`
- pantalla de login alineada con la linea visual minimalista + color
- shell principal con `sidebar` persistente y perfil autenticado
- modulo inicial de `Carga academica` con listado y modal de creacion
- formulario guiado por metadatos para sede, jornada, grupo, materia, fechas, dias, horas y salon
- notificaciones globales con `sonner`
- base de datos en `Supabase` conectada con `Prisma`
- esquema inicial de `Prisma` para instituciones, periodos, catalogos y carga academica

## Prisma Y Supabase

La persistencia actual del proyecto se apoya en:

- `Supabase` como proveedor de PostgreSQL
- `Prisma 7` como ORM
- `@prisma/adapter-pg` para el cliente de Prisma en runtime
- `prisma.config.ts` para la configuracion de datasource y migraciones

Archivos clave:

- `prisma/schema.prisma`
- `prisma.config.ts`
- `src/shared/lib/prisma.ts`

### Variables necesarias

Se deben definir en `.env.local`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"
```

Regla practica:

- `DATABASE_URL` se usa para el cliente de la app
- `DIRECT_URL` se usa para migraciones e introspeccion

### Scripts disponibles

```bash
npm run prisma:format
npm run prisma:validate
npm run prisma:generate
npm run prisma:db:pull
npm run prisma:migrate:dev -- --name init
npm run prisma:studio
```

### Flujo recomendado con Prisma

1. Ajustar `DATABASE_URL` y `DIRECT_URL` en `.env.local`
2. Revisar o editar `prisma/schema.prisma`
3. Validar el schema con `npm run prisma:validate`
4. Generar el cliente con `npm run prisma:generate`
5. Crear la migracion inicial con `npm run prisma:migrate:dev -- --name init`
6. Abrir `Prisma Studio` si se necesita revisar datos

### Nota importante sobre Prisma 7

En esta version:

- la conexion ya no se declara con `url` dentro de `schema.prisma`
- la configuracion del datasource vive en `prisma.config.ts`
- la CLI de Prisma se configuro para cargar `.env.local` de forma explicita

Esto evita inconsistencias con Next.js, que normalmente si reconoce `.env.local` automaticamente.

## Estado Actual

Actualmente este repositorio funciona como base inicial y espacio de planeacion del producto.

La prioridad en esta etapa es:

- aterrizar la idea
- definir alcance
- establecer modulos reales del negocio
- priorizar el MVP
- preparar la arquitectura correcta antes de implementar
- alinear el proyecto con `Screaming Architecture`
- consolidar persistencia real con `Supabase` + `Prisma`
- empezar a reemplazar mocks del modulo `carga-academica` por datos reales

## Proposito De Este README

Este documento sirve como resumen inicial de la vision del proyecto y como referencia para las siguientes decisiones de producto, arquitectura y desarrollo.

La documentacion detallada de esta etapa se encuentra en la carpeta `docs`.
