import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function ProviderMealsScreen() {
  const { plannedMeals, user } = useAppContext();
  const providerMeals = plannedMeals.filter(m => m.providerId === user?.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Planned Meals</Text>
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={Colors.light.surface} />
          <Text style={styles.addButtonText}>Plan New Meal</Text>
        </TouchableOpacity>

        {providerMeals.map(meal => (
          <View key={meal.id} style={styles.mealCard}>
            <Image source={meal.image} style={styles.mealImage} contentFit="cover" />
            <View style={styles.mealContent}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: meal.status === 'ACTIVE' ? '#ECFCCB' : '#F3F4F6' }]}>
                  <Text style={[styles.statusText, { color: meal.status === 'ACTIVE' ? '#65A30D' : Colors.light.textMuted }]}>{meal.status}</Text>
                </View>
              </View>
              
              <Text style={styles.mealDate}>{meal.date} • {meal.mealType}</Text>
              
              <View style={styles.mealStats}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Price</Text>
                  <Text style={styles.statValue}>₹{meal.price}</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Booked</Text>
                  <Text style={styles.statValue}>{meal.bookedServings} / {meal.maxServings}</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Cutoff</Text>
                  <Text style={styles.statValue}>{meal.cutoffTime}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        {providerMeals.length === 0 && (
          <Text style={{ textAlign: 'center', color: Colors.light.textMuted, marginTop: 40 }}>You haven't planned any meals yet.</Text>
        )}
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: Colors.light.surface, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text },
  container: { flex: 1, padding: Spacing.lg },
  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.light.primary, padding: Spacing.md, borderRadius: Radius.round, marginBottom: Spacing.xl, gap: Spacing.sm },
  addButtonText: { color: Colors.light.surface, fontWeight: 'bold', fontSize: 16 },
  mealCard: { backgroundColor: Colors.light.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.light.border, marginBottom: Spacing.md, overflow: 'hidden' },
  mealImage: { width: '100%', height: 120, backgroundColor: Colors.light.background },
  mealContent: { padding: Spacing.md },
  mealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  mealName: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.sm },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  mealDate: { fontSize: 13, color: Colors.light.textMuted, marginBottom: Spacing.md },
  mealStats: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: Colors.light.border, paddingTop: Spacing.md },
  statBox: { flex: 1 },
  statLabel: { fontSize: 11, color: Colors.light.textMuted, marginBottom: 2 },
  statValue: { fontSize: 14, fontWeight: '600', color: Colors.light.text },
});
