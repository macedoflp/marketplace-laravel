import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: string | number;
    stock: number;
    category: Category;
    image_path: string | null;
}

interface ShowProps {
    product: Product;
}

export default function Show({ product }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: product.name, href: `/products/${product.id}` },
    ];

    const { addToCart } = useCart();

    const [added, setAdded] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleAddToCart = () => {
        if (disabled) return;

        addToCart(product);
        setAdded(true);
        setDisabled(true);

        setTimeout(() => {
            setAdded(false);
            setDisabled(false);
        }, 5000);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${product.name} - Marketplace`} />

            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">

                    <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center border border-sidebar-border">
                        <img
                            src={
                                product.image_path?.startsWith('http')
                                    ? product.image_path
                                    : `/storage/${product.image_path}`
                            }
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>

                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-blue-600">
                                {product.category.name}
                            </span>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                {product.name}
                            </h1>
                        </div>

                        <div className="mt-3">
                            <p className="text-3xl tracking-tight text-foreground font-bold">
                                R$ {Number(product.price).toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                })}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Descrição</h3>
                            <div className="space-y-6 text-base text-muted-foreground">
                                {product.description}
                            </div>
                        </div>

                        <div className="mt-6 flex items-center">
                            <div
                                className={`h-3 w-3 rounded-full ${
                                    product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                                }`}
                            />
                            <p className="ml-2 text-sm text-muted-foreground">
                                {product.stock > 0
                                    ? `${product.stock} unidades em estoque`
                                    : 'Produto esgotado'}
                            </p>
                        </div>

                        {added && (
                            <div className="mt-4 rounded-md bg-green-100 px-4 py-2 text-sm text-green-700">
                                ✔ Produto adicionado ao carrinho
                            </div>
                        )}

                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={disabled || product.stock === 0}
                                className={`flex flex-1 items-center justify-center rounded-md px-8 py-3 text-base font-medium
                                    ${
                                        disabled || product.stock === 0
                                            ? 'cursor-not-allowed bg-muted text-muted-foreground'
                                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                                    }`}
                            >
                                {product.stock === 0
                                    ? 'Produto esgotado'
                                    : disabled
                                    ? 'Adicionado!'
                                    : 'Adicionar ao Carrinho'}
                            </button>

                            <Link
                                href="/dashboard"
                                className="flex items-center justify-center rounded-md border border-input bg-background px-4 py-3 text-sm font-medium hover:bg-accent"
                            >
                                Voltar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
