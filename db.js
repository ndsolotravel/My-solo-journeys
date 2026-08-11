import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read credentials from .env
let envVars = {};
try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const val = match[2].trim().replace(/^["']|["']$/g, '');
        envVars[key] = val;
      }
    });
  }
} catch (e) {
  console.error("Error reading .env:", e);
}

const supabaseUrl = envVars.SUPABASE_URL || envVars.VITE_SUPABASE_URL || 'https://mqoybarqgzzvillignbr.supabase.co';
const supabaseKey = envVars.SUPABASE_PUBLISHABLE_KEY || envVars.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_quAPYI3nYdGK50erwAPnfg_YJWBq2u5';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchTableData() {
  console.log("Connecting to Supabase table: 'posts'...");
  const { data, error } = await supabase
    .from('posts')
    .select('*');

  if (error) {
    console.error("Error fetching data from 'posts':", error);
  } else {
    console.log(`Successfully fetched ${data.length} records from 'posts':`);
    console.log(data);
  }
}

fetchTableData();
