import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/store/AppContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  style,
  textStyle,
  fullWidth = true,
}: ButtonProps) => {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: { backgroundColor: disabled ? colors.border : colors.primary, borderWidth: 0 },
          text: { color: disabled ? colors.textMuted : colors.surface },
          icon: disabled ? colors.textMuted : colors.surface,
        };
      case 'secondary':
        return {
          container: { backgroundColor: colors.text, borderWidth: 0 },
          text: { color: colors.surface },
          icon: colors.surface,
        };
      case 'outline':
        return {
          container: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
          text: { color: colors.text },
          icon: colors.text,
        };
      case 'ghost':
        return {
          container: { backgroundColor: 'transparent', borderWidth: 0 },
          text: { color: colors.primary },
          icon: colors.primary,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, fontSize: 14 };
      case 'md':
        return { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg, fontSize: 16 };
      case 'lg':
        return { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xl, fontSize: 18 };
    }
  };

  const vs = getVariantStyles();
  const ss = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.baseContainer,
        vs.container,
        { paddingVertical: ss.paddingVertical, paddingHorizontal: ss.paddingHorizontal },
        fullWidth ? { width: '100%' } : { alignSelf: 'flex-start' },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && (
        <Ionicons 
          name={icon} 
          size={ss.fontSize + 2} 
          color={vs.icon} 
          style={{ marginRight: Spacing.sm }} 
        />
      )}
      <Text style={[
        styles.baseText, 
        vs.text, 
        { fontSize: ss.fontSize },
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.round,
  },
  baseText: {
    fontWeight: 'bold',
  },
});
