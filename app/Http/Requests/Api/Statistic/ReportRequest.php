<?php

namespace App\Http\Requests\Api\Statistic;

use App\Enums\ReportFormat;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class ReportRequest extends FormRequest
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
            'authToken'         => ['required', 'string', ],
            'report'            => ['required', 'string', ],
            'env'               => ['required', 'string', Rule::exists('environments', 'name')],
            'selReportFormat'   => ['required', 'string', Rule::enum(ReportFormat::class)],
            'metrics'           => ['required', 'array', 'min:1'],
            'slices'            => ['required', 'array', 'min:1'],
            'filters'           => ['sometimes', 'array', ],
            'customFilters'     => ['sometimes', 'array', ],
            'sort'              => ['required', 'string', ],
            'sortDir'           => ['required', 'string', Rule::in(['asc', 'desc'])],
            'perpage'           => ['required', 'integer', 'min:10', 'max:300'],
            'page'              => ['required', 'integer', 'min:1'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json(
                [
                    'success' => false,
                    'code' => 422,
                    'errors' => $validator->errors(),
                ]
            )->setStatusCode(422)
        );
    }
}
