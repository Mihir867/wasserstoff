import { cn } from "../utils/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  image,
  onMouseEnter,
  onMouseLeave,
}: {
  className?: string;
  image?: string | React.ReactNode
  onMouseEnter?: () => void; 
  onMouseLeave?: () => void;  
  
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl border group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:border-white/[0.2] bg-white justify-between flex flex-col space-y-4",
        className
      )}
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave} 
    >
      {typeof image === 'string' ? (
        <img
          src={image}
          alt="Gallery Item"
          className={`w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-125 hover:scale-110 `}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
          }}
        />
      ) : (
        image // If image is a React node, render it directly
      )}
    </div>
  );
};
