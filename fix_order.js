const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  let changed = false;
  const badOrder1 = `const styles = createStyles(colors);\n  const { colors } = useAppContext();`;
  const goodOrder1 = `const { colors } = useAppContext();\n  const styles = createStyles(colors);`;

  if (content.includes(badOrder1)) {
    content = content.replace(badOrder1, goodOrder1);
    changed = true;
  }
  
  const badOrder2 = `const styles = createStyles(colors);\n  const { colors } = useAppContext();`;
  if (content.includes(badOrder2)) {
      content = content.replace(badOrder2, goodOrder2);
      changed = true;
  }
  
  // RegEx based replace in case of spaces
  const regex = /const styles = createStyles\(colors\);\s*const \{ colors \} = useAppContext\(\);/g;
  if (regex.test(content)) {
      content = content.replace(regex, 'const { colors } = useAppContext();\n  const styles = createStyles(colors);');
      changed = true;
  }

  // Double declaration fix: if useAppContext is already called, we might have multiple calls
  // we can fix this manually if needed.

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed', filePath);
  }
}

function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      processFile(fullPath);
    }
  });
}

['app', 'components'].forEach(d => walk(path.join(__dirname, d)));
