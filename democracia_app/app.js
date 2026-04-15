// ═══════════════════════════════════════════════════════════════════════════════
//  Cuidar la Democracia – Dashboard Analítico
//  Lógica principal de visualización
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Diccionario de Preguntas ─────────────────────────────────────────────────
// Formato: Pregunta X.Y. [Enunciado completo con aspecto específico]

const qDict = {
    // Sección 1
    'PAIS_ORIGEN': 'Pregunta 1. Cuál es su país de nacimiento',
    'SEXO':        'Pregunta 2. Sexo del encuestado (observación del encuestador)',
    'GÉNERO':      'Pregunta 3. Con cuál de las siguientes identidades de género se reconoce usted',
    'EDUCACION':   'Pregunta 4. Cuál es el nivel educativo más alto que ha alcanzado',
    'ESTRATO':     'Pregunta 5. Cuál es el estrato socioeconómico de su vivienda según la factura de servicios públicos',

    // Sección 2
    'P7.1': 'Pregunta 7.1. Satisfacción con el funcionamiento de la democracia en Colombia, dada la frase: "Según los historiadores, Colombia es la democracia más antigua y estable de América Latina; es la que menos golpes de estado ha tenido, y menos años ha vivido bajo regímenes militares."',
    'P7.2': 'Pregunta 7.2. Satisfacción con el funcionamiento de la democracia en Colombia, dada la frase: "Según la prestigiosa revista The Economist, Colombia tiene el noveno mejor índice de desempeño democrático de América Latina, mejor que el de países como Perú, México y Ecuador."',
    'P7.3': 'Pregunta 7.3. Satisfacción con el funcionamiento de la democracia en Colombia, dada la frase: "Colombia es un Estado social de derecho, organizado en forma de República unitaria, descentralizada, con autonomía de sus entidades territoriales, democrática, participativa y pluralista."',
    'P8':   'Pregunta 8. Qué tan influenciada está su satisfacción con el funcionamiento de la democracia por hechos y noticias recientes',
    'P9':   'Pregunta 9. Qué tan probable es que nuevos hechos y noticias cambien su satisfacción con el funcionamiento de la democracia',

    // Sección 3
    'P10_1':  'Pregunta 10.1. En qué medida lo que escucha o lee sobre hechos de corrupción influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_2':  'Pregunta 10.2. En qué medida las protestas o marchas influencian su grado de satisfacción con el funcionamiento de la democracia',
    'P10_3':  'Pregunta 10.3. En qué medida los enfrentamientos entre líderes políticos influencian su grado de satisfacción con el funcionamiento de la democracia',
    'P10_4':  'Pregunta 10.4. En qué medida la desigualdad socioeconómica influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_5':  'Pregunta 10.5. En qué medida ver restringidas sus libertades más importantes (de expresión, económicas, de movilidad) influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_6':  'Pregunta 10.6. En qué medida que los líderes políticos hablen o no de lo que es importante para usted influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_7':  'Pregunta 10.7. En qué medida la presencia integral del Estado en su comunidad influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_8':  'Pregunta 10.8. En qué medida la asistencia que recibe del Estado influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_9':  'Pregunta 10.9. En qué medida que los líderes políticos no tengan preparación influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_10': 'Pregunta 10.10. En qué medida que los mecanismos y organismos de control no estén al servicio de los ciudadanos influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_11': 'Pregunta 10.11. En qué medida la pobreza influencia su grado de satisfacción con el funcionamiento de la democracia',

    // Sección 4
    'P11_1':  'Pregunta 11.1. En qué medida más contacto directo o cercanía con sus representantes elegidos influiría en su satisfacción con el funcionamiento de la democracia',
    'P11_2':  'Pregunta 11.2. En qué medida la mejor preparación (educación, conocimientos) de sus representantes elegidos influiría en su satisfacción con el funcionamiento de la democracia',
    'P11_3':  'Pregunta 11.3. En qué medida mayor información y transparencia sobre el uso de los recursos públicos influiría en su satisfacción con el funcionamiento de la democracia',
    'P11_4':  'Pregunta 11.4. En qué medida mayor diversidad en los representantes elegidos influiría en su satisfacción con el funcionamiento de la democracia',
    'P11_5':  'Pregunta 11.5. En qué medida una forma diferente de financiar campañas políticas influiría en su satisfacción con el funcionamiento de la democracia',
    'P11_6':  'Pregunta 11.6. En qué medida más asistencia del Estado a usted o a su comunidad influiría en su satisfacción con el funcionamiento de la democracia',
    'P11_7':  'Pregunta 11.7. En qué medida mayor seguridad en las calles y en el campo influiría en su satisfacción con el funcionamiento de la democracia',
    'P11_8':  'Pregunta 11.8. En qué medida más y mejores oportunidades de educación o trabajo para usted o en su comunidad influirían en su satisfacción con el funcionamiento de la democracia',
    'P11_9':  'Pregunta 11.9. En qué medida una nueva constitución política (conjunto de reglas, derechos y deberes para la sociedad) influiría en su satisfacción con el funcionamiento de la democracia',
    'P11_10': 'Pregunta 11.10. En qué medida un mejor cumplimiento de la constitución y las leyes existentes influiría en su satisfacción con el funcionamiento de la democracia',
    'P11_11': 'Pregunta 11.11. En qué medida mejores acuerdos entre contradictores políticos influirían en su satisfacción con el funcionamiento de la democracia',
    'P11_12': 'Pregunta 11.12. En qué medida mayores posibilidades de participación directa en las decisiones importantes para usted o su comunidad influirían en su satisfacción con el funcionamiento de la democracia',

    // Sección 5
    'P12_1': 'Pregunta 12.1. Qué tan importante es que los ciudadanos participen en la toma de decisiones políticas para el funcionamiento de la democracia',
    'P12_2': 'Pregunta 12.2. Qué tan importante es que exista respeto de la dignidad humana y de los derechos individuales para el funcionamiento de la democracia',
    'P12_3': 'Pregunta 12.3. Qué tan importante es que exista discusión libre de ideas e intereses en el debate público para el funcionamiento de la democracia',
    'P12_4': 'Pregunta 12.4. Qué tan importante es que los ciudadanos se sometan a las reglas claras de la Constitución para el funcionamiento de la democracia',
    'P12_5': 'Pregunta 12.5. Qué tan importante es que se reconozca la necesidad de buscar una igualdad socioeconómica básica para el funcionamiento de la democracia',
    'P12_6': 'Pregunta 12.6. Qué tan importante es que la mayoría de los ciudadanos se comporten de manera cívica y respeten las leyes para el funcionamiento de la democracia',

    'P13_1': 'Pregunta 13.1. Qué tanto riesgo corre la participación ciudadana en nuestra democracia',
    'P13_2': 'Pregunta 13.2. Qué tanto riesgo corre el respeto de la dignidad humana y de los derechos individuales en nuestra democracia',
    'P13_3': 'Pregunta 13.3. Qué tanto riesgo corre la discusión libre de ideas e intereses en el debate público en nuestra democracia',
    'P13_4': 'Pregunta 13.4. Qué tanto riesgo corre el cuidado y defensa de la Constitución en nuestra democracia',
    'P13_5': 'Pregunta 13.5. Qué tanto riesgo corre la necesidad de buscar una igualdad socioeconómica básica en nuestra democracia',
    'P13_6': 'Pregunta 13.6. Qué tanto riesgo corre el compromiso ciudadano y el respeto por la ley en nuestra democracia',

    'P14': 'Pregunta 14. En su opinión, la democracia colombiana se está fortaleciendo, permanece igual o se está debilitando',

    'P15_1': 'Pregunta 15.1. Qué tan de acuerdo está con que se aprende qué es y cómo funciona la democracia en Colombia en el hogar y con la familia',
    'P15_2': 'Pregunta 15.2. Qué tan de acuerdo está con que se aprende qué es y cómo funciona la democracia en Colombia en el barrio o vereda',
    'P15_3': 'Pregunta 15.3. Qué tan de acuerdo está con que se aprende qué es y cómo funciona la democracia en Colombia en el colegio o universidad',
    'P15_4': 'Pregunta 15.4. Qué tan de acuerdo está con que se aprende qué es y cómo funciona la democracia en Colombia en redes sociales',
    'P15_5': 'Pregunta 15.5. Qué tan de acuerdo está con que se aprende qué es y cómo funciona la democracia en Colombia en los medios tradicionales (radio, TV, periódicos)',

    // Sección 6
    'P16':  'Pregunta 16. Ha votado usted en los últimos cinco años',
    'P16A': 'Pregunta 16A. Piensa votar usted en las próximas elecciones',
    'P17':  'Pregunta 17. Si saliera a votar, lo haría por',

    // Sección 7
    'P18_1': 'Pregunta 18.1. Qué tan importante es que los votantes tengan acceso a información adecuada para tomar una decisión informada para que las elecciones sean libres y justas',
    'P18_2': 'Pregunta 18.2. Qué tan importante es que la administración electoral sea independiente e imparcial para que las elecciones sean libres y justas',
    'P18_3': 'Pregunta 18.3. Qué tan importante es que la infraestructura electoral (puestos de votación, conteo de votos, transmisión de información) sea protegida de amenazas para que las elecciones sean libres y justas',
    'P18_4': 'Pregunta 18.4. Qué tan importante es que las leyes electorales sean explicadas claramente a los votantes para que las elecciones sean libres y justas',
    'P18_5': 'Pregunta 18.5. Qué tan importante es que las leyes electorales no cambien justo antes de las elecciones para que las elecciones sean libres y justas',
    'P18_6': 'Pregunta 18.6. Qué tan importante es que la administración electoral sea recursiva y competente para cumplir sus deberes para que las elecciones sean libres y justas',
    'P18_7': 'Pregunta 18.7. Qué tan importante es que no exista coerción o presión a los votantes para que las elecciones sean libres y justas',
    'P18_8': 'Pregunta 18.8. Qué tan importante es que exista financiación equitativa de las campañas para que las elecciones sean libres y justas',

    // Sección 8
    'P19': 'Pregunta 19. Qué tan de acuerdo está con que en otras partes del mundo hay democracias que funcionan mejor que en Colombia',
    'P20': 'Pregunta 20. Qué tan de acuerdo está con que en una sociedad más educada (mayor cobertura y mejor calidad en educación básica, media y superior) funciona mejor la democracia',

    // Sección 9
    'P21_RANKING': 'Pregunta 21. Cuáles atributos sobre el gobierno nacional (presidente y sus ministros) son los más importantes para el buen funcionamiento de la democracia (1 = más importante, 4 = menos importante)',
    'P22_RANKING': 'Pregunta 22. Cuáles atributos sobre el gobierno local o regional (alcaldes y gobernadores) son los más importantes para el buen funcionamiento de la democracia (1 = más importante, 4 = menos importante)',

    // Sección 10
    'P23_1': 'Pregunta 23.1. Qué tan buena o mala le parece la forma de gobernar de un sistema político democrático con presidente y congreso que representan a los ciudadanos',
    'P23_2': 'Pregunta 23.2. Qué tan buena o mala le parece la forma de gobernar de un sistema político en el que los ciudadanos puedan participar directamente en decisiones importantes para su comunidad',
    'P23_3': 'Pregunta 23.3. Qué tan buena o mala le parece la forma de gobernar de un sistema político en el que las decisiones más importantes sean tomadas por expertos',
    'P23_4': 'Pregunta 23.4. Qué tan buena o mala le parece la forma de gobernar siendo liderados por una figura fuerte que no tenga que preocuparse por el congreso o las elecciones',
    'P23_5': 'Pregunta 23.5. Qué tan buena o mala le parece la forma de gobernar de que las fuerzas armadas gobiernen el país',

    // Sección 11
    'P24': 'Pregunta 24. Cuál de las siguientes opiniones se alinea mejor con su punto de vista sobre el voto',
    'P25': 'Pregunta 25. Por qué razón considera que votar no tiene importancia',

    // Sección 12
    'P26_1': 'Pregunta 26.1. Qué tan de acuerdo está con que todos los partidos políticos hacen propuestas muy parecidas para gobernar',
    'P26_2': 'Pregunta 26.2. Qué tan de acuerdo está con que hay suficientes partidos a los que votar en las elecciones',
    'P26_3': 'Pregunta 26.3. Qué tan de acuerdo está con que sin partidos políticos no puede haber democracia',
    'P26_4': 'Pregunta 26.4. Qué tan de acuerdo está con que los partidos eligen a sus candidatos por procedimientos democráticos',
    'P26_5': 'Pregunta 26.5. Qué tan de acuerdo está con que los ciudadanos que pertenecen al partido en el poder reciben mejor trato por parte de la administración',

    // Sección 13
    'P27_1': 'Pregunta 27.1. Qué tan de acuerdo está con que los medios de comunicación tradicionales hacen eco de noticias falsas y mentiras',
    'P27_2': 'Pregunta 27.2. Qué tan de acuerdo está con que los medios de comunicación tradicionales dan acceso a diferentes tipos de opinión',
    'P27_3': 'Pregunta 27.3. Qué tan de acuerdo está con que los medios de comunicación tradicionales están concentrados en pocas manos o grupos de comunicación',
    'P27_4': 'Pregunta 27.4. Qué tan de acuerdo está con que los medios de comunicación tradicionales favorecen unas opciones políticas o intereses económicos más que otros',

    // Sección 14
    'P28': 'Pregunta 28. Qué tan de acuerdo está con que los representantes elegidos por los ciudadanos deberían consultar la opinión de expertos a la hora de diseñar soluciones a los problemas públicos',
    'P29': 'Pregunta 29. Qué tan de acuerdo está con que los representantes elegidos por los ciudadanos deberían consultar a universidades, centros de estudio y demás organizaciones de conocimiento a la hora de diseñar soluciones a los problemas públicos',
    'P30': 'Pregunta 30. Cuando escucha o lee sobre los líderes políticos, cuál es su reacción más frecuente',
    'P31': 'Pregunta 31. La mayoría de las veces, cuando un político habla, usted siente que',

    // Sección 15
    'P32_1':  'Pregunta 32.1. Qué tan seria considera la amenaza de la información falsa o engañosa en general para la democracia en Colombia',
    'P32_2':  'Pregunta 32.2. Qué tan seria considera la amenaza de la desconfianza y escepticismo creciente hacia las instituciones democráticas',
    'P32_3':  'Pregunta 32.3. Qué tan seria considera la amenaza de la falta de interés y compromiso en políticas y elecciones entre los ciudadanos',
    'P32_4':  'Pregunta 32.4. Qué tan seria considera la amenaza de la falta de oportunidades para que los ciudadanos den voz a sus opiniones como consecuencia de la desigualdad socioeconómica',
    'P32_5':  'Pregunta 32.5. Qué tan seria considera la amenaza de la interferencia extranjera en las políticas y la economía del país, a través de la financiación de actores domésticos',
    'P32_6':  'Pregunta 32.6. Qué tan seria considera la amenaza de la falta de libertad y diversidad de prensa',
    'P32_7':  'Pregunta 32.7. Qué tan seria considera la amenaza de la falta de conocimiento entre los votantes sobre el funcionamiento de los procesos democráticos',
    'P32_8':  'Pregunta 32.8. Qué tan seria considera la amenaza de la falta de transparencia del sistema electoral',
    'P32_9':  'Pregunta 32.9. Qué tan seria considera la amenaza de la desestabilización de la infraestructura electoral o de los procesos electorales',
    'P32_10': 'Pregunta 32.10. Qué tan seria considera la amenaza de la interferencia de los intereses privados en el sistema político electoral (financiación de campañas, acceso a los medios)',

    // Sección 16
    'P33_1': 'Pregunta 33.1. Qué tan responsable de cuidar la democracia son los medios de comunicación',
    'P33_2': 'Pregunta 33.2. Qué tan responsable de cuidar la democracia son las cortes de justicia',
    'P33_3': 'Pregunta 33.3. Qué tan responsable de cuidar la democracia es el gobierno nacional',
    'P33_4': 'Pregunta 33.4. Qué tan responsable de cuidar la democracia es el gobierno local',
    'P33_5': 'Pregunta 33.5. Qué tan responsable de cuidar la democracia es el congreso',
    'P33_6': 'Pregunta 33.6. Qué tan responsable de cuidar la democracia son los partidos políticos',
    'P33_7': 'Pregunta 33.7. Qué tan responsable de cuidar la democracia son las organizaciones de la sociedad civil',
    'P33_8': 'Pregunta 33.8. Qué tan responsable de cuidar la democracia es la ciudadanía',
    'P33_9': 'Pregunta 33.9. Qué tan responsable de cuidar la democracia son las fuerzas militares',

    // Sección 17
    'P34_1': 'Pregunta 34.1. Qué tan confiables son los medios de comunicación',
    'P34_2': 'Pregunta 34.2. Qué tan confiables son las cortes de justicia',
    'P34_3': 'Pregunta 34.3. Qué tan confiable es el gobierno nacional',
    'P34_4': 'Pregunta 34.4. Qué tan confiable es el gobierno local',
    'P34_5': 'Pregunta 34.5. Qué tan confiable es el congreso',
    'P34_6': 'Pregunta 34.6. Qué tan confiables son los partidos políticos',
    'P34_7': 'Pregunta 34.7. Qué tan confiables son las organizaciones de la sociedad civil',
    'P34_8': 'Pregunta 34.8. Qué tan confiable es la ciudadanía',
    'P34_9': 'Pregunta 34.9. Qué tan confiables son las fuerzas militares',

    // Sección 18
    'P35': 'Pregunta 35. Las opiniones que expresó sobre el cuidado de la democracia están influenciadas principalmente por información que obtiene de',

    // Sección 19
    'P36_NUM_PE_1': 'Pregunta 36.1. Cuántas personas que ejercen como concejales o diputados conoce usted',
    'P36_NUM_PE_2': 'Pregunta 36.2. Cuántas personas que trabajan como policías o militares conoce usted',
    'P36_NUM_PE_3': 'Pregunta 36.3. Cuántas personas que trabajan en medios de comunicación tradicionales (radio, televisión, periódicos) conoce usted',
    'P36_NUM_PE_4': 'Pregunta 36.4. Cuántas personas que ejercen como religiosos (sacerdotes, pastores, monjas) conoce usted',
    'P36_NUM_PE_5': 'Pregunta 36.5. Cuántas personas que trabajan en la Alcaldía o en la Gobernación conoce usted',
    'P36_NUM_PE_6': 'Pregunta 36.6. Cuántas personas que trabajan en el gobierno nacional conoce usted',
    'P36_NUM_PE_7': 'Pregunta 36.7. Cuántas personas que ejercen como líderes sociales o defensores de derechos humanos conoce usted',

    // Sección 20
    'P37': 'Pregunta 37. En una escala de 1 (izquierda) a 10 (derecha), en qué posición del espectro ideológico se ubicaría usted'
};

