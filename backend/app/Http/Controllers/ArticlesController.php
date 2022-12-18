<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class ArticlesController extends Controller
{
    public function createArticle(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->isAdmin) {
                $validate = Validator::make($request->all(), [
                    "title" => "required|string|max:30",
                    "content" => "required|string",
                ]);

                if ($validate->fails()) {
                    return response()->json([
                        "status" => "failed",
                        "message" => "Bad input",
                    ], 400);
                }
                $article = new Article();
                $article->title = $request->title;
                $article->content = $request->content;
                $article->category_id = $request->category_id;
                $article->created_by = Auth::id();
                $article->approved_by = Auth::id();

                if ($article->save()) {
                    return response()->json([
                        "status" => "success",
                        "message" => "Article Created Successfully",
                    ], 200);
                }

            }
            return response()->json([
                "status" => "failed",
                "message" => "You are not an admin",
            ], 409);

        }
        return response()->json([
            "status" => "failed",
            "message" => "You are not Logged in",
        ], 409);
    }
    public function updateArticle(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->isAdmin) {

                $article = Article::find($request->id);
                if ($request->title) {
                    $article->title = $request->title;
                }
                if ($request->content) {
                    $article->content = $request->content;
                }
                if ($request->category_id) {
                    $article->category_id = $request->category_id;
                }
                $article->approved_by = Auth::id();

                if ($article->save()) {
                    return response()->json([
                        "status" => "success",
                        "message" => "Article updated Successfully",
                    ], 200);
                }

            }
            return response()->json([
                "status" => "failed",
                "message" => "You are not an admin",
            ], 409);

        }
        return response()->json([
            "status" => "failed",
            "message" => "You are not Logged in",
        ], 409);
    }
    public function getArticles($id = null)
    {
        if (Auth::check()) {
                if ($id) {
                    $article = Article::find($id);
                    
                    if(!$article){
                        return response()->json([
                            "status" => "failed",
                            "message" => "Article not found",
                        ] , 404);

                    }
                    $articles = [];
                    $articles[] = $article;
                    $category_id = $article->category_id;
                    $category = Category::find($category_id);
                    if ($article) {
                        return response()->json([
                            "status" => "success",
                            "articles" => $articles,
                            "CategoryName" => $category->name
                        ]);
                    }
                } else {
                    $articles = Article::all();
                    return response()->json([
                        "status" => "success",
                        "articles" => $articles,
                    ]);
                }

            

        }
        return response()->json([
            "status" => "failed",
            "message" => "You are not Logged in",
        ], 409);
    }
}
