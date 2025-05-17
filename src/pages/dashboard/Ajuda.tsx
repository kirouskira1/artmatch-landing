import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { HelpCircle, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Interface para as perguntas frequentes
interface FAQ {
  id: string;
  pergunta: string;
  resposta: string;
  categoria: string;
  avaliacoes?: {
    util: number;
    naoUtil: number;
  };
}

const Ajuda = () => {
  const { toast } = useToast();
  
  // Estado para armazenar as perguntas frequentes
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "senha",
      pergunta: "Como recuperar minha senha?",
      resposta: "Para recuperar sua senha, clique em 'Esqueci minha senha' na tela de login. Você receberá um e-mail com instruções para redefinir sua senha. Certifique-se de verificar sua caixa de spam caso não encontre o e-mail na caixa de entrada.",
      categoria: "Conta",
      avaliacoes: { util: 24, naoUtil: 3 }
    },
    {
      id: "perfil",
      pergunta: "Como editar meu perfil de artista?",
      resposta: "Para editar seu perfil, acesse a página 'Meu Perfil' no menu lateral do dashboard. Lá você encontrará opções para atualizar suas informações pessoais, biografia, habilidades, portfólio e informações de contato. Lembre-se de clicar em 'Salvar' após fazer as alterações.",
      categoria: "Perfil",
      avaliacoes: { util: 42, naoUtil: 5 }
    },
    {
      id: "editais",
      pergunta: "Como encontrar e se inscrever em editais?",
      resposta: "Para encontrar editais, acesse a seção 'Editais' no menu lateral. Você pode filtrar os editais por categoria, localização, prazo e valor. Para se inscrever, clique em 'Ver Detalhes' no edital desejado e depois em 'Inscrever-se'. Siga as etapas do processo de inscrição, fornecendo as informações e documentos solicitados.",
      categoria: "Editais",
      avaliacoes: { util: 67, naoUtil: 2 }
    },
    {
      id: "suporte",
      pergunta: "Como entrar em contato com o suporte?",
      resposta: "Você pode entrar em contato com nosso suporte através do e-mail suporte@artmatch.com, pelo chat disponível no canto inferior direito da tela, ou através do formulário de contato na seção 'Fale Conosco'. Nossa equipe está disponível de segunda a sexta, das 9h às 18h, e responderá sua solicitação em até 24 horas úteis.",
      categoria: "Suporte",
      avaliacoes: { util: 18, naoUtil: 1 }
    },
    {
      id: "pagamento",
      pergunta: "Quais são as formas de pagamento aceitas?",
      resposta: "Aceitamos diversas formas de pagamento, incluindo cartões de crédito (Visa, Mastercard, American Express), boleto bancário, PIX e transferência bancária. Para editais internacionais, também aceitamos PayPal. As opções disponíveis serão exibidas no momento do pagamento da taxa de inscrição do edital.",
      categoria: "Pagamentos",
      avaliacoes: { util: 31, naoUtil: 4 }
    },
    {
      id: "inscricao",
      pergunta: "Como acompanhar o status da minha inscrição?",
      resposta: "Para acompanhar suas inscrições, acesse a seção 'Minhas Inscrições' no menu lateral. Lá você encontrará todas as suas inscrições com seus respectivos status (Pendente, Em Análise, Aprovada, Rejeitada). Você também receberá notificações por e-mail sempre que houver uma atualização no status da sua inscrição.",
      categoria: "Editais",
      avaliacoes: { util: 53, naoUtil: 0 }
    },
    {
      id: "portfolio",
      pergunta: "Como adicionar obras ao meu portfólio?",
      resposta: "Para adicionar obras ao seu portfólio, acesse 'Meu Perfil' e depois a aba 'Portfólio'. Clique em 'Adicionar Obra' e preencha as informações solicitadas, como título, descrição, ano, técnica e imagens. Você pode adicionar até 5 imagens por obra. Recomendamos usar imagens de alta qualidade com tamanho máximo de 5MB cada.",
      categoria: "Perfil",
      avaliacoes: { util: 39, naoUtil: 2 }
    },
    {
      id: "notificacoes",
      pergunta: "Como configurar minhas notificações?",
      resposta: "Para configurar suas notificações, acesse 'Configurações' no menu lateral e depois a aba 'Notificações'. Lá você pode escolher quais tipos de notificações deseja receber (e-mail, aplicativo ou ambos) e para quais eventos (novos editais, atualizações de inscrições, mensagens, etc.).",
      categoria: "Configurações",
      avaliacoes: { util: 27, naoUtil: 3 }
    }
  ]);
  
  // Função para avaliar uma resposta
  const avaliarResposta = (id: string, util: boolean) => {
    setFaqs(faqs.map(faq => {
      if (faq.id === id) {
        return {
          ...faq,
          avaliacoes: {
            util: util ? (faq.avaliacoes?.util || 0) + 1 : faq.avaliacoes?.util || 0,
            naoUtil: !util ? (faq.avaliacoes?.naoUtil || 0) + 1 : faq.avaliacoes?.naoUtil || 0
          }
        };
      }
      return faq;
    }));
    
    toast({
      title: util ? "Obrigado pelo feedback positivo!" : "Agradecemos seu feedback",
      description: util 
        ? "Ficamos felizes que a resposta foi útil para você." 
        : "Vamos trabalhar para melhorar nossas respostas.",
      duration: 3000
    });
  };
  
  // Agrupar FAQs por categoria
  const categorias = Array.from(new Set(faqs.map(faq => faq.categoria)));
  
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="flex items-center mb-6">
          <HelpCircle className="text-primary-600 mr-2" size={32} />
          <h1 className="text-3xl font-bold">Ajuda e Suporte</h1>
        </div>
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
          Encontre respostas para dúvidas frequentes ou entre em contato com nosso suporte.
        </p>
        
        {/* Barra de pesquisa */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Pesquisar perguntas..."
            className="w-full px-4 py-3 pl-10 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        {/* Perguntas Frequentes por categoria */}
        <div className="mb-8 space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Perguntas Frequentes</h2>
          
          {categorias.map((categoria) => (
            <div key={categoria} className="mb-6">
              <h3 className="text-xl font-medium mb-3 text-primary-700 dark:text-primary-400 border-b pb-2 border-slate-200 dark:border-slate-700">
                {categoria}
              </h3>
              
              <Accordion type="single" collapsible className="space-y-4">
                {faqs
                  .filter(faq => faq.categoria === categoria)
                  .map(faq => (
                    <Card key={faq.id} className="overflow-hidden border border-slate-200 dark:border-slate-700">
                      <AccordionItem value={faq.id} className="border-none">
                        <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left font-medium">
                          {faq.pergunta}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2">
                          <div className="text-slate-700 dark:text-slate-300 mb-4">
                            {faq.resposta}
                          </div>
                          
                          {/* Sistema de avaliação */}
                          <div className="mt-4 border-t pt-4 border-slate-100 dark:border-slate-700">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-slate-500 dark:text-slate-400">Esta resposta foi útil?</p>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center gap-1 text-sm" 
                                  onClick={() => avaliarResposta(faq.id, true)}
                                >
                                  <ThumbsUp className="h-4 w-4" /> 
                                  Sim
                                  {faq.avaliacoes?.util ? <span className="ml-1 text-xs text-slate-500">({faq.avaliacoes.util})</span> : null}
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center gap-1 text-sm" 
                                  onClick={() => avaliarResposta(faq.id, false)}
                                >
                                  <ThumbsDown className="h-4 w-4" /> 
                                  Não
                                  {faq.avaliacoes?.naoUtil ? <span className="ml-1 text-xs text-slate-500">({faq.avaliacoes.naoUtil})</span> : null}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                  ))}
              </Accordion>
            </div>
          ))}
        </div>
        
        {/* Fale conosco */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-3">Não encontrou o que procurava?</h2>
          <p className="mb-4 text-slate-700 dark:text-slate-300">Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida ou problema.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="mailto:suporte@artmatch.com" 
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Enviar e-mail
            </a>
            <Button variant="outline" className="inline-flex items-center justify-center gap-2">
              Iniciar chat de suporte
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Ajuda;
