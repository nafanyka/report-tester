<?php

namespace App\Http\Requests\Api\ReportConfig;

use App\Enums\ReportConfigType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReportConfigRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'report' => ['require', 'string'],
            'type' => ['require', 'string', Rule::enum(ReportConfigType::class)],
            'instance' => ['require', 'string'],
        ];
    }
}
