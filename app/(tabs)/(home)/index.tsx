
import React, { useState } from "react";
import { Stack } from "expo-router";
import { 
  ScrollView, 
  Pressable, 
  StyleSheet, 
  View, 
  Text, 
  Platform,
  RefreshControl,
  useColorScheme 
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

// Sample data for assignments/tasks
const sampleTasks = [
  {
    id: '1',
    title: '데이터베이스 설계 과제',
    description: 'ERD 다이어그램 작성 및 정규화 과정 문서화',
    deadline: '2024-03-25',
    course: '데이터베이스',
    priority: 'high',
    status: 'pending',
  },
  {
    id: '2',
    title: '알고리즘 중간고사',
    description: '동적 프로그래밍, 그래프 알고리즘 범위',
    deadline: '2024-03-28',
    course: '알고리즘',
    priority: 'high',
    status: 'pending',
  },
  {
    id: '3',
    title: '웹 프로그래밍 프로젝트',
    description: 'React를 이용한 쇼핑몰 웹사이트 구현',
    deadline: '2024-04-05',
    course: '웹프로그래밍',
    priority: 'medium',
    status: 'in-progress',
  },
  {
    id: '4',
    title: '운영체제 레포트',
    description: '프로세스 스케줄링 알고리즘 비교 분석',
    deadline: '2024-04-10',
    course: '운영체제',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: '5',
    title: '소프트웨어 공학 발표',
    description: '애자일 방법론에 대한 팀 프레젠테이션',
    deadline: '2024-04-15',
    course: '소프트웨어공학',
    priority: 'low',
    status: 'pending',
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const [tasks, setTasks] = useState(sampleTasks);

  const onRefresh = React.useCallback(() => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Refreshed tasks');
      setRefreshing(false);
    }, 1500);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#34C759';
      default:
        return '#007AFF';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return '긴급';
      case 'medium':
        return '보통';
      case 'low':
        return '여유';
      default:
        return '보통';
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return '마감됨';
    } else if (diffDays === 0) {
      return '오늘 마감';
    } else if (diffDays === 1) {
      return '내일 마감';
    } else if (diffDays <= 7) {
      return `${diffDays}일 남음`;
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

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => console.log('Settings pressed')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol
        name="gear"
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
            title: "학사 일정",
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
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
              내 과제 및 일정
            </Text>
            <Text style={[styles.headerSubtitle, { color: isDark ? '#98989D' : '#666' }]}>
              {tasks.length}개의 항목이 있습니다
            </Text>
          </View>

          {/* Task Cards */}
          {tasks.map((task) => (
            <Pressable
              key={task.id}
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
                console.log('Task pressed:', task.id);
              }}
            >
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) + '20' }]}>
                    <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
                      {getPriorityLabel(task.priority)}
                    </Text>
                  </View>
                  <Text style={[styles.courseText, { color: isDark ? '#98989D' : '#666' }]}>
                    {task.course}
                  </Text>
                </View>
                <View style={[styles.statusDot, { backgroundColor: task.status === 'in-progress' ? '#34C759' : '#FF9500' }]} />
              </View>

              {/* Card Content */}
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                {task.title}
              </Text>
              <Text style={[styles.cardDescription, { color: isDark ? '#98989D' : '#666' }]} numberOfLines={2}>
                {task.description}
              </Text>

              {/* Card Footer */}
              <View style={styles.cardFooter}>
                <View style={styles.deadlineContainer}>
                  <IconSymbol name="clock" color={getPriorityColor(task.priority)} size={16} />
                  <Text style={[styles.deadlineText, { color: getPriorityColor(task.priority) }]}>
                    {formatDeadline(task.deadline)}
                  </Text>
                </View>
                <IconSymbol name="chevron.right" color={isDark ? '#98989D' : '#666'} size={16} />
              </View>
            </Pressable>
          ))}

          {/* Empty State */}
          {tasks.length === 0 && (
            <View style={styles.emptyState}>
              <IconSymbol name="checkmark.circle" color={isDark ? '#98989D' : '#666'} size={64} />
              <Text style={[styles.emptyStateText, { color: theme.colors.text }]}>
                모든 과제를 완료했습니다!
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
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  courseText: {
    fontSize: 13,
    fontWeight: '500',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deadlineText: {
    fontSize: 14,
    fontWeight: '600',
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
