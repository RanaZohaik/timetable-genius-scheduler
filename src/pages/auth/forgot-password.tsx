import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import AuthLayout from '@/components/AuthLayout';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Mock password reset request
    setTimeout(() => {
      toast({
        title: "Email sent",
        description: "If your email exists in our system, you'll receive a reset link shortly",
      });
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <AuthLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-2 flex flex-col items-center">
              <Logo />
              <CardTitle className="text-2xl text-center">Check your email</CardTitle>
              <CardDescription className="text-center">
                We've sent a password reset link to {email}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="text-sm text-center mb-4 text-muted-foreground">
                Didn't receive an email? Check your spam folder or try again.
              </p>
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                Try again
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link to="/auth/login" className="text-sm text-primary hover:underline">
                Return to login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 flex flex-col items-center">
            <Logo />
            <CardTitle className="text-2xl text-center">Forgot password</CardTitle>
            <CardDescription className="text-center">
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/auth/login" className="text-sm text-primary hover:underline">
              Return to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
