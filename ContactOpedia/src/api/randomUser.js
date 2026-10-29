const RANDOM_USER_URL = "https://randomuser.me/api/";

// Maps the randomuser.me shape to our contact shape, so the rest of the app
// never depends on the API's format
export function toContact(user) {
  return {
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    phone: user.phone,
  };
}

export async function fetchRandomContact() {
  const response = await fetch(RANDOM_USER_URL, {
    signal: AbortSignal.timeout(10000),
  });

  // fetch only rejects on network failure, not on HTTP error statuses
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  const user = data.results?.[0];

  if (!user) {
    throw new Error("Random user API returned no results");
  }

  return toContact(user);
}
