<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Loja Virtual TB – Plano Trimestral</title>

  <!-- Tailwind via CDN para agilizar (sem build) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">

  <!-- Seu CSS da página -->
  <link rel="stylesheet" href="./loja-virtual-tb.css">
</head>
<body class="bg-white text-[#0A0A0A]" style="font-family:Inter,system-ui,Arial,sans-serif">
  <!-- BG flutuante (desktop) -->
  <div class="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.08] hidden md:block" aria-hidden="true">
    <div class="absolute -left-16 top-10 w-[40vw] rotate-2 bg-float">
      <img src="https://i.imgur.com/LMWHSVa.jpeg" alt="" class="w-full h-auto rounded-3xl">
    </div>
    <div class="absolute right-0 top-40 w-[32vw] -rotate-2 bg-float">
      <img src="https://i.imgur.com/UxA4fkI.jpeg" alt="" class="w-full h-auto rounded-3xl">
    </div>
    <div class="absolute left-1/3 bottom-0 w-[36vw] bg-float">
      <img src="https://i.imgur.com/inrUsJm.jpeg" alt="" class="w-full h-auto rounded-3xl">
    </div>
  </div>

  <!-- HERO -->
  <section class="relative flex items-center min-h-[92vh] py-20">
    <div class="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16">
      <div class="max-w-3xl">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
          Enquanto as ruas estão em reforma, seu negócio pode continuar crescendo.
        </h1>
        <p class="mt-5 text-lg text-neutral-700 max-w-2xl">
          Com o <strong>Plano Trimestral</strong>, você tem uma loja virtual completa, entregue em até 7 dias, com suporte e marketing local para continuar vendendo — mesmo com o comércio físico parado.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a href="#plano" class="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold text-white bg-[#355691] shadow-lg hover:shadow-xl">Ver Plano</a>
          <a href="#exemplos" class="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold border border-[#355691]/40 text-[#355691] bg-white/50 backdrop-blur hover:shadow-lg">Ver Exemplos</a>
        </div>

        <div class="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[#355691]/30 bg-white/60 backdrop-blur">
          <span class="text-xs font-semibold tracking-widest uppercase text-[#355691]">Plano Trimestral • Suporte Local</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Indicadores -->
  <section class="py-14">
    <div class="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <div class="chip">Entrega em até 7 dias úteis</div>
        <div class="chip">Suporte local</div>
        <div class="chip">Até 500 produtos</div>
        <div class="chip">Marketing mensal incluso</div>
        <div class="chip">Painel simples e intuitivo</div>
      </div>
    </div>
  </section>

  <!-- Problema x Solução -->
  <section class="py-20">
    <div class="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16">
      <div class="mb-6 text-xs tracking-widest uppercase text-[#355691]/70 font-semibold">💡 Problema x Solução</div>
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- cards -->
        <div class="glass p-6"><div class="font-bold">Buracos e obras atrapalhando o acesso?</div><p class="mt-2 text-neutral-700 text-sm">Na loja virtual, o cliente entra com um clique, sem sair de casa.</p></div>
        <div class="glass p-6"><div class="font-bold">Choveu e ninguém saiu?</div><p class="mt-2 text-neutral-700 text-sm">A loja online continua aberta 24h — e o cliente recebe em casa.</p></div>
        <div class="glass p-6"><div class="font-bold">Pouco movimento na rua?</div><p class="mt-2 text-neutral-700 text-sm">No digital, o fluxo é constante: você aparece para quem procura pelos seus produtos.</p></div>
        <div class="glass p-6"><div class="font-bold">Contas chegando e vendas caindo?</div><p class="mt-2 text-neutral-700 text-sm">Acompanhe em tempo real: pedidos, pagamentos e clientes, direto do seu painel.</p></div>
        <div class="glass p-6"><div class="font-bold">Não sabe mais pra quem pedir ajuda?</div><p class="mt-2 text-neutral-700 text-sm">Suporte direto e presencial — nada de atendimento automático.</p></div>
        <div class="glass p-6"><div class="font-bold">Natal chegando e o movimento não ajuda?</div><p class="mt-2 text-neutral-700 text-sm">Sua loja virtual garante que os produtos sejam vistos, mesmo com o centro vazio.</p></div>
      </div>
    </div>
  </section>

  <!-- Plano -->
  <section id="plano" class="py-24">
    <div class="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16">
      <div class="glass p-8 md:p-10 mx-auto max-w-3xl border-[#355691]/30">
        <div class="text-center">
          <div class="text-xs tracking-widest uppercase text-[#355691]/80 font-semibold">💼 Plano Trimestral</div>
          <h3 class="mt-2 text-2xl sm:text-3xl md:text-4xl font-black">Plano disponível (Trimestral) — pagamento mensal</h3>
          <p class="mt-4 text-neutral-700">Contrato mínimo de 3 meses, <strong>pago mês a mês</strong>. Loja entregue em até <strong>7 dias úteis</strong> e <strong>treinamento presencial</strong> logo após a entrega.</p>
        </div>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="rounded-2xl p-5 border border-[#E9E9EE] bg-white/70">
            <div class="text-sm font-bold">Entrega & Condições</div>
            <ul class="mt-3 text-sm text-neutral-700 space-y-2 list-disc list-inside">
              <li>Loja pronta em até <strong>7 dias úteis</strong></li>
              <li><strong>Pagamento mensal</strong> (contrato trimestral)</li>
              <li><strong>Treinamento presencial</strong> após a entrega</li>
            </ul>
          </div>
          <div class="rounded-2xl p-5 border border-[#E9E9EE] bg-white/70">
            <div class="text-sm font-bold">Design & Marketing</div>
            <ul class="mt-3 text-sm text-neutral-700 space-y-2 list-disc list-inside">
              <li>Atualização de <strong>banners</strong> e destaques todo mês</li>
              <li><strong>Planejamento de conteúdo</strong> e artes para Instagram</li>
              <li><strong>Sugestões de ações</strong> e campanhas locais</li>
            </ul>
          </div>
          <div class="rounded-2xl p-5 border border-[#E9E9EE] bg-white/70">
            <div class="text-sm font-bold">Painel & Base Técnica</div>
            <ul class="mt-3 text-sm text-neutral-700 space-y-2 list-disc list-inside">
              <li>Painel simples para ver <strong>vendas, pedidos, clientes e produtos</strong></li>
              <li>Base técnica completa (<strong>até 500 produtos</strong>, pagamentos, fretes, SEO, segurança SSL)</li>
            </ul>
          </div>
        </div>

        <div class="mt-8 flex justify-center">
          <a target="_blank" rel="noreferrer" href="https://wa.me/5542920015594?text=Oi!%20Quero%20saber%20mais%20sobre%20o%20Plano%20Trimestral%20da%20loja%20virtual." class="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold text-white bg-[#355691] shadow-lg hover:shadow-xl">Assinar Plano Trimestral</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Inclusos -->
  <section class="py-24 bg-[#F6F7FB]">
    <div class="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div>
          <div class="mb-2 text-xs tracking-widest uppercase text-[#355691]/70 font-semibold">🧩 Inclusos no Plano</div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">Tudo o que está incluso no Plano Trimestral</h2>
          <p class="mt-4 text-[15px] sm:text-base text-neutral-600">Transparência total do que você recebe: estrutura, painel, design, marketing, suporte e condições.</p>
        </div>
        <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="p-6 rounded-3xl border border-[#E9E9EE] bg-white/70 backdrop-blur-xl"><div class="font-bold">Entrega e contrato</div><p class="mt-2 text-sm text-neutral-700">Loja entregue em até 7 dias úteis; pagamento mensal; contrato trimestral com renovação opcional.</p></div>
          <div class="p-6 rounded-3xl border border-[#E9E9EE] bg-white/70 backdrop-blur-xl"><div class="font-bold">Estrutura da loja</div><p class="mt-2 text-sm text-neutral-700">Até 500 produtos; meios de pagamento e fretes configurados; domínio; loja responsiva; SSL e SEO básicos; integração com Google e Meta.</p></div>
          <div class="p-6 rounded-3xl border border-[#E9E9EE] bg-white/70 backdrop-blur-xl"><div class="font-bold">Painel de controle</div><p class="mt-2 text-sm text-neutral-700">Acompanhe vendas, pedidos, entregas; veja clientes e histórico; edite produtos, preços e promoções; alertas de estoque.</p></div>
          <div class="p-6 rounded-3xl border border-[#E9E9EE] bg-white/70 backdrop-blur-xl"><div class="font-bold">Design e atualizações</div><p class="mt-2 text-sm text-neutral-700">Banners e destaques mensais; ajustes de vitrines; identidade sazonal.</p></div>
          <div class="p-6 rounded-3xl border border-[#E9E9EE] bg-white/70 backdrop-blur-xl"><div class="font-bold">Marketing mensal</div><p class="mt-2 text-sm text-neutral-700">Planejamento de conteúdo; artes para feed e stories; campanhas locais; apoio via WhatsApp, Instagram e Google.</p></div>
          <div class="p-6 rounded-3xl border border-[#E9E9EE] bg-white/70 backdrop-blur-xl"><div class="font-bold">Treinamento e suporte</div><p class="mt-2 text-sm text-neutral-700">Treinamento presencial; suporte local; acompanhamento e relatório mensal.</p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Exemplos -->
  <section id="exemplos" class="py-24">
    <div class="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16 text-center">
      <div class="mb-2 text-xs tracking-widest uppercase text-[#355691]/70 font-semibold">🛍️ Exemplos Reais</div>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">Exemplo de lojas criadas</h2>
      <p class="mt-4 text-[15px] sm:text-base text-neutral-600">Imagens com vitrines e banners personalizados.</p>
    </div>
    <div class="mt-10 relative w-full overflow-hidden">
      <div class="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 h-[120vh] md:h-[140vh]">
          <div class="relative h-full">
            <div class="absolute inset-0 column-up">
              <div class="flex flex-col gap-6 md:gap-8">
                <img src="https://i.imgur.com/LMWHSVa.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <img src="https://i.imgur.com/UxA4fkI.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <img src="https://i.imgur.com/inrUsJm.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <img src="https://i.imgur.com/Ljecrnw.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <img src="https://i.imgur.com/jk5Up2a.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <!-- duplica para looping visual -->
                <img src="https://i.imgur.com/LMWHSVa.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <img src="https://i.imgur.com/UxA4fkI.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <img src="https://i.imgur.com/inrUsJm.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
              </div>
            </div>
          </div>
          <div class="relative h-full">
            <div class="absolute inset-0 column-down">
              <div class="flex flex-col gap-6 md:gap-8">
                <img src="https://i.imgur.com/jk5Up2a.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <img src="https://i.imgur.com/Ljecrnw.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <img src="https://i.imgur.com/inrUsJm.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <img src="https://i.imgur.com/UxA4fkI.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <img src="https://i.imgur.com/LMWHSVa.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <!-- duplica -->
                <img src="https://i.imgur.com/jk5Up2a.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <img src="https://i.imgur.com/Ljecrnw.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
                <img src="https://i.imgur.com/inrUsJm.jpeg" class="w-full rounded-2xl border border-[#E9E9EE] shadow-md" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Como funciona -->
  <section class="py-24">
    <div class="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16">
      <div class="mb-2 text-xs tracking-widest uppercase text-[#355691]/70 font-semibold">🧠 Como Funciona</div>
      <div class="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="glass p-6 text-center"><div class="mx-auto w-10 h-10 grid place-items-center rounded-full bg-[#355691]/10 text-[#355691] font-black">1</div><div class="mt-4 font-bold">1. Briefing</div><p class="mt-2 text-neutral-700 text-sm">Coletamos informações e identidade da sua marca.</p></div>
        <div class="glass p-6 text-center"><div class="mx-auto w-10 h-10 grid place-items-center rounded-full bg-[#355691]/10 text-[#355691] font-black">2</div><div class="mt-4 font-bold">2. Criação e entrega</div><p class="mt-2 text-neutral-700 text-sm">Em até 7 dias úteis, sua loja está pronta e funcionando.</p></div>
        <div class="glass p-6 text-center"><div class="mx-auto w-10 h-10 grid place-items-center rounded-full bg-[#355691]/10 text-[#355691] font-black">3</div><div class="mt-4 font-bold">3. Treinamento</div><p class="mt-2 text-neutral-700 text-sm">Você aprende a gerenciar o painel e acompanhar as vendas.</p></div>
        <div class="glass p-6 text-center"><div class="mx-auto w-10 h-10 grid place-items-center rounded-full bg-[#355691]/10 text-[#355691] font-black">4</div><div class="mt-4 font-bold">4. Acompanhamento</div><p class="mt-2 text-neutral-700 text-sm">Mensalmente, você recebe melhorias, banners e sugestões de ações.</p></div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="py-24 bg-[#F6F7FB]">
    <div class="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16">
      <div class="mb-2 text-xs tracking-widest uppercase text-[#355691]/70 font-semibold">❓ Perguntas Frequentes</div>
      <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="text-sm font-black tracking-wider uppercase text-[#355691]/80">Sobre a loja virtual</div>
          <div class="acc-item"><button class="acc-btn">Em quanto tempo minha loja fica pronta?</button><div class="acc-panel"><p>Sim. Nossa implementação garante essas capacidades conforme descrito na página.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Posso cadastrar meus próprios produtos depois?</button><div class="acc-panel"><p>Sim. Nossa implementação garante essas capacidades conforme descrito na página.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Quantos produtos posso ter?</button><div class="acc-panel"><p>Sim. Nossa implementação garante essas capacidades conforme descrito na página.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Posso acompanhar vendas e pedidos?</button><div class="acc-panel"><p>Sim. Nossa implementação garante essas capacidades conforme descrito na página.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Minha loja funciona bem no celular?</button><div class="acc-panel"><p>Sim. Nossa implementação garante essas capacidades conforme descrito na página.</p></div></div>
        </div>
        <div class="space-y-4">
          <div class="text-sm font-black tracking-wider uppercase text-[#355691]/80">Pagamentos e contrato</div>
          <div class="acc-item"><button class="acc-btn">O plano trimestral é pago à vista?</button><div class="acc-panel"><p>Detalhes comerciais são esclarecidos no momento da contratação e nos termos do plano.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Domínio e hospedagem estão inclusos?</button><div class="acc-panel"><p>Detalhes comerciais são esclarecidos no momento da contratação e nos termos do plano.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Preciso pagar algo extra à plataforma?</button><div class="acc-panel"><p>Detalhes comerciais são esclarecidos no momento da contratação e nos termos do plano.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Posso cancelar antes dos 3 meses?</button><div class="acc-panel"><p>Detalhes comerciais são esclarecidos no momento da contratação e nos termos do plano.</p></div></div>
          <div class="acc-item"><button class="acc-btn">O suporte tem custo adicional?</button><div class="acc-panel"><p>Detalhes comerciais são esclarecidos no momento da contratação e nos termos do plano.</p></div></div>
        </div>
        <div class="space-y-4">
          <div class="text-sm font-black tracking-wider uppercase text-[#355691]/80">Design e marketing</div>
          <div class="acc-item"><button class="acc-btn">O layout da loja é padrão?</button><div class="acc-panel"><p>Sim, conforme descrito nos tópicos de Design & Marketing e integrações.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Posso mudar banners e fotos depois?</button><div class="acc-panel"><p>Sim, conforme descrito nos tópicos de Design & Marketing e integrações.</p></div></div>
          <div class="acc-item"><button class="acc-btn">O que inclui o planejamento de marketing?</button><div class="acc-panel"><p>Sim, conforme descrito nos tópicos de Design & Marketing e integrações.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Vocês entregam as artes para Instagram?</button><div class="acc-panel"><p>Sim, conforme descrito nos tópicos de Design & Marketing e integrações.</p></div></div>
          <div class="acc-item"><button class="acc-btn">A loja aparece no Google e no Instagram Shopping?</button><div class="acc-panel"><p>Sim, conforme descrito nos tópicos de Design & Marketing e integrações.</p></div></div>
        </div>
        <div class="space-y-4">
          <div class="text-sm font-black tracking-wider uppercase text-[#355691]/80">Suporte e treinamento</div>
          <div class="acc-item"><button class="acc-btn">Como é feito o treinamento?</button><div class="acc-panel"><p>Sim, com suporte local, acompanhamento e possibilidade de continuidade do plano.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Como funciona o suporte no dia a dia?</button><div class="acc-panel"><p>Sim, com suporte local, acompanhamento e possibilidade de continuidade do plano.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Vocês ajudam em campanhas sazonais (ex.: Natal)?</button><div class="acc-panel"><p>Sim, com suporte local, acompanhamento e possibilidade de continuidade do plano.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Se houver algum erro na loja, quem resolve?</button><div class="acc-panel"><p>Sim, com suporte local, acompanhamento e possibilidade de continuidade do plano.</p></div></div>
          <div class="acc-item"><button class="acc-btn">Depois dos 3 meses, posso continuar com o mesmo plano?</button><div class="acc-panel"><p>Sim, com suporte local, acompanhamento e possibilidade de continuidade do plano.</p></div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA final -->
  <section class="py-24">
    <div class="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16">
      <div class="glass p-10 text-center bg-gradient-to-tr from-white to-[#E9F3FF]">
        <h3 class="text-2xl sm:text-3xl md:text-4xl font-black">Sua loja pronta. Seu negócio vendendo.</h3>
        <p class="mt-3 text-neutral-700">Fale conosco agora e veja sua loja no ar em até 7 dias úteis.</p>
        <div class="mt-6 flex justify-center">
          <a target="_blank" rel="noreferrer" href="https://wa.me/5542920015594?text=Oi!%20Quero%20saber%20mais%20sobre%20o%20Plano%20Trimestral%20da%20loja%20virtual." class="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold text-white bg-gradient-to-r from-[#355691] to-emerald-500 shadow-lg hover:shadow-xl">Falar no WhatsApp</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-10 border-t border-[#E9E9EE] text-center text-xs text-neutral-500">
    Plano Trimestral • Suporte Local • © <span id="year"></span>
  </footer>

  <!-- Seu JS da página -->
  <script src="./loja-virtual-tb.js"></script>
</body>
</html>
