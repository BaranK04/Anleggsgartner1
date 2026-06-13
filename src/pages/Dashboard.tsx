import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { Navbar } from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, MapPin, Search } from 'lucide-react';

export function Dashboard() {
  const { user, logout } = useAuth();
  const { bookings, updateStatus, addBooking } = useBookings();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // New Booking Form State
  const [service, setService] = useState('Befaring - Gatestein');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !date) return;
    
    addBooking({
      service,
      date,
      description
    });
    setIsBookingOpen(false);
    setDate('');
    setDescription('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] uppercase font-bold tracking-widest px-3 py-1">Avventer</Badge>;
      case 'confirmed': return <Badge variant="outline" className="bg-moss/20 text-moss border-moss/20 text-[10px] uppercase font-bold tracking-widest px-3 py-1">Bekreftet</Badge>;
      case 'completed': return <Badge variant="outline" className="bg-white/10 text-white border-white/20 text-[10px] uppercase font-bold tracking-widest px-3 py-1">Gjennomført</Badge>;
      case 'cancelled': return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 text-[10px] uppercase font-bold tracking-widest px-3 py-1">Avbrutt</Badge>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans animate-fade-in-up">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight uppercase">
              {user.role === 'admin' ? 'Admin Dashboard' : 'Min Side'}
            </h1>
            <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest font-bold">
              Velkommen tilbake, {user.name} ({user.email})
            </p>
          </div>
          
          {user.role === 'user' && (
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button className="bg-moss hover:bg-moss-hover text-white rounded-full font-bold uppercase tracking-widest text-[10px] px-6 h-12 shadow-xl shadow-moss/20">Book Ny Befaring</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-charcoal-light border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold font-display uppercase">Bestill Befaring</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateBooking} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-gray-300 font-bold uppercase text-[10px] tracking-widest">Type Tjeneste</Label>
                    <select 
                      id="service"
                      className="w-full flex h-12 rounded-sm border border-white/10 bg-charcoal px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-moss text-white"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    >
                      <option>Befaring - Belegningsstein</option>
                      <option>Befaring - Kantstein (Næring)</option>
                      <option>Befaring - Gravearbeid</option>
                      <option>Befaring - Lekeplassmontasje</option>
                      <option>Befaring - Komplette Utemiljø</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-gray-300 font-bold uppercase text-[10px] tracking-widest">Foretrukket Dato</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      required
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="h-12 bg-charcoal border-white/10 text-white rounded-sm focus-visible:ring-moss"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300 font-bold uppercase text-[10px] tracking-widest">Prosjektbeskrivelse</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Kort redegjørelse for tomten / prosjektet..." 
                      className="min-h-[120px] bg-charcoal border-white/10 text-white rounded-sm placeholder:text-gray-600 focus-visible:ring-moss"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-moss hover:bg-moss-hover mt-4 font-bold uppercase tracking-widest text-[10px] h-12 rounded-sm shadow-xl">Send Forespørsel</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <Card className="border border-white/10 bg-charcoal-light shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-charcoal border-b border-white/10 p-8">
            <CardTitle className="text-white text-xl font-bold uppercase tracking-widest">{user.role === 'admin' ? 'Alle Aktive Bookinger' : 'Dine Bookinger & Forespørsler'}</CardTitle>
            <CardDescription className="text-gray-400 mt-2">
              {user.role === 'admin' 
                 ? 'Håndter innkommende befaringer og endre status.' 
                 : 'Oversikt over befaringer og prosjekforespørsler.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {bookings.length === 0 ? (
              <div className="p-16 text-center flex flex-col items-center">
                <Search className="w-12 h-12 text-gray-600 mb-6" />
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">Ingen bookinger funnet</h3>
                <p className="text-gray-400 max-w-sm leading-relaxed">
                  {user.role === 'admin' ? 'Det er ingen forespørsler i systemet for øyeblikket.' : 'Du har ikke bestilt noen befaringer enda.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-6 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-white/5 transition-colors">
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="font-bold text-xl text-white">{booking.service}</h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      {user.role === 'admin' && (
                        <div className="text-[10px] uppercase tracking-widest font-bold text-gray-300 mb-4 bg-charcoal p-3 rounded-lg border border-white/5 inline-block">
                          Kunde: <span className="text-white ml-2">{booking.userName}</span> <span className="text-gray-500 font-normal ml-2">({booking.userEmail})</span>
                        </div>
                      )}
                      
                      <p className="text-gray-400 text-sm max-w-2xl leading-relaxed mb-6">
                        <span className="font-bold text-gray-300 uppercase tracking-widest text-[10px] block mb-2">Prosjektbeskrivelse</span>
                        {booking.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-moss/80">
                        <span className="flex items-center gap-2 hidden md:flex">
                          <MapPin className="w-4 h-4" /> Trondheim Omegn
                        </span>
                        <span className="flex items-center gap-2 border-l border-white/10 pl-6">
                          <Calendar className="w-4 h-4" /> {format(new Date(booking.date), 'do MMMM yyyy', { locale: nb })}
                        </span>
                        <span className="flex items-center gap-2 border-l border-white/10 pl-6">
                          <Clock className="w-4 h-4" /> 08:00 - 16:00
                        </span>
                      </div>
                    </div>

                    {user.role === 'admin' && (
                      <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-48 shrink-0">
                        <select 
                          className="w-full h-12 rounded-sm border border-white/20 text-[10px] uppercase font-bold tracking-widest px-4 bg-charcoal text-white focus-visible:outline-none focus:ring-1 focus:ring-moss"
                          value={booking.status}
                          onChange={(e) => updateStatus(booking.id, e.target.value as any)}
                        >
                          <option value="pending">Avventer</option>
                          <option value="confirmed">Bekreftet</option>
                          <option value="completed">Gjennomført</option>
                          <option value="cancelled">Avbrutt</option>
                        </select>
                        <Button variant="outline" className="w-full h-12 bg-transparent text-white border-white/20 hover:bg-white/10 uppercase tracking-widest text-[10px] font-bold rounded-sm">Se Detaljer</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
