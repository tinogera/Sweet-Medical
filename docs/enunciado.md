# Sweet Medical — Plataforma de Seguro de la Salud

**Trabajo Práctico Integrador — 1C 2026** *Enunciado Unificado: Pre-entrega + Entrega 1 + Entrega 2*

---

## Contexto General

Durante los últimos años, la digitalización de los servicios de salud ha cobrado un rol central en la mejora del acceso, la organización y la calidad de la atención médica. La posibilidad de gestionar turnos en línea, consultar cartillas médicas, recibir recordatorios automáticos y coordinar agendas de atención de manera eficiente se ha vuelto una necesidad tanto para pacientes como para profesionales de la salud.

En este contexto, médicos y centros de atención requieren plataformas que les permitan administrar de forma ordenada sus horarios, disponibilidad, sedes de atención y los servicios que ofrecen, sin recurrir a procesos manuales o herramientas desconectadas entre sí. A su vez, los pacientes demandan soluciones simples e intuitivas para buscar profesionales según su obra social, especialidad o ubicación, y reservar turnos de manera rápida y confiable.

Como respuesta a esta necesidad, una organización del sector salud ha solicitado el desarrollo de **Sweet Medical**, una plataforma web orientada a la gestión de turnos médicos. El sistema permitirá a los profesionales definir su disponibilidad y los servicios que brindan, mientras que los pacientes podrán consultar la cartilla de acuerdo a su cobertura y solicitar turnos disponibles.

Dependiendo del plan de la obra social del paciente, algunas prestaciones estarán totalmente cubiertas, otras parcialmente cubiertas y otras no cubiertas, lo que impactará directamente en el costo final del turno reservado. El sistema deberá contemplar estas reglas de cobertura al momento de la reserva.

Además, la plataforma contará con un sistema de notificaciones que mantendrá informados a pacientes y profesionales ante eventos relevantes del ciclo de vida de un turno, tales como solicitudes, confirmaciones, cancelaciones, modificaciones de fecha y recordatorios previos a la atención.

El desarrollo del sistema se organizará en distintas iteraciones, cada una enfocada en un conjunto específico de funcionalidades clave, permitiendo evolucionar progresivamente la solución desde el modelo de dominio hasta su puesta en producción.

---

## Descripción del Dominio

Los médicos tienen especialidades y pueden realizar distintas prácticas, trabajan en una o más sedes, y definen su disponibilidad horaria por día de la semana. Los pacientes pertenecen a una obra social que tiene planes, y cada plan define qué cobertura aplica (total, parcial o ninguna) para cada especialidad o práctica.

El sistema debe permitir generar turnos disponibles en base a la agenda del médico, reservarlos para un paciente, y hacer seguimiento de su estado a lo largo del tiempo (`DISPONIBLE`, `RESERVADO`, `CONFIRMADO`, `CANCELADO`, `REALIZADO`), registrando quién realizó cada cambio y con qué motivo. Cuando el estado de un turno cambia, se deben generar notificaciones a los usuarios involucrados.

### Notificaciones

El Product Owner ha definido los siguientes eventos que disparan notificaciones:

- Al **reservar** un turno: se notifica al médico indicando paciente y servicio solicitado (especialidad o práctica).
- Al **aceptar** un turno: se notifica al paciente.
- Ante **cancelaciones**: se notifica a la contraparte correspondiente.
- El **día previo** al turno: se envía un recordatorio tanto al paciente como al médico.

---

## Requerimientos Funcionales

### Gestión de Turnos

#### Disponibilidad de Médicos

- Cada médico define su disponibilidad horaria.
- A partir de dicha disponibilidad, el sistema genera turnos en estado `DISPONIBLE`.
- Si un médico modifica su disponibilidad:
  - Los turnos existentes con fecha previa a la actual no se modifican.
  - Los turnos existentes `RESERVADOS` con fecha posterior a la actual no se modifican.
  - El cambio impacta únicamente en la generación de turnos futuros y para turnos existentes futuros en estado `DISPONIBLE`.

#### Acciones del Paciente

- Reservar un turno validando disponibilidad.
- Cancelar un turno con al menos 1 hora de anticipación, indicando un motivo.
- Consultar historial personal de turnos.
- Solicitar cambio de fecha de un turno (requiere confirmación).

#### Acciones del Médico

- Cancelar turnos con al menos 1 hora de anticipación, indicando un motivo.
- Consultar historial de turnos de un paciente.
- Proponer modificación de fecha de un turno (requiere confirmación).
- Marcar un turno como realizado.
- Consultar su disponibilidad para una especialidad o práctica.

---

### Gestión de Servicios

Los médicos administran los servicios que ofrecen, entendiendo por "servicios" sus especialidades y/o prácticas:

- Alta de servicios.
- Modificación de servicios.
- Baja de servicios.

---

### Búsqueda de Turnos

La plataforma deberá permitir a los pacientes buscar turnos disponibles teniendo en cuenta tanto criterios médicos como las condiciones de cobertura.

**Filtros soportados (mínimo):**

- Profesional (médico específico).
- Especialidad.
- Práctica.
- Sede de atención.
- Rango de fechas.

**Información de cobertura:** al momento de la búsqueda, el sistema debe considerar la obra social y el plan del paciente para mostrar en cada resultado:

