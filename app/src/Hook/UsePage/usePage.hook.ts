import { useState } from "react";

export function usePage() {
  const [page, setPage] = useState(0);

  function handlePreviousPage() {
    setPage((page) => (page > 0 ? page - 1 : page));
  }

  function handleNextPage() {
    setPage((page) => page + 1);
  }

  return { page, handlePreviousPage, handleNextPage };
}
