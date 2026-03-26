// Supabase Edge Function: get-eta
// Runtime: Deno
// Purpose: Calculate personalised ETA for a given route and user calibration profile
// TODO (Agent 5): implement full ETA logic using stored calibration coefficients

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface ETARequest {
  routeSegments: Array<{
    distanceMeters: number;
    elevationGainMeters: number;
  }>;
  carriageMode: 'hand' | 'pocket' | 'armband';
}

interface ETAResponse {
  totalEtaSeconds: number;
  confidence: 'high' | 'medium' | 'low';
  segments: Array<{
    distanceMeters: number;
    elevationGainMeters: number;
    expectedSpeedMs: number;
    etaSeconds: number;
  }>;
  marginSeconds: number;
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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

    const body: ETARequest = await req.json();

    // TODO (Agent 5): fetch user's calibration profile for the given carriageMode,
    //                 run ETACalculator logic, return ETAResponse
    const response: ETAResponse = {
      totalEtaSeconds: 0,
      confidence: 'low',
      segments: body.routeSegments.map((s) => ({
        ...s,
        expectedSpeedMs: 0,
        etaSeconds: 0,
      })),
      marginSeconds: 0,
    };

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
