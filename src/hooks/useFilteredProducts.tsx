import { useEffect, useState } from 'react';

const useFilteredProducts = (products: any[], searchQuery: string, sortOrder: string | null) => {
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
        const filterProducts = () => {
            let filtered = [...products]; 

            if (searchQuery) {
                const lowercasedQuery = searchQuery.toLowerCase();
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(lowercasedQuery)
                );
            }

            if (sortOrder) {
                filtered = filtered.sort((a, b) => {
                    const priceA = parseFloat(a.price) || 0;
                    const priceB = parseFloat(b.price) || 0;

                    if (sortOrder === 'asc') {
                        return priceA - priceB;
                    } else if (sortOrder === 'desc') {
                        return priceB - priceA;
                    }
                    return 0;
                });
            }

            setFilteredProducts(filtered);
        };

        filterProducts();
    }, [searchQuery, products, sortOrder]);

    return filteredProducts;
};

export default useFilteredProducts;
