import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';


interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'sealler';
}

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string | number;
    category: Category;
    image_path: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Início',
        href: dashboard().url,
    },
];
interface DashboardProps {
    auth: {
        user: User;
    };
    products: Product[];
    filters: { search?: string }; 
}

export default function Dashboard({ auth, products, filters }: DashboardProps) {
    const [search, setSearch] = useState(filters?.search ?? '');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                '/dashboard',
                { search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Catálogo de Produtos" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Catálogo de Produtos</h2>
                    {auth.user.role === 'sealler' && (
                        <Link
                            href="/products/create"
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            Cadastrar Novo Produto
                        </Link>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <div className='max-w-md'>
                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            className="w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div 
                                key={product.id} 
                                className="relative flex flex-col overflow-hidden rounded-lg border border-sidebar-border bg-sidebar shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="aspect-video w-full bg-muted flex items-center justify-center overflow-hidden">
                                    {product.image_path ? (
                                        <img 
                                            // Lógica para diferenciar imagem do storage vs imagem externa (seeder)
                                            src={product.image_path.startsWith('http') 
                                                ? product.image_path 
                                                : `/storage/${product.image_path}`
                                            } 
                                            className="h-full w-full object-cover"
                                            alt={product.name}
                                        />
                                    ) : (
                                        <span className="text-muted-foreground text-xs text-center p-2">Sem imagem</span>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col p-4">
                                    <div className="mb-2">
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                            {product.category?.name || 'Geral'}
                                        </span>
                                    </div>
                                    
                                    <h3 className="font-semibold text-foreground line-clamp-1">
                                        {product.name}
                                    </h3>
                                    
                                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2 flex-1">
                                        {product.description}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-lg font-bold text-foreground">
                                            R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                        <Link 
                                            href={`/products/${product.id}`}
                                            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                        >
                                            Ver Detalhes
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center">
                            <p className="text-muted-foreground">Nenhum produto encontrado.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}