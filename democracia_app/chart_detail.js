// ═══════════════════════════════════════════════════════════════════════════════
//  Cuidar la Democracia – Chart Detail Page Logic
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Diccionario de Preguntas (sincronizado con app.js) ───────────────────────
const qDict = {
    'PAIS_ORIGEN': 'Pregunta 1. Cuál es su país de nacimiento',
    'SEXO': 'Pregunta 2. Sexo del encuestado (observación del encuestador)',
    'GÉNERO': 'Pregunta 3. Con cuál de las siguientes identidades de género se reconoce usted',
    'EDUCACION': 'Pregunta 4. Cuál es el nivel educativo más alto que ha alcanzado',
    'ESTRATO': 'Pregunta 5. Cuál es el estrato socioeconómico de su vivienda según la factura de servicios públicos',
    'P7.1': 'Pregunta 7.1. Satisfacción dada la frase: "Según los historiadores, Colombia es la democracia más antigua y estable de América Latina; es la que menos golpes de estado ha tenido, y menos años ha vivido bajo regímenes militares."',
    'P7.2': 'Pregunta 7.2. Satisfacción dada la frase: "Según la prestigiosa revista The Economist, Colombia tiene el noveno mejor índice de desempeño democrático de América Latina, mejor que el de países como Perú, México y Ecuador."',
    'P7.3': 'Pregunta 7.3. Satisfacción dada la frase: "Colombia es un Estado social de derecho, organizado en forma de República unitaria, descentralizada, con autonomía de sus entidades territoriales, democrática, participativa y pluralista."',
    'P8': 'Pregunta 8. Qué tan influenciada está su satisfacción con el funcionamiento de la democracia por hechos y noticias recientes',
    'P9': 'Pregunta 9. Qué tan probable es que nuevos hechos y noticias cambien su satisfacción con el funcionamiento de la democracia',
    'P10_1': 'Pregunta 10.1. En qué medida lo que escucha o lee sobre hechos de corrupción influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_2': 'Pregunta 10.2. En qué medida las protestas o marchas influencian su grado de satisfacción con el funcionamiento de la democracia',
    'P10_3': 'Pregunta 10.3. En qué medida los enfrentamientos entre líderes políticos influencian su grado de satisfacción con el funcionamiento de la democracia',
    'P10_4': 'Pregunta 10.4. En qué medida la desigualdad socioeconómica influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_5': 'Pregunta 10.5. En qué medida ver restringidas sus libertades más importantes influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_6': 'Pregunta 10.6. En qué medida que los líderes políticos hablen o no de lo que es importante para usted influencia su grado de satisfacción',
    'P10_7': 'Pregunta 10.7. En qué medida la presencia integral del Estado en su comunidad influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_8': 'Pregunta 10.8. En qué medida la asistencia que recibe del Estado influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_9': 'Pregunta 10.9. En qué medida que los líderes políticos no tengan preparación influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P10_10': 'Pregunta 10.10. En qué medida que los mecanismos y organismos de control no estén al servicio de los ciudadanos influencia su grado de satisfacción',
    'P10_11': 'Pregunta 10.11. En qué medida la pobreza influencia su grado de satisfacción con el funcionamiento de la democracia',
    'P11_1': 'Pregunta 11.1. En qué medida más contacto directo o cercanía con sus representantes elegidos influiría en su satisfacción',
    'P11_2': 'Pregunta 11.2. En qué medida la mejor preparación de sus representantes elegidos influiría en su satisfacción',
    'P11_3': 'Pregunta 11.3. En qué medida mayor información y transparencia sobre el uso de los recursos públicos influiría en su satisfacción',
    'P11_4': 'Pregunta 11.4. En qué medida mayor diversidad en los representantes elegidos influiría en su satisfacción',
    'P11_5': 'Pregunta 11.5. En qué medida una forma diferente de financiar campañas políticas influiría en su satisfacción',
    'P11_6': 'Pregunta 11.6. En qué medida más asistencia del Estado a usted o a su comunidad influiría en su satisfacción',
    'P11_7': 'Pregunta 11.7. En qué medida mayor seguridad en las calles y en el campo influiría en su satisfacción',
    'P11_8': 'Pregunta 11.8. En qué medida más y mejores oportunidades de educación o trabajo influirían en su satisfacción',
    'P11_9': 'Pregunta 11.9. En qué medida una nueva constitución política influiría en su satisfacción',
    'P11_10': 'Pregunta 11.10. En qué medida un mejor cumplimiento de la constitución y las leyes existentes influiría en su satisfacción',
    'P11_11': 'Pregunta 11.11. En qué medida mejores acuerdos entre contradictores políticos influirían en su satisfacción',
    'P11_12': 'Pregunta 11.12. En qué medida mayores posibilidades de participación directa en las decisiones importantes influirían en su satisfacción',
    'P12_1': 'Pregunta 12.1. Qué tan importante es que los ciudadanos participen en la toma de decisiones políticas',
    'P12_2': 'Pregunta 12.2. Qué tan importante es que exista respeto de la dignidad humana y de los derechos individuales',
    'P12_3': 'Pregunta 12.3. Qué tan importante es que exista discusión libre de ideas e intereses en el debate público',
    'P12_4': 'Pregunta 12.4. Qué tan importante es que los ciudadanos se sometan a las reglas claras de la Constitución',
    'P12_5': 'Pregunta 12.5. Qué tan importante es que se reconozca la necesidad de buscar una igualdad socioeconómica básica',
    'P12_6': 'Pregunta 12.6. Qué tan importante es que la mayoría de los ciudadanos se comporten de manera cívica y respeten las leyes',
    'P13_1': 'Pregunta 13.1. Qué tanto riesgo corre la participación ciudadana en nuestra democracia',
    'P13_2': 'Pregunta 13.2. Qué tanto riesgo corre el respeto de la dignidad humana y de los derechos individuales',
    'P13_3': 'Pregunta 13.3. Qué tanto riesgo corre la discusión libre de ideas e intereses en el debate público',
    'P13_4': 'Pregunta 13.4. Qué tanto riesgo corre el cuidado y defensa de la Constitución',
    'P13_5': 'Pregunta 13.5. Qué tanto riesgo corre la necesidad de buscar una igualdad socioeconómica básica',
    'P13_6': 'Pregunta 13.6. Qué tanto riesgo corre el compromiso ciudadano y el respeto por la ley',
    'P14': 'Pregunta 14. En su opinión, la democracia colombiana se está fortaleciendo, permanece igual o se está debilitando',
    'P15_1': 'Pregunta 15.1. Qué tan de acuerdo está con que se aprende sobre la democracia en el hogar y con la familia',
    'P15_2': 'Pregunta 15.2. Qué tan de acuerdo está con que se aprende sobre la democracia en el barrio o vereda',
    'P15_3': 'Pregunta 15.3. Qué tan de acuerdo está con que se aprende sobre la democracia en el colegio o universidad',
    'P15_4': 'Pregunta 15.4. Qué tan de acuerdo está con que se aprende sobre la democracia en redes sociales',
    'P15_5': 'Pregunta 15.5. Qué tan de acuerdo está con que se aprende sobre la democracia en los medios tradicionales (radio, TV, periódicos)',
    'P16': 'Pregunta 16. Ha votado usted en los últimos cinco años',
    'P16A': 'Pregunta 16A. Piensa votar usted en las próximas elecciones',
    'P17': 'Pregunta 17. Si saliera a votar, lo haría por',
    'P18_1': 'Pregunta 18.1. Qué tan importante es que los votantes tengan acceso a información adecuada para que las elecciones sean libres y justas',
    'P18_2': 'Pregunta 18.2. Qué tan importante es que la administración electoral sea independiente e imparcial',
    'P18_3': 'Pregunta 18.3. Qué tan importante es que la infraestructura electoral sea protegida de amenazas',
    'P18_4': 'Pregunta 18.4. Qué tan importante es que las leyes electorales sean explicadas claramente a los votantes',
    'P18_5': 'Pregunta 18.5. Qué tan importante es que las leyes electorales no cambien justo antes de las elecciones',
    'P18_6': 'Pregunta 18.6. Qué tan importante es que la administración electoral sea recursiva y competente para cumplir sus deberes',
    'P18_7': 'Pregunta 18.7. Qué tan importante es que no exista coerción o presión a los votantes',
    'P18_8': 'Pregunta 18.8. Qué tan importante es que exista financiación equitativa de las campañas',
    'P19': 'Pregunta 19. Qué tan de acuerdo está con que en otras partes del mundo hay democracias que funcionan mejor que en Colombia',
    'P20': 'Pregunta 20. Qué tan de acuerdo está con que en una sociedad más educada funciona mejor la democracia',
    'P21_RANKING': 'Pregunta 21. Cuáles atributos sobre el gobierno nacional son los más importantes para el buen funcionamiento de la democracia (1 = más importante, 4 = menos importante)',
    'P22_RANKING': 'Pregunta 22. Cuáles atributos sobre el gobierno local o regional son los más importantes para el buen funcionamiento de la democracia (1 = más importante, 4 = menos importante)',
    'P23_1': 'Pregunta 23.1. Qué tan buena o mala le parece un sistema político democrático con presidente y congreso',
    'P23_2': 'Pregunta 23.2. Qué tan buena o mala le parece un sistema en el que los ciudadanos puedan participar directamente',
    'P23_3': 'Pregunta 23.3. Qué tan buena o mala le parece que las decisiones sean tomadas por expertos',
    'P23_4': 'Pregunta 23.4. Qué tan buena o mala le parece ser liderados por una figura fuerte sin congreso ni elecciones',
    'P23_5': 'Pregunta 23.5. Qué tan buena o mala le parece que las fuerzas armadas gobiernen el país',
    'P24': 'Pregunta 24. Cuál de las siguientes opiniones se alinea mejor con su punto de vista sobre el voto',
    'P25': 'Pregunta 25. Por qué razón considera que votar no tiene importancia',
    'P26_1': 'Pregunta 26.1. Qué tan de acuerdo está con que todos los partidos políticos hacen propuestas muy parecidas',
    'P26_2': 'Pregunta 26.2. Qué tan de acuerdo está con que hay suficientes partidos a los que votar en las elecciones',
    'P26_3': 'Pregunta 26.3. Qué tan de acuerdo está con que sin partidos políticos no puede haber democracia',
    'P26_4': 'Pregunta 26.4. Qué tan de acuerdo está con que los partidos eligen a sus candidatos por procedimientos democráticos',
    'P26_5': 'Pregunta 26.5. Qué tan de acuerdo está con que los ciudadanos del partido en el poder reciben mejor trato',
    'P27_1': 'Pregunta 27.1. Qué tan de acuerdo está con que los medios de comunicación hacen eco de noticias falsas y mentiras',
    'P27_2': 'Pregunta 27.2. Qué tan de acuerdo está con que los medios dan acceso a diferentes tipos de opinión',
    'P27_3': 'Pregunta 27.3. Qué tan de acuerdo está con que los medios están concentrados en pocas manos',
    'P27_4': 'Pregunta 27.4. Qué tan de acuerdo está con que los medios favorecen unas opciones políticas o intereses económicos',
    'P28': 'Pregunta 28. Qué tan de acuerdo está con que los representantes deberían consultar la opinión de expertos',
    'P29': 'Pregunta 29. Qué tan de acuerdo está con que los representantes deberían consultar a universidades y centros de estudio',
    'P30': 'Pregunta 30. Cuando escucha o lee sobre los líderes políticos, cuál es su reacción más frecuente',
    'P31': 'Pregunta 31. La mayoría de las veces, cuando un político habla, usted siente que',
    'P32_1': 'Pregunta 32.1. Qué tan seria considera la amenaza de la información falsa o engañosa para la democracia',
    'P32_2': 'Pregunta 32.2. Qué tan seria considera la amenaza de la desconfianza hacia las instituciones democráticas',
    'P32_3': 'Pregunta 32.3. Qué tan seria considera la amenaza de la falta de interés en políticas y elecciones',
    'P32_4': 'Pregunta 32.4. Qué tan seria considera la amenaza de la falta de oportunidades para expresar opiniones por la desigualdad',
    'P32_5': 'Pregunta 32.5. Qué tan seria considera la amenaza de la interferencia extranjera en las políticas y la economía',
    'P32_6': 'Pregunta 32.6. Qué tan seria considera la amenaza de la falta de libertad y diversidad de prensa',
    'P32_7': 'Pregunta 32.7. Qué tan seria considera la amenaza de la falta de conocimiento sobre los procesos democráticos',
    'P32_8': 'Pregunta 32.8. Qué tan seria considera la amenaza de la falta de transparencia del sistema electoral',
    'P32_9': 'Pregunta 32.9. Qué tan seria considera la amenaza de la desestabilización de la infraestructura electoral',
    'P32_10': 'Pregunta 32.10. Qué tan seria considera la amenaza de la interferencia de intereses privados en el sistema electoral',
    'P33_1': 'Pregunta 33.1. Qué tan responsable de cuidar la democracia son los medios de comunicación',
    'P33_2': 'Pregunta 33.2. Qué tan responsable de cuidar la democracia son las cortes de justicia',
    'P33_3': 'Pregunta 33.3. Qué tan responsable de cuidar la democracia es el gobierno nacional',
    'P33_4': 'Pregunta 33.4. Qué tan responsable de cuidar la democracia es el gobierno local',
    'P33_5': 'Pregunta 33.5. Qué tan responsable de cuidar la democracia es el congreso',
    'P33_6': 'Pregunta 33.6. Qué tan responsable de cuidar la democracia son los partidos políticos',
    'P33_7': 'Pregunta 33.7. Qué tan responsable de cuidar la democracia son las organizaciones de la sociedad civil',
    'P33_8': 'Pregunta 33.8. Qué tan responsable de cuidar la democracia es la ciudadanía',
    'P33_9': 'Pregunta 33.9. Qué tan responsable de cuidar la democracia son las fuerzas militares',
    'P34_1': 'Pregunta 34.1. Qué tan confiables son los medios de comunicación',
    'P34_2': 'Pregunta 34.2. Qué tan confiables son las cortes de justicia',
    'P34_3': 'Pregunta 34.3. Qué tan confiable es el gobierno nacional',
    'P34_4': 'Pregunta 34.4. Qué tan confiable es el gobierno local',
    'P34_5': 'Pregunta 34.5. Qué tan confiable es el congreso',
    'P34_6': 'Pregunta 34.6. Qué tan confiables son los partidos políticos',
    'P34_7': 'Pregunta 34.7. Qué tan confiables son las organizaciones de la sociedad civil',
    'P34_8': 'Pregunta 34.8. Qué tan confiable es la ciudadanía',
    'P34_9': 'Pregunta 34.9. Qué tan confiables son las fuerzas militares',
    'P35': 'Pregunta 35. Las opiniones sobre el cuidado de la democracia están influenciadas principalmente por información que obtiene de',
    'P36_NUM_PE_1': 'Pregunta 36.1. Cuántas personas que ejercen como concejales o diputados conoce usted',
    'P36_NUM_PE_2': 'Pregunta 36.2. Cuántas personas que trabajan como policías o militares conoce usted',
    'P36_NUM_PE_3': 'Pregunta 36.3. Cuántas personas que trabajan en medios de comunicación tradicionales conoce usted',
    'P36_NUM_PE_4': 'Pregunta 36.4. Cuántas personas que ejercen como religiosos conoce usted',
    'P36_NUM_PE_5': 'Pregunta 36.5. Cuántas personas que trabajan en la Alcaldía o en la Gobernación conoce usted',
    'P36_NUM_PE_6': 'Pregunta 36.6. Cuántas personas que trabajan en el gobierno nacional conoce usted',
    'P36_NUM_PE_7': 'Pregunta 36.7. Cuántas personas que ejercen como líderes sociales o defensores de derechos humanos conoce usted',
    'P37': 'Pregunta 37. En una escala de 1 (izquierda) a 10 (derecha), en qué posición del espectro ideológico se ubicaría usted'
};

