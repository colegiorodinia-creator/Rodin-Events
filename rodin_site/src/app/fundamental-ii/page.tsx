import SegmentTemplate from '@/components/SegmentTemplate/SegmentTemplate';

export default function FundamentalIIPage() {
  return (
    <SegmentTemplate
      title="Ensino Fundamental II"
      tagline="Um novo ciclo, novas descobertas, novos caminhos."
      author="- Autor desconhecido"
      heroImage="/cursos/fundamental_II_final.png"
      bgPosition="center 30%"
      introSubtitle="Mais do que aprender conteúdos, é tempo de aprender a pensar."
      introText={[
        "No Ensino Fundamental II, os estudantes vivenciam uma etapa de grandes descobertas, desafios e transformações. Em um ambiente acolhedor e desafiador, estimulamos a curiosidade, o pensamento crítico e a autonomia, incentivando cada aluno a questionar, explorar e compreender o mundo ao seu redor.",
        "Nossa proposta une conhecimento, interdisciplinaridade e desenvolvimento humano para fortalecer habilidades acadêmicas e socioemocionais, respeitando a individualidade de cada estudante e preparando-o para os próximos desafios da vida escolar."
      ]}
      galleryImages={[
        "/infraestrutura/Sala de Aula.png",
        "/infraestrutura/Quadra.jpeg",
        "/infraestrutura/Pátio.png"
      ]}
      curriculumImage="/cursos/grade_fundamental_2.jpg"
    />
  );
}