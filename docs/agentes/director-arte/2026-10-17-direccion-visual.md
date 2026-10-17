# Dirección visual: web de Iago, asesor fiscal

- **Fecha**: 17/10/2026
- **Agente**: director-arte, modo A (propuesta). No he implementado nada ni he tocado el repositorio.
- **Fuentes**: `CLAUDE.md` (sección «Estética: premium»), `docs/briefing.md`, `docs/specs/2026-10-17-web-asesoria.md`, `.claude/skills/movimiento-web/SKILL.md`, `src/`.
- **Comprobaciones hechas de verdad, en el scratchpad y fuera del repo**:
  - **Ratios de contraste** calculados con la fórmula WCAG de luminancia relativa, con un script en Python.
  - **Fuentes**: descargué los archivos originales de Google Fonts y los de Fontsource y los inspeccioné con `fontTools`. Miré sus ejes, sus funciones OpenType y si tienen los glifos `«» “” ’ · ñ € ü`. Después medí el peso real en woff2 tras recortar los ejes y dejar solo los caracteres latinos.

> Los textos de ejemplo de este documento (titulares, entradillas) son **propuestas de tono**. Todos llevarían `<!-- PENDIENTE REVISIÓN ASESOR -->` y van de usted y en primera persona, como pide la especificación. No contienen ningún dato fiscal.

---

## 0. Diagnóstico del «antes»

No he hecho capturas: la página actual es un único `<h1>` sin estilos, y las capturas no aportarían nada que no diga el código.

- `src/pages/index.astro:5`: la página solo contiene «Web en construcción». No hay jerarquía, marca ni contacto que evaluar.
- `src/styles/global.css:9`: usa `system-ui`, es decir, no hay ninguna tipografía de marca. El comentario de las líneas 1-2 ya prevé que los tokens los defina director-arte.
- `src/layouts/Base.astro:21-25`: no hay cabecera, ni pie, ni enlace para saltar al contenido. Dos cosas están bien y se mantienen: `lang="es"` y `noindex` (línea 19).
- **Qué funciona**: el punto de partida está limpio, sin deuda visual ni de dependencias. Todo se puede decidir desde cero.
- **Aviso sobre el nombre**: «Iago» es la forma gallega de Santiago. **No hay que apoyarse en eso**: nada de conchas, caminos ni piedra. Sería una referencia geográfica, cosa que el briefing prohíbe, y además un cliché.

---

## 1. Dirección A · «Al margen»

### Concepto

Lo que Iago hace, en el fondo, es **leer un documento con usted y explicarle al margen lo que significa**: una liquidación, una declaración o una oferta de hipoteca. La web se compone como un **libro bien editado y anotado**. Hay una columna principal de texto sereno y una **columna de margen** con notas breves en color lacre: el número de sección, una aclaración, el aviso legal de la parte bancaria. Es papel, tinta y una mano que subraya lo importante.

Todo se decide con una pregunta: *¿esto ayuda a leer con calma?*

### Paleta (tokens)

```css
:root {
  --color-papel:        #F7F3EC; /* fondo general: papel ahuesado, no blanco */
  --color-papel-hondo:  #EEE7DB; /* secciones alternas */
  --color-tinta:        #1C2420; /* texto: negro con un punto de verde */
  --color-tinta-suave:  #4F5852; /* texto secundario, pies */
  --color-pino:         #1E3B32; /* color profundo propio: verde pino */
  --color-pino-claro:   #C9D3CC; /* texto secundario SOBRE pino */
  --color-lacre:        #9E3F2A; /* acento: rojo lacre, solo notas al margen y subrayados */
  --color-lacre-claro:  #E0A08A; /* acento SOBRE pino (punto del logo, foco) */
  --color-linea:        #D9CFBF; /* filetes decorativos, nunca informativos */
  --color-borde-campo:  #857D70; /* borde de campos de formulario */
}
```

**Por qué estos colores**:
- **Pino** es un verde casi negro. No es el azul de banco ni el «verde dinero» brillante.
- **Lacre** es el rojo de los sellos y de la corrección a mano. Usado con mesura, dice «aquí hay algo que conviene mirar».
- No hay dorado ni negro puro.

**Contraste calculado** (en las columnas de AA, «sí» significa que cumple):

