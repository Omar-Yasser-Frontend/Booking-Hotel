import { useEffect } from "react";
import { useSearchParams } from "react-router";

function useSyncSearchParams(setState: React.Dispatch<string>, filter: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const value = searchParams.get(filter);
    setState(value || "");
  }, [searchParams, setState, filter]);

  function updateSearchParams(value: string) {
    const urlSearchParams = new URLSearchParams(searchParams);

    if (!value) urlSearchParams.delete(filter);
    else urlSearchParams.set(filter, value);

    urlSearchParams.set("page", "1");

    setSearchParams(urlSearchParams);
  }

  return updateSearchParams;
}

export { useSyncSearchParams };
