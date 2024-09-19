<?php

namespace App\Http\Requests\Api\Environment;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class UpdateEnviromentRequest extends FormRequest
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
            'description'   => ['required', 'string', Rule::unique('environments', 'description')->ignore($this->request->get('old_name'), 'name')],
            'domain'        => ['required', 'string', 'url:http,https'],
            'env'           => ['required', 'string'],
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
