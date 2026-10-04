import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Colors, Spacing, Radius, Fonts, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AdminDashboardScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const { providers, reservations, plannedMeals, approveProvider, logout } = useAppContext();
  const insets = useSafeAreaInsets();
  
  const pendingProviders = providers.filter(p => !p.isVerified);
  const totalRevenue = reservations.reduce((sum, r) => sum + r.bookingAmountPaid, 0); 
  const activeMeals = plannedMeals.filter(m => m.status === 'ACTIVE');

  const handleLogout = () => {
    Alert.alert("Log Out", "Log out of Admin Dashboard?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => logout() }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }} showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Admin Platform</Text>
            <Text style={styles.subtitle}>Ghar Ka Khana Monitoring</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutIcon}>
            <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {/* METRICS */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Ionicons name="fast-food-outline" size={18} color={colors.textMuted} />
              <Text style={styles.metricLabel}>Active Meals</Text>
            </View>
            <Text style={styles.metricValue}>{activeMeals.length}</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Ionicons name="storefront" size={18} color={colors.textMuted} />
              <Text style={styles.metricLabel}>Providers</Text>
            </View>
            <Text style={styles.metricValue}>{providers.length}</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Ionicons name="receipt-outline" size={18} color={colors.primary} />
              <Text style={styles.metricLabel}>Reservations</Text>
            </View>
            <Text style={[styles.metricValue, { color: colors.primaryDark }]}>{reservations.length}</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Ionicons name="cash" size={18} color={colors.success} />
              <Text style={styles.metricLabel}>Platform Rev.</Text>
            </View>
            <Text style={[styles.metricValue, { color: colors.success }]}>₹{totalRevenue}</Text>
          </View>
        </View>

        {/* PENDING PROVIDERS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pending Verification ({pendingProviders.length})</Text>
        </View>
        
        <View style={{ marginHorizontal: Spacing.lg, marginBottom: Spacing.xl }}>
          {pendingProviders.length === 0 ? (
            <View style={styles.emptyStateCard}>
              <Ionicons name="checkmark-done-circle-outline" size={32} color={colors.border} />
              <Text style={styles.emptyText}>No pending applications</Text>
            </View>
          ) : (
            pendingProviders.map((provider, index) => (
              <View key={provider.id} style={[styles.pendingCard, index > 0 && { marginTop: Spacing.md }]}>
                <View style={styles.pendingCardHeader}>
                  <View style={styles.providerAvatar}>
                    <Ionicons name="storefront-outline" size={24} color={colors.primary} />
                  </View>
                  <View style={styles.pendingCardInfo}>
                    <Text style={styles.providerName}>{provider.name}</Text>
                    <Text style={styles.providerDetails}>{provider.address || 'Home Food Provider'} • New</Text>
                  </View>
                </View>
                <View style={styles.verificationBadge}>
                  <Text style={styles.verificationText}>Pending Verification</Text>
                </View>
                <Button 
                  title="Approve"
                  onPress={() => approveProvider(provider.id)}
                  size="md"
                />
              </View>
            ))
          )}
        </View>

        {/* RECENT RESERVATIONS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Reservations</Text>
        </View>

        <View style={styles.listCard}>
          {reservations.slice(0, 5).map((res, index) => {
            const meal = plannedMeals.find(m => m.id === res.plannedMealId);
            const provider = providers.find(p => p.id === res.providerId);
            return (
              <React.Fragment key={res.id}>
                {index > 0 && <View style={styles.divider} />}
                <View style={styles.listItem}>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>#{res.id.slice(-6)}</Text>
                    <Text style={styles.listItemSub}>{meal?.name} • {provider?.name}</Text>
                  </View>
                  <View style={styles.statusBadgeNeutral}>
                    <Text style={styles.statusNeutralText}>{res.status.replace(/_/g, ' ')}</Text>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
          {reservations.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No reservations placed yet.</Text>
            </View>
          )}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xl, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 24, fontWeight: '900', color: colors.text, fontFamily: Fonts.sans },
  subtitle: { fontSize: 14, color: colors.textMuted, marginTop: 4, fontWeight: '500' },
  logoutIcon: { padding: Spacing.sm, backgroundColor: '#fee2e2', borderRadius: Radius.round },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.md, paddingVertical: Spacing.lg },
  metricCard: { width: '45%', backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, margin: '2.5%', ...Shadows.card },
  metricHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginBottom: Spacing.sm },
  metricLabel: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  metricValue: { fontSize: 28, fontWeight: '900', color: colors.text },
  sectionHeader: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, fontFamily: Fonts.sans },
  listCard: { backgroundColor: colors.surface, marginHorizontal: Spacing.lg, marginBottom: Spacing.xl, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, ...Shadows.card },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.md },
  listItemContent: { flex: 1, paddingRight: Spacing.sm },
  listItemTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 2 },
  listItemSub: { fontSize: 13, color: colors.textMuted },
  divider: { height: 1, backgroundColor: colors.border, marginHorizontal: Spacing.md },
  emptyState: { padding: Spacing.xl, alignItems: 'center', justifyContent: 'center' },
  emptyStateCard: { backgroundColor: colors.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, padding: Spacing.xl, alignItems: 'center', justifyContent: 'center', ...Shadows.card },
  emptyText: { color: colors.textMuted, marginTop: Spacing.sm, fontSize: 14 },
  statusBadgeNeutral: { backgroundColor: colors.background, paddingHorizontal: 10, paddingVertical: 4, borderRadius: Radius.round, borderWidth: 1, borderColor: colors.border },
  statusNeutralText: { fontSize: 10, fontWeight: 'bold', color: colors.textMuted, textTransform: 'uppercase' },
  
  pendingCard: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, ...Shadows.card },
  pendingCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  providerAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFF4ED', alignItems: 'center', justifyContent: 'center' },
  pendingCardInfo: { flex: 1, marginLeft: Spacing.md },
  providerName: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 2 },
  providerDetails: { fontSize: 14, color: colors.textMuted },
  verificationBadge: { alignSelf: 'flex-start', backgroundColor: colors.background, paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radius.round, borderWidth: 1, borderColor: colors.border, marginBottom: Spacing.lg },
  verificationText: { fontSize: 12, fontWeight: '600', color: colors.textMuted },
});