- Si la prestación está cubierta, parcialmente cubierta o no cubierta.
- El monto que el paciente deberá abonar en caso de reservar el turno.

**Datos mostrados en cada resultado:**

- Profesional.
- Especialidad y/o práctica asociada.
- Fecha, hora y sede.
- Estado del turno (siempre `DISPONIBLE` en este contexto).
- Costo estimado para el paciente según su plan.

**Funcionalidades adicionales (Entrega 1):**

- Paginación para mejorar la eficiencia de las consultas.
- Ordenamiento por costo y fecha, ascendente/descendente.

---

### Visualización de Notificaciones

- Obtener la lista de notificaciones **sin leer** de un usuario.
- Obtener la lista de notificaciones **leídas** de un usuario.
- Marcar una notificación como leída.

---

## Iteraciones del Proyecto

### Pre-entrega: Modelo de Objetos + Configuración del Proyecto

En esta primera iteración el foco está en implementar el diseño del modelo de objetos que será la base de la aplicación, y en construir la base del proyecto levantando un servidor sin comportamiento (sin rutas significativas).

**Entregables:**

1. Diagrama de Clases del modelo de dominio diseñado. *(Se recomienda consultar al ayudante para no incurrir en sobre-complicaciones.)*
2. Implementación del Diagrama de Clases en un tag `preentrega` en el repositorio.
3. Servidor con un único endpoint **Health Check** que verifique si el servidor inició correctamente.
4. Explicación del **Git flow** definido para utilizar a lo largo del proyecto.

---

### Entrega 1: Exposición de APIs sin Persistencia

En esta segunda iteración se deben desarrollar todos los endpoints necesarios para cumplir los requerimientos del sistema. Los datos operan **100% en memoria** (sin persistencia de ningún tipo). La API debe seguir el enfoque **REST**.

**Endpoints requeridos:**

- **Disponibilidad de médicos:** gestión de disponibilidad horaria y endpoint para disparar la generación periódica de turnos.
- **Pacientes:** reserva y manipulación de turnos.
- **Médicos:** gestión y manipulación de turnos.
- **Servicios:** ABM de servicios ofrecidos por los médicos.
- **Búsqueda de turnos:** con todos los filtros, paginación y ordenamiento detallados.
- **Notificaciones:** listar no leídas, listar leídas, marcar como leída.

**Entregables:**

1. Implementación de la API REST completa, operando en memoria (Repositorios sobre listas en memoria).
2. Documentación de la API REST con **Swagger** (se permite el uso de dependencias que generen el contenido).

### Entrega 2: Tests de Integración + Persistencia

En esta tercera iteración se agrega la persistencia de la API REST sobre una base de datos NoSQL documental. Además se implementan tests de integración que validen el funcionamiento completo de la API.

#### Persistencia

Se debe garantizar la persistencia en el tiempo de todos los datos necesarios para los casos de uso implementados en iteraciones anteriores: gestión de turnos, gestión de servicios, búsqueda de turnos y visualización de notificaciones.

> **Nota:** el equipo deberá tomar decisiones conscientes sobre qué persistir y qué no; dichas decisiones serán parte de la evaluación.

#### Condiciones de Carrera en la Reserva de Turnos

El sistema debe soportar condiciones de carrera: si dos pacientes intentan reservar el mismo turno disponible en un espacio de tiempo reducido, la API deberá asignar el turno a uno (idealmente el primero) y rechazar al otro con un error adecuado que indique que el turno ya fue reservado.

> **Nota de implementación:** validar el enfoque con el tutor. Se sugiere investigar implementaciones basadas en **Pessimistic Locks** y **Optimistic Locks**.

#### Tests de Integración

Se pide implementar pruebas de integración que validen el funcionamiento de la API en su conjunto. Para cada endpoint se debe validar:

- El **escenario feliz**.
- Al menos **un escenario de error**.

Las pruebas deben garantizar que, dado un request a la API, tanto la response como los efectos sobre la DB sean los esperados.

Para la integración de los tests con la DB es posible mockear los repositorios o usar una DB de prueba en memoria a través de alguna biblioteca.

> **Enfoque recomendado con IA generativa:**
>
> 1. Establecer la estrategia de mocking usada para la DB.
> 2. Crear un par de tests de ejemplo con la estructura buscada.
> 3. Generar los tests para el resto de los endpoints validando que sigan dicha estructura.

**Entregables:**

1. Implementación de la persistencia de las entidades de dominio en una base de datos NoSQL documental (MongoDB).
2. Implementación de los tests de integración de la API (desde el request HTTP hasta la DB).

---

## Tecnologías


| Componente                  | Tecnología                              | Desde       |
| --------------------------- | --------------------------------------- | ----------- |
| Lenguaje                    | JavaScript                              | Pre-entrega |
| Entorno de ejecución        | Node.js                                 | Pre-entrega |
| Framework                   | Express                                 | Pre-entrega |
| Versionado                  | Git + GitHub                            | Pre-entrega |
| Documentación de API        | Swagger                                 | Entrega 1   |
| Base de datos               | MongoDB                                 | Entrega 2   |
| ODM                         | Mongoose                                | Entrega 2   |
| Testing                     | Jest                                    | Entrega 2   |
| IA para generación de tests | Claude Code, Copilot, Antigravity, etc. | Entrega 2   |


