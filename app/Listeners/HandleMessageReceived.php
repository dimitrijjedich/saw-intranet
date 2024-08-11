<?php

namespace App\Listeners;

class HandleMessageReceived
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        if (isset($event->message) && isset(json_decode($event->message)->event)) {
            switch (json_decode($event->message)->event) {
                case "client-my-event":
                    info("Testevent received with data: " . json_encode(json_decode($event->message)->data));
                    break;
                default:
                    info("Unrecognised event with following data:");
                    info($event->message);
            }
        }
    }
}
