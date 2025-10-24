import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const BG_IMAGES = [
  "https://i.imgur.com/LMWHSVa.jpeg",
  "https://i.imgur.com/UxA4fkI.jpeg",
  "https://i.imgur.com/inrUsJm.jpeg",
  "https://i.imgur.com/Ljecrnw.jpeg",
  "https://i.imgur.com/jk5Up2a.jpeg",
];

const WHATSAPP_PHONE = "5542920015594";

// Keyframes CSS inlined via style tag (ajustados)
const GlobalStyles = () => (
  <style>{`
    @keyframes floatYSlow {
      0% { transform: translateY(-4%); }
      50% { transform: translateY(4%); }
      100% { transform: translateY(-4%); }
    }
    @keyframes columnDriftUp {
      0% { transform: translateY(0); }
      100% { transform: translateY(-35%); }
    }
    @keyframes columnDriftDown {
      0% { transform: translateY(-35%); }
      100% { transform: translateY(0); }
    }
    .bg-float { animation: floatYSlow 26s ease-in-out infinite; }
    .column-up { animation: columnDriftUp 52s linear infinite; }
    .column-down { animation: columnDriftDown 52s linear infinite; }
    
    /* NOVO: marquee horizontal p/ indicadores */
    @keyframes marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `}</style>
);

