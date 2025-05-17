import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const { resetPassword, user, error: authError } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirecionar se o usuário já estiver autenticado
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Atualizar erro de reset quando o erro de autenticação mudar
  useEffect(() => {
    if (authError) {
      setResetError(authError);
    }
  }, [authError]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    
    if (!email) {
      setResetError("Por favor, informe seu email.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await resetPassword(email);
      
      if (error) {
        let errorMessage = error.message;
        
        // Mensagens de erro mais amigáveis
        if (error.message.includes("user not found")) {
          errorMessage = "Não encontramos uma conta com este email. Verifique se o email está correto ou crie uma nova conta.";
        } else if (error.message.includes("rate limit")) {
          errorMessage = "Muitas tentativas. Por favor, aguarde alguns minutos antes de tentar novamente.";
        }
        
        setResetError(errorMessage);
        return;
      }
      
      setSuccess(true);
      toast({
        title: "Email enviado com sucesso!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (err) {
      const error = err as Error;
      setResetError("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
      console.error("Erro ao resetar senha:", error);
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
          <CardTitle className="text-2xl text-center">Recuperar senha</CardTitle>
          <CardDescription className="text-center">
            {!success 
              ? "Informe seu email para receber um link de recuperação de senha" 
              : "Email enviado! Verifique sua caixa de entrada"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {resetError && !success && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{resetError}</AlertDescription>
            </Alert>
          )}
          {!success ? (
            <form onSubmit={handleResetPassword}>
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
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar link de recuperação"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-green-50 text-green-800 p-4 rounded-lg">
                <p>Enviamos um email com instruções para redefinir sua senha.</p>
                <p className="mt-2 text-sm">Não recebeu? Verifique sua pasta de spam ou tente novamente.</p>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSuccess(false);
                  setEmail("");
                }}
              >
                Tentar novamente
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            Lembrou sua senha?{" "}
            <Link to="/login" className="text-primary-600 hover:text-primary-800 font-medium">
              Voltar para o login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
