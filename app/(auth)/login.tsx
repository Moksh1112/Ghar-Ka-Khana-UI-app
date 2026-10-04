import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius, Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/store/AppContext';

export default function LoginScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const router = useRouter();
  const { login } = useAppContext();

  const handleLogin = (role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN') => {
    login(role);
    if (role === 'CUSTOMER') router.replace('/(customer)/(tabs)/home');
    if (role === 'PROVIDER') router.replace('/(provider)/dashboard');
    if (role === 'ADMIN') router.replace('/(admin)/dashboard');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

        <View style={styles.headerContainer}>
          <Text style={styles.emoji}>🏠</Text>
          <Text style={styles.title}>Ghar Ka Khana</Text>
          {/* <Text style={styles.subtitle}>Sign in to continue</Text> */}
        </View>

        <View style={styles.formContainer}>
          <Text style={{ textAlign: 'center', marginBottom: Spacing.xl, color: colors.textMuted }}>
            Log in to your account
          </Text>

          <TouchableOpacity style={styles.primaryButton} onPress={() => handleLogin('CUSTOMER')}>
            <Ionicons name="person" size={20} color={colors.surface} style={{ marginRight: Spacing.sm }} />
            <Text style={styles.primaryButtonText}>Sign In as Customer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => handleLogin('PROVIDER')}>
            <Ionicons name="restaurant" size={20} color={colors.text} style={{ marginRight: Spacing.sm }} />
            <Text style={styles.secondaryButtonText}>Sign In as Provider</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => handleLogin('ADMIN')}>
            <Ionicons name="settings" size={20} color={colors.text} style={{ marginRight: Spacing.sm }} />
            <Text style={styles.secondaryButtonText}>Sign In as Admin</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  emoji: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.sans,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    fontFamily: Fonts.sans,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: Spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    borderRadius: Radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    borderRadius: Radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  }
});
