
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { GlassView } from "expo-glass-effect";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useTheme } from "@react-navigation/native";

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "프로필",
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={[styles.avatarContainer, { backgroundColor: theme.colors.primary + '20' }]}>
              <IconSymbol name="person.fill" size={48} color={theme.colors.primary} />
            </View>
            <Text style={[styles.userName, { color: theme.colors.text }]}>홍길동</Text>
            <Text style={[styles.userInfo, { color: theme.dark ? '#98989D' : '#666' }]}>
              컴퓨터공학과 · 2학년
            </Text>
            <Text style={[styles.studentId, { color: theme.dark ? '#98989D' : '#666' }]}>
              학번: 20220001
            </Text>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
              <IconSymbol name="book.fill" size={24} color="#007AFF" />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>12</Text>
              <Text style={[styles.statLabel, { color: theme.dark ? '#98989D' : '#666' }]}>수강 과목</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
              <IconSymbol name="checkmark.circle.fill" size={24} color="#34C759" />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>8</Text>
              <Text style={[styles.statLabel, { color: theme.dark ? '#98989D' : '#666' }]}>완료 과제</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
              <IconSymbol name="clock.fill" size={24} color="#FF9500" />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>5</Text>
              <Text style={[styles.statLabel, { color: theme.dark ? '#98989D' : '#666' }]}>진행 중</Text>
            </View>
          </View>

          {/* Settings Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>설정</Text>
            <View style={[styles.settingCard, { backgroundColor: theme.colors.card }]}>
              <View style={styles.settingItem}>
                <IconSymbol name="bell.fill" size={20} color={theme.colors.primary} />
                <Text style={[styles.settingText, { color: theme.colors.text }]}>알림 설정</Text>
                <IconSymbol name="chevron.right" size={16} color={theme.dark ? '#98989D' : '#666'} />
              </View>
              <View style={[styles.settingDivider, { backgroundColor: theme.dark ? '#2C2C2E' : '#E5E5EA' }]} />
              <View style={styles.settingItem}>
                <IconSymbol name="person.fill" size={20} color={theme.colors.primary} />
                <Text style={[styles.settingText, { color: theme.colors.text }]}>계정 정보</Text>
                <IconSymbol name="chevron.right" size={16} color={theme.dark ? '#98989D' : '#666'} />
              </View>
              <View style={[styles.settingDivider, { backgroundColor: theme.dark ? '#2C2C2E' : '#E5E5EA' }]} />
              <View style={styles.settingItem}>
                <IconSymbol name="lock.fill" size={20} color={theme.colors.primary} />
                <Text style={[styles.settingText, { color: theme.colors.text }]}>개인정보 보호</Text>
                <IconSymbol name="chevron.right" size={16} color={theme.dark ? '#98989D' : '#666'} />
              </View>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>정보</Text>
            <View style={[styles.settingCard, { backgroundColor: theme.colors.card }]}>
              <View style={styles.settingItem}>
                <IconSymbol name="info.circle.fill" size={20} color={theme.colors.primary} />
                <Text style={[styles.settingText, { color: theme.colors.text }]}>앱 정보</Text>
                <IconSymbol name="chevron.right" size={16} color={theme.dark ? '#98989D' : '#666'} />
              </View>
              <View style={[styles.settingDivider, { backgroundColor: theme.dark ? '#2C2C2E' : '#E5E5EA' }]} />
              <View style={styles.settingItem}>
                <IconSymbol name="questionmark.circle.fill" size={20} color={theme.colors.primary} />
                <Text style={[styles.settingText, { color: theme.colors.text }]}>도움말</Text>
                <IconSymbol name="chevron.right" size={16} color={theme.dark ? '#98989D' : '#666'} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    // Increased bottom padding to prevent overlap with FloatingTabBar
    paddingBottom: Platform.select({
      ios: 140,
      android: 140,
      default: 140,
    }),
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingCard: {
    borderRadius: 16,
    padding: 4,
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
  },
  settingDivider: {
    height: 1,
    marginLeft: 44,
  },
});
