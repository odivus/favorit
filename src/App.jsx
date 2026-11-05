import { useSelector } from 'react-redux';
import Author from './components/Author/Author';
import SearchForm from './components/SearchForm/SearchForm';
import BrandList from './components/BrandList/BrandList';
import OffersTable from './components/OffersTable/OffersTable';
import EmptyState from './components/EmptyState/EmptyState';
import { selectNumber, selectSelectedBrand } from './features/search/selectors';
import { useGetBrandsQuery } from './api/favoritApi';

function App() {
  const number = useSelector(selectNumber);
  const selectedBrand = useSelector(selectSelectedBrand);
  const { currentData: brands } = useGetBrandsQuery(number, { skip: !number });
  const hasBrands = Boolean(brands?.length);

  return (
    <div className="container py-4">
      <header className="mb-4">
        <Author />
      </header>

      <header className="mb-4">
        <h1 className="h3 mb-1">Подбор автозапчастей</h1>
        <p className="text-secondary mb-0">
          Введите артикул, выберите производителя — получите аналоги и предложения.
        </p>
      </header>

      <SearchForm />

      {number && (
        <div className="row g-4 mt-1">
          <div className="col-12 col-lg-4">
            <BrandList number={number} />
          </div>
          <div className="col-12 col-lg-8">
            {selectedBrand && (
              <OffersTable number={selectedBrand.number} brand={selectedBrand.brand} />
            )}
            {(!selectedBrand && hasBrands) && (
              <EmptyState
                title="Выберите производителя"
                text="Аналоги и предложения появятся после выбора производителя из списка."
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
