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
} from "lucide-react-native";
import { Svg, Path, G } from "react-native-svg";

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
  greenhouseAddIcon: ({
    width,
    height,
    fill,
  }: {
    width: number;
    height: number;
    fill: string;
  }) => {
    return (
      <Svg height={height} width={width} viewBox="0 0 512.005 512.005">
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
};

export default Icons;
