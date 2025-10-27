<?php

namespace Classiebit\Eventmie\Http\Controllers;

use App\Http\Controllers\Controller; 
use Facades\Classiebit\Eventmie\Eventmie;

use OpenAI\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Classiebit\Eventmie\Models\Category;

class OpenAIController extends Controller
{
    protected $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function handlePrompt(Request $request)
    {
        // Validate the request
        $request->validate([
            'prompt' => 'required|string',
            'fields' => 'required|array',
            'fields.*' => 'in:name,slug,long_description,more_long_description,short_description,tags,age_limit,meta_title,meta_description,meta_tags,tagline,hash_tags,short,faq',
        ]);

        $prompt = $request->input('prompt');
        
        $userId = Auth::id();
        $fields = $request->input('fields');

        // Check available prompt balance
        $prompt_data = $this->getAvailablePromptBalance($userId);
        $availablePrompts = $prompt_data['availablePrompts'];

        if ($availablePrompts <= 0) {

            $request->validate([
              'error' => 'required',
            ],['error.required' => __('eventmie-pro::em.prompt_limit_reached')]);

        }

        $new_prompt = <<<EOT
        $prompt

        Please respond with a valid JSON object in the following format:
        {
        "events": [
            {
            "name": "",
            "slug": "",
            "short": "",                       // Short url-friendly name
            "long_description": "",             // ~5000 words, rich text format
            "more_long_description": "",        // ~1000 words, rich text format
            "short_description": "",            // Short event summary
            "tags": "",                         // Comma-separated list of event tags
            "age_limit": "",                    // e.g., "All Ages", "18+"
            "meta_title": "",                   // For SEO title tag
            "meta_description": "",             // For SEO meta description
            "meta_tags": "",                    // Comma-separated SEO keywords
            "tagline": "",                      // Catchy phrase about the event
            "hash_tags": [                      // Array of 10 hashtag objects
                { "value": "tech", "text": "tech" }
            ],
            "faq": ""                           // ~5000-word FAQ content, rich text format
            },
            ... (3 more event objects)
        ]
        }

        Make sure:
        - All descriptions are rich, well-structured, and unique.
        - Do not include any extra commentary outside the JSON.
        - Do not use markdown — respond with plain JSON only.
        EOT;
        

        try {
            $response = $this->client->chat()->create([
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    ['role' => 'user', 'content' => $new_prompt],
                ],
            ])->toArray();

            $text = $response['choices'][0]['message']['content'] ?? '';
            $jsonString = $this->extractJsonString(trim($text, '"""'));
            $eventsArray = json_decode($jsonString, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                $request->validate([
                    'error' => 'required',
                ],['error.required' => __('eventmie-pro::em.failed_decode_openai')]);
            }

            if (empty($eventsArray)) {
                $eventsArray = [];
            }

            // Log the prompt usage
            $this->logPromptUsage($userId, $prompt);


            $AI = collect($eventsArray['events']);
            $AIData = [
                'titles' => $AI->pluck('name'),
                'descriptions' => $AI->pluck('long_description'),
                'meta_title' => $AI->pluck('meta_title'),
                'meta_description' => $AI->pluck('meta_description'),
                'more_long_description' => $AI->pluck('more_long_description'),
                'short_description' => $AI->pluck('short_description'),
                'meta_tags' => $AI->pluck('meta_tags'),
                'faq' => $AI->pluck('faq'),
            ];

            return response()->json([
                'text' => $text,
                'response' => $eventsArray,
                'prompt' => $new_prompt,
                'full_response' => $response,
                'AIData' => $AIData,
                
            ]);
        } catch (\Exception $e) {
            \Log::error('OpenAI API Error: ' . $e->getMessage());

            $request->validate([    
                'error' => 'required',
            ],['error.required' => 'OpenAI API Error: ' . $e->getMessage()]);

        }
    }

    // Helper methods (assumed to exist in your code)
    protected function getAvailablePromptBalance($userId)
    {
        // Implement your logic to check prompt balance
        return ['availablePrompts' => 10]; // Placeholder
    }

    protected function flattenCategories($categories)
    {
        $result = [];
        foreach ($categories as $category) {
            $result[] = $category;
            if ($category->categories) {
                $result = array_merge($result, $this->flattenCategories($category->categories));
            }
        }
        return $result;
    }

    protected function extractSelectedCategory($text, $categories)
    {
        foreach ($categories as $category) {
            if (stripos($text, $category) !== false) {
                return $category;
            }
        }
        return null;
    }

    protected function extractJsonString($text)
    {
        preg_match('/```json\n([\s\S]*?)\n```/', $text, $matches);
        return $matches[1] ?? $text;
    }

    protected function logPromptUsage($userId, $prompt)
    {
        // Implement your logic to log prompt usage
    }
}