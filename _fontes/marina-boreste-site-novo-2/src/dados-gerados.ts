/* gerado a partir do site atual (index.html e biografia.html): os mesmos textos e fotos */
import type { Foto, Servico, ItemInfra } from "./tipos";
export const SERVICOS: Servico[] = [
  {
    "id": "garageamento",
    "titulo": "Garageamento",
    "foto": {
      "src": "../imagens/garageamento.jpg",
      "alt": "Lancha em carreta sob a cobertura da garagem náutica",
      "w": 680,
      "h": 680,
      "avif": "../imagens/garageamento-400.avif 400w, ../imagens/garageamento-680.avif 680w",
      "webp": "../imagens/garageamento-400.webp 400w, ../imagens/garageamento-680.webp 680w"
    },
    "texto": [
      "As embarcações são manobradas em suas carretas e guardadas nos galpões em vaga seca, coberta, com piso impermeável."
    ]
  },
  {
    "id": "rampagem",
    "titulo": "Rampagem",
    "foto": {
      "src": "../imagens/rampagem.jpg",
      "alt": "Lancha em carreta descendo a rampa para o Rio Una",
      "w": 680,
      "h": 680,
      "avif": "../imagens/rampagem-400.avif 400w, ../imagens/rampagem-680.avif 680w",
      "webp": "../imagens/rampagem-400.webp 400w, ../imagens/rampagem-680.webp 680w"
    },
    "texto": [
      "A colocação ou retirada da embarcação da água é feita a pedido do proprietário, ou de pessoa por ele autorizada.",
      "As solicitações podem ser feitas diretamente na recepção da Marina Boreste, por telefone e e-mail.",
      "Sempre é respeitada a ordem de chegada dos pedidos.",
      "Este serviço é exclusivo para clientes da Marina."
    ]
  },
  {
    "id": "lavagem",
    "titulo": "Lavagem",
    "foto": {
      "src": "../imagens/lavagem.jpg",
      "alt": "Funcionário da Marina Boreste lavando uma lancha",
      "w": 680,
      "h": 680,
      "avif": "../imagens/lavagem-400.avif 400w, ../imagens/lavagem-680.avif 680w",
      "webp": "../imagens/lavagem-400.webp 400w, ../imagens/lavagem-680.webp 680w"
    },
    "texto": [
      "Sempre que necessário, as embarcações são lavadas por profissionais especializados e treinados.",
      "Neste processo são utilizados produtos biodegradáveis em quantidades adequadas, conforme as orientações do “Projeto Marinas”."
    ]
  },
  {
    "id": "acionamento",
    "titulo": "Acionamento",
    "foto": {
      "src": "../imagens/acionamento.jpg",
      "alt": "Profissional com protetor auricular conferindo uma lancha no seco",
      "w": 680,
      "h": 680,
      "avif": "../imagens/acionamento-400.avif 400w, ../imagens/acionamento-680.avif 680w",
      "webp": "../imagens/acionamento-400.webp 400w, ../imagens/acionamento-680.webp 680w"
    },
    "texto": [
      "Uma vez por semana as embarcações são acionadas no seco por um profissional especialmente treinado para esta função.",
      "O intuito é checar não só o funcionamento do motor, mas também diversos outros itens importantes para uma navegação segura.",
      "O cliente fica sabendo com antecedência caso alguma anomalia seja identificada."
    ]
  },
  {
    "id": "radio",
    "titulo": "Apoio de rádio",
    "foto": {
      "src": "../imagens/apoio-de-radio.jpg",
      "alt": "Rádio VHF da recepção sintonizado no canal 74",
      "w": 680,
      "h": 680,
      "avif": "../imagens/apoio-de-radio-400.avif 400w, ../imagens/apoio-de-radio-680.avif 680w",
      "webp": "../imagens/apoio-de-radio-400.webp 400w, ../imagens/apoio-de-radio-680.webp 680w"
    },
    "texto": [
      "Para maior segurança dos clientes, a Marina Boreste mantém escuta via rádio VHF, canal 74, e também telefones, desde o momento da saída do primeiro navegante para o mar até o retorno do último."
    ]
  },
  {
    "id": "resgate",
    "titulo": "Resgate",
    "foto": {
      "src": "../imagens/resgate.jpg",
      "alt": "Bote inflável em carreta no pátio da marina",
      "w": 680,
      "h": 680,
      "avif": "../imagens/resgate-400.avif 400w, ../imagens/resgate-680.avif 680w",
      "webp": "../imagens/resgate-400.webp 400w, ../imagens/resgate-680.webp 680w"
    },
    "texto": [
      "Em caso de pane no mar, o serviço de resgate poderá ser solicitado sem custos adicionais.",
      "Este serviço é prestado por embarcação especialmente preparada, sujeito a regras de horário, área de cobertura, condições de mar e maré, conforme descrito no Regulamento Interno da Marina Boreste."
    ]
  },
  {
    "id": "bebidas",
    "titulo": "Bebidas e gelo",
    "foto": {
      "src": "../imagens/bebidas-e-gelo.jpg",
      "alt": "Geladeira de bebidas e freezer de gelo",
      "w": 1360,
      "h": 1360,
      "avif": "../imagens/bebidas-e-gelo-400.avif 400w, ../imagens/bebidas-e-gelo-680.avif 680w, ../imagens/bebidas-e-gelo-1360.avif 1360w",
      "webp": "../imagens/bebidas-e-gelo-400.webp 400w, ../imagens/bebidas-e-gelo-680.webp 680w, ../imagens/bebidas-e-gelo-1360.webp 1360w"
    },
    "texto": [
      "Gelo e bebidas, para levar a bordo ou consumir no bar da Marina Boreste, também podem ser adquiridos."
    ]
  },
  {
    "id": "abastecimento",
    "titulo": "Abastecimento",
    "foto": {
      "src": "../imagens/abastecimento.jpg",
      "alt": "Funcionário da marina ao lado de uma lancha em carreta",
      "w": 900,
      "h": 900,
      "avif": "../imagens/abastecimento-400.avif 400w, ../imagens/abastecimento-680.avif 680w, ../imagens/abastecimento-900.avif 900w",
      "webp": "../imagens/abastecimento-400.webp 400w, ../imagens/abastecimento-680.webp 680w, ../imagens/abastecimento-900.webp 900w"
    },
    "texto": [
      "No canal de Barra do Una, a aproximadamente 300 m da Marina Boreste, no sentido de quem navega para o mar, existe um píer de abastecimento aberto ao público, onde se pode adquirir diesel ou gasolina.",
      "Caso o cliente prefira trazer o seu próprio combustível, a Marina Boreste disponibiliza bomba especial para transferência de líquidos, para que abasteça seu barco com total segurança."
    ]
  },
  {
    "id": "seguranca",
    "titulo": "Segurança",
    "foto": {
      "src": "../imagens/seguranca.jpg",
      "alt": "Câmeras de monitoramento na cobertura do galpão",
      "w": 680,
      "h": 680,
      "avif": "../imagens/seguranca-400.avif 400w, ../imagens/seguranca-680.avif 680w",
      "webp": "../imagens/seguranca-400.webp 400w, ../imagens/seguranca-680.webp 680w"
    },
    "texto": [
      "Além de monitoramento 24 horas por sistema de câmeras, vigia noturno e cão de guarda, a Marina Boreste mantém apólice de seguro com cobertura completa para todas as embarcações, enquanto estiverem sob sua responsabilidade."
    ]
  }
];
export const INFRA: ItemInfra[] = [
  {
    "titulo": "Garagem náutica",
    "foto": {
      "src": "../imagens/garageamento.jpg",
      "alt": "Lancha em carreta sob o galpão da garagem náutica",
      "w": 680,
      "h": 680,
      "avif": "../imagens/garageamento-400.avif 400w, ../imagens/garageamento-680.avif 680w",
      "webp": "../imagens/garageamento-400.webp 400w, ../imagens/garageamento-680.webp 680w"
    },
    "texto": [
      "Com 3.000 m² de área, os galpões da Marina Boreste foram projetados visando a máxima proteção das embarcações.",
      "Pisos impermeáveis, canaletas e caixas separadoras de água e óleo devidamente instaladas mantêm a Marina Boreste dentro dos padrões do “Projeto Marinas” e em conformidade com as regulamentações da CETESB.",
      "Guarda embarcações de até 10 toneladas, entre jets, infláveis e lanchas, sem a necessidade de empilhamento."
    ]
  },
  {
    "titulo": "Amplo píer",
    "foto": {
      "src": "../imagens/pier.jpg",
      "alt": "Lanchas atracadas no píer flutuante, com a Mata Atlântica ao fundo",
      "w": 680,
      "h": 680,
      "avif": "../imagens/pier-400.avif 400w, ../imagens/pier-680.avif 680w",
      "webp": "../imagens/pier-400.webp 400w, ../imagens/pier-680.webp 680w"
    },
    "texto": [
      "Amplo píer de atracação, com área exclusiva para embarque e desembarque, situado nas águas abrigadas e praticamente doces do Rio Una.",
      "Capacidade para atender aos clientes que, com o intuito de agilizar a saída no dia seguinte, prefiram o pernoite da embarcação na água com total segurança."
    ]
  },
  {
    "titulo": "Rampa",
    "foto": {
      "src": "../imagens/rampagem.jpg",
      "alt": "Lancha em carreta na rampa de acesso ao Rio Una",
      "w": 680,
      "h": 680,
      "avif": "../imagens/rampagem-400.avif 400w, ../imagens/rampagem-680.avif 680w",
      "webp": "../imagens/rampagem-400.webp 400w, ../imagens/rampagem-680.webp 680w"
    },
    "texto": [
      "A colocação e a retirada das embarcações são feitas pela rampa de acesso.",
      "Dois sistemas distintos estão disponíveis para garantir maior segurança e risco zero de interrupção nas operações.",
      "A Marina Boreste dispõe de tratores que podem trabalhar simultaneamente, agilizando a operação."
    ]
  },
  {
    "titulo": "Recepção e conveniência",
    "foto": {
      "src": "../imagens/recepcao.jpg",
      "alt": "Recepção da Marina Boreste, com balcão de atendimento e mapa da região",
      "w": 680,
      "h": 680,
      "avif": "../imagens/recepcao-400.avif 400w, ../imagens/recepcao-680.avif 680w",
      "webp": "../imagens/recepcao-400.webp 400w, ../imagens/recepcao-680.webp 680w"
    },
    "texto": [
      "A entrada da Marina conta com um balcão de atendimento com rádio, TV e acesso ao EasyMarine, por onde acompanhamos todos os processos em tempo real.",
      "Além da área de atendimento, é possível conferir o mapa da região, verificar as condições de navegação atualizadas semanalmente e adquirir bebidas geladas e gelo para o seu passeio."
    ]
  },
  {
    "titulo": "Lazer e conforto",
    "foto": {
      "src": "../imagens/lazer.jpg",
      "alt": "Deck de acesso ao Rio Una, com a garagem náutica ao fundo",
      "w": 1360,
      "h": 1360,
      "avif": "../imagens/lazer-400.avif 400w, ../imagens/lazer-680.avif 680w, ../imagens/lazer-1360.avif 1360w",
      "webp": "../imagens/lazer-400.webp 400w, ../imagens/lazer-680.webp 680w, ../imagens/lazer-1360.webp 1360w"
    },
    "texto": [
      "Uma agradável área junto às margens do Rio Una, reservada para o conforto e o lazer dos navegantes e de sua família.",
      "Sentado no bar à beira da piscina, é possível relaxar curtindo a linda vista do rio e da Mata Atlântica, sem deixar de navegar pela internet com o Wi-Fi disponível."
    ]
  },
  {
    "titulo": "Oficina e maquinário",
    "foto": {
      "src": "../imagens/oficina.jpg",
      "alt": "Painel de ferramentas da oficina",
      "w": 680,
      "h": 680,
      "avif": "../imagens/oficina-400.avif 400w, ../imagens/oficina-680.avif 680w",
      "webp": "../imagens/oficina-400.webp 400w, ../imagens/oficina-680.webp 680w"
    },
    "texto": [
      "Espaço destinado a reparos de embarcações, equipado com diversas ferramentas: talha, compressor, carregador de baterias, bomba de combustível, macacos hidráulicos, lavadora de alta pressão etc."
    ]
  }
];
export const FOTOS: Record<string, Foto> = {
  "barraDoUna": {
    "src": "../imagens/barra-do-una.jpg",
    "alt": "Vista aérea de Barra do Una: o Rio Una chegando ao mar, com a praia e a Mata Atlântica",
    "w": 840,
    "h": 900,
    "avif": "../imagens/barra-do-una-420.avif 420w, ../imagens/barra-do-una-840.avif 840w",
    "webp": "../imagens/barra-do-una-420.webp 420w, ../imagens/barra-do-una-840.webp 840w"
  },
  "banda": {
    "src": "../imagens/pier-garagem-nautica.jpg",
    "alt": "Lanchas atracadas em frente à garagem náutica da Marina Boreste, no Rio Una",
    "w": 1920,
    "h": 960,
    "avif": "../imagens/pier-garagem-nautica-640.avif 640w, ../imagens/pier-garagem-nautica-960.avif 960w, ../imagens/pier-garagem-nautica-1280.avif 1280w, ../imagens/pier-garagem-nautica-1920.avif 1920w",
    "webp": "../imagens/pier-garagem-nautica-640.webp 640w, ../imagens/pier-garagem-nautica-960.webp 960w, ../imagens/pier-garagem-nautica-1280.webp 1280w, ../imagens/pier-garagem-nautica-1920.webp 1920w"
  },
  "pousadaAerea": {
    "src": "../imagens/pousada-una-aerea.jpg",
    "alt": "Vista aérea da Pousada Una, com piscina e deck à beira do Rio Una; ao fundo, as lanchas da Marina Boreste",
    "w": 1320,
    "h": 780,
    "avif": "../imagens/pousada-una-aerea-660.avif 660w, ../imagens/pousada-una-aerea-1320.avif 1320w",
    "webp": "../imagens/pousada-una-aerea-660.webp 660w, ../imagens/pousada-una-aerea-1320.webp 1320w"
  },
  "pousadaPiscina": {
    "src": "../imagens/pousada-una-piscina.jpg",
    "alt": "Piscina da Pousada Una, cercada por palmeiras e primaveras em flor",
    "w": 1260,
    "h": 840,
    "avif": "../imagens/pousada-una-piscina-420.avif 420w, ../imagens/pousada-una-piscina-630.avif 630w, ../imagens/pousada-una-piscina-1260.avif 1260w",
    "webp": "../imagens/pousada-una-piscina-420.webp 420w, ../imagens/pousada-una-piscina-630.webp 630w, ../imagens/pousada-una-piscina-1260.webp 1260w"
  },
  "mapa": {
    "src": "../imagens/mapa-barra-do-una.jpg",
    "alt": "Vista aérea de Barra do Una com a Praia do Una, a Pousada Una e a Marina Boreste marcadas",
    "w": 800,
    "h": 800,
    "avif": "../imagens/mapa-barra-do-una-400.avif 400w, ../imagens/mapa-barra-do-una-800.avif 800w",
    "webp": "../imagens/mapa-barra-do-una-400.webp 400w, ../imagens/mapa-barra-do-una-800.webp 800w"
  },
  "vistaAerea": {
    "src": "../imagens/marina-vista-aerea.jpg",
    "alt": "Vista aérea da Marina Boreste, entre o Rio Una e o mar",
    "w": 800,
    "h": 800,
    "avif": "../imagens/marina-vista-aerea-400.avif 400w, ../imagens/marina-vista-aerea-800.avif 800w",
    "webp": "../imagens/marina-vista-aerea-400.webp 400w, ../imagens/marina-vista-aerea-800.webp 800w"
  },
  "heroCapa": {
    "src": "../video/marina-boreste-barcos-capa.jpg",
    "alt": "",
    "w": 720,
    "h": 1280,
    "avif": "../video/marina-boreste-barcos-capa-480.avif 480w, ../video/marina-boreste-barcos-capa-720.avif 720w",
    "webp": "../video/marina-boreste-barcos-capa-480.webp 480w, ../video/marina-boreste-barcos-capa-720.webp 720w"
  }
};
