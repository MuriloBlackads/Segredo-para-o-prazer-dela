const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://bkwmjtdonshqtmcilyyx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrd21qdGRvbnNocXRtY2lseXl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjMyMTAyOCwiZXhwIjoyMDg3ODk3MDI4fQ.7a-8ZF72nahytJrbzle9psgPH3I9Obe2HUE1F9Rc2Ng';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadFullVideo() {
  const filePath = path.join(__dirname, 'vsl_video_full.mp4');
  const fileBuffer = fs.readFileSync(filePath);

  console.log('Subindo video completo para o Supabase...');
  
  const { data, error } = await supabase.storage
    .from('vsl-assets')
    .upload('vsl_video.mp4', fileBuffer, {
      contentType: 'video/mp4',
      upsert: true
    });

  if (error) {
    console.error('Erro no upload:', error.message);
  } else {
    console.log('Upload concluído com sucesso!', data.path);
  }
}

uploadFullVideo();
