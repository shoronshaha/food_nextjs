// app/[id]/page.tsx
import CategoryProductsPage from './_components/CategoryProductsPage';
import { getProductsServer } from '@/lib/api/serverApi';
import { Product } from '@/types/product';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const category = decodeURIComponent(id);
    console.log('Category ID:', category);
    let initialProducts: Product[] = [];
    let error: string | undefined;
    console.log('Initial Products:', initialProducts);
    try {
        // Fetch products server-side with category filter
        initialProducts = await getProductsServer({
            page: 1,
            limit: 200,
            category, // Pass category for filtering
        });

    } catch (err) {
        console.error('Error fetching products:', err);
        error = 'Failed to load products';
    }
    return <CategoryProductsPage initialProducts={initialProducts} category={category} error={error} />;
}