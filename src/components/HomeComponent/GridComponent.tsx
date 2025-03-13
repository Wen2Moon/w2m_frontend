import TokenCardComponent, { TokenCardProps } from "./TokenCardComponent";

interface GridComponentProps {
  tokens: TokenCardProps[];
}

const GridComponent: React.FC<GridComponentProps> = ({ tokens }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2 md:my-4 p-4 md:p-6 px-4 md:px-8 bg-blacklight">
      {tokens.map((token, index) => (
        <TokenCardComponent key={index} {...token} />
      ))}
    </div>
  );
};

export default GridComponent;
