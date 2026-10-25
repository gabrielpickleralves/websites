# Inventário de conteúdo: Marina Boreste (site atual)

Levantamento de tudo o que o site publicado mostra hoje, para conferir item por item no site novo.

- **Fonte:** branch `gh-pages` (o que o GitHub Pages publica), commit `255d066`. Os arquivos da Marina nessa branch
  (`index.html`, `biografia.html`, `compra-e-venda.html`, `embarcacao.html`, `dados/barcos.js`, `site.webmanifest`)
  são idênticos aos desta branch.
- **Endereço:** https://gabrielpickleralves.github.io/websites/ (o acesso direto ao github.io está bloqueado neste
  ambiente; por isso o levantamento foi feito nos arquivos publicados).
- **Fora do inventário:** `/novo/`, `/marina-boreste-site-novo-2/` e `/embarcacoes-novo/` são versões de teste
  anteriores (não são linkadas pelo site atual); `/tehura-pickler/` é outro site.
- **Como usar:** cada `[ ]` vira `[x]` quando o item estiver no site novo (etapa 3).
- **Conferido no site novo (/novo/):** 144 itens marcados. Um script abriu as quatro páginas do site atual e do novo
  (com o JavaScript rodando, inclusive a página do barco e a de barco não encontrado) e comparou cada texto, `alt`,
  `aria-label`, link, título e descrição: tudo do site atual está no novo, menos as instruções do carrossel antigo
  (explicadas na seção Serviços). Outro script conferiu que todas as fotos e o vídeo do site atual aparecem no novo
  (as fotos em versão tratada, em `novo/img/`).
- **Conferência:** um script comparou cada texto visível, `alt` e link das quatro páginas com esta lista. Só ficaram
  de fora os rótulos para leitor de tela ("abre em nova aba", "Ampliar foto: …", "Detalhes de …", "Serviço anterior"
  etc.), as URLs canônicas e os links de fonte. Eles continuam no site novo como parte da acessibilidade.

---

## 1. Páginas

| Página | Arquivo | Título (`<title>`) |
|---|---|---|
| Início | `index.html` | Marina Boreste \| Barra do Una, São Sebastião (SP) |
| Biografia | `biografia.html` | Biografia \| Marina Boreste |
| Embarcações à venda | `compra-e-venda.html` | Embarcações à venda \| Marina Boreste |
| Página de cada barco | `embarcacao.html?barco=<chave>` | Embarcação à venda \| Marina Boreste (vira "<nome> \| Embarcações à venda \| Marina Boreste") |
| Dados dos barcos | `dados/barcos.js` | (lista que alimenta as duas páginas acima) |

---

## 2. Contatos e dados da empresa (consolidado)

- [x] **WhatsApp / celular:** (12) 99729-2082 · `https://wa.me/5512997292082` · `tel:+5512997292082`
- [x] **Telefone/fax:** (12) 3867-1550 · `tel:+551238671550`
- [x] **E-mail de atendimento:** atendimento@boreste.com.br
- [x] **E-mail geral:** boreste@boreste.com.br
- [x] **Endereço:** Rua Petrópolis, 215, Barra do Una, São Sebastião (SP), CEP 11624-179
- [x] **Horário:** Segunda a domingo, das 8h às 17h
- [x] **Rádio:** VHF canal 74, da primeira saída ao último retorno
- [x] **Coordenadas (vindo do mar):** 23°45'29.0"S 45°45'40.2"W · -23.758062, -45.761177
- [x] **Instagram:** @marinaboreste · https://www.instagram.com/marinaboreste/
- [x] **Google Maps (busca):** https://www.google.com/maps/search/?api=1&query=Marina%20Boreste%2C%20Barra%20do%20Una%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP&query_place_id=ChIJS2xwpZCIzZQRFnlkunPgOQ8
- [x] **Google Maps (traçar rota):** https://www.google.com/maps/dir/?api=1&destination=Marina%20Boreste%2C%20Barra%20do%20Una%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP&destination_place_id=ChIJS2xwpZCIzZQRFnlkunPgOQ8
- [x] **Mapa embutido** (o Google Maps não abre neste ambiente de testes; o iframe é o mesmo): `https://maps.google.com/maps?q=Marina%20Boreste%2C%20Barra%20do%20Una%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP&z=16&output=embed` (título "Marina Boreste no Google Maps")

