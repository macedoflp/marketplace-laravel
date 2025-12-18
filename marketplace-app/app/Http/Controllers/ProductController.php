<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Str;

class ProductController extends Controller
{

    public function create()
    {
        return Inertia::render('Product/Create', [
            'categories' => Category::all()
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'stock' => 'required|integer|min:0',
            'image_path' => 'nullable|image|max:2048,png,jpg,jpeg',
        ]);

        if ($request->hasFile('image_path')) {
            $imagePath = $request->file('image_path')->store('products', 'public');
            $validated['image_path'] = $imagePath;
        }

        $validated['user_id'] = $request->user()->id;
        $validated['slug'] = Str::slug($validated['name']);

        Product::create($validated);

        return redirect()->route('dashboard')->with('success', 'Produto criado com sucesso!');
    }
    public function index()
    {
        $products = Product::with('category')
        ->when(request()->input('search'), function ($query, $search) {
            $query->where('name', 'like', "%{$search}%");
        })
        ->latest()->get();
        return Inertia::render('dashboard', [
            'products' => $products,
        ]);
    }

    public function show(\App\Models\Product $product)
    {
        $product->load('category');
        return Inertia::render('Product/Show', [
            'product' => $product,
            'filters' => request()->only(['search'])
        ]);
    }
    public function myProducts(Request $request)
    {
        $products = Product::where('user_id', $request->user()->id)->with('category')->latest()->get();

        return Inertia::render('Product/MyProducts', [
            'products' => $products,
        ]);
    }

    public function destroy(Product $product)
    {
        if ($product->user_id !== auth()->id()) {
            return redirect()->route('products.mine')->with('error', 'Você não tem permissão para excluir este produto.');
        }
        if ($product->image_path && !str_starts_with($product->image_path, 'http')) {
            \Storage::disk('public')->delete($product->image_path);
        }
        $product->delete();
        return redirect()->route('products.mine')->with('success', 'Produto excluido com sucesso!');
    }

    public function edit(Product $product)
    {
        if ($product->user_id !== auth()->id()) {
            return redirect()->route('products.mine')->with('error', 'Você não tem permissão para editar este produto.');
        }

        return Inertia::render('Product/Edit', [
            'product' => $product,
            'categories' => Category::all()
        ]);
    }

    public function update(Request $request, Product $product)
    {
        if ($product->user_id !== auth()->id()) {
            return redirect()->route('products.mine')->with('error', 'Você não tem permissão para atualizar este produto.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'stock' => 'required|integer|min:0',
            'image_path' => 'nullable|image|max:2048,png,jpg,jpeg',
        ]);

        $dataToUpdate = collect($validated)->except('image_path')->toArray();

        if ($request->hasFile('image_path')) {
            if ($product->image_path && !str_starts_with($product->image_path, 'http')) {
                \Storage::disk('public')->delete($product->image_path);
            }
            $imagePath = $request->file('image_path')->store('products', 'public');
            $dataToUpdate['image_path'] = $imagePath;
        }

        $product->update($dataToUpdate);
        return redirect()->route('products.mine')->with('success', 'Produto atualizado com sucesso!');
    }
}
