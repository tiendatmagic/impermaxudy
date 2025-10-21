<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\Rewards;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;

class GeneralController extends Controller
{
    public function autoSave(Request $request)
    {
        return $this->getProfit($request);
    }

    public function getProfit(Request $request)
    {
        $address = $request->address;
        $chainId = $request->chainId;

        if (!$address || !$chainId) {
            return response()->json(['error' => 'Missing address'], 400);
        }

        $user = User::firstOrCreate(
            [
                'address' => $address,
                'chain_id' => $chainId,
            ],
            [
                'amount' => 0,
                'exchange_amount' => 0,
                'profit' => 0,
                'claim_at' => now(),
                'remain_at' => now(),
            ]
        );

        $now = Carbon::now();
        $remainAt = Carbon::parse($user->remain_at);

        $seconds = $now->diffInSeconds($remainAt);
        $profit = $seconds * 0.00001;

        $user->amount += $profit;
        $user->exchange_amount += $profit;
        $user->profit = 0;
        $user->claim_at = $now;
        $user->remain_at = $now;
        $user->save();

        // return 'claimed_profit' => round($profit, 5),
        return response()->json([
            'message' => 'Claim successful',
            'total_amount' => round($user->amount, 5),
            'exchange_amount' => round($user->exchange_amount, 5),
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
}
