import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MenuProducts from './MenuProducts';
import {
  getCategoriesByUser,
  selectCategories,
  setSelectCategory,
} from '../../store/app/categorySlice';
import { getProdutsByCategory, selectProducts } from '../../store/app/productsSlice';

const MenuContent = () => {
  const dispatch = useDispatch();
  const routeParams = useParams();

  const allCategories = useSelector(selectCategories);
  const allProducts = useSelector(selectProducts);
  const { selectCategory } = useSelector(({ categories }) => categories);

  useEffect(() => {
    dispatch(getCategoriesByUser(routeParams?.idCommerce)).then((item) => {
      if (item?.payload) handleFilterProducts(item?.payload[0]?.id);
    });
  }, [dispatch, routeParams]);

  const handleFilterProducts = (idCategory) => {
    dispatch(setSelectCategory(idCategory));
    dispatch(getProdutsByCategory(idCategory));
  };

  return (
    <>
      <div className="flex justify-center w-full mt-8">
        <div className="flex justify-start ml-14 overflow-x-auto row-categories pb-2 w-full" style={{display : '-webkit-box'}}>
          {allCategories.map((item) => (
            <div id={item.id} className="py-2 mr-8">
              <button
                type="button"
                className={`min-w-max flex justify-center text-center rounded ${
                  selectCategory === item.id ? 'bg-white' : 'bg-active text-white'
                } shadow-md px-16 py-5`}
                onClick={() => handleFilterProducts(item.id)}
              >
                <p>{item.category}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
      <MenuProducts productsFilter={allProducts} />
    </>
  );
};

export default MenuContent;
