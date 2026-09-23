import Image from "next/image";
import InstitutionMap from "@/components/InstitutionMap";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  ExternalLink,
  FileText,
  Fingerprint,
  Gavel,
  HeartHandshake,
  Landmark,
  Link2,
  MapPin,
  Scale,
  ShieldAlert,
  Stethoscope,
  Users,
} from "lucide-react";

const rights = [
  [
    "Direito à vida",
    "Art. 4 da Convenção Americana",
    "A Corte reconheceu a responsabilidade internacional pela morte de Damião dentro de uma instituição sob dever de vigilância estatal.",
  ],
  [
    "Integridade pessoal",
    "Art. 5 da Convenção Americana",
    "As condições de violência e abandono violaram a integridade física e psíquica de Damião.",
  ],
  [
    "Garantias judiciais",
    "Art. 8 da Convenção Americana",
    "A investigação e o processo não ofereceram, no tempo devido, uma resposta efetiva à família.",
  ],
  [
    "Proteção judicial",
    "Art. 25 da Convenção Americana",
    "O Estado tinha o dever de assegurar recursos acessíveis, adequados e capazes de produzir Justiça.",
  ],
];

const timeline = [
  [
    "1999",
    "Internação",
    "Damião é internado na Casa de Repouso Guararapes, em Sobral, Ceará.",
  ],
  [
    "4 out. 1999",
    "A morte",
    "É encontrado em condições de violência. Morre no mesmo dia, dentro da instituição.",
  ],
  [
    "2000–2002",
    "A busca por Justiça",
    "A família recorre às instituições brasileiras e ao Sistema Interamericano.",
  ],
  [
    "4 jul. 2006",
    "A sentença",
    "A Corte Interamericana declara o Brasil internacionalmente responsável.",
  ],
];

const groupMembers = [
  "Ana Gabriela",
  "Deise francielly",
  "Erlandia Vanessa ",
  "Maria Letícia ",
  "Mirele Vicente",
];

const sources = [
  {
    institution: "Corte Interamericana de Direitos Humanos",
    title: "Caso Ximenes Lopes vs. Brasil — sentença de 4 de julho de 2006",
    scope:
      "Fonte primária para os fatos do caso, as violações reconhecidas, a responsabilidade do Estado e as medidas de reparação.",
    url: "https://www.corteidh.or.cr/docs/casos/articulos/seriec_149_por.pdf",
  },
  {
    institution: "Planalto",
    title: "Lei nº 10.216, de 6 de abril de 2001",
    scope:
      "Base legal para os direitos das pessoas com transtornos mentais, o cuidado humanizado e a excepcionalidade da internação.",
    url: "https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10216.htm",
  },
  {
    institution: "Conselho Federal de Psicologia",
    title: "Código de Ética Profissional do Psicólogo",
    scope:
      "Referência para os princípios de dignidade, direitos humanos, autonomia e enfrentamento de práticas de violência.",
    url: "https://site.cfp.org.br/wp-content/uploads/2012/07/codigo-de-etica-psicologia.pdf",
  },
  {
    institution: "Ministério da Saúde",
    title: "Rede de Atenção Psicossocial (RAPS)",
    scope:
      "Referência institucional para a organização do cuidado em saúde mental no território e em liberdade.",
    url: "https://www.gov.br/saude/pt-br/composicao/saes/desmad/raps",
  },
  {
    institution: "Escola Nacional de Administração Pública (ENAP)",
    title:
      "Direitos Humanos e Saúde Mental – Curso Permanente Damião Ximenes Lopes",
    scope:
      "Curso gratuito elaborado pelo Ministério dos Direitos Humanos e da Cidadania, criado a partir do caso Damião Ximenes Lopes e da relação entre saúde mental, direitos humanos e cuidado em saúde.",
    url: "https://www.escolavirtual.gov.br/",
  },
];

