import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius, Fonts, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/store/AppContext';
import { MealCard } from '@/components/ui/MealCard';
import { ProviderCard } from '@/components/ui/ProviderCard';

export default function DiscoverScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const router = useRouter();
  const { providers, plannedMeals } = useAppContext();

  const handleMealPress = (id: string) => {
    router.push(`/(customer)/meal/${id}` as any);
  };

  const activeMeals = plannedMeals.filter(m => m.status === 'ACTIVE');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Meals</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.icon} />
          <Text style={styles.searchText}>Search upcoming home meals...</Text>
        </View>

        {/* UPCOMING MEALS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Meals</Text>
        </View>

        {activeMeals.map(meal => {
          const provider = providers.find(p => p.id === meal.providerId);
          return (
            <MealCard
              key={meal.id}
              meal={meal}
              providerName={provider?.name}
              onPress={() => handleMealPress(meal.id)}
            />
          );
        })}

        {/* All Providers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Verified Providers</Text>
        </View>

        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            onPress={() => router.push(`/(customer)/provider/${provider.id}` as any)}
          />
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  headerTitle: { fontSize: 24, fontWeight: '800', color: colors.text, fontFamily: Fonts.sans },
  container: { flex: 1 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, marginHorizontal: Spacing.lg, paddingHorizontal: Spacing.md, paddingVertical: Spacing.md, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, marginBottom: Spacing.xl, ...Shadows.card },
  searchText: { color: colors.textMuted, marginLeft: Spacing.sm, fontSize: 15 },
  sectionHeader: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.md, marginTop: Spacing.xs },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, fontFamily: Fonts.sans },
});
