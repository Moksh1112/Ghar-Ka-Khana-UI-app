import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_USERS } from '@/store/mockData';

export default function AdminUsersScreen() {
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
              <Ionicons name="person" size={24} color={Colors.light.icon} />
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

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: Colors.light.surface, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text },
  container: { flex: 1, padding: Spacing.lg },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.light.border, padding: Spacing.md, marginBottom: Spacing.md },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.light.background, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, marginLeft: Spacing.md },
  name: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text },
  phone: { fontSize: 13, color: Colors.light.textMuted, marginTop: 4 },
  roleBadge: { backgroundColor: Colors.light.background, paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.sm, borderWidth: 1, borderColor: Colors.light.border },
  roleText: { fontSize: 10, fontWeight: 'bold', color: Colors.light.textMuted },
});
