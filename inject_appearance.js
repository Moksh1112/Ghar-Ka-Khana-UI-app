const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', '(customer)', '(tabs)', 'profile.tsx');
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

const appearanceJSX = [
'          <View style={styles.appearanceItem}>',
'            <View style={styles.menuItemLeft}>',
'              <View style={styles.menuIconBg}>',
'                <Ionicons name="moon-outline" size={20} color={colors.text} />',
'              </View>',
'              <Text style={styles.menuItemText}>Appearance</Text>',
'            </View>',
'            <View style={styles.segmentedControl}>',
'              <TouchableOpacity',
'                style={[styles.segmentBtn, theme === \'light\' && styles.segmentActive]}',
'                onPress={() => setTheme(\'light\')}',
'                activeOpacity={0.8}',
'              >',
'                <Text style={[styles.segmentText, theme === \'light\' && styles.segmentTextActive]}>Light</Text>',
'              </TouchableOpacity>',
'              <TouchableOpacity',
'                style={[styles.segmentBtn, theme === \'dark\' && styles.segmentActive]}',
'                onPress={() => setTheme(\'dark\')}',
'                activeOpacity={0.8}',
'              >',
'                <Text style={[styles.segmentText, theme === \'dark\' && styles.segmentTextActive]}>Dark</Text>',
'              </TouchableOpacity>',
'            </View>',
'          </View>'
];

const targetIndex = lines.findIndex(line => line.includes('{menuItems.map((item, index) => ('));

if (targetIndex !== -1 && !lines.some(line => line.includes('<View style={styles.appearanceItem}>'))) {
  lines.splice(targetIndex, 0, ...appearanceJSX);
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log('Customer profile updated successfully.');
} else {
  console.log('Already updated or target not found.');
}
