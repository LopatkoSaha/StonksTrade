import "./pages.css";

interface ErrorPageProps {
  className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className="errorPage">
      <p>Произошла непредвиденная ошибка</p>
    </div>
  );
};
