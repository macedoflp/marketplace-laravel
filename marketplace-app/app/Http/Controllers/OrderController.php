<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $cartItems = $request->items;

        if (empty($cartItems)) {
            return back()->with('error', 'O seu carrinho está vazio.');
        }

        try {
            DB::transaction(function () use ($cartItems) {
                $total = 0;


                foreach ($cartItems as $item) {
                    $total += $item['price'] * $item['quantity'];
                }


                $order = auth()->user()->orders()->create([
                    'total_price' => $total,
                    'status' => 'completed',
                ]);


                foreach ($cartItems as $item) {
                    $product = Product::findOrFail($item['id']);


                    if ($product->stock < $item['quantity']) {
     
                        throw new \Exception("Estoque insuficiente para o produto: {$product->name}");
                    }

                    $product->decrement('stock', $item['quantity']);


                    $order->items()->create([
                        'product_id' => $item['id'],
                        'quantity' => $item['quantity'],
                        'price' => $item['price'],
                    ]);
                }
            });

            return redirect()->route('dashboard')->with('success', 'Pedido realizado com sucesso!');

        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function index()
    {

        $orders = auth()->user()->orders()->with('items.product')->latest()->get();
        return inertia('Orders/Index', ['orders' => $orders]);
    }
}