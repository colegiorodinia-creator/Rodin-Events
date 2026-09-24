const fs = require('fs');
const file = 'src/components/Team/Team.tsx';
let code = fs.readFileSync(file, 'utf8');

// Subtitui a renderização do conteúdo do card no layout desktop e mobile
const newContent = `
              <div className={styles.cardContent}>
                <h3 className={styles.name}>{member.name}</h3>
                
                {expandedMap[member.name] && (
                  <div className={styles.expandedContent}>
                    {member.role && 
                     !member.role.toLowerCase().includes('professor') && 
                     !member.role.toLowerCase().includes('orientador') && 
                     <p className={styles.role}>{member.role}</p>}
                    <p className={styles.desc}>
                      {member.formation}
                    </p>
                  </div>
                )}
                
                <span className={styles.readMoreBtn} onClick={() => toggleExpand(member.name)}>
                  {expandedMap[member.name] ? 'Ler menos' : 'Ler mais'}
                </span>
              </div>
`;

// Precisamos usar regex cuidadosas para não estragar
const pattern1 = /<div className=\{styles\.cardContent\}>[\s\S]*?<\/div>\s*<\/div>/g;

// Substitui todos os blocos de cardContent (tem 2, um pro desktop, um pro mobile)
code = code.replace(
    /<div className=\{styles\.cardContent\}>[\s\S]*?<\/div>\s*<\/div>/g, 
    newContent.trim() + '\n            </div>'
);

fs.writeFileSync(file, code);
console.log('Successfully updated Team.tsx');