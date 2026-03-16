import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Quote, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useState, useCallback, useEffect as useLayoutEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const localTranslations = {
    fr: {
        backToHome: "Retour à l'accueil",
        heroTag: "Mois de la Conscience Noire",
        heroTitle: "ÉCHOS DE L'ANCESTRALITÉ",
        heroSubtitle: "La Célébration de l'Identité Angolaise au Cœur de Montréal",
        heroDate: "20 Février 2026 · Montérégie, Québec",
        sectionIntro: "Introduction",
        sectionExperience: "L'Expérience",
        sectionGastronomie: "Gastronomie",
        sectionLegacy: "L'Héritage",
        sectionGallery: "Galerie",
        sectionNextEvent: "Événement Suivant",
        introP1: "Au cœur du mois de la Conscience Noire, un événement d'une rare intensité a résonné à travers les corridors de la communauté lusophone de Montérégie. La collaboration entre la CENA — Communauté angolaise pour l'éducation et le réseautage — et le CAF — Centre d'Aide à la Famille — a donné naissance à une célébration qui a transcendé les frontières de la simple commémoration pour devenir un véritable manifeste de culture, de mémoire et de résistance.",
        introP2: "Dans une salle baignée de lumière chaude et de couleurs vibrantes, des dizaines de participants se sont rassemblés pour honorer un héritage qui traverse les océans et les générations. Cet événement, conçu avec une minutie qui témoigne du dévouement de ses organisateurs, a offert une expérience immersive où chaque détail — des tissus africains disposés avec soin aux arômes enveloppants des plats traditionnels — racontait une histoire d'appartenance et de fierté.",
        pullQuote1: "La culture n'est pas un spectacle à observer, mais un fleuve vivant qui coule dans les veines de ceux qui refusent d'oublier.",
        experienceTitle: "UNE EXPÉRIENCE IMMERSIVE",
        experienceP1: "L'espace s'est transformé en un véritable musée vivant de l'identité angolaise. Des étoffes aux motifs géométriques complexes, tissées selon des techniques ancestrales transmises de mère en fille, ornaient les murs et les tables. Ces tissus — les célèbres samakaka, les kente aux fils d'or et les capulanas aux imprimés floraux — ne sont pas de simples pièces décoratives. Ils portent en eux les codes sociaux, les histoires familiales et les prières silencieuses d'un peuple qui a su préserver sa dignité à travers les tempêtes de l'histoire.",
        experienceP2: "Au centre de l'exposition, un grand panneau cartographique présentait les dix-huit provinces d'Angola, chacune accompagnée de symboles culturels distinctifs. Les participants pouvaient y découvrir la richesse ethnolinguistique du pays, des Bakongo du nord aux Ovimbundu du plateau central, en passant par les Tchokwe aux masques rituels mondialement reconnus. Cette carte n'était pas qu'un simple outil géographique : elle constituait une invitation au voyage intérieur, un rappel que l'identité angolaise est un mosaïque de cultures, de langues et de traditions qui s'enrichissent mutuellement.",
        experienceP3: "Des artisans ont partagé leurs savoir-faire avec une générosité désarmante. La fabrication de bijoux en perles, l'art de nouer le turbuleto traditionnel et la confection de paniers en fibre de palmier ont captivé l'attention des visiteurs, transformant chaque coin de l'espace en un atelier de transmission vivante. Les plus jeunes, les yeux écarquillés, découvraient pour la première fois des gestes que leurs arrière-grands-parents pratiquaient quotidiennement sur le continent africain.",
        pullQuote2: "Chaque tissu porte un nom, chaque motif raconte une bataille, chaque couleur chante une victoire.",
        gastronomieTitle: "LA TABLE COMME PATRIMOINE",
        gastronomieP1: "La gastronomie a occupé une place centrale dans cette célébration, fidèle à la tradition lusophone où la table est un lieu sacré de partage et de communion. Un buffet soigneusement préparé offrait un panorama des saveurs qui définissent la cuisine angolaise : du muamba de galinha aux arômes de gingembre et d'ail, en passant par le calulu aux poissons séchés et légumes frais, sans oublier les funge de milho — cette polenta douce qui accompagne chaque repas et symbolise l'unité familiale.",
        gastronomieP2: "Les desserts, eux aussi, racontaient des histoires. La cocada — confiserie à base de noix de coco râpée et de sucre caramélisé — évoquait les marchés de Luanda, tandis que les beignets de banane rappelaient les après-midis de l'enfance sous les manguiers. Chaque bouchée était une capsule temporelle, transportant les convives vers des souvenirs partagés ou des imaginaires rêvés.",
        gastronomieP3: "Au-delà du simple plaisir gustatif, ces moments de dégustation ont servi de catalyseur pour le réseautage et l'échange. Autour des plats fumants, des conversations se sont nouées entre des professionnels de divers horizons, des étudiants fraîchement arrivés au Canada et des membres établis de la communauté depuis des décennies. La nourriture, dans sa dimension la plus profonde, a rempli ici sa fonction ancestrale : celle de rassembler les êtres humains autour de ce qu'ils ont de plus précieux — leur humanité partagée.",
        pullQuote3: "À la table de l'exil, la saveur de la terre natale est le plus puissant des passeports.",
        legacyTitle: "L'HÉRITAGE VIVANT",
        legacyP1: "Cet événement a également mis en lumière le rôle stratégique de la CENA dans le tissu associatif de la Montérégie. En s'alliant avec le CAF, l'organisation a démontré sa capacité à tisser des partenariats institutionnels qui dépassent les frontières communautaires pour toucher l'ensemble de la société québécoise. Cette synergie entre deux organisations aux missions complémentaires — l'une tournée vers l'éducation et le réseautage, l'autre vers le soutien familial — incarne un modèle de collaboration que bien des acteurs sociaux pourraient embrasser.",
        legacyP2: "La présence de familles entières, des grands-parents aux tout-petits, témoignait de la dimension intergénérationnelle de cette célébration. Dans un monde où la diaspora est souvent confrontée au défi de la transmission culturelle, des événements de cette envergure agissent comme des ponts entre le passé et l'avenir. Ils rappellent aux jeunes générations que leur identité n'est pas un fardeau à dissimuler, mais un trésor à cultiver avec fierté et intelligence.",
        legacyP3: "Au terme de cette journée empreinte d'émotion et de beauté, un sentiment unanime habitait les participants : celui d'avoir vécu quelque chose qui dépasse la simple festivité. Le Mês da Consciência Negra, tel que célébré par la CENA et le CAF, n'est pas un exercice de nostalgie. C'est un acte de construction — construction d'une mémoire collective, d'une solidarité renouvelée et d'un avenir où l'excellence de la diaspora angolaise au Canada brillera avec la force de mille soleils.",
        legacyConclusion: "Parce que se souvenir ensemble, c'est déjà résister ensemble.",
        galleryTitle: "MOMENTS CAPTURÉS",
        gallerySubtitle: "Fragments d'une soirée inoubliable",
        photoCredit: "Photo par Randy Sélection 514-575-5019",
        nextEventTag: "Événement Suivant",
        nextEventTitle: "HÉRITAGE D'EXCELLENCE",
        nextEventSubtitle: "Les Noirs qui font l'Histoire — Sommet annuel",
        nextEventButton: "Lire l'article",
    },
    en: {
        backToHome: "Back to Home",
        heroTag: "Black Consciousness Month",
        heroTitle: "ECHOES OF ANCESTRY",
        heroSubtitle: "Celebrating Angolan Identity in the Heart of Montréal",
        heroDate: "February 20, 2026 · Montérégie, Québec",
        sectionIntro: "Introduction",
        sectionExperience: "The Experience",
        sectionGastronomie: "Gastronomy",
        sectionLegacy: "The Legacy",
        sectionGallery: "Gallery",
        sectionNextEvent: "Next Event",
        introP1: "At the heart of Black Consciousness Month, an event of rare intensity resonated through the corridors of the Lusophone community in Montérégie. The collaboration between CENA — the Angolan Community for Education and Networking — and CAF — the Family Assistance Center — gave birth to a celebration that transcended the boundaries of simple commemoration to become a true manifesto of culture, memory, and resistance.",
        introP2: "In a room bathed in warm light and vibrant colors, dozens of participants gathered to honor a heritage that crosses oceans and generations. This event, conceived with a meticulousness that speaks to the dedication of its organizers, offered an immersive experience where every detail — from carefully arranged African textiles to the enveloping aromas of traditional dishes — told a story of belonging and pride.",
        pullQuote1: "Culture is not a spectacle to observe, but a living river that flows through the veins of those who refuse to forget.",
        experienceTitle: "AN IMMERSIVE EXPERIENCE",
        experienceP1: "The space was transformed into a living museum of Angolan identity. Fabrics with complex geometric patterns, woven using ancestral techniques passed from mother to daughter, adorned the walls and tables. These textiles — the celebrated samakaka, kente with golden threads, and capulanas with floral prints — are not mere decorative pieces. They carry within them social codes, family histories, and the silent prayers of a people who have preserved their dignity through the storms of history.",
        experienceP2: "At the center of the exhibition, a large cartographic panel presented the eighteen provinces of Angola, each accompanied by distinctive cultural symbols. Participants could discover the ethnolinguistic richness of the country, from the Bakongo of the north to the Ovimbundu of the central plateau, passing through the Tchokwe with their internationally recognized ritual masks. This map was more than a simple geographic tool: it was an invitation to an inner journey, a reminder that Angolan identity is a mosaic of cultures, languages, and traditions that mutually enrich one another.",
        experienceP3: "Artisans shared their expertise with disarming generosity. The crafting of beaded jewelry, the art of tying the traditional turban, and the weaving of palm fiber baskets captivated visitors, transforming every corner of the space into a workshop of living transmission. The youngest, wide-eyed, discovered for the first time gestures their great-grandparents practiced daily on the African continent.",
        pullQuote2: "Every fabric bears a name, every pattern tells a battle, every color sings a victory.",
        gastronomieTitle: "THE TABLE AS HERITAGE",
        gastronomieP1: "Gastronomy occupied a central place in this celebration, faithful to the Lusophone tradition where the table is a sacred place of sharing and communion. A carefully prepared buffet offered a panorama of flavors that define Angolan cuisine: from muamba de galinha with its aromas of ginger and garlic, to calulu with dried fish and fresh vegetables, and the funge de milho — that soft polenta that accompanies every meal and symbolizes family unity.",
        gastronomieP2: "The desserts, too, told stories. The cocada — a confection of grated coconut and caramelized sugar — evoked the markets of Luanda, while banana fritters recalled childhood afternoons under mango trees. Each bite was a time capsule, transporting guests to shared memories or dreamed imaginaries.",
        gastronomieP3: "Beyond simple gustatory pleasure, these tasting moments served as catalysts for networking and exchange. Around steaming dishes, conversations blossomed between professionals from diverse backgrounds, recently arrived students, and community members established in Canada for decades. Food, in its deepest dimension, fulfilled its ancestral function here: that of gathering human beings around what they hold most precious — their shared humanity.",
        pullQuote3: "At the table of exile, the flavor of the homeland is the most powerful passport.",
        legacyTitle: "THE LIVING LEGACY",
        legacyP1: "This event also highlighted CENA's strategic role in the associative fabric of Montérégie. By partnering with CAF, the organization demonstrated its capacity to weave institutional partnerships that extend beyond community boundaries to touch the whole of Québec society. This synergy between two organizations with complementary missions — one focused on education and networking, the other on family support — embodies a model of collaboration that many social actors could embrace.",
        legacyP2: "The presence of entire families, from grandparents to toddlers, attested to the intergenerational dimension of this celebration. In a world where the diaspora often faces the challenge of cultural transmission, events of this magnitude act as bridges between past and future. They remind younger generations that their identity is not a burden to hide but a treasure to cultivate with pride and intelligence.",
        legacyP3: "At the end of this day imbued with emotion and beauty, a unanimous feeling inhabited the participants: that of having experienced something that transcends simple festivity. Black Consciousness Month, as celebrated by CENA and CAF, is not an exercise in nostalgia. It is an act of construction — construction of a collective memory, renewed solidarity, and a future where the excellence of the Angolan diaspora in Canada will shine with the force of a thousand suns.",
        legacyConclusion: "Because remembering together is already resisting together.",
        galleryTitle: "CAPTURED MOMENTS",
        gallerySubtitle: "Fragments of an unforgettable evening",
        photoCredit: "Photo by Randy Selection 514-575-5019",
        nextEventTag: "Next Event",
        nextEventTitle: "HERITAGE OF EXCELLENCE",
        nextEventSubtitle: "Black People Making History — Annual Summit",
        nextEventButton: "Read the article",
    },
    pt: {
        backToHome: "Voltar ao Início",
        heroTag: "Mês da Consciência Negra",
        heroTitle: "ECOS DA ANCESTRALIDADE",
        heroSubtitle: "A Celebração da Identidade Angolana no Coração de Montréal",
        heroDate: "20 de Fevereiro de 2026 · Montérégie, Québec",
        sectionIntro: "Introdução",
        sectionExperience: "A Experiência",
        sectionGastronomie: "Gastronomia",
        sectionLegacy: "O Legado",
        sectionGallery: "Galeria",
        sectionNextEvent: "Próximo Evento",
        introP1: "No pulsar vibrante do Mês da Consciência Negra, a união entre a CENA — Comunidade angolana para a educação e networking — e o CAF — Centre d'Aide à la Famille — transformou-se num manifesto vivo de cultura e resistência. Num encontro que transcendeu a mera formalidade, a comunidade reuniu-se para honrar as raízes que sustentam a diáspora angolana em solo canadiano.",
        introP2: "Numa sala banhada por luz quente e cores vibrantes, dezenas de participantes congregaram-se para celebrar uma herança que atravessa oceanos e gerações. Este evento, concebido com uma minúcia que testemunha a dedicação dos seus organizadores, ofereceu uma experiência imersiva onde cada detalhe — dos tecidos africanos dispostos com cuidado aos aromas envolventes dos pratos tradicionais — contava uma história de pertença e de orgulho.",
        pullQuote1: "A cultura não é um espetáculo para se observar, mas um rio vivo que corre nas veias de quem se recusa a esquecer.",
        experienceTitle: "UMA EXPERIÊNCIA IMERSIVA",
        experienceP1: "O espaço transformou-se num verdadeiro museu vivo da identidade angolana. Tecidos com padrões geométricos complexos, tecidos segundo técnicas ancestrais transmitidas de mãe para filha, ornamentavam as paredes e as mesas. Estes tecidos — os célebres samakaka, os kente com fios de ouro e as capulanas com estampados florais — não são simples peças decorativas. Carregam em si os códigos sociais, as histórias familiares e as orações silenciosas de um povo que soube preservar a sua dignidade através das tempestades da história.",
        experienceP2: "No centro da exposição, um grande painel cartográfico apresentava as dezoito províncias de Angola, cada uma acompanhada por símbolos culturais distintivos. Os participantes puderam descobrir a riqueza etnolinguística do país, dos Bakongo do norte aos Ovimbundu do planalto central, passando pelos Tchokwe com as suas máscaras rituais mundialmente reconhecidas. Este mapa não era uma mera ferramenta geográfica: constituía um convite à viagem interior, um lembrete de que a identidade angolana é um mosaico de culturas, línguas e tradições que se enriquecem mutuamente.",
        experienceP3: "Artesãos partilharam os seus saberes com uma generosidade desarmante. A fabricação de joias em pérolas, a arte de atar o turbuleto tradicional e a confeção de cestos em fibra de palmeira cativaram a atenção dos visitantes, transformando cada canto do espaço num ateliê de transmissão viva. Os mais jovens, de olhos arregalados, descobriam pela primeira vez gestos que os seus bisavós praticavam quotidianamente no continente africano.",
        pullQuote2: "Cada tecido carrega um nome, cada padrão conta uma batalha, cada cor canta uma vitória.",
        gastronomieTitle: "A MESA COMO PATRIMÓNIO",
        gastronomieP1: "A gastronomia ocupou um lugar central nesta celebração, fiel à tradição lusófona onde a mesa é um lugar sagrado de partilha e comunhão. Um buffet cuidadosamente preparado oferecia um panorama de sabores que definem a cozinha angolana: da muamba de galinha aos aromas de gengibre e alho, passando pelo calulu com peixes secos e legumes frescos, sem esquecer o funge de milho — aquela polenta suave que acompanha cada refeição e simboliza a unidade familiar.",
        gastronomieP2: "As sobremesas também contavam histórias. A cocada — doçaria à base de coco ralado e açúcar caramelizado — evocava os mercados de Luanda, enquanto as filhoses de banana recordavam as tardes de infância sob as mangueiras. Cada dentada era uma cápsula temporal, transportando os convivas para memórias partilhadas ou imaginários sonhados.",
        gastronomieP3: "Para além do simples prazer gustativo, estes momentos de degustação serviram de catalisador para o networking e a troca. Em torno dos pratos fumegantes, conversas brotaram entre profissionais de diversos horizontes, estudantes recém-chegados ao Canadá e membros estabelecidos da comunidade há décadas. A comida, na sua dimensão mais profunda, cumpriu aqui a sua função ancestral: a de reunir os seres humanos em torno daquilo que têm de mais precioso — a sua humanidade partilhada.",
        pullQuote3: "À mesa do exílio, o sabor da terra natal é o mais poderoso dos passaportes.",
        legacyTitle: "O LEGADO VIVO",
        legacyP1: "Este evento iluminou também o papel estratégico da CENA no tecido associativo da Montérégie. Ao aliar-se com o CAF, a organização demonstrou a sua capacidade de tecer parcerias institucionais que ultrapassam as fronteiras comunitárias para tocar o conjunto da sociedade quebequense. Esta sinergia entre duas organizações de missões complementares — uma voltada para a educação e o networking, outra para o apoio familiar — encarna um modelo de colaboração que muitos atores sociais poderiam abraçar.",
        legacyP2: "A presença de famílias inteiras, dos avós aos mais pequenos, testemunhava a dimensão intergeracional desta celebração. Num mundo onde a diáspora enfrenta frequentemente o desafio da transmissão cultural, eventos desta envergadura atuam como pontes entre o passado e o futuro. Recordam às gerações mais jovens que a sua identidade não é um fardo a dissimular, mas um tesouro a cultivar com orgulho e inteligência.",
        legacyP3: "No termo deste dia imbuído de emoção e beleza, um sentimento unânime habitava os participantes: o de terem vivido algo que transcende a simples festividade. O Mês da Consciência Negra, tal como celebrado pela CENA e pelo CAF, não é um exercício de nostalgia. É um ato de construção — construção de uma memória coletiva, de uma solidariedade renovada e de um futuro onde a excelência da diáspora angolana no Canadá brilhará com a força de mil sóis.",
        legacyConclusion: "Porque lembrar juntos já é resistir juntos.",
        galleryTitle: "MOMENTOS CAPTURADOS",
        gallerySubtitle: "Fragmentos de uma noite inesquecível",
        photoCredit: "Foto por Randy Sélection 514-575-5019",
        nextEventTag: "Próximo Evento",
        nextEventTitle: "HERANÇA DE EXCELÊNCIA",
        nextEventSubtitle: "Os Negros que fazem História — Cimeira anual",
        nextEventButton: "Ler o artigo",
    }
};

