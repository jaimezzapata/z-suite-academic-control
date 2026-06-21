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

- un componente visual solo renderiza interfaz y gestiona interaccion de UI
- un caso de uso ejecuta una sola accion del negocio
- un repositorio encapsula acceso a datos
- un esquema valida datos de entrada
- una entidad representa una responsabilidad del dominio

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

## Reglas de organizacion

- cada modulo define su propio lenguaje y responsabilidades
- lo compartido va en `shared` solo si realmente pertenece a mas de un modulo
- evitar utilidades genericas que mezclen responsabilidades
- evitar componentes enormes con logica de negocio incrustada
- evitar acciones de base de datos directamente desde componentes visuales
- evitar crear carpetas principales que no expresen negocio

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

## Entidades iniciales del dominio

Las entidades principales detectadas hasta ahora son:

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

## Relacion entre modulos

La arquitectura debe permitir relaciones claras entre dominios:

- `instituciones` define reglas distintas de operacion, pago y estructura documental
- `periodos` organiza el trabajo bajo la logica `anio > institucion > periodo`
- `carga-academica` conecta materias, grupos, horarios y actividad real
- `horarios` alimenta a `nomina`
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
