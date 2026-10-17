# Especificación: web de la asesoría fiscal y bancaria de Iago

- **Fecha**: 17/10/2026
- **Estado**: borrador. Falta que lo apruebe la usuaria y que Iago responda a las preguntas abiertas.
- **Fuentes**: `CLAUDE.md`, `docs/briefing.md` (todo el documento, también las «Notas para la especificación») y el código de `src/`.

> **Aviso sobre los borradores.** En este documento, todo texto con contenido fiscal o bancario es una **propuesta**. Lleva la marca `<!-- PENDIENTE REVISIÓN ASESOR -->` y no se publica hasta que Iago lo apruebe. No se ha inventado ningún dato: ni plazos, ni tipos, ni importes, ni horarios, ni emails, ni formación.

> **Tratamiento provisional: de usted.** Iago todavía no ha dicho si trata a sus clientes de tú o de usted. Los borradores van **de usted** porque, con un público variado (también personas mayores o que tramitan una herencia), quedarse algo formal es menos arriesgado que tutear de más. Iago habla siempre **en primera persona del singular** («le ayudo», «reviso»): es un profesional independiente, no una empresa. Si Iago elige el tú, se reescriben todos los textos antes de publicar.

---

## 1. Contexto

### Qué pidió el cliente (según el briefing)

- La web de un **asesor independiente, Iago**, para **particulares y autónomos**.
- **Servicios fiscales**: «declaraciones de la renta; trimestrales de IVA; impuesto de sucesiones y donaciones; gestión de ayudas y becas».
- **Servicios bancarios**: «hipotecas, préstamos personales, créditos, depósitos y planes de pensiones». **No está inscrito en ningún registro.**
- **Precios**: «no se publican. Se hablan por llamada o en persona: la llamada a la acción es "contactar"».
- **Zona**: «no se limita a un sitio. La web no incluye ninguna localización (ni pueblo, ni ciudad, ni dirección)».
- **Contacto**: «le da igual» cómo. El teléfono se publica: **635 52 06 05**. WhatsApp, email, horario y redes sociales están pendientes.
- **Imagen**: «diseño premium». No tiene logo, ni colores, ni fotos. Una sesión de fotos profesional «ayudaría mucho».
- **Casos reales**: hay tres (sucesiones, ayudas y becas, renta). Se pueden usar como testimonios, pero **no tal cual**.
- **Ideas de contenido extra** (calendario del contribuyente, novedades, opiniones de Google): todas pendientes.
- **Datos legales** (titular, NIF, dirección fiscal): pendientes.

### Qué existe hoy

Solo el esqueleto:

- una página única que dice «Web en construcción» (`src/pages/index.astro`);
- una estructura común que ya impide aparecer en buscadores (`src/layouts/Base.astro`);
- un `robots.txt` que bloquea todo (`public/robots.txt`);
- un archivo de estilos base.

No hay contenido, formulario, textos legales ni identidad visual. No hay dominio.

## 2. Objetivo

Quien llegue buscando ayuda con la renta, el IVA, una herencia, unas ayudas o la oferta de un banco debe **entender en pocos segundos que Iago puede ayudarle, confiar en él y llamarle o dejarle sus datos**. Todo ello sin que la web prometa nada que Iago no pueda hacer legalmente ni publique datos fiscales sin verificar.

## 3. Usuarios afectados

| Usuario | Qué busca | Particularidades |
|---|---|---|
| **Particular con la renta** | Que alguien le haga o revise la declaración | Suele llegar en temporada de renta y desde el móvil |
| **Autónomo** | Que le lleven los trimestrales de IVA | Tiene prisa y quiere saber si Iago trabaja con autónomos |
| **Persona con una herencia o una donación** | Entender qué tiene que pagar y que se lo tramiten | Puede estar en un momento delicado (fallecimiento). Necesita un tono sereno |
| **Familia o estudiante con ayudas o becas** | Que le ayuden a solicitarlas | Cuáles exactamente: pendiente |
| **Persona con una oferta de hipoteca o préstamo** | Entender lo que le ofrecen antes de firmar | La web **no** puede presentar a Iago como alguien que consigue financiación |
| **Cliente actual de Iago** | Encontrar su teléfono rápido | Entra directo a contactar |
| **Iago (administración)** | Recibir los contactos y aprobar textos | No es técnico. Revisa y aprueba los contenidos |
| **Usuaria (responsable del proyecto)** | Aprobar la spec, el plan y la dirección visual | |
| **Colaborador legal (abogado o gestoría de confianza)** | Validar los textos bancarios, los textos legales y los testimonios | Pendiente de que Iago decida si lo consulta |

---

## 4. Mapa del sitio

El principio para todas las páginas: **pocas cosas por pantalla**, un mensaje principal en cada bloque y la llamada a la acción («Llamar» / «Contactar») siempre a mano. La dirección visual la decide después `director-arte`.

