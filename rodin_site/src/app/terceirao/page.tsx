import SegmentTemplate from '@/components/SegmentTemplate/SegmentTemplate';

export default function TerceiraoPage() {
  return (
    <SegmentTemplate
      title="Terceirão"
      tagline="Entre novos desafios e descobertas, conte sempre com a gente."
      author="- Equipe Rodin"
      heroImage="/cursos/terceirao_final.jpg"
      bgPosition="center 40%"
      introSubtitle="Mais do que encerrar um ciclo, é tempo de dar o primeiro passo rumo ao seu futuro."
      introText={[
        "O Terceirão Rodin é vivido com intensidade, dedicação e propósito. É quando os sonhos ganham forma, os desafios fortalecem a confiança e cada conquista aproxima o estudante de seus objetivos. Em um ambiente acolhedor e desafiador, oferecemos uma preparação sólida para o ENEM e os principais vestibulares do país, revisando e aprofundando os conteúdos do Ensino Médio com uma rotina de estudos estruturada, simulados e acompanhamento pedagógico.",
        "Porque acreditamos que mais importante do que chegar à universidade é preparar nossos alunos para seguirem confiantes em qualquer caminho que escolham."
      ]}
      galleryImages={[
        "/infraestrutura/Ar Livre.png",
        "/infraestrutura/Extra.png",
        "/infraestrutura/Bangalô.png"
      ]}
      curriculumImage="/cursos/grade_terceirao.jpg"
    />
  );
}