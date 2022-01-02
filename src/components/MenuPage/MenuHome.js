import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuHeader from './MenuHeader';
// import CoverMenu from '../../images/cover-menu.jpg';
import { getInfoCommerce } from '../../store/app/commerceSlice';
import {
  getCategoriesByUser,
  selectCategories,
  setSelectCategory,
} from '../../store/app/categorySlice';
import { getProdutsByCategory, selectProducts } from '../../store/app/productsSlice';
import MenuContent from './MenuContent';

const MenuHome = () => {
  const dispatch = useDispatch();
  const routeParams = useParams();

  const { commerce } = useSelector(({ commerces }) => commerces);

  useEffect(() => {
    // TODO TRAER DATOS DEL COMMERCIO CON ROUTEPARAMS.IDCOMMERCE
    // console.log(routeParams);
    const id = routeParams ? routeParams?.idCommerce : 0;
    dispatch(getInfoCommerce(id));
  }, [dispatch, routeParams]);

  // MENU CONTENT
  const allCategories = useSelector(selectCategories);
  const allProducts = useSelector(selectProducts);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { selectCategory } = useSelector(({ categories }) => categories);

  useEffect(() => {
    dispatch(getCategoriesByUser(routeParams?.idCommerce));
  }, [dispatch, routeParams]);

  const handleFilterProducts = (idCategory) => {
    dispatch(setSelectCategory(idCategory));
    dispatch(getProdutsByCategory(idCategory));
  };

  return (
    <>
      <div
        className="w-full h-full overflow-y-scroll mb-16"
        style={{
          background: 'no-repeat center/cover',
          backgroundImage: `url(${commerce?.banner?.url})`,
          position: 'fixed',
          minWidth: '100%',
          minHeight: '100%',
        }}
      >
        <MenuHeader />
        <MenuContent />
      </div>
    </>
  );
};

export default MenuHome;
