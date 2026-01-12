export const getFacebookPixelCredential = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/facebook-setting/credentials`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch FB credentials");

  return res.json();
};
