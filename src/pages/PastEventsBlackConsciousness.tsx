import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

const localTranslations = {
    fr: {
        heroTag: "Journée de la Conscience Noire",
        heroTitleLine1: "HÉRITAGE D'EXCELLENCE",
        heroTitleLine2: "— Des Noirs qui marquent l'histoire",
        heroSubtitle: "Une soirée d'excellence, de culture et d'engagement citoyen à Saint-Hubert.",
        allianceLabel: "Alliance",
        sectionTheme: "Thème",
        sectionReine: "Reine Bombo-Allara",
        sectionShirley: "Shirley Dorismond",
        sectionSoraya: "Soraya Martinez",
        sectionNatilien: "Natilien Joseph",
        sectionBond: "Lien Institutionnel",
        sectionFinale: "L'Équipe",
        dignitariesTitle: "Dignitaires Politiques",
        reineName: "Reine Bombo-Allara",
        reineRole: "Conseillère municipale du district du Boisé-Fonrouge",
        reineDesc: [
            "C’est un honneur pour la Ville de Longueuil d’avoir été représentée par Reine Bombo-Allara, conseillère municipale du district du Boisé-Fonrouge, lors de cette célébration d’envergure. À travers son allocution, elle a transmis la gratitude de notre administration envers les projets qui, à l'image de la CENA, mettent en lumière le génie et les apports fondamentaux des citoyens noirs à notre dynamisme\u00A0régional.",
            "Elle a mis en exergue l’importance capitale du travail de proximité réalisé par la CENA — la Communauté angolaise pour l’éducation et le réseautage — dans la consolidation de notre cohésion sociale et l’ouverture d’un dialogue interculturel permanent en Montérégie. En multipliant les vecteurs de succès et de savoir, vous forgez des alliances pérennes au bénéfice de l'ensemble de la\u00A0collectivité.",
            "L’action déployée par la CENA fortifie notre tissu local en valorisant le potentiel de la jeunesse et le bien-être des familles de la diaspora. Longueuil réitère ainsi son soutien indéfectible pour l’édification d’une société plus solidaire et\u00A0rayonnante.",
            "Nous vous remercions d'incarner avec une telle éloquence cette vision de l'excellence\u00A0humaine."
        ],
        shirleyName: "Shirley Dorismond",
        shirleyRole: "Députée de Marie-Victorin",
        shirleyDesc: [
            "C’est un privilège pour notre assemblée d’avoir accueilli Shirley Dorismond, députée de Marie-Victorin, lors de cette soirée dédiée à l’excellence. Par son message inspirant, elle a réaffirmé l'importance cruciale de l’engagement social et du leadership solidaire au cœur de nos communautés. Son allocution a mis en lumière la nécessité de bâtir des ponts entre les générations afin de garantir que l'héritage de nos bâtisseurs continue d'irriguer notre avenir commun.",
            "Elle a insisté avec ferveur sur l’obligation collective de soutenir des projets qui, à l'instar de la CENA, valorisent la diversité et l’inclusion comme moteurs de prospérité. En plaidant pour une protection accrue des plus vulnérables, elle rappelle que le véritable progrès se mesure à notre capacité à promouvoir une justice équitable pour tous. Ses mots ont résonné comme un appel à l'action pour fortifier les liens de solidarité qui unissent chaque citoyen.",
            "L’implication de la CENA constitue, selon elle, un pilier fondamental pour le rayonnement de la diaspora et l’épanouissement des familles dans notre tissu régional. Shirley Dorismond réitère ainsi son appui indéfectible à l'édification d'une société plus humaine, où chaque talent est reconnu et célébré à sa juste valeur. Elle a salué la vision de leadership inclusif portée par votre organisation avec une détermination exemplaire.",
            "Nous vous remercions d’incarner avec tant de passion et d'authenticité ces valeurs de solidarité et d'excellence."
        ],
        sorayaName: "Soraya Martinez Ferrada",
        sorayaRole: "Mairesse de Montréal",
        sorayaDesc: [
            "C'est avec fierté que je salue l'événement Héritage d'excellence — Les communautés noires qui font l'histoire, une initiative qui met en lumière le rôle précieux que les communautés noires de Montréal ont joué dans le développement, le rayonnement et l'identité de notre ville.",
            "Je souligne également le rôle stratégique de la CENA — la Communauté angolaise pour l'éducation et le réseautage — pour son engagement au sein de la diaspora angolaise et lusophone au Canada. Votre mission de créer des ponts et des occasions d'apprentissage résonne avec la richesse de la diversité montréalaise.",
            "Votre travail enrichit notre métropole en créant des espaces où la culture et l'innovation s'épanouissent, tout en soutenant le leadership et la réussite des jeunes et des familles. Vous bâtissez un avenir plus juste et plus équitable pour toutes et tous.",
            "Merci de faire rayonner l'excellence. Je vous souhaite un événement inspirant et des rencontres stimulantes."
        ],
        sorayaSignature: "Soraya Martinez Ferrada",
        sorayaSignRole: "Mairesse de Montréal",
        josephName: "Natilien Joseph",
        josephRole: "Député de Longueuil—Saint-Hubert",
        josephDesc: [
            "Présent lors de cette célébration de l'excellence, Natilien Joseph, député de Longueuil—Saint-Hubert, a livré un message vibrant axé sur la persévérance, le sens du devoir et la responsabilité profonde de la représentation\u00A0citoyenne.",
            "Dans une allocution empreinte de sincérité, il a exhorté l'assemblée à ne jamais fléchir devant l'adversité, rappelant que la force d'un engagement réside dans la fidélité aux racines et aux visages que nous portons fièrement au sein de nos\u00A0institutions.",
            "Il a souligné avec une conviction solennelle l'importance de garder vivante la flamme du dessein initial : celui de servir avec intégrité. Son intervention a mis en lumière son dévouement inébranlable à porter la voix des plus vulnérables jusqu'aux enceintes du Parlement, transformant les aspirations de la communauté en actions concrètes pour bâtir un avenir plus\u00A0juste.",
            "En saluant le travail de la CENA, il a réaffirmé que l'excellence des communautés noires est le moteur indispensable d'une société plus équitable, où chaque parcours mérite d'être honoré et soutenu par des politiques publiques fortes. Cette vision de leadership humain renforce le lien entre nos racines culturelles et notre engagement envers le progrès commun et\u00A0durable."
        ],
        leadershipTitle: "LEADERSHIP & DIALOGUE INSTITUTIONNEL",
        leadershipDesc: [
            "Cette rencontre témoigne de la force des alliances qui unissent la présidence du CENA et les figures clés du leadership local. Cristina Manuel, présidente du CENA, aux côtés de Reine Bombo-Allara, incarne ici une vision commune dédiée au rayonnement de la diaspora. Ce moment privilégié illustre un dialogue constructif et une collaboration étroite, visant à soutenir les piliers de l’éducation et de l’entrepreneuriat au sein de la communauté.",
            "L'engagement partagé entre ces deux leaders renforce les fondations d'un avenir prometteur pour la jeunesse lusophone au Canada. En unissant leurs expertises et leurs réseaux, elles ouvrent de nouvelles voies vers l’excellence humaine et professionnelle. Ce partenariat est le moteur d'une synergie créative qui valorise notre héritage tout en bâtissant des opportunités concrètes de succès pour toutes les générations."
        ],
        finaleTitle: "Le Grand Final",
        finaleDesc: "Une étape importante pour la diaspora lusophone, unissant l'engagement citoyen à la richesse de l'héritage culturel.",
        backToHome: "Retour à l'accueil",
        nextEventTag: "Événement Suivant",
        nextEventTitle: "MÊS DA CONSCIÊNCIA NEGRA",
        nextEventTitleLine2: "CENA | CAF",
        nextEventSubtitle: "Ecos da Ancestralidade — Célébration de l'identité angolaise",
        nextEventButton: "Lire l'article"
    },
    en: {
        heroTag: "Black Consciousness Day",
        heroTitleLine1: "HERITAGE OF EXCELLENCE",
        heroTitleLine2: "— Black People Making History",
        heroSubtitle: "An evening of excellence, culture, and civic engagement at Saint-Hubert.",
        allianceLabel: "Alliance",
        sectionTheme: "Theme",
        sectionReine: "Reine Bombo-Allara",
        sectionShirley: "Shirley Dorismond",
        sectionSoraya: "Soraya Martinez",
        sectionNatilien: "Natilien Joseph",
        sectionBond: "Institutional Bond",
        sectionFinale: "The Team",
        dignitariesTitle: "Political Dignitaries",
        reineName: "Reine Bombo-Allara",
        reineRole: "City Councilor for the Boisé-Fonrouge district",
        reineDesc: [
            "It is an honor for the City of Longueuil to have been represented by Reine Bombo-Allara, City Councillor for the Boisé-Fonrouge district, during this major celebration. Through her speech, she conveyed our administration's gratitude for projects that, like CENA, highlight the genius and fundamental contributions of Black citizens to our regional\u00A0dynamism.",
            "She highlighted the critical importance of the grassroots work carried out by CENA — the Angolan Community for Education and Networking — in consolidating our social cohesion and opening a permanent intercultural dialogue in Montérégie. By multiplying the vectors of success and knowledge, you forge lasting alliances for the benefit of the entire\u00A0community.",
            "The action deployed by CENA strengthens our local fabric by valuing the potential of youth and the well-being of diaspora families. Longueuil thus reiterates its unwavering support for the building of a more united and radiant\u00A0society.",
            "We thank you for embodying this vision of human excellence with such\u00A0eloquence."
        ],
        shirleyName: "Shirley Dorismond",
        shirleyRole: "MNA for Marie-Victorin",
        shirleyDesc: [
            "It is a privilege for our assembly to have welcomed Shirley Dorismond, Member of the National Assembly for Marie-Victorin, during this evening dedicated to excellence. Through her inspiring message, she reaffirmed the crucial importance of social engagement and solidarity leadership at the heart of our communities. Her speech highlighted the need to build bridges between generations to ensure that the legacy of our builders continues to irrigate our common future.",
            "She fervently insisted on the collective obligation to support projects that, like CENA, value diversity and inclusion as engines of prosperity. By advocating for increased protection of the most vulnerable, she reminds us that true progress is measured by our capacity to promote equitable justice for all. Her words resonated as a call to action to strengthen the bonds of solidarity that unite every citizen.",
            "CENA's involvement constitutes, according to her, a fundamental pillar for the influence of the diaspora and the flourishing of families in our regional fabric. Shirley Dorismond thus reiterates her unwavering support for the building of a more human society, where each talent is recognized and celebrated at its true value. She praised the vision of inclusive leadership carried by your organization with exemplary determination.",
            "We thank you for embodying these values of solidarity and excellence with such passion and authenticity."
        ],
        sorayaName: "Soraya Martinez Ferrada",
        sorayaRole: "Mayor of Montreal",
        sorayaDesc: [
            "It is with great pride that I salute the Heritage of Excellence — Black Communities Making History event, an initiative that highlights the precious role that Montreal's Black communities have played in the development, influence, and identity of our city.",
            "I also highlight the strategic role of CENA — the Angolan Community for Education and Networking — for its commitment within the Angolan and Lusophone diaspora in Canada. Your mission to create bridges and learning opportunities resonates with the richness of Montreal's diversity.",
            "Your work enriches our metropolis by creating spaces where culture and innovation flourish, while supporting the leadership and success of young people and families. You are building a fairer and more equitable future for everyone.",
            "Thank you for sharing excellence. I wish you an inspiring event and stimulating encounters."
        ],
        sorayaSignature: "Soraya Martinez Ferrada",
        sorayaSignRole: "Mayor of Montreal",
        josephName: "Natilien Joseph",
        josephRole: "Member of Parliament for Longueuil—Saint-Hubert",
        josephDesc: [
            "Present during this celebration of excellence, Natilien Joseph, Member of Parliament for Longueuil—Saint-Hubert, delivered a vibrant message focused on perseverance, a sense of duty, and the profound responsibility of civic\u00A0representation.",
            "In a speech imbued with sincerity, he urged the assembly to never yield in the face of adversity, recalling that the strength of a commitment lies in fidelity to the roots and faces we proudly represent within our\u00A0institutions.",
            "With solemn conviction, he emphasized the importance of keeping the flame of the original purpose alive: to serve with integrity. His intervention highlighted his unwavering dedication to amplifying the voices of the most vulnerable all the way to the halls of Parliament, transforming the community's aspirations into concrete actions to build a fairer\u00A0future.",
            "While commending CENA's work, he reaffirmed that the excellence of Black communities is the indispensable driving force of a more equitable society, where every path deserves to be honored and supported by strong public policies. This vision of human leadership strengthens the link between our cultural roots and our commitment to common and sustainable\u00A0progress."
        ],
        leadershipTitle: "LEADERSHIP & INSTITUTIONAL DIALOGUE",
        leadershipDesc: [
            "This meeting bears witness to the strength of the alliances uniting CENA's presidency and key local leadership figures. Cristina Manuel, President of CENA, alongside Reine Bombo-Allara, embodies here a common vision dedicated to the diaspora's influence. This privileged moment illustrates a constructive dialogue and close collaboration, aimed at supporting the pillars of education and entrepreneurship within the community.",
            "The shared commitment between these two leaders strengthens the foundations of a promising future for Lusophone youth in Canada. By combining their expertise and networks, they open new paths toward human and professional excellence. This partnership is the engine of a creative synergy that values our heritage while building concrete opportunities for success for all generations."
        ],
        finaleTitle: "The Grand Finale",
        finaleDesc: "An important milestone for the Lusophone diaspora, uniting civic engagement with the richness of cultural heritage.",
        backToHome: "Back to Home",
        nextEventTag: "Next Event",
        nextEventTitle: "MÊS DA CONSCIÊNCIA NEGRA",
        nextEventTitleLine2: "CENA | CAF",
        nextEventSubtitle: "Echoes of Ancestry — Celebrating Angolan identity",
        nextEventButton: "Read the article"
    },
    pt: {
        heroTag: "Dia da Consciência Negra",
        heroTitleLine1: "HERANÇA DE EXCELÊNCIA",
        heroTitleLine2: "— Pessoas Negras Fazendo História",
        heroSubtitle: "Uma noite de excelência, cultura e engajamento cidadão em Saint-Hubert.",
        allianceLabel: "Aliança",
        sectionTheme: "Tema",
        sectionReine: "Reine Bombo-Allara",
        sectionShirley: "Shirley Dorismond",
        sectionSoraya: "Soraya Martinez",
        sectionNatilien: "Natilien Joseph",
        sectionBond: "Laço Institucional",
        sectionFinale: "A Equipa",
        dignitariesTitle: "Dignitários Políticos",
        reineName: "Reine Bombo-Allara",
        reineRole: "Conselheira municipal do distrito de Boisé-Fonrouge",
        reineDesc: [
            "É uma honra para a Cidade de Longueuil ter sido representada por Reine Bombo-Allara, conselheira municipal do distrito de Boisé-Fonrouge, durante esta celebração de grande envergadura. Através do seu discurso, ela transmitiu a gratidão da nossa administração pelos projetos que, à imagem da CENA, destacam o gênio e as contribuições fundamentais dos cidadãos negros para o nosso dinamismo\u00A0regional.",
            "Ela destacou a importância capital do trabalho de proximidade realizado pela CENA — a Comunidade Angolana para a Educação e o Networking — na consolidação da nossa coesão social e na abertura de um diálogo intercultural permanente na região da Montérégie. Ao multiplicar os vetores de sucesso e de saber, constroem alianças duradouras em benefício de toda a\u00A0coletividade.",
            "A ação mobilizada pela CENA fortalece o nosso tecido local ao valorizar o potencial da juventude e o bem-estar das famílias da diáspora. Longueuil reitera assim o seu apoio inabalável à construção de uma sociedade mais solidária e\u00A0radiante.",
            "Agradecemos por encarnar com tamanha eloquência esta visão de excelência\u00A0humana."
        ],
        shirleyName: "Shirley Dorismond",
        shirleyRole: "Deputada de Marie-Victorin",
        shirleyDesc: [
            "É um privilégio para a nossa assembleia ter acolhido Shirley Dorismond, Deputada da Assembleia Nacional de Marie-Victorin, durante esta noite dedicada à excelência. Através da sua mensagem inspiradora, reafirmou a importância crucial do engajamento social e da liderança solidária no coração das nossas comunidades. O seu discurso destacou a necessidade de construir pontes entre as gerações para garantir que o legado dos nossos construtores continue a irrigar o nosso futuro comum.",
            "Ela insistiu fervorosamente na obrigação coletiva de apoiar projetos que, tal como a CENA, valorizam a diversidade e a inclusão como motores de prosperidade. Ao defender uma maior proteção dos mais vulneráveis, ela lembra-nos que o verdadeiro progresso se mede pela nossa capacidade de promover uma justiça equitativa para todos. As suas palavras ressoaram como um apelo à ação para fortalecer os laços de solidariedade que unem cada cidadão.",
            "O envolvimento da CENA constitui, segundo ela, um pilar fundamental para a influência da diáspora e o florescimento das famílias no nosso tecido regional. Shirley Dorismond reitera assim o seu apoio inabalável à construção de uma sociedade mais humana, onde cada talento é reconhecido e celebrado no seu verdadeiro valor. Ela saudou a visão de liderança inclusiva promovida pela vossa organização com uma determinação exemplar.",
            "Agradecemos por personificar estes valores de solidariedade e excelência com tanta paixão e autenticidade."
        ],
        sorayaName: "Soraya Martinez Ferrada",
        sorayaRole: "Presidente da Câmara de Montreal",
        sorayaDesc: [
            "É com orgulho que saúdo o evento Herança de Excelência — Comunidades Negras que Fazem História, uma iniciativa que destaca o papel precioso que as comunidades negras de Montreal desempenharam no desenvolvimento, influência e identidade da nossa cidade.",
            "Destaco igualmente o papel estratégico da CENA — a Comunidade Angolana para a Educação e o Networking — pelo seu empenho no seio da diáspora angolana e lusófona no Canadá. A vossa missão de criar pontes e oportunidades de aprendizagem ressoa com a riqueza da diversidade de Montreal.",
            "O vosso trabalho enriquece a nossa metrópole ao criar espaços onde a cultura e a inovação florescem, ao mesmo tempo que apoiam a liderança e o sucesso dos jovens e das famílias. Estão a construir um futuro mais justo e mais equitativo para todos.",
            "Obrigado por fazerem brilhar a excelência. Desejo-vos um evento inspirador e encontros estimulantes."
        ],
        sorayaSignature: "Soraya Martinez Ferrada",
        sorayaSignRole: "Presidente da Câmara de Montreal",
        josephName: "Natilien Joseph",
        josephRole: "Deputado de Longueuil—Saint-Hubert",
        josephDesc: [
            "Presente durante esta celebração de excelência, Natilien Joseph, Deputado de Longueuil—Saint-Hubert, proferiu uma mensagem vibrante centrada na perseverança, no sentido do dever e na profunda responsabilidade da representação\u00A0cidadã.",
            "Num discurso imbuído de sinceridade, exortou a assembleia a nunca vacilar perante a adversidade, lembrando que a força de um compromisso reside na fidelidade às raízes e aos rostos que representamos orgulhosamente nas nossas\u00A0instituições.",
            "Com solene convicção, sublinhou a importância de manter viva a chama do propósito inicial: o de servir com integridade. A sua intervenção destacou a sua dedicação inabalável em amplificar a voz dos mais vulneráveis até aos corredores do Parlamento, transformando as aspirações da comunidade em ações concretas para construir um futuro mais\u00A0justo.",
            "Ao enaltecer o trabalho da CENA, reafirmou que a excelência das comunidades negras é o motor indispensável de uma sociedade mais equitativa, onde cada percurso merece ser honrado e apoiado por políticas públicas fortes. Esta visão de liderança humana fortalece o elo entre as nossas raízes culturais e o nosso compromisso com o progresso comum e\u00A0sustentável."
        ],
        leadershipTitle: "LIDERANÇA & DIÁLOGO INSTITUCIONAL",
        leadershipDesc: [
            "Este encontro testemunha a força das alianças que unem a presidência do CENA e as figuras-chave da liderança local. Cristina Manuel, presidente do CENA, ao lado de Reine Bombo-Allara, encarna aqui uma visão comum dedicada à influência da diáspora. Este momento privilegiado ilustra um diálogo construtivo e uma colaboração estreita, visando apoiar os pilares da educação e do empreendedorismo no seio da comunidade.",
            "O compromisso partilhado entre estas duas líderes reforça os alicerces de um futuro promissor para a juventude lusófona no Canadá. Ao unir as suas competências e redes, abrem novos caminhos para a excelência humana e profissional. Esta parceria é o motor de uma sinergia créativa que valoriza a nossa herança ao mesmo tempo que constrói oportunidades concretas de sucesso para todas as gerações."
        ],
        finaleTitle: "O Grande Final",
        finaleDesc: "Um marco importante para a diáspora lusófona, unindo o compromisso cidadão à riqueza da herança cultural.",
        backToHome: "Voltar ao Início",
        nextEventTag: "Próximo Evento",
        nextEventTitle: "MÊS DA CONSCIÊNCIA NEGRA",
        nextEventTitleLine2: "CENA | CAF",
        nextEventSubtitle: "Ecos da Ancestralidade — Celebração da identidade angolana",
        nextEventButton: "Ler o artigo"
    }
};