| Texto | Fondo | Ratio | AA normal (4,5) | AA grande / no texto (3) | Uso |
|---|---|---|---|---|---|
| tinta #1C2420 | papel #F7F3EC | 14,36:1 | sí | sí | texto principal |
| tinta #1C2420 | papel-hondo #EEE7DB | 12,92:1 | sí | sí | texto en sección alterna |
| tinta-suave #4F5852 | papel #F7F3EC | 6,66:1 | sí | sí | secundario, pies |
| tinta-suave #4F5852 | papel-hondo #EEE7DB | 6,00:1 | sí | sí | secundario en sección alterna |
| pino #1E3B32 | papel #F7F3EC | 10,99:1 | sí | sí | titulares, enlaces, botón y anillo de foco |
| pino #1E3B32 | papel-hondo #EEE7DB | 9,90:1 | sí | sí | titulares y foco en sección alterna |
| papel #F7F3EC | pino #1E3B32 | 10,99:1 | sí | sí | texto y botón sobre pino, foco sobre pino |
| pino-claro #C9D3CC | pino #1E3B32 | 7,92:1 | sí | sí | secundario sobre pino |
| lacre #9E3F2A | papel #F7F3EC | 5,94:1 | sí | sí | notas al margen, numeración |
| lacre #9E3F2A | papel-hondo #EEE7DB | 5,34:1 | sí | sí | notas en sección alterna |
| lacre-claro #E0A08A | pino #1E3B32 | 5,54:1 | sí | sí | punto del logo y detalles sobre pino |
| borde-campo #857D70 | papel #F7F3EC | 3,68:1 | no (no es texto) | sí | borde de campos (WCAG 1.4.11) |
| linea #D9CFBF | papel #F7F3EC | 1,39:1 | no | no | solo decorativo; nunca delimita un campo |
| lacre #9E3F2A | pino #1E3B32 | 1,85:1 | no | no | **prohibido**: usar lacre-claro |
| lacre-claro #E0A08A | papel #F7F3EC | 1,99:1 | no | no | **prohibido** sobre claro |

### Tipografía

**Titulares: Source Serif 4** (Frank Grießhammer para Adobe, licencia OFL). Es una serif variable con eje de tamaño óptico (`opsz` 8–60) y eje de peso (200–900). El archivo original trae versalitas reales (`smcp`, `c2sc`), cifras de estilo antiguo y alineadas (`onum`, `lnum`), cifras tabulares (`tnum`), `case` y fracciones (`frac`). Lo he comprobado en el archivo, no lo supongo.

**Texto: Inter** (OFL), variable, con `tnum`, `case`, `cv11` y `ss01`. Es una sans neutra que deja todo el protagonismo a la serif.

**Hallazgo práctico importante**: los paquetes de **Fontsource** (`@fontsource-variable/source-serif-4`) **eliminan** `smcp`, `onum` y `case`; en ellos solo quedan `tnum`, `pnum` y `frac`. Para tener versalitas y cifras de estilo antiguo, hay que **autoalojar un subconjunto propio** hecho a partir del archivo original de `google/fonts`. Se hace con `pyftsubset`, manteniendo `kern, liga, locl, smcp, c2sc, onum, lnum, tnum, case, frac`, y con `fonttools varLib.instancer` para recortar los ejes. Es un paso único y deja el resultado en `public/fuentes/`.

**Peso medido** (latín básico más los signos de puntuación, en woff2):

| Archivo | Recorte | Peso |
|---|---|---|
| Source Serif 4 redonda | wght 400–600, opsz completo | 110 KB |
| Source Serif 4 cursiva | wght 400–500, opsz completo | 90 KB |
| Inter | wght 400–600 | 49 KB |

- **Se precargan solo dos archivos**: la redonda de la serif y la sans, unos 160 KB en total.
- **La cursiva** se carga sin precarga y con `font-display: swap`, porque solo aparece en citas.
- **Si se quiere bajar más**: fijar `opsz` en dos instancias estáticas, una para texto y otra para titulares.

**Pesos que se usan**:
- Serif 400 en titulares grandes (a tamaño grande, el peso normal ya resulta elegante), 500 en titulares pequeños y 400 cursiva en citas.
- Inter 400 en el texto y 600 en botones y etiquetas.

**Escala** (17 → 19 px de base; razón aproximada de 1,25 en móvil y 1,41 en escritorio):

```css
:root {
  --fuente-titulos: "Source Serif 4", "Iowan Old Style", Georgia, serif;
  --fuente-texto:   "Inter", system-ui, sans-serif;

  --texto-pequeno:    clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem);  /* 14 → 15 */
  --texto-base:       clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);   /* 17 → 19 */
  --texto-entradilla: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);       /* 20 → 24 */
  --titulo-3:         clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);     /* 22 → 28 */
  --titulo-2:         clamp(1.875rem, 1.5rem + 1.8vw, 3rem);        /* 30 → 48 */
  --titulo-1:         clamp(2.5rem, 1.6rem + 4.2vw, 4.75rem);       /* 40 → 76 */

  --interlineado-texto:   1.6;
  --interlineado-titulos: 1.08; /* titulares grandes, ajustado */
  --medida-texto: 62ch;         /* entre 45 y 75 caracteres */
}
```

**Detalles tipográficos**:
- **Comillas y letras**: `quotes: "«" "»" "“" "”"` y `font-kerning: normal`.
- **Tamaño óptico**: `font-optical-sizing: auto` en la serif. Los titulares grandes usan el diseño de display (más contraste, más fino) y los pequeños el de texto.
- **Versalitas**: las de verdad, con `font-variant-caps: all-small-caps` y `letter-spacing: 0.06em`, en la serif. Se usan para etiquetas de sección y para la firma de los testimonios. Inter no tiene versalitas, así que en sans las etiquetas van en mayúsculas pequeñas con `font-feature-settings: "case"`.
- **Cifras**: `font-variant-numeric: oldstyle-nums` en el texto corrido serif («desde 2015» sienta bien) y `tabular-nums lining-nums` en el teléfono y en cualquier dato alineado.
- **Saltos de línea**: `text-wrap: balance` en titulares y `text-wrap: pretty` en párrafos, para que no queden palabras huérfanas.
- **Puntuación colgante**: `hanging-punctuation: first` en las citas; solo funciona en Safari, así que en los demás navegadores se usa una sangría negativa en la comilla de apertura.
- **Ancho de línea**: máximo `62ch`. **Sin justificar.**
- **Teléfono**: siempre «635 52 06 05», con espacios finos opcionales y `tnum`, y enlazado a `tel:+34635520605`.

