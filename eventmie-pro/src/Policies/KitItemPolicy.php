<?php

namespace Classiebit\Eventmie\Policies;

use Classiebit\Eventmie\Models\KitItem;
use Classiebit\Eventmie\Models\User;

class KitItemPolicy
{
    /**
     * Determine whether the user can view any kit items.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('browse_kit_items');
    }

    /**
     * Determine whether the user can view the kit item.
     */
    public function view(User $user, KitItem $kitItem): bool
    {
        return $user->hasPermission('read_kit_items');
    }

    /**
     * Determine whether the user can create kit items.
     */
    public function create(User $user): bool
    {
        return true; // Allow all authenticated users, permission check is done elsewhere
    }

    /**
     * Determine whether the user can update the kit item.
     */
    public function update(User $user, KitItem $kitItem): bool
    {
        return $user->hasPermission('edit_kit_items');
    }

    /**
     * Determine whether the user can delete the kit item.
     */
    public function delete(User $user, KitItem $kitItem): bool
    {
        return $user->hasPermission('delete_kit_items');
    }

    /**
     * Determine whether the user can restore the kit item.
     */
    public function restore(User $user, KitItem $kitItem): bool
    {
        return $user->hasPermission('edit_kit_items');
    }

    /**
     * Determine whether the user can permanently delete the kit item.
     */
    public function forceDelete(User $user, KitItem $kitItem): bool
    {
        return $user->hasPermission('delete_kit_items');
    }
}
