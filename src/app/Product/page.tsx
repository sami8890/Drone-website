import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

// Sample product data
const products = [
    {
        name: "Drone A",
        img: "https://via.placeholder.com/150",
        price: "$499",
    },
    {
        name: "Drone B",
        img: "https://via.placeholder.com/150",
        price: "$599",
    },
    {
        name: "Drone C",
        img: "https://via.placeholder.com/150",
        price: "$699",
    },
    {
        name: "Drone D",
        img: "https://via.placeholder.com/150",
        price: "$799",
    },
];

const ProductCard = ({ img, name, price }: { img: string; name: string; price: string; }) => {
    return (
        <figure
            className={cn(
                "relative h-80 w-56 cursor-pointer overflow-hidden rounded-xl border p-4 transition-all duration-300 ease-in-out transform hover:scale-105", // Increased height and width
                "border-gray-300 bg-gray-800 hover:bg-gray-700",
                "dark:border-gray-50/[.1] dark:bg-gray-900 dark:hover:bg-gray-800"
            )}
        >
            <img className="object-cover h-64 w-full rounded-lg" src={img} alt={name} /> {/* Increased height */}
            <figcaption className="mt-2 text-sm font-semibold text-white">{name}</figcaption>
            <p className="text-xs font-medium text-gray-300">{price}</p>
        </figure>
    );
};

export function Products() {
    return (
        <div className="relative flex h-[600px] w-full flex-row items-center justify-center overflow-hidden rounded-lg border bg-from-slate-900 md:shadow-xl dark:bg-gray-900"> {/* Increased height */}
            <Marquee pauseOnHover className="[--duration:20s]" direction="right">
                {products.map((product) => (
                    <ProductCard key={product.name} {...product} />
                ))}
            </Marquee>
            <div className=" absolute inset-x-0 top-0 bg-gradient-to-b from-slate-900 to-transparent dark:from-gray-900"></div>
            <div className=" absolute inset-x-0 bottom-0  bg-gradient-to-t from-slate-900 to-transparent dark:from-gray-900"></div>
        </div>
    );
}

export default Products;
