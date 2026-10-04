const fs = require('fs');
const path = require('path');

const layoutPath = path.join(__dirname, 'app', '(admin)', '_layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

if (!layoutContent.includes('useSafeAreaInsets')) {
  layoutContent = layoutContent.replace(
    "import { Colors } from '@/constants/theme';",
    "import { Colors } from '@/constants/theme';\nimport { useSafeAreaInsets } from 'react-native-safe-area-context';"
  );
  
  layoutContent = layoutContent.replace(
    "export default function AdminLayout() {",
    "export default function AdminLayout() {\n  const insets = useSafeAreaInsets();"
  );
  
  layoutContent = layoutContent.replace(
    "height: 60,",
    "height: 60 + insets.bottom,"
  );
  
  layoutContent = layoutContent.replace(
    "paddingBottom: 8,",
    "paddingBottom: 8 + insets.bottom,"
  );
  
  fs.writeFileSync(layoutPath, layoutContent, 'utf8');
  console.log('Admin layout updated.');
}


const dashboardPath = path.join(__dirname, 'app', '(admin)', 'dashboard.tsx');
let dashboardContent = fs.readFileSync(dashboardPath, 'utf8');

// Add insets to dashboard
if (!dashboardContent.includes('useSafeAreaInsets')) {
  dashboardContent = dashboardContent.replace(
    "import { Colors, Spacing, Radius, Fonts, Shadows } from '@/constants/theme';",
    "import { Colors, Spacing, Radius, Fonts, Shadows } from '@/constants/theme';\nimport { useSafeAreaInsets } from 'react-native-safe-area-context';"
  );
}

if (!dashboardContent.includes('const insets = useSafeAreaInsets();')) {
  dashboardContent = dashboardContent.replace(
    "export default function AdminDashboardScreen() {",
    "export default function AdminDashboardScreen() {\n  const insets = useSafeAreaInsets();"
  );
}

// Ensure the ScrollView has proper paddingBottom
dashboardContent = dashboardContent.replace(
  /<ScrollView style=\{styles\.container\} showsVerticalScrollIndicator=\{false\}>/,
  '<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} showsVerticalScrollIndicator={false}>'
);

// Replace the pending provider listItem mapping with a better card
const oldProviderMap = `            pendingProviders.map((provider, index) => (
              <React.Fragment key={provider.id}>
                {index > 0 && <View style={styles.divider} />}
                <View style={styles.listItem}>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>{provider.name}</Text>
                    <Text style={styles.listItemSub}>{provider.address}</Text>
                  </View>
                  <Button 
                    title="Approve"
                    onPress={() => approveProvider(provider.id)}
                    size="sm"
                    style={{ paddingHorizontal: Spacing.lg }}
                  />
                </View>
              </React.Fragment>
            ))`;

const newProviderMap = `            pendingProviders.map((provider, index) => (
              <React.Fragment key={provider.id}>
                {index > 0 && <View style={styles.divider} />}
                <View style={styles.pendingCard}>
                  <View style={styles.pendingCardHeader}>
                    <View style={styles.providerAvatar}>
                      <Ionicons name="storefront-outline" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.pendingCardInfo}>
                      <Text style={styles.providerName}>{provider.name}</Text>
                      <Text style={styles.providerDetails}>{provider.speciality || 'Home Food Provider'} • {provider.rating ? \`★ \${provider.rating}\` : 'New'}</Text>
                    </View>
                  </View>
                  <View style={styles.verificationBadge}>
                    <Text style={styles.verificationText}>Pending Verification</Text>
                  </View>
                  <Button 
                    title="Approve Provider"
                    onPress={() => approveProvider(provider.id)}
                    size="md"
                  />
                </View>
              </React.Fragment>
            ))`;

dashboardContent = dashboardContent.replace(oldProviderMap, newProviderMap);

// Replace styles
const styleAppend = `  pendingCard: { padding: Spacing.lg },
  pendingCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  providerAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFF4ED', alignItems: 'center', justifyContent: 'center' },
  pendingCardInfo: { flex: 1, marginLeft: Spacing.md },
  providerName: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 2 },
  providerDetails: { fontSize: 14, color: colors.textMuted },
  verificationBadge: { alignSelf: 'flex-start', backgroundColor: colors.background, paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radius.round, borderWidth: 1, borderColor: colors.border, marginBottom: Spacing.lg },
  verificationText: { fontSize: 12, fontWeight: '600', color: colors.textMuted },`;

if (!dashboardContent.includes('pendingCard:')) {
  dashboardContent = dashboardContent.replace(
    "  statusNeutralText: { fontSize: 10, fontWeight: 'bold', color: colors.textMuted, textTransform: 'uppercase' },",
    "  statusNeutralText: { fontSize: 10, fontWeight: 'bold', color: colors.textMuted, textTransform: 'uppercase' },\n" + styleAppend
  );
}

fs.writeFileSync(dashboardPath, dashboardContent, 'utf8');
console.log('Admin dashboard updated.');
