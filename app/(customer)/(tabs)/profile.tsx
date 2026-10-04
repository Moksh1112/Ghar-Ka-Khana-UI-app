import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Colors, Spacing, Radius, Shadows, Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/store/AppContext';
import { useRouter } from 'expo-router';

export default function CustomerProfileScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const { user, logout, theme, setTheme } = useAppContext();
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
            <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'M'}</Text>
          </View>
          <Text style={styles.nameText}>{user?.name || 'Moksh'}</Text>
          <Text style={styles.detailText}>{user?.email || 'customer@demo.com'} • {user?.phone || '9876543210'}</Text>
          
          <View style={styles.badgeContainer}>
            <Ionicons name="location" size={14} color={colors.primary} />
            <Text style={styles.badgeText}>{user?.hostel || 'Hostel A, North Campus'}</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <View style={styles.appearanceItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconBg}>
                <Ionicons name="moon-outline" size={20} color={colors.text} />
              </View>
              <Text style={styles.menuItemText}>Appearance</Text>
            </View>
            <View style={styles.segmentedControl}>
              <TouchableOpacity
                style={[styles.segmentBtn, theme === 'light' && styles.segmentActive]}
                onPress={() => setTheme('light')}
                activeOpacity={0.8}
              >
                <Text style={[styles.segmentText, theme === 'light' && styles.segmentTextActive]}>Light</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentBtn, theme === 'dark' && styles.segmentActive]}
                onPress={() => setTheme('dark')}
                activeOpacity={0.8}
              >
                <Text style={[styles.segmentText, theme === 'dark' && styles.segmentTextActive]}>Dark</Text>
              </TouchableOpacity>
            </View>
          </View>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBg}>
                  <Ionicons name={item.icon as any} size={20} color={colors.text} />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" style={{ marginRight: 8 }} />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: colors.surface },
  headerTitle: { fontSize: 24, fontWeight: '800', color: colors.text, fontFamily: Fonts.sans },
  
  profileSection: { alignItems: 'center', padding: Spacing.xl, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md, ...Shadows.card },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: colors.surface },
  nameText: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 4, fontFamily: Fonts.sans },
  detailText: { fontSize: 14, color: colors.textMuted, marginBottom: 12 },
  badgeContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF4ED', paddingHorizontal: Spacing.md, paddingVertical: 8, borderRadius: Radius.round, gap: 6, borderWidth: 1, borderColor: '#FED7AA' },
  badgeText: { color: colors.primaryDark, fontWeight: '600', fontSize: 13 },
  
  menuSection: { marginTop: Spacing.xl, marginHorizontal: Spacing.lg, backgroundColor: colors.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: colors.border, ...Shadows.card },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  appearanceItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  menuIconBg: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  menuItemText: { fontSize: 16, color: colors.text, fontWeight: '600' },
  
  segmentedControl: { flexDirection: 'row', backgroundColor: colors.background, borderRadius: Radius.round, padding: 4, borderWidth: 1, borderColor: colors.border },
  segmentBtn: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: Radius.round },
  segmentActive: { backgroundColor: colors.primary },
  segmentText: { color: colors.textMuted, fontSize: 13, fontWeight: 'bold' },
  segmentTextActive: { color: '#FFFFFF' },
  
  logoutButton: { margin: Spacing.xl, backgroundColor: colors.background === '#111111' ? '#3F1212' : '#fee2e2', padding: Spacing.md, borderRadius: Radius.round, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', ...Shadows.card, shadowColor: '#ef4444' },
  logoutButtonText: { color: '#ef4444', fontSize: 16, fontWeight: 'bold' }
});
