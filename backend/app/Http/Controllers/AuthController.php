<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ],
        ]);

    }

    public function register(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);
        if ($validate->fails()) {
            return response()->json([
                "status" => "failed",
                "results" => [],
            ], 400);
        }
        $checkIfexist = User::where("email", $request->email)->get();
        if (isset($checkIfexist[0]['email'])) {
            return response()->json([
                "status" => "failed",
                "message" => "User Already Exist",
            ], 409);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ],
        ]);
    }
    public function editProfile(Request $request)
    {
        if(Auth::check()){
            $validate = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
            ]);
            if ($validate->fails()) {
                return response()->json([
                    status => "failed",
                    message => "Bad input",
                ], 400);
            }
            $user = Auth::user();
            $user->name = $request->name;
            if($user->save()){
                return response()->json([
                    "status" => "success"
                ]);
            }
        }
        
    }
    public function me()
    {

        return response()->json(Auth::user());

    }

}
