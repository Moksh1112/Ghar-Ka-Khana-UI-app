import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/store/AppContext';
import { Image } from 'expo-image';

export default function MealDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { plannedMeals, providers, addToCart } = useAppContext();
  
  const meal = plannedMeals.find(m => m.id === id);
  const provider = meal ? providers.find(p => p.id === meal.providerId) : null;

  if (!meal || !provider) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>Meal not found</Text>
      </SafeAreaView>
    );
  }

  const isSoldOut = meal.bookedServings >= meal.maxServings;

  const handleReserve = () => {
    if (isSoldOut) {
      Alert.alert("Sold Out", "This meal is fully booked.");
      return;
    }
    // Set this meal in cart/checkout logic
    // We'll clear the existing cart and add this as a single item for checkout
    // Because the checkout process expects `cart` we can adapt it or just pass params
    addToCart({ ...meal, id: meal.id }); 
    router.push(`/(customer)/checkout?mealId=${meal.id}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        
        {/* Cover Image */}
        <View style={styles.imageContainer}>
          <Image source={meal.image} style={styles.coverImage} contentFit="cover" />
          <View style={styles.headerControls}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-outline" size={24} color={Colors.light.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{meal.name}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color={Colors.light.surface} />
              <Text style={styles.ratingText}>{meal.rating}</Text>
            </View>
          </View>
          
          <Text style={styles.providerName}>By {provider.name}</Text>

          <View style={styles.timeInfoBox}>
            <Ionicons name="calendar" size={20} color={Colors.light.primary} />
            <View>
              <Text style={styles.timeInfoLabel}>{meal.date} • {meal.mealType}</Text>
              <Text style={styles.timeInfoValue}>{meal.startTime} – {meal.endTime}</Text>
            </View>
          </View>

          <View style={styles.bookingStatusContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${(meal.bookedServings / meal.maxServings) * 100}%` }]} />
            </View>
            <View style={styles.bookingRow}>
              <Text style={styles.bookingStatusText}>{meal.bookedServings} of {meal.maxServings} booked</Text>
              <Text style={styles.cutoffText}>Closes {meal.cutoffTime}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>About this meal</Text>
          <Text style={styles.description}>{meal.description}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Provider Information</Text>
          <TouchableOpacity style={styles.providerCard} onPress={() => router.push(`/(customer)/provider/${provider.id}` as any)}>
            <Image source={provider.image} style={styles.providerImageSmall} contentFit="cover" />
            <View style={styles.providerInfo}>
              <Text style={styles.providerNameSmall}>{provider.name}</Text>
              <Text style={styles.providerSpeciality}>{provider.speciality}</Text>
              <Text style={styles.providerMeta}>★ {provider.rating} • {provider.reviews} reviews</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* BOTTOM ACTION BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total: ₹{meal.price}</Text>
          <Text style={styles.bookingAmountText}>Reserve for ₹{meal.bookingAmount}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.actionButton, isSoldOut && styles.actionButtonDisabled]} 
          onPress={handleReserve}
          disabled={isSoldOut}
        >
          <Text style={styles.actionButtonText}>
            {isSoldOut ? 'Sold Out' : 'Reserve Meal'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background },
  container: { flex: 1, backgroundColor: Colors.light.background },
  imageContainer: { width: '100%', height: 280, position: 'relative' },
  coverImage: { width: '100%', height: '100%', backgroundColor: Colors.light.border },
  headerControls: { position: 'absolute', top: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 50, left: Spacing.lg, right: Spacing.lg, flexDirection: 'row', justifyContent: 'space-between' },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.light.surface, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  content: { padding: Spacing.xl },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text, flex: 1 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.sm, gap: 4 },
  ratingText: { color: Colors.light.surface, fontSize: 14, fontWeight: 'bold' },
  providerName: { fontSize: 16, color: Colors.light.textMuted, marginBottom: Spacing.xl },
  timeInfoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF4ED', padding: Spacing.md, borderRadius: Radius.md, gap: Spacing.md, marginBottom: Spacing.xl },
  timeInfoLabel: { fontSize: 13, color: Colors.light.primaryDark, fontWeight: '600', marginBottom: 2 },
  timeInfoValue: { fontSize: 15, fontWeight: 'bold', color: Colors.light.text },
  bookingStatusContainer: { marginBottom: Spacing.xl },
  progressBarBg: { height: 8, backgroundColor: Colors.light.border, borderRadius: 4, marginBottom: 8, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: Colors.light.primary, borderRadius: 4 },
  bookingRow: { flexDirection: 'row', justifyContent: 'space-between' },
  bookingStatusText: { fontSize: 13, fontWeight: '600', color: Colors.light.text },
  cutoffText: { fontSize: 13, fontWeight: '600', color: '#ef4444' },
  divider: { height: 1, backgroundColor: Colors.light.border, marginVertical: Spacing.lg },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text, marginBottom: Spacing.md },
  description: { fontSize: 15, color: Colors.light.text, lineHeight: 22 },
  providerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.surface, padding: Spacing.md, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.light.border },
  providerImageSmall: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.light.border },
  providerInfo: { flex: 1, marginLeft: Spacing.md },
  providerNameSmall: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text, marginBottom: 2 },
  providerSpeciality: { fontSize: 13, color: Colors.light.textMuted, marginBottom: 4 },
  providerMeta: { fontSize: 12, fontWeight: '500', color: Colors.light.text },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.light.surface, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg, borderTopWidth: 1, borderTopColor: Colors.light.border, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 10 },
  priceContainer: { flex: 1 },
  priceLabel: { fontSize: 12, color: Colors.light.textMuted, marginBottom: 2 },
  bookingAmountText: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text },
  actionButton: { backgroundColor: Colors.light.primary, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderRadius: Radius.round },
  actionButtonDisabled: { backgroundColor: Colors.light.border },
  actionButtonText: { color: Colors.light.surface, fontWeight: 'bold', fontSize: 16 },
});
