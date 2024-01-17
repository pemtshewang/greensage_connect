import Icons from "../../assets/Icons/Icons"
const VegIcons = {
  'Maize': Icons.maizeIcon,
  'Cabbage': Icons.cabbageIcon,
  'Spinach': Icons.lettuceIcon,
  'Broccoli': Icons.broccoliIcon,
  'Onion': Icons.onionIcon,
}
const temperatureThreshold: {
  label: string,
  value: number,
  _icon: any
}[] = [
    {
      label: 'Maize',
      value: 36,
      _icon: Icons.maizeIcon
    },
    {
      label: 'Cabbage',
      value: 20,
      _icon: Icons.cabbageIcon
    },
    {
      label: 'Spinach',
      value: 15,
      _icon: Icons.lettuceIcon
    },
    {
      label: 'Broccoli',
      value: 18,
      _icon: Icons.broccoliIcon
    },
    {
      label: 'Onion',
      value: 18,
      _icon: Icons.onionIcon
    },
  ]
export { temperatureThreshold, VegIcons };

