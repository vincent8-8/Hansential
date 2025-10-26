
import React, { useState } from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  Platform,
  RefreshControl,
  useColorScheme,
  Pressable 
} from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

// Sample notice data
const sampleNotices = [
  {
    id: '1',
    title: '2024학년도 1학기 수강신청 안내',
    description: '수강신청 일정 및 유의사항을 확인하시기 바랍니다.',
    date: '2024-03-15',
    category: '학사',
    isImportant: true,
    department: '학사지원팀',
  },
  {
    id: '2',
    title: '장학금 신청 기간 연장 공지',
    description: '국가장학금 및 교내장학금 신청 기간이 3월 31일까지 연장되었습니다.',
    date: '2024-03-18',
    category: '장학',
    isImportant: true,
    department: '학생지원팀',
  },
  {
    id: '3',
    title: '도서관 열람실 이용 시간 변경',
    description: '시험기간 동안 24시간 운영됩니다.',
    date: '2024-03-20',
    category: '시설',
    isImportant: false,
    department: '도서관',
  },
  {
    id: '4',
    title: '취업 특강 개최 안내',
    description: 'IT 기업 현직자 초청 특강이 진행됩니다.',
    date: '2024-03-22',
    category: '취업',
    isImportant: false,
    department: '취업지원센터',
  },
  {
    id: '5',
    title: '학생회 정기총회 개최',
    description: '2024년 상반기 학생회 정기총회가 개최됩니다.',
    date: '2024-03-23',
    category: '학생회',
    isImportant: false,
    department: '학생회',
  },
];

export default function NoticeScreen() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const [notices, setNotices] = useState(sampleNotices);

  const onRefresh = React.useCallback(() => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setRefreshing(true);
    setTimeout(() => {
      console.log('Refreshed notices');
      setRefreshing(false);
    }, 1500);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '학사':
        return '#007AFF';
      case '장학':
        return '#34C759';
      case '시설':
        return '#FF9500';
      case '취업':
        return '#AF52DE';
      case '학생회':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return '오늘';
    } else if (diffDays === 1) {
      return '어제';
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    }
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={onRefresh}
      style={styles.headerButtonContainer}
    >
      <IconSymbol 
        name="arrow.clockwise" 
        color={theme.colors.primary} 
        size={22}
      />
    </Pressable>
  );

  const isDark = colorScheme === 'dark';

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "공지사항",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              학교 공지사항
            </Text>
            <Text style={[styles.headerSubtitle, { color: isDark ? '#98989D' : '#666' }]}>
              최신 공지 {notices.length}건
            </Text>
          </View>

          {/* Notice Cards */}
          {notices.map((notice) => (
            <Pressable
              key={notice.id}
              style={({ pressed }) => [
                styles.card,
                {
                  backgroundColor: theme.colors.card,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
                isDark && styles.cardDark,
              ]}
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                console.log('Notice pressed:', notice.id);
              }}
            >
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(notice.category) + '20' }]}>
                    <Text style={[styles.categoryText, { color: getCategoryColor(notice.category) }]}>
                      {notice.category}
                    </Text>
                  </View>
                  {notice.isImportant && (
                    <View style={styles.importantBadge}>
                      <IconSymbol name="exclamationmark.circle.fill" color="#FF3B30" size={16} />
                    </View>
                  )}
                </View>
                <Text style={[styles.dateText, { color: isDark ? '#98989D' : '#666' }]}>
                  {formatDate(notice.date)}
                </Text>
              </View>

              {/* Card Content */}
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                {notice.title}
              </Text>
              <Text style={[styles.cardDescription, { color: isDark ? '#98989D' : '#666' }]} numberOfLines={2}>
                {notice.description}
              </Text>

              {/* Card Footer */}
              <View style={styles.cardFooter}>
                <View style={styles.departmentContainer}>
                  <IconSymbol name="building.2" color={isDark ? '#98989D' : '#666'} size={14} />
                  <Text style={[styles.departmentText, { color: isDark ? '#98989D' : '#666' }]}>
                    {notice.department}
                  </Text>
                </View>
                <IconSymbol name="chevron.right" color={isDark ? '#98989D' : '#666'} size={16} />
              </View>
            </Pressable>
          ))}

          {/* Empty State */}
          {notices.length === 0 && (
            <View style={styles.emptyState}>
              <IconSymbol name="bell.slash" color={isDark ? '#98989D' : '#666'} size={64} />
              <Text style={[styles.emptyStateText, { color: theme.colors.text }]}>
                새로운 공지사항이 없습니다
              </Text>
            </View>
          )}
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
    paddingTop: 16,
    // Increased bottom padding to prevent overlap with FloatingTabBar
    // TabBar height (60) + SafeArea bottom + extra margin (20) + additional buffer (40)
    paddingBottom: Platform.select({
      ios: 140,
      android: 140,
      default: 140,
    }),
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
  },
  headerButtonContainer: {
    padding: 6,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  cardDark: {
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  importantBadge: {
    marginLeft: 4,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 24,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  departmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  departmentText: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
  },
});
