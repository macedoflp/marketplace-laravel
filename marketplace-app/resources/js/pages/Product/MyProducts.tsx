import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function MyProducts({ products }: { products: any[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Tem a certeza que deseja eliminar este produto?')) {
            destroy(route('products.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Meus Produtos', href: '/my-products' }]}>
            <Head title="Meus Produtos" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Gerir Meus Produtos</h2>
                    <Link href="/products/create" className="bg-primary text-black px-4 py-2 rounded-md text-sm">
                        Novo Produto
                    </Link>
                </div>

                <div className="bg-sidebar border border-sidebar-border rounded-xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-muted">
                            <tr>
                                <th className="p-4 border-b border-sidebar-border text-sm font-semibold">Produto</th>
                                <th className="p-4 border-b border-sidebar-border text-sm font-semibold">Preço</th>
                                <th className="p-4 border-b border-sidebar-border text-sm font-semibold">Estoque</th>
                                <th className="p-4 border-b border-sidebar-border text-sm font-semibold text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-muted/50">
                                    <td className="p-4 border-b border-sidebar-border">
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={product.image_path?.startsWith('http') ? product.image_path : `/storage/${product.image_path}`} 
                                                className="w-10 h-10 rounded object-cover" 
                                            />
                                            <span className="font-medium">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-sidebar-border">R$ {product.price}</td>
                                    <td className="p-4 border-b border-sidebar-border">{product.stock}</td>
                                    <td className="p-4 border-b border-sidebar-border text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/products/${product.id}/edit`} className="text-blue-500 hover:underline text-sm">
                                                Editar
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-500 hover:underline text-sm"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && (
                        <div className="p-10 text-center text-muted-foreground">
                            Ainda não publicou nenhum produto.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}