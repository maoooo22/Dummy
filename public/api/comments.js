// /api/comments.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hyspyxgkxsvtuxkusuad.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY; // ambil dari .env
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { gmail, username, comment } = req.body;
    const { error } = await supabase
      .from('comments')
      .insert([{ gmail, username, comment }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Komentar berhasil ditambahkan' });
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('comments').select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
