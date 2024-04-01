import "./index.scss";

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return <div className="page">{children}</div>;
};

export default Page;
