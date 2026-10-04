import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/store/AppContext';

export default function ProviderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { providers, meals, addToCart } = useAppContext();

  const provider = providers.find(p => p.id === id);
  const providerMeals = meals.filter(m => m.providerId === id);

  if (!provider) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 100 }}>Provider not found</Text>
        <TouchableOpacity onPress={() => router.back()}><Text style={{ textAlign: 'center', color: Colors.light.primary }}>Go Back</Text></TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleOrderPress = (meal: any) => {
    addToCart(meal);
    router.push('/(customer)/checkout');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.imageContainer}>
          <Image source={provider.image} style={styles.coverImage} contentFit="cover" />
          <View style={styles.headerControls}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={24} color={Colors.light.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.providerName}>{provider.name}</Text>
          <Text style={styles.speciality}>{provider.speciality}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.metaBadge}>
              <Ionicons name="star" size={14} color={Colors.light.surface} />
              <Text style={styles.metaBadgeText}>{provider.rating}</Text>
            </View>
            <Text style={styles.metaText}>{provider.reviews} reviews • {provider.distance}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Menu</Text>
        </View>

        {providerMeals.map(meal => (
          <View key={meal.id} style={styles.foodCard}>
            <Image source={meal.image} style={styles.foodImage} contentFit="cover" />
            <View style={styles.foodCardContent}>
              <Text style={styles.foodName}>{meal.name}</Text>
              <Text style={styles.foodDesc} numberOfLines={2}>{meal.description}</Text>
              <View style={styles.foodBottomRow}>
                <Text style={styles.foodPrice}>₹{meal.price}</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => handleOrderPress(meal)}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1 },
  imageContainer: { height: 220, position: 'relative' },
  coverImage: { width: '100%', height: '100%' },
  headerControls: { position: 'absolute', top: Spacing.md, left: Spacing.md, right: Spacing.md, flexDirection: 'row', justifyContent: 'space-between' },
  iconButton: { backgroundColor: 'rgba(255,255,255,0.9)', padding: 8, borderRadius: Radius.round },
  infoSection: { padding: Spacing.lg, backgroundColor: Colors.light.surface, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  providerName: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text, marginBottom: 4 },
  speciality: { fontSize: 16, color: Colors.light.textMuted, marginBottom: Spacing.md },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  metaBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: Radius.sm, gap: 4 },
  metaBadgeText: { color: Colors.light.surface, fontWeight: 'bold', fontSize: 13 },
  metaText: { fontSize: 14, color: Colors.light.textMuted },
  sectionHeader: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, marginTop: Spacing.sm },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.light.text },
  foodCard: { flexDirection: 'row', backgroundColor: Colors.light.surface, marginHorizontal: Spacing.lg, marginBottom: Spacing.md, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.light.border, padding: Spacing.sm },
  foodImage: { width: 100, height: 100, borderRadius: Radius.md, backgroundColor: Colors.light.background },
  foodCardContent: { flex: 1, marginLeft: Spacing.md, justifyContent: 'center' },
  foodName: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text, marginBottom: 4 },
  foodDesc: { fontSize: 12, color: Colors.light.textMuted, marginBottom: Spacing.md },
  foodBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  foodPrice: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text },
  addButton: { backgroundColor: Colors.light.primary, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: Radius.round },
  addButtonText: { color: Colors.light.surface, fontWeight: 'bold', fontSize: 14 },
});
