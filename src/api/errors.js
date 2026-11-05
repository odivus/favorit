const API_ERROR_MESSAGES = {
  'Empty key!': 'Не указан ключ покупателя.',
  'Invalid key client!': 'Неверный ключ покупателя.',
  'Empty number goods!': 'Не указан номер детали.',
  'Request quota exceeded!': 'Превышен лимит запросов.',
};

const translateApiError = (raw) =>
  [].concat(raw)
    .map((message) => {
      const text = typeof message === 'string' ? message : JSON.stringify(message);
      return API_ERROR_MESSAGES[text] ?? text;
    })
    .join(' ');

export const getErrorMessage = (error) => {
  if (!error) return 'Неизвестная ошибка.';

  switch (error.status) {
    case 'FETCH_ERROR':
      return 'Не удалось связаться с сервером. Проверьте подключение к сети.';
    case 'TIMEOUT_ERROR':
      return 'Сервер не ответил вовремя. Попробуйте ещё раз.';
    case 'PARSING_ERROR':
      return 'Сервер вернул ответ в неожиданном формате.';
    case 'API_ERROR':
      return translateApiError(error.data);
    default:
      return typeof error.status === 'number'
        ? `Сервер ответил ошибкой (HTTP ${error.status}).`
        : 'Произошла ошибка при выполнении запроса.';
  }
};
