import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Colors, Spacing, Radius, Shadows, Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/store/AppContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

export default function OrderStatusScreen() {
  const { colors } = useAppContext();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { reservations, plannedMeals, providers } = useAppContext();
  
  const reservation = reservations.find(r => r.id === id);
  const meal = reservation ? plannedMeals.find(m => m.id === reservation.plannedMealId) : null;
  const provider = meal ? providers.find(p => p.id === meal.providerId) : null;

  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (!reservation) return;
    const statuses = reservation.fulfillmentMethod === 'BULK_DELIVERY' 
      ? ['RESERVED', 'PREPARING', 'READY', 'AT PICKUP LOCATION', 'AT_LOCATION', 'READY FOR COLLECTION', 'COLLECTED']
      : ['RESERVED', 'PREPARING', 'READY', 'READY FOR PICKUP', 'COLLECTED'];
    
    const currentIndex = statuses.indexOf(reservation.status);
    setAnimationStep(currentIndex >= 0 ? currentIndex : 0);
  }, [reservation]);

  if (!reservation || !meal) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.textMuted }}>Reservation not found</Text>
        </View>
    </SafeAreaView>
  );
}

  const isCollected = (reservation.status as string) === 'COLLECTED' || (reservation.status as string) === 'COLLECTED';

  const timelineBulk = [
    { label: 'Meal Reserved', sub: 'Booking paid', status: 'RESERVED' },
    { label: 'Provider Preparing', sub: 'Cooking in progress', status: 'PREPARING' },
    { label: 'Meal Ready', sub: 'Packed and ready', status: 'READY' },
    { label: 'Sent to Location', sub: 'On the way to PG', status: 'AT PICKUP LOCATION' },
    { label: 'Ready for Collection', sub: 'Present OTP to collect', status: 'READY FOR COLLECTION' },
  ];

  const timelineSelf = [
    { label: 'Meal Reserved', sub: 'Booking paid', status: 'RESERVED' },
    { label: 'Provider Preparing', sub: 'Cooking in progress', status: 'PREPARING' },
    { label: 'Meal Ready', sub: 'Ready for pickup', status: 'READY' },
    { label: 'Ready for Collection', sub: 'Present OTP to collect', status: 'READY FOR PICKUP' },
  ];

  const timeline = reservation.fulfillmentMethod === 'BULK_DELIVERY' ? timelineBulk : timelineSelf;
  const remainingAmount = reservation.totalAmount - reservation.bookingAmountPaid;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Res #{reservation.id.slice(-4)}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 40 }]} showsVerticalScrollIndicator={false}>
        
        {/* Top Summary Card */}
        <View style={styles.summaryCard}>
          <Image source={meal.image} style={styles.summaryImg} contentFit="cover" />
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryTitle}>{meal.name}</Text>
            <Text style={styles.summaryProvider}>By {provider?.name}</Text>
            <Text style={styles.summaryTiming}>{meal.date} • {meal.mealType}</Text>
          </View>
        </View>

        {/* OTP Collection Card */}
        <View style={[styles.otpCard, isCollected && styles.otpCardCollected]}>
          <View style={styles.otpHeader}>
            <View>
              <Text style={styles.otpLabel}>{isCollected ? 'Collected' : 'Collection OTP'}</Text>
              <Text style={styles.otpSubLabel}>
                {isCollected ? 'Meal collected successfully.' : `Pay remaining ₹${remainingAmount} at pickup`}
              </Text>
            </View>
            <View style={styles.otpIconWrapper}>
              <Ionicons name="qr-code-outline" size={24} color={colors.primaryDark} />
            </View>
          </View>
          {!isCollected && (
            <View style={styles.otpBox}>
              <Text style={styles.otpValue}>{reservation.otp}</Text>
            </View>
          )}
        </View>

        {/* Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Live Status</Text>
          
          <View style={styles.timelineContainer}>
            {timeline.map((step, index) => {
              const isActive = index <= animationStep;
              const isCurrent = index === animationStep;
              const isLast = index === timeline.length - 1;
              return (
                <View key={index} style={styles.timelineRow}>
                  <View style={styles.timelineIconContainer}>
                    <View style={[
                      styles.timelineDot, 
                      isActive && styles.timelineDotActive,
                      isCurrent && styles.timelineDotCurrent
                    ]}>
                      {isActive && <Ionicons name="checkmark" size={12} color={colors.surface} />}
                    </View>
                    {!isLast && <View style={[styles.timelineLine, isActive && index < animationStep && styles.timelineLineActive]} />}
                  </View>
                  <View style={styles.timelineTextContainer}>
                    <Text style={[styles.timelineLabel, isActive && styles.timelineLabelActive]}>
                      {step.label}
                    </Text>
                    <Text style={styles.timelineSubText}>{step.sub}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, fontFamily: Fonts.sans },
  container: { flex: 1 },
  contentContainer: { padding: Spacing.lg },
  
  summaryCard: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.lg, borderWidth: 1, borderColor: colors.border, ...Shadows.card },
  summaryImg: { width: 70, height: 70, borderRadius: Radius.md, backgroundColor: colors.background },
  summaryInfo: { flex: 1, marginLeft: Spacing.md, justifyContent: 'center' },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 2 },
  summaryProvider: { fontSize: 14, color: colors.textMuted, marginBottom: 4 },
  summaryTiming: { fontSize: 13, color: colors.primaryDark, fontWeight: '600' },
  
  otpCard: { backgroundColor: colors.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.primary, padding: Spacing.lg, marginBottom: Spacing.lg, ...Shadows.card },
  otpCardCollected: { borderColor: colors.border, backgroundColor: colors.background },
  otpHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  otpLabel: { color: colors.text, fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  otpSubLabel: { color: colors.textMuted, fontSize: 13 },
  otpIconWrapper: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF4ED', alignItems: 'center', justifyContent: 'center' },
  otpBox: { backgroundColor: colors.background, paddingVertical: Spacing.md, borderRadius: Radius.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed' },
  otpValue: { color: colors.text, fontSize: 40, fontWeight: '900', letterSpacing: 12 },
  
  timelineCard: { backgroundColor: colors.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, padding: Spacing.xl, ...Shadows.card },
  timelineTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: Spacing.xl, fontFamily: Fonts.sans },
  timelineContainer: { marginLeft: Spacing.xs },
  timelineRow: { flexDirection: 'row' },
  timelineIconContainer: { alignItems: 'center', width: 24 },
  timelineDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.background, borderWidth: 2, borderColor: colors.border, zIndex: 2, alignItems: 'center', justifyContent: 'center' },
  timelineDotActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  timelineDotCurrent: { borderWidth: 4, borderColor: 'rgba(249, 115, 22, 0.3)' },
  timelineLine: { width: 2, flex: 1, backgroundColor: colors.border, marginTop: -4, marginBottom: -4, zIndex: 1 },
  timelineLineActive: { backgroundColor: colors.primary },
  timelineTextContainer: { flex: 1, paddingBottom: 40, paddingLeft: Spacing.md, marginTop: -2 },
  timelineLabel: { fontSize: 16, color: colors.textMuted, fontWeight: '600', marginBottom: 2 },
  timelineLabelActive: { color: colors.text, fontWeight: 'bold' },
  timelineSubText: { fontSize: 13, color: colors.textMuted },
});
