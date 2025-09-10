<?php

namespace App\Enums;

enum Niche: string
{
    case BUSINESS = 'business';
    case CREATIVITY = 'creativity';
    case WELLNESS = 'wellness';
    case PERSONAL_GROWTH = 'personal growth';

    public function label(): string
    {
        return match($this) {
            self::BUSINESS => 'Business & Entrepreneurship',
            self::CREATIVITY => 'Creativity & Writing',
            self::WELLNESS => 'Health & Wellness',
            self::PERSONAL_GROWTH => 'Personal Growth',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn($case) => [
            $case->value => $case->label()
        ])->toArray();
    }
    
}