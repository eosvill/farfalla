export interface Product {
    id: string
    name: string
    price: string
    description: string
    image: string
}

export interface CollectionData {
    id: string
    title: string
    subtitle: string
    description: string
    products: Product[]
}

export const collections: Record<string, CollectionData> = {
    amor: {
        id: 'amor',
        title: 'Colección Amor',
        subtitle: 'Cuarzo rosa, rodocrosita',
        description: 'Piedras que abren el corazón, fortalecen los vínculos y te conectan con la energía más pura. Ideales para darte amor propio y recibirlo de tu entorno con los brazos abiertos.',
        products: [
            {
                id: 'p-amor-1',
                name: 'Pulsera Vínculos Resilientes',
                price: '$ 1.250',
                description: 'Combinación perfecta de cuarzo rosa y rodocrosita con separadores dorados. Cada piedra ha sido elegida por su pureza para acompañar procesos de sanación del corazón y autoestima.',
                image: '/col-amor.png'
            },
            {
                id: 'p-amor-2',
                name: 'Gargantilla Aura Cálida',
                price: '$ 1.890',
                description: 'Delicado colgante central de cuarzo rosa pulido a mano. Su energía suave y tranquilizadora es perfecta para llevarla cerca del corazón durante todo el día, atrayendo armonía y dulzura.',
                image: '/col-descanso.png' // Reusing aesthetic images for mock
            }
        ]
    },
    proteccion: {
        id: 'proteccion',
        title: 'Colección Protección',
        subtitle: 'Obsidiana, ojo de tigre, turmalina',
        description: 'Poderosos escudos naturales contra la energía pesada. Estas piezas están creadas para que te sientas segura, enraizada y protegida en tu camino, sea cual sea el desafío que enfrentes.',
        products: [
            {
                id: 'p-prot-1',
                name: 'Brazalete Escudo de Obsidiana',
                price: '$ 1.400',
                description: 'Obsidiana negra pulida intercalada con dije central. Una pieza robusta y elegante diseñada para repeler energías negativas y mantener el enfoque y la claridad mental.',
                image: '/col-proteccion.png'
            },
            {
                id: 'p-prot-2',
                name: 'Collar Visión de Tigre',
                price: '$ 2.100',
                description: 'Ojo de tigre de alta vibración en un engarce artesanal. Protege, da confianza y atrae la prosperidad material. Sus reflejos dorados y terrosos combinan con cualquier outfit.',
                image: '/col-abundancia.png'
            }
        ]
    },
    descanso: {
        id: 'descanso',
        title: 'Colección Descanso & Calma',
        subtitle: 'Amatista, lepidolita, howlita',
        description: 'Una sinfonía de tonos violetas y cremas que aquietan la mente. Pensada especialmente para aliviar la ansiedad, relajar el espíritu y acompañar procesos de descanso profundo y meditación.',
        products: [
            {
                id: 'p-desc-1',
                name: 'Pulsera Noches Serena',
                price: '$ 1.350',
                description: 'Un diseño sutil intercalando amatista y perlitas doradas. Su energía transmuta la vibración del estrés diario, induciendo a un estado de paz profunda al finalizar el día.',
                image: '/col-descanso.png'
            },
            {
                id: 'p-desc-2',
                name: 'Pendientes Sueño Lúcido',
                price: '$ 950',
                description: 'Elegantes pendientes con lepidolita natural. La lepidolita, rica en litio, es excelente para estabilizar emociones y facilitar el paso hacia un sueño reparador.',
                image: '/col-equilibrio.png'
            }
        ]
    },
    abundancia: {
        id: 'abundancia',
        title: 'Colección Abundancia',
        subtitle: 'Citrino, pirita, lluvia de oro',
        description: 'Piedras que irradian luz, alegría y prosperidad. Una colección concebida para atraer el éxito y poner a brillar todos tus proyectos con la fuerza expansiva del sol.',
        products: [
            {
                id: 'p-abun-1',
                name: 'Pulsera Raíces de Oro',
                price: '$ 1.550',
                description: 'Citrino cálido y pirita facetada en armonía. La pirita actúa como un imán para la abundancia, mientras que el citrino elimina el estancamiento y fomenta la creatividad.',
                image: '/col-abundancia.png'
            },
            {
                id: 'p-abun-2',
                name: 'Collar Prosperidad Solar',
                price: '$ 2.300',
                description: 'Un amuleto poderoso de lluvia de oro. Llévalo en momentos donde necesites un impulso extra de confianza en negociaciones o nuevos emprendimientos.',
                image: '/col-proteccion.png'
            }
        ]
    },
    serenidad: {
        id: 'serenidad',
        title: 'Colección Serenidad',
        subtitle: 'Amazonita, sodalita, cuarzo azul',
        description: 'Piedras que fluyen con la energía calmada y profunda del agua. Esta línea es perfecta para traer paz mental, facilitar la comunicación sincera y equilibrar tu verdad interior.',
        products: [
            {
                id: 'p-ser-1',
                name: 'Conjunto Aguas Mansas',
                price: '$ 2.800',
                description: 'Collar y pulsera de amazonita y plata. Sus tonos aguamarina calman el sistema nervioso y conectan con la intuición, permitiendo expresar tus emociones con claridad.',
                image: '/col-serenidad.png'
            },
            {
                id: 'p-ser-2',
                name: 'Anillo Claridad Profunda',
                price: '$ 1.150',
                description: 'Sodalita de un azul intenso encastrada en alpaca. Una joya que actúa sobre el chakra garganta, despejando la confusión y estimulando la comprensión objetiva.',
                image: '/col-descanso.png'
            }
        ]
    },
    equilibrio: {
        id: 'equilibrio',
        title: 'Colección Equilibrio',
        subtitle: 'Malaquita, jaspe, jade',
        description: 'Vibrantes tonos vedes y terrosos de transformación y balance. Diseñada para armonizar tu energía diaria, conectándote con la vitalidad y sabiduría de la Tierra.',
        products: [
            {
                id: 'p-equi-1',
                name: 'Collar Bosque Sabio',
                price: '$ 2.600',
                description: 'Malaquita con sus patrones hipnóticos, acompañada de pequeños jades. Absorbe energías geopáticas y contaminantes, recargándote con fuerza vital y equilibrio emocional.',
                image: '/col-equilibrio.png'
            },
            {
                id: 'p-equi-2',
                name: 'Pulsera Raíz y Estabilidad',
                price: '$ 1.300',
                description: 'Jaspes seleccionados mezclados sutilmente con madera. Otorga apoyo en momentos de tensión, aportando tranquilidad y plenitud a quien la lleva consigo.',
                image: '/col-serenidad.png'
            },
            {
                id: 'p-equi-3',
                name: 'Cuentas de Armonía',
                price: '$ 980',
                description: 'Diseño minimalista de jade verde puro. Ideal para uso diario continuo, atrayendo la buena suerte y cimentando el bienestar físico y espiritual.',
                image: '/col-abundancia.png'
            }
        ]
    }
}
