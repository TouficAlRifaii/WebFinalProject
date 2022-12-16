<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class CategoryController extends Controller
{
    public function getCategories()
    {
        $categories = Category::all();
        return response()->json([
            "status" => "success",
            "categories" => $categories,

        ]);
    }
    public function createCategory(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->isAdmin) {
                $validate = Validator::make($request->all, [
                    "name" => 'required|string|20',
                ]);
                if ($validate->fails()) {
                    return response()->json([
                        "status" => "failed",
                        "message" => "Bad input",
                    ], 400);
                }
                $category = new Category;
                $category->name = $request->name;
                if($category->save()){
                    return response()->json([
                        "status"=> "success"
                    ]);
                }

            }
        }

    }
}
