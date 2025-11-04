interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  title = '오류가 발생했습니다',
  message,
  onRetry
}: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 my-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <i className="ri-error-warning-line text-2xl text-red-600"></i>
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-red-900 mb-1">{title}</h3>
          <p className="text-red-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
            >
              <i className="ri-refresh-line"></i>
              다시 시도
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
