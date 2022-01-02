import { useState } from 'react';
import QrReader from 'react-qr-reader-es6';
import { Link, useHistory } from 'react-router-dom';

const QrPage = () => {
  const history = useHistory();
  const [resultQr, setResultQr] = useState('sin data...');

  const handleScanQr = (data) => {
    // console.log(data);
    if (data) history.push(data);
    setResultQr(data);
  };

  const handleErrorScanQr = (error) => {
    console.log(error);
  };

  return (
    <div className="w-full h-screen flex justify-center" style={{ background: '#051B34' }}>
      <div
        className="h-screen flex flex-col justify-center gap-16 relative"
        style={{ width: '90%' }}
      >
        <div className="text-white absolute top-16 left-2">
          <Link to="/home" className="flex justify-center">
            <div>
              <img src="assets/icons/Back-Arrow.svg" alt="icon-back" className="inline-block w-8" />
            </div>
            <p className="pl-4">Atras</p>
          </Link>
        </div>
        <div>
          <QrReader
            onScan={handleScanQr}
            onError={handleErrorScanQr}
            style={{ width: '100%', background: '#051B34' }}
          />
        </div>
        <div className="text-white">
          <h2 className="text-12 font-600 text-center">
            Escanea el codigo de seguridad que tiene la mesera que te atendio
          </h2>
        </div>
      </div>
    </div>
  );
};

export default QrPage;
