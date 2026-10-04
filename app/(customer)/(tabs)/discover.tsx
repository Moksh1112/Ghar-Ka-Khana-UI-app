import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/store/AppContext';
import { Image } from 'expo-image';

export default function DiscoverScreen() {
  const router = useRouter();
  const { providers, plannedMeals } = useAppContext();

  const handleMealPress = (id: string) => {
    router.push(`/(customer)/meal/${id}` as any);
  };

  const activeMeals = plannedMeals.filter(m => m.status === 'ACTIVE');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Home Food</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.light.icon} />
          <Text style={styles.searchText}>Search upcoming home meals...</Text>
        </View>

        {/* UPCOMING MEALS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Meals</Text>
        </View>

        {activeMeals.map(meal => {
          const provider = providers.find(p => p.id === meal.providerId);
          return (
            <TouchableOpacity key={meal.id} style={styles.foodCard} onPress={() => handleMealPress(meal.id)}>
              <Image source={meal.image} style={styles.foodImage} contentFit="cover" />
              <View style={styles.foodCardContent}>
                <View style={styles.foodHeaderRow}>
                  <Text style={styles.foodName}>{meal.name}</Text>
                  <Text style={styles.foodDate}>{meal.date} • {meal.mealType}</Text>
                </View>
                <Text style={styles.foodProvider}>{provider?.name} • ★ {meal.rating}</Text>
                
                <View style={styles.bookingStatusContainer}>
                  <Text style={styles.bookingStatusText}>{meal.bookedServings} / {meal.maxServings} booked</Text>
                  <Text style={styles.cutoffText}>Closes {meal.cutoffTime}</Text>
                </View>

                <View style={styles.foodBottomRow}>
                  <View>
                    <Text style={styles.foodPrice}>₹{meal.price}</Text>
                  </View>
                  <View style={styles.reserveButton}>
                    <Text style={styles.reserveButtonText}>Reserve for ₹{meal.bookingAmount}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* All Providers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Verified Providers</Text>
        </View>

        {providers.map((provider) => (
          <TouchableOpacity key={provider.id} style={styles.providerCard} onPress={() => router.push(`/(customer)/provider/${provider.id}` as any)}>
            <Image source={provider.image} style={styles.providerImage} contentFit="cover" />
            <View style={styles.providerInfo}>
              <View style={styles.providerHeaderRow}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color={Colors.light.surface} />
                  <Text style={styles.ratingText}>{provider.rating}</Text>
                </View>
              </View>
              <Text style={styles.providerSpeciality}>{provider.speciality}</Text>
              <Text style={styles.providerMeta}>{provider.distance} • {provider.mealsServed} meals served</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: Colors.light.text },
  container: { flex: 1 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.surface, marginHorizontal: Spacing.lg, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm + 4, borderRadius: Radius.round, borderWidth: 1, borderColor: Colors.light.border, marginBottom: Spacing.lg },
  searchText: { color: Colors.light.textMuted, marginLeft: Spacing.sm, fontSize: 15 },
  sectionHeader: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text },
  providerCard: { marginHorizontal: Spacing.lg, backgroundColor: Colors.light.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.light.border, overflow: 'hidden', marginBottom: Spacing.md },
  providerImage: { height: 160, width: '100%', backgroundColor: Colors.light.background },
  providerInfo: { padding: Spacing.md },
  providerHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  providerName: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: Radius.sm, gap: 2 },
  ratingText: { color: Colors.light.surface, fontSize: 12, fontWeight: 'bold' },
  providerSpeciality: { fontSize: 14, color: Colors.light.textMuted, marginBottom: 8 },
  providerMeta: { fontSize: 13, color: Colors.light.text, fontWeight: '500' },
  foodCard: {
    backgroundColor: Colors.light.surface,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.light.background,
  },
  foodCardContent: {
    padding: Spacing.md,
  },
  foodHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    flex: 1,
  },
  foodDate: {
    fontSize: 12,
    color: Colors.light.primaryDark,
    fontWeight: 'bold',
    backgroundColor: '#FFF4ED',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  foodProvider: {
    fontSize: 14,
    color: Colors.light.textMuted,
    marginBottom: 8,
  },
  bookingStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  bookingStatusText: {
    fontSize: 13,
    color: Colors.light.text,
    fontWeight: '500',
  },
  cutoffText: {
    fontSize: 13,
    color: '#ef4444',
    fontWeight: '500',
  },
  foodBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: Spacing.md,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  reserveButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.round,
  },
  reserveButtonText: {
    color: Colors.light.surface,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
