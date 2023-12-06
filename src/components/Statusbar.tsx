import { StatusBar } from 'expo-status-bar';

export default function CustomStatusBar({
  style
}: {
  style: "auto" | "light" | "dark" | "inverted" | undefined
}) {
  return (
    <StatusBar style={style} />
  )
}
