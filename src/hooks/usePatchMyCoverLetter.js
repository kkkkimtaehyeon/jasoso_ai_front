import api from '../common/api-axios.js';

const usePatchMyCoverLetter = () => {
  // patchCoverLetter(id, { title, items })
  const patchCoverLetter = async (id, { title, items }) => {
    // items: [{id, question, char_limit, content}]
    const body = {
      title,
      items: items.map(item => ({
        id: item.id,
        question: item.question,
        char_limit: item.char_limit,
        content: item.content,
      })),
    };
    const res = await api.patch(`/v2/user-cover-letters/${id}`, body);
    return res.data;
  };
  return { patchCoverLetter };
};

export default usePatchMyCoverLetter;
