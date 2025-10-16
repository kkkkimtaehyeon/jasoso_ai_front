import api from '../common/api-axios.js';

const usePostMyCoverLetter = () => {
  // postCoverLetter({ title, items })
  const postCoverLetter = async ({ title, items }) => {
    // items: [{question, content}]
    const body = {
      title,
      items: items.map(item => ({
        question: item.question,
        content: item.content,
      })),
    };
    const res = await api.post('/v2/user-cover-letters', body);
    return res.data;
  };
  return { postCoverLetter };
};

export default usePostMyCoverLetter;
