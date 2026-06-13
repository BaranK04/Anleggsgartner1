import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, isAdmin);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center flex-col items-center cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-12 h-12 bg-moss rounded-lg flex items-center justify-center font-bold text-white text-2xl shrink-0">A1</div>
          <h2 className="mt-4 text-center text-3xl font-display font-black tracking-tighter text-white uppercase">
            Anleggsgartner 1
          </h2>
        </div>
        <h2 className="mt-2 text-center text-lg font-bold text-gray-400">
          Logg inn i bookingportalen
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up">
        <Card className="bg-charcoal-light px-4 py-8 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/10">
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email" className="block text-sm font-bold text-gray-300">
                  E-postadresse
                </Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full py-2.5 px-3 bg-charcoal border-white/10 text-white placeholder:text-gray-600 rounded-sm focus-visible:ring-moss"
                    placeholder="post@dittfirma.no"
                  />
                </div>
              </div>

              <div>
                 <Label className="block text-sm font-bold text-gray-300 mb-2">Simuler rolle</Label>
                  <div className="flex flex-col gap-4">
                   <Button 
                      type="button"
                      variant="ghost"
                      onClick={() => setIsAdmin(false)}
                      className={!isAdmin ? 'bg-white text-charcoal w-full hover:bg-gray-200 font-bold uppercase tracking-widest text-[10px]' : 'w-full bg-transparent text-gray-400 border border-white/10 hover:bg-white/5 hover:text-white font-bold uppercase tracking-widest text-[10px]'}
                   >
                     Kunde
                   </Button>
                   <Button 
                      type="button"
                      variant="ghost"
                      onClick={() => setIsAdmin(true)}
                      className={isAdmin ? 'bg-moss hover:bg-moss-hover text-white w-full font-bold uppercase tracking-widest text-[10px]' : 'w-full bg-transparent text-gray-400 border border-white/10 hover:bg-white/5 hover:text-white font-bold uppercase tracking-widest text-[10px]'}
                   >
                     Admin / Eier
                   </Button>
                 </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="flex w-full justify-center bg-moss hover:bg-moss-hover h-12 text-sm text-white font-bold uppercase tracking-widest rounded-sm"
                >
                  Logg inn sikkert
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center mt-6 text-[10px] uppercase font-bold tracking-widest text-gray-500">
          Dette er en demo. Skriv inn valgfri e-post.
        </p>
      </div>
    </div>
  );
}
