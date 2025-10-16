import api from '../common/api-axios.js';

const useDeleteMyCoverLetter = () => {
  const deleteCoverLetter = async (id) => {
    await api.delete(`/user-cover-letters/${id}`);
  };
  return { deleteCoverLetter };
};

export default useDeleteMyCoverLetter;