function SectionHeader({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function PlaceholderPhoto({
  label,
  caption,
}: {
  label: string;
  caption: string;
}) {
  return (
    <figure className="photo-placeholder">
      <div className="photo-inner">
        <Image
          src="/caso_damiao_portao.jpg"
          alt="caso_damiao_portao"
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="placeholder-image"
        />
        <div className="photo-overlay"></div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
function PlaceholderPhoto2({
  label,
  caption,
}: {
  label: string;
  caption: string;
}) {
  return (
    <figure className="photo-placeholder">
      <div className="photo-inner">
        <Image
          src="/Dami-o-Ximenes-3.png"
          alt="Dami-o-Ximenes"
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="placeholder-image"
        />
        <div className="photo-overlay"></div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
function PlaceholderPhoto3({
  label,
  caption,
}: {
  label: string;
  caption: string;
}) {
  return (
    <figure className="photo-placeholder">
      <div className="photo-inner">
        <Image
          src="/torut.png"
          alt="Dami-o-Ximenes"
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="placeholder-image"
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function Page() {
  return (
    <main className="newspaper-shell">
      <header className="masthead">
        <div className="masthead-top">
          <span>EDIÇÃO ESPECIAL · DIREITOS HUMANOS</span>
          <span>ARQUIVO 04 / 07 / 2006</span>
        </div>
        <div className="masthead-title">
          <span className="masthead-mark">ADH</span>
          <div>
            <p>Arquivo dos</p>
            <h1>Direitos Humanos</h1>
          </div>
          <span className="issue">
            Nº 01
            <br />
            CEARÁ · BRASIL
          </span>
        </div>
        <nav aria-label="Navegação da reportagem" className="newspaper-nav">
          <a href="#historia">A história</a>
          <a href="#violacoes">Direitos violados</a>
          <a href="#corte">A sentença</a>
          <a href="#legado">O legado</a>
          <a href="#fontes">Fontes</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="headline">
        <div className="hero-copy">
          <p className="kicker">
            <CalendarDays aria-hidden="true" /> 04 DE JULHO DE 2006 · CORTE
            INTERAMERICANA
          </p>
          <h2 id="headline">
            CASO DAMIÃO
            <br />
            <em>XIMENES LOPES</em>
            <br />
            VS. BRASIL
          </h2>
          <div className="headline-rule" />
          <p className="hero-dek">
            A primeira condenação internacional do Brasil na Corte
            Interamericana de Direitos Humanos.
          </p>
          <p className="hero-intro">
            Um marco na proteção dos direitos das pessoas com transtornos
            mentais e na luta contra a violência institucional.
          </p>
          <a className="continue" href="#historia">
            Reconstruir o caso <ArrowDown aria-hidden="true" />
          </a>
        </div>
        <div className="hero-evidence">
          <PlaceholderPhoto
            label="FOTOGRAFIA NÃO FORNECIDA"
            caption="Imagem histórica de Damião Ximenes Lopes."
          />
          <div className="stamp">
            MARCO
            <br />
            HISTÓRICO
          </div>
        </div>
      </section>

      <div className="board-intro">
        <span className="pin" />
        <p>
          Uma investigação documental sobre memória, cuidado e responsabilidade.{" "}
          <strong>
            As linhas vermelhas conectam fatos — não substituem as fontes.
          </strong>
        </p>
      </div>

      <section id="historia" className="story-grid section-block">
        <div>
          <SectionHeader
            number="01"
            eyebrow="A pessoa por trás do processo"
            title="Quem foi Damião?"
          />
          <p>
            Damião Ximenes Lopes era um homem cearense, com transtorno mental,
            cuja vida estava ligada à sua família e à comunidade de Sobral. Em
            outubro de 1999, foi internado na Casa de Repouso Guararapes.
          </p>
          <p>
            Humanizar Damião é recusar que ele seja lembrado apenas como vítima
            ou número de processo. Antes da sentença, havia uma pessoa com
            história, vínculos, desejos e direitos — direitos que não
            desaparecem quando alguém precisa de cuidado em saúde mental.
          </p>
          <div className="bio-file">
            <div className="file-label">FICHA DE ARQUIVO · 001</div>
            <div className="file-row">
              <MapPin aria-hidden="true" />
              <span>
                <b>Território</b> Sobral, Ceará
              </span>
            </div>
            <div className="file-row">
              <Users aria-hidden="true" />
              <span>
                <b>Vínculos</b> família e comunidade
              </span>
            </div>
            <div className="file-row">
              <HeartHandshake aria-hidden="true" />
              <span>
                <b>Princípio</b> cuidado com dignidade
              </span>
            </div>
          </div>
        </div>
        <PlaceholderPhoto2
          label="ARQUIVO BIOGRÁFICO"
          caption="Damião Ximenes Lopes foi uma figura central em um dos casos mais marcantes da história dos direitos humanos no Brasil."
        />
      </section>

      <section className="section-block chronology">
        <SectionHeader
          number="02"
          eyebrow="A sequência documentada"
          title="O que aconteceu?"
        />
        <p className="lead">
          Os registros do processo revelaram um cenário de abandono, contenção
          violenta, maus-tratos e ausência de cuidados compatíveis com a
          dignidade humana.
        </p>
        <div className="timeline">
          {timeline.map(([date, title, text]) => (
            <div className="timeline-item" key={date}>
              <span className="timeline-date">{date}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="torture-section section-block">
        <div className="torture-heading">
          <ShieldAlert aria-hidden="true" />
          <div>
            <p className="eyebrow">EVIDÊNCIA CENTRAL</p>
            <h2>Um estado de tortura</h2>
          </div>
        </div>
        <div className="torture-content">
          <div>
            <p>
              O termo aparece na análise da Corte para descrever o conjunto de
              condições e sofrimentos a que Damião foi submetido. Não se trata
              de uma imagem isolada: trata-se de uma responsabilidade
              institucional que precisa ser compreendida sem transformar o
              sofrimento em espetáculo.
            </p>
            <div className="content-warning">
              <span>AVISO DE CONTEÚDO</span>
              <p>Esta seção aborda violência e maus-tratos.</p>
            </div>
          </div>
          <PlaceholderPhoto3 label="FOTOGRAFIA " caption="" />
        </div>
      </section>

      <InstitutionMap />

      <section id="violacoes" className="section-block">
        <SectionHeader
          number="03"
          eyebrow="O documento jurídico"
          title="Quais direitos foram violados?"
        />
        <p className="lead">
          A sentença distinguiu os direitos de Damião dos direitos reconhecidos
          aos seus familiares. Cada violação exige uma resposta pública, não
          apenas uma lembrança privada.
        </p>
        <div className="rights-grid">
          {rights.map(([title, article, text]) => (
            <article className="document-card" key={title}>
              <div className="document-top">
                <span>DOC. 2006 / {title.slice(0, 3).toUpperCase()}</span>
                <Scale aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p className="article-ref">{article}</p>
              <p>{text}</p>
              <div className="document-check">
                <Check aria-hidden="true" /> violação reconhecida
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="two-column section-block">
        <div>
          <SectionHeader
            number="04"
            eyebrow="Depois da violência"
            title="Consequências que permanecem"
          />
          <p>
            A institucionalização violenta pode produzir perda de autonomia,
            isolamento, estigma, medo e rompimento de vínculos. Na Psicologia,
            essas são consequências gerais reconhecidas de práticas
            desumanizadas — não diagnósticos retrospectivos sobre Damião.
          </p>
          <p>
            Para familiares, a ausência de respostas efetivas também pode gerar
            sofrimento, insegurança e desconfiança das instituições responsáveis
            pelo cuidado e pela Justiça.
          </p>
        </div>
        <aside className="quote-note">
          <span className="hand-label">ANOTAÇÃO DE CAMPO</span>
          <p>“Cuidar não é controlar. Proteger não é silenciar.”</p>
          <small>Princípio ético para práticas em saúde mental</small>
        </aside>
      </section>

      <section className="responsibility section-block">
        <SectionHeader
          number="05"
          eyebrow="Dever de proteger"
          title="Instituição e Estado"
        />
        <div className="responsibility-grid">
          <div className="institution-card">
            <Stethoscope aria-hidden="true" />
            <h3>A instituição</h3>
            <p>
              Prestava um serviço público de saúde. O cuidado deveria preservar
              a vida, a integridade e a dignidade das pessoas internadas.
            </p>
          </div>
          <ArrowRight className="flow-arrow" aria-hidden="true" />
          <div className="institution-card dark-card">
            <Landmark aria-hidden="true" />
            <h3>O Estado</h3>
            <p>
              Mesmo quando um serviço é executado por instituição privada ou
              conveniada, permanece o dever de fiscalizar, prevenir, investigar
              e reparar.
            </p>
          </div>
        </div>
      </section>

      <section id="corte" className="court-section section-block">
        <div className="court-copy">
          <SectionHeader
            number="06"
            eyebrow="A resposta internacional"
            title="A Justiça atravessa fronteiras"
          />
          <p>
            A família buscou respostas no Brasil e, diante da ausência de uma
            resposta judicial efetiva, o caso chegou ao Sistema Interamericano.
            A Comissão Interamericana encaminhou a demanda à Corte.
          </p>
          <p>
            Em 4 de julho de 2006, a Corte declarou o Brasil internacionalmente
            responsável e determinou medidas de reparação, investigação e não
            repetição.
          </p>
          <div className="court-stamp">
            BRASIL
            <br />
            <strong>RESPONSABILIZADO</strong>
            <br />
            INTERNACIONALMENTE · 2006
          </div>
        </div>
        <div className="official-document">
          <div className="doc-seal">
            C<br />
            <small>IDH</small>
          </div>
          <p className="doc-title">
            CORTE INTERAMERICANA
            <br />
            DE DIREITOS HUMANOS
          </p>
          <div className="doc-lines" />
          <p>
            CASO XIMENES LOPES
            <br />
            VS. BRASIL
          </p>
          <span className="doc-date">SENTENÇA · 04.07.2006</span>
          <Gavel aria-hidden="true" />
        </div>
      </section>

      <section className="section-block psychology-grid">
        <div>
          <SectionHeader
            number="07"
            eyebrow="Cuidado e compromisso"
            title="O papel da Psicologia"
          />
          <p>
            A Psicologia tem compromisso ético com a dignidade, a escuta
            qualificada e a defesa dos direitos humanos. Isso inclui denunciar
            abusos, promover autonomia, trabalhar em equipe e recusar práticas
            de controle, punição ou silenciamento.
          </p>
          <div className="principles">
            {[
              "Escuta qualificada",
              "Cuidado em liberdade",
              "Autonomia",
              "Atuação interdisciplinar",
              "Combate à tortura",
              "Transformação institucional",
            ].map((item) => (
              <span key={item}>
                <Link2 aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="marginal-note">
          <span>LEIA NAS ENTRELINHAS</span>
          <p>
            O profissional não é um agente neutro diante da violência
            institucional. Seu trabalho pode registrar, interromper e
            transformar práticas.
          </p>
        </div>
      </section>

      <section className="reform-section section-block">
        <div className="law-number">
          10.216
          <br />
          <small>/ 2001</small>
        </div>
        <div>
          <SectionHeader
            number="08"
            eyebrow="A mudança de paradigma"
            title="Reforma Psiquiátrica"
          />
          <p>
            A Lei nº 10.216/2001 protege os direitos das pessoas em sofrimento
            mental, prioriza serviços comunitários, prevê tratamento humanizado
            e estabelece a internação como medida excepcional. Seus princípios
            apontam para a reinserção social e o cuidado em liberdade, com a
            rede de atenção psicossocial.
          </p>
          <p>
            A lei é anterior à sentença de 2006. O caso não a criou, mas
            reforçou a urgência de aplicar efetivamente seus princípios e
            substituir o modelo manicomial por práticas de cuidado dignas.
          </p>
          <p>
            Esse legado também se transforma em formação continuada. A ENAP
            oferece gratuitamente o curso “Direitos Humanos e Saúde Mental –
            Curso Permanente Damião Ximenes Lopes”, elaborado pelo Ministério
            dos Direitos Humanos e da Cidadania a partir do caso e da relação
            entre saúde mental, direitos humanos e cuidado em saúde.
          </p>
        </div>
      </section>

      <section id="legado" className="legacy section-block">
        <SectionHeader
          number="09"
          eyebrow="O que fica"
          title="Um legado ainda em construção"
        />
        <div className="legacy-list">
          <p>
            <b>01</b> Maior visibilidade internacional para a violência
            psiquiátrica.
          </p>
          <p>
            <b>02</b> Reforço do dever de fiscalização estatal sobre serviços de
            saúde.
          </p>
          <p>
            <b>03</b> Reconhecimento da vulnerabilidade de pessoas
            institucionalizadas.
          </p>
          <p>
            <b>04</b> Necessidade permanente de investigações efetivas e cuidado
            humanizado.
          </p>
        </div>
        <p className="lead">
          O julgamento é uma referência jurídica e acadêmica. Não significa que
          todos os problemas foram resolvidos: a defesa do cuidado digno e em
          liberdade continua sendo uma tarefa coletiva.
        </p>
      </section>

      <section className="reflection section-block">
        <SectionHeader
          number="10"
          eyebrow="Para a Psicologia Jurídica hoje"
          title="Que tipo de cuidado a Justiça reconhece?"
        />
        <div className="questions">
          <span>Como ouvir vítimas e familiares de maneira ética?</span>
          <span>Como identificar a violência institucional?</span>
          <span>Como produzir documentos sem reforçar preconceitos?</span>
          <span>Como equilibrar proteção, autonomia e responsabilidade?</span>
        </div>
        <blockquote>
          Quando o cuidado perde a humanidade, a instituição deixa de proteger e
          passa a produzir violência.
          <cite>— reflexão editorial deste arquivo</cite>
        </blockquote>
      </section>

      <section id="fontes" className="sources section-block">
        <SectionHeader
          number="11"
          eyebrow="Transparência da pesquisa"
          title="Fontes consultadas"
        />
        <p className="lead">
          Esta reportagem educativa foi construída a partir dos documentos
          abaixo. A sentença da Corte Interamericana é a fonte principal para os
          fatos e para as conclusões jurídicas do caso.
        </p>
        <ol className="sources-list">
          {sources.map((source, index) => (
            <li key={source.url}>
              <span className="source-number">[{index + 1}]</span>
              <div>
                <p className="source-institution">{source.institution}</p>
                <h3>{source.title}</h3>
                <p>{source.scope}</p>
                <a href={source.url} target="_blank" rel="noreferrer">
                  Acessar documento <ExternalLink aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="group">
        <div className="footer-heading">
          <Users aria-hidden="true" />
          <div>
            <p className="eyebrow">NOSSO GRUPO</p>
            <h2>Integrantes do grupo</h2>
            <p>
              Trabalho desenvolvido para a disciplina de Psicologia Jurídica da
              Faculdade Nova Roma.
            </p>
          </div>
        </div>
        <ul className="group-list">
          {groupMembers.map((name) => (
            <li key={name}>
              <strong>{name}</strong>
            </li>
          ))}
        </ul>
        <div className="footer-bottom">
          <span>ARQUIVO DOS DIREITOS HUMANOS · EDIÇÃO EDUCATIVA</span>
          <span>Desenolvido por Lailton Xavier</span>
        </div>
      </footer>
    </main>
  );
}