// ─── Órdenes Ordinales (sincronizados con app.js) ─────────────────────────────
const ORD = {
    EDUCACION: ['Ninguno', 'Preescolar', 'Básica primaria', 'Básica secundaria', 'Media', 'Técnica/tecnología', 'Pregrado', 'Posgrado', 'No sabe', 'Prefiere no responder', 'No contesta / No sabe'],
    INFLUENCIA: ['Nada', 'Poco', 'Bastante', 'Mucho', 'Prefiere no responder', 'No contesta / No sabe'],
    RIESGO: ['Ningún riesgo', 'Bajo', 'Moderado', 'Alto', 'Prefiere no responder', 'No contesta / No sabe'],
    ACUERDO4: ['Nada de acuerdo', 'Poco de acuerdo', 'De acuerdo', 'Totalmente de acuerdo', 'Prefiere no responder', 'No contesta / No sabe'],
    IMPORT4: ['Nada importante', 'Poco importante', 'Bastante importante', 'Totalmente importante', 'Prefiere no responder', 'No contesta / No sabe'],
    IMPORTMUY: ['Nada importante', 'Poco importante', 'Bastante importante', 'Muy importante', 'Prefiere no responder', 'No contesta / No sabe'],
    AMENAZA: ['No es amenaza', 'Amenaza leve', 'Amenaza moderada', 'Amenaza muy seria', 'Prefiere no responder', 'No contesta / No sabe'],
    RESP: ['Nada responsable', 'Poco responsable', 'Bastante responsable', 'Totalmente responsable', 'Prefiere no responder', 'No contesta / No sabe'],
    CONFIABLE: ['Nada confiable', 'Poco confiable', 'Bastante confiable', 'Totalmente confiable', 'Prefiere no responder', 'No contesta / No sabe'],
    GOBERNAR: ['Muy buena', 'Buena', 'Mala', 'Muy mala', 'Prefiere no responder', 'No contesta / No sabe'],
    FORTDEB: ['Fortaleciéndose', 'Permanece igual', 'Debilitándose', 'Prefiere no responder', 'No contesta / No sabe'],
    ACUERD_MED: ['Muy de acuerdo', 'De acuerdo', 'En desacuerdo', 'Muy en desacuerdo', 'Prefiere no responder', 'No contesta / No sabe'],
    P8: ['Nada influenciado', 'Poco influenciado', 'Bastante influenciado', 'Muy influenciado', 'Prefiere no responder', 'No contesta / No sabe'],
    P9: ['Nada probable', 'Poco probable', 'Bastante probable', 'Muy probable', 'Prefiere no responder', 'No contesta / No sabe'],
};

const colOrderMap = {
    'EDUCACION': ORD.EDUCACION,
    'P8': ORD.P8, 'P9': ORD.P9, 'P14': ORD.FORTDEB,
    'P19': ORD.ACUERDO4, 'P20': ORD.ACUERDO4, 'P28': ORD.ACUERDO4, 'P29': ORD.ACUERDO4,
    ...Object.fromEntries(Array.from({ length: 11 }, (_, i) => [`P10_${i + 1}`, ORD.INFLUENCIA])),
    ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`P11_${i + 1}`, ORD.INFLUENCIA])),
    ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`P12_${i + 1}`, ORD.IMPORT4])),
    ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`P13_${i + 1}`, ORD.RIESGO])),
    ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`P15_${i + 1}`, ORD.ACUERDO4])),
    ...Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`P18_${i + 1}`, ORD.IMPORTMUY])),
    ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`P23_${i + 1}`, ORD.GOBERNAR])),
    ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`P26_${i + 1}`, ORD.ACUERD_MED])),
    ...Object.fromEntries(Array.from({ length: 4 }, (_, i) => [`P27_${i + 1}`, ORD.ACUERD_MED])),
    ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`P32_${i + 1}`, ORD.AMENAZA])),
    ...Object.fromEntries(Array.from({ length: 9 }, (_, i) => [`P33_${i + 1}`, ORD.RESP])),
    ...Object.fromEntries(Array.from({ length: 9 }, (_, i) => [`P34_${i + 1}`, ORD.CONFIABLE])),
};

