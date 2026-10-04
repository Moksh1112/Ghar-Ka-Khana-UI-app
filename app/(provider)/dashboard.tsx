import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius, Shadows, Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/store/AppContext';

export default function ProviderDashboardScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const { reservations, plannedMeals, user } = useAppContext();
  
  const providerReservations = reservations.filter(r => r.providerId === user?.id);
  const activeReservations = providerReservations.filter(r => (r.status as string) !== 'COLLECTED');
  
  const providerMeals = plannedMeals.filter(m => m.providerId === user?.id && m.status === 'ACTIVE');
  
  const todayEarnings = providerReservations.reduce((sum, r) => sum + r.bookingAmountPaid, 0); 
  const mealsToPrepare = activeReservations.reduce((sum, r) => sum + r.quantity, 0);
  
  const activeBatches = providerMeals.map(meal => {
    const mealReservations = activeReservations.filter(r => r.plannedMealId === meal.id);
    return {
      meal,
      reservations: mealReservations,
      count: mealReservations.reduce((sum, r) => sum + r.quantity, 0)
    };
  }).filter(batch => batch.count > 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* TOP HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Provider Dashboard</Text>
            <Text style={styles.title}>{user?.storeName || "Seema Aunty's Kitchen"}</Text>
          </View>
          <View style={styles.profileBadge}>
            <Ionicons name="restaurant" size={24} color={colors.primary} />
          </View>
        </View>

        {/* METRICS */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricPrimary}>
            <View style={styles.metricIconBox}>
              <Ionicons name="flame" size={20} color={colors.surface} />
            </View>
            <Text style={styles.metricPrimaryLabel}>To Prepare</Text>
            <Text style={styles.metricPrimaryValue}>{mealsToPrepare} <Text style={{fontSize: 16}}>meals</Text></Text>
          </View>
          
          <View style={styles.metricsColumn}>
            <View style={styles.metricSecondary}>
              <Text style={styles.metricSecondaryLabel}>Active Res.</Text>
              <Text style={styles.metricSecondaryValue}>{activeReservations.length}</Text>
            </View>
            <View style={styles.metricSecondaryHighlight}>
              <Text style={styles.metricSecondaryLabelHighlight}>Bookings</Text>
              <Text style={styles.metricSecondaryValueHighlight}>₹{todayEarnings}</Text>
            </View>
          </View>
        </View>

        {/* PREPARATION BATCHES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Preparation Batches</Text>
        </View>

        {activeBatches.length > 0 ? (
          activeBatches.map((batch, index) => (
            <View key={index} style={styles.batchCard}>
              <View style={styles.batchLeft}>
                <Text style={styles.batchMealName}>{batch.meal.name}</Text>
                <Text style={styles.batchTiming}>{batch.meal.date} • {batch.meal.mealType}</Text>
              </View>
              <View style={styles.batchRight}>
                <View style={styles.batchCountBox}>
                  <Text style={styles.batchCountVal}>{batch.count}</Text>
                  <Text style={styles.batchCountLabel}>Items</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No active batches to prepare right now.</Text>
          </View>
        )}

        {/* RECENT RESERVATIONS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Reservations</Text>
        </View>

        {providerReservations.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No reservations yet</Text>
          </View>
        ) : (
          providerReservations.slice(0, 5).map(res => (
            <View key={res.id} style={styles.resCard}>
              <View style={res.fulfillmentMethod === 'BULK_DELIVERY' ? styles.resIconBulk : styles.resIconSelf}>
                <Ionicons 
                  name={res.fulfillmentMethod === 'BULK_DELIVERY' ? "bus-outline" : "walk-outline"} 
                  size={20} 
                  color={res.fulfillmentMethod === 'BULK_DELIVERY' ? colors.primary : colors.text} 
                />
              </View>
              <View style={styles.resInfo}>
                <Text style={styles.resId}>Res #{res.id.slice(-4)}</Text>
                <Text style={styles.resDesc}>{res.quantity} items • {res.fulfillmentMethod === 'BULK_DELIVERY' ? 'Bulk Delivery' : 'Self Pickup'}</Text>
              </View>
              <View style={styles.resMeta}>
                <Text style={styles.resPrice}>₹{res.totalAmount}</Text>
                <View style={styles.resStatusBadge}>
                  <Text style={styles.resStatusText}>{res.status.replace(/_/g, ' ')}</Text>
                </View>
              </View>
            </View>
          ))
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xl, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  greetingText: { fontSize: 14, color: colors.textMuted, marginBottom: 4 },
  title: { fontSize: 24, fontWeight: '900', color: colors.text, fontFamily: Fonts.sans },
  profileBadge: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF4ED', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FED7AA' },
  
  metricsContainer: { flexDirection: 'row', padding: Spacing.lg, gap: Spacing.md },
  metricPrimary: { flex: 1.2, backgroundColor: colors.text, borderRadius: Radius.lg, padding: Spacing.lg, justifyContent: 'space-between', ...Shadows.card },
  metricIconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  metricPrimaryLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '500', marginBottom: 4 },
  metricPrimaryValue: { color: colors.surface, fontSize: 36, fontWeight: '900' },
  
  metricsColumn: { flex: 1, gap: Spacing.md },
  metricSecondary: { flex: 1, backgroundColor: colors.surface, borderRadius: Radius.lg, padding: Spacing.md, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', ...Shadows.card },
  metricSecondaryLabel: { fontSize: 13, color: colors.textMuted, marginBottom: 2 },
  metricSecondaryValue: { fontSize: 22, fontWeight: 'bold', color: colors.text },
  
  metricSecondaryHighlight: { flex: 1, backgroundColor: '#FFF4ED', borderRadius: Radius.lg, padding: Spacing.md, borderWidth: 1, borderColor: '#FED7AA', justifyContent: 'center', ...Shadows.card },
  metricSecondaryLabelHighlight: { fontSize: 13, color: colors.primaryDark, marginBottom: 2 },
  metricSecondaryValueHighlight: { fontSize: 22, fontWeight: 'bold', color: colors.primaryDark },
  
  sectionHeader: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.md, marginTop: Spacing.sm },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, fontFamily: Fonts.sans },
  
  batchCard: { flexDirection: 'row', backgroundColor: colors.surface, marginHorizontal: Spacing.lg, marginBottom: Spacing.md, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, padding: Spacing.md, alignItems: 'center', ...Shadows.card },
  batchLeft: { flex: 1 },
  batchMealName: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 4 },
  batchTiming: { fontSize: 14, color: colors.textMuted, fontWeight: '500' },
  batchRight: { paddingLeft: Spacing.md, borderLeftWidth: 1, borderLeftColor: colors.border },
  batchCountBox: { alignItems: 'center', justifyContent: 'center', minWidth: 60 },
  batchCountVal: { fontSize: 24, fontWeight: '900', color: colors.primary },
  batchCountLabel: { fontSize: 12, color: colors.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  
  emptyCard: { backgroundColor: colors.surface, marginHorizontal: Spacing.lg, padding: Spacing.xl, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed', alignItems: 'center' },
  emptyText: { color: colors.textMuted, fontSize: 15 },
  
  resCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, marginHorizontal: Spacing.lg, padding: Spacing.md, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, marginBottom: Spacing.sm, ...Shadows.card },
  resIconBulk: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFF4ED', alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  resIconSelf: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  resInfo: { flex: 1 },
  resId: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 2 },
  resDesc: { fontSize: 13, color: colors.textMuted },
  resMeta: { alignItems: 'flex-end' },
  resPrice: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  resStatusBadge: { backgroundColor: colors.background, paddingHorizontal: 6, paddingVertical: 2, borderRadius: Radius.sm },
  resStatusText: { fontSize: 10, fontWeight: 'bold', color: colors.textMuted },
});