| Página | Para qué sirve | Contenido mínimo | Depende de (pendiente) |
|---|---|---|---|
| **Inicio** | Que se entienda en segundos quién es Iago, qué hace y cómo contactarle | Presentación breve de Iago, los servicios fiscales, la revisión de ofertas bancarias, testimonios (solo si hay permisos), llamada a contactar | Nombre comercial, foto, tú/usted |
| **Servicios fiscales**: una página por servicio (Renta · IVA trimestral para autónomos · Sucesiones y donaciones · Ayudas y becas) | Que quien busca algo concreto aterrice en una página que habla de su caso | Para quién es, qué hace Iago, cómo se empieza (llamada o formulario). **Sin plazos, importes ni requisitos legales**, salvo los que Iago aporte o los que vengan de una fuente oficial citada | Validación de cada texto por Iago. En ayudas: cuáles |
| **Revisión de ofertas bancarias**: una sola página con hipotecas, préstamos, créditos, depósitos y planes de pensiones | Explicar la ayuda para entender y revisar la documentación de ofertas que el cliente **ya tiene** | Borradores del apartado 6 y aviso de que Iago no es intermediario ni asesor financiero | Validación de Iago (y, si él lo decide, de un abogado). El nombre de la sección también está pendiente |
| **Sobre Iago** | Generar confianza con una persona real | Quién es, cómo trabaja, foto real o, si no la hay, composición tipográfica | Formación, experiencia (datos reales), foto |
| **Contacto** | Llamar o dejar los datos | Teléfono destacado, formulario corto y, si existen, WhatsApp y horario. **Sin dirección ni mapa** | Email de destino, WhatsApp, horario |
| **Mensaje enviado** (confirmación) | Confirmar que el formulario ha llegado | Agradecimiento, qué pasa ahora (sin prometer plazos) y el teléfono por si corre prisa | Plazo de respuesta, si Iago quiere comprometer uno |
| **Aviso legal** | Obligatorio para publicar (LSSI) | Titular, NIF, domicilio, email de contacto y, si los hay, datos de colegio o registro | Titular, NIF, dirección fiscal, email. **Choca con la regla de no publicar ninguna localización** (ver Riesgos) |
| **Política de privacidad** | Obligatoria (RGPD): explica qué se hace con los datos del formulario | Responsable, finalidad, base legal, cuánto tiempo se guardan, derechos y cómo ejercerlos | Titular, NIF, email, tiempo de conservación |
| **Política de cookies** | Obligatoria para publicar | Qué cookies usa la web. La intención es que sean solo las técnicas imprescindibles, sin analítica ni publicidad | Confirmar si habrá analítica. Que haga falta aviso de cookies o no lo confirma quien revise lo legal |
| **Página no encontrada** | Que nadie se quede sin salida | Mensaje breve, enlace a inicio y teléfono | — |

**Navegación principal propuesta**: Servicios · Ofertas bancarias (nombre pendiente) · Sobre Iago · Contacto, más el teléfono siempre visible. Los textos legales van en el pie.

---

## 5. Historias de usuario y criterios de aceptación

### Épica A. Entender y confiar (inicio)

**A1. Como visitante, quiero entender nada más entrar quién es Iago y qué hace, para saber si puede ayudarme.**

- Dado que entro en el inicio desde un móvil, cuando la página carga, entonces en la primera pantalla veo, sin desplazarme: quién es (Iago), qué ofrece (asesoría fiscal y ayuda con documentación bancaria) y una forma de contactar.
- Dado que entro en el inicio, cuando recorro la página, entonces cada servicio fiscal tiene un enlace a su propia página y hay un enlace a la página de ofertas bancarias.
- Dado que leo cualquier página, entonces no aparece ningún pueblo, ciudad, provincia, comunidad autónoma, dirección ni mapa. Las páginas legales son una excepción pendiente de decidir (ver Riesgos).
- Dado que leo cualquier página, entonces no aparece ningún precio, tarifa ni «desde X €».
- Dado que todavía no hay foto real de Iago, entonces no se usa ninguna foto de banco de imágenes ni ilustración genérica en su lugar.

**A2. Como visitante, quiero conocer a Iago, para confiar en una persona y no en una empresa anónima.**

- Dado que entro en «Sobre Iago», entonces veo su nombre, cómo trabaja y, si las ha confirmado, su formación y experiencia.
- Dado que Iago no ha confirmado su formación, sus años de experiencia o el número de clientes, entonces esos datos **no aparecen**. No se rellenan con frases genéricas del tipo «años de experiencia» o «cientos de clientes».
- Dado que los textos hablan de Iago, entonces están escritos en primera persona del singular («le ayudo») y nunca en plural de empresa («nuestro equipo»).

### Épica B. La renta

**B1. Como particular, quiero saber que Iago hace la declaración de la renta, para encargársela.**

- Dado que busco ayuda con la renta y entro en su página, entonces veo para quién es el servicio, qué hace Iago y un botón para llamar o contactar.
- Dado que leo la página, entonces no aparecen fechas de campaña, plazos, deducciones ni importes, salvo los que Iago aporte o los que vengan de una fuente oficial (AEAT) citada con enlace.
- Dado que estoy en el formulario, cuando elijo el motivo, entonces aparece «Declaración de la renta».
- Dado que el texto de la página no ha sido aprobado por Iago, entonces lleva la marca `<!-- PENDIENTE REVISIÓN ASESOR -->` y la página no se publica.