// ─── Contextos de Sección por Pregunta ───────────────────────────────────────
const sectionContexts = {
    'PAIS_ORIGEN': 'Sección 1. Demografía', 'SEXO': 'Sección 1. Demografía', 'GÉNERO': 'Sección 1. Demografía',
    'EDUCACION': 'Sección 1. Demografía', 'ESTRATO': 'Sección 1. Demografía',
    'P7.1': 'Sección 2. Satisfacción con la Democracia', 'P7.2': 'Sección 2. Satisfacción con la Democracia', 'P7.3': 'Sección 2. Satisfacción con la Democracia',
    'P8': 'Sección 2. Satisfacción con la Democracia', 'P9': 'Sección 2. Satisfacción con la Democracia',
    ...Object.fromEntries(Array.from({ length: 11 }, (_, i) => [`P10_${i + 1}`, 'Sección 3. Atributos que Influencian la Satisfacción'])),
    ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`P11_${i + 1}`, 'Sección 4. Cambios que Influirían en la Satisfacción'])),
    ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`P12_${i + 1}`, 'Sección 5. Factores Importantes de la Democracia'])),
    ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`P13_${i + 1}`, 'Sección 5. Factores en Riesgo de la Democracia'])),
    'P14': 'Sección 5. Estado de la Democracia',
    ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`P15_${i + 1}`, 'Sección 5. Espacios de Aprendizaje Democrático'])),
    'P16': 'Sección 6. Voto e Intención Electoral', 'P16A': 'Sección 6. Voto e Intención Electoral', 'P17': 'Sección 6. Voto e Intención Electoral',
    ...Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`P18_${i + 1}`, 'Sección 7. Elementos para Elecciones Libres y Justas'])),
    'P19': 'Sección 8. Comparación de la Democracia', 'P20': 'Sección 8. Condiciones de la Democracia',
    'P21_RANKING': 'Sección 9. Atributos del Gobierno Nacional', 'P22_RANKING': 'Sección 9. Atributos del Gobierno Local',
    ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`P23_${i + 1}`, 'Sección 10. Formas de Gobernar un País'])),
    'P24': 'Sección 11. Importancia y Motivaciones del Voto', 'P25': 'Sección 11. Importancia y Motivaciones del Voto',
    ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`P26_${i + 1}`, 'Sección 12. Percepción de los Partidos Políticos'])),
    ...Object.fromEntries(Array.from({ length: 4 }, (_, i) => [`P27_${i + 1}`, 'Sección 13. Percepción de los Medios de Comunicación'])),
    'P28': 'Sección 14. Expertos y Reacción ante Líderes', 'P29': 'Sección 14. Expertos y Reacción ante Líderes',
    'P30': 'Sección 14. Reacción ante Líderes Políticos', 'P31': 'Sección 14. Percepción de los Políticos',
    ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`P32_${i + 1}`, 'Sección 15. Amenazas a la Democracia'])),
    ...Object.fromEntries(Array.from({ length: 9 }, (_, i) => [`P33_${i + 1}`, 'Sección 16. Responsabilidad de Cuidar la Democracia'])),
    ...Object.fromEntries(Array.from({ length: 9 }, (_, i) => [`P34_${i + 1}`, 'Sección 17. Confiabilidad de las Instituciones'])),
    'P35': 'Sección 18. Fuentes de Influencia en las Opiniones',
    ...Object.fromEntries(Array.from({ length: 7 }, (_, i) => [`P36_NUM_PE_${i + 1}`, 'Sección 19. Redes de Contacto con Actores de la Vida Pública'])),
    'P37': 'Sección 20. Espectro Ideológico',
};

// ─── Paleta y Ranking ─────────────────────────────────────────────────────────
const colorPalette = ['#2a2b5f', '#fdb913', '#00aeef', '#64748b', '#334155', '#7f1d1d', '#800020'];
const RANK_ATTR_BASE = ['#2a2b5f', '#fdb913', '#00aeef', '#64748b'];
const RANK_ATTR_LABELS = ['Afín a mi ideología', 'Que sea transparente', 'Que sea eficiente', 'Que respete los límites constitucionales'];
const P10_COLS = new Set(Array.from({ length: 11 }, (_, i) => `P10_${i + 1}`));
const P11_COLS = new Set(Array.from({ length: 12 }, (_, i) => `P11_${i + 1}`));

Chart.defaults.color = '#334155';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.register(ChartDataLabels);
Chart.defaults.plugins.legend.labels.color = '#334155';

// ─── Estado ───────────────────────────────────────────────────────────────────
let rawData = [];
let filteredData = [];
let filterControls = {};
let currentChart = null;
let subCharts = [];
let currentView = 'chart'; // 'chart' | 'table'

// Segmentación / Comparación de Grupos
let segmentVariable = null;
let segChipVals = [];       // valores ordenados de la variable actual
let segGroups = {};       // { value: null | 'a' | 'b' }
let segAgeSliderA = null, segAgeSliderB = null;

// Leer columna del URL
const urlParams = new URLSearchParams(window.location.search);
const COL = urlParams.get('col') || 'P14';

// ─── Inicialización ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Título inicial
    document.getElementById('section-badge').textContent = sectionContexts[COL] || '';
    document.getElementById('question-title').textContent = qDict[COL] || COL;
    document.title = `${qDict[COL] || COL} – Cuidar la Democracia`;

    // Toggle vista gráfica/tabla
    document.getElementById('view-chart').addEventListener('click', () => setView('chart'));
    document.getElementById('view-table').addEventListener('click', () => setView('table'));

    // Botones de acción
    document.getElementById('btn-reset').addEventListener('click', resetFilters);
    document.getElementById('btn-share').addEventListener('click', shareLink);
    document.getElementById('btn-download').addEventListener('click', downloadPNG);

    initSegmentation();

    // Cargar datos
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
            restoreFiltersFromURL();
            render();
        },
        error() { alert('No se pudo cargar el archivo de datos.'); }
    });
});

