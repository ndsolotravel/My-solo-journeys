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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || envVars.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || envVars.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in environment or .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchTableData() {
  console.log("Connecting to Supabase table: 'posts'...");
  const { data, error } = await supabase
    .from('posts')
    .select('*');

  if (error) {
    console.error("Error fetching data from 'posts':", error);
  } else {
    console.log(`Successfully fetched ${data?.length ?? 0} records from 'posts':`);
    console.log(data);
  }
}

fetchTableData();
