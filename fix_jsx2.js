const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', '(customer)', 'order-status.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The file is currently messed up, let's fix it manually by rewriting the specific blocks
const lines = content.split('\n');
let newLines = [];
for(let i=0; i<lines.length; i++) {
    if (lines[i].includes('Reservation not found</Text>') && lines[i+1].includes('</ScrollView>')) {
        newLines.push(lines[i]);
        newLines.push('        </View>');
        i++; // skip </ScrollView>
    } else if (lines[i].includes('</View>') && lines[i+1].includes('</SafeAreaView>') && lines[i+2].includes(');')) {
        newLines.push('      </ScrollView>');
        newLines.push('    </SafeAreaView>');
        newLines.push('  );');
        i += 2;
    } else {
        newLines.push(lines[i]);
    }
}
fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Fixed tags with string matching');
