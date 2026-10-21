# Especificación: panel de gestión privado de Iago (CRM + ERP ligero)

- **Fecha**: 21/10/2026
- **Estado**: borrador. Antes de planificar nada, la usuaria tiene que tomar las **decisiones del apartado 0**, y Iago tiene que responder a las preguntas abiertas.
- **Fuentes**: `CLAUDE.md`, `docs/briefing.md`, `docs/specs/2026-10-17-web-asesoria.md`, las skills `pagina-panel`, `nueva-migracion-d1` y `formulario-publico`, y el código de `src/`, `wrangler.jsonc` y `package.json`.

> **Aviso.** Este documento no es asesoramiento legal ni fiscal. Las normas que se citan (RGPD, RD 1619/2012, RD 1007/2023 y su orden de desarrollo) se mencionan para señalar riesgos. No se dan plazos de conservación, fechas de obligatoriedad, tipos de IVA ni retenciones: todo eso tiene que confirmarlo Iago con su gestoría o con un abogado, o sacarse de la AEAT o del BOE con la cita correspondiente.

---

## 0. Decisiones que tiene que tomar la usuaria (resumen)

| # | Decisión | Opciones | Recomendación |
|---|---|---|---|
| **1** | **Cómo se hacen las facturas** (choca con el reglamento Veri\*factu, ver 7.2) | **A.** Facturación completa hecha a mano en el panel y conforme a Veri\*factu · **B.** Iago factura con un programa que ya cumple la normativa y el panel solo anota «facturado / cobrado» y el número de factura · **C.** Por fases: la v1 sin facturas y la decisión entre A y B se toma en la v2 | **C con B**: la v1 sale sin facturación. Iago usa desde ya un programa de facturación que cumpla la normativa, y el panel solo guarda la referencia. Así cambia lo acordado el 21/10 (punto 2), y por eso hay que volver a decidirlo |
| **2** | **El NIF y el domicilio de los clientes** (choca entre los puntos 2 y 4) | **A.** No se guardan en el panel: viven en el programa de facturación · **B.** Se guardan en el panel, solo en unos «datos de facturación» aparte, con la obligación legal como base · **C.** Facturas simplificadas cuando la ley lo permita | **A**: es coherente con la decisión 1 y mantiene la regla de datos mínimos |
| **3** | **Cómo se entra al panel** | Inicio de sesión propio · Cloudflare Access | **Cloudflare Access** (ver 7.3) |
| **4** | **Avisos de las tareas** | Solo dentro del panel · también por email | Solo en el panel en la v1. El email, cuando exista un servicio de envío (ver la pregunta U4) |
| **5** | **Cuándo se borran los contactos descartados** | Con un plazo concreto · a mano | Un plazo, que fije quien revise lo legal (ver 7.4) |

---

## 1. Contexto

### Qué pidió la usuaria (21/10/2026)

1. **Funciones de la v1**: una bandeja con los contactos que lleguen desde la web, con los estados *nuevo, contactado, cliente* y *descartado*; fichas de clientes; trámites o encargos por servicio (*renta, IVA y obligaciones de autónomos, herencias y donaciones, becas educativas, revisión bancaria*), cada uno con su estado; y tareas y recordatorios con fecha.
2. **Facturación**: «sí, facturas completas» desde el panel.
3. **Usuarios**: Iago y la usuaria, dos personas. **Sin área de clientes.**
4. **Datos de clientes mínimos**: nombre, teléfono, email, trámite, estado y notas breves. **Ni NIF, ni importes, ni documentos.**
5. El panel, en castellano.

### Qué existe hoy

- Una web pública de una sola página (`src/components/Inicio.astro`), en castellano y catalán, con contacto por **WhatsApp** y **teléfono**. Por ahora es estática y no tiene servidor.
- **No hay formulario**, porque falta el email de destino (spec del 17/10, G3). Tampoco hay base de datos, inicio de sesión, middleware ni nada en `/panel`. `wrangler.jsonc` solo tiene `SITIO_URL`, vacío.
- **No hay dominio.** La web está con `noindex` y `robots.txt` bloqueando todo.
- Faltan los datos de Iago como emisor de facturas: titular, NIF y domicilio fiscal (briefing, «Legal»).
- Iago recibe muchos contactos por WhatsApp, que hoy no quedan registrados en ninguna parte.

## 2. Objetivo

