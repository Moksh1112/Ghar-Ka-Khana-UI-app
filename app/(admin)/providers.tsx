import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function AdminProvidersScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const { providers, approveProvider } = useAppContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Providers</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {providers.map(provider => (
          <View key={provider.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={provider.image} style={styles.image} contentFit="cover" />
              <View style={styles.info}>
                <Text style={styles.name}>{provider.name}</Text>
                <Text style={styles.speciality}>{provider.speciality}</Text>
                <View style={styles.statusBadge}>
                  <Ionicons name={provider.isVerified ? "checkmark-circle" : "time-outline"} size={14} color={provider.isVerified ? colors.success : '#D97706'} />
                  <Text style={[styles.statusText, { color: provider.isVerified ? colors.success : '#D97706' }]}>
                    {provider.isVerified ? 'Verified' : 'Pending Verification'}
                  </Text>
                </View>
              </View>
            </View>
            {!provider.isVerified && (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => approveProvider(provider.id)}
              >
                <Text style={styles.actionButtonText}>Approve Application</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.text },
  container: { flex: 1, padding: Spacing.lg },
  card: { backgroundColor: colors.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: colors.border, marginBottom: Spacing.md, overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', padding: Spacing.md },
  image: { width: 60, height: 60, borderRadius: Radius.sm, backgroundColor: colors.border },
  info: { flex: 1, marginLeft: Spacing.md, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 2 },
  speciality: { fontSize: 13, color: colors.textMuted, marginBottom: 6 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusText: { fontSize: 12, fontWeight: '600' },
  actionButton: { backgroundColor: colors.primary, margin: Spacing.md, paddingVertical: Spacing.md, borderRadius: Radius.round, alignItems: 'center' },
  actionButtonText: { color: colors.surface, fontWeight: 'bold', fontSize: 16 },
});
