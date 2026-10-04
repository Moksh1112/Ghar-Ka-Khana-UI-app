import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';
import { MOCK_LOCATIONS } from '@/store/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function AdminOrdersScreen() {
  const { reservations, plannedMeals, providers } = useAppContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Platform Reservations</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {reservations.map(res => {
          const meal = plannedMeals.find(m => m.id === res.plannedMealId);
          const provider = providers.find(p => p.id === res.providerId);

          return (
            <View key={res.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>Reservation {res.id}</Text>
                  <Text style={styles.date}>{new Date(res.createdAt).toLocaleString()}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{res.status}</Text>
                </View>
              </View>
              <View style={styles.orderContent}>
                <Text style={styles.items}>{meal?.name} • Provider: {provider?.name}</Text>
                <Text style={styles.items}>₹{res.totalAmount} (₹{res.bookingAmountPaid} paid)</Text>
                <View style={styles.row}>
                  <Ionicons name={res.fulfillmentMethod === 'BULK_DELIVERY' ? 'bus' : 'walk'} size={14} color={Colors.light.textMuted} />
                  <Text style={styles.fulfillment}>
                    {res.fulfillmentMethod === 'BULK_DELIVERY' 
                      ? `Bulk Delivery to ${MOCK_LOCATIONS.find(l => l.id === res.pickupLocation)?.name}` 
                      : 'Self Pickup'}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
        {reservations.length === 0 && (
          <Text style={{ textAlign: 'center', color: Colors.light.textMuted, marginTop: 40 }}>
            No reservations on the platform yet.
          </Text>
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
  orderCard: { backgroundColor: Colors.light.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.light.border, marginBottom: Spacing.md },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.light.border, backgroundColor: Colors.light.background },
  orderId: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text, marginBottom: 2 },
  date: { fontSize: 12, color: Colors.light.textMuted },
  statusBadge: { backgroundColor: Colors.light.border, paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.sm },
  statusText: { fontSize: 10, fontWeight: 'bold', color: Colors.light.text },
  orderContent: { padding: Spacing.md },
  items: { fontSize: 14, fontWeight: '500', color: Colors.light.text, marginBottom: Spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  fulfillment: { fontSize: 13, color: Colors.light.textMuted },
});
