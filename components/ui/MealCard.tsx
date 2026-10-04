import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Colors, Spacing, Radius, Shadows, Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { PlannedMeal } from '@/store/AppContext';
import { useAppContext } from '@/store/AppContext';

interface MealCardProps {
  meal: PlannedMeal;
  providerName?: string;
  providerRating?: number;
  onPress: () => void;
  style?: any;
}

export const MealCard = ({ meal, providerName, providerRating, onPress, style }: MealCardProps) => {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const percentageBooked = Math.min((meal.bookedServings / meal.maxServings) * 100, 100);
  const isSoldOut = meal.bookedServings >= meal.maxServings;

  return (
    <TouchableOpacity 
      style={[styles.card, style]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={meal.image} style={styles.image} contentFit="cover" transition={300} />
        
        <View style={styles.dateOverlay}>
          <Text style={styles.dateText}>{meal.date} • {meal.mealType}</Text>
        </View>

        {isSoldOut && (
          <View style={styles.soldOutOverlay}>
            <Text style={styles.soldOutText}>SOLD OUT</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{meal.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Reserve</Text>
            <Text style={styles.priceValue}>₹{meal.bookingAmount}</Text>
          </View>
        </View>
        
        {providerName && (
          <View style={styles.providerRow}>
            <Ionicons name="storefront-outline" size={14} color={colors.textMuted} />
            <Text style={styles.providerName}>{providerName}</Text>
            {providerRating && (
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={10} color={colors.surface} />
                <Text style={styles.ratingText}>{providerRating}</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>
              <Text style={{ fontWeight: 'bold', color: colors.text }}>{meal.bookedServings}</Text> / {meal.maxServings} booked
            </Text>
            <Text style={styles.cutoffText}>Closes {meal.cutoffTime}</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${percentageBooked}%`, backgroundColor: isSoldOut ? colors.error : colors.primary }]} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...Shadows.card,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: colors.background,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dateOverlay: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    backgroundColor: 'rgba(17, 17, 17, 0.75)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.round,
    backdropFilter: 'blur(4px)',
  },
  dateText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  soldOutOverlay: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: colors.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  soldOutText: {
    color: colors.surface,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  content: {
    padding: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    fontFamily: Fonts.sans,
    flex: 1,
    marginRight: Spacing.sm,
  },
  priceContainer: {
    alignItems: 'flex-end',
    backgroundColor: '#FFF4ED',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  priceLabel: {
    fontSize: 10,
    color: colors.primaryDark,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  providerName: {
    fontSize: 14,
    color: colors.textMuted,
    marginLeft: 4,
    marginRight: Spacing.sm,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.sm,
    gap: 2,
  },
  ratingText: {
    color: colors.surface,
    fontSize: 10,
    fontWeight: 'bold',
  },
  progressSection: {
    marginTop: Spacing.xs,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  cutoffText: {
    fontSize: 12,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.background,
    borderRadius: Radius.round,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: Radius.round,
  },
});
