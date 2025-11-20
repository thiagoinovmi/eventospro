<?php

namespace App\Helpers;

class VoyagerTranslationHelper
{
    /**
     * Translate a field display name using the fields translation file
     * Falls back to the display_name if translation not found
     */
    public static function translateFieldName($displayName, $fieldName = null)
    {
        // Try to translate using field name first (from generic namespace)
        if ($fieldName) {
            $translated = trans("voyager::generic.{$fieldName}");
            // Check if translation key exists (translation function returns the key if not found)
            if ($translated !== "voyager::generic.{$fieldName}") {
                return $translated;
            }
        }

        // Try to translate using display name as key (convert to snake_case)
        $snakeCase = strtolower(preg_replace('/\s+/', '_', $displayName));
        $translated = trans("voyager::generic.{$snakeCase}");
        if ($translated !== "voyager::generic.{$snakeCase}") {
            return $translated;
        }

        // Return original display name if no translation found
        return $displayName;
    }
}
