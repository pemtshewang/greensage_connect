import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const Display = () => {
  const radius = 95;
  const outerCircleWidth = 25; // Increased width
  const circumference = 2 * Math.PI * radius;

  const [progressPercentage, setProgressPercentage] = useState(75);

  const outerCircleWidthPercentage = (progressPercentage / 100) * outerCircleWidth;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = (progressPercentage / 100) * circumference;

  const handleIncrease = () => {
    setProgressPercentage((prevPercentage) =>
      prevPercentage < 100 ? prevPercentage + 5 : prevPercentage
    );
  };

  const handleDecrease = () => {
    setProgressPercentage((prevPercentage) =>
      prevPercentage > 0 ? prevPercentage - 5 : prevPercentage
    );
  };

  return (
    <View style={styles.container}>
      <Svg height={2 * (radius + outerCircleWidth)} width={2 * (radius + outerCircleWidth)}>
        <Circle
          cx={radius + outerCircleWidth}
          cy={radius + outerCircleWidth}
          r={radius}
          fill="transparent"
          strokeWidth={outerCircleWidth}
          stroke="green"
        />
        <Circle
          cx={radius + outerCircleWidth}
          cy={radius + outerCircleWidth}
          r={radius}
          fill="transparent"
          strokeWidth={outerCircleWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          stroke="white"
        />
      </Svg>
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>{`${progressPercentage}%`}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Increase" onPress={handleIncrease} />
        <Button title="Decrease" onPress={handleDecrease} />
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
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '75%',
  },
});

export default Display;
