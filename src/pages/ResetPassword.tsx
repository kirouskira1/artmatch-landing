import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);
  const { user, error: authError } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirecionar se o usuário já estiver autenticado e não estiver redefinindo senha
  useEffect(() => {
    if (user && !window.location.hash) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Atualizar erro de reset quando o erro de autenticação mudar
  useEffect(() => {
    if (authError) {
      setResetError(authError);
    }
  }, [authError]);

  useEffect(() => {
    // Get the hash from the URL
    const hashFromUrl = window.location.hash.substring(1);
    if (hashFromUrl) {
      setHash(hashFromUrl);
    } else {
      // Verificar se há um token de redefinição de senha na URL
      const url = new URL(window.location.href);
      const type = url.searchParams.get('type');
      
      if (type === 'recovery') {
        // O usuário está vindo de um link de redefinição de senha
        setHash('recovery');
      }
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    
    if (!password || !confirmPassword) {
      setResetError("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setResetError("As senhas digitadas não são iguais.");
      return;
    }

    if (password.length < 6) {
      setResetError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        let errorMessage = error.message;
        
        // Mensagens de erro mais amigáveis
        if (error.message.includes("expired") || error.message.includes("invalid")) {
          errorMessage = "O link de redefinição de senha expirou ou é inválido. Por favor, solicite um novo link.";
        } else if (error.message.includes("strong")) {
          errorMessage = "Sua senha não é forte o suficiente. Use uma combinação de letras, números e caracteres especiais.";
        }
        
        setResetError(errorMessage);
        return;
      }
      
      // Limpar qualquer hash ou token da URL para evitar problemas futuros
      window.history.replaceState(null, '', window.location.pathname);
      
      toast({
        title: "Senha redefinida com sucesso!",
        description: "Agora você pode fazer login com sua nova senha.",
      });
      
      // Redirect to login page after successful password reset
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const error = err as Error;
      setResetError("Ocorreu um erro inesperado ao tentar redefinir sua senha. Por favor, tente novamente mais tarde.");
      console.error("Erro ao redefinir senha:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link to="/" className="text-3xl font-bold text-primary-900">
              Artmatch
            </Link>
          </div>
          <CardTitle className="text-2xl text-center">Redefinir senha</CardTitle>
          <CardDescription className="text-center">
            Crie uma nova senha para sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {resetError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{resetError}</AlertDescription>
            </Alert>
          )}
          {!hash ? (
            <div className="text-center space-y-4">
              <div className="bg-amber-50 text-amber-800 p-4 rounded-lg">
                <p>Link de redefinição de senha inválido ou expirado.</p>
                <p className="mt-2 text-sm">Por favor, solicite um novo link de redefinição de senha.</p>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/forgot-password")}
              >
                Solicitar novo link
              </Button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nova Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Redefinindo..." : "Redefinir senha"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            <Link to="/login" className="text-primary-600 hover:text-primary-800 font-medium">
              Voltar para o login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
