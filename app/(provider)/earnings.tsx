import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';

export default function PlaceholderScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Provider Earnings Coming Soon</Text>
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 16, color: colors.textMuted },
});
