import AppLayout from '@/layouts/app-layout';
import { useCart } from '@/Contexts/CartContext';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner'; // Importação do toast

export default function Cart() {
    const { cart, removeFromCart, clearCart, totalPrice, totalItems } = useCart();

    const handleCheckout = () => {
        router.post('/checkout', {
            items: cart as any,
            total: totalPrice
        },
        {
            onSuccess: () => {
                clearCart();
                toast.success('Pedido realizado com sucesso! 🎉');
            },
            onError: () => {
                toast.error('Erro ao processar o pedido. Tente novamente.');
            }
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Carrinho', href: '/cart' }]}>
            <Head title="Meu Carrinho" />
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6">Seu Carrinho ({totalItems} itens)</h2>

                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center gap-4 bg-sidebar p-4 rounded-xl border border-sidebar-border">
                                    <img 
                                        src={item.image_path?.startsWith('http') ? item.image_path : `/storage/${item.image_path}`} 
                                        className="w-16 h-16 object-cover rounded" 
                                        alt={item.name}
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">R$ {item.price} x {item.quantity}</p>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            removeFromCart(item.id);
                                            toast.info('Item removido'); // Feedback opcional ao remover
                                        }} 
                                        className="text-red-500 text-sm hover:underline"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="bg-sidebar p-6 rounded-xl border border-sidebar-border h-fit">
                            <h3 className="text-lg font-bold mb-4">Resumo</h3>
                            <div className="flex justify-between mb-4">
                                <span>Total:</span>
                                <span className="text-xl font-bold text-green-600">R$ {totalPrice.toFixed(2)}</span>
                            </div>
                            <button 
                                onClick={handleCheckout} 
                                disabled={cart.length === 0} 
                                className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
                            >
                                Finalizar Pedido
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground mb-4">Seu carrinho está vazio.</p>
                        <Link href="/dashboard" className="text-primary underline">Voltar para o catálogo</Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}