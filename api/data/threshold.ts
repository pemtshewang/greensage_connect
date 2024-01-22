import Icons from "../../assets/Icons/Icons"
const ThresholdValues: {
  label: string,
  value: {
    humidity: number,
    temperature: number,
    soil_moisture: number,
  },
  _icon: any
}[] = [
    {
      label: 'Maize',
      value: {
        humidity: 80,
        temperature: 30,
        soil_moisture: 50,
      },
      _icon: Icons.maizeIcon
    },
    {
      label: 'Cabbage',
      value: {
        humidity: 80,
        temperature: 30,
        soil_moisture: 50,
      },
      _icon: Icons.cabbageIcon
    },
    {
      label: 'Spinach',
      value: {
        humidity: 80,
        temperature: 40,
        soil_moisture: 50,
      },
      _icon: Icons.lettuceIcon
    },
    {
      label: 'Broccoli',
      value: {
        humidity: 80,
        temperature: 30,
        soil_moisture: 50,
      },
      _icon: Icons.broccoliIcon
    },
    {
      label: 'Onion',
      value: {
        humidity: 80,
        temperature: 30,
        soil_moisture: 50,
      },
      _icon: Icons.onionIcon
    },
  ]
export default ThresholdValues;

