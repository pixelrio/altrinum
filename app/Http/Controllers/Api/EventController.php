<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Requests\StoreEventRequest;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::orderBy('start_time', 'asc')->paginate(10);
        return response()->json($events);
    }

    public function store(StoreEventRequest $request)
    {
        $event = Event::create($request->validated());
        return response()->json($event, 201);
    }

    public function show(Event $event)
    {
        return response()->json($event);
    }

    public function update(UpdateEventRequest $request, Event $event)
    {
        $event->update($request->validated());
        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response()->json(['message' => 'Event deleted successfully']);
    }
}