// ─── Órdenes Ordinales ────────────────────────────────────────────────────────

// P10 y P11: valores reales en CSV son Nada/Poca/Bastante/Mucha
// Se remapean a Nada/Poco/Bastante/Mucho al contabilizar
const ORD_INFLUENCIA = ['Nada', 'Poco', 'Bastante', 'Mucho', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_EDUCACION  = ['Ninguno', 'Preescolar', 'Básica primaria', 'Básica secundaria', 'Media', 'Técnica/tecnología', 'Pregrado', 'Posgrado', 'No sabe', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_RIESGO     = ['Ningún riesgo', 'Bajo', 'Moderado', 'Alto', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_ACUERDO4   = ['Nada de acuerdo', 'Poco de acuerdo', 'De acuerdo', 'Totalmente de acuerdo', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_IMPORT4    = ['Nada importante', 'Poco importante', 'Bastante importante', 'Totalmente importante', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_IMPORTMUY  = ['Nada importante', 'Poco importante', 'Bastante importante', 'Muy importante', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_AMENAZA    = ['No es amenaza', 'Amenaza leve', 'Amenaza moderada', 'Amenaza muy seria', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_RESP       = ['Nada responsable', 'Poco responsable', 'Bastante responsable', 'Totalmente responsable', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_CONFIABLE  = ['Nada confiable', 'Poco confiable', 'Bastante confiable', 'Totalmente confiable', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_GOBERNAR   = ['Muy buena', 'Buena', 'Mala', 'Muy mala', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_FORTDEB    = ['Fortaleciéndose', 'Permanece igual', 'Debilitándose', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_ACUERD_MED = ['Muy de acuerdo', 'De acuerdo', 'En desacuerdo', 'Muy en desacuerdo', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_P8         = ['Nada influenciado', 'Poco influenciado', 'Bastante influenciado', 'Muy influenciado', 'Prefiere no responder', 'No contesta / No sabe'];
const ORD_P9         = ['Nada probable', 'Poco probable', 'Bastante probable', 'Muy probable', 'Prefiere no responder', 'No contesta / No sabe'];

const P10_COLS = new Set(Array.from({ length: 11 }, (_, i) => `P10_${i + 1}`));
const P11_COLS = new Set(Array.from({ length: 12 }, (_, i) => `P11_${i + 1}`));

const colOrderMap = {
    'EDUCACION': ORD_EDUCACION,
    'P8':  ORD_P8,
    'P9':  ORD_P9,
    'P14': ORD_FORTDEB,
    'P19': ORD_ACUERDO4,
    'P20': ORD_ACUERDO4,
    'P28': ORD_ACUERDO4,
    'P29': ORD_ACUERDO4,
    ...Object.fromEntries(Array.from({ length: 11 }, (_, i) => [`P10_${i + 1}`, ORD_INFLUENCIA])),
    ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`P11_${i + 1}`, ORD_INFLUENCIA])),
    ...Object.fromEntries(Array.from({ length: 6  }, (_, i) => [`P12_${i + 1}`, ORD_IMPORT4])),
    ...Object.fromEntries(Array.from({ length: 6  }, (_, i) => [`P13_${i + 1}`, ORD_RIESGO])),
    ...Object.fromEntries(Array.from({ length: 5  }, (_, i) => [`P15_${i + 1}`, ORD_ACUERDO4])),
    ...Object.fromEntries(Array.from({ length: 8  }, (_, i) => [`P18_${i + 1}`, ORD_IMPORTMUY])),
    ...Object.fromEntries(Array.from({ length: 5  }, (_, i) => [`P23_${i + 1}`, ORD_GOBERNAR])),
    ...Object.fromEntries(Array.from({ length: 5  }, (_, i) => [`P26_${i + 1}`, ORD_ACUERD_MED])),
    ...Object.fromEntries(Array.from({ length: 4  }, (_, i) => [`P27_${i + 1}`, ORD_ACUERD_MED])),
    ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`P32_${i + 1}`, ORD_AMENAZA])),
    ...Object.fromEntries(Array.from({ length: 9  }, (_, i) => [`P33_${i + 1}`, ORD_RESP])),
    ...Object.fromEntries(Array.from({ length: 9  }, (_, i) => [`P34_${i + 1}`, ORD_CONFIABLE])),
};

// ─── Configuración de Secciones con SubSecciones en Todas ────────────────────

const SEC2_DESC = 'Antes de formular la pregunta, a cada encuestado se le leyó aleatoriamente una de tres frases contextuales sobre la democracia en Colombia. Las siguientes gráficas muestran las respuestas a la pregunta "¿Usted se siente satisfecho o insatisfecho con el funcionamiento de la democracia en Colombia?", segmentadas según la frase que escuchó cada grupo.';

const sectionsConfig = [
    {
        id: 'sec_1', title: 'Sección 1. Demografía',
        desc: 'Características sociodemográficas de los encuestados.',
        subSections: [
            { title: 'Pregunta 1. País de nacimiento', desc: null, cols: ['PAIS_ORIGEN'] },
            { title: 'Pregunta 2. Sexo', desc: 'Observación del encuestador.', cols: ['SEXO'] },
            { title: 'Pregunta 3. Identidad de género', desc: null, cols: ['GÉNERO'] },
            { title: 'Pregunta 4. Nivel educativo', desc: null, cols: ['EDUCACION'] },
            { title: 'Pregunta 5. Estrato socioeconómico', desc: 'Según la factura de servicios públicos.', cols: ['ESTRATO'] }
        ]
    },
    {
        id: 'sec_2', title: 'Sección 2. Satisfacción con la Democracia',
        desc: SEC2_DESC,
        subSections: [
            { title: 'Pregunta 7. Satisfacción con el funcionamiento de la democracia (por frase asignada)', desc: null, cols: ['P7.1', 'P7.2', 'P7.3'] },
            { title: 'Pregunta 8. Influencia de hechos recientes en la satisfacción', desc: 'En una escala de 1 a 4, en la que 1 significa nada influenciado(a) y 4 muy influenciado(a).', cols: ['P8'] },
            { title: 'Pregunta 9. Probabilidad de que nuevos hechos cambien la satisfacción', desc: 'En una escala de 1 a 4, en la que 1 significa nada probable y 4 muy probable.', cols: ['P9'] }
        ]
    },
    {
        id: 'sec_3', title: 'Sección 3. Atributos que Influencian la Satisfacción con la Democracia',
        desc: 'En una escala de 1 a 4, en la que 1 significa nada de influencia y 4 mucha influencia, en qué medida cada uno de los siguientes atributos influencia su grado de satisfacción con el funcionamiento de la democracia en Colombia.',
        subSections: [
            { title: 'Pregunta 10. Atributos que influencian la satisfacción con la democracia', desc: null, cols: Array.from({ length: 11 }, (_, i) => `P10_${i + 1}`) }
        ]
    },
    {
        id: 'sec_4', title: 'Sección 4. Cambios que Influirían en la Satisfacción con la Democracia',
        desc: 'En una escala de 1 a 4, en la que 1 significa nada de influencia y 4 mucha influencia, en qué nivel influirían los siguientes cambios en su satisfacción con el funcionamiento de la democracia en Colombia.',
        subSections: [
            { title: 'Pregunta 11. Cambios que influirían en la satisfacción con la democracia', desc: null, cols: Array.from({ length: 12 }, (_, i) => `P11_${i + 1}`) }
        ]
    },
    {
        id: 'sec_5', title: 'Sección 5. Factores Importantes y en Riesgo de la Democracia',
        desc: null,
        subSections: [
            { title: 'Pregunta 12. Importancia de los factores para el funcionamiento de la democracia', desc: 'En una escala de 1 a 4, en la que 1 significa nada importante y 4 totalmente importante, qué tan importantes son estos factores para el funcionamiento de la democracia en Colombia.', cols: Array.from({ length: 6 }, (_, i) => `P12_${i + 1}`) },
            { title: 'Pregunta 13. Factores en riesgo en la democracia colombiana', desc: 'En una escala de 1 a 4 donde 1 significa ningún riesgo, 2 bajo riesgo, 3 riesgo moderado y 4 alto riesgo.', cols: Array.from({ length: 6 }, (_, i) => `P13_${i + 1}`) },
            { title: 'Pregunta 14. Estado actual de la democracia colombiana', desc: 'Se habla de aciertos, tensiones y desafíos que atraviesa la democracia en Colombia.', cols: ['P14'] },
            { title: 'Pregunta 15. Espacios donde se aprende sobre la democracia', desc: 'En una escala de 1 a 4, en la que 1 significa nada de acuerdo y 4 totalmente de acuerdo.', cols: Array.from({ length: 5 }, (_, i) => `P15_${i + 1}`) }
        ]
    },
    {
        id: 'sec_6', title: 'Sección 6. Voto e Intención Electoral',
        desc: null,
        subSections: [
            { title: 'Pregunta 16. Participación electoral en los últimos cinco años', desc: null, cols: ['P16'] },
            { title: 'Pregunta 16A. Intención de voto en las próximas elecciones', desc: null, cols: ['P16A'] },
            { title: 'Pregunta 17. Motivación principal para votar', desc: null, cols: ['P17'] }
        ]
    },
    {
        id: 'sec_7', title: 'Sección 7. Elementos para Elecciones Libres y Justas',
        desc: 'En una escala de 1 a 4, en la que 1 significa nada importante y 4 muy importante, desde su punto de vista, qué tan importantes son estos elementos para que las elecciones sean libres y justas.',
        subSections: [
            { title: 'Pregunta 18. Elementos para que las elecciones sean libres y justas', desc: null, cols: Array.from({ length: 8 }, (_, i) => `P18_${i + 1}`) }
        ]
    },
    {
        id: 'sec_8', title: 'Sección 8. Comparación y Condiciones de la Democracia',
        desc: 'Grado de acuerdo con afirmaciones sobre el funcionamiento comparado de la democracia. Escala de 1 (nada de acuerdo) a 4 (totalmente de acuerdo).',
        subSections: [
            { title: 'Pregunta 19. Existencia de democracias que funcionan mejor que la colombiana', desc: null, cols: ['P19'] },
            { title: 'Pregunta 20. Relación entre nivel educativo de la sociedad y el funcionamiento de la democracia', desc: null, cols: ['P20'] }
        ]
    },
    {
        id: 'sec_9', title: 'Sección 9. Atributos del Gobierno Nacional y Local',
        desc: 'Ordene de 1 a 4, siendo 1 el más importante y 4 el menos importante, cuáles de los siguientes atributos son los más relevantes para el buen funcionamiento de la democracia. Cada barra muestra cuántas personas ubicaron ese atributo en cada posición del ranking.',
        subSections: [
            { title: 'Pregunta 21. Atributos del gobierno nacional', desc: null, cols: ['P21_RANKING'] },
            { title: 'Pregunta 22. Atributos del gobierno local o regional', desc: null, cols: ['P22_RANKING'] }
        ]
    },
    {
        id: 'sec_10', title: 'Sección 10. Formas de Gobernar un País',
        desc: 'En su opinión, qué tan buena o mala es cada una de estas formas de gobernar un país. Escala de 1 (muy buena) a 4 (muy mala).',
        subSections: [
            { title: 'Pregunta 23. Evaluación de distintas formas de gobierno', desc: null, cols: Array.from({ length: 5 }, (_, i) => `P23_${i + 1}`) }
        ]
    },
    {
        id: 'sec_11', title: 'Sección 11. Importancia y Motivaciones del Voto',
        desc: null,
        subSections: [
            { title: 'Pregunta 24. Opinión sobre la importancia de votar', desc: null, cols: ['P24'] },
            { title: 'Pregunta 25. Razón por la que votar no tiene importancia', desc: 'Solo responden quienes consideraron que votar no tiene importancia en la Pregunta 24.', cols: ['P25'] }
        ]
    },
    {
        id: 'sec_12', title: 'Sección 12. Percepción de los Partidos Políticos',
        desc: 'Hablando sobre los partidos políticos, qué tan de acuerdo está con las siguientes frases. Escala de 1 (muy de acuerdo) a 4 (muy en desacuerdo).',
        subSections: [
            { title: 'Pregunta 26. Percepción sobre los partidos políticos', desc: null, cols: Array.from({ length: 5 }, (_, i) => `P26_${i + 1}`) }
        ]
    },
    {
        id: 'sec_13', title: 'Sección 13. Percepción de los Medios de Comunicación',
        desc: 'En general, sobre los medios de comunicación tradicionales (radio, TV, periódicos), qué tan de acuerdo está con las siguientes frases. Escala de 1 (muy de acuerdo) a 4 (muy en desacuerdo).',
        subSections: [
            { title: 'Pregunta 27. Percepción de los medios de comunicación tradicionales', desc: null, cols: Array.from({ length: 4 }, (_, i) => `P27_${i + 1}`) }
        ]
    },
    {
        id: 'sec_14', title: 'Sección 14. Expertos y Reacción ante Líderes Políticos',
        desc: null,
        subSections: [
            { title: 'Pregunta 28. Consulta a expertos para diseñar soluciones', desc: 'Escala de 1 (nada de acuerdo) a 4 (totalmente de acuerdo).', cols: ['P28'] },
            { title: 'Pregunta 29. Consulta a universidades y centros de estudio', desc: 'Escala de 1 (nada de acuerdo) a 4 (totalmente de acuerdo).', cols: ['P29'] },
            { title: 'Pregunta 30. Reacción más frecuente al escuchar líderes políticos', desc: null, cols: ['P30'] },
            { title: 'Pregunta 31. Percepción de lo que hablan los políticos', desc: null, cols: ['P31'] }
        ]
    },
    {
        id: 'sec_15', title: 'Sección 15. Amenazas a la Democracia',
        desc: 'En una escala de 1 a 4, en la que 1 significa que no es una amenaza y 4 es una amenaza muy seria, desde su punto de vista, cuáles de las siguientes situaciones son las amenazas más serias para la democracia en Colombia.',
        subSections: [
            { title: 'Pregunta 32. Amenazas a la democracia colombiana', desc: null, cols: Array.from({ length: 10 }, (_, i) => `P32_${i + 1}`) }
        ]
    },
    {
        id: 'sec_16', title: 'Sección 16. Responsabilidad de Cuidar la Democracia',
        desc: 'En una escala de 1 a 4, siendo 1 nada responsable y 4 totalmente responsable, quién es el responsable de cuidar la democracia en Colombia.',
        subSections: [
            { title: 'Pregunta 33. Responsabilidad de cuidar la democracia por actor', desc: null, cols: Array.from({ length: 9 }, (_, i) => `P33_${i + 1}`) }
        ]
    },
    {
        id: 'sec_17', title: 'Sección 17. Confiabilidad de las Instituciones',
        desc: 'En una escala de 1 a 4, siendo 1 nada confiable y 4 totalmente confiable, qué tan confiables son cada una de las siguientes organizaciones.',
        subSections: [
            { title: 'Pregunta 34. Confiabilidad de instituciones y actores', desc: null, cols: Array.from({ length: 9 }, (_, i) => `P34_${i + 1}`) }
        ]
    },
    {
        id: 'sec_18', title: 'Sección 18. Fuente de Influencia en las Opiniones',
        desc: null,
        subSections: [
            { title: 'Pregunta 35. Fuente principal de información que influye en las opiniones sobre el cuidado de la democracia', desc: null, cols: ['P35'] }
        ]
    },
    {
        id: 'sec_19', title: 'Sección 19. Redes de Contacto con Actores de la Vida Pública',
        desc: 'Para los siguientes grupos de personas, indique cuántas personas conoce usted con estas características. A los efectos de esta encuesta, la definición de conocer a alguien es que usted lo conoce y él o ella lo conoce a usted de vista o de nombre, que podría ponerse en contacto con él, que vive en Colombia y que ha habido algún tipo de contacto, ya sea en persona, por teléfono o por correo, en los últimos dos años.',
        subSections: [
            { title: 'Pregunta 36. Número de personas conocidas por tipo de actor', desc: null, cols: Array.from({ length: 7 }, (_, i) => `P36_NUM_PE_${i + 1}`) }
        ]
    },
    {
        id: 'sec_20', title: 'Sección 20. Espectro Ideológico',
        desc: 'En política se habla con frecuencia de posiciones de izquierda y de derecha. En una escala de 1 a 10, donde 1 significa izquierda y 10 significa derecha, en qué número se ubicaría usted.',
        subSections: [
            { title: 'Pregunta 37. Autoubicación en el espectro ideológico', desc: null, cols: ['P37'] }
        ]
    }
];

// ─── Estado Global ────────────────────────────────────────────────────────────
let rawData = [];
let filteredData = [];
let charts = {};
let filterControls = {};

Chart.defaults.color = '#334155';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.register(ChartDataLabels);
Chart.defaults.plugins.legend.labels.color = '#334155';
const colorPalette = ['#2a2b5f', '#fdb913', '#00aeef', '#64748b', '#334155', '#7f1d1d', '#800020'];

// Colores base para cada atributo de P21/P22 (uno por barra)
const RANK_ATTR_BASE   = ['#2a2b5f', '#fdb913', '#00aeef', '#64748b'];
const RANK_ATTR_LABELS = [
    'Afín a mi ideología',
    'Que sea transparente',
    'Que sea eficiente',
    'Que respete los límites constitucionales'
];

// ─── Carga de Datos ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    document.getElementById('btn-reset').addEventListener('click', resetFilters);
});

function loadData() {
    Papa.parse('./data/Fase_1_Limpiado.csv', {
        download: true, header: true, skipEmptyLines: true,
        complete(results) {
            rawData = results.data.map(r => ({
                ...r,
                EDAD: parseFloat(r.EDAD) || 0,
                PAIS_ORIGEN: (r.PAIS_ORIGEN || '').trim() === '996' ? 'Otro' : (r.PAIS_ORIGEN || '').trim()
            }));
            filteredData = [...rawData];
            initFilters();
            buildDOM();
            renderAllCharts();
            setTimeout(() => document.getElementById('loading-overlay').classList.add('hidden'), 500);
        },
        error() { alert('No se pudo cargar el archivo de datos. Verifique que el servidor esté en ejecución.'); }
    });
}

// ─── Filtros ──────────────────────────────────────────────────────────────────
function initFilters() {
    const sets = { sexo: new Set(), genero: new Set(), educacion: new Set(), actividad: new Set(), estrato: new Set(), depto: new Set(), muni: new Set() };
    let minAge = 100, maxAge = 18;
    rawData.forEach(row => {
        if (row['SEXO'] && row['SEXO'].trim()) sets.sexo.add(row['SEXO'].trim());
        if (row['GÉNERO'] && row['GÉNERO'].trim()) sets.genero.add(row['GÉNERO'].trim());
        if (row['EDUCACION'] && row['EDUCACION'].trim()) sets.educacion.add(row['EDUCACION'].trim());
        if (row['ACTIVIDAD'] && row['ACTIVIDAD'].trim()) sets.actividad.add(row['ACTIVIDAD'].trim());
        if (row['ESTRATO'] && row['ESTRATO'].trim()) sets.estrato.add(row['ESTRATO'].trim());
        if (row['DEPARTAMENTO'] && row['DEPARTAMENTO'].trim()) sets.depto.add(row['DEPARTAMENTO'].trim());
        if (row['MUNICIPIO'] && row['MUNICIPIO'].trim()) sets.muni.add(row['MUNICIPIO'].trim());
        
        if (row.EDAD > 0) { minAge = Math.min(minAge, row.EDAD); maxAge = Math.max(maxAge, row.EDAD); }
    });

    const sliderElem = document.getElementById('age-slider');
    noUiSlider.create(sliderElem, { start: [minAge, maxAge], connect: true, step: 1, range: { min: minAge, max: maxAge } });
    sliderElem.noUiSlider.on('update', v => {
        document.getElementById('age-min').textContent = Math.round(v[0]);
        document.getElementById('age-max').textContent = Math.round(v[1]);
    });
    sliderElem.noUiSlider.on('change', applyFilters);

    const cfg = (id, optSet) => {
        const el = document.getElementById(id);
        if (!el) { console.warn(`Elemento ${id} no encontrado.`); return; }
        if (filterControls[id]) { filterControls[id].destroy(); }
        
        const options = Array.from(optSet).filter(v => v).sort().map(v => ({ value: v, label: v }));
        
        filterControls[id] = new Choices(el, {
            choices: options,
            removeItemButton: true,
            searchEnabled: true,
            placeholderValue: 'Seleccionar...',
            itemSelectText: '',
            shouldSort: false
        });
        el.addEventListener('change', applyFilters);
    };
    
    // Inicializar cada uno explícitamente y con log si es necesario
    cfg('filter-sexo', sets.sexo);
    cfg('filter-genero', sets.genero);
    cfg('filter-educacion', sets.educacion);
    cfg('filter-actividad', sets.actividad);
    cfg('filter-estrato', sets.estrato);
    cfg('filter-depto', sets.depto);
    cfg('filter-muni', sets.muni);
}

function resetFilters() {
    document.getElementById('age-slider').noUiSlider.reset();
    Object.values(filterControls).forEach(c => c.removeActiveItems());
    applyFilters();
}

function applyFilters() {
    const [lo, hi] = document.getElementById('age-slider').noUiSlider.get().map(parseFloat);
    const gv = id => { const v = filterControls[id].getValue(true); return Array.isArray(v) ? v : []; };
    const sX = gv('filter-sexo'), sG = gv('filter-genero'), sE = gv('filter-educacion'), 
          sA = gv('filter-actividad'), sS = gv('filter-estrato'), sD = gv('filter-depto'), 
          sM = gv('filter-muni');

    filteredData = rawData.filter(r => {
        if (r.EDAD > 0 && (r.EDAD < lo || r.EDAD > hi)) return false;
        if (sX.length && !sX.includes(r['SEXO']?.trim())) return false;
        if (sG.length && !sG.includes(r['GÉNERO']?.trim())) return false;
        if (sE.length && !sE.includes(r['EDUCACION']?.trim())) return false;
        if (sA.length && !sA.includes(r['ACTIVIDAD']?.trim())) return false;
        if (sS.length && !sS.includes(r['ESTRATO']?.trim())) return false;
        if (sD.length && !sD.includes(r['DEPARTAMENTO']?.trim())) return false;
        if (sM.length && !sM.includes(r['MUNICIPIO']?.trim())) return false;
        return true;
    });
    renderAllCharts();
}

// ─── Construcción del DOM (solo la primera vez) ────────────────────────────────
function buildDOM() {
    const wrapper = document.getElementById('charts-wrapper');
    if (wrapper.children.length > 0) return;

    sectionsConfig.forEach(sec => {
        const secDiv = document.createElement('div');
        secDiv.className = 'section-container w-100 fade-in';
        secDiv.innerHTML = `<h3 class="section-title">${sec.title}</h3>
                            ${sec.desc ? `<p class="section-desc">${sec.desc}</p>` : ''}`;

        sec.subSections.forEach(sub => {
            const subDiv = document.createElement('div');
            subDiv.className = 'sub-section';
            subDiv.innerHTML = `<h4 class="sub-section-title">${sub.title}</h4>
                                ${sub.desc ? `<p class="section-desc">${sub.desc}</p>` : ''}`;
            const grid = document.createElement('div');
            grid.className = 'section-grid';
            sub.cols.forEach(col => grid.appendChild(makeCard(col)));
            subDiv.appendChild(grid);
            secDiv.appendChild(subDiv);
        });

        wrapper.appendChild(secDiv);
    });
}

function makeCard(col) {
    const card = document.createElement('div');
    card.className = 'chart-card';
    const isRanking = col.endsWith('_RANKING');
    card.innerHTML = `
        <div class="chart-header">
            <h4>${qDict[col] || col}</h4>
            <a href="./chart_detail.html?col=${encodeURIComponent(col)}"
               target="_blank"
               class="detail-btn"
               title="Abrir en vista de detalle con filtros completos">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Abrir en detalle
            </a>
        </div>
        <div class="canvas-container" style="height:${isRanking ? 420 : 300}px">
            <canvas id="canvas-${col}"></canvas>
        </div>`;
    return card;
}

// ─── Renderizado de Gráficas ──────────────────────────────────────────────────
function renderAllCharts() {
    document.getElementById('stat-total').textContent = rawData.length;
    document.getElementById('stat-filtered').textContent = filteredData.length;

    let idx = 0;
    sectionsConfig.forEach(sec => {
        sec.subSections.forEach(sub => {
            sub.cols.forEach(col => {
                renderOneChart(col, colorPalette[idx % colorPalette.length]);
                idx++;
            });
        });
    });
}

function renderOneChart(col, fallbackColor) {
    const chartId = `canvas-${col}`;
    const canvas  = document.getElementById(chartId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (charts[chartId]) { charts[chartId].destroy(); delete charts[chartId]; }

    // ── Ranking P21/P22 ──────────────────────────────────────────────────────
    if (col.endsWith('_RANKING')) { renderRankingChart(col, ctx, chartId); return; }

    // ── P7.x (segmentado por ROTA_FRASES) ───────────────────────────────────
    let focusData = filteredData;
    let actualCol = col;
    if (col.startsWith('P7.')) {
        focusData = filteredData.filter(r => String(r.ROTA_FRASES).trim() === col.split('.')[1]);
        actualCol = 'P7';
    }

    // ── Histograma numérico: P36 y P37 ───────────────────────────────────────
    if (col.includes('P36') || col === 'P37') {
        const CAP = 10;
        const bins = {};
        focusData.forEach(r => {
            let v = parseFloat(r[actualCol]);
            if (isNaN(v)) return;
            v = Math.min(Math.floor(v), CAP);
            const key = String(v);
            bins[key] = (bins[key] || 0) + 1;
        });
        const labels = Object.keys(bins).sort((a, b) => Number(a) - Number(b));
        const data   = labels.map(l => bins[l]);

        let bgColors;
        if (col === 'P37') {
            // Espectro de 1 (Morado) a 10 (Cian)
            bgColors = labels.map(l => {
                const step = (Number(l) - 1) / 9;
                return interpolateColor('#2a2b5f', '#00aeef', step);
            });
        } else {
            bgColors = labels.map((_, i) => colorPalette[i % colorPalette.length]);
        }
        
        drawBar(ctx, chartId, labels, data, bgColors, false, focusData.length);
        return;
    }

    // ── Conteo categórico con remapeo P10/P11 ────────────────────────────────
    const needsRemap = P10_COLS.has(col) || P11_COLS.has(col);
    const counts = {};
    focusData.forEach(r => {
        let raw = (r[actualCol] || '').trim();
        if (!raw) raw = 'No contesta / No sabe';
        if (needsRemap) {
            if (raw === 'Poca')  raw = 'Poco';
            if (raw === 'Mucha') raw = 'Mucho';
        }
        counts[raw] = (counts[raw] || 0) + 1;
    });

    // Ordenar
    const preset = colOrderMap[col] || colOrderMap[actualCol];
    let labels, data;
    if (preset) {
        labels = []; data = [];
        preset.forEach(cat => { if (counts[cat] !== undefined) { labels.push(cat); data.push(counts[cat]); } });
        Object.keys(counts).forEach(k => { if (!preset.includes(k)) { labels.push(k); data.push(counts[k]); } });
    } else {
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        labels = sorted.map(e => e[0]);
        data   = sorted.map(e => e[1]);
    }

    // Determinar tipo de gráfico (Torta si opciones totales <= 3)
    const globalOptions = new Set();
    rawData.forEach(r => {
        let raw = (r[actualCol] || '').trim() || 'No contesta / No sabe';
        if (needsRemap) {
            if (raw === 'Poca')  raw = 'Poco';
            if (raw === 'Mucha') raw = 'Mucho';
        }
        globalOptions.add(raw);
    });
    const usePie = globalOptions.size <= 3;
    const bgColors = labels.map((_, i) => colorPalette[i % colorPalette.length]);

    if (usePie) {
        charts[chartId] = new Chart(ctx, {
            type: 'pie',
            data: { labels, datasets: [{ data, backgroundColor: bgColors, borderWidth: 0 }] },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { color: '#334155', usePointStyle: true, padding: 16 } },
                    tooltip: {
                        callbacks: {
                            label: c => {
                                const n = c.raw;
                                const totAbs = rawData.length;
                                const totFil = filteredData.length;
                                const pAbs = ((n / totAbs) * 100).toFixed(1);
                                const pFil = ((n / totFil) * 100).toFixed(1);
                                return [
                                    `${labels[c.dataIndex]}`,
                                    `Frecuencia: ${n}`,
                                    `% del Total País: ${pAbs}%`,
                                    `% de Datos Filtrados: ${pFil}%`
                                ];
                            }
                        }
                    },
                    datalabels: {
                        display: usePie,
                        color: '#fff',
                        font: { weight: 'bold', size: 11 },
                        formatter: (val) => {
                            const tot = focusData.length || 1;
                            return ((val / tot) * 100).toFixed(1) + '%';
                        }
                    }
                }
            }
        });
    } else {
        drawBar(ctx, chartId, labels, data, bgColors, labels.length > 4, focusData.length);
    }
}

// ─── Gráfica de Barras Genérica ───────────────────────────────────────────────
function drawBar(ctx, chartId, labels, data, bgColors, horizontal, currentTotal) {
    const showLabels = labels.length <= 5;
    charts[chartId] = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets: [{ data, backgroundColor: bgColors, borderRadius: 4 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: horizontal ? 'y' : 'x',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: c => {
                            const n = c.raw;
                            const totAbs = rawData.length;
                            const totFil = filteredData.length;
                            const pAbs = ((n / totAbs) * 100).toFixed(1);
                            const pFil = ((n / totFil) * 100).toFixed(1);
                            return [
                                `${labels[c.dataIndex]}`,
                                `Frecuencia: ${n}`,
                                `% del Total País: ${pAbs}%`,
                                `% de Datos Filtrados: ${pFil}%`
                            ];
                        }
                    }
                },
                datalabels: {
                    display: showLabels,
                    anchor: 'end',
                    align: 'end',
                    offset: 4,
                    color: '#334155',
                    font: { weight: '600', size: 10 },
                    formatter: (val) => {
                        const tot = currentTotal || 1;
                        return ((val / tot) * 100).toFixed(1) + '%';
                    }
                }
            },
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                y: { grid: { display: !horizontal, color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
            }
        }
    });
}

