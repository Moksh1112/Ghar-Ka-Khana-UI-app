import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/store/AppContext';
import { MealCard } from '@/components/ui/MealCard';
import { ProviderCard } from '@/components/ui/ProviderCard';

export default function CustomerHomeScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const router = useRouter();
  const { user, providers, plannedMeals } = useAppContext();

  const featuredProviders = providers.slice(0, 3);
  const activeMeals = plannedMeals.filter(m => m.status === 'ACTIVE').slice(0, 4);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Good afternoon, {user?.name || 'Moksh'}</Text>
            <View style={styles.locationWrapper}>
              <Ionicons name="location-sharp" size={14} color={colors.primary} />
              <Text style={styles.locationText}>{user?.hostel || 'Hostel A, North Campus'}</Text>
              <Ionicons name="chevron-down" size={14} color={colors.text} />
            </View>
          </View>
          <TouchableOpacity style={styles.profileBtn} onPress={() => router.push('/(customer)/(tabs)/profile')}>
            <Ionicons name="person-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* HERO SEARCH */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>What are you craving for tomorrow?</Text>
          <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/(customer)/(tabs)/discover')}>
            <Ionicons name="search" size={20} color={colors.icon} />
            <Text style={styles.searchText}>Search meals, providers, cuisines...</Text>
          </TouchableOpacity>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {['Tomorrow', 'Lunch', 'Dinner', 'Vegetarian', 'Under ₹150', 'Top Rated'].map((filter, i) => (
              <TouchableOpacity key={i} style={styles.filterChip}>
                <Text style={styles.filterText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* TOMORROW'S MEALS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tomorrow's Home Meals</Text>
            <TouchableOpacity onPress={() => router.push('/(customer)/(tabs)/discover')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          {activeMeals.map(meal => {
            const provider = providers.find(p => p.id === meal.providerId);
            return (
              <MealCard 
                key={meal.id}
                meal={meal}
                providerName={provider?.name}
                providerRating={provider?.rating}
                style={styles.mealCard}
                onPress={() => router.push(`/(customer)/meal/${meal.id}` as any)}
              />
            );
          })}
        </View>

        {/* HOW IT WORKS BANNER */}
        <View style={styles.infoBanner}>
          <View style={styles.infoBannerContent}>
            <Text style={styles.infoBannerTitle}>Pre-book & Save</Text>
            <Text style={styles.infoBannerText}>Reserve home-cooked meals 24hrs in advance. Delivered hot to your hostel.</Text>
          </View>
          <Ionicons name="restaurant-outline" size={48} color="rgba(249, 115, 22, 0.2)" style={styles.infoBannerIcon} />
        </View>

        {/* FEATURED PROVIDERS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trusted Local Kitchens</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.providersScrollContent}>
            {featuredProviders.map(provider => (
              <ProviderCard 
                key={provider.id}
                provider={provider}
                style={styles.providerCard}
                onPress={() => router.push(`/(customer)/provider/${provider.id}` as any)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
    backgroundColor: colors.background,
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 4,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 4,
    marginRight: 4,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.round,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    backgroundColor: colors.background,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: Spacing.lg,
    width: '85%',
    lineHeight: 34,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: Spacing.md,
  },
  searchText: {
    color: colors.textMuted,
    marginLeft: Spacing.sm,
    fontSize: 15,
  },
  filterScroll: {
    gap: Spacing.sm,
  },
  filterChip: {
    backgroundColor: colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.round,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  mealCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  infoBanner: {
    backgroundColor: '#FFF4ED',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xxl,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FED7AA',
    overflow: 'hidden',
  },
  infoBannerContent: {
    flex: 1,
    zIndex: 1,
  },
  infoBannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginBottom: Spacing.sm,
  },
  infoBannerText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  infoBannerIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    zIndex: 0,
    transform: [{ rotate: '-15deg' }]
  },
  providersScrollContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  providerCard: {
    width: 260,
  },
});
