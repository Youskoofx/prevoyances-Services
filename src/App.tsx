import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import QcmWizard from "./components/QcmWizard";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/prevoyance-ai"
            element={
              <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-24">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sora">
                      Prévoyance <span className="text-primary">AI</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Découvrez le plan d'assurance parfait grâce à notre
                      intelligence artificielle
                    </p>
                  </div>
                  <QcmWizard />
                </div>
              </div>
            }
          />
        </Routes>

        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
