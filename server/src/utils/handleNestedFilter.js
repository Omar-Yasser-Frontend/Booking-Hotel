const handleNestedFilter = (queryString) => {
  if (queryString.city) {
    queryString["location.city"] = queryString.city;
    delete queryString.city;
  }
  if (queryString.country) {
    queryString["location.country"] = queryString.country;
    delete queryString.country;
  }
  if (queryString.guests) {
    queryString["capacity.guests"] = queryString.guests;
    delete queryString.guests;
  }
  if (queryString.rooms) {
    queryString["capacity.rooms"] = queryString.rooms;
    delete queryString.rooms;
  }
  return queryString;
};

export default handleNestedFilter;