// ─── Gráfica de Ranking (P21, P22) ───────────────────────────────────────────
function renderRankingChart(col, ctx, chartId) {
    const base    = col === 'P21_RANKING' ? 'P21' : 'P22';
    const subCols = [1, 2, 3, 4].map(n => `${base}_${n}`);
    const total   = filteredData.length || 1;

    // Mapeo de valores del CSV a índice de posición 0-3
    const posMap = {
        '1 - Más importante': 0,
        '2 - Segunda opción': 1,
        '3 - Tercera opción': 2,
        '4 - Menos importante': 3
    };

    // matrix[atributo][posición] = conteo
    const matrix = subCols.map(() => [0, 0, 0, 0]);
    filteredData.forEach(r => {
        subCols.forEach((sc, oi) => {
            const raw = (r[sc] || '').trim();
            const pos = posMap[raw] !== undefined ? posMap[raw] : (parseInt(raw) - 1);
            if (pos >= 0 && pos <= 3) matrix[oi][pos]++;
        });
    });

    // Ordenar atributos por mayor conteo en posición 1 (índice 0), luego 2, 3, 4
    const attrOrder = [0, 1, 2, 3].sort((a, b) => {
        for (let p = 0; p < 4; p++) {
            if (matrix[b][p] !== matrix[a][p]) return matrix[b][p] - matrix[a][p];
        }
        return 0;
    });

    const sortedLabels = attrOrder.map(i => RANK_ATTR_LABELS[i]);
    const sortedMatrix = attrOrder.map(i => matrix[i]);
    const sortedBases  = attrOrder.map(i => RANK_ATTR_BASE[i]);

    // Datasets: uno por posición; cada barra tiene su propio color degradado
    const posLabels = ['1 (más importante)', '2', '3', '4 (menos importante)'];
    const opacities = [1.0, 0.70, 0.45, 0.22];

    const datasets = posLabels.map((posLabel, pi) => ({
        label: posLabel,
        data: sortedMatrix.map(row => row[pi]),
        // Color único por atributo, opacidad según posición
        backgroundColor: sortedBases.map(hex => hexWithAlpha(hex, opacities[pi])),
        borderRadius: 3,
        borderSkipped: false
    }));

    charts[chartId] = new Chart(ctx, {
        type: 'bar',
        data: { labels: sortedLabels, datasets },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { color: '#334155', usePointStyle: true } },
                tooltip: {
                    callbacks: {
                        label: c => {
                            const n = c.raw;
                            const totAbs = rawData.length;
                            const totFil = filteredData.length;
                            const pAbs = ((n / totAbs) * 100).toFixed(1);
                            const pFil = ((n / totFil) * 100).toFixed(1);
                            return [
                                `${c.dataset.label}`,
                                `Frecuencia: ${n}`,
                                `% del Total País: ${pAbs}%`,
                                `% de Datos Filtrados: ${pFil}%`
                            ];
                        }
                    }
                },
                datalabels: {
                    display: (context) => context.dataset.data[context.dataIndex] > total * 0.05, // Solo si > 5% para evitar amontonamiento
                    color: '#fff',
                    font: { weight: 'bold', size: 11 },
                    formatter: (val, ctx) => `N° ${ctx.datasetIndex + 1}`
                }
            },
            scales: {
                x: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#e2e8f0', font: { weight: '600' } } },
                y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
            }
        }
    });
}

// ─── Utilidad: interpolación de colores ────────────────────────────────────
function interpolateColor(c1, c2, factor) {
    const hex = x => {
        const val = Math.round(x);
        return val.toString(16).padStart(2, '0');
    };
    const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
    const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
    return `#${hex(r1 + (r2 - r1) * factor)}${hex(g1 + (g2 - g1) * factor)}${hex(b1 + (b2 - b1) * factor)}`;
}

// ─── Utilidad: color hex con opacidad rgba ────────────────────────────────────
function hexWithAlpha(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}