// ─── Filtros ──────────────────────────────────────────────────────────────────
function initFilters() {
    const sets = { sexo: new Set(), genero: new Set(), educacion: new Set(), actividad: new Set(), estrato: new Set(), depto: new Set(), muni: new Set() };
    let minAge = 100, maxAge = 18;
    rawData.forEach(row => {
        if (row['SEXO']) sets.sexo.add(row['SEXO'].trim());
        if (row['GÉNERO']) sets.genero.add(row['GÉNERO'].trim());
        if (row['EDUCACION']) sets.educacion.add(row['EDUCACION'].trim());
        if (row['ACTIVIDAD']) sets.actividad.add(row['ACTIVIDAD'].trim());
        if (row['ESTRATO']) sets.estrato.add(row['ESTRATO'].trim());
        if (row['DEPARTAMENTO']) sets.depto.add(row['DEPARTAMENTO'].trim());
        if (row['MUNICIPIO']) sets.muni.add(row['MUNICIPIO'].trim());
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
        if (!el) return;
        if (filterControls[id]) filterControls[id].destroy();

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
    cfg('filter-sexo', sets.sexo);
    cfg('filter-genero', sets.genero);
    cfg('filter-educacion', sets.educacion);
    cfg('filter-actividad', sets.actividad);
    cfg('filter-estrato', sets.estrato);
    cfg('filter-depto', sets.depto);
    cfg('filter-muni', sets.muni);
}

function applyFilters() {
    const [lo, hi] = document.getElementById('age-slider').noUiSlider.get().map(parseFloat);
    const gv = id => { const v = filterControls[id].getValue(true); return Array.isArray(v) ? v : []; };
    const sX = gv('filter-sexo'), sG = gv('filter-genero'), sE = gv('filter-educacion'),
        sA = gv('filter-actividad'), sS = gv('filter-estrato'), sD = gv('filter-depto'), sM = gv('filter-muni');

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
    render();
}

function resetFilters() {
    document.getElementById('age-slider').noUiSlider.reset();
    Object.values(filterControls).forEach(c => c.removeActiveItems());
    applyFilters();
}

// ─── Restaurar filtros guardados en URL ───────────────────────────────────────
function restoreFiltersFromURL() {
    const p = new URLSearchParams(window.location.search);

    // Edad
    const ageMin = p.get('ageMin'), ageMax = p.get('ageMax');
    if (ageMin && ageMax) {
        document.getElementById('age-slider').noUiSlider.set([parseFloat(ageMin), parseFloat(ageMax)]);
    }

    // Multi-selects
    const filterMap = {
        'filter-sexo': 'sexo', 'filter-genero': 'genero', 'filter-educacion': 'edu',
        'filter-actividad': 'act', 'filter-estrato': 'est', 'filter-depto': 'dpt', 'filter-muni': 'muni'
    };
    Object.entries(filterMap).forEach(([filterId, paramKey]) => {
        const vals = p.getAll(paramKey);
        if (vals.length && filterControls[filterId]) {
            vals.forEach(v => filterControls[filterId].setChoiceByValue(v));
        }
    });

    if (p.toString() !== `col=${COL}`) applyFilters();
}

// ─── Compartir enlace con filtros actuales ────────────────────────────────────
function shareLink() {
    const [lo, hi] = document.getElementById('age-slider').noUiSlider.get().map(parseFloat);
    const gv = id => { const v = filterControls[id].getValue(true); return Array.isArray(v) ? v : []; };
    const p = new URLSearchParams();
    p.set('col', COL);
    p.set('ageMin', lo); p.set('ageMax', hi);
    const filterMap = {
        'filter-sexo': 'sexo', 'filter-genero': 'genero', 'filter-educacion': 'edu',
        'filter-actividad': 'act', 'filter-estrato': 'est', 'filter-depto': 'dpt', 'filter-muni': 'muni'
    };
    Object.entries(filterMap).forEach(([filterId, paramKey]) => {
        gv(filterId).forEach(v => p.append(paramKey, v));
    });
    const url = `${window.location.origin}${window.location.pathname}?${p.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
        const toast = document.getElementById('copy-toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    });
}

// ─── Exportar PNG con Logos y Contexto ───────────────────────────────────────
async function downloadPNG() {
    const mainCanvas = document.getElementById('main-canvas');
    if (!mainCanvas) return;

    // 1. Cargar logos
    const loadImg = src => new Promise(res => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = () => res(null);
        img.src = src;
    });

    const [logoGov, logoDem, logoInv] = await Promise.all([
        loadImg('./assets/Govlab.png'),
        loadImg('./assets/cuidar la democracia.png'),
        loadImg('./assets/Invamer.png')
    ]);

    // 2. Obtener contexto de filtros activos
    const [lo, hi] = document.getElementById('age-slider').noUiSlider.get().map(Math.round);
    const filters = [];
    filters.push(`Edad: ${lo}-${hi} años`);

    const filterMap = {
        'filter-sexo': 'Sexo', 'filter-genero': 'Género', 'filter-educacion': 'Educación',
        'filter-actividad': 'Ocupación', 'filter-estrato': 'Estrato', 'filter-depto': 'Depto', 'filter-muni': 'Muni'
    };
    Object.entries(filterMap).forEach(([id, label]) => {
        const vals = filterControls[id].getValue(true);
        if (vals && vals.length) filters.push(`${label}: ${vals.join(', ')}`);
    });
    const filterTxt = filters.join(' | ');

    // 1.1 Contexto de grupos (si aplica)
    const hasA = Object.values(segGroups).some(v => v === 'a');
    const hasB = Object.values(segGroups).some(v => v === 'b');
    let groupInfoA = '', groupInfoB = '';
    if (segmentVariable && (hasA || hasB)) {
        const nameA = document.getElementById('seg-name-a').value || 'Grupo A';
        const nameB = document.getElementById('seg-name-b').value || 'Grupo B';

        if (segmentVariable === 'EDAD') {
            const rA = segAgeSliderA.get().map(Math.round);
            const rB = segAgeSliderB.get().map(Math.round);
            groupInfoA = `${nameA} (Edad): ${rA[0]}-${rA[1]} años`;
            groupInfoB = `${nameB} (Edad): ${rB[0]}-${rB[1]} años`;
        } else {
            const valsA = Object.entries(segGroups).filter(([, g]) => g === 'a').map(([v]) => v);
            const valsB = Object.entries(segGroups).filter(([, g]) => g === 'b').map(([v]) => v);
            if (valsA.length) groupInfoA = `${nameA} (${segmentVariable}): ${valsA.join(', ')}`;
            if (valsB.length) groupInfoB = `${nameB} (${segmentVariable}): ${valsB.join(', ')}`;
        }
    }
    const exportCanvas = document.createElement('canvas');
    const ctx = exportCanvas.getContext('2d');

    // Configurar anchos y márgenes
    const margin = 40;
    const maxWidth = mainCanvas.width + 100;
    exportCanvas.width = maxWidth;

    // Función auxiliar para envolver texto
    const wrapText = (text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';
        let posY = y;
        for (let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            let metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                ctx.fillText(line, x, posY);
                line = words[n] + ' ';
                posY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, posY);
        return posY + lineHeight; // Devolver siguiente posición Y
    };

    // Calcular altura necesaria para cabecera
    ctx.font = 'bold 20px Inter, sans-serif';
    const title = qDict[COL] || COL;
    // Estimación rápida de líneas (ctx aún no tiene tamaño final pero medimos sobre maxWidth)
    const titleLines = Math.ceil(ctx.measureText(title).width / (maxWidth - margin * 2)) || 1;

    ctx.font = '14px Inter, sans-serif';
    const filterLines = Math.ceil(ctx.measureText(filterTxt).width / (maxWidth - margin * 2)) || 1;

    let gALines = 0, gBLines = 0;
    if (groupInfoA) {
        ctx.font = 'bold 13px Inter, sans-serif';
        gALines = Math.ceil(ctx.measureText(groupInfoA).width / (maxWidth - margin * 2)) || 1;
    }
    if (groupInfoB) {
        ctx.font = 'bold 13px Inter, sans-serif';
        gBLines = Math.ceil(ctx.measureText(groupInfoB).width / (maxWidth - margin * 2)) || 1;
    }

    const headerHeight = 60 + (titleLines * 26) + (filterLines * 18) + (gALines * 18) + (gBLines * 18) + (groupInfoA || groupInfoB ? 20 : 0);
    const footerHeight = 120; // Más espacio para logos

    exportCanvas.height = mainCanvas.height + headerHeight + footerHeight;

    // Fondo Blanco / Gris claro branding
    ctx.fillStyle = '#eeeeee';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Dibujar Título
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 20px Inter, sans-serif';
    let currentY = 50;
    currentY = wrapText(title, margin, currentY, maxWidth - margin * 2, 26);

    // Dibujar Filtros
    ctx.fillStyle = '#64748b';
    ctx.font = '500 14px Inter, sans-serif';
    currentY += 5; // Espacio extra
    currentY = wrapText(filterTxt, margin, currentY, maxWidth - margin * 2, 20);

    // Dibujar Composición de Grupos
    if (groupInfoA || groupInfoB) {
        currentY += 10;
        if (groupInfoA) {
            ctx.fillStyle = '#2a2b5f';
            ctx.font = 'bold 13px Inter, sans-serif';
            currentY = wrapText(groupInfoA, margin, currentY, maxWidth - margin * 2, 18);
        }
        if (groupInfoB) {
            ctx.fillStyle = '#00aeef';
            ctx.font = 'bold 13px Inter, sans-serif';
            currentY = wrapText(groupInfoB, margin, currentY, maxWidth - margin * 2, 18);
        }
    }
    // Centrar la gráfica horizontalmente si es posible
    const graphX = (exportCanvas.width - mainCanvas.width) / 2;
    ctx.drawImage(mainCanvas, graphX, currentY + 20);

    // Dibujar Logos en Footer (LAYOUT SEGURO: Izquierda y Derecha)
    const footerY = exportCanvas.height - 65;
    const paddingX = 60;

    // 1. Govlab (Izquierda)
    if (logoGov) {
        const maxH = 45;
        const w = logoGov.width * (maxH / logoGov.height);
        ctx.drawImage(logoGov, margin + paddingX, footerY - 5, w, maxH);
    }

    // 2. Invamer (Derecha)
    if (logoInv) {
        const maxH = 45;
        const w = logoInv.width * (maxH / logoInv.height);
        ctx.drawImage(logoInv, exportCanvas.width - margin - paddingX - w, footerY - 5, w, maxH);
    }

    // Dibujar Marca de Agua / Fuente
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('Fuente: Estudio sobre democracia 2025 (INVAMER S.A.S)', exportCanvas.width - margin, exportCanvas.height - 15);

    // 3. Descargar
    const link = document.createElement('a');
    link.download = `${COL}_analisis.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
}

// ─── Toggle Vista ─────────────────────────────────────────────────────────────
function setView(v) {
    currentView = v;
    document.getElementById('chart-view').style.display = v === 'chart' ? 'block' : 'none';
    document.getElementById('table-view').style.display = v === 'table' ? 'block' : 'none';
    document.getElementById('view-chart').classList.toggle('active', v === 'chart');
    document.getElementById('view-table').classList.toggle('active', v === 'table');
}

// ─── Render Central ───────────────────────────────────────────────────────────
function render() {
    document.getElementById('stat-total').textContent = rawData.length;
    document.getElementById('stat-filtered').textContent = filteredData.length;

    const filteredCount = filteredData.length;
    const warningEl = document.getElementById('low-data-warning');
    const cardEl = document.getElementById('filtered-card');
    if (warningEl && cardEl) {
        if (filteredCount < 1000) {
            warningEl.style.display = 'block';
            const intensity = Math.min(1, Math.max(0, 1000 - filteredCount) / 1000); 
            cardEl.style.backgroundColor = `rgba(198, 40, 40, ${intensity * 0.15})`;
            cardEl.style.borderColor = `rgba(198, 40, 40, ${intensity * 0.5})`;
        } else {
            warningEl.style.display = 'none';
            cardEl.style.backgroundColor = '#ffffff'; 
            cardEl.style.borderColor = 'var(--border-color)';
        }
    }

    // Comprobar si la segmentación está activa y tiene al menos un grupo
    const isAge = segmentVariable === 'EDAD';
    const hasA = isAge || Object.values(segGroups).some(v => v === 'a');
    const hasB = isAge || Object.values(segGroups).some(v => v === 'b');

    const infoBar = document.getElementById('compare-info-bar');
    if (segmentVariable && (hasA || hasB)) {
        infoBar.style.display = 'flex';
        renderSegmented();
        return;
    } else {
        infoBar.style.display = 'none';
        infoBar.innerHTML = '';
    }

    // Sin comparación: flujo normal
    if (COL === 'P7' || COL.startsWith('P7.')) {
        renderP7Multi();
        return;
    }

    // Ranking P21/P22
    if (COL.endsWith('_RANKING')) {
        renderRankingChart();
        return;
    }

    // Histograma numérico
    if (COL.includes('P36') || COL === 'P37') {
        renderHistogram();
        return;
    }

    // Categórico
    renderCategorical();
}

// ─── P7 Multi ────────────────────────────────────────────────────────────────
function renderP7Multi() {
    document.getElementById('single-chart-zone').style.display = 'none';
    document.getElementById('multi-chart-zone').style.display = 'block';

    const frases = ['1', '2', '3'];
    const zone = document.getElementById('multi-grid');

    subCharts.forEach(c => c.destroy());
    subCharts = [];

    if (zone.children.length === 0) {
        frases.forEach(f => {
            const card = document.createElement('div');
            card.className = 'multi-chart-card';
            const fraseTxt = qDict[`P7.${f}`].split('dada la frase: ')[1] || '';
            card.innerHTML = `<h3>Frase ${f}: ${fraseTxt}</h3><div style="position:relative;height:260px"><canvas id="sub-canvas-${f}"></canvas></div>`;
            zone.appendChild(card);
        });
    }

    frases.forEach(f => {
        const sub = filteredData.filter(r => String(r.ROTA_FRASES).trim() === f);
        const counts = {};
        sub.forEach(r => {
            const v = (r['P7'] || '').trim() || 'No contesta / No sabe';
            counts[v] = (counts[v] || 0) + 1;
        });
        const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const labels = entries.map(e => e[0]);
        const data = entries.map(e => e[1]);
        const bgColors = labels.map((_, i) => colorPalette[i % colorPalette.length]);
        const ctx = document.getElementById(`sub-canvas-${f}`).getContext('2d');
        const ch = new Chart(ctx, {
            type: 'bar',
            data: { labels, datasets: [{ data, backgroundColor: bgColors, borderRadius: 4 }] },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    datalabels: { display: false }
                },
                scales: {
                    x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#334155' } },
                    y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#334155' } }
                }
            }
        });
        subCharts.push(ch);
    });
}

