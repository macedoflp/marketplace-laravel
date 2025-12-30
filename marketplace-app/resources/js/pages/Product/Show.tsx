import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react'; // Importamos useForm e usePage
import { useCart } from '@/Contexts/CartContext';
import { useState } from 'react';
import { Star } from 'lucide-react'; // Para as estrelas

interface Category {
    id: number;
    name: string;
}

// Interface para as Avaliações
interface Review {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    user: {
        name: string;
    };
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: string | number;
    stock: number;
    category: Category;
    image_path: string | null;
    reviews?: Review[]; // Adicionado
    reviews_avg_rating?: number; // Adicionado
}

interface ShowProps {
    product: Product;
}

export default function Show({ product }: ShowProps) {
    const { auth } = usePage().props as any;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Início', href: '/productslist' },
        { title: product.name, href: `/products/${product.id}` },
    ];

    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const [disabled, setDisabled] = useState(false);

    // Formuário de Avaliação
    const { data, setData, post, processing, reset, errors } = useForm({
        product_id: product.id,
        rating: 5,
        comment: '',
    });

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

    const submitReview = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reviews', {
            onSuccess: () => reset('comment', 'rating'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${product.name} - Marketplace`} />

            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                {/* PARTE SUPERIOR: PRODUTO */}
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center border border-sidebar-border overflow-hidden">
                        <img
                            src={product.image_path?.startsWith('http') ? product.image_path : `/storage/${product.image_path}`}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-blue-600">{product.category.name}</span>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">{product.name}</h1>
                            
                            {/* Média de Estrelas */}
                            <div className="mt-2 flex items-center gap-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill={i < Math.round(product.reviews_avg_rating || 0) ? "currentColor" : "none"} />
                                    ))}
                                    <span className="">{Math.round(product.reviews_avg_rating || 0)} estrelas</span>
                                </div>
                                <span className="text-sm text-muted-foreground">({product.reviews?.length || 0} avaliações)</span>
                            </div>
                        </div>

                        <div className="mt-3">
                            <p className="text-3xl tracking-tight text-foreground font-bold">
                                R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </div>

                        <div className="mt-6">
                            <div className="space-y-6 text-base text-muted-foreground">{product.description}</div>
                        </div>

                        <div className="mt-6 flex items-center">
                            <div className={`h-3 w-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                            <p className="ml-2 text-sm text-muted-foreground">
                                {product.stock > 0 ? `${product.stock} unidades em estoque` : 'Produto esgotado'}
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={disabled || product.stock === 0}
                                className={`flex flex-1 items-center justify-center rounded-md px-8 py-3 text-base font-medium transition-colors
                                    ${disabled || product.stock === 0 ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                            >
                                {product.stock === 0 ? 'Esgotado' : added ? 'Adicionado!' : 'Adicionar ao Carrinho'}
                            </button>
                        </div>
                    </div>
                </div>


                <div className="mt-16 border-t border-sidebar-border pt-10">
                    <h2 className="text-2xl font-bold mb-8">Avaliações de Clientes</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        <div className="space-y-8">
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((review) => (
                                    <div key={review.id} className="border-b border-sidebar-border pb-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                                                ))}
                                            </div>
                                            <span className="font-bold text-sm">{review.user.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                                • {new Date(review.created_at).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-sm">{review.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground italic">Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
                            )}
                        </div>

                        {/* Formulário para Nova Avaliação */}
                        <div className="bg-sidebar p-6 rounded-xl border border-sidebar-border h-fit">
                            <h3 className="text-lg font-semibold mb-4">Deixe sua opinião</h3>
                            <form onSubmit={submitReview} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sua Nota</label>
                                    <select 
                                        value={data.rating}
                                        onChange={e => setData('rating', parseInt(e.target.value))}
                                        className="w-full rounded-md border-input bg-background px-3 py-2"
                                    >
                                        <option value="5">5 - Excelente</option>
                                        <option value="4">4 - Muito Bom</option>
                                        <option value="3">3 - Bom</option>
                                        <option value="2">2 - Regular</option>
                                        <option value="1">1 - Ruim</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Comentário</label>
                                    <textarea 
                                        rows={4}
                                        value={data.comment}
                                        onChange={e => setData('comment', e.target.value)}
                                        className="w-full rounded-md border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                                        placeholder="O que você achou deste produto?"
                                    />
                                    {errors.comment && <span className="text-red-500 text-xs">{errors.comment}</span>}
                                </div>
                                <button 
                                    disabled={processing}
                                    className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {processing ? 'Enviando...' : 'Enviar Avaliação'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}