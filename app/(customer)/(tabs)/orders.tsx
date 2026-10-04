import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/store/AppContext';
import { useRouter } from 'expo-router';
import { MOCK_LOCATIONS } from '@/store/mockData';

export default function CustomerOrdersScreen() {
  const { reservations, plannedMeals, providers } = useAppContext();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Reservations</Text>
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {reservations.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color={Colors.light.border} />
            <Text style={styles.emptyStateText}>You haven't reserved any meals yet.</Text>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => router.push('/(customer)/(tabs)/home')}
            >
              <Text style={styles.exploreButtonText}>Explore Home Food</Text>
            </TouchableOpacity>
          </View>
        ) : (
          reservations.map(res => {
            const meal = plannedMeals.find(m => m.id === res.plannedMealId);
            const provider = providers.find(p => p.id === res.providerId);
            
            return (
              <TouchableOpacity 
                key={res.id} 
                style={styles.orderCard}
                onPress={() => router.push(`/(customer)/order-status?id=${res.id}` as any)}
              >
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderId}>Res #{res.id}</Text>
                    <Text style={styles.orderDate}>{new Date(res.createdAt).toLocaleString()}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{res.status.replace(/_/g, ' ')}</Text>
                  </View>
                </View>

                <View style={styles.orderContent}>
                  <Text style={styles.itemSummary}>
                    {res.quantity}x {meal?.name}
                  </Text>
                  <Text style={styles.providerName}>
                    Provider: {provider?.name}
                  </Text>
                  
                  <View style={styles.fulfillmentRow}>
                    <Ionicons 
                      name={res.fulfillmentMethod === 'BULK_DELIVERY' ? "bus-outline" : "walk-outline"} 
                      size={16} 
                      color={Colors.light.textMuted} 
                    />
                    <Text style={styles.fulfillmentText}>
                      {res.fulfillmentMethod === 'BULK_DELIVERY' 
                        ? `Bulk Delivery to ${MOCK_LOCATIONS.find(l => l.id === res.pickupLocation)?.name}`
                        : 'Self Pickup'}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderFooter}>
                  <Text style={styles.totalText}>Booking: ₹{res.bookingAmountPaid} / Total: ₹{res.totalAmount}</Text>
                  <Text style={styles.trackText}>Track <Ionicons name="chevron-forward" size={12} /></Text>
                </View>
              </TouchableOpacity>
            )
          })
        )}
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
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyStateText: { fontSize: 16, color: Colors.light.textMuted, marginTop: Spacing.md, marginBottom: Spacing.xl },
  exploreButton: { backgroundColor: Colors.light.primary, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderRadius: Radius.round },
  exploreButtonText: { color: Colors.light.surface, fontWeight: 'bold', fontSize: 16 },
  orderCard: { backgroundColor: Colors.light.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.light.border, marginBottom: Spacing.md, overflow: 'hidden' },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: Spacing.md, backgroundColor: Colors.light.background, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  orderId: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text, marginBottom: 2 },
  orderDate: { fontSize: 12, color: Colors.light.textMuted },
  statusBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.sm },
  statusText: { fontSize: 10, fontWeight: 'bold', color: '#D97706' },
  orderContent: { padding: Spacing.md },
  itemSummary: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text, marginBottom: 2 },
  providerName: { fontSize: 14, color: Colors.light.textMuted, marginBottom: Spacing.sm },
  fulfillmentRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  fulfillmentText: { fontSize: 12, color: Colors.light.textMuted },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.light.border },
  totalText: { fontSize: 14, fontWeight: 'bold', color: Colors.light.text },
  trackText: { fontSize: 14, fontWeight: '600', color: Colors.light.primary },
});
