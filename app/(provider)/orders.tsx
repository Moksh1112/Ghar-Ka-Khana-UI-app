import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';
import { MOCK_LOCATIONS } from '@/store/mockData';

export default function ProviderOrdersScreen() {
  const { reservations, plannedMeals, updateReservationStatus, user } = useAppContext();

  // Filter reservations for this provider
  const providerReservations = reservations.filter(r => r.providerId === user?.id);

  const handleUpdateStatus = (resId: string, currentStatus: string, fulfillment: string) => {
    let nextStatus = currentStatus;
    if (currentStatus === 'RESERVED') nextStatus = 'PREPARING';
    else if (currentStatus === 'PREPARING') nextStatus = 'READY';
    else if (currentStatus === 'READY') nextStatus = fulfillment === 'BULK_DELIVERY' ? 'SENT' : 'READY_FOR_PICKUP';
    
    updateReservationStatus(resId, nextStatus as any);
  };

  const getActionText = (status: string) => {
    if (status === 'RESERVED') return 'Start Preparing';
    if (status === 'PREPARING') return 'Mark Ready';
    if (status === 'READY') return 'Send Batch / Ready for Pickup';
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Reservations</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {providerReservations.map(res => {
          const meal = plannedMeals.find(m => m.id === res.plannedMealId);
          return (
            <View key={res.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>#{res.id}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{res.status.replace(/_/g, ' ')}</Text>
                </View>
              </View>

              <View style={styles.orderContent}>
                <Text style={styles.itemSummary}>
                  {res.quantity}x {meal?.name}
                </Text>
                
                <Text style={styles.fulfillmentText}>
                  {res.fulfillmentMethod === 'BULK_DELIVERY' 
                    ? `Bulk: ${MOCK_LOCATIONS.find(l => l.id === res.pickupLocation)?.name}`
                    : 'Self Pickup'}
                </Text>
                <Text style={styles.fulfillmentText}>Remaining to collect: ₹{res.totalAmount - res.bookingAmountPaid}</Text>
              </View>

              {getActionText(res.status) && (
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleUpdateStatus(res.id, res.status, res.fulfillmentMethod)}
                >
                  <Text style={styles.actionButtonText}>{getActionText(res.status)}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
        {providerReservations.length === 0 && <Text style={{ textAlign: 'center', marginTop: 40, color: Colors.light.textMuted }}>No active reservations.</Text>}
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
  orderCard: { backgroundColor: Colors.light.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.light.border, marginBottom: Spacing.md, overflow: 'hidden' },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: Spacing.md, backgroundColor: Colors.light.background, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  orderId: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text },
  statusBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.sm },
  statusText: { fontSize: 10, fontWeight: 'bold', color: '#D97706' },
  orderContent: { padding: Spacing.md },
  itemSummary: { fontSize: 15, fontWeight: '600', color: Colors.light.text, marginBottom: Spacing.sm },
  fulfillmentText: { fontSize: 13, color: Colors.light.textMuted, marginBottom: 4 },
  actionButton: { backgroundColor: Colors.light.primary, margin: Spacing.md, paddingVertical: Spacing.md, borderRadius: Radius.round, alignItems: 'center' },
  actionButtonText: { color: Colors.light.surface, fontWeight: 'bold', fontSize: 16 },
});
