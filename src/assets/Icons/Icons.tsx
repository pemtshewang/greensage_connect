// import the needed icons from the lucide-react-native
<<<<<<< HEAD
import { Eye, EyeOff} from "lucide-react-native";
import { View } from "native-base";
=======
import {
  Eye,
  EyeOff,
  User,
  LockKeyhole,
} from "lucide-react-native"
>>>>>>> 1f5f6e8 (added login form)

// export the icons by naming yourself
export const Icons = {
  visible: Eye,
  visibleOff: EyeOff,
<<<<<<< HEAD
  darkarrow: ({ className }: { className: string }) => {
=======
  loginUser: User,
  loginLock: LockKeyhole,
  darkarrow: (({ className }: {
    className: string
  }) => {
>>>>>>> 1f5f6e8 (added login form)
    return (
      <svg
        height={30}
        className={className}
        width={30}
        fill="#000000"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"></path>
        </g>
      </svg>
    );
  },
  tools: ({ className }: { className: string }) => {
    return (
      <svg
        className={className}
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <title>tools</title>{" "}
          <path d="M27.783 7.936c0.959 2.313 0.502 5.074-1.379 6.955-2.071 2.071-5.201 2.395-7.634 1.022l-1.759 1.921 1.255 1.26 0.75-0.75c0.383-0.384 1.005-0.384 1.388 0l6.082 6.144c0.384 0.383 0.384 1.005 0 1.388l-2.776 2.776c-0.383 0.384-1.005 0.384-1.388 0l-6.082-6.144c-0.384-0.383-0.384-1.005 0-1.388l0.685-0.685-1.196-1.199-8.411 9.189c-0.767 0.767-2.010 0.767-2.776 0l-0.694-0.694c-0.767-0.767-0.767-2.010 0-2.776l9.582-8.025-6.364-6.381-2.010-0.001-2.326-3.74 1.872-1.875 3.825 2.341 0.025 1.968 6.438 6.463 1.873-1.568c-1.831-2.496-1.64-6.012 0.616-8.268 1.872-1.872 4.618-2.337 6.925-1.396l-4.124 4.067 3.471 3.471 4.132-4.075zM6.15 25.934c-0.383-0.383-1.004-0.383-1.388 0-0.384 0.384-0.384 1.005 0 1.389 0.384 0.383 1.005 0.383 1.388 0 0.384-0.385 0.384-1.006 0-1.389z"></path>{" "}
        </g>
      </svg>
    );
  },
  exhaust_fan: () => {
    return (
      <View>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="74"
          height="61"
          viewBox="0 0 74 61"
          fill="none"
        >
          <g clip-path="url(#clip0_3635_784)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.96703 0H67.033C68.9478 0 70.6881 0.645293 71.9526 1.68769C73.2172 2.73008 74 4.16462 74 5.7431V55.2569C74 56.8354 73.2172 58.2699 71.9526 59.3123C70.6941 60.3497 68.9478 61 67.033 61H6.96703C5.05215 61 3.3119 60.3547 2.04735 59.3123C0.788826 58.2699 0.00601196 56.8354 0.00601196 55.2569V5.73814C0.00601196 4.15966 0.788826 2.72512 2.05337 1.68769C3.3119 0.645293 5.05215 0 6.96703 0ZM34.4679 35.9775C33.5526 35.7393 32.7156 35.362 31.9448 34.8359C31.1259 34.275 30.3912 33.5602 29.7409 32.6717C29.4398 32.6866 29.1568 32.6915 28.8798 32.6915C28.3981 32.6965 27.8983 32.6766 27.3744 32.6468C25.315 32.5227 23.7614 32.0561 22.2138 31.5945C21.2082 31.2917 20.2026 30.9939 19.1127 30.8102C18.7213 30.7457 18.372 30.7407 18.0649 30.7705C17.541 30.8351 17.1316 31.0485 16.8245 31.3612C16.4752 31.7087 16.2404 32.1852 16.1139 32.7014C15.9754 33.2723 15.9634 33.8977 16.0718 34.4834C16.1681 35.0046 16.3488 35.5358 16.5776 36.052C16.8124 36.5881 17.1015 37.1043 17.4086 37.5858C17.6856 38.0326 17.9987 38.4545 18.3419 38.8565C18.6852 39.2636 19.0645 39.6557 19.462 40.028C20.8048 41.2888 22.1958 42.1426 23.5687 42.6141C24.8212 43.046 26.0677 43.1502 27.254 42.9715C28.4523 42.7879 29.6024 42.3014 30.6562 41.537C32.0111 40.5591 33.1973 39.1345 34.1186 37.2979C34.2752 36.9902 34.3655 36.6774 34.4137 36.3598C34.4558 36.2456 34.4679 36.1116 34.4679 35.9775ZM44.5541 32.6717C44.1928 33.4013 43.6629 34.0566 42.9584 34.6472C42.2117 35.2727 41.2844 35.8137 40.1523 36.2704C40.1403 36.5186 40.1282 36.7519 40.0981 36.9802C40.062 37.3773 40.0018 37.7893 39.9175 38.2112C39.5923 39.889 38.8998 41.13 38.2073 42.361C37.7557 43.1651 37.3101 43.9593 36.997 44.8379C36.8826 45.1556 36.8464 45.4385 36.8645 45.6966C36.9006 46.1334 37.1234 46.4859 37.4727 46.7639C37.8641 47.0815 38.4181 47.3148 39.0323 47.4637C39.7127 47.6276 40.4654 47.6921 41.182 47.6524C41.8203 47.6176 42.4767 47.5134 43.121 47.3694C43.7894 47.2205 44.4337 47.0269 45.0479 46.8135C45.614 46.6199 46.1499 46.4015 46.6617 46.1533C47.1856 45.9051 47.6854 45.6271 48.1732 45.3343C49.811 44.3415 50.9552 43.2693 51.6476 42.1823C52.2739 41.1895 52.5148 40.1719 52.3943 39.1842C52.2739 38.1864 51.7801 37.1986 50.9491 36.2654C49.8833 35.0692 48.2575 33.9722 46.1198 33.0638C45.7645 32.9099 45.3912 32.8057 45.0118 32.7461C44.8733 32.7064 44.7167 32.6866 44.5541 32.6717ZM39.6646 24.9728C40.5618 25.2409 41.3807 25.6479 42.1274 26.1989C42.9223 26.7896 43.6208 27.5292 44.223 28.4375C44.506 28.4375 44.795 28.4425 45.0841 28.4524C45.6019 28.4673 46.0957 28.4971 46.5834 28.5418C48.6188 28.7354 50.1543 29.2516 51.6838 29.7728C52.6653 30.1004 53.6408 30.433 54.7488 30.6564C54.7608 30.6613 54.7669 30.6613 54.7849 30.6663C55.1583 30.7407 55.4955 30.7556 55.7905 30.7308C56.3204 30.6861 56.7359 30.4826 57.0611 30.1848C57.4224 29.8473 57.6813 29.3807 57.8379 28.8644C58.0065 28.2986 58.0426 27.6731 57.9704 27.0874C57.9041 26.5563 57.7476 26.0251 57.5489 25.499C57.3381 24.9579 57.0792 24.4318 56.7901 23.9354C56.5312 23.4837 56.2361 23.0469 55.917 22.6349C55.5978 22.2278 55.2426 21.8258 54.8572 21.4287C53.5806 20.1232 52.2317 19.2297 50.8829 18.7135C49.6545 18.2469 48.408 18.093 47.2157 18.232C46.0114 18.3759 44.8372 18.8227 43.7412 19.5474C42.3382 20.4756 41.0797 21.8655 40.074 23.6624C39.9054 23.9652 39.797 24.2779 39.7308 24.5906C39.6947 24.7097 39.6766 24.8388 39.6646 24.9728ZM41.0014 27.5987C40.074 26.8342 38.7914 26.3627 37.3763 26.3627C35.9613 26.3627 34.6786 26.8342 33.7513 27.5987C32.824 28.3631 32.2519 29.4204 32.2519 30.5869C32.2519 31.7534 32.824 32.8106 33.7513 33.5701C34.6786 34.3345 35.9613 34.8061 37.3763 34.8061C38.7914 34.8061 40.074 34.3296 41.0014 33.5701C41.9287 32.8057 42.5008 31.7484 42.5008 30.5869C42.5008 29.4253 41.9227 28.3581 41.0014 27.5987ZM30.331 28.4574C30.6502 27.7128 31.1439 27.0378 31.8063 26.4222C32.5109 25.772 33.4141 25.1962 34.5161 24.6948C34.5161 24.4566 34.5161 24.2233 34.5281 23.985C34.5462 23.5631 34.5823 23.1511 34.6365 22.749C34.8653 21.0614 35.4916 19.7956 36.1118 18.5397C36.5152 17.7207 36.9187 16.9017 37.1837 16.0132C37.28 15.6955 37.3041 15.4076 37.268 15.1544C37.2138 14.7226 36.9609 14.3751 36.5996 14.1071C36.1841 13.8043 35.624 13.5958 34.9978 13.4717C34.3113 13.3377 33.5526 13.303 32.842 13.3675C32.1977 13.427 31.5474 13.5511 30.9151 13.7199C30.2708 13.8887 29.6325 14.1071 29.0183 14.3453C28.4703 14.5588 27.9464 14.802 27.4406 15.0701C26.9288 15.3431 26.441 15.631 25.9834 15.9437C24.3997 17.001 23.3158 18.1129 22.6896 19.2347C22.1235 20.2473 21.9368 21.2748 22.1175 22.2527C22.2921 23.2454 22.8341 24.2134 23.7193 25.1118C24.8513 26.2634 26.5374 27.3008 28.7232 28.1298C29.0906 28.2688 29.4699 28.3581 29.8433 28.4078C30.0058 28.4326 30.1684 28.4475 30.331 28.4574ZM37.003 7.63927C52.3221 7.63927 64.7387 17.8746 64.7387 30.5025C64.7387 43.1304 52.3221 53.3657 37.003 53.3657C21.6839 53.3657 9.2673 43.1304 9.2673 30.5025C9.2673 17.8746 21.6839 7.63927 37.003 7.63927ZM65.0759 4.74538C67.0209 4.74538 68.5926 6.04589 68.5926 7.64423C68.5926 9.24754 67.0149 10.5431 65.0759 10.5431C63.1369 10.5431 61.5593 9.24257 61.5593 7.64423C61.5593 6.04093 63.1369 4.74538 65.0759 4.74538ZM8.92407 4.74538C10.8691 4.74538 12.4407 6.04589 12.4407 7.64423C12.4407 9.24754 10.863 10.5431 8.92407 10.5431C6.97908 10.5431 5.40743 9.24257 5.40743 7.64423C5.40743 6.04093 6.9851 4.74538 8.92407 4.74538ZM65.0759 50.4966C67.0209 50.4966 68.5926 51.7971 68.5926 53.3955C68.5926 54.9938 67.0149 56.2943 65.0759 56.2943C63.1369 56.2943 61.5593 54.9938 61.5593 53.3955C61.5593 51.7971 63.1369 50.4966 65.0759 50.4966ZM12.4467 53.3955C12.4467 54.9988 10.8691 56.2943 8.93009 56.2943C6.9851 56.2943 5.41345 54.9938 5.41345 53.3955C5.41345 51.7971 6.99112 50.4966 8.93009 50.4966C10.8691 50.4966 12.4467 51.7971 12.4467 53.3955Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_3635_784">
              <rect width="74" height="61" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </View>
    );
  },
};
