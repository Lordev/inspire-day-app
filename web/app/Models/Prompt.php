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

    protected static function booted()
    {
        static::creating(function ($prompt) {
            if (is_null($prompt->status)) {
                $prompt->status = 'unanswered';
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isAnswered()
    {
        return !empty(trim($this->response));
    }
}
