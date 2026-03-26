// Supabase Edge Function: verify-subscription
// Runtime: Deno
// Purpose: RevenueCat webhook handler — updates the subscriptions table
// TODO (Agent 4): implement full RevenueCat event handling

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// RevenueCat sends a shared secret in the Authorization header for webhook verification
const REVENUECAT_WEBHOOK_SECRET = Deno.env.get('REVENUECAT_WEBHOOK_SECRET') ?? '';

interface RevenueCatWebhookEvent {
  event: {
    type: string;
    app_user_id: string;
    expiration_at_ms: number | null;
    product_id: string;
  };
}

serve(async (req: Request): Promise<Response> => {
  // Verify RevenueCat webhook shared secret
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || authHeader !== REVENUECAT_WEBHOOK_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // service role for write access
    );

    const body: RevenueCatWebhookEvent = await req.json();
    const { type, app_user_id, expiration_at_ms } = body.event;

    // TODO (Agent 4): handle INITIAL_PURCHASE, RENEWAL, CANCELLATION, EXPIRATION events
    // Map app_user_id → Supabase user_id and upsert subscriptions table

    void supabase;
    void type;
    void app_user_id;
    void expiration_at_ms;

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (_err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
