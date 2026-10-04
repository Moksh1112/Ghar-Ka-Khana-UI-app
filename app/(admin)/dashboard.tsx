import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Colors, Spacing, Radius, Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/store/AppContext';

export default function AdminDashboardScreen() {
  const { providers, reservations, plannedMeals, approveProvider, logout } = useAppContext();
  
  const pendingProviders = providers.filter(p => !p.isVerified);
  const totalRevenue = reservations.reduce((sum, r) => sum + r.bookingAmountPaid, 0); // Using booking amount as revenue for now
  const activeMeals = plannedMeals.filter(m => m.status === 'ACTIVE');

  const handleLogout = () => {
    Alert.alert("Log Out", "Log out of Admin Dashboard?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => logout() }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
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
              <Ionicons name="fast-food-outline" size={20} color={Colors.light.icon} />
              <Text style={styles.metricLabel}>Active Meals</Text>
            </View>
            <Text style={styles.metricValue}>{activeMeals.length}</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Ionicons name="storefront" size={20} color={Colors.light.icon} />
              <Text style={styles.metricLabel}>Providers</Text>
            </View>
            <Text style={styles.metricValue}>{providers.length}</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Ionicons name="receipt-outline" size={20} color={Colors.light.primary} />
              <Text style={styles.metricLabel}>Reservations</Text>
            </View>
            <Text style={[styles.metricValue, { color: Colors.light.primaryDark }]}>{reservations.length}</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Ionicons name="cash" size={20} color={Colors.light.success} />
              <Text style={styles.metricLabel}>Revenue</Text>
            </View>
            <Text style={[styles.metricValue, { color: Colors.light.success }]}>₹{totalRevenue}</Text>
          </View>
        </View>

        {/* PENDING PROVIDERS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pending Verification ({pendingProviders.length})</Text>
        </View>
        
        <View style={styles.listCard}>
          {pendingProviders.length === 0 ? (
            <Text style={{ padding: Spacing.md, textAlign: 'center', color: Colors.light.textMuted }}>No pending applications</Text>
          ) : (
            pendingProviders.map((provider, index) => (
              <React.Fragment key={provider.id}>
                {index > 0 && <View style={styles.divider} />}
                <View style={styles.listItem}>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>{provider.name}</Text>
                    <Text style={styles.listItemSub}>{provider.address}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => approveProvider(provider.id)}
                  >
                    <Text style={styles.actionText}>Approve</Text>
                  </TouchableOpacity>
                </View>
              </React.Fragment>
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
                    <Text style={styles.listItemTitle}>{res.id}</Text>
                    <Text style={styles.listItemSub}>{meal?.name} • {provider?.name}</Text>
                  </View>
                  <View style={styles.statusBadgeNeutral}>
                    <Text style={styles.statusNeutralText}>{res.status}</Text>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
          {reservations.length === 0 && <Text style={{ padding: Spacing.md, textAlign: 'center', color: Colors.light.textMuted }}>No reservations placed yet.</Text>}
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.textMuted,
    marginTop: 4,
  },
  logoutIcon: {
    padding: Spacing.sm,
    backgroundColor: '#fee2e2',
    borderRadius: Radius.round,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
  },
  metricCard: {
    width: '45%',
    backgroundColor: Colors.light.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    margin: '2.5%',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.light.textMuted,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  listCard: {
    backgroundColor: Colors.light.surface,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 2,
  },
  listItemSub: {
    fontSize: 12,
    color: Colors.light.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginHorizontal: Spacing.md,
  },
  actionButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.round,
  },
  actionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.light.surface,
  },
  statusBadgeWarning: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  statusWarningText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D97706',
  },
  statusBadgeNeutral: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  statusNeutralText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.light.textMuted,
  },
});
