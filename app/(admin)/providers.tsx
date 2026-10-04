import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function AdminProvidersScreen() {
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
                  <Ionicons name={provider.isVerified ? "checkmark-circle" : "time-outline"} size={14} color={provider.isVerified ? Colors.light.success : '#D97706'} />
                  <Text style={[styles.statusText, { color: provider.isVerified ? Colors.light.success : '#D97706' }]}>
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

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: Colors.light.surface, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text },
  container: { flex: 1, padding: Spacing.lg },
  card: { backgroundColor: Colors.light.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.light.border, marginBottom: Spacing.md, overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', padding: Spacing.md },
  image: { width: 60, height: 60, borderRadius: Radius.sm, backgroundColor: Colors.light.border },
  info: { flex: 1, marginLeft: Spacing.md, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text, marginBottom: 2 },
  speciality: { fontSize: 13, color: Colors.light.textMuted, marginBottom: 6 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusText: { fontSize: 12, fontWeight: '600' },
  actionButton: { backgroundColor: Colors.light.primary, margin: Spacing.md, paddingVertical: Spacing.md, borderRadius: Radius.round, alignItems: 'center' },
  actionButtonText: { color: Colors.light.surface, fontWeight: 'bold', fontSize: 16 },
});
