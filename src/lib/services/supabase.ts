import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_PUBLISHABLE_KEY
} from '$env/static/public';
import { createBrowserClient } from '@supabase/ssr';
import { browser } from '$app/environment';

export function createSupabaseClient() {
  if (browser) {
    return createBrowserClient(
      PUBLIC_SUPABASE_URL,
      PUBLIC_SUPABASE_PUBLISHABLE_KEY
    );
  }

  throw new Error(
    'createSupabaseClient() should only be called in the browser. Use the server client from event.locals.supabase instead.'
  );
}
