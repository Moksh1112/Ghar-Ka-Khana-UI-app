const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', '(customer)', 'order-status.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The first replacement messed up the early return
// Change `</ScrollView>\n    </SafeAreaView>` back to `</View>\n      </SafeAreaView>` at the early return
const earlyReturnRegex = /<Text style=\{\{ color: colors\.textMuted \}\}>Reservation not found<\/Text>\s*<\/ScrollView>\s*<\/SafeAreaView>/;
content = content.replace(earlyReturnRegex, "<Text style={{ color: colors.textMuted }}>Reservation not found</Text>\n        </View>\n      </SafeAreaView>");

// Change the final closing tags
const mainReturnRegex = /<\/View>\s*<\/SafeAreaView>\s*\);\s*\}/;
content = content.replace(mainReturnRegex, "</ScrollView>\n    </SafeAreaView>\n  );\n}");

fs.writeFileSync(filePath, content, 'utf8');
console.log('JSX tags fixed.');