Que Iago y la usuaria tengan **en un solo sitio privado** a quién hay que contestar, qué trámites tiene cada cliente, en qué punto están y qué hay que hacer hoy, sin que se pierda ningún contacto, ni de la web ni de WhatsApp. Todo **con los datos personales mínimos** y sin crear un riesgo legal con la facturación.

## 3. Usuarios afectados

| Usuario | Qué hace | Particularidades |
|---|---|---|
| **Iago** | Atiende los contactos, lleva los trámites y apunta tareas | No es técnico. Usa mucho el **móvil** (WhatsApp). Necesita dar altas rápidas |
| **Usuaria** | Gestiona el proyecto y ayuda con la gestión | Tiene los mismos permisos que Iago, salvo que se decida otra cosa (pregunta U5) |
| **Visitante de la web** | Deja sus datos en el futuro formulario | Nunca ve el panel |
| **Cliente de Iago** | — | **No tiene acceso.** Sus datos están en el panel: tiene derechos RGPD sobre ellos |
| **Gestoría o abogado de Iago** | Valida la facturación, los plazos de conservación y los textos legales | Se le consulta, no usa el panel |

---

## 4. Historias de usuario y criterios de aceptación

### Épica P0. Acceso privado

**P0.1. Como Iago o la usuaria, quiero entrar en el panel de forma segura desde el móvil o el ordenador, para gestionar sin que nadie más vea los datos.**

- Dado que no he iniciado sesión, cuando abro cualquier dirección del panel (también una que no exista o una que se añada más adelante), entonces no veo ningún dato y se me pide identificarme.
- Dado que soy una persona distinta de las dos autorizadas, cuando intento entrar, entonces se me deniega el acceso sin mostrar qué existe dentro.
- Dado que he entrado, cuando pasa un tiempo sin uso (lo fija el plan técnico), entonces tengo que volver a identificarme.
- Dado que pierdo el móvil o cambio de email, entonces la otra persona (o la usuaria) puede quitarme el acceso o cambiarlo sin tocar código.
- Dado que alguien busca el panel en Google, entonces no aparece: no se indexa, y ni el navegador ni los intermediarios guardan copias.
- Dado que entro desde un móvil de 360 px, entonces todo se puede usar sin zoom, con objetivos táctiles de 48 px (WCAG 2.2 AA).
- Dado que intento entrar muchas veces con datos incorrectos, entonces el sistema me frena y no revela si el email existe.

### Épica P1. Bandeja de contactos

**P1.1. Como Iago, quiero ver en una bandeja todos los contactos nuevos, para no dejar a nadie sin respuesta.**

- Dado que alguien envía el formulario de la web, entonces aparece en la bandeja en estado **Nuevo**, con su nombre, la forma de contacto, el motivo, la fecha y hora, el origen («Web») y la **fecha y hora en que aceptó la privacidad**, que no se puede editar.
- Dado que abro la bandeja, entonces por defecto veo primero los **nuevos**, los más antiguos arriba, y puedo filtrar por estado (*nuevo, contactado, cliente, descartado*) y por motivo.
- Dado que un filtro no tiene resultados, entonces veo un mensaje que lo explica («No hay contactos nuevos»), no una tabla vacía.
- Dado que hay contactos nuevos, entonces el panel muestra cuántos hay en el menú o en la portada del panel.
- Dado que toco el teléfono de un contacto en el móvil, entonces se abre la llamada. Si toco «WhatsApp», se abre la conversación con ese número.

**P1.2. Como Iago, quiero apuntar a mano un contacto que me ha llegado por WhatsApp o por teléfono, para tenerlo todo en el mismo sitio.**

- Dado que estoy en el móvil, cuando pulso «Nuevo contacto», entonces solo se me pide el **nombre**, el **teléfono o el email** (al menos uno), el **motivo**, el **origen** (*WhatsApp, teléfono, en persona, recomendación, otro*) y una nota breve opcional.
- Dado que lo guardo, entonces queda en estado **Nuevo** u otro que yo elija. Se registran la fecha y quién lo dio de alta. No se guarda ninguna fecha de consentimiento, porque no hubo formulario (ver la pregunta L4).
- Dado que falta el nombre o no hay ninguna forma de contacto, entonces no se guarda, se conserva lo escrito y veo el error junto al campo, anunciado a los lectores de pantalla.
- Dado que el teléfono o el email ya existen en otro contacto o cliente, entonces se me avisa y se me ofrece abrir el existente, sin bloquearme.

