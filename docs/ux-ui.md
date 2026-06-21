# Vision UX/UI

## Objetivo

Definir la direccion de experiencia de usuario e interfaz para una aplicacion personal que centraliza gestion academica y laboral.

La UX/UI debe hacer que el sistema se sienta:

- claro
- rapido
- confiable
- ordenado
- conectado entre modulos

## Idea general del producto

La aplicacion no debe sentirse como muchas herramientas sueltas. Debe sentirse como un panel central de trabajo diario.

El usuario necesita entrar y responder rapidamente preguntas como:

- que tengo hoy
- que materias estoy impartiendo
- que pagos espero recibir
- que pendientes siguen abiertos
- que examenes o entregas estan proximos

## Principios UX

### 1. Claridad primero

La interfaz debe priorizar lectura rapida, estructura limpia y acciones entendibles.

### 2. Flujo natural

Las acciones frecuentes deben requerir pocos pasos:

- registrar periodo
- registrar empresa
- crear materia
- asignar horario
- crear recordatorio

### 3. Contexto conectado

Cada pantalla debe mostrar relaciones utiles con otros modulos.

Ejemplos:

- una materia debe mostrar horarios, examenes y documentos relacionados
- una empresa debe mostrar pagos y materias asociadas
- un periodo debe agrupar horarios, pendientes y seguimiento

### 4. Baja friccion

El sistema debe reducir trabajo manual, repetitivo y duplicado.

### 5. Escalabilidad visual

La interfaz debe poder crecer sin perder consistencia cuando entren modulos como nomina, examenes o formatos.

## Perfil de uso

La app esta pensada como una herramienta de uso frecuente, casi diario, para una sola persona o un uso muy personal.

Por lo tanto, la experiencia debe favorecer:

- acceso rapido
- paneles resumen
- formularios directos
- navegacion predecible
- filtros utiles

## Estructura UX sugerida

### Panel principal

Debe ser el punto de entrada del sistema y mostrar:

- resumen del dia o semana
- proximos pendientes
- clases u horarios cercanos
- alertas importantes
- pagos esperados o diferencias

### Navegacion principal

Se recomienda una navegacion lateral o superior con acceso a:

- panel
- instituciones
- periodos
- carga academica
- horarios
- nomina
- pendientes
- examenes
- documentos
- drive

### Patron de pantallas

Cada modulo debe repetir un patron consistente:

- vista listado
- vista detalle
- accion crear
- accion editar
- filtros
- relaciones con otros modulos

## Criterios visuales

### Estilo general

- profesional
- limpio
- moderno
- sobrio
- funcional

### Densidad visual

La interfaz no debe ser recargada. Debe tener suficiente aire para leer y operar rapido.

### Jerarquia

Debe existir una jerarquia clara entre:

- resumenes
- datos principales
- datos secundarios
- acciones primarias
- acciones auxiliares

### Consistencia

Botones, tablas, formularios, colores y mensajes deben comportarse igual en todos los modulos.

## Componentes clave

La UI deberia apoyarse en componentes reutilizables como:

- cards de resumen
- tablas con filtros
- formularios por secciones
- modales o drawers para acciones rapidas
- badges de estado
- timeline o lista de pendientes
- calendario o vistas de agenda

## Experiencia por modulo

### Panel

Debe mostrar una vista mixta de agenda, pendientes y nomina, porque ese es el resumen real que necesitas al entrar a la app.

### Instituciones

Debe permitir identificar rapidamente reglas diferentes entre CESDE y SENA, especialmente en periodos, pagos y estructura operativa.

### Periodos

Debe permitir ver rapidamente periodos activos, cerrados y futuros, respetando la logica `anio > institucion > periodo`.

### Carga academica

Debe sentirse como el centro del sistema.

Aqui deberias poder ver de forma clara:

- que te asignaron
- en que institucion
- en que periodo
- que grupo corresponde
- que materia se imparte
- como impacta eso al horario y a la nomina

### Horarios

Debe tener vistas faciles de escanear, idealmente por tabla y calendario.

### Pendientes

Debe ser uno de los modulos mas accesibles y accionables del sistema.

### Nomina

Debe enfocarse en comparacion clara entre esperado, recibido y diferencia.

En especial, para CESDE debe ayudar a entender cuanto deberia llegar segun horas programadas y cortes de pago.

### Examenes

Debe reducir trabajo repetitivo y facilitar la relacion con grupos, materias y documentos.

### Documentos

Debe centralizar planeaciones, evidencias, notas y materiales por institucion, periodo o grupo.

### Drive

Debe prepararse para automatizar estructuras de carpetas basadas en institucion, periodo y grupo.

## Estados de interfaz

Cada vista debe contemplar:

- estado vacio
- estado de carga
- estado con datos
- estado de error
- estado de exito despues de guardar

## Lineamientos de usabilidad

- formularios cortos y agrupados por sentido logico
- validaciones visibles y claras
- textos directos y sin ambiguedad
- acciones principales siempre identificables
- feedback inmediato despues de guardar o editar

## Accesibilidad basica

- contraste legible
- tamanos de texto comodos
- foco visible
- etiquetas claras en formularios
- navegacion consistente

## Vision de diseño

La aplicacion debe sentirse como un centro de control personal: ordenado, confiable y enfocado en productividad real, no en decoracion visual innecesaria.

Tambien debe sentirse cercana a tu lenguaje real de trabajo. Por eso los nombres visibles de los modulos deben mantenerse naturales y alineados con tu dia a dia.

## Conclusion

La UX/UI de Z-Suite debe simplificar el trabajo diario y hacer visibles las conexiones entre modulos. El valor de la interfaz no estara solo en verse bien, sino en ayudar a pensar, decidir y ejecutar mejor.