### Imagen sin fotos de stock

**Mientras no haya fotos**:
- **«El documento anotado»**: es la pieza central de la portada. Es una composición tipográfica en HTML (texto real, no una imagen) que imita una página impresa: unas líneas en serif pequeña de tinta suave, un fragmento subrayado en lacre y, en el margen, una nota manuscrita-tipográfica en serif cursiva lacre: «Esto quiere decir…».
  - **El texto de la página es la propia frase de presentación de Iago**, nunca un fragmento fiscal o bancario inventado ni de un documento real.
  - Se marca con `aria-hidden="true"` si repite contenido, o se escribe como contenido legible si aporta algo.
- **«Sobre Iago»**: una gran capitular «I» en serif a 200-280 px, en pino, con el texto en primera persona a su lado. No se pone un retrato ilustrado ni un avatar.
- **Prohibido**: iconos de líneas genéricos, ilustraciones de personas y patrones de fondo.

**Dirección para la sesión de fotos**:
- **Luz**: natural, lateral y de ventana, suave y cálida, de media mañana. Sin flash frontal ni fondo blanco de estudio.
- **Color**: tonos cálidos y algo apagados que casen con papel y pino. Hay que pedir al fotógrafo un revelado sin saturar, con negros levantados ligeramente y sin virados de moda.
- **Fondo**: una pared lisa de tono cálido (como `papel-hondo`) o una estantería desenfocada. **Nada que identifique un lugar**: ni ventanas con calle, ni rótulos, ni paisaje.
- **Encuadres**:
  - Un retrato vertical 4:5 de medio cuerpo, mirando a cámara con media sonrisa, para la portada y «Sobre Iago».
  - Dos o tres horizontales 3:2 de él explicando algo: la mano con un lápiz señalando un papel, o él mirando un documento junto a otra persona (de la que solo se ve el hombro).
  - Un primer plano de manos, lápiz y papel.
- **Privacidad**: los papeles que salgan en la foto deben estar **en blanco o ser ilegibles**. Ni datos reales, ni logotipos de bancos, ni de la Agencia Tributaria.
- **Ropa**: lisa, en tonos tierra, verde oscuro o gris cálido. Camisa o punto, sin corbata obligatoria, porque premium no es distante. Evitar el azul marino corporativo.
- **Prohibido en la sesión**: apretones de manos, calculadoras, gráficos en pantalla, billetes, monedas y gafas sobre papeles.
- **Entrega técnica**: originales grandes. En la web se sirven en AVIF/WebP con `srcset` de 480 a 1600 px y `width`/`height` explícitos, con dirección de arte (`<picture>`) para el recorte en móvil.

### Movimiento (según `movimiento-web`)

```css
:root {
  --duracion-micro: 160ms;
  --duracion-aparicion: 420ms;
  --duracion-pagina: 300ms;
  --curva-entrada: cubic-bezier(0.2, 0.8, 0.2, 1);
  --curva-salida: cubic-bezier(0.4, 0, 1, 1);
}
```

**Transición entre páginas**:
- Se activa con `@view-transition { navigation: auto; }` dentro de `prefers-reduced-motion: no-preference`.
- La página saliente se funde en 160 ms con `ease-in`.
- El titular de la nueva sube 12 px y aparece en 300 ms con `--curva-entrada`.
- La cabecera, el logo y la barra del teléfono llevan `view-transition-name` fijos (`cabecera`, `barra-telefono`) para que **no se muevan**: la sensación es de pasar página dentro del mismo libro.

**Microinteracciones**:
- **Enlaces**: el subrayado lacre es un `::after` con `transform: scaleX(0.3 → 1)` desde la izquierda en 160 ms. En reposo ya se ve un subrayado corto, así que no depende del hover.
- **Botón**: `scale(0.98)` al pulsar (120 ms) y un cambio de opacidad del fondo en hover.
- **Filas de servicios**: la flecha «→» se desplaza `translateX(4px)` en hover o foco.
- **Notas al margen**: aparecen al hacer scroll con `animation-timeline: view()`: `opacity` de 0 a 1 y `translateY` de 16 px a 0, retrasadas 60 ms respecto al bloque principal. **El contenido es visible por defecto** y solo se anima con `@supports`.
- **El documento anotado**: al cargar, el subrayado lacre se dibuja con `scaleX` en 420 ms y la nota al margen aparece después. Es el único momento «narrativo» y explica el servicio.

**Con `reduce`**: no hay transiciones ni apariciones. El subrayado y las notas se muestran ya en su estado final.

### Portada

**Móvil (360 px)**: margen lateral de 20 px y una sola columna. Las notas al margen pasan a ser etiquetas en versalitas lacre encima de cada titular.

