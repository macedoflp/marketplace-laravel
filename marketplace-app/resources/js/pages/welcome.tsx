import { login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ShoppingBasket } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Bem-vindo ao Marketplace">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">

                <header className="w-full max-w-4xl mb-12 lg:mb-20">
                    <nav className="flex items-center justify-between py-6">
                        <div className="flex items-center gap-2">
                           <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary">
                                <ShoppingBasket className="size-5 text-black" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Marketplace</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={'/productslist'}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm font-medium hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b] transition-colors"
                                >
                                    Ir para o Início
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-sm font-medium hover:text-primary transition-colors"
                                    >
                                        Entrar
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-block rounded-sm bg-[#1b1b18] px-5 py-1.5 text-sm font-medium text-white hover:bg-[#333] dark:bg-[#EDEDEC] dark:text-[#0a0a0a] dark:hover:bg-[#ccc] transition-colors"
                                        >
                                            Começar a Vender
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>


                <main className="flex flex-col items-center text-center max-w-3xl">
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                        O lugar certo para seus <span className="text-primary">negócios.</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed">
                        Uma plataforma completa para você cadastrar seus produtos, gerenciar estoque e realizar vendas com segurança e facilidade.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <Link
                            href={'/productslist'}
                            className="rounded-md bg-primary px-8 py-3 text-lg font-bold text-black shadow-lg hover:opacity-90 transition-all"
                        >
                            Explorar Produtos
                        </Link>
                        <Link
                            href={register()}
                            className="rounded-md border border-input bg-background px-8 py-3 text-lg font-bold hover:bg-muted transition-all"
                        >
                            Criar minha Loja
                        </Link>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-sidebar-border pt-16">
                        <div className="flex flex-col items-center p-4">
                            <div className="mb-4 text-primary">📦</div>
                            <h3 className="font-bold mb-2">Gestão de Produtos</h3>
                            <p className="text-sm text-muted-foreground">Cadastre fotos, preços e categorias em segundos.</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <div className="mb-4 text-primary">🛒</div>
                            <h3 className="font-bold mb-2">Carrinho Inteligente</h3>
                            <p className="text-sm text-muted-foreground">Experiência de compra fluida e rápida para seus clientes.</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <div className="mb-4 text-primary">📊</div>
                            <h3 className="font-bold mb-2">Painel de Vendas</h3>
                            <p className="text-sm text-muted-foreground">Acompanhe seu histórico de pedidos e lucros.</p>
                        </div>
                    </div>
                </main>

                <footer className="mt-auto py-10 text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Marketplace Project. Desenvolvido com Laravel + React.
                </footer>
            </div>
        </>
    );
}