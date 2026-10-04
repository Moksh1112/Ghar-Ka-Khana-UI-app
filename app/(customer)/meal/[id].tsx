import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Colors, Spacing, Radius, Fonts, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppContext } from '@/store/AppContext';
import { Image } from 'expo-image';
import { Button } from '@/components/ui/Button';

export default function MealDetailScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { plannedMeals, providers, addToCart } = useAppContext();
  
  const meal = plannedMeals.find(m => m.id === id);
  const provider = meal ? providers.find(p => p.id === meal.providerId) : null;

  if (!meal || !provider) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerControls}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: 'center', marginTop: 100, color: colors.textMuted }}>Meal not found</Text>
      </SafeAreaView>
    );
  }

  const isSoldOut = meal.bookedServings >= meal.maxServings;
  const percentageBooked = Math.min((meal.bookedServings / meal.maxServings) * 100, 100);

  const handleReserve = () => {
    if (isSoldOut) {
      Alert.alert("Sold Out", "This meal is fully booked.");
      return;
    }
    addToCart({ ...meal, id: meal.id }); 
    router.push(`/(customer)/checkout?mealId=${meal.id}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        
        {/* Cover Image */}
        <View style={styles.imageContainer}>
          <Image source={meal.image} style={styles.coverImage} contentFit="cover" transition={300} />
          
          {/* Header Controls */}
          <View style={styles.headerControls}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.tagRow}>
            <View style={styles.dateTag}>
              <Text style={styles.dateTagText}>{meal.date}</Text>
            </View>
            <View style={styles.typeTag}>
              <Text style={styles.typeTagText}>{meal.mealType}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color={colors.surface} />
              <Text style={styles.ratingText}>{meal.rating}</Text>
            </View>
          </View>

          <Text style={styles.title}>{meal.name}</Text>
          
          <TouchableOpacity style={styles.providerInlineRow} onPress={() => router.push(`/(customer)/provider/${provider.id}` as any)}>
            <Ionicons name="restaurant-outline" size={16} color={colors.textMuted} />
            <Text style={styles.providerNameInline}>By {provider.name}</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.textMuted} />
          </TouchableOpacity>

          {/* Key Information Cards */}
          <View style={styles.infoCardsRow}>
            <View style={styles.infoCard}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="time-outline" size={20} color={colors.primaryDark} />
              </View>
              <Text style={styles.infoCardLabel}>Pickup Window</Text>
              <Text style={styles.infoCardValue}>{meal.startTime} - {meal.endTime}</Text>
            </View>
            <View style={styles.infoCard}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="bicycle-outline" size={20} color={colors.primaryDark} />
              </View>
              <Text style={styles.infoCardLabel}>Fulfillment</Text>
              <Text style={styles.infoCardValue}>Bulk / Self</Text>
            </View>
          </View>

          {/* Booking Progress */}
          <View style={styles.bookingStatusContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.bookingStatusText}>
                <Text style={{ fontWeight: 'bold' }}>{meal.bookedServings}</Text> of {meal.maxServings} booked
              </Text>
              <Text style={styles.cutoffText}>Cutoff: {meal.cutoffTime}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${percentageBooked}%`, backgroundColor: isSoldOut ? colors.error : colors.primary }]} />
            </View>
            {isSoldOut && <Text style={styles.soldOutWarning}>This meal is fully booked.</Text>}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>What's included</Text>
          <Text style={styles.description}>{meal.description}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Meet the Provider</Text>
          <TouchableOpacity style={styles.providerCard} onPress={() => router.push(`/(customer)/provider/${provider.id}` as any)} activeOpacity={0.9}>
            <Image source={provider.image} style={styles.providerImageSmall} contentFit="cover" />
            <View style={styles.providerInfo}>
              <Text style={styles.providerNameSmall}>{provider.name}</Text>
              <Text style={styles.providerSpeciality}>{provider.speciality}</Text>
              <Text style={styles.providerMeta}>★ {provider.rating} • {provider.reviews} reviews</Text>
            </View>
            <View style={styles.providerActionBtn}>
              <Text style={styles.providerActionText}>View Profile</Text>
            </View>
          </TouchableOpacity>

          <View style={{ height: 150 + (insets.bottom || 20) }} />
        </View>
      </ScrollView>

      {/* BOTTOM ACTION BAR */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
        <View style={styles.priceBreakdown}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total Price</Text>
            <Text style={styles.priceTotal}>₹{meal.price}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.payNowLabel}>Pay Now (Booking)</Text>
            <Text style={styles.payNowAmount}>₹{meal.bookingAmount}</Text>
          </View>
          <Text style={styles.payLaterNote}>Remaining ₹{meal.price - meal.bookingAmount} paid at collection</Text>
        </View>
        
        <Button 
          title={isSoldOut ? 'Sold Out' : `Reserve for ₹${meal.bookingAmount}`}
          onPress={handleReserve}
          disabled={isSoldOut}
          size="md"
          style={styles.reserveButton}
        />
      </View>
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1, backgroundColor: colors.background },
  imageContainer: { width: '100%', height: 320, position: 'relative' },
  coverImage: { width: '100%', height: '100%', backgroundColor: colors.border },
  headerControls: { position: 'absolute', top: Platform.OS === 'android' ? StatusBar.currentHeight! + Spacing.sm : 50, left: Spacing.lg, right: Spacing.lg, flexDirection: 'row', justifyContent: 'space-between' },
  iconButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center', ...Shadows.card },
  content: { padding: Spacing.xl, backgroundColor: colors.background, borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -32 },
  tagRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md, gap: Spacing.sm },
  dateTag: { backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radius.round },
  dateTagText: { color: colors.surface, fontSize: 13, fontWeight: 'bold' },
  typeTag: { backgroundColor: colors.surface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radius.round, borderWidth: 1, borderColor: colors.border },
  typeTagText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.text, paddingHorizontal: 10, paddingVertical: 6, borderRadius: Radius.round, gap: 4 },
  ratingText: { color: colors.surface, fontSize: 14, fontWeight: 'bold' },
  title: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: Spacing.sm, lineHeight: 34, fontFamily: Fonts.sans },
  providerInlineRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xl },
  providerNameInline: { fontSize: 15, color: colors.textMuted, fontWeight: '500', marginLeft: 6, marginRight: 4 },
  infoCardsRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.xl },
  infoCard: { flex: 1, backgroundColor: colors.surface, padding: Spacing.md, borderRadius: Radius.md, borderWidth: 1, borderColor: colors.border },
  infoIconWrapper: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF4ED', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  infoCardLabel: { fontSize: 12, color: colors.textMuted, marginBottom: 2 },
  infoCardValue: { fontSize: 14, fontWeight: 'bold', color: colors.text },
  bookingStatusContainer: { backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: Radius.md, borderWidth: 1, borderColor: colors.border },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md },
  bookingStatusText: { fontSize: 14, color: colors.text },
  cutoffText: { fontSize: 14, fontWeight: '600', color: colors.error },
  progressBarBg: { height: 8, backgroundColor: colors.background, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  soldOutWarning: { color: colors.error, fontSize: 13, fontWeight: '600', marginTop: Spacing.sm, textAlign: 'center' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: Spacing.xl },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: Spacing.md },
  description: { fontSize: 16, color: colors.text, lineHeight: 24 },
  providerCard: { backgroundColor: colors.surface, padding: Spacing.md, borderRadius: Radius.md, borderWidth: 1, borderColor: colors.border },
  providerImageSmall: { width: 56, height: 56, borderRadius: Radius.md, backgroundColor: colors.background, marginBottom: Spacing.sm },
  providerInfo: { marginBottom: Spacing.md },
  providerNameSmall: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  providerSpeciality: { fontSize: 14, color: colors.textMuted, marginBottom: 4 },
  providerMeta: { fontSize: 13, fontWeight: '500', color: colors.text },
  providerActionBtn: { alignItems: 'center', paddingVertical: Spacing.sm, backgroundColor: colors.background, borderRadius: Radius.sm },
  providerActionText: { color: colors.text, fontWeight: '600', fontSize: 14 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.surface, paddingHorizontal: Spacing.xl, paddingTop: Spacing.md, paddingBottom: Platform.OS === 'ios' ? 34 : 20, borderTopWidth: 1, borderTopColor: colors.border, ...Shadows.card },
  priceBreakdown: { marginBottom: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  priceLabel: { fontSize: 14, color: colors.textMuted },
  priceTotal: { fontSize: 14, fontWeight: '600', color: colors.textMuted, textDecorationLine: 'line-through' },
  payNowLabel: { fontSize: 15, fontWeight: 'bold', color: colors.text },
  payNowAmount: { fontSize: 20, fontWeight: 'bold', color: colors.primaryDark },
  payLaterNote: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  reserveButton: { marginTop: 0 },
});
