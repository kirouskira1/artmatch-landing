import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/AuthContext";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getCurrentProfile, updateProfile, uploadAvatar, calculateProfileCompleteness, type Profile as UserProfile } from "@/lib/profile";

const PerfilPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("informacoes");
  const [perfilCompleto, setPerfilCompleto] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados para os formulários
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [biografia, setBiografia] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  
  // Carregar dados do perfil
  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        const profileData = await getCurrentProfile();
        setProfile(profileData);
        
        if (profileData) {
          setNome(profileData.full_name || "");
          setTelefone(profileData.phone || "");
          setCidade(profileData.city || "");
          setEstado(profileData.state || "");
          setBiografia(profileData.bio || "");
          setWebsite(profileData.website || "");
          setInstagram(profileData.instagram || "");
          
          // Calcular completude do perfil
          const completeness = calculateProfileCompleteness(profileData);
          setPerfilCompleto(completeness);
        } else {
          // Definir valores padrão se não houver perfil
          setNome(user?.email?.split("@")[0] || "");
        }
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        setError("Não foi possível carregar seu perfil. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }
    
    loadProfile();
  }, [user]);
  
  // Dados de portfólio (serão carregados do banco de dados posteriormente)
  const [portfolio, setPortfolio] = useState([
    { id: 1, titulo: "Série Natureza Urbana", ano: "2024", tecnica: "Acrílica sobre tela", dimensoes: "100x80cm", imagem: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { id: 2, titulo: "Instalação Ecos", ano: "2023", tecnica: "Materiais diversos", dimensoes: "Variável", imagem: "https://images.unsplash.com/photo-1531913764164-f85c52d7e6a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { id: 3, titulo: "Fragmentos da Memória", ano: "2022", tecnica: "Óleo sobre tela", dimensoes: "120x90cm", imagem: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
  ]);

  // Lista de verificação do perfil
  const checklistPerfil = [
    { id: 1, item: "Informações básicas", completo: true },
    { id: 2, item: "Foto de perfil", completo: !!profile?.avatar_url },
    { id: 3, item: "Biografia", completo: !!biografia },
    { id: 4, item: "Contato", completo: !!telefone },
    { id: 5, item: "Localização", completo: !!cidade && !!estado },
    { id: 6, item: "Portfólio", completo: portfolio.length > 0 },
    { id: 7, item: "Redes sociais", completo: !!website || !!instagram },
    { id: 8, item: "Documentos verificados", completo: false },
  ];

  const handleSalvarInformacoes = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      const profileData = {
        full_name: nome,
        phone: telefone,
        city: cidade,
        state: estado,
        bio: biografia,
        website: website,
        instagram: instagram
      };
      
      const { data, error } = await updateProfile(profileData);
      
      if (error) {
        setError(`Erro ao salvar informações: ${error.message}`);
        return;
      }
      
      if (data) {
        setProfile(data);
        const completeness = calculateProfileCompleteness(data);
        setPerfilCompleto(completeness);
      }
      
      toast({
        title: "Informações salvas com sucesso!",
        description: "Seu perfil foi atualizado."
      });
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      setError("Ocorreu um erro ao salvar suas informações. Por favor, tente novamente.");
    } finally {
      setSaving(false);
    }
  };
  
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingAvatar(true);
    setError(null);
    
    try {
      const { url, error } = await uploadAvatar(file);
      
      if (error) {
        setError(`Erro ao fazer upload da imagem: ${error.message}`);
        return;
      }
      
      if (url) {
        // Atualizar o perfil com a nova URL do avatar
        setProfile(prev => prev ? { ...prev, avatar_url: url } : null);
        
        toast({
          title: "Avatar atualizado com sucesso!",
          description: "Sua foto de perfil foi atualizada."
        });
      }
    } catch (err) {
      console.error("Erro ao fazer upload do avatar:", err);
      setError("Ocorreu um erro ao fazer upload da imagem. Por favor, tente novamente.");
    } finally {
      setUploadingAvatar(false);
      // Limpar o input de arquivo
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Meu Perfil</h1>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm text-slate-500">Perfil completo</div>
            <div className="font-medium">{perfilCompleto}%</div>
          </div>
          <Progress value={perfilCompleto} className="w-24" />
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Carregando seu perfil...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={profile?.avatar_url || ""} alt={nome} />
                    <AvatarFallback>{nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAvatarUpload}
                  />
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="absolute bottom-4 right-0 rounded-full p-1" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingAvatar}
                  >
                    {uploadingAvatar ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <CardTitle className="text-center">{nome}</CardTitle>
                <CardDescription className="text-center">{user?.email}</CardDescription>
              </div>
              <div className="space-y-4 mt-6">
                <h3 className="font-medium mb-2">Checklist do Perfil</h3>
                <ul className="space-y-2">
                  {checklistPerfil.map((item) => (
                    <li key={item.id} className="flex items-center gap-2">
                      {item.completo ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      )}
                      <span className={item.completo ? "" : "text-slate-500"}>{item.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4 mt-6">
                <h3 className="font-medium mb-2">Dicas para melhorar seu perfil</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <PlusCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Adicione uma biografia detalhada para que os organizadores conheçam melhor seu trabalho</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PlusCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Mantenha seu portfólio atualizado com suas obras mais recentes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PlusCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Inclua links para suas redes sociais e site pessoal</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <Tabs defaultValue="informacoes" onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex w-full justify-between">
                <TabsTrigger value="informacoes">Informações</TabsTrigger>
                <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
                <TabsTrigger value="curriculo">Currículo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="informacoes" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>
                      Atualize suas informações pessoais para manter seu perfil atualizado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSalvarInformacoes}>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nome">Nome Completo</Label>
                            <Input 
                              id="nome" 
                              value={nome} 
                              onChange={(e) => setNome(e.target.value)} 
                              disabled={saving}
                              placeholder="Seu nome completo"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input 
                              id="telefone" 
                              value={telefone} 
                              onChange={(e) => setTelefone(e.target.value)} 
                              disabled={saving}
                              placeholder="(00) 00000-0000"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cidade">Cidade</Label>
                            <Input 
                              id="cidade" 
                              value={cidade} 
                              onChange={(e) => setCidade(e.target.value)} 
                              disabled={saving}
                              placeholder="Sua cidade"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="estado">Estado</Label>
                            <Input 
                              id="estado" 
                              value={estado} 
                              onChange={(e) => setEstado(e.target.value)} 
                              disabled={saving}
                              placeholder="UF"
                              maxLength={2}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="biografia">Biografia</Label>
                          <Textarea 
                            id="biografia" 
                            value={biografia} 
                            onChange={(e) => setBiografia(e.target.value)}
                            className="min-h-[120px]"
                            disabled={saving}
                            placeholder="Conte um pouco sobre você, sua trajetória artística e seu trabalho..."
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input 
                              id="website" 
                              value={website} 
                              onChange={(e) => setWebsite(e.target.value)} 
                              disabled={saving}
                              placeholder="www.seusite.com.br"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input 
                              id="instagram" 
                              value={instagram} 
                              onChange={(e) => setInstagram(e.target.value)} 
                              disabled={saving}
                              placeholder="@seuinstagram"
                            />
                          </div>
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={saving}>
                          {saving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Salvando...
                            </>
                          ) : (
                            "Salvar Informações"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="portfolio" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Meu Portfólio</CardTitle>
                    <CardDescription>
                      Adicione obras ao seu portfólio para aumentar suas chances de aprovação
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {portfolio.map((obra) => (
                        <Card key={obra.id} className="overflow-hidden">
                          <div className="aspect-square relative">
                            <img 
                              src={obra.imagem} 
                              alt={obra.titulo} 
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <CardContent className="p-3">
                            <h3 className="font-medium">{obra.titulo}</h3>
                            <p className="text-sm text-slate-500">{obra.ano}</p>
                            <p className="text-sm text-slate-500">{obra.tecnica}</p>
                            <p className="text-sm text-slate-500">{obra.dimensoes}</p>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <Card className="border-dashed flex flex-col items-center justify-center p-6 h-full aspect-square">
                        <Upload className="h-10 w-10 text-slate-400 mb-2" />
                        <p className="text-center text-slate-600 mb-4">Adicionar nova obra</p>
                        <Button variant="outline">Upload</Button>
                      </Card>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6">
                    <Button variant="outline" className="w-full">Gerenciar Portfólio Completo</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="curriculo" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Currículo Artístico</CardTitle>
                    <CardDescription>
                      Adicione sua formação, exposições e premiações
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Formação Acadêmica</h3>
                        <Card className="border-dashed p-6 text-center">
                          <p className="text-slate-600 mb-4">Adicione sua formação acadêmica</p>
                          <Button variant="outline">Adicionar Formação</Button>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Exposições</h3>
                        <Card className="mb-4 p-4">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">Bienal de Arte Contemporânea</h4>
                              <p className="text-sm text-slate-500">São Paulo, Brasil • 2023</p>
                              <p className="text-sm mt-2">Exposição coletiva com a obra "Fragmentos da Memória"</p>
                            </div>
                            <Button variant="ghost" size="sm">Editar</Button>
                          </div>
                        </Card>
                        <Card className="mb-4 p-4">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">Galeria Municipal</h4>
                              <p className="text-sm text-slate-500">Rio de Janeiro, Brasil • 2022</p>
                              <p className="text-sm mt-2">Exposição individual "Natureza Urbana"</p>
                            </div>
                            <Button variant="ghost" size="sm">Editar</Button>
                          </div>
                        </Card>
                        <Button variant="outline" className="w-full">Adicionar Exposição</Button>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Premiações</h3>
                        <Card className="border-dashed p-6 text-center">
                          <p className="text-slate-600 mb-4">Adicione suas premiações e reconhecimentos</p>
                          <Button variant="outline">Adicionar Premiação</Button>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default PerfilPage;
