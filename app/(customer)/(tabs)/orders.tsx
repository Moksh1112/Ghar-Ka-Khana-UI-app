import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius, Shadows, Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/store/AppContext';
import { useRouter } from 'expo-router';

export default function CustomerOrdersScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const router = useRouter();
  const { reservations, plannedMeals, user } = useAppContext();

  const customerReservations = reservations.filter(r => r.customerId === user?.id);

  if (customerReservations.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Reservations</Text>
        </View>
        <View style={styles.emptyState}>
          <View style={styles.emptyIconBg}>
            <Ionicons name="receipt-outline" size={48} color={colors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>No reservations yet</Text>
          <Text style={styles.emptyDesc}>When you pre-book meals, they'll appear here.</Text>
          <TouchableOpacity style={styles.exploreBtn} onPress={() => router.push('/(customer)/(tabs)/discover')}>
            <Text style={styles.exploreBtnText}>Explore Home Meals</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RESERVED': return '#D97706';
      case 'PREPARING': return '#0284C7';
      case 'READY': return '#65A30D';
      case 'AT PICKUP LOCATION': 
      case 'READY FOR PICKUP': return '#10B981';
      case 'COLLECTED': return colors.textMuted;
      default: return colors.textMuted;
    }
  };
  const getStatusBg = (status: string) => {
    switch (status) {
      case 'RESERVED': return '#FEF3C7';
      case 'PREPARING': return '#E0F2FE';
      case 'READY': return '#ECFCCB';
      case 'AT PICKUP LOCATION':
      case 'READY FOR PICKUP': return '#D1FAE5';
      case 'COLLECTED': return colors.border;
      default: return colors.border;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Reservations</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {customerReservations.map(res => {
          const meal = plannedMeals.find(m => m.id === res.plannedMealId);
          if (!meal) return null;

          const isCollected = res.status === 'COLLECTED';
          
          return (
            <TouchableOpacity 
              key={res.id} 
              style={[styles.resCard, isCollected && styles.resCardCollected]}
              onPress={() => router.push(`/(customer)/order-status?id=${res.id}` as any)}
              activeOpacity={0.9}
            >
              <View style={styles.resHeader}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusBg(res.status) }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(res.status) }]}>
                    {res.status.replace(/_/g, ' ')}
                  </Text>
                </View>
                <Text style={styles.dateText}>{new Date(res.createdAt).toLocaleDateString()}</Text>
              </View>

              <View style={styles.resContent}>
                <View style={styles.resInfo}>
                  <Text style={styles.resName}>{meal.name}</Text>
                  <Text style={styles.resTiming}>{meal.date} • {meal.mealType}</Text>
                  <Text style={styles.resFulfillment}>
                    <Ionicons name={res.fulfillmentMethod === 'BULK_DELIVERY' ? "bus-outline" : "walk-outline"} size={14} color={colors.textMuted} />
                    {" "}{res.fulfillmentMethod === 'BULK_DELIVERY' ? 'Bulk Delivery to PG' : 'Self Pickup'}
                  </Text>
                </View>
                
                <View style={styles.resPriceBox}>
                  <Text style={styles.resTotal}>₹{res.totalAmount}</Text>
                  <Text style={styles.resPending}>Due: ₹{res.remainingAmount}</Text>
                </View>
              </View>

              {!isCollected && (
                <View style={styles.resFooter}>
                  <Text style={styles.trackText}>Track timeline</Text>
                  <Ionicons name="arrow-forward" size={16} color={colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: colors.background },
  headerTitle: { fontSize: 24, fontWeight: '800', color: colors.text, fontFamily: Fonts.sans },
  container: { flex: 1, padding: Spacing.lg },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl },
  emptyIconBg: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: Spacing.sm },
  emptyDesc: { fontSize: 15, color: colors.textMuted, textAlign: 'center', marginBottom: Spacing.xl, lineHeight: 22 },
  exploreBtn: { backgroundColor: colors.primary, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderRadius: Radius.round },
  exploreBtnText: { color: colors.surface, fontWeight: 'bold', fontSize: 16 },
  resCard: { backgroundColor: colors.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, marginBottom: Spacing.md, ...Shadows.card },
  resCardCollected: { opacity: 0.7, ...Shadows.card, shadowOpacity: 0 },
  resHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: Radius.round },
  statusText: { fontSize: 12, fontWeight: 'bold', letterSpacing: 0.5, textTransform: 'uppercase' },
  dateText: { fontSize: 13, color: colors.textMuted, fontWeight: '500' },
  resContent: { flexDirection: 'row', justifyContent: 'space-between', padding: Spacing.md },
  resInfo: { flex: 1, marginRight: Spacing.sm },
  resName: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  resTiming: { fontSize: 14, color: colors.primaryDark, fontWeight: '600', marginBottom: 8 },
  resFulfillment: { fontSize: 13, color: colors.textMuted },
  resPriceBox: { alignItems: 'flex-end', justifyContent: 'center' },
  resTotal: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  resPending: { fontSize: 13, color: colors.error, fontWeight: '600' },
  resFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#FFF4ED', padding: Spacing.md, borderBottomLeftRadius: Radius.lg, borderBottomRightRadius: Radius.lg },
  trackText: { fontSize: 14, fontWeight: 'bold', color: colors.primary, marginRight: 4 },
});
