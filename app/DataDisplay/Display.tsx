import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Display = () => {
  const radius = 90;
  const outerCircleWidth = 10;
  const innerRadius = radius - outerCircleWidth;
  const progressPercentage = 75;

  const progressBarHeight = (progressPercentage / 100) * (innerRadius * 2);

  return (
    <View style={styles.container}>
      <View style={styles.circularProgressBar}>
        <View style={styles.outerCircle} />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>{`${progressPercentage}%`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgressBar: {
    width: 2 * (90 + 10), // Twice the radius + outer circle width
    height: 2 * (90 + 10),
    borderRadius: 400,
    overflow: 'hidden', // Clip the progress bar within the circle
    position: 'relative',
  },
  outerCircle: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 400,
    borderWidth: 10,
    borderColor: 'green', // Color of the outer circle
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 20,
    color: '#222',
    fontWeight: 'bold',
  },
});

export default Display;