// ─── Histograma P36/P37 ───────────────────────────────────────────────────────
function renderHistogram() {
    document.getElementById('single-chart-zone').style.display = 'block';
    document.getElementById('multi-chart-zone').style.display = 'none';

    const bins = {};
    const CAP = 10;
    filteredData.forEach(r => {
        let v = parseFloat(r[COL]);
        if (isNaN(v)) return;
        v = Math.min(Math.floor(v), CAP);
        bins[String(v)] = (bins[String(v)] || 0) + 1;
    });
    const labels = Object.keys(bins).sort((a, b) => Number(a) - Number(b));
    const tot = filteredData.length || 1;
    const data = labels.map(l => (bins[l] / tot) * 100);
    const bgColors = COL === 'P37'
        ? labels.map(l => interpolateColor('#2a2b5f', '#00aeef', (Number(l) - 1) / 9))
        : labels.map((_, i) => colorPalette[i % colorPalette.length]);

    drawMain(labels, data, bgColors, false, labels.map(l => bins[l]));
    renderTable(labels, labels.map(l => bins[l]));
}

// ─── Categórico ───────────────────────────────────────────────────────────────
function renderCategorical() {
    document.getElementById('single-chart-zone').style.display = 'block';
    document.getElementById('multi-chart-zone').style.display = 'none';

    const needsRemap = P10_COLS.has(COL) || P11_COLS.has(COL);
    const counts = {};
    filteredData.forEach(r => {
        let raw = (r[COL] || '').trim() || 'No contesta / No sabe';
        if (needsRemap) {
            if (raw === 'Poca') raw = 'Poco';
            if (raw === 'Mucha') raw = 'Mucho';
        }
        counts[raw] = (counts[raw] || 0) + 1;
    });

    const preset = colOrderMap[COL];
    let labels, data;
    if (preset) {
        labels = []; data = [];
        preset.forEach(cat => { if (counts[cat] !== undefined) { labels.push(cat); data.push(counts[cat]); } });
        Object.keys(counts).forEach(k => { if (!preset.includes(k)) { labels.push(k); data.push(counts[k]); } });
    } else {
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        labels = sorted.map(e => e[0]);
        data = sorted.map(e => e[1]);
    }
    const tot = filteredData.length || 1;
    const bgColors = labels.map((_, i) => colorPalette[i % colorPalette.length]);
    const dataPct = labels.map(l => (counts[l] / tot) * 100);
    const dataN = labels.map(l => counts[l]);

    drawMain(labels, dataPct, bgColors, labels.length > 5, dataN);
    renderTable(labels, dataN);
}

// ─── Ranking P21/P22 ─────────────────────────────────────────────────────────
function renderRankingChart() {
    document.getElementById('single-chart-zone').style.display = 'block';
    document.getElementById('multi-chart-zone').style.display = 'none';
    document.getElementById('view-toggle').style.display = 'none';

    const base = COL === 'P21_RANKING' ? 'P21' : 'P22';
    const subCols = [1, 2, 3, 4].map(n => `${base}_${n}`);
    const total = filteredData.length || 1;
    const posMap = { '1 - Más importante': 0, '2 - Segunda opción': 1, '3 - Tercera opción': 2, '4 - Menos importante': 3 };
    const matrix = subCols.map(() => [0, 0, 0, 0]);

    filteredData.forEach(r => {
        subCols.forEach((sc, oi) => {
            const raw = (r[sc] || '').trim();
            const pos = posMap[raw] !== undefined ? posMap[raw] : (parseInt(raw) - 1);
            if (pos >= 0 && pos <= 3) matrix[oi][pos]++;
        });
    });

    const attrOrder = [0, 1, 2, 3].sort((a, b) => {
        for (let p = 0; p < 4; p++) { if (matrix[b][p] !== matrix[a][p]) return matrix[b][p] - matrix[a][p]; }
        return 0;
    });
    const sortedLabels = attrOrder.map(i => RANK_ATTR_LABELS[i]);
    const sortedMatrix = attrOrder.map(i => matrix[i]);
    const sortedBases = attrOrder.map(i => RANK_ATTR_BASE[i]);
    const posLabels = ['1 (más importante)', '2', '3', '4 (menos importante)'];
    const opacities = [1.0, 0.70, 0.45, 0.22];

    const datasets = posLabels.map((posLabel, pi) => ({
        label: posLabel,
        data: sortedMatrix.map(row => (row[pi] / total) * 100),
        backgroundColor: sortedBases.map(hex => hexWithAlpha(hex, opacities[pi])),
        borderRadius: 3,
        borderSkipped: false
    }));

    if (currentChart) { currentChart.destroy(); currentChart = null; }
    const ctx = document.getElementById('main-canvas').getContext('2d');
    currentChart = new Chart(ctx, {
        type: 'bar',
        data: { labels: sortedLabels, datasets },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { color: '#334155', usePointStyle: true } },
                tooltip: {
                    callbacks: {
                        label: c => {
                            const pct = c.raw.toFixed(1);
                            const n = sortedMatrix[c.dataIndex][c.datasetIndex];
                            return [`${c.dataset.label}`, `Porcentaje: ${pct}%`, `Frecuencia: ${n}`];
                        }
                    }
                },
                datalabels: {
                    display: ctx2 => ctx2.dataset.data[ctx2.dataIndex] > 5,
                    color: '#fff',
                    font: { weight: 'bold', size: 10 },
                    formatter: (_, ctx2) => `N° ${ctx2.datasetIndex + 1}`
                }
            },
            scales: {
                x: { stacked: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#334155', font: { weight: '600' } } },
                y: { stacked: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#64748b' }, title: { display: true, text: 'Porcentaje (%)' } }
            }
        }
    });
}

// ─── Dibujar gráfica principal ────────────────────────────────────────────────
function drawMain(labels, data, bgColors, horizontal, rawFreqs) {
    if (currentChart) { currentChart.destroy(); currentChart = null; }
    const ctx = document.getElementById('main-canvas').getContext('2d');
    const tot = filteredData.length || 1;
    const showLabels = labels.length <= 11;

    // Forzar vertical para P37
    const finalHorizontal = COL === 'P37' ? false : horizontal;

    currentChart = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets: [{ data, backgroundColor: bgColors, borderRadius: 5 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: finalHorizontal ? 'y' : 'x',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: c => {
                            const pct = c.raw.toFixed(1);
                            const n = rawFreqs ? rawFreqs[c.dataIndex] : '?';
                            return [`Porcentaje: ${pct}%`, `Frecuencia: ${n}`];
                        }
                    }
                },
                datalabels: {
                    display: showLabels,
                    anchor: 'end', align: 'end', offset: 4,
                    color: '#334155', font: { weight: '600', size: 10 },
                    formatter: val => `${val.toFixed(1)}%`
                }
            },
            scales: {
                x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#334155', font: { size: 11 } } },
                y: {
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { color: '#64748b' },
                    title: { display: true, text: 'Porcentaje (%)' },
                    min: 0,
                    grace: '10%'
                }
            }
        }
    });
}

