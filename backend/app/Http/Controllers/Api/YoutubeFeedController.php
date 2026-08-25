<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use SimpleXMLElement;

class YoutubeFeedController
{
    // Replace with your actual Channel ID starting with UC...
    private const CHANNEL_ID = 'UCwbNKD6eeq_zE5Zz8EpznDg'; 
    private const RSS_FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=';

    private const FALLBACK_VIDEO_IDS = [
        'kmcGay11aRc', 'POaxWJcgvLM', 'h3OcmgnMGEs', 'DyYlE_AabdU', '_WYByPyPO08',
        'dkIdBszoGnM', 'TUwvdktTU2E', 'O3ySeLs3t8o', 'YmbDzeoNf3o', 'Bx3OvSoKnsk',
    ];

    public function index(): JsonResponse
    {
        $videos = Cache::remember('cata-public-youtube-videos', now()->addMinutes(15), function (): array {
            try {
                $response = Http::timeout(10)->get(self::RSS_FEED_URL . self::CHANNEL_ID);

                if (!$response->successful()) {
                    return $this->formatFallback();
                }

                $xml = new SimpleXMLElement($response->body());
                $xml->registerXPathNamespace('yt', 'http://www.youtube.com/xml/schemas/2015');
                $xml->registerXPathNamespace('atom', 'http://www.w3.org/2005/Atom');

                $extracted = [];

                foreach ($xml->entry as $entry) {
                    $yt = $entry->children('http://www.youtube.com/xml/schemas/2015');
                    $videoId = (string) $yt->videoId;
                    $title = (string) $entry->title;
                    $published = (string) $entry->published;

                    if ($videoId) {
                        $extracted[] = [
                            'id' => $videoId,
                            'youtubeId' => $videoId,
                            'title' => $title ?: 'CATA Community video',
                            'date' => $published ? date('Y-m-d', strtotime($published)) : '',
                            'excerpt' => '',
                            'category' => 'Community',
                        ];
                    }
                }

                return $extracted ?: $this->formatFallback();
            } catch (\Throwable $exception) {
                report($exception);
                return $this->formatFallback();
            }
        });

        return response()->json(['videos' => $videos]);
    }

    private function formatFallback(): array
    {
        return array_map(fn (string $id) => [
            'id' => $id,
            'youtubeId' => $id,
            'title' => 'CATA Community video',
            'date' => '',
            'excerpt' => '',
            'category' => 'Community',
        ], self::FALLBACK_VIDEO_IDS);
    }
}