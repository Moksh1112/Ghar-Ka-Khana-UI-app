import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/store/AppContext';

export default function OrderStatusScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { reservations } = useAppContext();
  const reservation = reservations.find(r => r.id === id);
  const [animationStep, setAnimationStep] = useState(0);

  // Handle timeline progression
  useEffect(() => {
    if (!reservation) return;
    const statuses = reservation.fulfillmentMethod === 'BULK_DELIVERY' 
      ? ['RESERVED', 'PREPARING', 'READY', 'SENT', 'AT_LOCATION', 'READY_FOR_COLLECTION', 'COMPLETED']
      : ['RESERVED', 'PREPARING', 'READY', 'READY_FOR_PICKUP', 'COMPLETED'];
    
    const currentIndex = statuses.indexOf(reservation.status);
    setAnimationStep(currentIndex >= 0 ? currentIndex : 0);
  }, [reservation]);

  if (!reservation) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Reservation not found</Text>
          <TouchableOpacity onPress={() => router.back()}><Text style={{ color: Colors.light.primary, marginTop: Spacing.md }}>Go Back</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const timelineBulk = [
    { label: 'Meal Reserved (Booking Paid)', status: 'RESERVED' },
    { label: 'Provider is Preparing', status: 'PREPARING' },
    { label: 'Meal is Ready', status: 'READY' },
    { label: 'Batch Sent to Location', status: 'SENT' },
    { label: 'Ready for Collection', status: 'READY_FOR_COLLECTION' },
  ];

  const timelineSelf = [
    { label: 'Meal Reserved (Booking Paid)', status: 'RESERVED' },
    { label: 'Provider is Preparing', status: 'PREPARING' },
    { label: 'Meal is Ready', status: 'READY' },
    { label: 'Ready for Pickup', status: 'READY_FOR_PICKUP' },
  ];

  const timeline = reservation.fulfillmentMethod === 'BULK_DELIVERY' ? timelineBulk : timelineSelf;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reservation #{reservation.id}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        
        {/* OTP Section */}
        <View style={styles.otpCard}>
          <View style={styles.otpHeader}>
            <Text style={styles.otpLabel}>Collection OTP</Text>
            <Ionicons name="qr-code-outline" size={24} color={Colors.light.surface} />
          </View>
          <Text style={styles.otpValue}>{reservation.otp}</Text>
          <Text style={styles.otpDesc}>Show this code and pay remaining ₹{reservation.totalAmount - reservation.bookingAmountPaid} at collection.</Text>
        </View>

        {/* Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Tracking Status</Text>
          
          <View style={styles.timelineContainer}>
            {timeline.map((step, index) => {
              const isActive = index <= animationStep;
              const isLast = index === timeline.length - 1;
              return (
                <View key={index} style={styles.timelineRow}>
                  <View style={styles.timelineIconContainer}>
                    <View style={[styles.timelineDot, isActive && styles.timelineDotActive]} />
                    {!isLast && <View style={[styles.timelineLine, isActive && index < animationStep && styles.timelineLineActive]} />}
                  </View>
                  <View style={styles.timelineTextContainer}>
                    <Text style={[styles.timelineLabel, isActive && styles.timelineLabelActive]}>
                      {step.label}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: Colors.light.surface, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  backButton: { padding: Spacing.xs },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text },
  container: { flex: 1, padding: Spacing.lg },
  otpCard: { backgroundColor: Colors.light.primary, borderRadius: Radius.md, padding: Spacing.xl, alignItems: 'center', marginBottom: Spacing.xl },
  otpHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  otpLabel: { color: Colors.light.surface, fontSize: 16, fontWeight: '600' },
  otpValue: { color: Colors.light.surface, fontSize: 48, fontWeight: '900', letterSpacing: 8, marginBottom: Spacing.sm },
  otpDesc: { color: Colors.light.surface, fontSize: 14, opacity: 0.9, textAlign: 'center' },
  timelineCard: { backgroundColor: Colors.light.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.light.border, padding: Spacing.xl },
  timelineTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text, marginBottom: Spacing.lg },
  timelineContainer: { marginLeft: Spacing.sm },
  timelineRow: { flexDirection: 'row' },
  timelineIconContainer: { alignItems: 'center', width: 30 },
  timelineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.light.border, zIndex: 2 },
  timelineDotActive: { backgroundColor: Colors.light.primary },
  timelineLine: { width: 2, height: 40, backgroundColor: Colors.light.border, marginTop: -2, marginBottom: -2, zIndex: 1 },
  timelineLineActive: { backgroundColor: Colors.light.primary },
  timelineTextContainer: { flex: 1, paddingBottom: 40, paddingLeft: Spacing.md, marginTop: -4 },
  timelineLabel: { fontSize: 16, color: Colors.light.textMuted, fontWeight: '500' },
  timelineLabelActive: { color: Colors.light.text, fontWeight: 'bold' },
});
