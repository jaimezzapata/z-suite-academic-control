# Vision UX/UI

## Objetivo

Definir la direccion de experiencia de usuario e interfaz para una aplicacion personal que centraliza gestion academica y laboral.

La UX/UI debe hacer que el sistema se sienta:

- claro
- rapido
- confiable
- ordenado
- conectado entre modulos
- minimalista
- con color bien controlado

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

### 6. Identidad visual con personalidad

La aplicacion no debe sentirse plana ni excesivamente corporativa.

Debe tener una identidad con color y personalidad, pero desde una base limpia, calmada y sobria.

## Perfil de uso

La app esta pensada como una herramienta de uso frecuente, casi diario, para una sola persona o un uso muy personal.

Por lo tanto, la experiencia debe favorecer:

- acceso rapido
- paneles resumen
- formularios directos
- navegacion predecible
- filtros utiles

## Estructura UX sugerida

### Login

El login debe ser la primera experiencia fuerte del producto.

Debe transmitir tres ideas desde el primer momento:

- control
- organizacion
- claridad

#### Objetivo del login

- permitir acceso rapido
- dejar claro que es una herramienta personal y moderna
- conectar visualmente con el resto de la aplicacion

#### Flujo recomendado

- pantalla limpia de acceso
- boton principal de `Continuar con Google`
- mensaje corto que explique el proposito de la app
- estado visual claro de carga, error y exito

#### Criterios de diseño del login

- composicion simple y limpia
- jerarquia clara entre branding y accion principal
- poco texto
- uso medido del color
- experiencia breve, sin pasos innecesarios

#### Sensacion buscada

No debe parecer un login generico. Debe sentirse como entrada a un centro de control personal academico y laboral, pero sin saturacion visual.

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
- colorido
- sobrio
- funcional

### Direccion visual

La interfaz debe mezclar:

- estructura clara para productividad
- color suficiente para dar vida y personalidad
- recursos visuales muy medidos

### Personalidad visual

La aplicacion debe sentirse:

- serena
- clara
- confiable
- organizada
- contemporanea

No debe sentirse:

- aburrida
- demasiado corporativa
- gris
- generica
- sobrecargada
- estridente
- neon

### Paleta conceptual

La paleta puede construirse alrededor de una combinacion como esta:

- azul profundo para confianza, estructura y enfoque
- verde o turquesa para crecimiento, control y claridad
- naranja o amarillo para energia, alertas y accion
- morado como acento para identidad visual y contraste
- neutros suaves para fondos, superficies y lectura

La idea no es usar todos los colores al mismo nivel, sino construir una interfaz limpia donde cada color tenga una funcion puntual.

### Uso del color

- un color principal para identidad base
- un color secundario para elementos de apoyo
- colores de estado para exito, advertencia y error
- acentos graficos para cards, bloques, indicadores y accesos rapidos

### Estilo grafico

Se recomienda una interfaz con recursos visuales como:

- formas geometricas sutiles
- iconografia clara
- tarjetas limpias con acentos de color planos
- superficies claras y respirables

Todo esto debe apoyar la lectura, no competir con ella.

Quedan prohibidos como direccion visual base:

- neones
- degradados o gradientes
- fondos estridentes
- efectos brillantes exagerados

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
- metricas visuales con grafica simple
- bloques destacados para accesos rapidos

## Sistema visual del producto

### Elementos que deben destacar

- resumenes numericos
- proximos eventos
- estados de pago
- carga academica activa
- indicadores de avance o pendientes

### Lenguaje visual esperado

- cards limpias con acentos discretos
- iconos por modulo
- encabezados claros
- bloques de informacion facil de escanear
- combinacion equilibrada de texto, color y datos

## Experiencia por modulo

### Panel

Debe mostrar una vista mixta de agenda, pendientes y nomina, porque ese es el resumen real que necesitas al entrar a la app.

Visualmente debe ser uno de los modulos mas expresivos del sistema, con tarjetas, indicadores y bloques graficos que permitan entender el estado general de un vistazo.

Esa expresividad no debe depender de degradados ni efectos intensos, sino de una buena jerarquia, color plano y composicion limpia.

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

Debe aprovechar color por institucion, periodo o tipo de bloque para facilitar lectura rapida.

### Pendientes

Debe ser uno de los modulos mas accesibles y accionables del sistema.

Debe usar una señal visual fuerte para prioridad, vencimiento y estado.

### Nomina

Debe enfocarse en comparacion clara entre esperado, recibido y diferencia.

En especial, para CESDE debe ayudar a entender cuanto deberia llegar segun horas programadas y cortes de pago.

Debe apoyarse en codigos visuales muy claros para mostrar diferencia positiva, alerta o inconsistencia.

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

Ademas, debe proyectar una identidad visual mas rica: una herramienta productiva que no se siente fria, sino visualmente estimulante y facil de habitar todos los dias.

La riqueza visual debe construirse desde el equilibrio: minimalismo, color bien usado y limpieza general.

## Conclusion

La UX/UI de Z-Suite debe simplificar el trabajo diario y hacer visibles las conexiones entre modulos. El valor de la interfaz no estara solo en verse bien, sino en ayudar a pensar, decidir y ejecutar mejor.
