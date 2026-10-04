import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/store/AppContext';
import { MOCK_LOCATIONS } from '@/store/mockData';

export default function ProviderDashboardScreen() {
  const { reservations, plannedMeals, user } = useAppContext();
  
  const providerReservations = reservations.filter(r => r.providerId === user?.id);
  const activeReservations = providerReservations.filter(r => r.status !== 'COMPLETED');
  
  const providerMeals = plannedMeals.filter(m => m.providerId === user?.id && m.status === 'ACTIVE');
  
  const totalExpectedRevenue = providerReservations.reduce((sum, r) => sum + r.totalAmount, 0);
  const todayEarnings = providerReservations.reduce((sum, r) => sum + r.bookingAmountPaid, 0); 
  const mealsToPrepare = activeReservations.reduce((sum, r) => sum + r.quantity, 0);
  
  const activeBatches = providerMeals.map(meal => {
    const mealReservations = activeReservations.filter(r => r.plannedMealId === meal.id && r.fulfillmentMethod === 'BULK_DELIVERY');
    return {
      meal,
      reservations: mealReservations,
      count: mealReservations.reduce((sum, r) => sum + r.quantity, 0)
    };
  }).filter(batch => batch.count > 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* TOP AREA */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Provider Dashboard</Text>
            <Text style={styles.title}>{user?.storeName || "Seema Aunty's Kitchen"}</Text>
          </View>
        </View>

        {/* SUMMARY CARDS */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{activeReservations.length}</Text>
              <Text style={styles.summaryLabel}>Active Res.</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{mealsToPrepare}</Text>
              <Text style={styles.summaryLabel}>To Prepare</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{providerMeals.length}</Text>
              <Text style={styles.summaryLabel}>Active Meals</Text>
            </View>
            <View style={styles.summaryCardHighlight}>
              <Text style={styles.summaryValueHighlight}>₹{todayEarnings}</Text>
              <Text style={styles.summaryLabelHighlight}>Booking Revenue</Text>
            </View>
          </View>
        </View>

        {/* ACTIVE BATCHES SECTION */}
        {activeBatches.length > 0 && (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Delivery Batches</Text>
            </View>

            {activeBatches.map((batch, index) => (
              <View key={index} style={styles.batchCard}>
                <View style={styles.batchHeader}>
                  <View style={styles.batchIdBadge}>
                    <Text style={styles.batchIdText}>{batch.meal.name}</Text>
                  </View>
                  <Text style={styles.batchStatus}>{batch.meal.date}</Text>
                </View>
                <View style={styles.batchContent}>
                  <View style={styles.batchRow}>
                    <Ionicons name="restaurant-outline" size={16} color={Colors.light.icon} />
                    <Text style={styles.batchDetailTextHighlight}>
                      {batch.count} Meals Total
                    </Text>
                  </View>
                  <Text style={styles.batchDetailText}>across {batch.reservations.length} reservations</Text>
                </View>
                <View style={styles.batchAction}>
                  <Text style={styles.batchActionText}>Manage Batch</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* RECENT RESERVATIONS PREVIEW */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Reservations</Text>
        </View>

        {providerReservations.length === 0 ? (
          <Text style={{ textAlign: 'center', color: Colors.light.textMuted, marginVertical: Spacing.xl }}>No reservations yet</Text>
        ) : (
          providerReservations.slice(0, 5).map(res => (
            <View key={res.id} style={styles.orderItem}>
              <View style={res.fulfillmentMethod === 'BULK_DELIVERY' ? styles.orderIcon : styles.orderIconSelf}>
                <Ionicons 
                  name={res.fulfillmentMethod === 'BULK_DELIVERY' ? "bag-handle-outline" : "walk-outline"} 
                  size={20} 
                  color={res.fulfillmentMethod === 'BULK_DELIVERY' ? Colors.light.primary : Colors.light.text} 
                />
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>Res #{res.id}</Text>
                <Text style={styles.orderDesc}>{res.quantity} items • {res.fulfillmentMethod.replace('_', ' ')}</Text>
              </View>
              <View style={styles.orderMeta}>
                <Text style={styles.orderPrice}>₹{res.totalAmount}</Text>
                <Text style={styles.orderTime}>{new Date(res.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
              </View>
            </View>
          ))
        )}

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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  greetingText: {
    fontSize: 14,
    color: Colors.light.textMuted,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  summaryContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCardHighlight: {
    flex: 1,
    backgroundColor: '#FFF4ED',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: '#FED7AA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.light.textMuted,
    fontWeight: '500',
  },
  summaryValueHighlight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.primaryDark,
    marginBottom: 4,
  },
  summaryLabelHighlight: {
    fontSize: 12,
    color: Colors.light.primaryDark,
    fontWeight: '600',
  },
  sectionHeader: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  batchCard: {
    backgroundColor: Colors.light.surface,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
    overflow: 'hidden',
    ...Shadows.card,
  },
  batchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    backgroundColor: Colors.light.background,
  },
  batchIdBadge: {
    backgroundColor: Colors.light.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  batchIdText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  batchStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  batchContent: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  batchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  batchDetailText: {
    fontSize: 14,
    color: Colors.light.textMuted,
  },
  batchDetailTextHighlight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  batchAction: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    margin: Spacing.md,
    borderRadius: Radius.round,
  },
  batchActionText: {
    color: Colors.light.surface,
    fontWeight: 'bold',
    fontSize: 14,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    marginHorizontal: Spacing.lg,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: Spacing.sm,
  },
  orderIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.round,
    backgroundColor: '#FFF4ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  orderIconSelf: {
    width: 40,
    height: 40,
    borderRadius: Radius.round,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 2,
  },
  orderDesc: {
    fontSize: 12,
    color: Colors.light.textMuted,
  },
  orderMeta: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 11,
    color: Colors.light.textMuted,
  },
});
