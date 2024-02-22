import ThresholdRecordGraph from "./threshold";


const data = {
  HumidityThresholdRecord: [{
    recordedAt: new Date(),
    value: 50
  },
  {
    recordedAt: new Date(new Date().getDate() + 2),
    value: 99
  }],
  SoilMoistureThresholdRecord: [
    {
      recordedAt: new Date(),
      value: 50
    },
    {
      recordedAt: new Date(new Date().getDate() + 2),
      value: 70
    }
  ],
  TemperatureThresholdRecord: [
    {
      recordedAt: new Date(new Date().getDate() + 5),
      value: 90
    },
    {
      recordedAt: new Date(),
      value: 50
    },
    {
      recordedAt: new Date(new Date().getDate() + 2),
      value: 70
    },
  ]
}
const OverViewThresholdGraph = () => {
  return (
    <ThresholdRecordGraph data={data} />
  )
}

export default OverViewThresholdGraph;

