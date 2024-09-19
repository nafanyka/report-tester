<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property string $key
 * @property string|null $value
 * @method static \Illuminate\Database\Eloquent\Builder|CurrentState newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CurrentState newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CurrentState query()
 * @method static \Illuminate\Database\Eloquent\Builder|CurrentState whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CurrentState whereValue($value)
 */
	class CurrentState extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property string $name
 * @property string $description
 * @property \App\Enums\Environment $env
 * @property string $domain
 * @property int $is_blocked
 * @method static \Illuminate\Database\Eloquent\Builder|Environment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Environment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Environment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Environment whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environment whereDomain($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environment whereEnv($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environment whereIsBlocked($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environment whereName($value)
 */
	class Environment extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property mixed $password
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 */
	class User extends \Eloquent {}
}