// ─── Tabla de datos ───────────────────────────────────────────────────────────
function renderTable(labels, data) {
    const tot = filteredData.length || 1;
    const totAbs = rawData.length || 1;
    const maxVal = Math.max(...data, 1);
    const container = document.getElementById('table-view');

    let html = `<table class="data-table">
        <thead><tr>
            <th>Categoría</th>
            <th>Frecuencia (N)</th>
            <th>% del Total País</th>
            <th>% de Datos Filtrados</th>
            <th>Distribución</th>
        </tr></thead><tbody>`;

    labels.forEach((lbl, i) => {
        const n = data[i];
        const pAbs = ((n / totAbs) * 100).toFixed(1);
        const pFil = ((n / tot) * 100).toFixed(1);
        const barW = ((n / maxVal) * 100).toFixed(0);
        html += `<tr>
            <td>${lbl}</td>
            <td><strong>${n}</strong></td>
            <td>${pAbs}%</td>
            <td>${pFil}%</td>
            <td>
                <div class="td-bar">
                    <div class="mini-bar" style="width:${barW}%; min-width:4px; background:${colorPalette[i % colorPalette.length]}"></div>
                    <span style="font-size:0.78rem;color:#64748b">${pFil}%</span>
                </div>
            </td>
        </tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

// ─── Utilidades ───────────────────────────────────────────────────────────────
function hexWithAlpha(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

function interpolateColor(c1, c2, factor) {
    const hex = x => Math.round(x).toString(16).padStart(2, '0');
    const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
    const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
    return `#${hex(r1 + (r2 - r1) * factor)}${hex(g1 + (g2 - g1) * factor)}${hex(b1 + (b2 - b1) * factor)}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MÓDULO: Comparación de Grupos
// ═══════════════════════════════════════════════════════════════════════════════

function initSegmentation() {
    const sel = document.getElementById('seg-variable');
    sel.addEventListener('change', () => {
        segmentVariable = sel.value || null;
        segChipVals = [];
        segGroups = {};
        const ui = document.getElementById('seg-groups-ui');
        ui.style.display = segmentVariable ? 'block' : 'none';

        // Toggle Age Sliders
        const isAge = segmentVariable === 'EDAD';
        document.querySelectorAll('.seg-age-container').forEach(c => c.style.display = isAge ? 'block' : 'none');
        document.querySelectorAll('.seg-chips-area').forEach(c => c.style.display = isAge ? 'none' : 'flex');
        document.querySelector('.seg-unassigned-area').style.display = isAge ? 'none' : 'block';
        document.querySelector('.seg-hint').style.display = isAge ? 'none' : 'block';

        if (segmentVariable) {
            if (isAge) {
                initAgeSliders(); // Llama render() al terminar
                return;           // Evitar render() doble
            } else {
                buildSegUI();
            }
        }
        render();
    });

    document.getElementById('seg-name-a').addEventListener('input', render);
    document.getElementById('seg-name-b').addEventListener('input', render);

    document.getElementById('btn-clear-seg').addEventListener('click', () => {
        Object.keys(segGroups).forEach(k => segGroups[k] = null);
        if (segAgeSliderA) segAgeSliderA.set([18, 99]);
        if (segAgeSliderB) segAgeSliderB.set([18, 99]);
        renderChips();
        render();
    });
}

function initAgeSliders() {
    // Calcular rango real de edades del dataset
    let minAge = 99, maxAge = 18;
    rawData.forEach(r => { if (r.EDAD > 0) { minAge = Math.min(minAge, r.EDAD); maxAge = Math.max(maxAge, r.EDAD); } });
    minAge = Math.floor(minAge); maxAge = Math.ceil(maxAge);
    const midAge = Math.round((minAge + maxAge) / 2);

    if (segAgeSliderA) {
        // Ya creados, solo re-renderizar
        render();
        return;
    }

    const cfgA = { start: [minAge, midAge], connect: true, step: 1, range: { min: minAge, max: maxAge } };
    const cfgB = { start: [midAge + 1, maxAge], connect: true, step: 1, range: { min: minAge, max: maxAge } };
    segAgeSliderA = noUiSlider.create(document.getElementById('seg-age-slider-a'), cfgA);
    segAgeSliderB = noUiSlider.create(document.getElementById('seg-age-slider-b'), cfgB);

    const upTxt = (s, id) => {
        const v = s.get().map(Math.round);
        document.getElementById(id).textContent = `${v[0]}-${v[1]}`;
    };

    segAgeSliderA.on('update', () => { upTxt(segAgeSliderA, 'age-range-a-txt'); });
    segAgeSliderB.on('update', () => { upTxt(segAgeSliderB, 'age-range-b-txt'); });
    segAgeSliderA.on('change', render);
    segAgeSliderB.on('change', render);

    // Primer render ahora que los sliders están listos
    render();
}

function buildSegUI() {
    if (!segmentVariable || rawData.length === 0) return;

    // Recopilar valores únicos
    const vals = new Set();
    rawData.forEach(r => {
        let val = r[segmentVariable];
        if (val === undefined || val === null) return;
        const v = String(val).trim();
        if (v && v !== '0') vals.add(v);
    });

    // Ordenar: numérico primero, luego alfabético
    segChipVals = Array.from(vals).sort((a, b) => {
        const na = parseFloat(a), nb = parseFloat(b);
        if (!isNaN(na) && !isNaN(nb)) return na - nb;
        return a.localeCompare(b, 'es');
    });

    // Inicializar segGroups sin asignar
    segChipVals.forEach(v => {
        if (segGroups[v] === undefined) segGroups[v] = null;
    });

    renderChips();
}

function renderChips() {
    const chipsA = document.getElementById('chips-a');
    const chipsB = document.getElementById('chips-b');
    const chipsU = document.getElementById('chips-unassigned');
    chipsA.innerHTML = ''; chipsB.innerHTML = ''; chipsU.innerHTML = '';

    let cntA = 0, cntB = 0;

    segChipVals.forEach(v => {
        const chip = document.createElement('span');
        chip.className = 'seg-chip';
        chip.textContent = v;

        const assignment = segGroups[v];
        if (assignment === 'a') { chip.classList.add('group-a'); chipsA.appendChild(chip); cntA++; }
        else if (assignment === 'b') { chip.classList.add('group-b'); chipsB.appendChild(chip); cntB++; }
        else { chip.classList.add('unassigned'); chipsU.appendChild(chip); }

        chip.addEventListener('click', () => {
            // Ciclo: null → 'a' → 'b' → null
            const cur = segGroups[v];
            segGroups[v] = cur === null ? 'a' : cur === 'a' ? 'b' : null;
            renderChips();
            render();
        });
    });

    document.getElementById('cnt-a').textContent = cntA;
    document.getElementById('cnt-b').textContent = cntB;
}

// ─── Renderizado de Gráfica Comparativa ───────────────────────────────────────
function renderSegmented() {
    document.getElementById('single-chart-zone').style.display = 'block';
    document.getElementById('multi-chart-zone').style.display = 'none';

    const nameA = document.getElementById('seg-name-a').value || 'Grupo A';
    const nameB = document.getElementById('seg-name-b').value || 'Grupo B';

    const valsA = Object.entries(segGroups).filter(([, g]) => g === 'a').map(([v]) => v);
    const valsB = Object.entries(segGroups).filter(([, g]) => g === 'b').map(([v]) => v);

    const isAge = segmentVariable === 'EDAD';
    let dataA, dataB, descA, descB;

    if (isAge) {
        if (!segAgeSliderA || !segAgeSliderB) return; // Sliders aún no montados
        const rA = segAgeSliderA.get().map(Number);
        const rB = segAgeSliderB.get().map(Number);
        dataA = filteredData.filter(r => r.EDAD >= rA[0] && r.EDAD <= rA[1]);
        dataB = filteredData.filter(r => r.EDAD >= rB[0] && r.EDAD <= rB[1]);
        descA = `${Math.round(rA[0])}-${Math.round(rA[1])} años`;
        descB = `${Math.round(rB[0])}-${Math.round(rB[1])} años`;
    } else {
        // Subconjuntos de los datos ya filtrados por los filtros globales
        dataA = filteredData.filter(r => valsA.includes((r[segmentVariable] || '').trim()));
        dataB = filteredData.filter(r => valsB.includes((r[segmentVariable] || '').trim()));
        descA = valsA.join(', ');
        descB = valsB.join(', ');
    }


    const needsRemap = P10_COLS.has(COL) || P11_COLS.has(COL);

    const countGroup = (subset) => {
        const counts = {};
        subset.forEach(r => {
            let raw = (r[COL] || '').trim() || 'No contesta / No sabe';
            if (needsRemap) {
                if (raw === 'Poca') raw = 'Poco';
                if (raw === 'Mucha') raw = 'Mucho';
            }
            counts[raw] = (counts[raw] || 0) + 1;
        });
        return counts;
    };

    const countsA = dataA.length ? countGroup(dataA) : {};
    const countsB = dataB.length ? countGroup(dataB) : {};

    // Actualizar barra de info
    let infoHtml = '';
    if (dataA.length || isAge) infoHtml += `<div class="compare-info-item"><span class="compare-info-label" style="color:#2a2b5f">${nameA}:</span><span class="compare-info-vals">${descA}</span></div>`;
    if (dataB.length || isAge) infoHtml += `<div class="compare-info-item"><span class="compare-info-label" style="color:#00aeef">${nameB}:</span><span class="compare-info-vals">${descB}</span></div>`;
    document.getElementById('compare-info-bar').innerHTML = infoHtml;

    // Actualizar contadores del sidebar para contexto de usuario
    if (isAge) {
        document.getElementById('cnt-a').textContent = dataA.length;
        document.getElementById('cnt-b').textContent = dataB.length;
    }

    // Construir etiquetas respetando el orden ordinal
    const preset = colOrderMap[COL];
    let labels;
    if (preset) {
        const allKeys = new Set([...Object.keys(countsA), ...Object.keys(countsB)]);
        labels = preset.filter(k => allKeys.has(k));
        allKeys.forEach(k => { if (!labels.includes(k)) labels.push(k); });
    } else {
        const allKeys = new Set([...Object.keys(countsA), ...Object.keys(countsB)]);
        labels = Array.from(allKeys);

        // Orden numérico para P36/P37
        if (COL.includes('P36') || COL === 'P37') {
            labels.sort((a, b) => Number(a) - Number(b));
        } else {
            // Ordenar por frecuencia total descendente
            labels.sort((a, b) =>
                ((countsB[b] || 0) + (countsA[b] || 0)) - ((countsB[a] || 0) + (countsA[a] || 0))
            );
        }
    }

    const totA = dataA.length || 1;
    const totB = dataB.length || 1;

    // Forzar vertical para P37
    const finalHorizontal = COL === 'P37' ? false : (labels.length > 5);
    const showLabels = labels.length <= 11;

    const datasets = [];
    if (dataA.length) {
        datasets.push({
            label: `${nameA} (n=${dataA.length})`,
            data: labels.map(l => ((countsA[l] || 0) / totA) * 100),
            backgroundColor: hexWithAlpha('#2a2b5f', 0.82),
            borderColor: '#2a2b5f',
            borderWidth: 1,
            borderRadius: 4
        });
    }
    if (dataB.length) {
        datasets.push({
            label: `${nameB} (n=${dataB.length})`,
            data: labels.map(l => ((countsB[l] || 0) / totB) * 100),
            backgroundColor: hexWithAlpha('#00aeef', 0.82),
            borderColor: '#00aeef',
            borderWidth: 1,
            borderRadius: 4
        });
    }

    if (currentChart) { currentChart.destroy(); currentChart = null; }
    const ctx = document.getElementById('main-canvas').getContext('2d');

    currentChart = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets },
        options: {
            responsive: true, maintainAspectRatio: false,
            indexAxis: finalHorizontal ? 'y' : 'x',
            plugins: {
                legend: { position: 'top', labels: { color: '#334155', usePointStyle: true, padding: 16 } },
                tooltip: {
                    callbacks: {
                        label: c => {
                            const pct = c.raw.toFixed(1);
                            const n = c.datasetIndex === 0 ? (countsA[c.label] || 0) : (countsB[c.label] || 0);
                            return [`${c.dataset.label}`, `Porcentaje: ${pct}%`, `Frecuencia: ${n}`];
                        }
                    }
                },
                datalabels: {
                    display: showLabels,
                    anchor: 'end', align: 'end', offset: 2,
                    color: '#334155', font: { weight: '600', size: 9 },
                    formatter: val => val.toFixed(1) + '%'
                }
            },
            scales: {
                x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#334155' } },
                y: {
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { color: '#64748b' },
                    title: { display: true, text: 'Porcentaje (%)' },
                    min: 0,
                    grace: '10%'
                }
            }
        }
    });

    // Tabla comparativa
    renderComparisonTable(labels, countsA, countsB, totA, totB, nameA, nameB);
}

