// Supabase Edge Function: export-data
// Runtime: Deno
// Purpose: GDPR data export — returns all user data as JSON
// TODO (Agent 7): implement full data export and optional deletion

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } },
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // TODO (Agent 7): query all tables for user data and return as downloadable JSON
    const [profileResult, runsResult, calibrationResult] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('runs').select('*').eq('user_id', user.id),
      supabase.from('calibration_profiles').select('*').eq('user_id', user.id),
    ]);

    const exportData = {
      exportedAt: new Date().toISOString(),
      userId: user.id,
      profile: profileResult.data,
      runs: runsResult.data ?? [],
      calibrationProfiles: calibrationResult.data ?? [],
    };

    return new Response(JSON.stringify(exportData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="runnav-data-export.json"',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (_err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
