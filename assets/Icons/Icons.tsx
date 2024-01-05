import { ArrowBigRightIcon, Clock3Icon, DropletIcon, MoreHorizontalIcon, PowerCircleIcon, SendHorizontalIcon, ThermometerIcon, Timer, TimerResetIcon, UnplugIcon, WavesIcon, XOctagonIcon } from "lucide-react-native";
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
  CrosshairIcon,
} from "lucide-react-native";
import Svg, { G, Rect, Path, } from "react-native-svg"

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
  powerState: PowerCircleIcon,
  target: CrosshairIcon,
  disconnectSession: UnplugIcon,
  ArrowBigRight: ArrowBigRightIcon,
  schedule: Clock3Icon,
  timer: Timer,
  timerReset: TimerResetIcon,
  send: SendHorizontalIcon,
  danger: XOctagonIcon,
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
  animatedFan: (props) => {
    return (
      <Svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path fill="none" d="M0 0H24V24H0z" />
        <Path d="M12 11a1 1 0 101 1 1 1 0 00-1-1m.5-9c4.5 0 4.6 3.57 2.23 4.75a3.36 3.36 0 00-1.62 2.47 3.17 3.17 0 011.23.91C18 8.13 22 8.92 22 12.5c0 4.5-3.58 4.6-4.75 2.23a3.44 3.44 0 00-2.5-1.62 3.24 3.24 0 01-.91 1.23c2 3.69 1.2 7.66-2.38 7.66-4.46 0-4.57-3.58-2.2-4.76a3.46 3.46 0 001.62-2.45 3 3 0 01-1.25-.92C5.94 15.85 2 15.07 2 11.5 2 7 5.54 6.89 6.72 9.26a3.39 3.39 0 002.48 1.61 2.91 2.91 0 01.92-1.22C8.13 6 8.92 2 12.48 2z" />
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
  },
  waterTap: (props) => {
    return (
      <Svg
        fill="#000"
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        data-name="Flat Color"
        xmlns="http://www.w3.org/2000/svg"
        className="icon flat-color"
        {...props}
      >
        <Path
          d="M13 9.84a1 1 0 01-1-1V6h-2a1 1 0 010-2h6a1 1 0 010 2h-2v2.84a1 1 0 01-1 1z"
          fill="#2ca9bc"
        />
        <Path
          d="M21 8a1 1 0 00-1 1v1h-3.38l-.45-.89A2 2 0 0014.38 8h-2.76a2 2 0 00-1.79 1.11l-.45.89H7a5 5 0 00-5 5v3a2 2 0 002 2h2a2 2 0 002-2v-2h12v1a1 1 0 002 0V9a1 1 0 00-1-1z"
          fill="#000"
        />
      </Svg>
    )
  },
  failedConnection: (props) => {
    return (<Svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G id="SVGRepo_bgCarrier" strokeWidth={0} />
      <G
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G id="SVGRepo_iconCarrier">
        <Path
          d="M1.33309 8.07433C0.92156 8.44266 0.886539 9.07485 1.25487 9.48638C1.62319 9.89791 2.25539 9.93293 2.66691 9.5646L1.33309 8.07433ZM21.3331 9.5646C21.7446 9.93293 22.3768 9.89791 22.7451 9.48638C23.1135 9.07485 23.0784 8.44266 22.6669 8.07433L21.3331 9.5646ZM12 19C11.4477 19 11 19.4477 11 20C11 20.5523 11.4477 21 12 21V19ZM12.01 21C12.5623 21 13.01 20.5523 13.01 20C13.01 19.4477 12.5623 19 12.01 19V21ZM14.6905 17.04C15.099 17.4116 15.7315 17.3817 16.1031 16.9732C16.4748 16.5646 16.4448 15.9322 16.0363 15.5605L14.6905 17.04ZM18.0539 13.3403C18.4624 13.7119 19.0949 13.682 19.4665 13.2734C19.8381 12.8649 19.8082 12.2324 19.3997 11.8608L18.0539 13.3403ZM7.96372 15.5605C7.55517 15.9322 7.52524 16.5646 7.89687 16.9732C8.2685 17.3817 8.90095 17.4116 9.3095 17.04L7.96372 15.5605ZM4.60034 11.8608C4.19179 12.2324 4.16185 12.8649 4.53348 13.2734C4.90511 13.682 5.53756 13.7119 5.94611 13.3403L4.60034 11.8608ZM10.5705 4.06305C10.0204 4.1118 9.61391 4.59729 9.66266 5.14741C9.71141 5.69754 10.1969 6.10399 10.747 6.05525L10.5705 4.06305ZM17.3393 10.3798C16.8567 10.1114 16.2478 10.285 15.9794 10.7677C15.711 11.2504 15.8847 11.8593 16.3673 12.1277L17.3393 10.3798ZM3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L3.70711 2.29289ZM20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L20.2929 21.7071ZM12 6C15.5863 6 18.8556 7.34716 21.3331 9.5646L22.6669 8.07433C19.8369 5.54138 16.0972 4 12 4V6ZM12 21H12.01V19H12V21ZM12 16C13.0367 16 13.9793 16.3931 14.6905 17.04L16.0363 15.5605C14.9713 14.5918 13.5536 14 12 14V16ZM9.3095 17.04C10.0207 16.3931 10.9633 16 12 16V14C10.4464 14 9.02872 14.5918 7.96372 15.5605L9.3095 17.04ZM10.747 6.05525C11.1596 6.01869 11.5775 6 12 6V4C11.5185 4 11.0417 4.0213 10.5705 4.06305L10.747 6.05525ZM16.3673 12.1277C16.9757 12.466 17.5412 12.874 18.0539 13.3403L19.3997 11.8608C18.7751 11.2927 18.0844 10.7941 17.3393 10.3798L16.3673 12.1277ZM2.29289 3.70711L5.46648 6.8807L6.8807 5.46648L3.70711 2.29289L2.29289 3.70711ZM2.66691 9.5646C3.81213 8.53961 5.12648 7.70074 6.56232 7.09494L5.78486 5.25224C4.14251 5.94517 2.64069 6.904 1.33309 8.07433L2.66691 9.5646ZM5.46648 6.8807L9.46042 10.8746L10.8746 9.46042L6.8807 5.46648L5.46648 6.8807ZM9.46042 10.8746L20.2929 21.7071L21.7071 20.2929L10.8746 9.46042L9.46042 10.8746ZM5.94611 13.3403C7.15939 12.2367 8.67355 11.4612 10.3496 11.1508L9.98543 9.18424C7.93271 9.5644 6.08108 10.5139 4.60034 11.8608L5.94611 13.3403Z"
          fill="#f00"
        />
      </G>
    </Svg>
    )
  },
  passedConnection: (props) => {
    return (
      <Svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <G id="SVGRepo_bgCarrier" strokeWidth={0} />
        <G
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <G id="SVGRepo_iconCarrier">
          <Path
            d="M1.33309 8.07433C0.92156 8.44266 0.886539 9.07485 1.25487 9.48638C1.62319 9.89791 2.25539 9.93293 2.66691 9.5646L1.33309 8.07433ZM21.3331 9.5646C21.7446 9.93293 22.3768 9.89791 22.7451 9.48638C23.1135 9.07485 23.0784 8.44266 22.6669 8.07433L21.3331 9.5646ZM12 19C11.4477 19 11 19.4477 11 20C11 20.5523 11.4477 21 12 21V19ZM12.01 21C12.5623 21 13.01 20.5523 13.01 20C13.01 19.4477 12.5623 19 12.01 19V21ZM14.6905 17.04C15.099 17.4116 15.7315 17.3817 16.1031 16.9732C16.4748 16.5646 16.4448 15.9322 16.0363 15.5605L14.6905 17.04ZM18.0539 13.3403C18.4624 13.7119 19.0949 13.682 19.4665 13.2734C19.8381 12.8649 19.8082 12.2324 19.3997 11.8608L18.0539 13.3403ZM7.96372 15.5605C7.55517 15.9322 7.52524 16.5646 7.89687 16.9732C8.2685 17.3817 8.90095 17.4116 9.3095 17.04L7.96372 15.5605ZM4.60034 11.8608C4.19179 12.2324 4.16185 12.8649 4.53348 13.2734C4.90511 13.682 5.53756 13.7119 5.94611 13.3403L4.60034 11.8608ZM2.66691 9.5646C5.14444 7.34716 8.41371 6 12 6V4C7.90275 4 4.16312 5.54138 1.33309 8.07433L2.66691 9.5646ZM12 6C15.5863 6 18.8556 7.34716 21.3331 9.5646L22.6669 8.07433C19.8369 5.54138 16.0972 4 12 4V6ZM12 21H12.01V19H12V21ZM12 16C13.0367 16 13.9793 16.3931 14.6905 17.04L16.0363 15.5605C14.9713 14.5918 13.5536 14 12 14V16ZM12 11C14.3319 11 16.4546 11.8855 18.0539 13.3403L19.3997 11.8608C17.4466 10.0842 14.8487 9 12 9V11ZM9.3095 17.04C10.0207 16.3931 10.9633 16 12 16V14C10.4464 14 9.02872 14.5918 7.96372 15.5605L9.3095 17.04ZM5.94611 13.3403C7.54544 11.8855 9.66815 11 12 11V9C9.15127 9 6.55344 10.0842 4.60034 11.8608L5.94611 13.3403Z"
            fill="green"
          />
        </G>
      </Svg>
    );
  }
};

export default Icons;
