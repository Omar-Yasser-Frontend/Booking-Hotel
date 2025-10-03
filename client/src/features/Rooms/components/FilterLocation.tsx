import { useState } from "react";
import { useSearchParams } from "react-router";
import { useSyncSearchParams } from "../hooks/useSyncSearchParams";

function FilterLocation() {
  const [searchParams] = useSearchParams();
  const [country, setCountry] = useState(() => {
    return searchParams.get("country") || "";
  });
  const [city, setCity] = useState(() => {
    return searchParams.get("city") || "";
  });
  const updateCountryParams = useSyncSearchParams(setCountry, "country");
  const updateCityParams = useSyncSearchParams(setCity, "city");

  return (
    <div>
      <h3 className="mt-4 mb-2 text-xl font-semibold">Location</h3>

      <label
        htmlFor={"country"}
        className="block text-sm font-medium text-slate-700"
      >
        Country
      </label>

      <select
        value={country}
        onChange={(e) => {
          const value = e.target.value;
          updateCountryParams(value);
          setCountry(e.target.value);
        }}
        className="block w-full bg-gray-100 p-3 shadow"
        id="country"
      >
        <option value="">Select All</option>
        <option value="Egypt">Egypt</option>
      </select>

      <label
        htmlFor={"city"}
        className="my-2 block text-sm font-medium text-slate-700"
      >
        City
      </label>

      <select
        value={city}
        onChange={(e) => {
          const value = e.target.value;
          updateCityParams(value);
          setCity(value);
        }}
        className="block w-full bg-gray-100 p-3 shadow"
        id="city"
      >
        <option value="">Select All</option>
        <option value="Cairo">Cairo</option>
        <option value="North Coast">North Coast</option>
        <option value="Sharm El Sheikh">Sharm El Sheikh</option>
        <option value="El Mansoura">El Mansoura</option>
      </select>
    </div>
  );
}

export default FilterLocation;
