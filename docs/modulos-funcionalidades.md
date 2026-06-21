# Modulos y funcionalidades

## Objetivo

Documentar los modulos funcionales del sistema y dejar claro que resuelve cada uno, que datos maneja y como se relaciona con el resto de la aplicacion.

## Vision funcional

Z-Suite Academic Control es un sistema integrado para organizar trabajo academico y laboral desde un solo lugar.

No se plantea como un conjunto aislado de herramientas, sino como una plataforma donde los modulos comparten informacion.

Los modulos principales acordados para la app son:

- Panel
- Instituciones
- Periodos
- Carga academica
- Horarios
- Nomina
- Pendientes
- Examenes
- Documentos
- Drive

## Estructura funcional global

La estructura funcional general del sistema queda asi:

- contexto: instituciones y periodos
- operacion: carga academica y horarios
- control: panel, nomina y pendientes
- academico-documental: examenes, documentos y drive

El modulo central del sistema es `Carga academica`, porque desde ahi se desprenden la mayor parte de relaciones del negocio.

Adicionalmente, el sistema debe incluir autenticacion simple como capacidad transversal, sin tratarla como un modulo principal visible del negocio.

## Modulo 1: Panel

### Proposito

Dar una vista central del trabajo actual.

### Funcionalidades

- mostrar resumen del dia o semana
- mostrar pendientes proximos
- mostrar horarios cercanos
- mostrar resumen de nomina
- centralizar alertas relevantes

## Modulo 2: Instituciones

### Proposito

Administrar el contexto institucional y las reglas base de operacion.

### Funcionalidades

- registrar instituciones
- definir datos base por institucion
- distinguir reglas de periodo
- distinguir reglas de pago
- servir de base para horarios, carga academica, nomina y drive

### Datos principales

- nombre
- tipo de vinculacion
- tipo de pago
- frecuencia de pago
- observaciones

## Modulo 3: Periodos

### Proposito

Organizar la informacion por ciclos de trabajo academico o administrativo.

### Funcionalidades

- crear periodos
- editar periodos
- marcar periodos activos, futuros o cerrados
- asociar carga academica, horarios y examenes a un periodo
- usar el periodo como contexto para pagos, examenes y seguimiento

### Datos principales

- anio
- institucion
- nombre del periodo
- tipo de periodo
- fecha de inicio
- fecha de fin
- estado

## Modulo 4: Carga academica

### Proposito

Representar el trabajo academico real que te asignan y que conecta casi todos los demas modulos.

### Funcionalidades

- registrar asignaciones o cargas
- asociar institucion y periodo
- asociar materia y grupo
- registrar carga horaria asignada
- registrar modalidad, sede u observaciones
- servir como origen para horarios, nomina, documentos y examenes

### Datos principales

- institucion
- periodo
- materia
- grupo
- carga horaria asignada
- modalidad
- sede
- estado
- observaciones

## Modulo 5: Horarios

### Proposito

Registrar y visualizar la distribucion del tiempo academico y laboral.

### Funcionalidades

- crear bloques de horario
- asociar horario a carga academica
- distribuir la carga horaria asignada en dias y horas
- visualizar horario por dia y hora
- validar coherencia frente a la carga horaria asignada
- servir como base para nomina y planeacion

### Datos principales

- dia
- hora inicio
- hora fin
- institucion
- carga academica
- materia
- grupo
- periodo
- tipo de actividad

## Modulo 6: Nomina

### Proposito

Controlar ingresos esperados, pagos recibidos y diferencias por institucion o periodo.

### Funcionalidades

- registrar pagos esperados
- registrar pagos recibidos
- comparar esperado vs real
- detectar diferencias o adeudos
- usar datos del horario para calculos
- priorizar el flujo de CESDE como primer caso fuerte

### Datos principales

- institucion
- periodo
- carga academica
- carga horaria asignada
- concepto de pago
- monto esperado
- monto recibido
- diferencia
- fecha de pago

## Capacidad transversal: Autenticacion

### Proposito

Proteger el acceso a la aplicacion sin convertir la autenticacion en un modulo principal del negocio.

### Alcance inicial

- login
- logout
- proteccion de rutas
- sesion persistente

### Alcance fuera de esta etapa

- registro publico
- recuperacion de contrasena
- roles complejos
- multiusuario

## Modulo 7: Pendientes

### Proposito

Gestionar tareas, alertas y seguimiento operativo.

### Funcionalidades

- crear pendientes manuales
- crear pendientes vinculados a otros modulos
- definir fechas clave
- marcar pendientes como completados
- visualizar proximos eventos o tareas

### Datos principales

- titulo
- descripcion
- fecha
- prioridad
- estado
- modulo de origen

## Modulo 8: Examenes

### Proposito

Llevar control academico sobre evaluaciones y seguimiento relacionado.

### Funcionalidades

- registrar examenes
- asociar examenes a materias o grupos
- registrar fechas
- guardar estatus o resultados
- dar seguimiento academico

### Datos principales

- materia
- grupo
- fecha
- tipo de examen
- estatus
- observaciones

## Modulo 9: Documentos

### Proposito

Centralizar materiales y documentos relacionados con las materias impartidas.

### Funcionalidades

- registrar planeaciones
- registrar temarios
- guardar notas y evidencias
- relacionar documentos con materias y periodos
- preparar integracion futura con almacenamiento externo

### Datos principales

- titulo
- tipo de documento
- materia
- periodo
- archivo o referencia
- observaciones

## Modulo 10: Drive

### Proposito

Preparar la aplicacion para trabajar con archivos y servicios externos en una etapa posterior.

### Funcionalidades

- estructurar carpetas o contenedores
- conectar documentos del sistema con almacenamiento externo
- repetir estructuras por institucion, periodo y grupo
- integrar Google Drive mas adelante

## Relaciones funcionales clave

- `instituciones` define reglas de operacion, pago y estructura documental
- `periodos` organiza el contexto temporal bajo la logica `anio > institucion > periodo`
- `carga academica` conecta materia, grupo, carga horaria asignada, horario, examenes y documentos
- `horarios` distribuye la carga asignada y alimenta `nomina`
- `pendientes` puede originarse desde cualquier modulo
- `drive` depende de `instituciones`, `periodos` y `grupos`

## Nucleo funcional inicial

El primer conjunto funcional recomendado es:

- instituciones
- periodos
- carga academica
- horarios
- nomina
- pendientes

Ese nucleo crea la base operativa para el resto de la app.

## Conclusion

Los modulos de Z-Suite deben implementarse como partes de un sistema conectado. La prioridad no es solo listar funciones, sino asegurar que cada modulo aporte datos reutilizables para los demas.
