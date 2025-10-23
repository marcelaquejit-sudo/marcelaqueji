import { useState, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * LP – Plano Trimestral
 * Design: clean técnico (glass/blur), fundo branco com imagens em baixa opacidade movendo verticalmente.
 * Tipografia: Inter; use Tailwind classes.
 * Obs: Mantém integralmente a copy fornecida pela usuária.
 */

const BG_IMAGES = [
  // Showcase (colunas verticais) – links fornecidos anteriormente pela usuária
  "https://i.imgur.com/LMWHSVa.jpeg",
  "https://i.imgur.com/UxA4fkI.jpeg",
  "https://i.imgur.com/inrUsJm.jpeg",
  "https://i.imgur.com/Ljecrnw.jpeg",
  "https://i.imgur.com/jk5Up2a.jpeg",
];

const WHATSAPP_PHONE = "5542920015594"; // número usado em outras conversas

// Keyframes CSS inlined via style tag for vertical float
const GlobalStyles = () => (
  <style>{`
    @keyframes floatYSlow {
      0% { transform: translateY(-6%); }
      50% { transform: translateY(6%); }
      100% { transform: translateY(-6%); }
    }
    @keyframes columnDriftUp {
      0% { transform: translateY(0); }
      100% { transform: translateY(-50%); }
    }
    @keyframes columnDriftDown {
      0% { transform: translateY(-50%); }
      100% { transform: translateY(0); }
    }
    .bg-float { animation: floatYSlow 18s ease-in-out infinite; }
    .column-up { animation: columnDriftUp 36s linear infinite; }
    .column-down { animation: columnDriftDown 36s linear infinite; }
  `}</style>
);

function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ kicker, title, description, center=false }) {
  return (
    <div className={`${center ? "text-center" : "text-left"} max-w-3xl ${center ? "mx-auto" : ""}`}>
      {kicker && (
        <div className="mb-2 text-xs tracking-widest uppercase text-[#355691]/70 font-semibold">
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
      className="px-4 py-2 rounded-2xl backdrop-blur-xl border border-[#355691]/25 bg-white/60 text-[#0A0A0A] shadow-sm"
    >
      <span className="text-sm font-semibold">{children}</span>
    </motion.div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-[#E9E9EE] bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${className}`}>
      {children}
    </div>
  );
}

function CTAButton({ href, children, variant = "primary" }) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold transition-transform duration-200 active:scale-[0.98]";
  if (variant === "outline") {
    return (
      <a href={href} className={`${base} border border-[#355691]/40 text-[#355691] bg-white/50 backdrop-blur hover:shadow-lg`}>
        {children}
      </a>
    );
  }
  if (variant === "whatsapp") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${base} text-white bg-gradient-to-r from-[#355691] to-emerald-500 shadow-lg hover:shadow-xl`}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={`${base} text-white bg-[#355691] shadow-lg hover:shadow-xl`}>
      {children}
    </a>
  );
}

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E9E9EE] rounded-2xl bg-white/70 backdrop-blur">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4"
      >
        <span className="text-left font-semibold text-[#0A0A0A]">{q}</span>
        <span
          className={`inline-block w-6 h-6 rounded-full border border-[#355691] text-[#355691] grid place-items-center transition-transform ${
            open ? "rotate-45" : ""
          }`}
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
  // Build two columns with duplicated images for infinite scroll illusion
  const colA = useMemo(() => [...BG_IMAGES, ...BG_IMAGES], []);
  const colB = useMemo(() => [...BG_IMAGES.slice().reverse(), ...BG_IMAGES.slice().reverse()], []);
  return (
    <div className="relative w-full overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 h-[120vh] md:h-[140vh]">
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

export default function LandingPagePlanoTrimestral() {
  const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    "Oi! Quero saber mais sobre o Plano Trimestral da loja virtual."
  )}`;

  return (
    <div className="min-h-screen w-full bg-white text-[#0A0A0A] selection:bg-[#355691]/20">
      <GlobalStyles />

      {/* Background floating imagery – low opacity */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.08] hidden md:block" aria-hidden>
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

      {/* HERO */}
      <section id="hero" className="relative flex items-center min-h-[92vh] py-20">
        <Container className="relative">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0A0A0A]"
            >
              Enquanto as ruas estão em reforma, seu negócio pode continuar crescendo.
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
              <CTAButton href="#plano">Ver Plano</CTAButton>
              <CTAButton href="#exemplos" variant="outline">Ver Exemplos</CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[#355691]/30 bg-white/60 backdrop-blur"
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-[#355691]">Plano Trimestral • Suporte Local</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Indicadores */}
      <section id="indicadores" className="py-14">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              "Entrega em até 7 dias úteis",
              "Suporte local",
              "Até 500 produtos",
              "Marketing mensal incluso",
              "Painel simples e intuitivo",
            ].map((txt, i) => (
              <Chip key={i}>{txt}</Chip>
            ))}
          </div>
        </Container>
      </section>

      {/* Problema x Solução */}
      <section id="problema-solucao" className="py-20">
        <Container>
          <SectionTitle
            kicker="💡 Problema x Solução"
            title={""}
            description={null}
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                q: "Buracos e obras atrapalhando o acesso?",
                a: "Na loja virtual, o cliente entra com um clique, sem sair de casa.",
              },
              { q: "Choveu e ninguém saiu?", a: "A loja online continua aberta 24h — e o cliente recebe em casa." },
              { q: "Pouco movimento na rua?", a: "No digital, o fluxo é constante: você aparece para quem procura pelos seus produtos." },
              { q: "Contas chegando e vendas caindo?", a: "Acompanhe em tempo real: pedidos, pagamentos e clientes, direto do seu painel." },
              { q: "Não sabe mais pra quem pedir ajuda?", a: "Suporte direto e presencial — nada de atendimento automático." },
              { q: "Natal chegando e o movimento não ajuda?", a: "Sua loja virtual garante que os produtos sejam vistos, mesmo com o centro vazio." },
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
          <GlassCard className="p-8 md:p-10 mx-auto max-w-3xl border-[#355691]/30">
            <div className="text-center">
              <div className="text-xs tracking-widest uppercase text-[#355691]/80 font-semibold">
                💼 Plano Trimestral
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black">
                Plano disponível (Trimestral) — pagamento mensal
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
              kicker="🧩 Inclusos no Plano"
              title="Tudo o que está incluso no Plano Trimestral"
              description="Transparência total do que você recebe: estrutura, painel, design, marketing, suporte e condições."
            />
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  h: "Entrega e contrato",
                  t: "Loja entregue em até 7 dias úteis; pagamento mensal; contrato trimestral com renovação opcional.",
                },
                {
                  h: "Estrutura da loja",
                  t: "Até 500 produtos; meios de pagamento e fretes configurados; domínio; loja responsiva; SSL e SEO básicos; integração com Google e Meta.",
                },
                {
                  h: "Painel de controle",
                  t: "Acompanhe vendas, pedidos, entregas; veja clientes e histórico; edite produtos, preços e promoções; alertas de estoque.",
                },
                {
                  h: "Design e atualizações",
                  t: "Banners e destaques mensais; ajustes de vitrines; identidade sazonal.",
                },
                {
                  h: "Marketing mensal",
                  t: "Planejamento de conteúdo; artes para feed e stories; campanhas locais; apoio via WhatsApp, Instagram e Google.",
                },
                {
                  h: "Treinamento e suporte",
                  t: "Treinamento presencial; suporte local; acompanhamento e relatório mensal.",
                },
              ].map((it, i) => (
                <div key={i} className="p-6 rounded-3xl border border-[#E9E9EE] bg-white/70 backdrop-blur-xl">
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
          <SectionTitle center kicker="🛍️ Exemplos Reais" title="Exemplo de lojas criadas" description={"Imagens com vitrines e banners personalizados."} />
        </Container>
        <div className="mt-10">
          <VerticalShowcase />
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-24">
        <Container>
          <SectionTitle kicker="🧠 Como Funciona" title="" description={null} />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { n: "1. Briefing", d: "Coletamos informações e identidade da sua marca." },
              { n: "2. Criação e entrega", d: "Em até 7 dias úteis, sua loja está pronta e funcionando." },
              { n: "3. Treinamento", d: "Você aprende a gerenciar o painel e acompanhar as vendas." },
              { n: "4. Acompanhamento", d: "Mensalmente, você recebe melhorias, banners e sugestões de ações." },
            ].map((it, i) => (
              <GlassCard key={i} className="p-6 text-center">
                <div className="mx-auto w-10 h-10 grid place-items-center rounded-full bg-[#355691]/10 text-[#355691] font-black">
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
          <SectionTitle kicker="❓ Perguntas Frequentes" title="" description={null} />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sobre a loja virtual */}
            <div className="space-y-4">
              <div className="text-sm font-black tracking-wider uppercase text-[#355691]/80">Sobre a loja virtual</div>
              {[
                "Em quanto tempo minha loja fica pronta?",
                "Posso cadastrar meus próprios produtos depois?",
                "Quantos produtos posso ter?",
                "Posso acompanhar vendas e pedidos?",
                "Minha loja funciona bem no celular?",
              ].map((q, i) => (
                <AccordionItem key={i} q={q} a="Sim. Nossa implementação garante essas capacidades conforme descrito na página." />
              ))}
            </div>

            {/* Pagamentos e contrato */}
            <div className="space-y-4">
              <div className="text-sm font-black tracking-wider uppercase text-[#355691]/80">Pagamentos e contrato</div>
              {[
                "O plano trimestral é pago à vista?",
                "Domínio e hospedagem estão inclusos?",
                "Preciso pagar algo extra à plataforma?",
                "Posso cancelar antes dos 3 meses?",
                "O suporte tem custo adicional?",
              ].map((q, i) => (
                <AccordionItem key={i} q={q} a="Detalhes comerciais são esclarecidos no momento da contratação e nos termos do plano." />
              ))}
            </div>

            {/* Design e marketing */}
            <div className="space-y-4">
              <div className="text-sm font-black tracking-wider uppercase text-[#355691]/80">Design e marketing</div>
              {[
                "O layout da loja é padrão?",
                "Posso mudar banners e fotos depois?",
                "O que inclui o planejamento de marketing?",
                "Vocês entregam as artes para Instagram?",
                "A loja aparece no Google e no Instagram Shopping?",
              ].map((q, i) => (
                <AccordionItem key={i} q={q} a="Sim, conforme descrito nos tópicos de Design & Marketing e integrações." />
              ))}
            </div>

            {/* Suporte e treinamento */}
            <div className="space-y-4">
              <div className="text-sm font-black tracking-wider uppercase text-[#355691]/80">Suporte e treinamento</div>
              {[
                "Como é feito o treinamento?",
                "Como funciona o suporte no dia a dia?",
                "Vocês ajudam em campanhas sazonais (ex.: Natal)?",
                "Se houver algum erro na loja, quem resolve?",
                "Depois dos 3 meses, posso continuar com o mesmo plano?",
              ].map((q, i) => (
                <AccordionItem key={i} q={q} a="Sim, com suporte local, acompanhamento e possibilidade de continuidade do plano." />
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
              Sua loja pronta. Seu negócio vendendo.
            </h3>
            <p className="mt-3 text-neutral-700">
              Fale conosco agora e veja sua loja no ar em até 7 dias úteis.
            </p>
            <div className="mt-6 flex justify-center">
              <CTAButton href={waLink} variant="whatsapp">Falar no WhatsApp</CTAButton>
            </div>
          </GlassCard>
        </Container>
      </section>

      {/* Footer enxuto */}
      <footer className="py-10 border-t border-[#E9E9EE] text-center text-xs text-neutral-500">
        <Container>
          Plano Trimestral • Suporte Local • © {new Date().getFullYear()}
        </Container>
      </footer>
    </div>
  );
}
