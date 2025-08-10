import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  RefreshControl,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { 
  Heading1, 
  Heading3, 
  BodyText, 
  Caption 
} from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';

interface Notification {
  id: string;
  type: 'health' | 'medication' | 'appointment' | 'system' | 'message';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionUrl?: string;
}

export default function NotificationsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'health',
      title: 'Blood Pressure Alert',
      message: 'Your latest reading (145/92) is higher than normal. Consider contacting your healthcare provider.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      priority: 'high',
    },
    {
      id: '2',
      type: 'medication',
      title: 'Medication Reminder',
      message: 'Time to take your Lisinopril 10mg. Don\'t forget to log it in the app.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: false,
      priority: 'medium',
    },
    {
      id: '3',
      type: 'message',
      title: 'Message from Dr. Johnson',
      message: 'Your recent lab results look great! Keep up the good work with your diet and exercise.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      priority: 'medium',
    },
    {
      id: '4',
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Reminder: You have a follow-up appointment with Dr. Johnson tomorrow at 2:00 PM.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: true,
      priority: 'medium',
    },
    {
      id: '5',
      type: 'system',
      title: 'App Update Available',
      message: 'A new version of Telecheck is available with improved features and bug fixes.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      isRead: true,
      priority: 'low',
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'health': return '🩺';
      case 'medication': return '💊';
      case 'appointment': return '📅';
      case 'message': return '💬';
      case 'system': return '⚙️';
      default: return '🔔';
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'health': return theme.colors.bloodPressure;
      case 'medication': return theme.colors.glucose;
      case 'appointment': return theme.colors.info;
      case 'message': return theme.colors.secondary;
      case 'system': return theme.colors.textSecondary;
      default: return theme.colors.primary;
    }
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    switch (priority) {
      case 'critical':
        return <Badge variant="error" size="sm">Critical</Badge>;
      case 'high':
        return <Badge variant="warning" size="sm">High</Badge>;
      case 'medium':
        return <Badge variant="info" size="sm">Medium</Badge>;
      case 'low':
        return <Badge variant="default" size="sm">Low</Badge>;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setNotifications(prev =>
              prev.filter(notification => notification.id !== notificationId)
            );
          },
        },
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call to fetch new notifications
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        {/* Header */}
        <FadeInView delay={100} direction="down">
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Heading1>Notifications</Heading1>
              {unreadCount > 0 && (
                <Badge variant="error" size="sm">{unreadCount} unread</Badge>
              )}
            </View>
            
            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  filter === 'all' && styles.filterButtonActive
                ]}
                onPress={() => setFilter('all')}
              >
                <BodyText 
                  color={filter === 'all' ? theme.colors.surface : theme.colors.textSecondary}
                  style={styles.filterText}
                >
                  All ({notifications.length})
                </BodyText>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  filter === 'unread' && styles.filterButtonActive
                ]}
                onPress={() => setFilter('unread')}
              >
                <BodyText 
                  color={filter === 'unread' ? theme.colors.surface : theme.colors.textSecondary}
                  style={styles.filterText}
                >
                  Unread ({unreadCount})
                </BodyText>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            {unreadCount > 0 && (
              <TouchableOpacity
                style={styles.markAllButton}
                onPress={markAllAsRead}
              >
                <BodyText color={theme.colors.primary}>Mark All as Read</BodyText>
              </TouchableOpacity>
            )}
          </View>
        </FadeInView>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <FadeInView delay={300} direction="up">
            <View style={styles.emptyState}>
              <BodyText style={styles.emptyIcon}>🔔</BodyText>
              <Heading3 style={styles.emptyTitle}>
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </Heading3>
              <BodyText color={theme.colors.textSecondary} style={styles.emptyMessage}>
                {filter === 'unread' 
                  ? 'All caught up! Check back later for new updates.'
                  : 'You\'ll see health alerts, reminders, and messages here.'
                }
              </BodyText>
            </View>
          </FadeInView>
        ) : (
          <View style={styles.notificationsList}>
            {filteredNotifications.map((notification, index) => (
              <FadeInView key={notification.id} delay={300 + index * 100} direction="up">
                <SlideInCard delay={400 + index * 100} direction="left" style={styles.notificationCard}>
                  <TouchableOpacity
                    style={[
                      styles.notificationItem,
                      !notification.isRead && styles.unreadNotification
                    ]}
                    onPress={() => {
                      if (!notification.isRead) {
                        markAsRead(notification.id);
                      }
                      // Handle navigation if actionUrl exists
                      if (notification.actionUrl) {
                        // navigation.navigate(notification.actionUrl);
                      }
                    }}
                    onLongPress={() => deleteNotification(notification.id)}
                  >
                    <View style={styles.notificationHeader}>
                      <View style={styles.notificationIcon}>
                        <View style={[
                          styles.iconContainer,
                          { backgroundColor: `${getNotificationColor(notification.type)}15` }
                        ]}>
                          <BodyText>{getNotificationIcon(notification.type)}</BodyText>
                        </View>
                      </View>
                      
                      <View style={styles.notificationContent}>
                        <View style={styles.notificationTitleRow}>
                          <BodyText style={styles.notificationTitle}>
                            {notification.title}
                          </BodyText>
                          {!notification.isRead && (
                            <View style={styles.unreadDot} />
                          )}
                        </View>
                        
                        <BodyText 
                          color={theme.colors.textSecondary}
                          style={styles.notificationMessage}
                          numberOfLines={2}
                        >
                          {notification.message}
                        </BodyText>
                        
                        <View style={styles.notificationFooter}>
                          <Caption color={theme.colors.textTertiary}>
                            {formatTimestamp(notification.timestamp)}
                          </Caption>
                          {getPriorityBadge(notification.priority)}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </SlideInCard>
              </FadeInView>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.base,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.base,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.base,
    backgroundColor: theme.colors.borderLight,
    borderRadius: theme.borderRadius.base,
    padding: 2,
  },
  filterButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.base - 2,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
  },
  markAllButton: {
    alignSelf: 'flex-end',
    padding: theme.spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing['4xl'],
    paddingHorizontal: theme.spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  emptyMessage: {
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
  },
  notificationsList: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing['2xl'],
  },
  notificationCard: {
    marginBottom: theme.spacing.md,
  },
  notificationItem: {
    padding: theme.spacing.base,
  },
  unreadNotification: {
    backgroundColor: `${theme.colors.primary}05`,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    marginRight: theme.spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  notificationTitle: {
    fontWeight: theme.typography.fontWeights.semibold,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginLeft: theme.spacing.sm,
  },
  notificationMessage: {
    marginBottom: theme.spacing.sm,
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});