import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
  const location = useLocation();
  const isRouteActive = (path) => {
    return location.pathname.startsWith(path) ? "active" : "";
  };
  return (
    <>
      <div className="menuBlock">
        {/* <Link className={`link ${isRouteActive("/profile")}`} to={"/profile"}>
          <svg
            viewBox="0 0 20 20"
            transform="scale(0.8)"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="layer1">
                {" "}
                <path
                  d="M 10 0 L 9.5644531 0.01953125 L 9.1328125 0.076171875 L 8.7050781 0.16992188 L 8.2890625 0.30273438 L 7.8867188 0.46875 L 7.5 0.66992188 L 7.1328125 0.90625 L 6.7871094 1.171875 L 6.4628906 1.4648438 L 6.1699219 1.7871094 L 5.9042969 2.1328125 L 5.6699219 2.5 L 5.46875 2.8886719 L 5.3027344 3.2910156 L 5.1699219 3.7070312 L 5.0761719 4.1328125 L 5.0195312 4.5664062 L 5 5.0019531 L 5.0175781 5.6816406 L 5.0742188 6.359375 L 5.1660156 7.0351562 L 5.2949219 7.703125 L 5.4589844 8.3613281 L 5.6601562 9.0136719 L 5.8984375 9.6523438 L 6.1660156 10.275391 L 6.4707031 10.884766 L 6.6523438 11.193359 L 6.8632812 11.484375 L 6.9296875 11.595703 L 6.9648438 11.720703 L 6.96875 11.847656 L 6.9375 11.974609 L 6.875 12.087891 L 6.7871094 12.181641 L 6.6777344 12.25 L 6.5527344 12.287109 L 5.6953125 12.449219 L 4.84375 12.646484 L 4.0019531 12.878906 L 3.1699219 13.146484 L 2.3515625 13.445312 L 2.0351562 13.591797 L 1.7382812 13.771484 L 1.4648438 13.986328 L 1.2167969 14.230469 L 0.99804688 14.5 L 0.81445312 14.794922 L 0.6640625 15.109375 L 0.46484375 15.652344 L 0.296875 16.208984 L 0.16796875 16.775391 L 0.07421875 17.345703 L 0.01953125 17.923828 L 0 18.503906 L 0.01953125 18.644531 L 0.080078125 18.775391 L 0.171875 18.882812 L 0.29296875 18.958984 L 0.42773438 19 L 0.57226562 19 L 0.70703125 18.958984 L 0.828125 18.882812 L 0.91992188 18.775391 L 0.98046875 18.644531 L 1 18.503906 L 1.0175781 17.988281 L 1.0664062 17.476562 L 1.1484375 16.964844 L 1.2636719 16.464844 L 1.4121094 15.96875 L 1.5898438 15.486328 L 1.7089844 15.242188 L 1.859375 15.017578 L 2.0390625 14.816406 L 2.2441406 14.640625 L 2.4707031 14.492188 L 2.7148438 14.378906 L 3.4960938 14.089844 L 4.2871094 13.835938 L 5.0878906 13.615234 L 5.9003906 13.427734 L 6.7167969 13.273438 L 6.9472656 13.216797 L 7.1699219 13.123047 L 7.3710938 12.996094 L 7.5507812 12.835938 L 7.7011719 12.652344 L 7.8222656 12.443359 L 7.9101562 12.220703 L 7.9570312 11.986328 L 7.9707031 11.748047 L 7.9433594 11.509766 L 7.8789062 11.279297 L 7.7792969 11.0625 L 7.6484375 10.865234 L 7.4902344 10.644531 L 7.3535156 10.416016 L 7.0742188 9.8554688 L 6.8261719 9.2792969 L 6.609375 8.6933594 L 6.4238281 8.09375 L 6.2734375 7.4863281 L 6.1542969 6.8710938 L 6.0683594 6.2519531 L 6.015625 5.6289062 L 6 5.0019531 L 6.0195312 4.609375 L 6.078125 4.2207031 L 6.171875 3.8398438 L 6.3046875 3.4707031 L 6.4726562 3.1152344 L 6.6738281 2.7792969 L 6.9082031 2.4628906 L 7.1699219 2.171875 L 7.4628906 1.9082031 L 7.7773438 1.6738281 L 8.1152344 1.4746094 L 8.4707031 1.3046875 L 8.8398438 1.1738281 L 9.21875 1.078125 L 9.6074219 1.0195312 L 10 1 L 10.392578 1.0195312 L 10.78125 1.078125 L 11.160156 1.1738281 L 11.529297 1.3046875 L 11.886719 1.4746094 L 12.222656 1.6738281 L 12.537109 1.9082031 L 12.830078 2.171875 L 13.091797 2.4628906 L 13.326172 2.7792969 L 13.527344 3.1152344 L 13.695312 3.4707031 L 13.828125 3.8398438 L 13.923828 4.2207031 L 13.982422 4.609375 L 14 5.0019531 L 13.984375 5.6289062 L 13.931641 6.2519531 L 13.845703 6.8710938 L 13.728516 7.4863281 L 13.576172 8.09375 L 13.390625 8.6933594 L 13.173828 9.2792969 L 12.925781 9.8554688 L 12.646484 10.416016 L 12.509766 10.644531 L 12.351562 10.865234 L 12.220703 11.0625 L 12.121094 11.279297 L 12.056641 11.509766 L 12.029297 11.748047 L 12.042969 11.986328 L 12.091797 12.220703 L 12.177734 12.443359 L 12.298828 12.652344 L 12.451172 12.835938 L 12.628906 12.996094 L 12.830078 13.123047 L 13.052734 13.216797 L 13.283203 13.273438 L 14.099609 13.427734 L 14.912109 13.615234 L 15.712891 13.835938 L 16.505859 14.089844 L 17.285156 14.378906 L 17.529297 14.492188 L 17.755859 14.640625 L 17.960938 14.816406 L 18.140625 15.017578 L 18.291016 15.242188 L 18.410156 15.486328 L 18.587891 15.96875 L 18.736328 16.464844 L 18.851562 16.964844 L 18.933594 17.476562 L 18.982422 17.988281 L 19 18.503906 L 19.019531 18.644531 L 19.080078 18.775391 L 19.171875 18.882812 L 19.292969 18.958984 L 19.427734 19 L 19.572266 19 L 19.708984 18.958984 L 19.828125 18.882812 L 19.919922 18.775391 L 19.980469 18.644531 L 20 18.503906 L 19.980469 17.923828 L 19.925781 17.345703 L 19.832031 16.773438 L 19.703125 16.208984 L 19.535156 15.652344 L 19.335938 15.109375 L 19.185547 14.794922 L 19.001953 14.5 L 18.783203 14.230469 L 18.535156 13.986328 L 18.263672 13.771484 L 17.966797 13.591797 L 17.648438 13.445312 L 16.830078 13.146484 L 15.998047 12.878906 L 15.15625 12.646484 L 14.306641 12.449219 L 13.447266 12.287109 L 13.322266 12.25 L 13.212891 12.181641 L 13.125 12.087891 L 13.0625 11.974609 L 13.033203 11.847656 L 13.035156 11.720703 L 13.070312 11.595703 L 13.136719 11.484375 L 13.347656 11.193359 L 13.529297 10.884766 L 13.833984 10.275391 L 14.103516 9.6523438 L 14.339844 9.0136719 L 14.541016 8.3613281 L 14.705078 7.703125 L 14.833984 7.0351562 L 14.925781 6.359375 L 14.982422 5.6816406 L 15 5.0019531 L 14.982422 4.5664062 L 14.923828 4.1328125 L 14.830078 3.7070312 L 14.697266 3.2910156 L 14.53125 2.8886719 L 14.330078 2.5 L 14.097656 2.1328125 L 13.830078 1.7871094 L 13.537109 1.4648438 L 13.212891 1.171875 L 12.869141 0.90625 L 12.5 0.66992188 L 12.113281 0.46875 L 11.710938 0.30273438 L 11.294922 0.16992188 L 10.867188 0.076171875 L 10.435547 0.01953125 L 10 0 z "
                  fill="#fff"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
          <span>Profile</span>
        </Link> */}
        <Link
          className={`link ${isRouteActive("/translate")}`}
          to={"/translate"}
        >
          <svg
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.4 5.4H4V6.6H13.2189C13.1612 6.78478 13.0895 6.99578 13.0025 7.22211C12.7032 8.00031 12.2402 8.91125 11.5757 9.57574L10 11.1515L9.42426 10.5757C8.72102 9.8725 8.25297 9.16987 7.96199 8.64611C7.81668 8.38455 7.71617 8.16874 7.65305 8.02146C7.62151 7.94787 7.59937 7.89154 7.5857 7.85534C7.57886 7.83725 7.57415 7.8242 7.57144 7.81657L7.56886 7.80922C7.56886 7.80922 7.56921 7.81026 7 8C6.43079 8.18974 6.43091 8.19009 6.43091 8.19009L6.43133 8.19135L6.43206 8.19351L6.4341 8.19948L6.44052 8.21786C6.44587 8.23292 6.45336 8.25357 6.46313 8.27942C6.48266 8.33112 6.5113 8.40369 6.55008 8.49416C6.62758 8.67501 6.74582 8.92795 6.91301 9.22889C7.24703 9.83013 7.77898 10.6275 8.57574 11.4243L9.15147 12L4.57964 16.5718L4.57655 16.5749L4.57577 16.5757L5.4243 17.4242L5.42688 17.4216L10.0368 12.8117L12.6159 14.9609L13.3841 14.0391L10.8888 11.9597L12.4243 10.4243C13.2598 9.58875 13.7968 8.49969 14.1225 7.65289C14.2818 7.23863 14.395 6.87072 14.4696 6.6H16V5.4H10.6V4H9.4V5.4ZM17.4405 10L21.553 19.7672H20.2509L19.1279 17.1H14.8721L13.7491 19.7672H12.447L16.5595 10H17.4405ZM15.3773 15.9H18.6227L17 12.0462L15.3773 15.9Z"
                fill="#fff"
              ></path>{" "}
            </g>
          </svg>
          <span>Translate</span>
        </Link>
        <Link
          className={`link ${isRouteActive("/dictionary")}`}
          to={"/dictionary"}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M12 6.90909C10.8999 5.50893 9.20406 4.10877 5.00119 4.00602C4.72513 3.99928 4.5 4.22351 4.5 4.49965C4.5 6.54813 4.5 14.3034 4.5 16.597C4.5 16.8731 4.72515 17.09 5.00114 17.099C9.20405 17.2364 10.8999 19.0998 12 20.5M12 6.90909C13.1001 5.50893 14.7959 4.10877 18.9988 4.00602C19.2749 3.99928 19.5 4.21847 19.5 4.49461C19.5 6.78447 19.5 14.3064 19.5 16.5963C19.5 16.8724 19.2749 17.09 18.9989 17.099C14.796 17.2364 13.1001 19.0998 12 20.5M12 6.90909L12 20.5"
                stroke="#fff"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M19.2353 6H21.5C21.7761 6 22 6.22386 22 6.5V19.539C22 19.9436 21.5233 20.2124 21.1535 20.0481C20.3584 19.6948 19.0315 19.2632 17.2941 19.2632C14.3529 19.2632 12 21 12 21C12 21 9.64706 19.2632 6.70588 19.2632C4.96845 19.2632 3.64156 19.6948 2.84647 20.0481C2.47668 20.2124 2 19.9436 2 19.539V6.5C2 6.22386 2.22386 6 2.5 6H4.76471"
                stroke="#fff"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <span>Dictonary</span>
        </Link>
        <Link className={`link ${isRouteActive("/tests")}`} to={"/tests"}>
          <svg
            fill="#fff"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            stroke="#fff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M441.242,87.859L355.731,2.347C354.228,0.844,352.189,0,350.063,0H93.528C79.677,0,68.409,11.268,68.409,25.119v461.762 c0,13.851,11.268,25.119,25.119,25.119h324.944c13.851,0,25.119-11.268,25.119-25.119V93.528 C443.591,91.401,442.746,89.363,441.242,87.859z M358.079,27.37l58.141,58.141h-49.056c-5.01,0-9.086-4.076-9.086-9.086V27.37z M427.557,486.881c0,5.01-4.076,9.086-9.086,9.086H93.528c-5.01,0-9.086-4.076-9.086-9.086V25.119c0-5.01,4.076-9.086,9.086-9.086 h248.518v60.393c0,13.851,11.268,25.119,25.119,25.119h60.393V486.881z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M332.144,202.584l-23.075-84.611c-2.467-9.043-10.736-15.359-20.11-15.359h-14.611c-9.374,0-17.642,6.316-20.109,15.359 l-23.075,84.611c-1.165,4.271,1.353,8.678,5.626,9.843c4.269,1.164,8.678-1.354,9.843-5.626l5.385-19.746h59.272l5.385,19.746 c0.973,3.566,4.204,5.91,7.729,5.91c0.698,0,1.408-0.092,2.114-0.284C330.79,211.263,333.309,206.855,332.144,202.584z M256.39,171.023l13.317-48.831c0.569-2.086,2.478-3.544,4.64-3.544h14.611c2.162,0,4.071,1.458,4.64,3.544l13.318,48.831H256.39z "></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M384.267,153.921h-9.086v-9.086c0-4.427-3.589-8.017-8.017-8.017c-4.427,0-8.017,3.589-8.017,8.017v9.086h-9.086 c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h9.086v9.086c0,4.427,3.589,8.017,8.017,8.017 c4.427,0,8.017-3.589,8.017-8.017v-9.086h9.086c4.427,0,8.017-3.589,8.017-8.017S388.695,153.921,384.267,153.921z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M375.716,273.637H256c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h119.716c4.427,0,8.017-3.589,8.017-8.017 S380.143,273.637,375.716,273.637z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M324.409,307.841H256c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h68.409c4.427,0,8.017-3.589,8.017-8.017 S328.837,307.841,324.409,307.841z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M218.462,258.465c-3.363-2.882-8.422-2.493-11.304,0.869l-44.804,52.27l-19.657-26.209 c-2.656-3.541-7.68-4.26-11.223-1.603c-3.542,2.656-4.26,7.681-1.603,11.223l25.653,34.205c1.459,1.945,3.722,3.123,6.153,3.202 c0.088,0.002,0.174,0.004,0.262,0.004c2.336,0,4.561-1.02,6.086-2.799l51.307-59.858 C222.212,266.407,221.823,261.346,218.462,258.465z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M375.716,376.251H256c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h119.716 c4.427,0,8.017-3.589,8.017-8.017C383.733,379.84,380.143,376.251,375.716,376.251z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M324.409,410.455H256c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h68.409 c4.427,0,8.017-3.589,8.017-8.017C332.426,414.044,328.837,410.455,324.409,410.455z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M218.462,361.079c-3.363-2.882-8.422-2.493-11.304,0.869l-44.804,52.27l-19.657-26.209 c-2.656-3.541-7.68-4.26-11.223-1.603c-3.542,2.656-4.26,7.681-1.603,11.223l25.653,34.205c1.459,1.945,3.722,3.123,6.153,3.202 c0.088,0.002,0.174,0.004,0.262,0.004c2.336,0,4.561-1.02,6.086-2.799l51.307-59.858 C222.212,369.021,221.823,363.959,218.462,361.079z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M221.795,85.511h-85.511c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h85.511 c4.427,0,8.017-3.589,8.017-8.017S226.223,85.511,221.795,85.511z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M187.591,119.716h-51.307c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h51.307 c4.427,0,8.017-3.589,8.017-8.017S192.018,119.716,187.591,119.716z"></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
          <span>Tests</span>
        </Link>
      </div>
    </>
  );
}