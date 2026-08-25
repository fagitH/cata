<?php

namespace App\Http\Controllers\Api;

use App\Models\AnnualReport;
use App\Models\Banner;
use App\Models\Contact;
use App\Models\Donation;
use App\Models\Newsletter;
use App\Models\ManagementMember;
use App\Models\News;
use App\Models\Partner;
use App\Models\ReportItem;
use App\Models\SecretariatMember;
use App\Models\ShariahAdvisoryMember;
use App\Models\Scholarship;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ContentController
{
    private array $models = [
        'banners' => Banner::class,
        'news' => News::class,
        'donations' => Donation::class,
        'annual_reports' => AnnualReport::class,
        'report_items' => ReportItem::class,
        'newsletters' => Newsletter::class,
        'secretariat_members' => SecretariatMember::class,
        'management_members' => ManagementMember::class,
        'shariah_advisory_members' => ShariahAdvisoryMember::class,
        'partners' => Partner::class,
        'scholarships' => Scholarship::class,
    ];

    public function index(string $resource): JsonResponse
    {
        if ($resource === 'contact') {
            return response()->json(Contact::query()->latest()->get());
        }

        $model = $this->model($resource);
        $query = $model::query();
        if ($resource === 'scholarships' && !request()->attributes->has('admin_user')) {
            $query->where('status', 'active');
        }
        if (in_array($resource, ['secretariat_members', 'management_members', 'shariah_advisory_members', 'partners'], true)) {
            $query->orderBy('sort_order')->orderBy('id');
        } else {
            $query->orderBy('id');
        }

        return response()->json($query->get());
    }

    public function show(string $resource, string $identifier): JsonResponse
    {
        if ($resource === 'contact') {
            abort(404);
        }

        $model = $this->model($resource);
        $record = $resource === 'news'
            ? $model::query()->where('id', $identifier)->orWhere('slug', $identifier)->firstOrFail()
            : ($resource === 'donations'
                ? $model::query()->where('id', $identifier)->orWhere('transaction_id', $identifier)->firstOrFail()
                : $model::query()->findOrFail($identifier));

        return response()->json($record);
    }

    public function store(Request $request, string $resource): JsonResponse
    {
        if ($resource === 'contact') {
            $data = $request->validate([
                'name' => ['required', 'string'],
                'email' => ['required', 'email'],
                'phone' => ['nullable', 'string'],
                'subject' => ['required', 'string'],
                'message' => ['required', 'string'],
            ]);
            return response()->json(Contact::create($data), 201);
        }

        $model = $this->model($resource);
        $data = $this->prepare($request, $resource);
        return response()->json($model::create($data), 201);
    }

    public function submitDonation(Request $request): JsonResponse
    {
        $data = $request->validate([
            'donor_name' => ['required', 'string', 'max:255'],
            'donor_email' => ['nullable', 'email', 'max:255'],
            'donor_phone' => ['nullable', 'string', 'max:50'],
            'donor_address' => ['nullable', 'array'],
            'amount' => ['required', 'numeric', 'min:0.01', 'max:1000000'],
            'payment_method' => ['required', 'in:bank_transfer,acleda_khqr'],
            'campaign_title' => ['nullable', 'string', 'max:255'],
        ]);

        do {
            $transactionId = 'TXN-' . strtoupper(Str::random(12));
        } while (Donation::query()->where('transaction_id', $transactionId)->exists());

        $data['transaction_id'] = $transactionId;
        $data['status'] = 'pending';

        return response()->json(Donation::create($data), 201);
    }

    public function update(Request $request, string $resource, string $identifier): JsonResponse
    {
        $model = $this->model($resource);
        $record = $model::findOrFail($identifier);
        $record->fill($this->prepare($request, $resource, $record));
        $record->save();
        return response()->json($record->fresh());
    }

    public function destroy(string $resource, string $identifier): JsonResponse
    {
        $model = $this->model($resource);
        $model::findOrFail($identifier)->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }

    private function model(string $resource): string
    {
        abort_unless(isset($this->models[$resource]), 404);
        return $this->models[$resource];
    }

    private function prepare(Request $request, string $resource, ?object $current = null): array
    {
        $data = $request->except(['id', 'file', 'file[]']);

        if ($resource === 'banners' && empty(trim((string) ($data['title'] ?? '')))) {
            $data['title'] = 'Banner';
        }

        if ($resource === 'shariah_advisory_members') {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'role' => ['nullable', 'string'],
                'education' => ['nullable'],
                'sort_order' => ['required', 'integer', 'min:0'],
                'image' => ['nullable', 'image', 'max:10240'],
            ]);
            $education = $data['education'] ?? [];
            $data['education'] = is_array($education)
                ? $education
                : array_values(array_filter(preg_split('/\r\n|\r|\n/', (string) $education), fn ($item) => trim($item) !== ''));
        }

        if ($resource === 'donations') {
            $data['transaction_id'] ??= 'TXN-' . strtoupper(Str::random(12));
            $data['status'] ??= 'pending';
        }

        if ($resource === 'news') {
            $data['slug'] ??= Str::slug($data['title'] ?? 'news-' . Str::random(6));
            $data['content'] = $this->arrayValue($data['content'] ?? []);
            $data['images'] = $this->arrayValue($data['images'] ?? $data['event_images'] ?? []);

            $eventImages = $request->file('event_images', []);
            $eventImages = is_array($eventImages) ? $eventImages : ($eventImages ? [$eventImages] : []);
            if ($eventImages) {
                $data['images'] = array_merge(
                    $current?->images ?? [],
                    array_map(fn (UploadedFile $file) => $this->storePublicUpload($file), $eventImages)
                );
            }
            unset($data['event_images'], $data['published_date']);
        }

        if ($resource === 'annual_reports') {
            $data['slug'] ??= Str::slug($data['title'] ?? 'report-' . Str::random(6));
            $data['content'] = $this->arrayValue($data['content'] ?? []);
            $data['stats'] = $this->arrayValue($data['stats'] ?? []);
        }

        if ($resource === 'scholarships') {
            $request->validate([
                'title' => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'deadline' => ['nullable', 'date'],
                'link' => ['nullable', 'url', 'max:2048'],
                'status' => ['required', 'in:active,draft'],
                'image' => ['nullable', 'image', 'max:10240'],
            ]);
        }

        if ($resource === 'report_items') {
            $data['report_id'] = ($data['report_id'] ?? null) === 'all' ? 'all' : ($data['report_id'] ?? null);
        }

        if ($resource === 'newsletters') {
            $request->validate([
                'title' => ['nullable', 'string', 'max:255'],
                'file' => [$current ? 'nullable' : 'required'],
                'file.*' => ['image', 'max:10240'],
            ]);

            $files = $request->file('file[]') ?: $request->file('file');
            $files = is_array($files) ? $files : ($files ? [$files] : []);
            foreach ($files as $file) {
                if (!$this->isCompleteNewsletterImage($file)) {
                    throw ValidationException::withMessages([
                        'file' => 'One or more newsletter images are incomplete. Please upload the original image again.',
                    ]);
                }
            }
            $imageUrls = $current?->image_urls ?? [];
            foreach ($files as $file) {
                $directory = public_path('uploads');
                if (!is_dir($directory)) mkdir($directory, 0777, true);
                $filename = 'newsletter_' . Str::random(20) . '.' . $file->getClientOriginalExtension();
                $file->move($directory, $filename);
                $imageUrls[] = '/uploads/' . $filename;
            }
            if ($imageUrls) {
                $data['image_urls'] = array_values($imageUrls);
                $data['image_url'] = $imageUrls[0];
            }
            if (empty($data['image_urls']) && $current) {
                $data['image_urls'] = $current->image_urls;
            }
        }

        if ($request->hasFile('image') && $resource !== 'newsletters') {
            $data['image'] = $this->storePublicUpload($request->file('image'));
        }

        if ($request->hasFile('logo')) {
            $data['logo'] = $this->storePublicUpload($request->file('logo'));
        }

        return $data;
    }

    private function arrayValue(mixed $value): array
    {
        if (is_array($value)) return $value;
        if (!is_string($value) || trim($value) === '') return [];
        $decoded = json_decode($value, true);
        return is_array($decoded) ? $decoded : [$value];
    }

    private function storePublicUpload(UploadedFile $file): string
    {
        $directory = public_path('uploads');
        if (!is_dir($directory)) {
            mkdir($directory, 0777, true);
        }

        $filename = Str::random(40) . '.' . $file->getClientOriginalExtension();
        $file->move($directory, $filename);

        return '/uploads/' . $filename;
    }

    private function isCompleteNewsletterImage(UploadedFile $file): bool
    {
        if ($file->getMimeType() !== 'image/jpeg') {
            return true;
        }

        $handle = fopen($file->getRealPath(), 'rb');
        if ($handle === false) {
            return false;
        }

        fseek($handle, -2, SEEK_END);
        $endMarker = fread($handle, 2);
        fclose($handle);

        return $endMarker === "\xFF\xD9";
    }
}
