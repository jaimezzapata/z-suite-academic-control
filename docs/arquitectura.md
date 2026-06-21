# Arquitectura del sistema

## Objetivo

Definir una arquitectura base para Z-Suite Academic Control que permita crecer por modulos sin perder orden, claridad ni mantenibilidad.

La arquitectura debe apoyar especialmente:

- separacion clara de responsabilidades
- crecimiento incremental por modulos
- facilidad para mantener reglas de negocio
- bajo acoplamiento entre capas
- una estructura que exprese el dominio del producto

## Decision base

La arquitectura del proyecto partira de los nombres reales de los modulos del negocio, no de carpetas tecnicas genericas.

Los modulos base acordados son:

- `panel`
- `instituciones`
- `periodos`
- `carga-academica`
- `horarios`
- `nomina`
- `pendientes`
- `examenes`
- `documentos`
- `drive`

Estos nombres no solo representan el menu de la app. Tambien pueden convertirse en la columna vertebral de la estructura del proyecto.

## Principios arquitectonicos

### 1. Responsabilidad unica

El sistema se construira bajo el principio S de SOLID: cada modulo, archivo, componente o servicio debe tener una sola razon de cambio.

Esto implica:

- un componente visual solo renderiza interfaz y recibe props o callbacks
- un caso de uso ejecuta una sola accion del negocio
- un repositorio encapsula acceso a datos
- un esquema valida datos de entrada
- una entidad representa una responsabilidad del dominio
- la logica, efectos, transformaciones de datos y comportamiento reutilizable viven fuera del componente

### 2. Screaming Architecture

La estructura del proyecto debe gritar el negocio antes que la tecnologia.

En lugar de organizar primero por carpetas como `components`, `hooks`, `services` o `utils`, la aplicacion debe organizarse primero por dominios del negocio:

- `panel`
- `instituciones`
- `periodos`
- `carga-academica`
- `horarios`
- `nomina`
- `pendientes`
- `examenes`
- `documentos`
- `drive`

La idea es que al abrir el proyecto sea evidente que el sistema trata de control academico y laboral, no solo de una app hecha con una tecnologia particular.

En este proyecto, aplicar Screaming Architecture significa que la carpeta principal del dominio debe parecerse al mapa real de tu trabajo como docente.

## Enfoque general

Se propone una arquitectura modular, orientada al dominio, con separacion entre:

- capa de presentacion
- capa de aplicacion
- capa de dominio
- capa de infraestructura

Ademas, el sistema debe contemplar una capacidad transversal de autenticacion simple para proteger el acceso a la aplicacion desde el inicio.

## Capas propuestas

### Presentacion

Responsable de:

- paginas
- layouts
- componentes visuales
- formularios
- tablas
- estados de carga y error
- interaccion del usuario

No debe contener reglas complejas del negocio.

Los componentes deben enfocarse en:

- estructura visual
- composicion de interfaz
- recepcion de props
- disparo de eventos o callbacks

No deben encargarse de:

- obtener o transformar datos de negocio
- construir view models complejos dentro del JSX
- encapsular reglas funcionales
- mezclar acceso a servicios o persistencia

Cuando haya logica o funcionalidad, esta debe salir del componente y vivir en:

- hooks, si se trata de comportamiento de UI o estado del cliente
- funciones o adaptadores, si se trata de preparar datos o construir view models
- casos de uso, si se trata de acciones del negocio

### Aplicacion

Responsable de coordinar casos de uso del sistema.

Ejemplos:

- crear periodo
- registrar materia
- asignar horario
- crear recordatorio
- calcular pago esperado

Esta capa conecta la UI con el dominio y la persistencia.

### Dominio

Es el nucleo del sistema.

Aqui viven:

- entidades
- value objects si llegan a ser necesarios
- reglas del negocio
- contratos o interfaces

Ejemplos de reglas del dominio:

- un horario pertenece a un periodo
- una materia puede relacionarse con varios grupos
- la nomina depende de horas y condiciones registradas
- un recordatorio puede originarse desde distintos modulos