// ─── Tabla de Comparación entre Grupos ───────────────────────────────────────
function renderComparisonTable(labels, countsA, countsB, totA, totB, nameA, nameB) {
    const container = document.getElementById('table-view');

    let html = `<table class="data-table">
        <thead><tr>
            <th>Categoría</th>
            <th>${nameA} (N)</th>
            <th>${nameA} (%)</th>
            <th>${nameB} (N)</th>
            <th>${nameB} (%)</th>
            <th>Diferencia (pp)</th>
        </tr></thead><tbody>`;

    labels.forEach(lbl => {
        const nA = countsA[lbl] || 0;
        const nB = countsB[lbl] || 0;
        const pA = totA > 1 ? ((nA / totA) * 100).toFixed(1) : '0.0';
        const pB = totB > 1 ? ((nB / totB) * 100).toFixed(1) : '0.0';
        const diff = (parseFloat(pA) - parseFloat(pB)).toFixed(1);
        const diffNum = parseFloat(diff);
        const diffCol = diffNum > 0 ? '#002366' : diffNum < 0 ? '#800020' : '#64748b';
        const diffStr = diffNum > 0 ? `+${diff}` : diff;

        html += `<tr>
            <td><strong>${lbl}</strong></td>
            <td>${nA}</td>
            <td>${pA}%</td>
            <td>${nB}</td>
            <td>${pB}%</td>
            <td style="color:${diffCol};font-weight:700">${diffStr} pp</td>
        </tr>`;
    });

    html += `<tr style="border-top:2px solid var(--border-color);font-weight:600">
        <td>Total</td>
        <td>${totA}</td><td>100%</td>
        <td>${totB}</td><td>100%</td>
        <td></td>
    </tr>`;

    html += `</tbody></table>`;
    container.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MÓDULO: Asistente IA (ChatGPT / OpenAI)
// ═══════════════════════════════════════════════════════════════════════════════

const AI_KEY_STORAGE = 'cuidar_democracia_openai_key';
const AI_MODEL = 'gpt-4o';
let aiChatHistory = []; // {role: 'user'|'assistant', content: string}[]

// Documentos cargados desde la carpeta knowledge/
let aiKnowledgeDocs = []; // [{label: string, content: string}]

// ────────────────────────────────────────────
//  loadKnowledgeDocs  –  Carga el manifest y
//  hace fetch de cada archivo .txt habilitado
// ────────────────────────────────────────────
async function loadKnowledgeDocs() {
    try {
        const manifestRes = await fetch('./knowledge/manifest.json');
        if (!manifestRes.ok) return; // Carpeta no encontrada o vacía
        const manifest = await manifestRes.json();

        const enabled = (manifest.files || []).filter(f => f.enabled && f.name.endsWith('.txt'));

        const fetched = await Promise.allSettled(
            enabled.map(async (f) => {
                const res = await fetch(`./knowledge/${f.name}`);
                if (!res.ok) throw new Error(`No se pudo cargar ${f.name}`);
                const text = await res.text();
                return { label: f.label || f.name, content: text.trim() };
            })
        );

        aiKnowledgeDocs = fetched
            .filter(r => r.status === 'fulfilled')
            .map(r => r.value);

        console.log(`[IA] ${aiKnowledgeDocs.length} documento(s) de conocimiento cargados.`);
    } catch (err) {
        console.warn('[IA] No se pudieron cargar los documentos de conocimiento:', err.message);
    }
}

// ────────────────────────────────────────────
//  buildChartContext  – construye el contexto
//  que se enviará al modelo como system prompt
// ────────────────────────────────────────────
function buildChartContext() {
    const question = qDict[COL] || COL;
    const totalRaw = rawData.length;
    const totalFil = filteredData.length;

    // ── Base de conocimiento institucional (siempre presente en el sistema) ──
    const STUDY_KNOWLEDGE = `
ACERCA DE ESTE DASHBOARD Y EL ESTUDIO:
El dashboard "Estudio sobre Democracia 2025" es una herramienta interactiva de análisis de opinión pública desarrollada para explorar los resultados de la encuesta nacional "Cuidar la Democracia" edición 2025. Fue realizado por el Laboratorio de Gobierno de la Universidad de la Sabana para facilitar el análisis de los resultados del estudio Cuidar la Democracia 2025

¿QUÉ ES CUIDAR LA DEMOCRACIA?
Un estudio nacional liderado por once universidades y otras entidades comprometidas con la democracia en Colombia, revela que la desinformación es hoy la principal amenaza para la democracia en Colombia. Aunque persiste la insatisfacción por aspectos como la corrupción y la desigualdad, la ciudadanía mantiene la fe en el voto y ve en la educación el principal camino para fortalecer el sistema democrático. Ad portas de las elecciones de 2026, el estudio “Cuidar la democracia”, liderado por las universidades más prestigiosas del país, algunas empresas del sector privado e Invamer, refleja la temperatura electoral.  La encuesta ofrece un mapa claro de prioridades ciudadanas: más allá de identidades partidistas, hay una demanda transversal por reglas de juego limpias, información verificable y resultados concretos en oportunidades, seguridad y equidad. En ese marco, la iniciativa plantea que el reto no es solo “participar”, sino elevar la calidad de la conversación pública y cerrar la distancia entre lo que la gente espera de la democracia y lo que siente que recibe.   Para llegar a esto, el estudio recurrió a 1.700 personas en 81 municipios, con cubrimiento urbano y rural, con un margen de error de ±2,76% y un nivel de confianza del 95% y pudo establecer, que pese a la falta de confianza de los colombianos, entre las soluciones a los temas más preocupantes, la educación y el rol de las universidades abre la posibilidad para la construcción de un mejor país.  

¿QUÉ UNIVERSIDADES Y ENTIDADES PARTICIPARON? 

La universidad Eafit, La universidad de los Andes, La Pontificia Universidad Javeriana, La universidad Icesi, La universidad de la Sabana, La universidad Autónoma de Bucaramanga, La universidad del Norte, La universidad Cesa, La universidad del Rosario, La universidad Tecnológica de Bolívar, La universidad Uniminuto, Sura, Comfama y Vélez Reyes

¿QUÉ ES GOVLAB (Laboratorio de Gobierno de la Universidad de La Sabana)?
GovLab es el Laboratorio de Gobierno de la Universidad de La Sabana, una unidad académica dedicada a la innovación en gestión pública, gobernanza y política pública. Contribuye al estudio generando análisis de los datos, desarrollando la plataforma digital y apoyando la difusión de los resultados hacia tomadores de decisiones y ciudadanía.

¿QUÉ ES INVAMER S.A.S.?
INVAMER S.A.S. es una de las firmas de investigación de mercados y opinión pública más reconocidas de Colombia. Es responsable del diseño metodológico, la recolección de datos y el procesamiento estadístico de la encuesta. Garantiza la representatividad y rigor científico de los resultados.

METODOLOGÍA:
- La encuesta fue realizada a nivel nacional con una muestra representativa de la población colombiana.
- Cubre múltiples dimensiones de la democracia: satisfacción general, confianza institucional, participación política, percepciones sobre el voto, libertades, igualdad, y reformas deseadas.
- Los datos permiten cruzar variables sociodemográficas: sexo, género, edad, nivel educativo, estrato, ocupación, departamento y municipio.

PARA QUÉ SIRVE ESTA PLATAFORMA:
- Explorar los resultados de la encuesta de forma visual e interactiva.
- Filtrar los datos por grupos demográficos y territorios.
- Comparar dos grupos entre sí para identificar diferencias significativas.
- Descargar gráficas para presentaciones e informes.
- Consultar a un asistente IA que interpreta los datos en su contexto.`;

    // ── Documentos adicionales cargados desde la carpeta knowledge/ ──
    let extraKnowledge = '';
    if (aiKnowledgeDocs.length > 0) {
        extraKnowledge = '\n\nDOCUMENTOS DE REFERENCIA ADICIONALES:' +
            aiKnowledgeDocs.map(doc =>
                `\n\n--- ${doc.label.toUpperCase()} ---\n${doc.content}`
            ).join('');
    }

    // ── Filtros activos ──
    const activeFilters = [];
    Object.entries(filterControls).forEach(([id, control]) => {
        if (!control) return;
        const vals = control.getValue(true);
        if (!vals || vals.length === 0) return;
        const labelMap = {
            'filter-sexo': 'Sexo', 'filter-genero': 'Género',
            'filter-educacion': 'Nivel Educativo', 'filter-actividad': 'Ocupación',
            'filter-estrato': 'Estrato', 'filter-depto': 'Departamento',
            'filter-muni': 'Municipio'
        };
        activeFilters.push(`${labelMap[id] || id}: ${vals.join(', ')}`);
    });

    const filterDesc = activeFilters.length > 0
        ? `- Filtros activos:\n${activeFilters.map(f => `  • ${f}`).join('\n')}`
        : '- Sin filtros aplicados (muestra total del país)';

    // ── Helper: calcular distribución sobre un subconjunto ──
    const calcDist = (subset) => {
        if (!subset || subset.length === 0) return '  (Sin datos)';
        const counts = {};
        const tot = subset.length;
        subset.forEach(r => {
            const val = (r[COL] || '').trim() || 'No contesta / No sabe';
            counts[val] = (counts[val] || 0) + 1;
        });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([cat, n]) => `  • ${cat}: ${n} (${((n / tot) * 100).toFixed(1)}%)`)
            .join('\n');
    };

    // ── Detectar modo de comparación de grupos ──
    let comparisonSection = '';
    const isAge = segmentVariable === 'EDAD';
    const hasA = isAge || Object.values(segGroups).some(v => v === 'a');
    const hasB = isAge || Object.values(segGroups).some(v => v === 'b');

    if (segmentVariable && (hasA || hasB)) {
        let dataA = [], dataB = [];
        let descA = '', descB = '';

        if (isAge && segAgeSliderA && segAgeSliderB) {
            const rA = segAgeSliderA.get().map(Number);
            const rB = segAgeSliderB.get().map(Number);
            dataA = filteredData.filter(r => r.EDAD >= rA[0] && r.EDAD <= rA[1]);
            dataB = filteredData.filter(r => r.EDAD >= rB[0] && r.EDAD <= rB[1]);
            descA = `Edad ${Math.round(rA[0])}–${Math.round(rA[1])} años`;
            descB = `Edad ${Math.round(rB[0])}–${Math.round(rB[1])} años`;
        } else {
            const valsA = Object.entries(segGroups).filter(([, v]) => v === 'a').map(([k]) => k);
            const valsB = Object.entries(segGroups).filter(([, v]) => v === 'b').map(([k]) => k);
            dataA = filteredData.filter(r => valsA.includes((r[segmentVariable] || '').trim()));
            dataB = filteredData.filter(r => valsB.includes((r[segmentVariable] || '').trim()));
            const segLabel = segmentVariable.charAt(0) + segmentVariable.slice(1).toLowerCase();
            descA = valsA.length ? `${segLabel}: ${valsA.join(', ')}` : 'Sin valores asignados';
            descB = valsB.length ? `${segLabel}: ${valsB.join(', ')}` : 'Sin valores asignados';
        }

        comparisonSection = `
MODO DE COMPARACIÓN ENTRE GRUPOS ACTIVADO:
Variable de segmentación: ${segmentVariable}

GRUPO A – ${descA} (n=${dataA.length}):
${calcDist(dataA)}

GRUPO B – ${descB} (n=${dataB.length}):
${calcDist(dataB)}`;
    }

    // ── Distribución global (datos filtrados) ──
    const globalDist = (!segmentVariable || (!hasA && !hasB))
        ? `\nDISTRIBUCIÓN DE RESPUESTAS (datos filtrados, n=${totalFil}):\n${calcDist(filteredData)}`
        : '';

    return `Eres un asistente experto en análisis de opinión pública, democracia colombiana y ciencias sociales.
${STUDY_KNOWLEDGE}${extraKnowledge}

═══════════════════════════════════════
CONTEXTO ACTUAL DE LA GRÁFICA
═══════════════════════════════════════
PREGUNTA ANALIZADA:
${question}

MUESTRA:
- Total del dataset: ${totalRaw} encuestas nacionales
- Encuestas visibles: ${totalFil}
${filterDesc}
${globalDist}${comparisonSection}

═══════════════════════════════════════
INSTRUCCIONES DE COMPORTAMIENTO:
- Responde siempre en español, de forma clara y rigurosa.
- Apóyate exclusivamente en los datos presentados arriba; NO inventes cifras.
- Cuando respondas sobre la institución, el estudio o el dashboard, usa la información de la sección "ACERCA DE".
- Usa Markdown: **negritas** para cifras clave, listas con guion, párrafos separados.
- Sé conciso: máximo 3–4 párrafos por respuesta a menos que se pida más detalle.`;
}

