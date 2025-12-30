import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Package, DollarSign, ShoppingBag, CreditCard } from 'lucide-react';

interface DashboardProps {
    auth: { user: any };
    stats: any;
}

export default function Dashboard({ auth, stats }: DashboardProps) {
    const breadcrumbs = [{ title: 'Dashboard', href: '/dashboard' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Meu Painel" />

            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Olá, {auth.user.name}</h1>
                    <p className="text-muted-foreground">
                        {stats.role === 'sealler' 
                            ? 'Acompanhe o desempenho das suas vendas hoje.' 
                            : 'Gerencie suas compras e pedidos realizados.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.role === 'sealler' ? (
                        <>
                            <div className="bg-sidebar border border-sidebar-border rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-green-500/10 rounded-lg text-green-600">
                                        <DollarSign size={24} />
                                    </div>
                                    <span className="font-semibold text-muted-foreground">Vendas Totais</span>
                                </div>
                                <p className="text-3xl font-bold text-green-600">
                                    R$ {Number(stats.total_sales).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>

                            <div className="bg-sidebar border border-sidebar-border rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-600">
                                        <Package size={24} />
                                    </div>
                                    <span className="font-semibold text-muted-foreground">Produtos Ativos</span>
                                </div>
                                <p className="text-3xl font-bold">{stats.total_products}</p>
                            </div>

                            <div className="bg-sidebar border border-sidebar-border rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-600">
                                        <ShoppingBag size={24} />
                                    </div>
                                    <span className="font-semibold text-muted-foreground">Pedidos Recebidos</span>
                                </div>
                                <p className="text-3xl font-bold">{stats.active_orders}</p>
                            </div>
                        </>
                    ) : (
                        <>

                            <div className="bg-sidebar border border-sidebar-border rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-orange-500/10 rounded-lg text-orange-600">
                                        <ShoppingBag size={24} />
                                    </div>
                                    <span className="font-semibold text-muted-foreground">Meus Pedidos</span>
                                </div>
                                <p className="text-3xl font-bold">{stats.my_orders_count}</p>
                            </div>

                            <div className="bg-sidebar border border-sidebar-border rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-600">
                                        <CreditCard size={24} />
                                    </div>
                                    <span className="font-semibold text-muted-foreground">Total Gasto</span>
                                </div>
                                <p className="text-3xl font-bold text-blue-600">
                                    R$ {Number(stats.total_spent).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}