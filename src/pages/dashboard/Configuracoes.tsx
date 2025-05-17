import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Save, Bell, Shield, Eye, EyeOff, Mail, Lock, User, LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const ConfiguracoesPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("conta");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados para configurações
  const [notificacoesEmail, setNotificacoesEmail] = useState(true);
  const [notificacoesApp, setNotificacoesApp] = useState(true);
  const [perfilPublico, setPerfilPublico] = useState(true);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  
  const handleSalvarNotificacoes = () => {
    setLoading(true);
    
    // Simulação de salvamento
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Configurações salvas",
        description: "Suas preferências de notificações foram atualizadas com sucesso.",
      });
    }, 1000);
  };
  
  const handleSalvarPrivacidade = () => {
    setLoading(true);
    
    // Simulação de salvamento
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Configurações salvas",
        description: "Suas preferências de privacidade foram atualizadas com sucesso.",
      });
    }, 1000);
  };
  
  const handleAlterarSenha = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (novaSenha !== confirmarSenha) {
      toast({
        title: "Erro ao alterar senha",
        description: "A nova senha e a confirmação não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulação de alteração de senha
    setTimeout(() => {
      setLoading(false);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso.",
      });
    }, 1500);
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      // Redirecionamento é feito pelo AuthContext
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast({
        title: "Erro ao sair",
        description: "Não foi possível encerrar sua sessão. Tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Configurações</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="conta">Conta</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="privacidade">Privacidade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="conta" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta</CardTitle>
                <CardDescription>
                  Gerencie suas informações de login e segurança
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex">
                      <Input 
                        id="email" 
                        value={user?.email || ""} 
                        disabled 
                        className="flex-1"
                      />
                      <Button variant="outline" className="ml-2" disabled>
                        <Mail className="h-4 w-4 mr-2" />
                        Alterar
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500">
                      Seu email é usado para login e recuperação de conta
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Alterar Senha</h3>
                    <form onSubmit={handleAlterarSenha} className="space-y-4">
                      <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="senha-atual">Senha Atual</Label>
                        <div className="relative">
                          <Input 
                            id="senha-atual" 
                            type={showPassword ? "text" : "password"} 
                            value={senhaAtual} 
                            onChange={(e) => setSenhaAtual(e.target.value)}
                            required
                          />
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-0 top-0 h-full px-3" 
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="nova-senha">Nova Senha</Label>
                        <Input 
                          id="nova-senha" 
                          type={showPassword ? "text" : "password"} 
                          value={novaSenha} 
                          onChange={(e) => setNovaSenha(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                        <Input 
                          id="confirmar-senha" 
                          type={showPassword ? "text" : "password"} 
                          value={confirmarSenha} 
                          onChange={(e) => setConfirmarSenha(e.target.value)}
                          required
                        />
                      </div>
                      
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Alterando...
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Alterar Senha
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-destructive">Encerrar Sessão</h3>
                    <p className="text-sm text-slate-500 mb-4">
                      Ao clicar no botão abaixo, você será desconectado da sua conta
                    </p>
                    <Button variant="destructive" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair da Conta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notificacoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificações</CardTitle>
                <CardDescription>
                  Escolha como e quando deseja receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notificações por Email</h4>
                        <p className="text-sm text-slate-500">Receba atualizações importantes no seu email</p>
                      </div>
                      <Switch 
                        checked={notificacoesEmail} 
                        onCheckedChange={setNotificacoesEmail} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notificações no Aplicativo</h4>
                        <p className="text-sm text-slate-500">Receba notificações dentro da plataforma</p>
                      </div>
                      <Switch 
                        checked={notificacoesApp} 
                        onCheckedChange={setNotificacoesApp} 
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Tipos de Notificações</h4>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notif-editais" className="flex-1">Novos editais compatíveis</Label>
                        <Switch id="notif-editais" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notif-mensagens" className="flex-1">Novas mensagens</Label>
                        <Switch id="notif-mensagens" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notif-inscricoes" className="flex-1">Atualizações de inscrições</Label>
                        <Switch id="notif-inscricoes" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notif-sistema" className="flex-1">Atualizações do sistema</Label>
                        <Switch id="notif-sistema" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-6">
                <Button onClick={handleSalvarNotificacoes} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Preferências
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacidade" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Privacidade</CardTitle>
                <CardDescription>
                  Controle quem pode ver seu perfil e suas informações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Perfil Público</h4>
                        <p className="text-sm text-slate-500">Permitir que organizadores de editais vejam seu perfil</p>
                      </div>
                      <Switch 
                        checked={perfilPublico} 
                        onCheckedChange={setPerfilPublico} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Mostrar Portfólio Publicamente</h4>
                        <p className="text-sm text-slate-500">Permitir que suas obras sejam vistas por visitantes não logados</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Compartilhar Dados de Contato</h4>
                        <p className="text-sm text-slate-500">Permitir que organizadores vejam seus dados de contato</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        Suas informações pessoais nunca são compartilhadas com terceiros sem sua permissão explícita.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-6">
                <Button onClick={handleSalvarPrivacidade} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Preferências
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ConfiguracoesPage;
