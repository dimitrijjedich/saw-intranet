#!/bin/bash

# Prompt for module name
read -p "Enter the module name: " moduleName

# Convert module name to lowercase
moduleNameLower=$(echo "$moduleName" | tr '[:upper:]' '[:lower:]')

# Convert module name to capitalized
moduleNameCapitalized=$(echo "$moduleNameLower" | sed -e "s/\b\(.\)/\u\1/g")

# Prompt for CSS file generation
read -p "Do you want to generate a corresponding CSS file? (y/n): " generateCss

# Path to ModuleRegistry.tsx
moduleRegistryPath="../src/components/modules/ModuleRegistry.tsx"

# Check if module name already exists in ModuleNames type
if grep -q "\"$moduleNameLower\"" "$moduleRegistryPath"; then
    echo "Error: Module name '$moduleNameLower' already exists in ModuleNames."
    exit 1
fi

# Add module name to ModuleNames type
sed -i '' "s/\"404\";/\"404\" | \"$moduleNameLower\";/" "$moduleRegistryPath"

# Create new folder for the module
moduleFolderPath="../src/components/modules/$moduleNameLower"
mkdir -p "$moduleFolderPath"

# Copy _ModuleExample.tsx to the new folder with the given component name
moduleFilePath="$moduleFolderPath/$moduleNameLower.tsx"
cp "../src/components/modules/_ModuleExample.tsx" "$moduleFilePath"

# Rename the function in the copied module file
sed -i '' "s/function _ModuleExample/function $moduleNameCapitalized/" "$moduleFilePath"

# Generate corresponding CSS file if requested
if [ "$generateCss" == "y" ]; then
    cssFilePath="$moduleFolderPath/$moduleNameLower.css"
    touch "$cssFilePath"
    echo "/* Styles for $moduleName module */" > "$cssFilePath"
    echo "CSS file created at $cssFilePath"

    # Import the CSS file in the copied module file
    sed -i '' "1i\\
import \"./$moduleNameLower.css\";" "$moduleFilePath"
fi

# Add the new module to moduleRegestry in ModuleRegistry.tsx
sed -i '' "/const moduleRegestry: {/a\\
    $moduleNameLower: <$moduleNameCapitalized \/>," "$moduleRegistryPath"

echo "Module '$moduleNameLower' added successfully."
