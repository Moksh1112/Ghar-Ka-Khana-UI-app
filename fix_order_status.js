const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', '(customer)', 'order-status.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add ScrollView to imports if missing
if (!content.includes('ScrollView')) {
  content = content.replace(
    "import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, Animated } from 'react-native';",
    "import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, Animated, ScrollView } from 'react-native';"
  );
}

// 2. Add useSafeAreaInsets to imports and use it
if (!content.includes('useSafeAreaInsets')) {
  content = content.replace(
    "import { useAppContext } from '@/store/AppContext';",
    "import { useAppContext } from '@/store/AppContext';\nimport { useSafeAreaInsets } from 'react-native-safe-area-context';"
  );
}

if (!content.includes('const insets = useSafeAreaInsets();')) {
  content = content.replace(
    "const { colors } = useAppContext();",
    "const { colors } = useAppContext();\n  const insets = useSafeAreaInsets();"
  );
}

// 3. Change <View style={styles.container}> to <ScrollView ...>
content = content.replace(
  /<View style=\{styles\.container\}>/g,
  '<ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 40 }]} showsVerticalScrollIndicator={false}>'
);

content = content.replace(
  /<\/View>\s*<\/SafeAreaView>/,
  '  </ScrollView>\n    </SafeAreaView>'
);

// 4. Update container styles
content = content.replace(
  /container: \{ flex: 1, padding: Spacing\.lg \},/g,
  "container: { flex: 1 },\n  contentContainer: { padding: Spacing.lg },"
);

// Remove flex: 1 from timelineCard
content = content.replace(
  /timelineCard: \{ backgroundColor: colors\.surface, borderRadius: Radius\.lg, borderWidth: 1, borderColor: colors\.border, padding: Spacing\.xl, flex: 1, \.\.\.Shadows\.card \},/g,
  "timelineCard: { backgroundColor: colors.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, padding: Spacing.xl, ...Shadows.card },"
);

// 5. Update timeline styles for flexible connector line
content = content.replace(
  /timelineLine: \{ width: 2, height: 44, backgroundColor: colors\.border, marginTop: -4, marginBottom: -4, zIndex: 1 \},/g,
  "timelineLine: { width: 2, flex: 1, backgroundColor: colors.border, marginTop: -4, marginBottom: -4, zIndex: 1 },"
);
content = content.replace(
  /timelineLineActive: \{ backgroundColor: colors\.primary \},/g,
  "timelineLineActive: { backgroundColor: colors.primary }," // No change needed but keep regex valid
);
content = content.replace(
  /timelineTextContainer: \{ flex: 1, paddingBottom: 44, paddingLeft: Spacing\.md, marginTop: -2 \},/g,
  "timelineTextContainer: { flex: 1, paddingBottom: 40, paddingLeft: Spacing.md, marginTop: -2 },"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Order status layout fixed.');
