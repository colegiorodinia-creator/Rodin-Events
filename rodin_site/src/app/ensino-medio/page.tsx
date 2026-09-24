import SegmentTemplate from '@/components/SegmentTemplate/SegmentTemplate';

export default function EnsinoMedioPage() {
  return (
    <SegmentTemplate
      title="Ensino Médio (1ª e 2ª Séries)"
      tagline="Um novo ciclo, novas descobertas, novos caminhos."
      author="- Autor desconhecido"
      heroImage="/cursos/ensino_medio_final.png"
      introSubtitle="Mais do que acumular conhecimento, é tempo de construir o próprio caminho."
      introText={[
        "No Ensino Médio, os estudantes vivenciam uma fase de amadurecimento, escolhas e novas possibilidades. Em um ambiente acolhedor e desafiador, incentivamos o aprofundamento do conhecimento, o desenvolvimento da autonomia e do pensamento crítico, preparando cada aluno para os desafios acadêmicos e para as decisões que irão moldar seu futuro.",
        "Nossa proposta integra uma formação sólida, experiências significativas e o desenvolvimento humano, respeitando a individualidade de cada estudante e fortalecendo a confiança necessária para enfrentar o ENEM, os vestibulares e os próximos passos de sua trajetória."
      ]}
      galleryImages={[
        "/infraestrutura/Galeria dos Pensadores.png",
        "/infraestrutura/Pátio II.png",
        "/infraestrutura/hall_pedagogico.png"
      ]}
      curriculumImage="/cursos/grade_ensino_medio.jpg"
    />
  );
}