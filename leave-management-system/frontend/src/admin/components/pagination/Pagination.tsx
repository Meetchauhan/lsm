import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { pagination } from "../../../features/paginationSlice";

const Pagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pages = useSelector((item: RootState) => item?.leaves?.allLeaves);
  const handlePageChange = async (page: string | number) => {
    dispatch(pagination({ page: page }));
  };
  return (
    <div className="text-center">
      {pages?.totalPages !== 1 &&
        Array.from({ length: Number(pages?.totalPages) || 0 }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 border mx-2 rounded-md ${
              pages?.currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