function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1140px] px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ kicker, title, description, center=false }) {
  return (
    <div className={`${center ? "text-center" : "text-left"} max-w-3xl ${center ? "mx-auto" : ""}`}>
      {kicker && (
        <div className="mb-2 text-xs tracking-widest uppercase text-[#2F6FED]/70 font-semibold">
          {kicker}
        </div>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-[#0A0A0A]">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-4 text-[15px] sm:text-base text-neutral-600">
          {description}
        </p>
      )}
    </div>
  );
}

function Chip({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="px-4 py-2 rounded-2xl backdrop-blur-2xl border border-[#2F6FED]/25 bg-white/50 text-[#0A0A0A] shadow-sm"
    >
      <span className="text-sm font-semibold">{children}</span>
    </motion.div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-[#E9E9EE] bg-white/60 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${className}`}>
      {children}
    </div>
  );
}

function CTAButton({ href, children, variant = "primary" }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold transition-all duration-200 active:scale-[0.98] shadow-lg hover:shadow-xl";
  if (variant === "outline") {
    return (
      <a href={href} className={`${base} border border-[#2F6FED]/40 text-[#2F6FED] bg-white/60 backdrop-blur hover:-translate-y-0.5`}>
        {children}
      </a>
    );
  }
  if (variant === "whatsapp") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${base} text-white bg-gradient-to-r from-[#2F6FED] to-emerald-500 hover:-translate-y-0.5`}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={`${base} text-white bg-[#2F6FED] hover:-translate-y-0.5`}>
      {children}
    </a>
  );
}

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E9E9EE] rounded-2xl bg-white/60 backdrop-blur">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4"
      >
        <span className="text-left font-semibold text-[#0A0A0A]">{q}</span>
        <span
          className={`inline-block w-6 h-6 rounded-full border border-[#2F6FED]/60 text-[#2F6FED] grid place-items-center transition-transform ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-neutral-600 text-sm">{a}</div>
        </div>
      </div>
    </div>
  );
}

function VerticalShowcase() {
  const colA = useMemo(() => [...BG_IMAGES, ...BG_IMAGES], []);
  const colB = useMemo(() => [...BG_IMAGES.slice().reverse(), ...BG_IMAGES.slice().reverse()], []);
  return (
    <div className="relative w-full overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 h-[80vh] md:h-[100vh]">
          <div className="relative h-full">
            <div className="absolute inset-0 column-up">
              <div className="flex flex-col gap-6 md:gap-8">
                {colA.map((src, i) => (
                  <img
                    key={`a-${i}`}
                    src={src}
                    alt="Exemplo de loja"
                    className="w-full rounded-2xl border border-[#E9E9EE] shadow-md"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="relative h-full">
            <div className="absolute inset-0 column-down">
              <div className="flex flex-col gap-6 md:gap-8">
                {colB.map((src, i) => (
                  <img
                    key={`b-${i}`}
                    src={src}
                    alt="Exemplo de loja"
                    className="w-full rounded-2xl border border-[#E9E9EE] shadow-md"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
function IndicatorsCarousel() {
  const base = [
    "ENTREGA EM ATÉ 7 DIAS",
    "SUPORTE LOCAL",
    "ATÉ 500 PRODUTOS",
    "MARKETING MENSAL INCLUSO",
    "PAINEL SIMPLES E INTUITIVO",
  ];

  const categorias = [
    "LOJA DE SAPATOS",
    "LOJA DE ROUPAS",
    "LOJA DE MÓVEIS",
    "LOJA DE CARROS",
    "ELETRÔNICOS",
    "FARMÁCIA",
    "COSMÉTICOS",
    "PET SHOP",
    "PAPELARIA",
    "MERCADO",
    "RESTAURANTE",
    "FLORICULTURA",
  ];

  const items = [...base, ...categorias];
  const loop = [...items, ...items]; // duplica p/ loop perfeito

  return (
    <div className="relative py-8">
      {/* fades laterais */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="overflow-hidden">
        <ul
          className="
            flex gap-3 sm:gap-4 whitespace-nowrap
            [animation:marquee_28s_linear_infinite]
            hover:[animation-play-state:paused]
            will-change-transform
          "
          style={{ animationDuration: "26s" }}
        >
          {loop.map((txt, i) => (
            <li key={i} className="inline-flex">
              <div
                className="
                  px-5 sm:px-6 py-3 rounded-2xl
                  bg-white/40 backdrop-blur-2xl
                  border border-[#2F6FED]/20 shadow-md
                  text-[#0A0A0A] text-sm sm:text-[15px] font-semibold tracking-wide
                  whitespace-nowrap
                "
              >
                {txt}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function LandingPagePlanoTrimestral() {
  const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    "Oi! Quero saber mais sobre o Plano Trimestral da loja virtual."
  )}`;

  return (
    <div className="min-h-screen w-full bg-white text-[#0A0A0A] selection:bg-[#2F6FED]/20">
      <GlobalStyles />

      {/* Background floating imagery – menor opacidade */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.06] hidden md:block" aria-hidden>
        <div className="absolute -left-16 top-10 w-[40vw] rotate-2 bg-float">
          <img src={BG_IMAGES[0]} alt="bg" className="w-full h-auto rounded-3xl" />
        </div>
        <div className="absolute right-0 top-40 w-[32vw] -rotate-2 bg-float">
          <img src={BG_IMAGES[1]} alt="bg" className="w-full h-auto rounded-3xl" />
        </div>
        <div className="absolute left-1/3 bottom-0 w-[36vw] bg-float">
          <img src={BG_IMAGES[2]} alt="bg" className="w-full h-auto rounded-3xl" />
        </div>
      </div>

      {/* HERO (mais compacto) */}
      <section id="hero" className="relative flex items-center min-h-[92vh] py-14">
        <Container className="relative">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0A0A0A]"
            >
              ENQUANTO AS RUAS ESTÃO EM REFORMA, SEU NEGÓCIO PODE CRESCER.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-lg text-neutral-700 max-w-2xl"
            >
              Com o <strong>Plano Trimestral</strong>, você tem uma loja virtual completa, entregue em até 7 dias, com suporte e marketing local para continuar vendendo — mesmo com o comércio físico parado.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <CTAButton href="#plano">VER PLANO</CTAButton>
              <CTAButton href="#exemplos" variant="outline">VER EXEMPLOS</CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[#2F6FED]/30 bg-white/60 backdrop-blur"
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-[#2F6FED]">Plano Trimestral • Suporte Local</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Indicadores */}
<section id="indicadores" className="py-12">
  <Container>
    <IndicatorsCarousel />
  </Container>
</section>


      {/* Problema x Solução */}
      <section id="problema-solucao" className="py-20">
        <Container>
          <SectionTitle kicker="💡 Problema x Solução" title="" description={null} />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { q: "BURACOS E OBRAS ATRAPALHANDO O ACESSO?", a: "Na loja virtual, o cliente entra com um clique, sem sair de casa." },
              { q: "CHOVEU E NINGUÉM SAIU?", a: "A loja online continua aberta 24h — e o cliente recebe em casa." },
              { q: "POUCO MOVIMENTO NA RUA?", a: "No digital, o fluxo é constante: você aparece para quem procura pelos seus produtos." },
              { q: "CONTAS CHEGANDO E VENDAS CAINDO?", a: "Acompanhe em tempo real: pedidos, pagamentos e clientes, direto do seu painel." },
              { q: "NÃO SABE MAIS PARA QUEM PEDIR AJUDA?", a: "Suporte direto e presencial — nada de atendimento automático." },
              { q: "NATAL CHEGANDO E NINGUÉM ENTRA AI?", a: "Sua loja virtual garante que os produtos sejam vistos, mesmo com o centro vazio." },
            ].map((it, i) => (
              <GlassCard key={i} className="p-6">
                <div className="text-base font-bold">{it.q}</div>
                <p className="mt-2 text-neutral-700 text-sm">{it.a}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Plano Trimestral */}
      <section id="plano" className="py-24">
        <Container>
          <GlassCard className="p-8 md:p-10 mx-auto max-w-3xl border-[#2F6FED]/30">
            <div className="text-center">
              <div className="text-xs tracking-widest uppercase text-[#2F6FED]/80 font-semibold">
                Plano Trimestral
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black">
                PLANO DISPONÍVEL
              </h3>
              <p className="mt-4 text-neutral-700">
                Contrato mínimo de 3 meses, <strong>pago mês a mês</strong>. Loja entregue em até <strong>7 dias úteis</strong> e <strong>treinamento presencial</strong> logo após a entrega.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl p-5 border border-[#E9E9EE] bg-white/70">
                <div className="text-sm font-bold text-[#0A0A0A]">Entrega & Condições</div>
                <ul className="mt-3 text-sm text-neutral-700 space-y-2 list-disc list-inside">
                  <li>Loja pronta em até <strong>7 dias úteis</strong></li>
                  <li><strong>Pagamento mensal</strong> (contrato trimestral)</li>
                  <li><strong>Treinamento presencial</strong> após a entrega</li>
                </ul>
              </div>
              <div className="rounded-2xl p-5 border border-[#E9E9EE] bg-white/70">
                <div className="text-sm font-bold text-[#0A0A0A]">Design & Marketing</div>
                <ul className="mt-3 text-sm text-neutral-700 space-y-2 list-disc list-inside">
                  <li>Atualização de <strong>banners</strong> e destaques todo mês</li>
                  <li><strong>Planejamento de conteúdo</strong> e artes para Instagram</li>
                  <li><strong>Sugestões de ações</strong> e campanhas locais</li>
                </ul>
              </div>
              <div className="rounded-2xl p-5 border border-[#E9E9EE] bg-white/70">
                <div className="text-sm font-bold text-[#0A0A0A]">Painel & Base Técnica</div>
                <ul className="mt-3 text-sm text-neutral-700 space-y-2 list-disc list-inside">
                  <li>Painel simples para ver <strong>vendas, pedidos, clientes e produtos</strong></li>
                  <li>Base técnica completa (<strong>até 500 produtos</strong>, pagamentos, fretes, SEO, segurança SSL)</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <CTAButton href={waLink}>Assinar Plano Trimestral</CTAButton>
            </div>
          </GlassCard>
        </Container>
      </section>

      {/* Inclusos no Plano */}
      <section id="inclusos" className="py-24 bg-[#F6F7FB]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <SectionTitle
              kicker="INCLUSOS NO PLANO"
              title="TUDO O QUE ESTÁ INCLUSO NO PLANO TRIMESTRAL"
              description="Transparência total do que você recebe: estrutura, painel, design, marketing, suporte e condições."
            />
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { h: "ENTREGA E CONTRATO", t: "Loja entregue em até 7 dias úteis; pagamento mensal; contrato trimestral com renovação opcional." },
                { h: "ESTRUTURA DA LOJA", t: "Até 500 produtos; meios de pagamento e fretes configurados; domínio; loja responsiva; SSL e SEO básicos; integração com Google e Meta." },
                { h: "PAINEL DE CONTROLE", t: "Acompanhe vendas, pedidos, entregas; veja clientes e histórico; edite produtos, preços e promoções; alertas de estoque." },
                { h: "DESIGN E ATUALIZAÇÃO", t: "Banners e destaques mensais; ajustes de vitrines; identidade sazonal." },
                { h: "MARKETING MENSAL", t: "Planejamento de conteúdo; artes para feed e stories; campanhas locais; apoio via WhatsApp, Instagram e Google." },
                { h: "TREINAMENTO E SUPORTE", t: "Treinamento presencial; suporte local; acompanhamento e relatório mensal." },
              ].map((it, i) => (
                <div key={i} className="p-6 rounded-3xl border border-[#E9E9EE] bg-white/70 backdrop-blur-2xl">
                  <div className="font-bold text-[#0A0A0A]">{it.h}</div>
                  <p className="mt-2 text-sm text-neutral-700">{it.t}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Exemplos Reais – Showcase vertical animado */}
      <section id="exemplos" className="py-24">
        <Container>
          <SectionTitle center kicker="EXEMPLOS DE LAYOUT" title="EXEMPLOS" description={"Imagens com vitrines e banners personalizados."} />
        </Container>
        <div className="mt-10">
          <VerticalShowcase />
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-24">
        <Container>
          <SectionTitle kicker="COMO FUNCIONA" title="" description={null} />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { n: "1. BRIEFING", d: "Coletamos informações e identidade da sua marca." },
              { n: "2. CRIAÇÃO E ENTREGA", d: "Em até 7 dias úteis, sua loja está pronta e funcionando." },
              { n: "3. TREINAMENTO", d: "Você aprende a gerenciar o painel e acompanhar as vendas." },
              { n: "4. ACOMPANHAMENTO", d: "Mensalmente, você recebe melhorias, banners e sugestões de ações." },
            ].map((it, i) => (
              <GlassCard key={i} className="p-6 text-center">
                <div className="mx-auto w-10 h-10 grid place-items-center rounded-full bg-[#2F6FED]/10 text-[#2F6FED] font-black">
                  {i + 1}
                </div>
                <div className="mt-4 font-bold">{it.n}</div>
                <p className="mt-2 text-neutral-700 text-sm">{it.d}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
<section id="faq" className="py-24 bg-[#F6F7FB]">
  <Container>
    <SectionTitle kicker="Perguntas Frequentes" title="" description={null} />
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Sobre a loja virtual */}
      <div className="space-y-4">
        <div className="text-sm font-black tracking-wider uppercase text-[#2F6FED]/80">
          SSOBRE A LOJA VIRTUAL
        </div>
        {[
          {
            q: "Em quanto tempo minha loja fica pronta?",
            a: "Em até 7 dias úteis após recebermos seu briefing e materiais básicos (logo, cores e informações)."
          },
          {
            q: "Posso cadastrar meus próprios produtos depois?",
            a: "Sim. Você terá acesso ao painel para incluir/editar produtos, preços, estoque e promoções."
          },
          {
            q: "Quantos produtos posso ter?",
            a: "O plano cobre até 500 produtos. Precisa de mais? A gente escala o catálogo sem perder performance."
          },
          {
            q: "Posso acompanhar vendas e pedidos?",
            a: "Sim. O painel mostra pedidos em tempo real, status de pagamento, clientes e relatórios simples."
          },
          {
            q: "Minha loja funciona bem no celular?",
            a: "Totalmente responsiva e otimizada para mobile: velocidade, navegação e checkout pensados para o celular."
          }
        ].map((it, i) => (
          <AccordionItem key={i} q={it.q} a={it.a} />
        ))}
      </div>

      {/* Pagamentos e contrato */}
      <div className="space-y-4">
        <div className="text-sm font-black tracking-wider uppercase text-[#2F6FED]/80">
          PAGAMENTOS E CONTRATO
        </div>
        {[
          {
            q: "O plano trimestral é pago à vista?",
            a: "Não. O contrato é de 3 meses, com pagamento mensal. Após o período, você pode renovar ou encerrar."
          },
          {
            q: "Domínio e hospedagem estão inclusos?",
            a: "Dominío próprio e hospedagem ficam configurados. Se já tiver domínio, apontamos; se não, ajudamos a registrar."
          },
          {
            q: "Preciso pagar algo extra à plataforma?",
            a: "As taxas de meios de pagamento e eventuais integrações externas seguem as políticas dos provedores."
          },
          {
            q: "Posso cancelar antes dos 3 meses?",
            a: "O plano tem permanência mínima de 3 meses. Após esse período, o cancelamento é livre."
          },
          {
            q: "O suporte tem custo adicional?",
            a: "Não no plano. Suporte local e acompanhamento mensal estão inclusos. Demandas fora do escopo são orçadas à parte."
          }
        ].map((it, i) => (
          <AccordionItem key={i} q={it.q} a={it.a} />
        ))}
      </div>

      {/* Design e marketing */}
      <div className="space-y-4">
        <div className="text-sm font-black tracking-wider uppercase text-[#2F6FED]/80">
          DESIGN  MARKETING
        </div>
        {[
          {
            q: "O layout da loja é padrão?",
            a: "Usamos base profissional com identidade aplicada à sua marca (cores, tipografia, banners e vitrines)."
          },
          {
            q: "Posso mudar banners e fotos depois?",
            a: "Sim. Entregamos banners mensais e você também pode trocar imagens pelo painel quando quiser."
          },
          {
            q: "O que inclui o planejamento de marketing?",
            a: "Sugestões de post de divulgação, ações de marketing e direcionamento para story."
          },
          {
            q: "A loja aparece no Google?",
            a: "Sim. Configuramos SEO básico e integrações com Google e Meta para catálogo/loja."
          }
        ].map((it, i) => (
          <AccordionItem key={i} q={it.q} a={it.a} />
        ))}
      </div>

      {/* Suporte e treinamento */}
      <div className="space-y-4">
        <div className="text-sm font-black tracking-wider uppercase text-[#2F6FED]/80">
          SUPORTE E TREINAMENTO
        </div>
        {[
          {
            q: "Como é feito o treinamento?",
            a: "Treinamento presencial após a entrega, com passo a passo do painel e boas práticas de operação."
          },
          {
            q: "Como funciona o suporte no dia a dia?",
            a: "Atendimento direto no whatsapp e local quando necessário. Problemas operacionais e dúvidas de uso são resolvidos rapidamente."
          },
          {
            q: "Vocês ajudam em campanhas sazonais (ex.: Natal)?",
            a: "Sim. Ajustamos vitrines/banners e sugerimos ações promocionais alinhadas ao calendário."
          },
          {
            q: "Se houver algum erro na loja, quem resolve?",
            a: "Nossa equipe. Manutenção e correções técnicas do escopo estão cobertas pelo plano."
          },
          {
            q: "Depois dos 3 meses, posso continuar com o mesmo plano?",
            a: "Pode. A renovação é opcional e mantém entregas mensais de design, marketing e suporte."
          }
        ].map((it, i) => (
          <AccordionItem key={i} q={it.q} a={it.a} />
        ))}
      </div>
    </div>
  </Container>
</section>


      {/* CTA Final */}
      <section id="cta-final" className="py-24">
        <Container>
          <GlassCard className="p-10 text-center bg-gradient-to-tr from-white to-[#E9F3FF]">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black">
              SUA LOJA PRONTA. SEU NEGÓCIO VENDENDO.
            </h3>
            <p className="mt-3 text-neutral-700">
              FECHE HOJE E INICIE NOVEMBRO COM VENDAS
            </p>
            <div className="mt-6 flex justify-center">
              <CTAButton href={waLink} variant="whatsapp">FALAR NO WHATSAPP</CTAButton>
            </div>
          </GlassCard>
        </Container>
      </section>

      {/* Footer enxuto */}
      <footer className="py-10 border-t border-[#E9E9EE] text-center text-xs text-neutral-500">
        <Container>
          Marcela Queji • © {new Date().getFullYear()}
        </Container>
      </footer>
    </div>
  );
}
