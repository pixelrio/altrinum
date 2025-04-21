<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    /** @use HasFactory<\Database\Factories\ProgramFactory> */
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'name',
        'slug',
        'description',
        'start_date',
        'end_date',
        'is_multievent',
        'has_filters',
        'has_cart',
        'is_published',
        'visibility',
        'layout_type',
        'seo_index'
    ];
}