### Épica C. Trimestrales de IVA (autónomos)

**C1. Como autónomo, quiero saber si Iago me puede llevar los trimestrales de IVA, para quitármelos de encima.**

- Dado que entro en la página de IVA trimestral, entonces queda claro que el servicio es para autónomos y cómo empezar.
- Dado que leo la página, entonces no aparecen fechas de presentación, números de modelo, tipos de IVA ni sanciones, salvo los que Iago confirme o los que vengan de una fuente oficial citada.
- Dado que soy autónomo y necesito otra cosa (por ejemplo, la renta), cuando busco en la página, entonces encuentro enlaces a los demás servicios.
- Dado que Iago no ha confirmado si hace otras obligaciones de autónomos, entonces la página no las menciona.

### Épica D. Herencias y donaciones (sucesiones)

**D1. Como persona que ha recibido una herencia o una donación, quiero entender si Iago puede ayudarme con el impuesto, para no equivocarme ni pagar de más.**

- Dado que entro en la página de sucesiones y donaciones, entonces el tono es sereno y respetuoso (puede haber un fallecimiento detrás) y no hay mensajes de urgencia comercial.
- Dado que leo la página, entonces no aparecen porcentajes, reducciones, bonificaciones, plazos ni importes concretos. Tampoco promesas de ahorro («pague menos», «ahórrese miles de euros»).
- Dado que hay un testimonio autorizado sobre sucesiones, entonces puede mostrarse en esta página (ver Épica H).
- Dado que el impuesto depende del lugar de residencia y la web no nombra ningún lugar, entonces el texto no da a entender que se aplican las normas de un territorio concreto. Si Iago trabaja con varios, se pregunta antes cómo contarlo.

### Épica E. Ayudas y becas

**E1. Como familia o estudiante, quiero saber si Iago me ayuda a solicitar ayudas o becas, para no perder una a la que tengo derecho.**

- Dado que entro en la página de ayudas y becas, entonces solo se nombran los tipos de ayuda que Iago haya confirmado que gestiona.
- Dado que Iago no ha confirmado cuáles gestiona, entonces la página habla en general («le ayudo a preparar y presentar la solicitud») sin nombrar ninguna convocatoria, plazo ni cuantía.
- Dado que leo la página, entonces no se promete que la ayuda se vaya a conceder.

### Épica F. Una oferta de hipoteca o préstamo

**F1. Como persona que tiene una oferta de hipoteca o préstamo, quiero que alguien me ayude a entender lo que voy a firmar, para decidir con tranquilidad.**

- Dado que entro en la página de ofertas bancarias, entonces queda claro que Iago ayuda a **entender y revisar la documentación de una oferta que yo ya tengo**. No la consigue, no la negocia y no recomienda productos ni entidades.
- Dado que leo la página, entonces aparece un aviso visible, cerca del contenido y no escondido en el pie: Iago no actúa como intermediario de crédito ni como asesor financiero (texto en el apartado 6).
- Dado que se revisa cualquier texto de la web, entonces no contiene ninguna de las expresiones prohibidas del apartado 6.3.
- Dado que busco «conseguir una hipoteca» y llego aquí, entonces entiendo qué hace Iago y qué no hace, sin falsas expectativas.
- Dado que estoy en el formulario, cuando elijo el motivo, entonces la opción se llama, por ejemplo, «Revisar una oferta de hipoteca o préstamo», y no «Conseguir financiación».
- Dado que Iago no ha validado estos textos (y, si lo decide, un abogado), entonces la página **no se publica**: la web sale solo con los servicios fiscales.

### Épica G. Contactar

**G1. Como visitante con el móvil, quiero llamar a Iago con un toque desde cualquier página, para resolverlo hablando.**

- Dado que estoy en cualquier página y en cualquier punto del desplazamiento, entonces tengo el teléfono a mano: en la cabecera y, en el móvil, siempre accesible sin tener que volver arriba.
- Dado que toco el teléfono en el móvil, entonces se abre la llamada al 635 52 06 05 sin pasos intermedios.
- Dado que estoy en un ordenador sin opción de llamar, entonces el número se lee completo y bien legible para marcarlo a mano o copiarlo.
- Dado que el número aparece en la web, entonces se escribe siempre igual (formato «635 52 06 05») y es el mismo en todas partes.
- Dado que llamo fuera de horario: si Iago ha confirmado un horario, entonces se muestra junto al teléfono. Si no lo ha confirmado, entonces la web no promete atención inmediata ni «24 horas» y ofrece el formulario como alternativa.
- Dado que Iago confirma que tiene WhatsApp en ese número, entonces aparece un enlace para escribirle. **Si no lo confirma, no aparece WhatsApp en ninguna parte.**

**G2. Como visitante que prefiere no llamar, quiero dejar mis datos en un formulario corto, para que Iago me contacte.**

