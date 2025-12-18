import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';


export default function Create({ categories }: { categories: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        image_path: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
 
        post('/products'); 
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Novo Produto', href: '/products/create' }]}>
            <Head title="Cadastrar Produto" />
            <div className="max-w-2xl mx-auto p-6 bg-sidebar rounded-xl border border-sidebar-border mt-6">
                <h2 className="text-xl font-bold mb-6">Cadastrar Novo Produto</h2>
                
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nome do Produto</label>
                        <input 
                            type="text" 
                            className="w-full rounded-md border-input bg-background p-2"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />

                        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Preço (R$)</label>
                            <input 
                                type="number" 
                                step="0.01"
                                className="w-full rounded-md border-input bg-background p-2"
                                value={data.price}
                                onChange={e => setData('price', e.target.value)}
                            />
                            {errors.price && <span className="text-red-500 text-xs">{errors.price}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Estoque Inicial</label>
                            <input 
                                type="number" 
                                className="w-full rounded-md border-input bg-background p-2"
                                value={data.stock}
                                onChange={e => setData('stock', e.target.value)}
                            />
                            {errors.stock && <span className="text-red-500 text-xs">{errors.stock}</span>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Imagem do Produto</label>
                        <input 
                            type="file" 
                            className="w-full rounded-md border-input bg-background p-2"
                            onChange={e => setData('image_path', e.target.files![0])}
                        />
                        {errors.image_path && <span className="text-red-500 text-xs">{errors.image_path}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Categoria</label>
                        <select 
                            className="w-full rounded-md border-input bg-background p-2"
                            value={data.category_id}
                            onChange={e => setData('category_id', e.target.value)}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <span className="text-red-500 text-xs">{errors.category_id}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Descrição</label>
                        <textarea 
                            className="w-full rounded-md border-input bg-background p-2 h-32"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                        {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-primary text-primary-foreground py-2 rounded-md font-bold hover:bg-primary/90 disabled:opacity-50"
                    >
                        {processing ? 'Salvando...' : 'Publicar Produto'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}