import { LoaderLayout } from "../loader";

const LoadingPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <LoaderLayout></LoaderLayout>
    </div>
  );
};

export default LoadingPage;