- Dado que abro el formulario, entonces solo pide:
  - **nombre**;
  - **teléfono o email** (al menos uno de los dos);
  - **motivo**, a elegir entre: Renta · IVA trimestral (autónomos) · Herencia o donación · Ayudas y becas · Revisar una oferta bancaria · Otro;
  - **aceptación de la política de privacidad**, con enlace a ella.
- Dado que veo el formulario, entonces no hay opción de adjuntar documentos ni se piden DNI, NIF, ingresos, importes, cuentas bancarias, fecha de nacimiento ni dirección.
- Dado que hay un campo opcional de comentario (pendiente de que la usuaria lo apruebe), entonces es breve y lleva un aviso: «No incluya datos personales ni económicos: los hablaremos por teléfono».
- Dado que envío el formulario sin nombre, sin ninguna forma de contacto o sin aceptar la privacidad, entonces el formulario no se envía, se mantiene lo que había escrito y veo un mensaje de error claro junto a cada campo afectado. Los lectores de pantalla anuncian el error.
- Dado que escribo un email o un teléfono con formato incorrecto, entonces se me indica qué corregir, con un ejemplo, y sin borrar el resto.
- Dado que tengo JavaScript desactivado, entonces el formulario funciona igual: se envía, valida y muestra los errores.
- Dado que lo envío correctamente, entonces veo la página de «Mensaje enviado» con lo que pasará ahora y el teléfono por si corre prisa. **No se promete un plazo de respuesta** salvo que Iago lo confirme.
- Dado que se ha enviado, entonces queda registrado que acepté la privacidad, **con fecha y hora**.
- Dado que envío el mismo formulario dos veces seguidas (doble toque o recarga), entonces no se generan dos solicitudes duplicadas, o Iago puede identificarlas fácilmente.
- Dado que se envía de forma automática (spam), entonces se descarta sin pedir a las personas pasos molestos.
- Dado que falla el envío (sin conexión o error), entonces veo un mensaje claro que me ofrece el teléfono, y no pierdo lo que había escrito.
- Dado que se registra cualquier incidencia técnica, entonces no queda guardado ningún dato personal del formulario en esos registros.

**G3. Como Iago, quiero recibir cada solicitud del formulario de forma clara, para responder sin perder ninguna.**

- Dado que alguien envía el formulario, entonces Iago recibe la solicitud con el nombre, la forma de contacto, el motivo y la fecha.
- Dado que **todavía no hay un email de destino confirmado**, entonces el formulario **no se publica**. La página de contacto muestra solo el teléfono (y WhatsApp, si se confirma).

### Épica H. Testimonios

**H1. Como visitante, quiero leer experiencias reales de otros clientes, para confiar en Iago.**

- Dado que hay al menos un testimonio con **permiso por escrito** del cliente, entonces se muestra con el texto exacto que el cliente aprobó.
- Dado que **no hay ningún permiso**, entonces **la sección de testimonios no aparece**. No hay huecos, ni «próximamente», ni testimonios inventados o de ejemplo.
- Dado que se muestra un testimonio, entonces no tiene nombre completo, lugar, edad, profesión, parentescos ni otros detalles que permitan reconocer a la persona. Tampoco revela su sexo si eso ayuda a identificarla.
- Dado que se muestra un testimonio, entonces no menciona ni insinúa a otras gestorías o asesores («la gestoría anterior», «otros le cobraban»).
- Dado que un testimonio incluye una cifra, entonces es exacta, está respaldada por documentos y el cliente la ha autorizado expresamente. Si no se cumple cualquiera de las tres cosas, se publica sin cifra.
- Dado que un cliente retira su permiso, entonces su testimonio se quita de la web.

### Épica I. Privacidad y textos legales

**I1. Como visitante, quiero saber quién está detrás de la web y qué se hace con mis datos, para fiarme de dejarlos.**

- Dado que estoy en cualquier página, entonces en el pie tengo enlaces a Aviso legal, Privacidad y Cookies.
- Dado que leo el aviso legal y la privacidad, entonces los datos del titular son reales y completos. **Si falta alguno, la web no se publica.**
- Dado que la web usa solo cookies técnicas, entonces la política de cookies lo explica, y quien revise lo legal confirma si hace falta un aviso de cookies.
- Dado que se añadiera cualquier herramienta que use cookies no técnicas (por ejemplo, analítica), entonces antes hay que actualizar la política y pedir consentimiento. No entra en esta versión.

### Épica J. Calidad para todos

**J1. Como visitante con cualquier dispositivo o capacidad, quiero leer y usar la web con comodidad, para no abandonarla.**

- Dado que uso un móvil pequeño, entonces todo se lee sin hacer zoom ni desplazarse en horizontal, y los botones y enlaces se tocan con facilidad (objetivo táctil mínimo de 48 px).
- Dado que navego solo con el teclado, entonces llego a todo, veo siempre dónde estoy (foco visible) y puedo saltar al contenido principal.
- Dado que uso un lector de pantalla, entonces los títulos, el formulario y los errores se anuncian correctamente.
- Dado que tengo JavaScript desactivado, entonces puedo leer todo, navegar, llamar y enviar el formulario.
- Dado que tengo activada la opción de reducir el movimiento, entonces las transiciones se reducen o desaparecen.
- Dado que tengo una conexión lenta, entonces el texto principal y el teléfono aparecen enseguida.
- Dado que cumple WCAG 2.2 AA (contraste, etiquetas, foco), entonces la revisión de accesibilidad no encuentra errores de nivel A ni AA.

