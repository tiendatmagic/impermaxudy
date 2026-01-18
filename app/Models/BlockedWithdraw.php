<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockedWithdraw extends Model
{
  use HasFactory;

  protected $table = 'blocked_withdraws';

  protected $fillable = [
    'address',
    'chain_id',
  ];
}
