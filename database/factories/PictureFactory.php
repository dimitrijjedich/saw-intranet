<?php

namespace Database\Factories;

use App\Models\Picture;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends Factory<Picture>
 */
class PictureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $files = array_diff(Storage::files(), array('.gitignore'));
        $fileName = $files[array_rand($files)];
        $file = Storage::get($fileName);
        $name = bin2hex(random_bytes(50)).'.'.array_slice(explode('.', $fileName), -1)[0];
        Storage::disk('public')->put($name, $file);
        return [
            'path' => $name,
        ];
    }
}
