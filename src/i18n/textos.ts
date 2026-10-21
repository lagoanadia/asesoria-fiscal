// Textos de la portada en castellano y catalán.
// Los que llevan <em> se pintan con set:html (son nuestros, no vienen del usuario).
// PENDIENTE REVISIÓN ASESOR: la versión catalana también la tiene que aprobar Iago.

export type Idioma = 'es' | 'ca';

export const rutas: Record<Idioma, string> = { es: '/', ca: '/ca/' };

const es = {
  lang: 'es',
  tituloPagina: 'Iago · Asesor fiscal online',
  descripcion:
    'Renta, autónomos, herencias y becas. Y tu banco, explicado en claro. Todo online, hablando siempre con Iago.',
  saltar: 'Saltar al contenido',
  mensajeWhatsapp: 'Hola, Iago. Te escribo por ',
  logoAria: 'Iago, inicio',
  estado: 'Atiendo online',
  nav: { servicios: 'Servicios', banco: 'Tu banco', contacto: 'Contacto', aria: 'Principal', idioma: 'Idioma' },
  tituloOculto: 'Iago, asesor fiscal online',
  sello: 'asesoría fiscal · online · sin jerga · sin prisas · ',
  rol: 'Asesor <em>fiscal</em>',
  portadaTexto:
    'Te hago la renta, llevo tus cosas de autónomo, te ayudo con herencias y becas, y te explico lo que te ofrece el banco. Sin jerga y sin prisas.',
  escribeme: 'Escríbeme',
  llamar: 'Llamar',
  pista: '✳ Arrastra las pegatinas',
  pegatinas: ['Renta', 'Autónomos', 'Herencias', 'Becas', '0 € de los bancos'],
  cinta: ['Renta', 'Autónomos', 'Herencias', 'Donaciones', 'Becas', 'Tu banco, en claro'],
  datosAria: 'En cifras',
  datos: [
    'online, desde donde estés',
    'persona: hablas siempre conmigo',
    'de comisiones de ningún banco',
    'comunidades autónomas para herencias',
  ],
  servicios: {
    etiqueta: '(01) Lo fiscal',
    titulo: 'En qué te <em>echo una mano</em>',
    pregunta: 'Pregúntame por esto',
    lista: [
      {
        titulo: 'La renta',
        etiqueta: 'Particulares y autónomos',
        texto: 'Te la preparo, la reviso y te explico el resultado. Seas particular o autónomo.',
      },
      {
        titulo: 'Autónomos',
        etiqueta: 'IVA y demás',
        texto: 'El IVA y el resto del papeleo de autónomo, conmigo. Tú a lo tuyo.',
      },
      {
        titulo: 'Herencias y donaciones',
        etiqueta: 'Cualquier comunidad',
        texto:
          'Con calma. Reviso la documentación, compruebo que se aplica lo que te corresponde y te explico cada paso. En cualquier comunidad autónoma.',
      },
      {
        titulo: 'Becas educativas',
        etiqueta: 'Solicitud completa',
        texto: 'Te ayudo a preparar y presentar la solicitud, para que no se quede nada por el camino.',
      },
    ],
  },
  banco: {
    etiqueta: '(02) Lo bancario',
    titulo: 'Tu banco, <em>en claro.</em>',
    entradilla:
      '¿Tienes encima de la mesa una oferta del banco? La miramos juntos, te explico las condiciones y comparamos lo que te han ofrecido.',
    productos: ['Hipotecas', 'Préstamos', 'Créditos', 'Depósitos', 'Planes de pensiones'],
    grande: 'No cobro nada a ningún banco. <em>Trabajo solo para ti.</em>',
    letra:
      'No soy intermediario de crédito ni asesor financiero: no consigo financiación ni negocio con el banco por ti. La decisión es siempre tuya.',
  },
  casos: {
    etiqueta: '(03) Casos reales',
    titulo: 'Lo que ya <em>he resuelto</em>',
    lista: [
      {
        tema: 'Una herencia',
        texto: 'Revisé la liquidación del impuesto con calma y se aplicaron las reducciones que correspondían.',
      },
      { tema: 'Unas becas', texto: 'Preparé y presenté las solicitudes, y este año ha vuelto a confiar en mí.' },
      { tema: 'La renta', texto: 'Cada año preparo la declaración de muchas personas y familias.' },
    ],
  },
  pasos: {
    etiqueta: '(04) Cómo funciona',
    titulo: 'Sencillo <em>y desde casa</em>',
    lista: [
      { titulo: 'Me escribes', texto: 'Por WhatsApp o llamando. Lo que te sea más cómodo.' },
      { titulo: 'Me cuentas tu caso', texto: 'Vemos juntos qué necesitas y cómo lo hacemos.' },
      { titulo: 'Me encargo', texto: 'Y te lo explico todo, para que sepas qué se presenta y por qué.' },
    ],
  },
  contacto: {
    etiqueta: '(05) Contacto',
    titulo: '¿Habla<em>mos?</em>',
    texto: 'Cuéntame qué necesitas y lo vemos. Sin compromiso y sin jerga.',
    circulo: 'Escríbeme<br />por WhatsApp',
  },
  pie: {
    rol: 'Asesoría fiscal online',
    legal: 'Web en construcción · Aviso legal y privacidad, en preparación',
  },
  barraMovil: 'Escríbeme por WhatsApp',
};

