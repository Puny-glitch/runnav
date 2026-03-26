import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import Theme from '../constants/theme';

interface Slide {
  id: string;
  heading: string;
  body: string;
}

interface OnboardingCarouselProps {
  slides: Slide[];
  onComplete: () => void;
}

// TODO (Agent 2): implement swipeable carousel with animated pagination dots
export function OnboardingCarousel({
  slides,
  onComplete,
}: OnboardingCarouselProps): React.JSX.Element {
  const [current, setCurrent] = React.useState(0);

  const next = (): void => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[current];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{slide?.heading ?? ''}</Text>
      <Text style={styles.body}>{slide?.body ?? ''}</Text>
      <Pressable style={styles.button} onPress={next} accessibilityRole="button">
        <Text style={styles.buttonText}>
          {current < slides.length - 1 ? 'Next' : 'Get Started'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: Theme.Spacing.xl,
    gap: Theme.Spacing.lg,
  },
  heading: {
    fontFamily: Theme.Typography.fontHeading,
    fontSize: 28,
    color: Theme.Colors.textPrimary,
  },
  body: {
    fontFamily: Theme.Typography.fontBody,
    fontSize: 16,
    color: Theme.Colors.textSecondary,
    lineHeight: 24,
  },
  button: {
    backgroundColor: Theme.Colors.brandPrimary,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.base,
    alignItems: 'center',
    minHeight: Theme.MinTouchTarget,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: Theme.Typography.fontBody,
    fontSize: 16,
    fontWeight: '600',
    color: Theme.Colors.surfaceDark,
  },
});
