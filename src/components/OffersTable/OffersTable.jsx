import { useEffect, useRef } from 'react';
import { useGetOffersQuery } from '../../api/favoritApi';
import { formatDate, formatPrice } from '../../utils/format';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import EmptyState from '../EmptyState/EmptyState';
import styles from './OffersTable.module.css';

function OfferRow({ offer }) {
  const inStock = offer.stock > 0;
  const shipment = formatDate(offer.shipmentDate);

  return (
    <tr className={inStock ? '' : 'text-secondary'}>
      <td data-label="Деталь">
        <div className="fw-semibold">
          {offer.brand} <span className="fw-normal">{offer.number}</span>
        </div>
        <div className="small">{offer.name}</div>
        {(offer.isAnalogue || offer.notRefund) && (
          <div className="d-flex flex-wrap gap-1 mt-1">
            {offer.isAnalogue && <span className="badge text-bg-info">аналог</span>}
            {offer.notRefund && <span className="badge text-bg-warning">без возврата</span>}
          </div>
        )}
      </td>
      <td data-label="Склад">
        <div>{offer.warehouse ?? '—'}</div>
        {shipment && <div className="small text-secondary">отгрузка {shipment}</div>}
      </td>
      <td data-label="Цена" className="text-end text-nowrap fw-semibold">
        {formatPrice(offer.price)}
      </td>
      <td data-label="Остаток" className="text-end text-nowrap">
        {inStock ? `${offer.stock} шт.` : 'нет в наличии'}
      </td>
    </tr>
  );
}

function OffersTable({ number, brand }) {
  const sectionRef = useRef(null);
  const { data: offers, isFetching, isError, error, refetch } = useGetOffersQuery({
    number,
    brand,
  });

  // На мобильных таблица находится под списком брендов — подводим к ней экран
  useEffect(() => {
    if (window.matchMedia('(max-width: 991.98px)').matches) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [number, brand]);

  const renderContent = () => {
    if (isFetching) return <Loader label="Загружаем аналоги и предложения…" />;
    if (isError) return <ErrorMessage error={error} onRetry={refetch} />;
    if (!offers?.length) {
      return (
        <EmptyState
          title="Предложений нет"
          text="По выбранной детали и её аналогам сейчас нет остатков на складах."
        />
      );
    }

    return (
      <div className="table-responsive bg-body rounded shadow-sm">
        <table className={`table table-hover align-middle mb-0 ${styles.table}`}>
          <thead className="table-light">
            <tr>
              <th scope="col">Деталь</th>
              <th scope="col">Склад</th>
              <th scope="col" className="text-end">
                Цена
              </th>
              <th scope="col" className="text-end">
                Остаток
              </th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <OfferRow key={offer.id} offer={offer} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section ref={sectionRef} aria-labelledby="offers-heading">
      <h2 id="offers-heading" className="h5 mb-3">
        Аналоги и предложения:{' '}
        <span className="text-secondary fw-normal">
          {brand} {number}
        </span>
      </h2>
      {renderContent()}
    </section>
  );
}

export default OffersTable;
