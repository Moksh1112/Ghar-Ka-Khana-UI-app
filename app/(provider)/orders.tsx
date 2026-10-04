import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { Colors, Spacing, Radius, Shadows, Fonts } from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';
import { MOCK_LOCATIONS } from '@/store/mockData';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

export default function ProviderOrdersScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const { reservations, plannedMeals, updateReservationStatus, user } = useAppContext();

  const providerReservations = reservations.filter(r => r.providerId === user?.id);

  const handleUpdateStatus = (resId: string, currentStatus: string, fulfillment: string) => {
    let nextStatus = currentStatus;
    if (currentStatus === 'RESERVED') nextStatus = 'PREPARING';
    else if (currentStatus === 'PREPARING') nextStatus = 'READY';
    else if (currentStatus === 'READY') nextStatus = fulfillment === 'BULK_DELIVERY' ? 'AT PICKUP LOCATION' : 'READY FOR PICKUP';
    
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
        <Text style={styles.headerTitle}>Active Tasks</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {providerReservations.map(res => {
          const meal = plannedMeals.find(m => m.id === res.plannedMealId);
          const actionText = getActionText(res.status);
          const isDone = (res.status as string) === 'COLLECTED' || (res.status as string) === 'COLLECTED' || res.status === 'AT PICKUP LOCATION' || res.status === 'READY FOR PICKUP';

          return (
            <View key={res.id} style={[styles.orderCard, isDone && styles.orderCardDone]}>
              <View style={styles.orderHeader}>
                <View style={styles.idBox}>
                  <Text style={styles.orderId}>#{res.id.slice(-4)}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{res.status.replace(/_/g, ' ')}</Text>
                </View>
              </View>

              <View style={styles.orderContent}>
                <View style={styles.mealInfoRow}>
                  <Text style={styles.quantityBadge}>{res.quantity}x</Text>
                  <Text style={styles.itemSummary}>{meal?.name}</Text>
                </View>
                
                <View style={styles.metaRow}>
                  <Ionicons name={res.fulfillmentMethod === 'BULK_DELIVERY' ? "bus-outline" : "walk-outline"} size={14} color={colors.textMuted} />
                  <Text style={styles.fulfillmentText}>
                    {res.fulfillmentMethod === 'BULK_DELIVERY' 
                      ? `Bulk: ${MOCK_LOCATIONS.find(l => l.id === res.pickupLocation)?.name}`
                      : 'Self Pickup'}
                  </Text>
                </View>
                
                <View style={styles.metaRow}>
                  <Ionicons name="cash-outline" size={14} color={colors.textMuted} />
                  <Text style={styles.fulfillmentText}>
                    To collect: <Text style={{fontWeight: 'bold', color: colors.text}}>₹{res.totalAmount - res.bookingAmountPaid}</Text>
                  </Text>
                </View>
              </View>

              {actionText && (
                <View style={styles.actionContainer}>
                  <Button 
                    title={actionText}
                    onPress={() => handleUpdateStatus(res.id, res.status, res.fulfillmentMethod)}
                    size="md"
                  />
                </View>
              )}
            </View>
          );
        })}
        {providerReservations.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <Ionicons name="checkmark-circle-outline" size={48} color={colors.border} />
            <Text style={{ textAlign: 'center', marginTop: Spacing.md, color: colors.textMuted }}>No active tasks.</Text>
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
  
  orderCard: { backgroundColor: colors.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, marginBottom: Spacing.md, overflow: 'hidden', ...Shadows.card },
  orderCardDone: { opacity: 0.7, backgroundColor: colors.background, ...Shadows.card, shadowOpacity: 0 },
  
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface },
  idBox: { backgroundColor: colors.background, paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.sm },
  orderId: { fontSize: 14, fontWeight: 'bold', color: colors.textMuted },
  
  statusBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: Radius.round },
  statusText: { fontSize: 11, fontWeight: 'bold', color: '#D97706', textTransform: 'uppercase' },
  
  orderContent: { padding: Spacing.md },
  mealInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  quantityBadge: { backgroundColor: colors.primary, color: colors.surface, fontWeight: 'bold', fontSize: 14, paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.sm, marginRight: Spacing.sm },
  itemSummary: { fontSize: 18, fontWeight: '700', color: colors.text },
  
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: Spacing.sm },
  fulfillmentText: { fontSize: 14, color: colors.textMuted },
  
  actionContainer: { padding: Spacing.md, paddingTop: 0 },
});
