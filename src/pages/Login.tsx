import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      if (!name.trim() || !email.trim() || !password.trim()) {
        toast.error('Please fill all fields');
        return;
      }
      signup(name, email, password);
      toast.success('Account created!');
    } else {
      if (!email.trim() || !password.trim()) {
        toast.error('Please fill all fields');
        return;
      }
      login(email, password);
      toast.success('Welcome back!');
    }
    navigate(redirect);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Waves className="h-10 w-10 text-ocean mx-auto mb-3" />
          <h1 className="font-display font-bold text-2xl text-foreground">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isSignup ? 'Sign up to order beach food' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignup && (
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-card h-11"
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-card h-11"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-card h-11"
          />
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-coral-light h-11 font-display font-semibold">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignup(!isSignup)} className="text-ocean font-semibold">
            {isSignup ? 'Sign In' : 'Sign Up'}
          </button>
        </p>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Tip: Use <span className="font-semibold">restaurant@demo.com</span> to access the restaurant dashboard
        </p>
      </div>
    </div>
  );
};

export default Login;
