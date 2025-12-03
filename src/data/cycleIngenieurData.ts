export interface University {
  id: string;
  name: string;
  fullName: string;
  location: string;
  type: 'specifique' | 'independant' | 'ressource-pedagogique';
  image: string;
  logo?: string;
  description: string;
  specialties: string[];
  detailedSpecialties: {
    name: string;
    code: string;
    license?: string[] | string; // Changed from string to string[] | string to support both formats
    description: string;
    planEtudeUrl: string;
    duration: string;
    capacity: number;
    lastAcceptableScore: number; // ScoreG from 2024
  }[];
  lastYearScores: {
    year: number;
    detailedScores: {
      specialty: string;
      code: string;
      lastAcceptableScore: number; // ScoreG
      places: number;
    }[];
  };
  concoursStatus: 'launched' | 'not-launched' | 'closed' | 'results-published';
  concoursWebsite?: string;
  annexeRangUrl?: string;
  candidatureGuideUrl?: string;
  website: string;
  establishedYear: number;
  studentsCount: number;
  ranking?: number;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  gallery: string[];
  facilities: string[];
  partnerships: string[];
  university: string; // Parent university
}

export const universitiesData: University[] = [
  // ENIT
  {
    id: '1',
    name: 'ENIT',
    fullName: 'École Nationale d\'Ingénieurs de Tunis',
    location: 'Tunis',
    type: 'specifique',
    image: 'https://www.ecoles.com.tn/sites/default/files/universite/images/enit-couv.jpg',
    description: 'École d\'ingénieurs prestigieuse spécialisée en génie informatique.',
    specialties: [
      "Technologies de l'informatique - Développement systèmes d'informations",
       "Technologies de l'informatique - Systèmes embarqués et mobiles",
         "Technologies de l'informatique - Réseaux et services informatique",
          "Technologies de l'informatique - multimédia et développment Web",
          "Sciences de l'informatique - Big Data et Analyse des données",
          "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
          "Sciences de l'informatique - Informatique et Multimédia",
          "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
    detailedSpecialties: [
      {
        name: 'Génie Informatique | الإعلامية',
        code: 'INFO01',
        license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
          "Technologies de l'informatique - Réseaux et services informatique",
          "Technologies de l'informatique - multimédia et développment Web",
          "Sciences de l'informatique - Big Data et Analyse des données",
          "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
          "Sciences de l'informatique - Informatique et Multimédia",
          "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation complète en développement logiciel, systèmes d\'information et intelligence artificielle.',
        planEtudeUrl: '/assets/PE_ENIT.pdf',
        duration: '3 ans',
        capacity: 1,
        lastAcceptableScore: 92.8600
      }
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [
        { specialty: 'Génie Informatique | الإعلامية', code: 'INFO01', lastAcceptableScore: 92.8600, places: 1 }
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/enit-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-enit.pdf',
    website: 'enit.rnu.tn',
    establishedYear: 1968,
    studentsCount: 1500,
    ranking: 1,
    address: 'Rue Béchir Salem Belkhiria, Campus Universitaire, 1002 Tunis',
    phone: '+216 70 014 400',
    email: 'contact@enit.rnu.tn',
    coordinates: { lat: 36.831219014315124, lng: 10.147360800129363 },
    gallery: [
      'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Laboratoires informatiques', 'Centre de recherche', 'Bibliothèque numérique'],
    partnerships: ['Microsoft', 'IBM', 'Orange Tunisie'],
    university: 'Université de Tunis El Manar'
  },
  // ENIS
  {
    id: '2',
    name: 'ENISO',
    fullName: 'École Nationale d\'Ingénieurs de Sousse',
    location: 'Sousse',
    type: 'specifique',
    image: 'https://rami.tn/wp-content/uploads/2023/07/ENISO.webp',
    description: 'École d\'ingénieurs spécialisée en informatique appliquée.',
    specialties: [
      "Technologies de l'informatique - Développement systèmes d'informations",
      "Technologies de l'informatique - Systèmes embarqués et mobiles",
       "Technologies de l'informatique - Réseaux et services informatique",
         "Technologies de l'informatique - multimédia et développment Web",
         "Sciences de l'informatique - Big Data et Analyse des données",
         "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
         "Sciences de l'informatique - Informatique et Multimédia",
         "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
    detailedSpecialties: [
      {
        name: 'Informatique appliquée | إعلامية تطبيقية',
        code: 'INFA02',
        license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
            "Technologies de l'informatique - Réseaux et services informatique",
              "Technologies de l'informatique - multimédia et développment Web",
              "Sciences de l'informatique - Big Data et Analyse des données",
              "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
              "Sciences de l'informatique - Informatique et Multimédia",
              "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation pratique en développement d\'applications et systèmes informatiques.',
        planEtudeUrl: '/assets/PE_ENISO.pdf',
        duration: '3 ans',
        capacity: 4,
        lastAcceptableScore: 68.8500
      }
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [
        { specialty: 'Informatique appliquée | إعلامية تطبيقية', code: 'INFA02', lastAcceptableScore: 68.8500, places: 4 }
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/enis-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-enis.pdf',
    website: 'enis.rnu.tn',
    establishedYear: 2005,
    studentsCount: 1200,
    ranking: 2,
    address: 'Pôle technologique de Sousse, Route de Ceinture Sahloul, Sousse 4054',
    phone: '+216 73 369 500',
    email: 'contact@enis.rnu.tn',
    coordinates: { lat: 35.82059443884687, lng: 10.5930473846563 },
    gallery: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Laboratoires informatiques', 'Centre de calcul'],
    partnerships: ['Tunisie Télécom', 'Entreprises locales'],
    university: 'Université de Sousse'
  },
  // ISIMS
  {
    id: '3',
    name: 'ISIMS',
    fullName: 'Institut Supérieur d\'Informatique et de Multimédia de Sfax',
    location: 'Sfax',
    type: 'independant',
    image: 'https://www.ecoles.com.tn/sites/default/files/universite/logo/isims-logo.jpg',
    description: 'Institut spécialisé en informatique et multimédia.',
    specialties: [
      "Technologies de l'informatique - Développement systèmes d'informations",
      "Technologies de l'informatique - multimédia et développment Web",
      "Sciences de l'informatique - Big Data et Analyse des données",
      "Sciences de l'informatique - Informatique et Multimédia",
      "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
    detailedSpecialties: [
      {
        name: 'Génie Informatique, Technologies Web et Multimedia (1-B) | هندسة الاعلامية ملتيميديا وواب',
        code: 'MW1B27',
        license: [
      "Technologies de l'informatique - Développement systèmes d'informations",
      "Technologies de l'informatique - multimédia et développment Web",
      "Sciences de l'informatique - Big Data et Analyse des données",
      "Sciences de l'informatique - Informatique et Multimédia",
      "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
        description: 'Formation en développement web, multimédia et systèmes informatiques.',
        planEtudeUrl: '/assets/PE_ISIMSF.pdf',
        duration: '3 ans',
        capacity: 18,
        lastAcceptableScore: 80.0400
      },
      
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [
        { specialty: 'Génie Informatique, Technologies Web et Multimedia | هندسة الاعلامية ملتيميديا وواب', code: 'MW1B27', lastAcceptableScore: 13.50, places: 80 },
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/isims-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-isims.pdf',
    website: 'isimsf.rnu.tn/',
    establishedYear: 2001,
    studentsCount: 600,
    ranking: 8,
    address: 'pôle technologique de sfax, Sakiet Ezzit 3021',
    phone: '+216 74 862 234',
    email: 'contact@isims.rnu.tn',
    coordinates: { lat: 34.839430529818664, lng: 10.757201813495234 },
    gallery: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Studios multimédia', 'Laboratoires web'],
    partnerships: ['Entreprises IT locales'],
    university: 'Université de Sfax'
  },
  // ENSTAB
  {
    id: '4',
    name: 'ENSTAB',
    fullName: 'École Nationale des Sciences et Technologies Avancées de Borj Cedria',
    location: 'Borj Cedria',
    type: 'specifique',
    image: 'https://ucar.rnu.tn/wp-content/uploads/2025/10/Enstab-logo-3.png',
    description: 'École spécialisée en technologies avancées.',
    specialties: [
      "Technologies de l'informatique - Développement systèmes d'informations",
      "Technologies de l'informatique - Systèmes embarqués et mobiles",
       "Technologies de l'informatique - Réseaux et services informatique",
        "Technologies de l'informatique - multimédia et développment Web",
        "Sciences de l'informatique - Big Data et Analyse des données",
        "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
        "Sciences de l'informatique - Informatique et Multimédia",
        "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
    detailedSpecialties: [
      {
        name: 'Technologies avancées | التكنولوجيات المتقدمة',
        code: 'TEAV09',
        license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
           "Technologies de l'informatique - Réseaux et services informatique",
            "Technologies de l'informatique - multimédia et développment Web",
            "Sciences de l'informatique - Big Data et Analyse des données",
            "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
            "Sciences de l'informatique - Informatique et Multimédia",
            "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation en technologies émergentes et systèmes avancés.',
        planEtudeUrl: '',
        duration: '3 ans',
        capacity: 9,
        lastAcceptableScore: 67.05
      }
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [
        { specialty: 'Technologies avancées | التكنولوجيات المتقدمة', code: 'TEAV09', lastAcceptableScore: 67.05, places: 9 }
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/enstab-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-enstab.pdf',
    website: 'enstab.tn/',
    establishedYear: 2014,
    studentsCount: 400,
    ranking: 6,
    address: 'Rue de Rome',
    phone: '+216 79 326 767',
    email: 'contact@enstab.rnu.tn',
    coordinates: { lat: 36.70768882984674, lng: 10.42703187116508 },
    gallery: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Laboratoires avancés', 'Centre de recherche'],
    partnerships: ['Centres de recherche internationaux'],
    university: 'Université de Carthage'
  },
  // ENSI
  {
    id: '5',
    name: 'ENSI',
    fullName: 'École Nationale des Sciences de l\'Informatique',
    location: 'Manouba',
    type: 'specifique',
    image: 'https://www.tunup.org/uploads/9/2/7/2/92725294/published/screenshot-2024-10-06-at-22-25-24.png?1728935688',
    description: 'École spécialisée en sciences de l\'informatique.',
    specialties: [
      "Technologies de l'informatique - Développement systèmes d'informations",
      "Technologies de l'informatique - Systèmes embarqués et mobiles",
       "Technologies de l'informatique - Réseaux et services informatique",
        "Technologies de l'informatique - multimédia et développment Web",
        "Sciences de l'informatique - Big Data et Analyse des données",
        "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
        "Sciences de l'informatique - Informatique et Multimédia",
        "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
    detailedSpecialties: [
      {
        name: 'Informatique | إعلامية',
        code: 'INFO11',
          license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
           "Technologies de l'informatique - Réseaux et services informatique",
            "Technologies de l'informatique - multimédia et développment Web",
            "Sciences de l'informatique - Big Data et Analyse des données",
            "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
            "Sciences de l'informatique - Informatique et Multimédia",
            "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation complète en informatique et développement de systèmes.',
        planEtudeUrl: 'https://ensi.rnu.tn/fra/pages/438/Ing%C3%A9nieur',
        duration: '3 ans',
        capacity: 10,
        lastAcceptableScore: 90.00
      }
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [
        { specialty: 'Informatique | إعلامية', code: 'INFO11', lastAcceptableScore: 90.00, places: 10 }
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/ensi-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-ensi.pdf',
    website: 'ensi.rnu.tn',
    establishedYear: 1984,
    studentsCount: 800,
    ranking: 1,
    address: 'Campus Universitaire Manouba, 2010 Manouba',
    phone: '+216 71 600 444',
    email: 'contact@ensi.rnu.tn',
    coordinates: { lat: 36.81387414580589, lng: 10.06374444232815 },
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Labs IA', 'Incubateur technologique'],
    partnerships: ['Google', 'Microsoft', 'IBM'],
    university: 'Université de la Manouba'
  },
  // ENICAR
  {
    id: '6',
    name: 'ENICAR',
    fullName: 'École Nationale d\'Ingénieurs de Carthage',
    location: 'Carthage',
    type: 'specifique',
    image: 'https://upload.wikimedia.org/wikipedia/fr/c/c2/Logo_ENICarthage.jpg',
    description: 'École d\'ingénieurs spécialisée en infotronique et informatique.',
    specialties: [
      "Technologies de l'informatique - Développement systèmes d'informations",
      "Technologies de l'informatique - Systèmes embarqués et mobiles",
        "Technologies de l'informatique - Réseaux et services informatique",
         "Technologies de l'informatique - multimédia et développment Web",
         "Sciences de l'informatique - Big Data et Analyse des données",
         "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
         "Sciences de l'informatique - Informatique et Multimédia",
         "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
    detailedSpecialties: [
      {
        name: 'Infotronique | أنفوترونيك',
        code: 'IFTR13',
        license: [
        "Technologies de l'informatique - Développement systèmes d'informations",
        "Technologies de l'informatique - Systèmes embarqués et mobiles",
          "Technologies de l'informatique - Réseaux et services informatique",
           "Technologies de l'informatique - multimédia et développment Web",
           "Sciences de l'informatique - Big Data et Analyse des données",
           "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
           "Sciences de l'informatique - Informatique et Multimédia",
           "Sciences de l'informatique - Génie logiciel et systèmes d'information"
      ],
        description: 'Formation en systèmes informatiques et électroniques intégrés.',
        planEtudeUrl: '',
        duration: '3 ans',
        capacity: 6,
        lastAcceptableScore: 82.1700
      },
      
      {
        name: 'Informatique | إعلامية',
        code: 'INFO13',
        license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
            "Technologies de l'informatique - Réseaux et services informatique",
             "Technologies de l'informatique - multimédia et développment Web",
             "Sciences de l'informatique - Big Data et Analyse des données",
             "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
             "Sciences de l'informatique - Informatique et Multimédia",
             "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation complète en génie informatique et développement.',
        planEtudeUrl: '/assets/PE_ENICAR_INFO.pdf',
        duration: '3 ans',
        capacity: 20,
        lastAcceptableScore: 84.0900
      }
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [
        { specialty: 'Infotronique | أنفوترونيك', code: 'IFTR13', lastAcceptableScore: 82.1700, places: 6 },
        { specialty: 'Informatique | إعلامية', code: 'INFO13', lastAcceptableScore: 84.0900, places: 20 }
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/enicar-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-enicar.pdf',
    website: 'http://www.enicarthage.rnu.tn/fr/actualite',
    establishedYear: 2002,
    studentsCount: 1200,
    ranking: 3,
    address: '45 Rue des Entrepreneurs, 2035',
    phone: '+216 71 940 699',
    email: 'contact@enicar.rnu.tn',
    coordinates: { lat: 36.85179275531149, lng: 10.211137571164075 },
    gallery: [
      'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Laboratoires informatiques', 'Centre de recherche'],
    partnerships: ['Orange Tunisie', 'Tunisie Télécom'],
    university: 'Université de Carthage'
  },
  // ENETCOM
  {
    id: '7',
    name: 'ENETCOM',
    fullName: 'École Nationale d\'Électronique et des Télécommunications de Sfax',
    location: 'Sfax',
    type: 'specifique',
    image: 'https://enetcom.rnu.tn/images/logo.png',
    description: 'École spécialisée en télécommunications et ingénierie des données.',
    specialties: [
      "Technologies de l'informatique - Développement systèmes d'informations",
       "Technologies de l'informatique - Systèmes embarqués et mobiles",
             "Technologies de l'informatique - Réseaux et services informatique",
              "Technologies de l'informatique - multimédia et développment Web",
              "Sciences de l'informatique - Big Data et Analyse des données",
              "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
              "Sciences de l'informatique - Informatique et Multimédia",
              "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
    detailedSpecialties: [
      {
        name: 'Génie des Télécommunications | هندسة الإتصالات',
        code: 'TELC14',
        license: [
      "Technologies de l'informatique - Développement systèmes d'informations",
      "Technologies de l'informatique - Réseaux et services informatique",
      "Technologies de l'informatique - multimédia et développment Web",
    
      "Sciences de l'informatique - Informatique et Multimédia",
      "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
        description: 'Formation en systèmes de télécommunications et réseaux.',
        planEtudeUrl: '/assets/PE_ENETCOM_GT.pdf',
        duration: '3 ans',
        capacity: 10,
        lastAcceptableScore: 71.8500
      },
      {
        name: 'Ingénierie des Données et Systèmes Décisionnels | هندسة المعطيات والأنظمة التقريرية',
        code: 'GDSD14',
         license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
           "Technologies de l'informatique - Réseaux et services informatique",
            "Technologies de l'informatique - multimédia et développment Web",
            "Sciences de l'informatique - Big Data et Analyse des données",
            "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
            "Sciences de l'informatique - Informatique et Multimédia",
            "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation en big data, business intelligence et systèmes décisionnels.',
        planEtudeUrl: '/assets/PE_ENETCOM_GDSD.pdf',
        duration: '3 ans',
        capacity: 9,
        lastAcceptableScore: 84.2800
      },
      {
        name: 'Génie Informatique Industrielle | هندسة الإعلامية الصناعية',
        code: 'ININ14',
        license: [
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
          "Sciences de l'informatique - Micro-informatique et Machines Embarquées"
        ],

        description: 'Formation en informatique industrielle et systèmes automatisés.',
        planEtudeUrl: '/assets/GECENETCOM.pdf',
        duration: '3 ans',
        capacity: 11,
        lastAcceptableScore: 73.5100
      },
      {
        name: 'Génie des Systèmes Electroniques et Communications | هندسة أنظمة الإلكترونيك والإتصال',
        code: 'GSIT14',
         license: [
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
          
        ],
        description: 'Formation en systèmes électroniques et communications.',
        planEtudeUrl: '/assets/PE_ENETCOM_GSEC.pdf',
        duration: '3 ans',
        capacity: 10,
        lastAcceptableScore: 62.4300
      }
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [
        { specialty: 'Génie des Télécommunications | هندسة الإتصالات', code: 'TELC14', lastAcceptableScore:  71.8500, places: 10 },
        { specialty: 'Ingénierie des Données et Systèmes Décisionnels | هندسة المعطيات والأنظمة التقريرية', code: 'GDSD14', lastAcceptableScore: 84.2800, places: 9 },
        { specialty: 'Génie Informatique Industrielle | هندسة الإعلامية الصناعية', code: 'ININ14', lastAcceptableScore: 73.5100, places: 11 },
        { specialty: 'Génie des Systèmes Electroniques et Communications | هندسة أنظمة الإلكترونيك والإتصال', code: 'GSIT14', lastAcceptableScore: 62.4300, places: 10 }
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/enetcom-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-enetcom.pdf',
    website: 'enetcom.rnu.tn/fr',
    establishedYear: 2002,
    studentsCount: 700,
    ranking: 5,
    address: 'Route de Tunis km 10, Cité el Ons, Technopôle de Sfax',
    phone: '+216 74 862 555',
    email: 'contact@enetcom.rnu.tn',
    coordinates: { lat: 34.838318867040336, lng: 10.755477654665551 },
    gallery: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Laboratoires télécoms', 'Centre de données'],
    partnerships: ['Huawei', 'Ericsson'],
    university: 'Université de Sfax'
  },
  // ENSIT
  {
    id: '8',
    name: 'ENSIT',
    fullName: 'École Nationale Supérieure d\'Ingénieurs de Tunis',
    location: 'Tunis',
    type: 'specifique',
    image: 'https://www.ensit.tn/wp-content/uploads/2015/05/logo-ecole-1170x284.png',
    description: 'École supérieure d\'ingénieurs avec spécialisation informatique.',
    specialties: [
      "Technologies de l'informatique - Développement systèmes d'informations",
      "Technologies de l'informatique - Systèmes embarqués et mobiles",
       "Technologies de l'informatique - Réseaux et services informatique",
        "Technologies de l'informatique - multimédia et développment Web",
        "Sciences de l'informatique - Big Data et Analyse des données",
        "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
        "Sciences de l'informatique - Informatique et Multimédia",
        "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
    detailedSpecialties: [
      {
        name: 'Informatique | إعلامية',
        code: 'INFO12',
        license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
          "Technologies de l'informatique - Réseaux et services informatique",
          "Technologies de l'informatique - multimédia et développment Web",
          "Sciences de l'informatique - Big Data et Analyse des données",
          "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
          "Sciences de l'informatique - Informatique et Multimédia",
          "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation avancée en informatique et systèmes.',
        planEtudeUrl: 'https://www.ensit.tn/formation/diplome-dingenieur/',
        duration: '3 ans',
        capacity: 3,
        lastAcceptableScore: 87.6800
      }
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [
        { specialty: 'Informatique | إعلامية', code: 'INFO12', lastAcceptableScore: 87.6800, places: 3 }
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/ensit-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-ensit.pdf',
    website: 'ensit.tn',
    establishedYear: 2011,
    studentsCount: 900,
    ranking: 4,
    address: '05 Ave Taha Hussein, Tunis 1008',
    phone: '+216 71 399 525',
    email: 'contact@ensit.rnu.tn',
    coordinates: { lat: 36.784904492922976, lng: 10.179578655825392 },
    gallery: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Laboratoires informatiques', 'Bibliothèque technique'],
    partnerships: ['SAP', 'Oracle'],
    university: 'Université de Tunis'
  },
  // ISAMM
  {
    id: '9',
    name: 'ISAMM',
    fullName: 'Institut Supérieur des Arts du Multimédia de la Manouba',
    location: 'Manouba',
    type: 'independant',
    image: 'https://lh3.googleusercontent.com/4XJfPxFI8aF139wbMEGenfWgi0sNyKa-9t272hPwTjbpBrW0J6rY2Tyf3wqVxZl1RQs=s300',
    description: 'Institut spécialisé en informatique et multimédia.',
    specialties: [
      "Technologies de l'informatique - Développement systèmes d'informations",
      "Technologies de l'informatique - Systèmes embarqués et mobiles",
       "Technologies de l'informatique - Réseaux et services informatique",
        "Technologies de l'informatique - multimédia et développment Web",
        "Sciences de l'informatique - Big Data et Analyse des données",
        "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
        "Sciences de l'informatique - Informatique et Multimédia",
        "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
    detailedSpecialties: [
      {
        name: 'Informatique et Multimédia (1-B) | إعلامية وملتيميديا',
        code: 'IM1B23',
        license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - multimédia et développment Web",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
          "Technologies de l'informatique - Réseaux et services informatique",
          "Sciences de l'informatique - Big Data et Analyse des données",
          "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
          "Sciences de l'informatique - Informatique et Multimédia",
          "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation en développement multimédia et applications interactives.',
        planEtudeUrl: 'https://isa2m.rnu.tn/departement/2%7D%7D',
        duration: '3 ans',
        capacity: 36,
        lastAcceptableScore: 78.2800
      },
     
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [
        { specialty: 'Informatique et Multimédia | إعلامية وملتيميديا', code: 'IM1B23', lastAcceptableScore: 78.2800, places: 36 },
        { specialty: 'Informatique et Multimédia (1-A) | إعلامية وملتيميديا', code: 'IM1A23', lastAcceptableScore: 63.8100, places: 24 }
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/isamm-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-isamm.pdf',
    website: 'isa2m.rnu.tn/',
    establishedYear: 2000,
    studentsCount: 500,
    ranking: 10,
    address: 'ISAMM, Campus Universitaire de la Manouba, 2010',
    phone: '+216 71 603 497',
    email: 'contact@isamm.rnu.tn',
    coordinates: { lat: 36.8165685212567, lng: 10.060907055825394 },
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Studios multimédia', 'Laboratoires créatifs'],
    partnerships: ['Studios de production'],
    university: 'Université de la Manouba'
  },
  // ISSAT Sousse
  {
    id: '10',
    name: 'ISSAT Sousse',
    fullName: 'Institut Supérieur des Sciences Appliquées et de Technologie de Sousse',
    location: 'Sousse',
    type: 'ressource-pedagogique',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSJNrW0Z-JMInI4I2jRZcwXx7MHjomP9zflA&s',
    description: 'Institut spécialisé en sciences informatiques.',
    specialties: [
      "Technologies de l'informatique - Développement systèmes d'informations",
      "Technologies de l'informatique - Systèmes embarqués et mobiles",
        "Technologies de l'informatique - Réseaux et services informatique",
         "Technologies de l'informatique - multimédia et développment Web",
         "Sciences de l'informatique - Big Data et Analyse des données",
         "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
         "Sciences de l'informatique - Informatique et Multimédia",
         "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
    detailedSpecialties: [
      {
        name: 'Sciences Informatiques (1-B) | علوم الإعلامية',
        code: 'INF1B25',
          license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
            "Technologies de l'informatique - Réseaux et services informatique",
             "Technologies de l'informatique - multimédia et développment Web",
             "Sciences de l'informatique - Big Data et Analyse des données",
             "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
             "Sciences de l'informatique - Informatique et Multimédia",
             "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation en sciences informatiques et développement.',
        planEtudeUrl: 'https://issatso.rnu.tn/formation/type/ingenieurs',
        duration: '3 ans',
        capacity: 20,
        lastAcceptableScore: 80.4500
      },
      
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [
        { specialty: 'Sciences Informatiques | علوم الإعلامية', code: 'INF1B25', lastAcceptableScore: 80.4500, places: 20 },
       
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/issat-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-issat.pdf',
    website: 'issatso.rnu.tn/',
    establishedYear: 2001,
    studentsCount: 900,
    ranking: 12,
    address: 'Rue Tahar Ben Achour, Sousse 4003',
    phone: '+216 72 382 656',
    email: 'contact@issat.rnu.tn',
    coordinates: { lat: 35.812713959942215, lng: 10.638286642330158 },
    gallery: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Laboratoires informatiques', 'Centre de calcul'],
    partnerships: ['Entreprises locales'],
    university: 'Université de Sousse'
  },
  // ISI 
  {
    id: '11',
    name: 'ISI',
    fullName: 'Institut Supérieur d\'Informatique d\'El Manar',
    location: 'Tunis',
    type: 'independant',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Institut_Sup%C3%A9rieur_d%27Informatique_%28logo%29.svg/1200px-Institut_Sup%C3%A9rieur_d%27Informatique_%28logo%29.svg.png',
    description: 'Institut spécialisé en ingénierie informatique.',
    specialties: [
      "Technologies de l'informatique - Développement systèmes d'informations",
                "Technologies de l'informatique - Systèmes embarqués et mobiles",
                "Technologies de l'informatique - Réseaux et services informatique",
                 "Technologies de l'informatique - multimédia et développment Web",
                 "Sciences de l'informatique - Big Data et Analyse des données",
                 "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
                 "Sciences de l'informatique - Informatique et Multimédia",
                 "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
    detailedSpecialties: [
      {
        name: 'Ingénierie de Développement du Logiciel (1-B) | هندسة تطوير البرمجيات',
        code: 'IDL1B22',
        license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
          "Technologies de l'informatique - Réseaux et services informatique",
           "Technologies de l'informatique - multimédia et développment Web",
           "Sciences de l'informatique - Big Data et Analyse des données",
           "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
           "Sciences de l'informatique - Informatique et Multimédia",
           "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation spécialisée en développement logiciel et génie logiciel.',
        planEtudeUrl: '/assets/PE_ISI.pdf',
        duration: '3 ans',
        capacity: 42,
        lastAcceptableScore: 81.7100
      },
      {
        name: 'Ingénierie des Systèmes Embarqués et Objets Connectés (1-B) | هندسة النظم المحمولة',
        code: 'ISEOC1B22',
       license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
          "Technologies de l'informatique - Réseaux et services informatique",
           "Technologies de l'informatique - multimédia et développment Web",
           "Sciences de l'informatique - Big Data et Analyse des données",
           "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
           "Sciences de l'informatique - Informatique et Multimédia",
           "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation en systèmes embarqués et IoT.',
        planEtudeUrl: '/assets/PE_ISI.pdf',
        duration: '3 ans',
        capacity: 17,
        lastAcceptableScore: 77.1400
      },
      {
        name: 'Ingénierie et Développement des Infrastructures et des Services de Communications (1-B) | هندسة وتطوير البنى التحتية للإتصالات والخدمات',
        code: 'IDISC1B22',
       license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
          "Technologies de l'informatique - Réseaux et services informatique",
           "Technologies de l'informatique - multimédia et développment Web",
           "Sciences de l'informatique - Big Data et Analyse des données",
           "Sciences de l'informatique - Micro-informatique et Machines Embarquées",
           "Sciences de l'informatique - Informatique et Multimédia",
           "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation en infrastructures de communication et services.',
        planEtudeUrl: '/assets/PE_ISI.pdf',
        duration: '3 ans',
        capacity: 17,
        lastAcceptableScore: 78.1000
      },
      {
        name: 'Ingénierie de Développement de Logiciel (1-A) | هندسة تطوير البرمجيات',
        code: 'IDL1A22',
        description: 'Formation spécialisée en développement logiciel (Concours Interne).',
        planEtudeUrl: '/assets/PE_ISI.pdf',
        duration: '3 ans',
        capacity: 10,
        lastAcceptableScore: 78.1000
      }
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [     
        { specialty: 'Ingénierie de Développement du Logiciel | هندسة تطوير البرمجيات', code: 'IDL1B22', lastAcceptableScore: 81.7100, places: 42 },
        { specialty: 'Ingénierie des Systèmes Embarqués et Objets Connectés | هندسة النظم المحمولة', code: 'ISEOC1B22', lastAcceptableScore: 77.1400, places: 17 },
        { specialty: 'Ingénierie et Développement des Infrastructures et des Services de Communications | هندسة وتطوير البنى التحتية للإتصالات والخدمات', code: 'IDISC1B22', lastAcceptableScore: 78.1000, places: 17 },
        { specialty: 'Ingénierie de Développement de Logiciel (1-A) | هندسة تطوير البرمجيات', code: 'IDL1A22', lastAcceptableScore: 78.1000, places: 10 }
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/isim-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-isim.pdf',
    website: 'isi.rnu.tn/',
    establishedYear: 2001,
    studentsCount: 800,
    ranking: 7,
    address: 'V56Q+GHV, Rue Abourraihan Al Bayrouni, Ariana 2080',
    phone: '+216 71 706 164',
    email: 'contact@isim.rnu.tn',
    coordinates: { lat: 36.861576424348456, lng: 10.188962144174608 },
    gallery: [
      'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Laboratoires de développement', 'Fab Lab'],
    partnerships: ['Startups tech', 'Incubateurs'],
    university: 'Université de Tunis El Manar'
  },
  // ENIS Sfax
  {
    id: '12',
    name: 'ENIS Sfax',
    fullName: 'École Nationale d\'Ingénieurs de Sfax',
    location: 'Sfax',
    type: 'specifique',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4FKAhRdnWu-MAMqY1t2OD0OV8RMVMQR4ygw&s',
    description: 'École d\'ingénieurs avec spécialisation en génie informatique.',
    specialties: [
      "Technologies de l'informatique - Développement systèmes d'informations",
       "Technologies de l'informatique - Systèmes embarqués et mobiles",
       "Technologies de l'informatique - Réseaux et services informatique",
        "Technologies de l'informatique - multimédia et développment Web",
        "Sciences de l'informatique - Big Data et Analyse des données",
       
        "Sciences de l'informatique - Informatique et Multimédia",
        "Sciences de l'informatique - Génie logiciel et systèmes d'information"
    ],
    detailedSpecialties: [
      {
        name: 'Génie informatique | هندسة إعلامية',
        code: 'INFO06',
         license: [
          "Technologies de l'informatique - Développement systèmes d'informations",
          "Technologies de l'informatique - Systèmes embarqués et mobiles",
          "Technologies de l'informatique - Réseaux et services informatique",
          "Technologies de l'informatique - multimédia et développment Web",
          "Sciences de l'informatique - Big Data et Analyse des données",
        
          "Sciences de l'informatique - Informatique et Multimédia",
          "Sciences de l'informatique - Génie logiciel et systèmes d'information"
        ],
        description: 'Formation complète en génie informatique et systèmes.',
        planEtudeUrl: 'https://enis.rnu.tn/fra/pages/276/G%C3%A9nie-Informatique',
        duration: '3 ans',
        capacity: 5,
        lastAcceptableScore: 85.8200
      }
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [
        { specialty: 'Génie informatique | هندسة إعلامية', code: 'INFO06', lastAcceptableScore: 85.8200, places: 5 }
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/enis-sfax-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-enis-sfax.pdf',
    website: 'enis.rnu.tn',
    establishedYear: 1983,
    studentsCount: 1400,
    ranking: 4,
    address: 'km 4 Rte de la Soukra, Sfax 3038',
    phone: '+216 74 274 862',
    email: 'contact@enis.rnu.tn',
    coordinates: { lat: 34.726284710697456, lng: 10.717786715342086 },
    gallery: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Laboratoires informatiques', 'Centre de recherche'],
    partnerships: ['IBM', 'Microsoft'],
    university: 'Université de Sfax'
  },
  // ISITC Hammam-Sousse
  {
    id: '13',
    name: 'ISITCOM',
    fullName: 'Institut Supérieur d\'Informatique et des Techniques de Communication Hammam-Sousse',
    location: 'Hammam-Sousse',
    type: 'independant',
    image: 'https://www.mastere.tn/wp-content/uploads/2020/08/isitcom.png',
    description: 'Institut spécialisé en informatique et techniques de communication.',
    specialties: [

      "Sciences de l'informatique - Génie logiciel et systèmes d'information",
      'Sciences de l\'informatique - Informatique et Multimédia',
    ],
    detailedSpecialties: [
      {
        name: 'Sciences et Technologies de l\'Information et de Télécommunications 1-B | علوم وتكنولوجيات المعلومات والإتصالات 1- ب',
        code: 'TE1B24',
        license: [
          "Sciences de l'informatique - Génie logiciel et systèmes d'information",
          'Sciences de l\'informatique - Informatique et Multimédia'
        ],
        description: 'Formation en sciences et technologies de l\'information et des télécommunications.',
        planEtudeUrl: '',
        duration: '3 ans',
        capacity: 30,
        lastAcceptableScore: 72.0800
      }
    ],
    lastYearScores: {
      year: 2024,
      detailedScores: [
        { 
          specialty: 'Sciences et Technologies de l\'Information et de Télécommunications 1-B | علوم وتكنولوجيات المعلومات والإتصالات 1- ب',
          code: 'TE1B24',
          lastAcceptableScore: 72.0800,
          places: 30
        }
      ]
    },
    concoursStatus: 'launched',
    concoursWebsite: 'https://concours.mes.tn',
    annexeRangUrl: '/documents/isitc-annexe-rang-2024.pdf',
    candidatureGuideUrl: '/documents/guide-candidature-isitc.pdf',
    website: 'isitcom.rnu.tn',
    establishedYear: 2003,
    studentsCount: 600,
    ranking: 9,
    address: 'VH5X+5JC, Sousse',
    phone: '+216 73 371 571',
    email: 'contact@isitc.rnu.tn',
    coordinates: { lat: 35.858012906453745, lng: 10.598987813495233 },
    gallery: [
      'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['Laboratoires informatiques', 'Centre de recherche en télécommunications', 'Bibliothèque numérique'],
    partnerships: ['Orange Tunisie', 'Tunisie Télécom', 'Entreprises locales'],
    university: 'Université de Sousse'
  }
];

export const scoreCalculationInfo = {
  scoreE: {
    title: 'Score E (Score d\'Éligibilité)',
    description: 'Le score E détermine votre éligibilité pour participer au concours national.',
    formula: 'Score E = (Note Bac × 3 + Note Math × 2 + Note Physique × 2 + Note Français × 1) / 8',
    components: [
      { subject: 'Note du Baccalauréat', coefficient: 3, description: 'Moyenne générale du baccalauréat' },
      { subject: 'Note de Mathématiques', coefficient: 2, description: 'Note de mathématiques au baccalauréat' },
      { subject: 'Note de Physique', coefficient: 2, description: 'Note de physique au baccalauréat' },
      { subject: 'Note de Français', coefficient: 1, description: 'Note de français au baccalauréat' }
    ],
    minimumRequired: 10.0,
    tips: [
      'Assurez-vous d\'avoir une moyenne générale élevée au baccalauréat',
      'Les matières scientifiques (Math, Physique) ont plus de poids',
      'Un score E élevé augmente vos chances d\'admission'
    ]
  },
  scoreA: {
    title: 'Score A (Score d\'Admission)',
    description: 'Le score A détermine votre classement final et votre admission dans l\'école choisie.',
    formula: 'Score A = (Score E × 0.4 + Note Concours × 0.6)',
    components: [
      { subject: 'Score E', coefficient: 0.4, description: 'Score d\'éligibilité calculé précédemment' },
      { subject: 'Note du Concours', coefficient: 0.6, description: 'Note obtenue au concours national' }
    ],
    concoursSubjects: [
      'Mathématiques (coefficient 3)',
      'Physique (coefficient 2)',
      'Sciences Naturelles (coefficient 1)',
      'Français (coefficient 1)'
    ],
    tips: [
      'Le concours représente 60% du score final',
      'Préparez-vous intensivement pour le concours',
      'Consultez les annales des années précédentes'
    ]
  }
};

export const availableSpecialties = [
  'All Specialties',
  'Technologies de l\'informatique - Systèmes embarqués et mobiles',
  'Technologies de l\'informatique - Développement systèmes d\'informations',
  'Technologies de l\'informatique - Réseaux et services informatique',
  'Technologies de l\'informatique - multimédia et développment Web',
  'Sciences de l\'informatique - Big Data et Analyse des données',
  'Sciences de l\'informatique - Micro-informatique et Machines Embarquées',
  'Sciences de l\'informatique - Informatique et Multimédia',
  'Sciences de l\'informatique - Génie logiciel et systèmes d\'information'
];

export const getUniversitiesByType = (type: University['type']): University[] => {
  return universitiesData.filter(university => university.type === type);
};

export const getUniversitiesBySpecialty = (specialty: string): University[] => {
  if (specialty === 'All Specialties') {
    return universitiesData;
  }
  return universitiesData.filter(university => 
    university.specialties.includes(specialty)
  );
};

export const getUniversityById = (id: string): University | undefined => {
  return universitiesData.find(university => university.id === id);
};

export const searchUniversities = (query: string): University[] => {
  const lowercaseQuery = query.toLowerCase();
  return universitiesData.filter(university => 
    university.name.toLowerCase().includes(lowercaseQuery) ||
    university.fullName.toLowerCase().includes(lowercaseQuery) ||
    university.location.toLowerCase().includes(lowercaseQuery) ||
    university.specialties.some(specialty => specialty.toLowerCase().includes(lowercaseQuery)) ||
    university.detailedSpecialties.some(spec => 
      spec.name.toLowerCase().includes(lowercaseQuery) ||
      spec.code.toLowerCase().includes(lowercaseQuery)
    )
  );
};

// Helper function to get universities and specialties by license
export const getUniversitiesByLicense = (license: string) => {
  return universitiesData
    .map(university => {
      const matchingSpecialties = university.detailedSpecialties.filter(
        spec => {
          // Handle both string and array license types
          if (Array.isArray(spec.license)) {
            return spec.license.includes(license);
          }
          return spec.license === license;
        }
      );
      if (matchingSpecialties.length > 0) {
        return {
          university,
          specialties: matchingSpecialties
        };
      }
      return null;
    })
    .filter(Boolean);
};