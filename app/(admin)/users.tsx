import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_USERS } from '@/store/mockData';
import { useAppContext } from '@/store/AppContext';

export default function AdminUsersScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const users = Object.values(MOCK_USERS);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>System Users</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {users.map(user => (
          <View key={user.id} style={styles.card}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={colors.icon} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.phone}>{user.phone}</Text>
            </View>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{user.role}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.text },
  container: { flex: 1, padding: Spacing.lg },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: colors.border, padding: Spacing.md, marginBottom: Spacing.md },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, marginLeft: Spacing.md },
  name: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  phone: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  roleBadge: { backgroundColor: colors.background, paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.sm, borderWidth: 1, borderColor: colors.border },
  roleText: { fontSize: 10, fontWeight: 'bold', color: colors.textMuted },
});
