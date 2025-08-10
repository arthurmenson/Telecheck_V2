import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  Dimensions 
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
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';
import { ProgressBar } from '../../components/ui/ProgressBar';

const { width } = Dimensions.get('window');

interface EducationContent {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'article' | 'video' | 'interactive' | 'quiz';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  isCompleted: boolean;
  isFavorite: boolean;
  tags: string[];
  thumbnail: string;
  publishedAt: Date;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalModules: number;
  completedModules: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  modules: {
    id: string;
    title: string;
    isCompleted: boolean;
    isLocked: boolean;
  }[];
}

export default function EducationScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [educationContent] = useState<EducationContent[]>([
    {
      id: '1',
      title: 'Understanding Blood Pressure',
      description: 'Learn what blood pressure numbers mean and how to interpret your readings.',
      category: 'Hypertension',
      type: 'article',
      duration: '5 min read',
      difficulty: 'beginner',
      progress: 100,
      isCompleted: true,
      isFavorite: true,
      tags: ['blood pressure', 'basics', 'monitoring'],
      thumbnail: '🩺',
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      title: 'Heart-Healthy Diet Basics',
      description: 'Discover foods that support cardiovascular health and learn meal planning tips.',
      category: 'Nutrition',
      type: 'video',
      duration: '12 min watch',
      difficulty: 'beginner',
      progress: 60,
      isCompleted: false,
      isFavorite: false,
      tags: ['diet', 'nutrition', 'heart health'],
      thumbnail: '🥗',
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      title: 'Medication Management Quiz',
      description: 'Test your knowledge about taking medications safely and effectively.',
      category: 'Medications',
      type: 'quiz',
      duration: '8 min quiz',
      difficulty: 'intermediate',
      progress: 0,
      isCompleted: false,
      isFavorite: false,
      tags: ['medications', 'safety', 'adherence'],
      thumbnail: '💊',
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: '4',
      title: 'Exercise for Heart Health',
      description: 'Safe and effective exercises for people with cardiovascular conditions.',
      category: 'Exercise',
      type: 'interactive',
      duration: '15 min activity',
      difficulty: 'intermediate',
      progress: 25,
      isCompleted: false,
      isFavorite: true,
      tags: ['exercise', 'cardio', 'safety'],
      thumbnail: '🏃‍♀️',
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: '5',
      title: 'Stress Management Techniques',
      description: 'Learn proven methods to reduce stress and improve your overall health.',
      category: 'Mental Health',
      type: 'video',
      duration: '18 min watch',
      difficulty: 'beginner',
      progress: 0,
      isCompleted: false,
      isFavorite: false,
      tags: ['stress', 'mental health', 'relaxation'],
      thumbnail: '🧘‍♀️',
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  ]);

  const [learningPaths] = useState<LearningPath[]>([
    {
      id: '1',
      title: 'Hypertension Management',
      description: 'Complete guide to managing high blood pressure through lifestyle and medication.',
      totalModules: 6,
      completedModules: 3,
      estimatedTime: '2 hours',
      difficulty: 'beginner',
      category: 'Hypertension',
      modules: [
        { id: '1', title: 'Understanding Hypertension', isCompleted: true, isLocked: false },
        { id: '2', title: 'Reading Your Numbers', isCompleted: true, isLocked: false },
        { id: '3', title: 'Lifestyle Changes', isCompleted: true, isLocked: false },
        { id: '4', title: 'Medication Basics', isCompleted: false, isLocked: false },
        { id: '5', title: 'Monitoring at Home', isCompleted: false, isLocked: true },
        { id: '6', title: 'Working with Your Doctor', isCompleted: false, isLocked: true },
      ]
    },
    {
      id: '2',
      title: 'Heart-Healthy Living',
      description: 'Comprehensive lifestyle program for cardiovascular health.',
      totalModules: 8,
      completedModules: 1,
      estimatedTime: '3 hours',
      difficulty: 'intermediate',
      category: 'Lifestyle',
      modules: [
        { id: '1', title: 'Nutrition Fundamentals', isCompleted: true, isLocked: false },
        { id: '2', title: 'Exercise Planning', isCompleted: false, isLocked: false },
        { id: '3', title: 'Sleep & Recovery', isCompleted: false, isLocked: true },
        { id: '4', title: 'Stress Management', isCompleted: false, isLocked: true },
        { id: '5', title: 'Social Support', isCompleted: false, isLocked: true },
        { id: '6', title: 'Habit Formation', isCompleted: false, isLocked: true },
        { id: '7', title: 'Tracking Progress', isCompleted: false, isLocked: true },
        { id: '8', title: 'Long-term Success', isCompleted: false, isLocked: true },
      ]
    }
  ]);

  const categories = ['all', 'Hypertension', 'Nutrition', 'Exercise', 'Medications', 'Mental Health'];

  const filteredContent = selectedCategory === 'all' 
    ? educationContent 
    : educationContent.filter(content => content.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return theme.colors.success;
      case 'intermediate': return theme.colors.warning;
      case 'advanced': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return '📖';
      case 'video': return '🎥';
      case 'interactive': return '🎮';
      case 'quiz': return '❓';
      default: return '📚';
    }
  };

  const handleContentPress = (content: EducationContent) => {
    Alert.alert(
      content.title,
      `Would you like to ${content.progress > 0 ? 'continue' : 'start'} this ${content.type}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: content.progress > 0 ? 'Continue' : 'Start',
          onPress: () => Alert.alert('Coming Soon', 'Content viewer coming soon!')
        }
      ]
    );
  };

  const handleFavoriteToggle = (contentId: string) => {
    Alert.alert('Favorite', 'Added to favorites!');
  };

  const renderContent = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Category Filter */}
      <FadeInView delay={200} direction="down">
        <View style={styles.categoryFilter}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Caption 
                  color={selectedCategory === category ? theme.colors.surface : theme.colors.textSecondary}
                  weight={selectedCategory === category ? 'semibold' : 'normal'}
                >
                  {category === 'all' ? 'All Topics' : category}
                </Caption>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </FadeInView>

      {/* Content Grid */}
      <View style={styles.contentGrid}>
        {filteredContent.map((content, index) => (
          <FadeInView key={content.id} delay={300 + index * 100} direction="up">
            <SlideInCard 
              delay={400 + index * 100} 
              direction="left"
              style={[styles.contentCard, { width: (width - theme.spacing.base * 3) / 2 }]}
            >
              <TouchableOpacity
                style={styles.contentItem}
                onPress={() => handleContentPress(content)}
              >
                <View style={styles.contentThumbnail}>
                  <BodyText style={styles.thumbnailIcon}>{content.thumbnail}</BodyText>
                  <View style={styles.contentType}>
                    <Caption color={theme.colors.surface} weight="medium">
                      {getTypeIcon(content.type)} {content.type.toUpperCase()}
                    </Caption>
                  </View>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => handleFavoriteToggle(content.id)}
                  >
                    <BodyText>{content.isFavorite ? '❤️' : '🤍'}</BodyText>
                  </TouchableOpacity>
                </View>

                <View style={styles.contentInfo}>
                  <BodyText style={styles.contentTitle} numberOfLines={2}>
                    {content.title}
                  </BodyText>
                  <Caption color={theme.colors.textSecondary} numberOfLines={2}>
                    {content.description}
                  </Caption>
                  
                  <View style={styles.contentMeta}>
                    <Badge 
                      variant={content.difficulty === 'beginner' ? 'success' : content.difficulty === 'intermediate' ? 'warning' : 'error'} 
                      size="sm"
                    >
                      {content.difficulty}
                    </Badge>
                    <Caption color={theme.colors.textTertiary}>
                      {content.duration}
                    </Caption>
                  </View>

                  {content.progress > 0 && (
                    <View style={styles.progressContainer}>
                      <ProgressBar
                        progress={content.progress}
                        height={4}
                        progressColor={content.isCompleted ? theme.colors.success : theme.colors.primary}
                        animated={false}
                      />
                      <Caption color={theme.colors.textTertiary} style={styles.progressText}>
                        {content.isCompleted ? 'Completed' : `${content.progress}% complete`}
                      </Caption>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </SlideInCard>
          </FadeInView>
        ))}
      </View>
    </ScrollView>
  );

  const renderLearningPaths = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {learningPaths.map((path, index) => (
        <FadeInView key={path.id} delay={200 + index * 100} direction="up">
          <SlideInCard delay={300 + index * 100} direction="left" style={styles.pathCard}>
            <View style={styles.pathHeader}>
              <View style={styles.pathInfo}>
                <BodyText style={styles.pathTitle}>{path.title}</BodyText>
                <Caption color={theme.colors.textSecondary}>
                  {path.description}
                </Caption>
                <View style={styles.pathMeta}>
                  <Caption color={theme.colors.textTertiary}>
                    {path.estimatedTime} • {path.totalModules} modules
                  </Caption>
                  <Badge 
                    variant={path.difficulty === 'beginner' ? 'success' : 'warning'} 
                    size="sm"
                  >
                    {path.difficulty}
                  </Badge>
                </View>
              </View>
            </View>

            <View style={styles.pathProgress}>
              <View style={styles.progressHeader}>
                <Caption color={theme.colors.textSecondary}>
                  Progress: {path.completedModules}/{path.totalModules} modules
                </Caption>
                <Caption color={theme.colors.primary} weight="semibold">
                  {Math.round((path.completedModules / path.totalModules) * 100)}%
                </Caption>
              </View>
              <ProgressBar
                progress={(path.completedModules / path.totalModules) * 100}
                height={6}
                progressColor={theme.colors.primary}
                animated
                delay={400 + index * 100}
              />
            </View>

            <View style={styles.modulesList}>
              {path.modules.slice(0, 3).map((module, moduleIndex) => (
                <View key={module.id} style={styles.moduleItem}>
                  <View style={[
                    styles.moduleStatus,
                    { backgroundColor: module.isCompleted ? theme.colors.success : module.isLocked ? theme.colors.border : theme.colors.warning }
                  ]}>
                    <Caption color={theme.colors.surface} weight="bold">
                      {module.isCompleted ? '✓' : module.isLocked ? '🔒' : moduleIndex + 1}
                    </Caption>
                  </View>
                  <Caption 
                    color={module.isLocked ? theme.colors.textTertiary : theme.colors.textSecondary}
                    style={styles.moduleTitle}
                  >
                    {module.title}
                  </Caption>
                </View>
              ))}
              {path.modules.length > 3 && (
                <Caption color={theme.colors.textTertiary} style={styles.moreModules}>
                  +{path.modules.length - 3} more modules
                </Caption>
              )}
            </View>

            <View style={styles.pathActions}>
              <Button
                title={path.completedModules > 0 ? 'Continue Path' : 'Start Path'}
                onPress={() => Alert.alert('Coming Soon', 'Learning paths coming soon!')}
                variant="primary"
                size="sm"
                style={styles.pathButton}
              />
              <Button
                title="View All Modules"
                onPress={() => Alert.alert('Coming Soon', 'Module list coming soon!')}
                variant="outline"
                size="sm"
                style={styles.pathButton}
              />
            </View>
          </SlideInCard>
        </FadeInView>
      ))}
    </ScrollView>
  );

  const educationTabs = [
    {
      key: 'content',
      title: 'Browse Content',
      content: renderContent(),
    },
    {
      key: 'paths',
      title: 'Learning Paths',
      content: renderLearningPaths(),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView delay={100} direction="down">
        <View style={styles.header}>
          <Heading1>Health Education</Heading1>
          <BodyText color={theme.colors.textSecondary}>
            Learn about your health conditions and treatments
          </BodyText>
        </View>
      </FadeInView>

      <Tabs
        tabs={educationTabs}
        defaultTab="content"
      />
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  categoryFilter: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.border,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  contentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.base,
    gap: theme.spacing.base,
  },
  contentCard: {
    marginBottom: theme.spacing.base,
  },
  contentItem: {
    padding: theme.spacing.sm,
  },
  contentThumbnail: {
    position: 'relative',
    height: 120,
    backgroundColor: `${theme.colors.primary}10`,
    borderRadius: theme.borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  thumbnailIcon: {
    fontSize: 32,
  },
  contentType: {
    position: 'absolute',
    bottom: theme.spacing.xs,
    left: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    padding: theme.spacing.xs,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontWeight: theme.typography.fontWeights.semibold,
    marginBottom: theme.spacing.xs,
    lineHeight: theme.typography.lineHeights.snug * theme.typography.fontSizes.base,
  },
  contentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  progressContainer: {
    marginTop: theme.spacing.sm,
  },
  progressText: {
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.fontSizes.xs,
  },
  pathCard: {
    marginBottom: theme.spacing.base,
    padding: theme.spacing.base,
  },
  pathHeader: {
    marginBottom: theme.spacing.base,
  },
  pathInfo: {
    flex: 1,
  },
  pathTitle: {
    fontWeight: theme.typography.fontWeights.semibold,
    marginBottom: theme.spacing.xs,
  },
  pathMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  pathProgress: {
    marginBottom: theme.spacing.base,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  modulesList: {
    marginBottom: theme.spacing.base,
  },
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  moduleStatus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  moduleTitle: {
    flex: 1,
  },
  moreModules: {
    marginLeft: 36,
    fontStyle: 'italic',
  },
  pathActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  pathButton: {
    flex: 1,
  },
});