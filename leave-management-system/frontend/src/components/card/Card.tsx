import { Card } from "flowbite-react";

interface CardItemProps {
  heading: string ;
  leave:  string |number | undefined;
}

const CardItem: React.FC<CardItemProps> = ({ heading, leave }) => {
  return (
    <Card className=" max-w-full my-5 w-[100%] sm:w-[50%] md:w-[300px]">
      <h2 className="text-black text-xl font-bold text-center">{heading}</h2>
      <p className="text-black text-l font-bold text-center">{leave}</p>
    </Card>
  );
};
export default CardItem;
