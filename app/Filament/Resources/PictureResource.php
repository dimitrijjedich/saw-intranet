<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PictureResource\Pages;
use App\Filament\Resources\PictureResource\RelationManagers;
use App\Models\Picture;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PictureResource extends Resource
{
    protected static ?string $model = Picture::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('path')->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('path'),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPictures::route('/'),
            'create' => Pages\CreatePicture::route('/create'),
            'view' => Pages\ViewPicture::route('/{record}'),
        ];
    }
}
