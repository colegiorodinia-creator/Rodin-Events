const fs = require('fs');

const rawData = `Nome	Cargo	Formação
Benê	Diretor Pedagógico 	Graduado em Biologia, Psicologia e Pedagogia, mestre em Psicologia pela UNIFESP e MBA em Trends & Innovation pela ESAMC, trabalha há 31 anos como professor e atua há 16 anos como Diretor e Coordenador de Educação Básica e Pré-Vestibular.
Ricardo	Professor e Orientador Pedagógico	Graduado em História pela UNESP, pós-graduado em Psicopedagogia e com MBA em Gestão de Marketing, atua há 14 anos como professor de Educação Básica e Pré-Vestibular.
Emerson	Professor e Orientador Pedagógico	Graduado em História pelo CEUNSP e bacharel em Teologia, com pós-graduação em Neurociência e Aprendizagem pela USP. O Professor Emerson possui dez anos de experiência na educação básica, atuando também como Orientador Educacional. Sua formação complementar inclui história da arte e estudos culturais.
Alberto	Professor	Formação a definir
Alice	Professora	Graduada em Educação Física e Motricidade Humana pela UFSCar, com pós-graduação em Dança e Expressão Corporal. Professora Alice é bailarina profissional e instrutora de Pilates pelo método original, com formação em ballet clássico, dança contemporânea, jazz e hip-hop. 
Aline	Professora	Graduada em Química e Mestre em Ensino de Ciências pela UNICAMP. Professora Aline leciona Química no ensino médio, técnico e pré-vestibular, com experiência desde 2013.
Altair	Professor	Graduado em Matemática Pura pela Unesp de Rio Claro. O Professor Altair possui especialização em Educação Matemática e mestrado pela UFSCar. Ele contribui com excelência no ensino da Matemática, unindo uma sólida formação acadêmica ao aprofundamento na prática pedagógica.
André Oka	Professor	Graduado em Ciências Biológicas pela UNICASTELO, com licenciatura plena, possui pós-graduação em Ciências Ambientais pela Universidade São Francisco e em Neuroaprendizagem, Psicomotricidade e Cognição pelo Instituto Saber, além de licenciatura em Pedagogia pela Universidade Nove de Julho. Atua há 31 anos como professor de Ciências e Biologia no Ensino Médio e Pré-Vestibular.
Bruno	Professor	Formação a definir
Carla	Professora	Graduada em Matemática pela Universidade Federal de Pelotas. Professora Carla possui especializações em Educação Matemática pela Unicamp e em Inovações no Ensino da Matemática pela Unicesumar. Ela acumula ampla experiência no ensino de Matemática para turmas do Fundamental II e Ensino Médio, incluindo cursos preparatórios, pré-vestibulares e aulas particulares.
Carlos Cesar	Professor	Graduado em Letras pela Unesp de Assis, o Professor Carlos César de Oliveira atua há mais de vinte anos no ensino de Língua Portuguesa e Espanhol. Ele possui ampla experiência no Ensino Fundamental II, Ensino Médio e plantões de apoio linguístico. Sua trajetória inclui o trabalho como professor e coordenador pedagógico, contribuindo também com a organização de projetos e formações docentes.
Carlos Dias	Professor	Graduado em Matemática e bacharel em Matemática Aplicada, com mestrado pela UNICAMP. O Professor Carlos Henrique Dias possui mais de duas décadas de experiência no ensino básico e superior, com especialização em metodologias de ensino. Sua atuação inclui a produção de materiais didáticos e coordenação de projetos de nivelamento, com foco na matemática aplicada.
Ciro	Professor	Licenciado em Letras pela Universidade Estadual de Campinas (Unicamp) e atua no ensino de Gramática, Leitura, Redação, Literatura e Língua Inglesa. Integra o corpo docente do Colégio Rodin, onde leciona para turmas do Ensino Fundamental II e Ensino Médio.
Daniela Paraíso	Professora	Graduada em Letras e Pedagogia, com pós-graduação em Alfabetização e Letramento. Atua há 16 anos na área da Educação, com experiência nos anos iniciais e finais do Ensino Fundamental. Possui vivência em currículo internacional e em processos de alfabetização em segunda língua. Realizou intercâmbios internacionais voltados às diferentes perspectivas pedagógicas, buscando conhecer novas abordagens educacionais para a prática em sala de aula.
Danielle	Professora	Graduada em Ciências Biológicas pelo CEUNSP e possui formação técnica em Meio Ambiente. Professora Danielle leciona Ciências Aplicadas ao Cotidiano e é responsável pela organização de projetos da Feira de Ciências. Ela atua na área há nove anos, aplicando sua experiência em análises públicas em sua prática docente.
Diego	Professor	Graduado em Matemática pela UTFPR. O Professor Diego atua no ensino de Matemática e coordenou as Olimpíadas Científicas em sua instituição, fortalecendo o desempenho acadêmico e o engajamento dos estudantes.
Evandro	Professor	Graduado em Geografia, História, Matemática e Pedagogia. O Professor Evandro possui uma formação acadêmica abrangente e multidisciplinar, que reflete versatilidade e aprofundamento no trabalho educativo em diversas áreas.
Evelyn	Professora	Formação a definir
Fabiano	Professor	Graduado em Letras pela UNICAMP e mestrando em Linguística Aplicada. Especialista em Língua Portuguesa, Redação e Gramática, o Professor Fabiano acumula mais de 20 anos de atuação em escolas e cursinhos. Ele possui ampla experiência como corretor de vestibulares e atua como formador em oficinas de redação, com foco no desenvolvimento da escrita crítica e consciente.
Gabriel Vinícius	Professor	Graduando em Bacharelado em Educação Física pela Unimax – Grupo Unieduk, e formado em Licenciatura em Educação Física pela mesma instituição, concluída em dezembro de 2024. Possui formação voltada tanto para a atuação escolar quanto para o desenvolvimento técnico e físico, unindo base pedagógica, preparo prático e compromisso com a promoção de hábitos saudáveis e do desenvolvimento integral dos alunos.
Giulia	Professora	Formação a definir
Guilherme	Professor	Graduado em Letras pelo IEL/UNICAMP, o Professor Guilherme atua há mais de 15 anos no ensino de Literatura, com foco na preparação de estudantes para vestibulares e ENEM. É autor de publicações acadêmicas e do livro Aronó (2023), além de possuir fluência em inglês.
Guilherme Treinador	Professor	Formação a definir
José	Professor	Graduado em Física pela UNICAMP, atua há 23 anos como professor de Educação Básica e Pré-Vestibular. É autor de livros didáticos da Editora Harbra.
João	Professor	Graduado em áreas administrativas, cursando atualmente Educação Física. O Professor João Pedro possui experiência em criação de materiais e vivência em projetos, comunicação e produção de conteúdo. Sua formação artística em teatro contribui para uma atuação dinâmica e criativa em sala de aula.
Juliana	Professora	Graduada em Psicologia, Pedagogia e Letras, com Mestrado em Tecnologias Emergentes em Educação. Professora Juliana leciona inglês há 27 anos, atuando no Ensino Fundamental e Ensino Médio. Paralelamente, ela é Psicóloga e Psicanalista Clínica, tendo se especializado em Psicanálise Clínica e Logoterapia.
Kaique	Professor	Graduado em Geografia pela UNICAMP (2018). O Professor Kaique atua no Ensino Fundamental II, Ensino Médio e cursos preparatórios. Ele possui experiência em Iniciação Científica, bolsas de apoio didático em Biogeografia e Cartografia Sistemática, e trabalhou com diversos sistemas apostilados renomados. É fluente em Inglês e Espanhol em nível intermediário.
Karen	Professora	Graduada em Letras – Português pela UNICAMP (2015), com Mestrado em 2020. Professora Karen leciona Português, Gramática, Redação e Literatura do Ensino Fundamental II ao Ensino Médio. Possui fluência em inglês e ampla experiência como corretora de redações para vestibulares. Ela demonstra domínio de ferramentas para ensino híbrido e metodologias ativas.
Kauana	Professor(a)	Formação a definir
Luana	Professora	Graduada em Ciências Biológicas pela UFSCar. Professora Luana cursa especialização em Biotecnologia e pós-graduação em Supervisão e Orientação Educacional. Ela possui experiência no ensino de Biologia e Química, além de atuar na orientação educacional no Ensino Médio.
Lucas	Professor	Graduado em Geografia (Bacharelado e Licenciatura) pela UNICAMP, com Mestrado na mesma área. O Professor Lucas está cursando Doutorado em Geografia e realizou Doutorado Sanduíche na Università di Bologna, na Itália. Ele leciona Geografia no Ensino Médio e curso pré-vestibular. Foi reconhecido com o Prêmio CREA-SP Formação Profissional em 2015 e possui qualificações em Língua Italiana e curso de Inglês.
Márcia	Professora	Graduada em Artes Visuais e possui especialização em Psicopedagogia. Professora Márcia é ilustradora com exposições no Brasil e no exterior e tem mais de 30 anos de atuação no teatro amador. Ela aplica sua vasta formação em diferentes técnicas artísticas em sua prática.
Marcio	Professor	Graduado em Matemática (Licenciatura Plena) pela UNESP (1998). O Professor Marcio é um profissional com vasta experiência no Ensino Médio e em cursos pré-vestibulares. Sua trajetória inclui atuação em grandes redes de ensino e cursinhos preparatórios.
Marcos Bet	Professor	Graduado em Química pela USP (1992), com Mestrado e Doutorado em Química Analítica pela USP, e Pós-doutoramento em Bioengenharia pela UFSCAR. O Professor Marcos é Doutor e leciona Química no Ensino Médio e curso pré-vestibular. Ele atua também no Ensino Superior como professor de Química Geral e Ciência dos Materiais, sendo premiado diversas vezes como Melhor Professor em cursos de Engenharia.
Monique	Professora	Graduada em Pedagogia pela UFSCar, com pós-graduação em Neuropsicopedagogia. Professora Monique atua há nove anos na área da educação, desenvolvendo práticas pedagógicas centradas no desenvolvimento cognitivo e emocional dos estudantes.
Mário	Professor	Graduado em Geografia pela UNESP (2003). O Professor José Mário possui experiência na docência de Geografia, História, Sociologia e Atualidades nos Ensinos Fundamental, Médio e em cursos pré-vestibulares. Ele é fluente em Inglês e possui conhecimentos avançados em informática, tendo se dedicado também a atividades e cursos de aperfeiçoamento profissional em questão agrária e cultura ambiental.
Pavani	Professor	Graduado, Mestre e Doutor em História pela Unicamp. O Professor Rafael combina rigor acadêmico, pesquisa e compromisso com a formação crítica dos alunos. Ele possui experiência na Comvest e na autoria de materiais didáticos.
Pavarina	Professor	Graduado em Educação Física pela PUC-Campinas e também formado em Pedagogia. O Professor Carlos possui especializações em Fisiologia do Exercício pela Unifesp e em Didática e Metodologia do Ensino Superior. Ele reúne o aprofundamento técnico em sua área com a experiência pedagógica em sua atuação.
Prof. Carlos	Professor(a)	Formação a definir
Rafael	Professor	Graduado em Ciências Sociais (Bacharelado e Licenciatura) pela UFSCar e UNESP, e está em fase de conclusão da Licenciatura em Geografia pela UNICAMP. O Professor Rafael possui experiência na docência de Filosofia, Sociologia e Geografia no Ensino Médio e Pré-Vestibular.
Renata Castro	Professora	Graduada em Pedagogia pela PUC-Campinas. Professora Renata possui seis anos de experiência como professora bilíngue. Ela é pós-graduanda em Psicanálise Clínica e integra sensibilidade educativa e compreensão emocional em sua prática docente.
Rita	Professora	Graduada em Letras pela Universidade Estadual de Maringá/PR (2003) e em Pedagogia, com Pós-Graduação em Neuropsicopedagogia e Língua Portuguesa e Literatura. Professora Rita possui 24 anos de experiência no Ensino Fundamental e Médio, além de ter lecionado em cursos pré-vestibulares.
Samarina	Professora	Graduada em Ciências Biológicas pela Unesp, com formação em Psicopedagogia pela USC Bauru e graduanda em Ciências Sociais. Professora Samarina atua reunindo múltiplas perspectivas sobre sociedade, aprendizagem e ciência em sua prática pedagógica.
Tati Fadel	Professora	Graduada em Letras pela UNICAMP (1996), com Mestrado em Educação. Professora Tatiana leciona Redação, Literatura e Gramática, com experiência na rede privada desde 1993. Ela é altamente qualificada na área de avaliação de escrita para vestibulares (UNICAMP, ENEM, Vunesp) e atuou na elaboração de material didático.
Thiago	Professor	Cursou Biologia na UNICAMP e atua desde 2001 como professor de Educação Básica e Pré-Vestibular. É especialista em Criopreservação de Embriões e autor da Editora Fiocruz.
Thomas	Professor(a)	Formação a definir
Valeska	Professora	Graduada em Letras pela UFJF, com licenciaturas em Língua Inglesa, Literatura Inglesa, Literatura Norte-Americana e Língua Portuguesa. Professora Valeska possui mais de 30 anos de experiência no ensino de inglês, além de ser pós-graduada em Recursos Humanos pela FGV.
Vanessa Evelyn	Professor(a)	Formação a definir`;

