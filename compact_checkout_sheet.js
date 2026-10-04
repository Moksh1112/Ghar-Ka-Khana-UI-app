const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', '(customer)', 'checkout.tsx');
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
    "export default function CheckoutScreen() {",
    "export default function CheckoutScreen() {\n  const insets = useSafeAreaInsets();"
  );
}

// 3. Update the bottom spacer to be larger and responsive
content = content.replace(
  /<View style=\{\{ height: 120 \}\} \/>/g,
  '<View style={{ height: 120 + (insets.bottom || 20) }} />'
);

// 4. Update the Button size from "lg" to "md"
content = content.replace(
  /size="lg"/g,
  'size="md"'
);

// 5. Update the styles for the bottom bar
// We override paddingBottom inline, and change paddingTop to md in createStyles
content = content.replace(
  /bottomBar: \{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing\.xl, paddingTop: Spacing\.lg, paddingBottom: Platform\.OS === 'ios' \? 34 : Spacing\.xl, backgroundColor: colors\.surface, borderTopWidth: 1, borderTopColor: colors\.border, position: 'absolute', bottom: 0, left: 0, right: 0, \.\.\.Shadows\.card \},/g,
  "bottomBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingTop: Spacing.md, paddingBottom: Platform.OS === 'ios' ? 34 : 20, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, position: 'absolute', bottom: 0, left: 0, right: 0, ...Shadows.card },"
);

// Override bottomBar style inline with insets
content = content.replace(
  /<View style=\{styles\.bottomBar\}>/g,
  '<View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>'
);

// 6. Make text sizes slightly smaller to fit better
content = content.replace(
  /bottomTotalValue: \{ fontSize: 24, fontWeight: '800', color: colors\.text \},/g,
  "bottomTotalValue: { fontSize: 22, fontWeight: '800', color: colors.text },"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Checkout updated.');
