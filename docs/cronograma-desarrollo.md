# Cronograma de desarrollo

## Objetivo

Definir el orden recomendado de construccion del producto sin atarlo a semanas o fechas, sino a dependencias funcionales y madurez del sistema.

## Criterio general

El desarrollo debe seguir este orden:

- primero el nucleo del dominio
- despues los modulos que dependen de ese nucleo
- al final las automatizaciones e integraciones

La razon es simple: no conviene construir funciones avanzadas si aun no existe una base estable de entidades y relaciones.

## Etapa 0: Base del producto

### Objetivo

Preparar la estructura correcta para comenzar.

### Entregables

- arquitectura modular definida
- estructura del proyecto orientada a dominio
- base de datos inicial modelada
- sistema de autenticacion preparado
- lineamientos de UI y componentes base definidos

## Etapa 1: Nucleo funcional

### Objetivo

Construir el corazon operativo del sistema.

### Modulos

- instituciones
- periodos
- carga academica
- horarios
- nomina
- pendientes

### Resultado esperado

Ya existe una app util para organizar trabajo basico y ya estan sembradas las relaciones principales del sistema.

En esta etapa, la prioridad funcional mas fuerte debe ser `nomina` para `CESDE`, porque es el problema que mas valor operativo puede resolver desde el inicio.

## Etapa 2: Consolidacion academica

### Objetivo

Expandir la parte academica con seguimiento mas detallado.

### Modulos

- examenes
- documentos

### Resultado esperado

La app ya no solo organiza carga y pendientes, sino tambien seguimiento academico estructurado.

## Etapa 3: Consolidacion administrativa

### Objetivo

Consolidar reglas economicas y diferencias por institucion.

### Modulos

- ampliacion de nomina
- reglas por institucion
- pagos esperados
- pagos recibidos
- diferencias y adeudos

### Resultado esperado

La informacion de horarios e instituciones se transforma en control financiero real.

## Etapa 4: Automatizacion documental

### Objetivo

Reducir trabajo repetitivo y estandarizar salidas del sistema.

### Modulos

- documentos avanzados
- plantillas
- generacion automatizada de archivos

### Resultado esperado

El sistema reutiliza informacion ya capturada para producir documentos utiles sin retrabajo.

## Etapa 5: Gestion documental avanzada

### Objetivo

Fortalecer el manejo de archivos y documentos a mayor escala.

### Modulos

- drive
- referencias de archivos
- estructura de carpetas

### Resultado esperado

La documentacion deja de ser solo un registro y se convierte en un subsistema mas ordenado.

## Etapa 6: Integraciones externas

### Objetivo

Conectar el sistema con servicios externos una vez que el modelo interno este estable.

### Modulos

- integracion con Google Drive
- sincronizaciones futuras
- automatizaciones externas

### Resultado esperado

La app amplifica su alcance sin comprometer la consistencia interna.

## Orden resumido

1. Base del producto
2. Nucleo funcional
3. Consolidacion academica
4. Consolidacion administrativa
5. Automatizacion documental
6. Gestion documental avanzada
7. Integraciones externas

## Dependencias importantes

- no construir `nomina` antes de tener `instituciones`, `periodos`, `carga academica` y `horarios`
- no construir `examenes` sin una base clara en `carga academica`
- no construir automatizaciones documentales sin datos confiables en modulos base
- no integrar Google Drive antes de tener clara la estructura documental interna

## Prioridad practica de implementacion

Si hubiera que comenzar hoy, el primer bloque real de trabajo deberia ser:

1. instituciones
2. periodos
3. carga academica
4. horarios
5. nomina
6. pendientes

Despues:

1. panel
2. examenes
3. documentos

Y despues:

1. drive
2. automatizaciones
3. integraciones

## Conclusion

El cronograma de desarrollo de Z-Suite debe seguir la logica del dominio: primero se construyen las bases, luego los modulos dependientes y al final las automatizaciones e integraciones. Asi el producto crece con orden y sentido.

La secuencia recomendada hoy gira alrededor de `instituciones`, `periodos`, `carga academica`, `horarios` y `nomina`, dejando `drive` como una fase posterior cuando el modelo interno ya este bien definido.
