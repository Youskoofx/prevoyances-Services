import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader } from "./ui/card";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

interface ChatStep {
  id: string;
  bot: string;
  type: "choices" | "text" | "form";
  options?: string[];
  validation?: string;
  fields?: Array<{
    name: string;
    label: string;
    type?: string;
    required?: boolean;
  }>;
  next?: string;
  on_complete?: Array<{
    action: string;
    to?: string;
    subject?: string;
    template?: string;
    url?: string;
  }>;
}

const QUICK_SUGGESTIONS = [
  "Comparer mutuelles santé 🏥",
  "Un devis auto 🚗",
  "Protéger ma famille 👨‍👩‍👧‍👦",
  "Être rappelé 📞",
];

const INSURANCE_KNOWLEDGE = {
  mutuelle:
    "Bonne question 🙌\nLa mutuelle rembourse vos frais de santé (médecin, optique, dentaire).\n👉 Voulez-vous que je vous propose une simulation adaptée à votre profil ?",
  prévoyance:
    "Excellente question ! 💡\nLa prévoyance protège vos revenus et vos proches en cas d'accident, invalidité ou décès.\n👉 Souhaitez-vous un devis personnalisé pour votre situation ?",
  auto: "Parfait ! 🚗\nL'assurance auto va du tiers (obligatoire) au tous risques. Inclut assistance 0 km, garanties conducteur, protection juridique.\n👉 Voulez-vous comparer les meilleures offres pour votre véhicule ?",
  habitation:
    "Très important ! 🏠\nL'assurance habitation couvre incendie, dégât des eaux, vol, responsabilité civile. Option valeur à neuf disponible.\n👉 Puis-je vous préparer un devis adapté à votre logement ?",
  pro: "Essentiel pour votre activité ! 💼\nRC pro, multirisque bureau, flotte véhicules, santé collective, prévoyance TNS.\n👉 Voulez-vous qu'on étudie vos besoins professionnels ?",
  animaux:
    "Très sage ! 🐕\nL'assurance animaux rembourse frais vétérinaires, hospitalisation, prévention selon plafonds choisis.\n👉 Souhaitez-vous un devis pour protéger votre compagnon ?",
};

const CONVERSION_TRIGGERS = [
  "devis",
  "contact",
  "rappel",
  "prix",
  "simulation",
  "protéger",
  "souscrire",
  "comparer",
  "tarif",
  "coût",
  "combien",
  "offre",
];

