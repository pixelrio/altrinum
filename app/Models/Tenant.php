<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Spatie\Multitenancy\Models\Tenant as BaseTenant;
use Spatie\Multitenancy\Models\Concerns\UsesTenantConnection;

class Tenant extends Model
{
    use UsesTenantConnection;

    protected $fillable = [
        'name',
        'subdomain',
    ];
}
