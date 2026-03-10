import { useState } from 'react';
import { MapPin, Navigation, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { BeachLocation } from '@/types';
import { toast } from 'sonner';

interface Props {
  onLocationSet: (location: BeachLocation) => void;
  location: BeachLocation | null;
}

const BeachLocationInput = ({ onLocationSet, location }: Props) => {
  const [mode, setMode] = useState<'gps' | 'text'>('text');
  const [textRef, setTextRef] = useState(location?.description || '');
  const [lat, setLat] = useState(location?.coordinates?.lat?.toString() || '');
  const [lng, setLng] = useState(location?.coordinates?.lng?.toString() || '');

  const handleGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc: BeachLocation = {
            type: 'gps',
            coordinates: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          };
          setLat(pos.coords.latitude.toString());
          setLng(pos.coords.longitude.toString());
          onLocationSet(loc);
          toast.success('GPS location captured!');
        },
        () => toast.error('Could not get GPS location')
      );
    }
  };

  const handleTextSubmit = () => {
    if (textRef.trim()) {
      onLocationSet({ type: 'text', description: textRef.trim() });
      toast.success('Location saved!');
    }
  };

  const handleCoordsSubmit = () => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    if (!isNaN(latNum) && !isNaN(lngNum)) {
      onLocationSet({ type: 'marker', coordinates: { lat: latNum, lng: lngNum } });
      toast.success('Coordinates saved!');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        Where are you on the beach?
      </h3>

      <div className="flex gap-2">
        <Button
          variant={mode === 'text' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('text')}
          className={mode === 'text' ? 'bg-primary text-primary-foreground' : ''}
        >
          <MessageSquare className="h-4 w-4 mr-1" /> Describe
        </Button>
        <Button
          variant={mode === 'gps' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('gps')}
          className={mode === 'gps' ? 'bg-primary text-primary-foreground' : ''}
        >
          <Navigation className="h-4 w-4 mr-1" /> GPS
        </Button>
      </div>

      {mode === 'text' ? (
        <div className="space-y-2">
          <Textarea
            placeholder='e.g. "Blue umbrella near lifeguard tower 3"'
            value={textRef}
            onChange={(e) => setTextRef(e.target.value)}
            className="bg-card border-border"
          />
          <Button onClick={handleTextSubmit} className="w-full bg-primary text-primary-foreground hover:bg-coral-light">
            Confirm Location
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <Button onClick={handleGPS} variant="outline" className="w-full border-ocean text-ocean hover:bg-ocean/10">
            <Navigation className="h-4 w-4 mr-2" /> Use my current GPS
          </Button>
          <div className="text-xs text-muted-foreground text-center">or enter manually:</div>
          <div className="flex gap-2">
            <Input placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} className="bg-card" />
            <Input placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} className="bg-card" />
          </div>
          <Button onClick={handleCoordsSubmit} className="w-full bg-primary text-primary-foreground hover:bg-coral-light">
            Confirm Coordinates
          </Button>
        </div>
      )}

      {location && (
        <div className="bg-tropical/10 border border-tropical/30 rounded-lg p-3 text-sm text-foreground">
          ✅ Location set: {location.type === 'text' ? location.description : `${location.coordinates?.lat.toFixed(4)}, ${location.coordinates?.lng.toFixed(4)}`}
        </div>
      )}
    </div>
  );
};

export default BeachLocationInput;
