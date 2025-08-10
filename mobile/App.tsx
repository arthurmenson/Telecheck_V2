import React from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
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
import { Badge } from '../../components/ui/Badge';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';

const { width } = Dimensions.get('window');

export default function EducationScreen() {
  const categories = [
    { id: 'all', title: 'All Topics', count: 24, active: true },
    { id: 'hypertension', title: 'Hypertension', count: 8, active: false },
    { id: 'diabetes', title: 'Diabetes', count: 6, active: false },
    { id: 'nutrition', title: 'Nutrition', count: 5, active: false },
    { id: 'exercise', title: 'Exercise', count: 5, active: false },
  ];

  const articles = [
    {
      id: '1',
      title: 'Understanding Blood Pressure Readings',
      summary: 'Learn what your blood pressure numbers mean and when to be concerned.',
      category: 'Hypertension',
      readTime: '5 min read',
      image: '🩺',
      difficulty: 'Beginner',
      featured: true,
    },
    {
      id: '2',
      title: 'Heart-Healthy Diet Guidelines',
      summary: 'Discover foods that support cardiovascular health and reduce risk factors.',
      category: 'Nutrition',
      readTime: '8 min read',
      image: '🥗',
      difficulty: 'Beginner',
      featured: false,
    },
    {
      id: '3',
      title: 'Managing Diabetes with Technology',
      summary: 'How continuous glucose monitors and apps can improve diabetes management.',
      category: 'Diabetes',
      readTime: '6 min read',
      image: '📱',
      difficulty: 'Intermediate',
      featured: true,
    },
    {
      id: '4',
      title: 'Safe Exercise for Heart Patients',
      summary: 'Guidelines for staying active while managing cardiovascular conditions.',
      category: 'Exercise',
      readTime: '7 min read',
      image: '🏃‍♀️',
      difficulty: 'Intermediate',
      featured: false,
    },
    {
      id: '5',
      title: 'Medication Adherence Tips',
      summary: 'Strategies to help you remember and properly take your medications.',
      category: 'General',
      readTime: '4 min read',
      image: '💊',
      difficulty: 'Beginner',
      featured: false,
    },
    {
      id: '6',
      title: 'Stress Management Techniques',
      summary: 'Evidence-based methods to reduce stress and improve heart health.',
      category: 'Wellness',
      readTime: '10 min read',
      image: '🧘‍♀️',
      difficulty: 'Beginner',
      featured: false,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <FadeInView delay={100} direction="down">
          <View style={styles.header}>
            <Heading1>Health Education</Heading1>
            <BodyText color={theme.colors.textSecondary} style={styles.subtitle}>
              Evidence-based content to support your health journey
            </BodyText>
          </View>
        </FadeInView>

        {/* Categories */}
        <FadeInView delay={300} direction="left">
          <View style={styles.categoriesSection}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    category.active && styles.categoryChipActive
                  ]}
                >
                  <BodyText 
                    color={category.active ? theme.colors.surface : theme.colors.textSecondary}
                    weight="medium"
                  >
                    {category.title}
                  </BodyText>
                  <Caption 
                    color={category.active ? theme.colors.surface : theme.colors.textTertiary}
                    style={styles.categoryCount}
                  >
                    {category.count}
                  </Caption>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </FadeInView>

        {/* Featured Articles */}
        <FadeInView delay={500} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Featured Articles</Heading3>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredContainer}
            >
              {articles.filter(article => article.featured).map((article, index) => (
                <SlideInCard
                  key={article.id}
                  delay={600 + index * 100}
                  direction="left"
                  style={styles.featuredCard}
                >
                  <TouchableOpacity style={styles.featuredContent}>
                    <View style={styles.featuredImage}>
                      <BodyText style={styles.featuredEmoji}>{article.image}</BodyText>
                    </View>
                    <View style={styles.featuredInfo}>
                      <Badge 
                        variant={getDifficultyColor(article.difficulty) as any}
                        size="sm"
                        style={styles.difficultyBadge}
                      >
                        {article.difficulty}
                      </Badge>
                      <Heading3 style={styles.featuredTitle} numberOfLines={2}>
                        {article.title}
                      </Heading3>
                      <BodyText 
                        color={theme.colors.textSecondary} 
                        style={styles.featuredSummary}
                        numberOfLines={3}
                      >
                        {article.summary}
                      </BodyText>
                      <View style={styles.featuredMeta}>
                        <Caption color={theme.colors.textTertiary}>
                          {article.category} • {article.readTime}
                        </Caption>
                      </View>
                    </View>
                  </TouchableOpacity>
                </SlideInCard>
              ))}
            </ScrollView>
          </View>
        </FadeInView>

        {/* All Articles */}
        <FadeInView delay={800} direction="up">
          <View style={[styles.section, styles.lastSection]}>
            <Heading3 style={styles.sectionTitle}>All Articles</Heading3>
            {articles.map((article, index) => (
              <SlideInCard
                key={article.id}
                delay={900 + index * 50}
                direction="left"
                style={styles.articleCard}
              >
                <TouchableOpacity style={styles.articleContent}>
                  <View style={styles.articleImage}>
                    <BodyText>{article.image}</BodyText>
                  </View>
                  <View style={styles.articleInfo}>
                    <View style={styles.articleHeader}>
                      <BodyText style={styles.articleTitle} numberOfLines={2}>
                        {article.title}
                      </BodyText>
                      <Badge 
                        variant={getDifficultyColor(article.difficulty) as any}
                        size="sm"
                      >
                        {article.difficulty}
                      </Badge>
                    </View>
                    <BodyText 
                      color={theme.colors.textSecondary} 
                      style={styles.articleSummary}
                      numberOfLines={2}
                    >
                      {article.summary}
                    </BodyText>
                    <View style={styles.articleMeta}>
                      <Caption color={theme.colors.textTertiary}>
                        {article.category} • {article.readTime}
                      </Caption>
                    </View>
                  </View>
                  <View style={styles.articleArrow}>
                    <BodyText color={theme.colors.textTertiary}>→</BodyText>
                  </View>
                </TouchableOpacity>
              </SlideInCard>
            ))}
          </View>
        </FadeInView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});


