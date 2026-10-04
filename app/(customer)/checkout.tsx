import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/store/AppContext';
import { MOCK_LOCATIONS } from '@/store/mockData';

export default function CheckoutScreen() {
  const router = useRouter();
  const { mealId } = useLocalSearchParams();
  const { plannedMeals, placeReservation } = useAppContext();
  
  const [fulfillment, setFulfillment] = useState<'BULK_DELIVERY' | 'SELF_PICKUP'>('BULK_DELIVERY');
  const [selectedLocation, setSelectedLocation] = useState(MOCK_LOCATIONS[0].id);

  // For backward compatibility if someone comes from cart without mealId
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
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: Colors.light.textMuted }}>No meal selected.</Text>
          <TouchableOpacity style={{ marginTop: Spacing.md }} onPress={() => router.back()}>
            <Text style={{ color: Colors.light.primary, fontWeight: 'bold' }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const remainingAmount = meal.price - meal.bookingAmount;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reserve Meal</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* ORDER SUMMARY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryItemText}>{meal.name}</Text>
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

        {/* FULFILLMENT METHOD */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How will you get your food?</Text>

          {/* Bulk Delivery Option */}
          <TouchableOpacity 
            style={[styles.fulfillmentCard, fulfillment === 'BULK_DELIVERY' && styles.fulfillmentCardActive]}
            onPress={() => setFulfillment('BULK_DELIVERY')}
          >
            <View style={styles.fulfillmentHeader}>
              <View style={styles.radioContainer}>
                {fulfillment === 'BULK_DELIVERY' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.fulfillmentTitle}>Bulk Delivery</Text>
            </View>
            <Text style={styles.fulfillmentDesc}>Provider sends batch directly to your location.</Text>
            
            {fulfillment === 'BULK_DELIVERY' && (
              <View style={styles.fulfillmentDetails}>
                <TouchableOpacity style={styles.locationSelector}>
                  <Ionicons name="location-outline" size={20} color={Colors.light.text} />
                  <View style={{ flex: 1, marginLeft: Spacing.sm }}>
                    <Text style={styles.locationTitle}>{MOCK_LOCATIONS.find(l => l.id === selectedLocation)?.name}</Text>
                    <Text style={styles.locationDesc}>{MOCK_LOCATIONS.find(l => l.id === selectedLocation)?.address}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>

          {/* Self Pickup Option */}
          <TouchableOpacity 
            style={[styles.fulfillmentCard, fulfillment === 'SELF_PICKUP' && styles.fulfillmentCardActive]}
            onPress={() => setFulfillment('SELF_PICKUP')}
          >
            <View style={styles.fulfillmentHeader}>
              <View style={styles.radioContainer}>
                {fulfillment === 'SELF_PICKUP' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.fulfillmentTitle}>Self Pickup</Text>
            </View>
            <Text style={styles.fulfillmentDesc}>Collect directly from provider location.</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* BOTTOM ACTION */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomTotalLabel}>Total Today</Text>
          <Text style={styles.bottomTotalValue}>₹{meal.bookingAmount}</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handleConfirm}>
          <Text style={styles.payButtonText}>Pay ₹{meal.bookingAmount} & Reserve</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: Colors.light.surface, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  backButton: { padding: Spacing.xs },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text },
  container: { flex: 1 },
  section: { padding: Spacing.lg },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text, marginBottom: Spacing.md },
  summaryCard: { backgroundColor: Colors.light.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.light.border, padding: Spacing.lg },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  summaryItemText: { fontSize: 15, fontWeight: '600', color: Colors.light.text },
  summaryItemPrice: { fontSize: 15, fontWeight: '600', color: Colors.light.text },
  divider: { height: 1, backgroundColor: Colors.light.border, marginVertical: Spacing.md },
  summaryText: { fontSize: 14, color: Colors.light.textMuted },
  bookingAmountText: { fontSize: 15, fontWeight: 'bold', color: Colors.light.text },
  remainingAmountText: { fontSize: 15, fontWeight: 'bold', color: Colors.light.textMuted },
  fulfillmentCard: { backgroundColor: Colors.light.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.light.border, padding: Spacing.md, marginBottom: Spacing.md },
  fulfillmentCardActive: { borderColor: Colors.light.primary, backgroundColor: '#FFF4ED' },
  fulfillmentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs },
  radioContainer: { height: 20, width: 20, borderRadius: 10, borderWidth: 2, borderColor: Colors.light.primary, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm },
  radioInner: { height: 10, width: 10, borderRadius: 5, backgroundColor: Colors.light.primary },
  fulfillmentTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text },
  fulfillmentDesc: { fontSize: 13, color: Colors.light.textMuted, marginLeft: 28 },
  fulfillmentDetails: { marginTop: Spacing.md, marginLeft: 28 },
  locationSelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.surface, borderWidth: 1, borderColor: Colors.light.border, padding: Spacing.sm, borderRadius: Radius.sm },
  locationTitle: { fontSize: 14, fontWeight: '600', color: Colors.light.text },
  locationDesc: { fontSize: 12, color: Colors.light.textMuted },
  bottomBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.lg, backgroundColor: Colors.light.surface, borderTopWidth: 1, borderTopColor: Colors.light.border, position: 'absolute', bottom: 0, left: 0, right: 0 },
  bottomTotalLabel: { fontSize: 12, color: Colors.light.textMuted, fontWeight: '500' },
  bottomTotalValue: { fontSize: 20, fontWeight: 'bold', color: Colors.light.text },
  payButton: { backgroundColor: Colors.light.primary, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderRadius: Radius.round },
  payButtonText: { color: Colors.light.surface, fontSize: 16, fontWeight: 'bold' }
});
