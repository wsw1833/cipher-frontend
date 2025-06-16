'use server';

export const SSESetup = async (gameID: string) => {
  const apiDomain =
    process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:3000';

  const response = await fetch(`${apiDomain}/games/${gameID}/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
