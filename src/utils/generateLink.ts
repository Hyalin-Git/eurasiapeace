export const generateLink = (contentType: string, slug: string) => {
  let type = "";

  switch (contentType) {
    case "post":
      type = "publications";
      break;
    case "formation":
      type = "formations";
      break;
    case "veille-geopolitique":
      type = "veilles-geopolitiques";
      break;
    case "la-voix-dun-expert":
      type = "la-voix-des-experts";
      break;
    default:
      type = "publications";
  }

  return `/${type}/${slug}`;
};
