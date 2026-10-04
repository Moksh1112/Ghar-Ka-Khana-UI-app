import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Colors, Spacing, Radius, Shadows, Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppContext } from '@/store/AppContext';
import { MOCK_LOCATIONS } from '@/store/mockData';
import { Button } from '@/components/ui/Button';

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const router = useRouter();
  const { mealId } = useLocalSearchParams();
  const { plannedMeals, placeReservation } = useAppContext();
  
  const [fulfillment, setFulfillment] = useState<'BULK_DELIVERY' | 'SELF_PICKUP'>('BULK_DELIVERY');
  const [selectedLocation, setSelectedLocation] = useState(MOCK_LOCATIONS[0].id);

  const { cart } = useAppContext();
  const targetMealId = mealId || (cart.length > 0 ? cart[0].meal.id : null);
  
  const meal = plannedMeals.find(m => m.id === targetMealId);

  const handleConfirm = () => {
    if (!meal) return;
    placeReservation(meal.id, 1, fulfillment, fulfillment === 'BULK_DELIVERY' ? selectedLocation : undefined);
    router.replace('/(customer)/(tabs)/orders');
  };

  if (!meal) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: 'center', marginTop: 100, color: colors.textMuted }}>No meal selected.</Text>
      </SafeAreaView>
    );
  }

  const remainingAmount = meal.price - meal.bookingAmount;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.iconButton} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            
            <View style={styles.summaryRow}>
              <View>
                <Text style={styles.summaryItemText}>{meal.name}</Text>
                <Text style={styles.summarySubtext}>{meal.date} • {meal.mealType}</Text>
              </View>
              <Text style={styles.summaryItemPrice}>₹{meal.price}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Booking Amount</Text>
              <Text style={styles.bookingAmountText}>₹{meal.bookingAmount}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Remaining at Collection</Text>
              <Text style={styles.remainingAmountText}>₹{remainingAmount}</Text>
            </View>

          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fulfillment Method</Text>

          <TouchableOpacity 
            style={[styles.fulfillmentCard, fulfillment === 'BULK_DELIVERY' && styles.fulfillmentCardActive]}
            onPress={() => setFulfillment('BULK_DELIVERY')}
            activeOpacity={0.9}
          >
            <View style={styles.fulfillmentHeader}>
              <View style={[styles.radioContainer, fulfillment === 'BULK_DELIVERY' && styles.radioActive]}>
                {fulfillment === 'BULK_DELIVERY' && <View style={styles.radioInner} />}
              </View>
              <View style={styles.fulfillmentTextContainer}>
                <Text style={styles.fulfillmentTitle}>Bulk Delivery</Text>
                <Text style={styles.fulfillmentDesc}>Provider sends a batch directly to your hostel/PG</Text>
              </View>
            </View>
            
            {fulfillment === 'BULK_DELIVERY' && (
              <View style={styles.fulfillmentDetails}>
                <TouchableOpacity style={styles.locationSelector} activeOpacity={0.8}>
                  <View style={styles.locationIconBg}>
                    <Ionicons name="location" size={16} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1, marginLeft: Spacing.sm }}>
                    <Text style={styles.locationTitle}>{MOCK_LOCATIONS.find(l => l.id === selectedLocation)?.name}</Text>
                    <Text style={styles.locationDesc}>{MOCK_LOCATIONS.find(l => l.id === selectedLocation)?.address}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.icon} />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.fulfillmentCard, fulfillment === 'SELF_PICKUP' && styles.fulfillmentCardActive]}
            onPress={() => setFulfillment('SELF_PICKUP')}
            activeOpacity={0.9}
          >
            <View style={styles.fulfillmentHeader}>
              <View style={[styles.radioContainer, fulfillment === 'SELF_PICKUP' && styles.radioActive]}>
                {fulfillment === 'SELF_PICKUP' && <View style={styles.radioInner} />}
              </View>
              <View style={styles.fulfillmentTextContainer}>
                <Text style={styles.fulfillmentTitle}>Self Pickup</Text>
                <Text style={styles.fulfillmentDesc}>Collect directly from the provider's kitchen</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 + (insets.bottom || 20) }} />
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
        <View style={styles.bottomPriceContainer}>
          <Text style={styles.bottomTotalLabel}>Total Today</Text>
          <Text style={styles.bottomTotalValue}>₹{meal.bookingAmount}</Text>
        </View>
        <Button 
          title={`Pay ₹${meal.bookingAmount} & Reserve`}
          onPress={handleConfirm}
          size="md"
          style={styles.payButton}
        />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: colors.background },
  iconButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  container: { flex: 1 },
  section: { paddingHorizontal: Spacing.lg, marginTop: Spacing.lg },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: Spacing.md, fontFamily: Fonts.sans },
  summaryCard: { backgroundColor: colors.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, padding: Spacing.lg, ...Shadows.card },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm, alignItems: 'center' },
  summaryItemText: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 2 },
  summarySubtext: { fontSize: 13, color: colors.textMuted },
  summaryItemPrice: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: Spacing.md },
  summaryText: { fontSize: 15, color: colors.textMuted, fontWeight: '500' },
  bookingAmountText: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  remainingAmountText: { fontSize: 15, fontWeight: '600', color: colors.textMuted },
  fulfillmentCard: { backgroundColor: colors.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, padding: Spacing.lg, marginBottom: Spacing.md, ...Shadows.card },
  fulfillmentCardActive: { borderColor: colors.primary, backgroundColor: '#FFF4ED' },
  fulfillmentHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  radioContainer: { height: 22, width: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md, marginTop: 2 },
  radioActive: { borderColor: colors.primary },
  radioInner: { height: 12, width: 12, borderRadius: 6, backgroundColor: colors.primary },
  fulfillmentTextContainer: { flex: 1 },
  fulfillmentTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 4 },
  fulfillmentDesc: { fontSize: 14, color: colors.textMuted, lineHeight: 20 },
  fulfillmentDetails: { marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: '#FED7AA' },
  locationSelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: Spacing.md, borderRadius: Radius.md },
  locationIconBg: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFF4ED', alignItems: 'center', justifyContent: 'center' },
  locationTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 2 },
  locationDesc: { fontSize: 13, color: colors.textMuted },
  bottomBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingTop: Spacing.md, paddingBottom: Platform.OS === 'ios' ? 34 : 20, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, position: 'absolute', bottom: 0, left: 0, right: 0, ...Shadows.card },
  bottomPriceContainer: { flex: 1 },
  bottomTotalLabel: { fontSize: 13, color: colors.textMuted, fontWeight: '600', marginBottom: 2 },
  bottomTotalValue: { fontSize: 22, fontWeight: '800', color: colors.text },
  payButton: { flex: 1.5, marginLeft: Spacing.md },
});
