import { createClient } from "@supabase/supabase-js";
import {key} from '../config'

const supabaseUrl = "https://lwounlychbaqrshwuzoh.supabase.co";
const supabaseKey =key;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
