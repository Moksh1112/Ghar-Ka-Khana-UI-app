const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', '(customer)', 'meal', '[id].tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add useSafeAreaInsets import
if (!content.includes("useSafeAreaInsets")) {
  content = content.replace(
    "import { useRouter, useLocalSearchParams } from 'expo-router';",
    "import { useRouter, useLocalSearchParams } from 'expo-router';\nimport { useSafeAreaInsets } from 'react-native-safe-area-context';"
  );
}

// 2. Extract insets inside the component
if (!content.includes("const insets = useSafeAreaInsets();")) {
  content = content.replace(
    "export default function MealDetailScreen() {",
    "export default function MealDetailScreen() {\n  const insets = useSafeAreaInsets();"
  );
}

// 3. Update the bottom spacer to be larger to ensure content doesn't get cut off
// Replace <View style={{ height: 160 }} /> with a dynamic height based on insets
content = content.replace(
  /<View style=\{\{ height: 160 \}\} \/>/g,
  '<View style={{ height: 150 + (insets.bottom || 20) }} />'
);

// 4. Update the Button size from "lg" to "md"
content = content.replace(
  /size="lg"/g,
  'size="md"'
);

// 5. Update the styles for the bottom bar and price breakdown
content = content.replace(
  /bottomBar: \{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors\.surface, paddingHorizontal: Spacing\.xl, paddingTop: Spacing\.lg, paddingBottom: Platform\.OS === 'ios' \? 34 : Spacing\.xl, borderTopWidth: 1, borderTopColor: colors\.border, \.\.\.Shadows\.card \},/g,
  "bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.surface, paddingHorizontal: Spacing.xl, paddingTop: Spacing.md, paddingBottom: Platform.OS === 'ios' ? 34 : 20, borderTopWidth: 1, borderTopColor: colors.border, ...Shadows.card },"
);

// Need to update the dynamic padding if we want to use insets in styles, 
// but styles is created outside the component (createStyles). 
// So instead of modifying bottomBar in createStyles to use insets, we can pass insets to createStyles or just override the style inline.
// Overriding inline is easier:
content = content.replace(
  /<View style=\{styles\.bottomBar\}>/g,
  '<View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>'
);

content = content.replace(
  /priceBreakdown: \{ marginBottom: Spacing\.md \},/g,
  "priceBreakdown: { marginBottom: 8 },"
);

content = content.replace(
  /priceRow: \{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 \},/g,
  "priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },"
);

content = content.replace(
  /payNowLabel: \{ fontSize: 16, fontWeight: 'bold', color: colors\.text \},/g,
  "payNowLabel: { fontSize: 15, fontWeight: 'bold', color: colors.text },"
);

content = content.replace(
  /payNowAmount: \{ fontSize: 22, fontWeight: 'bold', color: colors\.primaryDark \},/g,
  "payNowAmount: { fontSize: 20, fontWeight: 'bold', color: colors.primaryDark },"
);

content = content.replace(
  /payLaterNote: \{ fontSize: 12, color: colors\.textMuted, marginTop: 4 \},/g,
  "payLaterNote: { fontSize: 12, color: colors.textMuted, marginTop: 2 },"
);

content = content.replace(
  /reserveButton: \{ marginTop: Spacing\.xs \},/g,
  "reserveButton: { marginTop: 0 },"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Meal details updated.');
