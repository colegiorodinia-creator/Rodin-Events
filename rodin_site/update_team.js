const fs = require('fs');
const file = 'src/components/Team/Team.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('expandedMap')) {
    code = code.replace(
        'const [itemsPerPage, setItemsPerPage] = useState(4);',
        'const [itemsPerPage, setItemsPerPage] = useState(4);\n  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});\n  const toggleExpand = (key: string) => setExpandedMap(prev => ({...prev, [key]: !prev[key]}));'
    );

    code = code.replace(
        /<p className=\{styles\.desc\}>\{member\.formation\}<\/p>/g,
        `<div>
                  <p className={\`\${styles.desc} \${expandedMap[member.name] ? styles.expanded : styles.clamped}\`}>
                    {member.formation}
                  </p>
                  {member.formation.length > 90 && (
                    <span className={styles.readMoreBtn} onClick={() => toggleExpand(member.name)}>
                      {expandedMap[member.name] ? 'Ler menos' : 'Ler mais'}
                    </span>
                  )}
                </div>`
    );

    fs.writeFileSync(file, code);
    console.log('Successfully updated Team.tsx');
} else {
    console.log('Already updated');
}