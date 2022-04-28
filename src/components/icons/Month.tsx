import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Month: React.FC = () => {
  const theme = useTheme();

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M5.33333 12H8V14.4H5.33333V12ZM24 4.8V21.6C24 22.2365 23.719 22.847 23.219 23.2971C22.7189 23.7471 22.0406 24 21.3333 24H2.66667C1.95942 24 1.28115 23.7471 0.781048 23.2971C0.280951 22.847 0 22.2365 0 21.6V4.8C0 4.16348 0.280951 3.55303 0.781048 3.10294C1.28115 2.65286 1.95942 2.4 2.66667 2.4H4V0H6.66667V2.4H17.3333V0H20V2.4H21.3333C22.0406 2.4 22.7189 2.65286 23.219 3.10294C23.719 3.55303 24 4.16348 24 4.8ZM2.66667 7.2H21.3333V4.8H2.66667V7.2ZM21.3333 21.6V9.6H2.66667V21.6H21.3333ZM16 14.4V12H18.6667V14.4H16ZM10.6667 14.4V12H13.3333V14.4H10.6667ZM5.33333 16.8H8V19.2H5.33333V16.8ZM16 19.2V16.8H18.6667V19.2H16ZM10.6667 19.2V16.8H13.3333V19.2H10.6667Z"
        fill={theme['color-primary-500']}
      />
    </Svg>
  );
};

export default Month;