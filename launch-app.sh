#!/bin/bash

# Function to handle cleanup on script exit
cleanup() {
    echo "Stopping all processes..."
    kill $(jobs -p)
    exit 0
}

# Trap SIGINT (Ctrl+C) and call cleanup function
trap cleanup SIGINT

# Start PHP server
php artisan serve &
# Start PHP queue worker
php artisan queue:work &
# Start PHP reverb
php artisan reverb:start &

# Change to frontend directory and start npm
cd ./frontend
npm start &

# Wait for all background processes to finish
wait
