const s3Payload = async function (type) {
  if (type) {
    if (type === "image") {
      return "image/png";
    }

    if (type === "pdf") {
      return "application/pdf";
    }
  }
};

const imageUrlPath = async function (
  scrapeType,
  port,
  containerNo,
  size,
  containerOwner,
  containerType
) {
  const time = new Date().toISOString();
  if (scrapeType === "ingateout") {
    return `ingateout/${port}/${containerNo}`;
  }
  if (scrapeType === "empties") {
    return `empties/${port}/${containerOwner}/${size}/${containerType}`;
  }
  if (scrapeType === "lastfreeday") {
    return `lastfreeday/${port}/${containerNo}`;
  }
  if (scrapeType === "eta") {
    return `eta/${port}/${containerNo}`;
  }
  if (scrapeType === "emptyReturn") {
    return `emptyReturn/${port}/${time}`;
  }

  if (scrapeType === "vessel") {
    return `vessel/${port}/${time}`;
  }
};

module.exports = { s3Payload, imageUrlPath };
