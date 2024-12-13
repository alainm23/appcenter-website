export const DEFAULT_LANG = 'en';

export const getTranslateValue = (
  element: Record<string, any>,
  key: string,
) => {
  const name = {};

  if (Array.isArray(element[key])) {
    element[key].forEach((value) => {
      const lang = value._attributes?.['xml:lang'] ?? DEFAULT_LANG;
      name[lang] = value._text;
    });

    return name;
  }

  if (element[key]) {
    name[DEFAULT_LANG] = element[key]._text;
  }

  return name;
};

export const getArrayValue = (element: Record<string, any>) => {
  if (!element) {
    return [];
  }

  if (Array.isArray(element)) {
    return element.map((item) => item._text);
  }

  return [element._text];
};

export const extractUrls = (element: Record<string, any>) => {
  if (Array.isArray(element)) {
    return element.map((item) => ({
      type: item._attributes?.type,
      value: item._text,
    }));
  }

  if (element) {
    return [
      {
        type: element._attributes?.type,
        value: element._text,
      },
    ];
  }

  return [];
};

export const extractScreenshots = (element: Record<string, any>) => {
  if (!element) {
    return {};
  }

  const groupedScreenshots: Record<string, any[]> = {};

  const processImage = (image: any, defaultLang: string) => {
    const lang = image?._attributes?.['xml:lang'] || defaultLang;

    if (!groupedScreenshots[lang]) {
      groupedScreenshots[lang] = [];
    }

    groupedScreenshots[lang].push({
      image_type: image?._attributes?.type || 'unknown',
      url: image?._text,
    });
  };

  const processImages = (images: any, defaultLang: string) => {
    if (Array.isArray(images)) {
      images.forEach((img) => processImage(img, defaultLang));
    } else if (images) {
      processImage(images, defaultLang);
    }
  };

  if (Array.isArray(element)) {
    element.forEach((item) => {
      const images = item.image;
      processImages(images, DEFAULT_LANG);
    });
  } else if (element) {
    const images = element.image;
    processImages(images, DEFAULT_LANG);
  }

  return groupedScreenshots;
};

export const extractReleases = (element: Record<string, any>) => {
  if (!element) {
    return [];
  }

  if (Array.isArray(element)) {
    return element.map((item) => ({
      timestamp: item?._attributes.timestamp * 1000,
      description: extractDescription(item),
      issues: extractIssues(item?.issues?.issue),
      version: item?._attributes?.version,
    }));
  }

  if (element) {
    return [
      {
        timestamp: element?._attributes.timestamp * 1000,
        description: extractDescription(element),
        issues: extractIssues(element?.issues?.issue),
        version: element?._attributes?.version,
      },
    ];
  }

  return [];
};

export const extractDescription = (element: Record<string, any>) => {
  if (!element.description) {
    return {};
  }

  const description = {};

  if (Array.isArray(element.description)) {
    element.description.forEach((value) => {
      const lang = value._attributes?.['xml:lang'] ?? DEFAULT_LANG;
      description[lang] = extractHtml(value);
    });

    return description;
  }

  description[DEFAULT_LANG] = extractHtml(element.description);
  return description;
};

export const extractHtml = (value: Record<string, any>) => {
  let htmlContent = '';

  Object.keys(value).forEach((key) => {
    const element = value[key];

    if (key === 'p') {
      if (Array.isArray(element)) {
        element.forEach((item) => {
          if (item._text) {
            htmlContent += `<p>${item._text}</p>`;
          }
        });
      } else if (element._text) {
        htmlContent += `<p>${element._text}</p>`;
      }
    }

    if (key === 'ul') {
      if (Array.isArray(element)) {
        element.forEach((ulItem) => {
          htmlContent += '<ul>';
          if (ulItem.li) {
            if (Array.isArray(ulItem.li)) {
              ulItem.li.forEach((liItem) => {
                if (liItem._text) {
                  htmlContent += `<li>${liItem._text}</li>`;
                }
              });
            } else if (ulItem.li._text) {
              htmlContent += `<li>${ulItem.li._text}</li>`;
            }
          }
          htmlContent += '</ul>';
        });
      } else if (element.li) {
        htmlContent += '<ul>';
        if (Array.isArray(element.li)) {
          element.li.forEach((liItem) => {
            if (liItem._text) {
              htmlContent += `<li>${liItem._text}</li>`;
            }
          });
        } else if (element.li._text) {
          htmlContent += `<li>${element.li._text}</li>`;
        }
        htmlContent += '</ul>';
      }
    }
  });

  return htmlContent;
};

export const extractIssues = (element: Record<string, any>) => {
  if (!element) {
    return [];
  }

  if (Array.isArray(element)) {
    return element.map((item) => ({
      url: item?._attributes?.url,
      issue: item._text,
    }));
  }

  return [
    {
      url: element?._attributes?.url,
      issue: element?._text,
    },
  ];
};

export const extractMetaData = (element: Record<string, any>) => {
  if (!element) {
    return [];
  }

  if (Array.isArray(element)) {
    return element.map((item) => ({
      type: item?._attributes?.key,
      value: item?._text,
    }));
  }

  return [
    {
      type: element?._attributes?.key,
      value: element?._text,
    },
  ];
};

export const extractBranding = (element: Record<string, any>) => {
  if (!element?.branding || !element?.branding?.color) {
    return [];
  }

  const color = element?.branding?.color;

  if (Array.isArray(color)) {
    return color.map((item) => ({
      type: item?._attributes?.type,
      scheme_preference: item?._attributes?.scheme_preference,
      value: item?._text,
    }));
  }

  return [
    {
      type: color?._attributes?.type,
      scheme_preference: color?._attributes?.scheme_preference,
      value: color?._text,
    },
  ];
};

export const extractDeveloper = (element: Record<string, any>) => {
  let name = {};

  if (element?.developer?.name) {
    if (Array.isArray(element?.developer?.name)) {
      element?.developer?.name.forEach((value) => {
        const lang = value._attributes?.['xml:lang'] ?? DEFAULT_LANG;
        name[lang] = value._text;
      });

      return name;
    }

    name[DEFAULT_LANG] = element?.developer?.name._text;
    return name;
  }

  if (element?.developer_name) {
    if (Array.isArray(element?.developer_name)) {
      element?.developer_name.forEach((value: Record<string, any>) => {
        const lang = value._attributes?.['xml:lang'] ?? DEFAULT_LANG;
        name[lang] = value._text;
      });

      return name;
    }

    name[DEFAULT_LANG] = element?.developer_name._text;
    return name;
  }

  name[DEFAULT_LANG] = 'Unknown';
  return name;
};

export const extractKeywords = (element: Record<string, any>) => {
  const allKeywords = [];

  const findText = (obj: Record<string, any>) => {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (key === '_text') {
          allKeywords.push(obj[key]);
        } else {
          findText(obj[key]);
        }
      }
    } else if (Array.isArray(obj)) {
      obj.forEach(findText);
    }
  };

  findText(element);
  return allKeywords;
};
