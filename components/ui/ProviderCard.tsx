import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Colors, Spacing, Radius, Shadows, Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/store/AppContext';

interface ProviderCardProps {
  provider: any;
  onPress: () => void;
  style?: any;
}

export const ProviderCard = ({ provider, onPress, style }: ProviderCardProps) => {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  return (
    <TouchableOpacity 
      style={[styles.card, style]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={provider.image} style={styles.image} contentFit="cover" transition={300} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color={colors.surface} />
          <Text style={styles.ratingText}>{provider.rating}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{provider.name}</Text>
        <Text style={styles.speciality} numberOfLines={1}>{provider.speciality}</Text>
        
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color={colors.textMuted} />
            <Text style={styles.metaText}>{provider.distance}</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Ionicons name="restaurant-outline" size={14} color={colors.textMuted} />
            <Text style={styles.metaText}>{provider.mealsServed} served</Text>
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
    height: 140,
    backgroundColor: colors.background,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17, 17, 17, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.round,
    backdropFilter: 'blur(4px)',
    gap: 4,
  },
  ratingText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: Spacing.md,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: Fonts.sans,
    marginBottom: 2,
  },
  speciality: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: Spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginHorizontal: Spacing.sm,
  },
});