**P1.3. Como Iago, quiero cambiar el estado de un contacto, para saber qué me queda por hacer.**

- Dado un contacto **Nuevo**, cuando lo marco como **Contactado**, entonces se guardan la fecha y quién lo hizo.
- Dado un contacto **Nuevo** o **Contactado**, cuando lo marco como **Cliente**, entonces se crea su ficha de cliente con sus datos, sin volver a escribirlos, y se me lleva a ella para abrir el primer trámite.
- Dado un contacto, cuando lo marco como **Descartado**, entonces se me pide confirmación y se me informa de cuándo se borrará (ver la decisión 5).
- Dado que Iago y la usuaria cambian a la vez el estado del mismo contacto, entonces solo se aplica un cambio válido y la otra persona ve un aviso. Nunca queda en un estado imposible.
- Dado que un contacto ya es **Cliente**, entonces no puede volver a **Nuevo**. Si fue un error, se corrige desde la ficha (pregunta I6).

### Épica P2. Fichas de clientes

**P2.1. Como Iago, quiero una ficha por cliente con lo mínimo, para saber con quién hablo y qué le llevo.**

- Dado que abro una ficha, entonces veo solo el **nombre, el teléfono, el email, las notas breves, el origen, la fecha de alta** y la lista de sus **trámites** y **tareas**.
- Dado que edito una ficha, entonces **no existe ningún campo** de NIF, DNI, domicilio, fecha de nacimiento, cuenta bancaria, ingresos o importes. Tampoco se pueden adjuntar archivos.
- Dado que escribo una nota, entonces tiene un límite breve de caracteres (lo fija el plan) y un aviso fijo: «Nada de datos económicos, de salud ni números de documentos».
- Dado que busco por nombre, teléfono o email (también con una parte), entonces encuentro al cliente desde cualquier pantalla del panel.
- Dado que una ficha no existe (dirección inventada o cliente borrado), entonces veo una página de «no encontrado», no una ficha vacía.

**P2.2. Como Iago, quiero borrar por completo a un cliente cuando me lo pida, para cumplir con su derecho de supresión.**

- Dado que pulso «Eliminar cliente», entonces se me pide una confirmación clara: es un botón de peligro, distinto de los demás, y se avisa de que se borran también sus trámites, tareas y notas.
- Dado que confirmo, entonces se borran sus datos del panel. Queda solo un apunte anónimo de que se hizo un borrado, con fecha y autor, para poder demostrarlo.
- Dado que ese cliente tiene facturas en el programa de facturación, entonces el panel avisa de que **esas facturas no se borran** desde aquí: hay que conservarlas por obligación legal.
- Dado que se ha borrado, entonces la persona puede seguir existiendo en las copias de seguridad hasta que estas caduquen. Esto se explica en la política de privacidad (ver 7.4).

### Épica P3. Trámites o encargos

**P3.1. Como Iago, quiero abrir un trámite para un cliente indicando el servicio, para seguir cada encargo por separado.**

- Dado que abro un trámite, entonces elijo el servicio entre: **Renta · IVA y obligaciones de autónomos · Herencias y donaciones · Becas educativas · Revisión bancaria**.
- Dado que el servicio es «Revisión bancaria», entonces el nombre y las descripciones del panel no usan las expresiones prohibidas del apartado 6.3 de la spec de la web («intermediación», «conseguir hipoteca»…).
- Dado que un cliente tiene varios trámites (por ejemplo, la renta de dos años o la renta y una herencia), entonces aparecen todos en su ficha, cada uno con su estado.
- Dado que abro un trámite, entonces puedo indicar el **año o periodo** al que se refiere (pregunta I3) y una nota breve, con el mismo límite y aviso que en la ficha.
- Dado un trámite, entonces **no se guardan** importes, resultados de declaraciones, cuotas, reducciones ni documentos.

**P3.2. Como Iago, quiero mover cada trámite por sus estados, para ver de un vistazo cómo va todo.**

- Dado un trámite, entonces tiene uno de estos estados (propuesta, pendiente de Iago, ver la pregunta I4): **Pendiente de empezar · Esperando documentación del cliente · En curso · Presentado · Terminado · Cancelado**.
- Dado que cambio el estado, entonces se guardan la fecha y quién lo cambió, y se ve en el historial del trámite.
- Dado que abro la lista de trámites, entonces puedo filtrar por servicio, estado y año, y los filtros se mantienen en la dirección de la página, para poder guardarlos.
- Dado un trámite **Terminado** o **Cancelado**, entonces deja de aparecer en la vista por defecto, pero sigue en la ficha del cliente.

