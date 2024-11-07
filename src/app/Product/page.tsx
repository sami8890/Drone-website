import Image from "next/image";

const products = [
    {
        id: 1,
        name: "DroneX Pro",
        description: "A high-performance drone with advanced features.",
        price: "$499",
        imageUrl: "/drone.png", // Placeholder image path
    },
    {
        id: 2,
        name: "SkyWalker 2",
        description: "Lightweight and powerful drone for aerial photography.",
        price: "$699",
        imageUrl: "/video-drone.png", // Placeholder image path
    },
    {
        id: 3,
        name: "AeroCam Mini",
        description: "Compact drone perfect for beginners and hobbyists.",
        price: "$299",
        imageUrl: "/drone3.jpg", // Placeholder image path
    },

    // Add more products as needed
];

const Product = () => {
    return (

        <main className="bg-[#0F172A]">
            <section
                id="products"
                className="bg-gray-900 text-white py-12 px-6 md:py-24 md:px-16"
            >
                <div className="max-w-6xl mx-auto text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-green-400">
                        Our Products
                    </h2>
                    <p className="text-lg text-gray-400 mt-4">
                        Discover our range of drones designed for both professionals and
                        enthusiasts.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="relative group bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                        >
                            {/* Product Image */}
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={500}
                                height={500}
                                className="object-center w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                            />
                            {/* Overlay for Product Info */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                                <p className="text-sm text-gray-300 mt-2">
                                    {product.description}
                                </p>
                                <span className="text-lg font-semibold text-green-400 mt-4">
                                    {product.price}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>





















    );
};

export default Product;


