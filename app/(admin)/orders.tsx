import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { Colors, Spacing, Radius, Shadows, Fonts } from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';
import { MOCK_LOCATIONS } from '@/store/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function AdminOrdersScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
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
                  <Text style={styles.orderId}>Reservation #{res.id.slice(-6)}</Text>
                  <Text style={styles.date}>{new Date(res.createdAt).toLocaleString()}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{res.status.replace(/_/g, ' ')}</Text>
                </View>
              </View>
              
              <View style={styles.orderContent}>
                <View style={styles.metaRow}>
                  <Ionicons name="fast-food-outline" size={14} color={colors.textMuted} />
                  <Text style={styles.items}>{res.quantity}x {meal?.name}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Ionicons name="storefront-outline" size={14} color={colors.textMuted} />
                  <Text style={styles.items}>Provider: {provider?.name}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Ionicons name="cash-outline" size={14} color={colors.textMuted} />
                  <Text style={styles.items}>₹{res.totalAmount} (₹{res.bookingAmountPaid} paid today)</Text>
                </View>
                <View style={[styles.metaRow, { marginTop: Spacing.sm }]}>
                  <Ionicons name={res.fulfillmentMethod === 'BULK_DELIVERY' ? 'bus' : 'walk'} size={14} color={colors.primary} />
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
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <Ionicons name="receipt-outline" size={48} color={colors.border} />
            <Text style={{ textAlign: 'center', color: colors.textMuted, marginTop: Spacing.md }}>
              No reservations on the platform yet.
            </Text>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.text, fontFamily: Fonts.sans },
  container: { flex: 1, padding: Spacing.lg },
  
  orderCard: { backgroundColor: colors.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, marginBottom: Spacing.md, ...Shadows.card },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.background, borderTopLeftRadius: Radius.lg, borderTopRightRadius: Radius.lg },
  orderId: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 2 },
  date: { fontSize: 13, color: colors.textMuted },
  statusBadge: { backgroundColor: colors.border, paddingHorizontal: 10, paddingVertical: 4, borderRadius: Radius.round },
  statusText: { fontSize: 10, fontWeight: 'bold', color: colors.text, textTransform: 'uppercase' },
  
  orderContent: { padding: Spacing.md },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 6 },
  items: { fontSize: 14, fontWeight: '500', color: colors.text },
  fulfillment: { fontSize: 13, color: colors.primaryDark, fontWeight: '600' },
});
