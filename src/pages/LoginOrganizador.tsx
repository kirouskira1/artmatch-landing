import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const LoginOrganizador = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Verificar se o usuário é um organizador
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('email', email)
        .single();
      
      if (profileError) {
        toast({
          title: "Erro ao verificar perfil",
          description: "Não foi possível verificar seu tipo de usuário.",
          variant: "destructive",
        });
        return;
      }
      
      if (profiles?.role !== 'organizador') {
        toast({
          title: "Acesso negado",
          description: "Esta área é exclusiva para organizadores de editais.",
          variant: "destructive",
        });
        return;
      }
      
      // Fazer login
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Erro ao entrar",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      // Success - redirect to organizer dashboard
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo(a) de volta à área de organizadores.",
      });
      navigate("/organizador/dashboard");
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao tentar fazer login.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link to="/" className="text-3xl font-bold text-indigo-900">
              Artmatch <span className="text-lg">Organizadores</span>
            </Link>
          </div>
          <CardTitle className="text-2xl text-center">Área do Organizador</CardTitle>
          <CardDescription className="text-center">
            Entre com seu email e senha para acessar o painel de gestão de editais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@organizacao.com"
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
                    className="text-sm text-indigo-600 hover:text-indigo-800"
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
                className="w-full bg-indigo-600 hover:bg-indigo-700" 
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Não tem uma conta de organizador?{" "}
            <Link to="/contato" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Entre em contato
            </Link>
          </div>
          <div className="text-center text-sm">
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Voltar para login de artistas
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginOrganizador;