### Épica K. Publicación

**K1. Como usuaria, quiero que la web no aparezca en buscadores hasta estar lista, para no publicar datos incompletos.**

- Dado que falta cualquiera de estas cosas: dominio, textos legales completos, aprobación de Iago a los textos con la marca pendiente, entonces la web sigue fuera de los buscadores (como hoy).
- Dado que se publica, entonces ningún texto publicado conserva la marca `<!-- PENDIENTE REVISIÓN ASESOR -->`. Los textos que no se hayan aprobado se quitan, no se publican «a medias».

---

## 6. Servicios bancarios sin presentarse como intermediario ni asesor financiero

Iago **no está inscrito en ningún registro**. Por eso la web solo describe una ayuda para **entender y revisar la documentación de ofertas que el cliente ya tiene**. No consigue financiación, no negocia con entidades y no recomienda productos ni bancos.

**Pregunta obligatoria para Iago**: ¿quiere que un abogado (o su gestoría de confianza) valide esta redacción antes de publicarla? Mientras no haya respuesta y aprobación, esta página no se publica.

### 6.1 Aviso general de la página (borrador)

```
<!-- PENDIENTE REVISIÓN ASESOR -->
Le ayudo a entender la documentación de una oferta bancaria que ya tiene.
No soy intermediario de crédito ni asesor financiero: no tramito ni consigo
financiación, no negocio con entidades y no le recomiendo productos ni bancos.
La decisión es siempre suya.
```

Nota: no se añade «no cobro comisiones de bancos» ni «no trabajo para ninguna entidad» hasta que Iago lo confirme (ver preguntas).

### 6.2 Borradores por servicio

```
<!-- PENDIENTE REVISIÓN ASESOR -->
Hipotecas · Entienda su oferta antes de firmar
Si su banco le ha dado una oferta de hipoteca, la leemos juntos con calma.
Le explico en un lenguaje claro qué dice cada documento y qué condiciones
conviene que tenga presentes, para que firme sabiendo lo que firma.
No consigo hipotecas ni negocio con el banco por usted.
```

```
<!-- PENDIENTE REVISIÓN ASESOR -->
Préstamos personales · Lo que pone la letra pequeña
¿Le han ofrecido un préstamo y no tiene claro lo que significa?
Repasamos juntos la documentación que le han entregado y le explico
cada condición, para que pueda hacer las preguntas oportunas a la entidad.
```

```
<!-- PENDIENTE REVISIÓN ASESOR -->
Créditos · Claridad antes de comprometerse
Una línea de crédito o una tarjeta de crédito pueden tener condiciones
difíciles de leer. Le ayudo a entender la documentación que ya tiene
para que sepa a qué se compromete. La elección es siempre suya.
```

```
<!-- PENDIENTE REVISIÓN ASESOR -->
Depósitos · Saber qué le ofrecen
Si su banco le propone un depósito, le ayudo a entender las condiciones
que figuran en la oferta: duración, remuneración y qué ocurre si necesita
el dinero antes. No le recomiendo depósitos ni entidades.
```

```
<!-- PENDIENTE REVISIÓN ASESOR -->
Planes de pensiones · Entender lo que ya tiene
Si tiene un plan de pensiones o le han ofrecido uno, le ayudo a entender
la documentación y, si lo desea, a revisar cómo encaja en su declaración
de la renta. No vendo ni recomiendo planes de pensiones.
```

Sobre la frase de la renta en los planes de pensiones: solo se mantiene si Iago confirma que lo hace, y sin mencionar deducciones ni límites concretos.

**Nombre de la sección (pendiente)**: se recomienda evitar «Servicios bancarios» o «Asesoría bancaria» a secas, porque pueden sugerir intermediación o asesoramiento. Propuestas: «Revisión de ofertas bancarias» o «Entender su banco».

### 6.3 Expresiones prohibidas en toda la web

Ni en textos, ni en titulares, ni en botones, ni en el título que aparece en los buscadores:

- «le/te conseguimos la hipoteca», «conseguimos su préstamo», «le/te conseguimos financiación»
- «el mejor préstamo», «la mejor hipoteca», «el mejor depósito», «las mejores condiciones»
- «negociamos con el banco», «negociamos por usted», «hablamos con su banco»
- «asesor financiero», «asesoramiento financiero», «asesor de inversiones», «asesor hipotecario»
- «intermediario», «intermediación», «bróker hipotecario», «gestor de hipotecas»
- «tramitamos su hipoteca/préstamo», «financiación garantizada», «aprobación asegurada»
- «comparamos ofertas de bancos», «le buscamos el banco», «trabajamos con todas las entidades»
- «le recomendamos el plan/depósito/producto que más le conviene», «invierta con nosotros»
- «hipoteca al 100 %», «sin comisiones», «interés más bajo», o cualquier tipo o importe
- Promesas de resultado en lo fiscal: «pague menos impuestos», «ahorro garantizado», «le devolvemos más», «conseguimos su beca».

