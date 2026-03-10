import { Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import RestaurantCard from '@/components/RestaurantCard';
import { restaurants } from '@/data/mockData';
import heroBeach from '@/assets/hero-beach.jpg';

const Index = () => {
  const [search, setSearch] = useState('');
  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-48 overflow-hidden">
        <img src={heroBeach} alt="Beach" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 to-foreground/70 flex flex-col items-center justify-center px-4">
          <h1 className="font-display font-bold text-2xl text-primary-foreground text-center">
            Food delivered to your towel 🏖️
          </h1>
          <p className="text-primary-foreground/80 text-sm mt-1">Order from beach restaurants nearby</p>
        </div>
      </div>

      {/* Search */}
      <div className="container mx-auto px-4 -mt-5 relative z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants or cuisines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card shadow-md border-0 h-11 rounded-xl"
          />
        </div>
      </div>

      {/* Restaurants */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="font-display font-semibold text-lg text-foreground mb-4">Nearby Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(r => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No restaurants found</p>
        )}
      </div>
    </div>
  );
};

export default Index;
