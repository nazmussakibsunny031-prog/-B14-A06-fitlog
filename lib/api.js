const BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

function unwrapList(json) {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.workouts)) return json.workouts;
  return [];
}

function unwrapOne(json) {
  if (!json) return null;
  if (json.data && !Array.isArray(json.data)) return json.data;
  if (json.workout) return json.workout;
  return json.id !== undefined ? json : null;
}

async function request(path) {
  let lastError = null;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`);
      if (res.status === 404) return { notFound: true };
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      return { json: await res.json() };
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error("Unable to reach the API");
}

export async function fetchWorkouts() {
  const { json } = await request("");
  return unwrapList(json);
}

/** Returns the workout object, or null when it does not exist. */
export async function fetchWorkout(id) {
  const { json, notFound } = await request(`/${id}`);
  if (notFound) return null;
  return unwrapOne(json);
}
