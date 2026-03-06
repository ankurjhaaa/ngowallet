<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $guarded = [];

    public function userPlan()
    {
        return $this->belongsTo(UserPlan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function otpHistories()
    {
        return $this->hasMany(PaymentOtpHistory::class);
    }

    public function latestOtpHistory()
    {
        return $this->hasOne(PaymentOtpHistory::class)->latestOfMany();
    }

}