```
┌────────────────────────────────────┐
│ Iago.                       [Menú] │  cabecera 64 px; botón menú 48×48
├────────────────────────────────────┤
│                                    │
│ ASESORÍA FISCAL   (versalitas lacre)│
│                                    │
│ Sus impuestos y sus                │  titulo-1 ≈ 40 px, serif 400
│ papeles del banco,                 │  text-wrap: balance
│ explicados con calma.              │
│                                    │
│ Soy Iago. Me ocupo de su renta,    │  entradilla 20 px, tinta-suave
│ del IVA si es autónomo, de         │
│ herencias y de ayudas.             │
│                                    │
│ ┌────────────────────────────────┐ │
│ │  Llamar · 635 52 06 05         │ │  botón pino, 56 px, ancho completo
│ └────────────────────────────────┘ │
│   Prefiero escribir →              │  enlace secundario, 48 px de alto
│                                    │
├────────────────────────────────────┤
│▓ Llamar  ·  635 52 06 05          ▓│  BARRA FIJA (pino, 56 px + safe-area)
└────────────────────────────────────┘
```

Debajo, en este orden:
1. **El documento anotado**, a ancho completo y más pequeño.
2. **Qué hago**: un índice como el de un libro. Cada fila tiene el número en lacre («01», «02»… en cifras de estilo antiguo), el nombre del servicio en serif de 22 px, una línea de descripción y «→». Las filas van separadas por filetes `linea` y cada una mide 72 px de alto o más, así que se pueden tocar enteras.
3. **Entender su banco** (nombre pendiente): un bloque sobre `papel-hondo`. Cuenta lo que hace y lleva el aviso «No soy intermediario de crédito ni asesor financiero…» **compuesto como una nota al margen en lacre**, visible y legible, no escondida. Solo aparece si Iago y el abogado validan los textos.
4. **Cómo trabajo**: tres pasos numerados (*Me llama · Lo vemos juntos · Le explico el resultado*; borrador).
5. **Testimonio**: **solo si hay permiso firmado**. Es una única cita grande en serif cursiva con «» colgantes y la firma en versalitas: «CLIENTE PARTICULAR · SUCESIONES». Si no hay permiso, la sección no existe.
6. **Sobre Iago**: la capitular «I», dos líneas en primera persona y el enlace «Conózcame».
7. **Cierre en pino**: «¿Lo hablamos?», el teléfono grande en serif con `tnum` (en papel sobre pino) y «o escríbame».
8. **Pie**: nombre, enlaces legales y teléfono otra vez.

**Barra fija del teléfono en móvil**:
- Aparece en todas las páginas. Es la palabra «Llamar» más el número, **sin icono de teléfono**.
- El `body` lleva un `padding-bottom` equivalente para que la barra no tape el pie.
- La barra es un `<a href="tel:">` normal, así que funciona sin JavaScript.
- En la página de contacto y en el bloque de cierre no se oculta: esconderla introduciría un cambio inesperado.