### Infraestructura

Responsable de detalles tecnicos como:

- Prisma
- base de datos PostgreSQL
- autenticacion
- integraciones futuras como Google Drive
- almacenamiento de archivos
- implementaciones concretas de repositorios

La infraestructura depende del dominio, no al reves.

## Estado actual de infraestructura

En el estado actual del proyecto ya existen decisiones tecnicas implementadas, no solo planeadas.

Actualmente ya esta montada la base inicial de infraestructura para:

- autenticacion con `Auth.js` y `Google`
- persistencia con `PostgreSQL` en `Supabase`
- acceso a datos con `Prisma`
- cliente reutilizable de base de datos en `src/shared/lib/prisma.ts`

Esto implica que la capa de infraestructura empieza a tener artefactos concretos que luego deben ser consumidos por los modulos sin romper el principio de responsabilidad unica.

## Persistencia actual con Prisma

La persistencia inicial se definio con `Prisma 7` y un schema base alineado al nucleo del negocio.

Piezas tecnicas actuales:

- `prisma/schema.prisma`
- `prisma.config.ts`
- `src/shared/lib/prisma.ts`

Decision tecnica importante:

- la CLI de Prisma se ajusto para cargar `.env.local` de forma explicita
- `DIRECT_URL` se usa para migraciones e introspeccion
- `DATABASE_URL` se usa para el cliente de la aplicacion

Esto se hizo para evitar inconsistencias entre el comportamiento de `Next.js` y el de `Prisma CLI`.

## Primeras entidades persistentes

El primer corte del modelo persistente ya define entidades que encajan con la arquitectura del dominio:

- institucion
- periodo academico
- sede
- jornada
- grupo
- materia
- salon
- carga academica

Este primer paso confirma que `carga-academica` no solo es central en la UI o en la documentacion, sino tambien en la futura capa de datos.

## Autenticacion inicial

La autenticacion no se modela como un modulo principal del negocio.

Se considera una capacidad transversal del sistema y en esta etapa inicial debe resolver solamente:

- login
- logout
- proteccion de rutas
- sesion persistente

El alcance inicial es de usuario unico, sin registro publico, sin recuperacion de contrasena y sin roles complejos.

## Estructura sugerida

Ejemplo conceptual:

```text
src/
  modules/
    panel/
      ui/
      application/
    instituciones/
      domain/
      application/
      infrastructure/
      ui/
    periodos/
      domain/
      application/
      infrastructure/
      ui/
    carga-academica/
      domain/
      application/
      infrastructure/
      ui/
    horarios/
      domain/
      application/
      infrastructure/
      ui/
    nomina/
      domain/
      application/
      infrastructure/
      ui/
    pendientes/
      domain/
      application/
      infrastructure/
      ui/
    examenes/
      domain/
      application/
      infrastructure/
      ui/
    documentos/
      domain/
      application/
      infrastructure/
      ui/
    drive/
      domain/
      application/
      infrastructure/
      ui/
  shared/
    ui/
    lib/
    validations/
    types/
  app/
    ...
```

## Implementacion actual del encarpetado

Como primer paso, el proyecto ya puede usar:

```text
app/
src/
  modules/
  shared/
```

La carpeta `app/` se mantiene temporalmente en la raiz para no mezclar el arranque arquitectonico con una migracion tecnica prematura de Next.js.

Ademas, en la practica ya existen piezas como:

- `app/` para rutas y layouts de `Next.js`
- `src/modules/` para los modulos del negocio
- `src/shared/hooks/` para comportamiento reutilizable del cliente
- `src/shared/lib/` para utilidades transversales de infraestructura como `prisma`
- `prisma/` para schema y migraciones

## Reglas de organizacion

- cada modulo define su propio lenguaje y responsabilidades
- lo compartido va en `shared` solo si realmente pertenece a mas de un modulo
- evitar utilidades genericas que mezclen responsabilidades
- evitar componentes enormes con logica de negocio incrustada
- evitar acciones de base de datos directamente desde componentes visuales
- evitar crear carpetas principales que no expresen negocio
- los componentes de UI deben quedarse en presentacion; la logica debe salir a hooks o funciones aparte

