export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "Santé" | "Prévoyance" | "IARD" | "Général";
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "Différence mutuelle santé / assurance santé ?",
    answer:
      "Une mutuelle santé est un organisme à but non lucratif qui complète les remboursements de la Sécurité sociale. Une assurance santé peut être proposée par une compagnie d'assurance à but lucratif. Dans les deux cas, l'objectif est de couvrir tout ou partie des frais de santé non pris en charge par l'Assurance maladie obligatoire.",
    category: "Santé",
  },
  {
    id: "2",
    question: "Comment résilier mon ancienne mutuelle ?",
    answer:
      "Depuis la loi Chatel, vous pouvez résilier votre mutuelle à tout moment après la première année de contrat, avec un préavis d'un mois. Il suffit d'envoyer une lettre recommandée avec accusé de réception à votre mutuelle actuelle. Nous pouvons vous accompagner dans cette démarche.",
    category: "Santé",
  },
  {
    id: "3",
    question: "Quels documents pour un devis rapide ?",
    answer:
      "Pour établir un devis personnalisé, nous avons besoin de : votre relevé d'information (pour l'assurance auto), vos derniers avis d'échéance, une pièce d'identité, et selon le type d'assurance, des informations spécifiques (surface du logement, nombre de conducteurs, etc.).",
    category: "Général",
  },
  {
    id: "4",
    question: "Garantie accident de la vie, c'est quoi ?",
    answer:
      "La Garantie des Accidents de la Vie (GAV) vous protège contre les conséquences financières des accidents de la vie privée : accidents domestiques, de loisirs, catastrophes naturelles ou technologiques, agressions, attentats. Elle complète les remboursements de la Sécurité sociale et peut verser un capital en cas d'invalidité.",
    category: "Prévoyance",
  },
  {
    id: "5",
    question: "Prévoir un capital pour protéger mes proches ?",
    answer:
      "L'assurance décès permet de verser un capital ou une rente à vos bénéficiaires en cas de décès. Le montant doit être calculé en fonction de vos revenus, de vos charges (crédit immobilier, frais de scolarité...) et du niveau de vie que vous souhaitez maintenir pour votre famille.",
    category: "Prévoyance",
  },
  {
    id: "6",
    question: "Bonus-malus auto et conducteurs secondaires ?",
    answer:
      "Le coefficient bonus-malus s'applique au conducteur principal du véhicule. Si vous déclarez un conducteur secondaire, ses sinistres peuvent impacter votre bonus-malus. Il est important de bien déclarer tous les conducteurs habituels du véhicule pour éviter les problèmes en cas de sinistre.",
    category: "IARD",
  },
  {
    id: "7",
    question: "Délais de remboursement et services d'assistance ?",
    answer:
      "Les délais de remboursement varient selon les assureurs et le type de sinistre. En général, comptez 15 à 30 jours pour un remboursement simple. Les services d'assistance (dépannage, remorquage, véhicule de remplacement) sont généralement disponibles 24h/24 et 7j/7.",
    category: "IARD",
  },
  {
    id: "8",
    question: "Puis-je changer d'assurance en cours d'année ?",
    answer:
      "Oui, grâce à la loi Hamon, vous pouvez résilier votre assurance auto, habitation ou emprunteur à tout moment après la première année, sans frais ni pénalités. Pour les autres assurances, la résiliation se fait généralement à l'échéance annuelle avec un préavis de 2 mois.",
    category: "Général",
  },
  {
    id: "9",
    question: "Que couvre une assurance habitation multirisque ?",
    answer:
      "L'assurance habitation multirisque couvre les dommages causés à votre logement (incendie, dégât des eaux, vol, vandalisme) ainsi que votre responsabilité civile. Elle peut aussi inclure la protection juridique, l'assistance à domicile, et la couverture de vos biens mobiliers.",
    category: "IARD",
  },
  {
    id: "10",
    question: "Comment fonctionne le tiers payant en santé ?",
    answer:
      "Le tiers payant vous évite d'avancer les frais chez les professionnels de santé. Votre mutuelle règle directement sa part à votre place. Depuis 2017, le tiers payant est obligatoire pour la part Sécurité sociale chez le médecin. Pour la part mutuelle, cela dépend des accords entre votre mutuelle et le professionnel.",
    category: "Santé",
  },
];

export const categories = [
  "Tous",
  "Santé",
  "Prévoyance",
  "IARD",
  "Général",
] as const;

export function filterFAQsByCategory(faqs: FAQ[], category: string): FAQ[] {
  if (category === "Tous") {
    return faqs;
  }
  return faqs.filter((faq) => faq.category === category);
}
