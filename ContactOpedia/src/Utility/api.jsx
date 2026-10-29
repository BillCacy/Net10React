import axios from "axios";

const getRandomUser = async () => {
  const url = new URL("https://randomuser.me/api/");

  const response = await axios.get(url);

  // axios automatically converts the response
  // below is standard javascript fetch which requires checking status and retrieving response data
  //   if (!response.ok) {
  //     throw new Error(`HTTP Error! Status: ${response.status}`);
  //   }

  //   const data = await response.json();
  //   return data;
  return response.data;
};

export default getRandomUser;
