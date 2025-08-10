import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../theme';
import { BodyText } from './Typography';

interface Tab {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabKey: string) => void;
  style?: any;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onTabChange,
  style,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key);

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    onTabChange?.(tabKey);
  };

  const activeTabContent = tabs.find(tab => tab.key === activeTab)?.content;

  return (
    <View style={[styles.container, style]}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
        contentContainerStyle={styles.tabBarContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.activeTab
            ]}
            onPress={() => handleTabPress(tab.key)}
          >
            <BodyText
              color={activeTab === tab.key ? theme.colors.primary : theme.colors.textSecondary}
              weight={activeTab === tab.key ? 'semibold' : 'normal'}
            >
              {tab.title}
            </BodyText>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.content}>
        {activeTabContent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  tabBarContent: {
    paddingHorizontal: theme.spacing.base,
  },
  tab: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
    marginRight: theme.spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: theme.colors.primary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.base,
  },
});