const lines = rawData.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('Nome'));

const pastedProfessors = lines.map(line => {
  const parts = line.split('\t');
  if (parts.length >= 3) {
    return {
      name: parts[0].trim(),
      role: parts[1].trim(),
      formation: parts[2].trim()
    };
  }
  return null;
}).filter(Boolean);

const teamContent = fs.readFileSync('./src/data/teamData.ts', 'utf8');
let teamData = JSON.parse(teamContent.replace('export const teamData = ', '').replace(/;$/, ''));

function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

teamData.forEach(p => {
  const pNorm = normalize(p.name);
  let bestMatch = pastedProfessors.find(pst => normalize(pst.name) === pNorm);
  
  if (!bestMatch) {
    bestMatch = pastedProfessors.find(pst => {
        const pstNorm = normalize(pst.name);
        return pNorm.includes(pstNorm) || pstNorm.includes(pNorm);
    });
  }

  if (bestMatch) {
    p.role = bestMatch.role;
    p.formation = bestMatch.formation;
    
    if (p.name !== 'Benedito') { 
        p.name = bestMatch.name; 
    } else {
        p.name = 'Benê';
    }
  }
});

fs.writeFileSync('./src/data/teamData.ts', 'export const teamData = ' + JSON.stringify(teamData, null, 2) + ';\n');
console.log('Update complete with UTF-8!');
