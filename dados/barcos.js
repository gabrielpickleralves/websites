/* Embarcações à venda, mostradas na página compra-e-venda.html. Clicar num cartão abre
   embarcacao.html, a página do barco, com a foto grande, os dados e o botão de contato.
   Cada barco é um bloco { ... } dentro da lista lá embaixo, separado do próximo por vírgula.
   Os cartões aparecem na página na mesma ordem desta lista.

   nome           nome ou modelo do barco; aparece no cartão e na mensagem do WhatsApp
   ano            ano de fabricação, só o número, ex.: 2015
   pes            tamanho em pés, só o número, ex.: 24 (aparece "24 pés")
   motor          motorização, em texto
   descricao      texto curto sobre o barco
   preco          valor em reais, só números, ex.: 185000 (aparece "R$ 185.000");
                  use null para mostrar "Preço negociável"
   status         "disponível" ou "vendido"; vendido ganha a etiqueta "Vendido" e fica sem o botão de WhatsApp
   foto           foto de capa, guardada na pasta imagens/barcos/, ex.: "imagens/barcos/nome-do-barco-2015.jpg"
   descricaoFoto  o que a foto de capa mostra, para quem usa leitor de tela (opcional)
   maisFotos      outras fotos, só na página do barco (opcional), ex.: ["imagens/barcos/nome-2.jpg", "imagens/barcos/nome-3.jpg"]

   Modelo para copiar:
   {
     nome: "",
     ano: 0,
     pes: 0,
     motor: "",
     descricao: "",
     preco: null,
     status: "disponível",
     foto: "imagens/barcos/",
     descricaoFoto: ""
   },
*/
window.BARCOS = [
  {
    nome: "Lancha Fast 275 Cabinada",
    ano: 1994,
    pes: 0,
    motor: "Centro-rabeta Yamaha 275 HP, ano 2010, 610 horas",
    descricao: "Farol robot, guincho elétrico, 2 bombas de porão, GPS/sonda Garmin, flaps hidráulicos, chuveiro de água doce, churrasqueira, piso EVA, som, rádio VHF, strobo, salvatagem completa e âncora de popa.",
    preco: 195000,
    status: "disponível",
    foto: "imagens/barcos/lancha-fast-275-cabinada-1994.webp",
    descricaoFoto: "A lancha sobre a carreta, com o casco azul-marinho e branco, o nome Shamu-2 no costado e o toldo armado."
  },
];
