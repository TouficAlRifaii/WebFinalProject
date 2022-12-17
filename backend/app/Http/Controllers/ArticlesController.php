<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Article;
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
                
                if($article->save()){
                    return response()->json([
                        "status" => "success",
                        "message" => "Article Created Successfully",
                    ], 200);
                }

            }
            return response()->json([
                "status" => "failed",
                "message" => "You are not an admin"
            ], 409);

        }
        return response()->json([
            "status" => "failed",
            "message" => "You are not Logged in"
        ] , 409);
    }
}
