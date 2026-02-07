<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPlan extends Model
{
    protected $guarded = [];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    public function totalPaid()
    {
        return $this->payments()->sum('amount');
    }

    public function dueAmount()
    {
        return $this->yearly_amount - $this->totalPaid();
    }


}