**Pousada Una (parceira)**

- [x] Endereço: Rua Petrópolis, 80, Barra do Una, São Sebastião (SP), CEP 11624-179
- [x] Reservas: (12) 3867-1515 · `tel:+551238671515`
- [x] Site: pousadauna.com.br · https://pousadauna.com.br/
- [x] Instagram: @pousadauna · https://www.instagram.com/pousadauna/
- [x] Facebook: https://www.facebook.com/pousadauna/
- [x] WhatsApp: https://pousadauna.com.br/whatsapp
- [x] Google Maps: https://www.google.com/maps/search/?api=1&query=Pousada%20Una%2C%20Rua%20Petr%C3%B3polis%2C%2080%2C%20Barra%20do%20Una%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP&query_place_id=ChIJ14_vbpqIzZQRNGed2SGEBd8

**Mensagens prontas do WhatsApp (texto exato)**

- [x] Contato › Embarcações à venda: "Olá! Gostaria de saber se há embarcações à venda na Marina Boreste."
- [x] Sem barcos anunciados: "Olá! Quero saber das próximas oportunidades de barcos à venda na Marina Boreste."
- [x] Cada barco: "Olá! Tenho interesse no barco {nome}, anunciado no site da Marina Boreste."
- [x] Formulário: "Olá! Meu nome é {nome} ({e-mail}).⏎Assunto: {assunto}⏎⏎{mensagem}"
- [x] Formulário por e-mail: `mailto:atendimento@boreste.com.br`, assunto "Site: {assunto}", corpo igual ao do WhatsApp

---

## 3. Elementos comuns a todas as páginas

**Topo**
- [x] Logotipo Marina Boreste (versão negativa sobre fundo escuro e versão normal sobre fundo claro), leva ao início
- [x] Botão "Biografia" → biografia.html
- [x] Botão "Embarcações à venda" → compra-e-venda.html
- [x] Botão "WhatsApp" → wa.me/5512997292082
- [x] Botão "Menu"
- [x] Link de acessibilidade "Pular para o conteúdo"

**Menu (janela)**
- [x] Logotipo + botão "Fechar"
- [x] Destaques: Biografia · Embarcações à venda
- [x] Seções: Serviços · Infraestrutura · Pousada Una · Localização · Vamos conversar?
- [x] Instagram @marinaboreste · WhatsApp
- [x] "Segunda a domingo, das 8h às 17h" · (12) 99729-2082 · atendimento@boreste.com.br

**Rodapé**
- [x] Logotipo (negativo)
- [x] "Infraestrutura e serviços para a guarda, manutenção, compra e venda de embarcações, sempre em harmonia com o meio ambiente."
- [x] Coluna "A marina": Serviços · Infraestrutura · Biografia · Localização · Vamos conversar?
- [x] Coluna "Marina Boreste": Rua Petrópolis, 215, Barra do Una / São Sebastião (SP), CEP 11624-179 (Maps) · (12) 3867-1550 · (12) 99729-2082 · boreste@boreste.com.br · ícones Instagram e WhatsApp
- [x] Coluna "Pousada Una": Rua Petrópolis, 80, Barra do Una / São Sebastião (SP) (Maps) · (12) 3867-1515 · pousadauna.com.br · ícones Instagram e Facebook
- [x] "© 2026 Marina Boreste. Todos os direitos reservados."
- [x] "Segunda a domingo, das 8h às 17h"
- [x] "Voltar ao topo"

