<?php

namespace Classiebit\Eventmie\Policies;

use Classiebit\Eventmie\Models\Kit;
use Classiebit\Eventmie\Models\User;

class KitPolicy
{
    /**
     * Determine whether the user can view any kits.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('browse_kits');
    }

    /**
     * Determine whether the user can view the kit.
     */
    public function view(User $user, Kit $kit): bool
    {
        return $user->hasPermission('read_kits');
    }

    /**
     * Determine whether the user can create kits.
     */
    public function create(User $user): bool
    {
        return true; // Allow all authenticated users, permission check is done elsewhere
    }

    /**
     * Determine whether the user can update the kit.
     */
    public function update(User $user, Kit $kit): bool
    {
        return $user->hasPermission('edit_kits');
    }

    /**
     * Determine whether the user can delete the kit.
     */
    public function delete(User $user, Kit $kit): bool
    {
        return $user->hasPermission('delete_kits');
    }

    /**
     * Determine whether the user can restore the kit.
     */
    public function restore(User $user, Kit $kit): bool
    {
        return $user->hasPermission('edit_kits');
    }

    /**
     * Determine whether the user can permanently delete the kit.
     */
    public function forceDelete(User $user, Kit $kit): bool
    {
        return $user->hasPermission('delete_kits');
    }
}