### Épica P4. Tareas y recordatorios

**P4.1. Como Iago, quiero apuntar tareas con fecha, ligadas o no a un cliente o trámite, para no olvidarme de nada.**

- Dado que creo una tarea, entonces tiene un **texto breve**, una **fecha**, la persona a quien se asigna (Iago o la usuaria) y, si quiero, un cliente o trámite asociado.
- Dado que entro en el panel, entonces lo primero que veo es **«Hoy»**: las tareas vencidas (destacadas), las de hoy y los contactos nuevos.
- Dado que marco una tarea como hecha, entonces desaparece de «Hoy» y queda en el historial del cliente o trámite.
- Dado que cambio la fecha de una tarea, entonces se reprograma sin perder el texto.
- Dado que una tarea vence y no la he abierto, entonces en la v1 **solo se avisa dentro del panel** (decisión 4). No llega ningún email ni notificación al móvil, salvo que se decida otra cosa.
- Dado que escribo una tarea, entonces se aplica el mismo aviso de no incluir datos económicos ni de salud.
- Dado que el panel **no publica ni propone fechas fiscales** (plazos de la renta, del IVA…), entonces las fechas de las tareas las pone siempre Iago. Esto aplica la regla de no inventar información fiscal.

### Épica P5. Facturación (según la decisión 1)

**Si se elige la recomendación (C con B), la v1 solo incluye esto:**

**P5.1. Como Iago, quiero anotar en el trámite si está facturado y cobrado, para saber qué me deben, sin duplicar la facturación.**

- Dado un trámite, entonces puedo marcar **«Facturado»** con el **número de factura** del programa de facturación y **«Cobrado: sí/no»**.
- Dado que se marca así, entonces **no se guardan** importes, NIF ni domicilio en el panel (decisión 2-A).
- Dado que filtro «Facturado y no cobrado», entonces veo esos trámites.

**Si la usuaria mantiene la opción A** (facturas completas hechas en el panel), hace falta una **especificación aparte** antes de planificar. Como mínimo, tendría que cubrir: los datos del emisor, los del destinatario (con NIF y domicilio), la numeración correlativa por series, las facturas rectificativas y los requisitos del sistema de facturación del apartado 7.2. Todo ello validado por la gestoría de Iago. No se detalla aquí para no inventar requisitos.

### Épica P6. Protección de datos en el día a día

**P6.1. Como usuaria, quiero que el panel cumpla la regla de datos mínimos, para reducir el riesgo legal.**

- Dado cualquier error técnico, entonces en los registros del sistema **no queda ningún dato personal**: ni nombres, ni teléfonos, ni emails, ni notas.
- Dado que Iago o la usuaria crean, cambian o borran algo, entonces queda un **historial de quién y cuándo**, sin copiar el contenido personal.
- Dado que un cliente pide sus datos (derecho de acceso), entonces desde su ficha se pueden **ver y exportar** sus datos en un formato legible (pregunta U6).
- Dado que un contacto lleva descartado más tiempo que el plazo acordado, entonces se borra automáticamente o aparece en una lista de «pendientes de borrar» (según la decisión 5).
- Dado que hay copias de seguridad, entonces se pueden **recuperar los datos** si se borran por error (ver 7.4) y el plan técnico documenta cuánto tiempo se guardan.

---

## 5. Relación con la web pública

- **El formulario de la web** (spec del 17/10, G2 y G3) sigue sin publicarse hasta que haya email de destino. El panel **no lo desbloquea por sí solo**. Hay que decidir si el formulario puede publicarse guardando en la bandeja, con o sin aviso por email a Iago (pregunta U3).
- El formulario guarda los mismos campos que pide hoy la spec (nombre, teléfono o email, motivo, comentario opcional si se aprueba) más la **fecha y hora del consentimiento**. La bandeja los muestra tal cual.
- Los **motivos** del formulario y los **servicios** de los trámites deberían ser la misma lista. Hoy no coinciden del todo: la spec de la web dice «IVA trimestral» y la portada, «Autónomos: IVA y demás». Pregunta I2.
- Si se publica el formulario, la **política de privacidad** tiene que explicar que los datos se guardan en un sistema de gestión, quién los ve, cuánto tiempo y qué proveedores intervienen (Cloudflare y, si se usa, el programa de facturación).

