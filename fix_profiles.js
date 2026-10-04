const fs = require('fs');
const path = require('path');

function updateCustomerProfile() {
  const filePath = path.join(__dirname, 'app', '(customer)', '(tabs)', 'profile.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert the Appearance JSX
  const appearanceJSX = `
          <View style={styles.appearanceItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconBg}>
                <Ionicons name="moon-outline" size={20} color={colors.text} />
              </View>
              <Text style={styles.menuItemText}>Appearance</Text>
            </View>
            <View style={styles.segmentedControl}>
              <TouchableOpacity
                style={[styles.segmentBtn, theme === 'light' && styles.segmentActive]}
                onPress={() => setTheme('light')}
                activeOpacity={0.8}
              >
                <Text style={[styles.segmentText, theme === 'light' && styles.segmentTextActive]}>Light</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentBtn, theme === 'dark' && styles.segmentActive]}
                onPress={() => setTheme('dark')}
                activeOpacity={0.8}
              >
                <Text style={[styles.segmentText, theme === 'dark' && styles.segmentTextActive]}>Dark</Text>
              </TouchableOpacity>
            </View>
          </View>
`;

  // Find the start of the menuSection and inject if not already there
  if (!content.includes('appearanceItem')) {
    content = content.replace(/<View style=\{styles\.menuSection\}>\s*\{menuItems\.map/g, `<View style={styles.menuSection}>${appearanceJSX}\n          {menuItems.map`);
  }

  // Update styles to use Orange for selected state
  content = content.replace(/segmentActive:\s*\{[^}]+\}/g, "segmentActive: { backgroundColor: colors.primary }");
  content = content.replace(/segmentTextActive:\s*\{[^}]+\}/g, "segmentTextActive: { color: '#FFFFFF' }");

  fs.writeFileSync(filePath, content, 'utf8');
}

function updateProviderProfile() {
  const filePath = path.join(__dirname, 'app', '(provider)', 'profile.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Update styles to use Orange for selected state
  content = content.replace(/segmentActive:\s*\{[^}]+\}/g, "segmentActive: { backgroundColor: colors.primary }");
  content = content.replace(/segmentTextActive:\s*\{[^}]+\}/g, "segmentTextActive: { color: '#FFFFFF' }");

  fs.writeFileSync(filePath, content, 'utf8');
}

try {
  updateCustomerProfile();
  updateProviderProfile();
  console.log('Profiles updated successfully.');
} catch (e) {
  console.error(e);
}
