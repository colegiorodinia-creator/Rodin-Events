const fs = require('fs');
const file = 'src/components/Team/Team.tsx';
let code = fs.readFileSync(file, 'utf8');

// The current code has:
// {expandedMap[member.name] && (
//   <div className={styles.expandedContent}>
//     ...
//   </div>
// )}
// 
// I need to change it back to always rendering the content, but with the clamped class if not expanded.

const newContent = `
              <div className={styles.cardContent}>
                <h3 className={styles.name}>{member.name}</h3>
                
                {member.role && 
                 !member.role.toLowerCase().includes('professor') && 
                 !member.role.toLowerCase().includes('orientador') && 
                 <p className={styles.role}>{member.role}</p>}
                
                <p className={\`\${styles.desc} \${expandedMap[member.name] ? styles.expanded : styles.clamped}\`}>
                  {member.formation}
                </p>
                
                {member.formation.length > 50 && (
                  <span className={styles.readMoreBtn} onClick={() => toggleExpand(member.name)}>
                    {expandedMap[member.name] ? 'Ler menos' : 'Ler mais'}
                  </span>
                )}
              </div>
`;

// Substitui todos os blocos de cardContent usando regex (desktop e mobile)
code = code.replace(
    /<div className=\{styles\.cardContent\}>[\s\S]*?<\/div>\s*<\/span>\s*<\/div>/g, 
    newContent.trim()
);

fs.writeFileSync(file, code);
console.log('Successfully updated Team.tsx');