const CHAT_STEPS: ChatStep[] = [
  {
    id: "lead_capture",
    bot: "Parfait ! Pour vous préparer un devis personnalisé, j'ai besoin de quelques informations :",
    type: "form",
    fields: [
      { name: "firstname", label: "Prénom", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Téléphone", type: "tel", required: true },
      {
        name: "consent",
        label: "J'accepte la politique de confidentialité",
        type: "checkbox",
        required: true,
      },
    ],
    on_complete: [
      { action: "store:Lead" },
      {
        action: "email",
        to: "contact@prevoyanceservices.fr",
        subject: "Lead Chatbot - Demande de devis",
        template: "lead-chat",
      },
    ],
  },
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [leadData, setLeadData] = useState<Record<string, any>>({});
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize chat with welcome message
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "bot",
        content:
          "Bonjour 👋 Je suis l'assistant assurance de Prévoyance Services.\n\nPosez-moi vos questions (santé, prévoyance, auto, habitation, pro/TNS, animaux)… ou demandez un devis gratuit en 2 minutes.",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Inactivity reminder
  useEffect(() => {
    if (isOpen && conversationStarted) {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      inactivityTimerRef.current = setTimeout(() => {
        if (!currentStep) {
          addMessage("Toujours là si vous voulez un devis gratuit 🙂", "bot");
        }
      }, 40000); // 40 seconds
    }

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [isOpen, conversationStarted, messages, currentStep]);

  const handleOpenChat = () => {
    setIsOpen(true);
    // Track chat open event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "chat_open", {
        event_category: "engagement",
        event_label: "chat_widget",
      });
    }
  };

  const checkForConversion = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    return CONVERSION_TRIGGERS.some((trigger) =>
      lowerMessage.includes(trigger),
    );
  };

  const triggerLeadCapture = () => {
    const step = CHAT_STEPS.find((s) => s.id === "lead_capture");
    if (step) {
      addMessage(step.bot, "bot");
      setCurrentStep("lead_capture");
    }
  };

  const triggerAutoOffer = () => {
    if (messageCount >= 3 && !currentStep) {
      setTimeout(() => {
        addMessage(
          "Souhaitez-vous qu'on vous rappelle dans la journée pour en discuter ?",
          "bot",
        );
        setTimeout(() => {
          triggerLeadCapture();
        }, 1000);
      }, 1500);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setShowSuggestions(false);
    setConversationStarted(true);
    setMessageCount((prev) => prev + 1);
    addMessage(suggestion, "user");

    // Track question event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "chat_question", {
        event_category: "engagement",
        event_label: suggestion,
      });
    }

    // Check if suggestion triggers conversion
    if (checkForConversion(suggestion)) {
      setTimeout(() => {
        triggerLeadCapture();
      }, 800);
      return;
    }

    // Generate AI response based on suggestion
    setTimeout(() => {
      let response = "";
      const lowerSuggestion = suggestion.toLowerCase();

      if (
        lowerSuggestion.includes("mutuelle") ||
        lowerSuggestion.includes("santé")
      ) {
        response = INSURANCE_KNOWLEDGE.mutuelle;
      } else if (lowerSuggestion.includes("auto")) {
        response = INSURANCE_KNOWLEDGE.auto;
      } else if (
        lowerSuggestion.includes("famille") ||
        lowerSuggestion.includes("protéger")
      ) {
        response = INSURANCE_KNOWLEDGE.prévoyance;
      } else if (lowerSuggestion.includes("rappel")) {
        triggerLeadCapture();
        return;
      } else {
        response =
          "Je peux vous expliquer tous les types d'assurance. Quelle est votre question précise ?";
      }

      addMessage(response, "bot");
      setMessageCount((prev) => prev + 1);

      // Check for auto-offer after response
      setTimeout(() => {
        triggerAutoOffer();
      }, 2000);
    }, 800);
  };

  const handleFreeTextSubmit = () => {
    if (!userInput.trim()) return;

    const currentInput = userInput;
    setShowSuggestions(false);
    setConversationStarted(true);
    setMessageCount((prev) => prev + 1);
    addMessage(currentInput, "user");
    setUserInput("");

    // Track question event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "chat_question", {
        event_category: "engagement",
        event_label: currentInput,
      });
    }

    // Check if input triggers conversion
    if (checkForConversion(currentInput)) {
      setTimeout(() => {
        triggerLeadCapture();
      }, 800);
      return;
    }

    const lowerInput = currentInput.toLowerCase();
    let response = "";

    // Simple keyword matching for insurance topics
    if (lowerInput.includes("mutuelle") || lowerInput.includes("santé")) {
      response = INSURANCE_KNOWLEDGE.mutuelle;
    } else if (
      lowerInput.includes("prévoyance") ||
      lowerInput.includes("invalidité")
    ) {
      response = INSURANCE_KNOWLEDGE.prévoyance;
    } else if (lowerInput.includes("auto") || lowerInput.includes("voiture")) {
      response = INSURANCE_KNOWLEDGE.auto;
    } else if (
      lowerInput.includes("habitation") ||
      lowerInput.includes("logement")
    ) {
      response = INSURANCE_KNOWLEDGE.habitation;
    } else if (
      lowerInput.includes("pro") ||
      lowerInput.includes("professionnel")
    ) {
      response = INSURANCE_KNOWLEDGE.pro;
    } else if (
      lowerInput.includes("animaux") ||
      lowerInput.includes("chien") ||
      lowerInput.includes("chat")
    ) {
      response = INSURANCE_KNOWLEDGE.animaux;
    } else {
      response =
        "Pour une réponse plus précise, je peux vous mettre en contact avec un conseiller. 📞\n👉 Voulez-vous un rappel ou un devis personnalisé ?";
    }

    setTimeout(() => {
      addMessage(response, "bot");
      setMessageCount((prev) => prev + 1);

      // Check for auto-offer after response
      setTimeout(() => {
        triggerAutoOffer();
      }, 2000);
    }, 800);
  };

  const addMessage = (content: string, type: "bot" | "user") => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleChoiceClick = (choice: string) => {
    addMessage(choice, "user");
    setLeadData((prev) => ({ ...prev, [currentStep || "choice"]: choice }));
    setMessageCount((prev) => prev + 1);

    if (choice === "Non merci") {
      setTimeout(() => {
        addMessage(
          "Pas de problème ! N'hésitez pas à revenir si vous avez des questions. Bonne journée ! 👋",
          "bot",
        );
        setCurrentStep(null);
      }, 500);
      return;
    }

    // All positive choices lead to lead capture
    setTimeout(() => {
      triggerLeadCapture();
    }, 500);
  };

  const handleTextSubmit = () => {
    if (currentStep) {
      // Handle step-based text input (not used in new flow)
      return;
    } else {
      // Handle free-form questions
      handleFreeTextSubmit();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const step = CHAT_STEPS.find((s) => s.id === currentStep);
    if (!step?.fields) return;

    // Validate required fields
    const missingFields = step.fields.filter(
      (field) => field.required && !formData[field.name],
    );

    if (missingFields.length > 0) {
      addMessage("Veuillez remplir tous les champs obligatoires.", "bot");
      return;
    }

    // Add form data to lead
    setLeadData((prev) => ({ ...prev, ...formData }));

    // Show confirmation
    const formSummary = step.fields
      .filter((field) => field.type !== "checkbox")
      .map((field) => `${field.label}: ${formData[field.name]}`)
      .join(", ");

    addMessage(formSummary, "user");

    // Complete the lead process
    handleComplete();
  };

  const handleComplete = () => {
    // Track lead completion
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "chat_lead", {
        event_category: "conversion",
        event_label: "chat_widget",
        value: 1,
      });
    }

    setTimeout(() => {
      addMessage(
        "Parfait ! ✅ Nous avons bien enregistré votre demande.\n\nUn conseiller vous contactera sous 24h pour vous proposer les meilleures offres adaptées à votre profil.\n\nÀ très bientôt ! 👋",
        "bot",
      );
      setCurrentStep(null);
      setFormData({});

      // Optional redirect after a delay
      setTimeout(() => {
        if (window.location.pathname !== "/contact") {
          window.location.href = "/contact?success=1";
        }
      }, 3000);
    }, 500);
  };

  const currentStepData = currentStep
    ? CHAT_STEPS.find((step) => step.id === currentStep)
    : null;

  if (!isOpen) {
    return (
      <button
        onClick={handleOpenChat}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-[#115E59] hover:bg-[#115E59]/90 text-white rounded-full shadow-[0_4px_12px_rgba(17,94,89,.3)] transition-all duration-300 flex items-center justify-center group hover:scale-105"
        aria-label="Besoin d'aide ?"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Besoin d'aide ?
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Card className="w-[380px] h-[520px] shadow-2xl border-0 bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-[#115E59] text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Assistant Assurance</h3>
                <p className="text-xs text-white/80">Prévoyance Services</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-0 h-[calc(520px-80px)] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "bot" && (
                  <div className="w-8 h-8 bg-[#115E59]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[#115E59]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed whitespace-pre-line ${
                    message.type === "user"
                      ? "bg-[#115E59] text-white"
                      : "bg-gray-100 text-[#0F172A]"
                  }`}
                >
                  {message.content}
                </div>
                {message.type === "user" && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            {/* Quick Suggestions */}
            {showSuggestions && !currentStep && (
              <div className="space-y-2 mb-4">
                <p className="text-xs text-gray-500 mb-2">
                  Suggestions rapides :
                </p>
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-2 rounded-lg bg-[#115E59]/5 hover:bg-[#115E59]/10 transition-all duration-200 text-sm text-[#115E59]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Step-based choices */}
            {currentStepData?.type === "choices" && (
              <div className="space-y-2">
                {currentStepData.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleChoiceClick(option)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#115E59] hover:bg-[#115E59]/5 transition-all duration-200 text-sm"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Form input */}
            {currentStepData?.type === "form" && (
              <form onSubmit={handleFormSubmit} className="space-y-3">
                {currentStepData.fields?.map((field) => (
                  <div key={field.name}>
                    {field.type === "checkbox" ? (
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id={field.name}
                          checked={formData[field.name] || false}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              [field.name]: checked,
                            }))
                          }
                          className="mt-1"
                        />
                        <label
                          htmlFor={field.name}
                          className="text-xs text-gray-600 leading-tight"
                        >
                          {field.label}
                        </label>
                      </div>
                    ) : (
                      <Input
                        type={field.type || "text"}
                        placeholder={field.label}
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: e.target.value,
                          }))
                        }
                        required={field.required}
                        className="text-sm"
                      />
                    )}
                  </div>
                ))}
                <Button
                  type="submit"
                  className="w-full bg-[#115E59] hover:bg-[#115E59]/90 text-white font-medium"
                >
                  Envoyer ma demande
                </Button>
              </form>
            )}

            {/* Free text input */}
            {!currentStep && (
              <div className="flex gap-2">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Écrivez votre question…"
                  className="flex-1 text-[#0F172A]"
                  onKeyPress={(e) => e.key === "Enter" && handleTextSubmit()}
                />
                <Button onClick={handleTextSubmit} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatWidget;
