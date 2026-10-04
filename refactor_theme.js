const fs = require('fs');
const path = require('path');

const dirsToProcess = ['app', 'components'];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if it doesn't use Colors.light
  if (!content.includes('Colors.light')) {
    return;
  }

  console.log(`Processing: ${filePath}`);

  // 1. Ensure useAppContext is imported
  if (!content.includes('useAppContext')) {
    // find last import
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex) + 1;
    content = content.slice(0, endOfLastImport) + `import { useAppContext } from '@/store/AppContext';\n` + content.slice(endOfLastImport);
  }

  // 2. Add `const { colors } = useAppContext();` inside the component
  // Find export default function ...
  const exportMatch = content.match(/export (default )?function ([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/);
  const constComponentMatch = content.match(/export const ([a-zA-Z0-9_]+)\s*=\s*(forwardRef)?\s*\(([^)]*)\)\s*=>\s*\{/);
  
  if (exportMatch) {
    const insertPos = exportMatch.index + exportMatch[0].length;
    if (!content.includes('const { colors }')) {
      content = content.slice(0, insertPos) + `\n  const { colors } = useAppContext();` + content.slice(insertPos);
    }
  } else if (constComponentMatch) {
    const insertPos = constComponentMatch.index + constComponentMatch[0].length;
    if (!content.includes('const { colors }')) {
      content = content.slice(0, insertPos) + `\n  const { colors } = useAppContext();` + content.slice(insertPos);
    }
  } else {
    console.log(`Could not find component function in ${filePath}`);
    // Check if there's any function
    const funcMatch = content.match(/function ([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/);
    if (funcMatch && !content.includes('const { colors }')) {
      const insertPos = funcMatch.index + funcMatch[0].length;
      content = content.slice(0, insertPos) + `\n  const { colors } = useAppContext();` + content.slice(insertPos);
    }
  }

  // 3. Transform StyleSheet.create to createStyles
  if (content.includes('const styles = StyleSheet.create(')) {
    content = content.replace(/const styles = StyleSheet\.create\(/g, 'const createStyles = (colors: any) => StyleSheet.create(');
    
    // Inject `const styles = createStyles(colors);` into the component
    if (exportMatch || constComponentMatch) {
      const match = exportMatch || constComponentMatch;
      const insertPos = match.index + match[0].length;
      if (!content.includes('const styles = createStyles(colors);')) {
        content = content.slice(0, insertPos) + `\n  const styles = createStyles(colors);` + content.slice(insertPos);
      }
    } else {
      const funcMatch = content.match(/function ([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/);
      if (funcMatch && !content.includes('const styles = createStyles(colors);')) {
        const insertPos = funcMatch.index + funcMatch[0].length;
        content = content.slice(0, insertPos) + `\n  const styles = createStyles(colors);` + content.slice(insertPos);
      }
    }
  }

  // 4. Replace Colors.light with colors
  content = content.replace(/Colors\.light/g, 'colors');

  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      processFile(fullPath);
    }
  });
}

dirsToProcess.forEach(dir => walk(path.join(__dirname, dir)));
console.log('Refactoring complete.');