**Escritorio (1280 px)**: retícula de 12 columnas, contenido de 1200 px como máximo, márgenes de 40 px y medianiles de 24 px. Las columnas 1–3 son **el margen** y las 4–11 el texto.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Iago.         Servicios  Entender su banco  Sobre Iago  Contacto   LLÁMEME│
│                                                          635 52 06 05    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ ASESORÍA FISCAL                                  ┌──────────────────────┐ │
│                                                  │ ......... ......  ... │ │
│ Sus impuestos y sus                              │ ..... ‗‗‗‗‗‗‗‗‗‗‗ ... │ │  «documento
│ papeles del banco,                               │ ........ ....... .... │ │   anotado»
│ explicados con calma.        (76 px, col. 1–8)   │ ... ......  ....      │ │  (col. 9–12;
│                                                  └──────────────────────┘ │   luego, retrato 4:5)
│ Soy Iago. Me ocupo de su renta, del IVA...        «Esto quiere decir…»   │
│                                                    (nota lacre cursiva)  │
│ [ Llamar · 635 52 06 05 ]   Prefiero escribir →                          │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│ § QUÉ HAGO   │ 01  Declaración de la renta           Hecha con cuidado → │
│ (margen)     │ ─────────────────────────────────────────────────────────  │
│              │ 02  IVA trimestral para autónomos     ...               → │
│              │ 03  Herencias y donaciones            ...               → │
│              │ 04  Ayudas y becas                    ...               → │
├──────────────────────────────────────────────────────────────────────────┤
│ Nota (lacre):│ Entender su banco                                         │
│ No soy       │ Le ayudo a entender la oferta que ya tiene…               │
│ intermediario│                                                           │
│ …            │                                                           │
├──────────────────────────────────────────────────────────────────────────┤
│ CÓMO TRABAJO │ i. Me llama      ii. Lo vemos juntos    iii. Le explico   │
├──────────────────────────────────────────────────────────────────────────┤
│              │ «Cita grande en cursiva…»   (solo con permiso)            │
├──────────────────────────────────────────────────────────────────────────┤
│   I          │ Soy Iago. …                              Conózcame →      │
├▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┤
│▓ ¿Lo hablamos?                 635 52 06 05 (serif 48 px)   o escríbame ▓│  campo pino
├──────────────────────────────────────────────────────────────────────────┤
│ Iago.  Aviso legal · Privacidad · Cookies                  635 52 06 05  │
└──────────────────────────────────────────────────────────────────────────┘
```

**Teléfono en escritorio**: arriba a la derecha, en Inter 600 con `tnum`, legible y copiable, con la etiqueta «LLÁMEME» en versalitas. Se repite en el hero, en el cierre y en el pie. La cabecera pasa a ser fija (*sticky*) al bajar, con 64 px de alto y fondo papel.

### Qué la hace premium (detalles concretos)

1. **Una columna de margen real** en la retícula, con notas en lacre. Ninguna plantilla de asesoría la tiene.
2. **Versalitas verdaderas** y **cifras de estilo antiguo** en el texto, gracias a un subconjunto propio de la fuente que conserva `smcp` y `onum`.
3. **Comillas españolas «»** colgadas fuera de la caja en las citas.
4. **Tamaño óptico automático**: el titular de 76 px usa el diseño de display de la misma familia.
5. **Fondo papel** en lugar de blanco, y filetes de 1 px en lugar de sombras y tarjetas.
6. **Mucho aire**: separación vertical entre secciones de `clamp(4rem, 3rem + 5vw, 9rem)`. Como mucho, una idea por pantalla.
7. **El aviso legal bancario convertido en elemento de diseño** (la nota al margen) en vez de letra pequeña. Transmite honestidad.
8. **Teléfono con cifras tabulares**, siempre en el mismo formato y espaciado.
9. **Subrayado de enlaces** en lacre, fino y separado del texto (`text-underline-offset: 0.2em`).
10. **Cero iconos**: las palabras hacen el trabajo.

### Riesgos

- **Puede resultar demasiado literaria o «de libro»** para el autónomo con prisa. Se mitiga con el índice de servicios claro y el botón de llamar visible.
- **El documento anotado** es delicado de ejecutar: si queda torpe, parece decoración. Necesita varias vueltas de capturas.
- **Source Serif 4** es la familia más pesada de las dos direcciones: unos 110 KB la redonda.
- **El fondo papel** con fotos frías desentonaría, así que la sesión tiene que seguir la dirección de color.

---

## 2. Dirección B · «La firma»

### Concepto

Todo lo que Iago toca termina en **una firma**: la de la declaración, la de la aceptación de una herencia, la de una hipoteca. Su trabajo es que usted **llegue a esa línea sabiendo lo que firma**. El motivo gráfico es **una sola línea horizontal fina, la línea de firma**, que se repite como separador, subrayado y gesto de movimiento.

La composición es más **contemporánea y contrastada**:
- **Grandes campos de color ciruela** profundo a sangre.
- **Titulares enormes y ligeros**.
- **Asimetría**, con poco texto por bloque.

Es un despacho boutique de ahora, no de época.

### Paleta (tokens)

```css
:root {
  --color-hueso:         #F3EFE8; /* fondo claro */
  --color-arena:         #E6DED1; /* sección alterna */
  --color-carbon:        #211B1F; /* texto: casi negro con un punto de ciruela */
  --color-carbon-suave:  #5A5157; /* secundario */
  --color-ciruela:       #34202D; /* color profundo propio */
  --color-ciruela-claro: #CDBFC6; /* secundario SOBRE ciruela */
  --color-salvia:        #A8BC9F; /* acento SOBRE ciruela: línea de firma, botón, foco */
  --color-musgo:         #4A6447; /* acento SOBRE claro */
  --color-borde-campo:   #877C83;
}
```

**Por qué estos colores**: la ciruela es un color propio, poco visto en el sector y cálido, y no es negro (así se evita el «dorado sobre negro»). El acento es **salvia**, no dorado ni ocre, precisamente para no caer en el cliché de lujo.

| Texto | Fondo | Ratio | AA normal (4,5) | AA grande / no texto (3) | Uso |
|---|---|---|---|---|---|
| carbon #211B1F | hueso #F3EFE8 | 14,76:1 | sí | sí | texto principal |
| carbon #211B1F | arena #E6DED1 | 12,68:1 | sí | sí | texto en sección alterna |
| carbon-suave #5A5157 | hueso #F3EFE8 | 6,66:1 | sí | sí | secundario |
| carbon-suave #5A5157 | arena #E6DED1 | 5,72:1 | sí | sí | secundario en sección alterna |
| ciruela #34202D | hueso #F3EFE8 | 13,18:1 | sí | sí | titulares, enlaces, foco sobre claro |
| ciruela #34202D | arena #E6DED1 | 11,32:1 | sí | sí | titulares en sección alterna |
| hueso #F3EFE8 | ciruela #34202D | 13,18:1 | sí | sí | texto sobre campo ciruela |
| ciruela-claro #CDBFC6 | ciruela #34202D | 8,53:1 | sí | sí | secundario sobre ciruela |
| salvia #A8BC9F | ciruela #34202D | 7,45:1 | sí | sí | línea de firma, foco sobre ciruela |
| ciruela #34202D | salvia #A8BC9F | 7,45:1 | sí | sí | texto de botón salvia |
| musgo #4A6447 | hueso #F3EFE8 | 5,72:1 | sí | sí | acento y línea sobre claro |
| musgo #4A6447 | arena #E6DED1 | 4,91:1 | sí | sí | acento en sección alterna |
| hueso #F3EFE8 | musgo #4A6447 | 5,72:1 | sí | sí | botón musgo en zonas claras |
| borde-campo #877C83 | hueso #F3EFE8 | 3,50:1 | no (no es texto) | sí | borde de campos |
| salvia #A8BC9F | hueso #F3EFE8 | 1,77:1 | no | no | **prohibido** sobre claro: usar musgo |

### Tipografía

**Titulares: Fraunces** (Undercase Type, licencia OFL). Es variable con `opsz` 9–144, `wght`, `SOFT` y `WONK`.
- Se fija `SOFT=50`, que redondea ligeramente los remates, y `WONK=0`, que quita las formas caprichosas. Así queda cálida sin ser excéntrica.
- Se usa en peso 300 a tamaños enormes, donde `opsz 144` da trazos muy finos y elegantes.

**Texto: Instrument Sans** (OFL), variable, con `tnum`, `case` y `ss01`–`ss12`. Es una grotesca sobria con algo más de carácter que Inter.

**Lo comprobado en el archivo**:
- **Fraunces solo tiene `case`, `liga` y `ss01`**: no tiene versalitas, ni cifras tabulares, ni cifras de estilo antiguo. Por tanto, **las cifras y etiquetas van en Instrument Sans**, y en Fraunces solo hay titulares sin números.
- **Peso**: Fraunces recortada (wght 300–600, SOFT y WONK fijos) pesa **62 KB**, su cursiva 72 KB e Instrument Sans (wght 400–600, ancho fijo) **33 KB**. Es la dirección más ligera: **unos 95 KB precargados**.

```css
:root {
  --fuente-titulos: "Fraunces", Georgia, serif;
  --fuente-texto:   "Instrument Sans", system-ui, sans-serif;

  --texto-pequeno:    clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem); /* 14 → 15 */
  --texto-base:       clamp(1.0625rem, 1rem + 0.25vw, 1.125rem);   /* 17 → 18 */
  --texto-entradilla: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);      /* 20 → 24 */
  --titulo-3:         clamp(1.5rem, 1.3rem + 0.9vw, 2rem);         /* 24 → 32 */
  --titulo-2:         clamp(2rem, 1.5rem + 2.4vw, 3.5rem);         /* 32 → 56 */
  --titulo-1:         clamp(2.75rem, 1.5rem + 5.6vw, 6rem);        /* 44 → 96 */
  --interlineado-titulos: 1.0;
  --interlineado-texto: 1.6;
  --medida-texto: 58ch;
}
```

**Detalles tipográficos**:
- **Titulares grandes**: Fraunces 300 con `letter-spacing: -0.02em` y cursiva 300 para **una sola palabra destacada** por titular (por ejemplo, «…sabiendo lo que *firma*»).
- **Etiquetas**: Instrument Sans 600 en mayúsculas, con `case` y `letter-spacing: 0.1em`.
- **Comillas, saltos de línea y ancho**: comillas «», `text-wrap: balance`/`pretty` y ancho de 58ch, como en la dirección A.

### Imagen sin fotos de stock

**Mientras no haya fotos**: el titular gigante **es** la imagen.
- En la portada, la palabra destacada en cursiva ocupa casi el ancho del campo ciruela.
- En «Sobre Iago», su nombre a 160–200 px en Fraunces 300, con la línea de firma debajo y, sobre ella, «Iago» en cursiva pequeña, como una firma mecanografiada.

**Dirección para la sesión de fotos**:
- **Luz**: más dramática que en la dirección A. Claroscuro suave con una sola fuente lateral y la sombra cayendo hacia el fondo.
- **Fondo**: tela o pared en ciruela o berenjena apagada, o en gris cálido oscuro, para que la foto se funda con los campos de color.
- **Encuadres**:
  - Retrato vertical 4:5 con aire por encima de la cabeza.
  - Planos detalle de la mano con una pluma, a punto de **señalar** una línea de un papel en blanco. La firma es del cliente, nunca de Iago.
- **Color**: cálido y poco saturado, con piel natural.
- **Mismas prohibiciones que en A**: papeles legibles, lugares reconocibles, apretones de manos y calculadoras.

### Movimiento

- **Tokens**: los mismos que en A, más `--duracion-firma: 480ms`.
- **Al cargar la portada**: la línea de firma bajo el titular se dibuja de izquierda a derecha con `transform: scaleX(0 → 1)` y `transform-origin: left`, en 480 ms con `--curva-entrada`. Es un único gesto que resume el concepto.
- **Enlaces y filas de servicios**: el subrayado es una mini línea de firma que crece con `scaleX` en 180 ms. La flecha se desplaza `translateX(6px)`.
- **Transición entre páginas**: la página saliente se funde en 160 ms y el titular nuevo sube 16 px en 320 ms. La línea de firma lleva `view-transition-name: linea-firma` y **viaja** de su posición en una página a la de la siguiente: es lo único que se mueve de verdad.
- **Al hacer scroll**: los bloques aparecen con `view()`, `opacity` y 24 px, de forma escalonada (`--i * 60ms`) solo en la lista de servicios.
- **Con `reduce`**: la línea ya está dibujada y no hay nada más.

### Portada

**Móvil (360 px)**:

```
┌────────────────────────────────────┐
│▓ Iago.                     [Menú] ▓│  cabecera sobre ciruela
│▓                                  ▓│
│▓ ASESORÍA FISCAL (salvia, sans)   ▓│
│▓                                  ▓│
│▓ Firme                            ▓│  Fraunces 300, 44 px, hueso
│▓ sabiendo lo                      ▓│
│▓ que firma.  (cursiva)            ▓│
│▓ ───────────────────── (salvia)   ▓│  línea de firma
│▓ Soy Iago. Le ayudo con su renta, ▓│  entradilla ciruela-claro
│▓ el IVA, herencias y ayudas, y    ▓│
│▓ a entender sus papeles del banco.▓│
│▓ ┌──────────────────────────────┐ ▓│
│▓ │ Llamar · 635 52 06 05        │ ▓│  botón salvia, texto ciruela, 56 px
│▓ └──────────────────────────────┘ ▓│
│▓   Prefiero escribir →            ▓│
├────────────────────────────────────┤
│▓ Llamar  ·  635 52 06 05          ▓│  barra fija ciruela; borde superior salvia
└────────────────────────────────────┘
```

> El titular «Firme sabiendo lo que firma» es potente para herencias e hipotecas, pero en la renta y el IVA no se «firma» en sentido literal. Es un borrador que hay que validar.

Debajo:
1. **Servicios sobre hueso**: una lista en Fraunces a 32 px por fila, con número en Instrument Sans `tnum` y línea musgo entre filas.
2. **Entender su banco**: un bloque ciruela con el aviso en hueso, en un recuadro con filete salvia.
3. **Cómo trabajo**: tres pasos.
4. **Testimonio**: solo con permiso.
5. **Sobre Iago**: el nombre gigante.
6. **Cierre ciruela** con el teléfono a 48 px en Instrument Sans `tnum`.
7. **Pie**.

**Escritorio (1280 px)**:

```
┌▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┐
│▓ Iago.      Servicios  Entender su banco  Sobre Iago  Contacto 635 52 06 05▓│
│▓                                                                        ▓│
│▓ ASESORÍA FISCAL                                                        ▓│
│▓ Firme sabiendo                                         ┌────────────┐  ▓│
│▓ lo que firma.        (96 px, col. 1–9)                 │ retrato 4:5│  ▓│
│▓ ──────────────────────────── (línea salvia)            │ (cuando    │  ▓│
│▓ Soy Iago. Le ayudo con…        [ Llamar · 635 52 06 05 ]│  exista)   │  ▓│
│▓                                                        └────────────┘  ▓│
├──────────────────────────────────────────────────────────────────────────┤
│ SERVICIOS   01 Declaración de la renta ──────────────────────────────→  │
│             02 IVA trimestral para autónomos ────────────────────────→  │
│             03 Herencias y donaciones ───────────────────────────────→  │
│             04 Ayudas y becas ───────────────────────────────────────→  │
├▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┤
│▓ Entender su banco              ┌ No soy intermediario de crédito… ┐    ▓│
├──────────────────────────────────────────────────────────────────────────┤
│ Cómo trabajo · testimonio (si hay permiso) · Sobre Iago (nombre gigante) │
├▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┤
│▓ ¿Lo hablamos?                    635 52 06 05              o escríbame ▓│
└▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┘
```

### Qué la hace premium (detalles concretos)

1. **Titular a 96 px en Fraunces 300 `opsz 144`**, con una sola palabra en cursiva.
2. **Un único motivo gráfico**, la línea de firma, aplicado con disciplina: separador, subrayado y transición.
3. **Campos de color a sangre** alternados con hueso, como capítulos.
4. **Botón salvia sobre ciruela**: un acento inesperado en el sector y con contraste de 7,45:1.
5. **La línea de firma «viaja» entre páginas** con View Transitions.
6. **Cifras siempre en la sans tabular**, alineadas en listas y en el teléfono.
7. **Cero iconos y cero sombras.**

### Riesgos

- **Puede sentirse distante o «de moda»** (estudio de arquitectura, editorial de moda) para alguien que acaba de perder a un familiar o para una persona mayor con su renta. Es el principal choque con «premium no es distante».
- **Los campos oscuros grandes** cansan en textos largos; hay que limitarlos a hero, banco y cierre.
- **Fraunces es reconocible y está muy usada desde 2021**: puede parecer una tendencia pasajera.
- **Depende más de la foto**: el claroscuro mal hecho queda triste.
- **El titular sobre la firma** necesita validación y no encaja con todos los servicios.

---

## 3. Logotipo tipográfico

**Una idea común, «el punto»**: el nombre termina en **un punto final de color**. El punto dice «dicho con claridad, sin letra pequeña». Funciona igual con «Iago.» que con «Iago Apellido.».

**Construcción (dirección A)**:
- **Fuente y ajuste**: Source Serif 4, `opsz 60`, peso 500 y `letter-spacing: -0.01em`. El kerning entre la última letra y el punto se ajusta a mano, para acercar el punto unos 0,04 em.
- **Color**: nombre en pino y punto en lacre. Sobre fondo pino, el nombre va en papel y el punto en lacre-claro (5,54:1).
- **Descriptor opcional**, debajo y alineado a la izquierda: «ASESORÍA FISCAL» en versalitas de la serif (o Inter 600 `case`), a un 22 % del cuerpo del nombre, con `letter-spacing: 0.12em`.
  - **No** se pone «asesoría bancaria», por el apartado 6 de la especificación.
- **Versiones**:
  - **Horizontal**: «Iago.» o «Iago Apellido.» en una línea, para la cabecera.
  - **Apilada**, para pie y documentos: «Iago» / «Apellido.», con el punto solo al final.
  - **Reducida / favicon**: «I.» con la «I» en papel sobre un cuadrado pino de esquinas a 12 % y el punto en lacre-claro. Se hace en SVG, y a 16 px se engrosa a peso 700. Si el apellido se confirma y el par resulta bonito, se puede probar el monograma «IX.» (por ejemplo «IG.»), aunque «I.» sirve en ambos casos.
- **Con «Iago» solo**: es muy corto, así que el descriptor gana peso visual y conviene mostrarlo en la cabecera.
- **Con apellido**: el descriptor puede desaparecer en la cabecera del móvil.

**Variante para la dirección B**:
- **Fuente**: Fraunces 400 (`SOFT 50`) en hueso.
- **El punto se sustituye por la línea de firma**: un filete salvia bajo el nombre que se extiende un 15 % más allá a la derecha.
- **Favicon**: «I» en hueso sobre ciruela, con un trazo salvia debajo.

**Se entrega como**: SVG con el texto convertido a trazos (para no depender de la fuente), `favicon.svg` más `apple-touch-icon` PNG de 180 px. Dentro de la web, el logo de la cabecera se escribe como **texto real** con un enlace a inicio (`aria-label="Iago, inicio"`), no como imagen.

---

## 4. Recomendación: dirección A, «Al margen»

- **Su concepto es el servicio.** La web *hace* lo que hace Iago: leer con usted y anotar lo que significa. Eso sirve igual para la renta, el IVA, las ayudas, una herencia o una oferta bancaria, mientras que «la firma» encaja forzada en la renta y el IVA.
- **Encaja con el momento delicado.** Quien llega por una herencia necesita serenidad: fondo papel, mucho aire, texto de lectura cómoda y nada de impacto. Los campos ciruela y los titulares de 96 px de la dirección B imponen más de lo que acogen.
- **Premium no es distante.** A transmite calidad con detalles de oficio (versalitas, cifras antiguas, el margen) en vez de con tamaño y contraste. Se siente cuidada, no fría, y la voz en primera persona de Iago encaja de forma natural en las «notas al margen».
- **Resuelve el problema legal con diseño.** El aviso «No soy intermediario…» se convierte en una nota al margen visible, y la honestidad pasa a ser parte de la identidad.
- **Funciona sin fotos.** El documento anotado y la capitular sostienen la web hasta la sesión de fotos; B depende más de la imagen.
- **Su punto débil es el peso de la fuente**: unos 160 KB precargados, frente a los 95 KB de B. Es asumible y se puede bajar fijando `opsz`.

De B se pueden rescatar dos ideas: **la paleta salvia/musgo como reserva** si el verde pino no convence, y **el elemento que viaja entre páginas** (en A sería el subrayado lacre del titular).

---

## 5. Prioridades al implementar (más impacto con menos trabajo)

1. **Tokens y fuentes** (`global.css` más el subconjunto propio en `public/fuentes/`):
   - Color, escala tipográfica, espaciado y curvas.
   - Precarga de dos woff2 y fuentes de reserva ajustadas en tamaño (`size-adjust`, `ascent-override`) para que la página no salte al cargar las fuentes.
   - Solo con esto, cualquier página ya parece de marca.
2. **Base del layout** (`Base.astro`):
   - Cabecera con logo de texto y teléfono, y **barra fija «Llamar · 635 52 06 05»** en móvil.
   - Pie con enlaces legales y enlace para saltar al contenido.
   - Foco visible: `outline: 2px solid var(--color-pino); outline-offset: 3px`, y en papel sobre pino.
   - Cubre el requisito G1 en todas las páginas de una vez.
3. **Hero de la portada** con titular, entradilla y botón. Es la primera impresión y el criterio A1.
4. **Índice de servicios** como componente reutilizable: sirve en la portada y como «otros servicios» en cada página de servicio.
5. **Retícula con columna de margen** y componente `NotaMargen`. Es lo que da la identidad, y el aviso bancario lo reutiliza.
6. **Movimiento básico**: `@view-transition` y los subrayados. Son unas 20 líneas de CSS.
7. **Logo y favicon en SVG.**
8. **Después**: el documento anotado, que necesita varias vueltas de capturas, y el bloque de testimonio (solo con permisos). Las fotos se integran tras la sesión.

**Dependencias pendientes que afectan al diseño**:
- Apellido y nombre comercial, para el logo.
- Tú o usted, para los titulares.
- El nombre de la sección bancaria.
- La fecha de la sesión de fotos.

*Los scripts de contraste y de inspección de fuentes se ejecutaron fuera del repositorio; no se ha añadido nada a `src/`.*
