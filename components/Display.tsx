import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Display = () => {
  const radius = 90;
  const outerCircleWidth = 10;

  const [progressPercentage, setProgressPercentage] = useState(75);

  const outerCircleWidthPercentage = (progressPercentage / 100) * outerCircleWidth;

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
      <View style={styles.circularProgressBar}>
        <View
          style={[
            styles.outerCircle,
            { borderWidth: outerCircleWidth, borderRightWidth: outerCircleWidthPercentage },
          ]}
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>{`${progressPercentage}%`}</Text>
        </View>
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
    borderColor: 'green', // Color of the outer circle
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
    width: '80%',
  },
});

export default Display;
