<?php

namespace App\Filament\Resources\PictureResource\Pages;

use App\Filament\Resources\PictureResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewPicture extends ViewRecord
{
    protected static string $resource = PictureResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