**Outros**
- [x] Botão flutuante "Voltar ao topo"
- [x] Cortina de abertura com o logotipo (animação de entrada) — no novo, a entrada é o próprio logotipo se montando no topo (uma vez por visita), e a troca de página tem transição
- [x] Botão "Pausar" / "Retomar" (vídeo e animações)
- [x] Foto ampliada (galeria): "Foto N de M", "Fechar", "Foto anterior", "Próxima foto", legenda = descrição da foto
- [x] Favicon (`favicon.ico`, `favicon.svg`), `apple-touch-icon.png`, `site.webmanifest` (nome "Marina Boreste", curto "Boreste", cor do tema #0F2A33)

---

## 4. Início (`index.html`)

**SEO**
- [x] Descrição: "Marina Boreste: guarda, manutenção, compra e venda de embarcações, com mais de 40 anos de experiência nas águas de Barra do Una, litoral norte de São Paulo."
- [x] Open Graph: título igual ao `<title>`; descrição "Guarda, manutenção, compra e venda de embarcações, com mais de 40 anos de experiência nas águas de Barra do Una, litoral norte de São Paulo."; imagem `imagens/marina-boreste-compartilhamento.jpg` (1200×630, alt "Logotipo da Marina Boreste sobre a foto do píer, com lanchas atracadas no Rio Una"); `twitter:card` summary_large_image; canonical
- [x] Dados estruturados (JSON-LD `LocalBusiness`): nome, descrição, url, imagem, logo (`icone-512.png`), telefone +55 12 3867-1550, e-mail atendimento@, endereço completo, geo (-23.758062, -45.761177), hasMap, horário seg–dom 08:00–17:00, contato +55 12 99729-2082, sameAs Instagram

**Abertura (hero)**
- [x] Vídeo dos barcos (`video/marina-boreste-barcos.webm` / `-leve.mp4`, 720×1280, 6,8 s) com capa `video/marina-boreste-barcos-capa*.{avif,webp,jpg}`
- [x] Título "Marina Boreste"
- [x] "Sua embarcação com amantes da navegação. Barra do Una, litoral norte de São Paulo."
- [x] "Role para conhecer"

**Faixa de dados**
- [x] Endereço: Rua Petrópolis, 215 / Barra do Una, São Sebastião (SP) (Maps)
- [x] Horário: Segunda a domingo / das 8h às 17h
- [x] Telefone e WhatsApp: (12) 99729-2082 · "Chamar no WhatsApp"
- [x] Rádio: VHF canal 74 / da primeira saída ao último retorno

**Sobre**
- [x] Título: "Mais de 40 anos nas águas de Barra do Una"
- [x] "Com a Marina Boreste você navega tranquilo em uma das mais belas regiões do litoral paulista. Conte com a estrutura e o apoio de quem tem mais de 40 anos de experiência nas águas de Barra do Una."
- [x] Foto `barra-do-una` — alt "Vista aérea de Barra do Una: o Rio Una chegando ao mar, com a praia e a Mata Atlântica"; legenda "Barra do Una, onde o Rio Una encontra o mar."

**Serviços** — "Tudo o que a sua embarcação precisa em terra e no mar. Toque no + de cada cartão para ler os detalhes."
(dicas: "Role para passar pelos serviços" / "Deslize para o lado para ver os serviços"; contador "1 / 9"; timão de madeira decorativo `timao-de-madeira-*`)

> **No novo:** o carrossel com o "+" virou uma lista com todo o texto de cada serviço visível e a foto ao lado, então a instrução "Toque no + de cada cartão para ler os detalhes.", as dicas de rolar/deslizar, o contador "1 / 9" e os botões "Serviço anterior"/"Próximo serviço" saíram (eram instruções da interface antiga, não informação). O timão de madeira está no menu.

- [x] **Garageamento** (`garageamento`, alt "Lancha em carreta sob a cobertura da garagem náutica"): "As embarcações são manobradas em suas carretas e guardadas nos galpões em vaga seca, coberta, com piso impermeável."
- [x] **Rampagem** (`rampagem`, alt "Lancha em carreta descendo a rampa para o Rio Una"): "A colocação ou retirada da embarcação da água é feita a pedido do proprietário, ou de pessoa por ele autorizada." / "As solicitações podem ser feitas diretamente na recepção da Marina Boreste, por telefone e e-mail." / "Sempre é respeitada a ordem de chegada dos pedidos." / "Este serviço é exclusivo para clientes da Marina."
- [x] **Lavagem** (`lavagem`, alt "Funcionário da Marina Boreste lavando uma lancha"): "Sempre que necessário, as embarcações são lavadas por profissionais especializados e treinados." / "Neste processo são utilizados produtos biodegradáveis em quantidades adequadas, conforme as orientações do “Projeto Marinas”."
- [x] **Acionamento** (`acionamento`, alt "Profissional com protetor auricular conferindo uma lancha no seco"): "Uma vez por semana as embarcações são acionadas no seco por um profissional especialmente treinado para esta função." / "O intuito é checar não só o funcionamento do motor, mas também diversos outros itens importantes para uma navegação segura." / "O cliente fica sabendo com antecedência caso alguma anomalia seja identificada."
- [x] **Apoio de rádio** (`apoio-de-radio`, alt "Rádio VHF da recepção sintonizado no canal 74"): "Para maior segurança dos clientes, a Marina Boreste mantém escuta via rádio VHF, canal 74, e também telefones, desde o momento da saída do primeiro navegante para o mar até o retorno do último."
- [x] **Resgate** (`resgate`, alt "Bote inflável em carreta no pátio da marina"): "Em caso de pane no mar, o serviço de resgate poderá ser solicitado sem custos adicionais." / "Este serviço é prestado por embarcação especialmente preparada, sujeito a regras de horário, área de cobertura, condições de mar e maré, conforme descrito no Regulamento Interno da Marina Boreste."
- [x] **Bebidas e gelo** (`bebidas-e-gelo`, alt "Geladeira de bebidas e freezer de gelo"): "Gelo e bebidas, para levar a bordo ou consumir no bar da Marina Boreste, também podem ser adquiridos."
- [x] **Abastecimento** (`abastecimento`, alt "Funcionário da marina ao lado de uma lancha em carreta"): "No canal de Barra do Una, a aproximadamente 300 m da Marina Boreste, no sentido de quem navega para o mar, existe um píer de abastecimento aberto ao público, onde se pode adquirir diesel ou gasolina." / "Caso o cliente prefira trazer o seu próprio combustível, a Marina Boreste disponibiliza bomba especial para transferência de líquidos, para que abasteça seu barco com total segurança."
- [x] **Segurança** (`seguranca`, alt "Câmeras de monitoramento na cobertura do galpão"): "Além de monitoramento 24 horas por sistema de câmeras, vigia noturno e cão de guarda, a Marina Boreste mantém apólice de seguro com cobertura completa para todas as embarcações, enquanto estiverem sob sua responsabilidade."

**Infraestrutura** — "Galpões, píer, rampa, oficina e uma área de lazer à beira do Rio Una, dentro dos padrões do “Projeto Marinas” e das regulamentações da CETESB."

- [x] **Garagem náutica** (`garageamento`, alt "Lancha em carreta sob o galpão da garagem náutica"): "Com 3.000 m² de área, os galpões da Marina Boreste foram projetados visando a máxima proteção das embarcações." / "Pisos impermeáveis, canaletas e caixas separadoras de água e óleo devidamente instaladas mantêm a Marina Boreste dentro dos padrões do “Projeto Marinas” e em conformidade com as regulamentações da CETESB." / "Guarda embarcações de até 10 toneladas, entre jets, infláveis e lanchas, sem a necessidade de empilhamento."
- [x] **Amplo píer** (`pier`, alt "Lanchas atracadas no píer flutuante, com a Mata Atlântica ao fundo"): "Amplo píer de atracação, com área exclusiva para embarque e desembarque, situado nas águas abrigadas e praticamente doces do Rio Una." / "Capacidade para atender aos clientes que, com o intuito de agilizar a saída no dia seguinte, prefiram o pernoite da embarcação na água com total segurança."
- [x] **Rampa** (`rampagem`, alt "Lancha em carreta na rampa de acesso ao Rio Una"): "A colocação e a retirada das embarcações são feitas pela rampa de acesso." / "Dois sistemas distintos estão disponíveis para garantir maior segurança e risco zero de interrupção nas operações." / "A Marina Boreste dispõe de tratores que podem trabalhar simultaneamente, agilizando a operação."
- [x] **Recepção e conveniência** (`recepcao`, alt "Recepção da Marina Boreste, com balcão de atendimento e mapa da região"): "A entrada da Marina conta com um balcão de atendimento com rádio, TV e acesso ao EasyMarine, por onde acompanhamos todos os processos em tempo real." / "Além da área de atendimento, é possível conferir o mapa da região, verificar as condições de navegação atualizadas semanalmente e adquirir bebidas geladas e gelo para o seu passeio."
- [x] **Lazer e conforto** (`lazer`, alt "Deck de acesso ao Rio Una, com a garagem náutica ao fundo"): "Uma agradável área junto às margens do Rio Una, reservada para o conforto e o lazer dos navegantes e de sua família." / "Sentado no bar à beira da piscina, é possível relaxar curtindo a linda vista do rio e da Mata Atlântica, sem deixar de navegar pela internet com o Wi-Fi disponível."
- [x] **Oficina e maquinário** (`oficina`, alt "Painel de ferramentas da oficina"): "Espaço destinado a reparos de embarcações, equipado com diversas ferramentas: talha, compressor, carregador de baterias, bomba de combustível, macacos hidráulicos, lavadora de alta pressão etc."

**Foto larga do píer**
- [x] `pier-garagem-nautica` (1920×960) — alt "Lanchas atracadas em frente à garagem náutica da Marina Boreste, no Rio Una"

**Pousada Una**
- [x] Foto `pousada-una-aerea` — alt "Vista aérea da Pousada Una, com piscina e deck à beira do Rio Una; ao fundo, as lanchas da Marina Boreste"
- [x] Foto `pousada-una-piscina` — alt "Piscina da Pousada Una, cercada por palmeiras e primaveras em flor"
- [x] "Parceira da marina e parte do mesmo empreendimento, a Pousada Una fica a 50 metros daqui, na mesma rua."
- [x] "Pousada e restaurante à beira do Rio Una, com acomodações confortáveis, piscina, deck voltado para o rio, jardim arborizado e píer para embarcações."
- [x] "Clientes da Marina Boreste têm benefícios exclusivos na hospedagem e acesso ao restaurante da pousada, uma boa pedida para o almoço depois do passeio de barco."
- [x] Endereço / Reservas / Site / Instagram / Facebook / WhatsApp da pousada (ver seção 2)

**Faixa que corre (decorativa)**
- [x] Rio Una · Barra do Una · Bertioga · Ilhabela · Litoral norte de São Paulo

**Localização**
- [x] "Localizada em Barra do Una, no litoral norte do estado de São Paulo, estamos entre o Rio Una e o mar."
- [x] "A Marina Boreste proporciona acesso facilitado às diversas ilhas da região entre Bertioga e Ilhabela."
- [x] "Vindo de São Paulo e região": Rodovia dos Imigrantes · Mogi-Bertioga · Rodovia dos Tamoios
- [x] "Dica: conheça a Rota 55 do litoral paulista e seus encantos."
- [x] "Vindo do mar": coordenadas + botão "Copiar coordenadas" (respostas: "Coordenadas copiadas" / "Selecione e copie o texto ao lado"; aviso "Coordenadas copiadas: …" / "Não foi possível copiar. As coordenadas estão selecionadas ao lado; use o comando de copiar.")
- [x] "Nosso endereço": Rua Petrópolis, 215, Barra do Una / São Sebastião (SP), CEP 11624-179 (Maps)
- [x] Foto `mapa-barra-do-una` — alt "Vista aérea de Barra do Una com a Praia do Una, a Pousada Una e a Marina Boreste marcadas"
- [x] Mapa do Google embutido + botões "Abrir no Google Maps" e "Traçar rota"

**Vamos conversar? (contato)**
- [x] WhatsApp (12) 99729-2082
- [x] Telefone/fax (12) 3867-1550
- [x] Embarcações à venda: "Pergunte à nossa atendente se há embarcações à venda." + "Perguntar pelo WhatsApp"
- [x] E-mail: atendimento@boreste.com.br · boreste@boreste.com.br
- [x] Redes: Instagram @marinaboreste · WhatsApp · Instagram @pousadauna
- [x] Formulário — "Todos os campos são obrigatórios."; campos "Seu nome", "Seu e-mail", "Assunto", "Mensagem"
- [x] Assuntos: Selecione o assunto · Valores e serviços · Compra de embarcação · Sugestões e reclamações · Benefício Pousada do Una (hospedagem e restaurante) · Outros assuntos
- [x] Botões "Enviar pelo WhatsApp" e "Enviar por e-mail"
- [x] "A mensagem abre pronta no seu WhatsApp ou no seu programa de e-mail; é só confirmar o envio."
- [x] Erros: "Escreva o seu nome." · "Escreva o seu e-mail." · "Confira o e-mail. Ele precisa ter o formato nome@exemplo.com.br." · "Selecione o assunto." · "Escreva a sua mensagem."
- [x] Avisos: "A mensagem ainda não foi enviada: falta corrigir 1 campo." / "… falta corrigir N campos." · "Abrimos o WhatsApp em uma nova aba com a mensagem pronta. É só confirmar o envio." · "Abrimos o seu programa de e-mail com a mensagem pronta. É só confirmar o envio."

---

## 5. Biografia (`biografia.html`)

- [x] SEO: descrição e og:description = o texto da Missão; og:image de compartilhamento; canonical
- [x] Botão "Voltar ao início" (no alto e no fim)
- [x] Título "Nossa história"
- [x] Números (com contagem animada): **40+ anos** "de experiência nas águas de Barra do Una" · **3.000 m²** "de galpões na garagem náutica" · **10 t** "por embarcação, sem empilhamento" · **24 h** "de monitoramento por câmeras"
- [x] Foto `marina-vista-aerea` — alt "Vista aérea da Marina Boreste, entre o Rio Una e o mar"; legenda "A Marina Boreste vista de cima, entre o Rio Una e o mar."
- [x] Logotipo como assinatura
- [x] **Missão:** "Proporcionar infraestrutura e serviços ideais para a guarda, manutenção, compra e venda de embarcações, sempre em harmonia com o meio ambiente, para que os clientes possam desfrutar da natureza e dos prazeres da atividade náutica."
- [x] "Não havia telefone celular nem GPS, não havia previsão do tempo e às vezes nem estradas. Mas mesmo assim, em meados da década de 70, Amandio Alves Pinto, um apaixonado pelo mar, saía com o seu barco navegando pela barra do Rio Una, mar afora, atraído pelas belezas do litoral norte de São Paulo."
- [x] "Foi por esta paixão e pelo seu espírito visionário que, ainda nesta época, ele começou a desenvolver em sua propriedade, na beira do Rio Una, as primeiras atividades náuticas da Marina Boreste, sendo ponto de apoio para amigos e outros navegantes."
- [x] "Com o tempo, a necessidade de facilitar o acesso a outros amantes do mar se tornava mais latente, e a Marina Boreste, acompanhando esta tendência, se organizava e se estruturava para atender os seus clientes cada vez melhor."
- [x] "Hoje, administrada pela família, a Marina Boreste continua investindo constantemente em melhorias, está consolidada no mercado, e a satisfação dos seus clientes é a comprovação da qualidade de seus serviços."
- [x] "E é neste clima de pioneirismo, amizade, honestidade e respeito à natureza que a Marina Boreste assume o compromisso de manter a sua embarcação sempre em boas mãos."

---

## 6. Embarcações à venda (`compra-e-venda.html`)

- [x] SEO: descrição "Conheça as embarcações à venda na Marina Boreste. Os preços são negociáveis, e todo o atendimento é feito pelo WhatsApp."; og; canonical
- [x] Botão "Voltar ao início" (no alto e no fim)
- [x] Título "Embarcações à venda"
- [x] "Conheça as embarcações à venda na Marina Boreste. Os preços são negociáveis, e todo o atendimento é feito pelo WhatsApp."
- [x] Vídeo dos barcos numa prancha vertical + botão "Pausar"
- [x] Cartão de cada barco: foto, nome (leva à página do barco), Ano, Tamanho ("N pés"), Motor, descrição, preço (ou "Preço negociável"), botão "Falar no WhatsApp sobre este barco"; vendido = etiqueta "Vendido" e sem botão
- [x] Sem barcos disponíveis: "No momento não há embarcações anunciadas. Fale com a gente pelo WhatsApp para saber das próximas oportunidades." + "Falar no WhatsApp"
- [x] Sem JavaScript: "Para ver as embarcações à venda, ative o JavaScript do navegador ou fale com a gente pelo WhatsApp."
- [x] Sem foto: logotipo no lugar da foto

## 7. Página do barco (`embarcacao.html?barco=<chave>`)

- [x] SEO: descrição "Fotos, dados e preço de uma embarcação à venda na Marina Boreste. Os preços são negociáveis, e todo o atendimento é feito pelo WhatsApp."; título e og:title com o nome do barco
- [x] Link de volta "Embarcações à venda"
- [x] Foto grande + miniaturas quando houver mais fotos ("Ver a foto N de M")
- [x] Nome, preço (ou "Vendido"), Ano / Tamanho / Motor, "Descrição", botão "Falar no WhatsApp sobre este barco" (vendido: "Ver as embarcações à venda")
- [x] Não encontrado: título "Embarcação não encontrada" + "Não encontramos esta embarcação. Ela pode ter sido vendida ou retirada do site." + "Ver as embarcações à venda"
- [x] Sem JavaScript: "Para ver esta embarcação, ative o JavaScript do navegador ou fale com a gente pelo WhatsApp."

## 8. Barcos anunciados (`dados/barcos.js`)

- [x] **Lancha Fast 275 Cabinada** — ano 1994; tamanho não informado (`pes: 0`); motor "Centro-rabeta Yamaha 275 HP, ano 2010, 610 horas"; descrição "Farol robot, guincho elétrico, 2 bombas de porão, GPS/sonda Garmin, flaps hidráulicos, chuveiro de água doce, churrasqueira, piso EVA, som, rádio VHF, strobo, salvatagem completa e âncora de popa."; preço R$ 195.000; disponível; foto `imagens/barcos/lancha-fast-275-cabinada-1994.webp` (alt "A lancha sobre a carreta, com o casco azul-marinho e branco, o nome Shamu-2 no costado e o toldo armado.")
- [x] Instruções de edição no topo do arquivo (campos nome, ano, pes, motor, descricao, preco, status, foto, descricaoFoto, maisFotos e modelo para copiar)

---

## 9. Imagens (todas com o texto alternativo acima)

- [x] `logo-marina-boreste.svg` / `-negativo.svg` / `.png`
- [x] `marina-boreste-compartilhamento.jpg` (Open Graph)
- [x] `video/marina-boreste-barcos-capa*` + vídeo
- [x] `barra-do-una` · `marina-vista-aerea` · `mapa-barra-do-una`
- [x] Serviços: `garageamento` · `rampagem` · `lavagem` · `acionamento` · `apoio-de-radio` · `resgate` · `bebidas-e-gelo` · `abastecimento` · `seguranca`
- [x] Infraestrutura: `garageamento` · `pier` · `rampagem` · `recepcao` · `lazer` · `oficina`
- [x] `pier-garagem-nautica` (foto larga)
- [x] `pousada-una-aerea` · `pousada-una-piscina`
- [x] `timao-de-madeira` (decorativa)
- [x] `barcos/lancha-fast-275-cabinada-1994.webp`
- [x] Ícones `icone-192.png` / `icone-512.png`

---

## 10. Pontos para confirmar (mantidos como estão até haver resposta)

> **Como ficou no novo:** (1) o valor aparece e, logo abaixo, "Preço negociável"; barco sem valor mostra só "Preço
> negociável". (2) e (3) mantidos como estão. (4) a página do barco ganhou "Voltar ao início", no alto e no fim.
> (5) mantido.

1. **Preço da Fast 275:** a lista diz R$ 195.000, e a página diz que "os preços são negociáveis". O pedido fala em
   "preço negociável" em cada barco. Mostrar os dois (valor + "Preço negociável") ou esconder o valor?
2. **"Telefone/fax" (12) 3867-1550:** o fax ainda existe ou fica só "Telefone"?
3. **"Benefício Pousada do Una"** no formulário, enquanto o resto do site diz "Pousada Una".
4. **Página do barco** não tem "Voltar ao início" hoje (só "Embarcações à venda"); o pedido exige o botão em todas
   as páginas internas, então ela ganha os dois.
5. **Tamanho da Fast 275** não está preenchido (`pes: 0`), então o site não mostra pés.