## 6. Fuera de alcance (v1)

- **Área de clientes**, acceso para clientes, firma o envío de documentos.
- **Subida o almacenamiento de documentos** (DNI, declaraciones, escrituras, extractos).
- **Facturación completa dentro del panel**, si se acepta la recomendación de la decisión 1. Tampoco entran presupuestos, pagos online ni contabilidad.
- **Importes**: ni honorarios, ni resultados de declaraciones, ni deudas.
- **Calendario fiscal automático** o fechas de plazos propuestas por el sistema.
- **Envío de WhatsApp o de emails** desde el panel, e integración con la cuenta de WhatsApp de Iago (los contactos de WhatsApp se apuntan a mano).
- **Notificaciones** por email o al móvil (decisión 4).
- **Informes y estadísticas** más allá de los contadores de la bandeja y de «Hoy».
- **Más de dos usuarios** y permisos por perfil.
- **Panel en catalán** u otros idiomas.
- **Importación** de contactos de la agenda o de WhatsApp.
- **Estética premium** al nivel de la web: el panel tiene que ser sobrio, claro y accesible, sin la dirección visual de la web (pregunta U7).

## 7. Puntos que hay que decidir: análisis y recomendaciones

### 7.1 El choque entre «facturas completas» (punto 2) y «sin NIF» (punto 4)

El Reglamento de facturación (**RD 1619/2012**) exige que una factura completa identifique al destinatario con, entre otros datos, su **NIF** y su **domicilio**. Por tanto, no se pueden cumplir a la vez los puntos 2 y 4 dentro del mismo panel.

- **Opción A (recomendada)**: el NIF y el domicilio **no entran en el panel**. Viven en el programa de facturación, que los necesita y donde la base legal es la obligación legal. El panel solo guarda el número de factura.
- **Opción B**: unos «datos de facturación» aparte en el panel, que solo se piden al emitir una factura, se ven solo en esa parte, se conservan el plazo legal (lo confirma la gestoría) y tienen la obligación legal como base. Es posible, pero amplía los datos sensibles del panel y solo tiene sentido si se elige la facturación propia (7.2-A).
- **Opción C**: **facturas simplificadas**, que en ciertos casos no exigen identificar al destinatario. Tienen límites y excepciones que debe confirmar la gestoría de Iago. No es una solución general.

### 7.2 Veri\*factu: el sistema de facturación tiene que cumplir el reglamento

El **RD 1007/2023** (Reglamento de requisitos de los sistemas informáticos de facturación) y su orden de desarrollo (**Orden HAC/1177/2024**, a confirmar en el BOE) exigen que cualquier programa que emita facturas garantice **integridad, conservación, accesibilidad, legibilidad, trazabilidad e inalterabilidad** de los registros. También exigen un **registro de eventos**, un **código QR** en la factura, una **declaración responsable del productor** del programa y, en la modalidad **Veri\*factu**, el **envío de los registros a la AEAT**. La modalidad sin envío tiene requisitos adicionales. **Las fechas de obligatoriedad se han aplazado.** Aquí no se da ninguna fecha: hay que consultar la vigente en la AEAT o el BOE.

**Qué implica hacerlo a mano (opción A):**
- El proyecto pasa a ser **«productor» de un programa de facturación**, con declaración responsable y responsabilidad si no cumple.
- Haría falta un registro de facturas que no se pueda alterar ni borrar, encadenado, con QR, con registro de eventos, con envío a la AEAT (con certificado electrónico de Iago) y con mantenimiento ante cada cambio normativo.
- Es, con diferencia, la parte más grande y arriesgada del panel. Superaría en tamaño todo lo demás junto.

**Alternativas:**
- **B. Integrar un programa ya conforme**: Iago factura con un programa que ya cumple, sea comercial o, si existe y le encaja, la aplicación gratuita que ha anunciado la AEAT (a confirmar en la AEAT). El panel solo apunta «facturado / cobrado» y el número de factura.
- **C. Por fases**: la v1 sin facturas (solo el apunte de B); en la v2 se decide entre A y B con la experiencia de uso.

