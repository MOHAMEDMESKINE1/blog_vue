<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if($request->filled('search')){

            $categories = Category::search(trim($request->search))->paginate(3);

        }else{
            $categories = Category::paginate(3);
        }

         return Inertia::render('Categories/Index',compact("categories"));
    }
    public function store(CategoryRequest $request)
    {
        Category::create($request->all());

        return to_route('categories.index');
    }


    public function update(CategoryRequest $request, Category $category)
    {
       

        $category->update($request->all());

        return to_route('categories.index');
        
      
    }

    public function destroy(Category $category)
    {
       $category->delete();

       return to_route('categories.index')->with('category deleted successfully !');
    }
}