---

## 7. Testimonios a partir de los casos reales

### 7.1 El permiso por escrito

Cada testimonio necesita un documento firmado (en papel o por email desde la dirección del cliente) que incluya:

1. Nombre y forma de contacto del cliente. Esto **no se publica**: solo es para que Iago pueda demostrar el permiso.
2. **El texto exacto** que se publicará, tal y como aparecerá.
3. Cómo se firmará el testimonio (por ejemplo, «Cliente particular · Herencia»), sin nombre ni lugar.
4. Si se incluye una cifra, cuál es, con autorización expresa para esa cifra.
5. Dónde se publica (esta web) y desde cuándo.
6. Que puede retirar el permiso en cualquier momento, cómo hacerlo y que el testimonio se quitará.
7. Fecha y firma.

**Cómo se guarda**: lo guarda Iago, fuera de la web. Nunca se sube a la web ni al repositorio del proyecto. Es un documento con datos personales, así que el tiempo de conservación y su mención en la política de privacidad lo confirma quien revise lo legal.

### 7.2 Reglas de redacción

- En positivo: lo que hizo Iago. Nunca comparaciones con otras gestorías ni alusiones a ellas.
- Sin lugar, edad, parentesco, profesión ni detalles reconocibles. En un entorno pequeño, «un hombre con una herencia» ya se reconoce.
- Cifras solo si son exactas, están documentadas y el cliente las autoriza. El briefing dice «**unos** 4.000 €»: hoy **no** es una cifra exacta, así que por defecto el testimonio va sin cifra.
- El cliente aprueba el texto final palabra por palabra. Los borradores de abajo son solo una propuesta para enseñarle.

### 7.3 Borradores de los tres casos

**Caso 1. Sucesiones y donaciones**

```
<!-- PENDIENTE REVISIÓN ASESOR · PENDIENTE PERMISO DEL CLIENTE -->
«Iago revisó la liquidación del impuesto con calma y me explicó cada paso.
Se aplicaron las reducciones que me correspondían. Fue un alivio tener
a alguien que me lo explicara todo con claridad.»
— Cliente particular · Sucesiones y donaciones
```

Variante con cifra, solo si se cumplen las tres condiciones: «…Se aplicaron las reducciones que me correspondían, por un importe de [CIFRA EXACTA Y DOCUMENTADA]». Hay que confirmar con Iago qué representa exactamente la cifra, sin compararla con el cálculo de nadie.

**Caso 2. Ayudas y becas**

```
<!-- PENDIENTE REVISIÓN ASESOR · PENDIENTE PERMISO DEL CLIENTE -->
«Iago se encargó de preparar y presentar las solicitudes de ayudas y becas,
y me fue explicando todo. Este año he vuelto a confiar en él para
[CONFIRMAR: ¿la renta? ¿las ayudas?].»
— Cliente particular · Ayudas y becas
```

No se menciona el borrador que la otra gestora no envió.

**Caso 3. Declaraciones de la renta**

Tal como está en el briefing, no es un testimonio: es una afirmación de Iago sobre su trabajo. Hay dos opciones:

- (a) **Testimonio de un cliente concreto** de renta, con permiso:

  ```
  <!-- PENDIENTE REVISIÓN ASESOR · PENDIENTE PERMISO DEL CLIENTE -->
  «Hago la renta con Iago [CONFIRMAR: desde hace X años]. Me lo explica
  todo con claridad y me da tranquilidad.»
  — Cliente particular · Declaración de la renta
  ```

- (b) **Frase en «Sobre Iago»**, sin lugar y sin números que no estén confirmados:

  ```
  <!-- PENDIENTE REVISIÓN ASESOR -->
  Cada año preparo la declaración de la renta de muchas personas y familias.
  ```

  Si se quiere poner una cifra, tiene que ser real y darla Iago.

### 7.4 Si no hay ningún permiso

La sección de testimonios no existe en la web. No aparece ningún hueco, texto provisional ni testimonio de ejemplo. Las opiniones de Google quedan fuera de esta versión (ver apartado 9).

---

## 8. Borradores breves de los servicios fiscales

Son una orientación para el tono. No contienen ningún dato fiscal, y todos están pendientes de Iago.

```
<!-- PENDIENTE REVISIÓN ASESOR -->
Declaración de la renta · Hecha con cuidado y explicada con claridad
Preparo su declaración, reviso que esté todo y le explico el resultado
para que sepa qué presenta.
```

```
<!-- PENDIENTE REVISIÓN ASESOR -->
IVA trimestral para autónomos · Usted a lo suyo; los trimestres, conmigo
Me encargo de preparar y presentar sus declaraciones trimestrales de IVA
para que no tenga que estar pendiente de ellas.
```

```
<!-- PENDIENTE REVISIÓN ASESOR -->
Herencias y donaciones · Acompañamiento con calma
Le ayudo con el impuesto de sucesiones y donaciones: reviso la documentación,
compruebo que se aplica lo que le corresponde y le explico cada paso.
```

