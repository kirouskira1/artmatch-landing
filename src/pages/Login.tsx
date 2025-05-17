import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { signIn, signInWithGoogle, user, error: authError } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirecionar se o usuário já estiver autenticado
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Atualizar erro de login quando o erro de autenticação mudar
  useEffect(() => {
    if (authError) {
      setLoginError(authError);
    }
  }, [authError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    
    if (!email || !password) {
      setLoginError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await signIn(email, password);
      
      if (error) {
        let errorMessage = error.message;
        
        // Mensagens de erro mais amigáveis
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Email ou senha incorretos. Por favor, verifique suas credenciais.";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "Seu email ainda não foi confirmado. Por favor, verifique sua caixa de entrada.";
        }
        
        setLoginError(errorMessage);
        return;
      }
      
      // O redirecionamento será feito pelo useEffect quando o usuário for atualizado
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo(a) de volta à Artmatch.",
      });
    } catch (err) {
      const error = err as Error;
      setLoginError("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
      console.error("Erro de login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-lg dark:border-slate-700 dark:bg-slate-800">
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
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link to="/" className="text-3xl font-bold text-primary-900 dark:text-primary-300">
              Artmatch
            </Link>
          </div>
          <CardTitle className="text-2xl text-center dark:text-white">Entrar na sua conta</CardTitle>
          <CardDescription className="text-center dark:text-slate-300">
            Entre com seu email e senha para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loginError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm dark:text-slate-300">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
              Cadastre-se
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
          <div className="flex">
            <Button 
              variant="outline" 
              className="w-full" 
              type="button"
              disabled={googleLoading}
              onClick={async () => {
                try {
                  setLoginError(null);
                  setGoogleLoading(true);
                  const { error } = await signInWithGoogle();
                  
                  if (error) {
                    let errorMessage = error.message;
                    
                    // Mensagens de erro mais amigáveis
                    if (error.message.includes("popup_closed_by_user")) {
                      errorMessage = "O login foi cancelado. Por favor, tente novamente.";
                    }
                    
                    setLoginError(errorMessage);
                  }
                  // O redirecionamento será feito automaticamente pelo Supabase
                } catch (err) {
                  const error = err as Error;
                  setLoginError("Ocorreu um erro inesperado ao tentar fazer login com Google.");
                  console.error("Erro de login com Google:", error);
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

export default Login;
