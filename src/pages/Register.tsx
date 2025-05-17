import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const { signUp, signInWithGoogle, user, error: authError } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirecionar se o usuário já estiver autenticado
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Atualizar erro de registro quando o erro de autenticação mudar
  useEffect(() => {
    if (authError) {
      setRegisterError(authError);
    }
  }, [authError]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    
    if (!email || !password || !confirmPassword) {
      setRegisterError("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError("As senhas digitadas não são iguais.");
      return;
    }

    if (password.length < 6) {
      setRegisterError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      const { error, data } = await signUp(email, password);
      
      if (error) {
        let errorMessage = error.message;
        
        // Mensagens de erro mais amigáveis
        if (error.message.includes("already registered")) {
          errorMessage = "Este email já está registrado. Tente fazer login ou recuperar sua senha.";
        } else if (error.message.includes("invalid email")) {
          errorMessage = "O email informado não é válido. Por favor, verifique e tente novamente.";
        }
        
        setRegisterError(errorMessage);
        return;
      }
      
      // Check if email confirmation is required
      if (data?.user && !data.session) {
        toast({
          title: "Verifique seu email",
          description: "Enviamos um link de confirmação para o seu email.",
        });
        navigate("/login");
      } else {
        // Auto-login successful
        toast({
          title: "Conta criada com sucesso!",
          description: "Bem-vindo(a) à Artmatch.",
        });
        navigate("/dashboard");
      }
    } catch (err) {
      const error = err as Error;
      setRegisterError("Ocorreu um erro inesperado ao tentar criar sua conta. Por favor, tente novamente mais tarde.");
      console.error("Erro de registro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-lg dark:border-slate-700 dark:bg-slate-800 relative">
        <div className="absolute top-4 left-4">
          <button 
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            onClick={() => navigate('/')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar
          </button>
        </div>
        <CardHeader className="space-y-1 pt-12">
          <div className="flex justify-center mb-4">
            <Link to="/" className="text-3xl font-bold text-primary-900 dark:text-primary-400">
              Artmatch
            </Link>
          </div>
          <CardTitle className="text-2xl text-center dark:text-white">Criar uma conta</CardTitle>
          <CardDescription className="text-center dark:text-slate-300">
            Preencha os campos abaixo para se cadastrar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {registerError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{registerError}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-slate-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-slate-300">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="dark:text-slate-300">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Criando conta..." : "Criar conta"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm dark:text-slate-300">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
              Entrar
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-800 px-2 text-slate-500 dark:text-slate-400">Ou continue com</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="w-full dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700" 
              type="button"
              disabled={googleLoading}
              onClick={async () => {
                try {
                  setRegisterError(null);
                  setGoogleLoading(true);
                  const { error } = await signInWithGoogle();
                  
                  if (error) {
                    let errorMessage = error.message;
                    
                    // Mensagens de erro mais amigáveis
                    if (error.message.includes("popup_closed_by_user")) {
                      errorMessage = "O cadastro foi cancelado. Por favor, tente novamente.";
                    }
                    
                    setRegisterError(errorMessage);
                  }
                  // O redirecionamento será feito automaticamente pelo Supabase
                } catch (err) {
                  const error = err as Error;
                  setRegisterError("Ocorreu um erro inesperado ao tentar cadastrar com Google.");
                  console.error("Erro de cadastro com Google:", error);
                } finally {
                  setGoogleLoading(false);
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
              </svg>
              {googleLoading ? "Conectando..." : "Google"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
