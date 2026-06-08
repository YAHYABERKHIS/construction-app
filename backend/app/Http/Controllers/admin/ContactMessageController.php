<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::orderBy('created_at', 'DESC')->get();
        return response()->json(['status' => true, 'data' => $messages]);
    }

    public function show($id)
    {
        $message = ContactMessage::find($id);
        if (!$message) {
            return response()->json(['status' => false, 'message' => 'Message not found']);
        }
        return response()->json(['status' => true, 'data' => $message]);
    }

    public function markRead($id)
    {
        $message = ContactMessage::find($id);
        if (!$message) {
            return response()->json(['status' => false, 'message' => 'Message not found']);
        }

        $message->is_read = true;
        $message->save();

        return response()->json(['status' => true, 'message' => 'Message marked as read']);
    }

    public function destroy($id)
    {
        $message = ContactMessage::find($id);
        if (!$message) {
            return response()->json(['status' => false, 'message' => 'Message not found']);
        }
        $message->delete();
        return response()->json(['status' => true, 'message' => 'Message deleted successfully']);
    }
}

