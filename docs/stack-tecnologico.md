# Stack tecnologico

## Objetivo

Definir el stack tecnologico base de Z-Suite Academic Control para que las decisiones tecnicas del proyecto tengan una direccion clara desde el inicio.

Este documento no solo lista herramientas. Tambien explica por que se eligen, que responsabilidad cumple cada una y que alcance tendran en la primera etapa.

## Principios de eleccion

El stack debe responder a estas necesidades:

- crecimiento modular del sistema
- buena integracion entre frontend y backend
- soporte para reglas de negocio cada vez mas complejas
- facilidad para trabajar bajo `Screaming Architecture`
- base solida para autenticacion, persistencia y futuras integraciones

## Stack principal

### 1. Next.js

Sera el framework principal del proyecto.

#### Rol

- construir la interfaz
- manejar rutas
- integrar frontend y backend en un mismo proyecto
- facilitar proteccion de rutas y sesiones

#### Por que se elige

- permite una base full stack sin dividir el proyecto en dos repositorios
- encaja bien con una app modular
- facilita crecimiento progresivo por modulos

## 2. TypeScript

Sera el lenguaje principal del proyecto.

### Rol

- tipar entidades y casos de uso
- reducir errores al crecer el sistema
- dar claridad a contratos entre modulos

### Por que se elige

- el proyecto tendra bastante logica de negocio
- ayudara a mantener orden entre `Carga academica`, `Horarios`, `Nomina` y los demas modulos

## 3. PostgreSQL

Sera la base de datos principal.

### Rol

- persistir entidades del dominio
- soportar relaciones entre instituciones, periodos, cargas, horarios y pagos

### Por que se elige

- modela bien relaciones complejas
- es robusta para crecimiento futuro
- encaja bien con Prisma

## 4. Prisma

Sera el ORM del proyecto.

### Rol

- definir el modelo de datos
- manejar migraciones
- consultar y persistir informacion desde la app

### Por que se elige

- simplifica mucho el trabajo con PostgreSQL
- hace mas claro el modelo del sistema
- permite evolucionar el schema con orden

## 5. Auth.js

Sera la base para autenticacion.

### Rol

- login
- logout
- proteccion de rutas
- sesion persistente

### Alcance inicial

- autenticacion simple
- usuario unico
- sin registro publico
- sin recuperacion de contrasena
- sin roles complejos

### Por que se elige

- resuelve bien la autenticacion en un proyecto con Next.js
- permite empezar simple sin cerrar el camino a crecer despues

## 6. Zod

Sera la herramienta principal para validacion.

### Rol

- validar datos de formularios
- validar entradas del sistema
- mantener coherencia entre UI y reglas tecnicas

### Por que se elige

- combina muy bien con TypeScript
- ayuda a mantener responsabilidades claras

## 7. Tailwind CSS

Sera la base de estilos del proyecto.

### Rol

- construir layouts
- mantener consistencia visual
- acelerar el desarrollo de interfaz

### Por que se elige

- da velocidad en el desarrollo
- permite un sistema visual limpio y escalable
- encaja bien con componentes reutilizables

## 8. shadcn/ui

Sera la base de componentes visuales reutilizables.

### Rol

- formularios
- dialogos
- tablas
- botones
- componentes base de interfaz

### Por que se elige

- ofrece componentes modernos y flexibles
- no impone una abstraccion rigida
- funciona bien con Tailwind CSS

## Herramientas de soporte

### ESLint

Se mantendra como herramienta base de calidad para detectar problemas tempranos.

### npm

Se mantendra como gestor de dependencias en esta etapa, ya que el proyecto ya parte de esa base.

## Lo que si entra en esta etapa

- `Next.js`
- `TypeScript`
- `PostgreSQL`
- `Prisma`
- `Auth.js`
- `Zod`
- `Tailwind CSS`
- `shadcn/ui`
- `ESLint`

## Lo que no es prioridad ahora

Estas decisiones pueden esperar a una etapa posterior:

- sistema complejo de roles y permisos
- multiusuario real
- proveedores externos de autenticacion
- sistema de colas o workers
- microservicios
- estado global complejo
- capa avanzada de testing end to end

## Decision sobre estado global

Por ahora no se recomienda introducir una libreria de estado global como Redux o Zustand desde el inicio.

La prioridad primero es:

- definir bien el dominio
- construir modulos con responsabilidad clara
- evitar complejidad tecnica prematura

Si mas adelante el proyecto lo necesita, esa decision se puede reevaluar.

## Decision sobre formularios

Todavia no es obligatorio fijar una libreria adicional para formularios.

Se puede comenzar con formularios simples y reevaluar despues si conviene incorporar una herramienta como React Hook Form.

## Decision sobre testing

No se recomienda arrancar definiendo una estrategia de testing demasiado pesada.

La propuesta inicial es:

- validaciones fuertes con TypeScript y Zod
- ESLint como control base
- pruebas enfocadas cuando el dominio critico empiece a crecer, especialmente en `Nomina`

## Orden recomendado de adopcion

1. Next.js + TypeScript
2. Tailwind CSS
3. Auth.js
4. PostgreSQL + Prisma
5. Zod
6. shadcn/ui

Este orden permite comenzar por la base de aplicacion y luego sumar persistencia, validacion y componentes de interfaz.

## Relacion con la arquitectura

Este stack debe servir a la arquitectura del proyecto, no dominarla.

Eso significa:

- los modulos del negocio siguen siendo el centro
- la tecnologia debe acomodarse a `Screaming Architecture`
- la autenticacion se trata como capacidad transversal
- la base de datos y el ORM deben apoyar el dominio, no definirlo

## Regla de componentes

En este proyecto, los componentes deben quedarse enfocados en presentacion.

Eso significa:

- los componentes renderizan interfaz
- reciben props ya preparadas
- disparan callbacks o eventos

Y no significa:

- mezclar reglas de negocio dentro del JSX
- armar logica funcional compleja dentro del componente
- consultar datos o transformarlos directamente en la capa visual

Cuando haya logica, debe salir del componente y vivir en:

- hooks para comportamiento del cliente
- funciones o builders para preparar datos y view models
- capas de aplicacion para casos de uso reales

## Conclusion

El stack tecnologico de Z-Suite debe ser simple, moderno y escalable. La prioridad no es acumular herramientas, sino elegir solo las necesarias para construir una aplicacion modular, segura y preparada para crecer con orden.
