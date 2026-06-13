import React from 'react';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-moss rounded-lg flex items-center justify-center font-bold text-white text-xl shrink-0">A1</div>
              <span className="font-display font-black text-xl uppercase tracking-tighter">Anleggsgartner 1</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Vi skaper funksjonelle og estetiske utemiljøer for offentlige og private kunder i Trøndelag. Med solid håndverk, lang erfaring og førsteklasses materialer.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="font-semibold mb-6">Kontakt Oss</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400 text-sm">
                <MapPin className="h-5 w-5 mr-3 shrink-0 text-moss" />
                <span>Trondheim, Norge<br/>Betjener hele Trøndelag</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Phone className="h-5 w-5 mr-3 shrink-0 text-moss" />
                <span>+47 99 99 99 99</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Mail className="h-5 w-5 mr-3 shrink-0 text-moss" />
                <span>post@anleggsgartner1.no</span>
              </li>
            </ul>
          </div>

          {/* Tjenester hurtiglenker */}
          <div>
            <h4 className="font-semibold mb-6">Våre Tjenester</h4>
            <ul className="space-y-3">
              {[
                'Kantstein og Granitt',
                'Belegningsstein',
                'Gravearbeid',
                'Lekeplassmontering',
                'Beplantning',
                'Komplette Utemiljøer'
              ].map((service) => (
                <li key={service}>
                  <a href="#" className="flex items-center text-gray-400 text-sm hover:text-moss transition">
                    <ChevronRight className="h-4 w-4 mr-2 opacity-50" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasjon */}
          <div>
            <h4 className="font-semibold mb-6">Informasjon</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition">Om Oss</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition">Våre Prosjekter</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition">HMS & Kvalitet</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition">Personvernerklæring</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Anleggsgartner 1. Alle rettigheter reservert.</p>
          <div className="mt-4 md:mt-0">
            Design & Utvikling med presisjon.
          </div>
        </div>
      </div>
    </footer>
  );
}
