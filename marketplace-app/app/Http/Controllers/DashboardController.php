<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $stats = [];

        if ($user->role === 'sealler') {
            $stats = [
                'role' => 'sealler',
                'total_sales' => OrderItem::whereHas('product', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                })->sum(DB::raw('price * quantity')),
                'total_products' => Product::where('user_id', $user->id)->count(),
                'active_orders' => OrderItem::whereHas('product', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                })->distinct('order_id')->count(),
            ];
        } else {
            $stats = [
                'role' => 'user',
                'my_orders_count' => Order::where('user_id', $user->id)->count(),
                'total_spent' => Order::where('user_id', $user->id)->sum('total_price'),
            ];
        }

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats
        ]);
    }
}
