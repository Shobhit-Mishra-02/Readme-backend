interface tempConnectorInterface {
  allTemplate: { title: string; file: string }[];
}

const tempConnector: tempConnectorInterface = {
  allTemplate: [
    {
      title: "Introduction",
      file: "01-template.md",
    },
    {
      title: "About",
      file: "02-template.md",
    },
  ],
};

export default tempConnector;