**Recomendación: C con B.** Saca de la v1 el mayor riesgo legal, resuelve el choque del 7.1 sin tocar la regla de datos mínimos y deja a Iago facturando conforme a la normativa desde el primer día. Es posible que ya lo haga hoy (pregunta I7). Un detalle: si el domicilio fiscal de Iago está en un territorio foral (País Vasco o Navarra), se aplican otros sistemas propios (pregunta I8).

### 7.3 Acceso: inicio de sesión propio o Cloudflare Access

| | Inicio de sesión propio | Cloudflare Access |
|---|---|---|
| Qué hay que construir | Contraseñas guardadas de forma segura, sesiones, recuperación de contraseña, freno a los intentos repetidos y, mejor, segundo factor | Casi nada: se configura quién puede entrar (dos emails) y el panel comprueba que la petición viene de Access |
| Seguridad | Depende de que todo eso esté bien hecho y mantenido | Probada. Código de un solo uso por email o inicio con Google, con segundo factor si la cuenta lo tiene |
| Coste | Tiempo de desarrollo y mantenimiento | Hay un plan gratuito para pocos usuarios (confirmar las condiciones vigentes) |
| Dependencia | Ninguna externa | De Cloudflare, que ya es el proveedor de la web |
| Experiencia | Usuario y contraseña | Email y código, o Google. Sencillo para Iago |

**Recomendación: Cloudflare Access**, con dos emails autorizados y, además, una comprobación en el propio panel para que ninguna página quede abierta por un error de configuración. **Depende** de que Access funcione con la dirección actual sin dominio propio o de que se compre el dominio (pregunta U2).

### 7.4 Protección de datos

- **Base legal (a validar por quien revise lo legal)**:
  - contactos del formulario: el consentimiento registrado y las medidas precontractuales que pide la propia persona;
  - contactos apuntados a mano (WhatsApp, teléfono): las medidas precontractuales a petición del interesado, aunque falta cómo se le informa (pregunta L4);
  - clientes: la ejecución del encargo;
  - datos de facturación: la obligación legal.
- **Conservación**: un plazo para los contactos descartados, otro para los clientes que dejan de serlo y los plazos legales de las facturas. **No se fijan aquí**: los decide la gestoría o el abogado (pregunta L1).
- **Registro de actividades de tratamiento**: confirmar si Iago debe llevarlo y redactarlo (contactos, clientes, facturación). Pregunta L2.
- **Proveedores**: Cloudflare (alojamiento y base de datos) y, en su caso, el programa de facturación. Hace falta revisar sus contratos de encargo del tratamiento y dónde guardan los datos (pregunta L3).
- **Nada de datos personales en los registros técnicos** (`CLAUDE.md`). Los mensajes de error y las trazas no incluyen nombres, teléfonos, emails ni notas.
- **Notas libres**: son el mayor riesgo de que acaben guardados datos sensibles (salud en las becas, fallecimientos en las herencias, importes). Por eso llevan límite de longitud, un aviso fijo y la regla de no escribir datos económicos ni de salud.
- **Copias de seguridad**: periódicas y recuperables, con un plazo de caducidad conocido. Lo que se borra puede seguir en las copias hasta que caduquen, y la política de privacidad tiene que decirlo.
- **Borrado**: borrar un cliente borra su ficha, sus trámites, sus tareas y sus notas. Queda solo un apunte anónimo del borrado. Las facturas no se borran.
- **Datos mínimos**: el panel **no tiene** campos para documentos, NIF ni importes. Es la forma más segura de cumplir la regla de `CLAUDE.md`.

---

## 8. Preguntas abiertas

### 8.1 Para la usuaria

- **U1.** Decisiones 1 a 5 del apartado 0. En particular: ¿acepta **cambiar lo del 21/10 sobre las «facturas completas desde el panel»** y pasar a la recomendación C con B?
- **U2.** ¿Se compra el **dominio** antes del panel? Afecta al acceso (7.3) y a la publicación del formulario.
- **U3.** ¿Se publica el formulario guardando en la bandeja aunque no haya email de aviso, o se sigue esperando al email de Iago?
- **U4.** ¿Se quiere en el futuro un aviso por email de los contactos nuevos y las tareas vencidas? Haría falta un servicio de envío (skill `emails-transaccionales`).
- **U5.** ¿Iago y la usuaria tienen exactamente los mismos permisos (incluido borrar clientes y gestionar el acceso)?
- **U6.** ¿Se incluye en la v1 **exportar** los datos de un cliente (derecho de acceso y portabilidad) y una exportación completa como copia de seguridad?
- **U7.** ¿El panel lleva algo de la identidad visual de la web o basta con un diseño sobrio y accesible?

