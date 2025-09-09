<?php

namespace App\Enums;

enum Tone: string
{
    case CASUAL = 'casual';
    case PROFESSIONAL = 'professional';
    case REFLECTIVE = 'reflective';
    case INSPIRING = 'inspiring';

    public function label(): string
    {
        return match($this) {
            self::CASUAL => 'Casual & Friendly',
            self::PROFESSIONAL => 'Professional',
            self::REFLECTIVE => 'Reflective',
            self::INSPIRING => 'Inspiring & Motivational',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn($case) => [
            $case->value => $case->label()
        ])->toArray();
    }
}