## Estructura global del negocio

La estructura conceptual del sistema queda asi:

```text
Z-Suite Academic Control
  Contexto
    Instituciones
    Periodos
  Operacion
    Carga academica
    Horarios
    Pendientes
  Control
    Panel
    Nomina
  Academico-documental
    Examenes
    Documentos
    Drive
```

## Centro del modelo

Aunque el proyecto se divide por modulos, el centro operativo del sistema debe ser `carga-academica`.

La razon es que desde ahi se conectan:

- institucion
- periodo
- horario
- nomina
- examenes
- documentos
- drive
- pendientes

Esto significa que `carga-academica` no es solo un modulo mas. Es el punto donde nace el trabajo real que despues alimenta otros procesos.

## Relacion entre carga academica y horarios

En este proyecto, la `carga horaria` no debe entenderse solo como un dato calculado.

En tu flujo real, la institucion puede asignar primero una cantidad de horas y esa carga es la que luego define como construyes el horario.

Por eso:

- `carga-academica` registra lo que fue asignado
- `carga-academica` puede incluir la carga horaria asignada como dato de entrada
- `horarios` distribuye esa carga en dias y bloques concretos
- `nomina` consume la carga asignada y la distribucion horaria segun las reglas de la institucion

Esto permite mantener el mismo encarpetado principal sin confundir responsabilidades.

## Entidades iniciales del dominio

Las entidades principales detectadas hasta ahora son:

- institucion
- anio
- periodo
- carga academica
- carga horaria asignada
- horario
- materia
- grupo
- estudiante
- pago
- documento
- plantilla
- pendiente

## Relacion entre modulos

La arquitectura debe permitir relaciones claras entre dominios:

- `instituciones` define reglas distintas de operacion, pago y estructura documental
- `periodos` organiza el trabajo bajo la logica `anio > institucion > periodo`
- `carga-academica` conecta materias, grupos, carga horaria asignada, horarios y actividad real
- `horarios` distribuye la carga horaria asignada y alimenta a `nomina`
- `nomina` depende especialmente de `instituciones`, `periodos`, `carga-academica` y `horarios`
- `pendientes` puede originarse desde cualquier modulo
- `examenes` y `documentos` dependen del contexto academico definido en `carga-academica`
- `drive` depende de `instituciones`, `periodos` y `grupos`

## Nucleo inicial recomendado

Para la primera etapa se prioriza construir un nucleo fuerte con:

- instituciones
- periodos
- carga academica
- horarios
- nomina
- pendientes

Este nucleo servira como base para agregar despues:

- examenes
- documentos
- drive
- integraciones externas

En el estado actual, el primer modulo que ya empezo a tomar forma visible y tecnica es `carga-academica`, tanto en UI como en definicion de persistencia.

## Decisiones tecnicas alineadas

- framework: Next.js
- lenguaje: TypeScript
- base de datos: PostgreSQL
- ORM: Prisma
- estilos: Tailwind CSS
- componentes base: shadcn/ui
- validacion: Zod
- autenticacion: Auth.js

## Criterios para evaluar si la arquitectura va bien

- cada modulo se entiende por si mismo
- las carpetas expresan negocio y no solo tecnologia
- la logica del negocio no depende de la UI
- agregar una nueva funcionalidad no obliga a modificar demasiadas piezas
- las responsabilidades de cada archivo son claras
- los nombres internos del proyecto se alinean con los nombres reales de la app

## Conclusion

La arquitectura de Z-Suite debe crecer desde el dominio, con responsabilidad unica y estructura modular. La prioridad no es solo que funcione, sino que el sistema pueda evolucionar sin convertirse en una mezcla desordenada de pantallas, consultas y reglas de negocio.

La mejor base para lograrlo es usar los modulos reales del producto como estructura principal del proyecto y hacer que `carga-academica` sea el centro operativo del sistema.
