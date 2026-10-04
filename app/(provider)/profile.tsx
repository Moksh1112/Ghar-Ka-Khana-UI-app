import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '@/store/AppContext';
import { Image } from 'expo-image';

export default function ProviderProfileScreen() {
  const { colors } = useAppContext();
  const styles = createStyles(colors);
  const { user, logout, theme, setTheme } = useAppContext();

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
    { icon: 'time-outline', title: 'Availability' },
    { icon: 'location-outline', title: 'Pickup Locations' },
    { icon: 'star-outline', title: 'Reviews' },
    { icon: 'create-outline', title: 'Edit Profile' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Provider Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="restaurant" size={40} color={colors.surface} />
          </View>
          <Text style={styles.nameText}>{user?.storeName || "Seema Aunty's Kitchen"}</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
            <Text style={styles.verifiedText}>Verified Provider</Text>
          </View>
          <Text style={styles.detailText}>{user?.name || 'Seema Aunty'}</Text>
          <Text style={styles.detailText}>{user?.email || 'provider@demo.com'}</Text>
          <Text style={styles.detailText}>{user?.phone || '9876543211'}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>847</Text>
              <Text style={styles.statLabel}>Meals Served</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>124</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            Specializing in authentic, hygienic, and home-cooked Gujarati thalis. All meals are prepared with premium ingredients and less oil, just like home.
          </Text>
          <Text style={styles.cuisineText}>Cuisine: Gujarati Home Food</Text>
        </View>

        <View style={styles.menuSection}>
          <View style={styles.appearanceItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="moon-outline" size={22} color={colors.text} />
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
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon as any} size={22} color={colors.text} />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
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

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: colors.text },
  profileSection: { alignItems: 'center', padding: Spacing.xl, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  nameText: { fontSize: 22, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: Spacing.sm },
  verifiedText: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  detailText: { fontSize: 14, color: colors.textMuted, marginBottom: 2 },
  statsRow: { flexDirection: 'row', marginTop: Spacing.xl, borderWidth: 1, borderColor: colors.border, borderRadius: Radius.md, padding: Spacing.sm, width: '100%', backgroundColor: colors.background },
  statBox: { flex: 1, alignItems: 'center', padding: Spacing.sm },
  statDivider: { width: 1, backgroundColor: colors.border },
  statValue: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 2 },
  statLabel: { fontSize: 12, color: colors.textMuted },
  aboutSection: { padding: Spacing.lg, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: Spacing.sm },
  aboutText: { fontSize: 14, color: colors.text, lineHeight: 22, marginBottom: Spacing.md },
  cuisineText: { fontSize: 14, color: colors.textMuted, fontWeight: '500' },
  menuSection: { marginTop: Spacing.xl, backgroundColor: colors.surface, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  appearanceItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  menuItemText: { fontSize: 16, color: colors.text, fontWeight: '500' },
  
  segmentedControl: { flexDirection: 'row', backgroundColor: colors.background, borderRadius: Radius.round, padding: 4, borderWidth: 1, borderColor: colors.border },
  segmentBtn: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: Radius.round },
  segmentActive: { backgroundColor: colors.primary },
  segmentText: { color: colors.textMuted, fontSize: 13, fontWeight: 'bold' },
  segmentTextActive: { color: '#FFFFFF' },
  logoutButton: { margin: Spacing.xl, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.background === '#111111' ? '#3F1212' : '#ef4444', padding: Spacing.md, borderRadius: Radius.round, alignItems: 'center' },
  logoutButtonText: { color: '#ef4444', fontSize: 16, fontWeight: 'bold' }
});
