// «Товар не найден» — сервис возвращает одну пустую структуру с нулевым goodsID
const EMPTY_GOODS_ID = '00000000-0000-0000-0000-000000000000';

const isEmptyGood = (good) =>
  !good || !good.goodsID || good.goodsID === EMPTY_GOODS_ID || !good.brand;

const toArray = (value) => (Array.isArray(value) ? value : []);

const getMinPrice = (warehouses) => {
  const prices = toArray(warehouses)
    .map((warehouse) => Number(warehouse.price))
    .filter((price) => price > 0);
  return prices.length ? Math.min(...prices) : null;
};

export const normalizeBrands = (goods) =>
  toArray(goods)
    .filter((good) => !isEmptyGood(good))
    .map((good) => ({
      id: good.goodsID,
      brand: good.brand,
      number: good.number,
      name: good.name,
      count: Number(good.count) || 0,
      minPrice: getMinPrice(good.warehouses),
    }));

// Одна строка таблицы = одно предложение «товар × склад».
// Цена берётся только из склада: goods.price по документации использовать нельзя.
const toOfferRows = (good, isAnalogue) => {
  const base = {
    goodsId: good.goodsID,
    brand: good.brand,
    number: good.number,
    name: good.name,
    isAnalogue,
  };
  const warehouses = toArray(good.warehouses);

  if (!warehouses.length) {
    return [
      {
        ...base,
        id: `${good.goodsID}:none`,
        warehouse: null,
        price: null,
        stock: 0,
        shipmentDate: null,
        notRefund: Boolean(good.notRefund),
      },
    ];
  }

  return warehouses.map((warehouse, index) => ({
    ...base,
    id: `${good.goodsID}:${warehouse.id || index}`,
    warehouse: warehouse.code || null,
    price: Number(warehouse.price) || null,
    stock: Number(warehouse.stock) || 0,
    shipmentDate: warehouse.shipmentDate || null,
    notRefund: Boolean(good.notRefund || warehouse.notRefund),
  }));
};

// Искомая деталь -> аналоги; внутри: сначала в наличии, затем по возрастанию цены
const compareOffers = (a, b) => {
  if (a.isAnalogue !== b.isAnalogue) return a.isAnalogue ? 1 : -1;
  const aInStock = a.stock > 0;
  const bInStock = b.stock > 0;
  if (aInStock !== bInStock) return aInStock ? -1 : 1;
  return (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER);
};

export const normalizeOffers = (goods) =>
  toArray(goods)
    .filter((good) => !isEmptyGood(good))
    .flatMap((good) => [
      ...toOfferRows(good, false),
      ...toArray(good.analogues)
        .filter((analogue) => !isEmptyGood(analogue))
        .flatMap((analogue) => toOfferRows(analogue, true)),
    ])
    .sort(compareOffers);