```
<!-- PENDIENTE REVISIÓN ASESOR -->
Ayudas y becas · Que no se le pase ninguna
Le ayudo a preparar y presentar las solicitudes de las ayudas y becas
a las que puede optar.
```

La frase «que no se le pase ninguna» debe validarla Iago, porque puede leerse como una promesa.

---

## 9. Fuera de alcance (primera versión)

- **Calendario del contribuyente.** Solo entraría en una versión posterior si Iago lo pide y se compromete a revisarlo, y siempre con fechas sacadas de la AEAT y citadas. No se publica ninguna fecha ni plazo propio.
- **Novedades o artículos.** Solo si Iago confirma con qué frecuencia puede revisarlos. Sin esa respuesta, no entran.
- **Opiniones de Google** u otras plataformas. Además, una ficha de empresa en Google suele pedir una ubicación o una zona de servicio, lo que choca con la regla de no publicar ninguna localización.
- **Reserva de citas en calendario.** Solo si más adelante hace falta.
- **Subida de documentos**, área de clientes, pagos online o presupuestos online.
- **Precios y tarifas.**
- **Chat en directo** y asistentes automáticos.
- **Analítica** con cookies no técnicas.
- **Versión en otros idiomas.**
- **Cualquier servicio bancario** descrito como intermediación o asesoramiento, salvo que en el futuro Iago se inscriba en el registro que corresponda. En ese caso, habría que escribir una spec nueva con su número de registro.
- **Logo e identidad visual**: los propone `director-arte` y los aprueba la usuaria, fuera de esta spec.

---

## 10. Preguntas abiertas

### 10.1 Preguntas abiertas para Iago

**Negocio**

1. ¿Qué nombre comercial quiere usar? ¿Su propio nombre, «Iago + apellido», otro?
2. ¿Qué formación tiene? ¿Está colegiado o es miembro de alguna asociación profesional? Si es así, ¿cuál y con qué número?
3. ¿Cuántos años de experiencia tiene? Solo se publica si da un dato real.
4. ¿Atiende en persona, a distancia (teléfono, videollamada, email) o de las dos formas? Si atiende en persona, ¿dónde, aunque no se publique (su despacho, en casa del cliente…)?
5. ¿Trata a sus clientes de **tú o de usted**? Los borradores van de usted de forma provisional.
6. ¿Trabaja solo o con alguien más?
7. ¿Hay algo que **no** hace y que la gente le pide a menudo, para no dar a entender que lo hace?

**Servicios y registros**

8. Renta: ¿la hace a particulares, a autónomos o a ambos? ¿Algún caso que no acepte?
9. IVA trimestral: ¿hace también otras obligaciones de los autónomos, como otros trimestrales, resúmenes anuales o el alta?
10. Sucesiones y donaciones: ¿las dos? ¿Trabaja con herencias y donaciones de cualquier comunidad autónoma o solo de alguna?
11. Ayudas y becas: ¿cuáles gestiona concretamente?
12. Bancario: ¿valida la redacción del apartado 6? ¿**Quiere que la revise un abogado** antes de publicar?
13. ¿Cobra o ha cobrado alguna comisión de un banco o entidad? ¿Tiene algún acuerdo con alguna? (Si no, se puede añadir «no trabajo para ninguna entidad».)
14. En lo bancario, ¿qué hace exactamente? ¿Solo revisar ofertas que el cliente ya tiene, o también otras cosas? Esto decide si los textos se ajustan a la realidad.
15. Planes de pensiones y depósitos: ¿qué parte hace? ¿Explicar la documentación, cómo afecta a la renta…?
16. ¿Piensa inscribirse algún día en algún registro (Banco de España, comunidad autónoma, DGSFP, CNMV)?
17. ¿Qué nombre prefiere para la sección bancaria? («Revisión de ofertas bancarias», «Entender su banco»…)

**Contacto**

18. ¿Tiene **WhatsApp** en el 635 52 06 05? ¿Quiere que aparezca?
19. ¿A qué **email** deben llegar los formularios? Sin él, el formulario no se publica.
20. ¿Qué **horario** de atención quiere mostrar, si quiere mostrar alguno?
21. ¿Quiere comprometer un plazo de respuesta al formulario, o mejor no dar ninguno?
22. ¿Tiene **redes sociales** que quiera enlazar?
23. ¿Le parecen bien los motivos del formulario? (Renta · IVA trimestral · Herencia o donación · Ayudas y becas · Revisar una oferta bancaria · Otro)
24. ¿Tiene buzón de voz o devuelve las llamadas perdidas? Ayuda a escribir el mensaje para quien llame fuera de horario.

**Testimonios**

25. ¿Qué clientes de los tres casos (u otros) estarían dispuestos a firmar el permiso?
26. Caso 1: ¿fue una herencia o una donación? ¿La cifra es exacta y está documentada? ¿Qué representa exactamente: lo que se dejó de pagar, el importe de las reducciones…?
27. Caso 2: cuando dice «este año ha decidido hacerlo con él», ¿qué es «hacerlo»: la renta, las ayudas…?
28. Caso 3: ¿hay un cliente concreto de renta que quiera dar su opinión? ¿Cuántas declaraciones hace al año, aproximadamente, si quiere que se publique?
29. ¿Tiene ficha de Google con opiniones? (No entra en esta versión.)

