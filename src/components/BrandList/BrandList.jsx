import { useDispatch, useSelector } from 'react-redux';
import { useGetBrandsQuery } from '../../api/favoritApi';
import { brandSelected } from '../../features/search/searchSlice';
import { selectSelectedBrand } from '../../features/search/selectors';
import { formatPrice } from '../../utils/format';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import EmptyState from '../EmptyState/EmptyState';

function BrandList({ number }) {
  const dispatch = useDispatch();
  const selectedBrand = useSelector(selectSelectedBrand);
  const { data: brands, isFetching, isError, error, refetch } = useGetBrandsQuery(number);

  if (isFetching) return <Loader label="Поиск производителей…" />;
  if (isError) return <ErrorMessage error={error} onRetry={refetch} />;
  if (!brands?.length) {
    return (
      <EmptyState
        title="Ничего не найдено"
        text={`По артикулу «${number}» в базе нет деталей. Проверьте номер.`}
      />
    );
  }

  return (
    <section aria-labelledby="brands-heading">
      <h2 id="brands-heading" className="h5 mb-3">
        Производители <span className="badge text-bg-secondary">{brands.length}</span>
      </h2>
      <div className="list-group shadow-sm">
        {brands.map((item) => {
          const isActive = selectedBrand?.id === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
              aria-pressed={isActive}
              onClick={() => dispatch(brandSelected(item))}
            >
              <div className="d-flex justify-content-between align-items-start gap-2">
                <div className="text-truncate">
                  <div className="fw-semibold">{item.brand}</div>
                  <div className={`small ${isActive ? '' : 'text-secondary'}`}>
                    {item.number} · {item.name}
                  </div>
                  {item.minPrice != null && (
                    <div className="small">от {formatPrice(item.minPrice)}</div>
                  )}
                </div>
                <span
                  className={`badge rounded-pill text-nowrap ${
                    item.count > 0 ? 'text-bg-success' : 'text-bg-light'
                  }`}
                >
                  {item.count} шт.
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default BrandList;
