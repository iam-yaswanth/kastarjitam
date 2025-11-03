import { useState, useEffect } from 'react';
import { supabase, DiaryEntry } from '../lib/supabase';

export function useDiaryEntry() {
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    loadEntry();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadEntry();
        }
      })();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }

  async function loadEntry() {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        const localContent = localStorage.getItem('diary_content');
        setEntry({
          id: 'local',
          content: localContent || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: 'local',
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setEntry(data);
      } else {
        const { data: newEntry, error: insertError } = await supabase
          .from('diary_entries')
          .insert([
            {
              content: '',
              user_id: user.id,
            },
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        setEntry(newEntry);
      }
    } catch (error) {
      console.error('Error loading entry:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveEntry(content: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        localStorage.setItem('diary_content', content);
        setEntry(prev => prev ? { ...prev, content } : null);
        return;
      }

      if (!entry) return;

      const { data, error } = await supabase
        .from('diary_entries')
        .update({
          content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', entry.id)
        .select()
        .single();

      if (error) throw error;
      setEntry(data);
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  }

  return {
    entry,
    loading,
    user,
    saveEntry,
  };
}
