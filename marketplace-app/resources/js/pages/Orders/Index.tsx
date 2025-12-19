import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Index({ orders }: { orders: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Meus Pedidos', href: '/orders' }]}>
            <Head title="Meus Pedidos" />
            
            <div className="max-w-5xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6">Histórico de Compras</h2>

                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-sidebar border border-sidebar-border rounded-xl overflow-hidden">

                                <div className="bg-muted/50 p-4 border-b border-sidebar-border flex justify-between items-center flex-wrap gap-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-semibold">Pedido realizado em</p>
                                        <p className="text-sm">{new Date(order.created_at).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-semibold">Total</p>
                                        <p className="text-sm font-bold text-green-600">R$ {order.total_price}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-semibold">Status</p>
                                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded-full uppercase font-bold">
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground">ID DO PEDIDO</p>
                                        <p className="text-sm font-mono">#{order.id}</p>
                                    </div>
                                </div>


                                <div className="p-4 space-y-4">
                                    {order.items.map((item: any) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <img 
                                                src={item.product?.image_path?.startsWith('http') ? item.product.image_path : `/storage/${item.product?.image_path}`} 
                                                className="w-12 h-12 object-cover rounded-md border border-sidebar-border"
                                            />
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">{item.product?.name || 'Produto Removido'}</h4>
                                                <p className="text-xs text-muted-foreground">Quantidade: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold">R$ {item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-sidebar border border-dashed border-sidebar-border rounded-xl p-12 text-center">
                        <p className="text-muted-foreground">Você ainda não realizou nenhuma compra.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}