import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

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
    category_id: number;
    image_path: string | null;
}

interface EditProps {
    categories: Category[];
    product: Product;
}

export default function Edit({ categories, product }: EditProps) {

    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        image_path: null as File | null,
        _method: 'PUT',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/products/${product.id}/update`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Meus Produtos', href: '/my-products' }, { title: 'Editar', href: '#' }]}>
            <Head title={`Editar - ${product.name}`} />
            
            <div className="max-w-2xl mx-auto p-6 bg-sidebar rounded-xl border border-sidebar-border mt-6">
                <h2 className="text-xl font-bold mb-6">Editar Produto</h2>
                
                <form onSubmit={submit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">Nome do Produto</label>
                        <input 
                            type="text" 
                            className="w-full rounded-md border-input bg-background p-2 focus:ring-2 focus:ring-primary outline-none"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium mb-1">Preço (R$)</label>
                            <input 
                                type="number" 
                                step="0.01"
                                className="w-full rounded-md border-input bg-background p-2 focus:ring-2 focus:ring-primary outline-none"
                                value={data.price}
                                onChange={e => setData('price', e.target.value)}
                            />
                            {errors.price && <span className="text-red-500 text-xs">{errors.price}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Estoque</label>
                            <input 
                                type="number" 
                                className="w-full rounded-md border-input bg-background p-2 focus:ring-2 focus:ring-primary outline-none"
                                value={data.stock}
                                onChange={e => setData('stock', parseInt(e.target.value) || 0)}
                            />
                            {errors.stock && <span className="text-red-500 text-xs">{errors.stock}</span>}
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1">Categoria</label>
                        <select 
                            className="w-full rounded-md border-input bg-background p-2 focus:ring-2 focus:ring-primary outline-none"
                            value={data.category_id}
                            onChange={e => setData('category_id', parseInt(e.target.value))}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <span className="text-red-500 text-xs">{errors.category_id}</span>}
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1">Nova Imagem (opcional)</label>
                        

                        {product.image_path && (
                            <div className="mb-3">
                                <p className="text-[10px] uppercase text-muted-foreground mb-1">Imagem Atual:</p>
                                <img 
                                    src={product.image_path.startsWith('http') ? product.image_path : `/storage/${product.image_path}`} 
                                    alt="Preview" 
                                    className="w-24 h-24 object-cover rounded-lg border border-sidebar-border"
                                />
                            </div>
                        )}

                        <input 
                            type="file" 
                            accept="image/*"
                            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            onChange={e => setData('image_path', e.target.files ? e.target.files[0] : null)}
                        />
                        {errors.image_path && <span className="text-red-500 text-xs">{errors.image_path}</span>}
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1">Descrição</label>
                        <textarea 
                            className="w-full rounded-md border-input bg-background p-2 h-32 focus:ring-2 focus:ring-primary outline-none"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                        {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="flex-1 bg-primary text-primary-foreground py-2 rounded-md font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors"
                        >
                            {processing ? 'Atualizando...' : 'Salvar Alterações'}
                        </button>
                        
                        <button 
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-6 py-2 rounded-md border border-sidebar-border hover:bg-muted transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}