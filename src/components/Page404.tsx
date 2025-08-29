import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Home, FileText, Phone, ArrowLeft } from "lucide-react";

const Page404 = () => {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-ink mb-6 font-poppins">
            Oups, page introuvable
          </h2>
          <p className="text-xl text-muted font-inter mb-12">
            Le lien a peut-être changé. Voici les pages utiles :
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card border border-line hover:border-primary/30 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2 font-poppins">
                Accueil
              </h3>
              <p className="text-muted text-sm font-inter mb-4">
                Retour à la page principale
              </p>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80"
                asChild
              >
                <a href="/">Aller à l'accueil</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border border-line hover:border-primary/30 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2 font-poppins">
                Nos assurances
              </h3>
              <p className="text-muted text-sm font-inter mb-4">
                Découvrir nos solutions
              </p>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80"
                asChild
              >
                <a href="/assurances">Voir les assurances</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border border-line hover:border-primary/30 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2 font-poppins">
                Contact
              </h3>
              <p className="text-muted text-sm font-inter mb-4">
                Nous contacter directement
              </p>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80"
                asChild
              >
                <a href="/contact">Nous contacter</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main CTA */}
        <div className="space-y-6">
          <Button
            className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg font-semibold font-inter transition-all duration-300 rounded-full"
            asChild
          >
            <a href="/contact">Demander un devis</a>
          </Button>

          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              className="text-muted hover:text-primary"
              asChild
            >
              <a
                href="javascript:history.back()"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à la page précédente
              </a>
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 pt-8 border-t border-line">
          <p className="text-muted font-inter text-sm mb-4">
            Besoin d'aide ? Contactez-nous directement :
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <a
              href="tel:0147941234"
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
            >
              01 47 94 12 34
            </a>
            <span className="hidden sm:block text-muted">•</span>
            <a
              href="mailto:contact@prevoyanceservices.fr"
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
            >
              contact@prevoyanceservices.fr
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
