<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prompt extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'prompt',
        'response',
        'date',
        'status',
        'analysis',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isAnswered()
    {
        return !empty($this->response);
    }
}
