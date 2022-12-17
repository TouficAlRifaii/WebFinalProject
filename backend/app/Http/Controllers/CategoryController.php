<?php

namespace App\Http\Controllers;

use App\Models\Category;
use DB;
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
                $validate = Validator::make($request->all(), [
                    'name' => 'required|string|max:30',
                ]);
                if ($validate->fails()) {
                    return response()->json([
                        "status" => "failed",
                        "message" => "Bad input",
                    ], 400);
                }
                $category = new Category;
                $category->name = $request->name;
                if ($category->save()) {
                    return response()->json([
                        "status" => "success",
                        "message" => "Category Created Successfully",
                    ]);
                }

            }
        }

    }
    public function updateCategory(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->isAdmin) {
                $validate = Validator::make($request->all(), [
                    'name' => 'required|string|max:30',
                ]);
                if ($validate->fails()) {
                    return response()->json([
                        "status" => "failed",
                        "message" => "Bad input",
                    ], 400);
                }
                $category = Category::find($request->id);
                $category->name = $request->name;
                if ($category->save()) {
                    return response()->json([
                        "status" => "success",
                        "message" => "Category Updated Successfully",
                    ], 200);
                }
            }
        }

    }
    public function deleteCategory(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->isAdmin) {

                DB::delete('delete from categories where id = ?', [$request->id]);

                return response()->json([
                    "status" => "success",
                    "message" => "Category Updated Successfully",
                ], 200);

            }
        }
    }
}
;
