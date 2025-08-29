export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  chapo: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: "Santé" | "Prévoyance" | "Auto" | "Habitation" | "Pro";
  readTime: string;
  keyTakeaways: string[];
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Comment bien choisir son assurance habitation en 2025",
    slug: "comment-bien-choisir-assurance-habitation-2025",
    excerpt:
      "Découvrez les critères essentiels pour sélectionner l'assurance habitation qui correspond parfaitement à vos besoins et à votre budget.",
    chapo:
      "Choisir une assurance habitation adaptée nécessite d'analyser vos besoins spécifiques et de comparer les garanties proposées. Voici notre guide complet pour faire le bon choix.",
    content: `<h2>Évaluer vos besoins réels</h2>
<p>Avant de souscrire une assurance habitation, il est essentiel d'évaluer précisément vos besoins. La surface de votre logement, sa localisation, la valeur de vos biens mobiliers et votre situation personnelle sont autant d'éléments à prendre en compte.</p>

<h2>Les garanties indispensables</h2>
<p>Certaines garanties sont obligatoires, d'autres optionnelles mais recommandées :</p>
<ul>
<li>Responsabilité civile (obligatoire)</li>
<li>Incendie et explosion</li>
<li>Dégâts des eaux</li>
<li>Vol et vandalisme</li>
<li>Bris de glace</li>
</ul>

<h2>Comparer les offres efficacement</h2>
<p>Ne vous contentez pas du prix : analysez les franchises, les plafonds de remboursement, les exclusions et les services d'assistance. Un comparatif détaillé vous permettra de faire le meilleur choix.</p>

<h2>Les pièges à éviter</h2>
<p>Attention aux contrats trop basiques qui ne couvrent pas suffisamment vos biens, ou à l'inverse, aux sur-assurances qui vous font payer des garanties inutiles.</p>`,
    author: "Marie Dubois",
    date: "15 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    category: "Habitation",
    readTime: "5 min",
    keyTakeaways: [
      "Évaluez précisément vos besoins avant de souscrire",
      "Comparez les garanties, pas seulement les prix",
      "Vérifiez les franchises et plafonds de remboursement",
    ],
    published: true,
  },
  {
    id: "2",
    title: "Les nouvelles réglementations auto 2025",
    slug: "nouvelles-reglementations-auto-2025",
    excerpt:
      "Tout ce que vous devez savoir sur les changements réglementaires qui impactent votre assurance automobile cette année.",
    chapo:
      "L'année 2025 apporte son lot de nouveautés réglementaires en matière d'assurance automobile. Découvrez les principales évolutions qui peuvent impacter votre contrat.",
    content: `<h2>Évolution du bonus-malus</h2>
<p>Le système de bonus-malus évolue avec de nouvelles règles pour les véhicules électriques et hybrides. Les conducteurs de ces véhicules bénéficient désormais d'avantages spécifiques.</p>

<h2>Nouvelles obligations pour les assureurs</h2>
<p>Les compagnies d'assurance doivent maintenant proposer des garanties renforcées pour certains équipements de sécurité et respecter de nouveaux délais de traitement des sinistres.</p>

<h2>Impact sur les tarifs</h2>
<p>Ces évolutions réglementaires peuvent influencer les tarifs d'assurance. Il est important de faire le point sur votre contrat pour optimiser votre couverture.</p>`,
    author: "Pierre Martin",
    date: "12 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
    category: "Auto",
    readTime: "7 min",
    keyTakeaways: [
      "Le bonus-malus évolue pour les véhicules électriques",
      "Nouvelles obligations pour les assureurs en 2025",
      "Vérifiez l'impact sur vos tarifs d'assurance",
    ],
    published: true,
  },
  {
    id: "3",
    title: "Prévoyance : protéger sa famille efficacement",
    slug: "prevoyance-proteger-famille-efficacement",
    excerpt:
      "Les meilleures stratégies pour assurer la sécurité financière de vos proches en cas d'imprévu.",
    chapo:
      "La prévoyance est un pilier essentiel de la protection familiale. Découvrez comment bien structurer votre couverture pour protéger efficacement vos proches.",
    content: `<h2>Définir vos besoins de protection</h2>
<p>La première étape consiste à évaluer les besoins financiers de votre famille en cas d'arrêt de travail, d'invalidité ou de décès. Cette analyse déterminera le niveau de couverture nécessaire.</p>

<h2>Les différents types de garanties</h2>
<p>La prévoyance englobe plusieurs garanties complémentaires :</p>
<ul>
<li>Incapacité temporaire de travail</li>
<li>Invalidité permanente</li>
<li>Décès et perte totale d'autonomie</li>
<li>Rente éducation pour les enfants</li>
</ul>

<h2>Optimiser sa couverture</h2>
<p>Une bonne stratégie de prévoyance combine les garanties collectives de votre entreprise avec des contrats individuels adaptés à votre situation personnelle.</p>`,
    author: "Sophie Leroy",
    date: "10 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80",
    category: "Prévoyance",
    readTime: "6 min",
    keyTakeaways: [
      "Évaluez les besoins financiers de votre famille",
      "Combinez garanties collectives et individuelles",
      "Adaptez votre couverture à votre situation personnelle",
    ],
    published: true,
  },
  {
    id: "4",
    title: "Télétravail : adapter son assurance professionnelle",
    slug: "teletravail-adapter-assurance-professionnelle",
    excerpt:
      "Comment ajuster votre couverture professionnelle aux nouvelles modalités de travail à distance.",
    chapo:
      "Le télétravail modifie les risques professionnels et nécessite d'adapter sa couverture d'assurance. Voici les points clés à vérifier.",
    content: `<h2>Les nouveaux risques du télétravail</h2>
<p>Travailler depuis son domicile expose à de nouveaux risques : accidents domestiques pendant les heures de travail, vol de matériel professionnel, cyber-risques accrus.</p>

<h2>Adapter sa responsabilité civile professionnelle</h2>
<p>Votre RC professionnelle doit couvrir les dommages causés dans le cadre de votre activité, même depuis votre domicile. Vérifiez que votre contrat inclut cette extension.</p>

<h2>Protection du matériel informatique</h2>
<p>Le matériel professionnel utilisé à domicile nécessite une couverture spécifique, souvent non incluse dans l'assurance habitation standard.</p>`,
    author: "Thomas Rousseau",
    date: "8 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    category: "Pro",
    readTime: "4 min",
    keyTakeaways: [
      "Le télétravail crée de nouveaux risques professionnels",
      "Vérifiez votre RC professionnelle pour le travail à domicile",
      "Assurez spécifiquement votre matériel professionnel",
    ],
    published: true,
  },
  {
    id: "5",
    title: "Santé : les remboursements 2025",
    slug: "sante-remboursements-2025",
    excerpt:
      "Panorama complet des nouveaux taux de remboursement et des garanties santé pour cette année.",
    chapo:
      "Les taux de remboursement santé évoluent en 2025. Découvrez les principales modifications et leur impact sur votre couverture.",
    content: `<h2>Évolution des bases de remboursement</h2>
<p>La Sécurité sociale a revalorisé certains actes médicaux. Ces évolutions impactent directement le calcul des remboursements de votre mutuelle.</p>

<h2>Nouvelles garanties obligatoires</h2>
<p>Les contrats responsables doivent désormais inclure de nouvelles garanties, notamment pour certains équipements médicaux et actes de prévention.</p>

<h2>Impact sur vos cotisations</h2>
<p>Ces évolutions peuvent influencer le montant de vos cotisations. Il est recommandé de faire le point avec votre conseiller pour optimiser votre couverture.</p>`,
    author: "Dr. Anne Moreau",
    date: "5 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80",
    category: "Santé",
    readTime: "8 min",
    keyTakeaways: [
      "Revalorisation de certains actes médicaux en 2025",
      "Nouvelles garanties obligatoires dans les contrats responsables",
      "Vérifiez l'impact sur vos cotisations avec votre conseiller",
    ],
    published: true,
  },
  {
    id: "6",
    title: "Épargne retraite : optimiser ses placements",
    slug: "epargne-retraite-optimiser-placements",
    excerpt:
      "Stratégies d'investissement pour préparer sereinement votre retraite avec les meilleurs rendements.",
    chapo:
      "Bien préparer sa retraite nécessite une stratégie d'épargne adaptée à votre profil et à vos objectifs. Découvrez les meilleures approches.",
    content: `<h2>Diversifier ses supports d'épargne</h2>
<p>Une stratégie efficace combine plusieurs supports : PER, assurance-vie, immobilier locatif. Cette diversification permet d'optimiser le rapport rendement/risque.</p>

<h2>L'importance de commencer tôt</h2>
<p>Plus vous commencez jeune, plus l'effet des intérêts composés joue en votre faveur. Même de petits montants réguliers peuvent générer un capital conséquent.</p>

<h2>Adapter sa stratégie selon l'âge</h2>
<p>Votre allocation d'actifs doit évoluer avec l'âge : plus dynamique quand vous êtes jeune, plus prudente à l'approche de la retraite.</p>`,
    author: "Jean-Luc Petit",
    date: "3 Jan 2025",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    category: "Prévoyance",
    readTime: "10 min",
    keyTakeaways: [
      "Diversifiez vos supports d'épargne retraite",
      "Commencez le plus tôt possible pour bénéficier des intérêts composés",
      "Adaptez votre stratégie d'investissement selon votre âge",
    ],
    published: true,
  },
];

export const blogCategories = [
  "Tous",
  "Santé",
  "Prévoyance",
  "Auto",
  "Habitation",
  "Pro",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export function filterBlogPostsByCategory(
  posts: BlogPost[],
  category: BlogCategory,
): BlogPost[] {
  if (category === "Tous") {
    return posts.filter((post) => post.published);
  }
  return posts.filter((post) => post.category === category && post.published);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug && post.published);
}

export function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3,
): BlogPost[] {
  return blogPosts
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        post.category === currentPost.category &&
        post.published,
    )
    .slice(0, limit);
}
