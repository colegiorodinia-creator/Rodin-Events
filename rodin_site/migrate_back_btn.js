const fs = require('fs');
const path = require('path');

// 1. Append CSS to Navbar
const navbarCssPath = path.join(__dirname, 'src', 'components', 'Navbar', 'Navbar.module.css');
const cssToAppend = `
.backButtonGlobal {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.backButtonGlobal:hover {
  transform: scale(1.1);
}

.backButtonGlobal svg {
  width: 44px;
  height: 44px;
}
`;
fs.appendFileSync(navbarCssPath, cssToAppend);
console.log('Appended CSS to Navbar');

// 2. Insert JSX into Navbar
const navbarPath = path.join(__dirname, 'src', 'components', 'Navbar', 'Navbar.tsx');
let navbarContent = fs.readFileSync(navbarPath, 'utf8');
const navbarInject = `      {/* Botão de Voltar Global (aparece em todas as páginas exceto a Home) */}
      {!isHome && !isMenuOpen && (
        <div style={{ position: 'fixed', top: '25px', left: '10vw', zIndex: 105 }}>
          <button onClick={() => router.back()} className={styles.backButtonGlobal} title="Voltar" style={{ pointerEvents: 'auto' }}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
              <circle cx="12" cy="12" r="9.75" fill="var(--rodin-white)" />
              <path d="M16.28 12.53a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill="var(--rodin-orange)" />
            </svg>
          </button>
        </div>
      )}

`;
// Insert before {/* Hamburger Global... */}
navbarContent = navbarContent.replace('{/* Hamburger Global (sempre vis', navbarInject + '{/* Hamburger Global (sempre vis');
fs.writeFileSync(navbarPath, navbarContent);
console.log('Injected JSX to Navbar');

// 3. Remove hardcoded from equipe
const equipePath = path.join(__dirname, 'src', 'app', 'equipe', 'page.tsx');
if (fs.existsSync(equipePath)) {
  let equipeContent = fs.readFileSync(equipePath, 'utf8');
  // Match the div wrapping the back button
  equipeContent = equipeContent.replace(/<div style={{ position: 'fixed', top: '25px', left: '10vw', zIndex: 105 }}>[\s\S]*?<\/div>/, '');
  fs.writeFileSync(equipePath, equipeContent);
  console.log('Removed from equipe');
}

// 4. Remove hardcoded from extracurriculares
const extraPath = path.join(__dirname, 'src', 'app', 'extracurriculares', 'page.tsx');
if (fs.existsSync(extraPath)) {
  let extraContent = fs.readFileSync(extraPath, 'utf8');
  extraContent = extraContent.replace(/<div style={{ position: 'fixed', top: '25px', left: '10vw', zIndex: 105 }}>[\s\S]*?<\/div>/, '');
  fs.writeFileSync(extraPath, extraContent);
  console.log('Removed from extracurriculares');
}