const GALLERY_IMAGES = [
    { src: '/gallery/Mes-da-consciencianegra-cena-caf/album2-001.webp', span: 'col-span-2 row-span-2' },
    { src: '/gallery/Mes-da-consciencianegra-cena-caf/album2-003.webp', span: 'col-span-1 row-span-2' },
    { src: '/gallery/Mes-da-consciencianegra-cena-caf/album2-005.webp', span: 'col-span-1 row-span-1' },
    { src: '/gallery/Mes-da-consciencianegra-cena-caf/album2-007.webp', span: 'col-span-1 row-span-1' },
    { src: '/gallery/Mes-da-consciencianegra-cena-caf/album2-009.webp', span: 'col-span-2 row-span-1' },
    { src: '/gallery/Mes-da-consciencianegra-cena-caf/album2-011.webp', span: 'col-span-1 row-span-1' },
    { src: '/gallery/Mes-da-consciencianegra-cena-caf/album2-012.webp', span: 'col-span-1 row-span-2' },
    { src: '/gallery/Mes-da-consciencianegra-cena-caf/album2-013.webp', span: 'col-span-1 row-span-1' },
];

export function PastEventConscienciaNegra() {
    const { language } = useLanguage();
    const t = localTranslations[language as keyof typeof localTranslations] || localTranslations.en;

    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Prevent scroll when lightbox is open
    useLayoutEffect(() => {
        if (selectedImageIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedImageIndex]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_IMAGES.length);
        }
    }, [selectedImageIndex]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
        }
    }, [selectedImageIndex]);

    const handleClose = useCallback(() => {
        setSelectedImageIndex(null);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return;
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, handleClose, handleNext, handlePrev]);

    const sections = [
        { id: 'hero', label: t.sectionIntro },
        { id: 'experience', label: t.sectionExperience },
        { id: 'gastronomie', label: t.sectionGastronomie },
        { id: 'legacy', label: t.sectionLegacy },
        { id: 'gallery', label: t.sectionGallery },
        { id: 'next-event', label: t.sectionNextEvent },
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <div className="bg-[#0A0A0A] min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#C5A059] selection:text-black">
            {/* Sticky Navigation Sidebar */}
            <nav className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6 pl-8">
                <Link
                    to="/"
                    className="text-white/50 hover:text-[#C5A059] transition-colors mb-8 flex items-center gap-2 text-xs uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4" /> {t.backToHome}
                </Link>
                <div className="h-px w-8 bg-white/20 mb-4" />
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-[10px] text-left uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors hover:translate-x-2 duration-300"
                    >
                        {section.label}
                    </button>
                ))}
            </nav>

            <div className="lg:pl-32">
                {/* Mobile & Desktop Headers */}
                <div className="lg:hidden fixed top-0 w-full z-50 bg-[#0A0A0A]/90 backdrop-blur border-b border-white/5 p-4 flex justify-between items-center">
                    <Link to="/" className="text-white/70 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4" /> {t.backToHome}
                    </Link>
                    <LanguageSwitcher isScrolled={false} />
                </div>

                <div className="hidden lg:block fixed top-12 right-12 z-50">
                    <LanguageSwitcher isScrolled={false} />
                </div>

                {/* ══════════════════════════════════════
                   1. HERO SECTION
                ══════════════════════════════════════ */}
                <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 z-0"
                    >
                        <img
                            src="/gallery/Mes-da-consciencianegra-cena-caf/album2-001.webp"
                            alt="Mês da Consciência Negra"
                            className="w-full h-full object-cover brightness-[0.35]"
                            style={{ objectPosition: 'center 35%' }}
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30 z-[1]" />

                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-24 md:mt-16">
                        <div className="flex flex-col items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="flex items-center justify-center gap-4 mb-6"
                            >
                                <span className="h-px w-12 bg-[#C5A059]" />
                                <span className="text-[#C5A059] text-xs md:text-sm tracking-[0.4em] uppercase font-bold" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                                    {t.heroTag}
                                </span>
                                <span className="h-px w-12 bg-[#C5A059]" />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-wider text-center mb-4"
                                style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}
                            >
                                {t.heroTitle}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="w-16 h-[2px] bg-[#C5A059] mb-6"
                            />

                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="font-serif italic text-xl md:text-2xl lg:text-3xl font-light text-white/90 text-center mb-8"
                                style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}
                            >
                                {t.heroSubtitle}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/50 font-sans"
                            >
                                {t.heroDate}
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                   2. INTRODUCTION
                ══════════════════════════════════════ */}
                <section className="py-24 md:py-32 px-6 lg:pr-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                        className="max-w-3xl mx-auto"
                    >
                        {/* Drop cap first paragraph */}
                        <p className="font-serif text-lg md:text-xl leading-[1.9] text-white/80 mb-10 first-letter:text-6xl first-letter:font-bold first-letter:text-[#C5A059] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8]">
                            {t.introP1}
                        </p>
                        <p className="font-serif text-lg md:text-xl leading-[1.9] text-white/70 mb-16">
                            {t.introP2}
                        </p>
                    </motion.div>

                    {/* Pull Quote */}
                    <motion.blockquote
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        className="max-w-3xl mx-auto border-l-2 border-[#C5A059] pl-8 md:pl-12 py-6 my-16"
                    >
                        <Quote className="w-8 h-8 text-[#C5A059]/30 mb-4" />
                        <p className="font-serif italic text-2xl md:text-3xl leading-[1.6] text-white/90">
                            {t.pullQuote1}
                        </p>
                    </motion.blockquote>
                </section>

                {/* ══════════════════════════════════════
                   3. IMMERSIVE EXPERIENCE
                ══════════════════════════════════════ */}
                <section id="experience" className="relative py-24 md:py-32">
                    {/* Full-width image break */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.2 }}
                        className="w-full h-[50vh] md:h-[60vh] overflow-hidden mb-24"
                    >
                        <img
                            src="/gallery/Mes-da-consciencianegra-cena-caf/album2-005.webp"
                            alt=""
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 25%' }}
                        />
                    </motion.div>

                    <div className="px-6 lg:pr-24">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeUp}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-px w-12 bg-[#C5A059]" />
                                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A059] font-bold">
                                    {t.sectionExperience}
                                </span>
                            </div>

                            <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-widest text-white mb-14">
                                {t.experienceTitle}
                            </h2>

                            <p className="font-serif text-lg md:text-xl leading-[1.9] text-white/80 mb-10">
                                {t.experienceP1}
                            </p>
                            <p className="font-serif text-lg md:text-xl leading-[1.9] text-white/70 mb-10">
                                {t.experienceP2}
                            </p>
                            <p className="font-serif text-lg md:text-xl leading-[1.9] text-white/70 mb-16">
                                {t.experienceP3}
                            </p>
                        </motion.div>

                        {/* Inline image pair */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeUp}
                            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-16"
                        >
                            <div className="aspect-[4/5] overflow-hidden">
                                <img
                                    src="/gallery/Mes-da-consciencianegra-cena-caf/album2-004.webp"
                                    alt=""
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                />
                            </div>
                            <div className="aspect-[4/5] overflow-hidden">
                                <img
                                    src="/gallery/Mes-da-consciencianegra-cena-caf/album2-006.webp"
                                    alt=""
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                />
                            </div>
                        </motion.div>

                        {/* Pull Quote 2 */}
                        <motion.blockquote
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeUp}
                            className="max-w-3xl mx-auto border-l-2 border-[#C5A059] pl-8 md:pl-12 py-6 my-16"
                        >
                            <Quote className="w-8 h-8 text-[#C5A059]/30 mb-4" />
                            <p className="font-serif italic text-2xl md:text-3xl leading-[1.6] text-white/90">
                                {t.pullQuote2}
                            </p>
                        </motion.blockquote>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                   4. GASTRONOMY
                ══════════════════════════════════════ */}
                <section id="gastronomie" className="py-24 md:py-32 px-6 lg:pr-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px w-12 bg-[#C5A059]" />
                            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A059] font-bold">
                                {t.sectionGastronomie}
                            </span>
                        </div>

                        <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-widest text-white mb-14">
                            {t.gastronomieTitle}
                        </h2>

                        <p className="font-serif text-lg md:text-xl leading-[1.9] text-white/80 mb-10">
                            {t.gastronomieP1}
                        </p>

                        {/* Full-width food image */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 1 }}
                            className="w-full aspect-[21/9] overflow-hidden my-16 -mx-6 md:mx-0"
                        >
                            <img
                                src="/gallery/Mes-da-consciencianegra-cena-caf/album2-hero-cultura.webp"
                                alt=""
                                className="w-full h-full object-cover"
                                style={{ objectPosition: 'center top' }}
                            />
                        </motion.div>

                        <p className="font-serif text-lg md:text-xl leading-[1.9] text-white/70 mb-10">
                            {t.gastronomieP2}
                        </p>
                        <p className="font-serif text-lg md:text-xl leading-[1.9] text-white/70 mb-16">
                            {t.gastronomieP3}
                        </p>
                    </motion.div>

                    {/* Pull Quote 3 */}
                    <motion.blockquote
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        className="max-w-3xl mx-auto border-l-2 border-[#C5A059] pl-8 md:pl-12 py-6 my-8"
                    >
                        <Quote className="w-8 h-8 text-[#C5A059]/30 mb-4" />
                        <p className="font-serif italic text-2xl md:text-3xl leading-[1.6] text-white/90">
                            {t.pullQuote3}
                        </p>
                    </motion.blockquote>
                </section>

                {/* ══════════════════════════════════════
                   5. THE LEGACY
                ══════════════════════════════════════ */}
                <section id="legacy" className="py-24 md:py-32 px-6 lg:pr-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px w-12 bg-[#C5A059]" />
                            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A059] font-bold">
                                {t.sectionLegacy}
                            </span>
                        </div>

                        <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-widest text-white mb-14">
                            {t.legacyTitle}
                        </h2>

                        <p className="font-serif text-lg md:text-xl leading-[1.9] text-white/80 mb-10">
                            {t.legacyP1}
                        </p>
                        <p className="font-serif text-lg md:text-xl leading-[1.9] text-white/70 mb-10">
                            {t.legacyP2}
                        </p>
                        <p className="font-serif text-lg md:text-xl leading-[1.9] text-white/70 mb-16">
                            {t.legacyP3}
                        </p>

                        {/* Closing statement */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={fadeUp}
                            className="text-center py-16 border-t border-b border-white/10"
                        >
                            <p className="font-serif italic text-2xl md:text-3xl text-[#C5A059] leading-[1.6]">
                                {t.legacyConclusion}
                            </p>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ══════════════════════════════════════
                   6. PHOTO GALLERY GRID
                ══════════════════════════════════════ */}
                <section id="gallery" className="py-24 md:py-32 px-6 lg:pr-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                        className="max-w-6xl mx-auto text-center mb-16"
                    >
                        <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-widest text-[#C5A059] mb-4">
                            {t.galleryTitle}
                        </h2>
                        <p className="font-serif italic text-lg text-white/50">
                            {t.gallerySubtitle}
                        </p>
                    </motion.div>

                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 auto-rows-[200px] md:auto-rows-[250px]">
                        {GALLERY_IMAGES.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.6, delay: i * 0.08 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedImageIndex(i);
                                }}
                                className={`${img.span} overflow-hidden group cursor-pointer relative`}
                            >
                                <a 
                                    href={img.src} 
                                    onClick={(e) => e.preventDefault()}
                                    className="block w-full h-full"
                                >
                                    <img
                                        src={img.src}
                                        alt=""
                                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white text-xs tracking-widest uppercase font-bold border border-white/20 px-4 py-2 bg-black/40 backdrop-blur-sm">
                                            Zoom
                                        </span>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-[10px] tracking-[0.3em] uppercase text-white/30 mt-8"
                    >
                        {t.photoCredit}
                    </motion.p>
                </section>

                {/* ══════════════════════════════════════
                   7. NEXT EVENT RECOMMENDATION — Event 1
                ══════════════════════════════════════ */}
                <section id="next-event" className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 z-0"
                    >
                        <img
                            src="/gallery/bcd-060.webp"
                            alt="Heritage of Excellence"
                            className="w-full h-full object-cover brightness-[0.3]"
                            style={{ objectPosition: 'center 30%' }}
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/50 z-[1]" />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="h-px w-8 bg-[#C5A059]" />
                            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A059] font-bold">
                                {t.nextEventTag}
                            </span>
                            <div className="h-px w-8 bg-[#C5A059]" />
                        </div>

                        <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-widest mb-4 text-white">
                            {t.nextEventTitle}
                        </h2>
                        <p className="font-serif italic text-lg md:text-xl text-white/60 mb-12">
                            {t.nextEventSubtitle}
                        </p>

                        <Link
                            to="/events/black-consciousness-day"
                            className="group inline-flex items-center gap-4 bg-transparent border border-[#C5A059] px-10 py-5 text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all duration-500"
                        >
                            {t.nextEventButton}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </motion.div>
                </section>
                {/* ══════════════════════════════════════
                   8. LIGHTBOX MODAL
                ══════════════════════════════════════ */}
                <AnimatePresence>
                    {selectedImageIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                            onClick={handleClose}
                        >
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
                                onClick={handleClose}
                            >
                                <X className="w-8 h-8" />
                            </motion.button>

                            <button
                                className="absolute left-4 md:left-8 text-white/30 hover:text-white transition-colors z-[110] p-4 group"
                                onClick={handlePrev}
                            >
                                <ChevronLeft className="w-10 h-10 md:w-16 md:h-16 group-hover:-translate-x-2 transition-transform" />
                            </button>

                            <button
                                className="absolute right-4 md:right-8 text-white/30 hover:text-white transition-colors z-[110] p-4 group"
                                onClick={handleNext}
                            >
                                <ChevronRight className="w-10 h-10 md:w-16 md:h-16 group-hover:translate-x-2 transition-transform" />
                            </button>

                            <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                <motion.img
                                    key={selectedImageIndex}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    src={GALLERY_IMAGES[selectedImageIndex].src}
                                    alt=""
                                    className="max-w-full max-h-full object-contain shadow-2xl"
                                />
                                
                                <div className="absolute bottom-[-40px] left-0 right-0 text-center">
                                    <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-bold">
                                        {selectedImageIndex + 1} / {GALLERY_IMAGES.length}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
