import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://lwounlychbaqrshwuzoh.supabase.co";
const supabaseKey = process.env.REACT_APP_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
