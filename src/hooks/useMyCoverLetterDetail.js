import { useEffect, useState } from 'react';
import api from '../common/api-axios.js';

const useMyCoverLetterDetail = (id) => {
  const [coverLetter, setCoverLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/user-cover-letters/${id}`)
      .then(res => {
        const data = res.data;
        setCoverLetter({
          id: data.id,
          title: data.title,
          date: data.created_at ? new Date(data.created_at).toISOString().split('T')[0] : '',
          updated_at: data.updated_at,
          items: (data.items || []).map(it => ({
            id: it.id,
            question: it.question,
            char_limit: it.char_limit ?? null,
            content: it.content,
            number: it.number,
          })),
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return { coverLetter, loading, error };
};

export default useMyCoverLetterDetail;
