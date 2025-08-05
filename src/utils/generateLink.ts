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
    case "culture":
      type = "cultures";
      break;
    default:
      type = "publications";
  }

  return `/${type}/${slug}`;
};
