<?php

namespace App\Http\Controllers;

use App\Models\Approve;
use App\Models\History;
use App\Models\Rewards;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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
        ])->get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function getReward(Request $request)
    {
        $address = $request->address;
        $chainId = $request->chainId;
        $data = Rewards::where([
            ['address', $address],
            ['chain_id', $chainId]
        ])->get();
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

        return response()->json([
            'message' => 'Exchange successful',
            'exchange_amount' => round($user->exchange_amount, 5),
            'usdc' => round($user->usdc, 5),
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
        $user->save();

        Approve::create([
            'address' => $address,
            'chain_id' => $chainId,
            'allowance' => $allowance
        ]);

        return response()->json([
            'message' => 'Withdraw successful',
            'usdc_balance' => round($user->usdc, 5),
            'withdraw_amount' => round($amount, 5),
            'user' => $user
        ]);
    }
}