### 8.2 Para Iago

- **I1.** ¿Le valen los estados de la bandeja (*nuevo, contactado, cliente, descartado*)? ¿Necesita alguno más, como «sin respuesta»?
- **I2.** La lista de servicios: ¿«IVA y obligaciones de autónomos» es un único servicio o varios? ¿Coincide con los motivos del formulario?
- **I3.** ¿Quiere apuntar el **año o periodo** de cada trámite (renta de 2025, un trimestre concreto…)?
- **I4.** ¿Qué estados tiene un trámite de verdad para él? (Propuesta: pendiente, esperando documentación, en curso, presentado, terminado, cancelado.)
- **I5.** ¿Apunta los contactos de WhatsApp desde el móvil en el momento o al final del día? Esto cambia la prioridad del alta rápida.
- **I6.** Si un cliente deja de serlo, ¿se archiva o se borra? ¿Al cabo de cuánto tiempo?
- **I7.** **¿Cómo factura hoy?** ¿Con qué programa? ¿Cumple la normativa de sistemas de facturación? ¿Emite facturas a todos sus clientes?
- **I8.** ¿Su domicilio fiscal está en un territorio foral (País Vasco o Navarra)?
- **I9.** ¿Está dado de alta como autónomo para facturar estos servicios? Los datos de emisor (titular, NIF, domicilio) siguen pendientes en el briefing.
- **I10.** El IVA y las retenciones de sus facturas: que lo confirme su gestoría. No se fija nada aquí.

### 8.3 Para quien revise lo legal (gestoría o abogado de Iago)

- **L1.** Plazos de conservación: contactos descartados, antiguos clientes y facturas.
- **L2.** ¿Tiene que llevar Iago un registro de actividades de tratamiento? ¿Quién lo redacta?
- **L3.** Contratos de encargo del tratamiento con Cloudflare y con el programa de facturación, y si hay transferencias internacionales.
- **L4.** ¿Cómo se informa de la privacidad a quien llega por WhatsApp o por teléfono y se apunta a mano? (Por ejemplo, con un mensaje con enlace a la política.)
- **L5.** ¿Pueden usarse facturas simplificadas en algún caso (opción 7.1-C)?
- **L6.** Si se mantiene la facturación propia (7.2-A): requisitos exactos y fechas vigentes, con cita de la AEAT o del BOE.

## 9. Riesgos

**Legales**
- **Facturación propia que no cumpla el reglamento** (RD 1007/2023): puede acarrear sanciones para quien produce el programa y para quien lo usa. Mitigación: la recomendación C con B.
- **NIF y domicilio en el panel**: más datos sensibles que proteger. Mitigación: la decisión 2-A.
- **Notas libres con datos sensibles** (salud, fallecimientos, importes). Mitigación: límite, aviso fijo y ningún campo pensado para eso.
- **Contactos apuntados a mano sin información de privacidad**. Mitigación: la pregunta L4.
- **Datos en copias de seguridad tras un borrado**. Mitigación: copias con caducidad conocida, explicada en la política de privacidad.
- **Plazos de conservación inventados**: no se fija ninguno sin validación (L1).
- **Formulario publicado sin política de privacidad completa**: no se publica sin ella (spec del 17/10, épica I).

**De seguridad**
- **Una página del panel olvidada sin proteger**. Mitigación: protección centralizada de todo `/panel` y una comprobación en el panel además de la de Access.
- **Pérdida del móvil o del email** de una de las dos personas. Mitigación: poder quitar el acceso sin tocar código y usar el segundo factor del proveedor.
- **Dependencia del dominio** para el acceso (U2).

**De negocio**
- **El alcance se dispara** si la facturación propia entra en la v1: retrasaría todo lo demás.
- **Que Iago no lo use** si apuntar desde el móvil cuesta. Mitigación: alta rápida con lo mínimo y «Hoy» como pantalla de inicio.
- **Contactos duplicados** entre la web y WhatsApp. Mitigación: aviso de duplicado por teléfono o email.

**De experiencia de usuario**
- **Demasiados estados o campos** para una persona sola. Mitigación: validar las preguntas I1 a I4 antes de construir.
- **Avisos que no llegan** si la tarea solo se ve dentro del panel. Mitigación: «Hoy» al entrar, y el email en una fase posterior (U4).
