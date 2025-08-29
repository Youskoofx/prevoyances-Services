import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Quels types d'assurance proposez-vous ?",
    answer:
      "Nous proposons une gamme complète d'assurances : santé, prévoyance, auto, habitation, professionnelle et animaux. Chaque solution est adaptée à vos besoins spécifiques.",
  },
  {
    question: "Comment obtenir un devis ?",
    answer:
      "Vous pouvez obtenir un devis gratuit en nous contactant par téléphone, email ou en utilisant notre formulaire en ligne. Nos conseillers vous accompagnent dans votre démarche.",
  },
  {
    question: "Combien de temps faut-il pour traiter une demande ?",
    answer:
      "Le délai de traitement varie selon le type d'assurance. En général, nous traitons les demandes sous 48h à 72h ouvrées.",
  },
  {
    question: "Puis-je modifier mon contrat en cours ?",
    answer:
      "Oui, vous pouvez modifier votre contrat à tout moment. Contactez votre conseiller pour étudier les options disponibles.",
  },
  {
    question: "Comment déclarer un sinistre ?",
    answer:
      "Vous pouvez déclarer un sinistre par téléphone, email ou via votre espace client en ligne. Nous vous accompagnons dans toutes les démarches.",
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sora">
            Questions <span className="text-primary">Fréquentes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions les plus courantes
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-gray-900 hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
