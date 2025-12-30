import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Package, ShoppingCart, ShoppingBag, LayoutDashboard } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {

    const { auth } = usePage<SharedData>().props;


    const mainNavItems: NavItem[] = [
        {
            title: 'Início',
            href: '/productslist',
            icon: LayoutGrid,
        },
        {
            title: 'Carrinho',
            href: '/cart',
            icon: ShoppingCart,
        },
        {
            title: 'Meus Pedidos',
            href: '/orders',
            icon: ShoppingBag,
        },
        {
            title: 'Metricas',
            href: '/dashboard',
            icon: LayoutDashboard,
        }
    ];


    if (auth.user.role === 'sealler') {
        mainNavItems.splice(1, 0, {
            title: 'Meus Produtos',
            href: '/my-products',
            icon: Package,
        });
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={'/productslist'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>

                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}