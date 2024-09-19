<?php

namespace App\Http\Requests\Api\Environment;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreEnviromentRequest extends FormRequest
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
            'name'          => ['required', 'string', 'unique:environments,name', 'regex:/^[a-z0-9_]+$/i'],
            'description'   => ['required', 'string', 'unique:environments,description'],
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
