import { DropletIcon, MapPinned, MoreHorizontalIcon, ThermometerIcon, WavesIcon } from "lucide-react-native";
import {
  Eye,
  EyeOff,
  User,
  LockKeyhole,
  XCircle,
  Database,
  Phone,
  BookUserIcon,
  KeyRound,
  HomeIcon,
  LineChartIcon,
  NewspaperIcon,
  BellIcon,
  BellDotIcon,
  CloudRainIcon,
  SunIcon,
  CloudSnowIcon,
  CloudSunRainIcon,
  MoonIcon,
  CloudHailIcon,
  CloudIcon,
  CircleUserIcon,
  BellRing,
  PlusCircleIcon,
  ArrowUpDownIcon,
  WarehouseIcon,
  CameraIcon,
  ArrowLeftCircleIcon,
  Trash2Icon,
  FileEditIcon,
  LogInIcon,
  HelpCircleIcon,
  MenuIcon,
  MapPin,

} from "lucide-react-native";
import Svg, { Rect, Path, G } from "react-native-svg"

// export the icons by naming yourself
export const Icons = {
  visible: Eye,
  visibleOff: EyeOff,
  loginUser: User,
  loginLock: LockKeyhole,
  xCircle: XCircle,
  database: Database,
  phone: Phone,
  bookUser: BookUserIcon,
  keyRound: KeyRound,
  home: HomeIcon,
  dashboard: LineChartIcon,
  post: NewspaperIcon,
  notification: BellIcon,
  newNotification: BellDotIcon,
  cloudRainIcon: CloudRainIcon,
  sunIcon: SunIcon,
  cloudSnowIcon: CloudSnowIcon,
  cloudSunRainIcon: CloudSunRainIcon,
  moonIcon: MoonIcon,
  cloudHailIcon: CloudHailIcon,
  cloudIcon: CloudIcon,
  circleUser: CircleUserIcon,
  contentNotification: BellRing,
  profile: User,
  plusCircle: PlusCircleIcon,
  warehouseIcon: WarehouseIcon,
  internet: ArrowUpDownIcon,
  camera: CameraIcon,
  navigateBack: ArrowLeftCircleIcon,
  trash: Trash2Icon,
  edit: FileEditIcon,
  enter: LogInIcon,
  help: HelpCircleIcon,
  action: MenuIcon,
  thermometer: ThermometerIcon,
  droplets: DropletIcon,
  humid: CloudIcon,
  options: MoreHorizontalIcon,
  soilMoisture: WavesIcon,
  greenhouseAddIcon: ({
    width,
    height,
    fill,
  }: {
    width: number;
    height: number;
    fill: string;
  }) => {
    return (<Svg height={height} width={width} viewBox="0 0 512.005 512.005">
      <G id="SVGRepo_bgCarrier" strokeWidth="0" />
      <G
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G id="SVGRepo_iconCarrier">
        <G>
          <G>
            <G>
              <Path
                fill={fill}
                d="M511.99,378.909c0-66.75-50.083-122.564-114.458-131.677v-55.014l18.531,15.549 c4.36,3.27,9.811,5.45,14.171,5.45c6.54,0,11.991-2.18,15.261-6.541c7.631-9.811,6.54-22.892-2.18-30.522L239.47,5.011 c-7.631-6.54-19.621-6.54-27.252,0L7.283,176.154c-8.721,7.631-9.811,21.802-2.18,30.522c7.631,8.721,21.802,9.811,30.522,2.18 l19.621-16.482V393.08c0,11.991,9.811,21.802,21.802,21.802h173.964c15.851,55.758,67.587,97.017,129.078,97.017 C453.126,511.899,513.08,451.944,511.99,378.909z M98.662,155.906L226.389,48.615L354.13,155.8 c-0.129,0.954-0.202,1.925-0.202,2.913v89.614c-59.114,11.439-104.72,62.469-107.754,124.042H98.85V158.713 C98.85,157.761,98.781,156.826,98.662,155.906z M380.091,469.386c-50.144,0-90.477-40.333-90.477-90.477 c0-50.144,40.333-90.477,90.477-90.477c49.054,0,90.477,40.333,90.477,90.477C470.567,429.053,430.234,469.386,380.091,469.386z"
              />
              <Path
                fill={fill}
                d="M428.054,356.017h-26.162v-26.162c0-11.991-9.811-21.802-21.802-21.802 c-11.991,0-21.802,9.811-21.802,21.802v26.162h-26.162c-11.991,0-21.802,9.811-21.802,21.802 c0,11.991,9.811,21.802,21.802,21.802h26.162v26.162c0,11.991,9.811,21.802,21.802,21.802c10.901,0,20.712-8.721,21.802-21.802 v-26.162h26.162c10.901,0,21.802-9.811,21.802-21.802C449.856,365.828,440.045,356.017,428.054,356.017z"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
    );
  },
  exhaustFan: (props) => {
    return (
      <Svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Rect
          x={2}
          y={2}
          width={20}
          height={20}
          rx={1}
          stroke="#000"
          strokeWidth={2}
        />
        <Rect
          x={2}
          y={2}
          width={20}
          height={20}
          rx={10}
          stroke="#000"
          strokeWidth={2}
        />
        <Path
          d="M15 9.5c.5-.333.9-1.7.5-2.5S13.333 5.667 13 5.5m1 5c1.5-2 0-3.5-2.5-5-1.546-.927 2-1.5 4.5.5 1.875 1.5 1 2.5-2 5.5v-1zM8.985 14.402c-.5.333-.9 1.7-.5 2.5s2.167 1.333 2.5 1.5m-1-5c-1.5 2 0 3.5 2.5 5 1.546.927-2 1.5-4.5-.5-1.875-1.5-1-2.5 2-5.5v1zM9.542 8.944c-.334-.5-1.7-.9-2.5-.5s-1.334 2.166-1.5 2.5m5-1c-2-1.5-3.5 0-5 2.5-.928 1.546-1.5-2 .5-4.5 1.5-1.875 2.5-1 5.5 2h-1zM14.444 14.958c.333.5 1.7.9 2.5.5s1.333-2.166 1.5-2.5m-5 1c2 1.5 3.5 0 5-2.5.927-1.546 1.5 2-.5 4.5-1.5 1.876-2.5 1-5.5-2h1z"
          stroke="#000"
          strokeWidth={2}
        />
        <Path
          clipRule="evenodd"
          d="M3.5 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM20.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM20.5 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 14a2 2 0 100-4 2 2 0 000 4z"
          stroke="#000"
          strokeWidth={2}
        />
      </Svg>
    )
  },
  valve: (props) => {
    return (
      <Svg
        fill="#000"
        baseProfile="tiny"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-63 65 128 128"
        xmlSpace="preserve"
        {...props}
      >
        <Path d="M-40.5 84.8h1.4c.4 0 15-3.7 18.6-4.5.7 2.5 2.2 4.6 4.4 5.9v7.2H-6v-7.5c1.9-1.3 3.3-3.1 4-5.4 4.5 1.1 17.3 4.3 17.7 4.3.5.1 1.4 0 1.4 0 4 0 7.3-3.3 7.3-7.3s-3.3-7.3-7.3-7.3c-.5 0-1.2.1-1.2.1l-18.1 4c-1.4-3.6-4.9-6.2-9-6.2-4.2 0-7.7 2.7-9.1 6.4l-19-4.3s-.7-.1-1.2-.1c-4 0-7.3 3.3-7.3 7.3 0 4.1 3.3 7.4 7.3 7.4m77.9 67.3v.2S26.8 174 26.6 174.7c-.3 1.1-.7 2.6-.7 4.1 0 6.3 5.1 11.4 11.4 11.4s11.4-5.1 11.4-11.4c-.1-2.4-1-4.3-1-4.3l-10.3-22.4zm11.1-12.2v-12.1c0-18.1-17.4-17.4-17.4-17.4H9.2V104l-11.6-6.2h-17.1l-11.5 6.3v6.4h-19.7v21.8h77.1v7.6H24v8.2h26.5v-8.2h-2z" />
      </Svg>
    )
  }
};

export default Icons;
