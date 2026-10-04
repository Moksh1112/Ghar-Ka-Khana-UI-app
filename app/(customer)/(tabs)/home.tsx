import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/store/AppContext';

export default function CustomerHomeScreen() {
  const router = useRouter();
  const { user, providers, plannedMeals } = useAppContext();

  const handleProviderPress = (id: string) => {
    router.push(`/(customer)/provider/${id}` as any);
  };

  const handleMealPress = (id: string) => {
    router.push(`/(customer)/meal/${id}` as any);
  };

  const featuredProviders = providers.slice(0, 2);
  const activeMeals = plannedMeals.filter(m => m.status === 'ACTIVE').slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* TOP AREA */}
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Good afternoon, {user?.name || 'Moksh'}</Text>
            <View style={styles.locationWrapper}>
              <Ionicons name="location-sharp" size={14} color={Colors.light.primary} />
              <Text style={styles.locationText}>{user?.hostel || 'Hostel A, North Campus'}</Text>
              <Ionicons name="chevron-down" size={14} color={Colors.light.text} />
            </View>
          </View>
          <TouchableOpacity style={styles.profileIcon} onPress={() => router.push('/(customer)/(tabs)/profile')}>
            <Ionicons name="person-circle-outline" size={40} color={Colors.light.textMuted} />
          </TouchableOpacity>
        </View>

        {/* DISCOVERY */}
        <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/(customer)/(tabs)/discover')}>
          <Ionicons name="search" size={20} color={Colors.light.icon} />
          <Text style={styles.searchText}>Search upcoming home meals...</Text>
        </TouchableOpacity>

        {/* QUICK FILTERS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer} contentContainerStyle={styles.filtersContent}>
          {['Tomorrow', 'Lunch', 'Dinner', 'Vegetarian', 'Under ₹150', 'Top Rated'].map((filter, index) => (
            <TouchableOpacity key={index} style={styles.filterChip}>
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* UPCOMING MEALS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tomorrow's Home Meals</Text>
          <TouchableOpacity onPress={() => router.push('/(customer)/(tabs)/discover')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
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

        {/* HOW IT WORKS */}
        <View style={styles.deliveryInfoSection}>
          <Text style={styles.sectionTitle}>How Ghar Ka Khana Works</Text>
          <View style={styles.deliveryCardsRow}>
            <View style={styles.deliveryCard}>
              <View style={styles.deliveryIconWrapper}>
                <Ionicons name="calendar-outline" size={24} color={Colors.light.primary} />
              </View>
              <Text style={styles.deliveryCardTitle}>1. Pre-Book</Text>
              <Text style={styles.deliveryCardText}>Reserve upcoming meals by paying a small booking amount.</Text>
            </View>
            <View style={styles.deliveryCard}>
              <View style={styles.deliveryIconWrapperNeutral}>
                <Ionicons name="bus-outline" size={24} color={Colors.light.text} />
              </View>
              <Text style={styles.deliveryCardTitle}>2. Bulk Delivery</Text>
              <Text style={styles.deliveryCardText}>Provider prepares exact quantities and sends a batch to your hostel/PG.</Text>
            </View>
          </View>
        </View>

        {/* FEATURED PROVIDERS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Providers</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.providersScroll} contentContainerStyle={styles.providersContent}>
          {featuredProviders.map((provider) => (
            <TouchableOpacity key={provider.id} style={styles.providerCard} onPress={() => handleProviderPress(provider.id)}>
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
        </ScrollView>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 14,
    color: Colors.light.textMuted,
    marginBottom: 4,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginLeft: 4,
    marginRight: 4,
  },
  profileIcon: {
    paddingLeft: Spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    marginHorizontal: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    borderRadius: Radius.round,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: Spacing.md,
  },
  searchText: {
    color: Colors.light.textMuted,
    marginLeft: Spacing.sm,
    fontSize: 15,
  },
  filtersContainer: {
    marginBottom: Spacing.lg,
  },
  filtersContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  filterChip: {
    backgroundColor: Colors.light.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.round,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  filterText: {
    fontSize: 13,
    color: Colors.light.text,
    fontWeight: '500',
  },
  deliveryInfoSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    marginTop: Spacing.sm,
  },
  deliveryCardsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  deliveryCard: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  deliveryIconWrapper: {
    backgroundColor: '#FFEDD5',
    width: 40,
    height: 40,
    borderRadius: Radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  deliveryIconWrapperNeutral: {
    backgroundColor: Colors.light.background,
    width: 40,
    height: 40,
    borderRadius: Radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  deliveryCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  deliveryCardText: {
    fontSize: 12,
    color: Colors.light.textMuted,
    lineHeight: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  seeAllText: {
    color: Colors.light.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  providersScroll: {
    marginBottom: Spacing.xl,
  },
  providersContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  providerCard: {
    width: 240,
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    overflow: 'hidden',
  },
  providerImage: {
    height: 120,
    width: '100%',
    backgroundColor: Colors.light.background,
  },
  providerInfo: {
    padding: Spacing.md,
  },
  providerHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.sm,
    gap: 2,
  },
  ratingText: {
    color: Colors.light.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  providerSpeciality: {
    fontSize: 13,
    color: Colors.light.textMuted,
    marginBottom: 8,
  },
  providerMeta: {
    fontSize: 12,
    color: Colors.light.text,
    fontWeight: '500',
  },
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