**Imagen y fotos**

30. ¿Hará la **sesión de fotos profesional**? ¿Cuándo, aproximadamente? Hasta entonces, se usa composición tipográfica sin fotos.
31. ¿Qué webs de asesorías (u otras) le gustan y por qué? ¿Alguna que no le guste?

**Legal**

32. **Titular** de la web (nombre o razón social) y **NIF**.
33. **Dirección fiscal.** La ley pide un domicilio en el aviso legal, y eso choca con «ninguna localización». ¿Cómo quiere resolverlo? (Hay que consultarlo con quien revise lo legal; ver Riesgos.)
34. ¿Qué email se publica en los textos legales para que la gente ejerza sus derechos de privacidad?
35. ¿Cuánto tiempo quiere conservar los datos de quien escribe por el formulario?
36. ¿Quién revisará los textos legales (aviso legal, privacidad, cookies)? ¿Un abogado, su gestoría…?
37. ¿Cómo y dónde guardará los permisos firmados de los testimonios?
38. Para el calendario del contribuyente y las novedades (fuera de esta versión): ¿le interesan en el futuro? ¿Con qué frecuencia podría revisarlos?

### 10.2 Preguntas para la usuaria

39. ¿Se añade al formulario un campo opcional de comentario breve, con aviso de no incluir datos personales? Ayuda a Iago, pero aumenta el riesgo de recibir datos sensibles.
40. Dominio: ¿quién lo compra y cuándo? La publicación depende de él.
41. ¿Se acepta salir a publicar **solo con los servicios fiscales** si la parte bancaria no está validada a tiempo?
42. ¿Se quiere medir visitas en el futuro? Si es así, se haría sin cookies no técnicas o con consentimiento, en otra entrega.

---

## 11. Riesgos

**Legales**

- **Actividades reguladas.** Describir hipotecas, préstamos, créditos, planes de pensiones o depósitos de forma que parezca intermediación, distribución o asesoramiento puede ser una actividad sin registro y publicidad engañosa. Mitigación: la redacción del apartado 6, la lista de expresiones prohibidas y la validación de Iago (y del abogado, si él lo decide). La página bancaria no se publica sin esa aprobación.
- **Testimonios.** Publicarlos sin permiso, o que la persona se pueda reconocer, afecta a sus datos personales. Hablar de otras gestorías puede ser competencia desleal. Usar cifras inexactas puede ser publicidad engañosa. Mitigación: el apartado 7.
- **Domicilio en el aviso legal frente a «ninguna localización».** La normativa de servicios por internet pide identificar al titular con su domicilio. Es una contradicción con el briefing que **tiene que resolver quien revise lo legal**. Sin resolverla, la web no se publica.
- **Datos personales del formulario.** Solo se piden datos mínimos y se registra el consentimiento con fecha. Riesgo de que alguien escriba datos fiscales en un campo libre. Mitigación: sin adjuntos, campo libre opcional y con aviso, nada personal en los registros técnicos.
- **WhatsApp**: los mensajes pasan por un tercero. Si se activa, hay que mencionarlo en la política de privacidad.
- **Publicar sin textos legales completos.** Mitigación: la web sigue fuera de buscadores y sin publicar hasta tenerlos.

**De negocio**

- **Información fiscal errónea o desactualizada.** Daña la confianza y puede perjudicar al cliente. Mitigación: ningún dato fiscal sin fuente; marca de revisión obligatoria.
- **Expectativas falsas.** Quien llega buscando «conseguir una hipoteca» puede frustrarse. Mitigación: dejar claro qué hace y qué no.
- **Sin localización**, cuesta más aparecer en búsquedas locales y algunas personas confían menos. Mitigación: transmitir cercanía con el nombre, la foto y el teléfono.
- **Formulario sin destino confirmado**: se perderían contactos. Mitigación: no se publica sin email.
- **Mucho contenido pendiente.** Hay riesgo de retrasar la publicación. Mitigación: publicar primero lo aprobado (servicios fiscales, contacto, Sobre Iago) y añadir lo demás después.

**De experiencia de usuario**

- **Sin fotos de Iago**, una web «premium» puede sentirse impersonal. Mitigación: composición tipográfica de calidad hasta tener fotos reales. Nunca fotos de banco de imágenes.
- **Cambiar de usted a tú** más tarde obliga a reescribir todos los textos. Mitigación: resolver la pregunta 5 cuanto antes.
- **Llamadas fuera de horario sin respuesta.** Mitigación: mostrar el horario si existe y ofrecer el formulario como alternativa.
- **Estética premium frente a claridad.** Un diseño muy cuidado no debe esconder el teléfono ni complicar la lectura. Los criterios de la Épica J y del teléfono siempre visible tienen prioridad.

---

Archivos consultados: `CLAUDE.md`, `docs/briefing.md`, `src/pages/index.astro`, `src/layouts/Base.astro`, `public/robots.txt`.
