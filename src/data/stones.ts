export interface StoneProduct {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
}

export interface StoneDetail {
    id: string;
    title: string;
    description: string;
    products: StoneProduct[];
}

export const stonesData: Record<string, StoneDetail> = {
    citrino: {
        id: 'citrino',
        title: 'Citrino',
        description: 'La piedra de la luz solar y la energía vital. El Citrino es conocido por atraer la abundancia, disipar la negatividad y despertar la creatividad interior. Llevarlo contigo es mantener un pedazo de sol cerca de tu piel.',
        products: [
            {
                id: 'citrino-pulsera',
                name: 'Pulsera Brillo Solar',
                price: '$ 1.550',
                description: 'Citrinos facetados engastados artesanalmente para capturar y reflejar la luz. Ideal para empezar el día con intención y optimismo.',
                image: '/col-abundancia.png' // Reusing a matching asset
            },
            {
                id: 'citrino-collar',
                name: 'Collar Foco Dorado',
                price: '$ 2.300',
                description: 'Sutil y expansivo. Un amuleto perfecto para momentos en donde necesitas un extra de confianza en tus manifestaciones o negociaciones.',
                image: '/media__1772217686363.png' // Reusing a matching asset
            }
        ]
    },
    amatista: {
        id: 'amatista',
        title: 'Amatista',
        description: 'Un faro de calma y claridad espiritual. La Amatista transmuta las energías negativas en positivas, aliviando el estrés y favoreciendo un estado meditativo profundo. Es la compañera ideal para el descanso.',
        products: [
            {
                id: 'amatista-collar',
                name: 'Collar Noche Serena',
                price: '$ 2.450',
                description: 'Diseño minimalista con una lágrima de amatista. Su vibración suave te acompaña durante el ajetreo diario manteniéndote en tu centro.',
                image: '/col-descanso.png' // Reusing a matching asset
            },
            {
                id: 'amatista-pulsera',
                name: 'Pulsera Intuición',
                price: '$ 1.800',
                description: 'Cuentas esféricas de amatista pulida. Úsala en la muñeca izquierda para potenciar la recepción de mensajes de tu voz interior.',
                image: '/media__1772227767565.png' // Reusing a matching asset
            }
        ]
    },
    tigre: {
        id: 'tigre',
        title: 'Ojo de Tigre',
        description: 'Una mirada protectora y arraigada a la tierra. El Ojo de Tigre fusiona la energía del sol y la tierra fortaleciendo la confianza en uno mismo, el coraje y la capacidad material de actuar.',
        products: [
            {
                id: 'tigre-pulsera',
                name: 'Pulsera Raíz',
                price: '$ 1.600',
                description: 'El brillo sedoso marrón y dorado del Ojo de Tigre aporta estabilidad y coraje para enfrentar decisiones difíciles con firmeza.',
                image: '/media__1772233663529.png' // Reusing a matching asset
            },
            {
                id: 'tigre-collar',
                name: 'Japa Mala Guerrero',
                price: '$ 3.100',
                description: 'Amuleto completo para prácticas de meditación profunda o como escudo diario contra energías dispersas y envidias.',
                image: '/artisan_process_verify_1772230929051.webp' // Reusing a matching asset
            }
        ]
    },
    malaquita: {
        id: 'malaquita',
        title: 'Malaquita',
        description: 'Piedra de transformación profunda y rápida. La Malaquita absorbe implacablemente las energías negativas y los contaminantes ambientales, abriendo el corazón al amor incondicional.',
        products: [
            {
                id: 'malaquita-collar',
                name: 'Collar Renacer Verde',
                price: '$ 2.800',
                description: 'Cautivantes patrones concéntricos de diferentes tonos verdes que invitan a perderse en su observación relajante y sanadora.',
                image: '/col-equilibrio.png' // Reusing a matching asset
            },
            {
                id: 'malaquita-pulsera',
                name: 'Pulsera Transformación',
                price: '$ 1.950',
                description: 'Compañera fiel en épocas de cambios, recordándote que toda evolución requiere dejar ir viejas estructuras.',
                image: '/media__1772231779454.jpg' // Reusing a matching asset
            }
        ]
    },
    amazonita: {
        id: 'amazonita',
        title: 'Amazonita',
        description: 'Como aguas tranquilas, calma el alma y equilibra las emociones. La Amazonita disipa la preocupación y el miedo, armonizando el chakra del corazón y de la garganta para una comunicación fluida.',
        products: [
            {
                id: 'amazonita-pulsera',
                name: 'Pulsera Río Manso',
                price: '$ 1.450',
                description: 'Tonos turquesa pálidos que evocan el movimiento del agua. Utilízala cuando precises expresar tus límites de forma amorosa pero firme.',
                image: '/col-serenidad.png' // Reusing a matching asset
            },
            {
                id: 'amazonita-collar',
                name: 'Collar Expresión Verdadera',
                price: '$ 2.100',
                description: 'Pieza sutil y elegante para reposar sobre la garganta. Ideal para locutores, docentes o para tener conversaciones difíciles.',
                image: '/farfalla_zodiac_verify_1772222020063.webp' // Reusing a matching asset
            }
        ]
    },
    sodalita: {
        id: 'sodalita',
        title: 'Sodalita',
        description: 'La piedra de la lógica, la verdad y la iluminación mental. Limpia la confusión y fomenta el pensamiento racional, la objetividad, así como la solidaridad y el compañerismo dentro del grupo.',
        products: [
            {
                id: 'sodalita-collar',
                name: 'Collar Constelación Azul',
                price: '$ 2.350',
                description: 'Un azul profundo salpicado de destellos blancos, recordando a una noche estrellada. Perfecto para estudiantes y la concentración literaria.',
                image: '/media__1772221878013.png' // Reusing a matching asset
            },
            {
                id: 'sodalita-pulsera',
                name: 'Pulsera Mente Clara',
                price: '$ 1.650',
                description: 'Esferas azules para acompañarte durante tu jornada de trabajo o estudio, manteniendo tu mente ágil e imperturbable.',
                image: '/media__1772217385434.jpg' // Reusing a matching asset
            }
        ]
    }
}
