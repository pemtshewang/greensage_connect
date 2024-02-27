import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IWaterScheduleRecords } from '../../../types';

const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WaterScheduleTable = ({ waterScheduleRecords }: { waterScheduleRecords: IWaterScheduleRecords[] }) => {
  const decodeRepetitionDays = (repetitionDays: number) => {
    const decodedDays = [];
    for (let i = 0; i < 7; i++) {
      if (repetitionDays & (1 << i)) {
        decodedDays.push(dayOfWeek[i]);
      }
    }
    return decodedDays.join(', ');
  };

  return (
    <View style={styles.container}>
      <Text style={{
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 20
      }}>Water Schedule Records</Text>
      <View style={styles.table}>
        {
          waterScheduleRecords.length < 0 ? (
            <>
              <View style={styles.row}>
                <Text style={styles.cellHeader}>Start Time</Text>
                <Text style={styles.cellHeader}>End Time</Text>
                <Text style={styles.cellHeader}>Repetition Days</Text>
              </View>
              {
                waterScheduleRecords.map((record, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={styles.cell}>{record.startTime}</Text>
                    <Text style={styles.cell}>{record.endTime}</Text>
                    <Text style={styles.cell}>{decodeRepetitionDays(record.repetitionDays)}</Text>
                  </View>))
              }
            </>
          ) : (
            <View style={{
              padding: 10
            }}>
              <Text style={{
                color: "#A0A0A0",
                textAlign: "center"
              }}>
                No water scheduling records has been found
              </Text>
            </View>
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  cellHeader: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default WaterScheduleTable;
