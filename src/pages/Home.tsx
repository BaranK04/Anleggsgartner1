import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Chatbot } from '../components/Chatbot';
import { ArrowRight, CheckCircle2, Navigation, Users, Search, Target, Home as HomeIcon, MapPin, Check, Plus, MessageSquare, HardHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const stats = [
  { value: '500+', label: 'Ferdigstilte Prosjekter' },
  { value: '15+', label: 'Års Erfaring' },
  { value: '100%', label: 'Kvalitetsgaranti' },
  { value: 'Ti tusen+', label: 'm² med stein lagt' }
];

const services = [
  { id: 1, title: 'Kantstein', icon: <MapPin className="h-6 w-6 text-moss" />, description: 'Sikring og ryddig avgrensing med førsteklasses kantstein i granitt og betong for varig styrke.' },
  { id: 2, title: 'Belegningsstein & Granitt', icon: <Search className="h-6 w-6 text-moss" />, description: 'Vakker brostein og belegning til gangveier, torg og oppkjørsler for private og næring.' },
  { id: 3, title: 'Gravearbeid & Grunn', icon: <Target className="h-6 w-6 text-moss" />, description: 'Nøyaktig og effektiv graving og rørlegging med moderne maskinpark og utstyr.' },
  { id: 4, title: 'Lekeplassutstyr', icon: <Users className="h-6 w-6 text-moss" />, description: 'Installasjon av trygge lekestativer, felling, og støtdempende underlag for kommuner/skoler.' },
  { id: 5, title: 'Beplantning & Jord', icon: <CheckCircle2 className="h-6 w-6 text-moss" />, description: 'Skreddersydd planting, masseutskifting og fornying av biologisk mangfold.' },
  { id: 6, title: 'Komplette Utemiljø', icon: <HomeIcon className="h-6 w-6 text-moss" />, description: 'Totalentreprise - fra en tom tomt til et funksjonelt, nøkkelferdig, arkitektonisk utemiljø.' }
];

const process = [
  { step: '1. Befaring', info: 'Gratis og uforpliktende vurdering av området pluss kartlegging av dine behov.' },
  { step: '2. Planlegging', info: 'Vi lager detaljerte skisser, fremdriftsplan og pristilbud.' },
  { step: '3. Grunnarbeid', info: 'Solid og nøyaktig utgraving, komprimering og massehåndtering.' },
  { step: '4. Utførelse', info: 'Fagmessig legging, planting og installasjon av våre eksperter.' },
  { step: '5. Sluttkontroll', info: 'Gjennomgang med kunden med overlevering av FDV-dokumentasjon.' }
];

export function Home() {
  
  // Smooth animations simulated via simple mount effect
  useEffect(() => {
    // Add logic here if needed over standard tailwind
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-charcoal overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
             src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=2000&q=80" 
             alt="Paving construction worker laying stones" 
             className="w-full h-full object-cover opacity-30" 
             draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full animate-fade-in-up">
          <div className="max-w-3xl">
            <span className="text-moss font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Trondheim & Trøndelag</span>
            <h1 className="heading-xl text-white mb-6 leading-tight">
              Profesjonell <span className="text-gray-500">Utforming Som Varer.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Vi leverer høykvalitets belegning, kantstein, gravearbeid og komplette utemiljøer til kommuner, bedrifter og private i Trondheim og omegn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Button size="lg" className="bg-moss hover:bg-moss-hover text-white h-14 px-8 shadow-lg rounded-full font-bold uppercase tracking-widest text-xs transition-colors">
                Be om Gratis Befaring
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-black hover:bg-moss hover:text-white border-transparent h-14 px-8 rounded-sm font-bold uppercase tracking-widest text-xs transition-all">
                Se Våre Prosjekter
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {['Fagmessig utført', 'Pålitelig levering', 'Kvalitetsmaterialer', 'Trondheim & Trøndelag'].map(badge => (
                <div key={badge} className="flex items-center text-xs font-bold tracking-widest opacity-60 uppercase text-white">
                  <CheckCircle2 className="h-4 w-4 text-moss mr-2 shrink-0" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-charcoal py-16 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="heading-lg text-white mb-1">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="tjenester" className="section-padding bg-charcoal-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="heading-lg text-white mb-2">Komplette Tjenester</h2>
              <p className="text-gray-400 text-lg">Fra grunnarbeid til fiks ferdig utemiljø.</p>
            </div>
            <a href="#kontakt" className="hidden md:inline-block text-[10px] text-moss uppercase font-bold tracking-widest hover:text-white transition-colors">Se alle tjenester →</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s.id} className="group bg-white/5 hover:bg-moss/20 p-8 rounded-2xl border border-white/10 transition-all cursor-pointer flex flex-col justify-between items-start gap-12">
                <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <div className="text-white opacity-80">{s.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{s.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section id="prosess" className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="heading-lg mb-4 text-white">Hvordan Vi Jobber</h2>
              <p className="text-gray-400 text-lg">
                En forutsigbar og trygg prosess fra første kontakt til ferdigstilt prosjekt. Vi koordinerer alle fag.
              </p>
            </div>
            <Button className="bg-moss hover:bg-moss-hover text-white rounded-full font-bold uppercase tracking-widest text-xs h-12 px-6">Bli kontaktet av prosjektleder</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {process.map((p, index) => (
              <div key={index} className="relative group">
                {/* Horizontal line for desktop */}
                {index !== process.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-1/2 w-full border-t border-dashed border-white/20" />
                )}
                
                <div className="relative z-10 bg-charcoal-light border border-white/10 hover:border-moss/50 shadow-sm p-6 rounded-2xl h-full mt-4 group-hover:-translate-y-2 transition-transform">
                  <div className="w-10 h-10 bg-moss text-white rounded-full flex items-center justify-center font-bold absolute -top-5 left-6 ring-4 ring-charcoal">
                    {index + 1}
                  </div>
                  <h4 className="font-bold text-lg mt-4 mb-2 text-white">{p.step.substring(3)}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-charcoal-dark border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4 text-white">Ofte Stilte Spørsmål</h2>
            <p className="text-gray-400 font-medium">Her finner du svar på de vanligste spørsmålene knyttet til prosjektering og anleggsarbeid.</p>
          </div>

          <Accordion type="single" collapsible className="w-full bg-white/5 rounded-2xl p-4 border border-white/10">
            <AccordionItem value="item-1" className="border-b border-white/10">
              <AccordionTrigger className="text-left font-bold text-lg text-white hover:text-moss transition-colors">Gir dere gratis befaring og pristilbud?</AccordionTrigger>
              <AccordionContent className="text-gray-400 leading-relaxed">
                Ja, vi tilbyr alltid uforpliktende og gratis befaring for nye og eksisterende kunder. Vi kommer ut for å estimere grunnarbeidet og målekrav før vi gir et detaljert tilbud.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-white/10">
              <AccordionTrigger className="text-left font-bold text-lg text-white hover:text-moss transition-colors">Utfører dere prosjekter for det offentlige og borettslag?</AccordionTrigger>
              <AccordionContent className="text-gray-400 leading-relaxed">
                Absolutt. Vi har lang erfaring med å håndtere komplekse utemiljøer og lekeplasser for kommuner, idrettslag, borettslag og næringslivet i Trøndelag.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-white/10">
              <AccordionTrigger className="text-left font-bold text-lg text-white hover:text-moss transition-colors">Hvor lang tid tar en typisk gårdsplass eller belegning?</AccordionTrigger>
              <AccordionContent className="text-gray-400 leading-relaxed">
                Et gjennomsnittlig boligprosjekt tar 1-3 uker. Dette avhenger av eksisterende grunnforhold sine krav til gravearbeid, drenering, valgt steintype (granitt vs belegningsstein), og kvadratmeter.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger className="text-left font-bold text-lg text-white hover:text-moss transition-colors">Leverer dere CE-godkjent lekeplassutstyr?</AccordionTrigger>
              <AccordionContent className="text-gray-400 leading-relaxed">
                Ja. Alt lekeplassutstyr, støtdempende matter overholder NS-EN 1176 og NS-EN 1177 standarder og installeres av sertifisert mannskap.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Layer */}
      <section id="kontakt" className="bg-charcoal text-white section-padding relative overflow-hidden border-t border-white/5">
         <div className="absolute top-0 right-0 p-32 opacity-5">
           <HardHat className="w-96 h-96" />
         </div>
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
           <h2 className="heading-xl mb-6">Klar for å forvandle ditt utemiljø?</h2>
           <p className="text-xl text-gray-400 mb-10 leading-relaxed">
             Beskriv ditt prosjekt for oss. Vi er en premium anleggsgartner-entreprenør som verdsetter ekte håndverk og skreddersydde løsninger.
           </p>
           <Button size="lg" className="bg-moss hover:bg-moss-hover h-16 px-10 text-lg shadow-2xl rounded-sm text-xs font-bold uppercase tracking-widest">
             Be om tilbud
           </Button>
           <div className="mt-8 text-[10px] text-gray-500 font-bold uppercase tracking-widest opacity-80">Eller logg inn i Bookingportalen øverst.</div>
         </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
