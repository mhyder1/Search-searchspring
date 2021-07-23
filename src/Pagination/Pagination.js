import AppContext from "../AppContext";
import { useContext, useEffect } from "react";

const Pagination = () => {
  const {
    totalPages,
    search,
    setCurrentPage,
    currentPage,
    nextPage,
    previousPage,
  } = useContext(AppContext);

  const handleButtonClick = (buttonNumber) => {
    setCurrentPage(buttonNumber);
  };

  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const isPageSeen = (pageNumber) => {
    if (currentPage + 5 > pageNumber && currentPage - 5 < pageNumber) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, setCurrentPage]);

  return (
    <div className="pagination">
      {previousPage > 0 ? <div> Prev </div> : <div></div>}
      {pages.length > 0 ? (
        pages.map((pageNumber) => {
          return (
            isPageSeen(pageNumber) && (
              <button
                id={pageNumber}
                onClick={() => {
                  handleButtonClick(pageNumber);
                }}
              >
                {pageNumber}
              </button>
            )
          );
        })
      ) : (
        <div> No pages </div>
      )}
      {nextPage > 0 ? <div> Next </div> : <div></div>}
    </div>
  );
};

export default Pagination;
