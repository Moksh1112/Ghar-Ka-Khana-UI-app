const fs = require('fs');

function updateProviderProfile() {
  const filePath = 'app/(provider)/profile.tsx';
  let content = fs.readFileSync(filePath, 'utf8');

  const targetMenuSection = `<View style={styles.menuSection}>
          {menuItems.map((item, index) => (`;

  const newMenuSection = `<View style={styles.menuSection}>
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

          {menuItems.map((item, index) => (`;

  if (content.includes(targetMenuSection)) {
    content = content.replace(targetMenuSection, newMenuSection);
  }

  const targetStyles = `menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },`;
  const newStyles = `menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  appearanceItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },`;
  
  if (content.includes(targetStyles)) {
    content = content.replace(targetStyles, newStyles);
  }

  const targetLogout = `menuItemText: { fontSize: 16, color: colors.text, fontWeight: '500' },`;
  const newLogout = `menuItemText: { fontSize: 16, color: colors.text, fontWeight: '500' },
  
  segmentedControl: { flexDirection: 'row', backgroundColor: colors.background, borderRadius: Radius.round, padding: 4, borderWidth: 1, borderColor: colors.border },
  segmentBtn: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: Radius.round },
  segmentActive: { backgroundColor: colors.text },
  segmentText: { color: colors.textMuted, fontSize: 13, fontWeight: 'bold' },
  segmentTextActive: { color: colors.background },`;

  if (content.includes(targetLogout)) {
    content = content.replace(targetLogout, newLogout);
  }
  
  // also inject theme and setTheme destructured from useAppContext
  const targetAppCtx = `const { user, logout } = useAppContext();`;
  const newAppCtx = `const { user, logout, theme, setTheme } = useAppContext();`;
  if (content.includes(targetAppCtx)) {
    content = content.replace(targetAppCtx, newAppCtx);
  }

  content = content.replace(/backgroundColor: '#ef4444'/g, "backgroundColor: colors.background === '#111111' ? '#3F1212' : '#ef4444'");
  content = content.replace(/borderColor: '#ef4444'/g, "borderColor: colors.background === '#111111' ? '#3F1212' : '#ef4444'");

  fs.writeFileSync(filePath, content, 'utf8');
}

updateProviderProfile();
console.log('Provider profile updated');
