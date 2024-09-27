<?php

namespace App\Http\Requests\Api\Statistic;

use App\Enums\ReportFormat;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class SlicesRequest extends FormRequest
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
