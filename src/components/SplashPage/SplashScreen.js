import { memo } from 'react';
import tenderLogo from '../../images/tender-logo.svg';
import CoverBgBlack from '../../images/CoverFullBlacksvg.svg';

function FuseSplashScreen() {
  return (
    <div
      id="fuse-splash-screen"
      className="w-full h-screen flex justify-center items-center text-center"
      style={{
        background: 'no-repeat center/cover',
        backgroundImage: `url(${CoverBgBlack})`,
      }}
    >
      <div className="logo">
        <img width="80" src={tenderLogo} alt="logo" className="mx-auto" />
        <p className="text-xl font-bold text-white pt-4">WUAY</p>
      </div>
    </div>
  );
}

export default memo(FuseSplashScreen);
