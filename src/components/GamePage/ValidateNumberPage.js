import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NextArrowWhite from '../../images/icons/Next-Arrow-White.svg';
import IconPhone from '../../images/icons/Icon-phone.svg';
import CoverBlackLogin from '../../images/CoverFullBlacksvg.svg';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField);

const ValidateNumberPage = (props) => {
  const [code, setCode] = useState('');
  const { dataLogin } = useSelector(({ login }) => login);

  return (
    <div
      className="w-full h-screen  flex justify-center text-white"
      style={{ background: 'no-repeat center/cover', backgroundImage: `url(${CoverBlackLogin})` }}
      // style={{ background: '#051B34' }}
    >
      <form
        onSubmit={(event) => props.ValidateOtp(event)}
        className="w-full flex flex-col items-center gap-8"
        style={{ width: '90%' }}
      >
        <div className="w-full flex justify-start mt-32">
          <Link to="/login" className="inline-block flex">
            <div>
              <img
                src="assets/icons/Back-Arrow.svg"
                alt="icon w-back"
                className="inline-block w-8"
              />
            </div>
            <p className="pl-4 font-500">Atras</p>
          </Link>
        </div>
        <div className="w-full flex flex-col items-center space-y-8 mt-40">
          <img src={IconPhone} alt="phone-icon" className="block w-32 h-32" />
          <h3 className="block font-600 text-12 text-center">Validación</h3>
          <div className="w-full">
            <p className="w-full text-11 font-700 mb-8">Código de verificación :</p>
            <div className="w-full flex space-x-8">
              <CssTextField
                className="w-full my-8 bg-white rounded-8"
                style={{ color: '#051B34' }}
                label=""
                variant="outlined"
                id="code1"
                size="small"
                type="text"
                value={code}
                onChange={(event) => {
                  props.setotp(event.target.value);
                  setCode(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center mb-32 mt-8 space-x-8 py-4 rounded-12 border-1 border-white bg-transparent"
        >
          <span className="block text-center pl-4 font-500 text-11">Validar</span>
          <div className="flex items-center">
            <img src={NextArrowWhite} alt="icon-back" className="w-8 h-8 block" />
          </div>
        </button>
      </form>
    </div>
  );
};

export default ValidateNumberPage;