export type Textos = typeof es;

const ca: Textos = {
  lang: 'ca',
  tituloPagina: 'Iago · Assessor fiscal en línia',
  descripcion:
    "Renda, autònoms, herències i beques. I el teu banc, explicat ben clar. Tot en línia, parlant sempre amb l'Iago.",
  saltar: 'Salta al contingut',
  mensajeWhatsapp: "Hola, Iago. T'escric per ",
  logoAria: 'Iago, inici',
  estado: 'Atenc en línia',
  nav: { servicios: 'Serveis', banco: 'El teu banc', contacto: 'Contacte', aria: 'Principal', idioma: 'Idioma' },
  tituloOculto: 'Iago, assessor fiscal en línia',
  sello: 'assessoria fiscal · en línia · sense argot · sense presses · ',
  rol: 'Assessor <em>fiscal</em>',
  portadaTexto:
    "Et faig la renda, porto les teves coses d'autònom, t'ajudo amb herències i beques, i t'explico el que t'ofereix el banc. Sense argot i sense presses.",
  escribeme: 'Escriu-me',
  llamar: 'Trucar',
  pista: '✳ Arrossega els adhesius',
  pegatinas: ['Renda', 'Autònoms', 'Herències', 'Beques', '0 € dels bancs'],
  cinta: ['Renda', 'Autònoms', 'Herències', 'Donacions', 'Beques', 'El teu banc, ben clar'],
  datosAria: 'En xifres',
  datos: [
    "en línia, des d'on siguis",
    'persona: parles sempre amb mi',
    'de comissions de cap banc',
    'comunitats autònomes per a herències',
  ],
  servicios: {
    etiqueta: "(01) L'àmbit fiscal",
    titulo: 'En què et <em>dono un cop de mà</em>',
    pregunta: "Pregunta'm per això",
    lista: [
      {
        titulo: 'La renda',
        etiqueta: 'Particulars i autònoms',
        texto: "Te la preparo, la reviso i t'explico el resultat. Siguis particular o autònom.",
      },
      {
        titulo: 'Autònoms',
        etiqueta: 'IVA i la resta',
        texto: "L'IVA i la resta de paperassa d'autònom, amb mi. Tu a la teva.",
      },
      {
        titulo: 'Herències i donacions',
        etiqueta: 'Qualsevol comunitat',
        texto:
          "Amb calma. Reviso la documentació, comprovo que s'aplica el que et correspon i t'explico cada pas. A qualsevol comunitat autònoma.",
      },
      {
        titulo: 'Beques educatives',
        etiqueta: 'Sol·licitud completa',
        texto: "T'ajudo a preparar i presentar la sol·licitud, perquè no quedi res pel camí.",
      },
    ],
  },
  banco: {
    etiqueta: "(02) L'àmbit bancari",
    titulo: 'El teu banc, <em>ben clar.</em>',
    entradilla:
      "Tens damunt la taula una oferta del banc? La mirem junts, t'explico les condicions i comparem el que t'han ofert.",
    productos: ['Hipoteques', 'Préstecs', 'Crèdits', 'Dipòsits', 'Plans de pensions'],
    grande: 'No cobro res de cap banc. <em>Treballo només per a tu.</em>',
    letra:
      'No soc intermediari de crèdit ni assessor financer: no aconsegueixo finançament ni negocio amb el banc per tu. La decisió és sempre teva.',
  },
  casos: {
    etiqueta: '(03) Casos reals',
    titulo: 'El que ja <em>he resolt</em>',
    lista: [
      {
        tema: 'Una herència',
        texto: "Vaig revisar la liquidació de l'impost amb calma i es van aplicar les reduccions que corresponien.",
      },
      {
        tema: 'Unes beques',
        texto: 'Vaig preparar i presentar les sol·licituds, i aquest any ha tornat a confiar en mi.',
      },
      { tema: 'La renda', texto: 'Cada any preparo la declaració de moltes persones i famílies.' },
    ],
  },
  pasos: {
    etiqueta: '(04) Com funciona',
    titulo: 'Senzill <em>i des de casa</em>',
    lista: [
      { titulo: "M'escrius", texto: 'Per WhatsApp o trucant. El que et sigui més còmode.' },
      { titulo: "M'expliques el teu cas", texto: 'Veiem junts què necessites i com ho fem.' },
      { titulo: "Me n'encarrego", texto: "I t'ho explico tot, perquè sàpigues què es presenta i per què." },
    ],
  },
  contacto: {
    etiqueta: '(05) Contacte',
    titulo: 'Par<em>lem?</em>',
    texto: "Explica'm què necessites i ho mirem. Sense compromís i sense argot.",
    circulo: 'Escriu-me<br />per WhatsApp',
  },
  pie: {
    rol: 'Assessoria fiscal en línia',
    legal: 'Web en construcció · Avís legal i privadesa, en preparació',
  },
  barraMovil: 'Escriu-me per WhatsApp',
};

export const textos: Record<Idioma, Textos> = { es, ca };
