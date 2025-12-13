// CCNA 1 v7.0 Questions de Quiz - Version Française Officielle
// Extrait de l'examen final CCNA Introduction aux Réseaux
// Source: itexamanswers.net - Traduit en français
// Total: 160 questions avec images

export interface CCNAQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswers: number[];
    type: 'single' | 'multiple' | 'matching';
    explanation: string;
    imageUrl?: string;
    // Pour le type matching
    leftItems?: string[];
    rightItems?: string[];
    correctMatches?: { [leftIndex: number]: number };
}

export const ccnaQuestions: CCNAQuestion[] = [
    {
        id: 1,
        question: "Quels sont les deux types de trafic qui utilisent le protocole de transport en temps réel (RTP) ? (Choisissez-en deux.)",
        options: ["vidéo", "Web", "transfert de fichiers", "voix", "pair à pair"],
        correctAnswers: [0, 3],
        type: 'multiple',
        explanation: "RTP est utilisé pour le trafic en temps réel comme la vidéo et la voix."
    },
    {
        id: 2,
        question: "Quelle technologie sans fil a de faibles exigences en matière de puissance et de débit de données, ce qui la rend populaire dans les applications domotiques ?",
        options: ["ZigBee", "LoRaWAN", "5G", "Wi-Fi"],
        correctAnswers: [0],
        type: 'single',
        explanation: "ZigBee est une norme sans fil IEEE 802.15.4 conçue pour créer des réseaux personnels. Les faibles exigences en matière d'énergie, de puissance et de débit de données font de Zigbee un protocole populaire pour connecter des appareils domotiques."
    },
    {
        id: 3,
        question: "Quelle couche du modèle TCP/IP fournit un itinéraire pour transmettre des messages via un réseau ?",
        options: ["application", "accès réseau", "Internet", "transport"],
        correctAnswers: [2],
        type: 'single',
        explanation: "La couche réseau du modèle OSI correspond directement à la couche Internet du modèle TCP/IP et est utilisée pour décrire les protocoles qui adressent et acheminent les messages via un réseau."
    },
    {
        id: 4,
        question: "Quel type de serveur s'appuie sur des types d'enregistrements tels que A, NS, AAAA et MX pour fournir des services ?",
        options: ["DNS", "email", "fichier", "Web"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Un serveur DNS stocke les enregistrements utilisés pour résoudre les adresses IP en noms d'hôtes. A – une adresse IPv4, NS – un serveur de noms faisant autorité, AAAA – une adresse IPv6, MX – un enregistrement d'échange de courrier."
    },
    {
        id: 5,
        question: "Que sont les protocoles propriétaires ?",
        options: ["protocoles développés par des organisations privées pour fonctionner sur n'importe quel matériel fournisseur", "protocoles qui peuvent être librement utilisés par n'importe quelle organisation ou fournisseur", "protocoles développés par des organisations qui ont le contrôle de leur définition et de leur fonctionnement", "un ensemble de protocoles connu sous le nom de suite de protocoles TCP/IP"],
        correctAnswers: [2],
        type: 'single',
        explanation: "Les protocoles propriétaires ont leur définition et leur fonctionnement contrôlés par une seule entreprise ou un seul fournisseur. Certains d'entre eux peuvent être utilisés par différentes organisations avec l'autorisation du propriétaire. La suite de protocoles TCP/IP est une norme ouverte et non un protocole propriétaire."
    },
    {
        id: 6,
        question: "Quel service est fourni par DNS ?",
        options: ["Résout les noms de domaine, tels que cisco.com, en adresses IP.", "Un ensemble de règles de base pour l'échange de texte, d'images graphiques, de son, de vidéo et d'autres fichiers multimédias sur le Web.", "Permet les transferts de données entre un client et un serveur de fichiers.", "Utilise le cryptage pour sécuriser l'échange de texte, d'images graphiques, de son et de vidéo sur le Web."],
        correctAnswers: [0],
        type: 'single',
        explanation: "DNS (Domain Name System) résout les noms de domaine en adresses IP."
    },
    {
        id: 7,
        question: "Un paquet client est reçu par un serveur. Le paquet a un numéro de port de destination de 110. Quel service le client demande-t-il ?",
        options: ["DNS", "DHCP", "SMTP", "POP3"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Le port 110 est utilisé par POP3 (Post Office Protocol version 3) pour la récupération des emails."
    },
    {
        id: 8,
        question: "Quelle commande peut être utilisée sur un PC Windows pour voir la configuration IP de cet ordinateur ?",
        options: ["afficher brièvement l'interface IP", "ping", "afficher les interfaces", "ipconfig"],
        correctAnswers: [3],
        type: 'single',
        explanation: "La commande ipconfig est utilisée sur Windows pour afficher la configuration IP."
    },
    {
        id: 9,
        question: "Une imprimante laser filaire est connectée à un ordinateur personnel. Cette imprimante a été partagée afin que d'autres ordinateurs du réseau domestique puissent également l'utiliser. Quel modèle de réseautage est utilisé ?",
        options: ["basé sur le client", "maître-esclave", "point à point", "peer-to-peer (P2P)"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Les réseaux peer-to-peer (P2P) disposent de deux ou plusieurs périphériques réseau qui peuvent partager des ressources telles que des imprimantes ou des fichiers sans disposer d'un serveur dédié."
    },
    {
        id: 10,
        question: "Quelle caractéristique décrit un virus ?",
        options: ["un périphérique réseau qui filtre l'accès et le trafic entrant dans un réseau", "l'utilisation d'identifiants volés pour accéder à des données privées", "une attaque qui ralentit ou fait planter un appareil ou un service réseau", "logiciel ou code malveillant exécuté sur un périphérique final"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Un virus est un logiciel ou code malveillant qui s'exécute sur un périphérique final."
    },
    {
        id: 11,
        question: "Trois employés de banque utilisent le réseau d'entreprise. Le premier employé utilise un navigateur Web pour consulter la page Web d'une entreprise afin de lire certaines annonces. Le deuxième employé accède à la base de données de l'entreprise pour effectuer certaines transactions financières. Le troisième employé participe à une importante conférence audio en direct avec d'autres dirigeants d'entreprise dans les succursales. Si la QoS est implémentée sur ce réseau, quelles seront les priorités du plus élevé au plus bas des différents types de données ?",
        options: ["transactions financières, page web, audioconférence", "audioconférence, transactions financières, page web", "transactions financières, audioconférence, page web", "audioconférence, page web, transactions financières"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Les mécanismes de QoS permettent d'établir des stratégies de gestion des files d'attente qui imposent des priorités pour différentes catégories de données d'application. Ainsi, cette mise en file d'attente permet aux données vocales d'avoir la priorité sur les données de transaction, qui ont la priorité sur les données Web."
    },
    {
        id: 12,
        question: "Faites correspondre la description au composant d'adressage IPv6. (Toutes les options ne sont pas utilisées.)",
        type: 'matching',
        leftItems: [
            "Cette partie de l'adresse est utilisée par une organisation pour identifier les sous-réseaux",
            "Cette partie réseau de l'adresse est attribuée par le fournisseur",
            "Cette partie de l'adresse est l'équivalent de la partie hôte d'une adresse IPv4"
        ],
        rightItems: [
            "global routing prefix",
            "subnet mask",
            "subnet ID",
            "interface ID"
        ],
        correctMatches: {
            0: 2,  // identifier les sous-réseaux → subnet ID
            1: 0,  // attribuée par le fournisseur → global routing prefix
            2: 3   // équivalent partie hôte → interface ID
        },
        options: [],
        correctAnswers: [],
        explanation: "Global routing prefix = attribué par le fournisseur, subnet ID = identifier les sous-réseaux, interface ID = équivalent partie hôte IPv4. Subnet mask n'est pas utilisé.",
        imageUrl: ""
    },
    {
        id: 13,
        question: "Se référer à l'exposition. Si Host1 devait transférer un fichier vers le serveur, quelles couches du modèle TCP/IP seraient utilisées ?",
        options: ["uniquement les couches application et Internet", "uniquement les couches d'accès Internet et réseau", "uniquement les couches d'application, Internet et d'accès au réseau", "couches d'application, de transport, Internet et d'accès au réseau", "uniquement les couches d'application, de transport, de réseau, de liaison de données et physiques", "application, session, transport, réseau, liaison de données et couches physiques"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Le modèle TCP/IP contient les couches d'application, de transport, d'Internet et d'accès au réseau. Un transfert de fichier utilise le protocole de couche application FTP. Les données passeraient de la couche application à travers toutes les couches du modèle et à travers le réseau jusqu'au serveur de fichiers.",
        imageUrl: "https://itexamanswers.net/wp-content/uploads/2016/03/i275370v1n1_275370-2.png"
    },
    {
        id: 14,
        question: "Faites correspondre la caractéristique à la méthode de transfert. (Toutes les options ne sont pas utilisées.)",
        type: 'matching',
        leftItems: [
            "stocke toujours l'intégralité de la trame",
            "vérifie le CRC avant de transmettre",
            "vérifie la longueur de la trame avant de transmettre",
            "ne retransmet pas les diffusions",
            "a une faible latence",
            "peut transmettre des trames tronquées (runt frames)",
            "commence le transfert lorsque l'adresse de destination est reçue"
        ],
        rightItems: [
            "cut-through",
            "store-and-forward"
        ],
        correctMatches: {
            0: 1,  // stocke l'intégralité → store-and-forward
            1: 1,  // vérifie CRC → store-and-forward
            2: 1,  // vérifie longueur → store-and-forward
            // 3: non utilisée (ne retransmet pas les diffusions)
            4: 0,  // faible latence → cut-through
            5: 0,  // trames tronquées → cut-through
            6: 0   // commence transfert → cut-through
        },
        options: [],
        correctAnswers: [],
        explanation: "Rakez !!!  ",
        imageUrl: ""
    },
    {
        id: 15,
        question: "Se référer à l'exposition. L'adresse IP de quelle interface de périphérique doit être utilisée comme paramètre de passerelle par défaut de l'hôte H1 ?",
        options: ["R1 : S0/0/0", "R2 : S0/0/1", "R1 : G0/0", "R2 : S0/0/0"],
        correctAnswers: [2],
        type: 'single',
        explanation: "La passerelle par défaut pour l'hôte H1 est l'interface du routeur qui est attachée au réseau local dont H1 est membre. Dans ce cas, il s'agit de l'interface G0/0 de R1. H1 doit être configuré avec l'adresse IP de cette interface dans ses paramètres d'adressage.",
        imageUrl: "https://itexamanswers.net/wp-content/uploads/2020/01/35.jpg"
    },
    {
        id: 16,
        question: "Quel service est fourni par Internet Messenger ?",
        options: ["Une application qui permet de discuter en temps réel entre utilisateurs distants.", "Permet l'accès à distance aux périphériques réseau et aux serveurs.", "Résout les noms de domaine, tels que cisco.com, en adresses IP.", "Utilise le cryptage pour fournir un accès à distance sécurisé aux périphériques réseau et aux serveurs."],
        correctAnswers: [0],
        type: 'single',
        explanation: "Internet Messenger est une application qui permet de discuter en temps réel entre utilisateurs distants."
    },
    {
        id: 17,
        question: "Se référer à l'exposition. Faites correspondre le réseau avec l'adresse IP et le préfixe corrects qui satisferont aux exigences d'adressage de l'hôte utilisable pour chaque réseau.",
        type: 'matching',
        leftItems: [
            "Network A",
            "Network B",
            "Network C",
            "Network D"
        ],
        rightItems: [
            "192.168.0.128/25",
            "192.168.0.0/26",
            "192.168.0.96/27",
            "192.168.0.80/30"
        ],
        correctMatches: {
            0: 0,  // Network A → 192.168.0.128/25
            1: 1,  // Network B → 192.168.0.0/26
            2: 2,  // Network C → 192.168.0.96/27
            3: 3   // Network D → 192.168.0.80/30
        },
        options: [],
        correctAnswers: [],
        explanation: "Network A → 192.168.0.128/25, Network B → 192.168.0.0/26, Network C → 192.168.0.96/27, Network D → 192.168.0.80/30.",
        imageUrl: "https://itexamanswers.net/wp-content/uploads/2020/01/i304956v6n1_207918.png"
    },
    {
        id: 18,
        question: "Se référer à l'exposition. Quel protocole était responsable de la construction du tableau affiché ?",
        options: ["DHCP", "ARP", "DNS", "ICMP"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Le tableau affiché correspond à la sortie de la commande arp -a, une commande utilisée sur un PC Windows pour afficher le tableau ARP.",
        imageUrl: "https://itexamanswers.net/wp-content/uploads/2020/01/2021-03-22_150538.jpg"
    },
    {
        id: 19,
        question: "Un administrateur réseau remarque que certains câbles Ethernet nouvellement installés transportent des signaux de données corrompus et déformés. Le nouveau câblage a été installé au plafond à proximité des lampes fluorescentes et des équipements électriques. Quels sont les deux facteurs qui peuvent interférer avec le câblage en cuivre et entraîner une distorsion du signal et une corruption des données ? (Choisissez-en deux.)",
        options: ["diaphonie", "longueur étendue du câblage", "RFI", "EMI", "atténuation du signal"],
        correctAnswers: [2, 3],
        type: 'multiple',
        explanation: "RFI (Radio Frequency Interference) et EMI (Electromagnetic Interference) peuvent interférer avec les câbles en cuivre installés près des lampes fluorescentes et des équipements électriques."
    },
    {
        id: 20,
        question: "Un hôte tente d'envoyer un paquet à un périphérique sur un segment LAN distant, mais il n'y a actuellement aucun mappage dans son cache ARP. Comment l'appareil obtiendra-t-il une adresse MAC de destination ?",
        options: ["Il enverra la trame et utilisera sa propre adresse MAC comme destination.", "Il enverra une requête ARP pour l'adresse MAC du périphérique de destination.", "Il enverra la trame avec une adresse MAC de diffusion.", "Il enverra une requête au serveur DNS pour l'adresse MAC de destination.", "Il enverra une requête ARP pour l'adresse MAC de la passerelle par défaut."],
        correctAnswers: [4],
        type: 'single',
        explanation: "Lorsqu'un hôte doit envoyer un paquet à un réseau distant, il doit d'abord obtenir l'adresse MAC de la passerelle par défaut via une requête ARP."
    },
    {
        id: 21,
        question: "Un paquet client est reçu par un serveur. Le paquet a un numéro de port de destination de 53. Quel service le client demande-t-il ?",
        options: ["DNS", "NetBIOS (NetBT)", "POP3", "IMAP"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Le port 53 est utilisé par DNS (Domain Name System)."
    },
    {
        id: 22,
        question: "Un administrateur réseau ajoute un nouveau réseau local à une succursale. Le nouveau réseau local doit prendre en charge 25 appareils connectés. Quel est le plus petit masque réseau que l'administrateur réseau peut utiliser pour le nouveau réseau ?",
        options: ["255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240"],
        correctAnswers: [2],
        type: 'single',
        explanation: "Pour 25 appareils, il faut au moins 5 bits d'hôte. Le masque 255.255.255.224 (/27) permet 30 adresses hôtes utilisables."
    },
    {
        id: 23,
        question: "Quelle caractéristique décrit un cheval de Troie ?",
        options: ["logiciel ou code malveillant exécuté sur un périphérique final", "une attaque qui ralentit ou fait planter un appareil ou un service réseau", "l'utilisation d'identifiants volés pour accéder à des données privées", "un périphérique réseau qui filtre l'accès et le trafic entrant dans un réseau"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Un cheval de Troie est un logiciel ou code malveillant qui s'exécute sur un périphérique final, souvent déguisé en programme légitime."
    },
    {
        id: 24,
        question: "Quel service est fourni par HTTPS ?",
        options: ["Utilise le cryptage pour fournir un accès à distance sécurisé aux périphériques réseau et aux serveurs.", "Résout les noms de domaine, tels que cisco.com, en adresses IP.", "Utilise le cryptage pour sécuriser l'échange de texte, d'images graphiques, de son et de vidéo sur le Web.", "Permet l'accès à distance aux périphériques réseau et aux serveurs."],
        correctAnswers: [2],
        type: 'single',
        explanation: "HTTPS utilise le cryptage pour sécuriser l'échange de texte, d'images graphiques, de son et de vidéo sur le Web."
    },
    {
        id: 25,
        question: "Un technicien équipé d'un PC utilise plusieurs applications lorsqu'il est connecté à Internet. Comment le PC est-il capable de suivre le flux de données entre plusieurs sessions d'application et de faire en sorte que chaque application reçoive les flux de paquets corrects ?",
        options: ["Le flux de données est suivi en fonction de l'adresse MAC de destination du PC du technicien.", "Le flux de données est suivi en fonction du numéro de port source utilisé par chaque application.", "Le flux de données est suivi en fonction de l'adresse IP source utilisée par le PC du technicien.", "Le flux de données est suivi en fonction de l'adresse IP de destination utilisée par le PC du technicien."],
        correctAnswers: [1],
        type: 'single',
        explanation: "Le numéro de port source d'une application est généré de manière aléatoire et utilisé pour suivre individuellement chaque session se connectant à Internet. Chaque application utilisera un numéro de port source unique pour fournir une communication simultanée à partir de plusieurs applications via Internet."
    },
    {
        id: 26,
        question: "Quels sont les deux protocoles qui fonctionnent à la couche supérieure de la suite de protocoles TCP/IP ? (Choisissez-en deux.)",
        options: ["TCP", "IP", "UDP", "POP", "DNS", "Ethernet"],
        correctAnswers: [3, 4],
        type: 'multiple',
        explanation: "POP et DNS fonctionnent à la couche application, qui est la couche supérieure de la suite de protocoles TCP/IP."
    },
    {
        id: 27,
        question: "Un administrateur réseau ajoute un nouveau réseau local à une succursale. Le nouveau réseau local doit prendre en charge 61 appareils connectés. Quel est le plus petit masque réseau que l'administrateur réseau peut utiliser pour le nouveau réseau ?",
        options: ["255.255.255.240", "255.255.255.224", "255.255.255.192", "255.255.255.128"],
        correctAnswers: [2],
        type: 'single',
        explanation: "Pour 61 appareils, il faut au moins 6 bits d'hôte. Le masque 255.255.255.192 (/26) permet 62 adresses hôtes utilisables."
    },
    {
        id: 28,
        question: "Se référer à l'exposition. Faites correspondre le réseau avec l'adresse IP et le préfixe corrects qui satisferont aux exigences d'adressage de l'hôte utilisable pour chaque réseau. (Toutes les options ne sont pas utilisées.)",
        type: 'matching',
        leftItems: [
            "Network A",
            "Network B",
            "Network C",
            "Network D"
        ],
        rightItems: [
            "192.168.0.0/25",
            "192.168.0.128/26",
            "192.168.0.192/27",
            "192.168.0.224/30"
        ],
        correctMatches: {
            0: 0,  // Network A → 192.168.0.0/25
            1: 1,  // Network B → 192.168.0.128/26
            2: 2,  // Network C → 192.168.0.192/27
            3: 3   // Network D → 192.168.0.224/30
        },
        options: [],
        correctAnswers: [],
        explanation: "Network A → 192.168.0.0/25 (128 adresses), Network B → 192.168.0.128/26 (64 adresses), Network C → 192.168.0.192/27 (32 adresses), Network D → 192.168.0.224/30 (4 adresses).",
        imageUrl: "https://itexamanswers.net/wp-content/uploads/2016/03/i207918v1n1_207918-1-1.jpg"
    },
    {
        id: 29,
        question: "Un utilisateur envoie une requête HTTP à un serveur Web sur un réseau distant. Lors de l'encapsulation de cette requête, quelles informations sont ajoutées au champ d'adresse d'une trame pour indiquer la destination ?",
        options: ["l'adresse MAC de la passerelle par défaut", "l'adresse IP du serveur de destination", "l'adresse MAC de l'hôte de destination", "l'adresse IP de la passerelle par défaut"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Une trame est encapsulée avec l'adresse MAC de la passerelle par défaut comme destination pour atteindre un réseau distant."
    },
    {
        id: 30,
        question: "Faites correspondre les protocoles d'application aux protocoles de transport appropriés.",
        type: 'matching',
        leftItems: [
            "FTP",
            "HTTP",
            "DHCP",
            "SMTP",
            "TFTP"
        ],
        rightItems: [
            "TCP",
            "UDP"
        ],
        correctMatches: {
            0: 0,  // FTP → TCP
            1: 0,  // HTTP → TCP
            2: 1,  // DHCP → UDP
            3: 0,  // SMTP → TCP
            4: 1   // TFTP → UDP
        },
        options: [],
        correctAnswers: [],
        explanation: "FTP, HTTP et SMTP utilisent TCP pour la fiabilité. DHCP et TFTP utilisent UDP pour leur simplicité.",
        imageUrl: ""
    },
    {

        id: 31,
        question: "Quel service est fourni par SMTP ?",
        options: ["Permet aux clients d'envoyer des e-mails à un serveur de messagerie et aux serveurs d'envoyer des e-mails à d'autres serveurs.", "Permet l'accès à distance aux périphériques réseau et aux serveurs.", "Utilise le cryptage pour fournir un accès à distance sécurisé aux périphériques réseau et aux serveurs.", "Une application qui permet de discuter en temps réel entre utilisateurs distants."],
        correctAnswers: [0],
        type: 'single',
        explanation: "SMTP (Simple Mail Transfer Protocol) permet aux clients d'envoyer des emails à un serveur de messagerie."
    },
    {
        id: 32,
        question: "Quel scénario décrit une fonction fournie par la couche transport ?",
        options: ["Un élève utilise un téléphone VoIP en classe pour appeler chez lui. L'identifiant unique gravé dans le téléphone est une adresse de couche transport utilisée pour contacter un autre périphérique réseau sur le même réseau.", "Un étudiant joue un court métrage en ligne avec du son. Le film et le son sont codés dans l'en-tête de la couche de transport.", "Un étudiant dispose de deux fenêtres de navigateur Web ouvertes pour accéder à deux sites Web. La couche de transport garantit que la bonne page Web est livrée à la bonne fenêtre de navigateur.", "Un travailleur d'entreprise accède à un serveur Web situé sur un réseau d'entreprise. La couche de transport formate l'écran afin que la page Web apparaisse correctement, quel que soit l'appareil utilisé pour afficher le site Web."],
        correctAnswers: [2],
        type: 'single',
        explanation: "Les numéros de port source et de destination sont utilisés pour identifier l'application et la fenêtre correctes au sein de cette application."
    },
    {
        id: 33,
        question: "Se référer à l'exposition. L'hôte B sur le sous-réseau Enseignants transmet un paquet à l'hôte D sur le sous-réseau Étudiants. Quelles adresses de couche 2 et de couche 3 sont contenues dans les PDU transmises de l'hôte B au routeur ?",
        options: ["Adresse de destination de la couche 2 = 00-00-0c-94-36-ab, Adresse source de la couche 2 = 00-00-0c-94-36-bb, Adresse de destination de la couche 3 = 172.16.20.200, Adresse source de la couche 3 = 172.16.10.200", "Adresse de destination de la couche 2 = 00-00-0c-94-36-dd, Adresse source de la couche 2 = 00-00-0c-94-36-bb, Adresse de destination de la couche 3 = 172.16.20.200, Adresse source de la couche 3 = 172.16.10.200", "Adresse de destination de la couche 2 = 00-00-0c-94-36-cd, Adresse source de la couche 2 = 00-00-0c-94-36-bb, Adresse de destination de la couche 3 = 172.16.20.99, Adresse source de la couche 3 = 172.16.10.200", "Adresse de destination de la couche 2 = 00-00-0c-94-36-ab, Adresse source de la couche 2 = 00-00-0c-94-36-bb, Adresse de destination de la couche 3 = 172.16.20.200, Adresse source de la couche 3 = 172.16.100.200"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Lorsqu'un hôte envoie un paquet vers un réseau distant, l'adresse MAC de destination est celle de la passerelle par défaut (routeur), tandis que les adresses IP restent celles de la source et destination finales.",
        imageUrl: "https://itexamanswers.net/wp-content/uploads/2020/01/i204796v11n1_204796-TOPOLOGY-ARP.png"
    },
    {
        id: 34,
        question: "Que signifie le terme \"atténuation\" dans la communication de données ?",
        options: ["renforcement d'un signal par un dispositif réseau", "fuite de signaux d'une paire de câbles à une autre", "il est temps qu'un signal atteigne sa destination", "perte de force du signal à mesure que la distance augmente"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Les données sont transmises sur des câbles en cuivre sous forme d'impulsions électriques. Plus le signal se déplace loin, plus il se détériore. C'est ce qu'on appelle l'atténuation du signal."
    },
    {
        id: 35,
        question: "Se référer à l'exposition. Un administrateur tente de configurer le commutateur mais reçoit le message d'erreur affiché dans l'illustration. Quel est le problème ?",
        options: ["L'intégralité de la commande, configurer le terminal, doit être utilisée.", "L'administrateur est déjà en mode de configuration globale.", "L'administrateur doit d'abord entrer en mode EXEC privilégié avant d'émettre la commande.", "L'administrateur doit se connecter via le port console pour accéder au mode de configuration global."],
        correctAnswers: [2],
        type: 'single',
        explanation: "L'administrateur doit d'abord entrer en mode EXEC privilégié (enable) avant de pouvoir accéder au mode de configuration globale.",
        imageUrl: "https://itexamanswers.net/wp-content/uploads/2020/01/i208399v1n1_Question-1.png"
    },
    {
        id: 36,
        question: "Quels sont les deux protocoles qui fonctionnent à la couche supérieure de la suite de protocoles TCP/IP ? (Choisissez-en deux.)",
        options: ["TCP", "IP", "UDP", "POP", "DNS", "Ethernet"],
        correctAnswers: [3, 4],
        type: 'multiple',
        explanation: "POP et DNS fonctionnent à la couche application, qui est la couche supérieure de la suite de protocoles TCP/IP."
    },
    {
        id: 37,
        question: "Une entreprise dispose d'un serveur de fichiers qui partage un dossier nommé Public. La politique de sécurité du réseau spécifie que les droits de lecture seule sont attribués au dossier public à toute personne pouvant se connecter au serveur tandis que les droits d'édition sont attribués uniquement au groupe d'administrateurs réseau. Quel composant est abordé dans le cadre de service réseau AAA ?",
        options: ["automations", "comptabilité", "authentification", "autorisation"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Une fois qu'un utilisateur est authentifié avec succès (connecté au serveur), l'autorisation est le processus permettant de déterminer à quelles ressources réseau l'utilisateur peut accéder et quelles opérations l'utilisateur peut effectuer."
    },
    {
        id: 38,
        question: "Quelles sont les trois exigences définies par les protocoles utilisés dans les communications réseau pour permettre la transmission de messages sur un réseau ? (Choisissez-en trois.)",
        options: ["taille du message", "codage des messages", "spécifications du connecteur", "sélection des médias", "options de livraison", "installation de l'appareil final"],
        correctAnswers: [0, 1, 4],
        type: 'multiple',
        explanation: "La taille du message, le codage des messages et les options de livraison sont des exigences définies par les protocoles de communication réseau."
    },
    {
        id: 39,
        question: "Quelles sont les deux caractéristiques de la propriété intellectuelle (IP) ? (Choisissez-en deux.)",
        options: ["ne nécessite pas de connexion de bout en bout dédiée", "fonctionne indépendamment des médias du réseau", "retransmet les paquets si des erreurs se produisent", "réassemble les paquets dans le désordre dans le bon ordre à l'extrémité du récepteur", "garantit la livraison des paquets"],
        correctAnswers: [0, 1],
        type: 'multiple',
        explanation: "Le protocole Internet (IP) est un protocole sans connexion et basé sur le meilleur effort. Cela signifie que l'IP ne nécessite aucune connexion de bout en bout et fonctionne indépendamment du support réseau transportant les paquets."
    },
    {
        id: 40,
        question: "Un employé d'une grande entreprise se connecte à distance à l'entreprise en utilisant le nom d'utilisateur et le mot de passe appropriés. L'employé assiste à une importante vidéoconférence avec un client concernant une vente importante. Il est important que la qualité vidéo soit excellente pendant la réunion. L'employé ignore qu'après une connexion réussie, la connexion au FAI de l'entreprise a échoué. La connexion secondaire s'est cependant activée en quelques secondes. La perturbation n'a pas été remarquée par l'employé ni par les autres employés. Quelles sont les trois caractéristiques du réseau décrites dans ce scénario ? (Choisissez-en trois.)",
        options: ["sécurité", "qualité de service", "évolutivité", "réseau électrique", "intégrité", "tolérance aux pannes"],
        correctAnswers: [0, 1, 5],
        type: 'multiple',
        explanation: "Les noms d'utilisateur et les mots de passe sont liés à la sécurité du réseau. Une vidéo de bonne qualité consiste à donner la priorité au trafic vidéo avec la qualité de service (QoS). Le fait qu'une connexion à un FAI ait échoué puis ait été rétablie mais soit passée inaperçue est lié à la tolérance aux pannes."
    },
    {
        id: 41,
        question: "Quelles sont les deux causes courantes de dégradation du signal lors de l'utilisation du câblage UTP ? (Choisissez-en deux.)",
        options: ["résiliation abusive", "blindage de mauvaise qualité dans le câble", "installation de câbles dans un conduit", "câble ou connecteurs de mauvaise qualité", "perte de lumière sur de longues distances"],
        correctAnswers: [0, 3],
        type: 'multiple',
        explanation: "Lorsqu'il est mal terminé, chaque câble est une source potentielle de dégradation des performances de la couche physique. Un câble ou des connecteurs de mauvaise qualité peuvent également causer des problèmes."
    },
    {
        id: 42,
        question: "Quel sous-réseau inclurait l'adresse 192.168.1.96 comme adresse hôte utilisable ?",
        options: ["192.168.1.64/26", "192.168.1.32/27", "192.168.1.32/28", "192.168.1.64/29"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Pour le sous-réseau de 192.168.1.64/26, il y a 6 bits pour les adresses hôtes, ce qui donne 64 adresses possibles. La plage d'adresses hôtes pour ce sous-réseau est de 192.168.1.65 à 192.168.1.126."
    },
    {
        id: 43,
        question: "Se référer à l'exposition. Sur la base du résultat, quelles sont les deux affirmations correctes concernant la connectivité réseau ? (Choisissez-en deux.)",
        options: ["Cet hôte n'a pas de passerelle par défaut configurée.", "Il y a 4 sauts entre cet appareil et l'appareil à 192.168.100.1.", "Il existe une connectivité entre cet appareil et l'appareil à 192.168.100.1.", "La connectivité entre ces deux hôtes permet des appels par vidéoconférence.", "Le temps de transmission moyen entre les deux hôtes est de 2 millisecondes."],
        correctAnswers: [1, 2],
        type: 'multiple',
        explanation: "La sortie affiche une connexion de couche 3 réussie entre un ordinateur hôte et un hôte à 192.168.100.1. On peut déterminer qu'il existe 4 sauts entre eux.",
        imageUrl: "https://itexamanswers.net/wp-content/uploads/2020/01/i275429v1n1_chapter-9-WAN-images2.jpg"
    },
    {
        id: 44,
        question: "Quelles sont les deux affirmations décrivant comment évaluer les modèles de flux de trafic et les types de trafic réseau à l'aide d'un analyseur de protocole ? (Choisissez-en deux.)",
        options: ["Captez le trafic le week-end, lorsque la plupart des employés sont en congé.", "Capturez le trafic pendant les périodes de pointe d'utilisation pour obtenir une bonne représentation des différents types de trafic.", "Ne capturez le trafic que dans les zones du réseau qui reçoivent la majeure partie du trafic, comme le centre de données.", "Effectuez la capture sur différents segments de réseau.", "Ne capturez que le trafic WAN, car le trafic vers le Web est responsable de la plus grande quantité de trafic sur un réseau."],
        correctAnswers: [1, 3],
        type: 'multiple',
        explanation: "Les modèles de flux de trafic doivent être recueillis pendant les périodes de pointe d'utilisation afin d'obtenir une bonne représentation des différents types de trafic. La capture doit également être effectuée sur différents segments de réseau."
    },
    {
        id: 45,
        question: "Quelle est la conséquence de la configuration d'un routeur avec le routage de monodiffusion IPv6 ?",
        options: ["Toutes les interfaces du routeur seront automatiquement activées.", "Les interfaces de routeur compatibles IPv6 commencent à envoyer des messages publicitaires de routeur ICMPv6.", "Chaque interface de routeur générera une adresse locale de liaison IPv6.", "Il crée statiquement une adresse unicast globale sur ce routeur."],
        correctAnswers: [1],
        type: 'single',
        explanation: "Lorsque le routage unicast IPv6 est activé, les interfaces de routeur compatibles IPv6 commencent à envoyer des messages de publicité de routeur ICMPv6."
    },
    {
        id: 46,
        question: "Quelles sont les trois couches du modèle OSI qui correspondent à la couche application du modèle TCP/IP ? (Choisissez-en trois.)",
        options: ["application", "réseau", "liaison de données", "session", "présentation", "transport"],
        correctAnswers: [0, 3, 4],
        type: 'multiple',
        explanation: "Les trois couches supérieures du modèle OSI : application, présentation et session correspondent à la couche application du modèle TCP/IP."
    },
    {
        id: 47,
        question: "Se référer à l'exposition. Si PC1 envoie un paquet à PC2 et que le routage a été configuré entre les deux routeurs, que fera R1 avec l'en-tête de trame Ethernet attaché par PC1 ?",
        options: ["rien, car le routeur dispose d'un itinéraire vers le réseau de destination", "ouvrez l'en-tête et utilisez-le pour déterminer si les données doivent être envoyées S0/0/0", "ouvrez l'en-tête et remplacez l'adresse MAC de destination par une nouvelle", "supprimez l'en-tête Ethernet et configurez un nouvel en-tête de couche 2 avant de l'envoyer S0/0/0"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Lorsque PC1 forme les différents en-têtes attachés aux données, l'un de ces en-têtes est l'en-tête de couche 2. Lorsque R1 obtient ces informations, le routeur supprime l'en-tête de couche 2 et en crée un nouveau pour le type de réseau sur lequel les données seront placées (la liaison série).",
        imageUrl: "https://itexamanswers.net/wp-content/uploads/2020/01/i271152v1n1_271152.png"
    },
    {
        id: 48,
        question: "Que se passera-t-il si l'adresse de passerelle par défaut est mal configurée sur un hôte ?",
        options: ["L'hôte ne peut pas communiquer avec d'autres hôtes du réseau local.", "L'hôte ne peut pas communiquer avec les hôtes d'autres réseaux.", "Un ping de l'hôte vers 127.0.0.1 ne réussirait pas.", "L'hôte devra utiliser ARP pour déterminer l'adresse correcte de la passerelle par défaut.", "Le commutateur ne transmettra pas les paquets initiés par l'hôte."],
        correctAnswers: [1],
        type: 'single',
        explanation: "Si l'adresse de passerelle par défaut est mal configurée, l'hôte ne pourra pas communiquer avec les hôtes d'autres réseaux, mais pourra toujours communiquer localement."
    },
    {
        id: 49,
        question: "Quelles sont les deux caractéristiques de l'ARP ? (Choisissez-en deux.)",
        options: ["Lorsqu'un hôte encapsule un paquet dans une trame, il fait référence à la table d'adresses MAC pour déterminer le mappage des adresses IP aux adresses MAC.", "Une requête ARP est envoyée à tous les appareils du réseau local Ethernet et contient l'adresse IP de l'hôte de destination et son adresse MAC de multidiffusion.", "Si un hôte est prêt à envoyer un paquet à un périphérique de destination local et qu'il possède l'adresse IP mais pas l'adresse MAC de la destination, il génère une diffusion ARP.", "Si aucun périphérique ne répond à la demande ARP, le nœud d'origine diffusera le paquet de données à tous les périphériques du segment de réseau.", "Si un appareil recevant une requête ARP possède l'adresse IPv4 de destination, il répond par une réponse ARP."],
        correctAnswers: [2, 4],
        type: 'multiple',
        explanation: "ARP génère une diffusion pour trouver l'adresse MAC correspondant à une adresse IP, et les appareils avec l'adresse IP de destination répondent par une réponse ARP."
    },
    {
        id: 50,
        question: "Un administrateur réseau ajoute un nouveau réseau local à une succursale. Le nouveau réseau local doit prendre en charge 90 appareils connectés. Quel est le plus petit masque réseau que l'administrateur réseau peut utiliser pour le nouveau réseau ?",
        options: ["255.255.255.128", "255.255.255.240", "255.255.255.248", "255.255.255.224"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Pour 90 appareils, il faut au moins 7 bits d'hôte. Le masque 255.255.255.128 (/25) permet 126 adresses hôtes utilisables."
    },
    {
        id: 51,
        question: "Quels sont les deux messages ICMPv6 qui ne sont pas présents dans ICMP pour IPv4 ? (Choisissez-en deux.)",
        options: ["Sollicitation de voisin", "Destination inaccessible", "Confirmation de l'hôte", "Temps dépassé", "Publicité sur le routeur", "Redirection d'itinéraire"],
        correctAnswers: [0, 4],
        type: 'multiple',
        explanation: "La Sollicitation de voisin et la Publicité sur le routeur sont des messages ICMPv6 spécifiques qui n'existent pas dans ICMP pour IPv4."
    },
    {
        id: 52,
        question: "Un paquet client est reçu par un serveur. Le paquet a un numéro de port de destination de 80. Quel service le client demande-t-il ?",
        options: ["DHCP", "SMTP", "DNS", "HTTP"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Le port 80 est utilisé par HTTP (Hypertext Transfer Protocol) pour le trafic Web."
    },
    {
        id: 53,
        question: "Quel est l'avantage pour les petites organisations d'adopter l'IMAP au lieu du POP ?",
        options: ["POP permet uniquement au client de stocker des messages de manière centralisée, tandis qu'IMAP permet un stockage distribué.", "Les messages sont conservés sur les serveurs de messagerie jusqu'à ce qu'ils soient supprimés manuellement du client de messagerie.", "Lorsque l'utilisateur se connecte à un serveur POP, des copies des messages sont conservées sur le serveur de messagerie pendant une courte période, mais IMAP les conserve longtemps.", "IMAP envoie et récupère les e-mails, mais POP récupère uniquement les e-mails."],
        correctAnswers: [1],
        type: 'single',
        explanation: "IMAP et POP sont des protocoles utilisés pour récupérer des messages électroniques. L'avantage d'utiliser IMAP au lieu de POP est que les messages sont conservés sur les serveurs de messagerie jusqu'à ce que l'utilisateur les supprime manuellement."
    },
    {
        id: 54,
        question: "Un technicien peut envoyer un ping à l'adresse IP du serveur Web d'une entreprise distante, mais ne peut pas envoyer un ping réussi à l'adresse URL du même serveur Web. Quel utilitaire logiciel le technicien peut-il utiliser pour diagnostiquer le problème ?",
        options: ["tracert", "ipconfig", "netstat", "nslookup"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Nslookup est un utilitaire qui permet à l'utilisateur d'interroger manuellement les serveurs de noms pour résoudre un nom d'hôte donné. Cet utilitaire peut être utilisé pour résoudre les problèmes de résolution de noms."
    },
    {
        id: 55,
        question: "Quelles sont les deux fonctions exécutées sur la sous-couche LLC de la couche de liaison de données OSI pour faciliter la communication Ethernet ? (Choisissez-en deux.)",
        options: ["implémente CSMA/CD sur un support semi-duplex partagé existant", "permet à IPv4 et IPv6 d'utiliser le même support physique", "intègre les flux de couche 2 entre 10 Gigabit Ethernet sur fibre et 1 Gigabit Ethernet sur cuivre", "implémente un processus pour délimiter les champs dans une trame Ethernet 2", "place des informations dans la trame Ethernet qui identifient quel protocole de couche réseau est encapsulé par la trame"],
        correctAnswers: [1, 4],
        type: 'multiple',
        explanation: "La sous-couche LLC place des informations dans la trame qui identifient quel protocole de couche réseau est utilisé et permet à IPv4 et IPv6 d'utiliser la même interface réseau et le même support."
    },
    {
        id: 56,
        question: "La commande de configuration globale 'ip default-gateway 172.16.100.1' est appliquée à un switch. Quel est l'effet de cette commande ?",
        options: ["Le commutateur peut communiquer avec d'autres hôtes sur le réseau 172.16.100.0.", "Le commutateur peut être géré à distance depuis un hôte sur un autre réseau.", "Le commutateur est limité à l'envoi et à la réception de trames vers et depuis la passerelle 172.16.100.1.", "Le commutateur aura une interface de gestion avec l'adresse 172.16.100.1."],
        correctAnswers: [1],
        type: 'single',
        explanation: "Une adresse de passerelle par défaut est généralement configurée sur tous les appareils pour leur permettre de communiquer au-delà de leur seul réseau local. Dans un commutateur, cela permet la gestion à distance depuis un autre réseau."
    },
    {
        id: 57,
        question: "Que se passe-t-il lorsque la commande 'transport input ssh' est entrée sur les lignes vty du commutateur ?",
        options: ["Le client SSH sur le commutateur est activé.", "Le commutateur nécessite une combinaison nom d'utilisateur/mot de passe pour un accès à distance.", "La communication entre le commutateur et les utilisateurs distants est cryptée.", "Le commutateur nécessite des connexions à distance via un logiciel client propriétaire."],
        correctAnswers: [2],
        type: 'single',
        explanation: "La commande transport input ssh lorsqu'elle est saisie sur le commutateur vty cryptera toutes les connexions entrantes."
    },
    {
        id: 58,
        question: "Faites correspondre le type de menace avec la cause.",
        type: 'matching',
        leftItems: [
            "electrical threats (menaces électriques)",
            "hardware threats (menaces matérielles)",
            "environmental threats (menaces environnementales)",
            "maintenance threats (menaces de maintenance)"
        ],
        rightItems: [
            "temperature extremes or humidity extremes (extrêmes de température ou d'humidité)",
            "poor handling of electrical components, lack of spare parts (mauvaise manipulation, manque de pièces)",
            "voltage spikes, brownouts, noise, power loss (pics de tension, brownouts, bruit, perte de puissance)",
            "physical damage to servers, routers, switches (dommages physiques aux serveurs, routeurs)"
        ],
        correctMatches: {
            0: 2,  // electrical threats → voltage spikes
            1: 3,  // hardware threats → physical damage
            2: 0,  // environmental threats → temperature extremes
            3: 1   // maintenance threats → poor handling
        },
        options: [],
        correctAnswers: [],
        explanation: "Electrical threats = pics de tension, brownouts; Hardware threats = dommages physiques; Environmental threats = extrêmes de température/humidité; Maintenance threats = mauvaise manipulation des composants.",
        imageUrl: ""
    },
    {
        id: 59,
        question: "Un employé mécontent utilise des outils de réseau sans fil gratuits pour déterminer des informations sur les réseaux sans fil de l'entreprise. Cette personne envisage d'utiliser ces informations pour pirater le réseau sans fil. De quel type d'attaque s'agit-il ?",
        options: ["DoS", "accès", "reconnaissance", "Cheval de Troie"],
        correctAnswers: [2],
        type: 'single',
        explanation: "Une attaque de reconnaissance est la découverte et la documentation non autorisées de divers réseaux informatiques, systèmes de réseau, ressources, applications, services ou vulnérabilités."
    },
    {
        id: 60,
        question: "Quel service est fourni par HTTP ?",
        options: ["Utilise le cryptage pour sécuriser l'échange de texte, d'images graphiques, de son et de vidéo sur le Web.", "Permet les transferts de données entre un client et un serveur de fichiers.", "Une application qui permet de discuter en temps réel entre utilisateurs distants.", "Un ensemble de règles de base pour l'échange de texte, d'images graphiques, de son, de vidéo et d'autres fichiers multimédias sur le Web."],
        correctAnswers: [3],
        type: 'single',
        explanation: "HTTP (Hypertext Transfer Protocol) est un ensemble de règles de base pour l'échange de texte, d'images graphiques, de son, de vidéo et d'autres fichiers multimédias sur le Web."
    },
    {
        id: 61,
        question: "Un paquet client est reçu par un serveur. Le paquet a un numéro de port de destination de 67. Quel service le client demande-t-il ?",
        options: ["FTP", "DHCP", "Telnet", "SSH"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Le port 67 est utilisé par DHCP (Dynamic Host Configuration Protocol) pour les demandes de configuration d'adresses IP."
    },
    {
        id: 62,
        question: "Quels sont les deux problèmes qui peuvent être causés par un grand nombre de messages de demande et de réponse ARP ? (Choisissez-en deux.)",
        options: ["Les commutateurs deviennent surchargés car ils concentrent tout le trafic des sous-réseaux connectés.", "La requête ARP est envoyée sous forme de diffusion et inondera l'ensemble du sous-réseau.", "Le réseau peut être surchargé car les messages de réponse ARP ont une charge utile très importante.", "Un grand nombre de messages de demande et de réponse ARP peuvent ralentir le processus de commutation.", "Tous les messages de requête ARP doivent être traités par tous les nœuds du réseau local."],
        correctAnswers: [1, 4],
        type: 'multiple',
        explanation: "Les requêtes ARP sont envoyées sous forme de diffusions. Tous les nœuds les recevront et ils seront traités par logiciel, interrompant ainsi le processeur."
    },
    {
        id: 63,
        question: "Un groupe de PC Windows dans un nouveau sous-réseau a été ajouté à un réseau Ethernet. Lors du test de connectivité, un technicien constate que ces PC peuvent accéder aux ressources du réseau local mais pas aux ressources Internet.Pour résoudre le problème, le technicien souhaite d'abord confirmer l'adresse IP et les configurations DNS sur les PC, et également vérifier la connectivité au routeur local. Quelles sont les trois commandes et utilitaires Windows CLI qui fourniront les informations nécessaires ? (Choisissez-en trois.)",
        options: ["interface netsh ipv6 show neighbor", "arp -a", "tracert", "ping", "ipconfig", "nslookup", "telnet"],
        correctAnswers: [3, 4, 5],
        type: 'multiple',
        explanation: "ping, ipconfig et nslookup sont les commandes et utilitaires Windows CLI qui permettront de confirmer l'adresse IP et les configurations DNS, et de vérifier la connectivité au routeur local."
    },
    {
        id: 64,
        question: "Pendant le processus de transfert du trafic, que fera le routeur immédiatement après avoir fait correspondre l'adresse IP de destination à un réseau sur une entrée de table de routage directement connectée ?",
        options: ["analyser l'adresse IP de destination", "commutez le paquet vers l'interface directement connectée", "recherchez l'adresse du prochain saut pour le paquet", "rejeter le trafic après avoir consulté le tableau des itinéraires"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Lorsque l'adresse de destination se trouve sur une interface directement connectée, le paquet est commuté vers cette interface."
    },
    {
        id: 65,
        question: "Quelle caractéristique décrit un antispyware ?",
        options: ["applications qui protègent les appareils finaux contre l'infection par des logiciels malveillants", "un périphérique réseau qui filtre l'accès et le trafic entrant dans un réseau", "logiciel sur un routeur qui filtre le trafic en fonction des adresses IP ou des applications", "un protocole de tunneling qui offre aux utilisateurs distants un accès sécurisé au réseau d'une organisation"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Un antispyware est une application qui protège les appareils finaux contre l'infection par des logiciels malveillants."
    },
    {
        id: 66,
        question: "Un administrateur réseau doit garder l'ID utilisateur, le mot de passe et le contenu de la session privés lors de l'établissement d'une connectivité CLI à distance avec un commutateur pour la gérer. Quelle méthode d'accès faut-il choisir ?",
        options: ["Telnet", "AUX", "SSH", "Console"],
        correctAnswers: [2],
        type: 'single',
        explanation: "SSH (Secure Shell) crypte toutes les communications, gardant l'ID utilisateur, le mot de passe et le contenu de la session privés."
    },
    {
        id: 67,
        question: "Quels sont les deux moyens les plus efficaces de se défendre contre les logiciels malveillants ? (Choisissez-en deux.)",
        options: ["Implémenter un VPN.", "Implémenter des pare-feu réseau.", "Implémenter RAID.", "Implémentez des mots de passe forts.", "Mettre à jour le système d'exploitation et les autres logiciels d'application.", "Installer et mettre à jour un logiciel antivirus."],
        correctAnswers: [4, 5],
        type: 'multiple',
        explanation: "Mettre à jour le système d'exploitation et les autres logiciels d'application, ainsi qu'installer et mettre à jour un logiciel antivirus sont les deux moyens les plus efficaces de se défendre contre les logiciels malveillants."
    },
    {
        id: 68,
        question: "Quel type de menace de sécurité serait responsable si un module complémentaire de feuille de calcul désactivait le pare-feu logiciel local ?",
        options: ["attaque par force brute", "Cheval de Troie", "DoS", "débordement de tampon"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Un cheval de Troie est un logiciel qui fait quelque chose de nuisible, mais qui est caché dans un code logiciel légitime."
    },
    {
        id: 69,
        question: "Quel champ de trame est créé par un nœud source et utilisé par un nœud de destination pour garantir qu'un signal de données transmis n'a pas été modifié par des interférences, une distorsion ou une perte de signal ?",
        options: ["Champ du protocole Datagram utilisateur", "champ de vérification des erreurs de la couche de transport", "champ de contrôle de débit", "champ de séquence de vérification de trame", "champ de processus de correction d'erreur"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Le champ de séquence de vérification de trame (FCS) est utilisé pour la détection d'erreurs dans les trames."
    },
    {
        id: 70,
        question: "Un administrateur réseau ajoute un nouveau réseau local à une succursale. Le nouveau réseau local doit prendre en charge 4 appareils connectés. Quel est le plus petit masque réseau que l'administrateur réseau peut utiliser pour le nouveau réseau ?",
        options: ["255.255.255.248", "255.255.255.0", "255.255.255.128", "255.255.255.192"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Pour 4 appareils, il faut au moins 3 bits d'hôte. Le masque 255.255.255.248 (/29) permet 6 adresses hôtes utilisables."
    },
    {
        id: 71,
        question: "Quel service est fourni par POP3 ?",
        options: ["Récupère l'e-mail du serveur en téléchargeant l'e-mail vers l'application de messagerie locale du client.", "Une application qui permet de discuter en temps réel entre utilisateurs distants.", "Permet l'accès à distance aux périphériques réseau et aux serveurs.", "Utilise le cryptage pour fournir un accès à distance sécurisé aux périphériques réseau et aux serveurs."],
        correctAnswers: [0],
        type: 'single',
        explanation: "POP3 (Post Office Protocol version 3) récupère les e-mails du serveur en les téléchargeant vers l'application de messagerie locale du client."
    },
    {
        id: 72,
        question: "Quelles sont les deux solutions de sécurité les plus susceptibles d'être utilisées uniquement dans un environnement d'entreprise ? (Choisissez-en deux.)",
        options: ["logiciel anti-espion", "réseaux privés virtuels", "systèmes de prévention des intrusions", "mots de passe forts", "logiciel antivirus"],
        correctAnswers: [1, 2],
        type: 'multiple',
        explanation: "Les réseaux privés virtuels (VPN) et les systèmes de prévention des intrusions (IPS) sont des solutions de sécurité typiquement utilisées dans un environnement d'entreprise."
    },
    {
        id: 73,
        question: "Quelle caractéristique décrit un logiciel antivirus ?",
        options: ["applications qui protègent les appareils finaux contre l'infection par des logiciels malveillants", "un périphérique réseau qui filtre l'accès et le trafic entrant dans un réseau", "un protocole de tunneling qui offre aux utilisateurs distants un accès sécurisé au réseau d'une organisation", "logiciel sur un routeur qui filtre le trafic en fonction des adresses IP ou des applications"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Un logiciel antivirus est une application qui protège les appareils finaux contre l'infection par des logiciels malveillants."
    },
    {
        id: 74,
        question: "Quel mécanisme est utilisé par un routeur pour empêcher un paquet IPv4 reçu de voyager sans fin sur un réseau ?",
        options: ["Il vérifie la valeur du champ TTL et s'il est égal à 0, il rejette le paquet et envoie un message Destination inaccessible à l'hôte source.", "Il vérifie la valeur du champ TTL et si elle est de 100, il rejette le paquet et envoie un message Destination inaccessible à l'hôte source.", "Il décrémente la valeur du champ TTL de 1 et si le résultat est 0, il rejette le paquet et envoie un message de dépassement de délai à l'hôte source.", "Il incrémente la valeur du champ TTL de 1 et si le résultat est 100, il rejette le paquet et envoie un message de problème de paramètre à l'hôte source."],
        correctAnswers: [2],
        type: 'single',
        explanation: "Le routeur décrémente la valeur du champ TTL de 1 à chaque saut. Si le résultat est 0, il rejette le paquet et envoie un message de dépassement de délai à l'hôte source."
    },
    {
        id: 75,
        question: "Un paquet client est reçu par un serveur. Le paquet a un numéro de port de destination de 69. Quel service le client demande-t-il ?",
        options: ["DNS", "DHCP", "SMTP", "TFTP"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Le port 69 est utilisé par TFTP (Trivial File Transfer Protocol)."
    },
    {
        id: 76,
        question: "Un administrateur a défini un compte utilisateur local avec un mot de passe secret sur le routeur R1 pour une utilisation avec SSH. Quelles sont les trois étapes supplémentaires nécessaires pour configurer R1 afin d'accepter uniquement les connexions SSH cryptées ? (Choisissez-en trois.)",
        options: ["Configurer le DNS sur le routeur.", "Générez des clés pré-partagées bidirectionnelles.", "Configurez le nom de domaine IP sur le routeur.", "Générer les clés SSH.", "Activer les sessions SSH vty entrantes.", "Activer les sessions Telnet vty entrantes."],
        correctAnswers: [2, 3, 4],
        type: 'multiple',
        explanation: "Pour configurer SSH, il faut configurer le nom de domaine IP, générer les clés SSH et activer les sessions SSH vty entrantes."
    },
    {
        id: 77,
        question: "Quelles sont les deux fonctions exécutées sur la sous-couche MAC de la couche de liaison de données OSI pour faciliter la communication Ethernet ? (Choisissez-en deux.)",
        options: ["gère la communication entre le logiciel réseau de couche supérieure et le matériel Ethernet NIC", "implémente une remorque avec une séquence de vérification de trame pour la détection d'erreurs", "place des informations dans la trame Ethernet qui identifient quel protocole de couche réseau est encapsulé par la trame", "implémente un processus pour délimiter les champs dans une trame Ethernet 2", "ajoute des informations de contrôle Ethernet aux données du protocole réseau"],
        correctAnswers: [1, 3],
        type: 'multiple',
        explanation: "La sous-couche MAC implémente une remorque avec une séquence de vérification de trame pour la détection d'erreurs et implémente un processus pour délimiter les champs dans une trame Ethernet 2."
    },
    {
        id: 78,
        question: "Un appareil compatible IPv6 envoie un paquet de données avec l'adresse de destination FF02::2. Quelle est la cible de ce paquet ?",
        options: ["tous les appareils compatibles IPv6 sur la liaison locale", "tous les serveurs DHCP IPv6", "tous les appareils compatibles IPv6 sur le réseau", "tous les routeurs configurés IPv6 sur la liaison locale"],
        correctAnswers: [3],
        type: 'single',
        explanation: "FF02::2 identifie tous les routeurs IPv6 qui existent sur la liaison ou le réseau. FF02::1 est la cible de tous les appareils compatibles IPv6 sur la liaison ou le réseau."
    },
    {
        id: 79,
        question: "Quelles sont les trois parties d'une adresse unicast globale IPv6 ? (Choisissez-en trois.)",
        options: ["ID du sous-réseau", "masque de sous-réseau", "adresse de diffusion", "préfixe de routage global", "ID d'interface"],
        correctAnswers: [0, 3, 4],
        type: 'multiple',
        explanation: "Le format général des adresses de monodiffusion globales IPv6 comprend un préfixe de routage global, un ID de sous-réseau et un ID d'interface."
    },
    {
        id: 80,
        question: "Un administrateur réseau conçoit la disposition d'un nouveau réseau sans fil. Quels sont les trois domaines de préoccupation à prendre en compte lors de la construction d'un réseau sans fil ? (Choisissez-en trois.)",
        options: ["câblage étendu", "options de mobilité", "collision de paquets", "interférence", "sécurité", "zone de couverture"],
        correctAnswers: [3, 4, 5],
        type: 'multiple',
        explanation: "Les trois domaines de préoccupation des réseaux sans fil se concentrent sur la taille de la zone de couverture, toute interférence à proximité et la sécurité du réseau."
    },
    {
        id: 81,
        question: "Il a été demandé à un nouvel administrateur réseau de saisir un message de bannière sur un appareil Cisco. Quel est le moyen le plus rapide pour un administrateur réseau de tester si la bannière est correctement configurée ?",
        options: ["Entrez CTRL-Z à l'invite du mode privilégié.", "Quitter le mode de configuration globale.", "Faites fonctionner l'appareil.", "Redémarrez l'appareil.", "Quittez le mode EXEC privilégié et appuyez sur Entrée."],
        correctAnswers: [4],
        type: 'single',
        explanation: "Le moyen le plus rapide de tester si la bannière est configurée est de quitter le mode EXEC privilégié et d'appuyer sur Entrée. La bannière s'affiche alors."
    },
    {
        id: 82,
        question: "Quelle méthode est utilisée pour gérer l'accès basé sur la contention sur un réseau sans fil ?",
        options: ["passage de jeton", "CSMA/CA", "commande prioritaire", "CSMA/CD"],
        correctAnswers: [1],
        type: 'single',
        explanation: "CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance) est utilisé pour gérer l'accès basé sur la contention sur les réseaux sans fil."
    },
    {
        id: 83,
        question: "Quelle est la fonction de la couche de liaison de données ?",
        options: ["fournit le formatage des données", "assure la livraison de bout en bout des données entre les hôtes", "assure la livraison de données entre deux applications", "prévoit l'échange de trames sur un support local commun"],
        correctAnswers: [3],
        type: 'single',
        explanation: "La couche de liaison de données prévoit l'échange de trames sur un support local commun."
    },
    {
        id: 84,
        question: "Quel est le but de la fenêtre glissante TCP ?",
        options: ["pour s'assurer que les segments arrivent dans l'ordre à destination", "mettre fin à la communication lorsque la transmission des données est terminée", "informer une source de retransmettre des données à partir d'un point spécifique vers l'avant", "demander à une source de diminuer la vitesse à laquelle elle transmet les données"],
        correctAnswers: [3],
        type: 'single',
        explanation: "La fenêtre glissante TCP permet à un périphérique de destination d'informer une source de ralentir le débit de transmission."
    },
    {
        id: 85,
        question: "Quelle caractéristique décrit un logiciel espion ?",
        options: ["un périphérique réseau qui filtre l'accès et le trafic entrant dans un réseau", "logiciel installé sur un appareil utilisateur et collectant des informations sur l'utilisateur", "une attaque qui ralentit ou fait planter un appareil ou un service réseau", "l'utilisation d'identifiants volés pour accéder à des données privées"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Un logiciel espion est installé sur l'appareil d'un utilisateur et collecte secrètement des informations sur l'utilisateur."
    },
    {
        id: 86,
        question: "Quelle méthode de commutation supprime les trames qui échouent à la vérification FCS ?",
        options: ["commutation de stockage et de transfert", "commutation sans frontières", "mise en mémoire tampon du port d'entrée", "commutation traversante"],
        correctAnswers: [0],
        type: 'single',
        explanation: "La commutation de stockage et de transfert (store-and-forward) vérifie le FCS et supprime les trames corrompues."
    },
    {
        id: 87,
        question: "Quelle plage d'adresses locales de lien peut être attribuée à une interface compatible IPv6 ?",
        options: ["FEC0::/10", "FDEE::/7", "FE80::/10", "FF00::/8"],
        correctAnswers: [2],
        type: 'single',
        explanation: "Les adresses locales de lien sont comprises entre FE80::/10 et FEBF::/10."
    },
    {
        id: 88,
        question: "Quel service est fourni par FTP ?",
        options: ["Un ensemble de règles de base pour l'échange de texte, d'images graphiques, de son, de vidéo et d'autres fichiers multimédias sur le Web.", "Une application qui permet de discuter en temps réel entre utilisateurs distants.", "Permet les transferts de données entre un client et un serveur de fichiers.", "Utilise le cryptage pour sécuriser l'échange de texte, d'images graphiques, de son et de vidéo sur le Web."],
        correctAnswers: [2],
        type: 'single',
        explanation: "FTP (File Transfer Protocol) permet les transferts de données entre un client et un serveur de fichiers."
    },
    {
        id: 89,
        question: "Un utilisateur tente d'accéder à http://www.cisco.com/ sans succès. Quelles sont les deux valeurs de configuration à définir sur l'hôte pour permettre cet accès ? (Choisissez-en deux.)",
        options: ["Serveur DNS", "numéro de port source", "Serveur HTTP", "adresse MAC source", "passerelle par défaut"],
        correctAnswers: [0, 4],
        type: 'multiple',
        explanation: "Pour accéder à un site Web externe, l'hôte doit être configuré avec un serveur DNS et une passerelle par défaut."
    },
    {
        id: 90,
        question: "Quelles sont les deux affirmations qui décrivent avec précision un avantage ou un inconvénient lors du déploiement de NAT pour IPv4 dans un réseau ? (Choisissez-en deux.)",
        options: ["NAT ajoute une capacité d'authentification à IPv4.", "NAT introduit des problèmes pour certaines applications qui nécessitent une connectivité de bout en bout.", "NAT aura un impact négatif sur les performances du commutateur.", "NAT fournit une solution pour ralentir l'épuisement de l'adresse IPv4.", "NAT améliore la gestion des paquets."],
        correctAnswers: [1, 3],
        type: 'multiple',
        explanation: "NAT fournit une solution pour ralentir l'épuisement des adresses IPv4 mais peut causer des problèmes pour les applications nécessitant une connectivité de bout en bout."
    },
    {
        id: 91,
        question: "Quel serait l'ID d'interface d'une interface compatible IPv6 avec une adresse MAC de 1C-6F-65-C2-BD-F8 lorsque l'ID d'interface est généré à l'aide du processus EUI-64 ?",
        options: ["0C6F:65FF:FEC2:BDF8", "1E6F:65FF:FEC2:BDF8", "C16F:65FF:FEC2:BDF8", "106F:65FF:FEC2:BDF8"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Le processus EUI-64 modifie le septième bit et insère FFFE au milieu de l'adresse MAC, donnant 1E6F:65FF:FEC2:BDF8."
    },
    {
        id: 92,
        question: "Se référer à l'exposition. PC1 émet une requête ARP car il doit envoyer un paquet à PC2. Dans ce scénario, que va-t-il se passer ensuite ?",
        options: ["SW1 enverra une réponse ARP avec l'adresse MAC SW1 Fa0/1.", "SW1 enverra une réponse ARP avec l'adresse MAC PC2.", "PC2 enverra une réponse ARP avec l'adresse MAC PC2.", "RT1 enverra une réponse ARP avec l'adresse MAC RT1 Fa0/0.", "RT1 enverra une réponse ARP avec l'adresse MAC PC2."],
        correctAnswers: [2],
        type: 'single',
        explanation: "Lorsqu'un périphérique réseau souhaite communiquer avec un autre périphérique sur le même réseau, le périphérique de destination (PC2) envoie une réponse ARP avec son adresse MAC.",
        imageUrl: "https://itexamanswers.net/wp-content/uploads/2016/03/i209824v1n1_209824.jpg"
    },
    {
        id: 93,
        question: "Quel service est fourni par BOOTP ?",
        options: ["Utilise le cryptage pour sécuriser l'échange de texte, d'images graphiques, de son et de vidéo sur le Web.", "Permet les transferts de données entre un client et un serveur de fichiers.", "Application héritée qui permet à un poste de travail sans disque de découvrir sa propre adresse IP et de trouver un serveur BOOTP sur le réseau.", "Un ensemble de règles de base pour l'échange de texte, d'images graphiques, de son, de vidéo et d'autres fichiers multimédias sur le Web."],
        correctAnswers: [2],
        type: 'single',
        explanation: "BOOTP est une application héritée qui permet à un poste de travail sans disque de découvrir sa propre adresse IP."
    },
    {
        id: 94,
        question: "Quelle caractéristique décrit un logiciel publicitaire ?",
        options: ["un périphérique réseau qui filtre l'accès et le trafic entrant dans un réseau", "logiciel installé sur un appareil utilisateur et collectant des informations sur l'utilisateur", "l'utilisation d'identifiants volés pour accéder à des données privées", "une attaque qui ralentit ou fait planter un appareil ou un service réseau"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Un logiciel publicitaire (adware) est installé sur l'appareil d'un utilisateur et collecte des informations, souvent pour afficher des publicités ciblées."
    },
    {
        id: 95,
        question: "Lorsqu'une configuration de commutateur inclut un seuil d'erreur défini par l'utilisateur pour chaque port, vers quelle méthode de commutation le commutateur reviendra-t-il lorsque le seuil d'erreur est atteint ?",
        options: ["cut-through", "store-and-forward", "avance rapide", "sans fragment"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Lorsque le seuil d'erreur est atteint, le commutateur revient à la méthode store-and-forward pour vérifier toutes les trames."
    },
    {
        id: 96,
        question: "Quelles sont les deux principales responsabilités de la sous-couche MAC Ethernet ? (Choisissez-en deux.)",
        options: ["détection d'erreur", "délimitation du cadre", "accès aux médias", "encapsulation des données", "adressage logique"],
        correctAnswers: [2, 3],
        type: 'multiple',
        explanation: "Les deux principales responsabilités de la sous-couche MAC Ethernet sont l'accès aux médias et l'encapsulation des données."
    },
    {
        id: 97,
        question: "Un appareil compatible IPv6 envoie un paquet de données avec l'adresse de destination FF02::2. Quelle est la cible de ce paquet ?",
        options: ["tous les appareils compatibles IPv6 sur la liaison locale", "tous les serveurs DHCP IPv6", "tous les appareils compatibles IPv6 sur le réseau", "tous les routeurs configurés IPv6 sur la liaison locale"],
        correctAnswers: [3],
        type: 'single',
        explanation: "FF02::2 identifie tous les routeurs IPv6 qui existent sur la liaison locale."
    },
    {
        id: 98,
        question: "Quelles sont les trois parties d'une adresse unicast globale IPv6 ? (Choisissez-en trois.)",
        options: ["ID du sous-réseau", "masque de sous-réseau", "adresse de diffusion", "préfixe de routage global", "ID d'interface"],
        correctAnswers: [0, 3, 4],
        type: 'multiple',
        explanation: "Le format général des adresses unicast globales IPv6 comprend un préfixe de routage global, un ID de sous-réseau et un ID d'interface."
    },
    {
        id: 99,
        question: "Un administrateur réseau conçoit la disposition d'un nouveau réseau sans fil. Quels sont les trois domaines de préoccupation à prendre en compte lors de la construction d'un réseau sans fil ? (Choisissez-en trois.)",
        options: ["câblage étendu", "options de mobilité", "collision de paquets", "interférence", "sécurité", "zone de couverture"],
        correctAnswers: [3, 4, 5],
        type: 'multiple',
        explanation: "Les trois domaines de préoccupation des réseaux sans fil sont la zone de couverture, l'interférence et la sécurité."
    },
    {
        id: 100,
        question: "Quel est l'ID de sous-réseau associé à l'adresse IPv6 2001:DA48:FC5:A4:3D1B::1/64 ?",
        options: ["2001:DA48::/64", "2001:DA48:FC5::A4:/64", "2001:DA48:FC5:A4::/64", "2001::/64"],
        correctAnswers: [2],
        type: 'single',
        explanation: "Pour une adresse /64, l'ID de sous-réseau comprend les 64 premiers bits, soit 2001:DA48:FC5:A4::/64."
    },
    {
        id: 101,
        question: "Les utilisateurs signalent des délais plus longs dans l'authentification et dans l'accès aux ressources réseau pendant certaines périodes de la semaine. Quel type d'informations les ingénieurs réseau doivent-ils vérifier pour savoir si cette situation fait partie d'un comportement réseau normal ?",
        options: ["enregistrements et messages syslog", "la base de référence des performances du réseau", "sortie de débogage et captures de paquets", "fichiers de configuration réseau"],
        correctAnswers: [1],
        type: 'single',
        explanation: "La base de référence des performances du réseau permet de comparer le comportement actuel au comportement normal attendu."
    },
    {
        id: 102,
        question: "Comment la commande de chiffrement du mot de passe du service améliore-t-elle la sécurité du mot de passe sur les routeurs et commutateurs Cisco ?",
        options: ["Il nécessite l'utilisation de mots de passe cryptés lors de la connexion à distance à un routeur ou à un commutateur avec Telnet.", "Il crypte les mots de passe stockés dans les fichiers de configuration du routeur ou du commutateur.", "Cela nécessite qu'un utilisateur saisisse des mots de passe cryptés pour accéder à la console d'un routeur ou d'un commutateur.", "Il crypte les mots de passe au fur et à mesure qu'ils sont envoyés sur le réseau."],
        correctAnswers: [1],
        type: 'single',
        explanation: "La commande service password-encryption crypte les mots de passe en texte clair dans le fichier de configuration."
    },
    {
        id: 103,
        question: "Quelles sont les deux affirmations correctes dans une comparaison des en-têtes de paquets IPv4 et IPv6 ? (Choisissez-en deux.)",
        options: ["Le nom du champ Adresse source d'IPv4 est conservé dans IPv6.", "Le champ Version d'IPv4 n'est pas conservé dans IPv6.", "Le champ Adresse de destination est nouveau dans IPv6.", "Le nom du champ Header Checksum d'IPv4 est conservé dans IPv6.", "Le champ Time-to-Live d'IPv4 a été remplacé par le champ Hop Limit dans IPv6."],
        correctAnswers: [0, 4],
        type: 'multiple',
        explanation: "Le champ Adresse source est conservé dans IPv6, et le champ Time-to-Live a été remplacé par Hop Limit."
    },
    {
        id: 104,
        question: "Un administrateur réseau souhaite avoir le même masque réseau pour tous les réseaux d’un petit site particulier. Le site dispose des réseaux et du nombre d'appareils suivants : Téléphones IP – 22 adresses PC – 20 adresses nécessaires Imprimantes – 2 adresses nécessaires Scanners – 2 adresses nécessaires",
        options: ["255.255.255.192", "255.255.255.252", "255.255.255.240", "255.255.255.248", "255.255.255.224"],
        correctAnswers: [4],
        type: 'single',
        explanation: "Le réseau le plus grand a 22 hôtes. Un masque /27 (255.255.255.224) donne 30 adresses hôtes par sous-réseau, suffisant pour tous."
    },
    {
        id: 105,
        question: "Quelle caractéristique décrit le vol d'identité ?",
        options: ["l'utilisation d'identifiants volés pour accéder à des données privées", "logiciel sur un routeur qui filtre le trafic en fonction des adresses IP ou des applications", "logiciel qui identifie les menaces à propagation rapide", "un protocole de tunneling qui offre aux utilisateurs distants un accès sécurisé au réseau d'une organisation"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Le vol d'identité consiste à utiliser des identifiants volés pour accéder à des données privées."
    },
    {
        id: 106,
        question: "Un administrateur réseau ajoute un nouveau réseau local à une succursale. Le nouveau réseau local doit prendre en charge 200 appareils connectés. Quel est le plus petit masque réseau que l'administrateur réseau peut utiliser pour le nouveau réseau ?",
        options: ["255.255.255.240", "255.255.255.0", "255.255.255.248", "255.255.255.224"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Pour 200 appareils, il faut au moins 8 bits d'hôte. Le masque 255.255.255.0 (/24) permet 254 adresses hôtes utilisables."
    },
    {
        id: 107,
        question: "Quelles sont les trois normes couramment suivies pour la construction et l'installation de câbles ? (Choisissez-en trois.)",
        options: ["coût par mètre", "longueurs de câble", "couleur du connecteur", "brochettes", "types de connecteurs", "résistance à la traction de l'isolant"],
        correctAnswers: [1, 3, 4],
        type: 'multiple',
        explanation: "Les normes courantes pour le câblage incluent les longueurs de câble, les brochettes et les types de connecteurs."
    },
    {
        id: 108,
        question: "Se référer à l'exposition. Quel est le problème avec la terminaison affichée ?",
        options: ["La tresse de cuivre tissée n'aurait pas dû être retirée.", "Le mauvais type de connecteur est utilisé.", "La longueur non torsadée de chaque fil est trop longue.", "Les fils sont trop épais pour le connecteur utilisé."],
        correctAnswers: [2],
        type: 'single',
        explanation: "Lorsqu'un câble vers un connecteur RJ-45 est terminé, il est important de s'assurer que les fils non torsadés ne sont pas trop longs.",
        imageUrl: "https://itexamanswers.net/wp-content/uploads/2020/01/i274300v1n1_209630-300x221-1.png"
    },
    {
        id: 109,
        question: "Un paquet client est reçu par un serveur. Le paquet a un numéro de port de destination de 143. Quel service le client demande-t-il ?",
        options: ["IMAP", "FTP", "SSH", "Telnet"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Le port 143 est utilisé par IMAP (Internet Message Access Protocol) pour la récupération des emails."
    },
    {
        id: 110,
        question: "Quelles sont les deux caractéristiques partagées par TCP et UDP ? (Choisissez-en deux.)",
        options: ["taille de fenêtre par défaut", "communication sans connexion", "numérotation des ports", "Poignée de main à 3 voies", "capacité à transporter une voix numérisée", "utilisation de la somme de contrôle"],
        correctAnswers: [2, 5],
        type: 'multiple',
        explanation: "TCP et UDP utilisent tous deux des numéros de ports et la somme de contrôle pour la vérification des erreurs."
    },
    {
        id: 111,
        question: "Un paquet client est reçu par un serveur. Le paquet a un numéro de port de destination de 21. Quel service le client demande-t-il ?",
        options: ["FTP", "LDAP", "SLP", "SNMP"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Le port 21 est utilisé par FTP (File Transfer Protocol) pour les commandes de contrôle."
    },
    {
        id: 112,
        question: "Quel attribut d'une carte réseau la placerait au niveau de la couche de liaison de données du modèle OSI ?",
        options: ["câble Ethernet attaché", "Adresse IP", "Adresse MAC", "Port RJ-45", "Pile de protocoles TCP/IP"],
        correctAnswers: [2],
        type: 'single',
        explanation: "L'adresse MAC est une adresse de couche 2 (liaison de données) associée à la carte réseau."
    },
    {
        id: 113,
        question: "Un administrateur réseau ajoute un nouveau réseau local à une succursale. Le nouveau réseau local doit prendre en charge 10 appareils connectés. Quel est le plus petit masque réseau que l'administrateur réseau peut utiliser pour le nouveau réseau ?",
        options: ["255.255.255.192", "255.255.255.248", "255.255.255.224", "255.255.255.240"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Pour 10 appareils, il faut au moins 4 bits d'hôte. Le masque 255.255.255.240 (/28) permet 14 adresses hôtes utilisables."
    },
    {
        id: 114,
        question: "Quelle technique est utilisée avec le câble UTP pour aider à protéger contre les interférences du signal dues à la diaphonie ?",
        options: ["enrouler un bouclier en feuille autour des paires de fils", "tordre les fils ensemble par paires", "terminer le câble avec des connecteurs spéciaux mis à la terre", "enfermer les câbles dans une gaine en plastique flexible"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Pour aider à prévenir les effets de la diaphonie, les fils des câbles UTP sont torsadés ensemble par paires."
    },
    {
        id: 115,
        question: "Un paquet client est reçu par un serveur. Le paquet a un numéro de port de destination de 22. Quel service le client demande-t-il ?",
        options: ["SSH", "SMB/CIFS", "HTTPS", "SLP"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Le port 22 est utilisé par SSH (Secure Shell)."
    },
    {
        id: 116,
        question: "Quelle caractéristique décrit un IPS ?",
        options: ["un protocole de tunneling qui offre aux utilisateurs distants un accès sécurisé au réseau d'une organisation", "un périphérique réseau qui filtre l'accès et le trafic entrant dans un réseau", "logiciel qui identifie les menaces à propagation rapide", "logiciel sur un routeur qui filtre le trafic en fonction des adresses IP ou des applications"],
        correctAnswers: [1],
        type: 'single',
        explanation: "IPS (Intrusion Prevention System) est un périphérique réseau qui surveille et filtre l'accès et le trafic entrant dans un réseau."
    },
    {
        id: 117,
        question: "Quel service est fourni par DHCP ?",
        options: ["Une application qui permet de discuter en temps réel entre utilisateurs distants.", "Permet l'accès à distance aux périphériques réseau et aux serveurs.", "Attribue dynamiquement des adresses IP aux périphériques finaux et intermédiaires.", "Utilise le cryptage pour fournir un accès à distance sécurisé aux périphériques réseau et aux serveurs."],
        correctAnswers: [2],
        type: 'single',
        explanation: "DHCP (Dynamic Host Configuration Protocol) attribue dynamiquement des adresses IP aux périphériques."
    },
    {
        id: 118,
        question: "Quelle technologie sans fil a des exigences de faible puissance et de faible débit de données, ce qui la rend populaire dans les environnements IoT ?",
        options: ["Bluetooth", "Zigbee", "WiMAX", "Wi-Fi"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Zigbee est une spécification utilisée pour les communications à faible débit de données et à faible consommation d'énergie, populaire dans les environnements IoT."
    },
    {
        id: 119,
        question: "Quels sont les deux types de messages ICMPv6 qui doivent être autorisés via les listes de contrôle d'accès IPv6 pour permettre la résolution des adresses de couche 3 en adresses MAC de couche 2 ? (Choisissez-en deux.)",
        options: ["sollicitations de voisins", "demandes d'écho", "publicités de voisins", "réponses en écho", "sollicitations de routeurs", "publicités du routeur"],
        correctAnswers: [0, 2],
        type: 'multiple',
        explanation: "Les sollicitations de voisins et les publicités de voisins sont essentielles pour la résolution d'adresses en IPv6."
    },
    {
        id: 120,
        question: "Un client utilise SLAAC pour obtenir une adresse IPv6 pour son interface. Une fois qu'une adresse a été générée et appliquée à l'interface, que doit faire le client avant de pouvoir commencer à utiliser cette adresse IPv6 ?",
        options: ["Il doit envoyer un message DHCPv6 INFORMATION-REQUEST pour demander l'adresse du serveur DNS.", "Il doit envoyer un message DHCPv6 REQUEST au serveur DHCPv6 pour demander l'autorisation d'utiliser cette adresse.", "Il doit envoyer un message de sollicitation de routeur ICMPv6 pour déterminer quelle passerelle par défaut il doit utiliser.", "Il doit envoyer un message ICMPv6 Neighbor Solicitation pour s'assurer que l'adresse n'est pas déjà utilisée sur le réseau."],
        correctAnswers: [3],
        type: 'single',
        explanation: "Avant d'utiliser une adresse IPv6 générée par SLAAC, le client doit effectuer une détection d'adresse dupliquée (DAD) via Neighbor Solicitation."
    },
    {
        id: 121,
        question: "Une organisation se voit attribuer un bloc d'adresse IPv6 de 2001:db8:0:ca00::/56. Combien de sous-réseaux peuvent être créés sans utiliser de bits dans l'espace ID de l'interface ?",
        options: ["256", "512", "1024", "4096"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Avec un préfixe /56 et un ID d'interface standard de 64 bits, il reste 8 bits pour les sous-réseaux, soit 2^8 = 256 sous-réseaux."
    },
    {
        id: 122,
        question: "Quel masque de sous-réseau est nécessaire si un réseau IPv4 dispose de 40 appareils nécessitant des adresses IP et que l'espace d'adressage ne doit pas être gaspillé ?",
        options: ["255.255.255.0", "255.255.255.240", "255.255.255.128", "255.255.255.192", "255.255.255.224"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Pour 40 appareils, 6 bits hôtes sont nécessaires. Le masque 255.255.255.192 (/26) donne 62 adresses hôtes utilisables."
    },
    {
        id: 123,
        question: "Quel connecteur est utilisé avec le câblage à paires torsadées dans un réseau local Ethernet ?",
        options: ["LC", "SC", "BNC", "RJ-11", "RJ-45"],
        correctAnswers: [4],
        type: 'single',
        explanation: "Le connecteur RJ-45 est utilisé avec le câblage à paires torsadées dans les réseaux Ethernet."
    },
    {
        id: 124,
        question: "Deux pings ont été émis par un hôte sur un réseau local. Le premier ping a été émis vers l’adresse IP de la passerelle par défaut de l’hôte et il a échoué. Le deuxième ping a été émis vers l’adresse IP d’un hôte extérieur au réseau local et il a réussi. Quelle est la cause possible de l’échec du ping ?",
        options: ["La passerelle par défaut n'est pas opérationnelle.", "Le périphérique de passerelle par défaut est configuré avec la mauvaise adresse IP.", "Des règles de sécurité sont appliquées au périphérique passerelle par défaut, l'empêchant de traiter les requêtes ping.", "La pile TCP/IP sur la passerelle par défaut ne fonctionne pas correctement."],
        correctAnswers: [2],
        type: 'single',
        explanation: "Si le ping vers l'extérieur réussit mais pas vers la passerelle, c'est probablement que des règles de sécurité empêchent la passerelle de répondre aux pings."
    },
    {
        id: 125,
        question: "Quel est l'avantage d'utiliser le cloud computing dans les réseaux ?",
        options: ["La technologie est intégrée aux appareils du quotidien, leur permettant de s'interconnecter.", "Les capacités du réseau sont étendues sans nécessiter d'investissement dans de nouvelles infrastructures, du personnel ou des logiciels.", "Les utilisateurs finaux ont la liberté d'utiliser des outils personnels pour accéder à l'information.", "Le réseau domestique utilise le câblage électrique existant."],
        correctAnswers: [1],
        type: 'single',
        explanation: "Le cloud computing permet d'étendre les capacités du réseau sans investissement majeur dans l'infrastructure."
    },
    {
        id: 126,
        question: "Se référer à l'exposition. Les commutateurs sont dans leur configuration par défaut. L'hôte A doit communiquer avec l'hôte D, mais l'hôte A ne dispose pas de l'adresse MAC de sa passerelle par défaut. Quels hôtes réseau recevront la requête ARP envoyée par l'hôte A ?",
        options: ["uniquement l'hôte D", "héberge uniquement A, B, C et D", "héberge uniquement les hôtes B et C", "héberge uniquement B, C et le routeur R1", "héberge uniquement A, B et C", "uniquement le routeur R1"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Étant donné que l'hôte A ne dispose pas de l'adresse MAC de la passerelle par défaut dans sa table ARP, l'hôte A envoie une diffusion ARP. Les hôtes B, C et le routeur R1 recevraient la diffusion."
    },
    {
        id: 127,
        question: "Se référer à l'exposition. Les commutateurs sont dans leur configuration par défaut. L'hôte A doit communiquer avec l'hôte D, mais l'hôte A ne dispose pas de l'adresse MAC de sa passerelle par défaut. Quels hôtes réseau recevront la requête ARP envoyée par l'hôte A ?",
        options: ["uniquement l'hôte D", "uniquement le routeur R1", "héberge uniquement A, B et C", "héberge uniquement A, B, C et D", "héberge uniquement les hôtes B et C", "héberge uniquement B, C et le routeur R1"],
        correctAnswers: [5],
        type: 'single',
        explanation: "Étant donné que l'hôte A ne dispose pas de l'adresse MAC de la passerelle par défaut dans la table ARP, l'hôte A envoie une diffusion ARP. La diffusion ARP serait envoyée à tous les appareils du réseau local."
    },
    {
        id: 128,
        question: "Quelle technologie sans fil a des exigences de faible puissance et de faible débit de données, ce qui la rend populaire dans les environnements IoT ?",
        options: ["Bluetooth", "Zigbee", "WiMAX", "Wi-Fi"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Zigbee est une spécification utilisée pour les communications à faible débit de données et à faible consommation d'énergie. Il est généralement utilisé pour les environnements industriels et de l'Internet des objets (IoT)."
    },
    {
        id: 129,
        question: "Quels sont les deux types de messages ICMPv6 qui doivent être autorisés via les listes de contrôle d'accès IPv6 pour permettre la résolution des adresses de couche 3 en adresses MAC de couche 2 ? (Choisissez-en deux.)",
        options: ["sollicitations de voisins", "demandes d'écho", "publicités de voisins", "réponses en écho", "sollicitations de routeurs", "publicités du routeur"],
        correctAnswers: [0, 2],
        type: 'multiple',
        explanation: "Les sollicitations de voisins et les publicités de voisins sont utilisées pour la résolution d'adresses IPv6 en adresses MAC."
    },
    {
        id: 130,
        question: "Un client utilise SLAAC pour obtenir une adresse IPv6 pour son interface. Une fois qu'une adresse a été générée et appliquée à l'interface, que doit faire le client avant de pouvoir commencer à utiliser cette adresse IPv6 ?",
        options: ["Il doit envoyer un message DHCPv6 INFORMATION-REQUEST pour demander l'adresse du serveur DNS.", "Il doit envoyer un message DHCPv6 REQUEST au serveur DHCPv6 pour demander l'autorisation d'utiliser cette adresse.", "Il doit envoyer un message de sollicitation de routeur ICMPv6 pour déterminer quelle passerelle par défaut il doit utiliser.", "Il doit envoyer un message ICMPv6 Neighbor Solicitation pour s'assurer que l'adresse n'est pas déjà utilisée sur le réseau."],
        correctAnswers: [3],
        type: 'single',
        explanation: "Avant d'utiliser une adresse IPv6 générée par SLAAC, le client doit effectuer une détection d'adresse dupliquée (DAD) via Neighbor Solicitation."
    },
    {
        id: 131,
        question: "Deux pings ont été émis par un hôte sur un réseau local. Le premier ping a été émis vers l'adresse IP de la passerelle par défaut de l'hôte et il a échoué. Le deuxième ping a été émis vers l'adresse IP d'un hôte extérieur au réseau local et il a réussi. Quelle est la cause possible de l'échec du ping ?",
        options: ["La passerelle par défaut n'est pas opérationnelle.", "Le périphérique de passerelle par défaut est configuré avec la mauvaise adresse IP.", "Des règles de sécurité sont appliquées au périphérique passerelle par défaut, l'empêchant de traiter les requêtes ping.", "La pile TCP/IP sur la passerelle par défaut ne fonctionne pas correctement."],
        correctAnswers: [2],
        type: 'single',
        explanation: "Si le ping vers l'extérieur réussit mais pas vers la passerelle, c'est probablement que des règles de sécurité empêchent la passerelle de répondre aux pings."
    },
    {
        id: 132,
        question: "Une organisation se voit attribuer un bloc d'adresse IPv6 de 2001:db8:0:ca00::/56. Combien de sous-réseaux peuvent être créés sans utiliser de bits dans l'espace ID de l'interface ?",
        options: ["256", "512", "1024", "4096"],
        correctAnswers: [0],
        type: 'single',
        explanation: "Avec un préfixe /56 et un ID d'interface standard de 64 bits, il reste 8 bits pour les sous-réseaux, soit 2^8 = 256 sous-réseaux."
    },
    {
        id: 133,
        question: "Quel masque de sous-réseau est nécessaire si un réseau IPv4 dispose de 40 appareils nécessitant des adresses IP et que l'espace d'adressage ne doit pas être gaspillé ?",
        options: ["255.255.255.0", "255.255.255.240", "255.255.255.128", "255.255.255.192", "255.255.255.224"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Pour 40 appareils, 6 bits hôtes sont nécessaires. Le masque 255.255.255.192 (/26) donne 62 adresses hôtes utilisables."
    },
    {
        id: 134,
        question: "Se référer à l'exposition. Si l'hôte A envoie un paquet IP à l'hôte B, quelle sera l'adresse de destination dans la trame lorsqu'il quittera l'hôte A ?",
        options: ["DD:DD:DD:DD:DD:DD", "172.168.10.99", "CC:CC:CC:CC:CC:CC", "172.168.10.65", "BB:BB:BB:BB:BB:BB", "AA:AA:AA:AA:AA:AA"],
        correctAnswers: [4],
        type: 'single',
        explanation: "Lorsqu'un hôte envoie des informations à un réseau distant, l'adresse de destination sera l'adresse MAC attribuée à l'interface du routeur."
    },
    {
        id: 135,
        question: "Quel est l'avantage d'utiliser le cloud computing dans les réseaux ?",
        options: ["La technologie est intégrée aux appareils du quotidien, leur permettant de s'interconnecter avec d'autres appareils.", "Les capacités du réseau sont étendues sans nécessiter d'investissement dans de nouvelles infrastructures, du personnel ou des logiciels.", "Les utilisateurs finaux ont la liberté d'utiliser des outils personnels pour accéder à l'information.", "Les réseaux domestiques utilisent le câblage électrique existant pour connecter les appareils au réseau."],
        correctAnswers: [1],
        type: 'single',
        explanation: "Le cloud computing étend les capacités informatiques sans nécessiter d'investissement dans une nouvelle infrastructure, de formation de nouveau personnel ou d'octroi de licences pour de nouveaux logiciels."
    },
    {
        id: 136,
        question: "Quelles sont les deux affirmations correctes concernant les adresses MAC et IP lors de la transmission de données si NAT n'est pas impliqué ? (Choisissez-en deux.)",
        options: ["Les adresses IP de destination dans un en-tête de paquet restent constantes tout au long du chemin vers un hôte cible.", "Les adresses MAC de destination ne changeront jamais dans une trame qui traverse sept routeurs.", "Chaque fois qu'une trame est encapsulée avec une nouvelle adresse MAC de destination, une nouvelle adresse IP de destination est nécessaire.", "Les adresses MAC de destination et de source ont une signification locale et changent chaque fois qu'une trame passe d'un réseau local à un autre.", "Un paquet qui a traversé quatre routeurs a changé l'adresse IP de destination quatre fois."],
        correctAnswers: [0, 3],
        type: 'multiple',
        explanation: "Les adresses IP restent constantes pendant la transmission, mais les adresses MAC changent à chaque saut entre réseaux locaux."
    },
    {
        id: 137,
        question: "Quelle est l'une des principales caractéristiques de la couche de liaison de données ?",
        options: ["Il génère les signaux électriques ou optiques qui représentent le 1 et le 0 sur le support.", "Il convertit un flux de bits de données en un code prédéfini.", "Il empêche le protocole de couche supérieure de connaître le support physique à utiliser dans la communication.", "Il accepte les paquets de couche 3 et décide du chemin par lequel transmettre le paquet à un réseau distant."],
        correctAnswers: [2],
        type: 'single',
        explanation: "La couche de liaison de données empêche le protocole de couche supérieure de connaître le support physique utilisé."
    },
    {
        id: 138,
        question: "Quelles sont les trois caractéristiques du procédé CSMA/CD ? (Choisissez-en trois.)",
        options: ["L'appareil doté du jeton électronique est le seul à pouvoir transmettre après une collision.", "Un appareil écoute et attend que le média ne soit pas occupé avant de transmettre.", "Après avoir détecté une collision, les hôtes peuvent tenter de reprendre la transmission après l'expiration d'un délai aléatoire.", "Tous les appareils d'un segment voient les données transmises sur le support réseau.", "Un signal de brouillage indique que la collision est terminée et que les médias ne sont pas occupés.", "Les appareils peuvent être configurés avec une priorité de transmission plus élevée."],
        correctAnswers: [1, 2, 3],
        type: 'multiple',
        explanation: "CSMA/CD: écoute avant transmission, délai aléatoire après collision, et tous les appareils voient les données transmises."
    },
    {
        id: 139,
        question: "Quel est l'avantage principal de la commutation en mode store-and-forward ?",
        options: ["vitesse de commutation plus rapide", "vérification des erreurs avant transmission", "utilisation minimale de mémoire", "latence plus faible"],
        correctAnswers: [1],
        type: 'single',
        explanation: "La commutation store-and-forward vérifie les erreurs (FCS) avant de transmettre la trame."
    },





    {
        id: 145,
        question: "Quelle est la fonction d'un serveur DNS ?",
        options: ["attribuer des adresses IP dynamiquement", "résoudre les noms de domaine en adresses IP", "router le trafic entre réseaux", "fournir des services de pare-feu"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Un serveur DNS résout les noms de domaine en adresses IP."
    },




    {
        id: 140,
        question: "Quelles sont les deux commandes qui peuvent être utilisées sur un hôte Windows pour afficher la table de routage ? (Choisissez-en deux.)",
        options: ["netstat -s", "route print", "show ip route", "netstat -r", "tracert"],
        correctAnswers: [1, 3],
        type: 'multiple',
        explanation: "Sur un hôte Windows, les commandes route print ou netstat -r peuvent être utilisées pour afficher la table de routage."
    },
    {
        id: 141,
        question: "Quelles sont les deux fonctions fournies par la couche réseau ? (Choisissez-en deux.)",
        options: ["diriger les paquets de données vers les hôtes de destination sur d'autres réseaux", "placer des données sur le support réseau", "transport de données entre les processus", "fournir des connexions de bout en bout dédiées", "fournir aux appareils finaux un identifiant de réseau unique"],
        correctAnswers: [0, 4],
        type: 'multiple',
        explanation: "La couche réseau s'occupe de transmettre des données et fournit des identifiants uniques avec les adresses IP."
    },
    {
        id: 142,
        question: "Quelles sont les deux instructions décrivant les fonctionnalités d'une table de routage IPv4 ? (Choisissez-en deux.)",
        options: ["Les interfaces directement connectées auront deux codes sources de route : C et S.", "L'itinéraire avec la valeur métrique la plus élevée est inclus.", "La commande netstat -r affiche la table de routage.", "La table de routage répertorie les adresses MAC.", "Il stocke des informations sur les itinéraires dérivés des interfaces actives.", "Une route statique par défaut a le code source S."],
        correctAnswers: [4, 5],
        type: 'multiple',
        explanation: "La table de routage stocke des informations sur les itinéraires et les routes statiques ont le code S."
    },
    {
        id: 143,
        question: "Quelle caractéristique décrit un VPN ?",
        options: ["logiciel sur un routeur qui filtre le trafic", "logiciel qui identifie les menaces à propagation rapide", "un protocole de tunneling qui offre aux utilisateurs distants un accès sécurisé", "un périphérique réseau qui filtre l'accès et le trafic"],
        correctAnswers: [2],
        type: 'single',
        explanation: "Un VPN est un protocole de tunneling qui offre aux utilisateurs distants un accès sécurisé."
    },
    {
        id: 144,
        question: "Pourquoi un commutateur de couche 2 aurait-il besoin d'une adresse IP ?",
        options: ["pour envoyer des trames de diffusion", "pour fonctionner comme passerelle par défaut", "pour permettre la gestion à distance", "pour recevoir des trames des PC connectés"],
        correctAnswers: [2],
        type: 'single',
        explanation: "Un commutateur a besoin d'une adresse IP pour la gestion à distance."
    },
    {
        id: 146,
        question: "Un utilisateur envoie une requête HTTP à un serveur Web sur un réseau distant. Lors de l'encapsulation de cette requête, quelles informations sont ajoutées au champ d'adresse d'une trame pour indiquer la destination ?",
        options: ["le domaine réseau de l'hôte de destination", "l'adresse IP de la passerelle par défaut", "l'adresse MAC de l'hôte de destination", "l'adresse MAC de la passerelle par défaut"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Une trame est encapsulée avec l'adresse MAC de la passerelle par défaut comme destination pour atteindre un réseau distant."
    },
    {
        id: 147,
        question: "Quel est l'avantage d'utiliser un protocole défini par une norme ouverte ?",
        options: ["Une entreprise peut monopoliser le marché.", "Le protocole ne peut être exécuté que sur un équipement d'un fournisseur spécifique.", "Un protocole standard ouvert n'est pas contrôlé par les organismes de normalisation.", "Elle encourage la concurrence et favorise les choix."],
        correctAnswers: [3],
        type: 'single',
        explanation: "Un protocole standard ouvert sera généralement mis en œuvre par un large éventail de fournisseurs, encourageant la concurrence."
    },
    {
        id: 148,
        question: "Les données sont envoyées depuis un PC source vers un serveur de destination. Quelles sont les trois instructions qui décrivent correctement la fonction de TCP ou UDP ? (Choisissez-en trois.)",
        options: ["Le champ du port source identifie l'application ou le service qui gérera les données renvoyées au PC.", "Le processus TCP sélectionne aléatoirement le port de destination lors de l'établissement d'une session.", "Les segments UDP sont encapsulés dans des paquets IP pour être transportés.", "Le numéro de port de destination UDP identifie l'application ou le service sur le serveur.", "TCP est préféré lorsqu'une fonction nécessite une surcharge réseau plus faible.", "Le numéro de port source TCP identifie l'hôte expéditeur."],
        correctAnswers: [0, 2, 3],
        type: 'multiple',
        explanation: "Les numéros de port source identifient l'application, les segments UDP sont encapsulés dans des paquets IP, et le port de destination UDP identifie le service."
    },
    {
        id: 149,
        question: "Faites correspondre chaque description avec le mécanisme TCP correspondant.",
        type: 'matching',
        leftItems: [
            "nombre d'octets qu'un périphérique peut accepter",
            "utilisé pour identifier les segments manquants",
            "méthode de gestion des segments perdus",
            "reçu par un expéditeur avant de transmettre plus de segments"
        ],
        rightItems: [
            "acknowledgment",
            "retransmission",
            "FCS",
            "sequence numbers",
            "window size"
        ],
        correctMatches: {
            0: 4,  // nombre d'octets → window size
            1: 3,  // identifier segments manquants → sequence numbers
            2: 1,  // gestion segments perdus → retransmission
            3: 0   // reçu par expéditeur → acknowledgment
        },
        options: [],
        correctAnswers: [],
        explanation: "Window size pour le nombre d'octets, sequence numbers pour identifier les segments, retransmission pour gérer les pertes, acknowledgment reçu avant de transmettre.",
        imageUrl: "https://itexamanswers.net/wp-content/uploads/2020/01/20.jpg"
    },
    {
        id: 150,
        question: "Quelle commande affiche la table de routage d'un routeur Cisco ?",
        options: ["show interfaces", "show ip route", "show running-config", "show arp"],
        correctAnswers: [1],
        type: 'single',
        explanation: "La commande 'show ip route' affiche la table de routage d'un routeur Cisco."
    },
    {
        id: 151,
        question: "Un administrateur réseau souhaite avoir le même masque de sous-réseau pour trois sous-réseaux. Le site dispose de: Sous-réseau A: 10 adresses, Sous-réseau B: 8 adresses, Sous-réseau C: 2 adresses. Quel masque de sous-réseau unique serait approprié ?",
        options: ["255.255.255.0", "255.255.255.240", "255.255.255.248", "255.255.255.252"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Avec 10 hôtes maximum, 4 bits d'hôte sont nécessaires. Le masque /28 (255.255.255.240) fournit 14 adresses utilisables."
    },
    {
        id: 152,
        question: "Quelle adresse MAC est utilisée pour les diffusions (broadcast) ?",
        options: ["00:00:00:00:00:00", "FF:FF:FF:FF:FF:FF", "01:00:5E:00:00:00", "33:33:00:00:00:00"],
        correctAnswers: [1],
        type: 'single',
        explanation: "L'adresse MAC FF:FF:FF:FF:FF:FF est utilisée pour les diffusions sur un réseau Ethernet."
    },
    {
        id: 153,
        question: "Quelles sont les deux informations affichées dans la sortie de la commande show ip interface brief ? (Choisissez-en deux.)",
        options: ["Adresses IP", "descriptions d'interface", "Adresses MAC", "adresses du prochain saut", "Statuts de couche 1", "réglages de vitesse et duplex"],
        correctAnswers: [0, 4],
        type: 'multiple',
        explanation: "La commande show ip interface brief affiche l'adresse IP et l'état opérationnel aux couches 1 et 2."
    },
    {
        id: 154,
        question: "Un utilisateur se plaint qu'une page Web externe prend plus de temps que d'habitude à charger. Quel outil le technicien doit-il utiliser afin de localiser où se situe le problème ?",
        options: ["ping", "nslookup", "tracert", "ipconfig /displaydns"],
        correctAnswers: [2],
        type: 'single',
        explanation: "La commande tracert mappera le chemin du PC au serveur Web et mesurera les délais de transit."
    },
    {
        id: 155,
        question: "Quelle valeur, contenue dans un champ d'en-tête IPv4, est décrémentée par chaque routeur qui reçoit un paquet ?",
        options: ["Longueur de l'en-tête", "Services différenciés", "Temps de vie", "Décalage des fragments"],
        correctAnswers: [2],
        type: 'single',
        explanation: "Le routeur décrémente le champ Time-to-Live (TTL) de 1 à chaque saut."
    },
    {
        id: 156,
        question: "Quelle est la taille maximale d'une trame Ethernet standard ?",
        options: ["1024 octets", "1518 octets", "1522 octets", "9000 octets"],
        correctAnswers: [1],
        type: 'single',
        explanation: "La taille maximale d'une trame Ethernet standard est de 1518 octets."
    },
    {
        id: 157,
        question: "Un technicien réseau étudie l'utilisation du câblage à fibre optique. Quelles sont les deux questions à prendre en compte ? (Choisissez-en deux.)",
        options: ["Le câblage à fibre optique nécessite une expertise en terminaison et épissage différente du cuivre.", "Le câblage à fibre optique nécessite une mise à la terre spécifique contre les EMI.", "Le câblage à fibre optique est sensible à la perte de signal due aux RFI.", "Le câble à fibre optique peut résister à une manipulation brutale.", "La fibre optique offre une capacité plus élevée mais est plus chère que le cuivre."],
        correctAnswers: [0, 4],
        type: 'multiple',
        explanation: "La fibre optique est plus chère et nécessite des compétences différentes pour terminer et épisser."
    },
    {
        id: 158,
        question: "Un utilisateur exécute un tracert sur un appareil distant. À quel moment un routeur cesserait-il de transférer le paquet ?",
        options: ["lorsque le routeur reçoit un message ICMP Time Exceed", "lorsque la valeur RTT atteint zéro", "lorsque l'hôte répond avec un Echo Reply", "lorsque la valeur dans le champ TTL atteint zéro", "lorsque les valeurs Echo Request et Echo Reply atteignent zéro"],
        correctAnswers: [3],
        type: 'single',
        explanation: "Le routeur décrémente le TTL de 1 à chaque saut. Quand il atteint zéro, le paquet n'est plus transféré."
    },
    {
        id: 159,
        question: "Les utilisateurs signalent que l'accès au réseau est lent. Un employé avait téléchargé un programme tiers. Quel type de logiciel malveillant pourrait être introduit ?",
        options: ["virus", "ver", "hameçonnage", "spam"],
        correctAnswers: [1],
        type: 'single',
        explanation: "Un ver (worm) peut se propager sur le réseau et causer des ralentissements de performance."
    }
];

// Helper function to shuffle questions
export const shuffleQuestions = (questions: CCNAQuestion[]): CCNAQuestion[] => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Helper function to get random questions
export const getRandomQuestions = (questions: CCNAQuestion[], count: number): CCNAQuestion[] => {
    const shuffled = shuffleQuestions(questions);
    return shuffled.slice(0, Math.min(count, shuffled.length));
};
