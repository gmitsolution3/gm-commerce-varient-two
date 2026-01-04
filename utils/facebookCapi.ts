// utils/facebookCapi.ts
import axios from "axios";

export const sendFbEvent = async (
  eventName: string,
  userData: any,
  customData: any
) => {
  const url = `https://graph.facebook.com/v18.0/${process.env.NEXT_PUBLIC_FB_PIXEL_ID}/events`;

  await axios.post(url, {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        user_data: userData,
        custom_data: customData,
      },
    ],
    access_token: process.env.FB_CAPI_TOKEN,
  });
};
