import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/store/AppContext';
import { useRouter } from 'expo-router';

export default function CustomerProfileScreen() {
  const { user, logout } = useAppContext();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Log Out", "Log out of Ghar Ka Khana?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Log Out", 
        style: "destructive", 
        onPress: () => {
          logout();
        } 
      }
    ]);
  };

  const menuItems = [
    { icon: 'bookmark-outline', title: 'Saved Providers' },
    { icon: 'heart-outline', title: 'Favorites' },
    { icon: 'receipt-outline', title: 'Orders' },
    { icon: 'card-outline', title: 'Payment History' },
    { icon: 'settings-outline', title: 'Settings' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color={Colors.light.surface} />
          </View>
          <Text style={styles.nameText}>{user?.name || 'Moksh'}</Text>
          <Text style={styles.detailText}>{user?.email || 'customer@demo.com'}</Text>
          <Text style={styles.detailText}>{user?.phone || '9876543210'}</Text>
          
          <View style={styles.badgeContainer}>
            <Ionicons name="home" size={14} color={Colors.light.primary} />
            <Text style={styles.badgeText}>{user?.hostel || 'Hostel A, North Campus'}</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon as any} size={22} color={Colors.light.text} />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.light.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.light.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: Colors.light.text },
  profileSection: { alignItems: 'center', padding: Spacing.xl, backgroundColor: Colors.light.surface, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.light.primary, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  nameText: { fontSize: 22, fontWeight: 'bold', color: Colors.light.text, marginBottom: 4 },
  detailText: { fontSize: 14, color: Colors.light.textMuted, marginBottom: 2 },
  badgeContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF4ED', paddingHorizontal: Spacing.md, paddingVertical: 6, borderRadius: Radius.round, marginTop: Spacing.md, gap: 4 },
  badgeText: { color: Colors.light.primaryDark, fontWeight: '600', fontSize: 13 },
  menuSection: { marginTop: Spacing.xl, backgroundColor: Colors.light.surface, borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.light.border },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.lg, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  menuItemText: { fontSize: 16, color: Colors.light.text, fontWeight: '500' },
  logoutButton: { margin: Spacing.xl, backgroundColor: Colors.light.surface, borderWidth: 1, borderColor: '#ef4444', padding: Spacing.md, borderRadius: Radius.round, alignItems: 'center' },
  logoutButtonText: { color: '#ef4444', fontSize: 16, fontWeight: 'bold' }
});
