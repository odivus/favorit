import { getErrorMessage } from '../../api/errors';

function ErrorMessage({ error, onRetry }) {
  return (
    <div className="alert alert-danger d-flex flex-wrap align-items-center gap-3" role="alert">
      <div className="flex-grow-1">{getErrorMessage(error)}</div>
      {onRetry && (
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={onRetry}>
          Повторить
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
