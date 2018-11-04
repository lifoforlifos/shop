<?php

namespace App\Http\Controllers;

use App\User;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Regester a user.
     *
     * @param  array  $request
     * @return \Illuminate\Contracts\Validation\Validator
     */

    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $data = request()->only('email', 'name', 'password');

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function profile()
    {
        $orders = Order::with('posts.images')
            ->where('user_id', auth('api')->user()->id)
            ->get();

        return response()->json([
            'orders' => $orders
        ]);
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * storing wishlist in database
     */

    public function wishlist($id)
    {
        $wishlist = Wishlist::where('post_id', $id)
            ->first();
        if (!empty($wishlist)) {
            return response()->json([
                'errors' => 'This item is already in your wishlist'
            ], 422);
        }
        $wishlist = new Wishlist();
        $wishlist->post_id = $id;
        $wishlist->user_id = auth('api')->user()->id;
        $wishlist->save();

        return response()->json([
            'saved' => true
        ], 200);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $this->guard()->user(),
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function guard()
    {
        return Auth::Guard('api');
    }
}