// ────────────────────────────────────────────
//  Renderizar Markdown básico
// ────────────────────────────────────────────
function renderMarkdown(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^### (.+)$/gm, '<h4 style="margin:0.5em 0 0.25em;font-size:0.9rem">$1</h4>')
        .replace(/^## (.+)$/gm, '<h3 style="margin:0.5em 0 0.25em;font-size:0.95rem">$1</h3>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gs, m => `<ul>${m}</ul>`)
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^(.+)$/, '<p>$1</p>');
}

// ────────────────────────────────────────────
//  Agregar mensaje al chat
// ────────────────────────────────────────────
function aiAppendMessage(role, content, isTyping = false) {
    const container = document.getElementById('ai-messages');

    const wrap = document.createElement('div');
    wrap.className = `ai-message ai-message--${role}${isTyping ? ' ai-typing-indicator' : ''}`;
    if (isTyping) wrap.id = 'ai-typing';

    const avatar = document.createElement('div');
    avatar.className = 'ai-message-avatar';
    avatar.textContent = role === 'user' ? 'Tú' : 'IA';

    const bubble = document.createElement('div');
    bubble.className = 'ai-message-bubble';

    if (isTyping) {
        bubble.innerHTML = '<div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div>';
    } else {
        bubble.innerHTML = role === 'assistant' ? renderMarkdown(content) : content;
    }

    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    container.appendChild(wrap);
    container.scrollTop = container.scrollHeight;

    return wrap;
}

// ────────────────────────────────────────────
//  Enviar mensaje a la API de OpenAI
// ────────────────────────────────────────────
async function aiSendMessage(userText) {
    const apiKey = localStorage.getItem(AI_KEY_STORAGE);
    if (!apiKey) return;

    const sendBtn = document.getElementById('ai-send-btn');
    const input = document.getElementById('ai-user-input');
    const suggestions = document.getElementById('ai-suggestions');

    // UI: deshabilitar input
    sendBtn.disabled = true;
    input.disabled = true;
    suggestions.style.display = 'none';

    // Mostrar mensaje del usuario
    aiAppendMessage('user', userText);

    // Agregar al historial
    aiChatHistory.push({ role: 'user', content: userText });

    // Mostrar typing indicator
    aiAppendMessage('assistant', '', true);

    try {
        const systemPrompt = buildChartContext();

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: AI_MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...aiChatHistory
                ],
                temperature: 0.5,
                max_tokens: 800
            })
        });

        // Remover typing indicator
        const typingEl = document.getElementById('ai-typing');
        if (typingEl) typingEl.remove();

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            const errMsg = errData.error?.message || `Error ${response.status}`;
            aiAppendMessage('assistant', `⚠️ **Error de la API:** ${errMsg}`);
            return;
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'No se recibió respuesta.';

        aiChatHistory.push({ role: 'assistant', content: reply });
        aiAppendMessage('assistant', reply);

    } catch (err) {
        const typingEl = document.getElementById('ai-typing');
        if (typingEl) typingEl.remove();
        aiAppendMessage('assistant', `⚠️ **Error de red:** ${err.message}. Verifica tu conexión e inténtalo de nuevo.`);
    } finally {
        sendBtn.disabled = false;
        input.disabled = false;
        input.value = '';
        input.focus();
    }
}

// ────────────────────────────────────────────
//  Inicializar panel del Asistente IA
// ────────────────────────────────────────────
function initAIAssistant() {
    const keySetup = document.getElementById('ai-key-setup');
    const chatArea = document.getElementById('ai-chat-area');
    const keyInput = document.getElementById('ai-api-key-input');
    const saveKeyBtn = document.getElementById('ai-save-key-btn');
    const sendBtn = document.getElementById('ai-send-btn');
    const userInput = document.getElementById('ai-user-input');
    const clearBtn = document.getElementById('ai-clear-btn');
    const disconnBtn = document.getElementById('ai-disconnect-btn');
    const toggleBtn = document.getElementById('ai-toggle-btn');
    const panelBody = document.getElementById('ai-panel-body');
    const panelHeader = document.querySelector('.ai-panel-header');

    // Comprobar si ya hay key guardada
    const savedKey = localStorage.getItem(AI_KEY_STORAGE);
    if (savedKey) {
        keySetup.style.display = 'none';
        chatArea.style.display = 'flex';
    }

    // Guardar API Key
    saveKeyBtn.addEventListener('click', () => {
        const val = keyInput.value.trim();
        if (!val.startsWith('sk-')) {
            keyInput.style.borderColor = '#800020';
            keyInput.placeholder = 'Clave inválida. Debe empezar con sk-...';
            return;
        }
        localStorage.setItem(AI_KEY_STORAGE, val);
        keySetup.style.display = 'none';
        chatArea.style.display = 'flex';
    });

    // Enviar mensaje con botón
    sendBtn.addEventListener('click', () => {
        const txt = userInput.value.trim();
        if (txt) aiSendMessage(txt);
    });

    // Enviar con Enter (Shift+Enter = nueva línea)
    userInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const txt = userInput.value.trim();
            if (txt) aiSendMessage(txt);
        }
    });

    // Chips de sugerencias
    document.querySelectorAll('.ai-suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt');
            if (prompt) aiSendMessage(prompt);
        });
    });

    // Limpiar conversación
    clearBtn.addEventListener('click', () => {
        aiChatHistory = [];
        const messages = document.getElementById('ai-messages');
        messages.innerHTML = `
            <div class="ai-message ai-message--assistant ai-message--intro">
                <div class="ai-message-avatar">IA</div>
                <div class="ai-message-bubble">Conversación reiniciada. ¿En qué te puedo ayudar con los datos de esta gráfica?</div>
            </div>`;
        document.getElementById('ai-suggestions').style.display = 'flex';
    });

    // Desconectar / cambiar key
    disconnBtn.addEventListener('click', () => {
        localStorage.removeItem(AI_KEY_STORAGE);
        aiChatHistory = [];
        chatArea.style.display = 'none';
        keySetup.style.display = 'flex';
        keyInput.value = '';
    });

    // Toggle colapsar/expandir panel
    const togglePanel = () => {
        const isHidden = panelBody.classList.toggle('hidden');
        toggleBtn.classList.toggle('collapsed', isHidden);
    };

    panelHeader.addEventListener('click', e => {
        // Solo colapsar si el click no fue en el botón de toggle directamente (para evitar doble disparo)
        if (!e.target.closest('.ai-toggle-btn') || e.target.closest('.ai-panel-header')) togglePanel();
    });

    toggleBtn.addEventListener('click', e => {
        e.stopPropagation();
        togglePanel();
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    await loadKnowledgeDocs(); // Cargar documentos de contexto primero
    initAIAssistant();
});
