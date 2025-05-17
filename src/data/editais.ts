// Dados de exemplo para editais
export const editais = [
  {
    id: 1,
    titulo: "Festival Internacional de Artes Visuais",
    organizador: "Secretaria Municipal de Cultura",
    imagemCapa: "https://picsum.photos/1200/600?random=1",
    regiaoTema: "Nordeste",
    elementosCulturais: ["Maracatu", "Frevo", "Xilogravura", "Literatura de Cordel"],
    descricao: "O Festival Internacional de Artes Visuais é um evento anual que busca promover e valorizar a produção artística contemporânea, proporcionando um espaço de intercâmbio entre artistas nacionais e internacionais. O festival conta com exposições, workshops, palestras e premiações para os destaques.",
    local: "Recife, PE",
    prazo: "30/06/2025",
    dataEvento: "15/08/2025 a 30/09/2025",
    compatibilidade: 95,
    categoria: "Artes Visuais",
    valor: "R$ 15.000,00",
    vagas: 20,
    inscricoes: 8,
    requisitos: [
      "Ser artista visual com pelo menos 2 anos de experiência",
      "Possuir portfólio com no mínimo 5 obras",
      "Disponibilidade para participar presencialmente do evento",
      "Obra inédita ou produzida nos últimos 3 anos"
    ],
    etapas: [
      { nome: "Inscrição online", data: "Até 30/06/2025", status: "atual" },
      { nome: "Análise de portfólio", data: "01/07/2025 a 15/07/2025", status: "pendente" },
      { nome: "Entrevista (se selecionado)", data: "20/07/2025 a 25/07/2025", status: "pendente" },
      { nome: "Resultado final", data: "01/08/2025", status: "pendente" },
      { nome: "Montagem da exposição", data: "10/08/2025 a 14/08/2025", status: "pendente" }
    ],
    documentos: [
      { nome: "Portfólio digital", obrigatorio: true },
      { nome: "Currículo artístico", obrigatorio: true },
      { nome: "Proposta da obra", obrigatorio: true },
      { nome: "Documento de identidade", obrigatorio: true },
      { nome: "Comprovante de residência", obrigatorio: true },
      { nome: "Carta de recomendação", obrigatorio: false }
    ],
    criterios: [
      { nome: "Originalidade", peso: 30 },
      { nome: "Técnica", peso: 25 },
      { nome: "Adequação à temática", peso: 20 },
      { nome: "Trajetória do artista", peso: 15 },
      { nome: "Viabilidade de execução", peso: 10 }
    ]
  },
  {
    id: 2,
    titulo: "Festival de Artes Amazônicas",
    organizador: "Fundação Cultural do Pará",
    imagemCapa: "https://picsum.photos/1200/600?random=2",
    regiaoTema: "Norte",
    elementosCulturais: ["Carimbó", "Cerâmica Marajoara", "Artesanato Indígena", "Boi-Bumbá"],
    descricao: "O Festival de Artes Amazônicas celebra a rica tradição cultural da região Norte, destacando manifestações artísticas tradicionais e contemporâneas inspiradas na cultura amazônica. O evento busca valorizar artistas locais e promover intercâmbio cultural.",
    local: "Belém, PA",
    prazo: "15/07/2025",
    dataEvento: "10/09/2025 a 20/10/2025",
    compatibilidade: 88,
    categoria: "Artes Integradas",
    valor: "R$ 12.000,00",
    vagas: 15,
    inscricoes: 5,
    requisitos: [
      "Artistas com trabalhos relacionados à temática amazônica",
      "Portfólio com obras que dialoguem com a cultura regional",
      "Disponibilidade para participar de oficinas e apresentações",
      "Preferência para artistas da região Norte"
    ],
    etapas: [
      { nome: "Inscrição online", data: "Até 15/07/2025", status: "atual" },
      { nome: "Curadoria e seleção", data: "16/07/2025 a 10/08/2025", status: "pendente" },
      { nome: "Divulgação dos selecionados", data: "15/08/2025", status: "pendente" },
      { nome: "Montagem e ensaios", data: "01/09/2025 a 09/09/2025", status: "pendente" }
    ],
    documentos: [
      { nome: "Portfólio digital", obrigatorio: true },
      { nome: "Memorial descritivo da obra", obrigatorio: true },
      { nome: "Documentação pessoal", obrigatorio: true },
      { nome: "Comprovante de residência", obrigatorio: true },
      { nome: "Declaração de autoria", obrigatorio: true }
    ],
    criterios: [
      { nome: "Relação com a cultura amazônica", peso: 35 },
      { nome: "Originalidade", peso: 25 },
      { nome: "Técnica", peso: 20 },
      { nome: "Trajetória do artista", peso: 10 },
      { nome: "Viabilidade de execução", peso: 10 }
    ]
  },
  {
    id: 3,
    titulo: "Mostra de Arte Sertaneja",
    organizador: "Instituto Cultural do Sertão",
    imagemCapa: "https://picsum.photos/1200/600?random=3",
    regiaoTema: "Nordeste",
    elementosCulturais: ["Repente", "Cordel", "Artesanato em Couro", "Xilogravura"],
    descricao: "A Mostra de Arte Sertaneja é um evento dedicado às expressões artísticas do sertão nordestino, valorizando a cultura, as tradições e a identidade sertaneja através de diversas linguagens artísticas como literatura, música, artes visuais e artesanato.",
    local: "Petrolina, PE",
    prazo: "20/08/2025",
    dataEvento: "15/10/2025 a 30/10/2025",
    compatibilidade: 92,
    categoria: "Artes Integradas",
    valor: "R$ 8.000,00",
    vagas: 25,
    inscricoes: 12,
    requisitos: [
      "Artistas com trabalhos relacionados à cultura sertaneja",
      "Preferência para artistas nascidos ou residentes no sertão nordestino",
      "Disponibilidade para participar de rodas de conversa e oficinas",
      "Obras que dialoguem com as tradições e contemporaneidade sertaneja"
    ],
    etapas: [
      { nome: "Inscrição online", data: "Até 20/08/2025", status: "atual" },
      { nome: "Seleção de propostas", data: "21/08/2025 a 10/09/2025", status: "pendente" },
      { nome: "Divulgação dos selecionados", data: "15/09/2025", status: "pendente" },
      { nome: "Montagem da exposição", data: "10/10/2025 a 14/10/2025", status: "pendente" }
    ],
    documentos: [
      { nome: "Portfólio digital", obrigatorio: true },
      { nome: "Proposta artística", obrigatorio: true },
      { nome: "Documentação pessoal", obrigatorio: true },
      { nome: "Comprovante de residência", obrigatorio: true },
      { nome: "Declaração de vínculo com a cultura sertaneja", obrigatorio: false }
    ],
    criterios: [
      { nome: "Representatividade da cultura sertaneja", peso: 35 },
      { nome: "Originalidade", peso: 25 },
      { nome: "Técnica", peso: 20 },
      { nome: "Trajetória do artista", peso: 10 },
      { nome: "Viabilidade de execução", peso: 10 }
    ]
  }
];

// Função para obter um edital pelo ID
export const getEditalById = (id: number) => {
  return editais.find(edital => edital.id === id) || editais[0];
};
