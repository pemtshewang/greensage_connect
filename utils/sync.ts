import { getValueFor } from "../securestore";

const sync = async ({
  id,
  controllerId,
  name,
  type
}: {
  id: string;
  controllerId: string;
  name: string;
  type: "irrigation" | "greenhouse"
}) => {
  const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/controller/sync`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        controllerId,
        name,
        type,
      }),
    }
  );
  if (res.ok) {
    return true;
  }
  return false;
}

export const syncToCloud = async ({
  controllerId,
  name,
  type,
}: {
  controllerId: string;
  name: string;
  type: "irrigation" | "greenhouse"
}) => {
  try {
    const token = await getValueFor("token");
    const userId = JSON.parse(token as string)?.id;
    const res = await sync({
      id: userId,
      controllerId,
      name,
      type
    });
    if (res) {
      return "Synced Successful";
    } else {
      return false;
    }
  } catch (err) {
    console.log(false);
    return true;
  }
}