export function PastEventsBlackConsciousness() {
    const { language } = useLanguage();
    const t = localTranslations[language as keyof typeof localTranslations] || localTranslations.en;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        { id: 'hero', label: t.sectionTheme },
        { id: 'soraya', label: t.sectionSoraya },
        { id: 'reine', label: t.sectionReine },
        { id: 'natilien', label: t.sectionNatilien },
        { id: 'shirley', label: t.sectionShirley },
        { id: 'bond', label: t.sectionBond },
        { id: 'finale', label: t.sectionFinale },
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 } }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 } }
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

                {/* 1. Hero Section */}
                <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 z-0"
                    >
                        <img
                            src="/gallery/bcd-060.webp"
                            alt="Legacy of Excellence"
                            className="w-full h-full object-cover brightness-50"
                            style={{ objectPosition: 'center 30%' }}
                        />
                    </motion.div>

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
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-center mb-6"
                                style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}
                            >
                                {t.heroTitleLine1}
                            </motion.h1>

                            <motion.div 
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="w-16 h-[2px] bg-[#C5A059] mb-6" 
                            />

                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="font-serif italic text-xl md:text-2xl lg:text-3xl font-light text-white/90 text-center mb-8"
                                style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}
                            >
                                {t.heroTitleLine2}
                            </motion.h2>

                            <motion.p 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                                className="text-sm md:text-base lg:text-lg font-serif italic text-white/80 max-w-2xl mx-auto leading-loose text-center"
                                style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}
                            >
                                {t.heroSubtitle}
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* 2. Political Dignitaries */}
                <section className="py-24 md:py-32 px-6 lg:pr-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                        className="max-w-6xl mx-auto mb-20 md:mb-32 text-center"
                    >
                        <h2 className="font-serif text-3xl md:text-5xl uppercase text-[#C5A059] tracking-widest">
                            {t.dignitariesTitle}
                        </h2>
                    </motion.div>

                    {/* Soraya Martinez Ferrada */}
                    <section id="soraya" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-32 md:mb-48">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={slideInRight}
                            className="order-1 lg:order-2 relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group"
                        >
                            <img
                                src="/gallery/soraya-martinez-ferrada-official.png"
                                alt={t.sorayaName}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                style={{ objectPosition: 'center 20%' }}
                            />
                            <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none" />
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={slideInLeft}
                            className="order-2 lg:order-1 flex flex-col justify-center lg:text-right"
                        >
                            <h3 className="font-serif text-3xl md:text-5xl mb-4 leading-tight uppercase tracking-tight">{t.sorayaName}</h3>
                            <p className="text-[#C5A059] uppercase tracking-[0.2em] text-xs md:text-sm mb-12 font-bold font-sans">
                                {t.sorayaRole}
                            </p>
                            
                            <div className="space-y-6 text-white/80 text-base md:text-lg font-sans leading-relaxed border-r-2 border-[#C5A059]/30 pr-8">
                                {(t.sorayaDesc as string[]).map((para: string, idx: number) => (
                                    <p key={idx} className={idx === 0 ? "text-white text-lg md:text-xl font-medium" : ""}>
                                        {para}
                                    </p>
                                ))}
                            </div>

                            <div className="mt-12 flex flex-col items-end gap-1">
                                <p className="font-serif text-xl italic text-[#C5A059]">{t.sorayaSignature}</p>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-sans">{t.sorayaSignRole}</p>
                            </div>
                        </motion.div>
                    </section>

                    {/* Reine Bombo-Allara */}
                    <section id="reine" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-32 md:mb-48">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={slideInLeft}
                            className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group"
                        >
                            <img
                                src="/gallery/reine-bombo-allara-new.webp"
                                alt={t.reineName}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                style={{ objectPosition: 'center 20%' }}
                            />
                            <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none" />
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={slideInRight}
                            className="flex flex-col justify-center"
                        >
                            <h3 className="font-serif text-3xl md:text-5xl mb-4 leading-tight uppercase tracking-tight">{t.reineName}</h3>
                            <p className="text-[#C5A059] uppercase tracking-[0.2em] text-xs md:text-sm mb-12 font-bold font-sans">
                                {t.reineRole}
                            </p>
                            
                            <div className="space-y-6 text-white/80 text-base md:text-lg font-serif leading-relaxed border-l-2 border-[#C5A059]/30 pl-8 text-left">
                                {(t.reineDesc as string[]).map((para: string, idx: number) => (
                                    <p key={idx} className={idx === 0 ? "text-white text-lg md:text-xl font-medium" : ""}>
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    </section>

                    {/* Natilien Joseph */}
                    <section id="natilien" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-32 md:mb-48">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={slideInRight}
                            className="order-1 lg:order-2 relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group"
                        >
                            <img
                                src="/gallery/Héritage d'Éxcelence Les Noirqui font l'Histoire (28 fev 2026) Monsieur Natilien Joseph – Député de Longueuil—Saint-Hubert_oficiel.webp"
                                alt={t.josephName}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                style={{ objectPosition: 'center 20%' }}
                            />
                            <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none" />
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={slideInLeft}
                            className="order-2 lg:order-1 flex flex-col justify-center lg:items-end"
                        >
                            <h3 className="font-serif text-3xl md:text-5xl mb-4 leading-tight uppercase tracking-tight lg:text-right">{t.josephName}</h3>
                            <p className="text-[#C5A059] uppercase tracking-[0.2em] text-xs md:text-sm mb-12 font-bold font-sans lg:text-right">
                                {t.josephRole}
                            </p>
                            
                            <div className="space-y-6 text-white/80 text-base md:text-lg font-serif leading-relaxed border-r-2 border-[#C5A059]/30 pr-8 text-right lg:max-w-prose">
                                {(t.josephDesc as string[]).map((para: string, idx: number) => (
                                    <p key={idx} className={idx === 0 ? "text-white text-lg md:text-xl font-medium" : ""}>
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    </section>

                    {/* Shirley Dorismond */}
                    <section id="shirley" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-32 md:mb-48">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={slideInLeft}
                            className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group"
                        >
                            <img
                                src="/gallery/shirley-dorismond.webp"
                                alt={t.shirleyName}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                style={{ objectPosition: 'center 20%' }}
                            />
                            <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none" />
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={slideInRight}
                            className="flex flex-col justify-center"
                        >
                            <h3 className="font-serif text-3xl md:text-5xl mb-4 leading-tight uppercase tracking-tight">{t.shirleyName}</h3>
                            <p className="text-[#C5A059] uppercase tracking-[0.2em] text-xs md:text-sm mb-12 font-bold font-sans">
                                {t.shirleyRole}
                            </p>
                            
                            <div className="space-y-6 text-white/80 text-base md:text-lg font-serif leading-relaxed border-l-2 border-[#C5A059]/30 pl-8 text-left text-justify hyphens-auto">
                                {(t.shirleyDesc as string[]).map((para: string, idx: number) => (
                                    <p key={idx} className={idx === 0 ? "text-white text-lg md:text-xl font-medium" : ""}>
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    </section>
                </section>

                {/* 3. Leadership & Institutional Bond */}
                <section id="bond" className="py-24 md:py-32 bg-white/5 px-6 lg:pr-24 relative overflow-hidden">
                    <div className="absolute left-[10%] top-0 bottom-0 w-px bg-white/10 pointer-events-none" />
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUp}
                        className="max-w-6xl mx-auto text-center"
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="h-px w-8 bg-[#C5A059]" />
                            <span className="text-[#C5A059] text-xs tracking-[0.3em] uppercase font-bold">
                                {t.allianceLabel}
                            </span>
                            <span className="h-px w-8 bg-[#C5A059]" />
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-widest mb-12">
                            {t.leadershipTitle}
                        </h2>
                        <div className="relative aspect-video overflow-hidden mb-16 shadow-2xl border border-white/5 ring-1 ring-white/10">
                            <img
                                src="/gallery/leadership-dialogue-final.jpg"
                                alt="Leadership"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: 'center 10%' }}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 text-white/70 text-base md:text-lg font-serif leading-relaxed text-justify hyphens-auto">
                            {(t.leadershipDesc as string[]).map((para, idx) => (
                                <p key={idx} className="first-letter:text-[#C5A059] first-letter:text-2xl first-letter:font-bold">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 4. The Grand Final */}
                <section id="finale" className="relative h-screen flex items-center justify-center overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 z-0"
                    >
                        <img
                            src="/gallery/bcd-022.webp"
                            alt="The Team"
                            className="w-full h-full object-cover brightness-50 grayscale hover:grayscale-0 transition-all duration-1000"
                            style={{ objectPosition: 'center 30%' }}
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent z-0" />

                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-auto mb-24">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={fadeUp}
                        >
                            <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-widest mb-6 drop-shadow-lg text-white">
                                {t.finaleTitle}
                            </h2>
                            <p className="text-[#C5A059] text-xl md:text-2xl font-light tracking-wide italic">
                                {t.finaleDesc}
                            </p>
                            <div className="mt-12 flex justify-center">
                                <Link
                                    to="/"
                                    className="bg-[#C5A059] hover:bg-white text-black px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold transition-colors duration-300"
                                >
                                    {t.backToHome}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                   NEXT EVENT RECOMMENDATION — Event 2
                ══════════════════════════════════════ */}
                <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 z-0"
                    >
                        <img
                            src="/gallery/Mes-da-consciencianegra-cena-caf/album2-001.webp"
                            alt="Consciência Negra CENA-CAF"
                            className="w-full h-full object-cover brightness-[0.25]"
                            style={{ objectPosition: 'center 35%' }}
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

                        <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-widest mb-2 text-white">
                            {t.nextEventTitle}
                        </h2>
                        <h3 className="font-serif text-3xl md:text-5xl uppercase tracking-widest mb-6 text-[#C5A059]">
                            {t.nextEventTitleLine2}
                        </h3>
                        <p className="font-serif italic text-lg md:text-xl text-white/60 mb-12">
                            {t.nextEventSubtitle}
                        </p>

                        <Link
                            to="/events/consciencia-negra-cena-caf"
                            className="group inline-flex items-center gap-4 bg-transparent border border-[#C5A059] px-10 py-5 text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all duration-500"
                        >
                            {t.nextEventButton}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
