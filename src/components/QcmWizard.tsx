import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useGSAP, gsap } from "@/lib/gsap";
import {
  ChevronRight,
  ChevronLeft,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  type: "single" | "multiple";
}

interface QcmResult {
  plan: string;
  score: number;
  rationale: string;
}

interface QcmWizardProps {
  questions?: Question[];
  onComplete?: (result: QcmResult) => void;
}

const QcmWizard = ({
  questions = defaultQuestions,
  onComplete,
}: QcmWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QcmResult | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  useGSAP(
    (gsap) => {
      // Animate progress bar
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: `${progress}%`,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Slide animation for card transitions
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        );
      }
    },
    [currentStep, progress],
  );

  const handleAnswer = (
    questionId: string,
    option: string,
    isMultiple: boolean,
  ) => {
    setAnswers((prev) => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
        const newAnswers = currentAnswers.includes(option)
          ? currentAnswers.filter((a) => a !== option)
          : [...currentAnswers, option];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: [option] };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      submitQcm();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const submitQcm = async () => {
    setIsLoading(true);

    try {
      // Simulate API call to GPT-4o-mini
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock result - in real implementation, this would come from the API
      const mockResult: QcmResult = {
        plan: "Plan Confort Premium",
        score: 85,
        rationale:
          "Basé sur vos réponses, nous recommandons notre Plan Confort Premium qui offre une couverture complète adaptée à votre profil familial et professionnel. Votre score de 85/100 indique un excellent niveau de préparation.",
      };

      setResult(mockResult);

      // Trigger confetti if score >= 80
      if (mockResult.score >= 80 && confettiRef.current) {
        triggerConfetti();
      }

      if (onComplete) {
        onComplete(mockResult);
      }
    } catch (error) {
      console.error("Error submitting QCM:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerConfetti = () => {
    if (!confettiRef.current) return;

    // Create confetti particles
    const colors = ["#11B87F", "#3D5BFF", "#FBD38D", "#C137FF"];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "absolute w-2 h-2 rounded-full";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-10px";
      confettiRef.current.appendChild(confetti);

      gsap.to(confetti, {
        y: window.innerHeight + 100,
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 360,
        duration: 3 + Math.random() * 2,
        ease: "power2.out",
        onComplete: () => confetti.remove(),
      });
    }
  };

  const resetQcm = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div
          ref={confettiRef}
          className="fixed inset-0 pointer-events-none z-50"
        ></div>

        <Card className="bg-[rgba(255,255,255,.8)] backdrop-blur-md shadow-lg/10 border-0">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              {result.score >= 80 ? (
                <CheckCircle className="w-10 h-10 text-white" />
              ) : (
                <AlertCircle className="w-10 h-10 text-white" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 font-sora mb-2">
              Analyse Terminée !
            </h2>
            <div className="text-6xl font-bold text-primary mb-2">
              {result.score}/100
            </div>
          </CardHeader>

          <CardContent className="text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Recommandation : {result.plan}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {result.rationale}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={resetQcm}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Refaire le test
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-neon text-white">
                Obtenir ce plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const currentAnswers = answers[currentQuestion?.id] || [];
  const canProceed = currentAnswers.length > 0;

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentStep + 1} sur {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            ref={progressRef}
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
            style={{ width: "0%" }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <Card
        ref={cardRef}
        className="bg-[rgba(255,255,255,.8)] backdrop-blur-md shadow-lg/10 border-0 mb-8"
      >
        <CardHeader>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-sora">
              {currentQuestion?.question}
            </h2>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => {
              const isSelected = currentAnswers.includes(option);
              return (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswer(
                      currentQuestion.id,
                      option,
                      currentQuestion.type === "multiple",
                    )
                  }
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {currentQuestion?.type === "multiple" && (
            <p className="text-sm text-gray-500 mt-4">
              * Plusieurs réponses possibles
            </p>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          disabled={currentStep === 0}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Précédent
        </Button>

        <Button
          onClick={nextStep}
          disabled={!canProceed || isLoading}
          className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-neon text-white disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyse...
            </div>
          ) : currentStep === totalSteps - 1 ? (
            "Terminer"
          ) : (
            <>
              Suivant
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

const defaultQuestions: Question[] = [
  {
    id: "situation",
    question: "Quelle est votre situation familiale ?",
    options: [
      "Célibataire sans enfant",
      "En couple sans enfant",
      "En couple avec enfant(s)",
      "Parent célibataire",
      "Autre situation",
    ],
    type: "single",
  },
  {
    id: "logement",
    question: "Quel type de logement occupez-vous ?",
    options: [
      "Appartement en location",
      "Appartement en propriété",
      "Maison en location",
      "Maison en propriété",
      "Logement de fonction",
    ],
    type: "single",
  },
  {
    id: "revenus",
    question: "Dans quelle tranche se situent vos revenus mensuels ?",
    options: [
      "Moins de 2 000€",
      "2 000€ - 3 500€",
      "3 500€ - 5 000€",
      "5 000€ - 7 500€",
      "Plus de 7 500€",
    ],
    type: "single",
  },
  {
    id: "priorites",
    question:
      "Quelles sont vos priorités en matière d'assurance ? (plusieurs choix possibles)",
    options: [
      "Protection de ma famille",
      "Sécurité financière",
      "Couverture santé optimale",
      "Protection de mes biens",
      "Préparation de la retraite",
      "Assurance professionnelle",
    ],
    type: "multiple",
  },
];

export default QcmWizard;
